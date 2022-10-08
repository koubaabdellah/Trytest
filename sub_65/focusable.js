define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isFocusable = exports.isDisabled = exports.isHidden = void 0;
    function isHidden($elem) {
        return ($elem.hasAttribute("hidden") ||
            ($elem.hasAttribute("aria-hidden") &&
                $elem.getAttribute("aria-hidden") !== "false") ||
            $elem.style.display === "none" ||
            $elem.style.opacity === "0" ||
            $elem.style.visibility === "hidden" ||
            $elem.style.visibility === "collapse");
    }
    exports.isHidden = isHidden;
    function isDisabled($elem) {
        return ($elem.hasAttribute("disabled") ||
            ($elem.hasAttribute("aria-disabled") &&
                $elem.getAttribute("aria-disabled") !== "false"));
    }
    exports.isDisabled = isDisabled;
    function isFocusable($elem) {
        if ($elem.getAttribute("tabindex") === "-1" ||
            isHidden($elem) ||
            isDisabled($elem)) {
            return false;
        }
        return ($elem.hasAttribute("tabindex") ||
            (($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) &&
                $elem.hasAttribute("href")) ||
            $elem instanceof HTMLButtonElement ||
            $elem instanceof HTMLInputElement ||
            $elem instanceof HTMLTextAreaElement ||
            $elem instanceof HTMLSelectElement ||
            $elem instanceof HTMLIFrameElement);
    }
    exports.isFocusable = isFocusable;
});
