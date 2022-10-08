/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updatePopup = exports.findPopupAction = void 0;
    function findPopupAction(view, id) {
        view.popup.actions.find(function (action) {
            if (action.id === "popup-hover-action") {
                view.popup.actions.remove(action);
                return true;
            }
        });
    }
    exports.findPopupAction = findPopupAction;
    function updatePopup(view) {
        var hide = view.popup.autoOpenEnabled;
        view.popup.visibleElements = {
            featureNavigation: hide,
            closeButton: hide
        };
        view.popup.dockOptions = {
            buttonEnabled: hide
        };
        var actions = view.popup.actions;
        view.popup.viewModel.includeDefaultActions = hide;
        actions.forEach(function (action) {
            action.visible = action.id === "popup-hover-action" ? !hide : hide;
        });
    }
    exports.updatePopup = updatePopup;
});
