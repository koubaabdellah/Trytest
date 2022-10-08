/*! For license information please see 4e03804eb850581bb43d598808c2aa3a64a2c5a0-ab2130bb77224d373f6c.js.LICENSE.txt */
"use strict";(self.webpackChunkafd_site=self.webpackChunkafd_site||[]).push([[8829],{9666:function(e,t,r){r.d(t,{pm:function(){return f},xX:function(){return F}});var o=r(27378),n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},n(e,t)};function a(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var i,c=function(){return c=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},c.apply(this,arguments)};function s(e,t,r,o){return new(r||(r=Promise))((function(n,a){function i(e){try{s(o.next(e))}catch(t){a(t)}}function c(e){try{s(o.throw(e))}catch(t){a(t)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,c)}s((o=o.apply(e,t||[])).next())}))}function u(e,t){var r,o,n,a,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,o&&(n=2&a[0]?o.return:a[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,a[1])).done)return n;switch(o=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,o=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){i.label=a[1];break}if(6===a[0]&&i.label<n[1]){i.label=n[1],n=a;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(a);break}n[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(c){a=[6,c],o=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}}!function(e){e.SCRIPT_NOT_AVAILABLE="Recaptcha script is not available"}(i||(i={}));var p=(0,o.createContext)({}),l=p.Consumer,f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.scriptId="google-recaptcha-v3",t.resolver=void 0,t.rejecter=void 0,t.grecaptcha=new Promise((function(e,r){t.resolver=e,t.rejecter=r})),t.executeRecaptcha=function(e){return s(t,void 0,void 0,(function(){var t;return u(this,(function(r){return t=this.props.reCaptchaKey,[2,this.grecaptcha.then((function(r){return r.execute(t,{action:e})}))]}))}))},t.handleOnLoad=function(){window&&window.grecaptcha?window.grecaptcha.ready((function(){t.resolver(window.grecaptcha)})):console.warn(i.SCRIPT_NOT_AVAILABLE)},t.injectGoogleReCaptchaScript=function(){if(document.getElementById(t.scriptId))t.handleOnLoad();else{var e=document.getElementsByTagName("head")[0],r=t.generateGoogleReCaptchaScript();e.appendChild(r)}},t.generateGoogleReCaptchaScript=function(){var e=t.props,r=e.reCaptchaKey,o=e.language,n=e.nonce,a=document.createElement("script");return a.id=t.scriptId,a.src=t.googleRecaptchaSrc+"?render="+r+(o?"&hl="+o:""),n&&(a.nonce=n),a.onload=t.handleOnLoad,a},t}return a(t,e),Object.defineProperty(t.prototype,"googleRecaptchaSrc",{get:function(){return"https://www."+(this.props.useRecaptchaNet?"recaptcha.net":"google.com")+"/recaptcha/api.js"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"googleReCaptchaContextValue",{get:function(){return{executeRecaptcha:this.executeRecaptcha}},enumerable:!0,configurable:!0}),t.prototype.componentDidMount=function(){this.props.reCaptchaKey&&this.injectGoogleReCaptchaScript()},t.prototype.componentDidUpdate=function(e){!e.reCaptchaKey&&this.props.reCaptchaKey&&this.injectGoogleReCaptchaScript()},t.prototype.componentWillUnmount=function(){var e=document.querySelector(".grecaptcha-badge");e&&e.parentNode&&document.body.removeChild(e.parentNode);var t=document.querySelector("#"+this.scriptId);t&&t.remove()},t.prototype.render=function(){var e=this.props.children;return(0,o.createElement)(p.Provider,{value:this.googleReCaptchaContextValue},e)},t}(o.Component);function d(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function y(e,t){return e(t={exports:{}},t.exports),t.exports}var m=y((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&Symbol.for,o=r?Symbol.for("react.element"):60103,n=r?Symbol.for("react.portal"):60106,a=r?Symbol.for("react.fragment"):60107,i=r?Symbol.for("react.strict_mode"):60108,c=r?Symbol.for("react.profiler"):60114,s=r?Symbol.for("react.provider"):60109,u=r?Symbol.for("react.context"):60110,p=r?Symbol.for("react.async_mode"):60111,l=r?Symbol.for("react.concurrent_mode"):60111,f=r?Symbol.for("react.forward_ref"):60112,d=r?Symbol.for("react.suspense"):60113,y=r?Symbol.for("react.memo"):60115,m=r?Symbol.for("react.lazy"):60116;function h(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case p:case l:case a:case c:case i:case d:return e;default:switch(e=e&&e.$$typeof){case u:case f:case s:return e;default:return t}}case m:case y:case n:return t}}}function g(e){return h(e)===l}t.typeOf=h,t.AsyncMode=p,t.ConcurrentMode=l,t.ContextConsumer=u,t.ContextProvider=s,t.Element=o,t.ForwardRef=f,t.Fragment=a,t.Lazy=m,t.Memo=y,t.Portal=n,t.Profiler=c,t.StrictMode=i,t.Suspense=d,t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===a||e===l||e===c||e===i||e===d||"object"==typeof e&&null!==e&&(e.$$typeof===m||e.$$typeof===y||e.$$typeof===s||e.$$typeof===u||e.$$typeof===f)},t.isAsyncMode=function(e){return g(e)||h(e)===p},t.isConcurrentMode=g,t.isContextConsumer=function(e){return h(e)===u},t.isContextProvider=function(e){return h(e)===s},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return h(e)===f},t.isFragment=function(e){return h(e)===a},t.isLazy=function(e){return h(e)===m},t.isMemo=function(e){return h(e)===y},t.isPortal=function(e){return h(e)===n},t.isProfiler=function(e){return h(e)===c},t.isStrictMode=function(e){return h(e)===i},t.isSuspense=function(e){return h(e)===d}}));d(m);m.typeOf,m.AsyncMode,m.ConcurrentMode,m.ContextConsumer,m.ContextProvider,m.Element,m.ForwardRef,m.Fragment,m.Lazy,m.Memo,m.Portal,m.Profiler,m.StrictMode,m.Suspense,m.isValidElementType,m.isAsyncMode,m.isConcurrentMode,m.isContextConsumer,m.isContextProvider,m.isElement,m.isForwardRef,m.isFragment,m.isLazy,m.isMemo,m.isPortal,m.isProfiler,m.isStrictMode,m.isSuspense;var h=y((function(e,t){0}));d(h);h.typeOf,h.AsyncMode,h.ConcurrentMode,h.ContextConsumer,h.ContextProvider,h.Element,h.ForwardRef,h.Fragment,h.Lazy,h.Memo,h.Portal,h.Profiler,h.StrictMode,h.Suspense,h.isValidElementType,h.isAsyncMode,h.isConcurrentMode,h.isContextConsumer,h.isContextProvider,h.isElement,h.isForwardRef,h.isFragment,h.isLazy,h.isMemo,h.isPortal,h.isProfiler,h.isStrictMode,h.isSuspense;var g=y((function(e){e.exports=m})),v={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},b={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},w={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},C={};function P(e){return g.isMemo(e)?w:C[e.$$typeof]||v}C[g.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},C[g.Memo]=w;var S=Object.defineProperty,x=Object.getOwnPropertyNames,M=Object.getOwnPropertySymbols,O=Object.getOwnPropertyDescriptor,R=Object.getPrototypeOf,j=Object.prototype;var $,_,E=function e(t,r,o){if("string"!=typeof r){if(j){var n=R(r);n&&n!==j&&e(t,n,o)}var a=x(r);M&&(a=a.concat(M(r)));for(var i=P(t),c=P(r),s=0;s<a.length;++s){var u=a[s];if(!(b[u]||o&&o[u]||c&&c[u]||i&&i[u])){var p=O(r,u);try{S(t,u,p)}catch(l){}}}}return t},q=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.componentDidMount=function(){return s(this,void 0,void 0,(function(){var e,t,r,o,n,a;return u(this,(function(i){switch(i.label){case 0:return e=this.injectedProps,t=e.googleReCaptchaProps,r=e.action,o=e.onVerify,(n=t.executeRecaptcha)?[4,n(r)]:[2];case 1:return a=i.sent(),o?(o(a),[2]):[2]}}))}))},Object.defineProperty(t.prototype,"injectedProps",{get:function(){return this.props},enumerable:!0,configurable:!0}),t.prototype.render=function(){return null},t}(o.Component),F=((_=function(e){return(0,o.createElement)(l,null,(function(t){return(0,o.createElement)($,c({},e,{googleReCaptchaProps:t}))}))}).displayName="withGoogleReCaptcha("+(($=q).displayName||$.name||"Component")+")",E(_,$),function(){return(0,o.useContext)(p)})},71236:function(e,t,r){r.d(t,{U:function(){return o}});var o={firstName:{required:"First name is required."},lastName:{required:"Last name is required."},email:{required:"Email is required.",pattern:{value:/^[^@\s]+@[^@\s]+\.[^@\s]+$/,message:"Invalid email."}},securityQuestionIdx:{required:"Security question is required."},securityAnswer:{required:"Security answer is required."},username:{required:"Username is required.",tooShort:"Username is too short.",tooLong:"Username is too long.",invalid:"Username has invalid characters.",unavailable:"Username is not available"},password:{required:"Password is required.",usernameMatch:"Password cannot match username.",tooShort:"Password must be at least 8 characters.",missingLetterNumber:"Password must have at least 1 letter and 1 number.",tooWeak:"Password is too weak."},confirmPassword:{passwordMatch:"Passwords should match."},termsAndConditions:{required:"You must accept the terms and conditions."}}}}]);