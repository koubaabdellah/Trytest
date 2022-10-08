define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scaleRangeStops = exports.shadowRootStyles = exports.effectTypes = exports.angles = exports.absoluteUnit = exports.blendModeList = exports.defaultEffects = void 0;
    exports.defaultEffects = [
        {
            type: "bloom",
            output: null,
            initialValue: 0,
            default: "bloom(0)",
            isEditing: false,
            params: [
                {
                    type: "strength",
                    toJSONType: "strength",
                    min: 0,
                    max: 10,
                    step: 0.25,
                    unit: null,
                    value: null,
                    initialValue: 0,
                    isInitialValue: true
                },
                {
                    type: "radius",
                    toJSONType: "radius",
                    min: 0,
                    max: 10,
                    step: 0.25,
                    unit: "px",
                    value: null,
                    initialValue: 0,
                    isInitialValue: true
                },
                {
                    type: "threshold",
                    toJSONType: "threshold",
                    min: 0,
                    max: 1,
                    step: 0.01,
                    unit: null,
                    value: null,
                    initialValue: 0,
                    isInitialValue: true
                }
            ]
        },
        {
            type: "blur",
            toJSONType: "radius",
            min: 0,
            max: 50,
            step: 1,
            unit: "px",
            output: null,
            value: null,
            initialValue: 0,
            isInitialValue: true,
            default: "blur(0)",
            isEditing: false
        },
        {
            type: "brightness",
            toJSONType: "amount",
            min: 0,
            max: 3,
            step: 0.01,
            unit: null,
            output: null,
            value: null,
            initialValue: 1,
            isInitialValue: true,
            default: "brightness(1)",
            isEditing: false
        },
        {
            type: "contrast",
            toJSONType: "amount",
            min: 0,
            max: 3,
            step: 0.01,
            unit: null,
            output: null,
            value: null,
            initialValue: 1,
            isInitialValue: true,
            default: "contrast(1)",
            isEditing: false
        },
        {
            type: "drop-shadow",
            output: null,
            initialValue: 0,
            default: "drop-shadow(0,0,0)",
            isEditing: false,
            params: [
                {
                    type: "offset-x",
                    toJSONType: "xoffset",
                    min: -50,
                    max: 50,
                    step: 1,
                    unit: "px",
                    value: null,
                    initialValue: 0,
                    isInitialValue: true
                },
                {
                    type: "offset-y",
                    toJSONType: "yoffset",
                    min: -50,
                    max: 50,
                    step: 1,
                    unit: "px",
                    value: null,
                    initialValue: 0,
                    isInitialValue: true
                },
                {
                    type: "blur-radius",
                    toJSONType: "blurRadius",
                    min: 0,
                    max: 50,
                    step: 1,
                    unit: "px",
                    value: null,
                    initialValue: 0,
                    isInitialValue: true
                },
                {
                    type: "color",
                    toJSONType: "color",
                    value: null,
                    initialValue: "#000000",
                    isInitialValue: true
                }
            ]
        },
        {
            type: "grayscale",
            toJSONType: "amount",
            min: 0,
            max: 1,
            step: 0.01,
            unit: null,
            output: null,
            value: null,
            initialValue: 0,
            isInitialValue: true,
            default: "grayscale(0)",
            isEditing: false
        },
        {
            type: "hue-rotate",
            toJSONType: "angle",
            min: 0,
            max: 360,
            step: 1,
            unit: "deg",
            output: null,
            value: null,
            initialValue: 0,
            isInitialValue: true,
            default: "hue-rotate(0)",
            isEditing: false
        },
        {
            type: "invert",
            toJSONType: "amount",
            min: 0,
            max: 1,
            step: 0.01,
            unit: null,
            output: null,
            value: null,
            initialValue: 0,
            isInitialValue: true,
            default: "invert(0)",
            isEditing: false
        },
        {
            type: "opacity",
            toJSONType: "amount",
            min: 0,
            max: 1,
            step: 0.01,
            unit: null,
            output: null,
            value: null,
            initialValue: 1,
            isInitialValue: true,
            default: "opacity(1)",
            isEditing: false
        },
        {
            type: "saturate",
            toJSONType: "amount",
            min: 0,
            max: 5,
            step: 0.01,
            unit: null,
            output: null,
            value: null,
            initialValue: 1,
            isInitialValue: true,
            default: "saturate(1)",
            isEditing: false
        },
        {
            type: "sepia",
            toJSONType: "amount",
            min: 0,
            max: 1,
            step: 0.01,
            unit: null,
            output: null,
            value: null,
            initialValue: 0,
            isInitialValue: true,
            default: "sepia(0)",
            isEditing: false
        }
    ];
    exports.blendModeList = {
        lighten: [
            "lighter",
            "lighten",
            "screen",
            "color-dodge",
            "darken",
            "color-burn",
            "plus"
        ],
        darken: [
            "darken",
            "color-burn",
            "multiply"
        ],
        contrast: [
            "overlay",
            "hard-light",
            "soft-light",
            "vivid-light"
        ],
        component: [
            "color",
            "saturation",
            "luminosity",
            "hue"
        ],
        compositing: [
            "destination-over",
            "destination-atop",
            "destination-in",
            "destination-out",
            "source-atop",
            "source-in",
            "source-out",
            "xor"
        ],
        invert: [
            "invert",
            "reflect",
            "average",
            "difference",
            "exclusion",
            "minus"
        ]
    };
    exports.absoluteUnit = ["px", "cm", "mm", "in", "pc", "pt"];
    exports.angles = ["deg", "rad", "grad", "turns"];
    exports.effectTypes = [
        "bloom",
        "blur",
        "brightness",
        "contrast",
        "drop-shadow",
        "grayscale",
        "hue-rotate",
        "invert",
        "opacity",
        "saturate",
        "sepia"
    ];
    exports.shadowRootStyles = {
        effect: ":host([active]) .accordion-item-content {\n    padding: 0 0 0 16px!important;\n    display: flex!important;\n    justify-content: space-between!important;\n  }\n  :host .accordion-item-content, :host .accordion-item-header {\n    padding: 0.5rem!important;\n  }",
        effectParams: ":host([active]) .accordion-item-content {\n    padding: 16px 0 16px 16px!important;\n  }\n  :host .accordion-item-content, :host .accordion-item-header {\n    padding: 0.5rem!important;\n  }"
    };
    exports.scaleRangeStops = [
        { id: "room", maxScale: 100 },
        { id: "rooms", maxScale: 400 },
        { id: "smallBuilding", maxScale: 800 },
        { id: "building", maxScale: 1999 },
        { id: "buildings", maxScale: 3999 },
        { id: "street", maxScale: 7499 },
        { id: "streets", maxScale: 14999 },
        { id: "neighborhood", maxScale: 29999 },
        { id: "town", maxScale: 59999 },
        { id: "city", maxScale: 119999 },
        { id: "cities", maxScale: 249999 },
        { id: "metropolitan", maxScale: 499999 },
        { id: "county", maxScale: 999999 },
        { id: "counties", maxScale: 1999999 },
        { id: "stateProvince", maxScale: 3999999 },
        { id: "statesProvinces", maxScale: 6999999 },
        { id: "smallCountry", maxScale: 14999999 },
        { id: "largeCountry", maxScale: 34999999 },
        { id: "continent", maxScale: 99999999 },
    ];
});
