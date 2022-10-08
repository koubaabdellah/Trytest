var bDebugIah;
var caller = {};
var setLinkToetsingsinkomen;

var uri = new Object();
uri = getURL(uri);

$(document).ready(function () {

  $('#bldCss').prop('disabled', true);

  var oBld = {};
  initoBld();
  bDebugIah = (oBld.getURLParameter(location.href, 'bld-debug') === 'true') ? true : false;
//Het versienummer en de debug-velden tonen in ontwikkel-omgeving
  if (bDebugIah === true || uri.dom == 'file:' || (uri.dom == 'https:' && uri.path.substr(0, 7) == '/www-o.') || uri.dom.substr(0, 9) == 'localhost' || uri.dom.substr(0, 14) == 'www-o-local.nl' || uri.dom.split('.')[uri.dom.split('.').length - 1] === 'local') {
    bDebugIah = true;
  }

  setLinkToetsingsinkomen = function () {
    $('.link-toetsingsinkomen').click(function () {
      $('#bld-modal').on('shown.bs.modal', function () {
        $('.bld-iah-main>div').removeClass('col-xs-12');
      });
      window.open('/wps/wcm/connect/nl/toeslagen/content/wat-is-mijn-toetsingsinkomen', '_blank');
      
      return;
    });
  };
  setLinkToetsingsinkomen();
  $('button', '#formIAH').click(function () {
  });

  function initoBld() {
    oBld.Count = false;
    if (((uri.dom === 'belastingdienst.nl' || uri.dom === 'www.belastingdienst.nl' || uri.dom === 'beta.belastingdienst.nl') && oBld.toonteller !== true) || uri.args.indexOf('bld-debug') > -1) {
      oBld.Count = true;
    }
    oBld.downloadExtensies = '.pdf.mp4.mp3.srt.xls.doc.xlsx.exe.dmg.tar.gz.package.deb.rpm.xps';
    oBld.language = $('html').attr('lang').toLowerCase();
    oBld.viewports = [['xs', 320], ['sm', 801], ['md', 1024], ['lg', 1220]];
    oBld.toonteller = false;
    oBld.getURLParameter = function getURLParameter(url, name) {
      return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
    };
    for (var i = 0; i < uri.args.length && oBld.toonteller === false; i++) {
      if (uri.args[i].indexOf('#') > -1) {
        uri.args[i] = uri.args[i].substr(0, uri.args[i].indexOf('#'));
      }
      if (uri.args[i] === 'tt') {
        oBld.toonteller = true;
      }
      if (uri.args[i] === '_metrix') {
        oBld.metrix = true;
        $('body').addClass('bld-metrix');
      }
    }
    oBld.isUrlExists = function isUrlExists(url, cb) {
      $.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        complete: function (xhr) {
          if (typeof cb === 'function')
            cb.apply(this, [xhr.status]);
        }
      });
    };
    return oBld;
  }

});

/**
 * Config variables that are used on every page on the website
 * Usage:
 *  config.variableName
 */

var config = {
  /* START GENERIC */
  defaultLanguage: 'nl',
  supportedLanguages: ['nl', 'en', 'de'],
  supportedBrowsers: ['Internet Explorer 10 en hoger', 'Firefox 35 en hoger', 'Safari 7 en hoger', 'Chrome 39 en hoger'],
  html5Supported: true,
  viewports: ['xs', 'sm', 'md', 'lg'],
  countableUrls: ['belastingdienst.nl', 'www.belastingdienst.nl', 'beta.belastingdienst.nl'],
  liveUrls: ['belastingdienst.nl', 'www.belastingdienst.nl', 'beta.belastingdienst.nl'], // check if url is live, need to be used for counter/iah etc
  cookiesAccepted: false, // can be used later for cookie bar. If accepted set to true
  /* END GENERIC */

  /* START GSA */
  gsa_url: '//zoeken.belastingdienst.nl/',
  gsa_siteStart: '610_bd_all_', // gsa_siteStart + current language makes the full GSA site parameter
  gsa_clientStart: '610_bdienst_', // gsa_clientStart + current language makes the full GSA client parameter
  gsa_proxystylesheet: 'belastingdienst', // xslt transforming XML into JSONP
  gsa_numMax: 100, // max number of search results from the GSA on 1 page to prevent killing it or slow down performance
  gsa_numDefault: 10, // default number of search results on sm, md and lg screens
  gsa_maxSuggest: 4, // max results are shown in the search input
  gsa_maxRelated: 8, // related search results are shown under search results
  gsa_paginationOffset: 2,  // for example pagination 5 6 (7 current) 8 9
  gsa_maxRelatedItemsPerColumn: 4, // devide the related items over 2 columns on sm, md and lg screens

  gsa_xs_minTopLink: 10, // minimum number of searh results before showing top link on xs screens
  gsa_xs_numDefault: 50,  // default number of search results on xs screens
  /* END GSA */

  /* START PIWIK */
  piwik_url: 'https://pwa001.belastingdienst.nl/piwik/',
  piwik_url_path: 'index.php?&module=Widgetize&action=iframe&period=day&moduleToWidgetize=Live&actionToWidgetize=getVisitorProfilePopup&date=',
  piwik_domains_live: ['*.belastingdienst.nl', '*.douane.nl', '*.fiod.nl', '*.toeslagen.nl'],
  piwik_cookie_domain_live: '*.belastingdienst.nl'
  /* END PIWIK */
};

/**
 * Helper to detect Bootstrap viewport sizes in javascript
 * Usage examples:
 *  viewport.is('xs')
 *  viewport.isEqualOrGreaterThan('md')
 */

var viewport = (function () {
  var viewPortSize = function () {
    return window.getComputedStyle(document.body, ':before').content.replace(/"/g, '');
  };

  var is = function (size) {
    if (config.viewports.indexOf(size) === -1)
      throw 'no valid viewport name given';
    return viewPortSize() === size;
  };

  var isEqualOrGreaterThan = function (size) {
    if (config.viewports.indexOf(size) === -1)
      throw 'no valid viewport name given';
    return config.viewports.indexOf(viewPortSize()) >= config.viewports.indexOf(size);
  };

  return {
    is: is,
    isEqualOrGreaterThan: isEqualOrGreaterThan,
    viewPortSize: viewPortSize
  };

})();
