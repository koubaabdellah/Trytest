var oc_style = {
    container          : 'oc_container',         // name of the DIV where the chart will be drawn
    vline              : 15,                     // size of the smallest vertical line of connectors
    hline              : 10,                     // size of the smallest horizontal line of connectors
    inner_padding      : [0,2],                     // space from text to box border
    box_color          : '#EAE8F1',                 // fill color of boxes
    box_color_hover    : '#EAE8F1',                 // fill color of boxes when mouse is over them
    box_border_color   : '#EAE8F1',                 // stroke color of boxes
    line_color         : '#D3D1D9',                 // color of connectors
    title_color        : '#6C6B7E',                // color of titles
    subtitle_color     : '#6C6B7E',                 // color of subtitles
    title_font_size    : 11,                     // size of font used for displaying titles inside boxes
    subtitle_font_size : 10,                     // size of font used for displaying subtitles inside boxes
    title_char_size    : [ 6.5, 15 ],              // size (x, y) of a char of the font used for displaying titles
    subtitle_char_size : [ 5, 10 ],              // size (x, y) of a char of the font used for displaying subtitles
    max_text_width     : 10,                    // max width (in chars) of each line of text ('0' for no limit)
    min_box_width      : 70,                    //the minimum box width
    text_font          : 'Arial',              // font family to use (should be monospaced)
    use_images         : false,             // use images within boxes?
    box_click_handler  : null   // handler (function) called on click on boxes (set to null if no handler)
};

var OC_DEBUG = false;
var oc_data;

(function ($, Drupal) {

    'use strict';

    Drupal.behaviors.ACMThemeOrganoGram = {
        attach: function (context, settings) {
            if ($("#organogram", context).length) {
                oc_data = Drupal.behaviors.ACMThemeOrganoGram.get_oc_data($("#organogram", context));
                oc_render();
            }
        },
        get_oc_data: function(chart) {
            return {
                title: chart.attr('title'),
                root: Drupal.behaviors.ACMThemeOrganoGram.get_orgchart_children(chart)[0]
            };
        },
        get_orgchart_children: function(parent) {
            var children = new Array();

            $(parent).children("li").each(function(){
                var title = $(this).clone();
                $('br', title).replaceWith('||');

                var strTitle = title.children().remove().end().text();

                strTitle = strTitle.replace(/^[\s\r\n]+/, '');
                strTitle = strTitle.replace(/[\s\r\n]+$/, '');
                strTitle = strTitle.replace(/\|\|/gi, "\n");

                var child = {title: strTitle, type: $(this).attr('class')};
                if($(this).children('ul').length > 0) {
                    child["children"] = Drupal.behaviors.ACMThemeOrganoGram.get_orgchart_children($(this).children('ul'));
                }
                children.push(child);
            });
            return children;
        }
    };

}(jQuery, Drupal));



