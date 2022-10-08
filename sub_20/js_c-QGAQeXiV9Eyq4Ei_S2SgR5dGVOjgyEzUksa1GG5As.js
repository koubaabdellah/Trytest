/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/vendor/modernizr.js. */
!function(e,t,n,o){var i=[],s={_version:"3.12.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout((function(){t(n[e])}),0)},addTest:function(e,t,n){i.push({name:e,fn:t,options:n})},addAsyncTest:function(e){i.push({name:null,fn:e})}},a=function(){};a.prototype=s,a=new a;var l=[];function r(e,t){return typeof e===t}var f,d,c=n.documentElement,u="svg"===c.nodeName.toLowerCase();function p(e){var t=c.className,n=a._config.classPrefix||"";if(u&&(t=t.baseVal),a._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}a._config.enableClasses&&(e.length>0&&(t+=" "+n+e.join(" "+n)),u?c.className.baseVal=t:c.className=t)}function h(e,t){if("object"==typeof e)for(var n in e)f(e,n)&&h(n,e[n]);else{var o=(e=e.toLowerCase()).split("."),i=a[o[0]];if(2===o.length&&(i=i[o[1]]),void 0!==i)return a;t="function"==typeof t?t():t,1===o.length?a[o[0]]=t:(!a[o[0]]||a[o[0]]instanceof Boolean||(a[o[0]]=new Boolean(a[o[0]])),a[o[0]][o[1]]=t),p([(t&&!1!==t?"":"no-")+o.join("-")]),a._trigger(e,t)}return a}f=r(d={}.hasOwnProperty,"undefined")||r(d.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(e,t){return d.call(e,t)},s._l={},s.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),a.hasOwnProperty(e)&&setTimeout((function(){a._trigger(e,a[e])}),0)},s._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout((function(){var e;for(e=0;e<n.length;e++)(0,n[e])(t)}),0),delete this._l[e]}},a._q.push((function(){s.addTest=h}));var v=s._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];function y(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}s._prefixes=v;s.testStyles=function(e,t,o,i){var s,a,l,r,f="modernizr",d=y("div"),p=function(){var e=n.body;return e||((e=y(u?"svg":"body")).fake=!0),e}();if(parseInt(o,10))for(;o--;)(l=y("div")).id=i?i[o]:f+(o+1),d.appendChild(l);return(s=y("style")).type="text/css",s.id="s"+f,(p.fake?p:d).appendChild(s),p.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=f,p.fake&&(p.style.background="",p.style.overflow="hidden",r=c.style.overflow,c.style.overflow="hidden",c.appendChild(p)),a=t(d,e),p.fake&&p.parentNode?(p.parentNode.removeChild(p),c.style.overflow=r,c.offsetHeight):d.parentNode.removeChild(d),!!a};var g=y("input");!function(){for(var e,t,o,i=["search","tel","url","email","datetime","date","month","week","time","datetime-local","number","range","color"],s=0;s<i.length;s++)g.setAttribute("type",e=i[s]),(o="text"!==g.type&&"style"in g)&&(g.value="1)",g.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(e)&&undefined!==g.style.WebkitAppearance?(c.appendChild(g),o=(t=n.defaultView).getComputedStyle&&"textfield"!==t.getComputedStyle(g,null).WebkitAppearance&&0!==g.offsetHeight,c.removeChild(g)):/^(search|tel)$/.test(e)||(o=/^(url|email)$/.test(e)?g.checkValidity&&!1===g.checkValidity():"1)"!==g.value)),a.addTest("inputtypes."+e,!!o)}(),function(){var e,t,n,o,s,f;for(var d in i)if(i.hasOwnProperty(d)){if(e=[],(t=i[d]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,s=0;s<e.length;s++)1===(f=e[s].split(".")).length?a[f[0]]=o:(a[f[0]]&&(!a[f[0]]||a[f[0]]instanceof Boolean)||(a[f[0]]=new Boolean(a[f[0]])),a[f[0]][f[1]]=o),l.push((o?"":"no-")+f.join("-"))}}(),p(l),delete s.addTest,delete s.addAsyncTest;for(var m=0;m<a._q.length;m++)a._q[m]();e.Modernizr=a}(window,window,document);
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/vendor/modernizr.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/core/misc/drupalSettingsLoader.js. */
(function(){var settingsElement=document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');window.drupalSettings={};if(settingsElement!==null){window.drupalSettings=JSON.parse(settingsElement.textContent);}})();
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/core/misc/drupalSettingsLoader.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/sites/default/files/languages/nl_HmGU8_h8MtO_7Erlam2xFa6VQCtRE3AhPQQnTTPMzs8.js. */
window.drupalTranslations = {"strings":{"":{"Add":"Toevoegen","item":"item","Home":"Home","Next":"Volgende","closed":"gesloten","Cancel":"Annuleren","Disabled":"Uitgeschakeld","Enabled":"Ingeschakeld","Edit":"Bewerken","Link":"Link","Image":"Afbeelding","Open":"Open","Continue":"Doorgaan","1 hour\u0003@count hours":"1 uur\u0003@count uur","1 day\u0003@count days":"1 dag\u0003@count dagen","Close":"Sluiten","Add group":"Groep toevoegen","Show":"Weergeven","Select all rows in this table":"Selecteer alle regels van deze tabel","Deselect all rows in this table":"De-selecteer alle regels van deze tabel","Caption":"Onderschrift","Extend":"Uitbreiding","Changed":"Gewijzigd","Not published":"Niet gepubliceerd","Loading...":"Bezig met laden...","Apply":"Toepassen","Please wait...":"Even geduld...","Hide":"Verbergen","Unlink":"Link verwijderen","1 year\u0003@count years":"1 jaar\u0003@count jaar","1 week\u0003@count weeks":"1 week\u0003@count weken","1 min\u0003@count min":"1 min\u0003@count min","1 sec\u0003@count sec":"1 sec\u0003@count sec","Not promoted":"Niet aangeraden","Error message":"Foutmelding","1 month\u0003@count months":"1 maand\u0003@count maanden","button":"knop","Warning message":"Waarschuwingsbericht","Edit Link":"Link bewerken","Remove group":"Groep verwijderen","By @name on @date":"Door @name op @date","By @name":"Door @name","Alias: @alias":"Alias: @alias","No alias":"Geen alias","@label":"@label","0 sec":"0 sec","New revision":"Nieuwe revisie","Drag to re-order":"Slepen om de volgorde te wijzigen","Changes made in this table will not be saved until the form is submitted.":"Wijzigingen in deze tabel worden pas opgeslagen wanneer het formulier wordt ingediend.","Show description":"Beschrijving tonen","New group":"Nieuwe groep","Lock":"Vergrendel","This permission is inherited from the authenticated user role.":"Dit toegangsrecht is overgenomen van de rol \u0027geverifieerde gebruiker\u0027.","No revision":"Geen revisie","Requires a title":"Een titel is verplicht","(active tab)":"(actieve tabblad)","Status message":"Status bericht","An AJAX HTTP error occurred.":"Er is een AJAX HTTP fout opgetreden.","HTTP Result Code: !status":"HTTP-resultaatcode: !status","An AJAX HTTP request terminated abnormally.":"Een AJAX HTTP-aanvraag is onverwacht afgebroken","Debugging information follows.":"Debug informatie volgt.","Path: !uri":"Pad: !uri","StatusText: !statusText":"Statustekst: !statusText","ResponseText: !responseText":"Antwoordtekst: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Restricted to certain pages":"Beperkt tot bepaalde pagina\u0027s","The block cannot be placed in this region.":"Het blok kan niet worden geplaatst in dit gebied.","Hide summary":"Samenvatting verbergen","Edit summary":"Samenvatting bewerken","Don\u0027t display post information":"Geen berichtinformatie weergeven","Unlock":"Ontgrendelen","Collapse":"Inklappen","Edit media":"Media bewerken","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Het bestand %filename kan niet ge\u00fcpload worden. Alleen bestanden met de volgende extensies zijn toegestaan: %extensions","Show row weights":"Gewicht van rijen tonen","Hide row weights":"Gewicht van rij verbergen","Apply (all displays)":"Toepassen (alle weergaven)","Apply (this display)":"Toepassen (deze weergave)","Revert to default":"Terugzetten naar standaard","Hide description":"Beschrijving verbergen","Needs to be updated":"Moet worden bijgewerkt","Does not need to be updated":"Hoeft niet te worden bijgewerkt","Show all columns":"Alle kolommen tonen","Show table cells that were hidden to make the table fit within a small screen.":"Toon de tabelcellen die verborgen werden om de tabel te laten passen op een klein scherm.","List additional actions":"Aanvullende acties weergeven","Flag other translations as outdated":"Markeer andere vertalingen als verouderd","Do not flag other translations as outdated":"Markeer andere vertalingen niet als verouderd","opened":"geopend","Horizontal orientation":"Horizontale ori\u00ebntatie","Vertical orientation":"Verticale ori\u00ebntatie","Tray orientation changed to @orientation.":"Ori\u00ebntatie van de lade aangepast naar @orientation.","You have unsaved changes.":"Er zijn niet-opgeslagen wijzigingen.","No styles configured":"Geen stijlen ingesteld","@count styles configured":"@count stijlen ingesteld","@action @title configuration options":"@action @title configuratie-instellingen","Tabbing is no longer constrained by the Contextual module.":"Gebruik van tab-toets is niet langer beperkt tot de contextuele links.","Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.":"Gebruik van de tab-toets is beperkt tot een set van @contextualsCount en het wisselen van de bewerkenmodus.","Press the esc key to exit.":"Druk op de ESC-toets om af te sluiten.","@count contextual link\u0003@count contextual links":"@count contextuele link\u0003@count contextuele links","Based on the text editor configuration, these tags have automatically been added: \u003Cstrong\u003E@tag-list\u003C\/strong\u003E.":"Op basis van de configuratie van de teksteditor zijn de volgende elementen automatisch toegevoegd: \u003Cstrong\u003E@tag-list\u003C\/strong\u003E.","!tour_item of !total":"!tour_item van !total","End tour":"Rondleiding be\u00ebindigen","Uploads disabled":"Uploads uitgeschakeld","Uploads enabled, max size: @size @dimensions":"Uploads ingeschakeld, maximale grootte: @size @dimensions","The toolbar cannot be set to a horizontal orientation when it is locked.":"Als de werkbalk geblokkeerd is kan deze niet op horizontale ori\u00ebntatie gezet worden.","Enter caption here":"Bijschrift hier invoeren","Hide group names":"Groepsnamen verbergen","Show group names":"Groepsnamen weergeven","@groupName button group in position @position of @positionCount in row @row of @rowCount.":"Knopgroep @groupName in positie @position van @positionCount in rij @row van @rowCount.","Press the down arrow key to create a new row.":"Gebruik de \u0027pijl naar beneden\u0027-toets voor het aanmaken van een nieuwe rij.","@name @type.":"@name @type.","Press the down arrow key to activate.":"Druk op de toets \u0027pijl omlaag\u0027 om te activeren.","@name @type in position @position of @positionCount in @groupName button group in row @row of @rowCount.":"@type @name in positie @position van @positionCount in @groupName knopgroep in rij @row van @rowCount.","Press the down arrow key to create a new button group in a new row.":"Druk op de toets \u0027pijl omlaag\u0027 om een nieuwe knopgroep aan te maken in een nieuwe rij.","This is the last group. Move the button forward to create a new group.":"Dit is de laatste groep. Verplaats de knop vooruit om een nieuwe groep aan te maken.","The \u0022@name\u0022 button is currently enabled.":"De knop \u0027@name\u0027 is momenteel ingeschakeld.","Use the keyboard arrow keys to change the position of this button.":"Gebruik de pijltoetsen om de positie van deze knop te veranderen.","The \u0022@name\u0022 button is currently disabled.":"De knop \u0027@name\u0027 is momenteel uitgeschakeld.","Use the down arrow key to move this button into the active toolbar.":"Gebruik de toets \u0027omlaag\u0027 om de knop naar de actieve werkbalk te verplaatsen.","This @name is currently enabled.":"Deze @name is momenteel ingeschakeld.","Use the keyboard arrow keys to change the position of this separator.":"Gebruik de pijltoetsen van het toetsenbord om de knopscheider te verplaatsen.","Separators are used to visually split individual buttons.":"Knopscheiders worden gebruikt om knoppen visueel te scheiden.","This @name is currently disabled.":"Deze @name is momenteel uitgeschakeld.","Use the down arrow key to move this separator into the active toolbar.":"Gebruik de toets \u0027omlaag\u0027 om de knopscheider naar de actieve werkbalk te verplaatsen.","You may add multiple separators to each button group.":"Er kunnen meerdere knopscheiders in \u00e9\u00e9n knoppengroep worden gebruikt.","Please provide a name for the button group.":"Voer een naam voor de knoppengroep in.","Button group name":"Knopgroepnaam","Editing the name of the new button group in a dialog.":"De naam van een nieuwe knoppengroep in een dialoogvenster bewerken.","Editing the name of the \u0022@groupName\u0022 button group in a dialog.":"De naam van de knoppengroep \u0027@groupName\u0027 in een dialoogvenster bewerken.","Place a button to create a new button group.":"Plaats een knop om een nieuwe knopgroep aan te maken.","Add a CKEditor button group to the end of this row.":"Een CKEditor-knoppengroep aan het einde van deze regel toevoegen.","Changing the text format to %text_format will permanently remove content that is not allowed in that text format.\u003Cbr\u003E\u003Cbr\u003ESave your changes before switching the text format to avoid losing data.":"Wijzigen van de tekstopmaak naar %text_format zal inhoud die niet toegestaan is in die opmaak permanent verwijderen.\u003Cbr\u003E\u003Cbr\u003ESla uw wijzigingen op voordat u de tekstopmaak omschakelt, om gegevensverlies te voorkomen.","Change text format?":"Tekstopmaak aanpassen?","Rich Text Editor, !label field":"Opgemaakte tekst-editor, veld !label","Leave preview?":"Voorbeeldweergave verlaten?","Leave preview":"Voorbeeldweergave verlaten","Leaving the preview will cause unsaved changes to be lost. Are you sure you want to leave the preview?":"Het verlaten van de voorbeeldweergave betekend dat nog niet opgeslagen wijzigingen verloren gaan. Weet u zeker dat u de voorbeeldweergave wilt verlaten?","CTRL+Left click will prevent this dialog from showing and proceed to the clicked link.":"CTRL+klik om deze dialoog over te slaan en direct naar de link te gaan.","Tray \u0022@tray\u0022 @action.":"Lade \u0027@tray\u0027 @action.","Tray @action.":"Lade @action.","Hide lower priority columns":"Kolommen met een lagere prioriteit verbergen","!modules modules are available in the modified list.":"!modules modules zijn beschikbaar in de aangepaste lijst.","The response failed verification so will not be processed.":"Het antwoord kon niet geverifieerd worden en zal daarom niet worden verwerkt.","The callback URL is not local and not trusted: !url":"De callback-URL is niet lokaal en vertrouwd: !url","CustomMessage: !customMessage":"CustomMessage: !customMessage","Authored on @date":"Aangemaakt op @date","1 block is available in the modified list.\u0003@count blocks are available in the modified list.":"1 blok beschikbaar in de lijst met wijzigingen.\u0003@count blokken beschikbaar in de lijst met wijzigingen.","Zero items selected":"Geen items geselecteerd","All @count items selected":"Alle @count items geselecteerd","Select all media":"Selecteer alle media","Show media item weights":"Toon gewicht van media-items","Hide media item weights":"Gewicht van media-items verbergen","An error occurred while trying to preview the media. Please save your work and reload this page.":"Er ging iets fout bij het voorvertonen van de media. Sla uw werk op en herlaad deze pagina alstublieft.","Embedded media":"Ingesloten media","Insert from Media Library":"Invoegen uit de Mediabibliotheek","No results":"Geen resultaten","Collapse all":"Alles inklappen","Automatic alias":"Automatische alias","Scheduled for publishing":"Gepland voor publiceren","Scheduled for unpublishing":"Gepland voor depubliceren","Not scheduled":"Niet ingepland","Publishing enabled":"Publicatie ingeschakeld","Unpublishing enabled":"Depublicatie ingeschakeld","Insert this token into your form":"Plaats deze token in uw formulier","First click a text field to insert your tokens into.":"Klik eerst een tekstveld aan om uw tokens in te plaatsen.","items":"items","Expand all":"Alles uitklappen","Not restricted":"Geen beperking","Toggle details widget state.":"Widget detailstatus schakelen.","Two column layout":"Twee kolommen","Three column layout":"Drie kolommen","All details have been expanded.":"Alle details zijn uitgeklapt.","All details have been collapsed.":"Alle details zijn ingeklapt.","Changes you made may not be saved.":"Wijzigingen kunnen verloren gaan.","Press OK to leave this page or Cancel to stay.":"Klok OK om de pagina te verlaten of Annuleren om te blijven.","Embedded entity":"Ingesloten entiteit","Select content owner":"Selecteer inhoud eigenaar","Text copied!":"Tekst gekopieerd!"}},"pluralFormula":{"0":0,"1":0,"default":1}};
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/sites/default/files/languages/nl_HmGU8_h8MtO_7Erlam2xFa6VQCtRE3AhPQQnTTPMzs8.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/core/misc/drupal.js. */
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
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/core/misc/drupal.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/core/misc/drupal.init.js. */
if(window.jQuery){jQuery.noConflict();}
document.documentElement.className+=' js';(function(Drupal,drupalSettings){var domReady=function domReady(callback){var listener=function listener(){callback();document.removeEventListener('DOMContentLoaded',listener);};if(document.readyState!=='loading'){setTimeout(callback,0);}else{document.addEventListener('DOMContentLoaded',listener);}};domReady(function(){Drupal.attachBehaviors(document,drupalSettings);});})(Drupal,window.drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/core/misc/drupal.init.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/misc/once/once.js. */
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";Node.prototype.once=function(e){if("string"!=typeof e)throw new TypeError(`The id parameter must be a string, ${typeof e} given.`);const t=`once-${e.trim()}`;return t in this==!1?(this[t]=!0,this):null},NodeList.prototype.once=function(e){return[...this].filter((t=>t instanceof Node&&null!==t.once(e)))},Array.prototype.once=NodeList.prototype.once}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/misc/once/once.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/cookiebar/cookiebar.js. */
!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";(Drupal=>{Drupal.behaviors.cookiebar={attach(e){const o=(e.parentNode||e).querySelectorAll(".js-cookiebar").once("cookiebar");o.forEach((e=>{((e="cookiebar")=>!!document.cookie.split(";").some((o=>0===o.trim().indexOf(`${e}=readed`))))(e.dataset.cookieName)&&e.remove(),e.classList.add("m-cookiebar--is-visible"),((e="cookiebar")=>{const o=new Date,t="https"===window.location.protocol;o.setDate(o.getDate()+30),document.cookie=`${e}=readed; expires=${o}; ${t?"Secure":""}`})(e.dataset.cookieName)}))}}})(Drupal)}));
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/themes/custom/consuwijzer/dist/js/patterns/molecules/cookiebar/cookiebar.js. */;
