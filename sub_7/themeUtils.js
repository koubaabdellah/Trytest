/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.​
*/
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkCustomTheme = exports.createAndAppendStyles = exports.updateThemeConfig = exports.createSharedTheme = exports.handleFontStyles = exports.handleCustomTheme = exports.handleSharedTheme = void 0;
    function handleSharedTheme(sharedTheme, config) {
        var customTheme = config.customTheme;
        cleanUp();
        if (!(customTheme === null || customTheme === void 0 ? void 0 : customTheme.applySharedTheme))
            return;
        var customStyles = createPrimaryStyles(config, sharedTheme);
        createAndAppendStyles(customStyles);
    }
    exports.handleSharedTheme = handleSharedTheme;
    function handleCustomTheme(config) {
        var customTheme = config.customTheme;
        cleanUp();
        if (!customTheme)
            return;
        if (customTheme === undefined || customTheme === null)
            return;
        var themes = null;
        var themeStyles = "";
        if ((customTheme === null || customTheme === void 0 ? void 0 : customTheme.themes) && (customTheme === null || customTheme === void 0 ? void 0 : customTheme.applyPresetTheme)) {
            themes = JSON.parse(JSON.stringify(customTheme.themes));
            var primary = themes.primary;
            var primaryStyles = createPrimaryStyles(config, primary);
            if (primaryStyles)
                themeStyles += primaryStyles;
        }
        var fontStyles = createFontStyle(config);
        if (fontStyles)
            themeStyles += fontStyles;
        createAndAppendStyles(themeStyles);
    }
    exports.handleCustomTheme = handleCustomTheme;
    function handleFontStyles(config) {
        var fontStyles = createFontStyle(config);
        return fontStyles;
    }
    exports.handleFontStyles = handleFontStyles;
    function createSharedTheme(config, portal) {
        var _a, _b, _c, _d, _e, _f, _g;
        var applySharedTheme = config.applySharedTheme, customTheme = config.customTheme;
        if (!(customTheme === null || customTheme === void 0 ? void 0 : customTheme.applySharedTheme) && (customTheme !== null && customTheme !== undefined))
            return;
        var sharedTheme = null;
        if ((portal === null || portal === void 0 ? void 0 : portal.portalProperties) && (applySharedTheme || (customTheme === null || customTheme === void 0 ? void 0 : customTheme.applySharedTheme))) {
            var theme = (_a = portal === null || portal === void 0 ? void 0 : portal.portalProperties) === null || _a === void 0 ? void 0 : _a.sharedTheme;
            sharedTheme = {
                background: (((_b = theme === null || theme === void 0 ? void 0 : theme.header) === null || _b === void 0 ? void 0 : _b.background) &&
                    ((_c = theme === null || theme === void 0 ? void 0 : theme.header) === null || _c === void 0 ? void 0 : _c.background) !== "no-color") ? theme.header.background : null,
                text: (((_d = theme === null || theme === void 0 ? void 0 : theme.header) === null || _d === void 0 ? void 0 : _d.text) &&
                    ((_e = theme === null || theme === void 0 ? void 0 : theme.header) === null || _e === void 0 ? void 0 : _e.text) !== "no-color") ? theme.header.text : null,
                logo: (_f = theme === null || theme === void 0 ? void 0 : theme.logo) === null || _f === void 0 ? void 0 : _f.small,
                logoLink: (_g = theme === null || theme === void 0 ? void 0 : theme.logo) === null || _g === void 0 ? void 0 : _g.link
            };
        }
        return sharedTheme;
    }
    exports.createSharedTheme = createSharedTheme;
    function updateThemeConfig(config) {
        var _a, _b, _c, _d;
        if ((config === null || config === void 0 ? void 0 : config.customTheme) !== null && (config === null || config === void 0 ? void 0 : config.customTheme) !== undefined) {
            if (((_a = config === null || config === void 0 ? void 0 : config.customTheme) === null || _a === void 0 ? void 0 : _a.applySharedTheme) !== null && ((_b = config === null || config === void 0 ? void 0 : config.customTheme) === null || _b === void 0 ? void 0 : _b.applySharedTheme) !== undefined) {
                config.applySharedTheme = config === null || config === void 0 ? void 0 : config.customTheme.applySharedTheme;
            }
            if (((_c = config === null || config === void 0 ? void 0 : config.customTheme) === null || _c === void 0 ? void 0 : _c.theme) !== null && ((_d = config === null || config === void 0 ? void 0 : config.customTheme) === null || _d === void 0 ? void 0 : _d.theme) !== undefined) {
                config.theme = config.customTheme.theme;
            }
        }
    }
    exports.updateThemeConfig = updateThemeConfig;
    function lightenOrDarkenColor(hex, percent) {
        if (!hex)
            return;
        var usePound = false;
        if (hex[0] === "#") {
            hex = hex.slice(1);
            usePound = true;
        }
        var num = parseInt(hex, 16);
        var r = (num >> 16) + percent;
        if (r > 255) {
            r = 255;
        }
        else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00ff) + percent;
        if (b > 255) {
            b = 255;
        }
        else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000ff) + percent;
        if (g > 255) {
            g = 255;
        }
        else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
    }
    function cleanUp() {
        var existingSheet = document.getElementById("customSheet");
        if (existingSheet) {
            existingSheet.disabled = true;
            if (existingSheet === null || existingSheet === void 0 ? void 0 : existingSheet.parentNode) {
                existingSheet.parentNode.removeChild(existingSheet);
            }
        }
    }
    function createAndAppendStyles(styles) {
        if (styles === null)
            return;
        var style = document.getElementById("customSheet");
        if (!style) {
            style = document.createElement("style");
            style.id = "customSheet";
            document.head.appendChild(style);
        }
        var styleTextNode = document.createTextNode(styles);
        style.appendChild(styleTextNode);
    }
    exports.createAndAppendStyles = createAndAppendStyles;
    function isValidColor(color) {
        return (color && color !== "no-color") ? true : false;
    }
    function createFontStyle(config) {
        var customTheme = config.customTheme, theme = config.theme;
        var font = (customTheme === null || customTheme === void 0 ? void 0 : customTheme.font) || null;
        return font
            ? " .default-header." + theme + " {\n  font-family:" + font + ";\n}" : null;
    }
    function createPrimaryStyles(config, colorValue) {
        var theme = config.theme;
        var baseBackground = theme === "light" ? "#fff" : "#2b2b2b";
        var baseColor = theme === "light" ? "#6e6e6e" : "#f3f3f3";
        var textColor = (colorValue === null || colorValue === void 0 ? void 0 : colorValue.text) ? colorValue.text : baseColor;
        var backgroundColor = (colorValue === null || colorValue === void 0 ? void 0 : colorValue.background) ? colorValue.background : baseBackground;
        var hover = null;
        if (colorValue === null || colorValue === void 0 ? void 0 : colorValue.background) {
            if (isValidColor(colorValue === null || colorValue === void 0 ? void 0 : colorValue.background)) {
                hover = lightenOrDarkenColor(colorValue === null || colorValue === void 0 ? void 0 : colorValue.background, -25);
            }
        }
        var styles = "";
        styles += "\n  .default-header." + theme + " {\n    background-color:" + backgroundColor + ";\n    color : " + textColor + ";\n    }";
        return styles;
    }
    function checkCustomTheme(applyCustomTheme, customTheme) {
        return (applyCustomTheme && (customTheme === null || customTheme === void 0 ? void 0 : customTheme.applyPresetTheme) === undefined) || (customTheme === null || customTheme === void 0 ? void 0 : customTheme.applyPresetTheme);
    }
    exports.checkCustomTheme = checkCustomTheme;
});
