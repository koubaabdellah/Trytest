webpackJsonp([11],{578:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),i=n.n(s),o=n(102),r=n(282),a=n(16),u=n(572),c=n(283),l=n(284),d=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var f="AfwezigheidsRoosterWrapper[EenmaligRooster][Adres][AdresseerbareAdresID]",h=document.querySelector("[js-hook-form-no-messages] [js-hook-time-errors]"),m=document.querySelector("[js-hook-form-no-messages] [js-hook-submit-errors]"),p=function(e){function AccountModalScheduleMessages(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AccountModalScheduleMessages);var t=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(AccountModalScheduleMessages.__proto__||Object.getPrototypeOf(AccountModalScheduleMessages)).call(this,e));return t.action=t.element.getAttribute("action"),a.a.$on("modal[modal-no-messages]::close",function(){t.steps.reset(),t.steps.loading=!1}),t}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(AccountModalScheduleMessages,r["default"]),d(AccountModalScheduleMessages,[{key:"formId",get:function get(){return"no-messages"}}]),d(AccountModalScheduleMessages,[{key:"onFormChange",value:function onFormChange(e){this.steps&&!this.steps.loading&&this.steps.isValid(),this.checkAddressValidity(),"change"===e.eventType&&this.setDateTime()}},{key:"onFormSubmit",value:function onFormSubmit(){var e=this;this.steps.loading=!0,this.formSubmitTimeout&&clearTimeout(this.formSubmitTimeout),this.formSubmitTimeout=setTimeout(function(){e.prepareScheduleCall(window.EnvironmentSettings.api.addAwayScheduleV2).then(function(t){Promise.all(t.map(function(t){return e.changeScheduleCall(t)})).then(function(t){t.includes(!1)?Object(c.b)(m,window.messages.validationRequestFailed,"submit-errors"):(Object(c.a)("submit-errors"),a.a.$trigger("form-steps[no-messages]::next")),e.steps.loading=!1})})},500)}},{key:"prepareScheduleCall",value:function prepareScheduleCall(e){var t=this,n=Object.keys(this.inputs).reduce(function(e,n){return-1!==n.indexOf(f)&&t.inputs[n].checked&&e.push(n),e},[]);return new Promise(function(s){s(n.map(function(s){var i=new FormData(t.element);return i.set("method",e),i.delete("DateBegin"),i.delete("DateEnd"),i.delete("TimeBegin"),i.delete("TimeEnd"),n.forEach(function(e){return i.delete(e)}),i.set(f,t.inputs[s].value),i}))})}},{key:"changeScheduleCall",value:function changeScheduleCall(e){return o.a.get(window.EnvironmentSettings.endpoint+Object(l.a)(e),{},!1,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).then(function(e){return!!e.data.success}).catch(function(){return!1})}},{key:"hasCheckedInputOfName",value:function hasCheckedInputOfName(e){var t=this;return Object.keys(this.state.fields).filter(function(t){return-1!==t.indexOf(e)}).find(function(e){return t.state.fields[e].input.checked})}},{key:"setDateTime",value:function setDateTime(){var e=i()(this.inputs.DateBegin.value+" "+this.inputs.TimeBegin.value,"DD-MM-YYYY HH:mm"),t=i()(this.inputs.DateEnd.value+" "+this.inputs.TimeEnd.value,"DD-MM-YYYY HH:mm");g(e,t)>0?(Object(c.a)("time-errors"),this.inputs["AfwezigheidsRoosterWrapper[EenmaligRooster][DatumTijdBegin]"].value=e.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),this.inputs["AfwezigheidsRoosterWrapper[EenmaligRooster][DatumTijdEind]"].value=t.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")):(this.steps.disableStep=!0,Object(c.b)(h,window.messages.validationTimeDifference,"time-errors"))}},{key:"checkAddressValidity",value:function checkAddressValidity(){Object(u.a)(this.state.fields,"AfwezigheidsRoosterWrapper[EenmaligRooster][Adres][AdresseerbareAdresID]")||(this.steps.disableStep=!0)}}]),AccountModalScheduleMessages}(),g=function convertTimeDiferenceToMinutes(e,t){return t.diff(e,"minutes")};t.default=p}});