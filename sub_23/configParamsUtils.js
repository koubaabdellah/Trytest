define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getConfigParamsSection = void 0;
    function getConfigParamsSection(configParams, id) {
        return configParams.find(function (section) { return section.id === id; });
    }
    exports.getConfigParamsSection = getConfigParamsSection;
});
