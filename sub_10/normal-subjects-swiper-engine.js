(function ($) {
    var Engine = jQuery.CBPEngine;
    Engine.main_subject_swiper_setup = function() {


        if($("#subjects-container.swiper-container").exists()) {
            var subjects_swiper_container = $("#subjects-container.swiper-container").eq(0);
//            var subject_slides = [];
//            $("#subjects-container.swiper-container .swiper-slide").each(function(idx, el) {
//                subject_slides[$(this).index()] = el;
//            });

            var activeSlide = 0;
            subjects_swiper_container.find(".swiper-slide" ).each(function( index ) {
                if($(this).hasClass('cbp-start')) {
                    $(this).addClass('active');
                    activeSlide = index;
                }
            });

            var subject_swiper_settings = {
                mode:'horizontal',
                loop: false,
                calculateHeight: true,
                centeredSlides : true,
                slidesPerView: set_slidesPerView(),
                resizeReInit:false,
                slideActiveClass: 'active',
                initialSlide: activeSlide,
                queueEndCallbacks: true,
                //useCSS3Transforms: false,
                simulateTouch: false,
                onSlideChangeStart: function(swiper) {
                    $(".search-box input").blur();
                },
                onSwiperCreated: function(swiper) {
                    Engine.setupStickyFooter();
                },
                onInit: function(swiper) {
                    custom_onslide_init(swiper);
                    Engine.setupStickyFooter();
                },
                onSlideChangeEnd: function(swiper) {
                    custom_onslide_change_end(swiper);
                }
            };

            if(typeof(Engine.swipers['subject_swiper']) !== "undefined") {

                Engine.swipers['subject_swiper'].destroy(true);
                delete Engine.swipers['subject_swiper'];
                $('#subjects-container').unbind('click.subject-slider');
            }


            $(window).on('resize', function() {
                resize_subject_slides();
            });

            function resize_subject_slides() {
                if($( window ).width() < 1250) {
                    subjects_swiper_container.find('.swiper-slide').css('width',$( window ).width());
                } else {
                    subjects_swiper_container.find('.swiper-slide').css('width',1250);
                }
            }
            resize_subject_slides();


            //var subject_swiper = $('#subjects-container.swiper-container').swiper(subject_swiper_settings);



            var subject_swiper = subjects_swiper_container.swiper(subject_swiper_settings);

            Engine.swipers['subject_swiper'] = subject_swiper;


//            if(typeof Drupal !== 'undefined') {
//                subject_swiper.settings.onSlideChangeEnd = function(swiper) {
//                    Drupal.behaviors.topicSlider.moveSlide(swiper, subject_swiper, Drupal.settings, true);
//                };
//                subject_swiper.onInit = function(swiper) {
//                    //Drupal.behaviors.topicSlider.onSwiperCreated(swiper, $('#subjects-container.swiper-container'), Drupal.settings);
//                    Engine.setupStickyFooter();
//                };
//            }





            $('#subjects-container').on('click.subject-slider', '.slider-nav .prev', function(e) {
                e.preventDefault();
                subject_swiper.swipePrev();
            });
            $('#subjects-container').on('click.subject-slider', '.slider-nav .next', function(e) {
                e.preventDefault();
                subject_swiper.swipeNext();
            });
//            $('#subjects-container').on('click.subject-slider', '.slider-nav .next', function(e) {
//                console.log('next');
//                console.log( Engine.swipers.subject_swiper.activeIndex);
//                e.preventDefault();
//                Engine.swipers.subject_swiper.swipeNext();
//            });
        }
    }
    var set_slidesPerView = function() {
        if($(window).width() > 1280) {
            return 'auto';
        }
        return 'auto';
    };

    var custom_onslide_change_end = function(swiper) {

        if(typeof Drupal !== 'undefined') {
           Drupal.behaviors.topicSlider.moveSlide(swiper, $("#subjects-container.swiper-container"), Drupal.settings, true);
        }

    };
    var custom_onslide_init = function(swiper) {
        if(typeof Drupal !== 'undefined') {
            Drupal.behaviors.topicSlider.init(swiper, $("#subjects-container.swiper-container"), Drupal.settings);
            Drupal.behaviors.topicSlider.moveSlide(swiper, $("#subjects-container.swiper-container"), Drupal.settings, true);
        }
    };



})(jQuery);
