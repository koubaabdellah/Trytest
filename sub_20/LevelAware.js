define(["require", "exports"], function (require, exports) {
    "use strict";
    var LevelAware = (function () {
        function LevelAware() {
            this.SYSTEM_ROLES = {
                VIEWER: "iAAAAAAAAAAAAAAA",
                DATA_EDITOR: "iBBBBBBBBBBBBBBB"
            };
            this.LICENSE_LEVELS = {
                ONE: "1",
                ONE_PLUS_EDIT: "11",
                TWO: "2"
            };
        }
        return LevelAware;
    }());
    return LevelAware;
});
