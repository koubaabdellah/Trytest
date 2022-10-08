/*
 * Rijksoverheid Cookie OPT-IN v2.0
 * http://www.rijksoverheid.nl/cookies/
 * 
 * Copyright 2012 Rijksoverheid.nl, 
 * Public Information and Communication Office, 
 * Ministry of General Affairs
 * 
 * This script is distributed under the 
 * Creative Commons attribution-share alike license:
 * http://creativecommons.org/licenses/by-sa/3.0/
 * 
 * Changed compared to v1.1:
 * - no opt-in procedure
 * - just a message that cookies are being used
 * - assumes no third-party cookies are referenced (then use the cookie opt-in v1.1!)
 *
 */

var RO = RO || {};

(function(d,w)
{
	// Add hash method to string object
	String.prototype.hashCode = function()
	{
		var ha = 0, i, ch, l = this.length;
		if (l == 0) return ha;
		for (i = 0; i < l; i++) {
			ch = this.charCodeAt(i);
			ha = ((ha<<5)-ha)+ch;
			ha = ha & ha; // Convert to 32bit integer
		}
		return ha;
	};

	
	// Set up console logging if necessary
	if (typeof w.console === 'undefined' || typeof w.console.log === 'undefined') {
		w.console = {
			log: function() {}
		};
	}
	
	RO.cookies = {
		supported: false,
		domain: '',

		init: function() {
			var ck = this,
				//ckdatadmn = d.getElementsByTagName('body')[0].getAttribute('data-cookiedomain'),
				host = w.location.hostname.split('.'),
				hl = host.length,
				i, l,
				pos, cookieName, cookieValue, allCookies;

			// Erase old cookies if present.
			for (i in this) {
				if (typeof this[i] === 'function') {
					continue;
				}
				this[i] = undefined;
			}

			ck.domain = (host[hl - 1] === 'nl' || host[hl - 1] === 'eu') ? '.' + host[hl - 2] + '.' + host[hl - 1] : '.' + host[hl - 1];

			if (ck.test()) {
				allCookies = document.cookie.split('; ');
				for (i = 0, l = allCookies.length; i < l; i++) {
					pos = allCookies[i].indexOf('=');
					if (pos !== -1) {
						cookieName = allCookies[i].substr(0, pos);
						cookieValue = allCookies[i].substr(pos + 1, allCookies[i].length);
						ck[cookieName] = cookieValue;
					}
				}
			}
		},

		test: function() {
			var ck = this; 
			// Try a test cookie to check support
			ck.create('deeg', 'waar', 1); 
			if (ck.read('deeg') !== null) {
				ck.supported = true;
				ck.erase('deeg');
			}

			return ck;
		},

		create: function(name, value, days) {
			var ck = this,
				date,
				domain,
				expires = '';

			// Calculate expire date
			if (days) {
				date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = '; expires=' + date.toGMTString()
			}
			
			// Build syntax to add domain to cookie.
			domain = (ck.domain !== '') ? '; domain=' + ck.domain : ''; 

			document.cookie = name + '=' + value + expires + '; path=/' + domain;
			this[name] = value;
			
		},

		read: function(name) {
			var nameEQ = name + '=',
				ca = document.cookie.split(';'),
				c;
			for (var i = 0, j = ca.length; i < j; i++) {
				c = ca[i];
				while (c.charAt(0) === ' ') {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) === 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return null;
		},

		erase: function(name) {
			this.create(name, '', -1);
			this[name] = undefined;
		},

		eraseAll: function() {
			for (var i in this) {
				if (typeof this[i] === 'function') {
					continue;
				} // Let's not erase the object's methods 
				this.erase(i);
			}
		}
	};


	/**
	 * START OF COOKIEBAR OBJECT
	 * Show cookiebar and register any click for implicit consent (as required by law).
	 * @type {Object}
	 */
	RO.cookiebar = {
		cookiename: 'toestemmingvoorcookies',

		cookievalues: {
			'accept': 'ja',
			'deny': 'nee',
			'implicit': 'ja' // New one, to discern from first cookiebar's explicit consent.
		},

		lifespan: 5 * 365,

		callback: function(result) {
			var cb = this;
			RO.cookies.create(cb.cookiename, cb.cookievalues[result], cb.lifespan);
		},

		langcode: '',

		languages: {
			'NL': {
				'text': 'Deze site gebruikt cookies om het gebruik van de website te analyseren en het gebruiksgemak te verbeteren. Lees meer over ',
				'url': 'cookies/',
				'urltext': 'cookies'
			}
		},
		
		init: function(options) {
			var cb = this,
				h = d.getElementsByTagName('html')[0],
				b = d.getElementsByTagName('body')[0],
				msg, msgLine, msgText, msgLink, msgLinkText, msgFullStop;

			// Fetch language setting from HTML element.
			cb.langcode = h.getAttribute('xml:lang').toUpperCase() || 'NL'; 

			// Get options if passed in; override for langauge setting if required.
			for (var i in options) {
				cb[i] = options[i] || cb[i];
			}

			// If Cookies object is not initialized, skip.
			// If cookies are not supported, skip.
			// If browser 'do not track' is enabled, skip.
			// Note: Firefox sends a 'yes' value even if preferences is set to 'do track me'.
			// If blocking class on body is present, skip.
			// If consent cookie already exists, skip.
			// If message is not available in the chosen language, skip.
				console.log('typeof RO.cookies: '+typeof RO.cookies);
				console.log('RO.cookies.supported: ' + RO.cookies.supported);
				console.log('typeof window.navigator.doNotTrack: '+typeof window.navigator.doNotTrack);
				console.log('b.className.indexOf(\'nocookiebar\'): '+b.className.indexOf('nocookiebar'));
				console.log('RO.cookies.read(cb.cookiename): ' + RO.cookies.read(cb.cookiename));
				console.log('typeof cb.languages[cb.langcode]: '+ typeof cb.languages[cb.langcode]);
			if ((typeof RO.cookies !== 'object') ||
				(!RO.cookies.supported) ||
				(typeof window.navigator.doNotTrack !== 'undefined' && window.navigator.doNotTrack === 'yes') ||
				(typeof window.navigator.msDoNotTrack !== 'undefined' && window.navigator.msDoNotTrack === 'yes') ||
				(b.className.indexOf('nocookiebar') > -1) ||
				(RO.cookies.read(cb.cookiename) !== null) ||
				(typeof cb.languages[cb.langcode] === 'undefined')) {
				return;
			}
		
			// From here, we have a go, so build a cookie jar.

			msgText = d.createTextNode(cb.languages[cb.langcode].text);

			msgFullStop = d.createTextNode('.');

			msgLinkText = d.createTextNode(cb.languages[cb.langcode].urltext);

			msgLink = d.createElement('a');
			msgLink.setAttribute('href', cb.languages[cb.langcode].url);
			msgLink.onclick = function(evt) {
				var event = evt || w.event;
				event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
			};
			msgLink.appendChild(msgLinkText);

			msgLine = d.createElement('p');
			msgLine.appendChild(msgText);
			msgLine.appendChild(msgLink);
			msgLine.appendChild(msgFullStop);

			msg = d.createElement('div');
			msg.className = 'site message cookie';
			msg.appendChild(msgLine);

			b.insertBefore(msg, d.getElementById('centerbox'));

			// Set a half second delay on links on page where cookiebar is shown to allow processing of cookie, piwik, survey
			var links = d.getElementById('centerbox').getElementsByTagName('a');
			for (var li = 0, lj = links.length; li < lj; li++) {
				if (links[li].href.indexOf('#') !== 0) { // Skip links that are anchors within page.
					links[li].onclick = function(evt) {
						var hl = this.href, 
						    event = evt || w.event;
						
						setTimeout(function() {
							w.location.href = hl;
						}, 500);
						
						// Set cookie
						cb.callback('implicit');
			
						event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
					};
				}
			}
		}
	};


})(document,window);;
/*
 * Rijksoverheid Cookie OPT-OUT v2.0
 * http://www.rijksoverheid.nl/cookies/
 * 
 * Copyright 2012 Rijksoverheid.nl, 
 * Public Information and Communication Office, 
 * Ministry of General Affairs
 * 
 * This script is distributed under the 
 * Creative Commons attribution-share alike license:
 * http://creativecommons.org/licenses/by-sa/3.0/
 * 
 * Changed compared to v1.1:
 * - no opt-in procedure
 * - just a message that cookies are being used
 * - assumes no third-party cookies are referenced
 */ 


/* Sample
 *
 */
  // First, set up cookies interface.
  RO.cookies.init();

  // Start cookiebar with a set of options.
  RO.cookiebar.init(
  {
	'NL': {
		'text': 'Deze website gebruikt cookies om het gebruik van de website te analyseren en het gebruiksgemak te verbeteren. Lees meer over ',
		'url': 'cookies/',
		'urltext': 'cookies'
    },

    'EN-GB':  // English version for xml:lang 'en-gb'
    {
		'text': 'This website uses cookies to analyse the way our visitors use the site and to make it more user friendly. Learn more about ',
		'url': 'cookies/',
		'urltext': 'cookies'
    },

    cookiename: 'toestemmingvoorcookies',

    callback: function(result)
    {
      // If visitor agreed, we need to document this by setting a cookie and logging an URL with a unique code for legal reasons.
      // If the visitor disagreed, we just set a 'deny' cookie and request the image (cookieless!) without a unique code.
      var   agent = navigator.userAgent.hashCode(),
            now = new Date(),
            timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()),
            uniqueid = timestamp + agent.toString(),
            lifespan = RO.cookiebar.lifespan || 5*365,
            consent = RO.cookiebar.cookievalues[result],
            cookielog = new Image();

      if (result == "accept")
      {
        consent = consent + "." + uniqueid;
        
        // Add statistics code here, e.g. google analytics startup, comscore, or others.
        // This code is only triggered once, on the page where the visitor agrees to accept cookies.
      }

      // Remember choice in cookie.
      RO.cookies.create(RO.cookiebar.cookiename,consent,RO.cookiebar.lifespan);

      // Fetch an image to log visitor choice on server, with a unique code if visitor agreed.
      cookielog.src = Drupal.settings.basePath + "sites/all/themes/dictu/images/cookie.png?" + RO.cookiebar.cookiename + "=" + consent;
      //alert (cookielog.src);

    }
  });
  
  
  // If a visitor returns after making a choice, you can test for the cookie as follows.
  var ck = RO.cookies[RO.cookiebar.cookiename] || '';
  if (ck.indexOf(RO.cookiebar.cookievalues['accept']) > -1)
  {
    // Put your cookie sensitive code, like statistics, here.
    //alert("Bezoeker heeft cookies geaccepteerd. Yay!");
  }

;
