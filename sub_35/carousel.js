
$(document).ready(function ()
{
	$(".mettCarousel").carousel();
});

$.fn.carousel = function ()
{
	$(this).each(function ()
	{
		if(typeof $(this).data("carousel") == "undefined" || $(this).data("carousel") == null)
			$(this).data("carousel", new Carousel($(this)));
	});

	return $(this);
};

var Carousel = function (aObject)
{
	var theReturnObject =
	{
		mCarouselObject: null,
		mCarouselMask: null,
		mCarouselContainer: null,
		mCarouselControlsContainer: null,
		mCarouselItems: null,
		mButtonLeft: null,
		mButtonRight: null,
		mButtonPlayPause: null,
		mCalculatedMargin: 0,
		mIsAnimating: false,
		mItemsInitInterval: 0,
		mFitSliderHeight: false,
		mAutoHeight: false,
		mAutoHeightIsAnimating: false,
		mSlideshow: false,
		mSlideshowAutoPlay: true,
		mSlideshowDelay: 4000,
		mSlideshowTimeout: 0,
		mInitComplete: false,
		mItemWidth: null,
		mResizeTimeout: 0,
		mInterval: 0,
		mCompleteHandlers: [],

		init: function (aObject)
		{
			var theThis = this;

			this.mCarouselObject = aObject;
			this.mCarouselObject.css("-webkit-user-select", "none");
			this.mCarouselObject.css("-moz-user-select", "none");
			this.mCarouselObject.css("-ms-user-select", "none");
			this.mCarouselObject.css("-o-user-select", "none");
			this.mCarouselObject.css("user-select", "none");

			// Scales the height to the height of the tallest item
			if(this.mCarouselObject.attr("data-fit-slider-height") == "true")
				this.mFitSliderHeight = true;

			// Scales the height to the height of the current item
			if(this.mCarouselObject.attr("data-auto-height") == "true")
				this.mAutoHeight = true;

			// Adds pause/play button and auto play
			if(this.mCarouselObject.attr("data-slideshow") == "true")
				this.mSlideshow = true;

			// You can kill the auto play \o/
			if(this.mCarouselObject.attr("data-auto-play") == "false")
				this.mSlideshowAutoPlay = false;

			// Set item width
			if(typeof this.mCarouselObject.attr("data-item-width") != "undefined" && this.mCarouselObject.attr("data-item-width") != null)
				this.mItemWidth = this.mCarouselObject.attr("data-item-width");

			// Sets the delay before the next animation
			if(this.mCarouselObject.attr("data-delay") != null && parseInt(this.mCarouselObject.attr("data-delay")) > 0)
				this.mSlideshowDelay = parseInt(this.mCarouselObject.attr("data-delay"));

			if(this.mCarouselObject.css("position") != "absolute" && this.mCarouselObject.css("position") != "relative")
				this.mCarouselObject.css("position", "relative");

			this.mCarouselObject.css("z-index", "100");

			this.createContainer();

			this.mCarouselItems = this.mCarouselContainer.children();
			this.mCarouselItems.css({float: "left"});
			this.mCarouselItems.css("white-space", "normal");

			$(window).resize(function ()
			{
				theThis.onResize();
			});

			theThis.onResize();

			if (this.mCarouselItems.length < 2 || !this.canRotate())
			{
				clearTimeout(this.mSlideshowTimeout);
				clearInterval(this.mItemsInitInterval);
				clearInterval(this.mInterval);
				return;
			}
			else if (this.mCarouselObject.width() <= 0)
				this.delayedInit();
			else
				this.resumeInit();
		},

		delayedInit: function ()
		{
			var theThis = this;

			if(this.mCarouselObject.width() > 0)
				this.resumeInit();
			else
				setTimeout(function () { theThis.delayedInit(); }, 100);
		},

		resumeInit: function ()
		{
			var theThis = this;

			clearInterval(this.mInterval);
			this.mInterval = setInterval(function () { theThis.onInterval(); }, 100);

			if(this.mCarouselContainer.width() - parseInt($(this.mCarouselContainer.get(0).lastElementChild).css("marginRight")) - 11 <= this.mCarouselObject.width())
				return;

			this.onResize();

			this.initItems();

			if (this.canRotate())
				this.initButtons();

			this.addListeners();

			if(this.mSlideshow)
				this.initSlideshow();

			this.fitSliderHeight();

			this.mInitComplete = true;

			this.onResize();

			this.complete();
		},

		canRotate: function ()
		{
			if ($.fn.viewport().width > 768 && this.mItemWidth != null && this.mItemWidth.indexOf("%") > -1)
				return parseInt(this.mItemWidth) * this.mCarouselItems.length > 101;
			else
				return true;
		},

		createContainer: function ()
		{
			this.mCarouselMask = $("<div class=\"carouselMask\" />");
			this.mCarouselContainer = $("<div class=\"carouselContainer\" />");

			this.mCarouselContainer.css("position", "absolute");
			this.mCarouselContainer.css("height", "100%");
			this.mCarouselContainer.css("white-space", "nowrap");

			this.mCarouselMask.css("position", "relative");
			this.mCarouselMask.css("width", "100%");
			this.mCarouselMask.css("height", "100%");
			this.mCarouselMask.css("overflow", "hidden");

			this.mCarouselObject.wrapInner(this.mCarouselContainer);
			this.mCarouselObject.wrapInner(this.mCarouselMask);

			this.mCarouselContainer = this.mCarouselObject.find(".carouselContainer");
			this.mCarouselMask = this.mCarouselObject.find(".carouselMask");

			this.updateContainerWidth();
		},

		updateContainerWidth: function ()
		{
			var theContainerWidth = 0;
			this.mCarouselContainer.children().each(function ()
			{
				theContainerWidth += $(this).outerWidth(true);
			});

			this.mCarouselContainer.css("width", theContainerWidth + 10 + "px");
		},

		initItems: function ()
		{
			var theThis = this;

			// Bugfix to be sure items can be initialized
			if(this.mCarouselItems.length > 1)
			{
				var theCheckPosition = this.mCarouselItems.eq(1).position();

				if(theCheckPosition.left <= 0)
				{
					if(this.mItemsInitInterval == 0)
					{
						clearInterval(theThis.mItemsInitInterval);
						theThis.mItemsInitInterval = setInterval(function () { theThis.initItems(); }, 100);
					}

					return;
				}
			}

			clearInterval(theThis.mItemsInitInterval);

			this.mCarouselContainer.children().each(function ()
			{
				var theCurrentItem = $(this);

				var thePosition = theCurrentItem.position();

				theCurrentItem.css("left", thePosition.left + "px");
				theCurrentItem.data("targetLeft", thePosition.left);
			});

			this.mCarouselContainer.children().each(function ()
			{
				var theCurrentItem = $(this);

				theCurrentItem.css("position", "absolute");
			});

			this.calculateMargin();
		},

		initButtons: function ()
		{
			this.mCarouselControlsContainer = $("<div />");
			this.mCarouselControlsContainer.addClass("carouselControls");

			// Previous.
			this.mButtonLeft = $("<a />").attr("href", "#").addClass("control previous icon-left before hide");
			this.mButtonLeft.html("<div class=\"screenReaderContent\">" + settings.various.previousText + "</div>");
			this.mButtonLeft.appendTo(this.mCarouselControlsContainer);

			// Play & pause.
			this.mButtonPlayPause = $("<a />").attr("href", "#").addClass("control play icon-play before hide");
			this.mButtonPlayPause.html("<div class=\"screenReaderContent\">" + settings.various.playText + "</div>");
			this.mButtonPlayPause.appendTo(this.mCarouselControlsContainer);

			// Next.
			this.mButtonRight = $("<a />").attr("href", "#").addClass("control next icon-right before hide");
			this.mButtonRight.html("<div class=\"screenReaderContent\">" + settings.various.nextText + "</div>");
			this.mButtonRight.appendTo(this.mCarouselControlsContainer);

			// Append container.
			this.mCarouselControlsContainer.appendTo(this.mCarouselObject);
		},

		toggleButtons: function ()
		{
			var theTotalWidth = 0;

			this.mCarouselContainer.children().each(function ()
			{
				theTotalWidth += $(this).outerWidth();
			});

			if (this.mButtonLeft != null && theTotalWidth > this.mCarouselMask.outerWidth())
			{
				this.mButtonLeft.removeClass("hide");
				this.mButtonRight.removeClass("hide");
			}
			else if (this.mButtonLeft != null)
			{
				this.mButtonLeft.removeClass("hide");
				this.mButtonRight.removeClass("hide");
			}
		},

		initSlideshow: function ()
		{
			var theThis = this;

			this.mButtonPlayPause.click(function()
			{
				var theObject = theThis.mButtonPlayPause;

				if (theObject.hasClass("pause"))
					theThis.pause();
				else
					theThis.play();

				return false;
			}).removeClass("hide");

			if (this.mSlideshowAutoPlay)
			{
				this.mButtonPlayPause.removeClass("play icon-play").addClass("pause icon-pause");
				this.mButtonPlayPause.html("<div class=\"screenReaderContent\">" + settings.various.pauseText + "</div>");

				this.setSlideshowTimeout();
			}
			else
			{
				this.pause();
			}
		},

		pause: function ()
		{
			if (this.mButtonPlayPause != null)
			{
				this.mButtonPlayPause.removeClass("pause icon-pause").addClass("play icon-play");
				this.mButtonPlayPause.html("<div class=\"screenReaderContent\">" + settings.various.playText + "</div>");
			}

			this.mSlideshow = false;

			clearTimeout(this.mSlideshowTimeout);
		},

		play: function ()
		{
			if(this.mButtonPlayPause != null)
			{
				this.mButtonPlayPause.removeClass("play icon-play").addClass("pause icon-pause");
				this.mButtonPlayPause.html("<div class=\"screenReaderContent\">" + settings.various.pauseText + "</div>");
			}

			this.mSlideshow = true;

			clearTimeout(this.mSlideshowTimeout);
			this.setSlideshowTimeout();
		},

		setSlideshowTimeout: function ()
		{
			var theThis = this;

			clearTimeout(this.mSlideshowTimeout);

			this.mSlideshowTimeout = setTimeout(function () { theThis.animateTo(); }, this.mSlideshowDelay);
		},

		animateTo: function (aDirection) // aDirection: "previous" or "next" ("next" is default)
		{
			clearTimeout(this.mSlideshowTimeout);

			if(this.mIsAnimating || this.mCarouselItems.length < 2)
				return;

			var theThis = this;

			this.mIsAnimating = true;

			var theLast = this.mCarouselContainer.children().last();
			var theFirst = this.mCarouselContainer.children().first();

			var thePosition;

			this.calculateMargin();

			if(aDirection == "previous")
			{
				thePosition = theFirst.position().left - theLast.width() - this.mCalculatedMargin;

				theLast.css("left", thePosition + "px");
				theLast.data("targetLeft", thePosition);
				this.mCarouselContainer.prepend(theLast);

				this.mCarouselItems.each(function ()
				{
					var theCurrentItem = $(this);

					theCurrentItem.data("targetLeft", theCurrentItem.data("targetLeft") + (theThis.mCarouselContainer.children().first().width() + theThis.mCalculatedMargin));

					theCurrentItem.animate({left: theCurrentItem.data("targetLeft")}, 300, function ()
					{
						theThis.mIsAnimating = false;

						if(theThis.mSlideshow)
							theThis.setSlideshowTimeout();
					});
				});

				if(theThis.mAutoHeight && theLast != null && theLast.height() > 0)
				{
					var theTargetHeight = theLast.height();

					if(theThis.mCarouselControlsContainer != null)
						theTargetHeight += theThis.mCarouselControlsContainer.height();

					theThis.mCarouselObject.animate({height: theTargetHeight}, 300).css("overflow", "visible");
				}
			}
			else
			{
				var theNextItem = theFirst;

				this.mCarouselItems.each(function ()
				{
					var theCurrentItem = $(this);

					theCurrentItem.data("targetLeft", theCurrentItem.data("targetLeft") - (theNextItem.width() + theThis.mCalculatedMargin));

					theCurrentItem.animate({left: theCurrentItem.data("targetLeft")}, 300, function ()
					{
						thePosition = theLast.position().left + theLast.width() + theThis.mCalculatedMargin;

						theFirst.css("left", thePosition + "px");
						theFirst.data("targetLeft", thePosition);
						theThis.mCarouselContainer.append(theFirst);

						if(theThis.mSlideshow)
							theThis.setSlideshowTimeout();

						theThis.mIsAnimating = false;
					});
				});

				if(theThis.mAutoHeight)
				{
					var theTargetHeight = theThis.mCarouselContainer.children().eq(1).height();

					if(theThis.mCarouselControlsContainer != null)
						theTargetHeight += theThis.mCarouselControlsContainer.height();

					theThis.mCarouselObject.animate({height: theTargetHeight}, 200).css("overflow", "visible");
				}
			}
		},

		fitSliderHeight: function ()
		{
			if(this.mFitSliderHeight && !this.mAutoHeightIsAnimating)
			{
				var theThis = this,
					theTallestHeight = 0,
					theAllItemsInitialized = true;

				this.mCarouselContainer.children().each(function ()
				{
					// Check if current item is initialized
					if($(this).width() < 1)
					{
						theAllItemsInitialized = false;
						return;
					}

					if($(this).outerHeight() > theTallestHeight)
						theTallestHeight = $(this).outerHeight();
				});

				if(theAllItemsInitialized)
				{
					if(this.mCarouselControlsContainer != null)
						theTallestHeight += this.mCarouselControlsContainer.outerHeight();

					theTallestHeight = Math.ceil(theTallestHeight);

					if(theTallestHeight != parseInt(this.mCarouselObject[0].style.height))
					{
						this.mAutoHeightIsAnimating = true;

						this.mCarouselObject.animate({height: theTallestHeight}, 200, function ()
						{
							theThis.mAutoHeightIsAnimating = false;
						}).css("overflow", "visible");

						// Re-initialze spacers.
						$.fn.initializeSpacers({ resize: true });
					}

					if ($('html').hasClass('threedotfive'))
					{
						var itemHeight = theTallestHeight;

						if (this.mCarouselControlsContainer != null)
							itemHeight -= this.mCarouselControlsContainer.outerHeight();

						this.mCarouselContainer.children().each(function()
						{
							if (parseInt($(this).find('.contentBlock').css('min-height')) != itemHeight)
								$(this).find('.contentBlock').css({ 'min-height': itemHeight });
						});
					}
				}
				else
				{
					setTimeout(function () { theThis.fitSliderHeight(); }, 100);
				}
			}
		},

		calculateMargin: function ()
		{
			if(this.mCarouselContainer.children().length > 1)
				this.mCalculatedMargin = this.mCarouselContainer.children().eq(1).position().left - (this.mCarouselContainer.children().first().position().left + this.mCarouselContainer.children().first().width());
			else
				return 0;
		},

		onInterval: function ()
		{
			var theThis = this;

			if(this.mInitComplete && !this.mIsAnimating)
			{
				if(this.mAutoHeight && !this.mAutoHeightIsAnimating)
				{
					var theTargetObject = theThis.mCarouselContainer.children().first();

					if(theTargetObject.height() != theThis.mCarouselObject.height())
					{
						var theTargetHeight = theTargetObject.outerHeight();

						if(theThis.mCarouselControlsContainer != null)
							theTargetHeight += theThis.mCarouselControlsContainer.outerHeight();

						this.mAutoHeightIsAnimating = true;

						this.mCarouselObject.animate({height: theTargetHeight}, 200, function ()
						{
							theThis.mAutoHeightIsAnimating = false;
						}).css("overflow", "visible");
					}
				}
			}

			this.fitSliderHeight();
		},

		onResize: function ()
		{
			var theThis = this;

			if(theThis.mItemWidth != null)
			{
				clearTimeout(this.mResizeTimeout);
				this.mResizeTimeout = setTimeout(function ()
				{
					if(theThis.mItemWidth.indexOf("%") > -1)
					{
						if($.fn.viewport().width > 768)
							theThis.mCarouselItems.outerWidth(Math.round(theThis.mCarouselObject.width() * (parseFloat(theThis.mItemWidth) / 100)));
						else
							theThis.mCarouselItems.outerWidth(Math.round(theThis.mCarouselObject.width()));
					}
					else
						theThis.mCarouselItems.outerWidth(parseInt(theThis.mItemWidth));

					theThis.mCarouselItems.find("iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='demediahub.nl'], iframe[src*='pano.autodesk.com']").setVideoFrameSize();

					theThis.mCarouselItems.css({position: "relative", left: "auto"});
					theThis.updateContainerWidth();

					theThis.mCarouselContainer.children().each(function()
					{
						$(this).find('.contentBlock').css('min-height', '0');
					});

					if(!theThis.mInitComplete)
						theThis.resumeInit();
					else
					{
						theThis.initItems();

						setCarouselImages(theThis.mCarouselObject);

						theThis.fitSliderHeight();

						theThis.toggleButtons();
					}
				}, 200);
			}
		},

		addListeners: function ()
		{
			var theThis = this;

			if (this.mButtonLeft != null) {
				this.mButtonLeft.click(function (e) {
					e.preventDefault();

					theThis.clearSelection();

					theThis.animateTo("previous");
				});
			}

			if (this.mButtonRight != null) {
				this.mButtonRight.click(function (e) {
					e.preventDefault();

					theThis.clearSelection();

					theThis.animateTo("next");
				});
			}
		},

		clearSelection: function ()
		{
			if (window.getSelection)
			{
				if (window.getSelection().empty)
				{  // Chrome
					window.getSelection().empty();
				}
				else if (window.getSelection().removeAllRanges)
				{  // Firefox
					window.getSelection().removeAllRanges();
				}
			}
			else if (document.selection)
			{  // IE?
				document.selection.empty();
			}
		},

		setDelay: function (aDelay)
		{
			this.mSlideshowDelay = parseInt(aDelay);

			if(this.mSlideshow)
				this.setSlideshowTimeout();
		},

		autoPlay: function (aBool)
		{
			var theThis = this;

			// Make sure it will be done after inti
			if(!this.mInitComplete)
			{
				setTimeout(function () { theThis.autoPlay(aBool); }, 40);
				return;
			}

			if(typeof aBool == "undefined" || aBool == null)
				return this.mSlideshowAutoPlay;

			this.mSlideshowAutoPlay = aBool;

			if(aBool)
				this.play();
			else
				this.pause();

			return this;
		},

		// Handlers
		complete: function (aHandler) {
			if (typeof aHandler == "undefined") {
				for (var theIndex in this.mCompleteHandlers) {
					this.mCompleteHandlers[theIndex](this, "complete");
				}
			}
			else if (typeof aHandler == "function") {
				this.mCompleteHandlers.push(aHandler);

				if (this.mInitComplete)
					aHandler(this, "complete");
			}

			return this;
		}
	};

	theReturnObject.init(aObject);

	return theReturnObject;
};

function setCarouselImages(aCarouselObject)
{
	var theImages = aCarouselObject.find(".updateImage img");
	aCarouselObject.find(".nailthumb-container").css({ width: "", height: "" });

	theImages.each(function ()
	{
		setCurrentCarouselImage($(this));
	});
}

function setCurrentCarouselImage(aObject)
{
	if (aObject.height() > 0)
	{
		var thumbnailHeight = settings.images.widgetImageHeight;

		// Thumbnail size.
		if (aObject.parents(".small").length > 0 || aObject.parents(".mini").length > 0)
		{
			thumbnailHeight = settings.images.smallThumbnailHeight;
		}

		aObject.nailthumb(
		{
			preload: false,
			nostyle: true,
			height: thumbnailHeight,
			fitDirection: "center center",
			maxEnlargement: 1
		});
	}
	else
	{
		setTimeout(function () { setCurrentCarouselImage(aObject) }, 200);
	}
}

