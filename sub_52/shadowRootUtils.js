define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleShadowRootStyles = void 0;
    function handleShadowRootStyles(calciteElement, styles) {
        var style = document.createElement("style");
        style.innerHTML = styles;
        calciteElement.shadowRoot.appendChild(style);
    }
    exports.handleShadowRootStyles = handleShadowRootStyles;
});
