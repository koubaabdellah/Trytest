CRPTiledLayerType = {};
CRPTiledLayerType.Puzzle = 1;
CRPTiledLayerType.Masonry = 2;
CRPTiledLayerType.Square = 3;
CRPTiledLayerType.Justified = 4;

CRPIdx = 1;

;(function ($) {
    $.crpTiledLayer = function (element, options) {
        if(options.approxTileWidth < options.minTileWidth){
            options.approxTileWidth = options.minTileWidth;
        }

        var Slot = function (width, height) {
            this.position = { x: 0, y: 0 };
            this.blocks = { h: width, v: height };
            this.size = { width: this.blocks.h, height: this.blocks.v };
            this.px = { width: width, height: height };
            this.edge_right = false;
        }

        Slot.prototype.resize = function (blocks, onlyWidth) {
            //nw : nh = w : h => nh = nw * h / w
            var new_width = blocks;
            var new_height = (new_width * this.px.height) / this.px.width;
            var bv = this.blocks.v;
            this.blocks.h = blocks;
            if(!onlyWidth && plugin.settings.layoutType != CRPTiledLayerType.Square)
	            this.blocks.v = new_height;
            }

        var Grid = function (margin, min_tile_width, width) {
            this.slots = [];
            this.cells = [];
            this.margin = margin;
            this.min_tile_width = min_tile_width;
            this.width = width;
            this.hor_size = width;
            this.init();
        }

        Grid.prototype.init = function () {
            this.slots.length = 0;
            this.cells.length = 0;
            for (var i = 0; i < this.hor_size * 1000; i++) {
                this.cells[i] = 0;
            }
        }

        Grid.prototype.add_slot = function (slot) {
            for (var j = 0; j < slot.blocks.v; j++) {
                for (var i = 0; i < slot.blocks.h; i++) {
                    var row = slot.position.y + j;
                    var column = slot.position.x + i;
                    //if (this.cells.length < row * this.hor_size + column)

                    this.cells[row * this.hor_size + column] = 1;
                    this.cells.push(0);
                }
            }

            this.slots.push(slot);
        }

        Grid.prototype.count_free_cells_on_right = function (index) {
            var line = Math.floor(index / this.hor_size);
            var line_end = (line + 1) * this.hor_size;

            var length = 0;

            for (; index < line_end; index++, length++) {
                if (this.cells[index] == 1) {
                    break;
                }
            }

            return length;
        }

        Grid.prototype.insert = function (width, height, allowEnlargement) {

            /* Hack for square and masonry styles */
            var sW = width;
            var sH = height;
            if(plugin.settings.layoutType == CRPTiledLayerType.Masonry || plugin.settings.layoutType == CRPTiledLayerType.Square){
                var _slotWidth = plugin.settings.approxTileWidth + plugin.settings.margin;
                var _wrapperWidth = $element.width() + plugin.settings.margin;
                if(_slotWidth > _wrapperWidth - plugin.settings.margin){
                    _slotWidth = _wrapperWidth - plugin.settings.margin;
                }

                var _itemsPerRow = parseInt( _wrapperWidth / _slotWidth );
                var _delta = _wrapperWidth - _itemsPerRow * _slotWidth;
                var _deltaPerCell = Math.floor(_delta / _itemsPerRow);
                _slotWidth += _deltaPerCell;

                sW = _slotWidth;

                var _ratio = plugin.settings.approxTileHeight / plugin.settings.approxTileWidth;
                if(plugin.settings.layoutType == CRPTiledLayerType.Masonry){
                    _ratio = height / width;
                }

                sH = Math.ceil(sW * _ratio);

            } else {
                var _wrapperWidth = $element.width() + plugin.settings.margin;
                var step = parseInt( _wrapperWidth / 4 );

                var ratios = [
                  {w: 1, h:1},
                  {w: 2, h:2},
                ];
                var ratio = ratios[(Math.floor(Math.random() * (ratios.length - 0)) + 0)];

                sW = ratio.w * step;
                sH = ratio.h * step;
            }

            var slot = new Slot(sW, sH);
            var av_blocks = 0;
            var free_cell = 0;
            var line = 0;

            if (this.slots.length == 0) {
                av_blocks = this.hor_size;
                slot.position.x = 0;
                slot.position.y = 0;
            } else {

                //find first available cell
                var exit = false;
                for (; free_cell < this.cells.length; free_cell++) {
                    if (this.cells[free_cell] == 0) {

                        line = Math.floor(free_cell / this.hor_size);
                        var line_end = (line + 1) * this.hor_size;

                        //available blocks
                        av_blocks = 0;
                        for (var k = 0; k <= line_end - free_cell; k++) {
                            av_blocks = k;
                            if (this.cells[free_cell + k] == 1) {
                                //there's another slot on the right
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            //the slot need to be shrinked
            if (av_blocks < slot.blocks.h) {
                slot.resize(av_blocks);
            } else {
                var free_on_right = this.count_free_cells_on_right(free_cell + slot.blocks.h);
                if (free_on_right - plugin.settings.margin < this.min_tile_width &&
                		free_on_right > 0) {
                    slot.resize(av_blocks, !allowEnlargement);
                    slot.enlarged = true;
                }
                if (free_on_right == 0)
                    slot.edge_right = true;
            }

            slot.position.x = free_cell % this.hor_size;
            slot.position.y = Math.floor(free_cell / this.hor_size);

            this.add_slot(slot);
            return slot;
        }

        var defaults = {
            layoutType: CRPTiledLayerType.Puzzle,
            approxTileWidth: 200,
            approxTileHeight: 200,
            minTileWidth: 200,
            margin: 10,
            allowEnlargement: false,
            lazy: true,
            onComplete: function () { },
            onUpdate: function () { },
        }

        var plugin = this;
        var grid = null;
        var maxHeight = 0;

        plugin.settings = {}

        var $element = $(element),
             element = element;

      	var currentWidth = $element.width();

        var completed = false;
        var busy = false;

        var tilesForFilter = function(ft) {
          var $tiles = $("void");

          if (ft && ft.length > 0) {
            $tiles = $element.find(".ftg-" + ft);
          } else {
            $tiles =  $element.find(".crp-tile");
          }

          return $tiles;
        }

        var selectedFilter = function() {
          var ftg = $element.find(".ftg-filters a.selected");

          var ftgHref = $(ftg).attr("href");
          if(!ftgHref){
            return null;
          }

          var ft = $(ftg).attr("href").substr(1);
          return ft;
        }

        var setupFilters = function () {
            if ($element.find(".ftg-filters").length == 0)
                return;

            $element.find(".ftg-filters a").on("click", function (e) {
                e.preventDefault();

                $element.find(".ftg-filters a.selected").removeClass("selected");
                $(this).addClass("selected");

                doFiltration(true);
            });
        }

        var doFiltration = function(animate) {
          busy = true;

          var ft = selectedFilter();
          var $tiles = tilesForFilter(null);
          var $filteredTiles = tilesForFilter(ft);

          var transition = animate == true ? "transform .2s, opacity .2s" : "none";
          maxHeight = 0;
          grid = null;

          $tiles.css({
            transition: transition,
            "transform":         "scale(0)", /* CSS3 */
            "-moz-transform":    "scale(0)", /* Firefox */
            "-webkit-transform": "scale(0)", /* Webkit */
            "-o-transform":      "scale(0)", /* Opera */
            "-ms-transform":     "scale(0)", /* IE 9 */
            opacity: 0,
          });

          setTimeout(function () {
            $tiles.css({visibility: 'invisible'});

            if (ft && ft.length > 0) {
              $tiles.addClass("ftg-hidden");
              $filteredTiles.removeClass("ftg-hidden");
            } else {
              $tiles.removeClass("ftg-hidden");
            }

            entile($filteredTiles);

            setTimeout(function () {
              $filteredTiles.css({
                "transform":         "scale(1)", /* CSS3 */
                "-moz-transform":    "scale(1)", /* Firefox */
                "-webkit-transform": "scale(1)", /* Webkit */
                "-o-transform":      "scale(1)", /* Opera */
                "-ms-transform":     "scale(1)", /* IE 9 */

                opacity: 1,
              });

              $filteredTiles.css({visibility: 'visible'});

              $(window).scroll();
              busy = false;
            }, 250);
          }, 250);
        }

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            $element.find(".ftg-items").css({
                position: "relative",
                minWidth: plugin.settings.minTileWidth,
            });

            var $tiles = $element.find(".crp-tile");
            styleTiles($tiles);
            assignImagesSize($tiles);
            setupFilters();
            doFiltration(false);

            if(plugin.settings.lazy){
              $element.find(".ftg-items").crpPreload({
                  showInContainer: true,      //If set to true will load the preloader inside the selector element instead of across the whole page.
                  disableOverlay: true,       //If set to true will not create the blocking overlay.
                  useOpacity: false,          //If set to true will use opacity property to hide elements instead of display property.
                  progressiveReveal: true,    //If set to true will show images as soon as they are preloaded.
                  forceSequentialLoad: true,  //Will force images to load in the order they appear in the DOM, this	can potentially increase the load time because images won't start	loading in parallel.
                  loaderText: "Loading... ",  //Set the text of the loading message.
              });
            }

            $(window).resize(function () {
                if(busy) return;

              	if (currentWidth != $element.width())
                {
                  busy = true;
                  currentWidth = $element.width();

                	resTo = setTimeout(function () {
                    grid = null;
                    maxHeight = 0;

                    var $filteredTiles = tilesForFilter(selectedFilter());
                    entile($filteredTiles);

                    busy = false;
                	}, 700);
                }
            });
        }

        /* MIT License (MIT) - Copyright (c) 2015 HTML5andBeyond.com */

        var iCSS = function(target, property, value) {

          var getStyle = target.attr('style');
          if (getStyle == undefined) {
            target.attr('style', property + ': ' +  value + ' !important;')
          } else if (getStyle.slice(-1) != ';') {
            target.attr('style', getStyle + '; ' + property + ': ' +  value + ' !important;');
          } else {
            target.attr('style', getStyle + property + ': ' +  value + ' !important;');
          }
        }

        var styleTiles = function ($tiles) {
            $tiles.css({
                position: "absolute",
                visibility: 'hidden',
            });

            $tiles.find('.crp-tile-inner').css({
              position: "absolute",
              display: "block",
              overflow: "hidden",
            });

            $tiles.find('.crp-tile-img').css({
              position: "absolute",
              display: "inline-block",
              fontSize: 10, //against weird rules in some reset.css
            });
        }

        var assignImagesSize = function ($tiles) {
            $tiles.each(function () {
                var $item = $(this).find(".crp-tile-img");

                var size = {
                  width: $item.data("width"),
                  height: $item.data("height")
                };

                $item.data("size", size);
            });
        }

        var entile = function ($tiles) {
            if (!grid)
                grid = new Grid(plugin.settings.margin, plugin.settings.minTileWidth, $element.width() + plugin.settings.margin);

            $tiles.each(function () {
                if ($(this).hasClass("ftg-hidden"))
                    return;

                var size = $(this).find(".crp-tile-img").data("size");

                var slot = grid.insert(
                		size.width + plugin.settings.margin,
                		size.height + plugin.settings.margin,
                		plugin.settings.allowEnlargement);

				        $(this).data("enlarged", slot.enlarged);


                var top = slot.position.y;
                var height = slot.blocks.v;

                var tileWidth = slot.blocks.h - plugin.settings.margin;
                var tileHeight = slot.blocks.v - plugin.settings.margin;

                if (top + tileHeight > maxHeight)
                    maxHeight = top + height + plugin.settings.margin;

                $(this).css({
                    top: top,
                    left: slot.position.x,
                    width: slot.blocks.h,
                    height: height
                });

                $(this).find('.crp-tile-inner').css({
                    width: tileWidth,
                    height: tileHeight
                })
                .data("width", tileWidth)
                .data("height", tileHeight);

                $element.find(".ftg-items").height(maxHeight);
            });

            $tiles.find(".crp-tile-img").each(function (i, item) {
                var $item = $(item);
                var size = $item.data("size");

                var ratioImg = size.width / size.height;
                var ratioTile = $item.parent().data("width") / $item.parent().data("height");

                var bugFixDiff = 0;
                if (ratioImg >= ratioTile) {
                    $item.attr("case", "2");

                    var $h = $item.parent().data("height") + bugFixDiff;
                    var $w = ratioImg * $h;

                    iCSS($item, "width", $w + "px");
                    iCSS($item, "height", $h + "px");

                    // $item.css({
                    //     width: $w,
                    //     height: $h
                    // });

                    var diff = $w - $item.parent().data("width");
                    $item.css({
                      "left": diff / -2,
                      "top": bugFixDiff / -2,
                    });
                } else {
                    $item.attr("case", "4");

                    var $w = $item.parent().data("width") + bugFixDiff;
                    var $h = $w / ratioImg;

                    iCSS($item, "width", $w + "px");
                    iCSS($item, "height", $h + "px");

                    // $item.css({
                    //     width: $w,
                    //     height: $h
                    // });

                    var diff = $h - $item.parent().data("height");
                    $item.css({
                      "top": diff / -2,
                      "left": bugFixDiff / -2,
                    });
                }
            });

            if (!completed) {
                completed = true;
                plugin.settings.onComplete.call(plugin);
            } else {
                plugin.settings.onUpdate.call(plugin);
            }
        }

        plugin.init();
    }

    $.fn.crpTiledLayer = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('crpTiledLayer')) {
                var plugin = new $.crpTiledLayer(this, options);
                $(this).data('crpTiledLayer', plugin);
            }
        });
    }
})(jQuery);
