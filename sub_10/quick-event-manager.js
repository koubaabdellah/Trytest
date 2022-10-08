var qem_dont_cancel;

function pseudo_popup(content) {
    var popup = document.createElement("div");
    popup.innerHTML = content;
    var viewport_width = window.innerWidth;
    var viewport_height = window.innerHeight;

    function add_underlay() {
        var underlay = document.createElement("div");
        underlay.style.position = "fixed";
        popup.style.zIndex = "9997";
        underlay.style.top = "0px";
        underlay.style.left = "0px";
        underlay.style.width = viewport_width + "px";
        underlay.style.height = viewport_height + "px";
        underlay.style.background = "#7f7f7f";
        if (navigator.userAgent.match(/msie/i)) {
            underlay.style.background = "#7f7f7f";
            underlay.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
        } else {
            underlay.style.background = "rgba(127, 127, 127, 0.5)";
        }
        underlay.onclick = function () {
            underlay.parentNode.removeChild(underlay);
            popup.parentNode.removeChild(popup);
        };
        document.body.appendChild(underlay);
    }

    add_underlay();
    var x = viewport_width / 2;
    var y = viewport_height / 2;
    popup.style.position = "fixed";
    document.body.appendChild(popup);
    x -= popup.clientWidth / 2;
    y -= popup.clientHeight / 2;
    popup.style.zIndex = "9998";
    popup.style.top = y + "px";
    popup.style.left = x + "px";
    return false;
}

function qem_toggle_state() {
    $(this).attr('clicked', 'clicked')
}

function qem_calendar_ajax(e) {
    /*
        Get calendar
    */
    var calendar = $(e).closest('.qem_calendar');
    var cid = Number(calendar.attr('id').replace('qem_calendar_', ''));
    var params = 'action=qem_ajax_calendar';

    /*
        URL Encode the atts array
    */
    for (property in qem_calendar_atts[cid]) {
        params += '&atts[' + encodeURIComponent(property) + ']=' + encodeURIComponent(qem_calendar_atts[cid][property]);
    }

    params += "&qemmonth=" + qem_month[cid] + "&qemyear=" + qem_year[cid] + "&qemcalendar=" + cid;
    if (qem_category[cid] != '') params += '&category=' + qem_category[cid];

    $.post(ajaxurl, params, function (v) {
        calendar.replaceWith($(v));
        qem_calnav();
    }, 'text');

}

function qem_handle_regular(e, f) {

    data = e;

    /*
        Handle Redirection
    */
    if (data.hasOwnProperty('redirect')) {
        if (data.redirect.redirect && !data.errors.length) {
            window.location.href = data.redirect.url;
            return;
        }
    }

    qem = f.closest('.qem');
    /*
        Update whoscoming and places
    */

    qem.find('.whoscoming').html(data.coming);
    /* f.closest('.qem').find('.places').html(data.places); */

    /*
        Deactivate all current errors
    */
    qem.find('.qem-register').find('.qem-error,.qem-error-header').removeClass('qem-error qem-error-header');
    qem.find('.qem-register').find('h2').text(data.title);

    /*
        Hide the button!
    */
    qem.find('.toggle-qem').hide();

    if (data.blurb !== undefined) {
        var blurbText = qem.find('.qem-register').find('p').first();
        blurbText.show();
        blurbText.text(data.blurb);
    }

    /*
        If errors: Display
    */
    $('.qem-field-error').remove();
    for (i in data.errors) {
        element = f.find('[name=' + data.errors[i].name + ']');
        console.log(element);
        element.addClass('qem-error');
        element.after('<p class="qem-error-header qem-field-error">' + data.errors[i].error + '</p>');
    }

    /*
        Change header class to reflect errors being present
    */
    if (data.errors.length) {
        qem.find('.qem-register').find('h2').addClass('qem-error-header');
        qem.find('.qem-register .places').hide();
        if (data.errors[i].name == 'alreadyregistered') {
            qem.find('.qem-register').children('p').first().hide();
            qem.find('.places').hide();
            qem.find('.qem-form').html(data.form || '');
        }
    } else {
        /*
            Successful validation!
        */
        if (data.ignore) {
            console.log(qem);

            params = {
                'module': 'deferred',
                'custom': 'Deferred Payment',
                'form': qem.find('input[name=form_id]').val()
            };

            qem_redirect(params);
        } else {
            qem.find('.places').hide();
            var form = data.form;
            qem.find('.qem-form').html(form);
        }
    }

    /*
        Scroll To Top
    */
    $('html,body').animate({
        scrollTop: Math.max(qem.find('.qem-register').offset().top - 25, 0),
    }, 200);
}

function qem_validate_form(ev) {
    var f = $(this);
    var set = f.find('input[clicked=true]');
    var c = set.first();

    set.removeAttr('clicked');

    // Intercept request and handle with AJAX
    var fd = $(this).serialize();
    var action = $('<input type="text" />');
    action.attr('name', 'action');
    action.val('qem_validate_form');

    c.attr('type', 'text');
    fd += '&' + c.serialize() + '&' + action.serialize();
    c.attr('type', 'submit');

    $.post(ajaxurl, fd, function (e) {
            qem_handle_regular(e, f);
        }, 'json'
    );
    ev.preventDefault();
    return false;
}

function qem_decide(e) {

    if (!e.ic) return 0;
    return 1;

}

if (jQuery !== undefined) {
    jQuery(document).ready(function () {
        $ = jQuery;

        $('.qem-register form').submit(qem_validate_form);
        $('.qem-register form input[type=submit], .qem-register form input[type=button]').click(qem_toggle_state);

        /*
            Set up calendar functionality
        */
        qem_calnav();

        $("#paylater").change(function () {
            var A = $('#submit').val(),
                B = $('#submit').attr('alt');

            $('#submit').attr('alt', A).val(B);
        });

        /*
            Setup payment buttons for in-context payments
        */
        if (typeof qem_ignore_ic === 'undefined') qem_ignore_ic = null;

        if (typeof qem_ic !== 'undefined' && qem_ignore_ic == false) {

            $('.qem-form form').submit(function (event) {
                event.preventDefault();
                return false;
            });
            
                $('.qem-form input[type=submit]').click(function (event) {

                    event.preventDefault();

                    /*
                        Collect Important Data
                    */
                    $target = event.target;
                    c = $($target);
                    $ = jQuery;
                    form = c.closest('form');
                    form.hide();
                    $('#qem_validating').show();
                    f = form.get(0);

                    var fd = $(form).serialize();
                    fd += '&' + c.attr('name') + '=' + c.val() + '&action=qem_validate_form';
                    $.ajax({
                        type: 'POST',
                        url: ajaxurl,
                        data: fd,
                        success: function (e) {
                            data = e;

                            if (!data.success) {

                                $('#qem_validating').hide();
                                $('#qem_processing').hide();
                                form.show();
                                qem_handle_regular(data, form);

                                return;
                            }
                            
                                params = {
                                    'module': 'deferred',
                                    'custom': 'Deferred Payment',
                                    'form': form.find('input[name=form_id]').val()
                                };

                                qem_redirect(params);

                                qem_dont_cancel = true;
                                
                        },
                        error: function(data){
                            console.log(data);
                            alert('Server Error if this continues please contact us');
                        }
                    });

                    return false;
                });
                
        }

        $('.qem-multi-product').on('input', function () {
  console.log('input');
            var H = $(this).closest('.qem_multi_holder'),
                X = H.find('input'),
                T = 0,
                F = $(this).closest('form').attr('id'),
                A = window['qem_multi_' + F];

            var V = 0, C = 0, I;
            for (var i = 0; i < X.length; i++) {

                V = $(X[i]).val();

                I = $(X[i]).attr('id').replace('qtyproduct', '');

                T += A[I].cost * V;

            }

            H.find('#total_price .qem_output').text(T);
        });
    });
}

function qem_redirect(params) {


    var action = "?token=" + params.token;
    if (params.module == 'deferred') action = '';
    var $ = jQuery, form = $("<form method='POST' style='display:none;' action='" + action + "'></form>"), input;
    for (i in params) {

        if (i == "token") continue;
        input = $('<input type="hidden" />');
        input.attr('name', i);
        input.attr('value', params[i]);

        form.append(input);

    }

    form.append("<input type='submit' name='qem_submit' value='submitted' />");
    $('body').append(form);
    form.submit();

}

function qem_calendar_prep(e) {
    var calendar = $(e).closest('.qem_calendar');
    var cid = Number(calendar.attr('id').replace('qem_calendar_', ''));
    var params = e.href.split('#')[0].split('?')[1];
    if (params !== undefined) params = params.split('&');
    else params = [];
    var values = {};

    /*
        Form params into an object
    */
    for (i = 0; i < params.length; i++) {
        set = params[i].split('=');
        values[set[0]] = set[1];
    }

    /*
        Special case, no parameters at all = reset category
    */
    if (params.length == 0) values.category = '';

    /*
        Set the global variables if the link would have changed them!
    */
    if (values.qemmonth !== undefined) qem_month[cid] = values.qemmonth;
    if (values.qemyear !== undefined) qem_year[cid] = values.qemyear;
    if (values.category !== undefined) qem_category[cid] = values.category;
}

function qem_calnav() {
    $('.qem_calendar .calnav').click(function (ev) {

        ev.preventDefault();

        qem_calendar_prep(this);
        qem_calendar_ajax(this);

        return false;

    });

    $('.qem_calendar .qem-category a').click(function (ev) {

        ev.preventDefault();

        qem_calendar_prep(this);
        qem_calendar_ajax(this);

        return false;

    });

}

/*
	LightBox
*/
var $j = jQuery.noConflict();

function xlightbox(insertContent, ajaxContentUrl) {

    // add lightbox/shadow <div/>'s if not previously added
    if ($j('#xlightbox').length == 0) {
        var theLightbox = $j('<div id="xlightbox"/>');
        var theShadow = $j('<div id="xlightbox-shadow"/>');
        $j(theShadow).click(function (e) {
            closeLightbox();
        });
        $j('body').append(theShadow);
        $j('body').append(theLightbox);
    }

    // remove any previously added content
    $j('#xlightbox').empty();

    // insert HTML content
    if (insertContent != null) {
        $j('#xlightbox').append(insertContent);
    }

    // insert AJAX content
    if (ajaxContentUrl != null) {
        // temporarily add a "Loading..." message in the lightbox
        $j('#xlightbox').append('<p class="loading">Loading...</p>');

        // request AJAX content
        $j.ajax({
            type: 'GET',
            url: ajaxContentUrl,
            success: function (data) {
                // remove "Loading..." message and append AJAX content
                $j('#xlightbox').empty();
                $j('#xlightbox').append(data);
            },
            error: function () {
                alert('AJAX Failure!');
            }
        });
    }

    // move the lightbox to the current window top + 100px
    $j('#xlightbox').css('top', $j(window).scrollTop() + 100 + 'px');

    // display the lightbox
    $j('#xlightbox').show();
    $j('#xlightbox-shadow').show();

}

// close the lightbox

function closeLightbox() {

    // hide lightbox and shadow <div/>'s
    $j('#xlightbox').hide();
    $j('#xlightbox-shadow').hide();

    // remove contents of lightbox in case a video or other content is actively playing
    $j('#xlightbox').empty();
}

/*
	QEM Toggle
*/
jQuery(document).ready(function ($) {

    $("#yourplaces").keyup(function () {
        var model = document.getElementById('yourplaces');
        var number = $('#yourplaces').val()
        if (number == 1)
            $("#morenames").hide();
        else {
            $("#morenames").show();
        }
    });

    $(".apply").hide();
    $(".toggle-qem").click(function (event) {
        $(this).next(".apply").slideToggle();
        event.preventDefault();
        return false;
    });

});

/*
    Date Picker
*/

jQuery(document).ready(function () {

    datePickerOptions = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "",
        dateFormat: 'dd M yy'
    };

    jQuery('#qemdate').datepicker(datePickerOptions);
    jQuery('#qemenddate').datepicker(datePickerOptions);
    jQuery('#qemcutoffdate').datepicker(datePickerOptions);
});
