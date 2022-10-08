/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-next.468
 */
import{r as t,c as i,h as e,H as a,g as n}from"./p-0c89f05f.js";import{a as s,S as o,d as r}from"./p-4f952ec3.js";import{i as c,f as l}from"./p-b3298659.js";import{f as m,u as h,c as p,d,p as b,C as u}from"./p-980fa1a3.js";import{g as f}from"./p-f1e06d56.js";import{n as x,t as w,d as g,g as v}from"./p-102b243d.js";import{c as y,d as k,g as D}from"./p-bfd24607.js";import{s as C,c as I,a as z,d as _,H as E}from"./p-79d7bcf2.js";import{c as O}from"./p-5dd4629c.js";import{u as H}from"./p-1b64d694.js";import{c as A,d as M}from"./p-d1dcd357.js";var T=o?o.prototype:void 0,L=T?T.toString:void 0;function $(t){if("string"==typeof t)return t;if(c(t))return function(t,i){for(var e=-1,a=null==t?0:t.length,n=Array(a);++e<a;)n[e]=i(t[e],e,t);return n}(t,$)+"";if(s(t))return L?L.call(t):"";var i=t+"";return"0"==i&&1/t==-1/0?"-0":i}var B=/[\\^$.*+?()[\]{}|]/g,P=RegExp(B.source);const j="CALCITE-COMBOBOX-ITEM, CALCITE-COMBOBOX-ITEM-GROUP";function X(t){var i,e;const a=null===(i=t.parentElement)||void 0===i?void 0:i.closest(j);return[a,null===(e=null==a?void 0:a.parentElement)||void 0===e?void 0:e.closest(j)].filter((t=>t))}function R(t){var i;return(null===(i=t.ancestors)||void 0===i?void 0:i.filter((t=>"CALCITE-COMBOBOX-ITEM"===t.nodeName)))||[]}function S(t){return x(t.querySelectorAll("calcite-combobox-item")).filter((t=>t.selected)).length>0}function F(t){return document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",t,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}const U=class{constructor(e){t(this,e),this.calciteLookupChange=i(this,"calciteLookupChange",7),this.calciteComboboxChange=i(this,"calciteComboboxChange",7),this.calciteComboboxFilterChange=i(this,"calciteComboboxFilterChange",7),this.calciteComboboxChipDismiss=i(this,"calciteComboboxChipDismiss",7),this.calciteComboboxOpen=i(this,"calciteComboboxOpen",7),this.calciteComboboxClose=i(this,"calciteComboboxClose",7),this.active=!1,this.disabled=!1,this.maxItems=0,this.overlayPositioning="absolute",this.required=!1,this.selectionMode="multi",this.scale="m",this.value=null,this.intlRemoveTag="Remove tag",this.internalValueChangeFlag=!1,this.items=[],this.groupItems=[],this.selectedItems=[],this.visibleItems=[],this.activeItemIndex=-1,this.activeChipIndex=-1,this.activeDescendant="",this.text="",this.textInput=null,this.mutationObserver=O("mutation",(()=>this.updateItems())),this.resizeObserver=O("resize",(()=>this.setMaxScrollerHeight())),this.guid=f(),this.inputHeight=0,this.ignoreSelectedEventsFlag=!1,this.activeTransitionProp="opacity",this.setFilteredPlacements=()=>{const{el:t,flipPlacements:i}=this;this.filteredFlipPlacements=i?m(i,t):null},this.getValue=()=>{const t=this.selectedItems.map((t=>{var i;return null===(i=null==t?void 0:t.value)||void 0===i?void 0:i.toString()}));return(null==t?void 0:t.length)?t.length>1?t:t[0]:""},this.onLabelClick=()=>{this.setFocus()},this.keydownHandler=t=>{const{key:i}=t;switch(i){case"Tab":this.activeChipIndex=-1,this.activeItemIndex=-1,this.allowCustomValues&&this.text?(this.addCustomChip(this.text,!0),t.preventDefault()):this.active&&(this.active=!1,t.preventDefault());break;case"ArrowLeft":this.previousChip();break;case"ArrowRight":this.nextChip();break;case"ArrowUp":this.shiftActiveItemIndex(-1),this.comboboxInViewport()||this.el.scrollIntoView();break;case"ArrowDown":this.active||(t.preventDefault(),this.active=!0),this.shiftActiveItemIndex(1),this.comboboxInViewport()||this.el.scrollIntoView();break;case" ":this.textInput.value||(t.preventDefault(),this.active=!0,this.shiftActiveItemIndex(1));break;case"Home":this.active&&t.preventDefault(),this.updateActiveItemIndex(0),this.scrollToActiveItem(),this.comboboxInViewport()||this.el.scrollIntoView();break;case"End":this.active&&t.preventDefault(),this.updateActiveItemIndex(this.visibleItems.length-1),this.scrollToActiveItem(),this.comboboxInViewport()||this.el.scrollIntoView();break;case"Escape":this.active=!1;break;case"Enter":this.activeItemIndex>-1?this.toggleSelection(this.visibleItems[this.activeItemIndex]):this.activeChipIndex>-1?this.removeActiveChip():this.allowCustomValues&&this.text?this.addCustomChip(this.text,!0):t.defaultPrevented||C(this);break;case"Delete":case"Backspace":this.activeChipIndex>-1?this.removeActiveChip():!this.text&&this.isMulti()&&this.removeLastChip()}},this.toggleCloseEnd=()=>{this.active=!1,this.el.removeEventListener("calciteComboboxClose",this.toggleCloseEnd)},this.toggleOpenEnd=()=>{this.active=!0,this.el.removeEventListener("calciteComboboxOpen",this.toggleOpenEnd)},this.transitionEnd=t=>{t.propertyName===this.activeTransitionProp&&(this.active?this.calciteComboboxOpen.emit():this.calciteComboboxClose.emit())},this.setMaxScrollerHeight=()=>{const{active:t,listContainerEl:i}=this;if(!i||!t)return;this.reposition();const e=this.getMaxScrollerHeight();i.style.maxHeight=e>0?`${e}px`:"",this.reposition()},this.calciteChipDismissHandler=(t,i)=>{this.active=!1;const e=this.items.find((t=>t===i));e&&this.toggleSelection(e,!1),this.calciteComboboxChipDismiss.emit(t.detail)},this.clickHandler=t=>{t.composedPath().some((t=>"CALCITE-CHIP"===t.tagName))||(this.active=!this.active,this.updateActiveItemIndex(0),this.setFocus())},this.setInactiveIfNotContained=t=>{const i=t.composedPath();!this.active||i.includes(this.el)||i.includes(this.referenceEl)||(this.allowCustomValues&&this.text.trim().length&&this.addCustomChip(this.text),"single"===this.selectionMode&&(this.textInput&&(this.textInput.value=""),this.text="",this.filterItems(""),this.updateActiveItemIndex(-1)),this.active=!1)},this.setMenuEl=t=>{this.menuEl=t},this.setListContainerEl=t=>{this.resizeObserver.observe(t),this.listContainerEl=t},this.setReferenceEl=t=>{this.referenceEl=t},this.inputHandler=t=>{const i=t.target.value;this.text=i,this.filterItems(i),i&&(this.activeChipIndex=-1)},this.filterItems=(()=>{const t=(t,i)=>t&&i.some((({label:i,value:e})=>"CALCITE-COMBOBOX-ITEM-GROUP"===t.tagName?e===t.label:e===t.textLabel||e===t.value||i===t.textLabel||i===t.value));return r((i=>{const e=((t,i)=>{const e=function(t){var i;return(t=null==(i=t)?"":$(i))&&P.test(t)?t.replace(B,"\\$&"):t}(i),a=new RegExp(e,"i");0===t.length&&console.warn("No data was passed to the filter function.\n    The data argument should be an array of objects");const n=(t,i)=>{var e;if(null===(e=t)||void 0===e?void 0:e.constant)return!0;let a=!1;return l(t,(t=>{"function"!=typeof t&&null!=t&&(Array.isArray(t)||"object"==typeof t&&null!==t?n(t,i)&&(a=!0):i.test(t)&&(a=!0))})),a};return t.filter((t=>n(t,a)))})(this.data,i);this.getCombinedItems().forEach((i=>{const a=!t(i,e);i.hidden=a;const[n,s]=i.ancestors;(t(n,e)||t(s,e))&&(i.hidden=!1),a||i.ancestors.forEach((t=>t.hidden=!1))})),this.visibleItems=this.getVisibleItems(),this.calciteComboboxFilterChange.emit({visibleItems:[...this.visibleItems],text:i})}),100)})(),this.internalCalciteLookupChangeEvent=()=>{this.calciteLookupChange.emit(this.selectedItems)},this.emitCalciteLookupChange=r(this.internalCalciteLookupChangeEvent,0),this.internalComboboxChangeEvent=()=>{const{selectedItems:t}=this;this.calciteComboboxChange.emit({selectedItems:t})},this.emitComboboxChange=r(this.internalComboboxChangeEvent,0),this.updateItems=()=>{this.items=this.getItems(),this.groupItems=this.getGroupItems(),this.data=this.getData(),this.selectedItems=this.getSelectedItems(),this.visibleItems=this.getVisibleItems(),this.needsIcon=this.getNeedsIcon(),this.allowCustomValues||this.setMaxScrollerHeight()},this.scrollToActiveItem=()=>{const t=this.visibleItems[this.activeItemIndex],i=this.calculateSingleItemHeight(t),{offsetHeight:e,scrollTop:a}=this.listContainerEl;e+a<t.offsetTop+i?this.listContainerEl.scrollTop=t.offsetTop-e+i:t.offsetTop<a&&(this.listContainerEl.scrollTop=t.offsetTop)},this.comboboxFocusHandler=()=>{var t;null===(t=this.textInput)||void 0===t||t.focus()},this.comboboxBlurHandler=t=>{this.setInactiveIfNotContained(t)}}activeHandler(){this.disabled?this.active=!1:this.reposition()}handleDisabledChange(t){t||(this.active=!1)}maxItemsHandler(){this.setMaxScrollerHeight()}valueHandler(t){if(!this.internalValueChangeFlag){const i=this.getItems();Array.isArray(t)?i.forEach((i=>i.selected=t.includes(i.value))):i.forEach(t?i=>i.selected=t===i.value:t=>t.selected=!1),this.updateItems()}}flipPlacementsHandler(){this.setFilteredPlacements()}documentClickHandler(t){this.setInactiveIfNotContained(t)}calciteComboboxItemChangeHandler(t){if(this.ignoreSelectedEventsFlag)return;const i=t.target,e=this.visibleItems.indexOf(i);this.updateActiveItemIndex(e),this.toggleSelection(i,i.selected)}async reposition(){const{popper:t,menuEl:i}=this,e=this.getModifiers();t?await h({el:i,modifiers:e,placement:d,popper:t}):this.createPopper()}async setFocus(){var t;null===(t=this.textInput)||void 0===t||t.focus(),this.activeChipIndex=-1,this.activeItemIndex=-1}connectedCallback(){var t;this.internalValueChangeFlag=!0,this.value=this.getValue(),this.internalValueChangeFlag=!1,null===(t=this.mutationObserver)||void 0===t||t.observe(this.el,{childList:!0,subtree:!0}),this.createPopper(),y(this),I(this),this.setFilteredPlacements()}componentWillLoad(){this.updateItems()}componentDidLoad(){z(this,this.getValue())}componentDidRender(){this.el.offsetHeight!==this.inputHeight&&(this.reposition(),this.inputHeight=this.el.offsetHeight),H(this)}disconnectedCallback(){var t,i;null===(t=this.mutationObserver)||void 0===t||t.disconnect(),null===(i=this.resizeObserver)||void 0===i||i.disconnect(),this.destroyPopper(),k(this),_(this)}selectedItemsHandler(){this.internalValueChangeFlag=!0,this.value=this.getValue(),this.internalValueChangeFlag=!1}textHandler(){this.updateActiveItemIndex(-1)}comboboxInViewport(){const t=this.el.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.right<=(window.innerWidth||document.documentElement.clientWidth)&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)}getModifiers(){const t={name:"flip",enabled:!0};return t.options={fallbackPlacements:this.filteredFlipPlacements||b},[t,{name:"eventListeners",enabled:this.active}]}createPopper(){this.destroyPopper();const{menuEl:t,referenceEl:i,overlayPositioning:e}=this,a=this.getModifiers();this.popper=p({el:t,modifiers:a,overlayPositioning:e,placement:d,referenceEl:i})}destroyPopper(){const{popper:t}=this;t&&t.destroy(),this.popper=null}getMaxScrollerHeight(){const t=this.getCombinedItems().filter((t=>!t.hidden)),{maxItems:i}=this;let e=0,a=0;return t.length>i&&t.forEach((t=>{if(e<i&&i>0){const i=this.calculateSingleItemHeight(t);i>0&&(a+=i,e++)}})),a}calculateSingleItemHeight(t){let i=t.offsetHeight;return Array.from(t.querySelectorAll(j)).map((t=>null==t?void 0:t.offsetHeight)).forEach((t=>{i-=t})),i}getCombinedItems(){return[...this.groupItems,...this.items]}toggleSelection(t,i=!t.selected){t&&(this.isMulti()?(t.selected=i,this.updateAncestors(t),this.selectedItems=this.getSelectedItems(),this.emitCalciteLookupChange(),this.emitComboboxChange(),this.resetText(),this.filterItems("")):(this.ignoreSelectedEventsFlag=!0,this.items.forEach((e=>e.selected=e===t&&i)),this.ignoreSelectedEventsFlag=!1,this.selectedItems=this.getSelectedItems(),this.emitComboboxChange(),this.textInput&&(this.textInput.value=t.textLabel),this.active=!1,this.updateActiveItemIndex(-1),this.resetText(),this.filterItems("")))}updateAncestors(t){if("ancestors"!==this.selectionMode)return;const i=R(t),e=function(t){return x(t.querySelectorAll("calcite-combobox-item"))}(t);t.selected?i.forEach((t=>{t.selected=!0})):(e.forEach((t=>t.selected=!1)),[...i].forEach((t=>{S(t)||(t.selected=!1)})))}getVisibleItems(){return this.items.filter((t=>!t.hidden))}getSelectedItems(){if(!this.isMulti()){const t=this.items.find((({selected:t})=>t));return t?[t]:[]}return this.items.filter((t=>t.selected&&("ancestors"!==this.selectionMode||!S(t)))).sort(((t,i)=>{const e=this.selectedItems.indexOf(t),a=this.selectedItems.indexOf(i);return e>-1&&a>-1?e-a:a-e}))}getData(){return this.items.map((t=>({constant:t.constant,value:t.value,label:t.textLabel})))}getNeedsIcon(){return"single"===this.selectionMode&&this.items.some((t=>t.icon))}resetText(){this.textInput&&(this.textInput.value=""),this.text=""}getItems(){return Array.from(this.el.querySelectorAll("CALCITE-COMBOBOX-ITEM")).filter((t=>!t.disabled))}getGroupItems(){return Array.from(this.el.querySelectorAll("CALCITE-COMBOBOX-ITEM-GROUP"))}addCustomChip(t,i){const e=this.items.find((i=>i.textLabel===t));if(e)this.toggleSelection(e,!0);else{this.isMulti()||this.toggleSelection(this.selectedItems[this.selectedItems.length-1],!1);const e=document.createElement("CALCITE-COMBOBOX-ITEM");e.value=t,e.textLabel=t,e.selected=!0,this.el.appendChild(e),this.resetText(),i&&this.setFocus(),this.updateItems(),this.filterItems(""),this.emitCalciteLookupChange(),this.emitComboboxChange()}}removeActiveChip(){this.toggleSelection(this.selectedItems[this.activeChipIndex],!1),this.setFocus()}removeLastChip(){this.toggleSelection(this.selectedItems[this.selectedItems.length-1],!1),this.setFocus()}previousChip(){if(this.text)return;const t=this.activeChipIndex;this.activeChipIndex=-1===t?this.selectedItems.length-1:Math.max(t-1,0),this.updateActiveItemIndex(-1),this.focusChip()}nextChip(){if(this.text||-1===this.activeChipIndex)return;const t=this.activeChipIndex+1;t>this.selectedItems.length-1?(this.activeChipIndex=-1,this.setFocus()):(this.activeChipIndex=t,this.focusChip()),this.updateActiveItemIndex(-1)}focusChip(){var t;const i=null===(t=this.selectedItems[this.activeChipIndex])||void 0===t?void 0:t.guid,e=i?this.referenceEl.querySelector(`#combobox-chip-${i}`):null;null==e||e.setFocus()}shiftActiveItemIndex(t){const{length:i}=this.visibleItems;this.updateActiveItemIndex((this.activeItemIndex+i+t)%i),this.scrollToActiveItem()}updateActiveItemIndex(t){var i;this.activeItemIndex=t;let e=null;this.visibleItems.forEach(((i,a)=>{a===t?(i.active=!0,e=i.guid):i.active=!1})),this.activeDescendant=e,this.activeItemIndex>-1&&(this.activeChipIndex=-1,null===(i=this.textInput)||void 0===i||i.focus())}isMulti(){return"single"!==this.selectionMode}renderChips(){const{activeChipIndex:t,scale:i,selectionMode:a,intlRemoveTag:n}=this;return this.selectedItems.map(((s,o)=>{const r={chip:!0,"chip--active":t===o},c=[...[...R(s)].reverse(),s].map((t=>t.textLabel)),l="ancestors"!==a?s.textLabel:c.join(" / ");return e("calcite-chip",{class:r,dismissLabel:n,dismissible:!0,icon:s.icon,id:s.guid?`combobox-chip-${s.guid}`:null,key:s.textLabel,onCalciteChipDismiss:t=>this.calciteChipDismissHandler(t,s),scale:i,title:l,value:s.value},l)}))}renderInput(){const{guid:t,active:i,disabled:a,placeholder:n,selectionMode:s,needsIcon:o,selectedItems:r}=this,c="single"===s,l=r[0],m=!i&&c&&!!l;return e("span",{class:{"input-wrap":!0,"input-wrap--single":c}},m&&e("span",{class:{label:!0,"label--spaced":o},key:"label"},l.textLabel),e("input",{"aria-activedescendant":this.activeDescendant,"aria-autocomplete":"list","aria-controls":`combobox-listbox-${t}`,"aria-label":D(this),class:{input:!0,"input--single":!0,"input--transparent":this.activeChipIndex>-1,"input--hidden":m,"input--icon":c&&o},disabled:a,id:`combobox-input-${t}`,key:"input",onBlur:this.comboboxBlurHandler,onFocus:this.comboboxFocusHandler,onInput:this.inputHandler,placeholder:n,ref:t=>this.textInput=t,type:"text"}))}renderListBoxOptions(){return this.visibleItems.map((t=>e("li",{"aria-selected":w(t.selected),id:t.guid?`combobox-item-${t.guid}`:null,role:"option",tabindex:"-1"},t.textLabel)))}renderPopperContainer(){const{active:t,setMenuEl:i,setListContainerEl:a}=this;return e("div",{"aria-hidden":"true",class:{"popper-container":!0,"popper-container--active":t},ref:i},e("div",{class:{"list-container":!0,[u.animation]:!0,[u.animationActive]:t},onTransitionEnd:this.transitionEnd,ref:a},e("ul",{class:{list:!0,"list--hide":!t}},e("slot",null))))}renderIconStart(){const{selectionMode:t,needsIcon:i,selectedItems:a}=this,n=a[0];return"single"===t&&i&&e("span",{class:"icon-start"},(null==n?void 0:n.icon)&&e("calcite-icon",{class:"selected-icon",icon:n.icon,scale:"s"}))}renderIconEnd(){const{active:t}=this;return e("span",{class:"icon-end"},e("calcite-icon",{icon:t?"chevron-up":"chevron-down",scale:"s"}))}render(){const{active:t,guid:i,label:n}=this,s="single"===this.selectionMode;return e(a,{onKeyDown:this.keydownHandler},e("div",{"aria-autocomplete":"list","aria-expanded":w(t),"aria-haspopup":"listbox","aria-labelledby":`combobox-label-${i}`,"aria-owns":`combobox-listbox-${i}`,class:{wrapper:!0,"wrapper--single":s||!this.selectedItems.length,"wrapper--active":t},onClick:this.clickHandler,ref:this.setReferenceEl,role:"combobox"},e("div",{class:"grid-input"},this.renderIconStart(),!s&&this.renderChips(),e("label",{class:"screen-readers-only",htmlFor:`combobox-input-${i}`,id:`combobox-label-${i}`},n),this.renderInput()),this.renderIconEnd()),e("ul",{"aria-labelledby":`combobox-label-${i}`,"aria-multiselectable":"true",class:"screen-readers-only",id:`combobox-listbox-${i}`,role:"listbox",tabIndex:-1},this.renderListBoxOptions()),this.renderPopperContainer(),e(E,{component:this}))}get el(){return n(this)}static get watchers(){return{active:["activeHandler"],disabled:["handleDisabledChange"],maxItems:["maxItemsHandler"],value:["valueHandler"],flipPlacements:["flipPlacementsHandler"],selectedItems:["selectedItemsHandler"],text:["textHandler"]}}};U.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:block}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:2.75rem}.wrapper{display:-ms-flexbox;display:flex;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;-webkit-box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);padding:calc(var(--calcite-combobox-item-spacing-unit-s) / 4) var(--calcite-combobox-item-spacing-unit-l)}:host(:focus-within) .wrapper,.wrapper--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.wrapper--single{padding:0 var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.grid-input{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px}.input{-ms-flex-positive:1;flex-grow:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-style:none;background-color:transparent;padding:0px;font-family:inherit;color:var(--calcite-ui-text-1);font-size:inherit;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);min-width:120px;margin-bottom:var(--calcite-combobox-item-spacing-unit-s)}.input:focus{outline:2px solid transparent;outline-offset:2px}.input--transparent{opacity:0}.input--single{margin-bottom:0px;margin-top:0px;padding:0px}.wrapper--active .input-single{cursor:text}.input--hidden{pointer-events:none;width:0px;min-width:0px;opacity:0}.input--icon{padding:0 var(--calcite-combobox-item-spacing-unit-l)}.input-wrap{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1}.input-wrap--single{-ms-flex:1 1 0%;flex:1 1 0%;overflow:hidden}.label{pointer-events:none;display:-ms-flexbox;display:flex;max-width:100%;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0px;font-weight:var(--calcite-font-weight-normal);height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--spaced{padding-top:0px;padding-bottom:0px;padding-left:var(--calcite-combobox-item-spacing-unit-l);padding-right:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{display:-ms-flexbox;display:flex;width:1rem;cursor:pointer;-ms-flex-align:center;align-items:center}.icon-end{-ms-flex:none;flex:none}.popper-container{width:100%;display:block;position:absolute;z-index:900;-webkit-transform:scale(0);transform:scale(0);visibility:hidden;pointer-events:none}.popper-container .calcite-popper-anim{position:relative;z-index:1;-webkit-transition:var(--calcite-popper-transition);transition:var(--calcite-popper-transition);visibility:hidden;-webkit-transition-property:visibility, opacity, -webkit-transform;transition-property:visibility, opacity, -webkit-transform;transition-property:transform, visibility, opacity;transition-property:transform, visibility, opacity, -webkit-transform;opacity:0;-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}.popper-container[data-popper-placement^=bottom] .calcite-popper-anim{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.popper-container[data-popper-placement^=top] .calcite-popper-anim{-webkit-transform:translateY(5px);transform:translateY(5px)}.popper-container[data-popper-placement^=left] .calcite-popper-anim{-webkit-transform:translateX(5px);transform:translateX(5px)}.popper-container[data-popper-placement^=right] .calcite-popper-anim{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.popper-container[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;-webkit-transform:translate(0);transform:translate(0)}.popper-container--active{pointer-events:initial;visibility:visible}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{max-height:100vh;overflow-y:auto;background-color:var(--calcite-ui-foreground-1);width:var(--calcite-dropdown-width)}.list{margin:0px;display:block;padding:0px}.list--hide{height:0px;overflow:hidden}.chip{margin-block:calc(var(--calcite-combobox-item-spacing-unit-s) / 4);margin-inline:0 var(--calcite-combobox-item-spacing-unit-s);max-width:100%}.chip--active{background-color:var(--calcite-ui-foreground-3)}.item{display:block}::slotted(input[slot=hidden-form-input]){bottom:0 !important;left:0 !important;margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;right:0 !important;top:0 !important;-webkit-transform:none !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";const G=class{constructor(e){t(this,e),this.calciteComboboxItemChange=i(this,"calciteComboboxItemChange",7),this.disabled=!1,this.selected=!1,this.active=!1,this.guid=f(),this.scale="m",this.itemClickHandler=t=>{t.preventDefault(),this.disabled||(this.selected=!this.selected)}}selectedWatchHandler(){this.calciteComboboxItemChange.emit(this.el)}connectedCallback(){this.ancestors=X(this.el),this.scale=g(this.el,"scale",this.scale),A(this)}disconnectedCallback(){M(this)}componentDidRender(){H(this)}async toggleSelected(t){this.disabled||(this.selected="boolean"==typeof t?t:!this.selected)}renderIcon(t){const{icon:i,disabled:a,selected:n}=this,s="icon--indent";return!t||i||a?e("calcite-icon",{class:{icon:!i,"icon--custom":!!i,"icon--active":i&&n,[s]:!0},icon:i||(a?"circle-disallowed":t?"dot":"check"),scale:"s"}):e("span",{class:{icon:!0,"icon--dot":!0,[s]:!0}})}renderChildren(){return v(this.el)?e("ul",{key:"default-slot-container"},e("slot",null)):null}render(){const t="single"===g(this.el,"selection-mode","multi"),i={label:!0,"label--selected":this.selected,"label--active":this.active,"label--single":t},n=F(this.el);return e(a,{"aria-hidden":"true"},e("div",{class:`container scale--${this.scale}`,style:{"--calcite-combobox-item-spacing-indent-multiplier":`${n}`}},e("li",{class:i,id:this.guid,onClick:this.itemClickHandler},this.renderIcon(t),e("span",{class:"title"},this.textLabel)),this.renderChildren()))}get el(){return n(this)}static get watchers(){return{selected:["selectedWatchHandler"]}}};G.style='@charset "UTF-8";@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent:1rem}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  )}:host(:focus){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host,ul{margin:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding:0px;outline:2px solid transparent;outline-offset:2px}.label{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;width:100%;min-width:100%;cursor:pointer;-ms-flex-align:center;align-items:center;color:var(--calcite-ui-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;padding:var(--calcite-combobox-item-spacing-unit-s) var(--calcite-combobox-item-spacing-unit-l)}:host([disabled]) .label{cursor:default}.label--selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}.label--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.label:hover,.label:active{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.title{padding:0 var(--calcite-combobox-item-spacing-unit-l)}.icon{display:-ms-inline-flexbox;display:inline-flex;opacity:0;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-ui-border-1)}.icon--indent{-webkit-padding-start:var(--calcite-combobox-item-indent-value);padding-inline-start:var(--calcite-combobox-item-indent-value)}.icon--custom{margin-top:-1px;color:var(--calcite-ui-text-3)}.icon--active{color:var(--calcite-ui-text-1)}.icon--dot{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;min-width:var(--calcite-combobox-item-spacing-unit-l)}.icon--dot:before{text-align:start;content:"•"}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-ui-brand)}:host(:hover[disabled]) .icon{opacity:1}';const Y=class{constructor(i){t(this,i),this.guid=f(),this.scale="m"}connectedCallback(){this.ancestors=X(this.el),this.scale=g(this.el,"scale",this.scale)}render(){const{el:t,scale:i}=this,a=`label--indent-${F(t)}`;return e("ul",{"aria-labelledby":this.guid,class:{list:!0,[`scale--${i}`]:!0},role:"group"},e("li",{class:{label:!0,[a]:!0},id:this.guid,role:"presentation"},e("span",{class:"title"},this.label)),e("slot",null))}get el(){return n(this)}};Y.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent-1:0.5rem;--calcite-combobox-item-spacing-indent-2:1rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent-1:0.75rem;--calcite-combobox-item-spacing-indent-2:1.5rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent-1:1rem;--calcite-combobox-item-spacing-indent-2:2rem}:host,.list{margin:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding:0px;outline:2px solid transparent;outline-offset:2px}.label{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;width:100%;min-width:0px;max-width:100%;color:var(--calcite-ui-text-3)}.label--indent-1{-webkit-padding-start:var(--calcite-combobox-item-spacing-indent-1);padding-inline-start:var(--calcite-combobox-item-spacing-indent-1)}.label--indent-2{-webkit-padding-start:var(--calcite-combobox-item-spacing-indent-2);padding-inline-start:var(--calcite-combobox-item-spacing-indent-2)}.title{border:0 solid;display:block;-ms-flex:1 1 0%;flex:1 1 0%;border-bottom-width:1px;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-ui-text-2);word-wrap:break-word;word-break:break-word;border-bottom-color:var(--calcite-ui-border-3);padding:var(--calcite-combobox-item-spacing-unit-l) 0;margin-left:var(--calcite-combobox-item-spacing-unit-s);margin-right:var(--calcite-combobox-item-spacing-unit-s)}";export{U as calcite_combobox,G as calcite_combobox_item,Y as calcite_combobox_item_group}