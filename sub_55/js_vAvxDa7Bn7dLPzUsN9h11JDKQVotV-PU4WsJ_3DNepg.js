/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/print/print.js. */
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";(Drupal=>{Drupal.behaviors.print={attach(e){(e.parentNode||e).querySelectorAll(".js-print").once("print").forEach((e=>{e.addEventListener("click",(e=>{window.print(),e.preventDefault()}),!1)}))}}})(Drupal)}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/print/print.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/libraries/collapse/collapse.js. */
!function(e,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof define&&define.amd?define(s):(e="undefined"!=typeof globalThis?globalThis:e||self).Collapse=s()}(this,(function(){"use strict";class Collapse{static defaultOptions={openClass:"is-open",$handlers:null};constructor(e,s){"string"==typeof e&&(e=document.querySelector(e)),this.$el=e,this.$el.collapse=this,this._events=[],this.options={...Collapse.defaultOptions,...s},this.isOpen=!1,this.$handlers=[];let{$handlers:t}=this.options;"string"==typeof t&&(t=document.querySelectorAll(this.options.$handlers)),!1===Array.isArray(t)&&(t=t?[t]:[]),Array.from(document.querySelectorAll("[data-collapse-handler]")).forEach((e=>{Array.from(document.querySelectorAll(e.dataset.collapseHandler)).filter((e=>e===this.$el)).length>0&&t.push(e)})),t.forEach((e=>{this.addHandler(e)}))}deconstructor(){this.$handlers.forEach((e=>{this.removeHandler(e)})),delete this.$el.collapse,this.$el=null,this.options=null,this._events=null,this.handlers=null}on(e,s,t){this._events.find((l=>l.$el===e&&l.type===s&&l.callback===t))&&this.off(e,s,t),this._events.push({$el:e,type:s,callback:t}),e.addEventListener(s,t)}off(e,s,t=null){this._events.filter((l=>l.$el===e&&l.type===s&&(!t||l.callback===t))).forEach((t=>{const l=this._events.indexOf(t);e.removeEventListener(s,t.callback),this._events.splice(l,1)}))}handleToggle(e){this.toggle(),e.preventDefault()}addHandler(e){this.on(e,"click",this.handleToggle.bind(this)),this.$handlers.push(e)}removeHandler(e){const s=this.$handlers.indexOf(e);-1!==s&&(this.off(e,"click"),this.$handlers.splice(s,1))}toggle(){this.isOpen?this.close():this.open()}open(){this.$handlers.forEach((e=>{e.setAttribute("aria-expanded","true")})),this.options.openClass&&this.$el.classList.add(this.options.openClass),this.isOpen=!0;const e=new CustomEvent("open.collapse");this.$el.dispatchEvent(e)}close(){this.$handlers.forEach((e=>{e.setAttribute("aria-expanded","false")})),this.options.openClass&&this.$el.classList.remove(this.options.openClass),this.isOpen=!1;const e=new CustomEvent("close.collapse");this.$el.dispatchEvent(e)}}return Collapse}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/libraries/collapse/collapse.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/collapse/collapse.js. */
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";((Drupal,e)=>{Drupal.Collapse=class DrupalCollapse extends e{constructor(e,s){super(e,s),this.on(this.$el,"transitionend",(e=>{e.target===this.$el&&"height"===e.propertyName&&(this.$el.classList.remove("m-collapse--is-animating"),this.$el.style.removeProperty("height"),e.stopPropagation())}))}open(){super.open(),this.$el.style.height=`${this.$el.scrollHeight}px`,this.$el.classList.add("m-collapse--is-open"),this.$el.classList.add("m-collapse--is-animating")}close(){super.close(),this.$el.style.height=`${this.$el.scrollHeight}px`,this.$el.classList.add("m-collapse--is-animating"),this.$el.classList.remove("m-collapse--is-open"),window.setTimeout((()=>{this.$el.style.removeProperty("height")}),1)}},Drupal.behaviors.collapse={attach(e){(e.parentNode||e).querySelectorAll(".js-collapse").once("collapse").forEach((e=>{new Drupal.Collapse(e)}))}}})(Drupal,Collapse)}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/collapse/collapse.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/throbber/throbber.js. */
!function(a){"function"==typeof define&&define.amd?define(a):a()}((function(){"use strict";(Drupal=>{Drupal.theme.ajaxProgressThrobber=a=>`<div class="u-display--flex u-m--collapse u-g--nano ajax-progress ajax-progress-throbber">\n      <span class="m-throbber" role="status" ${a?"":`aria-label="${Drupal.t("Please wait...")}"`}></span>\n      ${a?`<span class="u-text-size--small">${a}</span>`:""}\n    </div>`})(Drupal)}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/throbber/throbber.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/search-bar/search-bar.js. */
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";(Drupal=>{Drupal.SearchBar=class DrupalSearchBar{constructor(e,t){this.$el=e,this.$form=this.$el.querySelector(".m-search-bar__form"),this.$search=this.$el.querySelector(".m-search-bar__input"),this.$autocomplete=this.$el.querySelector(".m-search-bar__autocomplete"),this.timeout_id=null,this.request=null,this.options={url:`${this.$form.dataset.actionAutocomplete??this.$form.action}?zoekwoord=%`,min_length:3,...t},this.$search.addEventListener("focus",(()=>{this.$search.value.length>=this.options.min_length&&this.request&&this.$autocomplete.classList.add("m-search-bar__autocomplete--is-open")}),!1),this.$search.addEventListener("input",this.search.bind(this),!1),this.$search.addEventListener("keyup",(e=>{27===e.keyCode&&this.cancel()}),!1),this.$el.addEventListener("focusout",(t=>{!1===e.contains(t.relatedTarget)&&this.cancel()}),!1)}search(){const e=this.$search.value;if(this.$el.classList.remove("m-search-bar--is-loading"),this.timeout_id&&window.clearTimeout(this.timeout_id),this.request&&this.request.abort(),e.length<this.options.min_length)return;this.timeout_id=window.setTimeout((()=>{this.$el.classList.add("m-search-bar--is-loading"),this.request=new XMLHttpRequest,this.request.addEventListener("load",(()=>{if(this.$el.classList.remove("m-search-bar--is-loading"),200===this.request.status){const e=JSON.parse(this.request.response);let t=`<div class="m-search-bar__content"><em>${Drupal.t("No results")}</em></div>`;for(e.length>0&&(t=`<ul class="m-search-bar__list">\n                  ${e.map((e=>`<li class="m-search-bar__item">\n                          <a href="${e.url}" class="m-search-bar__link">${e.title}</a>\n                        </li>`)).join("")}\n                </ul>`);this.$autocomplete.firstChild;)this.$autocomplete.removeChild(this.$autocomplete.firstChild);this.$autocomplete.insertAdjacentHTML("afterbegin",t),this.$autocomplete.classList.add("m-search-bar__autocomplete--is-open")}}),!1),this.request.addEventListener("error",(()=>{this.$el.classList.remove("m-search-form--is-loading")}),!1),this.request.open("GET",this.options.url.replace("%",encodeURIComponent(e)),!0),this.request.setRequestHeader("X-Requested-With","XMLHttpRequest"),this.request.send()}),300)}cancel(){this.$autocomplete.classList.remove("m-search-bar__autocomplete--is-open"),this.request&&this.request.abort()}},Drupal.behaviors.search_bar={attach(e){(e.parentNode||e).querySelectorAll(".js-search-bar").once("search-bar").forEach((e=>{new Drupal.SearchBar(e)}))}}})(Drupal)}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/search-bar/search-bar.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/form/form.js. */
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";(Drupal=>{Drupal.behaviors.form={attach(e){const t=(e.parentNode||e).querySelectorAll(".js-form:not(.js-webform-submit-once)").once("form"),i=(e,t)=>{t.remove(),delete e.dataset.isSubmitting};t.forEach((e=>{e.addEventListener("submit",(t=>{if("isSubmitting"in e.dataset)return!1;let n=t.submitter;n||(n=e.querySelector('[type="submit"]'));let r=document.createElement("div");r.innerHTML=Drupal.theme.ajaxProgressThrobber(Drupal.t("Please wait...")),r=r.firstChild,n.insertAdjacentElement("afterend",r),e.dataset.isSubmitting=!0,window.setTimeout(i.bind(this,e,r),5e3)}))}))}}})(Drupal)}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/form/form.js. */;