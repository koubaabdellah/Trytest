var Panel = window.Panel = function (selector) {

    var _panelSelector = selector;
    var isVisible = function () { return $(_panelSelector + ":visible").length; };
    var isRendered = false;
    var _label;
    var _panelContent = null;

    var _eventBeforeShow;
    var _eventAfterHide;

    var _setPanelSelector = function (panelSelector) {
        _panelSelector = panelSelector;
    };
    var _showPanel = function (label) {
        if ($.isFunction(_eventBeforeShow)) { _eventBeforeShow(); }

        _label = label;
        $(_panelSelector + " #selection-label").html(_label);

        var $close = $(_panelSelector + " #selection-close");
        $(_panelSelector + " #selection-content").removeClass("wide");
        // Fill panel
        $close.off("click");

        $close.on("click", function () {
            _hidePanel();
        });

        //Set content is not rendered;
        if (!isRendered && _panelContent != null) {
            _renderContent();
        }

        $(_panelSelector + ":hidden").fadeToggle("fast", "swing");
    };
    var _hidePanel = function () {
        $(_panelSelector + ":visible").fadeToggle("fast", "swing");
        if ($.isFunction(_eventAfterHide)) { _eventAfterHide(); }
    };
    var _clearPanel = function () {
        var $selectionItems = $(_panelSelector + " #selection-items");
        $selectionItems.empty();
    };
    var _setContent = function (content) {
        _panelContent = content;
        if (isVisible()) {
            _renderContent();
        }
        else {
            isRendered = false;
        }
    };
    var _getLabel = function () {
        return _label;
    };
    var _renderContent = function () {
        _clearPanel();
        if ($.isFunction(_panelContent)) {
            $(_panelSelector + " #selection-items").append(_panelContent());
        } else {
            $(_panelSelector + " #selection-items").append(_panelContent);
        }
        isRendered = true;
    };

    var _onBeforeShow = function (event) { _eventBeforeShow = event; }
    var _onAfterHide = function (event) { _eventAfterHide = event; }

    return {
        SetContent: _setContent,
        GetLabel: _getLabel,
        RenderContent: _renderContent,
        SetPanelSelector: _setPanelSelector,
        ShowPanel: _showPanel,
        HidePanel: _hidePanel,
        OnBeforeShow: _onBeforeShow,
        OnAfterHide: _onAfterHide

    }
};
