jQuery(document).ready(function () {

    jQuery('.usp-slider').owlCarousel({
       rtl: (is_arabic_store ? true : false),
        loop: false,
        nav: false,
        dots: true,
        items:5,
       
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            991: {
                items: 4,
                autoplay:true,
                autoplayTimeout:8000,
                autoplayHoverPause:true
            },
            1300: {
                items: 5
            }
        }
    });

 jQuery(".owlslider-shop-category-slider").owlCarousel({
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
                        margin:10
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



     jQuery('.doodle-slider').owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: true,
        nav: false,
        dots: true,

        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        items:1,
      autoplay:false,
      autoplayTimeout:8000,
      autoplayHoverPause:true
    });

     
    jQuery('.country-flag-slider').owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        nav: true,
        margin: 7,
        dots: false,
        responsive: {
            0: {
                items: 4
            },
            390: {
                items: 5
            },
            600: {
                items: 5
            },
            991: {
                items: 5
            },
            1200: {
                items: 8
            }
        }
    });

    setTimeout(function () {
        jQuery('.country-flag-slider').trigger("to.owl.carousel", [5, 500]);
    }, 500);

    setTimeout(function () {
        var to_owl = jQuery('.country-flag-slider').find('li.active-store').parent().index();
        jQuery('.country-flag-slider').trigger("to.owl.carousel", [to_owl, 500, true]);
    }, 2000);



    
    jQuery('.owl-review').owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        autoplay: true,
        nav: false,
        margin: 10,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            390: {
                items: 1
            },
            600: {
                items: 1
            },
            991: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });


    jQuery('.home-detail-slider').owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: true,
        autoplay: true,
        nav: false,
        dots: true,
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

    jQuery('.owl-carousel.product-block-4').owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 3,
                margin: 20,
            },
            1400: {
                items: 4,
                margin: 30
            }
        }
    });

    jQuery('.owl-carousel.product-block-2').owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: true,
        margin: 50,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });

  jQuery('.owl-carousel.trending-products').owlCarousel({
        rtl: (is_arabic_store ? true : false),
         loop: true,
        margin: 30,
         autoplay: true,
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



    // jQuery('.product-category-slider2').owlCarousel({
    //     rtl: (is_arabic_store ? true : false),
    //     loop: true,
    //     autoplay: true,
    //     nav: false,
    //     dots: true,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 1
    //         },
    //         1000: {
    //             items: 1
    //         }
    //     }
    // });


    var carousel = $(".product-category-slider");
    carousel.owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        stagePadding: 30,
        autoplay: false,
        rewind: true,
        nav: false,
        margin: 15,
        dots: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 60,
            },
            580: {
                items: 2
            },
            991: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    })


    $('.product-category-slider').on('changed.owl.carousel', function (e) {

        var items = e.item.count;     // Number of items
        var item = e.item.index;     // Position of the current item
        var size = e.page.size;      // Number of items per page

        if ((items - item) === size) {
            $('.product-category-slider .owl-stage-outer .owl-stage').addClass('lastActiveItem');
        } else {
            $('.product-category-slider .owl-stage-outer .owl-stage').removeClass('lastActiveItem');
        }


    });



    var carousel = $(".product-category-slider2");
    carousel.owlCarousel({
        rtl: (is_arabic_store ? true : false),
        loop: false,
        stagePadding: 30,
        autoplay: false,
        rewind: true,
        nav: false,
        margin: 15,
        dots: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 60,
            },
            580: {
                items: 2
            },
            991: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    })


    $('.product-category-slider2').on('changed.owl.carousel', function (e) {

        var items = e.item.count;     // Number of items
        var item = e.item.index;     // Position of the current item
        var size = e.page.size;      // Number of items per page

        if ((items - item) === size) {
            $('.product-category-slider2 .owl-stage-outer .owl-stage').addClass('lastActiveItem');
        } else {
            $('.product-category-slider2 .owl-stage-outer .owl-stage').removeClass('lastActiveItem');
        }


    });


});


/* ===Language change dropdown header START===*/
jQuery('.header-country-language-option, .header-language-country-list, .init').on("click", function (e) {
    e.stopPropagation();
});
jQuery('.header-language-country-list .init').on("click", function () {
    jQuery(this).parent().find('li:not(.init)').toggle();
});
var allOptions = jQuery("ul.prod-gram").children('li:not(.init)');
/* === Change language country START===*/
jQuery("ul.prod-gram").on("click", "li:not(.init)", function () {
    var $this = jQuery(this);
    var language_website_id = $this.attr("data-website-id");
    var language_code = $this.attr("data-lang-code");
    var language_name = $this.attr("data-lang-name");
    language_code = "en";
    window.location = base_url + "regionandcities/customer/redirect/goto/" + language_website_id + "/lan/" + language_code;
    var lang_option = "<option>English</option>";
    lang_option += '<option value="' + language_code + '" data-website-id="' + language_website_id + '" data-language-code="' + language_code + '">' + language_name + '</option>';
    jQuery(".header-country-language-option").html(lang_option);
    allOptions.removeClass('selected');
    jQuery(this).addClass('selected');
    jQuery(this).parent().children('.init').html(jQuery(this).html());
    jQuery(this).parent().find('li:not(.init)').toggle();
});
/* === Change language country END===*/
/* === Change language option after country select START===*/
jQuery('body').on('change', '.header-country-language-option', function () {
    var $option = jQuery(this).find('option:selected');
    var language_website_id = $option.attr("data-website-id");
    var language_code = $option.attr("data-language-code");
    var data_url = $option.attr("data-url");
    if (language_code == undefined) {
        window.location = "";
    } else {
        //window.location = base_url + "regionandcities/customer/redirect/goto/" + language_website_id + "/lan/" + language_code;
        window.location = data_url;
    }

});
/* === Change language option after country select END===*/

jQuery('body').on('click', '.header-country-language-option-v1 .dropdown-item', function () {  
    var data_url = jQuery(this).attr("data-url");
    var is_selected = jQuery(this).attr("selected");
    
    if (is_selected == undefined && data_url != undefined) {
        window.location = data_url;
    } else {        
        //window.location = ""; 
    }
});


/** privacy policy cookie **/

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

$(document).ready(function () {
    setTimeout(function () {
        $('input:-webkit-autofill').each(function () {
            $(this).closest('.inputfield').addClass('autofilled');
        });
    }, 50);

    setTimeout(function () {
        $('input').each(function () {
            var valueget = $(this).val().length > 0;

            if (valueget) {
                $(this).closest('.inputfield').addClass('autofilled');
            }
        });
    }, 50);

});



jQuery('input, textarea').on('focusin change', function () {
    $(this).parents('.inputfield').addClass('active');
});

jQuery('input, textarea').on('focusout', function () {
    if ($(this).val() == '') {
        $(this).parents('.inputfield').removeClass('active');
        $(this).parents('.inputfield').removeClass('autofilled');
        $(this).parent('.inputfield').prev().show();
    }
});


/** privacy policy cookie **/

$('.header-language-dropdown').change('css', function () {
    console.log("cahange");
});


jQuery(document).ready(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let deal = "Jun 21, 2021 00:00:00",
      countDowns = new Date(deal).getTime(),
      x = setInterval(function() {    

        let now = new Date().getTime(),
            distance = countDowns - now;

             let days = $(".day");
                hours = $(".hour");
                min = $(".minute");
                sec = $(".second");

                 hours.hide();
                 min.hide();
                 sec.hide();

                 var sd = Math.floor(distance / (day));
        $(".days").text(sd);
          

        //do something later when date is reached
         if (distance < 0) {

                  $(".countdown").attr( "style", "display: none !important;" );
                  clearInterval(x);

              }
        if (distance < 86400000) {
            var ddys = Math.floor((distance % (day)) / (hour));
            var hots = Math.floor((distance % (hour)) / (minute));
            var shs = Math.floor((distance % (minute)) / second);

                $(".hours").text(ddys);
              $(".minutes").text(hots);
              $(".seconds").text(shs);
               $('#countdown').addClass('left-only-one-day');


            let days = $(".day");
                hours = $(".hour");
                min = $(".minute");
                sec = $(".second");
                    days.hide();  
                    hours.show();
                     min.show();
                     sec.show();

        }   
        }, 0)
  });





function scrollFunction(){}

jQuery(document).ready(function () {
    jQuery(document).on("keypress", "#newsletter-subscribe-email #newsletter,.email-valid", function (event) {
        if (event.which == 32) {
            event.preventDefault();
        }
    });
    jQuery(document).on("paste", "#newsletter-subscribe-email #newsletter,.email-valid", function (e) {
        var text = e.originalEvent.clipboardData.getData('Text');
        if (text.substring(text.indexOf(' ')).length) {
            jQuery(this).val(text.replaceAll(' ', ''));
            e.preventDefault();
        }
    });
    jQuery(document).on("submit", "#newsletter-subscribe-email", function (e) {
        e.preventDefault();

        var email = jQuery(this).find('input[name="email"]').val().trim();
        var pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        var is_valid = false;
        if (pattern.test(email)) {
            is_valid = true;
        } else {
            var msg = jQuery("#validate-newsletter").attr("data-msg");
            jQuery("#validate-newsletter").html(msg).show().delay(3000).fadeOut(400);
        }

        if (email !== '' && is_valid) {
            newsletterLoaderShow();
            var data = jQuery('#newsletter-subscribe-email').serialize();
            jQuery.ajax({
                url: jQuery(this).attr('action'),
                dataType: 'json',
                type: 'post',
                data: data,
                success: function (response) {
                    if (response.success) {
                        if(response.auto_confirm){
                            jQuery("#ub-newsletter-coupon-code").modal('show');
                        }else{
                            jQuery("#subscribe_modal").modal('show');
                        }
                        jQuery('#newsletter-subscribe-email')[0].reset();
                    } else {
                        jQuery("#validate-newsletter").removeClass('success').addClass('error');
                        jQuery("#validate-newsletter").html(response.message).show().delay(3000).fadeOut(400);
                    }

                    newsletterLoaderHide();
                },
                error: function () {
                    newsletterLoaderHide();
                }
            });
        }
    });
});

function newsletterLoaderShow() {
    jQuery("#newsletter-submit-btn input").addClass('disabled').attr('disabled');
    jQuery("#newsletter-submit-btn em").addClass('fa-circle-notch fa-spin').removeClass('fa-angle-right');
}

function newsletterLoaderHide() {
    jQuery("#newsletter-submit-btn input").removeClass('disabled').removeAttr('disabled');
    jQuery("#newsletter-submit-btn em").removeClass('fa-circle-notch fa-spin').addClass('fa-angle-right');
}


jQuery('body').on('click', '.add-to-wishlist', function () {
    var current_item = jQuery(this);
    var $this = current_item.parent().find(".hide");
    var jsonObj = {};
    $this.find("input").each(function () {
        var attr_name = jQuery(this).attr("name");
        var attr_val = jQuery(this).val();
        jsonObj[attr_name] = attr_val;
    });
    var wish_variation_sku = $this.find("input[name=variation_sku]").val();
    /*
     var wish_variation_sku = $this.find("input[name=variation_sku]").val();
     var wish_parent_sku = $this.find("input[name=parent_sku]").val();
     var wish_id = $this.find("input[name=id]").val();
     var wish_image = $this.find("input[name=image]").val();
     var wish_store_price = $this.find("input[name=store_price]").val();
     var wish_title = $this.find("input[name=title]").val();
     var wish_is_customid = $this.find("input[name=is_customid]").val(); */

    //hit wishlist url using ajax.
    var wishlist_url = base_url + "ubuywishlist/index/add-to-wishlist/variation_sku/" + wish_variation_sku + "/parent_sku/" + wish_variation_sku;
    jQuery.ajax({
        type: "POST",
        url: wishlist_url,
        dataType: "json",
        data: jsonObj,
        success: function (response) {
            if (response.is_wishlist == 1) {
                current_item.find(".fa-heart").removeClass("far");
                current_item.find(".fa-heart").addClass("fas");
                current_item.addClass("active");
                success_flash_message(response.message);
            } else {
                current_item.find(".fa-heart").removeClass("fas");
                current_item.find(".fa-heart").addClass("far");
                current_item.removeClass("active");
                error_flash_message(response.message);
            }
            if (response.is_login == 1) {
                jsonObj.ubuy_store = jsonObj.ubuy_store ? jsonObj.ubuy_store : response.ubuy_store;
                ubaAddtoWishlist(jsonObj,response.is_wishlist,current_item);
            }
        },
        error: function () {
            console.log("error");
        }
    });
});

function ubaAddtoWishlist(jsonObj,is_added,current_item){
    if(typeof ubaaddtowishlist != 'undefined'){
        var asin = jsonObj.variation_sku ? jsonObj.variation_sku : '';
        var parent_asin = jsonObj.parent_sku ? jsonObj.parent_sku : '';
        var product_id = jsonObj.id ? jsonObj.id : '';
        var product_name = jsonObj.title ? jsonObj.title : '';
        var product_url = jsonObj.product_url ? jsonObj.product_url : '';
        if(current_item.parent().find('a.product-item').length && product_url == ''){
            product_url = current_item.parent().find('a.product-item').attr('href');
        }
        
        var product_image = jsonObj.image ? jsonObj.image : '';
        var product_store = jsonObj.ubuy_store ? jsonObj.ubuy_store : '';
        var status = is_added ? 'add'  : "remove";

        var track_addtocart_product_data  = {
            "asin":asin,
            "parent_asin":parent_asin,
            "product_id":product_id,
            "product_name":product_name,
            "product_url":product_url,
            "product_image":product_image,
            "product_store":product_store,
            "status":status
        };
        ubaaddtowishlist(track_addtocart_product_data);
    }
}

jQuery("body").on("click", ".remove-wishlist", function () {
    var delete_id = jQuery(this).attr("data-id");
    var current_item = jQuery(this);
    if(delete_id){
        var wishlist_url = base_url + "/ubuywishlist/index/delete/id/" + delete_id;
        jQuery.ajax({
            type: "POST",
            url: wishlist_url,
            dataType: "json",
            data: "is_ajax=1",
            success: function (response) {
                if(response.status == 1){
                    current_item.closest('.product-item-section').remove();
                    success_flash_message(response.message);
                }
                else{
                    error_flash_message(response.message);
                }
            },
            error: function () {
                
            }
        });
    }
});

function success_flash_message(message) {
    jQuery(".popup-messages").remove();
    var html = '<div class="popup-messages container-fluid"><div class="row"><div class="col-md-12 pd-0"><ul class="messages" style="display:none;"><li class="success-msg"><ul><li class="d-flex"><i class="fas fa-check-circle ml-2 mr-3 align-self-center"></i><span>' + message + '</span></li></ul></li></ul></div></div>';
    jQuery("body").append(html);
    jQuery(".popup-messages .messages").delay(100).slideDown(500);
    jQuery(".popup-messages .messages").delay(4000).slideUp(500);
}
function error_flash_message(message) {
    jQuery(".popup-messages").remove();
    var html = '<div class="popup-messages container-fluid"><div class="row"><div class="col-md-12 pd-0"><ul class="messages" style="display:none;"><li class="success-msg"><ul><li class="d-flex"><i class="fas fa-exclamation-circle ml-2 mr-3 align-self-center"></i><span>' + message + '</span></li></ul></li></ul></div></div>';
    jQuery("body").append(html);
    jQuery(".popup-messages .messages").delay(100).slideDown(500);
    jQuery(".popup-messages .messages").delay(4000).slideUp(500);
}

/* ==========footer payment icon show more============= */
function showMoreFilter(obj) {
    jQuery(obj).parent().find('.hide_li').slideToggle('slow');
    var ico = jQuery(obj).parent().find('.view_more');
    var less = jQuery(obj).attr('data-less-text');
    var more = jQuery(obj).attr('data-more-text');
    if (ico.hasClass('plus')) {
        ico.removeClass('plus').addClass('minus');
        ico.html(less);
    } else {
        ico.removeClass('minus').addClass('plus');
        ico.html(more);
    }
}
