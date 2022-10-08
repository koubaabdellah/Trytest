/*--
 Slider Horizontal
 ------------------------*/
$(document).ready(function () {

    $('.owl-carousel.owlslider-main').owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: true,
        margin: 20,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /*--
     Slider Vertical
     ------------------------*/
    $(".owlslider-thumb").owlCarousel({
        items: 4,
        loop: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        rewind: true,
        autoplay: true,
        margin: 10,
        dots: false,
        nav: true
    });
    /*--
     Product Slider
     ------------------------*/
    $(".owl-carousel.owlslider-product-slider").owlCarousel({
        rtl: (is_arabic_store ? true : false),
          loop: true,
        margin: 30,
         
        dots: false,
        nav: true,
        responsive: {
              0: {
                    items: 2,
                    margin: 10
              },
              767: {
                    items: 3,
                    margin: 10
              },
              992: {
                    items: 4
              } 
        }

    });

    /*--
     Brand Slider
     ------------------------*/
    $(".owl-carousel.owlslider-brand-slider").owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        rewind: true,
        nav: true,
        dots: false,
        margin: 15,
        lazyLoad: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            960: {
                items: 5
            },
            1200: {
                items: 5
            }
        }

    });

    /*--
     Shop Category Slider
     ------------------------*/
    $(".owl-carousel.owlslider-shop-category-slider").owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        autoplay: true,
        rewind: true,
        nav: false,
        dots: false,
        margin: 30,
        lazyLoad: true,
        responsive: {
           0: {
                    items: 1,
                    margin:0
                },
                480: {
                    items: 2,
                    margin: 10
                },
                768: {
                    items: 3,
                    margin:10
                },
                1024: {
                    items: 4
                },
                1366: {
                    items: 5
                },
                1600: {
                    items: 6
                }
        }

    });


    /*--
     Shop Category Slider
     ------------------------*/
    $(".owl-carousel.owlslider-category-page-main-slider").owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        rewind: true,
        nav: false,
        dots: true,
        margin: 0,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            960: {
                items: 1
            },
            1200: {
                items: 1
            }
        }

    });


    /*--
     Country Slider
     ------------------------*/
    $(".owl-carousel.owlslider-country-slider").owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        rewind: true,
        margin: 5,
        lazyLoad: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            960: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    });

    /*--
     Ubuy Core Values
     ------------------------*/
    $(".owl-carousel.ubuy-core-values").owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        rewind: true,
        dots: false, nav: true,
        margin: 15,
        lazyLoad: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            960: {
                items: 4
            },
            1200: {
                items: 4
            }
        }

    });
});

