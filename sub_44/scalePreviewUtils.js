define(["require", "exports", "./locale"], function (require, exports, locale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getScalePreviewSpriteBackgroundPosition = exports.getScalePreviewSource = exports.languageCode = exports.fallbackSpriteSheetFileName = exports.getAssetUrl = void 0;
    function getAssetUrl(path) {
        return require.toUrl(".") + "../" + path;
    }
    exports.getAssetUrl = getAssetUrl;
    exports.fallbackSpriteSheetFileName = "en-wo";
    exports.languageCode = locale_1.getLocale().substr(0, 2);
    var LanguageCode;
    (function (LanguageCode) {
        LanguageCode["ar"] = "ar";
        LanguageCode["bg"] = "bg";
        LanguageCode["cs"] = "cs";
        LanguageCode["da"] = "da";
        LanguageCode["de"] = "de";
        LanguageCode["el"] = "el";
        LanguageCode["en"] = "en";
        LanguageCode["es"] = "es";
        LanguageCode["et"] = "et";
        LanguageCode["fi"] = "fi";
        LanguageCode["fr"] = "fr";
        LanguageCode["is"] = "is";
        LanguageCode["it"] = "it";
        LanguageCode["ja"] = "ja";
        LanguageCode["ko"] = "ko";
        LanguageCode["lt"] = "lt";
        LanguageCode["lv"] = "lv";
        LanguageCode["nl"] = "nl";
        LanguageCode["nn"] = "nn";
        LanguageCode["pl"] = "pl";
        LanguageCode["pt"] = "pt";
        LanguageCode["ro"] = "ro";
        LanguageCode["ru"] = "ru";
        LanguageCode["sk"] = "sk";
        LanguageCode["sv"] = "sv";
        LanguageCode["th"] = "th";
        LanguageCode["zh"] = "zh";
    })(LanguageCode || (LanguageCode = {}));
    var regionToDefaultLanguageCodeLookup = {
        ae: "en",
        ar: "es",
        at: "de",
        au: "en",
        be: "nl",
        bg: "bg",
        bo: "es",
        br: "pt",
        ca: "en",
        ch: "de",
        ci: "fr",
        cl: "es",
        cn: "zh",
        co: "es",
        cr: "es",
        cz: "cs",
        de: "de",
        dk: "da",
        ee: "et",
        eg: "en",
        es: "es",
        fi: "fi",
        fr: "fr",
        gb: "en",
        gl: "da",
        gr: "el",
        gt: "es",
        hk: "en",
        id: "en",
        ie: "en",
        il: "en",
        in: "en",
        iq: "ar",
        is: "is",
        it: "it",
        jp: "ja",
        ke: "en",
        kr: "ko",
        kw: "ar",
        li: "de",
        lt: "lt",
        lu: "en",
        lv: "lv",
        ma: "fr",
        mg: "fr",
        ml: "fr",
        mo: "en",
        mx: "es",
        my: "en",
        ni: "es",
        nl: "nl",
        no: "nn",
        nz: "en",
        pe: "es",
        pl: "pl",
        pr: "es",
        pt: "pt",
        ro: "ro",
        ru: "ru",
        rw: "en",
        se: "sv",
        sg: "en",
        sk: "sk",
        sr: "nl",
        sv: "es",
        th: "th",
        tn: "fr",
        tw: "zh",
        us: "en",
        ve: "es",
        vi: "en",
        wo: "en",
        za: "en"
    };
    function normalizeRegion(region) {
        return region.toLowerCase();
    }
    function buildSpriteSheetUrl(spriteSheetFileName) {
        return "http://localhost:8080/src/app/configWidgets/ScaleSliderConfig/images/scalePreview/" + spriteSheetFileName + ".jpg";
    }
    function getScalePreviewSource(region) {
        region = normalizeRegion(region);
        var fromLanguageAndRegion = buildSpriteSheetUrl(exports.languageCode + "-" + region);
        var fromRegion = buildSpriteSheetUrl(regionToDefaultLanguageCodeLookup[region] + "-" + region);
        var fallback = buildSpriteSheetUrl(exports.fallbackSpriteSheetFileName);
        return fromLanguageAndRegion + ", " + fromRegion + ", " + fallback;
    }
    exports.getScalePreviewSource = getScalePreviewSource;
    function getScalePreviewSpriteBackgroundPosition(index) {
        var spriteTileColumns = 5;
        var spriteTileRows = 5;
        if (index < 0 || index >= spriteTileColumns * spriteTileRows) {
            return null;
        }
        var tileOffsetH = 128;
        var tileOffsetW = 128;
        var imageLeft = tileOffsetW * (index % spriteTileColumns);
        var imageTop = tileOffsetH * Math.floor(index / spriteTileRows);
        return "-" + imageLeft + "px -" + imageTop + "px";
    }
    exports.getScalePreviewSpriteBackgroundPosition = getScalePreviewSpriteBackgroundPosition;
});
