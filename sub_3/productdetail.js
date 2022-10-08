function checkTitleHaveName() {
    var title = document.title;
    var product_name = jQuery("#product-name").text();
    if (typeof product_name !== typeof undefined && title.indexOf("| ") == 0) {
        document.title = product_name + " " + title;
    }
    if (jQuery(".product-not-found").length > 0) {
        document.title = "Product not found " + title;
    }
}

function showAddCartPopUp(response) {
    jQuery("#add-to-cart-refresh").addClass("d-none");
    if (response.error == "101") {
        jQuery("#add-to-cart-view-cart").addClass("d-none");
        jQuery("#add-to-cart-refresh").removeClass("d-none");
    }
    if (jQuery("#addToCartPopup").hasClass("in")) {
        jQuery("#addToCartPopup").modal("hide");
    }
    var message = response.message;
    var badge_class = 'badge-warning';
    //removew badge classes and product name
    jQuery("#add-to-cart-product-name").html("");
    jQuery("#add-to-cart-badge").removeClass("badge-warning");
    jQuery("#add-to-cart-badge").removeClass("badge-success");

    if (response.success) {
        //var message = "Product has been added in your cart successfully.";
        var badge_class = 'badge-success';
        /* Add product name*/
    }
    jQuery("#add-to-cart-product-name").html(response.product_name);
    /* Add badge class */
    jQuery("#add-to-cart-badge").addClass(badge_class);
    /* Add message */
    jQuery("#add-to-cart-badge").html(message);
    /* View cart link*/
    jQuery("#add-to-cart-view-cart").attr("href", response.web_url);
    jQuery("#addToCartPopup").modal("show");
    getCartData();
}

function addOwlSlider() {
    if (jQuery('.owlslider-main').length) {
        jQuery('.owlslider-main').owlCarousel({
            rtl: (is_arabic_store ? true : false),
            loop: false,
            nav: true,
            margin: 10,
            // animateIn: 'fadeIn',
            // animateOut: 'fadeOut',
            autoplay: false,
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

        jQuery('.owlslider-thumb').owlCarousel({
            rtl: (is_arabic_store ? true : false),
            loop: false,
            nav: true,
            margin: 5,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 5
                },
                600: {
                    items: 7
                },
                960: {
                    items: 5
                },
                1200: {
                    items: 5
                }
            }
        });
    }
}

function addBxSlider() {
    jQuery.noConflict();

    if (jQuery('.bxslider-main').length) {
        jQuery('.bxslider-main').bxSlider({
            mode: 'horizontal',
            minSlides: 1,
            infiniteLoop: false,
            maxSlides: 1,
            slideWidth: 500,
            pager: false,
            auto: false,
            slideMargin: 10,
            hideControlOnEnd: true
        });
        jQuery('.bxslider-thumb').bxSlider({
            mode: 'horizontal',
            minSlides: 1,
            infiniteLoop: false,
            maxSlides: 4,
            slideWidth: 60,
            pager: false,
            auto: false,
            slideMargin: 5,
            hideControlOnEnd: true
        });
        if (jQuery("#product-main-images ul li").size() <= 1) {
            jQuery("#product-main-images .bx-controls").hide();
        }
        if (jQuery("#product-thumb-images ul li").size() <= 4) {
            jQuery("#product-thumb-images .bx-controls").hide();
        }

    }
}

function addSlickSlider() {
    jQuery('#product-main-img').slick({
        infinite: true,
        speed: 300,
        dots: false,
        arrows: true,
        fade: true,
        asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    jQuery('#product-imgs').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: 0,
        vertical: false,
        asNavFor: '#product-main-img',
        responsive: [{
                breakpoint: 991,
                settings: {
                    vertical: false,
                    arrows: false,
                    dots: true,
                }
            },
        ]
    });
}

function relatedProductCrowsel() {
    if (jQuery("#related-products-carousel").length) {
        jQuery("#related-products-carousel").owlCarousel({
            rtl: (is_arabic_store ? true : false),
             loop: true,
            margin: 30,
             lazyLoad: true,
            dots: false,
            nav: true,
            responsive: {
                  0: {
                        items: 2,
                        margin: 10
                  },
                  768: {
                        items: 3,
                        margin: 10
                  },
                  992: {
                        items: 4
                  } 
            }
        });
    }
}

function alsoViewedProductCrowsel() {
    if (jQuery("#also-viewed-products-carousel").length) {
        jQuery("#also-viewed-products-carousel").owlCarousel({
            rtl: (is_arabic_store ? true : false),
            loop: false,
            rewind: true,
            nav: true,
            margin: 40,
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
    }
}

function fancyboxGallery() {
    jQuery('[data-fancybox="gallery"],[data-fancybox="gallery-thumb"]').fancybox({
        // Options will go here
        toolbar: true,
        buttons: [
            //"zoom",
            //"share",
            //"slideShow",
            //"fullScreen",
            //"download",
            "close"
        ],
        loop: true
    });
    addOwlSlider();
    relatedProductCrowsel();
    addBxSlider();
}

function checkCustomerProductReview(product_id) {
    if (jQuery("#review-form").length < 0) {
        return;
    }
    jQuery.ajax({
        url: jQuery("#product-reviews").attr('data-check-url'),
        type: 'post',
        data: {product_id: product_id},
        dataType: 'json',
        success: function (response) {
            if (response.has_review) {
                jQuery("#review-form-container").remove();
            }
        }
    });
}

function fetchProductReviewAvg() {
    return false;
    var review_product_id = jQuery("#p_full_id").val();
    if (review_product_id != '') {
        if (review_product_id != parseInt(review_product_id)) {
            review_product_id = '';
        }
    }
    if (review_product_id == '') {
        setTimeout(function () {
            fetchProductReviewAvg();
        }, 1000);
        return;
    }
    checkCustomerProductReview(review_product_id);
    jQuery.ajax({
        url: jQuery("#product-reviews").attr('data-avg-url'),
        type: 'post',
        data: {review_product_id: review_product_id},
        success: function (response) {
            jQuery("#review_avg").append(response);
        }
    });
}

function fetchProductReviews(page, review_sort_by) {
    return false;
    var product_id = jQuery("#p_full_id").val();
    if (product_id == '') {
        setTimeout(function () {
            fetchProductReviews(page, review_sort_by);
        }, 1000);
        return;
    }

    jQuery.ajax({
        url: jQuery("#product-reviews").attr('data-url'),
        dataType: 'json',
        type: 'post',
        data: {page: page, product_id: product_id, sort_by: review_sort_by},
        success: function (response) {
            if (jQuery("#product-reviews").hasClass("has-reviews")) {
                if (response.success) {
                    jQuery("#product-reviews").append(response.html);
                }
            } else {
                jQuery("#product-reviews").html(response.html);
            }

            jQuery('#loader-dots').hide();
            if (response.total_review) {
                var total_fetched_review = jQuery(".product-review-list-item").length;
                total_fetched_review = parseInt(total_fetched_review);
                var total_review = parseInt(response.total_review);
                if (total_review > total_fetched_review) {
                    jQuery(".load_more").show();
                } else {
                    jQuery(".load_more").hide();
                }
            }
            if (response.load_more) {
                jQuery('.load_more').attr("data-page", response.load_more);
            }
            jQuery("#product-reviews").addClass("has-reviews");
            jQuery('.uploaded-images ul').niceScroll({
                cursorborder: "",
                cursorcolor: "#FBD46A",
                boxzoom: false,
                cursorwidth: "3px",
                autohidemode: true,
                emulatetouch: true,
                cursordragontouch: true,
                touchbehavior: true,
                preventmultitouchscrolling: false,
                horizrailenabled: true
            });
            jQuery('.user-review-img').niceScroll({
                cursorborder: "",
                cursorcolor: "#FBD46A",
                boxzoom: false,
                cursorwidth: "3px",
                autohidemode: true,
                emulatetouch: true,
                cursordragontouch: true,
                touchbehavior: true,
                preventmultitouchscrolling: false,
                horizrailenabled: true
            });
        },
        error: function () {
            jQuery('#loader-dots').hide();
            // hideLoaderImage();
        }
    });
}

function fetchProductReviewsSidebar() {
    return false;
    var product_id = jQuery("#p_full_id").val();
    if (product_id == '') {
        setTimeout(function () {
            fetchProductReviewsSidebar();
        }, 1000);
        return;
    }
    jQuery.ajax({
        url: jQuery("#product-reviews").attr('data-sidebar-url'),
        type: 'post',
        data: {product_id: product_id},
        success: function (response) {
            jQuery(".customer-reviews").append(response);
        },
        error: function () {
            jQuery('#loader-dots').hide();
            // hideLoaderImage();
        }
    });
}

jQuery(document).on("click", ".customer-review-sort-by", function () {
    review_sort_by = jQuery(this).attr("data-id");
    review_page = 1;
    var review_sort_by_text = jQuery(this).text();
    jQuery("#review-dropdown").html(review_sort_by_text);
    jQuery("#product-reviews").html('');
    jQuery("#product-reviews").removeClass("has-reviews");
    getCustomerReviews();
});
jQuery(document).on("click", ".continue-shipping,.close-cart-popup", function () {
    jQuery("#addToCartPopup").modal("hide");
    if (jQuery(".add-to-cart-popup").length > 0) {
        jQuery(".add-to-cart-popup").remove();

    }
});
jQuery(document).on("click", ".view-cart-and-checkout", function () {
    showLoaderImage();
    if (jQuery(".add-to-cart-popup").length > 0) {
        jQuery(".add-to-cart-popup").remove();
    }
});
jQuery(document).on('keyup keypress', '#product_addtocart_form,#addtowishlist_product_form', function (e) {
    var keyCode = e.keyCode || e.which;
    if ((keyCode == '13' || keyCode == '32') && !jQuery(document.activeElement).is('textarea')) {
        e.preventDefault();
        return false;
    }
    if (keyCode == '27') {
        hideLoaderImage();
        if (jQuery(".add-to-cart-popup").length > 0) {
            jQuery(".add-to-cart-popup").remove();
        }
    }
});
jQuery(document).on('submit', "#addtowishlist_product_form", function () {
    showLoaderImage();
});
jQuery(document).on("submit", "#review-form", function (e) {
    e.preventDefault();
    var error = false;
    /*if (!jQuery(this).valid()) {
     return false;
     }*/
    if (jQuery("#nickname_field").val() == "") {
        jQuery("#nickname-error").removeClass('d-none');
        error = true;
    } else {
        jQuery("#nickname-error").addClass('d-none');
    }
    if (jQuery.trim(jQuery("#review_field").val()) == '') {
        jQuery("#review_detail-error").removeClass('d-none');
        error = true;

    } else {
        jQuery("#review_detail-error").addClass('d-none');
    }
    var g_recaptcha_response_id = jQuery("#review-form .g-recaptcha-response").attr('id');
    var opt_widget_id = (g_recaptcha_response_id == 'g-recaptcha-response') ? '0' : g_recaptcha_response_id.replace("g-recaptcha-response-", "");
    if (grecaptcha.getResponse(opt_widget_id) == "") {
        jQuery("#review-form #recaptcha-error").removeClass('d-none');
        error = true;
    } else {
        jQuery("#review-form #recaptcha-error").addClass('d-none');

    }

    if (jQuery("#review_product_id").val() == "") {
        jQuery("#review_product_id").val(jQuery("#p_full_id").val());
    }

    if (error) {
        return false;
    }

    showLoaderImage();
    var data = jQuery(this).serialize();
    jQuery.ajax({
        url: jQuery(this).attr('action'),
        dataType: 'json',
        type: 'post',
        data: data,
        success: function (response) {
            if (response.success) {
                getReviewForm(true);
                jQuery('#review-form-fields').remove();
                jQuery('#review-form-buttons').remove();
                jQuery('#rating-input').rating('refresh', {disabled: true});
                jQuery('#review-submit-msg').removeClass('text-danger').addClass('text-success');
            } else {
                jQuery('#review-submit-msg').addClass('text-danger').removeClass('text-success');
            }

            jQuery('#review-submit-msg').text(response.message);
            hideLoaderImage();
        },
        error: function () {
            hideLoaderImage();
        }
    });
});


jQuery(document).on('click', '#total-reviews,#write-a-review', function (e) {
    scrollToReviewSection();
});

jQuery(document).on('click', '#write-customer-review', function (e) {
    scrollToReviewSection();
});

function scrollToReviewSection() {
    jQuery("#review_form").removeClass("d-none");
    if (jQuery("#review_form").attr("class").indexOf("d-none") == -1) {
        var rvPosition = document.body.scrollTop + jQuery("#review_form").offset().top;
        jQuery("html, body").animate({scrollTop: rvPosition - 200}, 1500);
    }
}

jQuery('body').on('click', '.load-more-review', function (e) {
    e.preventDefault();
    review_page = jQuery(this).attr('data-page');
    review_sort_by = jQuery(this).attr('data-review-sort-by');
    jQuery(this).remove();
    getCustomerReviews();
});
jQuery('body').on('submit', '#review_search', function (e) {
    e.preventDefault();
    review_page = 1;
    jQuery("#product-reviews").html('');
    review_search_text = jQuery("#review-search-text").val();
    getCustomerReviews();
});


jQuery(document).ready(function () {
    checkTitleHaveName();
});

jQuery(window).bind("pageshow", function (event) {
    if (event.originalEvent.persisted) {
        window.location.reload();
    }
});


/* === Reload Product Thumbs slider===*/
function reloadProductThumbs() {
    jQuery("#product-thumb-images .owlslider-thumb").owlCarousel({
        items: 2,
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
}
/* === Reload Product Images slider===*/
function reloadProductImages() {
    jQuery("#product-main-images .owl-carousel.owlslider-main").owlCarousel({
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
}
/* === Reload Related Product Images slider===*/
function reloadRelatedCrowsel() {
    jQuery("#related-products-carousel").owlCarousel({
        rtl: (is_arabic_store ? true : false),
         loop: true,
        margin: 30,
         lazyLoad: true,
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
}

function reloadAlsoViewedCrowsel() {
    jQuery("#also-viewed-products-carousel").owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        rewind: true,
        nav: true,
        dots: false,
        margin: 15,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            767: {
                items: 3
            },
            991: {
                items: 4
            },
            1200: {
                items: 5
            }
        }

    });
}


/* === Reload Product ninja slider===*/
function reloadNinjaSlider() {
    nsOptions =
            {
                sliderId: "ninja-slider",
                transitionType: "fade", //"fade", "slide", "zoom", "kenburns 1.2" or "none"
                autoAdvance: false,
                delay: "default",
                transitionSpeed: 700,
                aspectRatio: "2:1",
                initSliderByCallingInitFunc: false,
                shuffle: false,
                startSlideIndex: 0, //0-based
                navigateByTap: true,
                pauseOnHover: false,
                keyboardNav: true,
                before: function (currentIdx, nextIdx, manual) {
                    if (manual && typeof mcThumbnailSlider != "undefined")
                        mcThumbnailSlider.display(nextIdx);
                },
                //license: "b2e981"
            };

    nslider = new NinjaSlider(nsOptions);
}

/* === Reload Product thumb slider===*/
function reloadThumbSlider() {
    thumbnailSliderOptions =
            {
                sliderId: "thumbnail-slider",
                orientation: "vertical",
                thumbWidth: "80px",
                thumbHeight: "80px",
                showMode: 2,
                autoAdvance: false,
                selectable: true,
                slideInterval: 3000,
                transitionSpeed: 900,
                shuffle: false,
                startSlideIndex: 0, //0-based
                pauseOnHover: true,
                initSliderByCallingInitFunc: false,
                rightGap: 0,
                keyboardNav: false,
                mousewheelNav: true,
                before: function (currentIdx, nextIdx, manual) {
                    if (typeof nslider != "undefined")
                        nslider.displaySlide(nextIdx);
                },
                //license: "mylicense"
            };

    mcThumbnailSlider = new ThumbnailSlider(thumbnailSliderOptions);
}


function reloadSlikSlider(slide = 0) {
    jQuery('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: slide,
        arrows: true,
        infinite: false,
        fade: false,
        asNavFor: '.slider-nav',
        rtl: (is_arabic_store ? true : false)
    });
    jQuery('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        vertical: true,
        arrows: true,
        asNavFor: '.slider-for',
        dots: false,
        focusOnSelect: true,
        verticalSwiping: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    rtl: (is_arabic_store ? true : false)
                }
            },
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    slidesToScroll: 1,
                    verticalSwiping: false,
                    rtl: (is_arabic_store ? true : false)
                }
            },
            {
                breakpoint: 580,
                settings: {
                    vertical: false,
                    slidesToScroll: 1,
                    verticalSwiping: false,
                    slidesToShow: 4,
                    rtl: (is_arabic_store ? true : false)
                }
            },
            {
                breakpoint: 380,
                settings: {
                    vertical: false,
                    slidesToScroll: 1,
                    verticalSwiping: false,
                    slidesToShow: 3,
                    rtl: (is_arabic_store ? true : false)
                }
            }
        ]
    });
    var slider_ini = jQuery('.slider-nav').attr("class");
    if (slider_ini != undefined && slider_ini.indexOf("slick-initialized") == -1) {
        setTimeout(function () {
            reloadSlikSlider();
        }, 500);
    }

    jQuery('[data-fancybox="gallery"],[data-fancybox="gallery-thumb"]').fancybox({
        // Options will go here
        toolbar: true,
        buttons: [
            "close"
        ],
        loop: false,
        afterClose: function (instance, slide) {
            jQuery('.slider-for').slick('unslick');
            jQuery('.slider-nav').slick('unslick');
            reloadSlikSlider(parseInt(slide.pos));
        }
    });
}

function recaptchaSuccess(response) {
    if (response == "") {
        jQuery("#recaptcha-error").removeClass('d-none');
    } else {
        jQuery("#recaptcha-error").addClass('d-none');
    }
}

jQuery(document).on('keyup', '#nickname_field,#review_field', function () {

    var fieldVal = jQuery.trim(jQuery(this).val());

    if (fieldVal == '') {
        jQuery(this).next().removeClass('d-none');
    } else {
        jQuery(this).next().addClass('d-none');


    }

});
function reloadCustomerReviewNiceScroll() {
    try {
        jQuery(".uploaded-images").mCustomScrollbar({
            axis: "x",
            theme: "light-3",
            advanced: {
                autoExpandHorizontalScroll: true
            }
        });
    } catch (error) {

    }

}

