webpackJsonp([11],{247:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(0),a=s.n(i),n=s(9),o=s(153),r=s(2),d=s(241),m=s(154),l=s(155);const h="TimeBegin",u="TimeEnd",c="DateBegin",p="DateEnd",g="AfwezigheidsRoosterWrapper[EenmaligRooster][DatumTijdBegin]",f="AfwezigheidsRoosterWrapper[EenmaligRooster][DatumTijdEind]",b="AfwezigheidsRoosterWrapper[EenmaligRooster][Adres][AdresseerbareAdresID]",S="time-errors",D=document.querySelector(`[js-hook-form-no-messages] [js-hook-${S}]`),w="submit-errors",T=document.querySelector(`[js-hook-form-no-messages] [js-hook-${w}]`);const Y=(e,t)=>t.diff(e,"minutes");t.default=class AccountModalScheduleMessages extends o.default{get formId(){return"no-messages"}constructor(e){super(e),this.action=this.element.getAttribute("action"),r.a.$on("modal[modal-no-messages]::close",()=>{this.steps.reset(),this.steps.loading=!1})}onFormChange(e){this.steps&&!this.steps.loading&&this.steps.isValid(),this.checkAddressValidity(),"change"===e.eventType&&this.setDateTime()}onFormSubmit(){this.steps.loading=!0,this.formSubmitTimeout&&clearTimeout(this.formSubmitTimeout),this.formSubmitTimeout=setTimeout(()=>{this.prepareScheduleCall(window.EnvironmentSettings.api.addAwayScheduleV2).then(e=>{Promise.all(e.map(e=>this.changeScheduleCall(e))).then(e=>{e.includes(!1)?Object(m.b)(T,window.messages.validationRequestFailed,w):(Object(m.a)(w),r.a.$trigger("form-steps[no-messages]::next")),this.steps.loading=!1})})},500)}prepareScheduleCall(e){const t=Object.keys(this.inputs).reduce((e,t)=>(-1!==t.indexOf(b)&&this.inputs[t].checked&&e.push(t),e),[]);return new Promise(s=>{s(t.map(s=>{const i=new FormData(this.element);return i.set("method",e),i.delete("DateBegin"),i.delete("DateEnd"),i.delete("TimeBegin"),i.delete("TimeEnd"),t.forEach(e=>i.delete(e)),i.set(b,this.inputs[s].value),i}))})}changeScheduleCall(e){return n.a.get(window.EnvironmentSettings.endpoint+Object(l.a)(e),{},!1,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).then(e=>!!e.data.success).catch(()=>!1)}hasCheckedInputOfName(e){return Object.keys(this.state.fields).filter(t=>-1!==t.indexOf(e)).find(e=>this.state.fields[e].input.checked)}setDateTime(){const e=a()(`${this.inputs[c].value} ${this.inputs[h].value}`,"DD-MM-YYYY HH:mm"),t=a()(`${this.inputs[p].value} ${this.inputs[u].value}`,"DD-MM-YYYY HH:mm");Y(e,t)>0?(Object(m.a)(S),this.inputs[g].value=e.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),this.inputs[f].value=t.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")):(this.steps.disableStep=!0,Object(m.b)(D,window.messages.validationTimeDifference,S))}checkAddressValidity(){Object(d.a)(this.state.fields,"AfwezigheidsRoosterWrapper[EenmaligRooster][Adres][AdresseerbareAdresID]")||(this.steps.disableStep=!0)}}}});