define(["require", "exports", "esri/widgets/support/widget", "../../viewApp/widgets/views/AppView", "../../viewApp/widgets/views/ViewComposites", "../../viewApp/widgets/views/ViewComposites"], function (require, exports, widget_1, AppView_1, ViewComposites_1, ViewComposites_2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (function (props) {
        var childProps = {
            settings: props.settings,
            config: props.config,
            i18n: props.i18n,
            id: props.config.id || props.config.webmap || props.config.webscene || null,
            item: props.item,
            projector: props.projector
        };
        var renderAppView = false;
        var viewBackgroundColor = props.config.bgColor ? props.config.bgColor : "ffffff";
        var containerClasses = {
            "animate-fade-in": true,
            "animate-fade-out": false,
        };
        var view;
        if (props.item.type === "webmap" || props.item.type === "Web Map") {
            view = ViewComposites_1.WebMap(childProps);
        }
        else if (props.item.type === "webscene" || props.item.type === "Web Scene") {
            view = ViewComposites_2.WebScene(childProps);
        }
        else if (props.item.type === "3xwebmap") {
            renderAppView = true;
            // In some cases there isn't an / at end of portal url
            // so let's check and add if needed.
            var portalUrl = props.item.portal.url;
            if (portalUrl && !portalUrl.endsWith("/")) {
                portalUrl = portalUrl + "/";
            }
            var appurl = portalUrl + "apps/MobileViewer/index.html?webmap=" + props.item.id;
            view = AppView_1.default({ url: appurl, projector: props.projector, i18n: props.i18n });
        }
        else if (props.item.isLayer) {
            if (props.item.type === "Scene Service") {
                view = ViewComposites_2.WebScene(childProps);
            }
            else {
                view = ViewComposites_1.WebMap(childProps);
            }
        }
        else {
            view = ViewComposites_1.WebMap(childProps);
        }
        return {
            render: function () {
                if (renderAppView) {
                    renderAppView = false;
                    props.projector.scheduleRender();
                }
                return (widget_1.tsx("div", { id: "view-container", key: "view-container", classes: containerClasses, style: "background-color: " + convertHex(viewBackgroundColor, 85) },
                    widget_1.tsx("div", { id: "map-container" }, view.render()),
                    widget_1.tsx("div", { id: "mapAlert", class: "alert alert-yellow" })));
            }
        };
        function convertHex(hex, opacity) {
            hex = hex.replace("#", "");
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
            return result;
        }
    });
});
//# sourceMappingURL=Viewer.js.map