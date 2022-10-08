var DashboardVM = (function(dashboardJSON, dashboardId) {
    'use strict';

    var self = {
        id: null,
        elementId: null,
        name: null,
        themes: null,
        findIndicatorById: function(themeId, subThemeId, indicatorId) {
            return self.themes[themeId].subThemes[subThemeId].indicators[indicatorId];
        }
    };

    var init = function(dashboardJSON, dashboardId) {
        self.id = dashboardId;
        self.elementId = "dashboard-" + dashboardId;
        self.name = dashboardJSON.name;

        self.themes = dashboardJSON.themes.map(function(themeJSON, themeId) {
            var themeVM = new ThemeVM(themeJSON, themeId, self);
            return themeVM;
        });

    }(dashboardJSON, dashboardId);

    return self;
});

//# sourceURL=DashboardVM.js