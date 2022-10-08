var popupWindow = null;

(function () {
    // Add index method on array if it doesn't exist (for IE8 and lower)
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var k;

            var O = Object(this);

            var len = O.length >>> 0;

            if (len === 0) {
                return -1;
            }

            var n = +fromIndex || 0;

            if (Math.abs(n) === Infinity) {
                n = 0;
            }

            if (n >= len) {
                return -1;
            }

            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }
})();

function OpenPopup(width, height, name, url)
{
	if (popupWindow) popupWindow.close();
	
	popupWindow = window.open(url, name, "width=" + width + ",height=" + height + ",scrollbars=yes,toolbar=no,location=no,resizable=yes,status=yes,copyhistory=no");
	popupWindow.focus();
}

function ToggleDisplay(elementId)
{
	var e = document.getElementById(elementId);
	
	if (e && e.style.display == "none") SetDisplay(e, "");
	else if (e) SetDisplay(e, "none");
}

function SetDisplay(e, display)
{
	if (e) e.style.display = display;
}

function DisplayAll(parentElement, tagName, attributeName, attributeValue)
{
	var elements = GetElementsByAttribute(parentElement, tagName, attributeName, attributeValue);
	for (var i = 0; i < elements.length; i++) SetDisplay(elements[i], "");
}

function HideAll(parentElement, tagName, attributeName, attributeValue)
{
	var elements = GetElementsByAttribute(parentElement, tagName, attributeName, attributeValue);
	for (var i = 0; i < elements.length; i++) SetDisplay(elements[i], "none");
}

function CheckAll(parentElement, attributeName, attributeValue, checked)
{
	var checkBoxes = GetElementsByAttribute(parentElement, "input", attributeName, attributeValue);
	
	for (var i = 0; i < checkBoxes.length; i++) checkBoxes[i].checked = checked;
}

function GetElementsByAttribute(parentElement, tagName, attributeName, attributeValue)
{
	var elements = (tagName == "*" && parentElement.all) ? parentElement.all : parentElement.getElementsByTagName(tagName);
	var returnElements = new Array();
	var currentElement;
	var attribute;
	attributeValue = (typeof attributeValue != "undefined") ? new RegExp("(^|\\s)" + attributeValue + "(\\s|$)", "i") : null;
			
	for (var i = 0; i < elements.length; i++)
	{
		currentElement = elements[i];
		attribute = currentElement.getAttribute && currentElement.getAttribute(attributeName);
				
		if (typeof attribute == "string" && attribute.length > 0)
		{
			if (typeof attributeValue == "undefined" || (attributeValue && attributeValue.test(attribute)))
			{
				returnElements.push(currentElement);
			}
		}
	}

	return returnElements;
}

function QueryString(varName)
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");

	for (var i = 0; i < vars.length; i++)
	{
		var pair = vars[i].split("=");

		if (pair[0].toLowerCase() == varName.toLowerCase())
		{
			return pair[1];
		}
	} 
}