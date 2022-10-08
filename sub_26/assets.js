define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_CONFIG = exports.transitions = exports.positions = exports.defaultSlide = void 0;
    exports.defaultSlide = {
        id: null,
        map: {
            disableScroll: false,
            hiddenLayers: [],
            includePopup: false
        },
        slideContent: {
            title: null,
            slideNote1Enabled: true,
            slideNote1: {
                position: "bottom-right",
                backgroundColor: "#e8ffd2",
                content: null
            },
            slideNote2Enabled: false,
            slideNote2: {
                position: "bottom-right",
                backgroundColor: "#e8ffd2",
                content: null
            }
        }
    };
    exports.positions = ["bottom-left", "bottom-right", "top-left", "top-right"];
    exports.transitions = ["animate", "fade", "slowFade", "none"];
    exports.DEFAULT_CONFIG = {
        toolbar: {
            items: [
                "bold",
                "italic",
                "fontColor",
                "|",
                "bulletedList",
                "numberedList",
                "indent",
                "outdent",
                "-",
                "alignment",
                "|",
                "link",
                "imageUpload",
                "insertTable",
                "-",
                "heading",
                "removeFormat",
                "sourceEditing"
            ],
            shouldNotGroupWhenFull: true
        },
        image: {
            types: ["png", "jpeg", "jpg"]
        },
        link: {
            decorators: {
                isExternal: {
                    mode: "manual",
                    label: "Open in a new tab",
                    defaultValue: true,
                    attributes: {
                        target: "_blank"
                    }
                }
            },
            defaultProtocol: "https://"
        }
    };
});
