/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/assets/vendor/jquery-once/jquery.once.min.js. */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/assets/vendor/jquery-once/jquery.once.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/drupalSettingsLoader.js. */
(function(){var settingsElement=document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');window.drupalSettings={};if(settingsElement!==null){window.drupalSettings=JSON.parse(settingsElement.textContent);}})();
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/drupalSettingsLoader.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/sites/default/files/languages/pt_MpklRfYye-FSiWKgHXmZPL9bYhy13XEKXdivT8_O9Vs.js. */
window.drupalTranslations = {"strings":{"":{"Add":"Adicionar","Home":"In\u00edcio","Next":"Seguinte","closed":"encerrada","Cancel":"Cancelar","Disabled":"Desativado","Enabled":"Ativado","Edit":"Editar","Link":"Liga\u00e7\u00e3o","Image":"Imagem","Open":"Abrir","Sunday":"Domingo","Monday":"Segunda","Tuesday":"Ter\u00e7a","Wednesday":"Quarta","Thursday":"Quinta","Friday":"Sexta","Saturday":"S\u00e1bado","View":"Mostrar","Continue":"Continuar","Done":"Opera\u00e7\u00e3o conclu\u00edda","1 hour\u0003@count hours":"1 hora\u0003@count horas","1 day\u0003@count days":"1 dia\u0003@count dias","Prev":"Anterior","Mon":"Seg","Tue":"Ter","Wed":"Qua","Thu":"Qui","Fri":"Sex","Sat":"S\u00e1b","Sun":"Dom","May":"Maio","Add group":"Adicionar grupo","Show":"Mostrar","Select all rows in this table":"Marcar todas as colunas nesta tabela.","Deselect all rows in this table":"Desmarcar todas as colunas nesta tabela.","Today":"Hoje","Jan":"Jan","Mar":"Mar","Apr":"Abr","Jun":"Jun","Jul":"Jul","Aug":"Ago","Sep":"Set","Oct":"Out","Nov":"Nov","Dec":"Dez","Su":"Dom","Mo":"Seg","Tu":"Ter","We":"Qua","Th":"Qui","Fr":"Sex","Sa":"Sab","Not published":"N\u00e3o publicado","Apply":"Aplicar","Please wait...":"Por favor aguarde...","Hide":"Esconder","1 year\u0003@count years":"1 ano\u0003@count anos","1 week\u0003@count weeks":"1 semana\u0003@count semanas","1 min\u0003@count min":"1 min\u0003@count min","1 sec\u0003@count sec":"1 sec\u0003@count sec","mm\/dd\/yy":"mm\/dd\/aa","Error message":"Mensagem de erro","1 month\u0003@count months":"1 m\u00eas\u0003@count meses","Warning message":"Mensagem de aviso","By @name on @date":"Por @name em @date","By @name":"Por @name","Not in menu":"N\u00e3o presente no menu","Alias: @alias":"Caminho alternativo: @alias","No alias":"Nenhum caminho alternativo","An error has occurred.":"Ocorreu um erro.","0 sec":"0 segundos","New revision":"Nova revis\u00e3o","Drag to re-order":"Arraste para reordenar.","Changes made in this table will not be saved until the form is submitted.":"As altera\u00e7\u00f5es efetuadas nesta tabela n\u00e3o ir\u00e3o ser guardadas at\u00e9 que o formul\u00e1rio seja enviado.","This permission is inherited from the authenticated user role.":"Esta permiss\u00e3o \u00e9 herdada do grupo de utilizadores autenticados.","Requires a title":"Requer um t\u00edtulo","Not restricted":"N\u00e3o restringido","(active tab)":"(separador ativo)","Status message":"Mensagem de estado","An AJAX HTTP error occurred.":"Ocorreu um erro HTTP no Ajax.","HTTP Result Code: !status":"C\u00f3digo de Resultado HTTP: !status","An AJAX HTTP request terminated abnormally.":"Um pedido HTTP Ajax terminou com anomalia.","Debugging information follows.":"Segue informa\u00e7\u00e3o para depura\u00e7\u00e3o.","Path: !uri":"Caminho: !uri","StatusText: !statusText":"Texto de Estado: !statusText","ResponseText: !responseText":"Texto de Resposta: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Restricted to certain pages":"Restringido a determinadas p\u00e1ginas","The block cannot be placed in this region.":"O bloco n\u00e3o pode ser colocado nesta regi\u00e3o","Hide summary":"Ocultar sum\u00e1rio","Edit summary":"Editar sum\u00e1rio","Don\u0027t display post information":"N\u00e3o mostrar a informa\u00e7\u00e3o do artigo","Collapse":"Expandir","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"O ficheiro selecionado %filename n\u00e3o pode ser carregado. Apenas ficheiros com as seguintes extens\u00f5es s\u00e3o permitidos: %extensions.","Show row weights":"Mostrar coluna de pesos","Hide row weights":"Ocultar coluna de pesos","Close":"Fechar","Feb":"Fev","Caption":"Legenda","Extend":"Estender","Changed":"Alterado","Loading...":"Carregando...","Unlink":"Quebrar liga\u00e7\u00e3o","Not promoted":"N\u00e3o promovido","button":"bot\u00e3o","Edit Link":"Editar liga\u00e7\u00e3o","Remove group":"Remover grupo","@label":"@label","New group":"Novo grupo","No revision":"Nenhuma revis\u00e3o","Apply (all displays)":"Aplicar (todos os displays)","Apply (this display)":"Aplicar (este display)","Revert to default":"Reverter para predefinido","Needs to be updated":"Necessita ser atualizado","Does not need to be updated":"N\u00e3o necessita ser atualizado","Show all columns":"Mostrar todas as colunas","Show table cells that were hidden to make the table fit within a small screen.":"Mostrar as c\u00e9lulas da tabela que foram ocultadas para ajustar a tabela em ecr\u00e3s pequenos.","List additional actions":"Lista de a\u00e7\u00f5es adicionais","Flag other translations as outdated":"Marcar outras tradu\u00e7\u00f5es como desatualizadas","Do not flag other translations as outdated":"N\u00e3o marcar outras tradu\u00e7\u00f5es como desatualizadas","opened":"aberto","Horizontal orientation":"Orienta\u00e7\u00e3o horizontal","Vertical orientation":"Orienta\u00e7\u00e3o vertical","You have unsaved changes.":"Tem altera\u00e7\u00f5es n\u00e3o guardadas.","No styles configured":"N\u00e3o tem estilos configurados","@count styles configured":"@count estilos configurados","Uploads disabled":"Carregamentos desativados","Enter caption here":"Inserir legenda aqui","Hide group names":"Ocultar nomes de grupo","Show group names":"Mostrar nomes de grupos","Press the down arrow key to create a new row.":"Carregue a tecla de seta para baixo para criar uma linha nova.","@name @type.":"@name @type.","Press the down arrow key to activate.":"Carregue a tecla de seta para baixo para ativar.","Use the keyboard arrow keys to change the position of this button.":"Utilize as teclas de seta do teclado para alterar a posi\u00e7\u00e3o deste bot\u00e3o.","Press the up arrow key on the top row to disable the button.":"Carregue na tecla de seta para cima para desativar o bot\u00e3o.","Use the down arrow key to move this button into the active toolbar.":"Utilize a tecla de seta para baixo para mover este bot\u00e3o para a barra de ferramentas ativa.","Use the keyboard arrow keys to change the position of this separator.":"Utilize as teclas de seta do teclado para alterar a posi\u00e7\u00e3o deste separador.","Use the down arrow key to move this separator into the active toolbar.":"Utilize a tecla de seta para baixo para mover este separador para a barra de ferramentas ativa.","You may add multiple separators to each button group.":"Pode adicionar m\u00faltiplos separadores a cada grupo de bot\u00f5es.","Please provide a name for the button group.":"Por favor, forne\u00e7a um nome para o grupo de bot\u00f5es.","Button group name":"Nome do grupo do bot\u00e3o","Tray orientation changed to @orientation.":"Orienta\u00e7\u00e3o da bandeja mudou para @orientation.","The response failed verification so will not be processed.":"A resposta falhou a verifica\u00e7\u00e3o, por isso n\u00e3o ser\u00e1 processada."},"Long month name":{"January":"Janeiro","February":"Fevereiro","March":"Mar\u00e7o","April":"Abril","May":"Maio","June":"Junho","July":"Julho","August":"Agosto","September":"Setembro","October":"Outubro","November":"Novembro","December":"Dezembro"}},"pluralFormula":{"1":0,"default":1}};
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/sites/default/files/languages/pt_MpklRfYye-FSiWKgHXmZPL9bYhy13XEKXdivT8_O9Vs.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/drupal.js. */
window.Drupal={behaviors:{},locale:{}};(function(Drupal,drupalSettings,drupalTranslations,console,Proxy,Reflect){Drupal.throwError=function(error){setTimeout(function(){throw error;},0);};Drupal.attachBehaviors=function(context,settings){context=context||document;settings=settings||drupalSettings;var behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach(function(i){if(typeof behaviors[i].attach==='function'){try{behaviors[i].attach(context,settings);}catch(e){Drupal.throwError(e);}}});};Drupal.detachBehaviors=function(context,settings,trigger){context=context||document;settings=settings||drupalSettings;trigger=trigger||'unload';var behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach(function(i){if(typeof behaviors[i].detach==='function'){try{behaviors[i].detach(context,settings,trigger);}catch(e){Drupal.throwError(e);}}});};Drupal.checkPlain=function(str){str=str.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');return str;};Drupal.formatString=function(str,args){var processedArgs={};Object.keys(args||{}).forEach(function(key){switch(key.charAt(0)){case'@':processedArgs[key]=Drupal.checkPlain(args[key]);break;case'!':processedArgs[key]=args[key];break;default:processedArgs[key]=Drupal.theme('placeholder',args[key]);break;}});return Drupal.stringReplace(str,processedArgs,null);};Drupal.stringReplace=function(str,args,keys){if(str.length===0){return str;}
if(!Array.isArray(keys)){keys=Object.keys(args||{});keys.sort(function(a,b){return a.length-b.length;});}
if(keys.length===0){return str;}
var key=keys.pop();var fragments=str.split(key);if(keys.length){for(var i=0;i<fragments.length;i++){fragments[i]=Drupal.stringReplace(fragments[i],args,keys.slice(0));}}
return fragments.join(args[key]);};Drupal.t=function(str,args,options){options=options||{};options.context=options.context||'';if(typeof drupalTranslations!=='undefined'&&drupalTranslations.strings&&drupalTranslations.strings[options.context]&&drupalTranslations.strings[options.context][str]){str=drupalTranslations.strings[options.context][str];}
if(args){str=Drupal.formatString(str,args);}
return str;};Drupal.url=function(path){return drupalSettings.path.baseUrl+drupalSettings.path.pathPrefix+path;};Drupal.url.toAbsolute=function(url){var urlParsingNode=document.createElement('a');try{url=decodeURIComponent(url);}catch(e){}
urlParsingNode.setAttribute('href',url);return urlParsingNode.cloneNode(false).href;};Drupal.url.isLocal=function(url){var absoluteUrl=Drupal.url.toAbsolute(url);var protocol=window.location.protocol;if(protocol==='http:'&&absoluteUrl.indexOf('https:')===0){protocol='https:';}
var baseUrl="".concat(protocol,"//").concat(window.location.host).concat(drupalSettings.path.baseUrl.slice(0,-1));try{absoluteUrl=decodeURIComponent(absoluteUrl);}catch(e){}
try{baseUrl=decodeURIComponent(baseUrl);}catch(e){}
return absoluteUrl===baseUrl||absoluteUrl.indexOf("".concat(baseUrl,"/"))===0;};Drupal.formatPlural=function(count,singular,plural,args,options){args=args||{};args['@count']=count;var pluralDelimiter=drupalSettings.pluralDelimiter;var translations=Drupal.t(singular+pluralDelimiter+plural,args,options).split(pluralDelimiter);var index=0;if(typeof drupalTranslations!=='undefined'&&drupalTranslations.pluralFormula){index=count in drupalTranslations.pluralFormula?drupalTranslations.pluralFormula[count]:drupalTranslations.pluralFormula.default;}else if(args['@count']!==1){index=1;}
return translations[index];};Drupal.encodePath=function(item){return window.encodeURIComponent(item).replace(/%2F/g,'/');};Drupal.deprecationError=function(_ref){var message=_ref.message;if(drupalSettings.suppressDeprecationErrors===false&&typeof console!=='undefined'&&console.warn){console.warn("[Deprecation] ".concat(message));}};Drupal.deprecatedProperty=function(_ref2){var target=_ref2.target,deprecatedProperty=_ref2.deprecatedProperty,message=_ref2.message;if(!Proxy||!Reflect){return target;}
return new Proxy(target,{get:function get(target,key){if(key===deprecatedProperty){Drupal.deprecationError({message:message});}
for(var _len=arguments.length,rest=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){rest[_key-2]=arguments[_key];}
return Reflect.get.apply(Reflect,[target,key].concat(rest));}});};Drupal.theme=function(func){if(func in Drupal.theme){var _Drupal$theme;for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}
return(_Drupal$theme=Drupal.theme)[func].apply(_Drupal$theme,args);}};Drupal.theme.placeholder=function(str){return"<em class=\"placeholder\">".concat(Drupal.checkPlain(str),"</em>");};})(Drupal,window.drupalSettings,window.drupalTranslations,window.console,window.Proxy,window.Reflect);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/drupal.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/drupal.init.js. */
if(window.jQuery){jQuery.noConflict();}
document.documentElement.className+=' js';(function(Drupal,drupalSettings){var domReady=function domReady(callback){var listener=function listener(){callback();document.removeEventListener('DOMContentLoaded',listener);};if(document.readyState!=='loading'){setTimeout(callback,0);}else{document.addEventListener('DOMContentLoaded',listener);}};domReady(function(){Drupal.attachBehaviors(document,drupalSettings);});})(Drupal,window.drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/drupal.init.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/assets/vendor/tabbable/index.umd.min.js. */
/*!
* tabbable 5.2.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e="undefined"!=typeof globalThis?globalThis:e||self,function(){var n=e.tabbable,r=e.tabbable={};t(r),r.noConflict=function(){return e.tabbable=n,r}}())}(this,(function(e){"use strict";var t=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],n=t.join(","),r="undefined"==typeof Element?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,o=function(e,t,o){var i=Array.prototype.slice.apply(e.querySelectorAll(n));return t&&r.call(e,n)&&i.unshift(e),i=i.filter(o)},i=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return isNaN(t)?function(e){return"true"===e.contentEditable}(e)?0:"AUDIO"!==e.nodeName&&"VIDEO"!==e.nodeName&&"DETAILS"!==e.nodeName||null!==e.getAttribute("tabindex")?e.tabIndex:0:t},a=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},u=function(e){return"INPUT"===e.tagName},l=function(e){return function(e){return u(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,n=e.form||e.ownerDocument,r=function(e){return n.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=r(window.CSS.escape(e.name));else try{t=r(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var o=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}(t,e.form);return!o||o===e}(e)},c=function(e,t){return!(t.disabled||function(e){return u(e)&&"hidden"===e.type}(t)||function(e,t){if("hidden"===getComputedStyle(e).visibility)return!0;var n=r.call(e,"details>summary:first-of-type")?e.parentElement:e;if(r.call(n,"details:not([open]) *"))return!0;if(t&&"full"!==t){if("non-zero-area"===t){var o=e.getBoundingClientRect(),i=o.width,a=o.height;return 0===i&&0===a}}else for(;e;){if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1}(t,e.displayCheck)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(u(e)||"SELECT"===e.tagName||"TEXTAREA"===e.tagName||"BUTTON"===e.tagName)for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var n=0;n<t.children.length;n++){var r=t.children.item(n);if("LEGEND"===r.tagName)return!r.contains(e)}return!0}t=t.parentElement}return!1}(t))},d=function(e,t){return!(!c(e,t)||l(t)||i(t)<0)},f=t.concat("iframe").join(",");e.focusable=function(e,t){return o(e,(t=t||{}).includeContainer,c.bind(null,t))},e.isFocusable=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==r.call(e,f)&&c(t,e)},e.isTabbable=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==r.call(e,n)&&d(t,e)},e.tabbable=function(e,t){var n=[],r=[];return o(e,(t=t||{}).includeContainer,d.bind(null,t)).forEach((function(e,t){var o=i(e);0===o?n.push(e):r.push({documentOrder:t,tabIndex:o,node:e})})),r.sort(a).map((function(e){return e.node})).concat(n)},Object.defineProperty(e,"__esModule",{value:!0})}));

/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/assets/vendor/tabbable/index.umd.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/modules/contrib/matomo/js/matomo.js. */
(function($,drupalSettings){'use strict';$(document).ready(function(){defaultBind();if(drupalSettings.matomo.trackColorbox){$(document).bind('cbox_complete',function(){var href=$.colorbox.element().attr('href');if(href){_paq.push(['setCustomUrl',href]);if(drupalSettings.matomo.disableCookies){_paq.push(['disableCookies']);}
_paq.push(['trackPageView']);}});}});function defaultBind(){$(document.body).bind('mousedown keyup touchstart',function(event){$(event.target).closest('a,area').each(function(){if(drupalSettings.matomo.trackMailto&&$(this).is("a[href^='mailto:'],area[href^='mailto:']")){_paq.push(['trackEvent','Mails','Click',this.href.substring(7)]);}});});}})(jQuery,drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/modules/contrib/matomo/js/matomo.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/jquery.once.bc.js. */
(function($,once){var deprecatedMessageSuffix="is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256";var originalJQOnce=$.fn.once;var originalJQRemoveOnce=$.fn.removeOnce;$.fn.once=function jQueryOnce(id){Drupal.deprecationError({message:"jQuery.once() ".concat(deprecatedMessageSuffix)});return originalJQOnce.apply(this,[id]);};$.fn.removeOnce=function jQueryRemoveOnce(id){Drupal.deprecationError({message:"jQuery.removeOnce() ".concat(deprecatedMessageSuffix)});return originalJQRemoveOnce.apply(this,[id]);};var drupalOnce=once;function augmentedOnce(id,selector,context){originalJQOnce.apply($(selector,context),[id]);return drupalOnce(id,selector,context);}
function remove(id,selector,context){originalJQRemoveOnce.apply($(selector,context),[id]);return drupalOnce.remove(id,selector,context);}
window.once=Object.assign(augmentedOnce,drupalOnce,{remove:remove});})(jQuery,once);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/jquery.once.bc.js. */;