define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logSwitchConfigModeInfo = exports.logSearchSelection = exports.logConfigPanelPublish = void 0;
    function logConfigPanelPublish(telemetry, expressEnabled, appId, templateType) {
        telemetry.logEvent({
            category: "Config Panel",
            action: "Publish Button Click",
            label: expressEnabled ? "Express Setup" : "Full Setup",
            attribute: appId,
            details: templateType
        });
    }
    exports.logConfigPanelPublish = logConfigPanelPublish;
    function logSearchSelection(telemetry, searchValue, appId, templateType, expressEnabled) {
        telemetry.logEvent({
            category: "Config Panel",
            action: "Settings Search Selection",
            label: (expressEnabled ? "Express Setup" : "Full Setup") + ":::" + searchValue,
            attribute: appId,
            details: templateType
        });
    }
    exports.logSearchSelection = logSearchSelection;
    function logSwitchConfigModeInfo(telemetry, initiator, templateType, newMode, switchCount) {
        telemetry.logEvent({
            category: "Config Panel",
            action: "Switch Config Panel Mode",
            label: newMode + ":::" + switchCount,
            attribute: initiator,
            details: templateType
        });
    }
    exports.logSwitchConfigModeInfo = logSwitchConfigModeInfo;
});
