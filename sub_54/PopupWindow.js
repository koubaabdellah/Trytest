/*
 | Copyright 2015 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./PopupWindow.html",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-geometry",
    "dojo/dom-style",
    "dojo/on",
    "application/lib/SvgHelper"
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    template,
    array,
    lang,
    domClass,
    domGeom,
    domStyle,
    on,
    SvgHelper
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        /**
         * Widget constructor
         * @param {object} initialProps Initialization properties:
         *     appConfig: Application configuration
         *     showClose: Indicates if close button should be shown (defaults to false)
         *     minimumMargin: The margin in pixels between the popup and the document body; "minimum" because
         *              the margin might be larger if a maximum width and/or height parameter restricts the
         *              popup dimensions, but the margin will not be less than the minimum (defaults to 10)
         *     maxima: Object with the maximum "height" and "width"; use 0 for either to indicate that there
         *              is no maximum; "maximum" because the popup is ultimately constrained by the dimensions
         *              of the document body and the minimum margin (defaults to {"width": 0, "height": 0})
         * @constructor
         */
        constructor: function () {
            this.baseClass = "popupWidget";
            this.showClose = false;
            this.minimumMargin = 10;
            this.maxima = { // default is no maximum in either direction
                "width": 0,
                "height": 0
            };

            /**
             * Create an attribute 'displayTitle' and use _setDisplayTitleAttr to map to DOM Node:popupTitle to display text
             */
            this.displayTitle = "";
            this._setDisplayTitleAttr = {
                node: "popupTitle",
                type: "innerHTML"
            };

            /**
             * Create an attribute 'displayText' and use _setDisplayTextAttr to map to DOM Node:popupContent to display text
             */
            this.displayText = "";
            this._setDisplayTextAttr = {
                node: "popupContent",
                type: "innerHTML"
            };
        },

        /**
         * Initializes the widget once the DOM structure is ready
         */
        postCreate: function () {
            var i18n = this.appConfig.i18n.popup_Close,
                closeIconSurface;

            closeIconSurface = SvgHelper.createSVGItem(this.appConfig.closeIcon, this.closeBtn, 20, 20);
            SvgHelper.changeColor(closeIconSurface, this.appConfig.theme.header.text);
            // Run any parent postCreate processes - can be done at any point
            this.inherited(arguments);

            // Add tooltip to the UI
            this.closeBtn.title = i18n.closeButtonTooltip;

            //check the value of showClose Button
            if (this.showClose) {
                this.closeBtn.style.display = "block";
            }

        },

        /**
         * Causes the widget to become visible and positions it to the center of the page.
         */
        show: function () {
            // Collapse title if empty
            if (this.displayTitle.length === 0) {
                domClass.add(this.popupTitleContainer, "popupTitleContainerEmpty");
            }
            else {
                domClass.remove(this.popupTitleContainer, "popupTitleContainerEmpty");
            }

            // Change display from none to block
            this.domNode.style.visibility = "hidden";
            this.domNode.style.display = "block";
            this.domNode.style.visibility = "visible";
        },

        /**
         * Causes the widget to become hidden.
         */
        hide: function () {
            domStyle.set(this.domNode, "display", "none");
        },

        /**
         * Handles click event for close button by hiding the widget.
         */
        onCloseClick: function () {
            this.hide();
        }
    });
});
