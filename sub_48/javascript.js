/* progress bar voor de beeldbank */
var progressEnd = 12;		// set to number of progress <span>'s.
var progressColor = '#40B0FF';	// set to progress bar color
var progressInterval = 500;	// set to time between updates (milli-seconds)

var progressAt = progressEnd;
var progressTimer;

var formAttr = "";

$(document).ready(function () {
// JEEEE Query
    // ********************************** HEARTBEAT *****************************************

    // Make the site reload to refresh session
    // Attribute is reload period in minutes
    initHeartbeat(5);

    if (jQuery("#subnavigatie").height() > 350) {
        jQuery("#hoofd_content").css({"min-height": jQuery("#subnavigatie").height() + "px"})
    }

    // ********************************** BUTTONS *****************************************
    $("button").bind('click', function ()
    {
        var $button = $(this);

        if ($button.hasClass('inactive'))
        {
            return false;
        }

        if ($button.parents('form').length > 0) {
            $button.addClass('inactive');
            this.form.submit();

            setTimeout(function () {
                $button.removeClass('inactive');
            }, 2000);

            return false;
        }
    });

    // ********************************** BUTTONS *****************************************


    $("input.checkAll").change(function () {
        parent = $("input.checkAll").parent().parent().parent().parent().attr("id");
        checked = this.checked;
        $("#" + parent + " input").each(function () {
            if (checked == true) {
                this.checked = true;
            } else {
                this.checked = '';
            }
        });
    });

    $("div.enlarge").mouseover(function () {
        if ($.browser.msie) {
            $(this).css("filter", "Alpha(Opacity=100)");

        } else if ($.browser.mozilla) {
            $(this).css("MozOpacity", "1.0");
        } else {
            $(this).css("opacity", "1.0");
        }
    });

    $("div.enlarge").mouseout(function () {
        if ($.browser.msie) {
            $(this).css("filter", "Alpha(Opacity=80)");

        } else if ($.browser.mozilla) {
            $(this).css("MozOpacity", "0.8");
        } else {
            $(this).css("opacity", "0.8");
        }
    });

    if (typeof ($.colorbox) == 'function')
    {
        $('a.colorbox').colorbox({
            photo: true
        });
    }
    if (typeof ($.ui.tabs) == 'function')
    {
        $('.tabs').tabs({});
    }

    $("div.enlarge").click(function () {

        $(this).after('<div class="popup"></div>');
        //url = "/catalogus/ajax_getImages.php?product=" + $(this).parent().attr("id") + "&seq=" + $(this).attr("id");
        url = "/catalogus/ajax_getImages.php?product=" + $(this).parent().attr("id") + "&seq=undefined";
//		window.open(url);
        $.getJSON(url, function (data) {
            $.each(data, function (i, content) {
                $(".popup").html(content);
                $(".popup").show("slow");

                $(".popup a").click(function () {
                    $(".popup img").fadeOut(1000);
                    $(".popup img").fadeIn(1000);
                    $(".popup img").attr("src", $(this).attr("href"));

                    vorigeVolgende();
                    return false;
                });

                vorigeVolgende();

                $(".popup div.close").click(function () {
                    $(".popup").hide("slow", function () {
                        $(".popup").each(function () {
                            $(this).remove();
                        });
                    });
                });

                $(".popup img").click(function () {
                    $(".popup").hide("slow", function () {
                        $(".popup").each(function () {
                            $(this).remove();
                        });
                    });
                });
            });

        });

    });
    // ********************************** SHOPPINGCART *****************************************

    $(".catRow button").unbind();

    // ********************************** SHOPPINGCART *****************************************

    $(".shopcart button").unbind();

    // disable [Enter] not to submit form
    $(".shopcart .amount").bind("keydown", function (e) {

        if (e.keyCode == 13)
            return false;
    });



    $("a.showinfo").click(function () {

        $(this).hide('medium');
        $(this).siblings("a.hideinfo").show('medium');
        $(this).siblings("div.includedinfo").show('medium');

    });

    $("a.hideinfo").click(function () {

        $(this).hide('medium');
        $(this).siblings("a.showinfo").show('medium');
        $(this).siblings("div.includedinfo").hide('medium');

    });


    $("button.calculate").click(function () {

        // get some variables
        amount = parseInt($(this).parent().children('.amount').val(), 10);
        articlePrice = parseInt($(this).parent().children('.articlePrice').val(), 10);
        servicesTotalPrice = parseInt($(this).parent().children('.servicesTotalPrice').val(), 10);
        accessoriesTotalPrice = parseInt($(this).parent().children('.accessoriesTotalPrice').val(), 10);

        if (isNaN(amount))
            amount = parseInt(0, 0);
        if (isNaN(articlePrice))
            articlePrice = parseInt(0, 0);
        if (isNaN(servicesTotalPrice))
            servicesTotalPrice = parseInt(0, 0);
        if (isNaN(accessoriesTotalPrice))
            accessoriesTotalPrice = parseInt(0, 0);


        // calculate total price for article including services
        newTotalPrice = amount * (articlePrice + servicesTotalPrice + accessoriesTotalPrice);

        newTotalPrice = newTotalPrice / 100;
        newTotalPrice = formatCurrency(newTotalPrice);

        $(this).parents(".searchresult").find("td.amount").html(amount + ' x');
        $(this).parents('tbody').children("tr:last").children("td").children("div.price").html(newTotalPrice);


        // Calculate article price
        articleTotalPrice = amount * articlePrice;

        articleTotalPrice = articleTotalPrice / 100;
        articleTotalPrice = formatCurrency(articleTotalPrice);

        $(this).parents("tbody").find("td.articleTotalPrice").html(articleTotalPrice);



        // Calculate prices for services
        $(this).parents("tbody").find("input.serviceCostPrice").each(function () {

            price = parseInt($(this).val());
            servicePrice = amount * price;

            servicePrice = servicePrice / 100;
            servicePrice = formatCurrency(servicePrice);

            $(this).parent().siblings("td.servicePrice").html(servicePrice);

        });
        $(this).parents("tbody").find("input.accessoryCostPrice").each(function () {

            price = parseInt($(this).val());
            accessoryPrice = amount * price;

            accessoryPrice = accessoryPrice / 100;
            accessoryPrice = formatCurrency(accessoryPrice);

            $(this).parent().siblings("td.accessoryPrice").html(accessoryPrice);

        });


        // Update amount with ajax (when refreshing or re-entering shopcart changed amount stayes fixed)
        // Returns the new total (for all articles), puts it back on screen
        id = $(this).parent().children('.amount').attr('name');	// id consists of itemType_itemId (id's in difefrent categories are not unique

        $.get("/catalogus/winkelwagen/ajax_updateamount.php?id=" + id + "&amount=" + amount, function (superTotal) {

            superTotal = superTotal / 100;
            superFat = formatCurrency((superTotal / 100) * 21);
            superTotalInc = formatCurrency((superTotal / 100) * 21 + superTotal);

            superTotal = formatCurrency(superTotal);

            $().find("h1.superTotal").html("Totaal: " + superTotal);
            $().find("#minicartTotalPrice").html(superTotal);
            $().find("td." + id).html(amount + 'x');


            $().find("h1.superFat").html("21% BTW: " + superFat);
            $().find("#minicartFat").html(superFat);

            $().find("h1.superTotalInc").html("Totaal inc: " + superTotalInc);
            $().find("#minicartSuperTotalInc").html(superTotalInc);
        });

        return false;
    });



    $(".shopcart .amount").keyup(function () {
        $(this).siblings("button.calculate").click();
    });

    $(".shopcart button.empty_cart").click(function () {

        if (confirm('Weet u zeker dat u uw winkelwagen wilt legen?'))
        {
            cleanUri = $(this).attr("name");
            window.open("/catalogus/winkelwagen/" + cleanUri + "&empty", "_self");
            return false;
        } else {
            return false;
        }

    });


    $(".shopcart button.next").click(function () {

        if ($("input.checkcriteria:checked").size() < $("input.checkcriteria").size()) {

            $("input.checkcriteria").not(":checked").parent().parent().css("background-color", "#F25500");
            alert('U moet alle bestelcriteria invullen om door te kunnen gaan met uw bestelling');
            //window.open('#','_self');
            return false;
        } else {
            this.form.submit();
        }

    });

    // ********************************** MINI SHOPPINGCART *****************************************
    $("#minicart button.toCart").unbind();


    // ********************************** ORDER CRITERIA *********************************************************
    $("#order_criteria button").unbind();


    // The 3 represents the number of choises on the scale, change it when changing the scale please

    $("#order_criteria button.next").click(function () {

        if (($("input.radio_h:checked").size() < $("input.radio_h").size() / 3) || ($("input.radio_s:checked").size() < $("input.radio_s").size() / 3))
        {
            //$("input:radio").not(":checked").parent().css("background-color", "#F25500");
            alert('U moet alle criteria hebben ingevuld om door te kunnen gaan met uw bestelling');
            return false;
        } else {
            this.form.submit();
        }


    });

    // ********************************** ADDITIONAL ORDER DATA (ADDRESS) *****************************************
    $('div#supplementary').find('input').bind("keydown", function (e) {
        if (e.keyCode == 13 || e.keyCode == 1) {
            if ($('div#supplementary').find('button.next').length > 0)
            {
                return false;
                $('div#supplementary').find('button.next').click();
                /*
                 $('div#supplementary button.next').click;
                 */

            } else
            {
                return false;
            }
        }

    });
    $("#supplementary button.previous").unbind();

    $("#supplementary input.value").attr("disabled", "true");
    $("#supplementary input.zipcode").attr("disabled", "true");
    $("#supplementary input.title").attr("disabled", "true");

    $("input.address1").click(function () {

        $("input.value").attr("disabled", "true");
        $("input.zipcode").attr("disabled", "true");
        $("input.title").attr("disabled", "true");

    });

    $("input.address2").click(function () {

        $("input.value").removeAttr("disabled");
        $("input.zipcode").removeAttr("disabled");
        $("input.title").removeAttr("disabled");

        //$(this).parent().parent().find("td.label").html().after("(*)");

    });

    $("#supplementary button.next").unbind().click(function () {

        var error = 0;
        $("input.address1").parent().removeAttr("style");
        $("input.address2").parent().removeAttr("style");


        if ($("input.address2").attr("checked") == true || $("input.address1").attr("checked") == true)
        {
            if ($("input.address2").attr("checked") == true)
            {

                $("div#supplementary div.address input").removeAttr("style");
                $("input.title").parent().removeAttr("style");

                $("div#supplementary div.address input").each(function () {

                    if ($(this).attr("class") == "title")
                    {

                        if ($("input.title:checked").size() == 0)
                        {
                            $("input.title").parent().css("background-color", "#FFFFCC");
                            alert('U moet alle gegevens voor het alternatieve afleveradres invullen om uw bestelling te kunnen bevestigen');
                            error = 1;
                            return false;
                        }
                    }

                    if ($(this).val() == "" && $(this).attr('mark') != 'ignore')
                    {
                        $(this).css("background-color", "#FFFFCC");
                        alert('U moet alle gegevens voor het alternatieve afleveradres invullen om uw bestelling te kunnen bevestigen');
                        $(this).focus();
                        error = 1;
                        return false;
                    }

                });
            }


            if (error == 0) {

                if (confirm("Weet u zeker dat u deze bestelling wilt bevestigen?\nOm na het bestellen de status van uw bestelling te bekijken kunt u naar 'Mijn bestellingen' gaan.\n\nKlik op [Ok] om uw bestelling te versturen, of op [Annuleren] om te stoppen."))
                {
                    this.form.submit();
                } else
                {
                    return false;
                }

            } else
            {
                return false;
            }
        } else
        {

            $("input.address1").parent().css("background-color", "#F25500");
            $("input.address2").parent().css("background-color", "#F25500");
            alert('U moet een aflever adres kiezen om uw bestelling te kunnen bevestigen');
            return false;
        }
    });

    // ********************************** Product detail *****************************************

    $(".catDetail button.document").unbind();
    /*	$("button.zoekbutton").unbind().click(function(){
     $(this).unbind();
     if (formAttr == ""){
     formAttr = $("#content2 form:first").attr("action");
     }
     //		$("#content2 form").attr("action" , "/catalogus/" + $(this).attr("name") + "/" + formAttr);
     this.form.action = this.form.action.replace("??" , "?");
     this.form.submit();
     });

     $("#order_criteria table tr:even").addClass("even");

     $("#content2 .accessory").mouseover(	function(){
     $(this).addClass("accessory_hover");
     });
     $("#content2 .accessory").mouseout(	function(){
     $(this).removeClass("accessory_hover");
     });
     */

    // ********************************** Product overview *****************************************

    $(".catRow button").unbind();

    $(".catRow button.order").click(function () {

        this.form.submit();

    });

    /* Fold in/out lists of associated services and accesories */
    $(".included h3.fold").toggle(
            function () {
                $(this).next('ul').show('fast');
                $(this).children('div').toggleClass('open');
            },
            function () {
                $(this).next('ul').hide('medium');
                $(this).children('div').toggleClass('open');
            }
    )

    // ********************************** SEARCH FORM *****************************************
    // Disable form when searching for serice in perceel 1, 2 and 3

    //$('.searchtype').click(function(){
    if ($('.searchtype:checked').val() == 'service')
    {
        $('.searchtype:checked').parents('table.typesearch').siblings('table').find('div.value select').attr('disabled', 'true');
    } else
    {
        $('.searchtype:checked').parents('table.typesearch').siblings('table').find('div.value select').removeAttr('disabled', '');

    }
    //});

    /* auto send */
//	setTimeout(function(){
    $('input.searchtype').click(function () {
        this.form.submit();
    });
//	} , 200);
    // Disable on page load
//	if($('.searchtype:checked').val() == 'service')
//	{
//		$('.searchtype:checked').click();
//	}

    // ********************************** SERVICES *****************************************

    $("#diensten button").unbind();

    $("#diensten table tr:even").addClass("even");


    // calculation method for services
    $("#diensten form input#amount").keyup(function () {
        calcServicePrices(parseInt(this.value));
    });

    $("div#diensten input.checkservice, div#diensten input.checkaccessory").click(function ()
    {
        enableServiceUpload();
        calcServicePrices(parseInt($("#diensten form input#amount").val()));
    });

    $("#diensten button.next").click(function () {


        if ($("#diensten form input#amount").val() <= 0 || $("#diensten form input#amount").val() == '')
        {

            $("#diensten form input#amount").css("background-color", "#F25500");
            alert('U moet een aantal invullen om door te kunnen gaan met uw bestelling');
            return false;
        } else if ($("#diensten input.checkservice:checked").size() > 0)
        {

            var Specs = $("#diensten form input#specs").val();
            var specsLink = $("#diensten form a.specslink").html();


            if (specsLink == undefined)
            {
                specsLink = "";
            }

            if (Specs !== undefined) {
                if (Specs.length == 0 && specsLink == 0) {
                    $("form input#specs").parent().parent().children("td").each(function () {
                        $(this).css("background-color", "#F25500");
                    });
                    alert("U moet een configuratie template opgeven om door te kunnen gaan met uw bestelling.\n\nU kunt een leeg voorbeeld vinden door op de link boven het upload veld te klikken.");
                    return false;
                } else
                if (Specs.indexOf(".xls") == -1 && specsLink == 0) {
                    $("form input#specs").parent().parent().children("td").each(function () {
                        $(this).css("background-color", "#F25500");
                    });
                    alert("Het configuratie template moet een excel document zijn (.xls)\n\nU kunt een leeg voorbeeld vinden door op de link boven het upload veld te klikken.");
                    return false;
                } else {
                    this.form.submit();
                }
            } else {
                this.form.submit();
            }
        } else
        {
            this.form.submit();
        }


    });

    /*$("#diensten button.check").unbind().click(function(){
     if (check()){
     this.form.submit();
     }
     }); // no default submit
     */
    /*$("button.back").unbind().click(function(){
     document.location = $(this).attr("name");
     return false;
     });*/

    // ********************************** MY ORDERDS *****************************************

    $(".checkAll").change(function () {

        if (this.checked == true) {
            $(".rowCount input").each(function () {
                this.checked = 'checked';
            });
        } else {
            $(".rowCount input").each(function () {
                this.checked = false;
            });
        }
    });

    $("#myOrders th").click(function () {
        if (this.id) {
            Form = document.forms[1];
            Form.action.value = 'sort';
            Form.sort.value = this.id;

            Form.submit();
        }
    });
    /* becouse the table is positioned absolute we need to scale the height */
    $("table#myOrders").parent().parent().prepend('<div class="myOrderMovingDiv"></div>');
    $("div.myOrderMovingDiv").height($("table#myOrders").height());


    $("#myOrders tr.rowCount td").click(function () {
        Class = ".order_" + $(this).parent().attr("id").replace('order', '');

        if ($(this).parents('tr:first').hasClass('noSlide'))
        {

            return false;
        } else if ($(this).children("button").length > 0) {
            return true;
        } else if ($(Class).html() != null) {
            $(Class).each(function () {
                if ($(this).css("display") == 'none') {
                    $(this).fadeIn(1000);
                } else {
                    $(this).fadeOut(1000);
                }
            });

        } else if ($(this).children("button").length == 0) {
            url = "/catalogus/mijnbestellingen/ajax_getProducts.php?order_id=" + $(this).parent().attr("id").replace('order', '');
            $.getJSON(url, function (data) {
                len = $("#myOrders tr:first").children().length;

                $.each(data, function (i, item) {

                    $.each(item.equipment, function (j, item2) {
                        showOrderDetail('equipment', item, item2, len, item.id);
                    });

                    $.each(item.accessory, function (j, item2) {
                        showOrderDetail('accessory', item, item2, len, item.id);
                    });

                    $.each(item.service, function (j, item2) {
                        showOrderDetail('service', item, item2, len, item.id);
                    });

                    $.each(item.special, function (j, item2) {
                        showOrderDetail('special', item, item2, len, item.id);
                    });

                    /* becouse the table is positioned absolute we need to scale the height */
                    $("div.myOrderMovingDiv").height($("table#myOrders").height() + 20);
                });
            });

        }

        if ($(this).parent().children("td:first").attr("class") == 'first') {
            obj = $(this).parent().children("td:first").removeClass('first').addClass("open");
        } else {
            obj = $(this).parent().children("td:first").addClass('first').removeClass("open");
        }

        setTimeout(function () {
            /* becouse the table is positioned absolute we need to scale the height */
            $("div.myOrderMovingDiv").height($("table#myOrders").height() + 20);

            /*
             $("div.myOrderMovingDiv").animate({
             width: 1,
             height: $("table#myOrders").height()
             },'slow');
             */
        }, 1100);
    });


    function showOrderDetail(prodType, item, item2, len, objectId)
    {

        if (item2.name == undefined)
            item2.name = "onbekend";

        obj = '<tr class="order_' + item.orderId + '" style="display:none;"><td colspan="' + len + '"><table><tr>'

        obj += '<td><strong>Interne referentie:</strong></td><td colspan="3"> ' + item.internalref + '</td></tr><tr><tdcolspan="4">&nbsp;</td></tr><tr>';

        obj += '<td class="name">' + item2.name + '</td>';

        if (item2.ctkNumber == undefined)
            item2.ctkNumber = "n.v.t.";

        obj += '<td>Artikelnr: ' + item2.number + '</td>';
        obj += '<td>Certificaatnr: ' + item2.ctkNumber + '</td>';
        obj += '<td class="price">' + item2.amount + ' X &euro; ' + item2.price2Inc + '</td></tr>';

        if (item2.optAccessories) {

            obj += '<tr><td><strong><i>Optionele toebehoren</i></strong></td>';


            $.each(item2.optAccessories, function (k, item3) {
                obj += '<tr><td class="service">' + item3.name + '</td>';
                obj += '<td class="number"></td>';
                obj += '<td ></td>';
                obj += '<td class="price">' + item3.amount + ' X &euro; ' + item3.price2Inc + '</td></tr>';
            });
        }


        if (item2.incServices) {

            obj += '<tr><td><strong><i>Optionele diensten</i></strong></td>';

            $.each(item2.incServices, function (k, item3) {
                obj += '<tr><td class="service">' + item3.name + '</td>';
                obj += '<td class="number"></td>';
                obj += '<td ></td>';
                obj += '<td class="price">' + item3.amount + ' X &euro; ' + item3.price2Inc + '</td></tr>';
            });
        }

        obj += '<tr><td class="buttons" align="right" colspan="4">';

        if (item2.deliverable == 1) {
            /*obj += '<tr><td class="buttons" align="right" colspan="4"><button name="addEquipment">Bestel opnieuw</button></td></tr>';*/
            //obj += '<button name="addEquipment">Bestel opnieuw</button>';
        } else if (prodType !== "special")
        {
            //obj += '<button class="disabled" disabled>Niet leverbaar</button>';
            obj += '<font color="#ff0000">Niet leverbaar&nbsp;&nbsp;&nbsp;&nbsp;</font>';
        }

        obj += '</td></tr>';
        obj += '</table></td></tr>';

        $("#myOrders tr#order" + objectId).after(obj);
        $('#myOrders .order_' + item.orderId).fadeIn(1000);

        $('.order_' + item.orderId + " button").click(function () {
            if (document.forms[1]) {
                Form = document.forms[1];
                Form.order.value = item.orderId;
                Form.action.value = this.name;
                Class = this.className;
                $(this).after('<input type="hidden" name="' + prodType + '" value="' + item2.id + '"');
            }
            this.form.submit();
        });
    }


    $("#myOrders button").unbind().click(function () {
        if (document.forms[1])
        {
            Form = document.forms[1];
            Form.order.value = $(this).parent().parent().attr("id");
            Form.action.value = this.name;
            Class = this.className;
        }

        if ($(this).attr('name') == 'again')
        {
            showMyOrderCopyNote();
            return false;
        } else
        {
            this.form.submit();
        }
    });

    $("button.disabled").unbind().click(function () {
        $(this).blur();
        return false;

    });

    /* ***************************** My orders Supliers ****************************** */
    // date picker
    if ($('.date-pick').length > 0)
    {
        $('.date-pick').datepicker({
            beforeShow: function (input) {
                $(input).parents('tr:first').addClass('noSlide');
            }
            , onClose: function (dateText, inst) {
                $(inst).val(dateText);
                $(this).parents('tr:first').removeClass('noSlide');
            }
        });
    }

    $('.date-pick').keyup(function () {
        var str = $(this).val();
        str = str.replace(/\D+\D+\D+/, '');
        if (str.length == 2 || str.length == 5) {
            str += "-";
        }
        $(this).val(str);
    });

    $("#myOrders button.deliveryMailAll").unbind().click(function () {
        var ids = '';
        $("#myOrders button.enable").each(function () {
            if (ids != '')
                ids += ",";
            ids = ids + $(this).parent().parent().attr("id");
            $(this).addClass("disabled");
            $(this).removeClass("hover");
            $(this).removeClass("enable");
            $(this).attr('disabled', 'true');

            if ($(this).parent().prev().children('input').val() != '')
            {
                $(this).parent().parent().find('input').attr('disabled', 'true').addClass('disabled');
            }
        });

        $("#myOrders button.deliveryMailAll").addClass("disabled").removeClass("hover").attr('disabled', 'true');

        $.get("/catalogus/mijnbestellingen/ajax_mailData.php?order_ids=" + ids, function (result) {

            if (result.indexOf("[") > -1)
            {
                var aProducts = result.substr(0, result.length - 1).replace(/\[/g, '').replace(/\]/g, '').split(',');
                for (var i in aProducts)
                {
                    var aProduct = aProducts[i].split('=');
                    var nodeDelivDate = $('tr#order' + aProduct[i]).find('input#deliv-' + aProduct[i]);
                    var nodeSentDate = $('tr#order' + aProduct[i]).find('input#sent-' + aProduct[i]);

                    if (nodeSentDate.val() > "")
                    {
                        $('input,a,button', 'tr#order' + aProduct[i]).attr('disabled', 'disabled').addClass('disabled');
                        //nodeDelivDate.attr('class', 'disabled').attr('disabled', 'disabled').siblings('a').css('display', 'none')
                        //nodeSentDate.attr('class', 'disabled').attr('disabled', 'disabled').siblings('a').css('display', 'none')
                    }
                }

                /*
                 aIds = ids.split(',');

                 // Loop rows, find date input fields
                 // Disable date fields when date sent is set and mail is send
                 // Supplier is allowed to chage dates when order is sent.
                 for(i in aIds)
                 {
                 nodeDelivDate = $('tr#'+aIds[i]).find('input#deliv-'+aIds[i]);
                 nodeSentDate = $('tr#'+aIds[i]).find('input#sent-'+aIds[i]);

                 if(nodeSentDate.val() > "")
                 {
                 nodeDelivDate.attr('class', 'disabled').attr('disabled', 'disabled').siblings('a').css('display', 'none')
                 nodeSentDate.attr('class', 'disabled').attr('disabled', 'disabled').siblings('a').css('display', 'none')
                 }
                 }
                 */
            }
        });
        return false;
    });

    $("#myOrders button.deliveryMail.enable").parent().parent().parent().find("button.deliveryMailAll").removeClass("disabled").removeAttr('disabled');

    $("#myOrders button.deliveryMail").unbind().click(function () {
        if (!$(this).hasClass('disabled'))
        {
            var $button = $(this);
            $button.attr("mark", "mailing_date");
            $button.addClass("disabled");
            $button.removeClass("hover");
            $button.removeClass("enable");
            $button.attr('disabled', 'true');

            var $changeingRow = $button.parents("tr:first");
            var id = $changeingRow.attr("id").replace('order', '');
            var nodeDelivDate = $changeingRow.find('input#deliv-' + id);
            var nodeSentDate = $changeingRow.find('input#sent-' + id);

            $.get("/catalogus/mijnbestellingen/ajax_mailData.php?order_ids=" + id, function (result) {
                if (result.indexOf('[') > -1)
                {
                    // Disable date fields when date sent is set and mail is send
                    // Supplier is allowed to chage dates when order is sent.
                    if (nodeSentDate.val() > "") {

                        $('input,a,button', 'tr#order' + id).attr('disabled', 'disabled').addClass('disabled');

                        //nodeDelivDate.attr('class', 'disabled').attr('disabled', 'disabled').siblings('a').css('display', 'none')
                        //nodeSentDate.attr('class', 'disabled').attr('disabled', 'disabled').siblings('a').css('display', 'none')
                    }
                }
            });

            $(this).removeAttr("mark");

            if ($('table#myOrders').find('button.enable').length == 0)
            {
                $("#myOrders button.deliveryMailAll").addClass("disabled").removeClass("hover").attr('disabled', 'true');
            }
        }
        return false;
    });

    $('.date-pick').change(function () {
        $(this).parents('tr:first').removeClass('noSlide');

        $(this).attr("mark", "changing_date");

        // Clear sent date when delivery date changes
        // Find mail button
        if ($(this).attr('id') == "deliv-" + $(this).parent().parent().attr("id").replace('order', ''))
        {
            $('#sent-' + $(this).parent().parent().attr("id")).val('');
            $nodeButton = $("input[@mark=changing_date]").parent().next().next().children("button");
        } else
        {
            $nodeButton = $("input[@mark=changing_date]").parent().next().children("button");
        }

        /*// Disable deliverydate when sent date changes
         // Find mail button
         if($(this).attr('id') == "sent-"+$(this).parent().parent().attr("id"))
         {
         $('#deliv-'+$(this).parent().parent().attr("id")).attr('class','disabled');
         $('#deliv-'+$(this).parent().parent().attr("id")).attr('disabled','disabled');
         $('#deliv-'+$(this).parent().parent().attr("id")).siblings('a').css('display','none');
         }*/

        $.get("/catalogus/mijnbestellingen/ajax_setChangeDate.php?date=" + $(this).val() + "&type=" + $(this).attr('id') + "&order_id=" + $(this).parent().parent().attr("id").replace('order', ''), function (result)
        {
            if (result === '0')
            {
                alert("U heeft een ongeldige datum ingevoerd");
                $("input[@mark=changing_date]").val('');
            } else
            {
                $nodeButton.addClass("enable");
                $nodeButton.removeClass("disabled");
                $nodeButton.removeAttr('disabled');
            }

            $("input[@mark=changing_date]").attr('mark', '');
            $("#myOrders button.deliveryMailAll").removeClass("disabled").removeAttr('disabled');
        });
    });



// ********************************** Specials *****************************************
    $(".specials form button").unbind().click(function ()
    {
        var $button = $(this)

        if ($button.hasClass("clicked"))
        {
            return false;
        } else if ($button.hasClass("previous"))
        {
            return false;
        } else
        {
            if (checkSpecials())
            {
                $button.addClass("clicked");
                this.form.submit();

                return false;
            } else
            {
                return false;
            }
        }
    });

    $(".specials form input").bind("keydown", function (e) {
        if (e.keyCode == 13 || e.keyCode == 1) {
            return false;
        }
    });

    /* unbind the enter key so you can fill and return in your text */
    $(".specials form textarea").unbind();

    $(".specials form input[name=price]").change(function ()
    {
        var $input = $(this);
        var aValue = $input.val().replace(',', '.');

        aValue = aValue.split('.');
        if (aValue.length > 1)
        {
            var sDec = aValue.pop();
        } else
        {
            var sDec = '00';
        }

        var sNum = formatCurrency(aValue.join('') + '.' + sDec);

        $input.val(sNum.replace("&euro;", ""));
    });
    $(".specials form select[name=category]").each(function () {
        specialFormCategorySelect(this, false);
    });

    $(".specials form select[name=category]").change(function () {
        specialFormCategorySelect(this, true);
    });


// ********************************** MORE BUTTONS *****************************************
    $("button").mouseover(function () {
        $(this).addClass("hover");
    });
    $("button").mouseout(function () {
        $(this).removeClass("hover");
    });

    $("button.next").mouseover(function () {
        $(this).addClass("nexthover");
    });
    $("button.next").mouseout(function () {
        $(this).removeClass("nexthover");
    });
    $("button.previous").mouseover(function () {
        $(this).addClass("prevhover");
    });
    $("button.previous").mouseout(function () {
        $(this).removeClass("prevhover");
    });


// ********************************** FAQ ACCORDION *****************************************
    $('.faq').accordion({
        header: '.head',
        active: false,
        autoheight: false
    });

// ********************************** LOCATION MODULE *****************************************
    $('a.location_colorbox').unbind().click(function ()
    {
        if (getCookie('useCookies') != '1')
        {
            return false;
        }

        var $link = $(this);
console.log($link);
        var $locationMapHtml = $('body').append('<div id="locationMapHtml"></div>');

        var sAddress = $link.children('span.address').text();
        var sLat = parseFloat($link.children('span.lat').text());
        var sLong = parseFloat($link.children('span.long').text());
        var $html = $('<div id="locationMapHtml" style="width:500px; height:500px;"><div style="height:500px; width:500px;"id="mappop"></div></div>');

        $.colorbox(
                {

                    html: $html
                }, function ()
        {

            if (!isNaN(sLat) && !isNaN(sLong))
            {
           //     var oMap = new showGoogleMaps(false, sAddress, 4, sLat, sLong);
            } else
            {
             //   var oMap = new showGoogleMaps(false, sAddress, 4, false, false);
            }
		                       
              	var RD = new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs', { // eslint-disable-line no-undef
    transformation: L.Transformation(-1, -1, 0, 0), // eslint-disable-line no-undef
    resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
    origin: [-285401.920, 903401.920],
    bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080]) // eslint-disable-line no-undef
  });

        // define RD oftewel EPSG:28992
        proj4.defs('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs');
        var lok = proj4('EPSG:28992', 'WGS84', [0, 0]);
         var map = L.map('mappop',{continuousWorld: true, crs: RD}).setView([sLat, sLong], 10);
       L.tileLayer('https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:28992/{z}/{x}/{y}.png', {
transformation: L.Transformation( -1, -1, 0, 0),
            minZoom: 3,
            maxZoom: 18,
            wtms: false,
            errorTileUrl: 'images/missing-tile-pacs.jpg', // plaatje als tegels niet worden gevonden...
        }).addTo(map); // Default kaart

		L.marker([sLat, sLong]).addTo(map);



        }
        );

        return false;
    });

    $('.news-subscription button').click(function ()
    {
        var $button = $(this);
        var sAction = $button.hasClass('subscribed') ? 'unsubscribe' : 'subscribe';


        $.post(
                '/ajax/news_subscription/change_news_subscription.php',
                {
                    'action': sAction,
                    'category_id': this.id.replace('cat_', '')
                },
                function (sJSON)
                {
                    $button
                            .unbind('click')
                            .addClass('disabled')
                            ;


                    var oResult = parseAJAX(sJSON);
                    if (typeof (oResult.results.error) != 'undefined')
                    {
                        var $msg = $('\
						<div class="msg error">\
							Uw ' + (sAction == 'subscribe' ? 'aanmelding' : 'afmelding') + ' is niet verwerkt!\
						</div>\
					');

                        if (typeof ($msg.dialog) != 'function')
                        {
                            return alert($sMsg.text());
                        }
                        return $msg.dialog({
                            'title': 'Er is een fout opgetreden',
                            model: true
                        });
                    }

                    var $msg = $('\
					<div class="msg error">\
						Uw ' + (sAction == 'subscribe' ? 'aanmelding' : 'afmelding') + ' is verwerkt!\
					</div>\
				');

                    if (typeof ($msg.dialog) != 'function')
                    {
                        return alert($msg.text());
                    }

                    $msg.dialog({
                        'title': 'Succesvol',
                        modal: true
                    });
                }
        );
    });


}); // END JEEEE Query

setTimeout(function ()
{
    $('.cookie-bar button').unbind().click(function ()
    {
        $('.cookie-bar').fadeOut('fast');

        if (this.className.indexOf('accept') > -1)
        {
            setCookie('useCookies', 1, 365);

            $.get(
                    '/ajax/cookies/store_acceptance.php',
                    function (sData)
                    {
                        document.location.reload();
                    }
            );

            return true;
        }

        setCookie('useCookies', 0, 365);
        return false;
    });
    if (getCookie('useCookies') != "1") {
        $('.cookie-bar').toggle();
        $('.cookie-bar').animate({

            'paddingTop': 20,
            'paddingBottom': 30
        }, 'slow');
    }

}, 500);

function parseAJAX(sJSON)
{
    var sNeedle = '#response#';
    if (sJSON.indexOf(sNeedle) > -1)
    {
        sJSON = sJSON.substr(
                sJSON.indexOf(sNeedle) + sNeedle.length
                );
    }

    sJSON = $.trim(sJSON);

    try
    {
        if (typeof ($.parseJSON) == 'function')
        {
            return $.parseJSON(sJSON);
        }
        return JSON.parse(sJSON);
    } catch (e)
    {
        console.log(e, sJSON);
    }
    return sJSON;
}


var iHeartbeat = 0;

function initHeartbeat(iMinutes)
{
    var iMSec = iMinutes * 60 * 1000;

    clearInterval(iHeartbeat);

    if (document.location.href.indexOf('password-expired'))
    {
        /* give the user more time to change their password */
        return false;
    }

    setInterval(heartbeat = function () {
        $.get('/heartbeat.php', function (sResult) {

            if (sResult.split(' ').length <= 1)
            {
                document.location.href = '/logout.php?lost_session';
            }
        });
    }, iMSec);

}
function hideMyOrderMenu() {
    $('#subnavlist').find('a:contains("Mijn bestellingen")').parent().parent().css('display', 'none')
}

/* SPECIAL FORM functions */
function checkSpecials() {
    submitForm = true;

    $(".specials form input:text").each(function () {

        if (checkElement($(this))) {
            name = $(this).attr("name");
            if (name == "amount") {
                $(this).attr("value", $(this).attr("value").toString().replace(/\D+\D+\D+/, ''));
            } else if (name == "price") {
//				$(this).attr("value" , $(this).attr("value").toString().replace(/[^0-9.\,]*/,''));


            }
        } else {
            submitForm = false;
        }
    });

    $(".specials form select").each(function () {
        if (checkElement($(this))) {

        } else {
            submitForm = false;
        }

    });
    $(".specials form textarea").each(function () {
        if (checkElement($(this))) {

        } else {
            submitForm = false;
        }
    });
    if (submitForm !== false) {
        return true;
    }
    return false;
}

function checkElement(obj) {

    if ($(obj).val() == "") {
        if ($(obj).parent().parent().children("th:first").html().indexOf("*") > -1) {
            $(obj).parent().parent().addClass("error");
            return false;
        }
    } else {

    }
    $(obj).parent().parent().removeClass("error");
    return true;
}

function specialFormCategorySelect(obj, doReset)
{
    if ($(obj).val() != '')
    {
        classId = 'c' + $(obj).val();

        $(".specials form select[name=suplier_id]").removeAttr('disabled');
        $(".specials form select[name=suplier_id] option").each(function () {
            if (!$(this).hasClass(classId))
            {
                $(this).appendTo($(".specials form select[name=hiddenSupliers]"));
            }
        });
        $(".specials form select[name=hiddenSupliers] option").each(function () {
            if ($(this).hasClass(classId))
            {
                $(this).appendTo($(".specials form select[name=suplier_id]"));
            }
        });
    } else
    {
        $(".specials form select[name=suplier_id]").attr('disabled', 'disabled');

        $(".specials form select[name=hiddenSupliers] option").each(function () {
            $(this).appendTo($(".specials form select[name=suplier_id]"));
        });
    }


    $(".specials form select[name=suplier_id]").sortOptions();


    if (doReset)
    {
        $(".specials form select[name=suplier_id] option").removeAttr('selected');
        $(".specials form select[name=suplier_id] option:first").attr('selected', 'selected');
    }
}



function check() {
    var error = new Array();
    i = 0;
    if (parseInt($("#diensten form input#amount").val()) > 0 && $("#diensten form input#amount").val() != "") {

    } else {
        $("#diensten form input#amount").parent().parent().css("background-color", "#F25500");
        error[i++] = "U dient een aantal op te geven";
    }


    if ($("input.checkservice:checked").size() > 0) {
        Specs = $("#diensten form input#specs").val();
        if (Specs.length == 0) {
            error[i++] = "U dient een technische specificaties bestand op te geven.";
            $("form input#specs").parent().parent().children("td").each(function () {
                $(this).css("background-color", "#F25500");
            });
        } else if (Specs.indexOf(".xls") == -1) {
            $("form input#specs").parent().parent().children("td").each(function () {
                $(this).css("background-color", "#F25500");
            });
            error[i++] = "Dit is geen geldig excel document";
        }
    }

    if (error.length > 0) {
        content = '';
        for (i = 0; i < error.length; i++) {
            if (i != 0)
                content += "<br />";
            content += error[i];
        }
        if ($("div.error").html()) {
            $("div.error").html(content);
        } else {
            $("#diensten table:first").before('<div class="error">' + content + '</div>');
        }

        return false;
    }
    return true;
}

// what is a comma sepperated string of node identifiers
function autoCheck(what)
{
    nodes = what.split(',');

    for (i in nodes)
    {
        alert(nodes[i]);
    }
}

// ********************************** SERVICES *********************************************
function calcServicePrices(amount)
{
    if (amount > -1) {

        var price = parseInt($("#price").val());

        // format equipment currency
        var subTotal;
        subTotal = price * amount
        subTotal = formatCurrency(subTotal / 100);

        // Set total for equipment
        $("#subtotal").html(subTotal);

        // Set amount for services/acc
        $("#diensten #servAmount").html(amount);
        $("#diensten #accAmount").html(amount);

        // calculate services price
        var tmpServPrice = 0;
        var tmpServTotal = 0;
        var servPrice = 0;
        var servTotal = 0;
        var tmpServPrice;
        var tmpServTotal;

        var tmpAccPrice = 0;
        var tmpAccTotal = 0;
        var accPrice = 0;
        var accTotal = 0;
        var tmpAccPrice;
        var tmpAccTotal;

        var totalSubtotal;
        var totalTotal;
        var fat;
        var totalIncFat;

        $("#diensten input.checkservice:checked").each(function ()
        {
            tmpServPrice += parseInt($(this).attr('value'));
            tmpServTotal += parseInt($(this).attr('value')) * amount;
        });
        $("#diensten input.checkaccessory:checked").each(function ()
        {
            tmpAccPrice += parseInt($(this).attr('value'));
            tmpAccTotal += parseInt($(this).attr('value')) * amount;
        });


        // format service currency
        servPrice = formatCurrency(tmpServPrice / 100);
        servTotal = formatCurrency(tmpServTotal / 100);
        accPrice = formatCurrency(tmpAccPrice / 100);
        accTotal = formatCurrency(tmpAccTotal / 100);

        // set service prices
        $("#diensten #servPrice").html(servPrice);
        $("#diensten #servTotal").html(servTotal);
        $("#diensten #accPrice").html(accPrice);
        $("#diensten #accTotal").html(accTotal);


        // calculate total prices
        totalSubtotal = price + tmpServPrice + tmpAccPrice;
        totalTotal = totalSubtotal * amount;
        fat = totalTotal * 0.21;
        totalIncFat = fat + totalTotal;



        // format Price
        totalSubtotal = formatCurrency(totalSubtotal / 100);
        totalTotal = formatCurrency(totalTotal / 100);
        fat = formatCurrency(fat / 100);
        totalIncFat = formatCurrency(totalIncFat / 100);

        // Set prices
        $("#diensten #totalSubtotal").html(totalSubtotal);
        $("#diensten #totalTotal").html(totalTotal);
        $("#diensten #fat").html(fat);
        $("#diensten #totalIncFat").html(totalIncFat);
    }
}

function enableServiceUpload()
{
    // (Un)disable file input if no services are checked
    // Shows and hides supplier specific warning text too
    if ($("#diensten input.checkservice:checked").size() > 0)
    {
        $("#diensten form input#specs").removeAttr("disabled");
        //$("div.warning").show("fast");
    } else
    {
        $("#diensten form input#specs").attr("disabled", "true");
        //$("div.warning").fadeOut("fast");

    }
}


function autoCalcAndUpload()
{
    enableServiceUpload();
    calcServicePrices(parseInt($("#diensten form input#amount").val()));
}

// ********************************** SHOPPINGCART *****************************************
function setCriteria(cleanUri, itemType, supplierId, itemId)
{
    /*if(itemType == 'equipment') id = '&equipment_id='+itemId;
     //else if(itemType == 'accessory') id = '&accessory_id='+itemId;
     //else if(itemType == 'service') id = '&service_id='+itemId;
     else if(itemType == 'service')  id = '&service_id='+itemId;
     else id = '';*/


    /*if(itemType == 'equipment' || itemType == 'service')
     {
     id = '&'+itemType+'_id='+itemId;
     }
     else id = '';*/

    id = '&' + itemType + '_id=' + itemId;

    window.open('/catalogus/bestelcriteria/' + cleanUri + '&suppid=' + supplierId + id, '_self');
}

function deleteShopcartItem(cleanUri, category, supplierId, itemId)
{
    if (confirm('Weet u zeker dat u dit item uit uw winkelwagen wilt verwijderen?'))
    {
        window.open(cleanUri + '&del=' + category + '&sid=' + supplierId + '&id=' + itemId, '_self');
        return false;
    } else
        return false;
}
// ********************************** SHOPPINGCART *****************************************



function progress_clear()
{
    for (var i = 1; i <= progressEnd; i++)
    {
        document.getElementById('progress' + i).style.backgroundColor = 'transparent';
    }
    progressAt = 0;
}

function progress_update()
{
    /*for(var j in document.forms[1].fksrtID.options)
     {
     var opt = document.forms[1].fksrtID.options[j];
     if (opt && opt.value) {
     try{
     alert('VOOR:'+opt.value);
     vals = opt.value.match(/^\d+/);
     nval = parseInt(vals[0],10);
     //$(opt).attr("value", nval.toString());
     opt.value = nval.toString();
     //alert('NA:'+opt.value+'-type:'typeof(nval.toString()));
     }catch(e){}
     }
     }*/

    document.getElementById('uploaddiv').style.display = 'block';
    document.getElementById('formulierdiv').style.display = 'none';

    progressAt++;
    if (progressAt > progressEnd)
    {
        progress_clear();
    } else
    {
        document.getElementById('progress' + progressAt).style.backgroundColor = progressColor;
    }
    progressTimer = setTimeout('progress_update()', progressInterval);
}

function progress_stop()
{
    clearTimeout(progressTimer);
    progress_clear();
}


function setSoortApparaatTekst(lijstje)
{
    var text = lijstje.options[lijstje.selectedIndex].value;
    var str = text.substring(text.indexOf('|') + 1);

    if (str == '')
        document.getElementById('DocumentenPerSoortApparaat').style.display = 'none';
    else
    {
        var node = document.getElementById('DocumentenPerSoortApparaat')
        if (node.childNodes[0])
            node.removeChild(node.childNodes[0]);

        NewText = document.createTextNode(str);
        document.getElementById('DocumentenPerSoortApparaat').appendChild(NewText);
        document.getElementById('DocumentenPerSoortApparaat').style.display = 'block';
    }
}

/* Einde van de progress bar */

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');

    if (isNaN(num))
        num = "0";

    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();

    if (cents < 10)
        cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));

    return (((sign) ? '' : '-') + '&euro; ' + num + ',' + cents);
}

// popup
function vorigeVolgende() {
    $(".popup span").each(function () {
        $(this).unbind().remove();
    });

    for (i = 0; i < $(".popup a").size(); i++) {

        $(".popup a:nth(" + i + ")").html($(".popup a:nth(" + i + ")").html().replace("[", "").replace("]", ""));



        if ($(".popup a:nth(" + i + ")").attr("href") == $(".popup img").attr("src")) {
            if ($(".popup a:first").attr("href") != $(".popup img").attr("src")) {
                $(".popup a:first").before("<span id='" + $(".popup a:nth(" + (i - 1) + ")").attr("href") + "'>&laquo;Vorige</span");
            }

            $(".popup a:nth(" + i + ")").html("[" + $(".popup a:nth(" + i + ")").html() + "]");

            if ($(".popup a:last").attr("href") != $(".popup img").attr("src")) {
                $(".popup a:last").after("<span id='" + $(".popup a:nth(" + (i + 1) + ")").attr("href") + "'>Volgende&raquo;</span");
            }
        }
    }
    $(".popup span").click(function () {
        $(".popup img").fadeOut(1000);
        $(".popup img").fadeIn(1000);
        $(".popup img").attr("src", $(this).attr("id"));
        vorigeVolgende();
        return false;
    });

}

var orderId;
function showMyOrderCopyNote()
{
    $('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"></div>');
    var arrPageSizes = ___getPageSize();
    // Style overlay and show it
    $('#jquery-overlay').css({
        opacity: 0.5,
        width: arrPageSizes[0],
        height: arrPageSizes[1]
    }).fadeIn('slow');

    $('#jquery-lightbox').fadeIn('slow');

    $('#jquery-lightbox').html('<h1>U wilt een bestaande bestelling kopi&euml;ren</h1><br />Indien u nog wijzigingen in deze bestelling wilt aanbrengen dient u in het volgende scherm eerst op &nbsp;<span class="button">Bestelling aanpassen</span> te klikken.<br /><br />Als opnieuw diensten worden meebesteld dienen ook nieuwe configuratie templates te worden meegestuurd.<button class="ok">Ok</button>');
    $('div#werkBlad button').attr('disabled', 'disabled');

    $("#jquery-lightbox button").unbind().click(function () {
        if ($(this).hasClass('ok'))
        {
            $('form#my_orders input[name=action]').val('again');
            $('form#my_orders input[name=order]').val(orderId);
            $('form#my_orders').submit();
            return false;
        } else
        {
            return false;
        }
    });
    $("button.ok").mouseover(function () {
        $(this).addClass("hover");
    });
    $("button.ok").mouseout(function () {
        $(this).removeClass("hover");
    });
    $('#jquery-lightbox span').css({'cursor': 'default'});

    $('#jquery-overlay').queue(function () {
        $('#jquery-lightbox').fadeIn('slow');
        $(this).dequeue();
    });
    return false;
}

/*
 * Sort options (ascending or descending) in a select box (or series of select boxes)
 *
 * @name     sortOptions
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @param    ascending   Sort ascending (true/undefined), or descending (false)
 * @example  // ascending
 *           jQuery("#myselect").sortOptions(); // or jQuery("#myselect").sortOptions(true);
 *           // descending
 *           jQuery("#myselect").sortOptions(false);
 *
 *	className added by KV iSource
 */
jQuery.fn.sortOptions = function (ascending)
{
    this.each(
            function ()
            {
                if (this.nodeName.toLowerCase() != "select")
                    return;
                // default sort is ascending if parameter is undefined
                ascending = typeof ascending == "undefined" ? true : ascending;
                // get number of options
                var optionsLength = this.options.length;
                // create an array for sorting
                var sortArray = [];
                // loop through options, adding to sort array
                for (var i = 0; i < optionsLength; i++)
                {
                    sortArray[i] =
                            {
                                value: this.options[i].value,
                                text: this.options[i].text,
                                className: this.options[i].className
                            };
                }

                // sort items in array
                sortArray.sort(
                        function (option1, option2)
                        {
                            // option text is made lowercase for case insensitive sorting
                            option1text = option1.text.toLowerCase();
                            option2text = option2.text.toLowerCase();
                            // if options are the same, no sorting is needed
                            if (option1text == option2text)
                                return 0;
                            if (ascending)
                            {
                                return option1text < option2text ? -1 : 1;
                            } else
                            {
                                return option1text > option2text ? -1 : 1;
                            }
                        }
                );
                // change the options to match the sort array
                for (var i = 0; i < optionsLength; i++)
                {
                    this.options[i].text = sortArray[i].text;
                    this.options[i].value = sortArray[i].value;
                    this.options[i].className = sortArray[i].className;
                }
            }
    )
    return this;
}
function ___getPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY)
    {
        xScroll = window.innerWidth + window.scrollMaxX;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight)
    { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else
    { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) {	// all except Explorer
        if (document.documentElement.clientWidth)
        {
            windowWidth = document.documentElement.clientWidth;
        } else
        {
            windowWidth = self.innerWidth;
        }
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight)
    { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body)
    { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight)
    {
        pageHeight = windowHeight;
    } else
    {
        pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth)
    {
        pageWidth = xScroll;
    } else
    {
        pageWidth = windowWidth;
    }
    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
    return arrayPageSize;
}
;

function sendConfigTpl(tpl)
{
    $.get('/catalogus/ajax_sendtpl.php?tpl=' + tpl, function (res) {
        if (res == 'success')
        {
            alert('Het document is naar uw e-mail adres verstuurd.');
        } else
        {
            alert('Het document kon niet worden verstuurd. Wanneer u het document ook niet kunt downloaden, neem dan contact op met VtsPN.;')
        }
    })
}

var setCookie = function (c_name, value, exdays, path)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value)
            + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString())
            + '; path=/'
            ;

    document.cookie = c_name + "=" + c_value;
}

var getCookie = function (c_name)
{
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++)
    {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");

        if (x == c_name)
        {
            return unescape(y);
        }
    }
}
