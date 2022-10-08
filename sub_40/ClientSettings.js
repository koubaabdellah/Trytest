/// <summary>
/// Be sure that this ClientSettings class matches the EXACT layout and propertynames of class Cito.TestLauncher.Common.ClientSettings!!!
/// </summary>
/// <history>
/// [remcor] 23-1-2013 Created
/// </history>
function createClientSettings() {
	var clientSettings = {};

	try {
	    clientSettings.screenDimensionSettings = createScreenDimensionSettings();
    } catch (e) { }

    try {
        clientSettings.operatingSystemSettings = createOperatingSystemSettings();
    } catch (e) { }

    try {
        clientSettings.dotNetSettings = createDotNetSettings();
    } catch (e) { }

    try {
        clientSettings.flashSettings = createFlashSettings();
    } catch (e) { }

    try {
        clientSettings.plugInSettings = createPlugInSettings();
    } catch (e) { }

    try {
        clientSettings.browserSettings = createBrowserSettings();
    } catch (e) { }

	return clientSettings;
}

function createDotNetSettings() {
	var dotNetSettings = {};
	dotNetSettings.versions = getDotNetVersions();

	return dotNetSettings;
}

function createOperatingSystemSettings() {
	var operatingSystemSettings = {};

	operatingSystemSettings.name = getOperatingSystem();
	operatingSystemSettings.ntVersion = getWindowsNtVersion();

	return operatingSystemSettings;
}

function createScreenDimensionSettings() {
	var screenDimensionSettings = {};

	screenDimensionSettings.width = window.screen.width;
	screenDimensionSettings.height = window.screen.height;

	return screenDimensionSettings;
}

function createFlashSettings() {
	var flashSettings = {};

	flashSettings.version = getFlashVersion();

	return flashSettings;
}

function createPlugInSettings() {
	var plugInSettings = [];

	for (var i = 0; i < navigator.plugins.length; i++) {
		if ($.grep(plugInSettings, function (e) { return e.name == navigator.plugins[i].name }).length == 0) { //Filter out duplicates.
			var plugInSetting = {};

			plugInSetting.name = navigator.plugins[i].name;
			plugInSetting.version = navigator.plugins[i].version;

			plugInSettings.push(plugInSetting);
		}
	}

	return plugInSettings;
}

function createBrowserSettings() {
	var browserSettings = {};

	var browserVersion = getIEVersion();
	if (browserVersion != null) {
		browserSettings.name = "IE";
		browserSettings.version = browserVersion;
		return browserSettings;
	}

	browserVersion = getChromeVersion();
	if (browserVersion != null) {
		browserSettings.name = "Chrome";
		browserSettings.version = browserVersion;
		return browserSettings;
	}

	browserVersion = getFirefoxVersion();
	if (browserVersion != null) {
		browserSettings.name = "Firefox";
		browserSettings.version = browserVersion;
		return browserSettings;
	}

	browserVersion = getSafariVersion();
	if (browserVersion != null) {
		browserSettings.name = "Safari";
		browserSettings.version = browserVersion;
		return browserSettings;
	}

	return browserSettings;
}

function getOperatingSystem() {
	var os = "";
	var nAgt = navigator.userAgent;
	var clientStrings = [
		{ s: 'Windows 3.11', r: /Win16/ },
		{ s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
		{ s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
		{ s: 'Windows 98', r: /(Windows 98|Win98)/ },
		{ s: 'Windows CE', r: /Windows CE/ },
		{ s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
		{ s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
		{ s: 'Windows Server 2003', r: /Windows NT 5.2/ },
		{ s: 'Windows Vista', r: /Windows NT 6.0/ },
		{ s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
		{ s: 'Windows 10', r: /(Windows 10|Windows NT 10.0)/ },
		{ s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
		{ s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
		{ s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
		{ s: 'Windows ME', r: /Windows ME/ },
		{ s: 'Android', r: /Android/ },
        { s: 'Chrome OS', r: /CrOS/ },
		{ s: 'Open BSD', r: /OpenBSD/ },
		{ s: 'Sun OS', r: /SunOS/ },
		{ s: 'Linux', r: /(Linux|X11)/ },
		{ s: 'iOS', r: /(iPhone|iPad|iPod)/ },
		{ s: 'Mac OS X', r: /Mac OS X/ },
		{ s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
		{ s: 'QNX', r: /QNX/ },
		{ s: 'UNIX', r: /UNIX/ },
		{ s: 'BeOS', r: /BeOS/ },
		{ s: 'OS/2', r: /OS\/2/ },
		{ s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
	];
	for (var id in clientStrings) {
		var cs = clientStrings[id];
		if (cs.r.test(nAgt)) {
			os = cs.s;
			break;
		}
	}

	var osVersion = "";

	if (/Windows/.test(os)) {
		osVersion = /Windows (.*)/.exec(os)[1];
		os = 'Windows';
	}

	switch (os) {
		case 'Mac OS X':
			osVersion = /Mac OS X (\d+[\.\_\d]+)/.exec(nAgt)[1];
			break;

		case 'Android':
			osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
			break;

		case 'iOS':
		    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nAgt);
			osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
			break;
	    case 'Chrome OS':
	        osVersion = /CrOS [A-Za-z-0-9_]* ([\.\_\d]+)/.exec(nAgt);
	        osVersion = osVersion[1];
	        break;
	}

	return os + " " + osVersion;
}

function getSafariVersion() {
    if (/Version\/(\d+(\.\d)+).*Safari/.test(navigator.userAgent)) {
        return RegExp.$1;
    }
}

function getChromeVersion() {
	if (/Chrome[\/\s](\d+\.\d+\.\d+)/.test(navigator.userAgent)) {
		return RegExp.$1; // capture x.x portion and store as a number
	}

    if (/CriOS[\/\s](\d+\.\d+\.\d+)/.test(navigator.userAgent)) {
        return RegExp.$1; // capture x.x portion and store as a number
    }
}

//userAgent in FF2.0.0.13 WinXP returns: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13
//userAgent in FF35 Win7 returns: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:35.0) Gecko/20100101 Firefox/35.0
function getFirefoxVersion() {
	if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) { //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
		return RegExp.$1; // capture x.x portion and store as a number
	}
}

//userAgent in IE7 WinXP returns: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727)
//userAgent in IE11 Win7 returns: Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
function getIEVersion() {
	if (navigator.userAgent.indexOf('MSIE') != -1)
		var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
	else // if no "MSIE" string in userAgent
		var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists

	if (detectIEregexp.test(navigator.userAgent)) { //if some form of IE
		return RegExp.$1 // capture x.x portion and store as a number
	}
}

function getDotNetVersions()
{
	return navigator.userAgent.match(/(.NET CLR [0-9.]+)|(.NET[0-9.A-Z]+)/g);
}

function getWindowsNtVersion() {
	var detectWindowsRegExp = /Windows NT (\d+\.\d+);/

	if (detectWindowsRegExp.test(navigator.userAgent))
		return RegExp.$1;
}

function getFlashVersion() {
	// ie
	try {
		try {
			// avoid fp6 minor version lookup issues. see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
			var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
			try {
				axo.AllowScriptAccess = 'always';
			}
			catch (e) {
				return '6.0.0';
			}
		} catch (e) { }

		return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1].replace(/,/g, '.');
		// other browsers
	} catch (e) {
		try {
			if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
				return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1].replace(/,/g, '.');
			}
		} catch (e) { }
	} return '0.0.0';
}
