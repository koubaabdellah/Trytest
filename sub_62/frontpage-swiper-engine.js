(function ($) {
    var Engine = jQuery.CBPEngine;
    Engine.frontpage_swiper_setup = function() {
        /**
         * Homepage en case swipert
         */

        if($('#slider .swiper-container').exists() &&  ($( window ).width() > 730 || $("html").hasClass("lt-ie9") ) ) {
            var initial_slide = 0;
            var set_slidesPerView = function() {

                if($(window).width() > 1000) {
                    return 'auto';
                }
                return 'auto'
            };
            $('#slider .swiper-container .swiper-slide').each(function(idx, el) {
                if($(el).hasClass("initial-slide")) {
                    initial_slide = idx;
                }
            });
            var homepage_swiper = $('#slider .swiper-container').swiper({
                mode: 'horizontal',
                loop: false,
                calculateHeight: true,
                centeredSlides: true,
                slidesPerView: set_slidesPerView(),
                initialSlide: initial_slide,
                resizeReInit: false,

                onSlideChangeEnd: function(swiper) {
                    if(swiper.activeIndex == 0) {
                        $('#slider .next').show();
                        $('#slider .prev').hide();
                    } else if(swiper.activeIndex == (swiper.slides.length - 1)) {
                        $('#slider .next').hide();
                        $('#slider .prev').show();
                    } else {
                        $('#slider .next').show();
                        $('#slider .prev').show();
                    }
                },
                onSwiperCreated: function(swiper) {
                    if(swiper.activeIndex == 0) {
                        $('#slider .next').show();
                        $('#slider .prev').hide();
                    } else if(swiper.activeIndex == (swiper.slides.length - 1)) {
                        $('#slider .next').hide();
                        $('#slider .prev').show();
                    } else {
                        $('#slider .next').show();
                        $('#slider .prev').show();
                    }


                }
            });

            Engine.swipers['homepage_swiper'] = homepage_swiper;

            $('#slider .next').on('click', function(e) {
                e.preventDefault();
                Engine.swipers.homepage_swiper.swipeNext();
            });
            $('#slider .prev').on('click', function(e) {
                e.preventDefault();
                Engine.swipers.homepage_swiper.swipePrev();
            });
        }
    }

})(jQuery);
