(function ($) {
    var Engine = jQuery.CBPEngine;
    Engine.frontpage_subjects_swiper_setup = function() {
        /**
         * Homepage en case swipert
         */

        /**
         * Homepage subjects swiper
         */
        var HomeSubjectsSwiper = {};
        if($("#frontpage-subjects-slider .swiper-container").exists()) {
            var subject_swiper_dom = $("#frontpage-subjects-slider");
            var next_btn = subject_swiper_dom.find('.next');
            var prev_btn = subject_swiper_dom.find('.prev');
            var slidernavigation = function(swiper) {
                    if(swiper.activeIndex == 0) {
                        next_btn.show();
                        prev_btn.hide();
                    } else if ($('.swiper-container.subjects .swiper-slide:last-child').hasClass('swiper-slide-visible')) {
                        next_btn.hide();
                        prev_btn.show();
                    } else {
                        next_btn.show();
                        prev_btn.show();
                    }
            };
            var hpsubjects_swiper = $("#frontpage-subjects-slider .swiper-container").swiper({
                mode:'horizontal',
                loop: false,
                calculateHeight: true,
                centeredSlides: false,
                slidesPerView: 'auto',
                resizeReInit: false,
                visibilityFullFit: true,
                onSlideChangeEnd: function() {
                    slidernavigation(HomeSubjectsSwiper);
                },
                onTouchEnd: function() {
                    slidernavigation(HomeSubjectsSwiper);
                },
                onSwiperCreated: function(swiper) {

                    HomeSubjectsSwiper = swiper;

                    if(subject_swiper_dom.find('.swiper-wrapper').eq(0).width() < subject_swiper_dom.find('.swiper-container').eq(0).width()) {
                        next_btn.hide();
                        prev_btn.hide();
                    } else if(swiper.activeIndex == 0) {
                        next_btn.show();
                        prev_btn.hide();
                    } else if(swiper.activeIndex == (swiper.slides.length - 1)) {
                        next_btn.hide();
                        prev_btn.show();
                    } else {
                        next_btn.show();
                        prev_btn.show();
                    }
                }
            });
            Engine.swipers['hpsubjects_swiper'] = hpsubjects_swiper;
            $('#main-content .slider-nav .next').on('click', function(e) {
                e.preventDefault();
                Engine.swipers.hpsubjects_swiper.swipeNext();
            });
            $('#main-content .slider-nav .prev').on('click', function(e) {
                e.preventDefault();
                Engine.swipers.hpsubjects_swiper.swipePrev();
            });
        }
    }

})(jQuery);
