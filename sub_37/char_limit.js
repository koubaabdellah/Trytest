jQuery.fn.show_char_limit=function(e,t){t||(t={}),"number"==typeof e?t.maxlength=e:t=e||{};var r=jQuery.extend({error_class:"error",status_style:"text",status_element_suffix:"__status"},t),s=function(e){var t=(e=jQuery(e)).val().length,s=e.attr("maxlength");(!s||""==s||-1==s||s>5e5)&&(s=r.maxlength);var a,l=s-t;if("chars_typed"==r.status_style)a=""+t;else if("chars_left"==r.status_style)a=""+l;else{var n=l>=0?"left":"over",u=1!=Math.abs(l)?"characters":"character";a=Math.abs(l)+" "+u+" "+n}if(l<=0){var i=e.val();e.val(i.substring(0,i.length+l))}var _=r.status_element?r.status_element:"#"+e.attr("id")+r.status_element_suffix;if(0==jQuery(_).length){if(""==e.attr("id")){var f=""+Math.floor(9999999999*Math.random());e.attr("id",f),_="#"+f+r.status_element_suffix}e.after('<span class="status" id="'+e.attr("id")+r.status_element_suffix+'"></span>')}if(jQuery(_).html(a),r.error_element||r.error_element_suffix){_=r.error_element?r.error_element:"#"+e.attr("id")+r.error_element_suffix;l<0?jQuery(_).addClass(r.error_class):jQuery(_).removeClass(r.error_class)}};return this.each((function(){s(this),jQuery(this).keyup((function(){s(this)}))}))};