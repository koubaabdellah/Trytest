define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getShareLevelMessage = exports.getGroupMessage = void 0;
    function getGroupMessage(itemHasGroups, message) {
        return itemHasGroups ? " " + message : "";
    }
    exports.getGroupMessage = getGroupMessage;
    function getShareLevelMessage(access, messages, groupMessage) {
        var shareLevel = messages.shareLevel;
        return access === "public"
            ? "" + shareLevel.public.label + groupMessage
            : access === "org"
                ? "" + shareLevel.org.label + groupMessage
                : access === "private" || access === "shared"
                    ? "" + shareLevel.private.label + groupMessage
                    : undefined;
    }
    exports.getShareLevelMessage = getShareLevelMessage;
});
