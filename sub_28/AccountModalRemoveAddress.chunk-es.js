webpackJsonp([10],{250:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s(2),d=s(9),r=s(153),n=s(154),a=s(155);const i="address-errors",u=document.querySelector(`[js-hook-${i}]`),m="[js-hook-address-label]",l="[js-hook-address-zipcode]",c="[js-hook-address-housenumber]",h="AdresseerbareAdresID";t.default=class AccountModalRemoveAddress extends r.default{get formId(){return"remove-address"}constructor(e){super(e),this.action=this.element.getAttribute("action"),this.label=this.element.querySelector(m),this.zipcode=this.element.querySelector(l),this.housenumber=this.element.querySelector(c),o.a.$on("modal[modal-remove-address]::open",(e,t)=>{const s=t.button;if(!s)return;const o=s.dataset.addressLabel,d=s.dataset.addressZipcode,r=s.dataset.addressHousenumber,n=s.dataset.addressId;this.label.textContent=o,this.zipcode.textContent=d,this.housenumber.textContent=r,this.inputs[h].value=n})}onFormSubmit(){this.loading=!0,this.formSubmitTimeout&&clearTimeout(this.formSubmitTimeout),this.formSubmitTimeout=setTimeout(()=>{Object(n.a)(i);const e=new FormData(this.element);this.removeAddressCall(e,window.EnvironmentSettings.api.removeAddress).then(e=>{e?window.location.reload():(this.loading=!1,Object(n.b)(u,window.messages.validationAddressRemove,i))})},500)}removeAddressCall(e,t){return e.set("method",t),d.a.get(window.EnvironmentSettings.endpoint+Object(a.a)(e),{},!1,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).then(e=>!!e.data.success).catch(()=>(Object(n.b)(u,window.messages.validationRequestFailed,i),!1))}}}});