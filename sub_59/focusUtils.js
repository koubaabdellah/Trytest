define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleItemCreatorFocus = exports.handleFocusElFromSettingsPanel = exports.focusSectionEl = exports.focusLastFocusableEl = exports.focusFirstFocusableEl = exports.focusNode = void 0;
    var FOCUSABLE_EL_SELECTORS = 'button:not([disabled]), [href], input[type="text"], input[type="number"], input[type="radio"], select, textarea, [tabindex]:not([tabindex="-1"]), calcite-switch, calcite-button:not([disabled]), calcite-action, calcite-value-list-item, calcite-radio-group';
    function getFocusableElements(container) {
        if (!container)
            return;
        var focusableEl = container.querySelectorAll(FOCUSABLE_EL_SELECTORS);
        return focusableEl;
    }
    function focusNode(id, firstChild) {
        if (!id)
            return;
        var count = 0;
        var interval = setInterval(function () {
            var container = document.getElementById(id);
            var node = firstChild && container
                ? container.firstChild
                : container;
            if (node) {
                if (typeof (node === null || node === void 0 ? void 0 : node["setFocus"]) === "function") {
                    var button = node;
                    button.setFocus();
                }
                else {
                    node.focus();
                }
            }
            if (document.activeElement === node || count === 25) {
                clearInterval(interval);
                count = 0;
                return;
            }
            count++;
        }, 0);
    }
    exports.focusNode = focusNode;
    function focusFirstFocusableEl(container) {
        var focusableElements = getFocusableElements(container);
        var firstFocusableEl = focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements[0];
        if (!firstFocusableEl)
            return;
        var interval = setInterval(function () {
            if (firstFocusableEl) {
                if (typeof (firstFocusableEl === null || firstFocusableEl === void 0 ? void 0 : firstFocusableEl["setFocus"]) === "function") {
                    var button = firstFocusableEl;
                    button.setFocus();
                }
                else {
                    firstFocusableEl.focus();
                }
            }
            if (document.activeElement === firstFocusableEl) {
                clearInterval(interval);
                return;
            }
        }, 0);
    }
    exports.focusFirstFocusableEl = focusFirstFocusableEl;
    function focusLastFocusableEl(container) {
        var focusableElements = getFocusableElements(container);
        if (!(focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements.length))
            return;
        var lastFocusableEl = focusableElements[focusableElements.length - 1];
        var interval = setInterval(function () {
            lastFocusableEl.focus();
            if (document.activeElement === lastFocusableEl) {
                clearInterval(interval);
                return;
            }
        }, 0);
    }
    exports.focusLastFocusableEl = focusLastFocusableEl;
    function focusSectionEl(currentSectionIndex) {
        var sectionsCalciteActionNode = document.querySelector(".esri-config-panel__calcite-action-node[data-section-index=\"" + currentSectionIndex + "\"]");
        if (typeof (sectionsCalciteActionNode === null || sectionsCalciteActionNode === void 0 ? void 0 : sectionsCalciteActionNode["setFocus"]) === "function") {
            sectionsCalciteActionNode.setFocus();
        }
    }
    exports.focusSectionEl = focusSectionEl;
    function handleFocusElFromSettingsPanel(e) {
        var node = e.target;
        var settingsContainerSel = ".esri-config-panel__settings-panel-container";
        var settingsContainerNode = document.querySelector(settingsContainerSel);
        var backButton = document.querySelector(".esri-config-panel__back-button");
        if (settingsContainerNode === null || settingsContainerNode === void 0 ? void 0 : settingsContainerNode.contains(backButton)) {
            return;
        }
        var focusableElements = getFocusableElements(settingsContainerNode);
        if (!(focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements.length))
            return;
        var firstFocusableEl = focusableElements[0];
        var lastFocusableEl = focusableElements[focusableElements.length - 1];
        var isTab = e.code === "Tab";
        var shiftKeyPressed = e.shiftKey;
        var currentSectionIndex = parseInt(e.target.getAttribute("data-section-index"));
        if (focusableElements.length === 1) {
            focusSectionEl(currentSectionIndex);
        }
        else if (node === firstFocusableEl) {
            if (isTab && shiftKeyPressed) {
                focusSectionEl(currentSectionIndex);
            }
        }
        else if (node === lastFocusableEl) {
            if (isTab && !shiftKeyPressed) {
                focusSectionEl(currentSectionIndex);
            }
        }
    }
    exports.handleFocusElFromSettingsPanel = handleFocusElFromSettingsPanel;
    function handleItemCreatorFocus(e) {
        var currentSectionIndex = parseInt(e.target.getAttribute("data-section-index"));
        focusSectionEl(currentSectionIndex);
    }
    exports.handleItemCreatorFocus = handleItemCreatorFocus;
});
