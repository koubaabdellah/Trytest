webpackJsonp([7],{245:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(9),r=s(153),o=s(2),a=s(158),l=s(154),n=s(240),h=s(239),u=s(155);const c="registration-errors",p=document.querySelector(`[js-hook-${c}]`),m="[js-hook-form-streetname]",d="[js-hook-mobile-speech]",f="[js-hook-landline-speech]",b="u-hidden",k="js-form-item",S="form__item--lap-active";t.default=class FormRegistration extends r.default{get formId(){return"registration"}constructor(e){super(e),this.preferSpeechBlock=this.element.querySelector(d),this.getSpeechBlock=this.element.querySelector(f),this.streetNameBlock=this.element.querySelector(m),this.formItems=[...this.element.querySelectorAll(`.${k}`)],o.a.$on("modal[modal-registration]::close",()=>{this.steps.reset(),this.element.reset(),this.preferSpeechBlock.classList.add(b),this.getSpeechBlock.classList.add(b),this.formItems.forEach(e=>{e.classList.remove(S)}),this.streetNameBlock.parentNode.removeChild(this.streetNameBlock)})}onFormChange(e){this.steps&&!this.steps.loading&&this.steps.isValid(),"change"===e.eventType&&(a.b.telMobile(this.state.fields["registration-phone"].value)?("registration-phone"===e.name&&(this.inputs["GebruikersProfiel[CommunicatieViaSMS]"].value="true"),this.inputs["GebruikersProfiel[CommunicatieViaMobiel]"].value="true",this.inputs["GebruikersProfiel[TelefoonnrMobiel]"].value=this.state.fields["registration-phone"].value,this.inputs["GebruikersProfiel[CommunicatieViaVast]"].value="false",this.inputs["GebruikersProfiel[TelefoonnrVast]"].value="",this.showGetSpeechInput(!1),this.showPreferSpeechInput(!0),this.preferSpeech(this.state.fields.preferSpeechMessages.input.checked)):a.b.telLandline(this.state.fields["registration-phone"].value)?(this.inputs["GebruikersProfiel[CommunicatieViaSMS]"].value="false",this.inputs["GebruikersProfiel[CommunicatieViaMobiel]"].value="false",this.inputs["GebruikersProfiel[TelefoonnrMobiel]"].value="",this.inputs["GebruikersProfiel[CommunicatieViaVast]"].value="true",this.inputs["GebruikersProfiel[TelefoonnrVast]"].value=this.state.fields["registration-phone"].value,this.showGetSpeechInput(!0),this.showPreferSpeechInput(!1),this.preferSpeech(!0)):(this.showGetSpeechInput(!1),this.showPreferSpeechInput(!1),this.preferSpeech(!0)),this.state.fields["GebruikersProfiel[Email]"].isValid&&(this.inputs.UserName.value=this.state.fields["GebruikersProfiel[Email]"].value),Object(h.a)(this.state,e).then(e=>!e||(this.steps.loading=!0,Object(h.b)(this.element,this.state))).then(e=>{if(e){if(this.steps.loading=!1,this.steps.disableStep=!this.steps.isValid(),e.Adres){var t=e.Adres;const s=t.Gemeente,i=t.Huisnr,r=t.HuisnrToev,o=t.Plaatsnaam,a=t.Straatnaam;this.inputs["GebruikersProfiel[Adres][Straatnaam]"].value=a,this.inputs["GebruikersProfiel[Adres][Huisnr]"].value=i,this.inputs["GebruikersProfiel[Adres][HuisnrToev]"].value=r,this.inputs["GebruikersProfiel[Adres][Plaatsnaam]"].value=o,this.inputs["GebruikersProfiel[Adres][Gemeente]"].value=s,this.showStreetnameBlock(!0,`${a}, ${o}`)}}else this.steps.loading=!1,this.steps.disableStep=!0,this.showStreetnameBlock(!1)}).catch(e=>{console.log(e),this.steps.loading=!1,this.steps.disableStep=!0}))}onFormSubmit(){this.steps.loading=!0,this.formSubmitTimeout&&clearTimeout(this.formSubmitTimeout),this.formSubmitTimeout=setTimeout(()=>{const e=new FormData(this.element);this.registrationCall(e,window.EnvironmentSettings.api.registerParticipant).then(e=>{e?o.a.$trigger("form-steps[registration]::next"):this.steps.loading=!1})},500)}registrationCall(e,t){return this.steps.loading=!0,Object(l.a)(c),e.set("method",t),e.set("GebruikersProfiel[InfoViaEmail]",this.inputs["GebruikersProfiel[InfoViaEmail]"].checked),e.set("UitroosterenVoorNachtelijkeUren",this.inputs.UitroosterenVoorNachtelijkeUren.checked?"false":"true"),e.delete("registration-phone"),i.a.get(window.EnvironmentSettings.endpoint+Object(u.a)(e),{},!1,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},timeout:6e4}).then(e=>this.checkRegistrationValidity(e)).catch(()=>(Object(l.b)(p,window.messages.validationRequestFailed,c),!1))}checkRegistrationValidity(e){const t=e.data;if(200===e.status&&t){if(t.result&&t.success)return Object(l.a)(c),!0;if(!t.success&&t.error&&t.error.errors){const e=t.error.errors.VMVGebruikersProfiel||t.error.errors.VMeldingOfVGebruikersProfiel;if(e){const t=e.length?e.map(e=>e.Code):[e.Code],s=[];Object.keys(n.a).forEach(e=>{n.a[e].filter(e=>t.includes(e)).length&&s.push(window.messages[`validation${e}`])}),Object(l.b)(p,s,c)}return!1}return Object(l.b)(p,window.messages.validationRequestFailed,c),!1}return!1}showPreferSpeechInput(e){const t=[...this.preferSpeechBlock.querySelectorAll("input")];e?(this.preferSpeechBlock.classList.remove(b),t.forEach(e=>{e.removeAttribute("disabled")})):(this.preferSpeechBlock.classList.add(b),t.forEach(e=>{e.setAttribute("disabled","")}))}showGetSpeechInput(e){e?this.getSpeechBlock.classList.remove(b):this.getSpeechBlock.classList.add(b)}preferSpeech(e){"false"===this.inputs["GebruikersProfiel[CommunicatieViaVast]"].value&&(this.inputs["GebruikersProfiel[CommunicatieViaMobiel]"].value=e)}showStreetnameBlock(e,t){this.streetNameBlock&&(e?(this.streetNameBlock.textContent=t,this.streetNameBlock.classList.remove(b)):this.streetNameBlock.classList.add(b))}}}});