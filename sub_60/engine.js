(function ($) {
  //$('.nolink').click(function() {
    // $this.preventDefault;
  //});
  // call jRespond and add breakpoints
  jQuery.fn.exists = function(){return this.length>0;}
  var Engine = {
    init: function () {
      Engine.swipers = {};
      Engine.showAllContentWhenLoaded();
      Engine.setupPositionIndex();
      Engine.setupSwipers();
      Engine.setupEqualheight();
      Engine.setupOverlay();
      Engine.setupNavigation();
      Engine.setupDonutchart();
      Engine.setupContrastswitch();
      Engine.setupFaq();
      Engine.setupDatepicker();
      Engine.setupHeaderbackground();
      Engine.setupBreadcrumbfoldout();
      Engine.setupStickyFooter();
      Engine.subjectsSliderNavigationIE8();
      Engine.checkMenuWidth();
      Engine.scrollToFAQ();
    },
    showAllContentWhenLoaded: function() {
      $('html').removeClass('visuallyhidden');
    },
    swipeTo: function(swiper, slides, id) {
      var active_index = swiper.activeIndex;
      $(slides).each(function(idx,el) {
        var $el = $(el);
        if($el.attr('data-id') == id) {
          active_index = idx;
        }
      });
      swiper.swipeTo(active_index, 200);
    },
    reinitSwipers: function() {

      if(typeof(Engine.swipers['subject_swiper']) !== "undefined") {
        Engine.swipers['subject_swiper'].reInit();
      }
      if(typeof(Engine.swipers['homepage_swiper']) !== "undefined") {

        Engine.swipers['homepage_swiper'].reInit();
      }
      if(typeof(Engine.swipers['hpsubjects_swiper']) !== "undefined") {
        Engine.swipers['hpsubjects_swiper'].reInit();
      }
      Engine.setupStickyFooter();
    },
    setupSwipers: function() {
      var set_slidesPerView = function() {
        if($(window).width() > 1280 || $("html").hasClass("lt-ie9")) {
          return 'auto';
        }
        return 1;
      };


    // Setup swipers
    Engine.main_subject_swiper_setup();
    Engine.frontpage_swiper_setup();
    Engine.frontpage_subjects_swiper_setup();


    },
    setupEqualheight: function() {
        var currentTallest = 0,
          currentRowStart = 0,
          rowDivs = new Array(),
          $el,
          topPosition = 0;
        $('.subjectblock, .main-content-help-subject, .bannerbox-container > div, .home #main-content-news .article-list li, .cases-container .case, #side-content .case').each(function() {
          $el = $(this);
          $($el).height('auto');
          topPostion = $el.position().top;
          if (currentRowStart != topPostion) {
            // we just came to a new row.  Set all the heights on the completed row
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
              rowDivs[currentDiv].outerHeight(currentTallest);
            }
            // set the variables for the new row
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.outerHeight();
            rowDivs.push($el);
          } else {
            // another div on the current row.  Add it to the list and check if it's taller
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.outerHeight()) ? ($el.outerHeight()) : (currentTallest);
          }
          // do the last row
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].outerHeight(currentTallest);
          }

        });
    },
    setupPositionIndex: function() {

      var index_block = $('#main-contentindex');
      if (index_block.length > 0 ) {
        $(window).on('load resize', function() {
          var index_height = index_block.outerHeight(true);
          $('.main-content-article').css({'marginTop': index_height});
        })
      }

    },
    setupOverlay: function() {

      if($('#subjects-container').length > 0) {
        var docHeight = $(document).height();

        if(!$.cookie('overlay-shown')) {

          $(".main-content-subjectheader").append('<div id="overlay"></div>');

          $('.main-content-subjectheader .slider-nav .swipe-hint').addClass('active');
          $("#overlay")
            .height(docHeight)
            .css({
              'opacity' : 0.5,
              'position': 'fixed',
              'top': 0,
              'left': 0,
              'background-color': 'black',
              'width': '100%',
              'z-index': 100
            });

          setTimeout(function() {
            $("body #overlay").fadeOut(400,function() {
              $(this).remove();
            });
            $('.main-content-subjectheader .slider-nav .swipe-hint').removeClass('active');

          }, 2000);

           $.cookie('overlay-shown', 'true');
        }

      }

    },
    setupNavigation: function() {
      var article_height = $('article').eq(0).height();
      var footer_top = $('footer').eq(0).offset().top;

      $('.topnav .foldout > a').on('click focus mouseenter', function (e) {
        var $this = $(this);

        e.preventDefault();
        e.stopPropagation();

        // Make sure we don't fire the event twice
        var now = +new Date();
        var lastClicked = $this.data("lastClicked");
        if (lastClicked && (now - lastClicked) < 250) {
          return;
        }
        $this.data("lastClicked", now);

        var $foldout = $this.parent()
        var $subnav = $this.next(".subnav")

        if($foldout.hasClass("expanded")) {
          $foldout.removeClass('expanded');
          $subnav.removeClass('flip');
        } else {
          $foldout.siblings().removeClass('expanded');
          $foldout.addClass('expanded');


          var right_edge = $subnav.offset().left + $subnav.width();
          if(right_edge > $('body').width()) {
            $subnav.addClass('flip');
          }
        }

        var menu_bottom = $('.topnav').offset().top + $('.topnav').outerHeight();
        if( menu_bottom > footer_top ) {
          var diff = menu_bottom - footer_top;
          if(diff < article_height) {
              $('article').css('height','');
          } else {
              $('article').height(article_height + diff + 40);
          }

        } else {
          $('article').css('height','');
        }



        $(".foldout.expanded").mouseleave(function(){
            $(this).removeClass('expanded');
            $(this).siblings().removeClass('expanded');
            $(this).find('> a').blur();
        });


        return false;
      });
      var menu_toggle = true;
      $('a.drop_menu').on('click', function(e) {
        e.preventDefault();
        if(menu_toggle) {
          $("#search-box-container").show();
          $("#mainnav .topnav").show();
            var menu_bottom = $('.topnav').offset().top + $('.topnav').outerHeight();
            if( menu_bottom > footer_top ) {
                var diff = menu_bottom - footer_top;
                if(diff < article_height) {
                    $('article').css('height','');
                } else {
                    $('article').height(article_height + diff + 40);
                }

            } else {
                $('article').css('height','');
            }

        } else {
          $("#search-box-container").hide();
          $("#mainnav .topnav").hide();
          $('article').css('height','');
        }
        menu_toggle = menu_toggle ? false : true;
      });
    },
    setupDonutchart: function() {
      var table = $(".chart-table table tbody");
      if(table.length > 0 ) {
        var $labels = [];
        var $values  = [];
        var $colors = ["#1E3C3C","#316565","#547A49","#81B663","#ABD581"];
        var $legendpos = "";

        if ( 730 < $( window ).width() && $( window ).width() < 1001) {
            $legendpos = "east";
        }
        else {
            $legendpos = "south";
        }

        table.find('tr.row').each(function (i) {
          var $tds = $(this).find('td'),
            label = '%% '.concat($tds.eq(0).text()),
            value = parseFloat($tds.eq(1).text());
          $labels.push(label);
          $values.push(value);
        });

        var $chartHeight = ($values.length)*20 + 250;

        var r = Raphael("chart", '100%', $chartHeight + 'px');
        var pie = r.piechart(120, 120, 100, $values , {donut : true, legend: $labels, legendpos: $legendpos, colors:$colors});

        pie.hover(function () {
          var that = this.sector;
          this.sector.stop();
          this.sector.scale(1.1, 1.1, this.cx, this.cy);
          pie.each(function() {
            if(this.sector.id === that.id) {
              /* console.log(pie) */
              tooltip = r.text(120, 120, this.sector.value.value.toString().concat('%')).attr({"font-size": 20, "font-weight":400, "fill":"#1e3c3c"});
            }
          });
          if (this.label) {
            this.label[0].stop();
            this.label[0].attr({ r: 7.5 });
            this.label[1].attr({ "font-weight": 800 });
          }
        }, function () {
          this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
          tooltip.remove();

          if (this.label) {
            this.label[0].animate({ r: 5 }, 500, "bounce");
            this.label[1].attr({ "font-weight": 400 });
          }
        });

        //toon table
        $('a.table-trigger').on('click', function (e) {
          e.preventDefault();
          $(this).siblings('.chart-table').toggleClass('expanded');
          $(this).toggleClass('less');
          return false
        });
      }
    },
    setupContrastswitch: function() {
      if($.cookie("extra-contrast")) {
        $('body').addClass("extra-contrast");
      }
      $('#contrast-switcher').on('click', function (e) {
        e.preventDefault();
        if($('body').hasClass('extra-contrast')) {
          $.removeCookie("extra-contrast");
          $('body').removeClass('extra-contrast');
        } else {
          $.cookie("extra-contrast", true);
          $('body').addClass('extra-contrast');
        }
      });
    },
    setupFaq: function() {
      // show no more then 6 items, otherwise show/hide

      $('ul.faqlist').not( ".open" ).each(function() {
          var faq_activate_moreless = false;
          var ul_container = $(this);
          ul_container.children('li').each(function( index ) {
              if(index + 1 > 6) {
                  $(this).hide().addClass('faqlistItemHide');
                  faq_activate_moreless = true;
              }
          });

          if(faq_activate_moreless) {
              ul_container.parent().find('a.faqitems.less').hide();
              // more
              ul_container.parent().find('a.faqitems.more').on('click', function(e) {
                  e.preventDefault();
                  ul_container.parent().find('a.faqitems.more').hide();
                  ul_container.parent().find('a.faqitems.less').show();

                  ul_container.children('li.faqlistItemHide').fadeIn('fast', function() {
                      $(this).addClass('faqlistItemShow');
                      faqOnelineCenter();
                  });
              });
              // less
              ul_container.parent().find('a.faqitems.less').on('click', function(e) {
                  e.preventDefault();

                  ul_container.parent().find('a.faqitems.less').hide();
                  ul_container.parent().find('a.faqitems.more').show();

                  ul_container.children('li.faqlistItemShow').fadeOut('fast', function() {
                      $(this).removeClass('faqlistItemShow');
                  });
              });
          }
      });


      function faqOnelineCenter() {
        $('ul.faqlist > li > a:visible').each(function () {
          if ($(this).height() < 50) {
            $(this).css({'line-height':'48px'});
          }
        })
      }
      $('ul.faqlist > li > a').on('click', function(e) {
        e.preventDefault()
        $(this).parent().toggleClass("expanded");
      });

      // Open correct faq.
      var hash = window.location.hash;
      if(hash.length > 1 && $("ul.faqlist > li > div[id='" + hash.substr(1) + "']").length > 0) {
        var div = $("ul.faqlist > li > div[id='" + hash.substr(1) + "']");
        div.parent().toggleClass("expanded");
        if (div.parent().hasClass('faqlistItemHide')) {
          div.parent().parent().parent().find('.more').trigger('click');
        }
        setTimeout(function() {

          var offset = div.parent().offset().top;

          // Toolbar fix
          offset -= parseInt($('body').css('padding-top'));

          $('html, body').scrollTop(offset);
        }, 500);
      }

      /*$('.main-content-faq a.more').on('click', function(e) {
        e.preventDefault();
        faqOnelineCenter();
        var $faqlist = $(this).siblings('.faqlist');
        $faqlist.toggleClass("total");
        $faqlist.find("li.less").removeClass("less").addClass("more");
        $(this).remove();
      })*/
      faqOnelineCenter();
    },
    setupDatepicker: function() {
      var datepickerimg = "../img/date-picker.png";

      if (typeof(Drupal) !== 'undefined' && typeof(Drupal.settings) !== 'undefined') {
        datepickerimg = Drupal.settings.basePath + Drupal.settings.theme_base_path + '/src/img/date-picker.png';
      }

      $(".datepicker").each(function() {
        var $this = $(this);
        $this.datepicker({
          showOn: "button",
          onClose: function(dateText, inst) { $(this).attr("disabled", false); },
          beforeShow: function(dateText, inst) { $(this).attr("disabled", true); },
          dateFormat: "dd-mm-yy",
          buttonImage: datepickerimg,
          buttonImageOnly: true
        });
        //console.log($this);
      });
      var dp_toggle = true;
      $("img.ui-datepicker-trigger").on("click", function(e) {
        e.preventDefault();
        var $this = $(this);
        if(dp_toggle) {
          $this.prev().datepicker("show");
        } else {
          $this.prev().datepicker("hide");
        }
        dp_toggle = dp_toggle ? false : true;
      });
    },
    setupHeaderbackground: function() {
      var $topnav_selected = $('nav .topnav a.selected ');
      $(window).on('resize load ready', function() {
        if ($topnav_selected.length > 0 ) {
          var $width_selected = $topnav_selected.outerWidth();
          var $xpos_selected =  $topnav_selected.offset().left;
          $('header').css({'background-position':$xpos_selected+($width_selected/2)-10+'px '+'0px'});
        }
      });
    },
    setupBreadcrumbfoldout: function() {
      $("body").on("click", '.breadcrumb-container .foldable > a', function(e) {
        e.preventDefault();
        var $foldable = $(this).parent();
        $foldable.siblings().removeClass("expanded");
        $foldable.toggleClass("expanded");
        $foldable.find(".subnav li a").on("click", function(e) {
          $foldable.removeClass("expanded");
        });
      });
    },
    setupBlockToggle: function($block) {
      //console.log($block);

      if(!$block.hasClass("active")) {
        $block.addClass("folded");
      }

      $block.find("h2").on("click", function(e) {
        e.preventDefault();
        $block.toggleClass(function() {
          return "folded"
        });
      });
    },
    destroyBlockToggle: function($block) {
      $block.find("h2").off();
      $block.removeClass("folded");
    },
    setupStickyFooter: function() {
      var $footer = $("footer");
      var $article = $("article");
      var vpheight = $(window).height();
      var docheight = $("html").height();
      if(vpheight > docheight) {
          var diff = vpheight - docheight;
          $article.css('min-height', $article.height() + diff);
      }
    },
    subjectsSliderNavigationIE8: function() {
        if( $("html").hasClass("lt-ie9") && $(window).width() > 1200  ) {
            $('.swiper-slide.subject .slider-nav .prev').css ({ 'left':0 });
            $('.swiper-slide.subject .slider-nav .next').css ({ 'right':0 });
        }
    },
    checkMenuWidth: function() {
        if($('#mainnav .topnav').length > 0 && $('#header-wrapper #alert').length  > 0) {
            var nav = $('#mainnav .topnav').eq(0)
            var button = $('#header-wrapper #alert').eq(0)
            var wrapper = $('#header-wrapper').eq(0)
            button.css('margin-top','')
            nav.children('li').css('margin-left','')
            nav.children('li').css('margin-right','')
            var margin_delta = 0;


            while(nav.width() > wrapper.width() - button.width() && margin_delta < 10) {
                margin_delta++;
                nav.children('li').each(function() {
                    var current_left = parseInt($(this).css('margin-left'))
                    var current_right = parseInt($(this).css('margin-right'))
                    if(current_left > 0) {
                        $(this).css('margin-left',current_left - 1)
                    }
                    if(current_right > 0) {
                        $(this).css('margin-right',current_right - 1)
                    }
                });
            }
            if(margin_delta > 0) {
                Engine.setupHeaderbackground()
            }

            // Did we solve the problem?
            if(nav.width() > wrapper.width() - button.width()) {
                button.css('margin-top',-35)
            }

        }


    },
    scrollToFAQ: function() {
      var faq = $('.main-content-faq .faqlist .expanded.scrollto');

      if (faq.length > 0) {
        if(faq.index() >= 6) {
          if (faq.first().hasClass('faqlistItemHide')) {
            faq.first().parent().parent().find('.more').trigger('click');
          }
        }
        setTimeout(function() {

          var offset = faq.first().offset().top;

          // Toolbar fix
          offset -= parseInt($('body').css('padding-top'));

          $('html, body').scrollTop(offset);
        }, 500);
      }

      var scrollToSamePageFAQ = function(e) {
        var target = this.hash;

        if ($(this).hasClass('no-anchor-follow')) {
          return;
        }

        var $target = $(target);

        if ($target.length && $target.first().parent().parent().hasClass('faqlist')) {

          if($target.first().parent().index() >= 6) {
            if ($target.first().parent().hasClass('faqlistItemHide')) {
              $target.first().parent().parent().parent().find('.more').trigger('click');
            }
          }

          if (!$target.first().parent().hasClass('expanded')) {
            $target.parent().find('a').trigger('click');
          }

          setTimeout(function() {

            var offset = $target.first().parent().offset().top;

            // Toolbar fix
            offset -= parseInt($('body').css('padding-top'));

            $('html, body').scrollTop(offset);
          }, 100);
        }
      };

      $('a[href^="#"]').on('click', scrollToSamePageFAQ);
      $('a[href^="' + window.location.href + '#"]').on('click', scrollToSamePageFAQ);
      $('a[href^="' + window.location.pathname + '#"]').on('click', scrollToSamePageFAQ);
    }

  };

  jQuery.CBPEngine = Engine;
  $(document).ready(function ($) {
      fix_slider_aspect_ratio();
    Engine.init();

    var indexpublications = $("#side-content-publications").index();
    var resize_aspect_fix = false;


    $.registry = new jRespond([
      { label: 'mobile', enter: 0, exit: 730 },
      { label: 'tablet', enter: 731, exit: 1000 },
      { label: 'desktop', enter: 1001, exit: 10000 }
    ]);
    $.registry.addFunc({
      breakpoint: ['mobile', 'tablet'],
      enter: function () {
        //console.log("mobile, tablet");
        var publications = $("#side-content-publications").detach();
        $(".main-content-article").after(publications);
        publications = null

      },
      exit: function () {
        //console.log("desktop");
        var publications = $("#side-content-publications").detach();
        if ( indexpublications !== 0 ) {
            $("#side-content").children(':nth-child('+ indexpublications + ')').after(publications);
        } else {
            $("#side-content").prepend(publications);
        }
        publications = null

      }
    });
    $.registry.addFunc({
      breakpoint: 'mobile',
      enter: function() {
        var $searchfilter = $("#side-content.filter-container").detach();
        $("#main-content").before($searchfilter);
        $searchfilter.find(".filter-block").each(function() {
            var $this = $(this);
            Engine.setupBlockToggle($this);
        });
        $searchfilter = null
      },
      exit: function() {
        var $searchfilter = $("#side-content.filter-container").detach();
        $("#main-content").after($searchfilter);
        $searchfilter.find(".filter-block").each(function() {
            var $this = $(this);
            Engine.destroyBlockToggle($this);
        });
        $searchfilter = null
      }
    });


  });

  /** Throttle on resize for performance */
  var setupSwiperTimer;
  var windowWidth = 0;
  $(window).on('resize', function() {

    Engine.checkMenuWidth();

    var currentWindowWidth = $( window ).width();
    if(currentWindowWidth != windowWidth  ) {
      clearTimeout(setupSwiperTimer);

      fix_slider_aspect_ratio();
      setupSwiperTimer = setTimeout(Engine.reinitSwipers, 250);
      windowWidth = currentWindowWidth;
      Engine.setupEqualheight();
    }

  });
  function only_large() {
    var currentWindowWidth = $( window ).width();
    if(currentWindowWidth <= 1000 || $("html").hasClass("lt-ie9")) {
      return 1;
    }
    else {
      return 'auto';
    }
  }

  function fix_slider_aspect_ratio() {
      var ratio = .4153846153846154;
      //var ratio = .3653846153846154;
      // console.log($(window).width());
      if($(window).width() < 715  &! $("html").hasClass("lt-ie9") ) {
          $('#slider .swiper-container').height(0);
      } else {
        if($( window ).width() < 1000  &! $("html").hasClass("lt-ie9") ) {
          $('#slider .swiper-container').height($( window ).width() * ratio);
          $('.fixedratio').each(function() {
              $(this).css('padding-top','0');
              $(this).height($( window ).width() * ratio);
              $(this).parent().css('width',$( window ).width());
          });
        } else if ($( window ).width() <=1280  &! $("html").hasClass("lt-ie9") ) {
          $('#slider .swiper-container').css('height', 395);
          $('.fixedratio').each(function() {
              $(this).height(395);
              $(this).parent().css('width','auto');
          });
        } else if($( window ).width() > 1280  &! $("html").hasClass("lt-ie9") ) {
            $('#slider .swiper-container').css('height', 519);
            $('.fixedratio').each(function() {
              $(this).css('padding-top',ratio*100+'%');
              $(this).css('height','auto');
              $(this).parent().css('width','auto');
            });
        }

        // Check if the swiper exists
        if(typeof(jQuery.CBPEngine.swipers) !== 'undefined') {
            if(typeof(jQuery.CBPEngine.swipers['homepage_swiper']) === "undefined") {
                jQuery.CBPEngine.frontpage_swiper_setup();
            }
        }
      }
  }





})(jQuery);
