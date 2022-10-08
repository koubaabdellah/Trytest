Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Er is een AJAX HTTP fout opgetreden.","HTTP Result Code: !status":"HTTP-resultaatcode: !status","An AJAX HTTP request terminated abnormally.":"Een AJAX HTTP-aanvraag is onverwacht afgebroken","Debugging information follows.":"Debug informatie volgt.","Path: !uri":"Pad: !uri","StatusText: !statusText":"Statustekst: !statusText","ResponseText: !responseText":"Antwoordtekst: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Hide":"Verbergen","Show":"Weergeven","Show shortcuts":"Snelkoppelingen weergeven","Hide shortcuts":"Snelkoppelingen verbergen","Menu":"Menu","Autocomplete popup":"Popup voor automatisch aanvullen","Searching for matches...":"Zoeken naar overeenkomsten...","This permission is inherited from the authenticated user role.":"Dit toegangsrecht is ge\u00ebrfd van de rol \u0027geverifieerde gebruiker\u0027.","Please wait...":"Even geduld...","Select all rows in this table":"Selecteer alle regels van deze tabel","Deselect all rows in this table":"De-selecteer alle regels van deze tabel","Configure":"Instellen","Not restricted":"Geen beperking","Restricted to certain pages":"Beperkt tot bepaalde pagina\u0027s","Not customizable":"Niet aanpasbaar","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"Wijzigingen aan de blokken worden pas opgeslagen wanneer u de knop \u003Cem\u003EBlokken opslaan\u003C\/em\u003E aanklikt.","The block cannot be placed in this region.":"Het blok kan niet worden geplaatst in dit gebied.","Re-order rows by numerical weight instead of dragging.":"Herschik de rijen op basis van gewicht, in plaats van slepen.","Show row weights":"Gewicht van rijen tonen","Hide row weights":"Gewicht van rij verbergen","Drag to re-order":"Slepen om de volgorde te wijzigen","Changes made in this table will not be saved until the form is submitted.":"Wijzigingen in deze tabel worden pas opgeslagen wanneer het formulier wordt ingediend.","Hide summary":"Samenvatting verbergen","Edit summary":"Samenvatting bewerken","Not in menu":"Niet in een menu","New revision":"Nieuwe revisie","No revision":"Geen revisie","By @name on @date":"Door @name op @date","By @name":"Door @name","Not published":"Niet gepubliceerd","Alias: @alias":"Alias: @alias","No alias":"Geen alias","@number comments per page":"@number reacties per pagina","(active tab)":"(actieve tabblad)","Edit":"Bewerken","Requires a title":"Een titel is verplicht","Don\u0027t display post information":"Geen berichtinformatie weergeven","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Het bestand %filename kan niet ge\u00fcpload worden. Alleen bestanden met de volgende extensies zijn toegestaan: %extensions","Add":"Toevoegen","Done":"Gereed","Prev":"Vorige","Next":"Volgende","Today":"Vandaag","January":"januari","February":"februari","March":"maart","April":"april","May":"mei","June":"juni","July":"juli","August":"augustus","September":"september","October":"oktober","November":"november","December":"december","Jan":"jan","Feb":"feb","Mar":"mrt","Apr":"apr","Jun":"jun","Jul":"jul","Aug":"aug","Sep":"sep","Oct":"okt","Nov":"nov","Dec":"dec","Sunday":"zondag","Monday":"maandag","Tuesday":"dinsdag","Wednesday":"woensdag","Thursday":"donderdag","Friday":"vrijdag","Saturday":"zaterdag","Sun":"zo","Mon":"ma","Tue":"di","Wed":"wo","Thu":"do","Fri":"vr","Sat":"za","Su":"zo","Mo":"ma","Tu":"di","We":"wo","Th":"do","Fr":"vr","Sa":"za","mm\/dd\/yy":"mm\/dd\/jj","Enabled":"Ingeschakeld","This field is required.":"Dit veld is verplicht.","Disabled":"Uitgeschakeld","Upload":"Uploaden","All":"Alle","Only files with the following extensions are allowed: %files-allowed.":"Uitsluitend bestanden met de volgende extensies zijn toegelaten: %files-allowed.","Customize dashboard":"Dashboard aanpassen"}} };;
// $Id$
(function ($) {
  Drupal.behaviors.external = {
    attach: function (context, settings) {
      // Open external links in new tabs.
      $("a[href^=http\\:\\/\\/]:not(.external-processed)", context).each(function() {
        if(this.href.toLowerCase().indexOf(location.hostname) == -1 || this.href.toLowerCase().indexOf(location.hostname) > 13) {

          $(this).click(externalNewWindow);
        }
      }).addClass('external-processed');
      // If the setting is enabled, open PDFs in new tabs.
      if (Drupal.settings.externalpdf) {
        $("a[href*=\\.pdf]:not(.external-processed)", context).each(function() {
            $(this).click(externalNewWindow);
        }).addClass('external-processed');
      };
      // Open any links with class="newtab" in new tabs
      $("a.newtab:not(.external-processed)", context).click(externalNewWindow).addClass('external-processed');

      // Utility function that does the work.
      function externalNewWindow() {
        window.open(this.href);
        return false;
      }
    }
  };
}(jQuery));
;
(function ($) {

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      if (Drupal.settings.matomo.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
        // Mailto link clicked.
        _paq.push(["trackEvent", "Mails", "Click", this.href.substring(7)]);
      }

    });
  });

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.matomo.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        _paq.push(["setCustomUrl", href]);
        _paq.push(["trackPageView"]);
      }
    });
  }

});

})(jQuery);
;
