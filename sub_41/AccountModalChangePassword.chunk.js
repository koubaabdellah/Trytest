webpackJsonp([13],{580:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(102),n=o(282),a=o(16),s=o(283),i=o(284),c=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();var u=o(104),d=document.querySelector("[js-hook-password-errors]"),l=function(e){function AccountModalChangePassword(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AccountModalChangePassword);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AccountModalChangePassword.__proto__||Object.getPrototypeOf(AccountModalChangePassword)).call(this,e));return t.action=t.element.getAttribute("action"),a.a.$on("modal[modal-change-password]::close",function(){t.element.reset(),t.steps.loading=!1}),t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AccountModalChangePassword,n["default"]),c(AccountModalChangePassword,[{key:"formId",get:function get(){return"change-password"}}]),c(AccountModalChangePassword,[{key:"onFormSubmit",value:function onFormSubmit(){var e=this;this.steps.loading=!0,this.formSubmitTimeout&&clearTimeout(this.formSubmitTimeout),this.formSubmitTimeout=setTimeout(function(){Object(s.a)("password-errors");var t=new FormData(e.element);e.passwordCall(t,window.EnvironmentSettings.api.changePassword).then(function(t){!0===t?a.a.$trigger("form-steps[change-password]::next"):!1===t?(e.steps.loading=!1,Object(s.b)(d,window.messages.validationPasswordNotChange,"password-errors")):(e.steps.loading=!1,Object(s.b)(d,t,"password-errors"))})},500)}},{key:"passwordCall",value:function passwordCall(e,t){var o=this;return e.set("method",t),r.a.get(window.EnvironmentSettings.endpoint+Object(i.a)(e),{},!1,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).then(function(e){return o.checkPasswordChangeValidity(e)}).catch(function(){return Object(s.b)(d,window.messages.validationPasswordNotChange,"password-errors"),!1})}},{key:"checkPasswordChangeValidity",value:function checkPasswordChangeValidity(e){if(u(e,"data.success",!1))return!0;var t=u(e,"data.error.errors.VMVGebruikersProfiel.Omschrijving",!1);return""!==t&&t}}]),AccountModalChangePassword}();t.default=l}});