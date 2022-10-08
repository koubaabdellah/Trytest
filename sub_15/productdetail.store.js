jQuery(document).on("submit", "#product_addtocart_form", function (e) {
    e.preventDefault();
    showLoaderImage();
    var data = jQuery('#product_addtocart_form').serialize();
    var pId = jQuery('#p_full_id').val();
    jQuery.ajax({
        url: jQuery(this).attr('action'), //cart_url,
        dataType: 'json',
        type: 'post',
        data: data,
        success: function (response) {
            if (response.success == true) {
                if (response.error != 0) {

                } else {
                    var product_price = p_price?p_price:0.00;
                    FBAddtoCart({
                        content_ids: pId,
                        content_type: 'product',
                        value: product_price,
                        currency: p_currency_iso_symbol
                    },1);
                    var qty = jQuery('#qty').val();
                    setProductQty(qty);
                    seoProductCartAdd();
                }
            }
            showAddCartPopUp(response);
            hideLoaderImage();
        },
        error: function () {
            hideLoaderImage();
        }
    });
});

function FBAddtoCart(addtoCartDataObj,i){
    if(i>5)
        return;
    try {
        fbq('track', 'AddToCart',addtoCartDataObj);
    } catch (error) {
        i++;
        setTimeout(function () { FBAddtoCart(addtoCartDataObj,i); }, 2000);
    }
}

jQuery(document).on("change", "select[data-variation]", function () {
    showLoaderImageAbs();
    selected_asin = jQuery(this).find('option:selected').attr("asin");
    parent_asin = jQuery("#parent_asin").val();
    is_custom_id_product = jQuery("#is_custom_id_product").val();
    storename = 'store';

    var csrftoken = '';
    if (typeof (csrftoken_fetch) != "undefined" && csrftoken_fetch !== null) {
        csrftoken = csrftoken_fetch;
    }
    
    jQuery.ajax({
        type: "POST",
        url: ajax_url,
        data: {selected_asin: selected_asin, parent_asin: parent_asin, storename: storename, is_custom_id_product: is_custom_id_product, s_id: s_id, lang: lang, csrftoken: csrftoken},
        success: function (response) {
            if (response) {
                jQuery('#product-view-full').html(response);
                hideLoaderImageAbs();
                reloadSlikSlider();
                spinner();
            } else {
                window.location.reload();
            }
        },
        error: function () {
            hideLoaderImageAbs();
        }
    });
});

jQuery(document).on("click", "a[data-toggle='locale']", function () {
    lang = jQuery(this).data("code");
    
    var csrftoken = '';
    if (typeof (csrftoken_fetch) != "undefined" && csrftoken_fetch !== null) {
        csrftoken = csrftoken_fetch;
    }
    var parentAsin = "";
    if (typeof (parent_asin) != "undefined" && parent_asin !== null) {
        parentAsin = parent_asin;
    }
    else{
        parentAsin = selected_asin
    }
    tUrlKey = "";
    var tUrlKey = "";
    if (typeof (url_key) != "undefined" && url_key !== null) {
        tUrlKey = url_key;
    }
     
    showLoaderImageAbs();
    jQuery.ajax({
        type: "POST",
        url: ajax_url,
        data: {selected_asin: selected_asin,parent_asin: parentAsin,url_key:tUrlKey, storename: storename, is_ajax: is_ajax, product_id: product_id, s_id: s_id, lang: lang,csrftoken: csrftoken},
        success: function (response) {
            if (response) {
                hideLoaderImageAbs();
                jQuery('#product-view-full').html(response);
                reloadSlikSlider();
                spinner();
            } else {
                window.location.reload();
            }
        },
        error: function () {
            hideLoaderImageAbs();
        }
    });
});



