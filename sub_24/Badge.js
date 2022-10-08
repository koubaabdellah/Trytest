define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "../../icons/icons", "esri/intl", "TemplatesCommonLib/structuralFunctionality/a11yUtils"], function (require, exports, tslib_1, Widget_1, widget_1, decorators_1, icons, intl_1, a11yUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "esri-config-panel-badge",
        draft: "esri-config-panel-badge__draft",
        publish: "esri-config-panel-badge__publish",
        stateText: "esri-config-panel-badge__state-text",
        timeStamp: "esri-config-panel-badge__time-stamp",
        discardDraftButton: "esri-config-panel-badge__discard-draft-button"
    };
    var Badge = (function (_super) {
        tslib_1.__extends(Badge, _super);
        function Badge(value) {
            var _this = _super.call(this, value) || this;
            _this.configPanelViewModel = null;
            _this.templateAppData = null;
            _this.badgeMessages = null;
            return _this;
        }
        Badge.prototype.render = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            var draftBadge = this._renderDraftBadge();
            var publishedBadge = this._renderPublishedBadge();
            var stateText = this.configPanelViewModel.state !== "ready"
                ? this._renderStateText()
                : this._renderTimeStamp();
            return (widget_1.tsx("div", { class: CSS.base },
                this.templateAppData
                    ? ((_b = (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.draft) ? draftBadge
                        : ((_d = (_c = this.templateAppData) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.datePublished) &&
                            this.configPanelViewModel.state !== "discardingDraft"
                            ? publishedBadge
                            : null
                    : null,
                this.templateAppData ? (((_f = (_e = this.templateAppData) === null || _e === void 0 ? void 0 : _e.values) === null || _f === void 0 ? void 0 : _f.draft) ? (widget_1.tsx("button", { bind: this, onclick: function () {
                        if (localStorage.getItem("reset_doNotShow")) {
                            _this.configPanelViewModel.triggerDraftDiscard();
                        }
                        else {
                            _this._openDiscardDraftModal();
                        }
                    }, class: CSS.discardDraftButton, title: this.configPanelViewModel.configPanelMessages.deleteDraft, id: "discardDraftBtn" },
                    widget_1.tsx("calcite-icon", { icon: icons.trash, scale: "s", "text-label": this.configPanelViewModel.configPanelMessages.deleteDraft }))) : null) : null,
                stateText));
        };
        Badge.prototype._openDiscardDraftModal = function () {
            this.configPanelViewModel.modal.set("modalId", "discardDraft");
            this.configPanelViewModel.modal.open();
        };
        Badge.prototype._renderDraftBadge = function () {
            return (widget_1.tsx("span", { class: CSS.draft },
                widget_1.tsx("calcite-icon", { icon: icons.save, scale: "s", filled: true }),
                this.badgeMessages.draft));
        };
        Badge.prototype._renderPublishedBadge = function () {
            return (widget_1.tsx("span", { class: CSS.publish },
                widget_1.tsx("calcite-icon", { icon: icons.lock, scale: "s", filled: true }),
                this.badgeMessages.published));
        };
        Badge.prototype._renderStateText = function () {
            var state = this.configPanelViewModel.state;
            var stateText = state === "switching"
                ? "" + this.badgeMessages.switchingConfigMode
                : state === "drafting"
                    ? "" + this.badgeMessages.savingToDraft
                    : state === "discardingDraft"
                        ? "" + this.badgeMessages.discardingDraft
                        : "" + this.badgeMessages.publishing;
            return (widget_1.tsx("span", { key: "state-text", class: CSS.stateText },
                widget_1.tsx("calcite-loader", { active: a11yUtils_1.prefersReducedMotion() ? false : true, inline: true }),
                stateText,
                "\u2026"));
        };
        Badge.prototype._renderTimeStamp = function () {
            var _a, _b;
            var values = (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values;
            var lastSavedDraftDate = (_b = values === null || values === void 0 ? void 0 : values.draft) === null || _b === void 0 ? void 0 : _b.lastSavedDraftDate;
            var datePublished = values === null || values === void 0 ? void 0 : values.datePublished;
            var timeStampPreText = this._getTimeStampText(this.badgeMessages.lastSave + ": ", this.badgeMessages.datePublished + ": ");
            var timeStampPostText = this._getTimeStampText(intl_1.formatDate(lastSavedDraftDate), intl_1.formatDate(datePublished));
            return (widget_1.tsx("span", { key: "time-stamp", class: CSS.timeStamp },
                widget_1.tsx("span", null, timeStampPreText),
                widget_1.tsx("span", null, timeStampPostText)));
        };
        Badge.prototype._getTimeStampText = function (draft, published) {
            var _a, _b;
            var values = (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values;
            var lastSavedDraftDate = (_b = values === null || values === void 0 ? void 0 : values.draft) === null || _b === void 0 ? void 0 : _b.lastSavedDraftDate;
            var datePublished = values === null || values === void 0 ? void 0 : values.datePublished;
            return lastSavedDraftDate || datePublished
                ? lastSavedDraftDate
                    ? draft
                    : datePublished
                        ? published
                        : null
                : null;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Badge.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Badge.prototype, "templateAppData", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/Badge/resources")
        ], Badge.prototype, "badgeMessages", void 0);
        Badge = tslib_1.__decorate([
            decorators_1.subclass("Badge")
        ], Badge);
        return Badge;
    }(Widget_1.default));
    return Badge;
});
