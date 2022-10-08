define(["require", "exports", "tslib", "moment/moment", "dojo/string", "esri/request", "esri/core/promiseUtils"], function (require, exports, tslib_1, moment_1, string_1, esriRequest, promiseUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteNotifications = exports._formatNotification = exports.fetchNotifications = void 0;
    moment_1 = tslib_1.__importDefault(moment_1);
    string_1 = tslib_1.__importDefault(string_1);
    function fetchNotifications(portal, messages) {
        var homeAppRootUrl = portal.restUrl.replace("sharing/rest", "home") + "/";
        return portal.fetchNotifications().then(function (results) {
            return (results || [])
                .filter(function (notification) { return notification && notification.type !== "message_received"; })
                .filter(function (notification) { return messages.notifications.types[notification.type]; })
                .map(function (notification) {
                notification.data = tslib_1.__assign(tslib_1.__assign({}, notification.data), { homeAppRootUrl: homeAppRootUrl });
                return _formatNotification(notification, portal, messages);
            });
        });
    }
    exports.fetchNotifications = fetchNotifications;
    function _formatNotification(notification, portal, messages) {
        if (notification.type === "webapp_not_copied" && portal.isPortal) {
            notification.type = "webapp_not_copied_portal";
        }
        return {
            text: string_1.default.substitute(messages.notifications.types[notification.type], notification.data),
            date: moment_1.default(notification.received).fromNow(),
            id: notification.id
        };
    }
    exports._formatNotification = _formatNotification;
    function deleteNotifications(portalUrl, user, ids) {
        var deleted = ids
            .map(function (id) { return ({ username: user.username, portalUrl: portalUrl, id: id }); })
            .map(_deleteNotification);
        return promiseUtils.eachAlways(deleted);
    }
    exports.deleteNotifications = deleteNotifications;
    function _deleteNotification(options) {
        var portalUrl = options.portalUrl, username = options.username, id = options.id;
        var url = portalUrl + "community/users/" + username + "/notifications/" + id + "/delete";
        return esriRequest(url, {
            method: "post",
            responseType: "json",
            query: { f: "json" }
        });
    }
});
