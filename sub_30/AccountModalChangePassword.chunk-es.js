webpackJsonp([13],{249:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s(9),a=s(153),r=s(2),n=s(154),i=s(155);const d=s(11),c="password-errors",h=document.querySelector(`[js-hook-${c}]`);t.default=class AccountModalChangePassword extends a.default{get formId(){return"change-password"}constructor(e){super(e),this.action=this.element.getAttribute("action"),r.a.$on("modal[modal-change-password]::close",()=>{this.element.reset(),this.steps.loading=!1})}onFormSubmit(){this.steps.loading=!0,this.formSubmitTimeout&&clearTimeout(this.formSubmitTimeout),this.formSubmitTimeout=setTimeout(()=>{Object(n.a)(c);const e=new FormData(this.element);this.passwordCall(e,window.EnvironmentSettings.api.changePassword).then(e=>{!0===e?r.a.$trigger("form-steps[change-password]::next"):!1===e?(this.steps.loading=!1,Object(n.b)(h,window.messages.validationPasswordNotChange,c)):(this.steps.loading=!1,Object(n.b)(h,e,c))})},500)}passwordCall(e,t){return e.set("method",t),o.a.get(window.EnvironmentSettings.endpoint+Object(i.a)(e),{},!1,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).then(e=>this.checkPasswordChangeValidity(e)).catch(()=>(Object(n.b)(h,window.messages.validationPasswordNotChange,c),!1))}checkPasswordChangeValidity(e){if(d(e,"data.success",!1))return!0;{let t=d(e,"data.error.errors.VMVGebruikersProfiel.Omschrijving",!1);return""!==t&&t}}}}});