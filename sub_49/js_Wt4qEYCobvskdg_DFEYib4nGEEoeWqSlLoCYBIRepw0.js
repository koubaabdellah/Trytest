/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/assets/vendor/once/once.min.js. */
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once=function(){"use strict";var n=/[\11\12\14\15\40]+/,e="data-once",t=document;function r(n,t,r){return n[t+"Attribute"](e,r)}function o(e){if("string"!=typeof e)throw new TypeError("once ID must be a string");if(""===e||n.test(e))throw new RangeError("once ID must not be empty or contain spaces");return'[data-once~="'+e+'"]'}function u(n){if(!(n instanceof Element))throw new TypeError("The element must be an instance of Element");return!0}function i(n,e){void 0===e&&(e=t);var r=n;if(null===n)r=[];else{if(!n)throw new TypeError("Selector must not be empty");"string"!=typeof n||e!==t&&!u(e)?n instanceof Element&&(r=[n]):r=e.querySelectorAll(n)}return Array.prototype.slice.call(r)}function c(n,e,t){return e.filter((function(e){var r=u(e)&&e.matches(n);return r&&t&&t(e),r}))}function f(e,t){var o=t.add,u=t.remove,i=[];r(e,"has")&&r(e,"get").trim().split(n).forEach((function(n){i.indexOf(n)<0&&n!==u&&i.push(n)})),o&&i.push(o);var c=i.join(" ");r(e,""===c?"remove":"set",c)}function a(n,e,t){return c(":not("+o(n)+")",i(e,t),(function(e){return f(e,{add:n})}))}return a.remove=function(n,e,t){return c(o(n),i(e,t),(function(e){return f(e,{remove:n})}))},a.filter=function(n,e,t){return c(o(n),i(e,t))},a.find=function(n,e){return i(n?o(n):"[data-once]",e)},a}();

/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/assets/vendor/once/once.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/assets/vendor/jquery-once/jquery.once.min.js. */
/*!
 * jQuery Once v2.2.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});

/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/assets/vendor/jquery-once/jquery.once.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/drupalSettingsLoader.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function () {
  var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
  window.drupalSettings = {};

  if (settingsElement !== null) {
    window.drupalSettings = JSON.parse(settingsElement.textContent);
  }
})();
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/drupalSettingsLoader.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/sites/default/files/languages/nl_m70XuQang59AUbN5tXzm6j5spSw-nqI3kRjuQGFq_NA.js. */
window.drupalTranslations = {"strings":{"":{"Add":"Toevoegen","Home":"Home","Next":"Volgende","closed":"gesloten","Cancel":"Annuleren","Disabled":"Uitgeschakeld","Enabled":"Ingeschakeld","Edit":"Bewerken","Link":"Link","Image":"Afbeelding","Open":"Open","Sunday":"zondag","Monday":"maandag","Tuesday":"dinsdag","Wednesday":"woensdag","Thursday":"donderdag","Friday":"vrijdag","Saturday":"zaterdag","View":"Weergeven","Continue":"Doorgaan","Done":"Gereed","1 hour\u0003@count hours":"1 uur\u0003@count uur","1 day\u0003@count days":"1 dag\u0003@count dagen","Prev":"Vorige","Mon":"ma","Tue":"di","Wed":"wo","Thu":"do","Fri":"vr","Sat":"za","Sun":"zo","May":"mei","Add group":"Groep toevoegen","Show":"Weergeven","Select all rows in this table":"Selecteer alle regels van deze tabel","Deselect all rows in this table":"De-selecteer alle regels van deze tabel","Today":"Vandaag","Jan":"jan","Mar":"mrt","Apr":"apr","Jun":"jun","Jul":"jul","Aug":"aug","Sep":"sep","Oct":"okt","Nov":"nov","Dec":"dec","Su":"zo","Mo":"ma","Tu":"di","We":"wo","Th":"do","Fr":"vr","Sa":"za","Not published":"Niet gepubliceerd","Apply":"Toepassen","Please wait...":"Even geduld...","Hide":"Verbergen","1 year\u0003@count years":"1 jaar\u0003@count jaar","1 week\u0003@count weeks":"1 week\u0003@count weken","1 min\u0003@count min":"1 min\u0003@count min","1 sec\u0003@count sec":"1 sec\u0003@count sec","mm\/dd\/yy":"mm\/dd\/jj","Error message":"Foutmelding","1 month\u0003@count months":"1 maand\u0003@count maanden","Warning message":"Waarschuwingsbericht","By @name on @date":"Door @name op @date","By @name":"Door @name","Not in menu":"Niet in een menu","Alias: @alias":"Alias: @alias","No alias":"Geen alias","An error has occurred.":"Er is een fout opgetreden.","0 sec":"0 sec","New revision":"Nieuwe revisie","Drag to re-order":"Slepen om de volgorde te wijzigen","Changes made in this table will not be saved until the form is submitted.":"Wijzigingen in deze tabel worden pas opgeslagen wanneer het formulier wordt ingediend.","This permission is inherited from the authenticated user role.":"Dit toegangsrecht is overgenomen van de rol \u0027geverifieerde gebruiker\u0027.","Requires a title":"Een titel is verplicht","Not restricted":"Geen beperking","(active tab)":"(actieve tabblad)","Status message":"Statusbericht","An AJAX HTTP error occurred.":"Er is een AJAX HTTP fout opgetreden.","HTTP Result Code: !status":"HTTP-resultaatcode: !status","An AJAX HTTP request terminated abnormally.":"Een AJAX HTTP-aanvraag is onverwacht afgebroken","Debugging information follows.":"Debug informatie volgt.","Path: !uri":"Pad: !uri","StatusText: !statusText":"Statustekst: !statusText","ResponseText: !responseText":"Antwoordtekst: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Restricted to certain pages":"Beperkt tot bepaalde pagina\u0027s","The block cannot be placed in this region.":"Het blok kan niet worden geplaatst in dit gebied.","Hide summary":"Samenvatting verbergen","Edit summary":"Samenvatting bewerken","Don\u0027t display post information":"Geen berichtinformatie weergeven","Collapse":"Inklappen","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Het bestand %filename kan niet ge\u00fcpload worden. Alleen bestanden met de volgende extensies zijn toegestaan: %extensions","Show row weights":"Gewicht van rijen tonen","Hide row weights":"Gewicht van rij verbergen","Close":"Sluiten","Feb":"feb","Caption":"Onderschrift","Extend":"Uitbreiding","Changed":"Gewijzigd","Loading...":"Bezig met laden...","Unlink":"Link verwijderen","Not promoted":"Niet aangeraden","button":"knop","Edit Link":"Link bewerken","Remove group":"Groep verwijderen","@label":"@label","Show description":"Beschrijving tonen","New group":"Nieuwe groep","No revision":"Geen revisie","Apply (all displays)":"Toepassen (alle weergaven)","Apply (this display)":"Toepassen (deze weergave)","Revert to default":"Terugzetten naar standaard","Hide description":"Beschrijving verbergen","Needs to be updated":"Moet worden bijgewerkt","Does not need to be updated":"Hoeft niet te worden bijgewerkt","Show all columns":"Alle kolommen tonen","Show table cells that were hidden to make the table fit within a small screen.":"Toon de tabelcellen die verborgen werden om de tabel te laten passen op een klein scherm.","List additional actions":"Aanvullende acties weergeven","Flag other translations as outdated":"Markeer andere vertalingen als verouderd","Do not flag other translations as outdated":"Markeer andere vertalingen niet als verouderd","opened":"geopend","Horizontal orientation":"Horizontale ori\u00ebntatie","Vertical orientation":"Verticale ori\u00ebntatie","You have unsaved changes.":"Er zijn niet-opgeslagen wijzigingen.","No styles configured":"Geen stijlen ingesteld","@count styles configured":"@count stijlen ingesteld","Press the esc key to exit.":"Druk op de ESC-toets om af te sluiten.","End tour":"Rondleiding be\u00ebindigen","Uploads disabled":"Uploads uitgeschakeld","Uploads enabled, max size: @size @dimensions":"Uploads ingeschakeld, maximale grootte: @size @dimensions","Enter caption here":"Bijschrift hier invoeren","Hide group names":"Groepsnamen verbergen","Show group names":"Groepsnamen weergeven","Press the down arrow key to create a new row.":"Gebruik de \u0027pijl naar beneden\u0027-toets voor het aanmaken van een nieuwe rij.","@name @type.":"@name @type.","Press the down arrow key to activate.":"Druk op de toets \u0027pijl omlaag\u0027 om te activeren.","Press the down arrow key to create a new button group in a new row.":"Druk op de toets \u0027pijl omlaag\u0027 om een nieuwe knopgroep aan te maken in een nieuwe rij.","This is the last group. Move the button forward to create a new group.":"Dit is de laatste groep. Verplaats de knop vooruit om een nieuwe groep aan te maken.","The \u0022@name\u0022 button is currently enabled.":"De knop \u0027@name\u0027 is momenteel ingeschakeld.","Use the keyboard arrow keys to change the position of this button.":"Gebruik de pijltoetsen om de positie van deze knop te veranderen.","Press the up arrow key on the top row to disable the button.":"Gebruik de toets \u0027omhoog\u0027 in de bovenste regel om de knop uit te schakelen.","The \u0022@name\u0022 button is currently disabled.":"De knop \u0027@name\u0027 is momenteel uitgeschakeld.","Use the down arrow key to move this button into the active toolbar.":"Gebruik de toets \u0027omlaag\u0027 om de knop naar de actieve werkbalk te verplaatsen.","This @name is currently enabled.":"Deze @name is momenteel ingeschakeld.","Use the keyboard arrow keys to change the position of this separator.":"Gebruik de pijltoetsen van het toetsenbord om de knopscheider te verplaatsen.","Separators are used to visually split individual buttons.":"Knopscheiders worden gebruikt om knoppen visueel te scheiden.","This @name is currently disabled.":"Deze @name is momenteel uitgeschakeld.","Use the down arrow key to move this separator into the active toolbar.":"Gebruik de toets \u0027omlaag\u0027 om de knopscheider naar de actieve werkbalk te verplaatsen.","You may add multiple separators to each button group.":"Er kunnen meerdere knopscheiders in \u00e9\u00e9n knoppengroep worden gebruikt.","Please provide a name for the button group.":"Voer een naam voor de knoppengroep in.","Button group name":"Knopgroepnaam","Editing the name of the new button group in a dialog.":"De naam van een nieuwe knoppengroep in een dialoogvenster bewerken.","Editing the name of the \u0022@groupName\u0022 button group in a dialog.":"De naam van de knoppengroep \u0027@groupName\u0027 in een dialoogvenster bewerken.","Place a button to create a new button group.":"Plaats een knop om een nieuwe knopgroep aan te maken.","Add a CKEditor button group to the end of this row.":"Een CKEditor-knoppengroep aan het einde van deze regel toevoegen.","Rich Text Editor, !label field":"Opgemaakte tekst-editor, veld !label","Hide lower priority columns":"Kolommen met een lagere prioriteit verbergen","Edit media":"Media bewerken","Tray orientation changed to @orientation.":"Ori\u00ebntatie van de lade aangepast naar @orientation.","@action @title configuration options":"@action @title configuratie-instellingen","Tabbing is no longer constrained by the Contextual module.":"Gebruik van tab-toets is niet langer beperkt tot de contextuele links.","Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.":"Gebruik van de tab-toets is beperkt tot een set van @contextualsCount en het wisselen van de bewerkenmodus.","@count contextual link\u0003@count contextual links":"@count contextuele link\u0003@count contextuele links","Based on the text editor configuration, these tags have automatically been added: \u003Cstrong\u003E@tag-list\u003C\/strong\u003E.":"Op basis van de configuratie van de teksteditor zijn de volgende elementen automatisch toegevoegd: \u003Cstrong\u003E@tag-list\u003C\/strong\u003E.","!tour_item of !total":"!tour_item van !total","The toolbar cannot be set to a horizontal orientation when it is locked.":"Als de werkbalk geblokkeerd is kan deze niet op horizontale ori\u00ebntatie gezet worden.","@groupName button group in position @position of @positionCount in row @row of @rowCount.":"Knopgroep @groupName in positie @position van @positionCount in rij @row van @rowCount.","@name @type in position @position of @positionCount in @groupName button group in row @row of @rowCount.":"@type @name in positie @position van @positionCount in @groupName knopgroep in rij @row van @rowCount.","Changing the text format to %text_format will permanently remove content that is not allowed in that text format.\u003Cbr\u003E\u003Cbr\u003ESave your changes before switching the text format to avoid losing data.":"Wijzigen van de tekstopmaak naar %text_format zal inhoud die niet toegestaan is in die opmaak permanent verwijderen.\u003Cbr\u003E\u003Cbr\u003ESla uw wijzigingen op voordat u de tekstopmaak omschakelt, om gegevensverlies te voorkomen.","Change text format?":"Tekstopmaak aanpassen?","Leave preview?":"Voorbeeldweergave verlaten?","Leave preview":"Voorbeeldweergave verlaten","Leaving the preview will cause unsaved changes to be lost. Are you sure you want to leave the preview?":"Het verlaten van de voorbeeldweergave betekend dat nog niet opgeslagen wijzigingen verloren gaan. Weet u zeker dat u de voorbeeldweergave wilt verlaten?","Tray \u0022@tray\u0022 @action.":"Lade \u0027@tray\u0027 @action.","Tray @action.":"Lade @action.","!modules modules are available in the modified list.":"!modules modules zijn beschikbaar in de aangepaste lijst.","The response failed verification so will not be processed.":"Het antwoord kon niet geverifieerd worden en zal daarom niet worden verwerkt.","The callback URL is not local and not trusted: !url":"De callback-URL is niet lokaal en vertrouwd: !url","CustomMessage: !customMessage":"CustomMessage: !customMessage","Authored on @date":"Aangemaakt op @date","All available blocks are listed.":"Alle beschikbare blokken worden getoond.","Block previews are visible. Block labels are hidden.":"Voorbeeldweergaven van blokken zijn zichtbaar. Labels zijn verborgen.","Block previews are hidden. Block labels are visible.":"Voorbeeldweergaven van blokken zijn verborgen. Labels zijn zichtbaar.","CTRL+Left click will prevent this dialog from showing and proceed to the clicked link.":"CTRL+klik om deze dialoog over te slaan en direct naar de link te gaan.","1 block is available in the modified list.\u0003@count blocks are available in the modified list.":"1 blok beschikbaar in de lijst met wijzigingen.\u0003@count blokken beschikbaar in de lijst met wijzigingen.","Show media item weights":"Toon gewicht van media-items","Hide media item weights":"Gewicht van media-items verbergen","An error occurred while trying to preview the media. Please save your work and reload this page.":"Er ging iets fout bij het voorvertonen van de media. Sla uw werk op en herlaad deze pagina alstublieft.","Embedded media":"Ingesloten media","Insert from Media Library":"Invoegen uit de Mediabibliotheek","Please fill in a (valid) CJIB number. CJIB number is without spaces and is @length digits long.":"U hebt geen (juist) CJIB-nummer ingevuld. Vul het CJIB-nummer in zonder spaties. Het CJIB-nummer heeft @length cijfers.","The bsn number is not valid.":"U hebt geen (juist) BSN ingevuld. Vul 9 cijfers in. Bestaat uw BSN uit 8 cijfers? Begin dan met een extra 0.","Please provide a (valid) BSN. BSN is 9 digits long. Is your BSN 8 digits long? Append with a 0.":"U hebt geen (juist) BSN ingevuld. Vul 9 cijfers in. Bestaat uw BSN uit 8 cijfers? Begin dan met een extra 0."},"Long month name":{"January":"januari","February":"februari","March":"maart","April":"april","May":"mei","June":"juni","July":"juli","August":"augustus","September":"september","October":"oktober","November":"november","December":"december"}},"pluralFormula":{"1":0,"default":1}};
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/sites/default/files/languages/nl_m70XuQang59AUbN5tXzm6j5spSw-nqI3kRjuQGFq_NA.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/drupal.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

window.Drupal = {
  behaviors: {},
  locale: {}
};

(function (Drupal, drupalSettings, drupalTranslations, console, Proxy, Reflect) {
  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    var behaviors = Drupal.behaviors;
    Object.keys(behaviors || {}).forEach(function (i) {
      if (typeof behaviors[i].attach === 'function') {
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || drupalSettings;
    trigger = trigger || 'unload';
    var behaviors = Drupal.behaviors;
    Object.keys(behaviors || {}).forEach(function (i) {
      if (typeof behaviors[i].detach === 'function') {
        try {
          behaviors[i].detach(context, settings, trigger);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.checkPlain = function (str) {
    str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return str;
  };

  Drupal.formatString = function (str, args) {
    var processedArgs = {};
    Object.keys(args || {}).forEach(function (key) {
      switch (key.charAt(0)) {
        case '@':
          processedArgs[key] = Drupal.checkPlain(args[key]);
          break;

        case '!':
          processedArgs[key] = args[key];
          break;

        default:
          processedArgs[key] = Drupal.theme('placeholder', args[key]);
          break;
      }
    });
    return Drupal.stringReplace(str, processedArgs, null);
  };

  Drupal.stringReplace = function (str, args, keys) {
    if (str.length === 0) {
      return str;
    }

    if (!Array.isArray(keys)) {
      keys = Object.keys(args || {});
      keys.sort(function (a, b) {
        return a.length - b.length;
      });
    }

    if (keys.length === 0) {
      return str;
    }

    var key = keys.pop();
    var fragments = str.split(key);

    if (keys.length) {
      for (var i = 0; i < fragments.length; i++) {
        fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
      }
    }

    return fragments.join(args[key]);
  };

  Drupal.t = function (str, args, options) {
    options = options || {};
    options.context = options.context || '';

    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str]) {
      str = drupalTranslations.strings[options.context][str];
    }

    if (args) {
      str = Drupal.formatString(str, args);
    }

    return str;
  };

  Drupal.url = function (path) {
    return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
  };

  Drupal.url.toAbsolute = function (url) {
    var urlParsingNode = document.createElement('a');

    try {
      url = decodeURIComponent(url);
    } catch (e) {}

    urlParsingNode.setAttribute('href', url);
    return urlParsingNode.cloneNode(false).href;
  };

  Drupal.url.isLocal = function (url) {
    var absoluteUrl = Drupal.url.toAbsolute(url);
    var protocol = window.location.protocol;

    if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
      protocol = 'https:';
    }

    var baseUrl = "".concat(protocol, "//").concat(window.location.host).concat(drupalSettings.path.baseUrl.slice(0, -1));

    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    } catch (e) {}

    try {
      baseUrl = decodeURIComponent(baseUrl);
    } catch (e) {}

    return absoluteUrl === baseUrl || absoluteUrl.indexOf("".concat(baseUrl, "/")) === 0;
  };

  Drupal.formatPlural = function (count, singular, plural, args, options) {
    args = args || {};
    args['@count'] = count;
    var pluralDelimiter = drupalSettings.pluralDelimiter;
    var translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
    var index = 0;

    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula) {
      index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula.default;
    } else if (args['@count'] !== 1) {
      index = 1;
    }

    return translations[index];
  };

  Drupal.encodePath = function (item) {
    return window.encodeURIComponent(item).replace(/%2F/g, '/');
  };

  Drupal.deprecationError = function (_ref) {
    var message = _ref.message;

    if (drupalSettings.suppressDeprecationErrors === false && typeof console !== 'undefined' && console.warn) {
      console.warn("[Deprecation] ".concat(message));
    }
  };

  Drupal.deprecatedProperty = function (_ref2) {
    var target = _ref2.target,
        deprecatedProperty = _ref2.deprecatedProperty,
        message = _ref2.message;

    if (!Proxy || !Reflect) {
      return target;
    }

    return new Proxy(target, {
      get: function get(target, key) {
        if (key === deprecatedProperty) {
          Drupal.deprecationError({
            message: message
          });
        }

        for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          rest[_key - 2] = arguments[_key];
        }

        return Reflect.get.apply(Reflect, [target, key].concat(rest));
      }
    });
  };

  Drupal.theme = function (func) {
    if (func in Drupal.theme) {
      var _Drupal$theme;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_Drupal$theme = Drupal.theme)[func].apply(_Drupal$theme, args);
    }
  };

  Drupal.theme.placeholder = function (str) {
    return "<em class=\"placeholder\">".concat(Drupal.checkPlain(str), "</em>");
  };
})(Drupal, window.drupalSettings, window.drupalTranslations, window.console, window.Proxy, window.Reflect);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/drupal.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/drupal.init.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

if (window.jQuery) {
  jQuery.noConflict();
}

document.documentElement.className += ' js';

(function (Drupal, drupalSettings) {
  var domReady = function domReady(callback) {
    var listener = function listener() {
      callback();
      document.removeEventListener('DOMContentLoaded', listener);
    };

    if (document.readyState !== 'loading') {
      setTimeout(callback, 0);
    } else {
      document.addEventListener('DOMContentLoaded', listener);
    }
  };

  domReady(function () {
    Drupal.attachBehaviors(document, drupalSettings);
  });
})(Drupal, window.drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/drupal.init.js. */;
