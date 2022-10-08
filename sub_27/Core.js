function UserAgentInfo() {}
UserAgentInfo.strBrowser = 0;
function CrossBrowserLibrary() {}
CrossBrowserLibrary.GetScrollY = function()
{var intScrollY = 0;
if (window != null && window.pageYOffset != null)
{intScrollY = window.pageYOffset;}
else if (window != null && window.scrollY != null)
{intScrollY = window.scrollY;}
else if (document.body.scrollTop != null)
{intScrollY = document.body.scrollTop;}
return intScrollY;}
CrossBrowserLibrary.GetScrollX = function()
{var intScrollX = 0;
if (window != null && window.pageXOffset != null)
{intScrollX = window.pageXOffset;}
else if (window != null && window.scrollX != null)
{intScrollX = window.scrollX;}
else if (document.body.scrollTop != null)
{intScrollX = document.body.scrollLeft;}
return intScrollX;}
CrossBrowserLibrary.SetScrollY = function(intScrollY)
{if (window != null && window.scrollY != null)
{window.scrollY = intScrollY;}
else if (document.body.scrollTop != null)
{document.body.scrollTop = intScrollY;}}
CrossBrowserLibrary.SetScrollX = function(intScrollX)
{if (window != null && window.scrollX != null)
{window.scrollX = intScrollX;}
else if (document.body.scrollTop != null)
{document.body.scrollLeft = intScrollX;}}
CrossBrowserLibrary.SetStyleTop = function(objStyle, intTop)
{if (objStyle.top != null)
{objStyle.top = intTop;}
else
{objStyle.pixelTop = intTop;}}
function Util() {}
Util.IsNonEmptyString = function(strStringToValidate)
{return (strStringToValidate != null && strStringToValidate != "");}
Util.IsNullOrEmptyString = function(strStringToValidate)
{return !Util.IsNonEmptyString(strStringToValidate);}
Util.StripWhitespace =Util_StripWhitespac;
function Util_StripWhitespac(strStringToStrip)
{return strStringToStrip.replace(/^\s*/g, "").replace(/\s*$/g, "");}
Util.StopEventProprogation = function(objEvent)
{if (objEvent != null)
{if (UserAgentInfo.strBrowser == 1 || UserAgentInfo.strBrowser == 2)
{objEvent.cancelBubble  = true;}
else
{objEvent.stopPropagation();}}}
Util.SetAltProperty =Util_SetAltPropert;
function Util_SetAltPropert(objControl, strText)
{if (objControl.alt != strText)
{if (UserAgentInfo.strBrowser == 1)
{objControl.runtimeStyle.setAttribute("ignore", 1, 0);}
objControl.alt = strText;}}
Util.EscapeSingleQuoteForScript = function(strStringToEscape)
{return strStringToEscape.replace("'", "\\'");}
Util.RegExpEscape = RegExpEscape;
function RegExpEscape(unescaped)
{var dangerousChars = ".$^{[(|)*+?\\";
var result = "";
var charIndex = 0;
for (charIndex = 0; charIndex < unescaped.length; charIndex++)
{if (dangerousChars.indexOf(unescaped.charAt(charIndex)) != -1)
{result = result + "\\" ;}
result = result + unescaped.charAt(charIndex);}
return result;}
Util.SetInnerText = function(objControl, strUnescapedText)
{;
if (objControl != null)
{objControl.innerHTML="_";
objControl.childNodes[0].nodeValue = strUnescapedText;}}
Util.GetInnerText = function(objControl)
{;
if (objControl != null)
{if (objControl.childNodes.length != 0)
{return objControl.childNodes[0].nodeValue;}}
return "";}
Util.UnescapeString =Util_UnescapeStrin;
function Util_UnescapeStrin(strEscaped)
{return Util.UnescapeStringEx(strEscaped, false);}
Util.UnescapeStringEx =Util_UnescapeStringE;
function Util_UnescapeStringE(
strEscaped,
boolPreserveNewLines)
{var objTempElem = document.createElement("DIV");
var strEscapedToUnescape = strEscaped;
;
if (boolPreserveNewLines)
{;
strEscapedToUnescape = strEscaped.replace(/\n/g, "__IPFS_BR__");}
try
{objTempElem.innerHTML = strEscapedToUnescape;}
catch(e)
{;
return strEscaped;}
var strUnescaped = objTempElem.innerHTML;
return (boolPreserveNewLines) ? strUnescaped.replace(/__IPFS_BR__/g, "\n") : strUnescaped;}
Util.FindObjectInArray =Util_FindObjectInArra;
function Util_FindObjectInArra(objObject, arrArray)
{;
;
if (objObject == null || arrArray == null)
{return -1;}
for (var i = 0; i < arrArray.length; i++)
{if (arrArray[i] == objObject)
{return i;}}
return -1;}
Util.UnescapeCharacterEntities = function(
strValue)
{var k_objCharacterEntityMap = new Array(
{strCharacterEntityRE: "&amp;",
strCharacter: "&"},
{strCharacterEntityRE: "&quot;",
strCharacter: "\""},
{strCharacterEntityRE: "&lt;",
strCharacter: "<"},
{strCharacterEntityRE: "&gt;",
strCharacter: ">"}
);
for (var varIndex in k_objCharacterEntityMap)
{strValue = strValue.replace(
new RegExp(k_objCharacterEntityMap[varIndex].strCharacterEntityRE, "gi"),
k_objCharacterEntityMap[varIndex].strCharacter);}
return strValue;}
Util.ConvertNewlinesToHtml = function(strValue)
{var objRegExp = new RegExp("\n", "g");
var strConverted = strValue.replace(objRegExp, "<br/>");
return strConverted;}
Util.FormatString =Util_FormatStrin;
function Util_FormatStrin(
strFormat)
{var arrParams = Util.FormatString.arguments;
var objRegExp = new RegExp("\{[0-9]\}", "g");
var strFormatted = Util_ReplacePlaceholders(strFormat, objRegExp, arrParams);
return strFormatted;}
function Util_ReplacePlaceholders(
strFormat,
objRegExp,
arrParams)
{var intNumParams = arrParams.length;
;
if (strFormat == null)
{return null;}
var objMatches = strFormat.match(objRegExp);
if (objMatches != null)
{for (var i = 0; i < objMatches.length; i++)
{var intParamIndex = objMatches[i].charAt(1) - '0';
if (intParamIndex < 0 || intParamIndex >= intNumParams)
{;
continue;}
;
strFormat = strFormat.replace(objMatches[i], arrParams[intParamIndex + 1]);}}
return strFormat;}
Util.FormatStringEx =Util_FormatStringE;
function Util_FormatStringE(
strFormat)
{var arrParams = Util.FormatStringEx.arguments;
strFormat = strFormat.replace(new RegExp("%%", "g"), "%");
var arrUnmanagedStyleParams = new Array();
arrUnmanagedStyleParams[0] = "";
for (var i = 0; i < arrParams.length; i++)
{arrUnmanagedStyleParams[i+1] = arrParams[i];}
var objRegExp = new RegExp("%[0-9]![ds]!", "g");
strFormat = Util_ReplacePlaceholders(strFormat, objRegExp,
[null, null, "{0}", "{1}", "{2}", "{3}", "{4}", "{5}", "{6}", "{7}", "{8}", "{9}"]);
var objRegExp = new RegExp("\{[0-9]\}", "g");
var strFormatted = Util_ReplacePlaceholders(strFormat, objRegExp, arrParams);
return strFormatted;}
Util.FormatButtonAccelerator = function(
strButtonLabel,
strAcceleratorKey)
{var keyIndex = strButtonLabel.toLowerCase().indexOf(strAcceleratorKey.toLowerCase());
if (keyIndex == -1)
{return strButtonLabel;}
else
{return strButtonLabel;}}
Util.GetDataType = Util_GetDataType;
function Util_GetDataType(objObject)
{var strType = typeof(objObject);
var intType = 0;
if (strType == "object" && objObject.constructor == Array)
{intType = 3;}
else if (strType == "string")
{intType = 2;}
else if (strType == "number")
{intType = 1;}
else if (strType == "boolean")
{intType = 4;}
else if (strType == "function")
{intType = 5;}
else if (strType == "object")
{intType = 6;}
else
{intType = 0;}
return intType;}
Util.IsNullOrUndefined =Util_IsNullOrUndefine;
function Util_IsNullOrUndefine(objObject)
{return (objObject == null || Util.GetDataType(objObject) == 0);}
Util.Clone = function(objValue)
{if (objValue == null)
{return objValue;}
var enumDataType = Util.GetDataType(objValue);
switch (enumDataType)
{case 3:
{var arrResult = new Array();
for (var i = 0; i < objValue.length; i++)
{arrResult[i] = Util.Clone(objValue[i]);}
return arrResult;}
case 2:
{return objValue;}
case 1:
{return objValue;}
case 4:
{return objValue;}
case 5:
{return objValue;}
default:
{;
return null;}}}
Util.GetPlainTextFromValueObject = function(objValue)
{if (Util_GetDataType(objValue) == 3)
{return objValue[0];}
else
{return objValue;}};
Util.IndexOf = function(arrList, objValue)
{for (var i = 0; i < arrList.length; i++)
{if (arrList[i] == objValue)
{return i;}}
return -1;};
Util.InsertAt = function(arrList, objValue, intPosition)
{;
if (intPosition >= arrList.length)
{arrList.push(objValue);
return arrList;}
else
{var arrNewList = new Array();
for (var i = 0; i < arrList.length; i++)
{if (i == intPosition)
{arrNewList.push(objValue);}
arrNewList.push(arrList[i]);}
return arrNewList;}};
Util.RemoveAt = function(arrList, nPosition)
{;
var arrNewList = new Array();
for (var nIndex = 0; nIndex < arrList.length; nIndex++)
{if (nIndex != nPosition)
{arrNewList.push(arrList[nIndex]);}}
return arrNewList;};
Util.Trim =Util_Tri;
function Util_Tri(strValue)
{return strValue.replace(/^\s*/, '').replace(/\s*$/, '');}
Util.SetListValue = function(objList, value)
{var nOptionsLength = objList.options.length;
var firstMatch = null;
for (var index = 0; index < nOptionsLength; index++)
{var objOption = objList.options[index];
if (objOption.value == value)
{if (objOption.selected)
{return;}
else if (firstMatch == null)
{firstMatch = objOption;}}}
if (firstMatch != null)
{firstMatch.selected = true;}
else
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objList);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
if (BaseList.IsDynamic(objSnippetElement))
{View_SubmitForm(false , 102 , 1 , false );}
else
{objList.value = "";}}}
Util.Navigate = function(url)
{if (UserAgentInfo.strBrowser == 1)
{window.navigate(url);}
else
{window.location.replace(url);}}
Util.FindFirstFocusableHtmlChildControl =Util_FindFirstFocusableHtmlChildContro;
function Util_FindFirstFocusableHtmlChildContro(objControl)
{if (objControl == null)
{return null;}
var strTagName = "";
if (objControl.tagName != null)
{strTagName = objControl.tagName.toLowerCase();}
if ( (strTagName == "input" && objControl.getAttribute("type") != "hidden")||
strTagName == "select" ||
strTagName == "button" ||
strTagName == "a" ||
strTagName == "textarea")
{return objControl;}
if (objControl.childNodes == null || objControl.childNodes.length == 0)
{return null;}
for (var i = 0; i < objControl.childNodes.length; i++)
{var objChild = Util.FindFirstFocusableHtmlChildControl(objControl.childNodes[i]);
if (objChild != null)
{return objChild;}}
return null;}
Util.CreateObjUnformatResult =Util_CreateObjUnformatResul;
function Util_CreateObjUnformatResul(
strOriginalValue,
strUnformattedValue,
boolRespectCSA)
{var objUnformatResult = new Object();
objUnformatResult.strUnformattedValue = strUnformattedValue;
objUnformatResult.boolRespectCSA = boolRespectCSA;
objUnformatResult.strOriginalValue = strOriginalValue;
return objUnformatResult;}
Util.CreateObjDateTime =Util_CreateObjDateTim;
function Util_CreateObjDateTim(
intYear,
intMonth,
intDay,
intHours,
intMinutes,
intSeconds,
intFraction,
strTZOffset)
{var objDateTime = new Object();
objDateTime.intYear = intYear;
objDateTime.intMonth = intMonth;
objDateTime.intDay = intDay;
objDateTime.intHours = intHours;
objDateTime.intMinutes = intMinutes;
objDateTime.intSeconds = intSeconds;
objDateTime.intFraction = intFraction;
objDateTime.strTZOffset = strTZOffset;
return objDateTime;}
Util.CreateDefaultObjDateTime =Util_CreateObjDateTimeDefaul;
function Util_CreateObjDateTimeDefaul()
{var objNow = new Date();
return Util.CreateObjDateTime(objNow.getFullYear(), objNow.getMonth()+1, objNow.getDate(), 0, 0, 0, 0, "");}
Util.MergeTimeIntoDateTime =Util_MergeTimeIntoDateTim;
function Util_MergeTimeIntoDateTim(
objTime,
objDateTime)
{objDateTime.intHours = objTime.intHours;
objDateTime.intMinutes = objTime.intMinutes;
objDateTime.intSeconds = objTime.intSeconds;
objDateTime.intFraction = objTime.intFraction;
objDateTime.strTZOffset = Util.GetNewestTimezone(objTime, objDateTime);}
Util.MergeDateIntoDateTime =Util_MergeDateIntoDateTim;
function Util_MergeDateIntoDateTim(
objDate,
objDateTime)
{objDateTime.intMonth = objDate.intMonth;
objDateTime.intDay = objDate.intDay;
objDateTime.intYear = objDate.intYear;
objDateTime.strTZOffset = Util.GetNewestTimezone(objDate, objDateTime);}
Util.GetNewestTimezone =Util_GetNewestTimezon;
function Util_GetNewestTimezon(
objOldDateTime,
objNewDateTime)
{if (Util.GetDataType(objNewDateTime.strTZOffset) == 2 && Util.IsNonEmptyString(objNewDateTime.strTZOffset))
{return objNewDateTime.strTZOffset;}
else if (Util.GetDataType(objOldDateTime.strTZOffset) == 2 && Util.IsNonEmptyString(objOldDateTime.strTZOffset))
{return objOldDateTime.strTZOffset;}
return "";}
var objStandardValues = new Array(
' ','-',0,1,2,3,4,5,6,7,8,9,':',' ','-',':',0,1,2,3,4,5,
6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,
4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,
2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,
0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,
8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,
6,7,8,9,' ',0,1,2,3,4,5,6,7,8,9,'-',' ',0,1,2,3,4,5,6,7,
8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,' ',' ',' ',
' ',' ',' ',' ',' ',' ',' ',' ','-','-','-','-','-','-',
' ',' ','-',' ','-','-','-',':','-','-',':','-','-','-',
'/',0,1,2,3,4,5,6,7,8,9,':',-1);
var strSpecialCharacters="\u0020\u002D\u0030\u0031\u0032\u0033\u0034\u0035\u0036\u0037\u0038\u0039\u003A\u00A0\u058A\u05C3\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9\u0966\u0967\u0968\u0969\u096A\u096B\u096C\u096D\u096E\u096F\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF\u0A66\u0A67\u0A68\u0A69\u0A6A\u0A6B\u0A6C\u0A6D\u0A6E\u0A6F\u0AE6\u0AE7\u0AE8\u0AE9\u0AEA\u0AEB\u0AEC\u0AED\u0AEE\u0AEF\u0B66\u0B67\u0B68\u0B69\u0B6A\u0B6B\u0B6C\u0B6D\u0B6E\u0B6F\u0BE6\u0BE7\u0BE8\u0BE9\u0BEA\u0BEB\u0BEC\u0BED\u0BEE\u0BEF\u0C66\u0C67\u0C68\u0C69\u0C6A\u0C6B\u0C6C\u0C6D\u0C6E\u0C6F\u0CE6\u0CE7\u0CE8\u0CE9\u0CEA\u0CEB\u0CEC\u0CED\u0CEE\u0CEF\u0D66\u0D67\u0D68\u0D69\u0D6A\u0D6B\u0D6C\u0D6D\u0D6E\u0D6F\u0E50\u0E51\u0E52\u0E53\u0E54\u0E55\u0E56\u0E57\u0E58\u0E59\u0ED0\u0ED1\u0ED2\u0ED3\u0ED4\u0ED5\u0ED6\u0ED7\u0ED8\u0ED9\u0F20\u0F21\u0F22\u0F23\u0F24\u0F25\u0F26\u0F27\u0F28\u0F29\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1680\u17E0\u17E1\u17E2\u17E3\u17E4\u17E5\u17E6\u17E7\u17E8\u17E9\u1806\u180E\u1810\u1811\u1812\u1813\u1814\u1815\u1816\u1817\u1818\u1819\u1946\u1947\u1948\u1949\u194A\u194B\u194C\u194D\u194E\u194F\u19D0\u19D1\u19D2\u19D3\u19D4\u19D5\u19D6\u19D7\u19D8\u19D9\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2010\u2011\u2012\u2013\u2014\u2015\u202F\u205F\u2E17\u3000\u301C\u3030\u30A0\uFE30\uFE31\uFE32\uFE55\uFE58\uFE63\uFF0D\uFF0F\uFF10\uFF11\uFF12\uFF13\uFF14\uFF15\uFF16\uFF17\uFF18\uFF19\uFF1A";
Util.ReplaceNonLatinDigitsAndPunctuation =Util_ReplaceNonLatinDigitsAndPunctuatio;
function Util_ReplaceNonLatinDigitsAndPunctuatio(strValue)
{var strResult = "";
var currentCharIndex;
for (currentCharIndex = 0; currentCharIndex < strValue.length; currentCharIndex ++)
{var currentChar = strValue.charAt(currentCharIndex);
var digitIndex = strSpecialCharacters.indexOf(currentChar);
strResult += (digitIndex != -1) ? objStandardValues[digitIndex].toString() : currentChar;}
return strResult;}
Util.FindHashForServerImage = function Util_FindHashForServerImage(strImage)
{var hash = "";
if (UserAgentInfo.strBrowser != 2 && document.all != null)
{var allImageTags = document.all.tags("img");
var revString = "?rev=";
if (allImageTags != null)
{for (var i = 0; i < allImageTags.length; i++)
{var srcAttribute = allImageTags[i].getAttribute("src");
if (srcAttribute != null)
{var queryParameterIndex = srcAttribute.indexOf(strImage + revString);
if (queryParameterIndex != -1)
{hash = revString + srcAttribute.substring(
queryParameterIndex + strImage.length + revString.length,
srcAttribute.length);
break;}}}}}
return hash;}
function Util_IsValidXmlString(strXmlString)
{for (var charIndex = 0; charIndex < strXmlString.length; charIndex++)
{var ch = strXmlString.charCodeAt(charIndex);
if (!(ch == 0x9 ||
ch == 0xa ||
ch == 0xd ||
(ch >= 0x20 && ch <= 0xfffd)))
{return false;}}
return true;}
LoadedScriptFiles.boolCoreLoaded = false;
LoadedScriptFiles.boolIntlCoreStringsLoaded = false;
LoadedScriptFiles.boolServerError = false;
LoadedScriptFiles.DetectAllScriptsLoaded = function(boolHasView)
{if (typeof(g_objSnippetTree) == "undefined" && boolHasView && CurrentFormData.UserMessages().length == 0)
{return false;}
return (
LoadedScriptFiles.boolCoreLoaded &&
LoadedScriptFiles.boolIntlCoreStringsLoaded &&
!LoadedScriptFiles.boolServerError);
return true;}
function XsdDatatype(
objDatatypeInformation)
{if (!(XsdDatatype.prototype instanceof XsdDatatypeTraits))
{XsdDatatype.prototype = new XsdDatatypeTraits();
XsdDatatype.prototype.constructor = XsdDatatype;
return new XsdDatatype(objDatatypeInformation);}
this._objDatatype = objDatatypeInformation[0];
this._arrConfiguration = objDatatypeInformation[1];}
XsdDatatype.k_intValidityUnknown = -1;
XsdDatatype.k_intInvalid = 0;
XsdDatatype.k_intValid = 1;
function XsdDatatypeTraits()
{this.GetErrorMessages = function()
{return this._LookUpErrorMessages(this._arrConfiguration[1]);};
this._LookUpErrorMessages = function(
strDatatype)
{var arrMessages = null;
strDatatype = strDatatype.toLowerCase();
switch (strDatatype)
{case "boolean":
arrMessages = [IntlCoreStrings.k_strValidationBooleanShort, ""];
break;
case "byte":
arrMessages = [IntlCoreStrings.k_strValidationByteShort, IntlCoreStrings.k_strValidationByteLong];
break;
case "date":
arrMessages = [IntlCoreStrings.k_strValidationDateShort, ""];
break;
case "datetime":
arrMessages = [IntlCoreStrings.k_strValidationDateTimeShort, ""];
break;
case "decimal":
arrMessages = [IntlCoreStrings.k_strValidationDecimalShort, ""];
break;
case "double":
arrMessages = [IntlCoreStrings.k_strValidationDoubleShort, IntlCoreStrings.k_strValidationDoubleLong];
break;
case "float":
arrMessages = [IntlCoreStrings.k_strValidationFloatShort, IntlCoreStrings.k_strValidationFloatLong];
break;
case "integer":
arrMessages = [IntlCoreStrings.k_strValidationIntegerShort, ""];
break;
case "int":
arrMessages = [IntlCoreStrings.k_strValidationIntShort, IntlCoreStrings.k_strValidationIntLong];
break;
case "long":
arrMessages = [IntlCoreStrings.k_strValidationLongShort, IntlCoreStrings.k_strValidationLongLong];
break;
case "negativeinteger":
arrMessages = [IntlCoreStrings.k_strValidationNegativeIntegerShort, ""];
break;
case "nonnegativeinteger":
arrMessages = [IntlCoreStrings.k_strValidationNonNegativeIntegerShort, ""];
break;
case "nonpositiveinteger":
arrMessages = [IntlCoreStrings.k_strValidationNonPositiveIntegerShort, ""];
break;
case "positiveinteger":
arrMessages = [IntlCoreStrings.k_strValidationPositiveIntegerShort, ""];
break;
case "unsignedbyte":
arrMessages = [IntlCoreStrings.k_strValidationUnsignedByteShort, IntlCoreStrings.k_strValidationUnsignedByteLong];
break;
case "unsignedint":
arrMessages = [IntlCoreStrings.k_strValidationUnsignedIntShort, IntlCoreStrings.k_strValidationUnsignedIntLong];
break;
case "unsignedlong":
arrMessages = [IntlCoreStrings.k_strValidationUnsignedLongShort, IntlCoreStrings.k_strValidationUnsignedLongLong];
break;
case "unsignedshort":
arrMessages = [IntlCoreStrings.k_strValidationUnsignedShortShort, IntlCoreStrings.k_strValidationUnsignedShortLong];
break;
case "short":
arrMessages = [IntlCoreStrings.k_strValidationShortShort, IntlCoreStrings.k_strValidationShortLong];
break;
case "time":
arrMessages = [IntlCoreStrings.k_strValidationTimeShort, ""];
break;
case "entity":
case "id":
case "idref":
case "language":
case "ncname":
case "name":
case "nmtoken":
case "normalizedstring":
case "string":
case "token":
arrMessages = ["", ""];
break;
case "anysimpletype":
case "anyuri":
case "base64binary":
case "duration":
case "gday":
case "gmonth":
case "gmonthday":
case "gyear":
case "gyearmonth":
case "hexbinary":
case "notation":
case "qname":
arrMessages = ["", ""];
break;
default:
arrMessages = null;}
return arrMessages;}
this.IsValid = function(
strValue)
{return this._objDatatype.IsValidEx(this._arrConfiguration, strValue);};
this.IsNillable = function()
{return this._arrConfiguration[0];}
this.GetUnderlyingDatatype = function()
{return this._objDatatype;};
this.GetDefaultValue = function()
{return this._arrConfiguration[2];};}
function AssumedValidDatatype() {}
AssumedValidDatatype.IsValidEx = function(
objConfiguration,
strValue)
{return AssumedValidDatatype.IsValid(strValue);};
AssumedValidDatatype.IsValid = function(
strValue)
{return true;};
AssumedValidDatatype.Compare = function(
strValueA,
strValueB)
{return strValueA == strValueB;};
function StringXsdDatatype() {}
StringXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return StringXsdDatatype.IsValid(strValue);};
StringXsdDatatype.IsValid = function(
strValue)
{return true;};
StringXsdDatatype.Compare = function(
strValueA,
strValueB)
{return strValueA == strValueB;};
function IntegerXsdDatatype() {}
IntegerXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return IntegerXsdDatatype.IsValid(strValue);};
IntegerXsdDatatype.IsValid = function(
strValue)
{var objRE;
objRE = new RegExp("^\\s*(?:\\+|-)?[0-9]+\\s*$");
return objRE.test(strValue);};
IntegerXsdDatatype.Compare = function(
strValueA,
strValueB)
{return DoubleXsdDatatype.Compare(strValueA, strValueB);};
function DecimalXsdDatatype() {}
DecimalXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return DecimalXsdDatatype.IsValid(strValue);};
DecimalXsdDatatype.IsValid = function(
strValue)
{var objRE;
objRE = new RegExp("^\\s*(?:\\+|-)?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))\\s*$");
return objRE.test(strValue);};
DecimalXsdDatatype.Compare = function(
strValueA,
strValueB)
{return DoubleXsdDatatype.Compare(strValueA, strValueB);};
function DoubleXsdDatatype() {}
DoubleXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return DoubleXsdDatatype.IsValid(strValue);}
DoubleXsdDatatype.IsValid = function(
strValue)
{var objRE;
var arrMatches;
objRE = new RegExp("^\\s*(?:(?:\\+|-)?(?:(?:([0-9]+)(?:\\.([0-9]+))?)|(?:\\.([0-9]+)))(?:[eE](?:(\\+|-))?([0-9]+))?)\\s*$");
arrMatches = objRE.exec(strValue);
if (arrMatches != null)
{var k_intMaxNegativeExponent = -324;
var k_intMaxPositveExponent = 308;
var intExponentOffset;
var intExponent;
var strMantissaIntegralPart;
var strMantissaDecimalPart;
var strExponentSignPart;
var strExponentValuePart;
strMantissaIntegralPart = arrMatches[1];
strMantissaDecimalPart = Util.IsNonEmptyString(arrMatches[2]) ? arrMatches[2] : arrMatches[3];
strExponentSignPart = arrMatches[4];
strExponentValuePart = arrMatches[5];
if (Util.GetDataType(strMantissaIntegralPart) != 2)
{strMantissaIntegralPart = "";}
if (Util.GetDataType(strMantissaDecimalPart) != 2)
{strMantissaDecimalPart = "";}
if (Util.GetDataType(strExponentSignPart) != 2)
{strExponentSignPart = "";}
if (Util.GetDataType(strExponentValuePart) != 2)
{strExponentValuePart = "";}
intExponentOffset = strMantissaIntegralPart.length - 1;
for (var intIndex = 0; intIndex < strMantissaIntegralPart.length; intIndex++)
{if (strMantissaIntegralPart.charAt(intIndex) != "0")
{break;}
intExponentOffset--;}
if (intExponentOffset == 0 && strMantissaIntegralPart.charAt(strMantissaIntegralPart.length - 1) == "0")
{intExponentOffset = -strMantissaDecimalPart.length;
for (var intIndex = strMantissaDecimalPart.length - 1; intIndex >= 0; intIndex--)
{if (strMantissaDecimalPart.charAt(intIndex) != "0")
{break;}
intExponentOffset++;}}
intExponent = 0;
if (Util.IsNonEmptyString(strExponentValuePart))
{try
{intExponent = parseInt(strExponentValuePart, 10);}
catch (exception)
{return false;}
if (strExponentSignPart == "-")
{intExponent = -intExponent;}}
intExponent += intExponentOffset;
return k_intMaxNegativeExponent < intExponent && intExponent < k_intMaxPositveExponent;}
else if ((new RegExp("^-?INF|NaN$")).test(strValue))
{return true;}
return false;};
DoubleXsdDatatype.Compare = function(
strValueA,
strValueB)
{;
;
var numA = parseFloat(strValueA);
var numB = parseFloat(strValueB);
if (numA == NaN || numB == NaN)
{return strValueA == strValueB;}
else
{return numA == numB;}};
function BooleanXsdDatatype() {}
BooleanXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return BooleanXsdDatatype.IsValid(strValue);};
BooleanXsdDatatype.IsValid = function(
strValue)
{var objRE;
objRE = new RegExp("^\\s*(?:true|false|1|0)\\s*$");
return objRE.test(strValue);};
BooleanXsdDatatype.Compare = function(
strValueA,
strValueB)
{var boolA = strValueA == "1" || strValueA == "true";
var boolB = strValueB == "1" || strValueB == "true";
;
;
return boolA == boolB;};
function DateXsdDatatype() {}
DateXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return DateXsdDatatype.IsValid(strValue);}
DateXsdDatatype.IsValid = function(
strValue)
{var objRE;
var objMatches;
var intYear = -1;
var intMonth = -1;
var intDay = -1;
var strTimeZone = "";
objRE = new RegExp("^\\s*-?(\\d{4})-(\\d{2})-(\\d{2})(.*)\\s*$");
objMatches = objRE.exec(strValue);
if (objMatches == null)
{return false;}
intYear = parseInt(objMatches[1], 10);
intMonth = parseInt(objMatches[2], 10);
intDay = parseInt(objMatches[3], 10);
strTimeZone = objMatches[4];
if (strTimeZone != "" && !DateUtils.IsValidTimeZone(strTimeZone))
{return false;}
if (intYear == 0)
{return false;}
if (intMonth < 1 || intMonth > 12)
{return false;}
if (intDay < 1 || intDay > DateUtils.GetNumDaysInMonth(intYear, intMonth))
{return false;}
return true;};
DateXsdDatatype.Compare = function(
strValueA,
strValueB)
{return strValueA == strValueB;};
function TimeXsdDatatype() {}
TimeXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return TimeXsdDatatype.IsValid(strValue);};
TimeXsdDatatype.IsValid = function(
strValue)
{var objRE;
var objMatches;
var intHour = -1;
var intMinute = -1;
var intSecond = -1;
var strFractionalSeconds = "";
var strTimeZone = "";
objRE = new RegExp("^\\s*(\\d{2}):(\\d{2}):(\\d{2})(?:\\.(\\d+))?(.*)\\s*$");
objMatches = objRE.exec(strValue);
if (objMatches == null)
{return false;}
intHour = parseInt(objMatches[1], 10);
intMinute = parseInt(objMatches[2], 10);
intSecond = parseInt(objMatches[3], 10);
strFractionalSeconds = objMatches[4];
strTimeZone = objMatches[5];
if (strTimeZone != "" && !DateUtils.IsValidTimeZone(strTimeZone))
{return false;}
if (intHour < 0 || intHour > 23)
{return false;}
if (intMinute < 0 || intMinute > 59)
{return false;}
if (intSecond < 0 || intSecond > 59)
{return false;}
return true;};
TimeXsdDatatype.Compare = function(
strValueA,
strValueB)
{return strValueA == strValueB;};
function DateTimeXsdDatatype() {}
DateTimeXsdDatatype.IsValidEx = function(
objConfiguration,
strValue)
{var boolNillable;
boolNillable = objConfiguration[0];
if (boolNillable && Util.IsNullOrEmptyString(strValue))
{return true;}
return DateTimeXsdDatatype.IsValid(strValue);};
DateTimeXsdDatatype.IsValid = function(
strValue)
{var objRE;
var objMatches;
objRE = new RegExp("^\\s*((?:[0-9]|-)+)T((?:[0-9]|[-\\+]|[\\.:Z])+)\\s*$");
objMatches = objRE.exec(strValue);
if (objMatches == null)
{return false;}
return DateXsdDatatype.IsValid(objMatches[1]) && TimeXsdDatatype.IsValid(objMatches[2]);};
DateTimeXsdDatatype.Compare = function(
strValueA,
strValueB)
{return strValueA == strValueB;};
function XsdFacets(
objFacetsInformation)
{if (!(XsdFacets.prototype instanceof XsdFacetsTraits))
{XsdFacets.prototype = new XsdFacetsTraits();
XsdFacets.prototype.constructor = XsdFacets;
return new XsdFacets(objFacetsInformation);}
this._arrFacetsInformation = objFacetsInformation;
this._arrInvalidFacetInformation = null;}
function XsdFacetsTraits()
{this.GetErrorMessages = function(
objDatatype)
{if (this._arrInvalidFacetInformation != null)
{return this._arrInvalidFacetInformation[0].GetErrorMessages(this._arrInvalidFacetInformation[1],
objDatatype);}
return ["", ""];};
this.IsValid = function(
objDatatype,
strValue)
{this._strScreenTip = "";
for (var varIndex in this._arrFacetsInformation)
{var arrCurrentFacetInformation = this._arrFacetsInformation[varIndex];
if (!arrCurrentFacetInformation[0].IsValid(arrCurrentFacetInformation[1], objDatatype, strValue))
{this._arrInvalidFacetInformation = arrCurrentFacetInformation;
return false;}}
return true;};}
function MinLengthXsdFacet() {}
MinLengthXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var intMinLength = objFacetConfiguration[0];
if (intMinLength == 1)
{arrErrorMessages.push(IntlCoreStrings.k_strValidationMinLengthIsOneShort);}
else
{arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationMinLengthShortFormat, "", "",
intMinLength));}
arrErrorMessages.push("");
return arrErrorMessages;};
MinLengthXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var intMinLength = parseInt(objFacetConfiguration[0], 10);
var boolList = parseInt(objFacetConfiguration[1], 10) == 1;
if (boolList)
{var arrTokens = strValue.match(/[^\s]+/g);
var numTokens = (arrTokens == null) ? 0 : arrTokens.length;
return numTokens >= intMinLength;}
else
{return  strValue.length >= intMinLength;}};
function MaxLengthXsdFacet() {}
MaxLengthXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var intMaxLength = objFacetConfiguration[0];
arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationMaxLengthShortFormat, "", "",
intMaxLength));
arrErrorMessages.push("");
return arrErrorMessages;};
MaxLengthXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var intMaxLength = parseInt(objFacetConfiguration[0], 10);
var boolList = parseInt(objFacetConfiguration[1], 10) == 1;
if (boolList)
{var arrTokens = strValue.match(/[^\s]+/g);
var numTokens = (arrTokens == null) ? 0 : arrTokens.length;
return numTokens <= intMaxLength;}
else
{return  strValue.length <= intMaxLength;}};
function LengthXsdFacet() {}
LengthXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var intLength = objFacetConfiguration[0];
arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationLengthShortFormat, "", "", intLength));
arrErrorMessages.push("");
return arrErrorMessages;};
LengthXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var intLength = parseInt(objFacetConfiguration[0], 10);
return  strValue.length == intLength;};
function PatternXsdFacet() {}
PatternXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var strPattern;
strPattern = objFacetConfiguration[0][0];
for (var intOredItemsIndex = 1; intOredItemsIndex < objFacetConfiguration[0].length; intOredItemsIndex++)
{strPattern += "|" + objFacetConfiguration[0][intOredItemsIndex];}
arrErrorMessages.push(IntlCoreStrings.k_strValidationPatternShort);
arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationPatternLongFormat, "", "",
strPattern));
return arrErrorMessages;};
PatternXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var boolAndedItemsAreValid = true;
for (var varAndedItemsIndex in objFacetConfiguration)
{var boolOredItemsAreValid = false;
for (var varOredItemsIndex in objFacetConfiguration[varAndedItemsIndex])
{boolOredItemsAreValid = boolOredItemsAreValid
|| Expr.xdUtil_Match(strValue, objFacetConfiguration[varAndedItemsIndex][varOredItemsIndex]);
if (boolOredItemsAreValid)
{break;}}
boolAndedItemsAreValid = boolAndedItemsAreValid && boolOredItemsAreValid;
if (!boolAndedItemsAreValid)
{break;}}
return boolAndedItemsAreValid;};
function EnumerationXsdFacet() {}
EnumerationXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var strValues = "";
var strFormat;
arrErrorMessages.push(IntlCoreStrings.k_strValidationEnumerationShort);
for (var varIndex in objFacetConfiguration)
{var strEnumeratedValue = objFacetConfiguration[varIndex];
strValues += "\n" + strEnumeratedValue;}
strFormat = IntlCoreStrings.k_strValidationEnumerationLongFormat.replace(new RegExp("%1!e!", "g"), "%1!s!");
arrErrorMessages.push(Util.FormatStringEx(strFormat, strValues));
return arrErrorMessages;};
EnumerationXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var objValidateType;
if (objDatatype == null || objDatatype._objDatatype == null || objDatatype._objDatatype.Compare == null)
{;
objValidateType = null;}
else
{objValidateType = objDatatype._objDatatype;}
for (var varIndex in objFacetConfiguration)
{var strEnumeratedValue = objFacetConfiguration[varIndex];
if (objValidateType != null)
{if (objValidateType.Compare(strValue, strEnumeratedValue))
{return true;}}
else if (strValue == strEnumeratedValue)
{return true;}}
return false;};
function MaxInclusiveXsdFacet() {}
MaxInclusiveXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var strMaxInclusive = objFacetConfiguration[0];
var varMaxInclusive = null;
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
varMaxInclusive = parseInt(strMaxInclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
varMaxInclusive = parseFloat(strMaxInclusive);}
if (varMaxInclusive == -1)
{arrErrorMessages.push(IntlCoreStrings.k_strValidationMaxInclusiveIsNegativeOneShort);}
else if (varMaxInclusive == 0)
{arrErrorMessages.push(IntlCoreStrings.k_strValidationMaxInclusiveIsZeroShort);}
else
{arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationMaxInclusiveShortFormat, "", "",
strMaxInclusive));}
arrErrorMessages.push("");
return arrErrorMessages;};
MaxInclusiveXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var strMaxInclusive = objFacetConfiguration[0];
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
return parseInt(strValue, 10) <= parseInt(strMaxInclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
return parseFloat(strValue) <= parseFloat(strMaxInclusive);
case DateXsdDatatype:
case DateTimeXsdDatatype:
case TimeXsdDatatype:
return strValue <= strMaxInclusive;}
return true;};
function MaxExclusiveXsdFacet() {}
MaxExclusiveXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var strMaxExclusive = objFacetConfiguration[0];
var varMaxExclusive = null;
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
varMaxExclusive = parseInt(strMaxExclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
varMaxExclusive = parseFloat(strMaxExclusive);}
if (varMaxExclusive == 0)
{arrErrorMessages.push(IntlCoreStrings.k_strValidationMaxExclusiveIsZeroShort);}
else
{arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationMaxExclusiveShortFormat, "", "",
strMaxExclusive));}
arrErrorMessages.push("");
return arrErrorMessages;};
MaxExclusiveXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var strMaxExclusive = objFacetConfiguration[0];
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
return parseInt(strValue, 10) < parseInt(strMaxExclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
return parseFloat(strValue) < parseFloat(strMaxExclusive);
case DateXsdDatatype:
case DateTimeXsdDatatype:
case TimeXsdDatatype:
return strValue < strMaxExclusive;}
return true;};
function MinExclusiveXsdFacet() {}
MinExclusiveXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var strMinExclusive = objFacetConfiguration[0];
var varMinExclusive = null;
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
varMinExclusive = parseInt(strMinExclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
varMinExclusive = parseFloat(strMinExclusive);}
if (varMinExclusive == 0)
{arrErrorMessages.push(IntlCoreStrings.k_strValidationMinExclusiveIsZeroShort);}
else
{arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationMinExclusiveShortFormat, "", "",
strMinExclusive));}
arrErrorMessages.push("");
return arrErrorMessages;};
MinExclusiveXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var strMinExclusive = objFacetConfiguration[0];
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
return parseInt(strValue, 10) > parseInt(strMinExclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
return parseFloat(strValue) > parseFloat(strMinExclusive);
case DateXsdDatatype:
case DateTimeXsdDatatype:
case TimeXsdDatatype:
return strValue > strMinExclusive;}
return true;};
function MinInclusiveXsdFacet() {}
MinInclusiveXsdFacet.GetErrorMessages = function(
objFacetConfiguration,
objDatatype)
{var arrErrorMessages = new Array();
var strMinInclusive = objFacetConfiguration[0];
var varMinInclusive = null;
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
varMinInclusive = parseInt(strMinInclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
varMinInclusive = parseFloat(strMinInclusive);}
if (varMinInclusive == 0)
{arrErrorMessages.push(IntlCoreStrings.k_strValidationMinInclusiveIsZeroShort);}
else if (varMinInclusive == 1)
{arrErrorMessages.push(IntlCoreStrings.k_strValidationMinInclusiveIsOneShort);}
else
{arrErrorMessages.push(Util.FormatStringEx(IntlCoreStrings.k_strValidationMinInclusiveShortFormat, "", "",
strMinInclusive));}
arrErrorMessages.push("");
return arrErrorMessages;};
MinInclusiveXsdFacet.IsValid = function(
objFacetConfiguration,
objDatatype,
strValue)
{var strMinInclusive = objFacetConfiguration[0];
switch (objDatatype.GetUnderlyingDatatype())
{case IntegerXsdDatatype:
return parseInt(strValue, 10) >= parseInt(strMinInclusive, 10);
case DoubleXsdDatatype:
case DecimalXsdDatatype:
return parseFloat(strValue) >= parseFloat(strMinInclusive);
case DateXsdDatatype:
case DateTimeXsdDatatype:
case TimeXsdDatatype:
return strValue >= strMinInclusive;}
return true;};
function DateUtils() {}
DateUtils.k_strISODatePart = "(-?[0-9]{4})-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])";
DateUtils.k_strISOTimePart = "([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(?:\\.([0-9]+))?";
DateUtils.k_strISOZonePart = "(Z|[-\\+](?:(?:0[0-9]|1[0-3]):[0-5][0-9])|14:00)";
DateUtils.k_objREIsoDate = new RegExp("^" + DateUtils.k_strISODatePart + DateUtils.k_strISOZonePart + "?$");
DateUtils.k_objREIsoTime = new RegExp("^" + DateUtils.k_strISOTimePart + DateUtils.k_strISOZonePart + "?$");
DateUtils.k_objREIsoDateTime = new RegExp("^" + DateUtils.k_strISODatePart + "T" + DateUtils.k_strISOTimePart + DateUtils.k_strISOZonePart + "?$");
DateUtils.k_objREIsoTimeZone = new RegExp("^" + DateUtils.k_strISOZonePart + "$");
DateUtils.IsValidTimeZone = function(
strValue)
{var objMatches = DateUtils.k_objREIsoTimeZone.exec(strValue);
return (objMatches != null);}
DateUtils.GetMonthAsLongTextual = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{if (boolUseGenitiveMonthForm)
{return cultureInfo.k_objMonthGenitiveNames[objDateTime.intMonth - 1];}
else
{return cultureInfo.k_objNamesOfMonths[objDateTime.intMonth - 1];}}
DateUtils.GetMonthAsShortTextual = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{if (boolUseGenitiveMonthForm)
{return cultureInfo.k_objAbbrevMonthGenitiveNames[objDateTime.intMonth - 1];}
else
{return cultureInfo.k_objAbbreviationsOfMonths[objDateTime.intMonth - 1];}}
DateUtils.GetMonthAsLongNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return DateUtils.FormatAsLong(objDateTime.intMonth);}
DateUtils.GetMonthAsShortNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return objDateTime.intMonth.toString();}
DateUtils.GetDayOfWeek = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return DateUtils.UnparseDayOfWeek(cultureInfo, (new Date(objDateTime.intYear, objDateTime.intMonth - 1,objDateTime. intDay)).getDay() + 1);}
DateUtils.GetDayOfWeekAsShortTextual = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return cultureInfo.k_objAbbreviationsOfDays[(new Date(objDateTime.intYear, objDateTime.intMonth - 1, objDateTime.intDay)).getDay()];}
DateUtils.GetDayAsLongNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return DateUtils.FormatAsLong(objDateTime.intDay);}
DateUtils.GetDayAsShortNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return objDateTime.intDay.toString();}
DateUtils.GetYearAsLongNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{var strValue = objDateTime.intYear.toString();
switch (strValue.length)
{case 1:
strValue = "000" + strValue;
break;
case 2:
strValue = "00" + strValue;
break;
case 3:
strValue = "0" + strValue;
break;}
return strValue;}
DateUtils.GetYearAsShortNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return DateUtils.FormatAsLong(objDateTime.intYear % 100);}
DateUtils.GetYearAsShorterNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return objDateTime.intYear % 100;}
DateUtils.GetEra = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return cultureInfo.k_strEraInfo;}
DateUtils.GetHoursAsShortNumeric12 = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{var value = objDateTime.intHours % 12;
return (value == 0 ? 12 : value).toString();}
DateUtils.GetHoursAsLongNumeric12 = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{var value = objDateTime.intHours % 12;
return DateUtils.FormatAsLong(value == 0 ? 12 : value);}
DateUtils.GetHoursAsShortNumeric24 = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return objDateTime.intHours.toString();}
DateUtils.GetHoursAsLongNumeric24 = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return DateUtils.FormatAsLong(objDateTime.intHours);}
DateUtils.GetMinutesAsShortNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return objDateTime.intMinutes.toString();}
DateUtils.GetMinutesAsLongNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return DateUtils.FormatAsLong(objDateTime.intMinutes);}
DateUtils.GetSecondsAsShortNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return objDateTime.intSeconds.toString();}
DateUtils.GetSecondsAsLongNumeric = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{return DateUtils.FormatAsLong(objDateTime.intSeconds);}
DateUtils.GetAMPMFirstChar = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{var strDesignator = objDateTime.intHours <12 ? cultureInfo.AMDesignator : cultureInfo.PMDesignator;
return strDesignator.substr(0,1);}
DateUtils.GetAMPM = function(
cultureInfo,
objDateTime,
boolUseGenitiveMonthForm)
{var strDesignator = objDateTime.intHours <12 ? cultureInfo.AMDesignator : cultureInfo.PMDesignator;
return strDesignator;}
DateUtils.ParseMonth = function(
cultureInfo,
strMonth)
{var intMonth = -1;
for (var intIndex = 0; intIndex < cultureInfo.k_objMonthREs.length; intIndex++)
{if (cultureInfo.k_objMonthREs[intIndex].test(strMonth))
{intMonth = intIndex + 1;
break;}}
return intMonth;}
DateUtils.ParseYear = function(
cultureInfo,
intYear)
{if (intYear < 100)
{var intTreshholdYear = cultureInfo.k_intTwoDigitYearMax;
intYear = intYear + (intTreshholdYear - (intTreshholdYear % 100));
if (intYear > intTreshholdYear)
{intYear = intYear - 100;}}
return intYear;}
DateUtils.UnparseDayOfWeek = function(
cultureInfo,
intDayOfWeek)
{return cultureInfo.k_objNamesOfDays[intDayOfWeek - 1];}
DateUtils.GetNumDaysInMonth = function(
intYear,
intMonth)
{var intNumDays = -1;
switch (intMonth)
{case 1:
case 3:
case 5:
case 7:
case 8:
case 10:
case 12:
intNumDays = 31;
break;
case 2:
intNumDays = (DateUtils.IsLeapYear(intYear) ? 29 : 28)
break;
case 4:
case 6:
case 9:
case 11:
intNumDays = 30;
break;}
return intNumDays;}
DateUtils.GetNumDaysInYear = function(intYear)
{return (DateUtils.IsLeapYear(intYear) ? 366 : 365);}
DateUtils.IsLeapYear = function(
intYear)
{return intYear % 4 == 0 && !(intYear % 100 == 0 && intYear % 400 != 0);}
DateUtils.FormatAsLong = function(
intValue)
{var strValue = intValue.toString();
return (strValue.length == 1 ? "0" + strValue : strValue);}
DateUtils.IsTimezoneEmptyOrZulu = function(
strTZOffset)
{return (Util.IsNullOrEmptyString(strTZOffset) || (strTZOffset == "Z"));}
DateUtils.ConvertToLocalTime = function(
objDateTime)
{if (!DateUtils.IsTimezoneEmptyOrZulu(objDateTime.strTZOffset))
{var operator = objDateTime.strTZOffset.charAt(0);
if (operator == '+' || operator == '-')
{var objDate = DateUtils.JScriptDateFromDateTime(objDateTime);
var userTime = objDate.getTime();
var intOffset = DateUtils.TimeZoneOffsetToMinutes(objDateTime.strTZOffset);
userTime -= (intOffset * 60000);
userTime -= (objDate.getTimezoneOffset() * 60000);
objDateTime = DateUtils.DateTimeFromJScriptDate(new Date(userTime), true,  objDateTime.intFraction);}}
return objDateTime;}
DateUtils.TimeZoneOffsetToMinutes = function(
strTZOffset)
{;
var intOffset = parseInt(strTZOffset.substr(0, 3), 10 ) * 60;
var idx = strTZOffset.indexOf(":");
if (idx != -1)
{intOffset += parseInt(strTZOffset.substr(idx + 1, 2), 10 );}
return intOffset;}
DateUtils.GetLocalTimeZoneOffsetString = function(
objDateTime)
{var objJScriptDate = DateUtils.JScriptDateFromDateTime(objDateTime)
var minutesTZOffset = -objJScriptDate.getTimezoneOffset();
var absHours = Math.abs(minutesTZOffset)/60;
var hours	 = Math.floor(absHours);
var minutes	 = 60 * (absHours - hours);
return ((minutesTZOffset < 0) ? "-" : "+")
+ DateUtils.FormatAsLong(hours)
+ ":"
+ DateUtils.FormatAsLong(minutes);}
DateUtils.JScriptDateFromDateTime = function(
objDateTime)
{if ((objDateTime.intYear | objDateTime.intMonth | objDateTime.intDay) == 0)
{var today = new Date();
objDateTime.intYear	 = today.getFullYear();
objDateTime.intMonth = today.getMonth() + 1;
objDateTime.intDay	 = today.getDate();}
return new Date(objDateTime.intYear,
objDateTime.intMonth - 1,
objDateTime.intDay,
objDateTime.intHours,
objDateTime.intMinutes,
objDateTime.intSeconds);}
DateUtils.DateTimeFromJScriptDate = function(
objJScriptDate,
boolAddTZOffset,
intFraction)
{var objDateTime = Util.CreateObjDateTime(
objJScriptDate.getFullYear(),
objJScriptDate.getMonth() + 1,
objJScriptDate.getDate(),
objJScriptDate.getHours(),
objJScriptDate.getMinutes(),
objJScriptDate.getSeconds(),
intFraction,
"");
if (boolAddTZOffset)
{objDateTime.strTZOffset = DateUtils.GetLocalTimeZoneOffsetString(objDateTime);}
return objDateTime;}
function DigitSeparator() {}
DigitSeparator.Parse = function(
intSeparator)
{var intParsedSeparator = intSeparator;
if (intSeparator < 0 || intSeparator > 5)
{intParsedSeparator = 0;}
return intParsedSeparator;}
function NoFormatting()
{if (!(NoFormatting.prototype instanceof NoFormattingTraits))
{NoFormatting.prototype = new NoFormattingTraits();
NoFormatting.prototype.constructor = NoFormatting;
return new NoFormatting();}}
NoFormatting._objSharedInstance = null;
NoFormatting.GetSharedInstance = function()
{if (NoFormatting._objSharedInstance == null)
{NoFormatting._objSharedInstance = new NoFormatting();}
return NoFormatting._objSharedInstance;}
function NoFormattingTraits()
{this.getFormattingType = function()
{return 0;}
this.Reinit = function(arrFormattingInfo)
{};
this.Format = function(
strValue)
{return strValue;};
this.Unformat = function(
strValue)
{return Util.CreateObjUnformatResult(strValue, strValue, false);};}
function NumberFormatting()
{}
NumberFormatting.InitDerivedObject = function(
objObject,
intDecimalSeparator,
intGroupSeparator,
intNonnegativeValueFormat,
intNegativeValueFormat,
intDecimalDigitsCount,
strCurrencySymbol,
intGrouping,
intMode)
{objObject._intDecimalSeparator = intDecimalSeparator;
objObject._intGroupSeparator = intGroupSeparator;
objObject._intNonnegativeValueFormat = intNonnegativeValueFormat;
objObject._intNegativeValueFormat = intNegativeValueFormat;
objObject._strCurrencySymbol = strCurrencySymbol == undefined ? "" : strCurrencySymbol;
objObject._intMode = intMode == undefined ? this.k_intModeDouble : intMode;
if ((intGrouping >= 0 && intGrouping <= 9) || (intGrouping == 32))
{objObject._intGrouping = intGrouping;}
else
{objObject._intGrouping = 0;}
if (intDecimalDigitsCount == undefined)
{objObject._intDecimalDigitsCount = 0;
objObject._strNumericPart = "[0-9][0-9" + objObject.k_objSeparatorsForRE[objObject._intGroupSeparator] + "]*"
+ objObject.k_objSeparatorsForRE[objObject._intDecimalSeparator] + "?";}
else
{objObject._intDecimalDigitsCount = intDecimalDigitsCount;
objObject._strNumericPart = "[0-9" +
objObject.k_objSeparatorsForRE[objObject._intGroupSeparator] +
objObject.k_objSeparatorsForRE[objObject._intDecimalSeparator] + "Ee\\+\\-]+";}}
function NumberFormattingTraits()
{this.k_objSeparatorsForString = new Array(5);
this.k_objSeparatorsForString[0] = "";
this.k_objSeparatorsForString[1] = ".";
this.k_objSeparatorsForString[2] = ",";
this.k_objSeparatorsForString[3] = " ";
this.k_objSeparatorsForString[4] = "'";
this.k_objSeparatorsForString[5] = "\u060C";
this.k_objSeparatorsForRE = new Array(5);
this.k_objSeparatorsForRE[0] = "";
this.k_objSeparatorsForRE[1] = "\\.";
this.k_objSeparatorsForRE[2] = ",";
this.k_objSeparatorsForRE[3] = " ";
this.k_objSeparatorsForRE[4] = "'";
this.k_objSeparatorsForRE[5] = "\\u060C";
this.k_intMaxExponentToNormalize = 25;
this.k_intModeUnknown = -1;
this.k_intModeNumber = 1;
this.k_intModePercentage = 2;
this.k_intModeCurrency = 3;
this.k_intModeNone = 4;
this.getFormattingType = function()
{return 2;}
this.k_objNumberPositivePatterns = new Array (
"%1");
this.k_objNumberNegativePatterns = new Array (
"(%1)",
"-%1",
"- %1",
"%1-",
"%1 -"
);
this.k_objCurrencyPositivePatterns = new Array (
"%2%1",
"%1%2",
"%2 %1",
"%1 %2"
);
this.k_objCurrencyNegativePatterns = new Array (
"(%2%1)",
"-%2%1",
"%2-%1",
"%2%1-",
"(%1%2)",
"-%1%2",
"%1-%2",
"%1%2-",
"-%1 %2",
"-%2 %1",
"%1 %2-",
"%2 %1-",
"%2 -%1",
"%1- %2",
"(%2 %1)",
"(%1 %2)"
);
this.k_objNonnegativeFormats = new Array(
"\\+\\s*(%1)",
"(%1)\\s*\\+",
"%2\\s*\\+\\s*(%1)",
"\\+\\s*%2\\s*(%1)",
"\\+\\s*(%1)\\s*%2",
"%2\\s*(%1)\\s*\\+",
"(%1)\\s*%2\\s*\\+",
"(%1)\\s*\\+\\s*%2",
"%2\\s*(%1)",
"(%1)\\s*%2",
"(%1)");
this.k_objNegativeFormats = new Array(
"-\\s*(%1)",
"(%1)\\s*-",
"%2\\s*-\\s*(%1)",
"-\\s*%2\\s*(%1)",
"-\\s*(%1)\\s*%2",
"%2\\s*(%1)\\s*-",
"(%1)\\s*%2\\s*-",
"(%1)\\s*-\\s*%2",
"\\(\\s*(%1)\\s*\\)",
"%2\\s*\\(\\s*(%1)\\s*\\)",
"\\(\\s*%2\\s*(%1)\\s*\\)",
"\\(\\s*(%1)\\s*%2\\s*\\)",
"\\(\\s*(%1)\\s*\\)\\s*%2");
this.Format = function(
strUnformattedValue)
{var objMatch = null;
var strFormattedValue = "";
var strIntegralPart = "";
var strDecimalPart = "";
var strExponentPart = "";
var boolIntegralPartIsNegative = false;
var strGroupedValue = "";
var strCombinedValue = "";
var intParsedExponentPart = 0;
if (Util.IsNullOrEmptyString(strUnformattedValue) ||
Util.IsNullOrEmptyString(Util.Trim(strUnformattedValue)))
{return strUnformattedValue;}
var floatValue = strUnformattedValue * 1;
if (isNaN(floatValue))
{return strUnformattedValue;}
if (floatValue < 0)
{boolIntegralPartIsNegative = true;
floatValue = -floatValue;}
if (this._intDecimalDigitsCount >= 0)
{if (this._intMode == this.k_intModePercentage)
{floatValue *= 100;}
var strFixed = ToFixed(floatValue,this._intDecimalDigitsCount);
if (strFixed == null)
{return strUnformattedValue;}
objMatch = (new RegExp("^(-?[0-9]+)(?:\\.([0-9]+))?$")).exec(strFixed);
if (objMatch == null)
{return strUnformattedValue;}
strIntegralPart = (objMatch[1] == undefined ? "" : objMatch[1]);
strDecimalPart = (objMatch[2] == undefined ? "" : objMatch[2]);
strExponentPart = "";}
else
{var strExp = ToExponential(floatValue) + "";
objMatch = (new RegExp("^(-?[0-9]+)(?:\\.([0-9]+))?(?:[Ee]([+-]?[0-9]+))?$")).exec(strExp);
strIntegralPart = (objMatch[1] == undefined ? "" : objMatch[1]);
strDecimalPart = (objMatch[2] == undefined ? "" : objMatch[2]);
strExponentPart = (objMatch[3] == undefined ? "" : objMatch[3]);
;
intParsedExponentPart = parseInt(strExponentPart, 10);
if (this._intMode == this.k_intModePercentage)
{intParsedExponentPart += 2;}
if (intParsedExponentPart - strDecimalPart.length < -9)
{var strFixed = ToFixed(floatValue, 9);
if (strFixed == null)
{return strUnformattedValue;}
if (boolIntegralPartIsNegative)
{strFixed = "-" + strFixed;}
return this.Format(strFixed);}
else if (intParsedExponentPart < this.k_intMaxExponentToNormalize)
{if (intParsedExponentPart == 0)
{strExponentPart = "";}
else if (intParsedExponentPart < 0)
{var objPieces = new Array();
var intDigitCounter = -intParsedExponentPart;
objPieces.push(strDecimalPart);
objPieces.push(strIntegralPart);
intDigitCounter--;
for (var intPaddingCounter = intDigitCounter; intPaddingCounter >= 1; intPaddingCounter--)
{objPieces.push("0");}
strIntegralPart = "0";
strDecimalPart = objPieces.reverse().join("");
strExponentPart = "";}
else
{var objPieces = new Array();
var intDigitCounter;
var numCharsTakenFromDecimalPart;
if (strDecimalPart.length > intParsedExponentPart)
{numCharsTakenFromDecimalPart = intParsedExponentPart;
intDigitCounter = 0;}
else
{numCharsTakenFromDecimalPart = strDecimalPart.length;
intDigitCounter = intParsedExponentPart - numCharsTakenFromDecimalPart;}
objPieces.push(strIntegralPart);
objPieces.push(strDecimalPart.substr(0, numCharsTakenFromDecimalPart));
for (var intPaddingCounter = intDigitCounter; intPaddingCounter >= 1; intPaddingCounter--)
{objPieces.push("0");}
strIntegralPart = objPieces.join("");
strDecimalPart = strDecimalPart.substr(numCharsTakenFromDecimalPart);
strExponentPart = "";}}
;
if (strIntegralPart.length == 0)
{strIntegralPart = "0";}}
if (this.k_objSeparatorsForString[this._intGroupSeparator].length > 0 && this._intGrouping > 0)
{var strLastPart = "";
var strIntegralPartBackup = strIntegralPart;
var intGroupBy = this._intGrouping;
if (this._intGrouping == 32 && strIntegralPart.length > 3)
{strLastPart = strIntegralPart.substr(strIntegralPart.length - 3, 3);
strIntegralPart = strIntegralPart.substr(0, strIntegralPart.length - 3);
intGroupBy = 2;}
var intAlignmentOffset = strIntegralPart.length % intGroupBy;
var objGroupedDigits = new Array();
if (intAlignmentOffset != 0)
{objGroupedDigits.push(strIntegralPart.substr(0, intAlignmentOffset));}
for (var intIndex = intAlignmentOffset; intIndex < strIntegralPart.length; intIndex += intGroupBy)
{objGroupedDigits.push(strIntegralPart.substr(intIndex, intGroupBy));}
if (Util.IsNonEmptyString(strLastPart))
{objGroupedDigits.push(strLastPart);}
strGroupedValue = objGroupedDigits.join(this.k_objSeparatorsForString[this._intGroupSeparator]);}
else
{strGroupedValue = strIntegralPart.toString();}
if (this._intDecimalDigitsCount == 0
|| (this._intDecimalDigitsCount < 0 && strDecimalPart.length == 0))
{strCombinedValue = strGroupedValue;}
else
{strCombinedValue = strGroupedValue + this.k_objSeparatorsForString[this._intDecimalSeparator]
+ strDecimalPart;}
if (strExponentPart.length > 0)
{strCombinedValue = strCombinedValue + "E" + strExponentPart;}
if (boolIntegralPartIsNegative &&
(strIntegralPart+"." + strDecimalPart +(strExponentPart.length > 0 ? "E" + strExponentPart : "") ) * 1 == 0)
{boolIntegralPartIsNegative = false;}
var intFormatId = 0;
var objPatterns = null;
if (boolIntegralPartIsNegative && Util.IsNonEmptyString(this._strCurrencySymbol))
{objPatterns = this.k_objCurrencyNegativePatterns;
intFormatId = this._intNegativeValueFormat;}
else if (!boolIntegralPartIsNegative && Util.IsNonEmptyString(this._strCurrencySymbol))
{objPatterns = this.k_objCurrencyPositivePatterns;
intFormatId = this._intNonnegativeValueFormat;}
else if (boolIntegralPartIsNegative && Util.IsNullOrEmptyString(this._strCurrencySymbol))
{objPatterns = this.k_objNumberNegativePatterns;
intFormatId = this._intNegativeValueFormat;}
else
{objPatterns = this.k_objNumberPositivePatterns;
intFormatId = 0;}
if (intFormatId >= objPatterns.length)
{strFormattedValue = strCombinedValue;}
else
{var strFormat = objPatterns[intFormatId];
strFormattedValue = strFormat.replace(new RegExp("%1"), strCombinedValue);
strFormattedValue = strFormattedValue.replace(new RegExp("%2"), this._strCurrencySymbol);}
return strFormattedValue;};
this.Unformat = NumberFormatting_Unformat;
function NumberFormatting_Unformat(
strInternationalFormattedValue)
{var strFormattedValue = Util.ReplaceNonLatinDigitsAndPunctuation(strInternationalFormattedValue);
strFormattedValue = Util.StripWhitespace(strFormattedValue);
var objTrailingDecimalSeparatorRE = new RegExp(this.k_objSeparatorsForRE[this._intDecimalSeparator] + "$");
var objDecimalSeparatorBeforeExponentRE = new RegExp(this.k_objSeparatorsForRE[this._intDecimalSeparator] + "[eE]");
var objNonnegativeFormatREs = new Array();
var objNegativeFormatREs = new Array();
var strUnformattedValue = null;
var boolValueIsNegative = false;
for (var varFormatIndex in this.k_objNonnegativeFormats)
{var strFormat = this.k_objNonnegativeFormats[varFormatIndex];
strFormat = strFormat.replace(new RegExp("%1"), this._strNumericPart);
strFormat = strFormat.replace(new RegExp("%2"), RegExpEscape(this._strCurrencySymbol));
objNonnegativeFormatREs.push(new RegExp("^" + strFormat + "$", "i"));}
for (var varFormatIndex in this.k_objNegativeFormats)
{var strFormat = this.k_objNegativeFormats[varFormatIndex];
strFormat = strFormat.replace(new RegExp("%1"), this._strNumericPart);
strFormat = strFormat.replace(new RegExp("%2"), RegExpEscape(this._strCurrencySymbol));
objNegativeFormatREs.push(new RegExp("^" + strFormat + "$", "i"));}
for (var intIndex = 0; intIndex < objNegativeFormatREs.length; intIndex++)
{var objMatch = objNegativeFormatREs[intIndex].exec(strFormattedValue);
if (objMatch != null)
{strUnformattedValue = objMatch[1];
boolValueIsNegative = true;
break;}}
if (strUnformattedValue == null)
{for (var intIndex = 0; intIndex < objNonnegativeFormatREs.length; intIndex++)
{var objMatch = objNonnegativeFormatREs[intIndex].exec(strFormattedValue);
if (objMatch != null)
{strUnformattedValue = objMatch[1];
boolValueIsNegative = false;
break;}}}
if (strUnformattedValue != null)
{strUnformattedValue = strUnformattedValue.replace(objTrailingDecimalSeparatorRE, "");
strUnformattedValue = strUnformattedValue.replace(new RegExp("^ +| +$", "g"), "");
strUnformattedValue = strUnformattedValue.replace(objDecimalSeparatorBeforeExponentRE, "E");
strUnformattedValue = strUnformattedValue.replace(new RegExp("e"), "E");
strUnformattedValue = strUnformattedValue.replace(new RegExp("E\\+"), "E");
strUnformattedValue = ParseNumber(strUnformattedValue,
this.k_objSeparatorsForString[this._intGroupSeparator],
this.k_objSeparatorsForString[this._intDecimalSeparator]);}
if (strUnformattedValue != null)
{if (boolValueIsNegative)
{strUnformattedValue = "-" + strUnformattedValue;}
if (this._intMode == this.k_intModePercentage)
{var floatValue = parseFloat(strUnformattedValue);
floatValue = floatValue / 100.0;
strUnformattedValue = "" + floatValue;}}
else
{strUnformattedValue = strInternationalFormattedValue;}
return Util.CreateObjUnformatResult(strInternationalFormattedValue, strUnformattedValue, true );};}
function Fill(strSymbol, intCount)
{var strResult = "";
for (var i = 0; i < intCount; i++)
{strResult += strSymbol;}
return strResult;}
function ToFixed(floatValue, intWidth)
{if (isNaN(floatValue))
{return null;}
var boolNegative  = false;
if (floatValue < 0)
{floatValue = -floatValue;
boolNegative  = true;}
var floatFixed = Math.floor(floatValue);
var floatFractional =floatValue - floatFixed;
if ((floatFixed + "").toUpperCase().indexOf("E") != -1)
{return floatValue + "";}
var floatRoundBoundary = ("5" + "E-" + (intWidth+1))*1;
var floatRounded = floatFractional < floatRoundBoundary ? 0 : floatFractional + floatRoundBoundary;
var strFractional;
if (floatRounded >= 1)
{floatFixed = floatFixed+1;
strFractional = Fill("0", intWidth);}
else
{strFractional = (floatRounded + "").toUpperCase();
var exponentPosition = strFractional.indexOf("E-");
if (exponentPosition != -1)
{var exponent = strFractional.substr(exponentPosition + 2) * 1;
strFractional = strFractional.charAt(0) + strFractional.slice(2, exponentPosition);
strFractional = Fill("0", exponent - 1) + strFractional;}
else
{strFractional = strFractional.substr(2);}
if (strFractional.length < intWidth)
{strFractional = strFractional + Fill("0", intWidth - strFractional.length);}
else
{strFractional = strFractional.substr(0, intWidth);}
if (strFractional * 1 == 0 && floatFixed == 0)
{boolNegative = false;}}
var strResult = (boolNegative ? "-" : "") + floatFixed + (intWidth != 0 ? "." : "") + strFractional;
return strResult;}
function ToExponential(floatValue)
{var nState = 0;
var nPower = -1;
var strRunning = "";
var strETail = "";
var strSignPrefix = "";
if (isNaN(floatValue))
{return "NaN";}
if (floatValue == 0)
{return "0e+0";}
if (floatValue < 0)
{strSignPrefix = "-";
floatValue = -floatValue;}
var strValue = floatValue.toString();
for (var nIndex = 0; nIndex < strValue.length; nIndex++)
{var cChar = strValue.charAt(nIndex);
if (cChar == "e" || cChar == "E")
{nState = 2;
strETail = strValue.substr(nIndex + 1);
nPower += parseInt(strETail);
break;}
else if (cChar == ".")
{nState = 1;}
else
{if (nState == 0)
{nPower++;
strRunning = strRunning + cChar;}
else if (nState == 1)
{strRunning = strRunning + cChar;}}}
var nZeroes = 0;
while (nZeroes < strValue.length && strRunning.charAt(nZeroes) == "0")
{nZeroes++;}
nPower -= nZeroes;
var strAfterDot = strRunning.substr(nZeroes + 1);
if (strAfterDot.length > 0 && strAfterDot * 1 == 0)
{strAfterDot = "";}
var strDecimalPart = strAfterDot.length > 0 ? "." + strAfterDot : "";
var strExponentialPart = nPower >= 0 ? "e+" + nPower : "e" + nPower;
return strSignPrefix + strRunning.substr(nZeroes, 1) + strDecimalPart + strExponentialPart;}
function ParseNumber(strValue, strGroupSeparator, strDecimalSeparator)
{var StateNothing = 0;
var StateWhole = 1;
var StateDecimal = 2;
var StateExp = 3;
var StateExpSign = 4;
var strWhole = "";
var strDecimal = "";
var strExp = "";
var valid = true;
var currentCharIndex = 0;
var state = StateNothing;
for (currentCharIndex = 0; valid && currentCharIndex < strValue.length; currentCharIndex ++)
{var currentChar = strValue.charAt(currentCharIndex);
if (currentChar >="0" && currentChar <= "9")
{switch(state)
{case StateNothing:
state = StateWhole;
strWhole = strWhole + currentChar;
break;
case StateWhole:
if (strWhole == "0")
{strWhole = currentChar;}
else
{strWhole = strWhole + currentChar;}
break;
case StateDecimal:
strDecimal = strDecimal + currentChar;
break;
case StateExp:
strExp = strExp + currentChar;
break;
case StateExpSign:
state = StateExp;
strExp = strExp + currentChar;
break;}}
else if (currentChar == strGroupSeparator)
{if (state == StateWhole || state == StateDecimal)
{}
else
{valid = false;}}
else if (currentChar == strDecimalSeparator)
{if (state==StateNothing)
{strWhole = "0";
state = StateDecimal;}
else	if (state == StateWhole)
{state = StateDecimal;}
else
{valid = false;}}
else if (currentChar == "e" || currentChar == "E")
{if (state==StateWhole || state == StateDecimal)
{state = StateExpSign;}
else
{valid = false;}}
else if (currentChar == "+" || currentChar == "-")
{if (state == StateExpSign)
{strExp = strExp + currentChar;
state = StateExp;}
else
{valid = false;}}
else
{valid = false;}}
if (state == StateNothing || state == StateExpSign)
{valid = false;}
if (valid)
{while (strDecimal.length > 1 && strDecimal.substr(strDecimal.length-1, 1) == "0")
{strDecimal = strDecimal.substr(0, strDecimal.length-1);}}
if (valid && strWhole.length > 1 && strExp != "")
{var count = strWhole.length - 1;
strDecimal = strWhole.substr(1) + strDecimal;
strWhole = strWhole.substr(0,1);
strExp = (strExp*1 + count) + "";}
else if (valid && strWhole == "0" && strDecimal != "" && strExp != "")
{var countZero;
for (countZero = 0; countZero < strDecimal.length; countZero ++)
{if (strDecimal.charAt(countZero) != "0")
{break;}}
if (countZero == strDecimal.length)
{valid = false;}
else
{strWhole = strDecimal.substr(countZero, 1);
strDecimal = strDecimal.substr(countZero + 1);
strExp = (strExp*1 - countZero - 1) + "";}}
var strResult;
if (valid)
{strResult = strWhole;
if (strDecimal != "")
{strResult = strResult + "." + strDecimal;}
if (strExp != "")
{strResult = strResult + "E" + strExp;}}
else
{strResult = "";}
return valid ? strResult : null;}
function DoubleFormatting()
{if (!(DoubleFormatting.prototype instanceof DoubleFormattingTraits))
{DoubleFormatting.prototype = new DoubleFormattingTraits();
DoubleFormatting.prototype.constructor = DoubleFormatting;
return new DoubleFormatting();}}
function DoubleFormattingTraits()
{if (!(DoubleFormattingTraits.prototype instanceof NumberFormattingTraits))
{DoubleFormattingTraits.prototype = new NumberFormattingTraits();
DoubleFormattingTraits.prototype.constructor = DoubleFormattingTraits;
return new DoubleFormattingTraits();}
this.Reinit = function(arrFormattingInfo)
{NumberFormatting.InitDerivedObject(this,
DigitSeparator.Parse(arrFormattingInfo[0]) ,
DigitSeparator.Parse(arrFormattingInfo[1]) ,
arrFormattingInfo[2] ,
arrFormattingInfo[3] ,
arrFormattingInfo[4] ,
arrFormattingInfo[5] ,
arrFormattingInfo[6] ,
arrFormattingInfo[7]  );};}
function DateFormatting()
{if (!(DateFormatting.prototype instanceof DateFormattingTraits))
{DateFormatting.prototype = new DateFormattingTraits();
DateFormatting.prototype.constructor = DateFormatting;
return new DateFormatting();}}
DateFormatting.GetCalendarType = DateFormatting_GetCalendarType;
function DateFormatting_GetCalendarType(objCultureInfo, strCultureLCID, boolUseAltCalendar)
{var strCalendarType = null;
var intSPCalendarType = 1 ;
switch (strCultureLCID)
{case "1025":
case "1125":
strCalendarType = "System.Globalization.HijriCalendar";
break;
case "1054":
strCalendarType = "System.Globalization.ThaiBuddhistCalendar";
break;
case "1065":
case "1056":
if (boolUseAltCalendar)
{strCalendarType = "System.Globalization.HijriCalendar";}
break;
case "1041":
if (boolUseAltCalendar)
{strCalendarType = "System.Globalization.JapaneseCalendar";}
break;
case "1042":
if (boolUseAltCalendar)
{strCalendarType = "System.Globalization.KoreanCalendar";}
break;
case "1028":
if (boolUseAltCalendar)
{strCalendarType = "System.Globalization.TaiwanCalendar";}
break;}
if (boolUseAltCalendar && strCultureLCID != "1025" && objCultureInfo.k_strLanguage.toLowerCase() == "ar")
{strCalendarType = "System.Globalization.HijriCalendar";}
if (strCalendarType == null)
{strCalendarType = objCultureInfo.CalendarType;}
try
{intSPCalendarType = IP_DatePicker.SPCalendarType[strCalendarType];}
catch(e)
{;
intSPCalendarType = 1 ;}
return intSPCalendarType;}
function DateFormatting_DefaultCultureObject()
{return eval("dateTime" + (CurrentFormData.DefaultLcid()* 1));}
function DateFormatting_GetDateFormat(objCultureInfo, strId)
{if (strId.length == 1)
{var intId = strId - "0";
if (intId >= 0 && intId < 9)
{switch (intId)
{case 0:
return objCultureInfo.formatShortDate;
case 1:
return objCultureInfo.formatLongDate;
case 2:
return objCultureInfo.formatMonthYear;
case 7:
return objCultureInfo.formatShortTime;
case 8:
return objCultureInfo.formatLongTime;}}}
;
return strId;}
function DateFormattingTraits()
{this.getFormattingType = function()
{return 1;}
this.k_objDynamicFormatMap = new Array(
{objFriendlyRE: /MMMM/,
objFormatFn: DateUtils.GetMonthAsLongTextual},
{objFriendlyRE: /MMM/,
objFormatFn: DateUtils.GetMonthAsShortTextual},
{objFriendlyRE: /MM/,
objFormatFn: DateUtils.GetMonthAsLongNumeric},
{objFriendlyRE: /M/,
objFormatFn: DateUtils.GetMonthAsShortNumeric},
{objFriendlyRE: /dddd/,
objFormatFn: DateUtils.GetDayOfWeek},
{objFriendlyRE: /ddd/,
objFormatFn: DateUtils.GetDayOfWeekAsShortTextual},
{objFriendlyRE: /dd/,
objFormatFn: DateUtils.GetDayAsLongNumeric},
{objFriendlyRE: /d/,
objFormatFn: DateUtils.GetDayAsShortNumeric},
{objFriendlyRE: /yyyy/,
objFormatFn: DateUtils.GetYearAsLongNumeric},
{objFriendlyRE: /yy/,
objFormatFn: DateUtils.GetYearAsShortNumeric},
{objFriendlyRE: /y/,
objFormatFn: DateUtils.GetYearAsShorterNumeric},
{objFriendlyRE: /gg/,
objFormatFn: DateUtils.GetEra},
{objFriendlyRE: /hh/,
objFormatFn: DateUtils.GetHoursAsLongNumeric12},
{objFriendlyRE: /h/,
objFormatFn: DateUtils.GetHoursAsShortNumeric12},
{objFriendlyRE: /HH/,
objFormatFn: DateUtils.GetHoursAsLongNumeric24},
{objFriendlyRE: /H/,
objFormatFn: DateUtils.GetHoursAsShortNumeric24},
{objFriendlyRE: /mm/,
objFormatFn: DateUtils.GetMinutesAsLongNumeric},
{objFriendlyRE: /m/,
objFormatFn: DateUtils.GetMinutesAsShortNumeric},
{objFriendlyRE: /ss/,
objFormatFn: DateUtils.GetSecondsAsLongNumeric},
{objFriendlyRE: /s/,
objFormatFn: DateUtils.GetSecondsAsShortNumeric},
{objFriendlyRE: /tt/,
objFormatFn: DateUtils.GetAMPM},
{objFriendlyRE: /t/,
objFormatFn: DateUtils.GetAMPMFirstChar}
);
this.k_intModeUnknown = -1;
this.k_intModeDate = 1;
this.k_intModeTime = 2;
this.k_intModeDateTime = 3;
this.k_intModeNoformatting = 4;
this.k_intDateFormatTypeCustom = 3;
this.k_intDateFormatTypeNone = 4;
this.k_intTimeFormatTypeCustom = 2;
this.k_intTimeFormatTypeNone = 3;
this.Reinit = DateFormattingTraits_Reinit;
function DateFormattingTraits_Reinit(arrFormattingInfo)
{var objCultureInfo;
if (arrFormattingInfo[0] == false)
{objCultureInfo = DateFormatting_DefaultCultureObject();}
else
{objCultureInfo = arrFormattingInfo[0];}
var strDisplayFormat = arrFormattingInfo[1];
if (strDisplayFormat != null && strDisplayFormat.length > 2)
{this._objCultureInfo = objCultureInfo;
this._strDisplayFormat = strDisplayFormat.substr(2, strDisplayFormat.length);
if (this._strDisplayFormat.length == 1)
{this._strDisplayFormat = DateFormatting_GetDateFormat(objCultureInfo, this._strDisplayFormat);}
this._intMode = parseInt(strDisplayFormat.substr(0, 1), 10);
this._intDateFormatType = arrFormattingInfo[2];
this._intTimeFormatType = arrFormattingInfo[3];
this._boolUseAltCalendar = arrFormattingInfo[4];
this._boolEnglishStringsAlways = arrFormattingInfo[5];}
else
{this._objCultureInfo = null;
this._strDisplayFormat = "";
this._intMode = this.k_intModeUnknown;
this._intDateFormatType = this.k_intDateFormatTypeCustom;
this._intTimeFormatType = this.k_intTimeFormatTypeCustom;
this._boolUseAltCalendar = false;
this._boolEnglishStringsAlways = false;}
this.GenerateDisplayFormatMaps();};
this.GenerateDisplayFormatMaps = DateFormatting_GenerateDisplayFormatMaps;
function DateFormatting_GenerateDisplayFormatMaps()
{this._objLiteralFormatMap = new Array();
var strFormatOld = this._strDisplayFormat;
var strFormatNew = new Array();
var reLiteralStrip = new RegExp("^((?:\\\\'|\\\\\\\\|[^'\\\\])*)(?:'((?:\\\\'|\\\\\\\\|[^'\\\\])*)')");
var objMatch = reLiteralStrip.exec(strFormatOld);
while (objMatch != null && objMatch.lastIndex > 0)
{strFormatNew.push(objMatch[1]);
strFormatNew.push("<L:");
strFormatNew.push(this._objLiteralFormatMap.length);
strFormatNew.push(">");
this._objLiteralFormatMap[this._objLiteralFormatMap.length] = objMatch[2];
strFormatOld = strFormatOld.substring(objMatch.lastIndex);
objMatch = reLiteralStrip.exec(strFormatOld);}
this._strFormatMap = strFormatNew.join("") + strFormatOld;
for (var varIndex in this.k_objDynamicFormatMap)
{this._strFormatMap = this._strFormatMap.replace(this.k_objDynamicFormatMap[varIndex].objFriendlyRE,
"<D:" + varIndex + ">");}}
this.CultureInfo = DateFormatting_CultureInfo;
function DateFormatting_CultureInfo()
{return this._objCultureInfo;}
this.Mode = DateFormatting_Mode;
function DateFormatting_Mode()
{return this._intMode;}
this.IsUseGenitiveForm = DateFormatting_IsUseGenitiveForm;
function DateFormatting_IsUseGenitiveForm(strFormat)
{var intStartIndex = 0;
var intCurrentIndex = 0;
var charPatternToMatch = 'd';
var intRepeat = 0;
for (intCurrentIndex = intStartIndex; intCurrentIndex < strFormat.length; intCurrentIndex++)
{if (strFormat.charAt(intCurrentIndex) == charPatternToMatch)
{break;}}
while (
intCurrentIndex < strFormat.length &&
strFormat.charAt(intCurrentIndex) == charPatternToMatch)
{intRepeat++;
intCurrentIndex++;}
return intRepeat == 1 || intRepeat == 2;}
this.DateFormatType = DateFormatting_DateFormatType;
function DateFormatting_DateFormatType()
{return this._intDateFormatType;}
this.TimeFormatType = DateFormatting_TimeFormatType;
function DateFormatting_TimeFormatType()
{return this._intTimeFormatType;}
this.Format = DateFormatting_Format;
function DateFormatting_Format(
strUnformattedValue)
{if (this.CultureInfo() == null || this.Mode() == -1)
{return strUnformattedValue;}
if (this.Mode() == this.k_intModeNoFormatting)
{return strUnformattedValue;}
if (DateFormatting.GetCalendarType(this._objCultureInfo, this._objCultureInfo.Lcid, this._boolUseAltCalendar) != 1 )
{return strUnformattedValue;}
var objDateTime = this.UnformatIso8601(strUnformattedValue, this.Mode());
if (objDateTime == null)
{return strUnformattedValue;}
objDateTime = DateUtils.ConvertToLocalTime(objDateTime);
var boolUseGenitiveMonthForm = this.IsUseGenitiveForm(this._strDisplayFormat);
var strFormattedValue = this._strFormatMap;
for (var varIndex in this.k_objDynamicFormatMap)
{strFormattedValue = strFormattedValue.replace(new RegExp("<D:" + varIndex + ">"),
this.k_objDynamicFormatMap[varIndex].objFormatFn(this.CultureInfo(), objDateTime, boolUseGenitiveMonthForm));}
for (var varIndex in this._objLiteralFormatMap)
{strFormattedValue = strFormattedValue.replace(new RegExp("<L:" + varIndex + ">"),
this._objLiteralFormatMap[varIndex]);}
return strFormattedValue;};
this.Unformat = DateFormatting_Unformat;
function DateFormatting_Unformat(
strInternationalFormattedValue)
{if (this.CultureInfo() == null || this.Mode() == -1)
{return Util.CreateObjUnformatResult(strInternationalFormattedValue, strInternationalFormattedValue, false);}
if (this.Mode() == this.k_intModeNoFormatting)
{return Util.CreateObjUnformatResult(strInternationalFormattedValue, strInternationalFormattedValue, false);}
if (DateFormatting.GetCalendarType(this._objCultureInfo, this._objCultureInfo.Lcid, this._boolUseAltCalendar) != 1
&& this.Mode() != this.k_intModeTime)
{return Util.CreateObjUnformatResult(strInternationalFormattedValue, strInternationalFormattedValue, false);}
var strFormattedValue = Util.ReplaceNonLatinDigitsAndPunctuation(strInternationalFormattedValue);
var objDate = null;
var objTime = null;
if (this.Mode() == this.k_intModeDate || (this.Mode() == this.k_intModeDateTime && this.DateFormatType() != this.k_intDateFormatTypeNone))
{objDate = this.UnformatIso8601(strFormattedValue, this.k_intModeDate);
if (objDate == null)
{objDate = this.UnformatDate(strFormattedValue);}}
else if (this.Mode() == this.k_intModeTime  || (this.Mode() == this.k_intModeDateTime && this.TimeFormatType() != this.k_intTimeFormatTypeNone))
{objTime = this.UnformatTime(strFormattedValue);
if (objTime == null)
{objTime = this.UnformatIso8601(strFormattedValue, this.k_intModeTime);}}
else
{return Util.CreateObjUnformatResult(strInternationalFormattedValue, strInternationalFormattedValue, false);}
var objDateTime = Util.CreateDefaultObjDateTime();
if (objDate != null)
{Util.MergeDateIntoDateTime(objDate, objDateTime);}
else if (objTime != null)
{Util.MergeTimeIntoDateTime(objTime, objDateTime);}
else
{objDateTime = null;}
var strUnformattedValue = this.UnformatFromDateTime(objDateTime, this.Mode(), strInternationalFormattedValue);
return Util.CreateObjUnformatResult(strInternationalFormattedValue, strUnformattedValue, true);};
this.UnformatFromDateTime = DateFormatting_UnformatFromDateTime;
function DateFormatting_UnformatFromDateTime(
objDateTime,
intMode,
strFormattedValue)
{var strUnformattedValue = "";
if (objDateTime == null)
{strUnformattedValue = strFormattedValue;}
else
{switch(intMode)
{case this.k_intModeDate:
strUnformattedValue =
DateUtils.GetYearAsLongNumeric(this.CultureInfo(), objDateTime) +
"-"+ DateUtils.GetMonthAsLongNumeric(this.CultureInfo(), objDateTime) +
"-"+ DateUtils.GetDayAsLongNumeric(this.CultureInfo(), objDateTime);
break;
case this.k_intModeTime:
strUnformattedValue =
DateUtils.GetHoursAsLongNumeric24(this.CultureInfo(), objDateTime) +
":"+ DateUtils.GetMinutesAsLongNumeric(this.CultureInfo(), objDateTime) +
":"+ DateUtils.GetSecondsAsLongNumeric(this.CultureInfo(), objDateTime);
if (Util.IsNonEmptyString(objDateTime.strTZOffset))
{strUnformattedValue += objDateTime.strTZOffset;}
break;
case this.k_intModeDateTime:
strUnformattedValue =
DateUtils.GetYearAsLongNumeric(this.CultureInfo(), objDateTime) +
"-"+ DateUtils.GetMonthAsLongNumeric(this.CultureInfo(), objDateTime) +
"-"+ DateUtils.GetDayAsLongNumeric(this.CultureInfo(), objDateTime) +
"T" +
DateUtils.GetHoursAsLongNumeric24(this.CultureInfo(), objDateTime) +
":"+ DateUtils.GetMinutesAsLongNumeric(this.CultureInfo(), objDateTime) +
":"+ DateUtils.GetSecondsAsLongNumeric(this.CultureInfo(), objDateTime);
if (Util.IsNonEmptyString(objDateTime.strTZOffset))
{strUnformattedValue += objDateTime.strTZOffset;}
break;
default:
strUnformattedValue = strFormattedValue;
break;}}
return strUnformattedValue;};
this.IsWeekDayName = DateFormatting_IsWeekDayName;
function DateFormatting_IsWeekDayName(strValue)
{var reDay = new RegExp("^(?:" + this.CultureInfo().k_objAnyNamesOfDays + ")$");
return reDay.exec(strValue) != null;}
this.IsMonthName = DateFormatting_IsMonthName;
function DateFormatting_IsMonthName(strValue)
{return (DateUtils.ParseMonth(this.CultureInfo(), strValue) != -1) && ((strValue*1)!=strValue);}
this.UnformatIso8601 = DateFormatting_UnformatIso8601;
function DateFormatting_UnformatIso8601(
strFormattedValue,
intMode)
{var objMatches = null;
var objDateTime = new Object();
switch(intMode)
{case this.k_intModeDate:
objMatches = DateUtils.k_objREIsoDate.exec(strFormattedValue);
if (objMatches == null)
{return null;}
;
objDateTime = Util.CreateObjDateTime(parseInt(objMatches[1], 10), parseInt(objMatches[2], 10),
parseInt(objMatches[3], 10), 0, 0, 0, 0, objMatches[4]);
break;
case this.k_intModeTime:
objMatches = DateUtils.k_objREIsoTime.exec(strFormattedValue);
if (objMatches == null)
{return null;}
;
objDateTime = Util.CreateObjDateTime(0, 0, 0, parseInt(objMatches[1], 10), parseInt(objMatches[2], 10),
parseInt(objMatches[3], 10), parseInt(objMatches[4], 10), objMatches[5]);
break;
case this.k_intModeDateTime:
objMatches = DateUtils.k_objREIsoDateTime.exec(strFormattedValue);
if (objMatches == null)
{return null;}
;
objDateTime = Util.CreateObjDateTime(parseInt(objMatches[1], 10), parseInt(objMatches[2], 10),
parseInt(objMatches[3], 10), parseInt(objMatches[4], 10), parseInt(objMatches[5], 10),
parseInt(objMatches[6], 10), parseInt(objMatches[7], 10), objMatches[8]);
break;
case this.k_intModeUnknown:
return null;
default:
;
return null;}
return objDateTime;}
this.TrimIgnorableSubstrings = DateFormatting_TrimIgnorableSubstrings;
function DateFormatting_TrimIgnorableSubstrings(
strPart)
{for (var i = 0; i < this.CultureInfo().k_arrIgnorableStrings.length; i++)
{var strIgnorable = Util.RegExpEscape(this.CultureInfo().k_arrIgnorableStrings[i]);
var reSubstring = RegExp("^\\s*(?:" + strIgnorable + "(.+)|(.+)" + strIgnorable + ")\\s*$");
var objMatch = reSubstring.exec(strPart);
if (objMatch != null)
{strPart = (objMatch[1] == "") ? objMatch[2] : objMatch[1];}}
return strPart;}
this.UnformatDate = DateFormatting_UnformatDate;
function DateFormatting_UnformatDate(
strFormattedValue)
{if (this.CultureInfo() == null || this.Mode() == this.k_intModeUnknown)
{return strFormattedValue;}
if (this.Mode() == this.k_intModeNoFormatting)
{return strFormattedValue;}
strFormattedValue = Util.Trim(strFormattedValue);
var reSeparators = new RegExp("\\s*[\\\\,/\\s.-]\\s*");
var strText = strFormattedValue;
var arrSplitParts = new Array();
while (strText.length > 0)
{var objMatch = strText.match(reSeparators);
var strMatched = "";
if (objMatch == null)
{strMatched = strText;
strText = "";}
else if (objMatch.index > 0)
{strMatched = strText.substr(0, objMatch.index);
var intLastIndex = objMatch.index + objMatch[0].length;
strText = strText.substring(intLastIndex, strText.length);}
else
{return null;}
var regexEastAsian = new RegExp("^\\s*0?(\\d+[^\\d\\s]+)");
var objEastAsianMatches = regexEastAsian.exec(strMatched);
while (objEastAsianMatches != null)
{arrSplitParts.push(objEastAsianMatches[1]);
strMatched = strMatched.substring(objEastAsianMatches[0].length, strMatched.length);
objEastAsianMatches = regexEastAsian.exec(strMatched);}
if (strMatched != "")
{arrSplitParts.push(strMatched);}}
var objDate = Util.CreateDefaultObjDateTime();
var boolFoundDay = false;
var boolFoundMonth = false;
var boolFoundYear = false;
var intPosDay = this.CultureInfo().k_objDateInfo[0].intDay;
var intPosMonth = this.CultureInfo().k_objDateInfo[0].intMonth;
var intPosYear = this.CultureInfo().k_objDateInfo[0].intYear;
var boolYearBeforeDayMonth = intPosYear < intPosMonth;
var boolMonthFirst = intPosMonth < intPosDay;
var boolDayInMiddle = ( (intPosYear < intPosDay && intPosMonth > intPosDay) ||
(intPosYear > intPosDay && intPosMonth < intPosDay) );
for (var index = 0; index < arrSplitParts.length; index++)
{var strPart = arrSplitParts[index];
var strStripped = this.TrimIgnorableSubstrings(strPart);
if (!boolFoundMonth && this.IsMonthName(strPart))
{objDate.intMonth = DateUtils.ParseMonth(this.CultureInfo(), strPart);
arrSplitParts[index] = "month";
boolFoundMonth = true;
continue;}
if (Util.FindObjectInArray(strPart, this.CultureInfo().k_arrIgnorableStrings) >= 0
|| this.IsWeekDayName(strPart) || this.IsWeekDayName(strStripped))
{arrSplitParts[index] = null;
continue;}
strPart = arrSplitParts[index] = strStripped;
var reNumber = new RegExp("^[0-9]*$");
var intValue = parseInt(strPart, 10);
if (isNaN(intValue) || reNumber.exec(strPart) == null)
{if (!boolFoundMonth)
{if (this.IsMonthName(strPart))
{objDate.intMonth = DateUtils.ParseMonth(this.CultureInfo(), strPart);
arrSplitParts[index] = "month";
boolFoundMonth = true;
continue;}
else if (this.IsMonthName(strPart + "."))
{objDate.intMonth = DateUtils.ParseMonth(this.CultureInfo(), strPart + ".");
arrSplitParts[index] = "month";
boolFoundMonth = true;
continue;}}
return null;}
if (intValue > 31)
{objDate.intYear = DateUtils.ParseYear(this.CultureInfo(), intValue);
arrSplitParts[index] = "year";
boolFoundYear = true;
continue;}
if (intValue < 1)
{return null;}
arrSplitParts[index] = intValue;}
var boolFoundMonthFromString = boolFoundMonth;
for (var index = 0; index < arrSplitParts.length; index++)
{var intValue = arrSplitParts[index];
if (typeof(intValue) != "number")
{continue;}
if (!boolFoundYear &&
(intValue > 31 || boolYearBeforeDayMonth || (boolFoundDay && boolFoundMonth)))
{objDate.intYear = DateUtils.ParseYear(this.CultureInfo(), intValue);
arrSplitParts[index] = "year";
boolFoundYear = true;}
else if (!boolFoundMonth &&
(boolMonthFirst || boolFoundDay))
{objDate.intMonth = intValue;
arrSplitParts[index] = "month";
boolFoundMonth = true;}
else if (!boolFoundDay)
{objDate.intDay = intValue;
arrSplitParts[index] = "day";
boolFoundDay = true;}
else
{return null;}}
var intPosFoundDay = Util.FindObjectInArray("day", arrSplitParts);
var intPosFoundMonth = Util.FindObjectInArray("month", arrSplitParts);
var intPosFoundYear = Util.FindObjectInArray("year", arrSplitParts);
if (boolFoundDay && boolFoundMonth && boolFoundYear && !boolDayInMiddle && !boolFoundMonthFromString &&
((intPosFoundDay > intPosFoundYear && intPosFoundDay < intPosFoundMonth)
|| (intPosFoundDay < intPosFoundYear && intPosFoundDay > intPosFoundMonth)))
{var intTemp = objDate.intMonth;
objDate.intMonth = objDate.intDay;
objDate.intDay = intTemp;}
if (boolFoundDay && boolFoundMonth && boolFoundYear)
{}
else if (!boolFoundDay && boolFoundMonth && boolFoundYear)
{objDate.intDay = 1;}
else if (boolFoundDay && boolFoundMonth && !boolFoundYear)
{}
else
{objDate = null;}
if (objDate != null && objDate.intYear == 0)
{objDate = null;}
if (objDate != null && !this.IsDateValidDate(objDate))
{objDate = null;}
return objDate;}
this.IsDateValidDate = DateFormatting_IsDateValidDate;
function DateFormatting_IsDateValidDate(objDateTime)
{var dateDay = new Date(objDateTime.intYear, objDateTime.intMonth -1, objDateTime.intDay, 1, 10, 0);
var boolResult =
objDateTime.intYear == dateDay.getFullYear() &&
objDateTime.intMonth == dateDay.getMonth() + 1 &&
objDateTime.intDay == dateDay.getDate();
return boolResult;}
this.UnformatTime = DateFormatting_UnformatTime;
function DateFormatting_UnformatTime(
strFormattedValue)
{var timeRegExp = new RegExp("^\\s*" + this.CultureInfo().k_strUnformatTime.strRegExp + "\\s*$");
var objMatches = timeRegExp.exec(strFormattedValue);
if (objMatches == null)
{strFormattedValue = this.TrimIgnorableSubstrings(strFormattedValue);
objMatches = timeRegExp.exec(strFormattedValue);}
if (objMatches == null)
{return null;}
if (objMatches.length != 5)
{;
return null;}
var objTime = Util.CreateDefaultObjDateTime();
objTime.intHours = parseInt(objMatches[this.CultureInfo().k_strUnformatTime.intHours], 10);
var minutes = parseInt(objMatches[this.CultureInfo().k_strUnformatTime.intMinutes], 10);
objTime.intMinutes = isNaN(minutes) ? 0 : minutes;
var seconds = parseInt(objMatches[this.CultureInfo().k_strUnformatTime.intSeconds], 10);
objTime.intSeconds = isNaN(seconds) ? 0 : seconds;
var strAMPM = objMatches[this.CultureInfo().k_strUnformatTime.intAMPM];
if (Util.IsNonEmptyString(strAMPM))
{strAMPM = strAMPM.toUpperCase();
if (strAMPM == this.CultureInfo().PMDesignator.toUpperCase() && objTime.intHours >= 0 && objTime.intHours < 24)
{objTime.intHours = objTime.intHours >= 12 ? objTime.intHours : objTime.intHours + 12;}
else if (strAMPM == this.CultureInfo().AMDesignator.toUpperCase() && objTime.intHours >= 0 && objTime.intHours < 24)
{objTime.intHours = objTime.intHours == 12 ? 0 : objTime.intHours;}
else
{objTime = null;}}
return objTime;};
this.IsISO8601DateTimeString = DateFormatting_IsISO8601DateTimeString;
function DateFormatting_IsISO8601DateTimeString(
strDateTime)
{var objMatches = DateUtils.k_objREIsoDateTime.exec(strDateTime);
return (objMatches != null);}}
function EventLogStaticData(boolIsDocumentClosed)
{if (!(EventLogStaticData.prototype instanceof EventLogStaticDataTraits))
{EventLogStaticData.prototype = new EventLogStaticDataTraits();
EventLogStaticData.prototype.constructor = EventLogStaticData;
return new EventLogStaticData(boolIsDocumentClosed);}
this.PostbackCounter = CurrentFormData.PostbackCounter();
this.EditingSessionId = CurrentFormData.EditingSessionId();
this.SolutionId = CurrentFormData.SolutionId();
this.LoadedFromXmlDocument = CurrentFormData.LoadedFromXmlDocument();
this.XmlLocation = encodeURIComponent(CurrentFormData.XmlLocation());
this.XsnLocation = encodeURIComponent(CurrentFormData.XsnLocation());
this.AbsoluteSolutionLocation = encodeURIComponent(CurrentFormData.AbsoluteSolutionLocation());
this.SaveLocation = encodeURIComponent(CurrentFormData.SaveLocation());
this.WebUrl = encodeURIComponent(CurrentFormData.GetWebUrl());
this.UrlToNavigateToOnClose = encodeURIComponent(CurrentFormData.UrlToNavigateToOnClose());
this.IsNew = CurrentFormData.IsNew() ? "1" : "0";
this.IsHosted = CurrentFormData.IsHosted() ? "1" : "0";
this.IsDocumentClosed = (boolIsDocumentClosed == true) ? "1" : "0";
this.PostbackReason = 0;
this.PostbackType = 0;
this.CreationTime = CurrentFormData.CreationTime();
this.SessionState = CurrentFormData.SessionState();
this.CanaryValue = CurrentFormData.CanaryValue();}
function EventLogStaticDataTraits()
{this.CreateEventLogStartEntry = function()
{var arrEventInfoArray = new Array();
arrEventInfoArray.push(8);
arrEventInfoArray.push(this.PostbackCounter);
arrEventInfoArray.push(this.EditingSessionId);
arrEventInfoArray.push(this.SolutionId);
arrEventInfoArray.push(this.LoadedFromXmlDocument);
arrEventInfoArray.push(this.XmlLocation);
arrEventInfoArray.push(this.XsnLocation);
arrEventInfoArray.push(this.AbsoluteSolutionLocation);
arrEventInfoArray.push(this.SaveLocation);
arrEventInfoArray.push(this.WebUrl);
arrEventInfoArray.push(this.UrlToNavigateToOnClose);
arrEventInfoArray.push(this.IsNew);
arrEventInfoArray.push(this.IsHosted);
arrEventInfoArray.push(this.IsDocumentClosed);
arrEventInfoArray.push(this.PostbackReason);
arrEventInfoArray.push(this.PostbackType);
arrEventInfoArray.push(this.CreationTime);
arrEventInfoArray.push(this.SessionState);
arrEventInfoArray.push(this.CanaryValue);
;
return arrEventInfoArray.join(";");};
this.UpdateForCachedEventLogValue = function(strEventLog)
{var arrEvents = strEventLog.split(' ');
if (arrEvents.length > 0)
{var arrStartEvent = arrEvents[0];
var arrParams = arrStartEvent.split(';');
if (arrParams.length > 1 && arrParams[0] == 8)
{;
this.PostbackCounter = arrParams[1];}}};}
function EventLog() {}
EventLog.k_intEventIDClose = 15;
EventLog.k_intEventIDCancelClose = 16;
EventLog.objStaticData = null;
EventLog.k_arrEvents = new Array(
"Change",
"Click",
"xCollection::insertBefore",
"xCollection::insertAfter",
"xCollection::remove",
"xCollection::removeAll",
"xOptional::insert",
"xOptional::remove",
"StartEventLog",
"Submit",
"EndSessionAndRedirect",
"SwitchView",
"RichTextChange",
"ShowDialog",
"Save",
"Close",
"CancelClose",
"DeleteSignature",
"ContactPickerChange",
"Print"
);
function EventLog_AddVerificationEvent(
intEventID,
objControl,
strEventSourceID1,
strEventSourceID2,
strEventResult)
{EventLog_AddPrivate(
intEventID,
objControl,
strEventSourceID1,
strEventSourceID2,
strEventResult,
false );}
function EventLog_Add(
intEventID,
objControl,
strEventSourceID1,
strEventSourceID2,
strEventResult,
boolMustRoundTrip,
boolAllowAddDuringPostback,
boolForceFullPostback,
nPostbackReason,
nPostbackType)
{EventLog_AddPrivate(
intEventID,
objControl,
strEventSourceID1,
strEventSourceID2,
strEventResult,
boolAllowAddDuringPostback);
if (EventLog.CanAddEntry(boolAllowAddDuringPostback))
{var boolDoNotHandleException = intEventID == 20;
return EventLog_PostBackIfImplicitRoundTrip(objControl, boolMustRoundTrip, boolForceFullPostback, nPostbackReason, nPostbackType, boolDoNotHandleException);}
return true;}
function EventLog_AddPrivate(
intEventID,
objControl,
strEventSourceID1,
strEventSourceID2,
strEventResult,
boolAllowAddDuringPostback)
{if (EventLog.CanAddEntry(boolAllowAddDuringPostback))
{var arrEventInfoArray = new Array();
arrEventInfoArray.push(intEventID);
arrEventInfoArray.push(encodeURIComponent(strEventSourceID1));
arrEventInfoArray.push(encodeURIComponent(strEventSourceID2));
arrEventInfoArray.push(encodeURIComponent(strEventResult));
var strEventInfo = arrEventInfoArray.join(";");
var arrEventLog = EventLog_Deserialize();
arrEventLog.push(strEventInfo);
EventLog_Serialize(arrEventLog);}}
function EventLog_Initialize(boolIsDocumentClosed)
{EventLog.objStaticData = new EventLogStaticData(boolIsDocumentClosed);
EventLog_Serialize(new Array());}
function EventLog_Serialize(arrEventLog)
{var strAllEventInfo = arrEventLog.join(" ") + " ";
document.getElementById("__EventLog").value = strAllEventInfo;}
function EventLog_Deserialize()
{var strAllEventInfo = document.getElementById("__EventLog").value;
var arrEventLog = strAllEventInfo.split(' ');
arrEventLog.pop();
return arrEventLog;}
EventLog.CanAddEntry = function(boolAllowAddDuringPostback)
{return (boolAllowAddDuringPostback ||
(!Dialog.DialogPresent() && PostbackBody.intPostbacksInProgress == 0));}
function EventLog_PostBackIfImplicitRoundTrip(
objControl,
boolMustRoundTrip,
boolForceFullPostback,
nPostbackReason,
nPostbackType,
boolDoNotHandleException)
{var boolTriggerPostback = false;
var objSnippetElement = null;
if (boolMustRoundTrip)
{boolTriggerPostback = true;}
else
{if (objControl != null)
{objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
if (BaseControl.RequiresImplicitRoundTrip(objSnippetElement))
{boolTriggerPostback = true;}}}
if (boolTriggerPostback)
{var nActualPostbackReason = nPostbackReason;
if (!boolMustRoundTrip && objSnippetElement != null)
{nActualPostbackReason = Snippet.GetPostbackReason(objSnippetElement);}
View_SubmitForm(boolForceFullPostback, nActualPostbackReason, nPostbackType, boolDoNotHandleException);
return false;}
return true;}
function EventLog_EnsureEventLogStartEntry()
{if (EventLog.objStaticData == null)
{EventLog_Initialize(false);}
var arrEventLog = null;
var strEventLogStartEntry = EventLog.objStaticData.CreateEventLogStartEntry();
if (!EventLog.IsEmpty())
{arrEventLog = EventLog_Deserialize();
arrEventLog[0] = strEventLogStartEntry;}
else
{arrEventLog = new Array();
arrEventLog.push(strEventLogStartEntry);}
EventLog_Serialize(arrEventLog);}
EventLog.Count = function()
{var count = 0;
if (!EventLog.IsEmpty())
{var arrEventLog = EventLog_Deserialize();
count = arrEventLog.length;}
return count;}
EventLog.Value = function()
{var eventLogField = document.getElementById("__EventLog");
if (eventLogField != null)
{return eventLogField.value;}
else
{return null;}}
EventLog.SetValue = function(strEventLog)
{var eventLogField = document.getElementById("__EventLog");
;
eventLogField.value = strEventLog;}
EventLog.IsEmpty = function()
{var eventLogFieldValue = EventLog.Value();
return (Util.IsNullOrEmptyString(eventLogFieldValue) || eventLogFieldValue == " ");}
function SelectionService() {}
SelectionService.objSelectedControl = null;
SelectionService.arrStickyHighlightControls = new Array();
SelectionService.arrNonStickyHighlightControls = new Array();
SelectionService.IsSelected = SelectionService_IsSelected;
function SelectionService_IsSelected(objControl)
{;
if (SelectionService.GetSelectedControl() == null)
{return false;}
else
{return objControl.id == SelectionService.GetSelectedControl().id;}}
SelectionService.SelectId = SelectionService_SelectId;
function SelectionService_SelectId(strControlId)
{var objControl = document.getElementById(strControlId);
if (objControl != null)
{SelectionService.Select(objControl);}};
SelectionService.Select = SelectionService_Select;
function SelectionService_Select(objControl)
{;
var objNewSelection;
if (HoverMenu.isVisible)
{HoverMenu.HideMenu();
SelectionService.RemoveAllNonStickyHighlight();}
if (SelectionService.GetSelectedControl() != null)
{if (objControl != null && SelectionService.GetSelectedControl() == objControl)
return;
SelectionService._Select(SelectionService.GetSelectedControl(), false);}
if (objControl != null)
{SelectionService._Select(objControl, true);}
;}
SelectionService.GetHighlightState = SelectionService_GetHighlightState;
function SelectionService_GetHighlightState(objControl)
{;
var boolInStickyHighlightArray = Util.FindObjectInArray(objControl.id, SelectionService.arrStickyHighlightControls) >= 0;
var boolInNonStickyHighlightArray = Util.FindObjectInArray(objControl.id, SelectionService.arrNonStickyHighlightControls) >= 0;
if (boolInStickyHighlightArray && !boolInNonStickyHighlightArray)
{return 1;}
else if (!boolInStickyHighlightArray && boolInNonStickyHighlightArray)
{return 2;}
else if (boolInStickyHighlightArray && boolInNonStickyHighlightArray)
{return 3;}
else
{return 0;}}
SelectionService.IsHoverInState = SelectionService_IsHoverInState;
function SelectionService_IsHoverInState(intState)
{return (intState == 2 || intState == 3)}
SelectionService.IsIpInState = SelectionService_IsIPInState;
function SelectionService_IsIPInState(intState)
{return (intState == 1 || intState == 3)}
SelectionService.GetSelectedControl = SelectionService_GetSelectedControl;
function SelectionService_GetSelectedControl()
{return SelectionService.objSelectedControl;}
SelectionService.Highlight = SelectionService_Highlight;
function SelectionService_Highlight(objControl, boolSticky, boolPreserveCurrentHighlight)
{var strHoverClass;
if (objControl == null)
{return;}
if (HoverMenu.strVisibleMenuID != null)
{return;}
;
;
if (boolSticky && !boolPreserveCurrentHighlight)
{SelectionService.RemoveAllStickyHighlightExcept(objControl);
;}
else if (!boolSticky && !boolPreserveCurrentHighlight)
{SelectionService.RemoveAllNonStickyHighlightExcept(objControl);
;}
var funcHighLight = BaseControl.FindFunction(objControl, "Highlight", true );
if (boolSticky && Util.FindObjectInArray(objControl.id, SelectionService.arrStickyHighlightControls) == -1)
{SelectionService.arrStickyHighlightControls.push(objControl.id);
funcHighLight(objControl, boolSticky);
;}
else if (!boolSticky &&  Util.FindObjectInArray(objControl.id, SelectionService.arrNonStickyHighlightControls) == -1)
{SelectionService.arrNonStickyHighlightControls.push(objControl.id);
funcHighLight(objControl, boolSticky);
;}
else
{}
BaseControl.RefreshVisualState(objControl);}
SelectionService.RemoveHighlight = SelectionService_RemoveHighlight;
function SelectionService_RemoveHighlight(objControl, boolSticky)
{var strDefaultClass;
if (objControl == null || objControl.parentNode == null)
{return;}
if (HoverMenu.strVisibleMenuID != null)
{return;}
if (boolSticky && SelectionService.GetSelectedControl() != null && objControl.id == SelectionService.GetSelectedControl().id)
{return;}
var intIndexInStickyHighlightArray = Util.FindObjectInArray(objControl.id, SelectionService.arrStickyHighlightControls);
var intIndexInNonStickyHighlightArray = Util.FindObjectInArray(objControl.id, SelectionService.arrNonStickyHighlightControls);
;
;
var funcRemoveHighlight = BaseControl.FindFunction(objControl, "RemoveHighlight", true );
if (!boolSticky && intIndexInNonStickyHighlightArray >= 0)
{SelectionService.arrNonStickyHighlightControls[intIndexInNonStickyHighlightArray] = null;
funcRemoveHighlight(objControl, boolSticky);
;}
else if (boolSticky && intIndexInStickyHighlightArray >= 0)
{SelectionService.arrStickyHighlightControls[intIndexInStickyHighlightArray] = null;
funcRemoveHighlight(objControl, boolSticky);
;}
BaseControl.RefreshVisualState(objControl);}
SelectionService.RemoveAllStickyHighlightExcept = SelectionService_RemoveAllStickyHighlightExcept;
function SelectionService_RemoveAllStickyHighlightExcept(objControl)
{var strExcludeID = "";
if (objControl != null)
{strExcludeID = objControl.id;}
for (var i = 0; i < SelectionService.arrStickyHighlightControls.length; i++)
{var strID = SelectionService.arrStickyHighlightControls[i];
if (strID == null || strID == strExcludeID)
{continue;}
var objObject = document.getElementById(strID);
if (objObject != null)
{SelectionService.RemoveHighlight(objObject, true  );}}
SelectionService.arrStickyHighlightControls = new Array();}
SelectionService.RemoveAllStickyHighlight = SelectionService_RemoveAllStickyHighlight;
function SelectionService_RemoveAllStickyHighlight()
{SelectionService.RemoveAllStickyHighlightExcept(null);}
SelectionService.RemoveAllNonStickyHighlightExcept = SelectionService_RemoveAllNonStickyHighlightExcept;
function SelectionService_RemoveAllNonStickyHighlightExcept(objControl)
{var strExcludeID = "";
if (objControl != null)
{strExcludeID = objControl.id;}
for (var i = 0; i < SelectionService.arrNonStickyHighlightControls.length; i++)
{var strID = SelectionService.arrNonStickyHighlightControls[i];
if (strID == null || strID == strExcludeID)
{continue;}
var objObject = document.getElementById(strID);
if (objObject != null)
{SelectionService.RemoveHighlight(objObject, false );}}
SelectionService.arrNonStickyHighlightControls = new Array();}
SelectionService.RemoveAllNonStickyHighlight = SelectionService_RemoveAllNonStickyHighlight;
function SelectionService_RemoveAllNonStickyHighlight()
{SelectionService.RemoveAllNonStickyHighlightExcept(null);}
SelectionService._Select = SelectionService__Select;
function SelectionService__Select(objControl, boolSelect)
{var strSelectFunction	= null;
var strScriptClass		= null;
;
if (boolSelect)
{SelectionService.objSelectedControl = objControl;
var funcSelect = BaseControl.FindFunction(objControl, "Select", true );
funcSelect(objControl);}
else
{SelectionService.objSelectedControl = null;
if (objControl.parentNode != null)
{var funcUnSelect = BaseControl.FindFunction(objControl, "UnSelect", true );
funcUnSelect(objControl);}}}
SelectionService.RememberFocus = SelectionService_RememberFocus;
function SelectionService_RememberFocus(objControl, objEvent)
{;
;
;
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
g_objCurrentFormDataSelection.BackupFocus(objViewDataNode);
if (Dialog.boolModalDialogForFocusRestorationPresent)
{Dialog_MaintainModalDialog();}}
SelectionService.RestoreFocus = SelectionService_RestoreFocus;
function SelectionService_RestoreFocus()
{try
{;
if (g_objCurrentFormDataSelection == null)
{;
g_objCurrentFormDataSelection = new SelectionInformation();
g_objCurrentFormDataSelection.Deserialize();}
g_objCurrentFormDataSelection.RestoreFocus(CurrentFormData.ViewDataTree());
g_objCurrentFormDataSelection.ClearSerializedForm();
;}
catch (exception)
{;}}
function SelectionService_ResetState(boolValidViewDataTree)
{;
if (boolValidViewDataTree)
{SelectionService.RemoveAllStickyHighlight();
try
{SelectionService.Select(null);}
catch(e)
{}}
else
{SelectionService.arrStickyHighlightControls = new Array();
SelectionService.arrNonStickyHighlightControls = new Array();
SelectionService.objSelectedControl = null;}}
SelectionService.ForgetAllSelection = SelectionService_ForgetAllSelection;
function SelectionService_ForgetAllSelection()
{;
PostbackBody.DeleteDocumentCookie(
PostbackBody.GetFormID(),
"_sel");
if (g_objCurrentFormDataSelection != null)
{g_objCurrentFormDataSelection.ClearSerializedForm();}
;
g_objCurrentFormDataSelection = new SelectionInformation();
SelectionService_ResetState(CurrentFormData_IsValidViewDataTree());}
function SelectionInformation()
{if (!(SelectionInformation.prototype instanceof SelectionInformationTraits))
{SelectionInformation.prototype = new SelectionInformationTraits();
SelectionInformation.prototype.constructor = SelectionInformation;
return new SelectionInformation();}
this.arrFocusBackupForPostback = new Array();
this.boolTextSelected = false;
this.boolStructuralInsertSelectFirst = false;
this.boolStructuralInsertBefore = false;
this.boolStructuralAppendAtEnd = false;
this.intScrollXPosition = 0;
this.intScrollYPosition = 0;}
function SelectionInformationTraits()
{this.k_strLastSelectionFieldId = "__LastSelection";
this.BackupFocus = SelectionInformationTraits_BackupFocus;
function SelectionInformationTraits_BackupFocus(objViewDataNode)
{if (!CurrentFormData.ViewTreesAreMerged())
{return;}
;
this.arrFocusBackupForPostback = ViewDataNode.BuildViewDataPath(objViewDataNode);
this.boolStructuralInsertSelectFirst = false;
if (document.selection)
{this.boolTextSelected = document.selection.createRange().text.length > 0;}
this.intScrollXPosition = CrossBrowserLibrary.GetScrollX();
this.intScrollYPosition = CrossBrowserLibrary.GetScrollY();}
this.BackupFocusForStructural = SelectionInformationTraits_BackupFocusForStructural;
function SelectionInformationTraits_BackupFocusForStructural(
objCollectionControl,
objSibblingContainer,
boolInsertBefore)
{var objViewDataNodeToBackup;
if (objSibblingContainer == null)
{objViewDataNodeToBackup = ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);}
else
{objViewDataNodeToBackup = ViewDataNode.GetViewDataNodeFromHtml(objSibblingContainer);}
this.BackupFocus(objViewDataNodeToBackup);
this.boolStructuralInsertSelectFirst = true;
this.boolStructuralAppendAtEnd = objSibblingContainer == null;
this.boolStructuralInsertBefore = boolInsertBefore;}
this.RestoreFocus = SelectionInformationTraits_RestoreFocus;
function SelectionInformationTraits_RestoreFocus(objViewDataNode)
{var objCurrentNode = ViewDataNode.SelectViewDataPath(
objViewDataNode,
this.arrFocusBackupForPostback);
if (this.boolStructuralInsertSelectFirst)
{if (this.boolStructuralAppendAtEnd)
{var arrChildNodes = ViewDataNode.GetChildNodes(objCurrentNode);
if (arrChildNodes.length > 0)
{objCurrentNode = arrChildNodes[arrChildNodes.length - 1]}}
else
{var objParentNode = ViewDataNode.GetParent(objCurrentNode);
if (objParentNode != null)
{var arrSibblings = ViewDataNode.GetChildNodes(objParentNode);
var intIndex = Util.IndexOf(arrSibblings, objCurrentNode);
if (this.boolStructuralInsertBefore)
{intIndex--;
if (intIndex < 0)
{intIndex = 0;}}
else
{intIndex++;
if (intIndex >= arrSibblings.length)
{intIndex = arrSibblings.length - 1;}}
objCurrentNode = arrSibblings[intIndex];}}
var objCurrentControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objCurrentNode);
if (objCurrentControl)
{StructuralEditingControl.FocusNewContainer(objCurrentControl);}}
else
{var objCurrentControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objCurrentNode);
if (objCurrentControl == null)
{return;}
var objFocusableControl = BaseControl.FindFirstFocusableControl(objCurrentControl, objCurrentNode);
if (objFocusableControl != null)
{;
var funcRestoreFocus = BaseControl.FindFunction(objFocusableControl, "RestoreFocus", true );
try
{funcRestoreFocus(objFocusableControl);}
catch (e)
{}
SelectionService.RememberFocus(objFocusableControl);}}
if (UserAgentInfo.strBrowser != 1)
{CrossBrowserLibrary.SetScrollX(this.intScrollXPosition);
CrossBrowserLibrary.SetScrollY(this.intScrollYPosition);}}
this.Serialize = SelectionInformationTraits_Serialize;
function SelectionInformationTraits_Serialize()
{var strSerializedSelection = "";
if (this.arrFocusBackupForPostback.length == 0)
{strSerializedSelection = "";}
else
{var arrList = new Array();
arrList.push(this.boolTextSelected ? 1 : 0);
arrList.push(this.boolStructuralInsertSelectFirst ? 1 : 0 );
arrList.push(this.boolStructuralInsertBefore ? 1 : 0);
arrList.push(this.boolStructuralAppendAtEnd ? 1 : 0);
arrList.push(this.intScrollXPosition);
arrList.push(this.intScrollYPosition);
for (var i = 0; i < this.arrFocusBackupForPostback.length; i++)
{arrList.push(this.arrFocusBackupForPostback[i]);}
strSerializedSelection = "[" + arrList.join(",") + "]";}
this.SetStorrageInput(strSerializedSelection);
return strSerializedSelection;}
this.Deserialize = SelectionInformationTraits_Deserialize;
function SelectionInformationTraits_Deserialize()
{var strList = this.GetStorrageInput();
;
if (Util.IsNullOrEmptyString(strList))
{return;}
if (strList.length < 2 ||
strList.charAt(0) != '[' ||
strList.charAt(strList.length - 1) != ']')
{;
return;}
strList = strList.substring(1, strList.length - 2);
var arrList = strList.split(',');
if (arrList.length < 7)
{;
return;}
if (! (arrList[0] == 0 || arrList[0] == 1))
{;
return;}
this.boolTextSelected = arrList[0] != 0;
if (! (arrList[1] == 0 || arrList[1] == 1))
{;
return;}
this.boolStructuralInsertBefore = arrList[1] != 0;
if (! (arrList[2] == 0 || arrList[2] == 1))
{;
return;}
this.boolStructuralInsertBefore = arrList[2] != 0;
if (! (arrList[3] == 0 || arrList[3] == 1))
{;
return;}
this.boolStructuralAppendAtEnd = arrList[3] != 0;
if (arrList[4] < 0)
{;
return;}
this.intScrollXPosition = arrList[4];
if (arrList[5] < 0)
{;
return;}
this.intScrollXPosition = arrList[5];
var strViewName = arrList[6];
if (strViewName == null || Util.GetDataType(strViewName) != 2 || strViewName.length == 0)
{;
return;}
;
this.arrFocusBackupForPostback = new Array();
this.arrFocusBackupForPostback.push(arrList[6]);
for (var i = 7; i < arrList.length; i++)
{var currentStep = arrList[i];
if (currentStep == null || currentStep < 0 || Util.GetDataType(currentStep * 1) != 1)
{;
return;}
this.arrFocusBackupForPostback.push(currentStep * 1);}}
this.GetStorrageInput = SelectionInformationTraits_GetStorrageInput;
function SelectionInformationTraits_GetStorrageInput()
{var objControl = document.getElementById(this.k_strLastSelectionFieldId);
if (objControl != null)
{return objControl.value;}}
this.SetStorrageInput = SelectionInformationTraits_SetStorrageInput;
function SelectionInformationTraits_SetStorrageInput(strValue)
{var objControl = document.getElementById(this.k_strLastSelectionFieldId);
if (objControl != null)
{objControl.value = strValue;}}
this.ClearSerializedForm = SelectionInformationTraits_ClearSerializedForm;
function SelectionInformationTraits_ClearSerializedForm()
{document.getElementById(this.k_strLastSelectionFieldId).value = "";}}
function KeyboardService() {}
KeyboardService.VirtualKeyMap = new Array();
KeyboardService.VirtualKeyMap[1] =
["10falsetruefalse","13falsefalsefalse","10falsefalsetrue","10truefalsetrue","84falsetruetrue","73falsetruetrue","82truetruefalse","38falsefalsefalse","40falsefalsefalse","27falsefalsefalse","40falsetruefalse","46falsetruefalse","67falsetruefalse","68falsetruefalse","75falsetruefalse","86falsetruefalse","88falsetruefalse","90falsetruefalse","32falsefalsefalse","46falsefalsefalse","8falsefalsefalse"];
KeyboardService.VirtualKeyMap[2] =
["13falsetruefalse","13falsefalsefalse","13falsefalsetrue","13truefalsetrue","84falsetruetrue","73falsetruetrue","82truetruefalse","63232falsefalsefalse","63233falsefalsefalse","27falsefalsefalse","40falsetruefalse","46falsetruefalse","67falsetruefalse","68falsetruefalse","75falsetruefalse","86falsetruefalse","88falsetruefalse","90falsetruefalse","32falsefalsefalse","46falsefalsefalse","8falsefalsefalse"];
KeyboardService.VirtualKeyMap[3] =
["13falsetruefalse","13falsefalsefalse","13falsefalsetrue","13truefalsetrue","84falsetruetrue","73falsetruetrue","82truetruefalse","38falsefalsefalse","40falsefalsefalse","27falsefalsefalse","40falsetruefalse","46falsetruefalse","67falsetruefalse","68falsetruefalse","75falsetruefalse","86falsetruefalse","88falsetruefalse","90falsetruefalse","32falsefalsefalse","46falsefalsefalse","8falsefalsefalse"];
KeyboardService.OnKeyPress = function(objEvent)
{if (HoverMenu.isVisible)
{return(HoverMenu.OnKeyPress(objEvent));}
var intVirtualKey = KeyboardService.GetVirtualKey(objEvent);
var boolHandledKeyPress = false;
switch (intVirtualKey)
{case 0:
KeyboardService.ProcessStructuralOperations(0);
boolHandledKeyPress = true;
break;}
if (boolHandledKeyPress)
{Util.StopEventProprogation(objEvent);
return false;}
else
{return true;}}
KeyboardService.OnKeyDown = function(objEvent)
{if (HoverMenu.isVisible)
{return(HoverMenu.OnKeyDown(objEvent));}
var intVirtualKey = KeyboardService.GetVirtualKey(objEvent);
var boolHandledKeyPress = false;
switch (intVirtualKey)
{case 11:
KeyboardService.ProcessStructuralOperations(1);
boolHandledKeyPress = true;
break;
case 4:
KeyboardService.ProcessToolbarAccess();
boolHandledKeyPress = true;
break;
case 5:
ErrorVisualization.VirtualKeyMoreInfoErrorVisAccess(objEvent);
boolHandledKeyPress = true;
break;
case 6:
ErrorVisualization.FocusNextInvalidControl(SelectionService.GetSelectedControl());
boolHandledKeyPress = true;
break;
case 10:
KeyboardService.ProcessStructuralOperations(2);
boolHandledKeyPress = true;
break;}
if (boolHandledKeyPress)
{Util.StopEventProprogation(objEvent);
return false;}
else
{return true;}}
KeyboardService.GetVirtualKey = function(objEvent)
{var arrBrowserSpecificVirtualKeyMap = KeyboardService.VirtualKeyMap[UserAgentInfo.strBrowser];
;
if (arrBrowserSpecificVirtualKeyMap == null)
{return -1;}
var strKeyCode = ""+objEvent.keyCode+objEvent.altKey+objEvent.ctrlKey+objEvent.shiftKey;
;
for (var i = 0; i < arrBrowserSpecificVirtualKeyMap.length; i++)
{if (arrBrowserSpecificVirtualKeyMap[i] == strKeyCode)
{;
return i;}}
return -1;}
KeyboardService.ProcessStructuralOperations = function(enumStructuralOperation)
{var objSelection = SelectionService.GetSelectedControl();
if (objSelection == null)
{return;}
HoverMenu.objMenuAccessSourceControl = objSelection;
KeyboardService.ProcessStructuralOperationsHelper(objSelection, enumStructuralOperation);}
KeyboardService.ProcessStructuralOperationsHelper = function(objSelection, enumStructuralOperation)
{if (enumStructuralOperation == 0 ||
enumStructuralOperation == 1)
{PostbackBody.boolPostbacksBlocked = true;}
var strScriptClass = objSelection.getAttribute("ScriptClass");
if (UserAgentInfo.strBrowser != 1
&& strScriptClass == "Container"
&& objSelection.parentNode != null)
{var strParentScript = objSelection.parentNode.getAttribute("ScriptClass");
if (strParentScript == "RichTextCollection")
{objSelection = document.getElementById(objSelection.id + "_RT1");
strScriptClass = objSelection.getAttribute("ScriptClass");}}
if (strScriptClass != "Container" && strScriptClass != "RepeatingTableRow")
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objSelection);
if (Snippet.GetSnippetType(objSnippetElement) == 3)
{var funcOnBlur = BaseControl.FindFunction(objSelection, "OnChange", true);
if (funcOnBlur != null)
{funcOnBlur(objSelection, null);
if (PostbackBody.IsPostingBack())
{return;}}}
if (strScriptClass == "RichTextBox")
{objSelection = BaseControl.GetParentInfoPathControl(objSelection);
objSelection = BaseControl.GetParentInfoPathControl(objSelection);}
objSelection = BaseControl.GetParentInfoPathControl(objSelection);
if (objSelection == null)
{return;}
objSnippetElement = Snippet.GetSnippetElementFromHtml(objSelection);
if (Snippet.GetSnippetType(objSnippetElement) != 6)
{return;}
strScriptClass = "Container";}
PostbackBody.boolPostbacksBlocked = false;
var strCollectionControlID = BaseControl.GetContainerId(objSelection.id);
;
if (!Util.IsNonEmptyString(strCollectionControlID))
{return;}
var objCollectionControl = document.getElementById(strCollectionControlID);
;
if (objCollectionControl == null)
{return;}
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);
if (ViewDataNode.IsDisabled(objViewDataNode))
{return;}
strScriptClass = objCollectionControl.getAttribute("ScriptClass");
var boolRecurse = false;
switch(enumStructuralOperation)
{case(0):
{if (strScriptClass == "RepeatingSection" || strScriptClass == "RepeatingTable")
{var strXmlToEdit = HoverMenu.GetXmlToEdit(objViewDataNode);
if (Util.IsNonEmptyString(strXmlToEdit))
{var strScriptToExecute = "xCollectionControl.InsertAfter('" + objSelection.id + "','" + strXmlToEdit +"');";
eval(strScriptToExecute);}}
else
{boolRecurse = true;}
break;}
case(1):
{var strXmlToEdit = HoverMenu.GetXmlToEdit(objViewDataNode);
if (Util.IsNonEmptyString(strXmlToEdit))
{var strComponentType = "";
if (strScriptClass == "RepeatingSection" || strScriptClass == "RepeatingTable")
{strComponentType = "xCollectionControl";}
else if (strScriptClass == "Section")
{strComponentType = "Section";}
if (strComponentType != "")
{var strScriptToExecute = strComponentType + ".Remove('" + objSelection.id + "','" + strXmlToEdit +"');";
eval(strScriptToExecute);}}
else
{boolRecurse = true;}
break;}
case(2):
{var strXmlToEdit = HoverMenu.GetXmlToEdit(objViewDataNode);
if (Util.IsNonEmptyString(strXmlToEdit))
{var strWidgetId = objSelection.id + "_" + "Widget";
KeyboardService.ToolbarAccessSteps(strWidgetId, objSelection.id);}
else
{boolRecurse = true;}
break;}
default:
{;}}
if (PostbackBody.postbackNeeded != null)
{View_SubmitForm(PostbackBody.postbackNeeded[0], PostbackBody.postbackNeeded[1], PostbackBody.postbackNeeded[2], PostbackBody.postbackNeeded[3]);
PostbackBody.postbackNeeded = null;}
if (boolRecurse)
{KeyboardService.ProcessStructuralOperationsHelper(objCollectionControl, enumStructuralOperation);}}
KeyboardService.ToolbarAccessSteps = function(strWidgetId, strContainerId)
{KeyboardService.DelayedFunctionCall("KeyboardService.ToolbarAccessStep1", strWidgetId, strContainerId, 10);}
KeyboardService.ToolbarAccessStep1 = function(strWidgetId, strContainerId)
{try
{document.getElementById(strWidgetId).childNodes[0].focus();}
catch(e)
{}
KeyboardService.DelayedFunctionCall("KeyboardService.ToolbarAccessStep2", strWidgetId, strContainerId, 50);}
KeyboardService.ToolbarAccessStep2 = function(strWidgetId, strContainerId)
{SelectionService.Select(document.getElementById(strContainerId));
KeyboardService.DelayedFunctionCall("KeyboardService.ToolbarAccessStep3", strWidgetId, strContainerId, 100);}
KeyboardService.ToolbarAccessStep3 = function(strWidgetId, strContainerId)
{try
{document.getElementById(strWidgetId).childNodes[0].focus();}
catch(e)
{}
KeyboardService.DelayedFunctionCall("KeyboardService.ToolbarAccessStep4", strWidgetId, strContainerId, 100);}
KeyboardService.ToolbarAccessStep4 = function(strWidgetId, strContainerId)
{HoverMenu.boolProcessedEnterClick = false;
document.getElementById(strWidgetId).childNodes[0].onclick();
KeyboardService.DelayedFunctionCall("KeyboardService.ToolbarAccessStep5", strWidgetId, strContainerId, 100);}
KeyboardService.ToolbarAccessStep5 = function(strWidgetId, strContainerId)
{try
{document.getElementById(strWidgetId).childNodes[0].focus();}
catch(e)
{}}
KeyboardService.DelayedFunctionCall = function(strFunctionName, strWidgetId, strContainerId, intDelay)
{window.setTimeout(strFunctionName + "(\"" + strWidgetId + "\", \"" + strContainerId + "\");", intDelay);}
KeyboardService.ProcessToolbarAccess = function()
{if (Toolbar.objFocusedToolbarControl == null)
{;
;
Toolbar.arrLastFocusedFormControl = g_objCurrentFormDataSelection.arrFocusBackupForPostback;
var objFirstToolbarControl = null;
var arrFocusId = ["__toolbar_top_button0", "__toolbar_top_viewdropdown", "__toolbar_bottom_button0", "__toolbar_bottom_viewdropdown"];
for (var i = 0; i < arrFocusId.length && objFirstToolbarControl == null; i++)
{objFirstToolbarControl = document.getElementById(arrFocusId[i]);}
if (objFirstToolbarControl != null)
{objFirstToolbarControl.focus();
;}}
else
{if (Toolbar.arrLastFocusedFormControl != null)
{;
;
g_objCurrentFormDataSelection.arrFocusBackupForPostback = Toolbar.arrLastFocusedFormControl;
SelectionService.RestoreFocus();
;
g_objCurrentFormDataSelection.arrFocusBackupForPostback = Toolbar.arrLastFocusedFormControl;
Toolbar.arrLastFocusedFormControl = null;}}}
function Body() {};
Body.OnClick = function()
{if (IP_DatePicker.Close != null)
{IP_DatePicker.Close();}
SelectionService.Select(null);
SelectionService.RemoveAllStickyHighlight();}
function UserMessage(
strShortMessage,
strDetailMessage,
strLogId)
{this._strShortMessage = strShortMessage;
this._strDetailMessage = strDetailMessage;
this._strLogId = strLogId;}
function UserMessageError()
{}
UserMessageError.ShowMessageFromQueue = function(
objUserMessage,
intMessageStyle)
{var boolHasDetails = false;
var strWidth = Toolbar.GetWidth();
;
if (intMessageStyle == 1)
{var viewHtmlContainer = document.getElementById("__ViewContainer");
;
Toolbar.Show(false);
;
Util.SetInnerText(viewHtmlContainer, objUserMessage);}
else
{;
UserMessageError.ShowDialog(objUserMessage, intMessageStyle, UserMessages.CloseCurrentMessage);
return;}}
UserMessageError.ShowDialog = UserMessageError_ShowDialog;
function UserMessageError_ShowDialog(objUserMessage, intMessageStyle, funcCallbackOnClose)
{var arrErrorDialogContinueButton =
[0
,Util.FormatButtonAccelerator(IntlCoreStrings.k_strWarningDialogButtonContinue,
IntlCoreStrings.k_strWarningDialogButtonContinueAccel)
,"Dialog.OnTerminateButton();Util.StopEventProprogation(event);"
,IntlCoreStrings.k_strWarningDialogButtonContinueAccel
,"button"
];
var arrErrorDialogStartAgainButton =
[0
,Util.FormatButtonAccelerator(IntlCoreStrings.k_strErrorDialogButtonStartAgain,
IntlCoreStrings.k_strErrorDialogButtonStartAgainAccel)
,"UserMessageError_StartAgainClicked();Util.StopEventProprogation(event);"
,IntlCoreStrings.k_strErrorDialogButtonStartAgainAccel
,"button"
];
var strDetailsHTML = null;
var arrData = new Array();
if (intMessageStyle == 4 ||
intMessageStyle == 9)
{arrData[1] = IntlCoreStrings.k_strWarningDialogTitle;
arrData[2] = [arrErrorDialogContinueButton, arrErrorDialogStartAgainButton];
var strContinueText = IntlCoreStrings.k_strWarningDialogButtonContinue;
arrData[11] = Util.FormatString(IntlCoreStrings.k_strWarningDialogContinueDesc, strContinueText);
var strStartAgainText = IntlCoreStrings.k_strErrorDialogButtonStartAgain;
arrData[12] = Util.FormatString(IntlCoreStrings.k_strWarningDialogStartAgainDesc, strStartAgainText);
strDetailsHTML = UserMessageError.CombineWarningDetails();}
else if (intMessageStyle == 12)
{var arrOfflineTryAgainButton =
[0
,Util.FormatButtonAccelerator(IntlCoreStrings.k_strErrorDialogButtonTryAgain,
IntlCoreStrings.k_strErrorDialogButtonTryAgainAccel)
,"UserMessageError_StartAgainClicked();Dialog.SetupPostbackWaitChangeMessage();Util.StopEventProprogation(event);"
,IntlCoreStrings.k_strErrorDialogButtonTryAgainAccel
,"button"
];
var arrOfflineCloseButton =
[0
,Util.FormatButtonAccelerator(IntlCoreStrings.k_strOfflineWarningDialogButtonExitForm,
IntlCoreStrings.k_strOfflineWarningDialogButtonExitFormAccel)
,"UserMessageError_CloseClicked();Util.StopEventProprogation(event);"
,IntlCoreStrings.k_strOfflineWarningDialogButtonExitFormAccel
,"button"
];
arrData[1] = IntlCoreStrings.k_strWarningDialogTitle;
arrData[2] = [arrOfflineTryAgainButton, arrOfflineCloseButton];
strDetailsHTML = UserMessageError.FormatDetails(objUserMessage._strDetailMessage, objUserMessage._strLogId);
arrData[11] = null;
arrData[12] = null;}
else
{var arrErrorDialogCloseButton =
[
0
,Util.FormatButtonAccelerator(IntlCoreStrings.k_strErrorDialogButtonClose,
IntlCoreStrings.k_strErrorDialogButtonCloseAccel)
,"UserMessageError_CloseClicked();Util.StopEventProprogation(event);"
,IntlCoreStrings.k_strErrorDialogButtonCloseAccel
,"button"
];
var strCloseText = IntlCoreStrings.k_strErrorDialogButtonClose;
var strStartAgainText;
if (Print_IsPrintWindow())
{arrData[1] = IntlCoreStrings.k_strErrorDialogTitle;
arrData[2] = [arrErrorDialogCloseButton];
arrData[12] = Util.FormatString(IntlCoreStrings.k_strErrorDialogCloseDesc, strCloseText);}
else if (intMessageStyle == 11)
{arrData[1] = IntlCoreStrings.k_strLoadErrorDialogTitle;
var arrErrorDialogTryAgainButton =
[0
,Util.FormatButtonAccelerator(IntlCoreStrings.k_strErrorDialogButtonTryAgain,
IntlCoreStrings.k_strErrorDialogButtonTryAgainAccel)
,"UserMessageError_StartAgainClicked();Util.StopEventProprogation(event);"
,IntlCoreStrings.k_strErrorDialogButtonTryAgainAccel
,"button"
];
arrData[2] = [arrErrorDialogTryAgainButton, arrErrorDialogCloseButton];
var strTryAgainText = IntlCoreStrings.k_strErrorDialogButtonTryAgain;
arrData[12] = Util.FormatString(IntlCoreStrings.k_strErrorDialogTryAgainDesc, strTryAgainText) + "<BR/><BR/>" +
Util.FormatString(IntlCoreStrings.k_strErrorDialogCloseDesc, strCloseText);}
else
{arrData[1] = IntlCoreStrings.k_strErrorDialogTitle;
arrData[2] = [arrErrorDialogStartAgainButton, arrErrorDialogCloseButton];
var strStartAgainText = IntlCoreStrings.k_strErrorDialogButtonStartAgain;
arrData[12] = Util.FormatString(IntlCoreStrings.k_strErrorDialogStartAgainDesc, strStartAgainText) + "<BR/><BR/>" +
Util.FormatString(IntlCoreStrings.k_strErrorDialogCloseDesc, strCloseText);}
strDetailsHTML = UserMessageError.FormatDetails(objUserMessage._strDetailMessage, objUserMessage._strLogId);}
arrData[0] = "";
arrData[3] = CurrentFormData.Direction();
arrData[5] = Dialog.TextAlignmentStyle();
arrData[6] = IntlCoreStrings.k_strBrandingToolBarLogoPrefix;
arrData[10] = objUserMessage._strShortMessage;
arrData[13] = Util.IsNullOrEmptyString(strDetailsHTML) ? "display:none;" : "display:inline";
arrData[16] = strDetailsHTML;
arrData[14] = IntlCoreStrings.k_strErrorDialogDetailsAccel;
arrData[15] = IntlCoreStrings.k_strErrorDialogShowDetails;
Dialog.ShowModalDialog("ErrorDialog", arrData, funcCallbackOnClose);}
UserMessageError.FormatDetails = function(strDetailMessage, strLogId)
{var strDetailsHtml = null;
if (Util.IsNonEmptyString(strDetailMessage))
{strDetailsHtml = Util.ConvertNewlinesToHtml(strDetailMessage);}
if (Util.IsNonEmptyString(strLogId))
{var strLogIdHtml = Util.FormatString("<DIV>{0}</DIV><DIV><SPAN class='ErrorPageEmphasisText'>{1}</SPAN><SPAN>{2}</SPAN></DIV> ",
IntlCoreStrings.k_strErrorDialogLogEntryText,
IntlCoreStrings.k_strErrorDialogLogIdLabel,
strLogId);
if (strDetailsHtml == null)
{strDetailsHtml = strLogIdHtml;}
else
{strDetailsHtml = strDetailsHtml + "<BR/><BR/>" + strLogIdHtml;}}
return strDetailsHtml;}
UserMessageError.CombineWarningDetails = function()
{var intCurrMessage;
var arrStringBuilder = new Array();
for (intCurrMessage = UserMessages.intNextMessage; intCurrMessage < UserMessages.ReturnedUserMessages.length; intCurrMessage++)
{var objUserMessage = UserMessages.ReturnedUserMessages[intCurrMessage];
if (objUserMessage[0] != 4)
{break;}
if (arrStringBuilder.length != 0)
{arrStringBuilder.push("<HR/>");}
arrStringBuilder.push(UserMessageError.FormatDetails(objUserMessage[2], objUserMessage[3]));}
return arrStringBuilder.join("");}
UserMessageError.ToggleDetails = function()
{var objDetailsLink = document.getElementById("ErrorDialogDetailsLink");
var objDetailsSection = document.getElementById("ErrorDialogDetailsSection");
;
if (objDetailsLink == null || objDetailsSection == null)
{return;}
var bDetailsVisible = objDetailsSection.style.display != "none";
Util.SetInnerText(objDetailsLink,
bDetailsVisible ? IntlCoreStrings.k_strErrorDialogShowDetails : IntlCoreStrings.k_strErrorDialogHideDetails);
objDetailsSection.style.display = bDetailsVisible ? "none" : "inline";}
function UserMessageError_StartAgainClicked()
{var intMessageStyle = UserMessages.ReturnedUserMessages[UserMessages.intNextMessage][0];
switch (intMessageStyle)
{case 9:
Dialog.HideDialog();
UserMessages.ReloadPage();
break;
case 4:
var strMsg = Util.UnescapeString(IntlCoreStrings.k_strStartOverAlertLine1) + "\n\n"
+ Util.UnescapeString(IntlCoreStrings.k_strStartOverAlertLine2);
if (UserMessages.ShowConfirmMessage(strMsg, false))
{UserMessages.StartNewForm(false);
Dialog.HideDialog();}
break;
case 5:
UserMessages.StartNewForm(true);
break;
case 12:
case 11:
default:
Dialog.OnTerminateButton();
break;}}
function UserMessageError_CloseClicked()
{UserMessages.boolDocumentClosed = true;
UserMessages.boolNeedPostBack = false;
Dialog.HideDialog();
View.OnFinishUserMessages();}
UserMessageError.ShowTemplatedMessage = function(
objUserMessage,
strTemplateHtml,
boolReplacePage)
{;
try
{Toolbar.Show(false);}
catch (exception)
{;}
if (!boolReplacePage)
{var viewHtmlContainer = document.getElementById("__ViewContainer");
;
viewHtmlContainer.innerHTML = strTemplateHtml;}
else
{if (UserAgentInfo.strBrowser == 1 || UserAgentInfo.strBrowser == 2)
{DeferredHtmlLoader.Load(strTemplateHtml);}
else
{document.open("text/html", "replace");
document.write(strTemplateHtml);
document.close();}}}
function DeferredHtmlLoader() {}
DeferredHtmlLoader._objTimer = null;
DeferredHtmlLoader._objHtml = null;
DeferredHtmlLoader._intLoadDelay = 1;
DeferredHtmlLoader.TimerProc = function()
{if (DeferredHtmlLoader._objTimer != null)
{DeferredHtmlLoader._objTimer = null;}
if (UserAgentInfo.strBrowser != 2)
{document.open("text/html", "replace");}
document.write(DeferredHtmlLoader._objHtml);
document.close();}
DeferredHtmlLoader.Load = function(strHtml)
{;
DeferredHtmlLoader._objHtml = strHtml;
DeferredHtmlLoader._objTimer = window.setTimeout(DeferredHtmlLoader.TimerProc, DeferredHtmlLoader._intLoadDelay);}
function UserMessages()
{}
UserMessages.MessageMetadata = new Array();
UserMessages.MessageMetadata[0]		= [true,			true,		false];
UserMessages.MessageMetadata[1]		= [false,			true,		false];
UserMessages.MessageMetadata[2]	= [false,			true,		false];
UserMessages.MessageMetadata[3]		= [false,			true,		true];
UserMessages.MessageMetadata[4]		= [false,			false,		false];
UserMessages.MessageMetadata[5]		= [false,			false,		true];
UserMessages.MessageMetadata[6]= [false,			true,		false];
UserMessages.MessageMetadata[7]	= [false,			true,		false];
UserMessages.MessageMetadata[8]		= [true,			false,		false];
UserMessages.MessageMetadata[9]= [false,			false,		true];
UserMessages.MessageMetadata[10]		= [false,			true,		false];
UserMessages.MessageMetadata[11]= [false,			false,		true];
UserMessages.MessageMetadata[12]= [false,			false,		true];
UserMessages.ReturnedUserMessages = null;
UserMessages.intNextMessage = 0;
UserMessages.boolDocumentClosed = false;
UserMessages.boolNeedPostBack = false;
UserMessage.boolViewDisplayed = false;
UserMessages.funcOnFinishUserMessagesCallback = null;
UserMessages.ShowMessages = UserMessages_ShowMessages;
function UserMessages_ShowMessages(funcOnFinishUserMessagesCallback)
{UserMessages.ReturnedUserMessages = CurrentFormData.UserMessages();
if (UserMessages.ReturnedUserMessages != null &&
UserMessages.ReturnedUserMessages.length > 0)
{UserMessages.intNextMessage = 0;
UserMessage.boolViewDisplayed = false;
UserMessages.funcOnFinishUserMessagesCallback = funcOnFinishUserMessagesCallback;
UserMessages.ShowNextMessage();}
else
{View.RenderAfterPostback();
funcOnFinishUserMessagesCallback();}}
UserMessages.ShowMessage = UserMessages_ShowMessage;
function UserMessages_ShowMessage(
objUserMessage,
intMessageStyle)
{;
if (intMessageStyle == 12)
{PostbackBody.RetryingPostback = true;}
UserMessages.intNextMessage = 0;
UserMessages.ReturnedUserMessages = new Array(1);
var arrMessage = new Array(4);
arrMessage[0] = intMessageStyle;
arrMessage[1] = (objUserMessage._strShortMessage == null ? objUserMessage : objUserMessage._strShortMessage);
arrMessage[2] = objUserMessage._strDetailMessage;
arrMessage[3] = objUserMessage._strLogId;
UserMessages.ReturnedUserMessages[0] = arrMessage;
UserMessages.funcOnFinishUserMessagesCallback = null;
UserMessage.boolViewDisplayed = true;
UserMessages.ShowNextMessage();
return (!UserMessages.IsSync(intMessageStyle));}
UserMessages.NeedsView = UserMessages_NeedsView;
function UserMessages_NeedsView(intMessageStyle)
{return(UserMessages.MessageMetadata[intMessageStyle][0]);}
UserMessages.IsSync = UserMessages_IsSync;
function UserMessages_IsSync(intMessageStyle)
{return(UserMessages.MessageMetadata[intMessageStyle][1]);}
UserMessages.AbortProcessingView = UserMessages_AbortProcessingView;
function UserMessages_AbortProcessingView(intMessageStyle)
{return(UserMessages.MessageMetadata[intMessageStyle][2]);}
UserMessages.ShowNextMessage = function()
{;
var arrMessage = UserMessages.ReturnedUserMessages[UserMessages.intNextMessage];
;
if (!UserMessage.boolViewDisplayed && UserMessages.NeedsView(arrMessage[0]))
{View.RenderAfterPostback();
UserMessage.boolViewDisplayed = true;}
switch (arrMessage[0])
{case 0:
case 1:
case 2:
case 3:
case 6:
case 7:
case 8:
case 10:
{UserMessages.ShowMessageFromQueue(arrMessage[1], arrMessage[0]);
break;}
case 4:
case 5:
case 9:
case 11:
case 12:
{UserMessages.ShowMessageFromQueue(
new UserMessage(arrMessage[1], arrMessage[2], arrMessage[3]),
arrMessage[0]);
break;}
default:
{;}}}
UserMessages.ShowAlertMessage = UserMessages_ShowAlertMessage;
function UserMessages_ShowAlertMessage(strMessage, boolEscaped)
{if (boolEscaped)
{strMessage = Util.UnescapeString(strMessage);}
alert(strMessage);}
UserMessages.ShowConfirmMessage = UserMessages_ShowConfirmMessage;
function UserMessages_ShowConfirmMessage(strMessage, boolEscaped)
{if (boolEscaped)
{strMessage = Util.UnescapeString(strMessage);}
return window.confirm(strMessage);}
UserMessages.ShowMessageFromQueue = function(
objUserMessage,
intMessageStyle)
{switch(intMessageStyle)
{case(0):
{;
UserMessages.ShowAlertMessage(objUserMessage, false );
break;}
case(2):
case(7):
{;
UserMessages.boolNeedPostBack = true;
break;}
case(3):
{UserMessages.ReloadPage();
break;}
case(6):
{;
UserMessages.boolDocumentClosed = true;
SelectionService.ForgetAllSelection();
UserMessages.boolNeedPostBack = (objUserMessage == "1");
break;}
case(8):
{;
Dialog.ShowModalDialogWithDataFromServer(objUserMessage, UserMessages.CloseCurrentMessage);
break;}
case(10):
{break;}
default:
{UserMessageError.ShowMessageFromQueue(objUserMessage, intMessageStyle);
break;}}
if (UserMessages.IsSync(intMessageStyle))
{UserMessages.CloseCurrentMessage();}
else
{}}
UserMessages.CloseCurrentMessage = UserMessages_CloseCurrentMessage;
function UserMessages_CloseCurrentMessage()
{var userMessages = UserMessages.ReturnedUserMessages;
if (userMessages == null || userMessages[UserMessages.intNextMessage] == null)
{return;}
var intMessageStyle = userMessages[UserMessages.intNextMessage][0];
if (intMessageStyle == 5 || intMessageStyle == 11)
{if (!UserMessages.boolDocumentClosed)
{UserMessages.ReloadPage();}}
else if (intMessageStyle == 4)
{for (var intCurrMessage = UserMessages.intNextMessage; intCurrMessage < userMessages.length; intCurrMessage++)
{if (userMessages[intCurrMessage][0] != 4)
{break;}}
;
UserMessages.intNextMessage = intCurrMessage - 1;}
else if (intMessageStyle == 9)
{document.getElementById("_InfoPathContinueLoading").value = "1";
PostbackBody.PerformFullPagePostback();}
else if (intMessageStyle == 12)
{if (!UserMessages.boolDocumentClosed)
{UserMessages.ReturnedUserMessages = null;
PostbackBody.intPostbacksInProgress++;
;
PostbackBody_Submit(PostbackBody_boolLastPostBackWasFull);}}
if (!UserMessages.AbortProcessingView(intMessageStyle))
{if (UserMessages.intNextMessage < UserMessages.ReturnedUserMessages.length - 1)
{UserMessages.intNextMessage++;
UserMessages.ShowNextMessage();}
else
{if (!UserMessages.boolNeedPostBack)
{if (!UserMessage.boolViewDisplayed)
{View.RenderAfterPostback();}
SelectionService.RestoreFocus();}
if (UserMessages.funcOnFinishUserMessagesCallback != null)
{UserMessages.funcOnFinishUserMessagesCallback();}}}}
UserMessages.ReloadPage = function()
{if (UserAgentInfo.strBrowser == 1)
{window.navigate(UserMessages.GetRefreshUrl());}
else
{window.location.reload();}}
UserMessages.GetRefreshUrl = function()
{var strUrl = document.location.href;
if (strUrl.lastIndexOf('#') > strUrl.indexOf('?'))
{return strUrl.substring(0, strUrl.lastIndexOf('#'));}
else
{return strUrl;}}
UserMessages.StartNewForm = function(forceNew)
{UserMessages.boolNeedPostBack = false;
UserMessages.boolDocumentClosed = true;
UserMessages.intNextMessage = UserMessages.ReturnedUserMessages.length;
EventLog_Add(
10,
null,
forceNew ? "1": "0",
"",
"",
true ,
true ,
forceNew ,
15,
0);}
function Dialog() {};
Dialog.enumModalDialogState				= 0;
Dialog.objShowDialogTimer = null;
Dialog.objChangePostbackMessageTimer = null;
Dialog.intMinimumHeartBeatsUntilDialogShow	= 0;
Dialog.intMinimumHeartBeatsToShow	= 0;
Dialog.arrDialogTemplate = null;
Dialog.boolTemplatesInitialized = false;
Dialog.funcCallbackOnClose = null;
Dialog.enumPageBackGround = 0;
Dialog.boolFirstHeartBeatAfterShowing = false;
Dialog.strCurrentMessageText = "";
Dialog.boolModalDialogForFocusRestorationPresent = false;
Dialog.ShowModalDialog = Dialog_ShowModalDialog;
function Dialog_ShowModalDialog(enumDialog, arrCustomDialogData, funcCallbackOnClose)
{Dialog.funcCallbackOnClose = funcCallbackOnClose;
return Dialog_ShowModalDialogEx(
enumDialog,
1 ,
1 ,
false ,
arrCustomDialogData,
null);}
Dialog.ShowModalDialogWithDataFromServer = Dialog_ShowModalDialogWithDataFromServer;
function Dialog_ShowModalDialogWithDataFromServer(enumDialog, funcCallbackOnClose)
{Dialog.funcCallbackOnClose = funcCallbackOnClose;
return Dialog_ShowModalDialogEx(
enumDialog,
1 ,
1 ,
true ,
null ,
null );}
function Dialog_ShowModalDialogEx(enumDialog, intMinimumHeartBeatsUntilDialogShow, intMinimumHeartBeatsToShow, boolDataFromServer, arrCustomDialogData, objClientSideData)
{if ("Progress" != enumDialog &&
"SaveAs" != enumDialog &&
"FinalMessage" != enumDialog &&
"Alert" != enumDialog &&
"FileAttachment" != enumDialog &&
"InstallDSigCtrl" != enumDialog &&
"ErrorDialog" != enumDialog)
{;
return;}
var arrDialogInfo = Dialog.GetInfo(enumDialog);
if (Util.IsNullOrUndefined(arrDialogInfo))
{;
return;}
var strDialogName = DialogInfo.GetDialogName(arrDialogInfo);
var enumPageBackGround = DialogInfo.GetPageBackgroundType(arrDialogInfo);
;
var arrDialogTemplate = null;
var arrDialogData = null;
if (boolDataFromServer)
{if (typeof(__dialogTemplate_) != "undefined" && __dialogTemplate_ != null)
{arrDialogTemplate = __dialogTemplate_;
__dialogTemplate_ = null;}
if (typeof(__GetDialogData_) != "undefined" && __GetDialogData_ != null)
{arrDialogData = __GetDialogData_();
__GetDialogData_ = null;}}
if (arrDialogData == null)
{arrDialogData = arrCustomDialogData;}
if (arrDialogData == null)
{arrDialogData = Dialog.GetData(enumDialog);}
if (arrDialogTemplate == null)
{arrDialogTemplate = Dialog.GetTemplate(enumDialog);}
var boolPostbackToShowDialog = false;
var boolHaveTemplateAndData = !Util.IsNullOrUndefined(arrDialogTemplate) && !Util.IsNullOrUndefined(arrDialogData);
var boolNeedDataFromServer = DialogInfo.GetDataType(arrDialogInfo) == DialogInfo.k_enumDataTypeServer;
if (boolHaveTemplateAndData)
{if (boolNeedDataFromServer && !boolDataFromServer)
{boolPostbackToShowDialog = true;}}
else
{if (!boolDataFromServer)
{boolPostbackToShowDialog = true;}}
if (boolPostbackToShowDialog)
{EventLog_Add(
13,
null,
enumDialog,
"true",
DialogInfo.GetDataType(arrDialogInfo) == DialogInfo.k_enumDataTypeServer ? "true" : "false",
true ,
true ,
false ,
6,
0);
return;}
Dialog.arrDialogTemplate = arrDialogTemplate;
Dialog.arrDialogData = arrDialogData;
Dialog.intMinimumHeartBeatsUntilDialogShow = intMinimumHeartBeatsUntilDialogShow;
Dialog.intMinimumHeartBeatsToShow = intMinimumHeartBeatsToShow;
Dialog.enumPageBackGround = enumPageBackGround;
Dialog.objClientSideData = objClientSideData;
Dialog._ShowTable();
Dialog.enumModalDialogState = 1;
Dialog.boolModalDialogForFocusRestorationPresent = true;
if (Dialog.objShowDialogTimer == null)
{;
Dialog.objShowDialogTimer = window.setInterval(Dialog._HeartBeat, 100);}}
Dialog.HideDialog = Dialog_HideDialog;
function Dialog_HideDialog()
{;
;
if (Dialog.intMinimumHeartBeatsToShow == 0 ||
Dialog.enumModalDialogState == 0 ||
Dialog.enumModalDialogState != 1)
{Dialog._HideTable();
Dialog._HideDialog();}
else
{Dialog.enumModalDialogState = 3;}}
Dialog.HideDialogWithCallback = Dialog_HideDialogWithCallback;
function Dialog_HideDialogWithCallback(funcCallback)
{Dialog.funcCallbackOnClose = funcCallback;
Dialog.HideDialog();}
Dialog.FireOnBeforeDialog = Dialog_FireOnBeforeDialog;
function Dialog_FireOnBeforeDialog()
{;
var objControl = null;
var objViewDataNode = CurrentFormData.ViewDataTree();
while (objViewDataNode != null)
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl == null)
{return;}
var OnBeforeDialogFunction = BaseControl.FindFunction(objControl, "OnBeforeDialog", true);
OnBeforeDialogFunction(objControl);
var objViewDataNode = ViewDataNode.FindNext(objViewDataNode);}
;}
Dialog.FireOnAfterDialog = Dialog_FireOnAfterDialog;
function Dialog_FireOnAfterDialog()
{var objControl = null;
var objViewDataNode = CurrentFormData.ViewDataTree();
while (objViewDataNode != null)
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl == null)
{return;}
var OnAfterDialogFunction = BaseControl.FindFunction(objControl, "OnAfterDialog", true);
OnAfterDialogFunction(objControl);
var objViewDataNode = ViewDataNode.FindNext(objViewDataNode);}}
Dialog._HeartBeat = Dialog__HeartBeat;
function Dialog__HeartBeat()
{;
if (Dialog.enumModalDialogState == 0)
{;}
else if (Dialog.enumModalDialogState == 1)
{;
Dialog.intMinimumHeartBeatsUntilDialogShow--;
if (Dialog.intMinimumHeartBeatsUntilDialogShow == 0)
{Dialog._ShowDialog();}
Dialog._RestoreSizeAndPosition();}
else if (Dialog.enumModalDialogState == 2)
{if (Dialog.boolFirstHeartBeatAfterShowing)
{Dialog.boolFirstHeartBeatAfterShowing = false;
var objDialog = document.getElementById("__DialogTable");
var strControlIdToFocus = Dialog.arrDialogData[4];
var objFocusableControl = null;
if (Util.IsNullOrEmptyString(strControlIdToFocus))
{objFocusableControl = Util.FindFirstFocusableHtmlChildControl(objDialog);
;}
else
{objFocusableControl = document.getElementById(strControlIdToFocus);}
if (objFocusableControl != null)
{try
{objFocusableControl.focus();}
catch(e)
{}}
if (Dialog.AllowBranding)
{if (UserAgentInfo.strBrowser != 1)
{var objBrandingImage = document.getElementById("DialogBrandingImage");
if (objBrandingImage != null)
{objBrandingImage.innerHTML = "<img style='position:relative;bottom:0px;right:-37px;width:150px;height:25px;' src='/_layouts/inc/IPFSDialogBrand.png'>";}
var objBrandingImageText = document.getElementById("DialogBrandingImageText");
if (objBrandingImageText != null)
{objBrandingImageText.innerHTML = "<span style='padding-right:7px;color:#9d9d9d;font:8pt Tahoma;position:relative;right:-37px;bottom:0px;width:150px;text-align:right;'>" + IntlCoreStrings.k_strBrandingToolBarLogoPrefix + "</span>";}}}}
if (Dialog.intMinimumHeartBeatsToShow > 0)
{Dialog.intMinimumHeartBeatsToShow--;}
Dialog._RestoreSizeAndPosition();}
else if (Dialog.enumModalDialogState == 3)
{Dialog.intMinimumHeartBeatsToShow--;
if (Dialog.intMinimumHeartBeatsToShow <= 0)
{Dialog._HideTable();
Dialog._HideDialog();}}}
Dialog.DialogPresent = Dialog_DialogPresent;
function Dialog_DialogPresent()
{return Dialog.enumModalDialogState != 0;}
Dialog.TextAlignmentStyle = function()
{return (CurrentFormData.Direction() == "rtl") ? "text-align:left" : "text-align:right";}
Dialog._ShowDialog = Dialog__ShowDialog;
function Dialog__ShowDialog()
{;
var objDialog = document.getElementById("__DialogContainer");
objDialog.innerHTML = Dialog.RenderDialogTemplate(Dialog.arrDialogTemplate, Dialog.arrDialogData);
Dialog._RestoreSizeAndPosition();
objDialog.style.display = "block";
if (UserAgentInfo.strBrowser == 1)
{var objSibling = document.getElementById("__DialogContainer");
var objDialogIFrame = IFrameUtils.InsertIframe(objSibling, "__DialogIFrame", true , "Default");
if (objDialogIFrame != null)
{objDialogIFrame.style.display = "block";}}
var objDialog = document.getElementById("__DialogTable");
if (objDialog != null)
{switch (Dialog.enumPageBackGround)
{case 0:
objDialog.className = objDialog.getAttribute('class1');
break;
case 2:
objDialog.className = objDialog.getAttribute('class2');
break;
default:
break;}}
Dialog.enumModalDialogState = 2;
if (UserAgentInfo.strBrowser == 1)
{Toolbar.EnableViewDropdown(false);}
Dialog.boolFirstHeartBeatAfterShowing = true;}
Dialog.SetupPostbackWaitChangeMessage = Dialog_SetupPostbackWaitChangeMessage
function Dialog_SetupPostbackWaitChangeMessage()
{;
Dialog.objChangePostbackMessageTimer = window.setTimeout(
Dialog._PostbackWaitChangeMessage,
25000);}
Dialog._PostbackWaitChangeMessage = Dialog__PostbackWaitChangeMessage;
function Dialog__PostbackWaitChangeMessage()
{Dialog.objChangePostbackMessageTimer = null;
var divMessage = document.getElementById("DialogProgressMessage");
if (divMessage != null)
{divMessage.innerHTML = IntlCoreStrings.k_strWaitUIMainTimeoutText;
divMessage.style.color = "red";}}
Dialog._HideDialog = Dialog__HideDialog;
function Dialog__HideDialog()
{;
var objDialog = document.getElementById("__DialogContainer");
if (objDialog == null)
{Dialog.DoCallbackOnClose();
return;}
objDialog.style.display = "none";
objDialog.innerHTML = "";
if (UserAgentInfo.strBrowser == 1)
{var objSibling = document.getElementById("__DialogContainer");
var objDialogIFrame = IFrameUtils.InsertIframe(objSibling, "__DialogIFrame", true , "Default");
if (objDialogIFrame != null)
{objDialogIFrame.style.display = "none";}}
var objDialog = document.getElementById("__DialogTable");
if (objDialog != null)
{objDialog.className = objDialog.getAttribute('class0');}
Dialog.enumModalDialogState = 0;
Dialog.boolModalDialogForFocusRestorationPresent = false;
if (Dialog.objShowDialogTimer != null)
{window.clearInterval(Dialog.objShowDialogTimer);
Dialog.objShowDialogTimer = null;}
if (Dialog.objChangePostbackMessageTimer != null)
{window.clearInterval(Dialog.objChangePostbackMessageTimer);
Dialog.objChangePostbackMessageTimer = null;}
if (UserAgentInfo.strBrowser == 1)
{Toolbar.EnableViewDropdown(true);}
Dialog.DoCallbackOnClose();}
Dialog.DoCallbackOnClose = Dialog_DoCallbackOnClose;
function Dialog_DoCallbackOnClose()
{if (Dialog.funcCallbackOnClose != null)
{Dialog.funcCallbackOnClose();}}
Dialog._ShowTable = Dialog__ShowTable;
function Dialog__ShowTable()
{;
Dialog.FireOnBeforeDialog();
var objDialog = document.getElementById("__DialogTable");
if (objDialog != null)
{if (objDialog.style.display != "block" || objDialog.style.zIndex == "-250")
{objDialog.style.display = "block";
objDialog.style.zIndex = "";
Dialog._RestoreSizeAndPosition();}}
;}
Dialog._HideTable = Dialog__HideTable;
function Dialog__HideTable()
{;
var objDialog = document.getElementById("__DialogTable");
if (objDialog != null)
{objDialog.style.zIndex = "-250";
objDialog.style.top = 0;
objDialog.style.left = 0;
objDialog.style.width = 0;
objDialog.style.height = 0;
Dialog.FireOnAfterDialog();}}
Dialog._RestoreSizeAndPosition = Dialog__RestoreSizeAndPosition;
function Dialog__RestoreSizeAndPosition()
{;
var boolClientAreaTooSmallToCenter = false;
var objDialogContainer = document.getElementById("__DialogContainer");
if (objDialogContainer != null)
{if (UserAgentInfo.strBrowser != 1)
{if (objDialogContainer.childNodes != null &&
objDialogContainer.childNodes.length > 0 &&
objDialogContainer.childNodes[0] != null &&
(objDialogContainer.childNodes[0].offsetWidth > window.innerWidth ||
objDialogContainer.childNodes[0].offsetHeight > window.innerHeight))
{boolClientAreaTooSmallToCenter = true;}}
else
{if (objDialogContainer.offsetWidth > document.body.clientWidth ||
objDialogContainer.offsetHeight > document.body.clientHeight)
{boolClientAreaTooSmallToCenter = true;}}}
var objDialog = document.getElementById("__DialogTable");
;
if (objDialog != null && !boolClientAreaTooSmallToCenter)
{objDialog.style.top = CrossBrowserLibrary.GetScrollY();
objDialog.style.left = CrossBrowserLibrary.GetScrollX();
if (UserAgentInfo.strBrowser != 1)
{objDialog.style.width = "100%";
objDialog.style.height = "100%";}
else
{objDialog.style.width = document.body.clientWidth;
objDialog.style.height = document.body.clientHeight;}
;}
if (Dialog.enumModalDialogState == 2 && UserAgentInfo.strBrowser == 1)
{var objSibling = document.getElementById("__DialogContainer");
var objDialogIFrame = IFrameUtils.InsertIframe(objSibling, "__DialogIFrame", true , "Default");
if (objDialogIFrame != null)
{objDialogIFrame.style.top = objDialogContainer.style.top;
objDialogIFrame.style.left = objDialogContainer.style.left;
objDialogIFrame.style.width = objDialogContainer.offsetWidth;
objDialogIFrame.style.height = objDialogContainer.offsetHeight;
;}}}
function Dialog_MaintainModalDialog()
{var objDialog = document.getElementById("__DialogTable");
var objFocusableControl = Util.FindFirstFocusableHtmlChildControl(objDialog);
if (objFocusableControl != null)
{try
{objFocusableControl.focus();}
catch(e)
{document.getElementById("__DialogFocusRetainer").focus();}}
else
{document.getElementById("__DialogFocusRetainer").focus();}}
Dialog.GetInfo = Dialog_GetInfo;
function Dialog_GetInfo(enumDialog)
{var arrDialogData = null;
try
{arrDialogData = eval("__dialogInfo_" + enumDialog);}
catch(e)
{}
;
return arrDialogData;}
Dialog.GetTemplate = Dialog_GetTemplate;
function Dialog_GetTemplate(enumDialog)
{var arrDialogTemplate = null;
try
{if (Dialog.AllowBranding)
{arrDialogTemplate = eval("__dialogTemplate_" + enumDialog);}
else
{arrDialogTemplate = eval("__dialogTemplate_" + enumDialog +
"_NoBranding");}}
catch(e)
{}
return arrDialogTemplate;}
Dialog.GetData = Dialog_GetData;
function Dialog_GetData(enumDialog)
{var funcGetDialogData = null;
try
{funcGetDialogData = eval("__GetDialogData_" + enumDialog);}
catch(e)
{}
var arrDialogData = null;
if (!Util.IsNullOrUndefined(funcGetDialogData))
{arrDialogData = funcGetDialogData();}
return arrDialogData;}
Dialog.RenderDialogTemplate = Dialog_RenderDialogTemplate;
function Dialog_RenderDialogTemplate(arrDialogTemplate, arrDialogData)
{;
;
var arrStringBuilder = new Array();
for(var i = 0; i < arrDialogTemplate.length; i++)
{switch(Util.GetDataType(arrDialogTemplate[i]))
{case(2):
arrStringBuilder.push(arrDialogTemplate[i]);
break;
case(1):
arrStringBuilder.push(arrDialogData[arrDialogTemplate[i]]);
break;
case(3):
{var arrRepeatingContent = arrDialogTemplate[i];
if (arrRepeatingContent.length != 2 ||
Util.GetDataType(arrRepeatingContent[0]) != 1 ||
Util.GetDataType(arrRepeatingContent[1]) != 3 ||
Util.GetDataType(arrRepeatingContent[1][0]) != 3 ||
Util.GetDataType(arrRepeatingContent[1][1]) != 3)
{;}
else
{var arrRepeatingContentData = arrDialogData[arrRepeatingContent[0]];
var arrRepeatingContentTemplate = arrRepeatingContent[1][0];
var arrRepeatingContentSeperatorTemplate = arrRepeatingContent[1][1];
var firstItem = true;
for (var j = 0; j < arrRepeatingContentData.length; j++)
{if (arrRepeatingContentData[j] != null)
{if (!firstItem)
{arrStringBuilder.push(Dialog.RenderDialogTemplate(arrRepeatingContentSeperatorTemplate, arrRepeatingContentData[j]));}
arrStringBuilder.push(Dialog.RenderDialogTemplate(arrRepeatingContentTemplate, arrRepeatingContentData[j]));
firstItem = false;}}}
break;}
default:
;}}
return arrStringBuilder.join("");}
Dialog.GetOnDemandData = Dialog_GetOnDemandData;
function Dialog_GetOnDemandData(arrTemplate, funcGetData)
{__dialogTemplate_ = arrTemplate;
__GetDialogData_ = funcGetData;}
Dialog.OnTerminateButton = Dialog_OnTerminateButton;
function Dialog_OnTerminateButton(strMessage)
{Dialog.HideDialog();}
Dialog.GetButtonDataArray = Dialog_GetButtonDataArray;
function Dialog_GetButtonDataArray(strButtonCaption, strButtonCode, boolButtonTerminating)
{var arrData = null;
if (strButtonCaption != null && strButtonCode != null && boolButtonTerminating != null)
{if (boolButtonTerminating)
{strButtonCode = "Dialog.OnTerminateButton();" + strButtonCode;}
arrData =
[0
,strButtonCaption
,strButtonCode
];}
return arrData;}
Dialog.ShowPostbackDialog = Dialog_ShowPostbackDialog;
function Dialog_ShowPostbackDialog()
{Dialog_ShowModalDialogEx(
"Progress",
100 / 50 ,
200 / 50 ,
false ,
null ,
null );}
Dialog.Alert = Dialog_Alert;
function Dialog_Alert(strMessage, funcCallbackOnClose)
{var arrData = new Array();
arrData[0] = "";
arrData[1] = IntlCoreStrings.k_strAlertButtonOK;
arrData[2] = [[0
,IntlCoreStrings.k_strAlertButtonOK
,"Dialog.OnTerminateButton();"
]];
arrData[10] = strMessage;
Dialog.ShowModalDialog("Alert", arrData, funcCallbackOnClose);}
Dialog.Save = Dialog_Save;
function Dialog_Save(strFileName, boolForceSaveAs, boolOverwrite)
{EventLog_Add(
14,
null,
strFileName,
boolForceSaveAs,
boolOverwrite,
true ,
true ,
false ,
7,
0);}
Dialog.FileAttachmentServerRequest = Dialog_FileAttachmentServerRequest;
function Dialog_FileAttachmentServerRequest()
{var objFileUploadControl = document.getElementById("FileAttachmentUpload");
if (objFileUploadControl != null &&
(objFileUploadControl.value == null || objFileUploadControl.value.length == 0))
{return false;}
var objControl = Dialog.objClientSideData;
;
try
{EventLog_Add(
20,
objControl,
objControl.id,
null,
null,
true ,
true ,
true ,
0 ,
0);}
catch (e)
{if (UserAgentInfo.strBrowser == 1 &&
e.number == -2147024891 )
{Dialog.HideDialog();
UserMessages.ShowAlertMessage(IntlCoreStrings.k_strFileAttachmentUploadFileMissingError, true);}
else
{throw(e);}}
return true;}
Dialog.ShowFinalMessage = Dialog_ShowFinalMessage;
function Dialog_ShowFinalMessage(strMessage, fDocumentHasBeenClosed)
{UserMessages.boolDocumentClosed = fDocumentHasBeenClosed;
Dialog.strCurrentMessageText = strMessage;
Dialog_ShowModalDialogEx(
"FinalMessage",
1,
1,
false ,
null,
null);}
var __dialogInfo_Progress =
["Progress"
,1
,0
,0
];
var __dialogTemplate_Progress =
["\u003cdiv class=\u0022ProgressDialogBorder\u0022\u003e\u003cdiv id=\u0022DialogProgress\u0022 class=\u0022ProgressDialog\u0022\u003e\u003cdiv id=\u0022DialogProgressMessage\u0022\u003e"
,10
,"\u003c\u002fdiv\u003e\u003cbr \u002f\u003e\u003cimg src=\u0022\u002f_layouts\u002finc\u002factivityanimation.gif?rev=sHmDD9LgTlytF\u00252FQiW0z\u00252Bow\u00253D\u00253D\u0022 alt=\u0022"
,11
,"\u0022 \u002f\u003e\u003c\u002fdiv\u003e\u003c\u002fdiv\u003e"
];
function __GetDialogData_Progress(){var arrData = new Array();
arrData[0] = "";
arrData[1] = "";
arrData[3] = CurrentFormData.Direction();
arrData[4] = "";
arrData[5] = Dialog.TextAlignmentStyle();
arrData[2] = [];
arrData[10] = IntlCoreStrings.k_strWaitUIMainText;
arrData[11] = IntlCoreStrings.k_strWaitUIAltTextForProgressImage;return arrData;};
var __dialogInfo_SaveAs =
["SaveAs"
,0
,1
,1
];
var __dialogInfo_Alert =
["Alert"
,0
,0
,0
];
var __dialogTemplate_Alert =
["\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 style=\u0022height:296px;width:447px;border:1px solid #5c7da4;direction:"
,3
,";\u0022\u003e\u003ctr class=\u0022StandardDialogTopRow\u0022\u003e\u003ctd style=\u0022height:65px\u0022\u003e\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 border=\u00220px\u0022\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogTitle\u0022 id=\u0022DialogAlert\u0022\u003e"
,1
,"\u003c\u002ftd\u003e\u003ctd style=\u0022width:196px;padding-right:23px;padding-left:23px;\u0022\u003e\u003cspan id=\u0022DialogBrandingImage\u0022 style=\u0022position:relative;bottom:0px;right:+9px;width:150px;height:25px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader\u0028src=\u0026#39;\u002f_layouts\u002finc\u002fIPFSDialogBrand.png\u0026#39;, sizingMethod=\u0026#39;scale\u0026#39;\u0029;\u0022\u003e\u003c\u002fspan\u003e\u003cbr\u003e\u003cspan id=\u0022DialogBrandingImageText\u0022 style=\u0022padding-right:7px;color:#9d9d9d;font:8pt Tahoma;position:absolute;bottom:269px;width:150px;text-align:right;\u0022\u003e "
,6
,"\u003c\u002fspan\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogBody\u0022\u003e\u003cdiv id=\u0022DialogAlertMessage\u0022 style=\u0022font-size:10pt;\u0022\u003e"
,10
,"\u003c\u002fdiv\u003e\u003cinput autocomplete=\u0022off\u0022 type=\u0022text\u0022 tabindex=\u0022-1\u0022 style=\u0022width:0px;height:0px;border:none;padding:0;border:0;position:absolute;\u0022 \u002f\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:6px;background-color:#ECECEC;\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogButtonArea\u0022 style=\u0022"
,5
,"\u0022 id=\u0022__DialogButtons\u0022\u003e"
,[2
,[["\u003cinput class=\u0022DialogButton\u0022 type=\u0022"
,4
,"\u0022 id=\u0022DialogButton"
,0
,"\u0022 onClick=\u0022"
,2
,"\u0022 accesskey=\u0022"
,3
,"\u0022 value=\u0022"
,1
,"\u0022 \u002f\u003e"
]
,["\u003cspan style=\u0022vertical-align:middle;width:2;height:17;overflow:hidden;background-image:url(\u002f_layouts\u002finc\u002fMergedImage2.png?rev=MgwMZrsJcX2hRvGHEYkZlQ\u00253D\u00253D);background-position:-30 -4;margin-left:6px;margin-right:6px;\u0022 align=\u0022absmiddle\u0022\u003e\u003cimg src=\u0022\u002f_layouts\u002finc\u002fblank.gif\u0022 \u002f\u003e\u003c\u002fspan\u003e"
]
]
]
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:4px;background:url\u0028\u0026#39;\u002f_layouts\u002finc\u002fIPFSDialogBtmGrad.png?rev=la9GWlnH0bUlBEPW62ByBA%3D%3D\u0026#39;\u0029 repeat-x; background-position:0 -37\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e"
];
function __GetDialogData_Alert(){var arrData = new Array();
arrData[0] = "Alert";
arrData[1] = "Alert";
arrData[3] = CurrentFormData.Direction();
arrData[4] = "";
arrData[5] = Dialog.TextAlignmentStyle();
arrData[6] = IntlCoreStrings.k_strBrandingToolBarLogoPrefix;
arrData[2] = [];
arrData[10] = "";
return arrData;};
var __dialogInfo_FileAttachment =
["FileAttachment"
,0
,0
,0
];
var __dialogTemplate_FileAttachment =
["\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 style=\u0022height:296px;width:447px;border:1px solid #5c7da4;direction:"
,3
,";\u0022\u003e\u003ctr class=\u0022StandardDialogTopRow\u0022\u003e\u003ctd style=\u0022height:65px\u0022\u003e\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 border=\u00220px\u0022\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogTitle\u0022 id=\u0022DialogFileAttachment\u0022\u003e"
,1
,"\u003c\u002ftd\u003e\u003ctd style=\u0022width:196px;padding-right:23px;padding-left:23px;\u0022\u003e\u003cspan id=\u0022DialogBrandingImage\u0022 style=\u0022position:relative;bottom:0px;right:+9px;width:150px;height:25px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader\u0028src=\u0026#39;\u002f_layouts\u002finc\u002fIPFSDialogBrand.png\u0026#39;, sizingMethod=\u0026#39;scale\u0026#39;\u0029;\u0022\u003e\u003c\u002fspan\u003e\u003cbr\u003e\u003cspan id=\u0022DialogBrandingImageText\u0022 style=\u0022padding-right:7px;color:#9d9d9d;font:8pt Tahoma;position:absolute;bottom:269px;width:150px;text-align:right;\u0022\u003e "
,6
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogBody\u0022\u003e\u003cdiv style=\u0022font-size:10pt;\u0022\u003e"
,11
,"\u003c\u002fdiv\u003e\u003cbr \u002f\u003e\u003cdiv\u003e\u003cinput style=\u0022font-size:10pt;border:1px solid black;width:100\u0025;\u0022 type=\u0022file\u0022 id=\u0022FileAttachmentUpload\u0022 name=\u0022FileAttachmentUpload\u0022 title=\u0022"
,1
,"\u0022 \u002f\u003e\u003c\u002fdiv\u003e\u003cinput autocomplete=\u0022off\u0022 type=\u0022text\u0022 tabindex=\u0022-1\u0022 style=\u0022width:0px;height:0px;border:none;padding:0;border:0;position:absolute;\u0022 \u002f\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:6px;background-color:#ECECEC;\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogButtonArea\u0022 style=\u0022"
,5
,"\u0022 id=\u0022__DialogButtons\u0022\u003e"
,[2
,[["\u003cinput class=\u0022DialogButton\u0022 type=\u0022"
,4
,"\u0022 id=\u0022DialogButton"
,0
,"\u0022 onClick=\u0022"
,2
,"\u0022 accesskey=\u0022"
,3
,"\u0022 value=\u0022"
,1
,"\u0022 \u002f\u003e"
]
,["\u003cspan style=\u0022vertical-align:middle;width:2;height:17;overflow:hidden;background-image:url(\u002f_layouts\u002finc\u002fMergedImage2.png?rev=MgwMZrsJcX2hRvGHEYkZlQ\u00253D\u00253D);background-position:-30 -4;margin-left:6px;margin-right:6px;\u0022 align=\u0022absmiddle\u0022\u003e\u003cimg src=\u0022\u002f_layouts\u002finc\u002fblank.gif\u0022 \u002f\u003e\u003c\u002fspan\u003e"
]
]
]
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:4px;background:url\u0028\u0026#39;\u002f_layouts\u002finc\u002fIPFSDialogBtmGrad.png?rev=la9GWlnH0bUlBEPW62ByBA%3D%3D\u0026#39;\u0029 repeat-x; background-position:0 -37\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e"
];
function __GetDialogData_FileAttachment(){var arrData = new Array();
arrData[0] = "Attach File";
arrData[1] = "Attach File";
arrData[3] = CurrentFormData.Direction();
arrData[4] = "";
arrData[5] = Dialog.TextAlignmentStyle();
arrData[2] = [[0
,"Upload"
,"return Dialog.FileAttachmentServerRequest\u0028\u0029;;Util.StopEventProprogation\u0028event\u0029;return false;"
,""
,"submit"
]
,[1
,"Cancel"
,"Dialog.OnTerminateButton\u0028\u0029;;Util.StopEventProprogation\u0028event\u0029;return false;"
,""
,"button"
]
];
arrData[11] = IntlCoreStrings.k_strFileAttachmentDialogMessage;
arrData[6] = IntlCoreStrings.k_strBrandingToolBarLogoPrefix;return arrData;};
var __dialogInfo_FinalMessage =
["FinalMessage"
,2
,0
,0
];
var __dialogTemplate_FinalMessage =
["\u003cdiv id=\u0022DialogFinalMessage\u0022 class=\u0022FinalMessageDialog\u0022\u003e\u003cdiv\u003e"
,10
,"\u003c\u002fdiv\u003e\u003c\u002fdiv\u003e"
];
function __GetDialogData_FinalMessage(){var arrData = new Array();
arrData[0] = "";
arrData[1] = "";
arrData[3] = CurrentFormData.Direction();
arrData[4] = "";
arrData[5] = Dialog.TextAlignmentStyle();
arrData[2] = [];
arrData[10] = Dialog.strCurrentMessageText;return arrData;};
var __dialogInfo_ErrorDialog =
["ErrorDialog"
,0
,0
,0
];
var __dialogTemplate_ErrorDialog =
["\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 style=\u0022height:296px;width:447px;border:1px solid #5c7da4;direction:"
,3
,";\u0022\u003e\u003ctr class=\u0022StandardDialogTopRow\u0022\u003e\u003ctd style=\u0022height:65px\u0022\u003e\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 border=\u00220px\u0022\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogTitle\u0022 id=\u0022DialogErrorDialog\u0022\u003e"
,1
,"\u003c\u002ftd\u003e\u003ctd style=\u0022width:196px;padding-right:23px;padding-left:23px;\u0022\u003e\u003cspan id=\u0022DialogBrandingImage\u0022 style=\u0022position:relative;bottom:0px;right:+9px;width:150px;height:25px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader\u0028src=\u0026#39;\u002f_layouts\u002finc\u002fIPFSDialogBrand.png\u0026#39;, sizingMethod=\u0026#39;scale\u0026#39;\u0029;\u0022\u003e\u003c\u002fspan\u003e\u003cbr\u003e\u003cspan id=\u0022DialogBrandingImageText\u0022 style=\u0022padding-right:7px;color:#9d9d9d;font:8pt Tahoma;position:absolute;bottom:269px;width:150px;text-align:right;\u0022\u003e "
,6
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogBody\u0022\u003e\u003cdiv id=\u0022DialogErrorDialogMessage\u0022\u003e\u003ctable style=\u0022table-layout:fixed\u0022\u003e\u003ctr\u003e\u003ctd class=\u0022ErrorPageNormalText\u0022 id=\u0022ErrorDialogShortMessage\u0022\u003e"
,10
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022ErrorPageNormalText\u0022\u003e"
,11
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022ErrorPageNormalText\u0022\u003e"
,12
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002fdiv\u003e\u003ctable style=\u0022margin:0px;"
,13
,"\u0022\u003e\u003ctr\u003e\u003ctd\u003e\u003ca onClick=\u0022UserMessageError.ToggleDetails\u0028\u0029;Util.StopEventProprogation\u0028event\u0029;\u0022 href=\u0022#\u0022 id=\u0022ErrorDialogDetailsLink\u0022 class=\u0022ErrorPageItalicText\u0022 accesskey=\u0022"
,14
,"\u0022\u003e"
,15
,"\u003c\u002fa\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd\u003e\u003cspan style=\u0022display:none;\u0022 id=\u0022ErrorDialogDetailsSection\u0022\u003e\u003cdiv readonly=\u0022true\u0022 class=\u0022ErrorPageDetailsText\u0022\u003e"
,16
,"\u003c\u002fdiv\u003e\u003c\u002fspan\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003cinput autocomplete=\u0022off\u0022 type=\u0022text\u0022 tabindex=\u0022-1\u0022 style=\u0022width:0px;height:0px;border:none;padding:0;border:0;position:absolute;\u0022 \u002f\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:6px;background-color:#ECECEC;\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogButtonArea\u0022 style=\u0022"
,5
,"\u0022 id=\u0022__DialogButtons\u0022\u003e"
,[2
,[["\u003cinput class=\u0022DialogButton\u0022 type=\u0022"
,4
,"\u0022 id=\u0022DialogButton"
,0
,"\u0022 onClick=\u0022"
,2
,"\u0022 accesskey=\u0022"
,3
,"\u0022 value=\u0022"
,1
,"\u0022 \u002f\u003e"
]
,["\u003cspan style=\u0022vertical-align:middle;width:2;height:17;overflow:hidden;background-image:url(\u002f_layouts\u002finc\u002fMergedImage2.png?rev=MgwMZrsJcX2hRvGHEYkZlQ\u00253D\u00253D);background-position:-30 -4;margin-left:6px;margin-right:6px;\u0022 align=\u0022absmiddle\u0022\u003e\u003cimg src=\u0022\u002f_layouts\u002finc\u002fblank.gif\u0022 \u002f\u003e\u003c\u002fspan\u003e"
]
]
]
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:4px;background:url\u0028\u0026#39;\u002f_layouts\u002finc\u002fIPFSDialogBtmGrad.png?rev=la9GWlnH0bUlBEPW62ByBA%3D%3D\u0026#39;\u0029 repeat-x; background-position:0 -37\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e"
];
function __GetDialogData_ErrorDialog(){var arrData = new Array();
arrData[0] = "";
arrData[1] = "";
arrData[3] = CurrentFormData.Direction();
arrData[4] = "";
arrData[5] = Dialog.TextAlignmentStyle();
arrData[2] = [];
arrData[6] = IntlCoreStrings.k_strBrandingToolBarLogoPrefix;return arrData;};
var __dialogInfo_InstallDSigCtrl =
["InstallDSigCtrl"
,0
,0
,0
];
var __dialogTemplate_InstallDSigCtrl =
["\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 style=\u0022height:296px;width:447px;border:1px solid #5c7da4;direction:"
,3
,";\u0022\u003e\u003ctr class=\u0022StandardDialogTopRow\u0022\u003e\u003ctd style=\u0022height:65px\u0022\u003e\u003ctable cellpadding=\u00220px\u0022 cellspacing=\u00220px\u0022 border=\u00220px\u0022\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogTitle\u0022 id=\u0022DialogInstallDSigCtrl\u0022\u003e"
,1
,"\u003c\u002fspan\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogBody\u0022\u003e\u003cdiv id=\u0022DialogInstallDSigCtrlMessage\u0022 style=\u0022font-size:10pt;\u0022\u003e"
,10
,"\u003c\u002fdiv\u003e\u003cinput autocomplete=\u0022off\u0022 type=\u0022text\u0022 tabindex=\u0022-1\u0022 style=\u0022width:0px;height:0px;border:none;padding:0;border:0;position:absolute;\u0022 \u002f\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:6px;background-color:#ECECEC;\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogButtonArea\u0022 style=\u0022"
,5
,"\u0022 id=\u0022__DialogButtons\u0022\u003e"
,[2
,[["\u003cinput class=\u0022DialogButton\u0022 type=\u0022"
,4
,"\u0022 id=\u0022DialogButton"
,0
,"\u0022 onClick=\u0022"
,2
,"\u0022 accesskey=\u0022"
,3
,"\u0022 value=\u0022"
,1
,"\u0022 \u002f\u003e"
]
,["\u003cspan style=\u0022vertical-align:middle;width:2;height:17;overflow:hidden;background-image:url\u0028\u002f_layouts\u002finc\u002fMergedImage2.png?rev=MgwMZrsJcX2hRvGHEYkZlQ\u00253D\u00253D\u0029;background-position:-30 -4;margin-left:6px;margin-right:6px;\u0022 align=\u0022absmiddle\u0022\u003e\u003cimg src=\u0022\u002f_layouts\u002finc\u002fblank.gif?rev=MgI7szz7KhmQpO8thbasFg\u00253D\u00253D\u0022 \u002f\u003e\u003c\u002fspan\u003e"
]
]
]
,"\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd style=\u0022height:4px;background:url\u0028\u0026#39;\u002f_layouts\u002finc\u002fIPFSDialogBtmGrad.png\u0026#39;\u0029 repeat-x; background-position:0 -37\u0022\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e"
];
function __GetDialogData_InstallDSigCtrl(){var arrData = new Array();
arrData[0] = "Install Digital Signature Control";
arrData[1] = "Install Digital Signature Control";
arrData[3] = CurrentFormData.Direction();
arrData[4] = "";
arrData[5] = Dialog.TextAlignmentStyle();
arrData[6] = "";
arrData[2] = [[0
,"Yes"
,"InDocSign_InstallAXControls\u0028\u0029;;Util.StopEventProprogation\u0028event\u0029;return false;"
,""
,"submit"
]
,[1
,"No"
,"Dialog.OnTerminateButton\u0028\u0029;InDocSign_InstallAXControlsDone\u0028\u0029;;Util.StopEventProprogation\u0028event\u0029;return false;"
,""
,"button"
]
];
arrData[10] = "IntlCoreStrings.k_strPromptInstallAXControls";return arrData;};
var __dialogTemplate_Progress_NoBranding = __dialogTemplate_Progress;
var __dialogTemplate_FinalMessage_NoBranding = __dialogTemplate_FinalMessage;
var __dialogTemplate_InstallDSigCtrl_NoBranding = __dialogTemplate_InstallDSigCtrl;
var __dialogTemplate_Alert_NoBranding = __dialogTemplate_Alert.slice();
__dialogTemplate_Alert_NoBranding.splice(4, 3, "\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogBody\u0022\u003e\u003cdiv id=\u0022DialogAlertMessage\u0022 style=\u0022font-size:10pt;\u0022\u003e");
var __dialogTemplate_FileAttachment_NoBranding = __dialogTemplate_FileAttachment.slice();
__dialogTemplate_FileAttachment_NoBranding.splice (4, 3, "\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogBody\u0022\u003e\u003cdiv style=\u0022font-size:10pt;\u0022\u003e");
var __dialogTemplate_ErrorDialog_NoBranding = __dialogTemplate_ErrorDialog.slice();
__dialogTemplate_ErrorDialog_NoBranding.splice (4, 3, "\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003c\u002ftable\u003e\u003c\u002ftd\u003e\u003c\u002ftr\u003e\u003ctr\u003e\u003ctd class=\u0022StandardDialogBody\u0022\u003e\u003cdiv id=\u0022DialogErrorDialogMessage\u0022\u003e\u003ctable style=\u0022table-layout:fixed\u0022\u003e\u003ctr\u003e\u003ctd class=\u0022ErrorPageNormalText\u0022 id=\u0022ErrorDialogShortMessage\u0022\u003e");
function DialogInfo() {};
DialogInfo.GetDialogName = DialogInfo_GetDialogName;
function DialogInfo_GetDialogName(arrDialogInfo)
{return DialogInfo._GetDataValue(arrDialogInfo, 0);}
DialogInfo.GetPageBackgroundType = DialogInfo_GetPageBackgroundType;
function DialogInfo_GetPageBackgroundType(arrDialogInfo)
{return DialogInfo._GetDataValue(arrDialogInfo, 1);}
DialogInfo.GetTemplateType = DialogInfo_GetTemplateType;
function DialogInfo_GetTemplateType(arrDialogInfo)
{return DialogInfo._GetDataValue(arrDialogInfo, 2);}
DialogInfo.GetDataType = DialogInfo_GetDataType;
function DialogInfo_GetDataType(arrDialogInfo)
{return DialogInfo._GetDataValue(arrDialogInfo, 3);}
DialogInfo._GetDataValue = DialogInfo__GetDataValue
function DialogInfo__GetDataValue(arrDialogInfo, enumIndex)
{var objValue = null;
try
{objValue = arrDialogInfo[enumIndex];}
catch (e)
{}
;
return objValue;}
var arrStructuralEditingContextMenu = null;
function HoverMenu() {}
HoverMenu.arrWidgetMap = new Array();
HoverMenu.strVisibleMenuID = null;
HoverMenu.isVisible = false;
HoverMenu.objSelectedMenuItem = null;
HoverMenu.boolProcessedEnterClick = false;
HoverMenu.objMenuAccessSourceControl = null;
HoverMenu.ActionXCollectionInsert			= "xCollection::insert";
HoverMenu.ActionXCollectionInsertBefore		= "xCollection::insertBefore";
HoverMenu.ActionXCollectionInsertAfter		= "xCollection::insertAfter";
HoverMenu.ActionXCollectionRemove			= "xCollection::remove";
HoverMenu.ActionXCollectionRemoveAll		= "xCollection::removeAll";
HoverMenu.ActionXOptionalInsert				= "xOptional::insert";
HoverMenu.ActionXOptionalRemove				= "xOptional::remove";
HoverMenu.xRichTextEdit						= "xRichText:edit";
HoverMenu.xFileAttachmentAttach				= "xFileAttachment::attach";
HoverMenu.xFileAttachmentDownload			= "xFileAttachment::download";
HoverMenu.xFileAttachmentRemove				= "xFileAttachment::remove";
HoverMenu.ScriptToExecute = new Array();
HoverMenu.ScriptToExecute[HoverMenu.ActionXCollectionInsert]		= "xCollectionControl.Insert";
HoverMenu.ScriptToExecute[HoverMenu.ActionXCollectionInsertBefore]	= "xCollectionControl.InsertBefore";
HoverMenu.ScriptToExecute[HoverMenu.ActionXCollectionInsertAfter]	= "xCollectionControl.InsertAfter";
HoverMenu.ScriptToExecute[HoverMenu.ActionXCollectionRemove]		= "xCollectionControl.Remove";
HoverMenu.ScriptToExecute[HoverMenu.ActionXCollectionRemoveAll]		= "xCollectionControl.RemoveAll";
HoverMenu.ScriptToExecute[HoverMenu.ActionXOptionalInsert]		= "Section.Insert";
HoverMenu.ScriptToExecute[HoverMenu.ActionXOptionalRemove]		= "Section.Remove";
HoverMenu.ScriptToExecute[HoverMenu.xRichTextEdit]				= "RichTextBox.InvokeEditor";
HoverMenu.ScriptToExecute[HoverMenu.xFileAttachmentAttach]		= "FileAttachment.InvokeAttach";
HoverMenu.ScriptToExecute[HoverMenu.xFileAttachmentDownload]	= "FileAttachment.InvokeDownload";
HoverMenu.ScriptToExecute[HoverMenu.xFileAttachmentRemove]		= "FileAttachment.InvokeRemove";
HoverMenu.ShowMenu = HoverMenu_ShowMenu;
function HoverMenu_ShowMenu(objWidgetAnchor)
{if (!BaseControl.CanHandleEvents())
{return;}
var strMenuID;
var objWidget;
var objMenu;
var strContainerControlID;
var objContainerControl;
var strHoverControlID;
;
if (objWidgetAnchor == null)
{return;}
if (IP_DatePicker.Close != null)
{IP_DatePicker.Close();}
objWidget = objWidgetAnchor.parentNode;
strHoverControlID = objWidget.id;
;
if (!Util.IsNonEmptyString(strHoverControlID))
{return;}
strMenuID = strHoverControlID + "_" + "Menu";
if (HoverMenu.strVisibleMenuID != null && HoverMenu.strVisibleMenuID == strMenuID)
{HoverMenu.HideMenu();
return;}
HoverMenu.HideMenu();
objMenu = document.getElementById(strMenuID);
;
if (objMenu == null || objMenu.style == null)
{return;}
strContainerControlID = BaseControl.GetContainerId(objWidget.id);
objContainerControl = document.getElementById(strContainerControlID);
;
if (objContainerControl == null)
{return;}
var objContainerViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objContainerControl);
var arrContainerChilren = ViewDataNode.GetChildNodes(objContainerViewDataNode);
var objCollectionControl = ViewDataNode.GetParent(objContainerViewDataNode);
if (ViewDataNode.IsDisabled(objCollectionControl))
{return;}
if (arrContainerChilren.length == 1)
{var objSnippet = ViewDataNode_GetSnippetElement(arrContainerChilren[0]);
if (Snippet.GetScriptClass(objSnippet) == "RichTextBox")
{RichTextBox.InvokeEditor(strContainerControlID);
return;}}
SelectionService.Select(objContainerControl);
SelectionService.RemoveAllNonStickyHighlight();
var strMenuHtml = HoverMenu.GenerateMenuHtml(objContainerControl);
if (!Util.IsNonEmptyString(strMenuHtml))
{;}
objMenu.innerHTML = strMenuHtml;
objMenu.style.display = "block";
objMenu.style.zIndex = "50";
var objMenuIframe = IFrameUtils.InsertIframe(objMenu, "__HoverMenuIframe", true , "49");
IFrameUtils.PlaceIFrameBehindControl(objMenu, objMenuIframe)
HoverMenu.strVisibleMenuID = strMenuID;
HoverMenu.isVisible = true;
HoverMenu.SelectMenuItem(objMenu.childNodes[0]);}
HoverMenu.HideMenu = HoverMenu_HideMenu;
function HoverMenu_HideMenu()
{var strCurrentVisibleMenuID = HoverMenu.strVisibleMenuID;
HoverMenu.strVisibleMenuID = null;
if (strCurrentVisibleMenuID != null)
{var objMenu;
objMenu = document.getElementById(strCurrentVisibleMenuID);
if (objMenu != null)
{objMenu.style.display = "none";
objMenu.innerHTML = "";
IFrameUtils.HideIFrame("__HoverMenuIframe");}
HoverMenu.objMenuAccessSourceControl = null;}
HoverMenu.isVisible = false;}
HoverMenu.GetXmlToEdit = HoverMenu_GetXmlToEdit;
function HoverMenu_GetXmlToEdit(objCollectionViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objCollectionViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType == 4
|| enumSnippetType == 2)
{return IP_Collection.GetXmlToEdit(objSnippetElement);}
else
{return null;}}
function HoverMenu_ResetWidgetMap()
{HoverMenu.arrWidgetMap = new Array();}
function HoverMenu_ShouldShowWidget(objContainerControl)
{var boolShouldShow = HoverMenu.arrWidgetMap[objContainerControl.id];
if (boolShouldShow == null)
{var strMenuHtml = HoverMenu.GenerateMenuHtml(objContainerControl);
boolShouldShow = Util.IsNonEmptyString(strMenuHtml);
HoverMenu.arrWidgetMap[objContainerControl.id] = boolShouldShow;}
return boolShouldShow;}
HoverMenu.GenerateMenuHtml = HoverMenu_GenerateMenuHtml;
function HoverMenu_GenerateMenuHtml(objContainerControl)
{var strXmlToEdit;
var strCollectionControlId;
var objCollectionControl;
var objStringBuilder = new Array();
var strContainerXmlToEdit;
var objContainerViewDataNode;
;
var objContainerViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objContainerControl);
if (arrStructuralEditingContextMenu == null ||
arrStructuralEditingContextMenu.length == 0 ||
Container.IsSigned(objContainerViewDataNode))
{;
return "";}
strCollectionControlId = BaseControl.GetContainerId(objContainerControl.id);
;
objCollectionControl = document.getElementById(strCollectionControlId);
;
strContainerXmlToEdit = HoverMenu.GetXmlToEdit(ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl));
if (!Util.IsNonEmptyString(strContainerXmlToEdit))
{;
return "";}
var boolDefaultDeleteActionFound = false;
for (var i = 0; i < arrStructuralEditingContextMenu.length; i++)
{var strScriptToExecute = null;
var boolDefaultInsertAfterAction = false;
var boolDefaultDeleteAction = false;
var strAction		= arrStructuralEditingContextMenu[i][0];
var strXmlToEdit	= arrStructuralEditingContextMenu[i][1];
var strCaption		= arrStructuralEditingContextMenu[i][2];
var strShowIf		= arrStructuralEditingContextMenu[i][3];
;
strShowIf = "immediate";
switch (strAction)
{case ("xCollection::insertBefore"):
case ("xCollection::insertAfter"):
case ("xCollection::remove"):
case ("xCollection::removeAll"):
case ("xOptional::remove"):
{if (strXmlToEdit == strContainerXmlToEdit)
{strScriptToExecute = HoverMenu.ScriptToExecute[strAction] + "('" + objContainerControl.id + "','" + strXmlToEdit +"');";
if (strAction == "xCollection::insertAfter")
{boolDefaultInsertAfterAction = true;}
if (!boolDefaultDeleteActionFound &&
(strAction == "xCollection::remove" || strAction == "xOptional::remove"))
{boolDefaultDeleteAction = true;
boolDefaultDeleteActionFound = true;}}
break;}
case (HoverMenu.xRichTextEdit):
{if (strXmlToEdit == strContainerXmlToEdit)
{var arrDataNodeChildren = ViewDataNode.GetChildNodes(objContainerViewDataNode);
strScriptToExecute = HoverMenu.ScriptToExecute[strAction] + "('" + ViewDataNode.GetHtmlId(arrDataNodeChildren[0]) + "','" + strXmlToEdit +"');";}
break;}
case (HoverMenu.xFileAttachmentAttach):
case (HoverMenu.xFileAttachmentDownload):
case (HoverMenu.xFileAttachmentRemove):
{if (strXmlToEdit == strContainerXmlToEdit)
{var arrDataNodeChildren = ViewDataNode.GetChildNodes(objContainerViewDataNode);
var fileAttachmentElement = arrDataNodeChildren[0];
if (FileAttachment.IsActionEnabled(strAction, fileAttachmentElement))
{strScriptToExecute = HoverMenu.ScriptToExecute[strAction] + "('" + ViewDataNode.GetHtmlId(fileAttachmentElement) + "','" + strXmlToEdit +"');";}}
break;}
case (HoverMenu.xRichTextEdit):
{if (strXmlToEdit == strContainerXmlToEdit)
{var arrDataNodeChildren = ViewDataNode.GetChildNodes(objContainerViewDataNode);
strScriptToExecute = HoverMenu.ScriptToExecute[strAction] + "('" + ViewDataNode.GetHtmlId(arrDataNodeChildren[0]) + "','" + strXmlToEdit +"');";}
break;}
case ("xCollection::insert"):
case ("xOptional::insert"):
{var strChildCollectionControlType = null;
var arrDataNodeChildren = ViewDataNode.GetChildNodes(objContainerViewDataNode);
for (var nChildIndex = 0; nChildIndex < arrDataNodeChildren.length; nChildIndex++)
{var objChildCollectionDataNode = arrDataNodeChildren[nChildIndex];
var strChildXmlToEdit = HoverMenu.GetXmlToEdit(objChildCollectionDataNode);
if (strChildXmlToEdit != null && strChildXmlToEdit == strXmlToEdit)
{if (strAction == "xOptional::insert" &&
Snippet.GetScriptClass(ViewDataNode_GetSnippetElement(objChildCollectionDataNode)) == "Section")
{var arrDataNodeCollectionChildren = ViewDataNode.GetChildNodes(objChildCollectionDataNode);
var nChildCount = arrDataNodeCollectionChildren.length;
if (nChildCount > 0)
{;
break;}}
strScriptToExecute = HoverMenu.ScriptToExecute[strAction] + "('" + ViewDataNode.GetHtmlId(objChildCollectionDataNode) + "','" + strXmlToEdit +"');";
break;}}
break;}
default:
{}}
if (strScriptToExecute != null)
{var strHtml;
if (boolDefaultInsertAfterAction)
{strCaption = Util.FormatString(IntlCoreStrings.k_strCtrlEnterFormat, strCaption);}
else if (boolDefaultDeleteAction)
{strCaption = Util.FormatString(IntlCoreStrings.k_strCtrlDeleteFormat, strCaption);}
var strHtml = HoverMenu.GetMenuItemHtml(strCaption, strScriptToExecute);
objStringBuilder.push(strHtml);}}
;
return objStringBuilder.join("");}
HoverMenu.GetMenuItemHtml = HoverMenu_GetMenuItemHtml;
function HoverMenu_GetMenuItemHtml(strCaption, strScriptToExecute)
{var strStyle = (UserAgentInfo.strBrowser == 1) ? "style='white-space:nowrap;'" : "";
var strHtml = "<div class='menuItem_" +
CurrentFormData.Direction() +
"' tabindex='-1'" +
strStyle +
" OnMouseOver='HoverMenu.SelectMenuItem(this);' OnMouseOut='HoverMenu.SelectMenuItem(null);' OnMouseDown='Util.StopEventProprogation(event); return false;' alt=\"" +
strCaption +
"\" OnClick=\"HoverMenu.boolProcessedEnterClick = false; HoverMenu.SelectMenuItem(null); HoverMenu.HideMenu(); " +
strScriptToExecute +
"\">" +
"<div class='menuItemDiv_" + CurrentFormData.Direction() + "'>" +
strCaption +
"</div>" +
"</div>";
return strHtml;}
HoverMenu.HandleWidgetClick = function(objControl, objEvent)
{if (HoverMenu.boolProcessedEnterClick)
{HoverMenu.boolProcessedEnterClick = false;
return false;}
HoverMenu.ShowMenu(objControl);
if (objEvent != null)
{Util.StopEventProprogation(objEvent);}
return false;}
HoverMenu.SelectMenuItem = function(objMenuItem)
{if (HoverMenu.objSelectedMenuItem != null)
{HoverMenu.objSelectedMenuItem.className = 'menuItem_' + CurrentFormData.Direction();
if (HoverMenu.objSelectedMenuItem.childNodes[0] != null)
{HoverMenu.objSelectedMenuItem.childNodes[0].className = "menuItemDiv_" + CurrentFormData.Direction();}}
HoverMenu.objSelectedMenuItem = objMenuItem;
if (HoverMenu.objSelectedMenuItem != null)
{HoverMenu.objSelectedMenuItem.className = 'menuItemHover_' + CurrentFormData.Direction();
HoverMenu.objSelectedMenuItem.childNodes[0].className = "menuItemDivHover_" + CurrentFormData.Direction();
if (UserAgentInfo.strBrowser == 1)
{objMenuItem.parentNode.parentNode.childNodes[0].focus();}}}
HoverMenu.OnKeyPress = function(objEvent)
{if (UserAgentInfo.strBrowser != 1 &&
(KeyboardService.GetVirtualKey(objEvent) != 1 || UserAgentInfo.strBrowser != 2))
{return(HoverMenu.OnKeyEvent(objEvent));}
else
{return true;}}
HoverMenu.OnKeyDown = function(objEvent)
{if (UserAgentInfo.strBrowser == 1 ||
(UserAgentInfo.strBrowser == 2 && KeyboardService.GetVirtualKey(objEvent) == 1))
{return(HoverMenu.OnKeyEvent(objEvent));}
else
{return true;}}
HoverMenu.OnKeyEvent = function(objEvent)
{var boolHandledKeyPress = false;
var nVirtualKey = KeyboardService.GetVirtualKey(objEvent);
switch(nVirtualKey)
{case(1):
{if (HoverMenu.objSelectedMenuItem != null)
{HoverMenu.objSelectedMenuItem.onclick();
if (UserAgentInfo.strBrowser != 1)
{HoverMenu.boolProcessedEnterClick = true;}
boolHandledKeyPress = true;}
break;}
case(7):
{var objNewSelectedMenuItem = null;
boolHandledKeyPress = true;
if (HoverMenu.objSelectedMenuItem != null)
{objNewSelectedMenuItem = HoverMenu.objSelectedMenuItem.previousSibling;
if (objNewSelectedMenuItem == null)
{objNewSelectedMenuItem = HoverMenu.objSelectedMenuItem;
boolHandledKeyPress = false;}}
else
{objNewSelectedMenuItem = document.getElementById(HoverMenu.strVisibleMenuID);
if (objNewSelectedMenuItem != null)
{objNewSelectedMenuItem = objNewSelectedMenuItem.childNodes[0];}}
;
HoverMenu.SelectMenuItem(objNewSelectedMenuItem);
break;}
case(8):
{var objNewSelectedMenuItem = null;
boolHandledKeyPress = true;
if (HoverMenu.objSelectedMenuItem != null)
{objNewSelectedMenuItem = HoverMenu.objSelectedMenuItem.nextSibling;
if (objNewSelectedMenuItem == null)
{objNewSelectedMenuItem = HoverMenu.objSelectedMenuItem;
boolHandledKeyPress = false;}}
else
{objNewSelectedMenuItem = document.getElementById(HoverMenu.strVisibleMenuID);
if (objNewSelectedMenuItem != null)
{objNewSelectedMenuItem = objNewSelectedMenuItem.childNodes[0];}}
;
HoverMenu.SelectMenuItem(objNewSelectedMenuItem);
break;}
case(9):
{var objMenuAccessSourceControl = HoverMenu.objMenuAccessSourceControl;
HoverMenu.HideMenu();
if (objMenuAccessSourceControl != null)
{try
{objMenuAccessSourceControl.focus();}
catch(e)
{}}
boolHandledKeyPress = true;
break;}
default:
{var objMenuAccessSourceControl = HoverMenu.objMenuAccessSourceControl;
if (objMenuAccessSourceControl != null)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objMenuAccessSourceControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
if (Snippet.GetScriptClass(objSnippetElement) == "RichTextBox")
{HoverMenu.HideMenu();
try
{objMenuAccessSourceControl.focus();}
catch (e)
{}
boolHandledKeyPress = false;}}}}
if (boolHandledKeyPress)
{Util.StopEventProprogation(objEvent);
return false;}
else
{return true;}}
function IP_Collection() {}
IP_Collection.arrStringBuilder = null;
IP_Collection.arrNewControls = null;
IP_Collection.arrNewControlsData = null;
IP_Collection.GetDataToInsert = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[0][0];}
IP_Collection.GetHtmlTemplate = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[1];}
IP_Collection.GetXmlToEdit = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[2][0];}
IP_Collection.GetContainerSnippet = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[3];}
IP_Collection.ResolveSpecialValue = BaseControl.ResolveSpecialValue;
IP_Collection.Render = Collection_Render;
function Collection_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate)
{;
;
;
;
var strHtmlId = ViewDataNode.GetHtmlId(objViewDataNode);
if (typeof(strHtmlId) == "undefined")
{if (strParentHtmlId == null)
{strHtmlId = Snippet.GetClientId(objSnippetElement);}
else
{strHtmlId = strParentHtmlId + "_" + Snippet.GetClientId(objSnippetElement);}
ViewDataNode.SetHtmlId(objViewDataNode, strHtmlId);}
var fAbortHide = Snippet.GetScriptClass(objSnippetElement) == "RichTextCollection";
if (ViewDataNode.IsHidden(objViewDataNode) && !fAbortHide)
{return;}
;
var objSnippetCollectionContent = Snippet.GetContent(objSnippetElement);
;
if (objSnippetCollectionContent.length != 9)
{return;}
;
;
for (var nCurrentTemplateFragment = 0; nCurrentTemplateFragment < arrTemplate.length; nCurrentTemplateFragment++)
{var obCurrentFragment = arrTemplate[nCurrentTemplateFragment];
var boolRendered = IP_Collection.RenderSpecialValueContainer(
obCurrentFragment,
objViewDataNode,
objSnippetElement,
strHtmlId,
arrHtmlToInsertBuilder,
objSnippetCollectionContent,
strHtmlId);
;}}
IP_Collection.RenderSpecialValueContainer = Collection_RenderSpecialValueContainer;
function Collection_RenderSpecialValueContainer(
objValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
objSnippetCollectionContent,
strHtmlId)
{var boolRenderResult = false;
if (Util.GetDataType(objValue) == 1 && objValue == 5)
{IP_Collection.RenderSpecialValue(
objViewDataNode,
arrHtmlToInsertBuilder,
objSnippetCollectionContent,
strHtmlId);
boolRenderResult = true;}
else if (BaseControl.RenderTemplateItem(
objValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder))
{boolRenderResult = true;}
return boolRenderResult;}
IP_Collection.GetChildViewDataNodes = Collection_GetChildViewDataNodes;
function Collection_GetChildViewDataNodes(objViewDataNode)
{return ViewDataNode.GetContent(objViewDataNode)[0];}
IP_Collection.SetChildViewDataNodes = Collection_SetChildViewDataNodes;
function Collection_SetChildViewDataNodes(objViewDataNode, objNewChildViewDataNodes)
{ViewDataNode.GetContent(objViewDataNode)[0] = objNewChildViewDataNodes;}
IP_Collection.IsSigned = Collection_IsSigned;
function Collection_IsSigned(objViewDataNode)
{return ViewDataNode.GetContent(objViewDataNode)[1];}
IP_Collection.GetCollectionContent = Collection_GetCollectionContent;
function Collection_GetCollectionContent(objViewDataNode)
{return ViewDataNode.GetContent(objViewDataNode)[2];}
IP_Collection.IsReadOnly = Collection_IsReadOnly;
function Collection_IsReadOnly(objViewDataNode)
{return IP_Collection.IsSigned(objViewDataNode) || (Collection_GetCollectionContent(CurrentFormData.ViewDataTree())[0] == 1);}
IP_Collection.RenderSpecialValue = Collection_RenderSpecialValue;
function Collection_RenderSpecialValue(
objViewDataNode,
arrHtmlToInsertBuilder,
objSnippetCollectionContent,
strHtmlId)
{var arrContainerHtmlTemplate = objSnippetCollectionContent[1];
;
var objContainerSnippet = objSnippetCollectionContent[3];
var arrChildViewDataNodes = IP_Collection.GetChildViewDataNodes(objViewDataNode);
var strPartialClientId = strHtmlId + "_" + Snippet.GetClientId(objContainerSnippet);
for (var nCurrentViewDataNode = 0; nCurrentViewDataNode < arrChildViewDataNodes.length; nCurrentViewDataNode++)
{(arrChildViewDataNodes[nCurrentViewDataNode]._objViewDataNodeParent = objViewDataNode);
var funcRender = BaseControl.FindFunctionOnSnippet(objContainerSnippet, "Render");
funcRender(
arrChildViewDataNodes[nCurrentViewDataNode],
objContainerSnippet,
strPartialClientId + (nCurrentViewDataNode + 1),
arrContainerHtmlTemplate,
arrHtmlToInsertBuilder);}}
function ErrorVisualization() {}
var g_strServerImageHash = null;
ErrorVisualization.FindInfoPathControl = ErrorVisualization_FindInfoPathControl;
function ErrorVisualization_FindInfoPathControl(
objWrappingControl)
{var arrChildren = BaseControl.GetChildInfoPathControls(objWrappingControl);
;
if (arrChildren.length > 0)
{return arrChildren[0];}
else
{return null;}}
ErrorVisualization.FindHelperForInfoPathControl = ErrorVisualization_FindHelperForInfoPathControl;
function ErrorVisualization_FindHelperForInfoPathControl(
objControl,
strHelperName)
{var strControlId;
var strHelperId;
var objHelper;
;
;
if (!LeafControl.IsLeafControl(objControl))
{return null;}
var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
if (!Snippet.ControlHasWrappingSpan(objSnippetElement))
{return null;}
strControlId = objControl.getAttribute("id");
strHelperId = strControlId + "_" + strHelperName;
objHelper = document.getElementById(strHelperId);
if (objHelper == null && UserAgentInfo.strBrowser == 1 && typeof(objControl.offsetParent) != "unknown" && objControl.offsetParent != null)
{objHelper = objControl.offsetParent.children(strHelperId);}
return objHelper;}
ErrorVisualization.HasInvalidControlInView = ErrorVisualization_HasInvalidControlInView;
function ErrorVisualization_HasInvalidControlInView()
{return ErrorVisualization.FindNextInvalidControl(null) != null;}
ErrorVisualization.FocusNextInvalidControl = ErrorVisualization_FocusNextInvalidControl;
function ErrorVisualization_FocusNextInvalidControl(
objControl)
{;
var objViewDataNode = ErrorVisualization.FindNextInvalidControl(objControl);
if (objViewDataNode != null)
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{BaseControl.RestoreFocus(objControl);}}}
ErrorVisualization.FindNextInvalidControl = ErrorVisualization_FindNextInvalidControl;
function ErrorVisualization_FindNextInvalidControl(
objControl)
{var objOriginalViewDataNode;
var objCurrentControl;
var objCurrentViewDataNode;
var objNextViewDataNode;
;
if (objControl == null)
{objOriginalViewDataNode = CurrentFormData.ViewDataTree();}
else
{objOriginalViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);}
objCurrentViewDataNode = objOriginalViewDataNode;
do
{objNextViewDataNode = ViewDataNode.FindNext(objCurrentViewDataNode);
if (objNextViewDataNode == null)
{objNextViewDataNode = CurrentFormData.ViewDataTree();}
if (!ViewDataNode.IsValid(objNextViewDataNode))
{return objNextViewDataNode;}
objCurrentViewDataNode = objNextViewDataNode;}
while (objCurrentViewDataNode != objOriginalViewDataNode);
return null;}
ErrorVisualization.PositionVisualizationObject = ErrorVisualization_PositionVisualizationObject;
function ErrorVisualization_PositionVisualizationObject(
objVisualizationDiv,
objControl,
strHelperName,
enumPosition)
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var intDirection = BaseControl.GetDirection(objSnippetElement);
var boolRtl = (intDirection == 2);
var objWrappingSpan = LeafControl.GetWrappingSpan(objControl);
var strDirection = BaseControl.k_strDirection[intDirection];
objVisualizationDiv.style.position = "absolute";
objVisualizationDiv.style.display = "inline";
objVisualizationDiv.style.direction = strDirection;
objVisualizationDiv.style.zIndex = (strHelperName == "ErrorTip") ? "48" : "45";
var intMarginLeft = 0;
var intMarginTop = 0;
;
if (UserAgentInfo.strBrowser != 1)
{intMarginLeft = LeafControl.GetMarginLeft(objControl);
intMarginTop = LeafControl.GetMarginTop(objControl);
ErrorVisualization_RelativelyPositionOverflowContainer(objControl);}
var intTop = ErrorVisualization.ComputeAbsoluteTop(objControl);
var intLeft = ErrorVisualization.ComputeAbsoluteLeft(objControl);
switch (enumPosition)
{case 1:
{intTop	= intTop - objVisualizationDiv.offsetHeight + intMarginTop;
intLeft	= intLeft + intMarginLeft;
var intWindowWidth = document.body.clientWidth;
if (!boolRtl)
{var intVisualizationRight = intLeft + objVisualizationDiv.offsetWidth;
if (intVisualizationRight > intWindowWidth)
{intLeft -= objVisualizationDiv.offsetWidth - objControl.offsetWidth;}}
else
{if (intLeft >= 0)
{intLeft -= objVisualizationDiv.offsetWidth - objControl.offsetWidth;}}
break;}
case 2:
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var intBorderTop = (Snippet.GetContent(objSnippetElement)[6]);
var intBorderLeft = (Snippet.GetContent(objSnippetElement)[7]);
intTop	= intTop + intMarginTop + intBorderTop + 2;
intLeft	= intLeft + intMarginLeft - intBorderLeft + objControl.offsetWidth - objVisualizationDiv.offsetWidth - 1;
if (boolRtl)
{intLeft -= objControl.offsetWidth - objVisualizationDiv.offsetWidth;}
break;}
case 4:
{intTop	= intTop + intMarginTop;
intLeft	= intLeft + intMarginLeft + objControl.offsetWidth + 2;
if (boolRtl)
{intLeft -= objControl.offsetWidth + objVisualizationDiv.offsetWidth - 4;}
break;}
case 3:
{intTop	= intTop + intMarginTop + 2;
intLeft	= intLeft + intMarginLeft + 4;
if (boolRtl)
{intLeft += objControl.offsetWidth - objVisualizationDiv.offsetWidth * 2;}
break;}
default:
{;
break;}}
objVisualizationDiv.style.top = intTop;
objVisualizationDiv.style.left = intLeft;}
ErrorVisualization.ShowMoreInfo = ErrorVisualization_ShowMoreInfo;
function ErrorVisualization_ShowMoreInfo(
objControl,
objEvent)
{;
;
var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (BaseControl.IsValid(objViewDataNode))
{return;}
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
var strShortErrorString = objDatum.GetErrorMessage();
var strDetailedErrorString = objDatum.GetDetailedErrorMessage();
if (strShortErrorString == "" && strDetailedErrorString == "")
{return;}
var strErrorToShow = new Array();
if (strShortErrorString != "")
{strErrorToShow.push(strShortErrorString);}
if (strDetailedErrorString != "")
{if (strErrorToShow.length != 0)
{strErrorToShow.push("\n\n");}
strErrorToShow.push(strDetailedErrorString);}
var intScrollYPosition = CrossBrowserLibrary.GetScrollY();
SelectionService.RememberFocus(objControl, objEvent);
UserMessages.ShowAlertMessage(strErrorToShow.join(""), false);
SelectionService.RestoreFocus();
CrossBrowserLibrary.GetScrollY(intScrollYPosition);}
ErrorVisualization.ClearAlternativeVisualization = ErrorVisualization_ClearAlternativeVisualization;
function ErrorVisualization_ClearAlternativeVisualization(
objControl)
{;
Util.SetAltProperty(objControl, "");}
ErrorVisualization.SetAlternativeVisualization = ErrorVisualization_SetAlternativeVisualization;
function ErrorVisualization_SetAlternativeVisualization(
objControl)
{if (objControl == null || !BaseControl.IsInfoPathControl(objControl))
{;
return;}
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
if (ViewDataNode.IsValid(objViewDataNode) || objSnippetElement == null || objDatum == null)
{ErrorVisualization.ClearAlternativeVisualization(objControl);
return;}
var strShortErrorString			= objDatum.GetErrorMessage();
var boolShowMore				= objDatum.GetDetailedErrorMessage().length > 0;
if (strShortErrorString.length == 0 && !boolShowMore)
{ErrorVisualization.ClearAlternativeVisualization(objControl);
return;}
var strTitle = (Snippet.GetContent(objSnippetElement)[0]);
var strAccessibleMoreText;
if (boolShowMore)
{strAccessibleMoreText = IntlCoreStrings.k_strErrorVisualizationAltTextShowMore;}
else
{strAccessibleMoreText = "";}
var strAltText = Util.FormatString(
IntlCoreStrings.k_strErrorVisualizationAltText,
strTitle,
strShortErrorString,
strAccessibleMoreText);
Util.SetAltProperty(objControl, strAltText);}
ErrorVisualization.ComputeAbsoluteTop = ErrorVisualization_ComputeAbsoluteTop;
function ErrorVisualization_ComputeAbsoluteTop(
objControl)
{var objCurrent = objControl;
var intTop = objCurrent.offsetTop;
;
;
while (typeof(objControl.offsetParent) != "unknown" && objControl.offsetParent != null && objCurrent.offsetParent != document.body)
{if (objCurrent.offsetParent.style != null && ErrorVisualization_IsPositionCausingElement(objCurrent.offsetParent.style))
{break;}
objCurrent = objCurrent.offsetParent;
intTop += objCurrent.offsetTop;
;
;
;
if (UserAgentInfo.strBrowser == 1)
{intTop += objCurrent.clientTop;}}
if (UserAgentInfo.strBrowser == 1)
{intTop += LeafControl.ParseLength(document.body.currentStyle.marginTop);}
else if (UserAgentInfo.strBrowser == 3 || UserAgentInfo.strBrowser == 4)
{intTop += LeafControl.ParseLength(window.getComputedStyle(document.body,null).marginTop);}
else
{}
;
;
return intTop;}
ErrorVisualization.ComputeAbsoluteLeft = ErrorVisualization_ComputeAbsoluteLeft;
function ErrorVisualization_ComputeAbsoluteLeft(
objControl)
{var objCurrent = objControl;
var intLeft = objCurrent.offsetLeft;
;
;
while (typeof(objControl.offsetParent) != "unknown" && objControl.offsetParent != null && objCurrent.offsetParent != document.body)
{if (objCurrent.offsetParent.style != null && ErrorVisualization_IsPositionCausingElement(objCurrent.offsetParent.style))
{break;}
objCurrent = objCurrent.offsetParent;
intLeft += objCurrent.offsetLeft;
;
;
;
if (UserAgentInfo.strBrowser == 1)
{intLeft += objCurrent.clientLeft;}}
if (UserAgentInfo.strBrowser == 1)
{intLeft += LeafControl.ParseLength(document.body.currentStyle.marginLeft);}
;
;
return intLeft;}
function ErrorVisualization_RelativelyPositionOverflowContainer(objControl)
{if(objControl == null || typeof(objControl) == "unknown" || objControl == document.body)
{return;}
if(ErrorVisualization_IsPositionCausingElement(objControl.style))
{objControl.style.position = "relative";
return;}
ErrorVisualization_RelativelyPositionOverflowContainer(objControl.parentNode);}
ErrorVisualization.IsPositionCausingElement = ErrorVisualization_IsPositionCausingElement;
function ErrorVisualization_IsPositionCausingElement(objStyle)
{if (objStyle != null)
{if ((!Util.IsNullOrEmptyString(objStyle.overflow)
&& (objStyle.overflow.toLowerCase() == "auto"
|| objStyle.overflow.toLowerCase() == "scroll"
|| objStyle.overflow.toLowerCase() == "hidden"))
|| (!Util.IsNullOrEmptyString(objStyle.overflowY)
&& (objStyle.overflowY.toLowerCase() == "auto"
|| objStyle.overflowY.toLowerCase() == "scroll"
|| objStyle.overflowY.toLowerCase() == "hidden"))
|| (!Util.IsNullOrEmptyString(objStyle.overflowX)
&& (objStyle.overflowX.toLowerCase() == "auto"
|| objStyle.overflowX.toLowerCase() == "scroll"
|| objStyle.overflowX.toLowerCase() == "hidden")))
{return true;}}
return false;}
ErrorVisualization.HideErrorVisualization = ErrorVisualization_HideErrorVisualization;
function ErrorVisualization_HideErrorVisualization(
objControl,
strVisualizationName)
{;
var objVisualizationSpan = ErrorVisualization.FindHelperForInfoPathControl(objControl, strVisualizationName);
if (objVisualizationSpan == null)
{return;}
var objVisualizationDiv = objVisualizationSpan.childNodes[0];
if (objVisualizationDiv == null)
{return;}
if (objVisualizationDiv.style.display == "none")
{return;}
;
objVisualizationDiv.style.display = "none";
objVisualizationDiv.style.top = 0;
objVisualizationDiv.innerHTML = "";
var strIFrameId = objVisualizationDiv.getAttribute("CurrentIFrame");
if (strIFrameId != null)
{IFrameUtils.HideIFrame(strIFrameId);}}
ErrorVisualization.RequiresIFrameToEnforceZIndex = ErrorVisualization_RequiresIFrameToEnforceZIndex;
function ErrorVisualization_RequiresIFrameToEnforceZIndex(
objControl,
boolOutOfControl)
{;
return UserAgentInfo.strBrowser == 1 &&
(objControl.tagName.toLowerCase() == "select" || boolOutOfControl);}
ErrorVisualization.GetIFrameHelperName = ErrorVisualization_GetIFrameHelperName;
function ErrorVisualization_GetIFrameHelperName(
objControl,
strHelperName)
{;
return objControl.id + "_" + strHelperName + "_" + "IFrame";}
ErrorVisualization.PositionIFrameBehindVisualization = ErrorVisualization_PositionIFrameBehindVisualization;
function ErrorVisualization_PositionIFrameBehindVisualization(
objControl,
objVisualization,
strHelperName)
{;
;
if (objControl == null || objVisualization == null)
{return;}
var strZIndex = (strHelperName == "ErrorTip") ? "47" : "44";
var strIFrameId = ErrorVisualization.GetIFrameHelperName(objControl, strHelperName);
var objIFrame = IFrameUtils.InsertIframe(objVisualization.parentNode, strIFrameId, false , strZIndex);
IFrameUtils.PlaceIFrameBehindControl(objVisualization, objIFrame);
objVisualization.setAttribute("CurrentIFrame", objIFrame.id);}
ErrorVisualization.AbleToShowVisualization = ErrorVisualization_AbleToShowVisualization;
function ErrorVisualization_AbleToShowVisualization()
{return !HoverMenu.isVisible &&
(View.GetTemplateType() != 1);}
ErrorVisualization.HideAllVisualizations = ErrorVisualization_HideAllVisualizations;
function ErrorVisualization_HideAllVisualizations(
objControl)
{;
;
if (ErrorVisualization.SupportsAsterisk(objControl)
&& ErrorVisualization.IsAsteriskVisible(objControl))
{ErrorVisualization.HideAsterisk(objControl);}
if (ErrorVisualization.SupportsShortMessage(objControl)
&& ErrorVisualization.IsShortMessageVisible(objControl))
{ErrorVisualization.HideShortMessage(objControl);}
if (ErrorVisualization.SupportsSignatureIcon(objControl)
&& ErrorVisualization.IsSignatureIconVisible(objControl))
{ErrorVisualization.HideSignatureIcon(objControl);}
;}
ErrorVisualization.UpdateAsterisk = ErrorVisualization_UpdateAsterisk;
function ErrorVisualization_UpdateAsterisk(
objControl)
{;
if (ErrorVisualization.IsAsteriskVisible(objControl))
{ErrorVisualization.ShowAsterisk(objControl);}}
ErrorVisualization.Timer = null;
ErrorVisualization.UpdateAllAsterisks = ErrorVisualization_UpdateAllAsterisks;
function ErrorVisualization_UpdateAllAsterisks()
{if (ErrorVisualization.Timer != null)
return;
ErrorVisualization.Timer = window.setTimeout(ErrorVisualization_UpdateAllAsterisks_Real, 1);}
function ErrorVisualization_UpdateAllAsterisks_Real()
{;
var objViewDataNode;
objViewDataNode = CurrentFormData.ViewDataTree();
if (ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode) == null)
{ErrorVisualization.Timer = null;
ErrorVisualization_UpdateAllAsterisks();
return;}
while (objViewDataNode != null)
{if (BaseControl.IsBlank(objViewDataNode) &&
!BaseControl.IsValid(objViewDataNode))
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null && ErrorVisualization.SupportsAsterisk(objControl))
{ErrorVisualization.UpdateAsterisk(objControl);}}
objViewDataNode = ViewDataNode.FindNext(objViewDataNode);}
ErrorVisualization.Timer = null;}
ErrorVisualization.ShowAsterisk = ErrorVisualization_ShowAsterisk;
function ErrorVisualization_ShowAsterisk(
objControl)
{;
;
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (ViewDataNode.IsSigned(objViewDataNode) &&
ErrorVisualization.SupportsSignatureIcon(objControl) &&
ErrorVisualization.IsSignatureIconVisible(objControl))
{return;}
if (ViewDataNode.IsHidden(objViewDataNode))
{return;}
var objVisualizationSpan = ErrorVisualization.FindHelperForInfoPathControl(objControl, "Asterisk");
if (objVisualizationSpan == null)
{;
return;}
if (!ErrorVisualization.AbleToShowVisualization())
{return;}
var strCurrentXYWH = "{" + ErrorVisualization.ComputeAbsoluteLeft(objControl) + "," + ErrorVisualization.ComputeAbsoluteTop(objControl)
+ "," + objControl.offsetWidth + "," + objControl.offsetHeight + "}";
if (ErrorVisualization._IsAsteriskVisible(objVisualizationSpan))
{var strCachedXYWH = objControl.getAttribute("cachedXYWH");
if (strCachedXYWH == null)
{return;}
else if (strCachedXYWH == strCurrentXYWH)
{return;}
else
{ErrorVisualization.HideAsterisk(objControl);}}
if (g_strServerImageHash == null)
{g_strServerImageHash = Util.FindHashForServerImage("MergedImage1.gif");}
objVisualizationSpan.innerHTML = "<span class='asteriskIcon'><span style=\"width:10;height:10;overflow:hidden;background-image:url(/_layouts/inc/MergedImage1.gif" + g_strServerImageHash + ");background-position:-45 -10\"><img alt=\"\" src=\"/_layouts/inc/blank.gif\" style=\"width:10;height:10\"></img></span></span>";
var objAsteriskIconDiv = objVisualizationSpan.childNodes[0];
if (objControl.tagName.toLowerCase() == "select")
{ErrorVisualization.PositionVisualizationObject(objAsteriskIconDiv, objControl, "Asterisk",
3);}
else
{ErrorVisualization.PositionVisualizationObject(objAsteriskIconDiv, objControl, "Asterisk",
2);}
if (ErrorVisualization.RequiresIFrameToEnforceZIndex(objControl, false ))
{ErrorVisualization.PositionIFrameBehindVisualization(objControl, objAsteriskIconDiv, "Asterisk");}
;
objControl.setAttribute("cachedXYWH", strCurrentXYWH);}
ErrorVisualization.HideAsterisk = ErrorVisualization_HideAsterisk;
function ErrorVisualization_HideAsterisk(
objControl)
{;
;
;
ErrorVisualization.HideErrorVisualization(
objControl,
"Asterisk");}
ErrorVisualization._IsAsteriskVisible = ErrorVisualization__IsAsteriskVisible;
function ErrorVisualization__IsAsteriskVisible(
objAsterisk)
{var objAsteriskDiv = objAsterisk.childNodes[0];
if (objAsteriskDiv != null)
{return objAsteriskDiv.style.display == "inline";}
else
{return false;}}
ErrorVisualization.IsAsteriskVisible = ErrorVisualization_IsAsteriskVisible;
function ErrorVisualization_IsAsteriskVisible(
objControl)
{;
;
var objAsterisk = ErrorVisualization.FindHelperForInfoPathControl(objControl, "Asterisk");
if (objAsterisk != null)
{return ErrorVisualization._IsAsteriskVisible(objAsterisk);}
else
{return false;}}
ErrorVisualization.SupportsAsterisk = ErrorVisualization_SupportsAsterisk;
function ErrorVisualization_SupportsAsterisk(
objControl)
{if (BaseControl.IsInfoPathControl(objControl) && LeafControl.IsLeafControl(objControl))
{var objVisualizationSpan = ErrorVisualization.FindHelperForInfoPathControl(objControl, "Asterisk");
return objVisualizationSpan != null;}
else
{return false;}}
ErrorVisualization._BuildErrorTipHtml = ErrorVisualization__BuildErrorTipHtml;
function ErrorVisualization__BuildErrorTipHtml(
objVisualizationSpan,
strErrorString,
boolShowMore,
objViewDataNode)
{var objErrorDiv = objVisualizationSpan.childNodes[0];
var strRender = strErrorString;
;
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var strDirection = BaseControl.k_strDirection[BaseControl.GetDirection(objSnippetElement)];
var strTextAlignment = (strDirection == "rtl") ? "right" : "left";
var strClass = boolShowMore ? "errorDivClickable" : "errorDiv";
var strOnClick = boolShowMore ? " ErrorVisualization.ProcessMoreInfoClick(this, event);" : "";
if (objErrorDiv == null || objErrorDiv.getAttribute("boolShowMore") != boolShowMore)
{objVisualizationSpan.innerHTML =
"<span class='" + strClass + "' align=" +
strTextAlignment +
" onMouseOver=\"return LeafControl.OnMouseOver(this, event);\"" +
" onMouseOut=\"return LeafControl.OnMouseOut(this, event);\"" +
" onClick=\"" + strOnClick + "\"" +
" style='display:inline;direction:" +
strDirection +
";text-alignment:" +
strTextAlignment +
";'></span>";
objErrorDiv = objVisualizationSpan.childNodes[0];
objErrorDiv.setAttribute("boolShowMore", boolShowMore);}
if (Util.GetInnerText(objErrorDiv) != strRender)
{Util.SetInnerText(objErrorDiv, strRender);}
return objErrorDiv;}
ErrorVisualization.ShowShortMessage = ErrorVisualization_ShowShortMessage;
function ErrorVisualization_ShowShortMessage(
objControl,
boolIsSticky)
{;
;
if (objControl._disableShortMessage)
{return;}
var objVisualizationSpan = ErrorVisualization.FindHelperForInfoPathControl(objControl, "ErrorTip");
if (objVisualizationSpan == null)
{;
return;}
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
if (objDatum.IsValid() || !ErrorVisualization.AbleToShowVisualization())
{return;}
var strErrorString			= objDatum.GetErrorMessage();
if (strErrorString.length == 0)
{return;}
var strDetailedErrorString	= objDatum.GetDetailedErrorMessage();
var boolShowMore			= strDetailedErrorString.length > 0;
var objErrorDiv = ErrorVisualization._BuildErrorTipHtml(
objVisualizationSpan,
strErrorString,
boolShowMore,
objViewDataNode);
ErrorVisualization.PositionVisualizationObject(objErrorDiv, objControl, "ErrorTip",
1);
if (ErrorVisualization.RequiresIFrameToEnforceZIndex(objControl, true ))
{ErrorVisualization.PositionIFrameBehindVisualization(objControl, objErrorDiv, "ErrorTip");}}
ErrorVisualization.HideShortMessage = ErrorVisualization_HideShortMessage;
function ErrorVisualization_HideShortMessage(
objControl,
boolForce)
{;
;
if (  true || boolForce  )
{;
ErrorVisualization.HideErrorVisualization(
objControl,
"ErrorTip");}}
ErrorVisualization._IsShortMessageVisible = ErrorVisualization__IsShortMessageVisible;
function ErrorVisualization__IsShortMessageVisible(
objErrorTip)
{var objErrorTipDiv = objErrorTip.childNodes[0];
if (objErrorTipDiv != null)
{return objErrorTipDiv.style.display == "inline";}
else
{return false;}}
ErrorVisualization.IsShortMessageVisible = ErrorVisualization_IsShortMessageVisible;
function ErrorVisualization_IsShortMessageVisible(
objControl)
{;
;
var objErrorTip = ErrorVisualization.FindHelperForInfoPathControl(objControl, "ErrorTip");
if (objErrorTip != null)
{return ErrorVisualization._IsShortMessageVisible(objErrorTip);}
else
{return false;}}
ErrorVisualization.SupportsShortMessage = ErrorVisualization_SupportsShortMessage;
function ErrorVisualization_SupportsShortMessage(
objControl)
{if (BaseControl.IsInfoPathControl(objControl))
{var objVisualizationSpan = ErrorVisualization.FindHelperForInfoPathControl(objControl, "ErrorTip");
return objVisualizationSpan != null;}
else
{return false;}}
ErrorVisualization.ShowSignatureIcon = ErrorVisualization_ShowSignatureIcon;
function ErrorVisualization_ShowSignatureIcon(
objControl)
{;
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (!ViewDataNode.IsSigned(objViewDataNode))
{return;}
if (ViewDataNode.IsHidden(objViewDataNode))
{return;}
var objVisualizationSpan = ErrorVisualization.FindHelperForInfoPathControl(objControl, "SignIcon");
if (objVisualizationSpan == null)
{;
return;}
if (!ErrorVisualization.AbleToShowVisualization())
{return;}
if (ErrorVisualization.SupportsAsterisk(objControl) &&
ErrorVisualization.IsAsteriskVisible(objControl))
{ErrorVisualization.HideAsterisk(objControl);}
objVisualizationSpan.innerHTML = "<span class='signatureIcon'><img src='/_layouts/inc/signaturehover.gif'/ width=12 height=12></span>";
var objSignatureIconDiv = objVisualizationSpan.childNodes[0];
var strScriptClass = objControl.getAttribute("ScriptClass");
var boolOutOfControl;
if (strScriptClass == "RadioButton" || strScriptClass == "CheckBox" || strScriptClass == "DropDownList")
{ErrorVisualization.PositionVisualizationObject(objSignatureIconDiv, objControl, "SignIcon",
4);
boolOutOfControl = true;}
else
{ErrorVisualization.PositionVisualizationObject(objSignatureIconDiv, objControl, "SignIcon",
2);
boolOutOfControl = false;}
if (ErrorVisualization.RequiresIFrameToEnforceZIndex(objControl, boolOutOfControl))
{ErrorVisualization.PositionIFrameBehindVisualization(objControl, objSignatureIconDiv, "SignIcon");}}
ErrorVisualization.HideSignatureIcon = ErrorVisualization_HideSignatureIcon;
function ErrorVisualization_HideSignatureIcon(
objControl,
boolForce)
{;
;
;
ErrorVisualization.HideErrorVisualization(
objControl,
"SignIcon");}
ErrorVisualization._IsSignatureIconVisible = ErrorVisualization__IsSignatureIconVisible;
function ErrorVisualization__IsSignatureIconVisible(
objSignIcon)
{var objSignIconDiv = objSignIcon.childNodes[0];
if (objSignIconDiv != null)
{return objSignIconDiv.style.display == "inline";}
else
{return false;}}
ErrorVisualization.IsSignatureIconVisible = ErrorVisualization_IsSignatureIconVisible;
function ErrorVisualization_IsSignatureIconVisible(
objControl)
{;
;
var objSignIcon = ErrorVisualization.FindHelperForInfoPathControl(objControl, "SignIcon");
if (objSignIcon != null)
{return ErrorVisualization._IsSignatureIconVisible(objSignIcon);}
else
{return false;}}
ErrorVisualization.SupportsSignatureIcon = ErrorVisualization_SupportsSignatureIcon;
function ErrorVisualization_SupportsSignatureIcon(
objControl)
{if (BaseControl.IsInfoPathControl(objControl))
{var objVisualizationSpan = ErrorVisualization.FindHelperForInfoPathControl(objControl, "SignIcon");
return objVisualizationSpan != null;}
else
{return false;}}
ErrorVisualization.VirtualKeyMoreInfoErrorVisAccess = ErrorVisualization_VirtualKeyMoreInfoErrorVisAccess;
function ErrorVisualization_VirtualKeyMoreInfoErrorVisAccess(
objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var objControl = SelectionService.GetSelectedControl();
if (objControl == null || !BaseControl.IsInfoPathControl(objControl) || !LeafControl.IsLeafControl(objControl))
{return;}
ErrorVisualization.ShowMoreInfo(objControl, objEvent);}
ErrorVisualization.ProcessMoreInfoClick = ErrorVisualization_ProcessMoreInfoClick;
function ErrorVisualization_ProcessMoreInfoClick(
objVisualizationDiv,
objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var objControl = ErrorVisualization.FindInfoPathControl(objVisualizationDiv.parentNode.parentNode);
;
ErrorVisualization.ShowMoreInfo(objControl, objEvent);}
ErrorVisualization.ProcessHighlight = ErrorVisualization_Highlight;
function ErrorVisualization_Highlight(
objControl,
boolSticky)
{if (!BaseControl.CanHandleEvents())
{return;}
;
;
ErrorVisualization.SetAlternativeVisualization(objControl);
if (boolSticky)
{return;}
if (ErrorVisualization.SupportsShortMessage(objControl) && !ErrorVisualization.IsShortMessageVisible(objControl))
{ErrorVisualization.ShowShortMessage(objControl, boolSticky);}
if (ErrorVisualization.SupportsSignatureIcon(objControl) && !ErrorVisualization.IsSignatureIconVisible(objControl))
{ErrorVisualization.ShowSignatureIcon(objControl);}}
ErrorVisualization.ProcessRemoveHighlight = ErrorVisualization_RemoveHighlight;
function ErrorVisualization_RemoveHighlight(
objControl,
boolSticky)
{if (!BaseControl.CanHandleEvents())
{return;}
;
;
ErrorVisualization.ClearAlternativeVisualization(objControl);
if (boolSticky)
{return;}
if (ErrorVisualization.SupportsShortMessage(objControl) && ErrorVisualization.IsShortMessageVisible(objControl))
{ErrorVisualization.HideShortMessage(objControl);}
if (ErrorVisualization.SupportsSignatureIcon(objControl) && ErrorVisualization.IsSignatureIconVisible(objControl))
{ErrorVisualization.HideSignatureIcon(objControl);}}
function ViewDataNode()
{};
ViewDataNode.boolRuleLimitHit					= false;
ViewDataNode.boolErrorVisRefreshNeeded			= false;
ViewDataNode.boolNeedReRendering = false;
ViewDataNode.InitializeViewDataNode = function(objViewDataNode)
{objViewDataNode._boolDirty						= false;
objViewDataNode._boolDeleted					= false;
objViewDataNode._boolFireRule					= true;
objViewDataNode._nMultipleBindingClassId		= -1;
objViewDataNode._changedOnClient				= false;};
ViewDataNode.Disable = function(objViewDataNode)
{objViewDataNode[3] = true;
var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType != 4)
{var funcDisable = BaseControl.FindFunction(objControl, "SetDisable", true );
funcDisable(objControl, true);}}};
ViewDataNode.UnDisable = function(objViewDataNode)
{objViewDataNode[3] = false;
var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{var funcDisable = BaseControl.FindFunction(objControl, "SetDisable", true );
funcDisable(objControl, false);}};
ViewDataNode.IsHidden = ViewDataNode_IsHidden;
function ViewDataNode_IsHidden(objViewDataNode)
{var fIsHidden = objViewDataNode[4];
var objParentViewDataNode = ViewDataNode.GetParent(objViewDataNode);
while (!fIsHidden && objParentViewDataNode != null)
{fIsHidden = objParentViewDataNode[4];
objParentViewDataNode = ViewDataNode.GetParent(objParentViewDataNode);}
return fIsHidden;};
ViewDataNode.GetZeroViewDataNode = function()
{if (typeof(g_objCurrentFormData.objZeroViewDataNode) == "undefined")
{g_objCurrentFormData.objZeroViewDataNode = ViewDataNode.CreateUnparentedViewDataNode("0");}
return g_objCurrentFormData.objZeroViewDataNode;}
ViewDataNode.CreateUnparentedViewDataNode = function(objValue)
{var objDummySnippet = new Array();
objDummySnippet.push(-1);
objDummySnippet.push("");
objDummySnippet.push("");
objDummySnippet.push(["", "", "", "", ""]);
objDummySnippet.push(0);
objDummySnippet.push(3);
objDummySnippet.push(new Array());
objDummySnippet.push(new Array());
var objZeroDatum = new LeafDatum();
objZeroDatum.SetValue(objValue);
var objViewDataNode = new Array();
objViewDataNode.push(objDummySnippet);
objViewDataNode.push(new Array());
objViewDataNode.push("_dummy");
objViewDataNode[1].push("");
objViewDataNode[1].push(objZeroDatum);
return objViewDataNode;}
function ViewDataNode_GetSnippetElement(objViewDataNode)
{var objSnippetElement = g_arrSnippetList[objViewDataNode[0]];
if (typeof(objSnippetElement) == "undefined")
{objSnippetElement = objViewDataNode[0];}
return objSnippetElement;}
ViewDataNode.IsDisabled = function(objViewDataNode)
{if (objViewDataNode == null)
{return false;}
var boolDisabled = objViewDataNode[3];
if (!boolDisabled)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType == 3 ||
enumSnippetType == 7)
{boolDisabled = (ViewDataNode.GetContent(objViewDataNode)[4]);}
else if (enumSnippetType == 2 ||
enumSnippetType == 4)
{var objHtmlNode = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objHtmlNode == null)
{return true;}
if (enumSnippetType == 2)
{boolDisabled = StructuralEditingControl_IsReadOnly(objHtmlNode);}
else if (enumSnippetType == 4)
{boolDisabled = Collection_IsReadOnly(objViewDataNode);}}}
return boolDisabled;};
ViewDataNode.IsBlank = function(objViewDataNode)
{var boolBlank = false;
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
if (Snippet.GetSnippetType(objSnippetElement) == 3)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
boolBlank = Util.IsNullOrEmptyString(objDatum.GetValue());}
else
{boolBlank = false;}
return boolBlank;}
ViewDataNode.IsSigned = function(objViewDataNode)
{var boolSigned = false;
if (objViewDataNode != null)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType == 3)
{boolSigned = LeafControl.IsSigned(objViewDataNode);}
else if (enumSnippetType == 2 ||
enumSnippetType == 4)
{if (Container.IsSigned(objViewDataNode))
{return true;}
var arrChildViewDataNodes = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nIndex = 0; nIndex < arrChildViewDataNodes.length; nIndex++)
{if (ViewDataNode.IsSigned(arrChildViewDataNodes[nIndex]) == true)
{return true;}}}}
return boolSigned;};
ViewDataNode.Delete = function(objViewDataNode)
{var objParentViewDataNode = ViewDataNode.GetParent(objViewDataNode);
var nTargetIndex = -1;
;
if (objParentViewDataNode == null)
{return;}
var arrDataNodeChildren = ViewDataNode.GetChildNodes(objParentViewDataNode);
for (var nChildIndex = 0; nChildIndex < arrDataNodeChildren.length; nChildIndex++)
{if (arrDataNodeChildren[nChildIndex] == objViewDataNode)
{nTargetIndex = nChildIndex;
break;}}
;
var arrNewViewDataNodes = Util.RemoveAt(arrDataNodeChildren, nTargetIndex);
IP_Collection.SetChildViewDataNodes(objParentViewDataNode, arrNewViewDataNodes);
RichTextBox_CleanupContainer(objViewDataNode);}
ViewDataNode.GetDataActions = function(objViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
return Snippet.GetDataActions(objSnippetElement);};
ViewDataNode.CreateDatum = function(objViewDataNode)
{var objLeafDatum;
var nMultipleBindingClassId = objViewDataNode[1][1][3];
if (nMultipleBindingClassId == -1)
{objLeafDatum = new LeafDatum();
ViewDataNode.InitializeDatum(objViewDataNode, objLeafDatum);}
else
{;
if (typeof(g_objMultipleBindingIdMap) != "undefined" && g_objMultipleBindingIdMap != null)
{var nNewMultipleBindingClassId = g_objMultipleBindingIdMap[nMultipleBindingClassId];
if (nNewMultipleBindingClassId == null)
{nNewMultipleBindingClassId = StructuralEditingControl._CreateNewMBId();
g_objMultipleBindingIdMap[nMultipleBindingClassId] = nNewMultipleBindingClassId;}
nMultipleBindingClassId = nNewMultipleBindingClassId;
objViewDataNode[1][1][3] = nMultipleBindingClassId;}
objLeafDatum = g_objMultipleBindingMap[nMultipleBindingClassId];
if (objLeafDatum == null)
{objLeafDatum = new LeafDatum();
ViewDataNode.InitializeDatum(objViewDataNode, objLeafDatum);
g_objMultipleBindingMap[nMultipleBindingClassId] = objLeafDatum;}
else
{ViewDataNode.InitializeViewDataNode(objViewDataNode);
objViewDataNode[1][1] = objLeafDatum;}
objViewDataNode._nMultipleBindingClassId = nMultipleBindingClassId;}
return objLeafDatum;}
ViewDataNode.InitializeDatum = function(objViewDataNode, objDatum)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objDataInformation = Snippet._GetDataInformation(objSnippetElement);
ViewDataNode.InitializeViewDataNode(objViewDataNode);
objDatum.Initialize(objViewDataNode[1][1], objDataInformation, ViewDataNode.IsSigned(objViewDataNode));
objViewDataNode[1][1] = objDatum;};
ViewDataNode.GetDatum = function(objViewDataNode)
{return objViewDataNode[1][1];};
ViewDataNode.GetFormattedValue = ViewDataNode_GetFormattedValue;
function ViewDataNode_GetFormattedValue(objViewDataNode)
{return ViewDataNode.GetContent(objViewDataNode)[0];};
ViewDataNode.SetCondition = function(objViewDataNode, value)
{objViewDataNode[2] = value;};
ViewDataNode.SetHiddenNoHTML = function(objViewDataNode, value)
{var oldValue = objViewDataNode[4];
if (oldValue != value)
{objViewDataNode[4] = value;
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (objSnippetType == 2 ||
objSnippetType == 4 ||
objSnippetType == 6)
{ViewDataNode.boolNeedReRendering = true;}}}
ViewDataNode.SetHidden = function(objViewDataNode, value)
{var oldValue = objViewDataNode[4];
if (oldValue != value)
{objViewDataNode[4] = value;
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (objSnippetType == 2 ||
objSnippetType == 4 ||
objSnippetType == 6 )
{ViewDataNode.boolNeedReRendering = true;}}
ViewDataNode.boolErrorVisRefreshNeeded = true;
if (oldValue != value)
{var arrViewDataNodeChildren = ViewDataNode.GetChildNodes(objViewDataNode);
for (var iViewDataNodeChildren = 0; iViewDataNodeChildren < arrViewDataNodeChildren.length; iViewDataNodeChildren++)
{ViewDataNode.SetHidden(arrViewDataNodeChildren[iViewDataNodeChildren], value);}}
var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{var funcSetHidden = BaseControl.FindFunction(objControl, "SetHidden", true );
funcSetHidden(objViewDataNode, objControl, value);}};
ViewDataNode.GetCondition = function(objViewDataNode)
{return objViewDataNode[2];};
ViewDataNode.GetValue = function(objViewDataNode)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
return objDatum.GetValue();};
ViewDataNode.GetContent = function(objViewDataNode)
{return objViewDataNode[1];};
ViewDataNode.IsValid = function(objViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var boolIsValid;
if (Snippet.GetSnippetType(objSnippetElement) == 3)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
boolIsValid = objDatum.IsValid();}
else
{boolIsValid = true;}
return boolIsValid;};
ViewDataNode.GetHtmlId = function(objViewDataNode)
{return objViewDataNode[5];};
function ViewDataNode_GetHtmlControlFromViewDataNode(objViewDataNode)
{return document.getElementById(ViewDataNode.GetHtmlId(objViewDataNode));};
function ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode)
{return document.getElementById(ViewDataNode.GetHtmlId(objViewDataNode));};
ViewDataNode.GetViewDataNodeFromHtml = ViewDataNode_GetViewDataNodeFromHtml;
function ViewDataNode_GetViewDataNodeFromHtml(objControl)
{;
var intViewNodeId = objControl.getAttribute("viewDataNode");
;
;
var objViewDataNode = g_arrViewDataHtmlMap[intViewNodeId];
;
return objViewDataNode;};
ViewDataNode.GetChildNodes = function(objViewDataNode)
{if (objViewDataNode == null)
{return new Array();}
var enumSnippetType = Snippet.GetSnippetType(ViewDataNode_GetSnippetElement(objViewDataNode));
if (enumSnippetType == 3 || enumSnippetType == 7)
{return new Array();}
else if (enumSnippetType == 4 ||
enumSnippetType == 2)
{return IP_Collection.GetChildViewDataNodes(objViewDataNode);}
else if (enumSnippetType == 6)
{return Container.GetChildViewDataNodes(objViewDataNode);}
else
{return ViewDataNode.GetContent(objViewDataNode);}};
ViewDataNode.GetParent = function(objViewDataNode)
{return objViewDataNode._objViewDataNodeParent;}
ViewDataNode.FindNext = function(
objViewDataNode)
{var arrChildren;
var objCurrent;
var objParent;
if (!ViewDataNode.IsHidden(objViewDataNode))
{arrChildren = ViewDataNode.GetChildNodes(objViewDataNode);
if (arrChildren.length > 0)
{return arrChildren[0];}}
objCurrent = objViewDataNode;
objParent = ViewDataNode.GetParent(objCurrent);
while (objParent != null)
{var arrSiblings = ViewDataNode.GetChildNodes(objParent);
for (var intIndex = 1; intIndex < arrSiblings.length; intIndex++)
{if (arrSiblings[intIndex - 1] == objCurrent)
{return arrSiblings[intIndex];}}
objCurrent = objParent;
objParent = ViewDataNode.GetParent(objCurrent);}
return null;}
ViewDataNode.FindPreviousSibling = function(
objViewDataNode)
{var objPreviousSibling = null;
var objParent = ViewDataNode.GetParent(objViewDataNode);
if (objParent != null)
{var arrSiblings = ViewDataNode.GetChildNodes(objParent);
for (var intIndex = 0; intIndex < arrSiblings.length; intIndex++)
{var objSibling = arrSiblings[intIndex];
if (objSibling == objViewDataNode)
{return objPreviousSibling;}
objPreviousSibling = objSibling;}}
return objPreviousSibling;}
ViewDataNode.SetHtmlId = function(objViewDataNode, strHtmlId)
{objViewDataNode[5] = strHtmlId;};
ViewDataNode.ProcessDeclarativeValidation = function(objTargetDataNode, visitedTargets)
{var objTargetDatum = ViewDataNode.GetDatum(objTargetDataNode);
var arrDataActions = ViewDataNode.GetDataActions(objTargetDataNode);
var arrConditions = arrDataActions[1];
for (var nConditionIndex = 0; nConditionIndex < arrConditions.length; nConditionIndex++)
{var objCondition = arrConditions[nConditionIndex];
var boolIsSourceAction = objCondition[0];
if (boolIsSourceAction)
{continue;}
var expression = objCondition[1];
var strTooltip = objCondition[2];
var strMessage = objCondition[3];
if (!objTargetDatum.ValidateDataType())
{continue;}
if (!visitedTargets.Contains(objTargetDataNode))
{objTargetDatum.ClearError();
(objTargetDataNode._boolDirty = true);
visitedTargets.Add(objTargetDataNode);}
else
{if (!objTargetDatum.IsValid())
{continue;}}
var expressionResult = Expr_Evaluate(expression, objTargetDataNode, 1);
if (Expr.Boolean(expressionResult))
{objTargetDatum.SetError(strTooltip, strMessage);
(objTargetDataNode._boolDirty = true);}}}
function ViewDataNode_ProcessDataActions(
objViewDataNode,
boolAllowedToRoundtrip,
nCurrentDepth,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion
)
{var boolCalleeAllowedToRoundtrip = boolAllowedToRoundtrip;
var arrDataActions = ViewDataNode.GetDataActions(objViewDataNode);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
if (enumRoundTripModel == 1 && boolAllowedToRoundtrip)
{var nPostbackType = boolStructuralOperation ?
(boolStructuralInsertion ? 2 : 3) :
1;
View_SubmitForm(
false ,
Snippet.GetPostbackReason(objSnippetElement),
nPostbackType,
false );
return 1;}
if (enumRoundTripModel == 2)
{boolCalleeAllowedToRoundtrip = false;}
if (nCurrentDepth > 15)
{return 2;}
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var arrCalculations = arrDataActions[0];
var fReplicateRichClientRepeatingControlRuleBug =	boolStructuralOperation &&
boolStructuralInsertion &&
Snippet.GetSnippetType(objSnippetElement) == 3;
if (fReplicateRichClientRepeatingControlRuleBug)
{var fStayTrue = false;
for (var iCalculations = 0; iCalculations < arrCalculations.length; iCalculations++)
{if (!arrCalculations[iCalculations][0])
{fStayTrue = true;
break;}}
if (!fStayTrue)
{fReplicateRichClientRepeatingControlRuleBug = false;}}
if ((boolStructuralOperation &&
Snippet.GetSnippetType(objSnippetElement) == 6)
|| !boolStructuralOperation)
{if (ViewDataNode_IterateRules(
objViewDataNode,
boolAllowedToRoundtrip,
nCurrentDepth,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion) == 1)
{return 1;}}
for (var nCalculationIndex = 0; nCalculationIndex < arrCalculations.length; nCalculationIndex++)
{var objCalculation = arrCalculations[nCalculationIndex];
var boolIsSourceAction = objCalculation[0];
var expression;
var arrTargetNodes;
if (!boolIsSourceAction && !boolProcessTargetActions)
{continue;}
if (boolIsSourceAction)
{var objViewPath = objCalculation[1];
expression = objCalculation[2];
arrTargetNodes = Expr.vpath_SelectViewPath(objViewDataNode, objViewPath);}
else
{expression = objCalculation[1];
arrTargetNodes = new Array();
arrTargetNodes.push(objViewDataNode);}
for (var nTargetIndex = 0; nTargetIndex < arrTargetNodes.length; nTargetIndex++)
{var objTargetNode = arrTargetNodes[nTargetIndex];
var objTargetDatum = ViewDataNode.GetDatum(objTargetNode);
var expressionResult = Expr.String(Expr_Evaluate(expression, objTargetNode, 1));
if (objTargetDatum.GetValue() != expressionResult)
{objTargetDatum.SetValue(expressionResult);
if (boolIsSourceAction)
{var enumDataActionResult = ViewDataNode_ProcessDataActions(
objTargetNode,
boolCalleeAllowedToRoundtrip,
nCurrentDepth + 1,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion);
if (enumDataActionResult != 0)
{return enumDataActionResult;}}}}}
var arrConditions = arrDataActions[1];
var visitedTargets = new Set();
for (var nConditionIndex = 0; nConditionIndex < arrConditions.length; nConditionIndex++)
{var objCondition = arrConditions[nConditionIndex];
var boolIsSourceAction = objCondition[0];
var arrTargetNodes;
if (boolIsSourceAction)
{var objViewPath = objCondition[1];
arrTargetNodes = Expr.vpath_SelectViewPath(objViewDataNode, objViewPath);}
else
{arrTargetNodes = new Array();
arrTargetNodes.push(objViewDataNode);}
for (var nTargetIndex = 0; nTargetIndex < arrTargetNodes.length; nTargetIndex++)
{var objTargetNode = arrTargetNodes[nTargetIndex];
ViewDataNode.ProcessDeclarativeValidation(objTargetNode, visitedTargets);}}
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType != 7)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
objDatum.ValidateDataType();}
var arrConditionalFormattings = arrDataActions[2];
if (ViewDataNode.ProcessConditionalFormatting(objViewDataNode, arrConditionalFormattings, new Set()) == 1)
{return 1;}
if (ViewDataNode.ProcessRefresh(objViewDataNode, arrDataActions, boolProcessTargetActions) == 1)
{return 1;}
return 0;};
ViewDataNode.ProcessConditionalFormatting = function(objViewDataNode, arrConditionalFormattings, objTargetsProcessed)
{for (var nConditionalFormattingIndex = 0; nConditionalFormattingIndex < arrConditionalFormattings.length; nConditionalFormattingIndex++)
{var objConditionalFormatting = arrConditionalFormattings[nConditionalFormattingIndex];
var objViewPath = objConditionalFormatting[0];
var expression = objConditionalFormatting[1];
var objFormattingViewPath = objConditionalFormatting[2];
var iFormattingIndex = objConditionalFormatting[3];
var boolFormattingDisable = objConditionalFormatting[4];
var boolFormattingVisible = objConditionalFormatting[5];
var boolFormattingTarget = objConditionalFormatting[6];
var objFormattingNode = objViewDataNode;
var arrTargetNodes = Expr.vpath_SelectViewPathNoStrip(objViewDataNode, objViewPath);
for (var iTargetNode = 0; iTargetNode < arrTargetNodes.length; iTargetNode++)
{var objTargetNode = arrTargetNodes[iTargetNode];
var objTargetSnippetElement = ViewDataNode_GetSnippetElement(objTargetNode);
var enumTargetSnippetType	= Snippet.GetSnippetType(objTargetSnippetElement);
var arrFormattingNodes	= Expr.vpath_SelectViewPathNoStrip(objTargetNode, objFormattingViewPath);
if (arrFormattingNodes.length == 0)
{objTargetNode		= ViewDataNode.GetParent(objTargetNode);
arrFormattingNodes	= Expr.vpath_SelectViewPathNoStrip(objTargetNode, objFormattingViewPath);}
for (var iFormattingNodes = 0; iFormattingNodes < arrFormattingNodes.length; iFormattingNodes++)
{objFormattingNode	= arrFormattingNodes[iFormattingNodes];
if (objTargetsProcessed.Contains(objFormattingNode))
{continue;}
var objSnippetElement	= ViewDataNode_GetSnippetElement(objFormattingNode);
var enumSnippetType		= Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType == 4)
{if (ViewDataNode.ConditionalFormattingLogic(
objFormattingNode,
true,
expression,
boolFormattingDisable,
boolFormattingVisible,
-1,
objTargetNode,
objTargetsProcessed))
{(objFormattingNode._boolDirty = true);
break;}}
if (enumSnippetType == 6)
{objFormattingNode[2] = -1;
var arrFormattingDataActions		= ViewDataNode.GetDataActions(objFormattingNode)[2];
if (arrFormattingDataActions.length == 0)
{objFormattingNode = ViewDataNode.GetParent(objFormattingNode);
arrFormattingDataActions		= ViewDataNode.GetDataActions(objFormattingNode)[2];}
for (var nFormattingDataAction = 0; nFormattingDataAction < arrFormattingDataActions.length; nFormattingDataAction++)
{var objFormattingConditionalFormatting	= arrFormattingDataActions[nFormattingDataAction];
var objTargetNode						= objFormattingNode;
if (objFormattingConditionalFormatting[4] == true)
{objTargetNode		= ViewDataNode.GetParent(objFormattingNode);
objTargetNode		= ViewDataNode.GetParent(objTargetNode);
objFormattingNode	= ViewDataNode.GetParent(objFormattingNode);}
if (ViewDataNode.ConditionalFormattingLogic(
objFormattingNode,
true,
objFormattingConditionalFormatting[1],
objFormattingConditionalFormatting[4],
objFormattingConditionalFormatting[5],
objFormattingConditionalFormatting[3],
objTargetNode,
objTargetsProcessed))
{(objFormattingNode._boolDirty = true);
break;}}}
else
{var objFormatSnippetElement = ViewDataNode_GetSnippetElement(objFormattingNode);
if (Snippet.GetScriptClass(objFormatSnippetElement) == "RichTextBox")
{objTargetNode = ViewDataNode.GetParent(objTargetNode);
objTargetNode = ViewDataNode.GetParent(objTargetNode);}
if (ViewDataNode.ConditionalFormattingLogic(
objFormattingNode,
boolFormattingTarget,
expression,
boolFormattingDisable,
boolFormattingVisible,
iFormattingIndex,
objTargetNode,
objTargetsProcessed))
{break;}}}}
if (boolFormattingTarget)
{var fIsStillPossibleTarget = false;
if (objViewDataNode == objFormattingNode)
{if (nConditionalFormattingIndex + 1 < arrConditionalFormattings.length)
{for (var iConditionalFormattings = nConditionalFormattingIndex + 1; iConditionalFormattings < arrConditionalFormattings.length; iConditionalFormattings++)
{var objCFIter = arrConditionalFormattings[iConditionalFormattings];
fIsStillPossibleTarget = objCFIter[6];
if (fIsStillPossibleTarget)
{break;}}}
else
{fIsStillPossibleTarget = true;}}
if (fIsStillPossibleTarget)
{continue;}
else
{objTargetsProcessed.Add(objViewDataNode);}}}};
ViewDataNode.ConditionalFormattingLogic = function(objFormattingNode,
boolFormattingTarget,
expression,
boolFormattingDisable,
boolFormattingVisible,
iFormattingIndex,
objTargetNode,
objTargetsProcessed)
{if (objFormattingNode != null)
{var objSnippetElement	= ViewDataNode_GetSnippetElement(objFormattingNode);
var enumSnippetType		= Snippet.GetSnippetType(objSnippetElement);
if (!boolFormattingTarget)
{if (enumSnippetType != 6 &&
enumSnippetType != 4)
{var arrFormattingDataActions		= ViewDataNode.GetDataActions(objFormattingNode)[2];
return ViewDataNode.ProcessConditionalFormatting(objFormattingNode, arrFormattingDataActions, objTargetsProcessed);}}
else
{var expressionResult = Expr_Evaluate(expression, objTargetNode, 0);
(objFormattingNode._boolDirty = true);
if (Expr.Boolean(expressionResult))
{objTargetsProcessed.Add(objFormattingNode);
if (boolFormattingDisable)
{ViewDataNode.Disable(objFormattingNode);}
ViewDataNode.SetHidden(objFormattingNode, boolFormattingVisible);
ViewDataNode.SetCondition(objFormattingNode, iFormattingIndex);
return true;}
else
{ViewDataNode.SetCondition(objFormattingNode, null );
ViewDataNode.UnDisable(objFormattingNode);
ViewDataNode.SetHidden(objFormattingNode, false );
var objSnippetElement = ViewDataNode_GetSnippetElement(objFormattingNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType == 6)
{var objFormattingNodeParent = ViewDataNode.GetParent(objFormattingNode);
ViewDataNode.SetHiddenNoHTML(objFormattingNodeParent, false );
ViewDataNode.SetCondition(objFormattingNodeParent, null );}}}}
return false;};
function ViewDataNode_ProcessRenderingActions()
{var objViewDataTree = CurrentFormData.ViewDataTree();
if (ViewDataNode.boolNeedReRendering == true)
{Container_MarkViewDataTreeDirty(objViewDataTree);
var objRTEDialogHelper = document.getElementById("RTEDialogHelper");
if (objRTEDialogHelper != null)
{objRTEDialogHelper.parentNode.removeChild(objRTEDialogHelper);
g_oExtendedRichTextSupport = null;}
var objRTETextEditorPullDownMenu = document.getElementById("RTETextEditorPullDownMenu");
if (objRTETextEditorPullDownMenu != null)
{objRTETextEditorPullDownMenu.parentNode.removeChild(objRTETextEditorPullDownMenu);
g_aToolBarButtons = null;
g_fRTEFirstTimeGenerateCalled = true;}
View_GenerateAndInsertHtmlView();
if (SelectionService.objSelectedControl && SelectionService.objSelectedControl.parentNode == null)
{var newSelectedControl = document.getElementById(SelectionService.objSelectedControl.id);
SelectionService.objSelectedControl = newSelectedControl;}
if (!(typeof(g_objCurrentFormDataSelection) == "undefined" ||
g_objCurrentFormDataSelection == null))
{SelectionService_RestoreFocus();}
ViewDataNode.boolNeedReRendering = false;}
ViewDataNode_ProcessRenderingAction(objViewDataTree);
ViewDataNode_UndirtySubtree(objViewDataTree);
if (ViewDataNode.boolErrorVisRefreshNeeded)
{ViewDataNode.boolErrorVisRefreshNeeded = false;
ErrorVisualization.UpdateAllAsterisks();}};
function ViewDataNode_UndirtySubtree(objViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
(objViewDataNode._boolDirty = false);
switch (enumSnippetType)
{case 6:
case 3:
case 7:
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
objDatum.UnDirty();
break;}
default:
{break;}}
var arrChildren = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nIndexChildren = 0; nIndexChildren < arrChildren.length; nIndexChildren++)
{ViewDataNode_UndirtySubtree(arrChildren[nIndexChildren]);}};
function ViewDataNode_ProcessRenderingAction(objViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
switch (enumSnippetType)
{case 6:
{if (ViewDataNode_IsHidden(objViewDataNode))
{return;}
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
if (objDatum.IsDirty() || (objViewDataNode._boolDirty))
{var htmlNode = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (htmlNode != null)
{BaseControl._ApplyCssClasses(htmlNode, 0);}}
var arrChildren = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nIndexChildren = 0; nIndexChildren < arrChildren.length; nIndexChildren++)
{ViewDataNode_ProcessRenderingAction(arrChildren[nIndexChildren]);}
break;}
case 3:
case 7:
{if (objViewDataNode._keyPressed === true)
{objViewDataNode._keyPressed = false;}
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
if ((objViewDataNode._boolDirty))
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{var funcRefreshControlData = BaseControl.FindFunction(objControl, "RefreshControlData", true );
funcRefreshControlData(objControl);}}
if (objDatum.IsDirty() || (objViewDataNode._boolDirty))
{ViewDataNode.Render(objViewDataNode);}
break;}
case 4:
{if (ViewDataNode_IsHidden(objViewDataNode))
{return;}
var objSnippet = ViewDataNode_GetSnippetElement(objViewDataNode);
if (Snippet.GetScriptClass(objSnippet) == "RichTextCollection")
{var htmlNode = ViewDataNode_GetHtmlControlFromViewDataNode(objViewDataNode);
BaseControl._ApplyCssClasses(htmlNode, 0);}}
default:
{if (ViewDataNode_IsHidden(objViewDataNode))
{return;}
var arrChildren = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nIndexChildren = 0; nIndexChildren < arrChildren.length; nIndexChildren++)
{ViewDataNode_ProcessRenderingAction(arrChildren[nIndexChildren]);}
break;}}};
function ViewDataNode_IterateRules(
objViewDataNode,
boolAllowedToRoundtrip,
nCurrentDepth,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion)
{var arrDataActions = ViewDataNode.GetDataActions(objViewDataNode);
var arrRules = arrDataActions[3];
if (arrRules.length == 0)
{return;}
return ViewDataNode_ProcessRules(
arrRules,
objViewDataNode,
boolAllowedToRoundtrip,
nCurrentDepth,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion);};
function ViewDataNode_ProcessRules(
arrRules,
objViewDataNode,
boolAllowedToRoundtrip,
nCurrentDepth,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion)
{var strLastRuleSetName		= "";
var boolConditionResult		= "";
if (nCurrentDepth == 15)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strRulesMaxDepthExceeded, false);
ViewDataNode.boolRuleLimitHit = true;}
if (ViewDataNode.boolRuleLimitHit)
{return;}
if (boolStructuralOperation && !boolStructuralInsertion)
{return;}
for (var nRuleIndex = 0; nRuleIndex < arrRules.length; nRuleIndex++)
{var objRule = arrRules[nRuleIndex];
var objTargetDataNode = objViewDataNode;
var strRuleSetName = objRule[4];
;
var bool_Bound = objRule[3];
if (!bool_Bound)
{objTargetDataNode = ViewDataNode.GetParent(objTargetDataNode);}
if (!(boolConditionResult && strRuleSetName == strLastRuleSetName))
{var objCondition			= objRule[1];
boolConditionResult			= Expr_Evaluate(objCondition, objTargetDataNode, 1);}
strRuleSetName = objRule[4];
var rulesProcessResult = ViewDataNode_ProcessRule(
objTargetDataNode,
objRule,
boolConditionResult,
boolAllowedToRoundtrip,
nCurrentDepth,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion);
if (rulesProcessResult == 1)
{return 1;}
if (rulesProcessResult == -1)
{return 0;}
strLastRuleSetName = strRuleSetName;}
ViewDataNode.boolRuleLimitHit = false;};
function ViewDataNode_ProcessRule(
objTargetDataNode,
objRule,
conditionResult,
boolAllowedToRoundtrip,
nCurrentDepth,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion)
{if (ViewDataNode.boolRuleLimitHit)
{return;}
var nType				= objRule[2];
if (conditionResult)
{var nPostbackReason = 0;
var fForceFullPostback = false;
switch (nType)
{case 0:
var calculationExpression	= objRule[5];
var assignValue				= Expr_Evaluate(calculationExpression, objTargetDataNode, 1);
var iRuleTargets			= objRule[6];
var objRuleViewPaths		= new Array();
for (var i = 0; i < iRuleTargets; i++)
{objRuleViewPaths.push(objRule[7 + i]);}
for (var i = 0; i < objRuleViewPaths.length; i++)
{var arrRuleTargetNodes = Expr.vpath_SelectViewPath(objTargetDataNode, objRuleViewPaths[i]);
for (var j = 0; j < arrRuleTargetNodes.length; j++)
{var objRuleTargetNode	= arrRuleTargetNodes[j];
var objRulesTargetDatum = ViewDataNode.GetDatum(objRuleTargetNode);
var objValueToBeAssigned = 0;
var fValueChanged = true;
var objTargetContent = ViewDataNode.GetContent(objRuleTargetNode);
if (objTargetContent[3])
{return;}
if (Util.GetDataType(assignValue) == 3 &&
assignValue.length >= 1 &&
assignValue[0] != null)
{;
objValueToBeAssigned = Expr.String(ViewDataNode.GetValue(assignValue[0]));
if (objValueToBeAssigned == objRulesTargetDatum.GetValue())
{fValueChanged = false;}
objRulesTargetDatum.SetValue(objValueToBeAssigned);}
else
{objValueToBeAssigned = Expr.String(assignValue);
if (objValueToBeAssigned == objRulesTargetDatum.GetValue())
{fValueChanged = false;}
objRulesTargetDatum.SetValue(objValueToBeAssigned);}
if (objRulesTargetDatum.GetValue() != objValueToBeAssigned)
{return -1;}
(objTargetDataNode._boolDirty = true);
if (fValueChanged)
{var recurseResults = null;
if (objRuleTargetNode != objTargetDataNode)
{recurseResults = ViewDataNode_ProcessDataActions(objRuleTargetNode,
boolAllowedToRoundtrip,
nCurrentDepth + 1,
boolProcessTargetActions,
boolStructuralOperation,
boolStructuralInsertion);}
if (recurseResults == 1 )
{return recurseResults;}}}}
break;
case 1:
nPostbackReason = 20;
break;
case 2:
nPostbackReason = 21;
break;
case 3:
nPostbackReason = 22;
break;
case 4:
nPostbackReason = 23;
fForceFullPostback = true;
break;
case 5:
ViewDataNode.boolRuleLimitHit = true;
break;
default:
;}
if (boolAllowedToRoundtrip && nPostbackReason != 0)
{var nPostbackType = boolStructuralOperation ?
(boolStructuralInsertion ? 2 : 3) :
1;
View_SubmitForm(
fForceFullPostback,
nPostbackReason,
nPostbackType,
false );
return 1;}}};
ViewDataNode.ProcessRefresh = function(
objViewDataNode,
arrDataActions,
boolProcessTargetActions)
{var arrRefreshActions = arrDataActions[4];
for (var nRefreshIndex = 0; nRefreshIndex < arrRefreshActions.length; nRefreshIndex++)
{var objRefreshAction = arrRefreshActions[nRefreshIndex];
var boolIsSourceAction = objRefreshAction[0];
var arrTargetNodes;
if (!boolIsSourceAction && !boolProcessTargetActions)
{continue;}
if (boolIsSourceAction)
{var objViewPath = objRefreshAction[1];
arrTargetNodes = Expr.vpath_SelectViewPathNoStrip(objViewDataNode, objViewPath);}
else
{arrTargetNodes = new Array();
arrTargetNodes.push(objViewDataNode);}
for (var nTargetIndex = 0; nTargetIndex < arrTargetNodes.length; nTargetIndex++)
{var objTargetNode = arrTargetNodes[nTargetIndex];
(objTargetNode._boolDirty = true);}}
return 0;};
ViewDataNode.FireOnAfterCreate = ViewDataNode_FireOnAfterCreate;
function ViewDataNode_FireOnAfterCreate(objViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
BaseControl.FireOnAfterCreate(objViewDataNode);
if (enumSnippetType == 3)
{return;}
else if (enumSnippetType == 4 ||
enumSnippetType == 2)
{var arrContainerControls = IP_Collection.GetChildViewDataNodes(objViewDataNode);
for (var i = 0; i < arrContainerControls.length; i++)
{ViewDataNode.FireOnAfterCreate(arrContainerControls[i]);}}
else if (enumSnippetType == 6)
{var arrContainerControls = Container.GetChildViewDataNodes(objViewDataNode);
for (var i = 0; i < arrContainerControls.length; i++)
{ViewDataNode.FireOnAfterCreate(arrContainerControls[i]);}}}
ViewDataNode.MarkSubtreeAsDeleted = function(
objViewDataNode)
{(objViewDataNode._boolDeleted = true);
var arrDataNodeChildren = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nChildIndex = 0; nChildIndex < arrDataNodeChildren.length; nChildIndex++)
{ViewDataNode.MarkSubtreeAsDeleted(arrDataNodeChildren[nChildIndex]);}}
function ViewDataNode_OnStructuralChange(
objViewDataNode,
boolAllowedToRoundtrip,
boolInsertion)
{ViewDataNode.boolNeedReRendering = false;
if (ViewDataNode_OnStructuralChangeInternal(objViewDataNode, boolAllowedToRoundtrip, boolInsertion))
{var viewDataNodeParent = ViewDataNode.GetParent(objViewDataNode);
var objSnippetElement = ViewDataNode_GetSnippetElement(viewDataNodeParent);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
var arrRules = objSnippetElement[7][1][3];
ViewDataNode_ProcessRules(
arrRules,
objViewDataNode,
boolAllowedToRoundtrip && (enumRoundTripModel != 2) ,
0 ,
boolInsertion ,
true ,
boolInsertion );
ViewDataNode_ProcessRenderingActions();
return true;}
else
{return false;}}
function ViewDataNode_OnStructuralChangeInternal(
objViewDataNode,
boolAllowedToRoundtrip,
boolInsertion)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
var boolNewAllowedToRoundtrip = boolAllowedToRoundtrip && (enumRoundTripModel != 2);
ViewDataNode.boolRuleLimitHit = false;
if (enumSnippetType == 3 ||
enumSnippetType == 6 ||
enumSnippetType == 7)
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (enumSnippetType != 7)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
objDatum.ValidateDataType();
if (objControl != null)
{BaseControl.RefreshVisualState(objControl);}
var enumDataActionResult = ViewDataNode_ProcessDataActions(
objViewDataNode,
boolNewAllowedToRoundtrip,
0 ,
boolInsertion ,
true ,
boolInsertion );
if (enumDataActionResult == 1)
{return false;}
if (enumDataActionResult == 2)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strCalculationsMaxDepthExceeded, true);}}
if (objControl != null)
{var funcRefreshControlData = BaseControl.FindFunction(objControl, "RefreshControlData", true );
funcRefreshControlData(objControl);}}
var arrDataNodeChildren = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nChildIndex = 0; nChildIndex < arrDataNodeChildren.length; nChildIndex++)
{if (!ViewDataNode_OnStructuralChangeInternal(
arrDataNodeChildren[nChildIndex],
boolNewAllowedToRoundtrip,
boolInsertion))
{return false;}}
return true;}
ViewDataNode.ProcessEditingActions = function(
objControl,
objViewDataNode,
objSnippetElement)
{var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
if (enumSnippetType != 7)
{var funcGetFormatting = BaseControl.FindFunction(objControl, "GetFormatting", false );
var objFormatting = funcGetFormatting(objViewDataNode);
var funcGetValueFromControl = BaseControl.FindFunction(objControl, "GetValueFromControl", false );
var strFormattedValue = funcGetValueFromControl(objControl);
var strUnformattedValue = objFormatting.Unformat(strFormattedValue).strUnformattedValue;
if (Util_GetDataType(strFormattedValue) == 3)
{strFormattedValue = strFormattedValue;
strUnformattedValue = strFormattedValue;}
if (IsValueValidForDatumBaseType(objDatum, strUnformattedValue))
{objDatum.SetValue(strUnformattedValue);}
else
{objDatum.SetValue(strFormattedValue);}}}
ViewDataNode.OnControlChange = function(
objControl)
{var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objControl);
;
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
ViewDataNode.boolRuleLimitHit = false;
ViewDataNode.ProcessEditingActions(objControl, objViewDataNode, objSnippetElement);
ViewDataNode.boolNeedReRendering = false;
var enumDataActionResult = ViewDataNode_ProcessDataActions(
objViewDataNode,
enumRoundTripModel != 2 ,
0 ,
false ,
false ,
false );
if (enumDataActionResult == 1)
{return false;}
if (enumDataActionResult == 2)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strCalculationsMaxDepthExceeded, true);}
ViewDataNode_ProcessRenderingActions();
return true;}
ViewDataNode.Render = function(objViewDataNode)
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl == null)
{return;}
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
var objDataInformation	= objDatum.GetDataInformation();
var funcGetFormatting = BaseControl.FindFunction(objControl, "GetFormatting", false );
var objFormatting = funcGetFormatting(objViewDataNode);
if (objDatum.IsDirty())
{var strCurrentValue = objDatum.GetValue();
var strNewValue = null;
if (IsValueValidForDatumBaseType(objDatum, strCurrentValue))
{strNewValue = objFormatting.Format(strCurrentValue);}
else
{strNewValue = strCurrentValue;}
var funcSetValueOfControl = BaseControl.FindFunction(objControl, "SetValueOfControl", false );
funcSetValueOfControl(objControl, strNewValue);
(objViewDataNode._boolDirty = true);}
if ((objViewDataNode._boolDirty))
{BaseControl.RefreshVisualState(objControl);}}
ViewDataNode.BuildViewDataPath = function(objViewDataNode)
{var arrViewDataPath = new Array();
var objCurrentViewDataNode = objViewDataNode;
var objViewSnippetElement = ViewDataNode_GetSnippetElement(CurrentFormData.ViewDataTree());
var strCurrentViewName = View.GetName(objViewSnippetElement);
arrViewDataPath.push(strCurrentViewName);
while (objCurrentViewDataNode != null)
{var objParentNode = ViewDataNode.GetParent(objCurrentViewDataNode);
if (objParentNode != null)
{var arrChildControls = ViewDataNode.GetChildNodes(objParentNode);
for (var i = 0; i < arrChildControls.length; i++)
{if (objCurrentViewDataNode == arrChildControls[i])
{arrViewDataPath.push(i);
break;}}}
objCurrentViewDataNode = objParentNode;}
return arrViewDataPath;}
ViewDataNode.SelectViewDataPath = function(objRootViewDataNode, arrViewDataPath)
{var objCurrentNode = objRootViewDataNode;
if (arrViewDataPath.length > 0)
{var objViewSnippetElement = ViewDataNode_GetSnippetElement(CurrentFormData.ViewDataTree());
var strCurrentViewName = View.GetName(objViewSnippetElement);
if (strCurrentViewName != arrViewDataPath[0])
{return objCurrentNode;}
for (var i = arrViewDataPath.length - 1; i >= 1 ; i--)
{var arrCurrentChildNodes = ViewDataNode.GetChildNodes(objCurrentNode);
if (arrCurrentChildNodes.length == 0)
{break;}
var intCurrentposition = arrViewDataPath[i];
if (intCurrentposition >= arrCurrentChildNodes.length)
{intCurrentposition = arrCurrentChildNodes.length - 1;}
objCurrentNode = arrCurrentChildNodes[intCurrentposition];
;}}
return objCurrentNode;}
function Container_MarkViewDataTreeDirty(objViewDataNode)
{if (ViewDataNode_IsHidden(objViewDataNode))
{return;}
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
if (enumSnippetType == 7)
{return;}
(objViewDataNode._boolDirty = true);
var arrChildViewDataNodes = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nIndex = 0; nIndex < arrChildViewDataNodes.length; nIndex++)
{Container_MarkViewDataTreeDirty(arrChildViewDataNodes[nIndex]);}}
function Snippet()
{};
var g_arrSnippetList;
Snippet.GetSnippetTree = function()
{return g_objSnippetTree;}
Snippet.GetSnippetElementFromHtml = function(objControl)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
;
return ViewDataNode_GetSnippetElement(objViewDataNode);}
Snippet.GetOrdinalId = function(objSnippetElement)
{return objSnippetElement[0];};
Snippet.GetClientId = function(objSnippetElement)
{return objSnippetElement[1];};
Snippet.GetScriptClass = function(objSnippetElement)
{return objSnippetElement[2];};
Snippet.GetCssClasses = function(objSnippetElement)
{return objSnippetElement[3];};
Snippet.GetRoundTripModel = function(objSnippetElement)
{return objSnippetElement[4];};
Snippet.GetSnippetType = function(objSnippetElement)
{return objSnippetElement[5];};
Snippet.GetContent = function(objSnippetElement)
{return objSnippetElement[6];};
Snippet._GetDataInformation = function(objSnippetElement)
{return objSnippetElement[7];};
Snippet.ControlHasWrappingSpan = function(objSnippetElement)
{return objSnippetElement[8];};
Snippet.GetPostbackReason = function(objSnippetElement)
{return objSnippetElement[9];};
Snippet.ShowHoverState = function(objSnippetElement)
{return objSnippetElement[11];};
Snippet.ShowSelectionState = function(objSnippetElement)
{return objSnippetElement[12];};
Snippet.SupportsAsterisk = Snippet_SupportsAsterisk;
function Snippet_SupportsAsterisk(objSnippetElement)
{return objSnippetElement[13];};
Snippet.SupportsErrorTip = Snippet_SupportsErrorTip;
function Snippet_SupportsErrorTip(objSnippetElement)
{return objSnippetElement[14];};
Snippet.SupportsSignIcon = Snippet_SupportsSignIcon;
function Snippet_SupportsSignIcon(objSnippetElement)
{return objSnippetElement[15];};
Snippet.GetDataActions = function(objSnippetElement)
{return objSnippetElement[7][1];};
Snippet.GetChildNodes = function(objSnippetElement)
{var enumSnippetType =  Snippet.GetSnippetType(objSnippetElement);
switch (enumSnippetType)
{case 3:
{return new Array();}
case 2:
case 4:
{var arrChildSnippetNodes = new Array();
arrChildSnippetNodes.push(Snippet.GetContent(objSnippetElement)[3]);
return arrChildSnippetNodes;}
case 6:
{return Snippet.GetContent(objSnippetElement)[0];}
default:
{;
return null;}}}
function Snippet_BuildSnippetList()
{g_arrSnippetList = new Array();
Snippet_AddSnippetToList (g_objSnippetTree);}
function Snippet_AddSnippetToList(objSnippetElement)
{g_arrSnippetList[objSnippetElement[0]] = objSnippetElement;
if (objSnippetElement[5] == 2 || objSnippetElement[5] == 4)
{Snippet_AddSnippetToList(objSnippetElement[6][3]);}
else if (objSnippetElement[5] == 6)
{var arrChildSnippets = objSnippetElement[6][0];
for (var nChildIndex = 0;  nChildIndex < arrChildSnippets.length; nChildIndex++)
{Snippet_AddSnippetToList(arrChildSnippets[nChildIndex])}}}
function Expr()
{};
function Expr_Evaluate(fnExpression, objContextDataNode, enumMode)
{return fnExpression(objContextDataNode, enumMode);}
function Expr_StripMultiplyBoundNodes(arrSelectionResult)
{var newArrSelectionResult = new Array();
var objMultipleBindingClasses = new Array();
for (var nIndex = 0; nIndex < arrSelectionResult.length; nIndex++)
{var nMultipleBindingClass = (arrSelectionResult[nIndex]._nMultipleBindingClassId);
if (nMultipleBindingClass == -1)
{newArrSelectionResult.push(arrSelectionResult[nIndex]);}
else if (objMultipleBindingClasses[nMultipleBindingClass] == null)
{newArrSelectionResult.push(arrSelectionResult[nIndex]);
objMultipleBindingClasses[nMultipleBindingClass] = 1;}}
return newArrSelectionResult;}
Expr.vpath_SelectViewPathNoStrip = Expr_vpath_SelectViewPathNoStrip;
function Expr_vpath_SelectViewPathNoStrip(objContextDataNode, objViewPath)
{return Expr.vpath_SelectViewPathInternal(objContextDataNode, objViewPath, false );}
Expr.vpath_SelectViewPath = Expr_vpath_SelectViewPath;
function Expr_vpath_SelectViewPath(objContextDataNode, objViewPath)
{return Expr.vpath_SelectViewPathInternal(objContextDataNode, objViewPath, true );}
Expr.vpath_SelectViewPathInternal = Expr_vpath_SelectViewPathInternal;
function Expr_vpath_SelectViewPathInternal(objContextDataNode, objViewPath, boolStripMultiplyBoundNodes)
{var arrSelectionResult = new Array();
arrSelectionResult.push(objContextDataNode);
var boolHasMultipleBinding = false;
for (var nViewPathIndex = 0; nViewPathIndex < objViewPath.length; nViewPathIndex++)
{var newArrSelectionResult = new Array();
var objViewPathStep = objViewPath[nViewPathIndex];
var nAxis = objViewPathStep[0];
var nSnippetId = objViewPathStep[1];
boolHasMultipleBinding = false;
if (nAxis == 1)
{for (var nSelectionResult = 0; nSelectionResult < arrSelectionResult.length; nSelectionResult++)
{var newDataNode = ViewDataNode.GetParent(arrSelectionResult[nSelectionResult]);
if (newDataNode != null)
{if ((newDataNode._nMultipleBindingClassId) != -1)
{boolHasMultipleBinding = true;}
newArrSelectionResult.push(newDataNode);}}}
else if (nAxis == 0)
{for (var nSelectionResult = 0; nSelectionResult < arrSelectionResult.length; nSelectionResult++)
{var arrDataNodeChildren = ViewDataNode.GetChildNodes(arrSelectionResult[nSelectionResult]);
for (var nChildIndex = 0; nChildIndex < arrDataNodeChildren.length; nChildIndex++)
{if (nSnippetId == -1 ||
nSnippetId == Snippet.GetOrdinalId(ViewDataNode_GetSnippetElement(arrDataNodeChildren[nChildIndex])))
{if (!(arrDataNodeChildren[nChildIndex]._boolDeleted))
{if ((arrDataNodeChildren[nChildIndex]._nMultipleBindingClassId) != -1)
{boolHasMultipleBinding = true;}
newArrSelectionResult.push(arrDataNodeChildren[nChildIndex]);}}}}}
arrSelectionResult = newArrSelectionResult;}
if (boolHasMultipleBinding && boolStripMultiplyBoundNodes)
{arrSelectionResult = Expr_StripMultiplyBoundNodes(arrSelectionResult);}
return arrSelectionResult;}
Expr.vpath_Select = Expr_vpath_Select;
function Expr_vpath_Select(objContextDataNode, objViewPathsArray)
{var arrSelectionResult = new Array();
for (var nViewPathIndex = 0; nViewPathIndex < objViewPathsArray.length; nViewPathIndex++)
{var arrTempResult = Expr.vpath_SelectViewPathInternal(objContextDataNode, objViewPathsArray[nViewPathIndex], true );
for (var j = 0; j < arrTempResult.length; j++)
{arrSelectionResult.push(arrTempResult[j]);}}
var objMultipleBindingClasses = new Array();
var boolHasMultipleBinding = false;
for (var nIndex = 0; nIndex < arrSelectionResult.length; nIndex++)
{var nMultipleBindingClass = (arrSelectionResult[nIndex]._nMultipleBindingClassId);
if (nMultipleBindingClass != -1)
{if (objMultipleBindingClasses[nMultipleBindingClass] == null)
{objMultipleBindingClasses[nMultipleBindingClass] = 1;}
else
{boolHasMultipleBinding = true;
break;}}}
if (boolHasMultipleBinding)
{arrSelectionResult = Expr_StripMultiplyBoundNodes(arrSelectionResult);}
return arrSelectionResult;}
Expr.Filter = function(objContextDataNode, enumMode, fnInput, fnCondition)
{var arrFilteredNodeSet = new Array();
var arrInputNodeSet = Expr_Evaluate(fnInput, objContextDataNode, enumMode);
;
for (var nInputIndex = 0; nInputIndex < arrInputNodeSet.length; nInputIndex++)
{if (Expr.Boolean(Expr_Evaluate(fnCondition, arrInputNodeSet[nInputIndex], enumMode)))
{arrFilteredNodeSet.push(arrInputNodeSet[nInputIndex]);}}
return arrFilteredNodeSet;}
Expr.vpath_RelativeSelect = function(arrContextNodeSet, objViewPathsArray)
{var arrNodeSet = new Array();
;
for (var nContextIndex = 0; nContextIndex < arrContextNodeSet.length; nContextIndex++)
{var arrPartialNodeSet = Expr.vpath_Select(arrContextNodeSet[nContextIndex], objViewPathsArray);
for (var nPartialIndex = 0; nPartialIndex < arrPartialNodeSet.length; nPartialIndex++)
{arrNodeSet.push(arrPartialNodeSet[nPartialIndex]);}}
return arrNodeSet;}
Expr._ParseFloat = function(objObject)
{if (objObject == "")
{return NaN;}
else
{return parseFloat(objObject);}}
Expr.String = function(objObject)
{var strValue = "";
var enumDataType = Util.GetDataType(objObject);
switch (enumDataType)
{case 3:
{if (objObject.length > 0)
{strValue = "" + ViewDataNode.GetValue(objObject[0]);}
break;}
case 2:
{strValue = objObject;
break;}
case 1:
{strValue = objObject.toString();
break;}
case 4:
{if (objObject)
{strValue = "true";}
else
{strValue = "false";}
break;}
default:
{;
break;}}
return strValue;}
Expr._StringToNumber = function(strObject)
{if (DoubleXsdDatatype.IsValid(strObject))
{if (strObject.charAt(0) == "+")
{return NaN;}
else
{return Expr._ParseFloat(strObject);}}
else
{return NaN;}}
Expr.Number = function(objObject)
{var nValue = NaN;
var enumDataType = Util.GetDataType(objObject);
switch (enumDataType)
{case 3:
{nValue = Expr._StringToNumber(Expr.String(objObject));
break;}
case 2:
{nValue = Expr._StringToNumber(objObject);
break;}
case 1:
{nValue = objObject;
break;}
case 4:
{if (objObject)
{nValue = 1;}
else
{nValue = 0;}
break;}
default:
{;
break;}}
return nValue;}
Expr.Boolean = function(objObject)
{var boolValue = false;
var enumDataType = Util.GetDataType(objObject);
switch (enumDataType)
{case 3:
{boolValue = objObject.length > 0;
break;}
case 2:
{boolValue = objObject.length > 0;
break;}
case 1:
{boolValue = (objObject != 0 && !isNaN(objObject));
break;}
case 4:
{boolValue = objObject;
break;}
default:
{;
break;}}
return boolValue;}
Expr.xpath_Plus = function(objLeft, objRight)
{return Expr.Number(objLeft) + Expr.Number(objRight);}
Expr.xpath_Minus = function(objLeft, objRight)
{return Expr.Number(objLeft) - Expr.Number(objRight);}
Expr.xpath_Mul = function(objLeft, objRight)
{return Expr.Number(objLeft) * Expr.Number(objRight);}
Expr.xpath_Mod = function(objLeft, objRight)
{return Expr.Number(objLeft) % Expr.Number(objRight);}
Expr.xpath_Div = function(objLeft, objRight)
{return Expr.Number(objLeft) / Expr.Number(objRight);}
Expr._gt = function(objLeft, objRight)
{return Expr.Number(objLeft) > Expr.Number(objRight);}
Expr._lt = function(objLeft, objRight)
{return Expr.Number(objLeft) < Expr.Number(objRight);}
Expr._le = function(objLeft, objRight)
{return Expr.Number(objLeft) <= Expr.Number(objRight);}
Expr._ge = function(objLeft, objRight)
{return Expr.Number(objLeft) >= Expr.Number(objRight);}
Expr._getCastFunction = function(objObject)
{var castFunction = null;
var enumDataType = Util.GetDataType(objObject);
switch (enumDataType)
{case 2:
{castFunction = Expr.String;
break;}
case 1:
{castFunction = Expr.Number;
break;}
case 4:
{castFunction = Expr.Boolean;
break;}
case 3:
default:
{;
break;}}
return castFunction;}
Expr._simpleEq = function(objLeft, objRight)
{return objLeft == objRight;}
Expr._simpleNe = function(objLeft, objRight)
{return objLeft != objRight;}
Expr._eq = function(objLeft, objRight)
{var castFunction = Expr._getCastFunction(objLeft);
return objLeft == castFunction(objRight);}
Expr._ne = function(objLeft, objRight)
{var castFunction = Expr._getCastFunction(objLeft);
return objLeft != castFunction(objRight);}
Expr._numberComparison = function(objLeft, objRight, fnComparisonOperator)
{var enumLeftDataType = Util.GetDataType(objLeft);
var enumRightDataType = Util.GetDataType(objRight);
if (enumLeftDataType == 3 && enumRightDataType == 3)
{for (var nLeftIndex in objLeft)
{var boolFound = Expr._FindNonNodeSetInNodeSet(
ViewDataNode.GetValue(objLeft[nLeftIndex]),
objRight,
fnComparisonOperator,
true
);
if (boolFound)
{return true;}}
return false;}
else if (enumLeftDataType == 3)
{return Expr._FindNonNodeSetInNodeSet(
objRight,
objLeft,
fnComparisonOperator,
false
);}
else if (enumRightDataType == 3)
{return Expr._FindNonNodeSetInNodeSet(
objLeft,
objRight,
fnComparisonOperator,
true
);}
else
{return fnComparisonOperator(objLeft, objRight);}}
Expr.xpath_Lt = function(objLeft, objRight)
{return Expr._numberComparison(objLeft, objRight, Expr._lt);}
Expr.xpath_Gt = function(objLeft, objRight)
{return Expr._numberComparison(objLeft, objRight, Expr._gt);}
Expr.xpath_Le = function(objLeft, objRight)
{return Expr._numberComparison(objLeft, objRight, Expr._le);}
Expr.xpath_Ge = function(objLeft, objRight)
{return Expr._numberComparison(objLeft, objRight, Expr._ge);}
Expr._FindNonNodeSetInNodeSet = function(
objObject,
arrNodeSet,
fnComparisonOperator,
boolIsLeftOperand
)
{for (var nIndex in arrNodeSet)
{var boolResult = false;
if (boolIsLeftOperand)
{boolResult = fnComparisonOperator(objObject, ViewDataNode.GetValue(arrNodeSet[nIndex]));}
else
{boolResult = fnComparisonOperator(ViewDataNode.GetValue(arrNodeSet[nIndex]), objObject);}
if (boolResult)
{return true;}}
return false;}
Expr._eqComparison = function(objLeft, objRight, fnCastingOperator, fnSimpleOperator)
{var enumLeftDataType = Util.GetDataType(objLeft);
var enumRightDataType = Util.GetDataType(objRight);
if (enumLeftDataType == 3 && enumRightDataType == 3)
{for (var nLeftIndex in objLeft)
{var boolFound = Expr._FindNonNodeSetInNodeSet(
ViewDataNode.GetValue(objLeft[nLeftIndex]),
objRight,
fnSimpleOperator,
true
);
if (boolFound)
{return true;}}
return false;}
else if (enumLeftDataType == 3)
{return Expr._FindNonNodeSetInNodeSet(
objRight,
objLeft,
fnCastingOperator,
false
);}
else if (enumRightDataType == 3)
{return Expr._FindNonNodeSetInNodeSet(
objLeft,
objRight,
fnCastingOperator,
true
);}
else if (enumRightDataType == 4 || enumLeftDataType == 4)
{return fnSimpleOperator(Expr.Boolean(objLeft), Expr.Boolean(objRight));}
else if (enumRightDataType == 1 || enumLeftDataType == 1)
{return fnSimpleOperator(Expr.Number(objLeft), Expr.Number(objRight));}
else
{return fnSimpleOperator(Expr.String(objLeft), Expr.String(objRight));}}
Expr.xpath_Eq = function(objLeft, objRight)
{return Expr._eqComparison(objLeft, objRight, Expr._eq, Expr._simpleEq);}
Expr.xpath_Ne = function(objLeft, objRight)
{return Expr._eqComparison(objLeft, objRight, Expr._ne, Expr._simpleNe);}
Expr.xpath_Or = function(objLeft, objRight)
{return  Expr.Boolean(objLeft) || Expr.Boolean(objRight);}
Expr.xpath_And = function(objLeft, objRight)
{return Expr.Boolean(objLeft) && Expr.Boolean(objRight);}
Expr.xpath_Union = function(arrNodeSetLeft, arrNodeSetRight)
{var arrCombinedSet = new Array();
for (var nIndex in arrNodeSetLeft)
{arrCombinedSet.push(arrNodeSetLeft[nIndex]);}
for (var nRightIndex in arrNodeSetRight)
{var objCandidateNode = arrNodeSetRight[nRightIndex];
var boolCanInsert = true;
for (var nLeftIndex in arrNodeSetLeft)
{if (arrNodeSetLeft[nLeftIndex] == objCandidateNode)
{boolCanInsert = false;
break;}}
if (boolCanInsert)
{arrCombinedSet.push(objCandidateNode);}}
return arrCombinedSet;}
Expr.xpath_Count = function(arrNodeSet)
{var inputType = Util.GetDataType(arrNodeSet);
;
return arrNodeSet.length;}
Expr.xpath_True = function()
{return true;}
Expr.xpath_False = function()
{return false;}
Expr.xpath_Not = function(boolValue)
{return !Expr.Boolean(boolValue);}
Expr.xpath_Contains = function(objValue, objSubPart)
{var strValue = Expr.String(objValue);
var strSubPart = Expr.String(objSubPart);
return strValue.indexOf(strSubPart) >= 0;}
Expr.xpath_StartsWith = function(objValue, objSubPart)
{var strValue = Expr.String(objValue);
var strSubPart = Expr.String(objSubPart);
return strValue.indexOf(strSubPart) == 0;}
Expr.xpath_SubstringBefore = function(objValue, objSubPart)
{var strValue = Expr.String(objValue);
var strSubPart = Expr.String(objSubPart);
var nIndex = strValue.indexOf(strSubPart);
if (nIndex >= 0)
{return strValue.substr(0, nIndex);}
else
{return "";}}
Expr.xpath_SubstringAfter = function(objValue, objSubPart)
{var strValue = Expr.String(objValue);
var strSubPart = Expr.String(objSubPart);
var nIndex = strValue.indexOf(strSubPart);
if (nIndex >= 0)
{return strValue.substr(nIndex + strSubPart.length);}
else
{return "";}}
Expr.xpath_Substring = function(objValue, nStart, nEnd)
{var strValue = Expr.String(objValue);
var nStartIndex = Expr.xpath_Round(nStart) - 1;
if (nStartIndex < 0)
{nStartIndex = 0;}
if (isNaN(nStartIndex))
{return "";}
if (typeof(nEnd) == "undefined")
{return strValue.substr(nStartIndex);}
else
{var nLength = Expr.xpath_Round(nEnd);
if (nLength < 0)
{nLength = 0;}
if (isNaN(nLength))
{return "";}
return strValue.substr(nStartIndex, nLength);}}
Expr.xpath_StringLength = function(objValue)
{var strValue = Expr.String(objValue);
return strValue.length;}
Expr.xpath_Concat = function(arrValues)
{var strValue = new Array();
for (var inputIndex in arrValues)
{strValue.push(arrValues[inputIndex]);}
return strValue.join("");}
Expr.xpath_Floor = function(objValue)
{return Math.floor(Expr.Number(objValue));}
Expr.xpath_Ceiling = function(objValue)
{return Math.ceil(Expr.Number(objValue));}
Expr.xpath_Round = function(objValue)
{var floatValue = Expr.Number(objValue);
return floatValue > 0 ?
Math.floor(floatValue + 0.5) : Math.ceil(floatValue - 0.5);}
Expr.xpath_Sum = function(arrNodeSet)
{var nSum = 0;
for (var nIndex in arrNodeSet)
{nSum += Expr.Number(ViewDataNode.GetValue(arrNodeSet[nIndex]));}
return nSum;}
Expr.msXsl_StringCompare = function(objLeft, objRight)
{var strLeft = Expr.String(objLeft);
var strRight = Expr.String(objRight);
if (strLeft > strRight)
{return 1;}
else if (strLeft < strRight)
{return -1;}
else
{return 0;}}
Expr.xdMath_Avg = function(arrNodeSet)
{var nTotal = 0;
var nCount = 0;
for (var nIndex in arrNodeSet)
{var strValue = ViewDataNode.GetValue(arrNodeSet[nIndex]);
if (strValue == "")
{continue;}
if (DoubleXsdDatatype.IsValid(strValue))
{nTotal = nTotal + Expr._ParseFloat(strValue);
nCount++;}
else
{return NaN;}}
if (nCount > 0)
{return nTotal / nCount;}
else
{return Expr.String(arrNodeSet);}}
Expr.xdMath_Max = function(arrNodeSet)
{var nMax = 0;
var nCount = 0;
for (var nIndex in arrNodeSet)
{var strValue = ViewDataNode.GetValue(arrNodeSet[nIndex]);
if (strValue == "")
{continue;}
if (DoubleXsdDatatype.IsValid(strValue))
{var nValue = Expr._ParseFloat(strValue);
if (nCount == 0 || nValue > nMax)
{nMax = nValue;}
nCount++;}
else
{return NaN;}}
if (nCount > 0)
{return nMax;}
else
{return Expr.String(arrNodeSet);}}
Expr.xdMath_Min = function(arrNodeSet)
{var nMin = 0;
var nCount = 0;
for (var nIndex in arrNodeSet)
{var strValue = ViewDataNode.GetValue(arrNodeSet[nIndex]);
if (strValue == "")
{continue;}
if (DoubleXsdDatatype.IsValid(strValue))
{var nValue = Expr._ParseFloat(strValue);
if (nCount == 0 || nValue < nMin)
{nMin = nValue;}
nCount++;}
else
{return NaN;}}
if (nCount > 0)
{return nMin;}
else
{return Expr.String(arrNodeSet);}}
Expr.xdMath_Nz = function(arrNodeSet)
{var arrNewNodeSet = new Array();
for (var nIndex in arrNodeSet)
{var objViewDataNode = arrNodeSet[nIndex];
var strValue = ViewDataNode.GetValue(objViewDataNode);
if (strValue == "")
{arrNewNodeSet.push(ViewDataNode.GetZeroViewDataNode());}
else
{arrNewNodeSet.push(objViewDataNode);}}
return arrNewNodeSet;}
Expr.xdMath_Eval = function(arrArguments)
{var arrNewNodeSet = new Array();
var nItems = (arrArguments.length) / 2;
;
for (var nCurrentIndex = 0; nCurrentIndex < nItems; nCurrentIndex++)
{var arrTargetNodes = arrArguments[nCurrentIndex * 2];
var expression = arrArguments[nCurrentIndex * 2 + 1];
for (var nTargetIndex = 0; nTargetIndex < arrTargetNodes.length; nTargetIndex++)
{var objTargetNode = arrTargetNodes[nTargetIndex];
var expressionResult = Expr.String(expression(objTargetNode));
var objNewViewDataNode = ViewDataNode.CreateUnparentedViewDataNode(expressionResult);
arrNewNodeSet.push(objNewViewDataNode);}}
return arrNewNodeSet;}
Expr.xdEnvironment_IsBrowser = function()
{return true;}
Expr.xdEnvironment_IsMobile = function()
{return CurrentFormData.IsMobile();}
Expr._k_strLettersRanges = "\\u0041-\\u005A\\u0061-\\u007A\\u00AA-\\u00AA\\u00B5-\\u00B5\\u00BA-\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u021F\\u0222-\\u0233\\u0250-\\u02AD\\u02B0-\\u02B8\\u02BB-\\u02C1\\u02D0-\\u02D1\\u02E0-\\u02E4\\u02EE-\\u02EE\\u037A-\\u037A\\u0386-\\u0386\\u0388-\\u038A\\u038C-\\u038C\\u038E-\\u03A1\\u03A3-\\u03CE\\u03D0-\\u03D7\\u03DA-\\u03F3\\u0400-\\u0481\\u048C-\\u04C4\\u04C7-\\u04C8\\u04CB-\\u04CC\\u04D0-\\u04F5\\u04F8-\\u04F9\\u0531-\\u0556\\u0559-\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u063A\\u0640-\\u064A\\u0671-\\u06D3\\u06D5-\\u06D5\\u06E5-\\u06E6\\u06FA-\\u06FC\\u0710-\\u0710\\u0712-\\u072C\\u0780-\\u07A5\\u0905-\\u0939\\u093D-\\u093D\\u0950-\\u0950\\u0958-\\u0961\\u0985-\\u098C\\u098F-\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2-\\u09B2\\u09B6-\\u09B9\\u09DC-\\u09DD\\u09DF-\\u09E1\\u09F0-\\u09F1\\u0A05-\\u0A0A\\u0A0F-\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32-\\u0A33\\u0A35-\\u0A36\\u0A38-\\u0A39\\u0A59-\\u0A5C\\u0A5E-\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8B\\u0A8D-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2-\\u0AB3\\u0AB5-\\u0AB9\\u0ABD-\\u0ABD\\u0AD0-\\u0AD0\\u0AE0-\\u0AE0\\u0B05-\\u0B0C\\u0B0F-\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32-\\u0B33\\u0B36-\\u0B39\\u0B3D-\\u0B3D\\u0B5C-\\u0B5D\\u0B5F-\\u0B61\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99-\\u0B9A\\u0B9C-\\u0B9C\\u0B9E-\\u0B9F\\u0BA3-\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB5\\u0BB7-\\u0BB9\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C60-\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CDE-\\u0CDE\\u0CE0-\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D60-\\u0D61\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD-\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32-\\u0E33\\u0E40-\\u0E46\\u0E81-\\u0E82\\u0E84-\\u0E84\\u0E87-\\u0E88\\u0E8A-\\u0E8A\\u0E8D-\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5-\\u0EA5\\u0EA7-\\u0EA7\\u0EAA-\\u0EAB\\u0EAD-\\u0EB0\\u0EB2-\\u0EB3\\u0EBD-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6-\\u0EC6\\u0EDC-\\u0EDD\\u0F00-\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6A\\u0F88-\\u0F8B\\u1000-\\u1021\\u1023-\\u1027\\u1029-\\u102A\\u1050-\\u1055\\u10A0-\\u10C5\\u10D0-\\u10F6\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1206\\u1208-\\u1246\\u1248-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258-\\u1258\\u125A-\\u125D\\u1260-\\u1286\\u1288-\\u1288\\u128A-\\u128D\\u1290-\\u12AE\\u12B0-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0-\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12CE\\u12D0-\\u12D6\\u12D8-\\u12EE\\u12F0-\\u130E\\u1310-\\u1310\\u1312-\\u1315\\u1318-\\u131E\\u1320-\\u1346\\u1348-\\u135A\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1780-\\u17B3\\u1820-\\u1877\\u1880-\\u18A8\\u1E00-\\u1E9B\\u1EA0-\\u1EF9\\u1F00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59-\\u1F59\\u1F5B-\\u1F5B\\u1F5D-\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE-\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u207F-\\u207F\\u2102-\\u2102\\u2107-\\u2107\\u210A-\\u2113\\u2115-\\u2115\\u2119-\\u211D\\u2124-\\u2124\\u2126-\\u2126\\u2128-\\u2128\\u212A-\\u212D\\u212F-\\u2131\\u2133-\\u2139\\u3005-\\u3006\\u3031-\\u3035\\u3041-\\u3094\\u309D-\\u309E\\u30A1-\\u30FA\\u30FC-\\u30FE\\u3105-\\u312C\\u3131-\\u318E\\u31A0-\\u31B7\\u3400-\\u3400\\u4DB5-\\u4DB5\\u4E00-\\u4E00\\u9FA5-\\u9FA5\\uA000-\\uA48C\\uAC00-\\uAC00\\uD7A3-\\uD7A3\\uF900-\\uFA2D\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E-\\uFB3E\\uFB40-\\uFB41\\uFB43-\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE72\\uFE74-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC";
Expr._k_strNotLettersRanges = "\\u0000-\\u0040\\u005B-\\u0060\\u007B-\\u00A9\\u00AB-\\u00B4\\u00B6-\\u00B9\\u00BB-\\u00BF\\u00D7-\\u00D7\\u00F7-\\u00F7\\u0220-\\u0221\\u0234-\\u024F\\u02AE-\\u02AF\\u02B9-\\u02BA\\u02C2-\\u02CF\\u02D2-\\u02DF\\u02E5-\\u02ED\\u02EF-\\u0379\\u037B-\\u0385\\u0387-\\u0387\\u038B-\\u038B\\u038D-\\u038D\\u03A2-\\u03A2\\u03CF-\\u03CF\\u03D8-\\u03D9\\u03F4-\\u03FF\\u0482-\\u048B\\u04C5-\\u04C6\\u04C9-\\u04CA\\u04CD-\\u04CF\\u04F6-\\u04F7\\u04FA-\\u0530\\u0557-\\u0558\\u055A-\\u0560\\u0588-\\u05CF\\u05EB-\\u05EF\\u05F3-\\u0620\\u063B-\\u063F\\u064B-\\u0670\\u06D4-\\u06D4\\u06D6-\\u06E4\\u06E7-\\u06F9\\u06FD-\\u070F\\u0711-\\u0711\\u072D-\\u077F\\u07A6-\\u0904\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962-\\u0984\\u098D-\\u098E\\u0991-\\u0992\\u09A9-\\u09A9\\u09B1-\\u09B1\\u09B3-\\u09B5\\u09BA-\\u09DB\\u09DE-\\u09DE\\u09E2-\\u09EF\\u09F2-\\u0A04\\u0A0B-\\u0A0E\\u0A11-\\u0A12\\u0A29-\\u0A29\\u0A31-\\u0A31\\u0A34-\\u0A34\\u0A37-\\u0A37\\u0A3A-\\u0A58\\u0A5D-\\u0A5D\\u0A5F-\\u0A71\\u0A75-\\u0A84\\u0A8C-\\u0A8C\\u0A8E-\\u0A8E\\u0A92-\\u0A92\\u0AA9-\\u0AA9\\u0AB1-\\u0AB1\\u0AB4-\\u0AB4\\u0ABA-\\u0ABC\\u0ABE-\\u0ACF\\u0AD1-\\u0ADF\\u0AE1-\\u0B04\\u0B0D-\\u0B0E\\u0B11-\\u0B12\\u0B29-\\u0B29\\u0B31-\\u0B31\\u0B34-\\u0B35\\u0B3A-\\u0B3C\\u0B3E-\\u0B5B\\u0B5E-\\u0B5E\\u0B62-\\u0B84\\u0B8B-\\u0B8D\\u0B91-\\u0B91\\u0B96-\\u0B98\\u0B9B-\\u0B9B\\u0B9D-\\u0B9D\\u0BA0-\\u0BA2\\u0BA5-\\u0BA7\\u0BAB-\\u0BAD\\u0BB6-\\u0BB6\\u0BBA-\\u0C04\\u0C0D-\\u0C0D\\u0C11-\\u0C11\\u0C29-\\u0C29\\u0C34-\\u0C34\\u0C3A-\\u0C5F\\u0C62-\\u0C84\\u0C8D-\\u0C8D\\u0C91-\\u0C91\\u0CA9-\\u0CA9\\u0CB4-\\u0CB4\\u0CBA-\\u0CDD\\u0CDF-\\u0CDF\\u0CE2-\\u0D04\\u0D0D-\\u0D0D\\u0D11-\\u0D11\\u0D29-\\u0D29\\u0D3A-\\u0D5F\\u0D62-\\u0D84\\u0D97-\\u0D99\\u0DB2-\\u0DB2\\u0DBC-\\u0DBC\\u0DBE-\\u0DBF\\u0DC7-\\u0E00\\u0E31-\\u0E31\\u0E34-\\u0E3F\\u0E47-\\u0E80\\u0E83-\\u0E83\\u0E85-\\u0E86\\u0E89-\\u0E89\\u0E8B-\\u0E8C\\u0E8E-\\u0E93\\u0E98-\\u0E98\\u0EA0-\\u0EA0\\u0EA4-\\u0EA4\\u0EA6-\\u0EA6\\u0EA8-\\u0EA9\\u0EAC-\\u0EAC\\u0EB1-\\u0EB1\\u0EB4-\\u0EBC\\u0EBE-\\u0EBF\\u0EC5-\\u0EC5\\u0EC7-\\u0EDB\\u0EDE-\\u0EFF\\u0F01-\\u0F3F\\u0F48-\\u0F48\\u0F6B-\\u0F87\\u0F8C-\\u0FFF\\u1022-\\u1022\\u1028-\\u1028\\u102B-\\u104F\\u1056-\\u109F\\u10C6-\\u10CF\\u10F7-\\u10FF\\u115A-\\u115E\\u11A3-\\u11A7\\u11FA-\\u11FF\\u1207-\\u1207\\u1247-\\u1247\\u1249-\\u1249\\u124E-\\u124F\\u1257-\\u1257\\u1259-\\u1259\\u125E-\\u125F\\u1287-\\u1287\\u1289-\\u1289\\u128E-\\u128F\\u12AF-\\u12AF\\u12B1-\\u12B1\\u12B6-\\u12B7\\u12BF-\\u12BF\\u12C1-\\u12C1\\u12C6-\\u12C7\\u12CF-\\u12CF\\u12D7-\\u12D7\\u12EF-\\u12EF\\u130F-\\u130F\\u1311-\\u1311\\u1316-\\u1317\\u131F-\\u131F\\u1347-\\u1347\\u135B-\\u139F\\u13F5-\\u1400\\u166D-\\u166E\\u1677-\\u1680\\u169B-\\u169F\\u16EB-\\u177F\\u17B4-\\u181F\\u1878-\\u187F\\u18A9-\\u1DFF\\u1E9C-\\u1E9F\\u1EFA-\\u1EFF\\u1F16-\\u1F17\\u1F1E-\\u1F1F\\u1F46-\\u1F47\\u1F4E-\\u1F4F\\u1F58-\\u1F58\\u1F5A-\\u1F5A\\u1F5C-\\u1F5C\\u1F5E-\\u1F5E\\u1F7E-\\u1F7F\\u1FB5-\\u1FB5\\u1FBD-\\u1FBD\\u1FBF-\\u1FC1\\u1FC5-\\u1FC5\\u1FCD-\\u1FCF\\u1FD4-\\u1FD5\\u1FDC-\\u1FDF\\u1FED-\\u1FF1\\u1FF5-\\u1FF5\\u1FFD-\\u207E\\u2080-\\u2101\\u2103-\\u2106\\u2108-\\u2109\\u2114-\\u2114\\u2116-\\u2118\\u211E-\\u2123\\u2125-\\u2125\\u2127-\\u2127\\u2129-\\u2129\\u212E-\\u212E\\u2132-\\u2132\\u213A-\\u3004\\u3007-\\u3030\\u3036-\\u3040\\u3095-\\u309C\\u309F-\\u30A0\\u30FB-\\u30FB\\u30FF-\\u3104\\u312D-\\u3130\\u318F-\\u319F\\u31B8-\\u33FF\\u3401-\\u4DB4\\u4DB6-\\u4DFF\\u4E01-\\u9FA4\\u9FA6-\\u9FFF\\uA48D-\\uABFF\\uAC01-\\uD7A2\\uD7A4-\\uF8FF\\uFA2E-\\uFAFF\\uFB07-\\uFB12\\uFB18-\\uFB1C\\uFB1E-\\uFB1E\\uFB29-\\uFB29\\uFB37-\\uFB37\\uFB3D-\\uFB3D\\uFB3F-\\uFB3F\\uFB42-\\uFB42\\uFB45-\\uFB45\\uFBB2-\\uFBD2\\uFD3E-\\uFD4F\\uFD90-\\uFD91\\uFDC8-\\uFDEF\\uFDFC-\\uFE6F\\uFE73-\\uFE73\\uFE75-\\uFE75\\uFEFD-\\uFF20\\uFF3B-\\uFF40\\uFF5B-\\uFF65\\uFFBF-\\uFFC1\\uFFC8-\\uFFC9\\uFFD0-\\uFFD1\\uFFD8-\\uFFD9\\uFFDE-\\uFFFF";
Expr._TranslateCategoriesForMatchPattern = function(
strPattern)
{var boolInASet = false;
for (var intIndex = 0; intIndex < strPattern.length; intIndex++)
{if (strPattern.charAt(intIndex) == '\\')
{intIndex++;
if (intIndex < strPattern.length && (strPattern.charAt(intIndex) == 'p' || strPattern.charAt(intIndex) == 'P'))
{if (intIndex + 1 < strPattern.length && strPattern.substr(intIndex + 1, "{L}".length) == "{L}")
{var boolUseNotLettersRanges = strPattern.charAt(intIndex) == 'P';
var intRemainingCharacters = strPattern.length - (intIndex + 1 + "{L}".length);
var strBefore = strPattern.substr(0, intIndex - 1);
var strAfter = strPattern.substr(strPattern.length - intRemainingCharacters);
if (!boolInASet)
{strBefore = strBefore + "[";
strAfter = "]" + strAfter;}
strPattern = strBefore
+ (boolUseNotLettersRanges ? Expr._k_strNotLettersRanges : Expr._k_strLettersRanges)
+ strAfter;
intIndex = strPattern.length - intRemainingCharacters - 1;}}}
else if (!boolInASet && strPattern.charAt(intIndex) == '[')
{boolInASet = true;
if (intIndex + 1 < strPattern.length && strPattern.charAt(intIndex + 1) == '^')
{intIndex++;}
if (intIndex + 1 < strPattern.length && strPattern.charAt(intIndex + 1) == ']')
{intIndex++;}}
else if (strPattern.charAt(intIndex) == ']')
{boolInASet = false;}}
return strPattern;}
Expr.xdUtil_Match = function(strValue, strPattern)
{var arrTranslatedPattern;
var boolInCharGroup;
var strTranslatedPattern;
var objRegExp;
strPattern = Expr._TranslateCategoriesForMatchPattern(strPattern);
arrTranslatedPattern = new Array();
boolInCharGroup = false;
for (var intIndex = 0; intIndex < strPattern.length; intIndex++)
{var strCurrentChar;
strCurrentChar = strPattern.charAt(intIndex);
switch (strCurrentChar)
{case "\\":
arrTranslatedPattern.push("\\");
intIndex++;
if (intIndex < strPattern.length)
{strCurrentChar = strPattern.charAt(intIndex);
arrTranslatedPattern.push(strCurrentChar);}
break;
case "[":
if (!boolInCharGroup)
{boolInCharGroup = true;}
arrTranslatedPattern.push("[");
break;
case "]":
if (boolInCharGroup)
{boolInCharGroup = false;}
arrTranslatedPattern.push("]");
break;
case "$":
if (!boolInCharGroup)
{arrTranslatedPattern.push("\\");}
arrTranslatedPattern.push("$");
break;
case "^":
if (!boolInCharGroup)
{arrTranslatedPattern.push("\\");}
arrTranslatedPattern.push("^");
break;
default:
arrTranslatedPattern.push(strCurrentChar);}}
strTranslatedPattern = "^" + arrTranslatedPattern.join("") + "$";
objRegExp = new RegExp(strTranslatedPattern);
return objRegExp.test(strValue);}
function Expr_GetDateTimeInServerTimezone()
{var objNow = new Date();
var intUtcDateTimeMillis = objNow.getTime();
var intServerZoneOffsetMillis = CurrentFormData.ServerTimeZone()  * 60 * 1000;
var intClientZoneOffsetMillis = -(objNow.getTimezoneOffset())  * 60 * 1000;
var intServerDateTimeMillis = intUtcDateTimeMillis - intClientZoneOffsetMillis + intServerZoneOffsetMillis;
return DateUtils.DateTimeFromJScriptDate(new Date(intServerDateTimeMillis), false , 0 );}
function Expr_FormatDateInServerTimezone(boolDateOnly)
{var objServerDateTime = Expr_GetDateTimeInServerTimezone();
var objFormatting = BaseControl._objDateFormatting;
var objCultureInfo = DateFormatting_DefaultCultureObject();
objFormatting.Reinit([objCultureInfo, objFormatting.k_intModeDate + "," + objCultureInfo.formatShortDate]);
var strFormattedDateTime = objFormatting.UnformatFromDateTime(
objServerDateTime,
boolDateOnly ? objFormatting.k_intModeDate : objFormatting.k_intModeDateTime,
"" );
return strFormattedDateTime;}
Expr.xdDate_Now = function(enumMode)
{switch (enumMode)
{case 1:
return Expr_FormatDateInServerTimezone(false );
case 0:
return CurrentFormData.Now();
default:
;
return "";}}
Expr.xdDate_Today = function(enumMode)
{switch (enumMode)
{case 1:
return Expr_FormatDateInServerTimezone(true );
case 0:
return CurrentFormData.Today();
default:
;
return "";}}
Expr.xdDate_AddDays = function(arg1, arg2)
{var strDate;
var strDays;
if (Util.GetDataType(arg1) == 3)
{var objDateDatum = ViewDataNode.GetDatum(arg1[0]);
strDate = Expr.String(objDateDatum.GetValue());}
else
{strDate = Expr.String(arg1);}
if (Util.GetDataType(arg2) == 3)
{var objDaysDatum = ViewDataNode.GetDatum(arg2[0]);
strDays = Expr.String(objDaysDatum.GetValue());}
else
{strDays = Expr.String(arg2);}
if (strDate == "" || strDays == "")
{return "";}
if (strDays.indexOf('.') != -1 ||
strDays.indexOf(',') != -1)
{return "#ERR?";}
var arrDateTime = strDate.split("T");
if (arrDateTime.length == 2)
{strDate = arrDateTime[0];}
var arrDate		= strDate.split("-");
var iDays	= Number(strDays);
if (arrDate.length != 3 || isNaN(iDays))
{return "#ERR?";}
var iMonthIndex = Number(arrDate[1]) - 1;
var iDateIndex = Number(arrDate[2]) + iDays;
var dateObj = new Date();
dateObj.setFullYear(arrDate[0], iMonthIndex, iDateIndex);
var iMonth =   Number(dateObj.getMonth()) + 1;
var strMonth;
if (iMonth < 10)
{strMonth = "0" + String(iMonth);}
else
{strMonth = String(iMonth);}
var iDate = dateObj.getDate();
var strDate;
if (iDate < 10)
{strDate = "0" + String(iDate);}
else
{strDate = String(iDate);}
var iYear = dateObj.getFullYear();
var strYear;
if (iYear < 100)
{strYear = String("19" + iYear);}
else
{strYear = String(iYear);}
if (isNaN(strYear) || isNaN(strMonth) || isNaN(strDate))
{return "#ERR?";}
else
{var strReturn;
strReturn = strYear + "-" + strMonth+ "-" + strDate;
if (arrDateTime.length == 2)
{strReturn = strReturn.concat("T" + arrDateTime[1]);}
return strReturn;}}
Expr.xdDate_AddSeconds = function(arg1, arg2)
{var strTime;
var strSeconds;
if (Util.GetDataType(arg1) == 3)
{var objTimeDatum	= ViewDataNode.GetDatum(arg1[0]);
strTime				= Expr.String(objTimeDatum.GetValue());}
else
{strTime = Expr.String(arg1);}
if (Util.GetDataType(arg2) == 3)
{var objSecondsDatum	= ViewDataNode.GetDatum(arg2[0]);
strSeconds			= Expr.String(objSecondsDatum.GetValue());}
else
{strSeconds = Expr.String(arg2);}
if (strTime == "" || strSeconds == "")
{return "";}
if (strSeconds.indexOf('.') != -1 ||
strSeconds.indexOf(',') != -1)
{return "#ERR?";}
var iSeconds		= Number(strSeconds);
if (isNaN(iSeconds))
{return "#ERR?";}
var strDate			= "";
var dateObj			= new Date();
var arrDateTime		= strTime.split("T");
if (arrDateTime.length == 2)
{strDate = arrDateTime[0];
strTime = arrDateTime[1];}
else if (arrDateTime[0].indexOf("-") != -1 || arrDateTime[0].indexOf("/") != -1)
{strDate = arrDateTime[0];
strTime = "00:00:00";}
else
{strTime = arrDateTime[0];}
var arrDate				= strDate.split("-");
if (arrDate.length == 3)
{var iMonthIndex = Number(arrDate[1]) - 1;
var iDateIndex = Number(arrDate[2]);
dateObj.setFullYear(arrDate[0], iMonthIndex, iDateIndex);}
else
{arrDate				= strDate.split("/");
if (arrDate.length == 3)
{var iMonthIndex = Number(arrDate[0]) - 1;
var iDateIndex = Number(arrDate[1]);
dateObj.setFullYear(arrDate[2], iMonthIndex, iDateIndex);}}
var arrTime		= strTime.split(":");
if (arrTime.length == 3)
{dateObj.setHours(arrTime[0]);
dateObj.setMinutes(arrTime[1]);
dateObj.setSeconds(arrTime[2]);}
dateObj.setSeconds(Number(dateObj.getSeconds()) + iSeconds);
var iMonth =   Number(dateObj.getMonth()) + 1;
var strMonth;
if (iMonth < 10)
{strMonth = "0" + String(iMonth);}
else
{strMonth = String(iMonth);}
var iDate = dateObj.getDate();
var strDate;
if (iDate < 10)
{strDate = "0" + String(iDate);}
else
{strDate = String(iDate);}
var iYear = dateObj.getFullYear();
var strYear;
if (iYear < 100)
{strYear = "19" + iYear;}
else
{strYear = iYear;}
var strReturnDate = strYear + "-" + strMonth+ "-" + strDate;
var iHours = dateObj.getHours();
var strHours;
if (iHours < 10)
{strHours = "0" + iHours;}
else
{strHours = iHours;}
var iMinutes = dateObj.getMinutes();
var strMinutes;
if (iMinutes < 10)
{strMinutes = "0" + iMinutes;}
else
{strMinutes = iMinutes;}
var iSeconds = dateObj.getSeconds();
var strSeconds;
if (iSeconds < 10)
{strSeconds = "0" + iSeconds;}
else
{strSeconds = iSeconds;}
var strReturnTime = strHours + ":" + strMinutes + ":" + strSeconds;
var strReturn;
if (arrDate.length > 1)
{if (isNaN(strYear) || isNaN(strMonth) || isNaN(strDate) || isNaN(strHours) || isNaN(strMinutes) || isNaN(strSeconds))
{return "#ERR?";}
return strReturnDate + "T" + strReturnTime;}
else
{if (isNaN(strHours) || isNaN(strMinutes) || isNaN(strSeconds))
{return "#ERR?";}
return strReturnTime;}}
Expr.xdUser_GetUserName = function(enumMode)
{return CurrentFormData.UserName();}
function LeafDatum()
{if (!(LeafDatum.prototype instanceof LeafDatumTraits))
{LeafDatum.prototype = new LeafDatumTraits();
LeafDatum.prototype.constructor = LeafDatum;
return new LeafDatum();}
this._objDataInformation = null;
this._strValue = null;
this._strErrorMessage = null;
this._strDetailedErrorMessage = null;
this._boolIsValid = true;
this._boolIsSigned = false;
this._boolModifiedOnClient = false;
this._changedOnClient = false;}
function LeafDatumTraits()
{this.GetDataInformation = function()
{return this._objDataInformation;};
this.Initialize = function(arrDatumData, objDataInformation, boolIsSigned)
{;
var	strValue  				= arrDatumData[0];
var strErrorMessage			= arrDatumData[1];
var strDetailedErrorMessage	= arrDatumData[2];
this._objDataInformation = objDataInformation;
this.SetValueInternal(strValue, false );
if (Util.IsNullOrEmptyString(strErrorMessage) && Util.IsNullOrEmptyString(strDetailedErrorMessage))
{this.ClearError();}
else
{this.SetError(strErrorMessage, strDetailedErrorMessage);}
this._boolDirty = false;
this._boolIsSigned = boolIsSigned;
this._boolModifiedOnClient = false;};
this.GetValue = function()
{return this._strValue;};
this.SetValue = function(
strValue)
{this.SetValueInternal(strValue, true );};
this.SetValueInternal = function(
strValue,
boolSetChangedOnClient)
{if (!this._boolIsSigned)
{this._boolModifiedOnClient = true;
;
this._strValue = strValue;
this.ClearError();
this._Dirty();
if (boolSetChangedOnClient)
{this._changedOnClient = true;}}}
this.IsValid = function()
{return this._boolIsValid;};
this.ModifiedOnClient = function()
{return this._boolModifiedOnClient;};
this.GetErrorMessage = function()
{;
return this._strErrorMessage;};
this.GetDetailedErrorMessage = function()
{;
return this._strDetailedErrorMessage;};
this.SetError = function(
strErrorMessage,
strDetailedErrorMessage)
{this._boolIsValid = false;
this._strErrorMessage = strErrorMessage == null ? "" : strErrorMessage;
this._strDetailedErrorMessage = strDetailedErrorMessage == null ? "" : strDetailedErrorMessage;
;};
this.ClearError = function(boolSetDirty)
{this._boolIsValid = true;
;};
this._Dirty = function()
{this._boolDirty = true;};
this.UnDirty = function()
{this._boolDirty = false;};
this.IsDirty = function()
{return this._boolDirty;};
this.toString = function()
{return this._strValue;};
this.ValidateDataType = LeafDatum_ValidateDataType;
function LeafDatum_ValidateDataType()
{var objDataInformation	= this.GetDataInformation();
var objDatatype = DataInformation.GetDataType(objDataInformation);
var objFacets = DataInformation.GetFacets(objDataInformation);
var effectiveValue = this.GetValue();
if (effectiveValue == "")
{effectiveValue = objDatatype.GetDefaultValue();}
var boolValid = objDatatype.IsValid(effectiveValue);
var arrErrorMessages = null;
if (!boolValid)
{arrErrorMessages = objDatatype.GetErrorMessages();}
else if (!(Util.IsNullOrEmptyString(effectiveValue) && objDatatype.IsNillable()))
{boolValid = objFacets.IsValid(objDatatype, effectiveValue);
if (!boolValid)
{arrErrorMessages = objFacets.GetErrorMessages(objDatatype);}}
if (!boolValid)
{if (arrErrorMessages != null)
{for (var i = 0; i < arrErrorMessages.length; i++)
{if (Util.IsNonEmptyString(arrErrorMessages[i]))
{arrErrorMessages[i] = Util.UnescapeStringEx(arrErrorMessages[i], true );}}}
this.SetError(arrErrorMessages[0], arrErrorMessages[1]);}
return boolValid;};}
function IsValueValidForDatumBaseType(objDatum, strValue)
{var objDataInformation = objDatum.GetDataInformation();
var objDatatype = DataInformation.GetDataType(objDataInformation);
return objDatatype.IsValid(strValue);}
function DataInformation()
{};
DataInformation.GetDataType = function(objDataInformation)
{return new XsdDatatype(objDataInformation[0][1]);};
DataInformation.GetFacets = function(objDataInformation)
{return new XsdFacets(objDataInformation[0][2]);};
DataInformation.IsValidDataInformation = function(objDataInformation)
{if (objDataInformation == null ||
Util.GetDataType(objDataInformation) != 3 ||
objDataInformation.length != 2)
{;
return false;}
if (Util.GetDataType(objDataInformation[0]) != 3
|| Util.GetDataType(objDataInformation[0][0]) != 4
|| Util.GetDataType(objDataInformation[0][1]) != 3
|| Util.GetDataType(objDataInformation[0][2]) != 3)
{;
return false;}
if (Util.GetDataType(objDataInformation[1]) != 3 ||
objDataInformation[1].length != 3)
{;
return false;}
return true;};
function Toolbar() {}
Toolbar.objFocusedToolbarControl = null;
Toolbar.intKeyboardViewSwitchOldIndex = -1;
Toolbar.arrLastFocusedFormControl = null;
Toolbar.ExecuteAction = function(strAction, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
switch(strAction)
{case ("refresh"):
{if (document.forms[0] != null)
{View_SubmitForm(false , 24, 0, false );}
break;}
case ("submit"):
{if (View.PreSubmitActions())
{EventLog_Add(
9,
null,
"",
"",
"",
true ,
false ,
false ,
9,
0);}
break;}
case ("view"):
{;
break;}
case ("save"):
{EventLog_Add(
14,
null,
"",
false,
false,
true ,
false ,
false ,
10,
0);
break;}
case ("saveAs"):
{EventLog_Add(
14,
null,
"",
true,
false,
true ,
false ,
false ,
11,
0);
break;}
case ("close"):
{EventLog_Add(
15,
null,
0 ,
'',
'',
true ,
true ,
false ,
12,
0);
break;}
case ("print"):
{Print.Show();
break;}
default:
{break;}}
Util.StopEventProprogation(objEvent);
return false;}
Toolbar.Show = function(fShouldShow)
{var strDisplayStyle = fShouldShow ? "block" : "none";
var objToolbar = document.getElementById("__toolbar_top");
if (objToolbar != null)
{objToolbar.style.display = strDisplayStyle;}
objToolbar = document.getElementById("__toolbar_bottom");
if (objToolbar != null)
{objToolbar.style.display = strDisplayStyle;}}
Toolbar.RefreshViewDropdown =Toolbar_RefreshViewDropdown;
function Toolbar_RefreshViewDropdown()
{var objViewSnippetElement = ViewDataNode_GetSnippetElement(CurrentFormData.ViewDataTree());
var strCurrentViewName = View.GetName(objViewSnippetElement);
var objTopViewDropdown = document.getElementById("__toolbar_top_viewdropdown");
if (objTopViewDropdown != null)
{Util.SetListValue(objTopViewDropdown, strCurrentViewName);}
var objBottomViewDropdown = document.getElementById("__toolbar_Bottom_viewdropdown");
if (objBottomViewDropdown != null)
{Util.SetListValue(objBottomViewDropdown, strCurrentViewName);}}
Toolbar.EnableViewDropdown = Toolbar_EnableViewDropdown;
function Toolbar_EnableViewDropdown(boolEnable)
{var objTopViewDropdown = document.getElementById("__toolbar_top_viewdropdown");
if (objTopViewDropdown != null)
{objTopViewDropdown.disabled = !boolEnable;}
var objBottomViewDropdown = document.getElementById("__toolbar_Bottom_viewdropdown");
if (objBottomViewDropdown != null)
{objBottomViewDropdown.disabled = !boolEnable;}}
Toolbar.GetWidth = function()
{var objToolbar = document.getElementById("__toolbar_top");
if (objToolbar == null)
{objToolbar = document.getElementById("__toolbar_bottom");}
if (objToolbar != null && objToolbar.offsetWidth != null)
{return objToolbar.offsetWidth + "px";}
else
{return "542px";}}
Toolbar.HandleViewDropdown = function(objDropdown)
{;
if (!BaseControl.CanHandleEvents() || Toolbar.intKeyboardViewSwitchOldIndex != -1)
{return;}
var objViewSnippetElement = ViewDataNode_GetSnippetElement(CurrentFormData.ViewDataTree());
var strCurrentViewName = View.GetName(objViewSnippetElement);
var strNewViewName = objDropdown.value;
if (strNewViewName != strCurrentViewName)
{EventLog_Add(
11,
null,
"",
"",
strNewViewName,
true ,
false ,
true ,
14,
0);}}
Toolbar.OnFocus = function(objControl)
{;
if (Dialog.boolModalDialogForFocusRestorationPresent)
{Dialog_MaintainModalDialog();
return;}
Toolbar.objFocusedToolbarControl = objControl;
SelectionService.Select(null);}
Toolbar.OnBlur = function(objControl)
{;
Toolbar.objFocusedToolbarControl = null;}
Toolbar.ViewsOnBlur = function(objControl)
{;
if (Toolbar.intKeyboardViewSwitchOldIndex != -1)
{objControl.selectedIndex = Toolbar.intKeyboardViewSwitchOldIndex;
Toolbar.intKeyboardViewSwitchOldIndex = -1;}
Toolbar.OnBlur(objControl);}
Toolbar.ViewsOnKeyDown = function(objEvent)
{;
if (!BaseControl.CanHandleEvents())
{return;}
;
var intVirtualKey = KeyboardService.GetVirtualKey(objEvent);
switch (intVirtualKey)
{case 1:
Toolbar.intKeyboardViewSwitchOldIndex = -1;
Toolbar.HandleViewDropdown(Toolbar.objFocusedToolbarControl);
break;
case 7:
case 8:
if (Toolbar.intKeyboardViewSwitchOldIndex == -1)
{Toolbar.intKeyboardViewSwitchOldIndex = Toolbar.objFocusedToolbarControl.selectedIndex;}
default:
return KeyboardService.OnKeyDown(objEvent);}}
function Set()
{if (!(Set.prototype instanceof SetTraits))
{Set.prototype = new SetTraits();
Set.prototype.constructor = Set;
return new Set();}
this._arrSetItems = new Array();}
function SetTraits()
{this.Contains = function(objItem)
{for (var nSetIndex = 0; nSetIndex < this._arrSetItems.length; nSetIndex++)
{if (this._arrSetItems[nSetIndex] == objItem)
{return true;}}
return false;};
this.Add = function(objItem)
{if (!this.Contains(objItem))
{this._arrSetItems.push(objItem);}};}
function CurrentFormData()
{};
CurrentFormData.UserMessages = function()
{return g_objCurrentFormData[0];}
CurrentFormData.ViewDataTree = function()
{return g_objCurrentFormData[1];}
function CurrentFormData_IsValidViewDataTree()
{return (g_objCurrentFormData[1] != null && g_objCurrentFormData[1].length != null && g_objCurrentFormData[1].length > 0);}
CurrentFormData.PostbackCounter = function()
{return g_objCurrentFormData[2];}
CurrentFormData.EditingSessionId = function()
{return g_objCurrentFormData[3];}
CurrentFormData.SolutionId = function()
{return g_objCurrentFormData[4];}
CurrentFormData.DefaultLcid = function()
{return g_objCurrentFormData[5];}
CurrentFormData.Now = function()
{return g_objCurrentFormData[6];}
CurrentFormData.Today = function()
{return g_objCurrentFormData[7];}
CurrentFormData.LoadedFromXmlDocument = function()
{return g_objCurrentFormData[8][0];}
CurrentFormData.XmlLocation = function()
{return g_objCurrentFormData[8][1];}
CurrentFormData.XsnLocation = function()
{return g_objCurrentFormData[8][2];}
CurrentFormData.SaveLocation = function()
{return g_objCurrentFormData[8][3];}
CurrentFormData.AbsoluteSolutionLocation = function()
{return g_objCurrentFormData[8][4];}
CurrentFormData.UrlToNavigateToOnClose = function()
{return g_objCurrentFormData[8][5];}
CurrentFormData.IsHosted = function()
{return g_objCurrentFormData[8][6] == 1;}
CurrentFormData.IsMobile = function()
{return g_objCurrentFormData[8][7] == 1;}
CurrentFormData.ViewName = function()
{return g_objCurrentFormData[9];}
CurrentFormData.RefreshViewBeforeSubmit = function()
{return g_objCurrentFormData[10] == 1;}
CurrentFormData.ShouldFocusFirstInvalidControl = function()
{return g_objCurrentFormData[11];}
CurrentFormData.GetPageTitle = function()
{return g_objCurrentFormData[12];}
CurrentFormData.IsNew = function()
{return g_objCurrentFormData[13] == 1;}
CurrentFormData.SessionState = function()
{return g_objCurrentFormData[14];}
CurrentFormData.SetSessionState = function(newSessionState)
{g_objCurrentFormData[14] = newSessionState;}
CurrentFormData.SiteUrl = function()
{return g_objCurrentFormData[15];}
CurrentFormData.Direction = function()
{return g_objCurrentFormData[16];}
CurrentFormData.GetWebUrl = function()
{;
return g_objCurrentFormData[17];}
CurrentFormData.CreationTime = function()
{return g_objCurrentFormData[18];}
CurrentFormData.ServerTimeZone = function()
{return g_objCurrentFormData[19];}
CurrentFormData.UserName = function()
{return g_objCurrentFormData[20];}
CurrentFormData.IsFileAttachmentPresent = function()
{return g_objCurrentFormData[21] == true;}
CurrentFormData.RichTextLCID = function()
{return g_objCurrentFormData[22];}
CurrentFormData.ServerUrl = function()
{return g_objCurrentFormData[23];}
CurrentFormData.HasSignature = function()
{return g_objCurrentFormData[24];}
CurrentFormData.DSigCtrlVersion = function()
{return g_objCurrentFormData[25];}
CurrentFormData.DSigResVersion = function()
{return g_objCurrentFormData[26];}
CurrentFormData.CanaryValue = function()
{return g_objCurrentFormData[27];}
CurrentFormData.ViewTreesAreMerged = function()
{if (typeof(g_objCurrentFormData.boolTreesAreMerged) == "undefined")
{return false;}
return g_objCurrentFormData.boolTreesAreMerged;}
CurrentFormData.MarkTreesAreMerged = function()
{g_objCurrentFormData.boolTreesAreMerged = true;}
CurrentFormData.IsValid = function(objCurrentFormData)
{if (objCurrentFormData != null && objCurrentFormData.length == 28)
{return true;}
else
{;
return false;}}
CurrentFormData.SetFormData = function(objCurrentFormData)
{g_objCurrentFormData = objCurrentFormData;}
function PostbackBody() {};
PostbackBody._boolXmlHttpSupported = false;
PostbackBody._objCurrentXmlHttp = null;
var PostbackBody_boolLastPostBackWasFull = false;
PostbackBody.intPostbacksInProgress = 0;
PostbackBody.boolPostbacksBlocked = false;
PostbackBody.postbackNeeded = null;
PostbackBody.GetPostbackPage = PostbackBody_GetPostbackPage;
function PostbackBody_GetPostbackPage()
{var postbackUrl = CurrentFormData.GetWebUrl();
if (!Util.IsNonEmptyString(postbackUrl))
{;
postbackUrl = CurrentFormData.SiteUrl();}
return postbackUrl + "/_layouts/Postback.FormServer.aspx";}
PostbackBody.OnLoad = function()
{try
{PostbackBody.DetectAndCreateXmlHttp();
if (PostbackBody.EnsureFormStateIsValid())
{View_PostbackComplete();}
Window.AttachEventHandlers(window);}
catch (exception)
{PostbackBody.HandleInitialLoadException(exception);}}
PostbackBody.OnUnload = function()
{PostbackBody.SaveFormState();
RichTextBox_DetatchAllEvents();}
function PostbackBody_Submit(boolForceFullPostback)
{PostbackBody.RetryingPostback = false;
PostbackBody_boolLastPostBackWasFull = boolForceFullPostback;
if (PostbackBody._boolXmlHttpSupported && !boolForceFullPostback)
{PostbackBody.SubmitXmlHttp();}
else
{PostbackBody.PerformFullPagePostback();}}
PostbackBody.PerformFullPagePostback = function()
{if (__doPostBack != null)
{document.getElementById("__WasSubmitted").value = "1";
if (g_objCurrentFormDataSelection != null)
{g_objCurrentFormDataSelection.Serialize();}
eval(_InfoPath.arrForms[0].strPostbackCall);}
else if (UserAgentInfo.strBrowser == 2)
{document.getElementById("__WasSubmitted").value = "1";
document.forms[0].submit();}
else
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strOtherPostbackFailure),
12);
PostbackBody.intPostbacksInProgress--;
;}}
PostbackBody.SubmitXmlHttp = function()
{;
Dialog.ShowPostbackDialog();
var strEventLog = EventLog.Value();
var objXmlHttp = PostbackBody.DetectAndCreateXmlHttp();
;
if (PostbackBody.OpenConnection(objXmlHttp))
{try
{objXmlHttp.send(strEventLog);}
catch (exception)
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strNetworkPostbackFailure),
12);}}}
PostbackBody.OpenConnection = function(objXmlHttp)
{try
{objXmlHttp.open("POST", PostbackBody.GetPostbackPage(), true );}
catch (exception)
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strNetworkPostbackFailure),
12);
return false;}
return true;}
PostbackBody.RetryingPostback = false;
PostbackBody.OnReadyStateChangeCallback = function()
{PostbackBody.RetryingPostback = false;
;
var objXmlHttp = PostbackBody._objCurrentXmlHttp;
if (objXmlHttp != null && objXmlHttp.readyState == 4)
{PostbackBody._objCurrentXmlHttp = null;
var responseText = "[]";
var nStatus = objXmlHttp.status;
if (nStatus != 200)
{if (nStatus == 404)
{PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strNotAvailablePostbackFailure,
5);}
else if (nStatus == 301 || nStatus == 401)
{PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strPermissionPostbackFailure,
12);}
else if (nStatus == 408 || nStatus == 502 ||
(nStatus >= 12001 && nStatus <= 12156))
{PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strNetworkPostbackFailure,
12);}
else if (nStatus == 599 || nStatus == 503)
{PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strServerErrorPostbackFailure,
12);}
else if (nStatus == 400)
{PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strServerErrorPostbackFailure,
12);}
else if (nStatus == 2)
{Dialog.HideDialog();
PostbackBody.intPostbacksInProgress--;
;}
else
{Dialog.HideDialog();
UserMessages.ShowMessage(new UserMessage(IntlCoreStrings.k_strOtherPostbackFailure, objXmlHttp.statusText),
5);
PostbackBody.intPostbacksInProgress--;}
return;}
try
{responseText = objXmlHttp.responseText;}
catch (exception)
{PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strNetworkPostbackFailure,
12);
return;}
if (responseText.substr(0,1) == "<")
{Dialog.HideDialog();
UserMessageError.ShowTemplatedMessage(null, responseText, true);
PostbackBody.intPostbacksInProgress--;
;
return;}
try
{eval(responseText);}
catch (exception)
{if (responseText.substring(1,5).toUpperCase() == "HTML")
{Dialog.HideDialog();
UserMessageError.ShowTemplatedMessage(null, responseText, true);
PostbackBody.intPostbacksInProgress--;
;
return;}
else
{PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strOtherPostbackFailure,
5);
return;}}
var objTemplate = null;
var funcGetDialogData = null;
if (typeof(__dialogTemplate_) != "undefined" && __dialogTemplate_ != null)
{objTemplate = __dialogTemplate_;}
if (typeof(__GetDialogData_) != "undefined" && __GetDialogData_ != null)
{funcGetDialogData = __GetDialogData_;}
Dialog.GetOnDemandData(objTemplate, funcGetDialogData);
if (PostbackBody.ExecutePostBackdata(g_objCurrentFormData))
{PostbackBody.intPostbacksInProgress--;
;}}}
function PostbackBody_HandlePostbackError(
strErrorMessage,
intMessageStyle)
{PostbackBody_HandlePostbackDetailedError(strErrorMessage, null, null, intMessageStyle);}
function PostbackBody_HandlePostbackDetailedError(
strErrorMessage,
strErrorMessageDetails,
strLogId,
intMessageStyle)
{if (intMessageStyle == 12)
{PostbackBody.RetryingPostback = true;}
Dialog.HideDialog();
UserMessages.intNextMessage = 0;
UserMessages.ReturnedUserMessages = null;
UserMessages.ShowMessage(
new UserMessage(strErrorMessage, strErrorMessageDetails, strLogId),
intMessageStyle);
PostbackBody.intPostbacksInProgress--;
;}
PostbackBody.ExecutePostBackdata = function(arrResponse)
{if (CurrentFormData.IsValid(arrResponse))
{CurrentFormData.SetFormData(arrResponse);
if (CurrentFormData.UserMessages() != null && CurrentFormData.UserMessages().length > 0)
{var message = CurrentFormData.UserMessages()[0];
if (message[0] == 12)
{PostbackBody_HandlePostbackDetailedError(message[1], message[2], message[3],
12);
return false;}}
View_PostbackComplete();}
return true;}
PostbackBody.HandleInitialLoadException = function(exception)
{if (UserMessages != null && IntlCoreStrings != null && View != null && "__ViewContainer" != null)
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strErrorClientScriptFailure,
exception.message != null ? exception.message : exception),
5);}
else
{if (Toolbar != null)
{try
{Toolbar.Show(false);}
catch(exception)
{}}
if (IntlCoreStrings != null && View != null && "__ViewContainer" != null)
{var viewHtmlContainer = document.getElementById("__ViewContainer");
if (viewHtmlContainer != null)
{Util.SetInnerText(viewHtmlContainer, IntlCoreStrings.k_strErrorClientScriptFailure + "\r\n" + exception);
return true;}}
throw exception;}}
PostbackBody.DetectAndCreateXmlHttp = function()
{var objXmlHttp = null;
try
{objXmlHttp = new XMLHttpRequest();}
catch (exception)
{}
if (objXmlHttp == null && typeof(ActiveXObject) != "undefined")
{try
{objXmlHttp = new ActiveXObject("MSXML2.XMLHTTP");}
catch (exception)
{}}
if (objXmlHttp != null)
{PostbackBody._boolXmlHttpSupported = true;
PostbackBody._objCurrentXmlHttp = objXmlHttp;
objXmlHttp.onreadystatechange = PostbackBody.OnReadyStateChangeCallback;
return objXmlHttp;}
else
{PostbackBody._boolXmlHttpSupported = false;
return null;}}
PostbackBody.SaveFormState = function()
{if (true == false)
{return;}
if (!View.boolIsSubmitCalled && !UserMessages.boolDocumentClosed)
{var intPostBackCounter = CurrentFormData.PostbackCounter();
PostbackBody.CreateDocumentCookie(
PostbackBody.GetFormID(),
"_pb",
intPostBackCounter);
if (EventLog.Count() > 1)
{PostbackBody.CreateDocumentCookie(
PostbackBody.GetFormID(),
"_log",
EventLog.Value());
var eventLogCookie = PostbackBody.ReadDocumentCookie(
PostbackBody.GetFormID(),
"_log");
if (eventLogCookie == null || eventLogCookie.length == 0)
{PostbackBody.DeleteDocumentCookie(
PostbackBody.GetFormID(),
"_log");
PostbackBody.CreateDocumentCookie(
PostbackBody.GetFormID(),
"_err",
"true");}}
if (!(typeof(g_objCurrentFormDataSelection) == "undefined" ||
g_objCurrentFormDataSelection == null))
{var strSelection = g_objCurrentFormDataSelection.Serialize();
PostbackBody.CreateDocumentCookie(
PostbackBody.GetFormID(),
"_sel",
strSelection);}}
else if (UserMessages.boolDocumentClosed)
{PostbackBody.CreateDocumentCookie(
PostbackBody.GetFormID(),
"_dc",
"true");}}
function PostbackBody_VerifyCookiesEnabled()
{var objSentinelDetection = document.getElementById("__PerformSentinelDetection");
var fCookiesEnabled = PostbackBody.ReadCookie("_InfoPath_Sentinel") != null;
if (!fCookiesEnabled)
{var strOriginalLocation = window.location.href;
if (objSentinelDetection.value == "2" ||
strOriginalLocation.indexOf("?" + "_InfoPath_Sentinel" + "=") >= 0 ||
strOriginalLocation.indexOf("&" + "_InfoPath_Sentinel" + "=") >= 0 )
{Dialog.ShowFinalMessage(IntlCoreStrings.k_strNoCookiesDefined, false );}
else
{objSentinelDetection.value = "1";
var strSeperator;
if (strOriginalLocation.indexOf("?") >= 0)
{strSeperator = "&";}
else
{strSeperator = "?";}
var strnewLocation = strOriginalLocation + strSeperator + "_InfoPath_Sentinel" + "=1";
Util.Navigate(strnewLocation);
return false;}}
return true;}
PostbackBody.EnsureFormStateIsValid = function()
{var eventLog = null;
View.boolIsSubmitCalled = false;
var needPostBack = false;
var fFullPagePostBack = false;
var nPostbackReason = 0;
if (typeof(g_objSnippetTree) == "undefined" ||
g_objSnippetTree == null)
{}
else
{if (View.GetName(g_objSnippetTree) != CurrentFormData.ViewName())
{needPostBack = true;
fFullPagePostBack = true;
nPostbackReason = 8;}
else if (document.getElementById("__WasSubmitted").value != '')
{needPostBack = true;
fFullPagePostBack = true;
nPostbackReason = 25;}}
if (true == false)
{return true;}
var strDocumentClosedCookie = PostbackBody.ReadDocumentCookie(
PostbackBody.GetFormID(),
"_dc");
if (strDocumentClosedCookie == "true")
{Dialog.ShowFinalMessage(IntlCoreStrings.k_strErrorFormClosed, true );
return false;}
var error = PostbackBody.ReadDocumentCookie(
PostbackBody.GetFormID(),
"_err");
if (error != null && error.length > 0)
{if (CurrentFormData.IsHosted())
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strErrorCookieDataLost, true);}
needPostBack = true;
PostbackBody.DeleteDocumentCookie(
PostbackBody.GetFormID(),
"_err");}
else
{var eventLogCookie = PostbackBody.ReadDocumentCookie(
PostbackBody.GetFormID(),
"_log");
if (eventLogCookie != null && eventLogCookie.length > 0)
{eventLog = eventLogCookie;
PostbackBody.DeleteDocumentCookie(
PostbackBody.GetFormID(),
"_log");}}
if (eventLog != null)
{var eventLogField = document.getElementById("__EventLog");
if (eventLogField != null)
{eventLogField.value = eventLog;
var arrEventLog = EventLog_Deserialize();
EventLog_Initialize(false);
EventLog_Serialize(arrEventLog);
needPostBack = true;}}
else
{}
if (needPostBack == false)
{var postbackCounter = PostbackBody.ReadDocumentCookie(
PostbackBody.GetFormID(),
"_pb");
if (postbackCounter != null)
{needPostBack = postbackCounter > CurrentFormData.PostbackCounter();
nPostbackReason = 19;}}
PostbackBody.DeleteDocumentCookie(
PostbackBody.GetFormID(),
"_pb");
if (needPostBack == true)
{var eventLogField = document.getElementById("__EventLog");
if (eventLogField == null || eventLogField.value.length <= 1)
{EventLog_EnsureEventLogStartEntry();}
else
{var eventLogValue = eventLogField.value;
if (EventLog.objStaticData == null)
{EventLog_Initialize(false);
EventLog_Serialize(eventLogValue.split(' '));}
EventLog.objStaticData.UpdateForCachedEventLogValue(eventLogValue);}
View_SubmitForm(fFullPagePostBack, nPostbackReason, 0, false );
if (fFullPagePostBack)
{return false;}}
var strSelectionCookie = PostbackBody.ReadDocumentCookie(
PostbackBody.GetFormID(),
"_sel");
if (strSelectionCookie != null && strSelectionCookie.length > 0)
{;
var objTempSelection = new SelectionInformation();
objTempSelection.SetStorrageInput(strSelectionCookie);
PostbackBody.DeleteDocumentCookie(
PostbackBody.GetFormID(),
"_sel");}
View.boolIsSubmitCalled = false;
return true;}
PostbackBody.GetFormID = function()
{return encodeURIComponent(CurrentFormData.EditingSessionId());}
PostbackBody.CreateDocumentCookie = function(strDocumentId, strName, strValue)
{var strCookieName = encodeURIComponent(strDocumentId + strName);
PostbackBody.CreateCookie(
strCookieName,
strValue,
null,
null,
false);}
PostbackBody.ReadDocumentCookie = function(strDocumentId, strName)
{var strCookieName = strDocumentId + strName;
return PostbackBody.ReadCookie(strCookieName);}
PostbackBody.DeleteDocumentCookie = function(strDocumentId, strName)
{var strCookieName = strDocumentId + strName;
PostbackBody.DeleteCookie(strCookieName, null);}
PostbackBody.CreateCookie = function(strName, strValue, strDomain, strPath, boolSecure)
{var strNameValuePart = strName + "=" + encodeURIComponent(strValue) + ";";
var strDomainPart = (strDomain == null) ?  "" : "domain=" + strDomain + ";";
var strPathPart = (strPath == null) ?  "" : "path=" + strPath + ";";
var strSecurePart = (boolSecure == false) ?  "" : "secure;";
document.cookie = strNameValuePart + strDomainPart + strPathPart + strSecurePart;}
PostbackBody.ReadCookie = function(strName)
{var strCookieName = strName + "=";
var arrCookies = document.cookie.split(';');
for(var i = 0; i < arrCookies.length; i++)
{var strCookie = arrCookies[i];
var iIndex = strCookie.charAt(0) == ' ' ? 1 : 0;
if (strCookie.indexOf(strCookieName) == iIndex)
{return decodeURIComponent(strCookie.substring(strCookieName.length + iIndex, strCookie.length));}}
return null;}
PostbackBody.DeleteCookie = function(strName, strPath)
{var dateExpires = new Date();
dateExpires.setTime(dateExpires.getTime() -86400000);
var strExpiresPart = "expires=" + dateExpires.toGMTString() + ";";
var strPathPart = (strPath == null) ?  "" : "path=" + strPath + ";";
document.cookie = strName + "=;" + strExpiresPart + strPathPart;}
PostbackBody.IsPostingBack = function()
{return PostbackBody.intPostbacksInProgress > 0 || Dialog.DialogPresent();}
function PostbackBody_HideWaitUI()
{var objWaitUI = document.getElementById('_InfoPath_WaitUI');
if (objWaitUI != null)
{objWaitUI.style.display='none';
objWaitUI.innerHTML = '';}}
function Window() {};
Window._OriginalOnResize = null;
Window.AttachEventHandlers = function(
objWindow)
{if (UserAgentInfo.strBrowser == 3)
{objWindow.addEventListener("resize", Window.OnResize, false );}
else
{Window._OriginalOnResize = objWindow.onresize;
objWindow.onresize = new Function("Window.OnResize(event);");}}
Window.OnResize = function(
objEvent)
{if (Window._OriginalOnResize != null)
{Window._OriginalOnResize();}
if (UserMessages.boolDocumentClosed || !CurrentFormData.ViewTreesAreMerged())
{return;}
ErrorVisualization.UpdateAllAsterisks();}
function IFrameUtils() {};
IFrameUtils.InsertIframe = IFrameUtils_InsertIframe;
function IFrameUtils_InsertIframe(objSibling, strIframeId, boolAfter, strZIndex)
{var objIframe = IFrameUtils.BuildIFrame(strIframeId, strZIndex);
if (objSibling == null)
{document.body.appendChild(objIframe);
return objIframe;}
var objParent = objSibling.parentNode;
;
if (objParent == null)
{return null;}
if ((boolAfter && objSibling.nextSibling == objIframe) ||
(!boolAfter && objSibling.previousSibling == objIframe))
{}
else if (objSibling.nextSibling != null)
{objParent.insertBefore(objIframe, boolAfter? objSibling.nextSibling : objSibling);}
else
{objParent.appendChild(objIframe);}
return objIframe;}
IFrameUtils.BuildIFrame = IFrameUtils_BuildIFrame;
function IFrameUtils_BuildIFrame(strHoverId, strZIndex)
{var objIframe = document.getElementById(strHoverId);
if (objIframe == null)
{var iframeURL = "";
var objDiv = document.createElement("div");
;
if (objDiv == null)
{return null;}
try
{if (document.location.protocol == "https:")
{iframeURL = document.location.protocol + "//" + document.location.host + "/_layouts/FormResource.aspx?iframe=Yes";}}
catch (ex)
{}
objDiv.innerHTML = "<iframe tabindex='-1' id='" + strHoverId + "' style='display:none;left:0px;top:0px;position:absolute;' src='" + iframeURL
+ "' frameborder='0' scrolling='no' ></iframe>";
objIframe = objDiv.firstChild;
;
if (objIframe == null)
{return null;}}
if (strZIndex != "Default")
{objIframe.style.zIndex = strZIndex;}
return objIframe;}
IFrameUtils.PlaceIFrameBehindControl = IFrameUtils_PlaceIFrameBehindControl;
function IFrameUtils_PlaceIFrameBehindControl(
objControl,
objIFrame)
{if (objIFrame != null)
{objIFrame.style.top = objControl.style.top;
objIFrame.style.width = objControl.offsetWidth;
objIFrame.style.height = objControl.offsetHeight;
objIFrame.style.direction = (objControl.style.direction.toLowerCase() == "rtl") ? "rtl" : "ltr";
objIFrame.style.left = objControl.style.left;
objIFrame.style.right = objControl.style.right;
objIFrame.style.display = "inline";}}
IFrameUtils.HideIFrame = IFrameUtils_HideIFrame;
function IFrameUtils_HideIFrame(strIFrameId)
{var objIFrame = document.getElementById(strIFrameId);
if (objIFrame != null)
{objIFrame.style.display = "none";
objIFrame.style.top = 0;
objIFrame.style.left = 0;
objIFrame.style.right = 0;
objIFrame.style.width = 0;
objIFrame.style.height = 0;}}
function RichClientDetector() {};
RichClientDetector.OpenInInfoPath = function(strXmlUrl, strXsnUrl, strSaveUrl)
{var boolOpenedInInfoPath = false;
var infoPathLoader = null;
try
{infoPathLoader = new ActiveXObject('SharePoint.OpenXMLDocuments');}
catch (ex)
{}
if (infoPathLoader != null)
{if (strXmlUrl == null || strXmlUrl.length == 0)
{boolOpenedInInfoPath = infoPathLoader.CreateNewDocument(strXsnUrl, strSaveUrl);}
else
{boolOpenedInInfoPath = infoPathLoader.EditDocument(strXmlUrl, "InfoPath.Document");}}
if (boolOpenedInInfoPath)
{Dialog.ShowFinalMessage(IntlCoreStrings.k_strOpenedInInfoPath, true );}
else
{var objDetectInfoPath = document.getElementById("DetectInfoPath");
if (objDetectInfoPath != null)
{objDetectInfoPath.value = "1";
if (funcFullPagePostBack != null)
{funcFullPagePostBack();}}}}
function Print() {}
Print.Show = function()
{if ((EventLog.Count() > 1) && (document.forms[0] != null))
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strPrintPromptForRefresh, true);
EventLog_Add(
19,
null,
"",
"",
"",
true ,
false ,
false ,
13,
0);}
else
{Print.OpenWindow();}}
Print.OpenWindow = function()
{;
var windowName = "PrintWindow" + CurrentFormData.EditingSessionId();
var windowName2;
while ((windowName2 = windowName.replace(/[-+=\/]/, "_")) != windowName)
{windowName = windowName2;}
Print._lastPrintWindow = window.open(
CurrentFormData.SiteUrl() + "/_layouts/PrintLoader.FormServer.aspx",
windowName,
"menubar=1,resizable=1,scrollbars=1,status=1,toolbar=1,location=0",
true);
if (Print._lastPrintWindow == null)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strPromptOpenWindowFailed, true);}
else
{if (Print._lastPrintWindowTimer == null)
{Print._lastPrintWindowTimer = window.setTimeout(Print.PrintCallback, 25);}}}
Print._lastPrintWindow = null;
Print._lastPrintWindowTimer = null;
Print.PrintCallback = function()
{var eventLogElement;
var formElement;
window.clearTimeout(Print._lastPrintWindowTimer);
Print._lastPrintWindowTimer = null;
if (Print._lastPrintWindow == null)
{;
return;}
if (
((eventLogElement = Print._lastPrintWindow.document.getElementById("__EventLog")) == null) ||
((formElement = Print._lastPrintWindow.document.getElementById("PrintLoaderForm")) == null) ||
(-1 == Print._lastPrintWindow.document.URL.indexOf("/_layouts/PrintLoader.FormServer.aspx")))
{Print._lastPrintWindowTimer = window.setTimeout(Print.PrintCallback, 25);
return;}
EventLog_EnsureEventLogStartEntry();
var eventLog = EventLog.Value();
eventLogElement.value = eventLog;
formElement.submit();
Print._lastPrintWindow.focus();
Print._lastPrintWindow = null;}
function Print_IsPrintWindow()
{var name = window.name;
return ((name != null && name.length >= 11  && name.substring(0, 11) == "PrintWindow") ||
(View.GetTemplateType() == 1));}
function IP_DebugComplexity() {}
IP_DebugComplexity.CountElements = IP_DebugComplexity_CountElements;
function IP_DebugComplexity_CountElements()
{return IP_DebugComplexity._CountOverDOM(function(objNode){return true;});}
IP_DebugComplexity.CountIPControls = IP_DebugComplexity_CountIPControls;
function IP_DebugComplexity_CountIPControls()
{return IP_DebugComplexity._CountOverDOM(function(objNode){return BaseControl.IsInfoPathControl(objNode);});}
IP_DebugComplexity.CountVDTSize = IP_DebugComplexity_CountVDTSize;
function IP_DebugComplexity_CountVDTSize()
{return IP_DebugComplexity._CountOverVDT(function(objViewDataNode){return true;});}
IP_DebugComplexity.CountVDTHiddenSize = IP_DebugComplexity_CountVDTHiddenSize;
function IP_DebugComplexity_CountVDTHiddenSize()
{return IP_DebugComplexity._CountOverVDT(function(objViewDataNode){return ViewDataNode.IsHidden(objViewDataNode);});}
IP_DebugComplexity.ComposeSummary = IP_DebugComplexity_ComposeSummary
function IP_DebugComplexity_ComposeSummary()
{var summary = "";
summary += "Site: " + CurrentFormData.SiteUrl() + "\n";
summary += "Web: " + CurrentFormData.GetWebUrl() + "\n\n";
summary += "Complexity Summary:\n";
summary += "View Data Tree Nodes: " + IP_DebugComplexity.CountVDTSize() + " (" + IP_DebugComplexity.CountVDTHiddenSize() + " hidden)\n";
summary += "HTML InfoPath Controls: " + IP_DebugComplexity.CountIPControls() + "\n";
summary += "Total HTML Elements: " + IP_DebugComplexity.CountElements() + "\n";
return summary;}
IP_DebugComplexity._CountOverDOM = IP_DebugComplexity__CountOverDOM;
function IP_DebugComplexity__CountOverDOM(fnAddToCount)
{return IP_DebugComplexity._CountOverDOMRecurs(document.body, fnAddToCount);}
IP_DebugComplexity._CountOverDOMRecurs =
function IP_DebugComplexity__CountOverDOMRecurs(objNode, fnAddToCount)
{if (objNode == null)
{return 0;}
var count = (fnAddToCount(objNode)) ? 1 : 0;
for (var nIndex = 0; nIndex < objNode.childNodes.length; nIndex++)
{count += IP_DebugComplexity._CountOverDOMRecurs(objNode.childNodes[nIndex], fnAddToCount);}
return count;}
IP_DebugComplexity._CountOverVDT = IP_DebugComplexity__CountOverVDT;
function IP_DebugComplexity__CountOverVDT(fnAddToCount)
{return IP_DebugComplexity._CountOverVDTRecurs(CurrentFormData.ViewDataTree(), fnAddToCount);}
IP_DebugComplexity._CountOverVDTRecurs =
function IP_DebugComplexity__CountOverVDTRecurs(objViewDataNode, fnAddToCount)
{if (objViewDataNode == null)
{return 0;}
var count = (fnAddToCount(objViewDataNode)) ? 1 : 0;
var arrChildViewDataNodes = ViewDataNode.GetChildNodes(objViewDataNode);
for (var nIndex = 0; nIndex < arrChildViewDataNodes.length; nIndex++)
{count += IP_DebugComplexity._CountOverVDTRecurs(arrChildViewDataNodes[nIndex], fnAddToCount);}
return count;}
function encodeScriptQuote(str)
{var strOut = "";
var ix = 0;
for (ix = 0; ix < str.length; ix++)
{var ch = str.charAt(ix);
if (ch == '\'')
strOut += "%27";
else
strOut += ch;}
return strOut;}
function STSHtmlEncode(str)
{var strOut = "";
var ix = 0;
for (ix = 0; ix < str.length; ix++)
{var ch = str.charAt(ix);
switch (ch)
{case '<':
strOut += "&lt;";
break;
case '>':
strOut += "&gt;";
break;
case '&':
strOut += "&amp;";
break;
case '\"':
strOut += "&quot;";
break;
case '\'':
strOut += "&#39;";
break;
default:
strOut += ch;
break;}}
return strOut;}
function StAttrQuote(st)
{st = st.toString();
st = st.replace(/&/g, '&amp;');
st = st.replace(/\"/g, '&quot;'); // "
st = st.replace(/\r/g, '&#13;');
return '"' + st + '"';}
function STSScriptEncode(str)
{var strOut = "";
var ix = 0;
for (ix = 0; ix < str.length; ix++)
{var charCode = str.charCodeAt(ix);
if (charCode > 0x0fff)
{strOut += ("\\u" + charCode.toString(16).toUpperCase());}
else if (charCode > 0x00ff)
{strOut += ("\\u0" + charCode.toString(16).toUpperCase());}
else if (charCode > 0x007f)
{strOut += ("\\u00" + charCode.toString(16).toUpperCase());}
else
{switch (str.charAt(ix))
{case '\n':
strOut += "\\n";
break;
case '\r':
strOut += "\\r";
break;
case '\"':
strOut += "\\u0022";
break;
case '%':
strOut += "\\u0025";
break;
case '&':
strOut += "\\u0026";
break;
case '\'':
strOut += "\\u0027";
break;
case '(':
strOut += "\\u0028";
break;
case ')':
strOut += "\\u0029";
break;
case '+':
strOut += "\\u002b";
break;
case '/':
strOut += "\\u002f";
break;
case '<':
strOut += "\\u003c";
break;
case '>':
strOut += "\\u003e";
break;
case '\\':
strOut += "\\\\";
break;
default:
strOut += str.charAt(ix);};}}
return strOut;}
function STSScriptEncodeWithQuote(str)
{return '"' + STSScriptEncode(str) + '"';}
LoadedScriptFiles.boolCoreLoaded = true;
function BaseControl()
{}
BaseControl._arrFunctionCache = new Array();
BaseControl.boolFireRule = false;
BaseControl._objDoubleFormatting = new DoubleFormatting();
BaseControl._objDateFormatting = new DateFormatting();
BaseControl._objNoFormatting = new NoFormatting();
BaseControl.GetValueFromControl = function(objControl)
{return null;}
BaseControl.SetValueOfControl = function(
objControl,
strValue)
{}
BaseControl.RefreshControlData = function(
objControl)
{}
BaseControl.OnBeforeDialog = function(objControl)
{}
BaseControl.OnAfterDialog = function(objControl)
{}
BaseControl.GetFormatting = function(
objViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
;
var objFormattingInfo = LeafControl.GetFormatting(objSnippetElement);
var objFormatting = objFormattingInfo[0];
objFormatting.Reinit(objFormattingInfo[1]);
return objFormatting;}
BaseControl.k_strDirection = new Array();
BaseControl.k_strDirection[0] = "inherit";
BaseControl.k_strDirection[1] = "ltr";
BaseControl.k_strDirection[2] = "rtl";
BaseControl.OnClick = BaseControl_OnClick;
function BaseControl_OnClick(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{SelectionService.Select(objControl);
return;}
if (IP_DatePicker.Close != null)
{IP_DatePicker.Close();}
SelectionService.Select(objControl);
Util.StopEventProprogation(objEvent);
return false;}
BaseControl.OnChange = BaseControl_OnChange;
function BaseControl_OnChange(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
if (objControl.getAttribute("serverProcessed") == "true")
{objControl.setAttribute("serverProcessed", "false");}
var viewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (!ViewDataNode.IsDisabled(viewDataNode))
{(viewDataNode._boolFireRule = true);}}
BaseControl.RequiresImplicitRoundTrip = function(objSnippetElement)
{var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
return enumRoundTripModel == 1;}
BaseControl.OnMouseOver = BaseControl_OnMouseOver;
function BaseControl_OnMouseOver(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
SelectionService.Highlight(objControl, false , !LeafControl.IsLeafControl(objControl) );
if (!LeafControl.IsLeafControl(objControl))
{Util.StopEventProprogation(objEvent);}
return false;}
BaseControl.OnMouseOut = BaseControl_OnMouseOut;
function BaseControl_OnMouseOut(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
SelectionService.RemoveHighlight(objControl, false );
if (!LeafControl.IsLeafControl(objControl))
{Util.StopEventProprogation(objEvent);}
return false;}
BaseControl.OnMouseDown = BaseControl_OnMouseDown;
function BaseControl_OnMouseDown(
objControl,
objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}}
BaseControl.OnMouseUp = BaseControl_OnMouseUp;
function BaseControl_OnMouseUp(
objControl,
objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}}
BaseControl.OnAfterCreate = function(objViewDataNode)
{;
;}
BaseControl.OnFocus = BaseControl_OnFocus;
function BaseControl_OnFocus(objControl, objEvent)
{;
if (!BaseControl.CanHandleEvents())
{SelectionService.Select(objControl);
SelectionService.RememberFocus(objControl, objEvent);
Util.StopEventProprogation(objEvent);
return false;}
SelectionService.Select(objControl);
SelectionService.RememberFocus(objControl, objEvent);
if (IP_DatePicker.Close != null)
{IP_DatePicker.Close();}
Util.StopEventProprogation(objEvent);
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (!BaseControl.IsInFocusableState(objViewDataNode))
{if (objControl.tagName == "SELECT")
{var objNextViewDataNode = ViewDataNode.FindNext(objViewDataNode);
if (objNextViewDataNode != null)
{var objNextHtmlControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objNextViewDataNode);
if (objNextHtmlControl != null)
{objNextHtmlControl.focus();}}}}
return false;}
BaseControl.IsFocusable = BaseControl_IsFocusable;
function BaseControl_IsFocusable()
{return false;}
BaseControl.IsInFocusableState = BaseControl_IsInFocusableState;
function BaseControl_IsInFocusableState(objViewDataNode)
{return !ViewDataNode.IsHidden(objViewDataNode) && !ViewDataNode.IsDisabled(objViewDataNode);}
BaseControl.OnKeyPress = BaseControl_OnKeyPress;
function BaseControl_OnKeyPress(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return true;}
var viewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (!ViewDataNode.IsDisabled(viewDataNode))
{(viewDataNode._boolFireRule = true);}
return true;}
BaseControl.OnBlur = BaseControl_OnBlur;
function BaseControl_OnBlur(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
;
if (PostbackBody.IsPostingBack())
{return;}
SelectionService.Select(null);
Util.StopEventProprogation(objEvent);
return false;}
BaseControl.IsSelected = function(objControl)
{return SelectionService.IsSelected(objControl);}
BaseControl.Select = BaseControl_Select;
function BaseControl_Select(objControl)
{SelectionService.Highlight(objControl, true , false );
var objParentControl = BaseControl.GetParentInfoPathControl(objControl);
if (objControl.getAttribute("scriptclass") == "RichTextBox")
{var objContainerControl = BaseControl.GetParentInfoPathControl(objControl);
var objCollectionControl = BaseControl.GetParentInfoPathControl(objContainerControl);
var objParentControl = BaseControl.GetParentInfoPathControl(objCollectionControl);}
if (objControl.getAttribute("scriptclass") != "Container")
{if (objParentControl != null)
{SelectionService.Highlight(objParentControl, true , true );}}}
BaseControl.UnSelect = BaseControl_UnSelect;
function BaseControl_UnSelect(objControl)
{SelectionService.RemoveHighlight(objControl, true );
if (objControl.getAttribute("scriptclass") != "Container")
{var objParentControl = BaseControl.GetParentInfoPathControl(objControl);
if (objParentControl != null)
{SelectionService.RemoveHighlight(objParentControl, true );}}}
BaseControl.RefreshVisualState = BaseControl_RefreshVisualSate;
function BaseControl_RefreshVisualSate(objControl)
{var intCssClassType;
var boolHasEditingActions = true;
;
if (objControl.getAttribute("scriptclass") == "Container")
{var strHasEditingActionsAttrib = "HasEditingActions";
var strHasEditingActions = objControl.getAttribute(strHasEditingActionsAttrib);
if (strHasEditingActions == null)
{boolHasEditingActions = (HoverMenu.GenerateMenuHtml(objControl) != "");
objControl.setAttribute(strHasEditingActionsAttrib, boolHasEditingActions ? "true" : "false");}
else
{boolHasEditingActions = (strHasEditingActions == "true");}}
if (!boolHasEditingActions)
{intCssClassType = 0;}
else
{var intHighlightState = SelectionService.GetHighlightState(objControl);
if (BaseControl.IsSelected(objControl))
{intCssClassType = 2;}
else if (SelectionService.IsIpInState(intHighlightState) || SelectionService.IsHoverInState(intHighlightState))
{intCssClassType = 1;}
else
{intCssClassType = 0;}}
if (LeafControl.IsLeafControl(objControl) && View.GetTemplateType() != 1)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (!ViewDataNode.IsHidden(objViewDataNode))
{if (BaseControl.IsValid(objViewDataNode))
{if (ErrorVisualization.SupportsAsterisk(objControl) && ErrorVisualization.IsAsteriskVisible(objControl))
{ErrorVisualization.HideAsterisk(objControl);}}
else
{if (ErrorVisualization.SupportsAsterisk(objControl))
{if (BaseControl.IsBlank(objViewDataNode))
{if (objViewDataNode._keyPressed !== true)
{ErrorVisualization.ShowAsterisk(objControl);}}
else
{if (ErrorVisualization.IsAsteriskVisible(objControl))
{ErrorVisualization.HideAsterisk(objControl);}
intCssClassType = 3;}}
else
{intCssClassType = 3;}}}}
BaseControl._ApplyCssClasses(objControl, intCssClassType);
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
if (Snippet.GetScriptClass(objSnippetElement) == "RichTextBox" && UserAgentInfo.strBrowser == 1)
{RichTextBox.MoveStyles(objControl);}}
BaseControl.RestoreFocus = BaseControl_RestoreFocus;
function BaseControl_RestoreFocus(objControl)
{;
BaseControl.Focus(objControl);}
BaseControl.Focus = function(objControl)
{SelectionService.Select(objControl);
try
{objControl.focus();}
catch(e)
{}}
BaseControl.Highlight = BaseControl_Highlight;
function BaseControl_Highlight(objControl, boolSticky)
{}
BaseControl.RemoveHighlight = BaseControl_RemoveHighlight;
function BaseControl_RemoveHighlight(objControl, boolSticky)
{}
BaseControl.IsValid = BaseControl_IsValid;
function BaseControl_IsValid(objViewDataNode)
{return ViewDataNode.IsValid(objViewDataNode);}
BaseControl.IsBlank = function(objViewDataNode)
{return ViewDataNode.IsBlank(objViewDataNode);}
BaseControl.GetDirection = function(objSnippetElement)
{var intDirection = 0;
if (g_objSnippetTree != objSnippetElement)
{intDirection = Snippet.GetContent(objSnippetElement)[10];}
if (intDirection == undefined || intDirection == 0)
{intDirection = View.GetDirection();}
return intDirection;}
function BaseControl_GetDirectionString(objSnippetElement)
{return BaseControl.k_strDirection[BaseControl.GetDirection(objSnippetElement)];}
function BaseControl_GetTextAlignment(objSnippetElement)
{var intDirection = BaseControl.GetDirection(objSnippetElement);
if (intDirection == 0)
{return "inherit";}
else if (intDirection == 2)
{return "right";}
else
{return "left";}}
BaseControl.GetContainerId = function(strControlId)
{return (strControlId.substr(0,strControlId.lastIndexOf("_")));}
BaseControl.FindFirstFocusableChildControl = BaseControl_FindFirstFocusableChildControl;
function BaseControl_FindFirstFocusableChildControl(objControl)
{if (objControl == null)
{return null;}
if (BaseControl.IsInfoPathControl(objControl))
{var funIsFocusable = BaseControl.FindFunction(objControl, "IsFocusable", true);
if (funIsFocusable())
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (BaseControl.IsInFocusableState(objViewDataNode))
{return objControl;}}}
if (objControl.childNodes == null || objControl.childNodes.length == 0)
{return null;}
for (var i = 0; i < objControl.childNodes.length; i++)
{var objChild = BaseControl.FindFirstFocusableChildControl(objControl.childNodes[i]);
if (objChild != null)
{return objChild;}}
return null;}
BaseControl.FindFirstFocusableControl = BaseControl_FindFirstFocusableControl;
function BaseControl_FindFirstFocusableControl(objControl, objViewDataNode)
{if (objControl != null && Snippet.GetScriptClass(ViewDataNode_GetSnippetElement(objViewDataNode)) == "DatePickerButton")
{var objTextBox = IP_DatePicker.GetTextBoxControl(objControl);
if (objTextBox != null)
{objControl = objTextBox;
objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
;}}
var objOriginalViewDataNode = objViewDataNode;
var objCurrentViewDataNode = objViewDataNode;
var objCurrentControl = objControl;
var iRootNodeCounter = 0;
do
{if (objCurrentControl != null)
{var funIsFocusable = BaseControl.FindFunction(objCurrentControl, "IsFocusable", true);
if (funIsFocusable())
{if (BaseControl.IsInFocusableState(objCurrentViewDataNode))
{return objCurrentControl;}}}
objCurrentViewDataNode = ViewDataNode.FindNext(objCurrentViewDataNode);
if (objCurrentViewDataNode == null)
{objCurrentViewDataNode = CurrentFormData.ViewDataTree();}
if (ViewDataNode.GetParent(objCurrentViewDataNode) == null)
{iRootNodeCounter++;
if (iRootNodeCounter >= 2)
{return null;}}
objCurrentControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objCurrentViewDataNode);}
while (objCurrentViewDataNode != objOriginalViewDataNode);
return null;}
BaseControl.GetChildInfoPathControls = function(objContainerControl)
{var arrChildControls = new Array();
BaseControl._FindInfoPathChildControls(objContainerControl, arrChildControls);
return arrChildControls;}
BaseControl.GetParentInfoPathControl = function (objControl)
{var objCurrentControl = objControl.parentNode;
while (! (objCurrentControl == null ||
objCurrentControl.tagName == null ||
objCurrentControl.tagName.toLowerCase() == "body"))
{if (BaseControl.IsInfoPathControl(objCurrentControl))
{return objCurrentControl;}
objCurrentControl = objCurrentControl.parentNode;}
return null;}
BaseControl.GetPreviousSiblingInfoPathControl = function (objControl)
{var objParent = BaseControl.GetParentInfoPathControl(objControl);
var arrChildControls = BaseControl.GetChildInfoPathControls(objParent);
if (!BaseControl.IsInfoPathControl(objControl))
{;
return null;}
for (var i = 0; i < arrChildControls.length; i++)
{if (objControl == arrChildControls[i])
{if (i == 0)
{return null;}
else
{return arrChildControls[i-1];}}}
return null;}
BaseControl.GetNextSiblingInfoPathControl = function (objControl)
{var objParent = BaseControl.GetParentInfoPathControl(objControl);
var arrChildControls = BaseControl.GetChildInfoPathControls(objParent);
if (!BaseControl.IsInfoPathControl(objControl))
{;
return null;}
for (var i = 0; i < arrChildControls.length; i++)
{if (objControl == arrChildControls[i])
{if (i == arrChildControls.length - 1)
{return null;}
else
{return arrChildControls[i+1];}}}
return null;}
BaseControl._FindInfoPathChildControls = function(objControl, arrChildControls)
{var objChildNodes = objControl.childNodes;
for (var i = 0; i < objChildNodes.length; i++)
{var objCurrentControl = objChildNodes[i];
if (BaseControl.IsInfoPathControl(objCurrentControl))
{arrChildControls.push(objCurrentControl);}
else
{BaseControl._FindInfoPathChildControls(objCurrentControl, arrChildControls);}}}
BaseControl.IsInfoPathControl = BaseControl_IsInfoPathControl;
function BaseControl_IsInfoPathControl(objControl)
{var strScriptClass = null;
;
if (objControl != null && objControl.getAttribute != null)
{strScriptClass = objControl.getAttribute("ScriptClass");}
return Util.IsNonEmptyString(strScriptClass);}
BaseControl.FindFunctionOnSnippet = function(objSnippetElement, strFunctionName, boolAutoDelegate)
{var strScriptClass = Snippet.GetScriptClass(objSnippetElement);
return BaseControl._FindFunction(strScriptClass, strFunctionName, boolAutoDelegate);}
BaseControl.FindFunction = function(objControl, strFunctionName, boolAutoDelegate)
{if (objControl == null)
{return;}
var strScriptClass = objControl.getAttribute("ScriptClass");
return BaseControl._FindFunction(strScriptClass, strFunctionName, boolAutoDelegate);}
BaseControl._FindFunction = BaseControl_FindFunction;
function BaseControl_FindFunction(strScriptClass, strFunctionName, boolAutoDelegate)
{;
if (Util.IsNullOrEmptyString(strScriptClass))
{return;}
var strFunctionCall;
var objFunction;
var objResult;
strFunctionCall = strScriptClass + "." + strFunctionName;
var objFunction = BaseControl._arrFunctionCache[strFunctionCall];
if (objFunction == null)
{objFunction = eval(strFunctionCall)
if (objFunction != null)
{BaseControl._arrFunctionCache[strFunctionCall] = objFunction;}
else if (boolAutoDelegate)
{objFunction = BaseControl._FindFunction("BaseControl", strFunctionName, false );
if (objFunction != null)
{BaseControl._arrFunctionCache[strFunctionCall] = objFunction;}
else
{;}}
else
{;
objFunction = BaseControl.Noop;}}
return objFunction;}
BaseControl.Noop = function()
{}
BaseControl.FireOnAfterCreate = BaseControl_FireOnAfterCreate;
function BaseControl_FireOnAfterCreate(objViewDataNode)
{;
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var funcOnAfterCreate = BaseControl.FindFunctionOnSnippet(objSnippetElement, "OnAfterCreate", true );
funcOnAfterCreate(objViewDataNode);}
BaseControl.SetDisable = function(objControl, boolDisable)
{if (boolDisable)
{objControl.setAttribute("disabled", "disabled");}
else
{objControl.removeAttribute("disabled");}}
BaseControl.CanHandleEvents = BaseControl_CanHandleEvents;
function BaseControl_CanHandleEvents()
{return !Dialog.DialogPresent() &&
PostbackBody.intPostbacksInProgress == 0 &&
View.GetTemplateType() != 1;}
BaseControl.SetHidden = function(objViewDataNode, objControl, boolValue)
{};
BaseControl._ApplyCssClasses = function(objControl, intCssClassType)
{;
;
var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
BaseControl._SetCssClasses(
objControl,
Snippet.GetCssClasses(objSnippetElement),
intCssClassType,
objViewDataNode);
if (objControl.getAttribute("wrapped") == "true")
{;
var objWrapper = LeafControl.GetWrappingSpan(objControl);
BaseControl._SetCssClasses(
objWrapper,
(Snippet.GetContent(objSnippetElement)[5]),
intCssClassType,
objViewDataNode);}
var disableFunction = BaseControl.FindFunction(objControl, "SetDisable", true);
disableFunction(objControl, ViewDataNode.IsDisabled(objViewDataNode));
if (ViewDataNode.IsHidden(objViewDataNode))
{if (objViewDataNode.backUpDisplay == null && objControl.style.display == "none")
{objViewDataNode.backUpDisplay = objControl.style.display;}
objControl.style.display = "none";}
else
{if (objControl.style.display == "none")
{if (objViewDataNode.backUpDisplay == null || objViewDataNode.backUpDisplay == "none")
{objControl.style.display = "";
objViewDataNode.backUpDisplay = null;}
else
{objControl.style.display = objViewDataNode.backUpDisplay;}}}}
BaseControl._SetCssClasses = function(objControl, arrCssClasses, intCssClassType, objViewDataNode)
{var strCssClasses = BaseControl_ComputeCssClasses(objViewDataNode, arrCssClasses, intCssClassType, true );
if (objControl.className != strCssClasses)
{objControl.className = strCssClasses;
;}}
BaseControl.RenderTemplateItem = BaseControl_RenderTemplateItem;
function BaseControl_RenderTemplateItem(
objValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var boolRenderResult = false;
switch (Util.GetDataType(objValue))
{case (2):
{arrHtmlToInsertBuilder.push(objValue);
boolRenderResult = true;
break;}
case (1):
{var funcResolveSpecialValue = BaseControl.FindFunctionOnSnippet(objSnippetElement, "ResolveSpecialValue");
var objResult = funcResolveSpecialValue(
objValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId
);
;
if (objResult != null)
{;
arrHtmlToInsertBuilder.push(objResult);}
boolRenderResult = true;
break;}
case (3):
{;
;
var funcResolveSpecialValue = BaseControl.FindFunctionOnSnippet(objSnippetElement, "ResolveSpecialValue");
var objCondition = funcResolveSpecialValue(
objValue[0],
objViewDataNode,
objSnippetElement,
strParentHtmlId
);
if (objCondition != null)
{for (var nCurrentConditionalTemplate = 1; nCurrentConditionalTemplate < objValue.length;  nCurrentConditionalTemplate++)
{var boolRendendered = BaseControl.RenderTemplateItem(
objValue[nCurrentConditionalTemplate],
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder);
;}}
boolRenderResult = true;
break;}}
return boolRenderResult;}
function BaseControl_ComputeCssClasses(objViewDataNode, arrCssClasses, intCssClassType, fConditionalFormatting)
{var strCssClasses = new Array();
var boolDisabled = ViewDataNode.IsDisabled(objViewDataNode);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
for (var i = 0; i <= intCssClassType; i++)
{if (i == 1 && !Snippet.ShowHoverState(objSnippetElement))
{continue;}
if (i == 2 && !Snippet.ShowSelectionState(objSnippetElement))
{continue;}
if ((i == 1 || i == 2) && boolDisabled)
{continue;}
strCssClasses.push(arrCssClasses[i] + " ");}
if (fConditionalFormatting)
{var nConditionIndex = ViewDataNode.GetCondition(objViewDataNode);
if (nConditionIndex != null && nConditionIndex >= 0)
{var arrCFCssClasses = arrCssClasses[4].split(" ");
if (arrCFCssClasses != null)
{strCssClasses.push(arrCFCssClasses[nConditionIndex]);}}}
return strCssClasses.join("");}
BaseControl.ResolveSpecialValue = BaseControl_ResolveSpecialValue;
function BaseControl_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{;
;
;
;
var objResult = null;
switch (nSpecialValue)
{case 1:
{objResult = '"' + strParentHtmlId + '"';
break;}
case 2:
{var arrCssClasses = Snippet.GetCssClasses(objSnippetElement);
objResult = '"' + arrCssClasses[0] + '"';
break;}
case 3:
{objResult = '"' + Snippet.GetScriptClass(objSnippetElement) + '"';
break;}
case 4:
{objResult = g_arrViewDataHtmlMap.push(objViewDataNode);
objResult--;
objResult = '"' + objResult + '"';
break;}
case 100:
{objResult = BaseControl_GetDirectionString(objSnippetElement);
break;}
case 101:
{objResult = BaseControl_GetTextAlignment(objSnippetElement);
break;}
case 102:
{objResult = strParentHtmlId;
break;}}
return objResult;};
function BaseControl_GetHtmlValue(objViewDataNode, funcGetFormatting)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
var strCurrentValue = objDatum.GetValue();
var strNewValue = null;
if (IsValueValidForDatumBaseType(objDatum, strCurrentValue))
{var objFormatting = funcGetFormatting(objViewDataNode);
strNewValue = objFormatting.Format(strCurrentValue);}
else
{strNewValue = strCurrentValue;}
return strNewValue;}
function LeafControl()
{};
LeafControl.objQuoteRE = new RegExp("\"", "g");
LeafControl.objLessThanRE = new RegExp("<", "g");
LeafControl.ResolveSpecialValue = LeafControl_ResolveSpecialValue;
function LeafControl_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{;
;
;
;
var objResult = BaseControl.ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId);
if (objResult == null)
{switch (nSpecialValue)
{case (5):
{objResult = (Snippet.GetContent(objSnippetElement)[2]);
break;}
case (6):
{objResult = (Snippet.GetContent(objSnippetElement)[1]);
break;}
case (7):
{objResult = (Snippet.GetContent(objSnippetElement)[0]);
break;}
case (8):
{var arrCssClasses = (Snippet.GetContent(objSnippetElement)[5]);
objResult = arrCssClasses[0];
break;}}
if (objResult != null)
{objResult = StAttrQuote(objResult);}}
return objResult;};
LeafControl.GetFormatting = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[4];}
LeafControl.IsSigned = function(objViewDataNode)
{return ViewDataNode.GetContent(objViewDataNode)[5];}
LeafControl.Render = LeafControl_Render;
function LeafControl_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate)
{;
;
;
;
;
var strHtmlId = ViewDataNode.GetHtmlId(objViewDataNode);
if (typeof(strHtmlId) == "undefined")
{strHtmlId = strParentHtmlId + "_" + Snippet.GetClientId(objSnippetElement)
ViewDataNode.SetHtmlId(objViewDataNode, strHtmlId);}
;
;
;
for (var nCurrentTemplateFragment = 0; nCurrentTemplateFragment < arrTemplate.length; nCurrentTemplateFragment++)
{var boolRendered = BaseControl.RenderTemplateItem(
arrTemplate[nCurrentTemplateFragment],
objViewDataNode,
objSnippetElement,
strHtmlId,
arrHtmlToInsertBuilder);
;}}
function LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement)
{var strHtmlId = ViewDataNode.GetHtmlId(objViewDataNode);
if (typeof(strHtmlId) == "undefined")
{strHtmlId = strParentHtmlId + "_" + Snippet.GetClientId(objSnippetElement);
ViewDataNode.SetHtmlId(objViewDataNode, strHtmlId);}
return strHtmlId;}
function LeafControl_ComputeRenderStyle(objViewDataNode, arrCssClasses, boolSupportsAsterisk)
{if (ViewDataNode.IsValid(objViewDataNode) || (View.GetTemplateType() == 1))
{return BaseControl_ComputeCssClasses(objViewDataNode, arrCssClasses, 0, true );}
else
{if (boolSupportsAsterisk && ViewDataNode.IsBlank(objViewDataNode))
{return BaseControl_ComputeCssClasses(objViewDataNode, arrCssClasses, 0, true );}
else
{return BaseControl_ComputeCssClasses(objViewDataNode, arrCssClasses, 3, true );}}}
function LeafControl_RenderBeginWrappingSpan(
strHtmlId,
objViewDataNode,
objSnippetElement,
arrHtmlToInsertBuilder)
{var boolHasWrappingSpan = Snippet.ControlHasWrappingSpan(objSnippetElement);
if (boolHasWrappingSpan)
{arrHtmlToInsertBuilder.push("<span ");
arrHtmlToInsertBuilder.push("onMouseOver=\"return LeafControl.OnWrappingSpanMouseOver(this, event);\" onMouseOut=\"return LeafControl.OnWrappingSpanMouseOut(this, event);\"");
var arrCssClasses = (Snippet.GetContent(objSnippetElement)[5]);
if (arrCssClasses != null && !ViewDataNode.IsHidden(objViewDataNode))
{LeafControl_OutputAttribute(" class", LeafControl_ComputeRenderStyle(objViewDataNode, arrCssClasses, Snippet.SupportsAsterisk(objSnippetElement)), arrHtmlToInsertBuilder);}
arrHtmlToInsertBuilder.push(">");
if (Snippet.SupportsAsterisk(objSnippetElement))
{arrHtmlToInsertBuilder.push("<span id=\"");
arrHtmlToInsertBuilder.push(strHtmlId);
arrHtmlToInsertBuilder.push("_" + "Asterisk" + "\"></span>");}
if (Snippet.SupportsErrorTip(objSnippetElement))
{arrHtmlToInsertBuilder.push("<span id=\"");
arrHtmlToInsertBuilder.push(strHtmlId);
arrHtmlToInsertBuilder.push("_" + "ErrorTip" + "\"></span>");}
if (Snippet.SupportsSignIcon(objSnippetElement))
{arrHtmlToInsertBuilder.push("<span id=\"");
arrHtmlToInsertBuilder.push(strHtmlId);
arrHtmlToInsertBuilder.push("_" + "SignIcon" + "\"></span>");}}
return boolHasWrappingSpan;}
function LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder)
{arrHtmlToInsertBuilder.push("</span>");}
function LeafControl_OutputAttribute(
strAttributeName,
strValue,
arrHtmlToInsertBuilder)
{var strAttributeValue = StAttrQuote(strValue);
arrHtmlToInsertBuilder.push(strAttributeName);
arrHtmlToInsertBuilder.push("=");
arrHtmlToInsertBuilder.push(strAttributeValue);}
function LeafControl_EncodeAttributeValue(strValue)
{var strEncoded = StAttrQuote(strValue);
;
return strEncoded.substring(1, strEncoded.length - 2);}
function LeafControl_OutputConditionalAttribute(
strAttributeName,
strValue,
arrHtmlToInsertBuilder)
{if (strValue != null)
{LeafControl_OutputAttribute(strAttributeName, strValue, arrHtmlToInsertBuilder);}}
function LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
boolAllowDisabling,
outputAcessibilityAttributes,
arrHtmlToInsertBuilder)
{arrHtmlToInsertBuilder.push(" id=\"");
arrHtmlToInsertBuilder.push(strHtmlId);
arrHtmlToInsertBuilder.push("\" ScriptClass=\"");
arrHtmlToInsertBuilder.push(Snippet.GetScriptClass(objSnippetElement));
arrHtmlToInsertBuilder.push("\" class = \"");
arrHtmlToInsertBuilder.push(LeafControl_ComputeRenderStyle(objViewDataNode, Snippet.GetCssClasses(objSnippetElement), Snippet.SupportsAsterisk(objSnippetElement)));
if ((Snippet.GetContent(objSnippetElement)[5]) != null)
{arrHtmlToInsertBuilder.push("\" wrapped=\"true");}
var intDirection = BaseControl.GetDirection(objSnippetElement);
if (intDirection != 0)
{arrHtmlToInsertBuilder.push("\" direction=\"");
arrHtmlToInsertBuilder.push(BaseControl.k_strDirection[intDirection]);}
var nViewDataNodeIndex = g_arrViewDataHtmlMap.push(objViewDataNode);
nViewDataNodeIndex--;
arrHtmlToInsertBuilder.push("\" ViewDataNode = \"");
arrHtmlToInsertBuilder.push("" + nViewDataNodeIndex);
arrHtmlToInsertBuilder.push("\"");
if (boolAllowDisabling && ViewDataNode.IsDisabled(objViewDataNode))
{arrHtmlToInsertBuilder.push(" ");
arrHtmlToInsertBuilder.push("disabled");
arrHtmlToInsertBuilder.push("=\"true\"");}
if (outputAcessibilityAttributes)
{LeafControl_OutputConditionalAttribute(" accessKey", (Snippet.GetContent(objSnippetElement)[2]), arrHtmlToInsertBuilder);
LeafControl_OutputConditionalAttribute(" tabIndex", (Snippet.GetContent(objSnippetElement)[1]), arrHtmlToInsertBuilder);
LeafControl_OutputConditionalAttribute(" title", (Snippet.GetContent(objSnippetElement)[0]), arrHtmlToInsertBuilder);}}
LeafControl.GetWrappingSpan = LeafControl_GetWrappingSpan;
function LeafControl_GetWrappingSpan(objControl)
{;
;
;
return objControl.parentNode;}
LeafControl.GetMarginLeft = LeafControl_GetMarginLeft;
function LeafControl_GetMarginLeft(objControl)
{var intMargin = 0;
var objStyledNode;
if (objControl.getAttribute("wrapped") == "true")
{objStyledNode = LeafControl.GetWrappingSpan(objControl);}
else
{objStyledNode = objControl;}
if (objStyledNode.currentStyle != null)
{var intLength = LeafControl.ParseLength(objStyledNode.currentStyle.marginLeft);
if (intLength != null)
{intMargin = intLength;}}
return intMargin;}
LeafControl.GetMarginTop = LeafControl_GetMarginTop;
function LeafControl_GetMarginTop(objControl)
{var intMargin = 0;
var objStyledNode;
if (objControl.getAttribute("wrapped") == "true")
{objStyledNode = LeafControl.GetWrappingSpan(objControl);}
else
{objStyledNode = objControl;}
if (objStyledNode.currentStyle != null)
{var intLength = LeafControl.ParseLength(objStyledNode.currentStyle.marginTop);
if (intLength != null)
{intMargin = intLength;}}
return intMargin;}
LeafControl.GetBorderLeft = LeafControl_GetBorderLeft;
function LeafControl_GetBorderLeft(objControl)
{var intBorder = 0;
var objStyledNode;
if (objControl.getAttribute("wrapped") == "true")
{objStyledNode = LeafControl.GetWrappingSpan(objControl);}
else
{objStyledNode = objControl;}
if (objStyledNode.currentStyle != null)
{var intLength = LeafControl.ParseLength(objStyledNode.currentStyle.borderLeftWidth);
if (intLength != null)
{intBorder = intLength;}}
return intBorder;}
LeafControl.GetBorderTop = LeafControl_GetBorderTop;
function LeafControl_GetBorderTop(objControl)
{var intBorder = 0;
var objStyledNode;
if (objControl.getAttribute("wrapped") == "true")
{objStyledNode = LeafControl.GetWrappingSpan(objControl);}
else
{objStyledNode = objControl;}
if (objStyledNode.currentStyle != null)
{var intLength = LeafControl.ParseLength(objStyledNode.currentStyle.borderTopWidth);
if (intLength != null)
{intBorder = intLength;}}
return intBorder;}
LeafControl.ParseLength = LeafControl_ParseLength;
function LeafControl_ParseLength(strLength)
{var intLength = null;
var intIndex = strLength.indexOf("px");
if (intIndex > 0)
{intLength = 0 + Expr._StringToNumber(strLength.substring(0, intIndex));}
return intLength;}
LeafControl.IsLeafControl = LeafControl_IsLeafControl;
function LeafControl_IsLeafControl(
objControl)
{;
var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
return Snippet.GetSnippetType(objSnippetElement) == 3;}
LeafControl.Highlight = LeafControl_Highlight;
function LeafControl_Highlight(
objControl,
boolSticky)
{ErrorVisualization.ProcessHighlight(objControl, boolSticky);
BaseControl.Highlight(objControl, boolSticky);}
LeafControl.RemoveHighlight = LeafControl_RemoveHighlight;
function LeafControl_RemoveHighlight(
objControl,
boolSticky)
{ErrorVisualization.ProcessRemoveHighlight(objControl, boolSticky);
BaseControl.RemoveHighlight(objControl, boolSticky);}
LeafControl.OnChange = LeafControl_OnChange;
function LeafControl_OnChange(
objControl)
{if (ErrorVisualization.SupportsShortMessage(objControl)
&& ErrorVisualization.IsShortMessageVisible(objControl))
{ErrorVisualization.HideShortMessage(objControl);
ErrorVisualization.ShowShortMessage(objControl, false);}
BaseControl.OnChange(objControl);}
LeafControl.OnBeforeDialog = LeafControl_OnBeforeDialog;
function LeafControl_OnBeforeDialog(
objControl)
{;
ErrorVisualization.HideAllVisualizations(objControl);
BaseControl.OnBeforeDialog(objControl);
;}
LeafControl.OnAfterDialog = LeafControl_OnAfterDialog;
function LeafControl_OnAfterDialog(
objControl)
{BaseControl.RefreshVisualState(objControl);
BaseControl.OnAfterDialog(objControl);}
LeafControl.SetHidden = LeafControl_SetHidden;
function LeafControl_SetHidden(
objViewDataNode,
objControl,
boolVisible)
{BaseControl.RefreshVisualState(objControl);
if (boolVisible)
{ErrorVisualization.HideAllVisualizations(objControl);}
BaseControl.SetHidden(objViewDataNode, objControl, boolVisible);}
LeafControl.OnAfterCreate = BaseControl.OnAfterCreate;
LeafControl.OnClick = BaseControl.OnClick;
LeafControl.OnFocus = BaseControl.OnFocus;
LeafControl.OnBlur = BaseControl.OnBlur;
LeafControl.OnMouseUp = BaseControl.OnMouseUp;
LeafControl.OnMouseDown = BaseControl.OnMouseDown;
LeafControl.OnKeyPress = BaseControl.OnKeyPress;
LeafControl.IsValid = BaseControl.IsValid;
LeafControl.IsSelected = BaseControl.IsSelected;
LeafControl.Select = BaseControl.Select;
LeafControl.UnSelect = BaseControl.UnSelect;
LeafControl.RestoreFocus = BaseControl.RestoreFocus;
LeafControl.OnMouseOver = LeafControl_OnMouseOver;
function LeafControl_OnMouseOver(
objInput,
objEvent)
{var objControl;
if (BaseControl.IsInfoPathControl(objInput))
{objControl = objInput;}
else
{objControl = ErrorVisualization.FindInfoPathControl(objInput.parentNode.parentNode);}
if (objControl == null)
{;
return;}
BaseControl.OnMouseOver(objControl, objEvent);}
LeafControl.OnMouseOut = LeafControl_OnMouseOut;
function LeafControl_OnMouseOut(
objInput,
objEvent)
{var objControl;
if (BaseControl.IsInfoPathControl(objInput))
{objControl = objInput;}
else
{objControl = ErrorVisualization.FindInfoPathControl(objInput.parentNode.parentNode);}
if (objControl == null)
{;
return;}
BaseControl.OnMouseOut(objControl, objEvent);}
LeafControl.OnWrappingSpanMouseOver = LeafControl_OnWrappingSpanMouseOver;
function LeafControl_OnWrappingSpanMouseOver(
objInput,
objEvent)
{var objControl = ErrorVisualization.FindInfoPathControl(objInput);
;
if (objControl.disabled)
{var funcOnMouseOver = BaseControl.FindFunction(objControl, "OnMouseOver", true );
funcOnMouseOver(objControl, objEvent);
objEvent.cancelBubble = true;}}
LeafControl.OnWrappingSpanMouseOut = LeafControl_OnWrappingSpanMouseOut;
function LeafControl_OnWrappingSpanMouseOut(
objInput,
objEvent)
{var objControl = ErrorVisualization.FindInfoPathControl(objInput);
;
if (objControl.disabled)
{var funcOnMouseOut = BaseControl.FindFunction(objControl, "OnMouseOut", true );
funcOnMouseOut(objControl, objEvent);
objEvent.cancelBubble = true;}}
function HiddenCollection()
{}
HiddenCollection.GetFormatting = BaseControl.GetFormatting;
HiddenCollection.GetValueFromControl = function(objControl)
{return null;}
HiddenCollection.SetValueOfControl = function(
objControl,
strValue)
{}
HiddenCollection.SetDisable = function(objControl, boolDisable)
{}
HiddenCollection.OnAfterCreate = function(objViewDataNode)
{;
;}
HiddenCollection.RestoreFocus = HiddenCollection_RestoreFocus;
function HiddenCollection_RestoreFocus(objControl)
{}
HiddenCollection.Render = HiddenCollection_Render;
function HiddenCollection_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{}
HiddenCollection.OnClick = BaseControl.OnClick;
HiddenCollection.OnFocus = BaseControl.OnFocus;
HiddenCollection.OnMouseOver = BaseControl.OnMouseOver;
HiddenCollection.OnMouseOut = BaseControl.OnMouseOut;
HiddenCollection.OnMouseDown = BaseControl.OnMouseDown;
HiddenCollection.OnMouseUp = BaseControl.OnMouseUp;
HiddenCollection.OnKeyPress = BaseControl.OnKeyPress;
HiddenCollection.IsValid = BaseControl.IsValid;
HiddenCollection.OnBlur = BaseControl.OnBlur;
HiddenCollection.IsSelected = BaseControl.IsSelected;
HiddenCollection.Select = BaseControl.Select;
HiddenCollection.UnSelect = BaseControl.UnSelect;
function HiddenContainer()
{}
HiddenContainer.GetFormatting = BaseControl.GetFormatting;
HiddenContainer.GetValueFromControl = function(objControl)
{return null;}
HiddenContainer.SetValueOfControl = function(
objControl,
strValue)
{}
HiddenContainer.SetDisable = function(objControl, boolDisable)
{}
HiddenContainer.OnAfterCreate = function(objViewDataNode)
{;
;}
HiddenContainer.RestoreFocus = HiddenContainer_RestoreFocus;
function HiddenContainer_RestoreFocus(objControl)
{}
HiddenContainer.Render = HiddenContainer_Render;
function HiddenContainer_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{}
HiddenContainer.OnClick = BaseControl.OnClick;
HiddenContainer.OnFocus = BaseControl.OnFocus;
HiddenContainer.OnMouseOver = BaseControl.OnMouseOver;
HiddenContainer.OnMouseOut = BaseControl.OnMouseOut;
HiddenContainer.OnMouseDown = BaseControl.OnMouseDown;
HiddenContainer.OnMouseUp = BaseControl.OnMouseUp;
HiddenContainer.OnKeyPress = BaseControl.OnKeyPress;
HiddenContainer.IsValid = BaseControl.IsValid;
HiddenContainer.OnBlur = BaseControl.OnBlur;
HiddenContainer.IsSelected = BaseControl.IsSelected;
HiddenContainer.Select = BaseControl.Select;
HiddenContainer.UnSelect = BaseControl.UnSelect;
function HiddenLeaf()
{}
HiddenLeaf.GetFormatting = BaseControl.GetFormatting;
HiddenLeaf.GetValueFromControl = function(objControl)
{return null;}
HiddenLeaf.SetValueOfControl = function(
objControl,
strValue)
{}
HiddenLeaf.SetDisable = function(objControl, boolDisable)
{}
HiddenLeaf.OnAfterCreate = function(objViewDataNode)
{;
;}
HiddenLeaf.RestoreFocus = HiddenLeaf_RestoreFocus;
function HiddenLeaf_RestoreFocus(objControl)
{}
HiddenLeaf.Render = HiddenLeaf_Render;
function HiddenLeaf_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{}
HiddenLeaf.OnClick = BaseControl.OnClick;
HiddenLeaf.OnFocus = BaseControl.OnFocus;
HiddenLeaf.OnMouseOver = BaseControl.OnMouseOver;
HiddenLeaf.OnMouseOut = BaseControl.OnMouseOut;
HiddenLeaf.OnMouseDown = BaseControl.OnMouseDown;
HiddenLeaf.OnMouseUp = BaseControl.OnMouseUp;
HiddenLeaf.OnKeyPress = BaseControl.OnKeyPress;
HiddenLeaf.IsValid = BaseControl.IsValid;
HiddenLeaf.OnBlur = BaseControl.OnBlur;
HiddenLeaf.IsSelected = BaseControl.IsSelected;
HiddenLeaf.Select = BaseControl.Select;
HiddenLeaf.UnSelect = BaseControl.UnSelect;
HiddenLeaf.Highlight = LeafControl.Highlight;
HiddenLeaf.RemoveHighlight = LeafControl.RemoveHighlight;
function TextBox()
{}
TextBox.GetFormatting = BaseControl.GetFormatting;
TextBox.GetValueFromControl = function(objControl)
{return objControl.value;}
TextBox.SetValueOfControl = function(
objControl,
objValue)
{var strValue = Util.GetPlainTextFromValueObject(objValue);
objControl.value = strValue;}
TextBox.AddEventLogEntry = function(objControl, objViewDataNode)
{var objUnformatResult;
var objFormatting = TextBox.GetFormatting(objViewDataNode);
if (objFormatting.getFormattingType() != 0)
{objUnformatResult = objFormatting.Unformat(objControl.value);}
else
{objUnformatResult = Util.CreateObjUnformatResult(objControl.value, objControl.value, false);}
;
return EventLog_Add(
0,
objControl,
objControl.id,
objUnformatResult.boolRespectCSA ? "1" : "0",
objUnformatResult.strUnformattedValue,
false ,
false ,
false ,
0,
1);}
TextBox.SetDisable = function(objControl, boolDisable)
{if (boolDisable)
{objControl.setAttribute("readOnly", "true");}
else
{objControl.removeAttribute("readOnly");}}
function TextBox_NormalizeCRLF(strValue)
{var objCRLFInput = document.getElementById("__crlfnorm");
if (objCRLFInput == null)
{objCRLFInput = document.createElement("textarea");
objCRLFInput.id = "__crlfnorm";
objCRLFInput.style.display = "none";}
objCRLFInput.value = strValue;
return objCRLFInput.value;}
TextBox.OnChange = TextBox_OnChange;
function TextBox_OnChange(objControl, objEvent)
{var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objControl);
;
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
var strControlValue = objControl.value;
var boolValueChanged = false;
if (objDatum.GetValue() != ""
&& DataInformation.GetDataType(objDatum.GetDataInformation()).GetUnderlyingDatatype() != AssumedValidDatatype
&& (objDatum.IsValid() || objDatum.ValidateDataType()))
{if (objDatum.ModifiedOnClient())
{var objFormatting = TextBox.GetFormatting(objViewDataNode);
var strFormattedValue = objFormatting.Format(objDatum.GetValue());
if (strControlValue != strFormattedValue)
{boolValueChanged = true;}}
else
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
strFormattedValue = ViewDataNode.GetFormattedValue(objViewDataNode);
if (TextBox.IsMultiLine(objSnippetElement))
{strFormattedValue = TextBox_NormalizeCRLF(strFormattedValue);}
if (strControlValue != strFormattedValue || objViewDataNode._keyPressed)
{boolValueChanged = true;}}}
else
{if (strControlValue != objDatum.GetValue() || objViewDataNode._keyPressed)
{boolValueChanged = true;}}
if (boolValueChanged)
{TextBox._OnChange(objControl, objEvent);}}
TextBox._OnChange = TextBox__OnChange;
function TextBox__OnChange(objControl, objEvent)
{var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var strControlValue = objControl.value;
if (!Util_IsValidXmlString(strControlValue))
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strInvalidCharacterInText, true );
var strNewValue;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{strNewValue = BaseControl_GetHtmlValue(objViewDataNode, TextBox.GetFormatting);}
else
{strNewValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
objControl.value = strNewValue;
return;}
if (!TextBox.IsMultiLine(objSnippetElement))
{var objNonPrintableWhitespaceRE = new RegExp(
UserAgentInfo.strBrowser == 2 ? "[\\t\\n\\r\\f]" : "[\\t\\n\\r\\f\\v]", "g");
if (objNonPrintableWhitespaceRE.exec(strControlValue) != null)
{objControl.value = strControlValue.replace(objNonPrintableWhitespaceRE, " ");}}
TextBox._AdjustValue(objControl, objViewDataNode);
var boolDidntPostback = TextBox.AddEventLogEntry(objControl, objViewDataNode);
LeafControl.OnChange(objControl, objEvent);
if (boolDidntPostback)
{boolDidntPostback = ViewDataNode.OnControlChange(objControl);}}
TextBox.OnBlur = TextBox_OnBlur;
function TextBox_OnBlur(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
LeafControl.OnBlur(objControl, objEvent);
TextBox.OnChange(objControl, objEvent);
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (objViewDataNode._keyPressed === true)
{objViewDataNode._keyPressed = false;}}
TextBox._AdjustValue = function(objControl, objViewDataNode)
{var objFormatting	= TextBox.GetFormatting(objViewDataNode);
var strNewValue		= null;
if (objFormatting.getFormattingType() == 1)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
var	strControlValue = objControl.value;
var strCurrentValue = objDatum.GetValue();
if (strCurrentValue != strControlValue)
{var objDataInformation	= objDatum.GetDataInformation();
var objXsdDatatype		= DataInformation.GetDataType(objDataInformation).GetUnderlyingDatatype();
var strUnformattedValue	= objFormatting.Unformat(strControlValue).strUnformattedValue;
switch(objXsdDatatype)
{case DateTimeXsdDatatype:
if (!objFormatting.IsISO8601DateTimeString(strControlValue))
{strNewValue = TextBox._AdjustValueForDateTimeNode(objFormatting, strCurrentValue, strUnformattedValue);}
break;
case TimeXsdDatatype:
if (!Util.IsNullOrEmptyString(strCurrentValue))
{var objNewDateTime = objFormatting.UnformatIso8601(strUnformattedValue, objFormatting.k_intModeTime);
if ((objNewDateTime != null) && Util.IsNullOrEmptyString(objNewDateTime.strTZOffset))
{var objNodeDateTime = objFormatting.UnformatIso8601(strCurrentValue, objFormatting.k_intModeTime);
if (objNodeDateTime != null)
{TextBox._AddLocalTimezone(objNodeDateTime, objNewDateTime);
strNewValue = objFormatting.UnformatFromDateTime(objNewDateTime, objFormatting.k_intModeTime, strUnformattedValue);}}}
break;}}}
if (strNewValue != null)
{objControl.value = strNewValue;}}
TextBox._AdjustValueForDateTimeNode = function(
objFormatting,
strCurrentValue,
strUnformattedValue)
{var intDateFormatType = objFormatting.DateFormatType();
var intTimeFormatType = objFormatting.TimeFormatType();
var strNewValue = null;
if ((intDateFormatType != objFormatting.k_intDateFormatTypeNone) ||
(intTimeFormatType != objFormatting.k_intTimeFormatTypeNone))
{var objNodeDateTime = objFormatting.UnformatIso8601(strCurrentValue, objFormatting.k_intModeDateTime);
if (objNodeDateTime != null)
{var objNewDateTime = objFormatting.UnformatIso8601(strUnformattedValue, objFormatting.k_intModeDateTime);
if (objNewDateTime != null)
{objNodeDateTime = DateUtils.ConvertToLocalTime(objNodeDateTime);
if ((intDateFormatType != objFormatting.k_intDateFormatTypeNone) &&
(intTimeFormatType == objFormatting.k_intTimeFormatTypeNone))
{Util.MergeTimeIntoDateTime(objNodeDateTime, objNewDateTime);}
else if ((intDateFormatType == objFormatting.k_intDateFormatTypeNone) &&
(intTimeFormatType != objFormatting.k_intTimeFormatTypeNone))
{Util.MergeDateIntoDateTime(objNodeDateTime, objNewDateTime);}
TextBox._AddLocalTimezone(objNodeDateTime, objNewDateTime);
strNewValue = objFormatting.UnformatFromDateTime(objNewDateTime, objFormatting.k_intModeDateTime, strUnformattedValue);}}}
return strNewValue;}
TextBox._AddLocalTimezone = function(
objOldDateTime,
objNewDateTime)
{if (!Util.IsNullOrEmptyString(objNewDateTime.strTZOffset))
{return;}
if (!Util.IsNullOrEmptyString(objOldDateTime.strTZOffset))
{if (objOldDateTime.strTZOffset == "Z")
{objNewDateTime.strTZOffset = "Z";}
else
{objNewDateTime.strTZOffset = DateUtils.GetLocalTimeZoneOffsetString(objNewDateTime);}}}
TextBox.OnAfterCreate = function(objViewDataNode)
{;
;
if (!ViewDataNode.IsValid(objViewDataNode))
{if (ViewDataNode.IsBlank(objViewDataNode))
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{;
ErrorVisualization.ShowAsterisk(objControl);}}}}
TextBox.RestoreFocus = TextBox_RestoreFocus;
function TextBox_RestoreFocus(objControl)
{;
LeafControl.RestoreFocus(objControl);
if (document.selection && g_objCurrentFormDataSelection.boolTextSelected)
{objControl.select();}
else
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (BaseControl.IsInFocusableState(objViewDataNode))
{objControl.focus();}
if (Util.IsNullOrEmptyString(objControl.value))
{objControl.select();}}}
TextBox.IsMultiLine = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[0] == 1;}
TextBox.GetMaxLength = function(objSnippetElement)
{var strMaxLength = (Snippet.GetContent(objSnippetElement)[3])[1];
return Util.IsNonEmptyString(strMaxLength) ? strMaxLength : null;}
TextBox.GetVCardName = function(objSnippetElement)
{var strVCardName =  (Snippet.GetContent(objSnippetElement)[3])[2];
return Util.IsNonEmptyString(strVCardName) ? strVCardName : null;}
TextBox.GetAutoAdvance = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[4] != 0;}
TextBox.GetAutoComplete = function(objSnippetElement)
{var strAutoComplete = (Snippet.GetContent(objSnippetElement)[3])[3];
return Util.IsNonEmptyString(strAutoComplete) ? strAutoComplete : null;}
TextBox.Render = TextBox_Render;
function TextBox_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var arrTemplate;
var templateType = View.GetTemplateType();
var boolMultiline = TextBox.IsMultiLine(objSnippetElement);
if (boolMultiline)
{arrTemplate = TextBox_Template_MultiLine;
if (templateType == 1)
{arrTemplate = TextBox_Template_MultiLine_Print;}}
else
{arrTemplate = TextBox_Template_Simple;
if (templateType == 1)
{arrTemplate = TextBox_Template_Simple_Print;}}
var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
false ,
true ,
arrHtmlToInsertBuilder);
if (ViewDataNode.IsDisabled(objViewDataNode))
{arrHtmlToInsertBuilder.push("readOnly");
arrHtmlToInsertBuilder.push("=\"true\"");}
LeafControl_OutputConditionalAttribute("maxLength", TextBox.GetMaxLength(objSnippetElement), arrHtmlToInsertBuilder);
if (UserAgentInfo.strBrowser == 1)
{LeafControl_OutputConditionalAttribute("VCARD_NAME", TextBox.GetVCardName(objSnippetElement), arrHtmlToInsertBuilder);
LeafControl_OutputConditionalAttribute("autocomplete", TextBox.GetAutoComplete(objSnippetElement), arrHtmlToInsertBuilder);}
var strServerFormattedValue;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{strServerFormattedValue = BaseControl_GetHtmlValue(objViewDataNode, TextBox.GetFormatting);}
else
{strServerFormattedValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
if (!Util.IsNullOrEmptyString(strServerFormattedValue))
{var objFormatting = TextBox.GetFormatting(objViewDataNode);
if (objFormatting.getFormattingType() == 1)
{var objDateTime = objFormatting.UnformatIso8601(strServerFormattedValue, objFormatting.Mode());
if ((objDateTime != null) && !Util.IsNullOrEmptyString(objDateTime.strTZOffset))
{strServerFormattedValue = objFormatting.Format(strServerFormattedValue);}}}
if (boolMultiline)
{arrHtmlToInsertBuilder.push(arrTemplate[1]);
arrHtmlToInsertBuilder.push(STSHtmlEncode(strServerFormattedValue));
;
arrHtmlToInsertBuilder.push(arrTemplate[3]);}
else
{LeafControl_OutputAttribute("value", strServerFormattedValue, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[1]);}
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
TextBox.OnFocus = function (objControl, objEvent)
{;
LeafControl.OnFocus(objControl, objEvent);}
TextBox.OnMouseDown = TextBox_OnMouseDown;
function TextBox_OnMouseDown(
objControl,
objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
LeafControl.OnMouseDown(objControl, objEvent);
if (UserAgentInfo.strBrowser == 1)
{objControl.setAttribute("IsSelecting", true.toString())}}
TextBox.OnMouseUp = TextBox_OnMouseUp;
function TextBox_OnMouseUp(
objControl,
objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
LeafControl.OnMouseUp(objControl, objEvent);
if (UserAgentInfo.strBrowser == 1)
{objControl.setAttribute("IsSelecting", false.toString())}}
TextBox.IsFocusable = TextBox_IsFocusable;
function TextBox_IsFocusable()
{return true;}
TextBox.OnClick = LeafControl.OnClick;
TextBox.OnKeyPress = TextBox_OnKeyPress;
function TextBox_OnKeyPress(objControl, objEvent)
{if (ErrorVisualization.IsAsteriskVisible(objControl) && (UserAgentInfo.strBrowser == 1 || objEvent.which != 0))
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
objViewDataNode._keyPressed = true;
ErrorVisualization.HideAsterisk(objControl);}
return LeafControl.OnKeyPress(objControl, objEvent);}
TextBox.IsValid = LeafControl.IsValid;
TextBox.IsSelected = LeafControl.IsSelected;
TextBox.Select = LeafControl.Select;
TextBox.UnSelect = LeafControl.UnSelect;
TextBox.OnPropertyChange = TextBox_OnPropertyChange;
function TextBox_OnPropertyChange(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())	{ return; }
if (objEvent.propertyName != 'value') { return; }
if (UserAgentInfo.strBrowser == 1)
{if (1 == objControl.runtimeStyle.getAttribute("ignore", 0))
{objControl.runtimeStyle.removeAttribute("ignore", 0);
return;}}
;
;
TextBox.AutoAdvance(objControl);}
TextBox.OnInput = TextBox_OnInput;
function TextBox_OnInput(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())	{ return; }
;
;
TextBox.AutoAdvance(objControl);}
TextBox.AutoAdvance = TextBox_AutoAdvance;
function TextBox_AutoAdvance(objControl)
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
if (!TextBox.GetAutoAdvance(objSnippetElement))	{ return; }
var strMaxLength = TextBox.GetMaxLength(objSnippetElement);
if (Util.IsNonEmptyString(strMaxLength))
{var strControlValue = objControl.value;
if (Util.IsNonEmptyString(strControlValue))
{var nChars = strControlValue.length;
var nMaxLength = parseInt(strMaxLength);
if (nChars >= nMaxLength)
{var nextControl = TextBox.GetNextControlInTabOrder(objControl);
while(!BaseControl.IsInFocusableState(ViewDataNode.GetViewDataNodeFromHtml(nextControl)) && nextControl != null)
{nextControl = TextBox.GetNextControlInTabOrder(nextControl);}
if (nextControl != null)
{var funcRestoreFocus = BaseControl.FindFunction(nextControl, "RestoreFocus", true );
funcRestoreFocus(nextControl);
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(nextControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
if (Snippet.GetScriptClass(objSnippetElement) == "TextBox")
{nextControl.select();}}}}}}
TextBox.GetNextControlInTabOrder = TextBox_GetNextControlInTabOrder;
function TextBox_GetNextControlInTabOrder(objControl)
{var objReturn = null;
if (g_rgControlsTabOrder == null)
{g_rgControlsTabOrder = new Array();
TextBox.RefreshTabIndexArray(CurrentFormData.ViewDataTree());}
var nTabIndex = objControl.tabIndex;
var strId = objControl.id;
for (var intIndex = 0; intIndex < g_rgControlsTabOrder[nTabIndex].length; intIndex++)
{if (g_rgControlsTabOrder[nTabIndex][intIndex] == strId)
{var strNextId = null;
if (intIndex < (g_rgControlsTabOrder[nTabIndex].length - 1))
{strNextId = g_rgControlsTabOrder[nTabIndex][intIndex + 1];}
else
if (g_rgControlsTabOrder[nTabIndex + 1] != null)
{strNextId = g_rgControlsTabOrder[nTabIndex + 1][0];}
else
{var intLowestTabIndex = 0;
while (intLowestTabIndex < nTabIndex && g_rgControlsTabOrder[intLowestTabIndex] == null) intLowestTabIndex++;
strNextId = g_rgControlsTabOrder[intLowestTabIndex][0];}
if (strNextId != null)
{if (UserAgentInfo.strBrowser == 1)
{objReturn = document.getElementById(strNextId);}
else
{eval(" objReturn = document.getElementById(strNextId);");}
break;}}}
return objReturn;}
var g_rgControlsTabOrder = null;
TextBox.RefreshTabIndexArray = TextBox_RefreshTabIndexArray;
function TextBox_RefreshTabIndexArray(objViewDataNode)
{var arrChildControls = ViewDataNode.GetChildNodes(objViewDataNode);
for (var intIndex = 0; intIndex < arrChildControls.length; intIndex++)
{var objCurrentViewNode = arrChildControls[intIndex];
var objSnippetElement = ViewDataNode_GetSnippetElement(objCurrentViewNode);
var nTabIndex = (Snippet.GetContent(objSnippetElement)[1]);
if (nTabIndex >= 0)
{var strObjId = ViewDataNode.GetHtmlId(objCurrentViewNode);
if (g_rgControlsTabOrder[nTabIndex] == null)
{g_rgControlsTabOrder[nTabIndex] = new Array();}
g_rgControlsTabOrder[nTabIndex].push(strObjId);}
TextBox.RefreshTabIndexArray(objCurrentViewNode);}}
TextBox.Highlight = TextBox_HighLight;
function TextBox_HighLight(
objControl,
boolSticky)
{if (boolSticky && UserAgentInfo.strBrowser == 1)
{objControl.focus();
objControl.select();}
LeafControl.Highlight(objControl, boolSticky);}
TextBox.RemoveHighlight = LeafControl.RemoveHighlight;
TextBox.OnMouseOver = LeafControl.OnMouseOver;
TextBox.OnMouseOut = LeafControl.OnMouseOut;
TextBox.OnBeforeDialog = LeafControl.OnBeforeDialog;
TextBox.OnAfterDialog = LeafControl.OnAfterDialog;
TextBox.SetHidden = LeafControl.SetHidden;
function DatePickerOnClose()
{var objIframe = document.getElementById("DatePickerIFrame");
if (objIframe != null && objIframe.style.display != "none")
{objIframe.style.display="none";
SelectionService.RestoreFocus();}
this.Picker = null;
IP_DatePicker.objCurrentTextBox = null;}
function IP_DatePicker()
{}
IP_DatePicker.SPCalendarType = new Array();
IP_DatePicker.SPCalendarType["System.Globalization.GregorianCalendar"]		= 1 ;
IP_DatePicker.SPCalendarType["System.Globalization.HebrewCalendar"]		= 8 ;
IP_DatePicker.SPCalendarType["System.Globalization.HijriCalendar"]			= 6 ;
IP_DatePicker.SPCalendarType["System.Globalization.JapaneseCalendar"]		= 3 ;
IP_DatePicker.SPCalendarType["System.Globalization.JulianCalendar"]		= 0 ;
IP_DatePicker.SPCalendarType["System.Globalization.KoreanCalendar"]		= 5 ;
IP_DatePicker.SPCalendarType["System.Globalization.TaiwanCalendar"]		= 4 ;
IP_DatePicker.SPCalendarType["System.Globalization.ThaiBuddhistCalendar"]	= 0 ;
IP_DatePicker.objCurrentTextBox = null;
IP_DatePicker.GetFormattingInfo = function(objTextBox)
{var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objTextBox);
;
var funcGetFormatting = BaseControl.FindFunction(objTextBox, "GetFormatting", false );
var objFormatting = funcGetFormatting(objViewDataNode);
var objCultureInfo = null;
var strCulture = "";
;
if (objFormatting.CultureInfo != null)
{objCultureInfo =  objFormatting.CultureInfo();}
if (objCultureInfo != null)
{strCulture = objCultureInfo.Lcid;}
if (strCulture == "")
{strCulture = "" + CurrentFormData.DefaultLcid();}
var objReturn = new Object();
objReturn.objFormatting = objFormatting;
objReturn.objCultureInfo = objCultureInfo;
objReturn.strCulture = strCulture;
if (objCultureInfo != null)
{objReturn.strCalendarType = DateFormatting.GetCalendarType(objCultureInfo, strCulture, objFormatting._boolUseAltCalendar);}
else
{objReturn.strCalendarType = IP_DatePicker.SPCalendarType["System.Globalization.GregorianCalendar"];}
return objReturn;}
IP_DatePicker.OnClick = function(objButtonControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var strIframeId = "DatePickerIFrame";
var strIframeSrc;
var intCalendarType = 1 ;
var objTextBox = IP_DatePicker.GetTextBoxControl(objButtonControl);
if (objTextBox == null)
{;
return false;}
var boolDisabled = objTextBox.getAttribute("readOnly");
if (boolDisabled)
{return false;}
var strTextBoxId = objTextBox.id;
var strCurrentDate = objTextBox.value;
var objReturn = IP_DatePicker.GetFormattingInfo(objTextBox);
var objFormatting = objReturn.objFormatting;
var objCultureInfo = objReturn.objCultureInfo;
var strCulture = objReturn.strCulture;
;
if (objCultureInfo == null)
{objCultureInfo = eval("dateTime" + (strCulture * 1));
;}
intCalendarType = objReturn.strCalendarType;
if (Util.IsNonEmptyString(strCurrentDate) && intCalendarType == 1 )
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objTextBox);
;
if (objViewDataNode != null)
{var objDatum = ViewDataNode.GetDatum(objViewDataNode);
;
if (objDatum != null)
{var strShortDateFormat = objCultureInfo.formatShortDate;
;
strCurrentDate = objDatum.GetValue();
;
var objTempFormatting = new DateFormatting();
objTempFormatting.Reinit([objCultureInfo, objTempFormatting.k_intModeDate + "," + strShortDateFormat]);
strCurrentDate = objTempFormatting.Format(strCurrentDate);
;}}}
var strFDOW = "0";
if (objCultureInfo.k_intFirstDayOfWeek >= 0)
{strFDOW = "" + objCultureInfo.k_intFirstDayOfWeek;}
var objIframe = IFrameUtils.InsertIframe(objButtonControl , strIframeId, true , "46");
var objDatePickerImage = objButtonControl.childNodes[0];
;
strIframeSrc = CurrentFormData.SiteUrl() + "/_layouts/iframe.aspx?&cal=" + intCalendarType + "&lcid=" + strCulture + "&fdow=" + strFDOW + "&date=";
clickDatePickerHelper(strTextBoxId, strIframeId, objDatePickerImage, strCurrentDate, strIframeSrc, IP_DatePicker.OnSelectDate, DatePickerOnClose);
Util.StopEventProprogation(objEvent);
IP_DatePicker.objCurrentTextBox = objTextBox;
return false;}
IP_DatePicker.Close = function ()
{DatePickerOnClose();}
IP_DatePicker.OnSelectDate = function(objTextBox, strDate)
{if (IP_DatePicker.objCurrentTextBox == null || objTextBox.id != IP_DatePicker.objCurrentTextBox.id)
{return;}
var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objTextBox);
var objDatum = ViewDataNode.GetDatum(objViewDataNode);
var objDataInformation	= objDatum.GetDataInformation();
var objDatatype = DataInformation.GetDataType(objDataInformation).GetUnderlyingDatatype();
var objReturn = IP_DatePicker.GetFormattingInfo(objTextBox);
if (objDatatype == DateTimeXsdDatatype && objReturn.strCalendarType == 1 )
{var objFormatting = objReturn.objFormatting;
if ((objFormatting.DateFormatType() != objFormatting.k_intDateFormatTypeNone) ||
(objFormatting.TimeFormatType() != objFormatting.k_intTimeFormatTypeNone))
{var objNodeDateTime = objFormatting.UnformatIso8601(objDatum.GetValue(), objFormatting.k_intModeDateTime);
if (objNodeDateTime != null)
{var strUnformattedDate = objFormatting.Unformat(strDate).strUnformattedValue;
var objNewDateTime = objFormatting.UnformatIso8601(strUnformattedDate, objFormatting.k_intModeDateTime);
if (objNewDateTime != null)
{objNodeDateTime = DateUtils.ConvertToLocalTime(objNodeDateTime);
var idxT = strUnformattedDate.indexOf("T");
if (idxT != -1)
{strUnformattedDate = strUnformattedDate.substr(0, idxT);}
objNewDateTime.intHours		= objNodeDateTime.intHours;
objNewDateTime.intMinutes	= objNodeDateTime.intMinutes;
objNewDateTime.intSeconds	= objNodeDateTime.intSeconds;
TextBox._AddLocalTimezone(objNodeDateTime, objNewDateTime);
strDate = objFormatting.UnformatFromDateTime(objNewDateTime, objFormatting.k_intModeDateTime, strDate);}}}}
if (objReturn.objCultureInfo == null && objReturn.strCalendarType == 1 )
{var strCulture = objReturn.strCulture;
var objFormatting = new DateFormatting();
var objCultureInfo = eval("dateTime" + (strCulture * 1));
var strShortDateFormat = objCultureInfo.formatShortDate;
var intMode = objFormatting.k_intModeUnknown;
if (objDatatype == DateXsdDatatype)
{intMode = objFormatting.k_intModeDate;}
else if (objDatatype == TimeXsdDatatype)
{intMode = objFormatting.k_intModeTime;}
else if (objDatatype == DateTimeXsdDatatype)
{intMode = objFormatting.k_intModeDateTime;}
objFormatting.Reinit([objCultureInfo, objFormatting.k_intModeDate + "," + strShortDateFormat]);
strDate = objFormatting.Unformat(strDate).strUnformattedValue;
;}
objTextBox.value = strDate;
;
TextBox.OnChange(objTextBox, null);}
IP_DatePicker.GetTextBoxControl = function(objButtonControl)
{var objInfoPathControls = BaseControl.GetChildInfoPathControls(objButtonControl.parentNode.parentNode.parentNode);
var objTextBox = null;
;
if (objInfoPathControls.length == 2)
{objTextBox = objInfoPathControls[0];
;}
return(objTextBox);}
function DatePickerButton()
{}
DatePickerButton.OnClick = function(objControl, objEvent)
{IP_DatePicker.OnClick(objControl, objEvent);
Util.StopEventProprogation(objEvent);
return false;}
DatePickerButton.OnAfterCreate = function (objViewDataNode)
{;
;}
DatePickerButton.Render = DatePickerButton_Render;
function DatePickerButton_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var templateType = View.GetTemplateType();
var arrTemplate = DatePickerButton_Template;
if (templateType == 1)
{arrTemplate = DatePickerButton_PrintTemplate;
;
return;}
if (UserAgentInfo.strBrowser != 1)
{return;}
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
true ,
true ,
arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[1]);
LeafControl_OutputAttribute("title", IntlCoreStrings.k_strDatePickerButtonTitle, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[2]);
LeafControl_OutputAttribute("title", IntlCoreStrings.k_strDatePickerButtonTitle, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[3]);
LeafControl_OutputAttribute("alt", IntlCoreStrings.k_strDatePickerButtonAlt, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[4]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
DatePickerButton.OnFocus = LeafControl.OnFocus;
DatePickerButton.OnBlur = LeafControl.OnBlur;
function Button() {};
Button.GetFormatting = function()
{return null;};
Button.GetValueFromControl = BaseControl.GetValueFromControl;
Button.SetValueOfControl = BaseControl.SetValueOfControl;
Button.AddEventLogEntry = function (objControl)
{var strContainerId = BaseControl.GetContainerId(objControl.id);
;
return EventLog_Add(
1,
objControl,
objControl.getAttribute("buttonid"),
strContainerId,
"",
false ,
false ,
false ,
0,
1);}
Button.OnClick = Button_OnClick;
function Button_OnClick(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var boolShouldAddEventLog = true;
if (Button_GetButtonType(objSnippetElement) == 3)
{if (!View.PreSubmitActions())
{return;}}
SelectionService.RememberFocus(objControl, objEvent);
if (Button_GetButtonType(objSnippetElement) == 6)
{var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
if (enumRoundTripModel == 2)
{boolShouldAddEventLog = false;}}
var boolDidntPostback = true;
if (boolShouldAddEventLog)
{boolDidntPostback = Button.AddEventLogEntry(objControl);}
var strOldId = objControl.Id;
if (boolDidntPostback)
{boolDidntPostback = ViewDataNode.OnControlChange(objControl);}
var objPostReapplyControl = document.getElementById(strOldId);
if (objPostReapplyControl != null)
{LeafControl.OnClick(objControl, objEvent);}}
Button.RefreshControlData = function(
objControl)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objContextViewDataNode = ViewDataNode.GetParent(objViewDataNode);
var funcComputeValue = Button_GetValueFunction(objSnippetElement);
if (funcComputeValue != null)
{var strValue = Expr.String(Expr_Evaluate(funcComputeValue, objContextViewDataNode, 0));
objControl.setAttribute("value", strValue);}}
Button.Render = Button_Render;
function Button_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var templateType = View.GetTemplateType();
var arrTemplate = Button_Template;
if (templateType == 1)
{arrTemplate = Button_PrintTemplate;}
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
true ,
true ,
arrHtmlToInsertBuilder);
LeafControl_OutputAttribute("buttonid", Button_GetButtonId(objSnippetElement), arrHtmlToInsertBuilder);
LeafControl_OutputAttribute("value", Button_GetButtonText(objViewDataNode), arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[1]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
function Button_GetButtonText(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[0];}
function Button_GetButtonId(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[0];}
function Button_GetButtonType(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[1];}
function Button_HasDynamicValue(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[2] == 1;}
function Button_GetValueFunction(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[3];}
Button.IsFocusable = Button_IsFocusable;
function Button_IsFocusable()
{return true;}
Button.OnChange = LeafControl.OnChange;
Button.OnFocus = LeafControl.OnFocus;
Button.OnBlur = LeafControl.OnBlur;
Button.OnMouseOver = LeafControl.OnMouseOver;
Button.OnMouseOut = LeafControl.OnMouseOut;
Button.OnMouseDown = LeafControl.OnMouseDown;
Button.OnMouseUp = LeafControl.OnMouseUp;
Button.OnKeyPress = LeafControl.OnKeyPress;
Button.OnAfterCreate = LeafControl.OnAfterCreate;
Button.IsValid = LeafControl.IsValid;
Button.IsSelected = LeafControl.IsSelected;
Button.Select = LeafControl.Select;
Button.UnSelect = LeafControl.UnSelect;
Button.RestoreFocus = LeafControl.RestoreFocus;
Button.Highlight = LeafControl.Highlight;
Button.RemoveHighlight = LeafControl.RemoveHighlight;
InDocSign.currentControl = null;
InDocSign.boolDownloadControls = false;
InDocSign.k_strAlertButtonYes = null;
InDocSign.k_strAlertButtonNo = null;
function InDocSign() {};
function InDocSign_ControlRequiresDownload()
{var		boolDownloadNeeded = false;
try
{var objDSigCtrl = new ActiveXObject("InfoPathFormServer.DigitalSignatures");
if (objDSigCtrl == null)
{boolDownloadNeeded = true;}}
catch (exception)
{boolDownloadNeeded = true;}
return boolDownloadNeeded;}
var isAXControlInstalled = false;
InDocSign.fnRenderAfterPostbackDoneFunction  = null;
function InDocSign_RenderAfterPostback(fnRenderAfterPostbackDoneFunction)
{if (CurrentFormData.HasSignature())
{isAXControlInstalled = InDocSign_ControlRequiresDownload() == false;}
if (isAXControlInstalled  == false &&
ViewDataNode.boolNeedReRendering != true &&
UserAgentInfo.strBrowser == 1 &&
window.navigator.appVersion.indexOf("Win64") == -1 &&
CurrentFormData.PostbackCounter() <= 0 &&
CurrentFormData.HasSignature())
{InDocSign.fnRenderAfterPostbackDoneFunction = fnRenderAfterPostbackDoneFunction;
InDocSign.ShowInstallAXControls();}
else
{fnRenderAfterPostbackDoneFunction();}}
function InDocSign_RenderAfterPostbackDone()
{if (InDocSign.fnRenderAfterPostbackDoneFunction != null)
{InDocSign.fnRenderAfterPostbackDoneFunction();
InDocSign.fnRenderAfterPostbackDoneFunction = null;}
else
{;}}
InDocSign.OnAfterCreate = function(objViewDataNode)
{;
;
var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl == null)
{return;}
var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var intDirection = BaseControl.GetDirection(objSnippetElement);
objControl.setAttribute("rtl", intDirection == 2);
if (isAXControlInstalled == false && CurrentFormData.HasSignature())
{isAXControlInstalled = InDocSign_ControlRequiresDownload() == false;}
if (isAXControlInstalled)
{InDocSign.InsertAXControls (objControl);}
if (!InDocSign.IsSigned(objViewDataNode))
{var objCollectionViewDataNode = InDocSign.GetCollectionForInDocSign(objViewDataNode);
if (objCollectionViewDataNode != null)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objCollectionViewDataNode);
if (Snippet.GetSnippetType(objSnippetElement) == 4)
{var arrChildControls = ViewDataNode.GetChildNodes(objCollectionViewDataNode);
if (arrChildControls != null && arrChildControls.length == 0)
{InDocSign.ShowClickToSignLink(objControl, false);}}}}
else
{if (InDocSign.CanAddSignature(objViewDataNode))
{InDocSign.ShowClickToSignLink(objControl, true);}}
LeafControl.OnAfterCreate(objViewDataNode);}
InDocSign.ShowClickToSignLink = function(objControl, fVisible)
{var strDisplayStyle = fVisible ? "block" : "none";
var objDisplayDiv = objControl.childNodes[0];
;
objDisplayDiv.style.display = fVisible ? "block" : "none";}
InDocSign._lastVerifyWindowTimer = null;
InDocSign.OnClick = function(objControl, objEvent)
{var		eventSource;
objEvent.returnValue = false;
if (!BaseControl.CanHandleEvents())
{return;}
HoverMenu.HideMenu();
if (IP_DatePicker.Close != null)
{IP_DatePicker.Close();}
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (UserAgentInfo.strBrowser == 1)
{eventSource = objEvent.srcElement;}
else
{eventSource = objEvent.target;}
if (InDocSign.IsEventInsideAddSignature(eventSource))
{if (eventSource.tagName.toLowerCase() != "a")
{return;}
if (UserAgentInfo.strBrowser == 1 && window.navigator.appVersion.indexOf("Win64") == -1)
{SelectionService.RememberFocus(objControl, objEvent);
if (!window.clientInformation.onLine)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strSignatureAddOffline, true);
Util.StopEventProprogation(objEvent);
return;}
objControl.setAttribute("eventLog", EventLog.objStaticData.CreateEventLogStartEntry());
if (EventLog.Count() > 1)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strSignaturesPromptForRefresh, true);
View_SubmitForm(false , 17, 0, false );
return;}
else
{if (ErrorVisualization.HasInvalidControlInView(null))
{if (!UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strSignaturesPromptForValidation, true))
{Util.StopEventProprogation(objEvent);
return;}}
try
{if (InDocSign.HasInvalidSignatures(objViewDataNode))
{if (!UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strSignaturesPromptForInvalidSig, true))
{Util.StopEventProprogation(objEvent);
return;}}
InDocSign.AddSignature(objControl, objEvent);}
catch(exception)
{InDocSign.currentControl = null;}
SelectionService.RestoreFocus();
objControl.scrollIntoView(true);}}
else
{objEvent.preventDefault();
objEvent.stopPropagation();
UserMessages.ShowAlertMessage(IntlCoreStrings.k_strAddSignatureNotSupported, true);
return;}}
else
{var signatureRowIndex = InDocSign.GetTableRowIndex(eventSource);
if (signatureRowIndex >= 0)
{if (eventSource.parentNode.getAttribute("canremovesignature") != null)
{InDocSign.RemoveSignature(objControl, eventSource, signatureRowIndex);}
else if (eventSource.tagName.toLowerCase() == "a")
{var url;
var eventLog		= null;
var dataDefinition	= null;
var index			= null;
var useTrampoline	= false;
var left			= window.screenLeft + (document.body.offsetWidth) / 2 - 688/2;
var top				= window.screenTop + (document.body.offsetHeight) / 2 - 550/2;
if (CurrentFormData.SessionState().length == 0)
{url = CurrentFormData.SiteUrl() +
"/_layouts/SignatureDetails.FormServer.aspx" +
"?EventLog=" + encodeURIComponent(EventLog.objStaticData.CreateEventLogStartEntry()) +
"&datadefinition=" + encodeURIComponent(objControl.getAttribute("signedblock")) +
"&index=" + signatureRowIndex;}
else
{useTrampoline = true;
url = CurrentFormData.SiteUrl() + "/_layouts/SignatureDetailsLoader.FormServer.aspx";
dataDefinition = objControl.getAttribute("signedblock");
index = signatureRowIndex;
EventLog_EnsureEventLogStartEntry();
eventLog = EventLog.Value();}
SelectionService.RememberFocus(objControl, objEvent);
if (UserAgentInfo.strBrowser == 1)
{if (window.clientInformation.onLine)
{var params = new Array();
params.push(eventLog);
params.push(dataDefinition);
params.push(index);
params.push("");
window.showModalDialog(
url,
params,
"dialogLeft: " + left +
"; dialogTop: " + top +
"; dialogHeight: " +  550 + "px" +
"; dialogWidth: " + 688 + "px" +
"; status: no; scrollbars: yes; menubar: no; resizable: yes; help: no");}
else
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strSignatureDetailsOffline, true);
Util.StopEventProprogation(objEvent);
return;}}
else
{var newWindow = window.open(
url,
null,
"top=" + top +
", left=" + left +
", height=" + 550 +
", width=" + 688 +
", status=no, scrollbars=yes, toolbar=no, menubar=no, resizable=yes, location=no");
if (newWindow == null)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strPromptOpenWindowFailed, true);}
else if (useTrampoline)
{if (InDocSign._lastVerifyWindowTimer != null)
{window.clearTimeout(InDocSign._lastVerifyWindowTimer);}
InDocSign._lastVerifyWindowTimer = window.setTimeout(
function()
{if (newWindow.document.getElementById("__EventLog") != null)
{window.clearTimeout(InDocSign._lastVerifyWindowTimer);
InDocSign._lastVerifyWindowTimer = null;
newWindow.document.getElementById("__EventLog").value = eventLog;
newWindow.document.getElementById("datadefinition").value = dataDefinition;
newWindow.document.getElementById("index").value = index;
newWindow.document.getElementById("bounce").submit();}},
25);}}
SelectionService.RestoreFocus();}}}}
function InDocSign_InstallAXControlsDone()
{Dialog.HideDialog();
if (Dialog.objShowDialogTimer != null)
{window.clearInterval(Dialog.objShowDialogTimer);
Dialog.objShowDialogTimer = null;}
InDocSign_RenderAfterPostbackDone();}
InDocSign._CallbackInstallAXControlsTimer = null;
function InDocSign_CallbackInstallAXControls()
{var isAXControlInstalled = InDocSign_ControlRequiresDownload() == false;
if (g_eulaWindow == null || isAXControlInstalled == true)
{window.clearInterval(InDocSign._CallbackInstallAXControlsTimer);
InDocSign._CallbackInstallAXControlsTimer = null;
InDocSign_InstallAXControlsDone();}}
function InDocSign_InstallAXControls()
{try
{InDocSign.ShowEULA();
if (InDocSign._CallbackInstallAXControlsTimer != null)
{window.clearInterval(InDocSign._CallbackInstallAXControlsTimer);
InDocSign._CallbackInstallAXControlsTimer = null;}
InDocSign._CallbackInstallAXControlsTimer = window.setInterval(InDocSign_CallbackInstallAXControls, 100);}
catch(exception)
{}}
InDocSign.ShowInstallAXControls = function ()
{var arrData = __GetDialogData_InstallDSigCtrl();
arrData[1] = IntlCoreStrings.k_strInstallDSigCtrlDialogTitle;
arrData[3] = CurrentFormData.Direction();
arrData[5] = Dialog.TextAlignmentStyle();
arrData[6] = "";
arrData[10] = IntlCoreStrings.k_strPromptInstallAXControls;
if (InDocSign.k_strAlertButtonYes != null)
{arrData[2][0][1] = InDocSign.k_strAlertButtonYes;}
if (InDocSign.k_strAlertButtonNo != null)
{arrData[2][1][1] = InDocSign.k_strAlertButtonNo;}
return Dialog_ShowModalDialog(
"InstallDSigCtrl",
arrData ,
null );}
InDocSign.AddSignature = function(objControl, objEvent)
{var coll = objControl.children.tags("OBJECT");
if (coll.length == 2)
{if (coll[1].children.tags("span").length == 0)
{try
{Util.StopEventProprogation(objEvent);
coll[1].ShowSignatureDlg(objControl.id);}
catch (exception)
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strShowSignatureDlgFailure),
4);}}}
else
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strPromptErrorActiveXNotInstalled, true );}}
InDocSign.IsEventInsideAddSignature = function(eventSource)
{;
var boolIsAddSignature = false;
for (var nIndex = 0; nIndex < 5; nIndex++)
{if (eventSource.getAttribute("scriptclass") == "InDocSign")
{boolIsAddSignature = true;
break;}
eventSource = eventSource.parentNode;
if (eventSource == null)
{break;}}
return boolIsAddSignature;}
var g_eulaWindow = null;
InDocSign.ShowEULA = function()
{var url = CurrentFormData.SiteUrl() + "/_layouts/SignatureEULA.FormServer.aspx";
var left =  window.screenLeft + (document.body.offsetWidth) / 4;
var top = window.screenTop + (document.body.offsetHeight)/ 4;
g_eulaWindow = window.open(url, "Eula",
"left=" + left +
",top=" + top +
",height=400,width=600,status=no,scrollbars=no,menubar=no,resizable=no,help=no"
,true);
if (g_eulaWindow == null)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strPromptOpenWindowFailed, true);}
else
{InDocSign._SetEulaParamtersTimer = window.setTimeout("SetEulaParamters()", 50);}}
InDocSign._SetEulaParamtersTimer = null;
function SetEulaParamters()
{window.clearTimeout(InDocSign._SetEulaParamtersTimer);
InDocSign._SetEulaParamtersTimer = null;
var objDirection = g_eulaWindow.document.getElementById("idDirection");
if (objDirection == null)
{InDocSign._SetEulaParamtersTimer = window.setTimeout("SetEulaParamters()", 50);
return;}
objDirection.value = View.GetDirection();
g_eulaWindow.document.getElementById("idDirection").value = View.GetDirection();
g_eulaWindow.document.getElementById("idVersion").value = "";
g_eulaWindow.document.getElementById("idSiteUrl").value = CurrentFormData.SiteUrl();
if (document.getElementById("idSiteUrl") == null)
{document.body.innerHTML = document.body.innerHTML +
"<input type='hidden' id='idSiteUrl' style='display:none;width:0px;height:0px' value='" + CurrentFormData.SiteUrl() + "' />" +
"<input type='hidden' id='idDirection' style='display:none;width:0px;height:0px' value='" + View.GetDirection() + "' />";}
g_eulaWindow.focus();}
InDocSign.InsertAXControls = function(objControl)
{InDocSign.currentControl = 	objControl;
objControl.innerHTML = objControl.innerHTML +
"<object VIEWASTEXT STYLE='display:none';  TABINDEX ='-1' " +
"id='" +  objControl.id + ".DSigResCtrl' " +
"CLASSID='CLSID:8D5D65AC-273D-491e-8874-BBB4B63DEA67' " +
"CODEBASE='" + CurrentFormData.SiteUrl() + "/_layouts" + objControl.lcid + "/DSigRes.cab#Version=" + CurrentFormData.DSigResVersion() + "'>" +
"<img style='display:none' src='" + "/_layouts/inc/signaturevalid.png' onload='InDocSign.OnInsertFailure(true);' />"  +
"<param name='DSigControlID' value='" + objControl.id + "' />" +
"</object>" +
"<object VIEWASTEXT STYLE='display:none;' TABINDEX ='-1' " +
"id='" + objControl.id + ".DSigCtrl' " +
"CLASSID='CLSID:5EEE5BF6-DC9E-43be-9100-BF19643943C5' " +
"CODEBASE='" + CurrentFormData.SiteUrl() + "/_layouts/DSigCtrl.cab#Version=" + CurrentFormData.DSigCtrlVersion() + "'>" +
"<img style='display:none' src='" + "/_layouts/inc/signaturevalid.png' onload='InDocSign.OnInsertFailure(true);' />"  +
"<param name='DSigControlID' value='" + objControl.id + "' />" +
"</object>";
var url = CurrentFormData.SiteUrl() + "/_layouts/Signature.FormServer.aspx";
objControl.setAttribute("signaturePage", url);
objControl.onpropertychange = InDocSign.OnPropertyChange;}
InDocSign.OnInsertFailure = function(boolInsertResourceControl)
{if (InDocSign.currentControl != null)
{var objControl = InDocSign.currentControl;
InDocSign.currentControl = null;
var coll = objControl.children.tags("OBJECT");
if (coll.length > 0)
{objControl.removeChild(coll[0]);}
if (InDocSign.boolDownloadControls)
{InDocSign.boolDownloadControls = false;
UserMessages.ShowAlertMessage(IntlCoreStrings.k_strErrorAXInstantiation, true);}}
else if (!boolInsertResourceControl)
{if (InDocSign.boolDownloadControls)
{InDocSign.boolDownloadControls = false;
UserMessages.ShowAlertMessage(IntlCoreStrings.k_strErrorAXInstantiation, true);}}}
InDocSign.RemoveSignature = function(objControl, eventSource, indexRow)
{if (eventSource.parentNode.getAttribute("canremovesignature") == "true")
{if (UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strSignaturesPromptForDelete, true))
{EventLog_Add(
17,
objControl,
"true",
indexRow,
objControl.getAttribute("signedblock"),
true ,
false ,
false ,
3,
0);}}
else
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strDeleteConterSignatureNotAllowed, true);}}
InDocSign.OnPropertyChange = function()
{var viewState;
var signCodePropChange = false;
eval(" if(window.event.propertyName == 'signcode') signCodePropChange = true;");
if (signCodePropChange)
{if (this.signcode != -2 &&
this.signcode != -1)
{InDocSign.boolDownloadControls = false;
viewState = this.viewstate;
EventLog.objStaticData.SessionState = viewState;}
switch (this.signcode)
{case -2:
{break;}
case -1:
{break;}
case 1:
{View_SubmitForm(false , 16, 0, false );
break;}
case 0:
{break;}
case 3:
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strShowSignatureDlgNodeRO),
4);
break;}
case 4:
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strShowSignatureDlgSessionClosed),
5);
break;}
case 5:
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strShowSignatureDlgFatalError),
5);
break;}
case 6:
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strShowSignatureDlgFailure, true);
break;}
case 7:
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strActiveSessionsTimeout),
5);
break;}
default:
{UserMessages.ShowMessage(
new UserMessage(IntlCoreStrings.k_strShowSignatureDlgFailure),
4);
break;}}}}
InDocSign.GetInDocSignForCollection = function(objCollectionControl)
{var objPotentialInDocSign = BaseControl.GetNextSiblingInfoPathControl(objCollectionControl);
if (objPotentialInDocSign != null && objPotentialInDocSign.getAttribute("scriptclass") == "InDocSign")
{return objPotentialInDocSign;}
else
{return null;}}
InDocSign.GetCollectionForInDocSign = function(objViewDataNode)
{return ViewDataNode.FindPreviousSibling(objViewDataNode);}
InDocSign.OnMouseOver = function(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (!InDocSign.IsSigned(objViewDataNode))
{objControl.runtimeStyle.textDecoration = 'underline';}
LeafControl.OnMouseOver(objControl, objEvent);}
InDocSign.OnMouseOut = function(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (!InDocSign.IsSigned(objViewDataNode))
{objControl.runtimeStyle.textDecoration = 'none';}
LeafControl.OnMouseOut(objControl, objEvent);}
InDocSign.GetIsSigned = InDocSign_GetIsSigned;
function InDocSign_GetIsSigned(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[0];}
InDocSign.IsSigned = function(objViewDataNode)
{return InDocSign.GetIsSigned(objViewDataNode) != "0";}
InDocSign.CanAddSignature = function(objViewDataNode)
{var canAddSignature = (ViewDataNode.GetContent(objViewDataNode)[2])[1];
return canAddSignature != "0";}
InDocSign.HasInvalidSignatures = function(objViewDataNode)
{if (!InDocSign.IsSigned(objViewDataNode))
{return false;}
else
{var hasInvalidSignatures = (ViewDataNode.GetContent(objViewDataNode)[2])[2];
return hasInvalidSignatures != "0";}}
InDocSign.GetCanAddSignature = function(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[1];}
InDocSign.GetSignaturesInfo = function(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[3];}
InDocSign.GetSignedDataBlock = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[0];}
InDocSign.GetVerifyMessage = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[1];}
InDocSign.GetCurrentViewName = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[2];}
InDocSign.GetUIText = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[3];}
InDocSign.GetSolutionFingerprint = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[4];}
InDocSign.GetServerVersion = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[5];}
InDocSign.GetLcid = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[6];}
InDocSign.GetControlVersion = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[7];}
InDocSign.GetTableRowIndex = function(eventSource)
{var index = -1;
while (eventSource != null && eventSource.tagName.toLowerCase() != "table")
{if (eventSource.tagName.toLowerCase() == "body")
{return -1;}
eventSource = eventSource.parentNode;}
;
if (eventSource != null)
{var strTagName;
var row = eventSource.parentNode.parentNode.parentNode;
;
while (row != null)
{strTagName = row.tagName;
if (strTagName != null && strTagName.toLowerCase() == "tr")
{index = index + 1;
row = row.previousSibling;}
else
{break;}}
;}
return index;}
InDocSign.RestoreFocus = InDocSign_RestoreFocus;
function InDocSign_RestoreFocus(objControl)
{if (objControl == null)
{return;}
var objAnchor = Util.FindFirstFocusableHtmlChildControl(objControl);
if (objAnchor)
{try
{objAnchor.focus();
objAnchor.focus();}
catch(exception)
{BaseControl.Focus(objControl);}}
else
{BaseControl.Focus(objControl)}}
InDocSign.ResolveSpecialValue = InDocSign_ResolveSpecialValue;
function InDocSign_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{;
;
;
;
var objResult = LeafControl.ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId);
if (objResult == null)
{switch(nSpecialValue)
{case 10:
objResult = InDocSign.GetSignedDataBlock(objSnippetElement);
break;
case 11:
objResult = InDocSign.GetVerifyMessage(objSnippetElement);
break;
case 12:
objResult = InDocSign.GetCurrentViewName(objSnippetElement);
break;
case 13:
objResult = InDocSign.GetUIText(objSnippetElement);
break;
case 14:
objResult = InDocSign.GetIsSigned(objViewDataNode);
break;
case 15:
objResult = InDocSign.GetCanAddSignature(objViewDataNode);
break;
case 16:
objResult = InDocSign.GetSignaturesInfo(objViewDataNode);
break;
case 17:
objResult = InDocSign.GetSolutionFingerprint(objSnippetElement);
break;
case 18:
objResult = InDocSign.GetServerVersion(objSnippetElement);
break;
case 19:
objResult = InDocSign.GetLcid(objSnippetElement);
break;
case 20:
objResult = InDocSign.GetControlVersion(objSnippetElement);
break;}
if (nSpecialValue == 13)
{objResult = STSHtmlEncode(objResult);}
else if (nSpecialValue == 16)
{}
else if (objResult != null)
{objResult = StAttrQuote(objResult);}}
return objResult;}
InDocSign.Render = InDocSign_Render;
function InDocSign_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var templateType = View.GetTemplateType();
var arrTemplate;
if (InDocSign.IsSigned(objViewDataNode))
{arrTemplate = InDocSign_Template_Verify;
if (templateType == 1)
{arrTemplate = InDocSign_PrintTemplate_Verify;}}
else
{arrTemplate = InDocSign_Template_Sign;
if (templateType == 1)
{arrTemplate = InDocSign_PrintTemplate_Sign;}}
LeafControl.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate);}
InDocSign.IsFocusable = InDocSign_IsFocusable;
function InDocSign_IsFocusable()
{return true;}
InDocSign.OnChange = BaseControl.OnChange;
InDocSign.OnFocus = BaseControl.OnFocus;
InDocSign.OnBlur = BaseControl.OnBlur;
InDocSign.OnKeyPress = BaseControl.OnKeyPress;
InDocSign.IsValid = BaseControl.IsValid;
InDocSign.IsSelected = BaseControl.IsSelected;
InDocSign.Select = BaseControl.Select;
InDocSign.UnSelect = BaseControl.UnSelect;
function ExpressionBox()
{}
ExpressionBox.GetFormatting = BaseControl.GetFormatting;
ExpressionBox.GetValueFromControl = function(objControl)
{return null;}
ExpressionBox.SetValueOfControl = function(
objControl,
strValue)
{}
ExpressionBox.RefreshControlData = function(
objControl)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objLeafSnippetContent = (Snippet.GetContent(objSnippetElement)[3]);
var objContextViewDataNode = ViewDataNode.GetParent(objViewDataNode);
var funcEvaluateExpression = objLeafSnippetContent[0];
if (funcEvaluateExpression != null)
{var objFormatting = ExpressionBox.GetFormatting(objViewDataNode);
var strExpressionValue = Expr.String(Expr_Evaluate(funcEvaluateExpression, objContextViewDataNode, 0));
Util.SetInnerText(objControl, objFormatting.Format(strExpressionValue));}}
ExpressionBox.SetDisable = function(objControl, boolDisable)
{}
ExpressionBox.OnAfterCreate = function(objViewDataNode)
{;
;}
ExpressionBox.RestoreFocus = ExpressionBox_RestoreFocus;
function ExpressionBox_RestoreFocus(objControl)
{}
ExpressionBox.Render = ExpressionBox_Render;
function ExpressionBox_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(ExpressionBox_Template[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
false ,
true ,
arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(ExpressionBox_Template[1]);
var objServerFormattedValue;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{objServerFormattedValue = BaseControl_GetHtmlValue(objViewDataNode, ExpressionBox.GetFormatting);}
else
{objServerFormattedValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
arrHtmlToInsertBuilder.push(STSHtmlEncode(objServerFormattedValue));
arrHtmlToInsertBuilder.push(ExpressionBox_Template[3]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
ExpressionBox.OnClick = LeafControl.OnClick;
ExpressionBox.OnFocus = LeafControl.OnFocus;
ExpressionBox.OnMouseOver = LeafControl.OnMouseOver;
ExpressionBox.OnMouseOut = LeafControl.OnMouseOut;
ExpressionBox.OnMouseDown = LeafControl.OnMouseDown;
ExpressionBox.OnMouseUp = LeafControl.OnMouseUp;
ExpressionBox.OnKeyPress = LeafControl.OnKeyPress;
ExpressionBox.IsValid = LeafControl.IsValid;
ExpressionBox.OnBlur = LeafControl.OnBlur;
ExpressionBox.IsSelected = LeafControl.IsSelected;
ExpressionBox.Select = LeafControl.Select;
ExpressionBox.UnSelect = LeafControl.UnSelect;
ExpressionBox.Highlight = LeafControl.Highlight;
ExpressionBox.RemoveHighlight = LeafControl.RemoveHighlight;
function CheckBox() {};
CheckBox.GetFormatting = BaseControl.GetFormatting;
CheckBox.GetValueFromControl = function(objControl)
{if (objControl.checked)
{return CheckBox.GetOnValue(objControl);}
else
{return CheckBox.GetOffValue(objControl);}}
CheckBox.SetValueOfControl = function(
objControl,
objValue)
{var strValue = Util.GetPlainTextFromValueObject(objValue);
if (strValue == CheckBox.GetOnValue(objControl))
{objControl.checked = true;}
else
{objControl.checked = false;}}
CheckBox.AddEventLogEntry = function (objControl)
{var onValue = CheckBox.GetOnValue(objControl);
var offValue = CheckBox.GetOffValue(objControl);
return EventLog_Add(
0,
objControl,
objControl.id,
"",
objControl.checked ? onValue : offValue,
false ,
false ,
false ,
0,
1);}
CheckBox.OnClick = CheckBox_OnClick;
function CheckBox_OnClick(objControl, objEvent)
{var boolDidntPostback = CheckBox.AddEventLogEntry(objControl);
SelectionService.RememberFocus(objControl, objEvent);
LeafControl.OnChange(objControl, objEvent);
var strOldId = objControl.Id;
if (boolDidntPostback)
{boolDidntPostback = ViewDataNode.OnControlChange(objControl);}
var objPostReapplyControl = document.getElementById(strOldId);
if (objPostReapplyControl != null)
{LeafControl.OnClick(objControl, objEvent);}
return true;}
CheckBox.OnAfterCreate = function(objViewDataNode)
{;
;}
CheckBox.RestoreFocus = CheckBox_RestoreFocus;
function CheckBox_RestoreFocus(objControl)
{LeafControl.RestoreFocus(objControl);
objControl.select();}
CheckBox.GetOnValue = function(objControl)
{return CheckBox.GetOnValueFromSnippet(Snippet.GetSnippetElementFromHtml(objControl));}
CheckBox.GetOnValueFromSnippet = function(objSnippetElement)
{;
return (Snippet.GetContent(objSnippetElement)[3])[0];}
CheckBox.GetOffValue = function(objControl)
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
;
return (Snippet.GetContent(objSnippetElement)[3])[1];}
CheckBox.Render = CheckBox_Render;
function CheckBox_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var templateType = View.GetTemplateType();
var arrTemplate = CheckBox_Template;
if (templateType == 1)
{arrTemplate = CheckBox_PrintTemplate;}
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
true ,
true ,
arrHtmlToInsertBuilder);
var objServerFormattedValue;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{objServerFormattedValue = BaseControl_GetHtmlValue(objViewDataNode, CheckBox.GetFormatting);}
else
{objServerFormattedValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
if (objServerFormattedValue == CheckBox.GetOnValueFromSnippet(objSnippetElement))
{arrHtmlToInsertBuilder.push("checked");}
else
{if (templateType == 1)
{arrHtmlToInsertBuilder.push(" unchecked=true");}}
arrHtmlToInsertBuilder.push(arrTemplate[1]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
CheckBox.IsFocusable = CheckBox_IsFocusable;
function CheckBox_IsFocusable()
{return true;}
CheckBox.OnChange = LeafControl.OnChange;
CheckBox.OnFocus = LeafControl.OnFocus;
CheckBox.OnBlur = LeafControl.OnBlur;
CheckBox.OnMouseDown = LeafControl.OnMouseDown;
CheckBox.OnMouseUp = LeafControl.OnMouseUp;
CheckBox.OnKeyPress = LeafControl.OnKeyPress;
CheckBox.IsValid = LeafControl.IsValid;
CheckBox.IsSelected = LeafControl.IsSelected;
CheckBox.Select = LeafControl.Select;
CheckBox.UnSelect = LeafControl.UnSelect;
CheckBox.Highlight = LeafControl.Highlight;
CheckBox.RemoveHighlight = LeafControl.RemoveHighlight;
CheckBox.OnMouseOver = LeafControl.OnMouseOver;
CheckBox.OnMouseOut = LeafControl.OnMouseOut;
CheckBox.OnBeforeDialog = LeafControl.OnBeforeDialog;
CheckBox.OnAfterDialog = LeafControl.OnAfterDialog;
CheckBox.SetHidden = LeafControl.SetHidden;
function RadioButton() {};
RadioButton.GroupNameId = 0;
RadioButton.GetFormatting = BaseControl.GetFormatting;
RadioButton.GetValueFromControl = function(objControl)
{if (objControl.checked)
{return RadioButton.GetOnValue(objControl);}
else
{return null;}}
RadioButton.SetValueOfControl = function(
objControl,
objValue)
{var strValue = Util.GetPlainTextFromValueObject(objValue);
if (strValue == RadioButton.GetOnValue(objControl))
{objControl.checked = true;}
else
{objControl.checked = false;}}
RadioButton.AddEventLogEntry = function (objControl)
{return EventLog_Add(
0,
objControl,
objControl.id,
"",
RadioButton.GetOnValue(objControl),
false ,
false ,
false ,
0,
1);}
RadioButton.OnClick = function(objControl, objEvent)
{var strOldId = objControl.Id;
if (objControl.checked)
{var boolDidntPostback = RadioButton.AddEventLogEntry(objControl);
LeafControl.OnChange(objControl, objEvent);
if (boolDidntPostback)
{boolDidntPostback = ViewDataNode.OnControlChange(objControl);}}
var objPostReapplyControl = document.getElementById(strOldId);
if (objPostReapplyControl != null)
{LeafControl.OnClick(objControl, objEvent);}}
RadioButton.GetOnValue = function(objControl)
{return RadioButton.GetOnValueFromSnippet(Snippet.GetSnippetElementFromHtml(objControl));}
RadioButton.GetOnValueFromSnippet = function(objSnippetElement)
{;
return (Snippet.GetContent(objSnippetElement)[3])[0];}
RadioButton.OnAfterCreate = function(objViewDataNode)
{;
;}
RadioButton.Render = RadioButton_Render;
function RadioButton_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var templateType = View.GetTemplateType();
var arrTemplate = RadioButton_Template;
if (templateType == 1)
{arrTemplate = RadioButton_PrintTemplate;}
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
true ,
true ,
arrHtmlToInsertBuilder);
if (templateType != 1)
{RadioButton.GroupNameId++;
LeafControl_OutputAttribute("name", "G" + RadioButton.GroupNameId, arrHtmlToInsertBuilder);}
var objServerFormattedValue;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{objServerFormattedValue = BaseControl_GetHtmlValue(objViewDataNode, RadioButton.GetFormatting);}
else
{objServerFormattedValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
if (objServerFormattedValue == RadioButton.GetOnValueFromSnippet(objSnippetElement))
{arrHtmlToInsertBuilder.push("checked");}
else
{if (templateType == 1)
{arrHtmlToInsertBuilder.push(" unchecked=true");}}
arrHtmlToInsertBuilder.push(arrTemplate[1]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
RadioButton.IsFocusable = RadioButton_IsFocusable;
function RadioButton_IsFocusable()
{return true;}
RadioButton.OnChange = LeafControl.OnChange;
RadioButton.OnFocus = LeafControl.OnFocus;
RadioButton.OnBlur = LeafControl.OnBlur;
RadioButton.OnMouseDown = LeafControl.OnMouseDown;
RadioButton.OnMouseUp = LeafControl.OnMouseUp;
RadioButton.OnKeyPress = LeafControl.OnKeyPress;
RadioButton.IsValid = LeafControl.IsValid;
RadioButton.IsSelected = LeafControl.IsSelected;
RadioButton.Select = LeafControl.Select;
RadioButton.UnSelect = LeafControl.UnSelect;
RadioButton.RestoreFocus = LeafControl.RestoreFocus;
RadioButton.Highlight = LeafControl.Highlight;
RadioButton.RemoveHighlight = LeafControl.RemoveHighlight;
RadioButton.OnMouseOver = LeafControl.OnMouseOver;
RadioButton.OnMouseOut = LeafControl.OnMouseOut;
RadioButton.OnBeforeDialog = LeafControl.OnBeforeDialog;
RadioButton.OnAfterDialog = LeafControl.OnAfterDialog;
RadioButton.SetHidden = LeafControl.SetHidden;
function BaseList() {};
BaseList.SetHidden = LeafControl.SetHidden;
BaseList.GetValueFromControl = function(objControl)
{return objControl.value;}
BaseList.SetValueOfControl = function(
objControl,
objValue)
{var strValue = Util.GetPlainTextFromValueObject(objValue);
Util.SetListValue(objControl, strValue);}
BaseList.RefreshControlData = function(
objControl)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objLeafSnippetContent = (Snippet.GetContent(objSnippetElement)[3]);
var objContentViewPath = objLeafSnippetContent[2];
var objDisplayViewPath = objLeafSnippetContent[3];
var objValueViewPath = objLeafSnippetContent[4];
if (objContentViewPath == null || objDisplayViewPath == null || objValueViewPath == null)
{return;}
var objServerFormattedValue = ViewDataNode.GetDatum(objViewDataNode).GetValue();
var boolIsListUnique = BaseList.IsListUnique(objSnippetElement);
;
var objList = new Array();
var arrContentNodes = Expr.vpath_SelectViewPath(objViewDataNode, objContentViewPath);
var mapDisplayNames = null;
if (boolIsListUnique)
{mapDisplayNames = new Array();}
var boolvalueIsInTheList = false;
for (var nContentIndex = 0; nContentIndex < arrContentNodes.length; nContentIndex++)
{var objContentNode = arrContentNodes[nContentIndex];
var boolOutputItem = true;
var arrDisplayNodes = Expr.vpath_SelectViewPath(objContentNode, objDisplayViewPath);
var arrValueNodes = Expr.vpath_SelectViewPath(objContentNode, objValueViewPath);
if (arrDisplayNodes.length == 0)
{arrDisplayNodes.push("");}
if (arrValueNodes.length == 0)
{arrValueNodes.push("");}
var strDisplayName = Util.Trim(ViewDataNode.GetDatum(arrDisplayNodes[0]).GetValue());
if (boolIsListUnique)
{if (mapDisplayNames[strDisplayName] == null)
{mapDisplayNames[strDisplayName] = true;}
else
{boolOutputItem = false;}}
var strValue = Util.Trim(ViewDataNode.GetDatum(arrValueNodes[0]).GetValue());
if (strValue == objServerFormattedValue)
{boolvalueIsInTheList = true;}
if (boolOutputItem)
{objList.push(strValue);
objList.push(strDisplayName);}}
if (!boolvalueIsInTheList && objServerFormattedValue != "")
{objList.unshift(objServerFormattedValue);
objList.unshift(objServerFormattedValue);}
objList.unshift("");
objList.unshift("");
BaseList.ClearList(objControl);
BaseList.PopulateListFromArray(objControl, objList);
BaseList.SetListValue(objControl, objServerFormattedValue);
BaseControl.RefreshVisualState(objControl);}
BaseList.AddEventLogEntry = function (objControl)
{if (objControl.selectedIndex == -1)
{;
return;}
var value = objControl.options[objControl.selectedIndex].value;
return EventLog_Add(
0,
objControl,
objControl.id,
"",
value,
false ,
false ,
false ,
0,
1);}
BaseList.OnChange = function(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var boolDidntPostback = BaseList.AddEventLogEntry(objControl);
LeafControl.OnChange(objControl, objEvent);
if (boolDidntPostback)
{boolDidntPostback = ViewDataNode.OnControlChange(objControl);}}
BaseList.OnAfterCreate = function(objViewDataNode)
{;
;
if (!ViewDataNode.IsValid(objViewDataNode))
{if (ViewDataNode.IsBlank(objViewDataNode))
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{;
ErrorVisualization.ShowAsterisk(objControl);}}}}
BaseList.GetStaticList = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[1];}
BaseList.IsListUnique = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[5];}
BaseList.IsDynamic = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[0];}
BaseList.GetDynamicList = function(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2]);}
BaseList.GetList = function(objViewDataNode)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var boolIsDynamic = BaseList.IsDynamic(objSnippetElement);
if (boolIsDynamic)
{return BaseList.GetDynamicList(objViewDataNode);}
else
{return BaseList.GetStaticList(objSnippetElement);}}
BaseList.ClearList = clearList;
function clearList(objListControl)
{var nIndex = 0;
var objOptions = objListControl.options;
for (nIndex = objOptions.length; nIndex >= 0; nIndex--)
{objOptions[nIndex] = null;}}
BaseList.PopulateListFromArray = function(objListControl, objList)
{;
;
if (objList == null)
{return;}
var nItems = (objList.length) / 2;
for (var nCurrentIndex = 0; nCurrentIndex < nItems; nCurrentIndex++)
{var strValue = objList[nCurrentIndex * 2];
var strDisplay = objList[nCurrentIndex * 2 + 1];
var objOptions = objListControl.options;
var nIndex;
if (objOptions.length < 0)
{nIndex = 0;}
else
{nIndex = objOptions.length;}
var objNewOption = 	new Option(strDisplay, strValue);
objOptions[nIndex] = objNewOption;}}
BaseList.SetListValue = function(objListControl, value)
{Util.SetListValue(objListControl, value);}
function BaseList_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrListTemplate,
templateType)
{var templateType = View.GetTemplateType();
var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrListTemplate[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
true ,
true ,
arrHtmlToInsertBuilder);
var styleAttribute = "direction:" + BaseControl_GetDirectionString(objSnippetElement);
LeafControl_OutputAttribute(" style", styleAttribute, arrHtmlToInsertBuilder);
if (templateType == 1)
{var displayValue = "";
var objServerFormattedValue;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{objServerFormattedValue = BaseControl_GetHtmlValue(objViewDataNode, BaseControl.GetFormatting);}
else
{objServerFormattedValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
var objList = BaseList.GetList(objViewDataNode);
var nItems = (objList.length) / 2;
if (nItems > 0)
{displayValue = objList[1];}
for (var nCurrentIndex = 0; nCurrentIndex < nItems; nCurrentIndex++)
{var strValue = objList[nCurrentIndex * 2];
var strDisplay = objList[nCurrentIndex * 2 + 1];
if (objServerFormattedValue == strValue)
{displayValue = strDisplay;}}
LeafControl_OutputAttribute("value", displayValue, arrHtmlToInsertBuilder);}
arrHtmlToInsertBuilder.push(arrListTemplate[1]);
if (templateType != 1)
{;
var objServerFormattedValue;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{objServerFormattedValue = BaseControl_GetHtmlValue(objViewDataNode, BaseControl.GetFormatting);}
else
{objServerFormattedValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
var objList = BaseList.GetList(objViewDataNode);
var nItems = (objList.length) / 2;
for (var nCurrentIndex = 0; nCurrentIndex < nItems; nCurrentIndex++)
{var strValue = objList[nCurrentIndex * 2];
var strDisplay = objList[nCurrentIndex * 2 + 1];
arrHtmlToInsertBuilder.push("<option value=");
arrHtmlToInsertBuilder.push(StAttrQuote(strValue));
if (objServerFormattedValue == strValue)
{arrHtmlToInsertBuilder.push(" selected>");}
else
{arrHtmlToInsertBuilder.push("\>");}
arrHtmlToInsertBuilder.push(STSHtmlEncode(strDisplay));
arrHtmlToInsertBuilder.push("</option>");}}
arrHtmlToInsertBuilder.push(arrListTemplate[3]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
BaseList.OnBeforeDialog = BaseList_OnBeforeDialog;
function BaseList_OnBeforeDialog(objControl)
{if (UserAgentInfo.strBrowser == 1)
{var boolDisabled = objControl.getAttribute("disabled");
if (!boolDisabled)
{objControl.setAttribute("disabledBackup", boolDisabled);
var disableFunction = BaseControl.FindFunction(objControl, "SetDisable", true);
disableFunction(objControl, true);}}}
BaseList.OnAfterDialog = BaseList_OnAfterDialog;
function BaseList_OnAfterDialog(objControl)
{if (UserAgentInfo.strBrowser == 1)
{var boolDisabled = objControl.getAttribute("disabledBackup");
if (!boolDisabled)
{objControl.removeAttribute("disabledBackup");
var disableFunction = BaseControl.FindFunction(objControl, "SetDisable", true);
disableFunction(objControl, false);}}}
function DropDownList() {};
DropDownList.GetFormatting = BaseControl.GetFormatting;
DropDownList.GetValueFromControl = BaseList.GetValueFromControl;
DropDownList.SetValueOfControl = BaseList.SetValueOfControl;
DropDownList.AddEventLogEntry = BaseList.AddEventLogEntry;
DropDownList.OnChange = BaseList.OnChange;
DropDownList.OnAfterCreate = BaseList.OnAfterCreate;
DropDownList.SetHidden = BaseList.SetHidden;
DropDownList.RefreshControlData = BaseList.RefreshControlData;
DropDownList.Render = DropDownList_Render;
function DropDownList_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var templateType = View.GetTemplateType();
var arrTemplate = DropDownList_Template;
if (templateType == 1)
{arrTemplate = DropDownList_PrintTemplate;}
BaseList_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate,
templateType);}
DropDownList.IsFocusable = DropDownList_IsFocusable;
function DropDownList_IsFocusable()
{return true;}
DropDownList.OnBeforeDialog = BaseList.OnBeforeDialog;
DropDownList.OnAfterDialog = BaseList.OnAfterDialog;
DropDownList.OnClick = LeafControl.OnClick;
DropDownList.OnBlur = LeafControl.OnBlur;
DropDownList.OnFocus = LeafControl.OnFocus;
DropDownList.OnMouseDown = LeafControl.OnMouseDown;
DropDownList.OnMouseUp = LeafControl.OnMouseUp;
DropDownList.OnKeyPress = LeafControl.OnKeyPress;
DropDownList.IsValid = LeafControl.IsValid;
DropDownList.IsSelected = LeafControl.IsSelected;
DropDownList.Select = LeafControl.Select;
DropDownList.UnSelect = LeafControl.UnSelect;
DropDownList.RestoreFocus = LeafControl.RestoreFocus;
DropDownList.Highlight = LeafControl.Highlight;
DropDownList.RemoveHighlight = LeafControl.RemoveHighlight;
DropDownList.OnMouseOver = LeafControl.OnMouseOver;
DropDownList.OnMouseOut = LeafControl.OnMouseOut;
DropDownList.OnBeforeDialog = function(objControl)
{if (UserAgentInfo.strBrowser == 1)
{var objIFrame = IFrameUtils.InsertIframe(objControl, objControl.id + "_PostbackIFrame", false , "40");
IFrameUtils.PlaceIFrameBehindControl(objControl, objIFrame);
objIFrame.style.left = ErrorVisualization.ComputeAbsoluteLeft(objControl);;}
BaseList.OnBeforeDialog(objControl);}
DropDownList.OnAfterDialog = function(objControl)
{if (UserAgentInfo.strBrowser == 1)
{IFrameUtils.HideIFrame(objControl.id + "_PostbackIFrame");}
BaseList.OnAfterDialog(objControl);}
Hyperlink.arrAllowedProtocols = [
"http://",
"https://",
"file://",
"file:\\\\",
"ftp://",
"mailto:",
"msn:",
"news:",
"nntp:",
"pnm://",
"mms://",
"outlook:"
];
function Hyperlink()
{}
Hyperlink.GetFormatting = BaseControl.GetFormatting;
Hyperlink.GetValueFromControl = function(objControl)
{return null;}
Hyperlink.SetValueOfControl = function(
objControl,
strValue)
{}
function Hyperlink_IsSafeHref(strHref)
{var boolSafeHref = false;
for (var nProtocolIndex in Hyperlink.arrAllowedProtocols)
{if (strHref.indexOf(Hyperlink.arrAllowedProtocols[nProtocolIndex]) == 0)
{boolSafeHref = true;
break;}}
return boolSafeHref;}
function Hyperlink_SafeSetHref(objControl, strHref)
{if (Hyperlink_IsSafeHref(strHref))
{objControl.setAttribute("href", strHref);}
else
{objControl.setAttribute("href", "");}}
Hyperlink.RefreshControlData = function(
objControl)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var objContextViewDataNode = ViewDataNode.GetParent(objViewDataNode);
var funcComputeHref = Hyperlink_GetHrefFunction(objSnippetElement);
var funcComputeDisplay = Hyperlink_GetDisplayFunction(objSnippetElement);
if (funcComputeHref != null)
{var strHref = Expr.String(Expr_Evaluate(funcComputeHref, objContextViewDataNode, 0));
Hyperlink_SafeSetHref(objControl, strHref);}
if (funcComputeDisplay != null)
{var strDisplay = Expr.String(Expr_Evaluate(funcComputeDisplay, objContextViewDataNode, 0));
Util.SetInnerText(objControl, strDisplay);}}
Hyperlink.SetDisable = function(objControl, boolDisable)
{}
Hyperlink.OnAfterCreate = function(objViewDataNode)
{;
;}
Hyperlink.RestoreFocus = Hyperlink_RestoreFocus;
function Hyperlink_RestoreFocus(objControl)
{;
LeafControl.RestoreFocus(objControl);
objControl.focus();
objControl.focus();}
function Hyperlink_HasDynamicDisplay(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[0] == 1;}
function Hyperlink_GetHrefFunction(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[1];}
function Hyperlink_GetDisplayFunction(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[2];}
function Hyperlink_GetStaticDisplayArray(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[3];}
function Hyperlink_GetChildSnippets(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[4];}
function Hyperlink_GetHref(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[0];}
function Hyperlink_GetDisplay(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[1];}
function Hyperlink_GetChildViewDataNodes(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[2];}
Hyperlink.Render = Hyperlink_Render;
function Hyperlink_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var strHref = Hyperlink_GetHref(objViewDataNode);
var strDisplay = Hyperlink_GetDisplay(objViewDataNode);
if (!Hyperlink_IsSafeHref(strHref))
{strHref = "";}
var templateType = View.GetTemplateType();
var arrTemplate;
if (Hyperlink_HasDynamicDisplay(objSnippetElement))
{arrTemplate = HyperLink_Template_DynamicDisplay;
if (templateType == 1)
{arrTemplate = HyperLink_PrintTemplate_DynamicDisplay;}}
else
{arrTemplate = HyperLink_Template_StaticDisplay;
if (templateType == 1)
{arrTemplate = HyperLink_PrintTemplate_StaticDisplay;}}
var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[0]);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
false ,
true ,
arrHtmlToInsertBuilder);
LeafControl_OutputAttribute("href", strHref, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[1]);
if (!Hyperlink_HasDynamicDisplay(objSnippetElement))
{var arrStaticDisplayArray = Hyperlink_GetStaticDisplayArray(objSnippetElement);
var arrSnippetCollectionContent = Hyperlink_GetChildSnippets(objSnippetElement);
var arrViewDataChildNodes = Hyperlink_GetChildViewDataNodes(objViewDataNode);
Container.RenderSpecialValue(
objViewDataNode,
arrHtmlToInsertBuilder,
arrStaticDisplayArray,
arrSnippetCollectionContent,
arrViewDataChildNodes,
strHtmlId);}
else
{;
arrHtmlToInsertBuilder.push(STSHtmlEncode(strDisplay));}
arrHtmlToInsertBuilder.push(arrTemplate[3]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
Hyperlink.IsFocusable = Hyperlink_IsFocusable;
function Hyperlink_IsFocusable()
{return true;}
Hyperlink.OnClick = function(objControl, objEvent)
{LeafControl.OnClick(objControl, objEvent);
return true;}
Hyperlink.OnFocus = function (objControl, objEvent)
{;
LeafControl.OnFocus(objControl, objEvent);}
Hyperlink.OnMouseOver = LeafControl.OnMouseOver;
Hyperlink.OnMouseOut = LeafControl.OnMouseOut;
Hyperlink.OnMouseDown = LeafControl.OnMouseDown;
Hyperlink.OnMouseUp = LeafControl.OnMouseUp;
Hyperlink.OnKeyPress = LeafControl.OnKeyPress;
Hyperlink.IsValid = LeafControl.IsValid;
Hyperlink.OnBlur = LeafControl.OnBlur;
Hyperlink.IsSelected = LeafControl.IsSelected;
Hyperlink.Select = LeafControl.Select;
Hyperlink.UnSelect = LeafControl.UnSelect;
Hyperlink.Highlight = LeafControl.Highlight;
Hyperlink.RemoveHighlight = LeafControl.RemoveHighlight;
function ListBox() {};
ListBox.GetFormatting = BaseControl.GetFormatting;
ListBox.GetValueFromControl = BaseList.GetValueFromControl;
ListBox.SetValueOfControl = BaseList.SetValueOfControl;
ListBox.AddEventLogEntry = BaseList.AddEventLogEntry;
ListBox.OnChange = BaseList.OnChange;
ListBox.OnAfterCreate = function(objViewDataNode)
{;
;
if (UserAgentInfo.strBrowser != 1)
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{var objWrapper = LeafControl.GetWrappingSpan(objControl);
objWrapper.style.fontSize = objControl.offsetHeight * 0.82;}}
BaseList.OnAfterCreate(objViewDataNode)}
ListBox.RefreshControlData = BaseList.RefreshControlData;
ListBox.Render = ListBox_Render;
function ListBox_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var templateType = View.GetTemplateType();
var arrTemplate = ListBox_Template;
if (templateType == 1)
{arrTemplate = ListBox_PrintTemplate;}
BaseList_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate,
templateType);}
ListBox.IsFocusable =ListBox_IsFocusabl;
function ListBox_IsFocusabl()
{return true;}
ListBox.OnBeforeDialog = BaseList.OnBeforeDialog;
ListBox.OnAfterDialog = BaseList.OnAfterDialog;
ListBox.OnClick = LeafControl.OnClick;
ListBox.OnBlur = LeafControl.OnBlur;
ListBox.OnFocus = LeafControl.OnFocus;
ListBox.OnMouseDown = LeafControl.OnMouseDown;
ListBox.OnMouseUp = LeafControl.OnMouseUp;
ListBox.OnKeyPress = LeafControl.OnKeyPress;
ListBox.IsValid = LeafControl.IsValid;
ListBox.IsSelected = LeafControl.IsSelected;
ListBox.Select = LeafControl.Select;
ListBox.UnSelect = LeafControl.UnSelect;
ListBox.RestoreFocus = LeafControl.RestoreFocus;
ListBox.Highlight = LeafControl.Highlight;
ListBox.RemoveHighlight = LeafControl.RemoveHighlight;
ListBox.OnMouseOver = LeafControl.OnMouseOver;
ListBox.OnMouseOut = LeafControl.OnMouseOut;
ListBox.OnBeforeDialog = BaseList.OnBeforeDialog;
ListBox.OnAfterDialog = BaseList.OnAfterDialog;
ListBox.SetHidden = BaseList.SetHidden;
function StructuralEditingControl() {}
StructuralEditingControl._intNewSectionIDCounter = 0;
StructuralEditingControl._intNewMultipleBindingIDCounter = -2;
function StructuralEditingControl_OnStructuralEdit()
{HoverMenu_ResetWidgetMap();}
StructuralEditingControl.ResolveSpecialValue = StructuralEditingControl_ResolveSpecialValue;
function StructuralEditingControl_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{var objResult = BaseControl.ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId);
if (objResult == null)
{if (nSpecialValue == 6)
{objResult = StructuralEditingControl.GetTitle(objSnippetElement);}
else if (nSpecialValue == 7)
{objResult = StructuralEditingControl.GetAlign(objSnippetElement);}
if (objResult != null)
{objResult = StAttrQuote(objResult);}}
return objResult;}
StructuralEditingControl.GetTitle = function(objSnippetElement)
{var strValue = Snippet.GetContent(objSnippetElement)[5];
if (Util.IsNonEmptyString(strValue))
{return strValue;}
else
{return null;}}
StructuralEditingControl.GetAlign = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[6];}
StructuralEditingControl.GetMinChildCount = function(
objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[7];}
StructuralEditingControl.GetMaxChildCount = function(
objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[8];}
StructuralEditingControl.DetermineChildCountValidity = function(
objCollectionControl,
intPotentialNewCount)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var varMinCount = StructuralEditingControl.GetMinChildCount(objSnippetElement);
var varMaxCount = StructuralEditingControl.GetMaxChildCount(objSnippetElement);
if (Util.GetDataType(varMinCount) == 1
&& Util.GetDataType(varMaxCount) == 1)
{var boolValid = intPotentialNewCount >= varMinCount && intPotentialNewCount <= varMaxCount;
return boolValid ? XsdDatatype.k_intValid : XsdDatatype.k_intInvalid;}
if (Util.GetDataType(varMinCount) == 1
&& Util.GetDataType(varMaxCount) == 2 && varMaxCount.toLowerCase() == "unbounded")
{var boolValid = intPotentialNewCount >= varMinCount;
return boolValid ? XsdDatatype.k_intValid : XsdDatatype.k_intInvalid;}
return XsdDatatype.k_intValidityUnknown;}
StructuralEditingControl.GetChildCount = function(
objCollectionControl)
{var arrChildControls;
arrChildControls = BaseControl.GetChildInfoPathControls(objCollectionControl);
return (arrChildControls == null ? 0 : arrChildControls.length);}
function StructuralEditingControl_Remove(objSectionControl, strXmlToEdit, strEventId, boolRestoreFocus)
{var objCollectionControl;
var strCollectionControlID;
;
if (objSectionControl == null)
{SelectionService.Select(null);
return false;}
strCollectionControlID = BaseControl.GetContainerId(objSectionControl.id);
objCollectionControl = document.getElementById(strCollectionControlID);
;
if (objCollectionControl == null)
{return false;}
var intChildCount = StructuralEditingControl.GetChildCount(objCollectionControl);
var intValidity = StructuralEditingControl.DetermineChildCountValidity(objCollectionControl, intChildCount - 1);
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
g_rgControlsTabOrder = null;
if (intValidity == XsdDatatype.k_intInvalid)
{var intMinChildCountAllowed = StructuralEditingControl.GetMinChildCount(objSnippetElement);
UserMessages.ShowAlertMessage(Util.FormatString(IntlCoreStrings.k_strValidationMinChildCountFormat, intMinChildCountAllowed), true);
return false;}
var boolDelete = false;
boolDelete = UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strConfirmRemoveSection, true);
if (boolDelete)
{StructuralEditingControl_OnStructuralEdit();
var objDeletedRootViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objSectionControl);
var strCollectionControlID = BaseControl.GetContainerId(objSectionControl.id);
var objCollectionControl = document.getElementById(strCollectionControlID);
if (!EventLog_Add(
strEventId,
objCollectionControl,
objSectionControl.id,
"",
"",
intValidity == XsdDatatype.k_intValidityUnknown && enumRoundTripModel != 2 ,
false ,
false ,
1,
3))
{return false;}
var objNextControl = objSectionControl;
var objNextFocusableControl = null;
var objControl = BaseControl.GetNextSiblingInfoPathControl(objSectionControl);
if (objControl == null)
{objControl = BaseControl.GetPreviousSiblingInfoPathControl(objSectionControl);}
if (objControl != null)
{objNextFocusableControl = BaseControl.FindFirstFocusableControl(objControl, ViewDataNode.GetViewDataNodeFromHtml(objControl));}
ViewDataNode.MarkSubtreeAsDeleted(objDeletedRootViewDataNode);
if (!ViewDataNode_OnStructuralChange(
objDeletedRootViewDataNode,
enumRoundTripModel != 2 ,
false ))
{return false;}
ViewDataNode.Delete(objDeletedRootViewDataNode);
objCollectionControl = document.getElementById(strCollectionControlID);
;
objSectionControl = document.getElementById(objSectionControl.id);
;
if (UserAgentInfo.strBrowser == 2)
{try
{SelectionService.objSelectedControl.blur();}
catch(e)
{}}
SelectionService.Select(null);
;
if (objCollectionControl != null && objSectionControl.parentNode != null)
{;
objCollectionControl.removeChild(objSectionControl);}
ErrorVisualization.UpdateAllAsterisks();
if (boolRestoreFocus)
{if (objNextFocusableControl == null && objCollectionControl != null)
{objNextControl = objCollectionControl;
do
{objNextFocusableControl = BaseControl.FindFirstFocusableControl(objNextControl, ViewDataNode.GetViewDataNodeFromHtml(objNextControl));
objNextControl = BaseControl.GetParentInfoPathControl(objNextControl);}
while (objNextFocusableControl == null && objNextControl != null)}
else if (objNextFocusableControl != null)
{objNextFocusableControl = document.getElementById(objNextFocusableControl.id);}
if (objNextFocusableControl != null)
{var funcRestoreFocus = BaseControl.FindFunction(objNextFocusableControl, "RestoreFocus", true );
funcRestoreFocus(objNextFocusableControl);}}}
return boolDelete && intValidity == XsdDatatype.k_intValid;}
StructuralEditingControl.InsertRelative = StructuralEditingControl_InsertRelative;
function StructuralEditingControl_InsertRelative(
intEventID,
fBefore,
objSectionControlRelative,
objCollectionControl,
strXmlToEdit)
{if (objCollectionControl == null)
{;
return false;}
var objCollectionViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);
var objCollectionSnippetElement = ViewDataNode_GetSnippetElement(objCollectionViewDataNode);
var intChildCount = StructuralEditingControl.GetChildCount(objCollectionControl);
var intValidity = StructuralEditingControl.DetermineChildCountValidity(objCollectionControl, intChildCount + 1);
if (intValidity == XsdDatatype.k_intInvalid)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);
var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var intMaxChildCountAllowed = StructuralEditingControl.GetMaxChildCount(objSnippetElement);
UserMessages.ShowAlertMessage(Util.FormatString(IntlCoreStrings.k_strValidationMaxChildCountFormat, intMaxChildCountAllowed), true);
return false;}
var arrHtmtTemplateToInsert		= IP_Collection.GetHtmlTemplate(objCollectionSnippetElement);
var objSnippetElementToInsert	= IP_Collection.GetContainerSnippet(objCollectionSnippetElement);
var objViewDataNodeToInsertOrig	= IP_Collection.GetDataToInsert(objCollectionSnippetElement);
var objViewDataNodeToInsert		= Util.Clone(objViewDataNodeToInsertOrig);
g_rgControlsTabOrder = null;
var objNewSectionControl = null;
if (!(Snippet.GetRoundTripModel(objCollectionSnippetElement) == 1)
&& objViewDataNodeToInsert != null)
{(objViewDataNodeToInsert._objViewDataNodeParent = objCollectionViewDataNode);
g_objMultipleBindingMap = new Array();
g_objMultipleBindingIdMap = new Array();
Container_InitializeViewDataNodes(
objCollectionViewDataNode,
objSnippetElementToInsert,
objViewDataNodeToInsert);
StructuralEditingControl._InsertRelativeIntoViewData(
fBefore,
objSectionControlRelative,
objViewDataNodeToInsert,
objCollectionViewDataNode);
var strHtml = StructuralEditingControl._RenderHtml(
objViewDataNodeToInsert,
objSnippetElementToInsert,
objCollectionControl,
arrHtmtTemplateToInsert);
objNewSectionControl = StructuralEditingControl._InsertRelativeIntoHtml(
strHtml,
fBefore,
objSectionControlRelative,
objCollectionControl);
g_objMultipleBindingMap = null;
g_objMultipleBindingIdMap = null;
;}
StructuralEditingControl_OnStructuralEdit();
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElementToInsert);
if (objNewSectionControl == null)
{;
if (g_objCurrentFormDataSelection != null)
{g_objCurrentFormDataSelection.BackupFocusForStructural(
objCollectionControl,
objSectionControlRelative,
fBefore);}
var boolDidntPostback = EventLog_Add(
intEventID,
objCollectionControl,
objCollectionControl.id,
objSectionControlRelative == null ? "" : objSectionControlRelative.id,
StructuralEditingControl._CreateNewId(objCollectionControl.id),
enumRoundTripModel != 2 ,
false ,
false ,
Snippet.GetPostbackReason(objCollectionSnippetElement),
2);
return boolDidntPostback;}
else
{if (!EventLog_Add(
intEventID,
objCollectionControl,
objCollectionControl.id,
objSectionControlRelative == null ? "" : objSectionControlRelative.id,
objNewSectionControl.id,
intValidity == XsdDatatype.k_intValidityUnknown && enumRoundTripModel != 2 ,
false ,
false ,			1,
2))
{return false;}
var objCollectionViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);
ViewDataNode.FireOnAfterCreate(objViewDataNodeToInsert);
var objSignatureControl = BaseControl.GetNextSiblingInfoPathControl(objCollectionControl)
if (objSignatureControl != null && objSignatureControl.getAttribute("ScriptClass") == "InDocSign")
{InDocSign.ShowClickToSignLink(objSignatureControl, true );}
ViewDataNode.boolErrorVisRefreshNeeded = true;
if (!ViewDataNode_OnStructuralChange(
objViewDataNodeToInsert,
enumRoundTripModel != 2 ,
true ))
{return false;}
if (!ViewDataNode.IsHidden(objCollectionViewDataNode))
{objNewSectionControl = document.getElementById(objNewSectionControl.id);
if (objNewSectionControl != null)
{StructuralEditingControl.FocusNewContainer(objNewSectionControl);}}
return intValidity == XsdDatatype.k_intValid;}}
StructuralEditingControl._CreateNewId = StructuralEditingControl_CreateNewId;
function StructuralEditingControl_CreateNewId(
strBaseId)
{var strId = strBaseId + "_" +
"New" + StructuralEditingControl._intNewSectionIDCounter;
StructuralEditingControl._intNewSectionIDCounter++;
return strId;}
StructuralEditingControl._CreateNewMBId = StructuralEditingControl_CreateNewMBId;
function StructuralEditingControl_CreateNewMBId()
{return StructuralEditingControl._intNewMultipleBindingIDCounter--;}
StructuralEditingControl._IsIdCreatedClientSide = StructuralEditingControl_IsIdCreatedClientSide;
function StructuralEditingControl_IsIdCreatedClientSide(
strId)
{return strId.indexOf("New") != -1;}
StructuralEditingControl._RenderHtml = function(
objViewDataNodeToInsert,
objSnippetElementToInsert,
objCollectionControl,
arrHtmtTemplateToInsert)
{var strHtml				= "";
var arrGeneratedHtml	= new Array();
var strClientId			= StructuralEditingControl._CreateNewId(objCollectionControl.id);
var funcRender = BaseControl.FindFunctionOnSnippet(objSnippetElementToInsert, "Render");
funcRender(
objViewDataNodeToInsert,
objSnippetElementToInsert,
strClientId,
arrHtmtTemplateToInsert,
arrGeneratedHtml);
if (arrGeneratedHtml.length == 0)
{return;}
strHtml = arrGeneratedHtml.join("");
;
return strHtml;}
StructuralEditingControl._InsertRelativeIntoViewData = function(
fBefore,
objSectionControlRelative,
objViewDataNodeToInsert,
objCollectionViewDataNode)
{var arrCollectionChildDataNodes = IP_Collection.GetChildViewDataNodes(objCollectionViewDataNode);
if (objSectionControlRelative == null)
{arrCollectionChildDataNodes.push(objViewDataNodeToInsert);}
else
{var intPositionToInsert = 0;
var objRelativeViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objSectionControlRelative);
var intPositionRelativeNode = Util.IndexOf(arrCollectionChildDataNodes, objRelativeViewDataNode);
;
if (fBefore)
{intPositionToInsert = intPositionRelativeNode;}
else
{intPositionToInsert = intPositionRelativeNode + 1;}
var arrNewViewDataNodes = Util.InsertAt(arrCollectionChildDataNodes, objViewDataNodeToInsert, intPositionToInsert);
IP_Collection.SetChildViewDataNodes(objCollectionViewDataNode, arrNewViewDataNodes);}}
StructuralEditingControl._InsertRelativeIntoHtml = function(
strHtml,
fBefore,
objSectionControlRelative,
objCollectionControl)
{var objNewDiv = document.createElement("DIV");
;
if (objNewDiv == null)
{return null;}
if (objCollectionControl.getAttribute("ScriptClass") == "RepeatingTable")
{objNewDiv.innerHTML = "<TABLE><TBODY>" + strHtml + "</TBODY></TABLE>";
var objNewSectionControl = objNewDiv.firstChild.firstChild.firstChild;}
else
{objNewDiv.innerHTML = strHtml;
var objNewSectionControl = objNewDiv.firstChild;}
StructuralEditingControl.UpdateBackgroundImagePath(objNewSectionControl);
var objSectionControl = null;
if (!fBefore && objSectionControlRelative != null)
{objSectionControl = objSectionControlRelative.nextSibling;}
else
{objSectionControl = objSectionControlRelative;}
if (objSectionControl == null)
{objCollectionControl.appendChild(objNewSectionControl);}
else
{objCollectionControl.insertBefore(objNewSectionControl, objSectionControl);}
return objNewSectionControl;}
StructuralEditingControl.UpdateBackgroundImagePath = StructuralEditingControl_UpdateBackgroundImagePath;
function StructuralEditingControl_UpdateBackgroundImagePath(objControl)
{if (objControl.style != null && objControl.style.backgroundImage != "" && objControl.style.backgroundImage != "none")
{var iOpenParen = objControl.style.backgroundImage.indexOf("(") + 1;
var strRelativeUrl = objControl.style.backgroundImage.substring(iOpenParen, objControl.style.backgroundImage.length - iOpenParen);
if (strRelativeUrl.indexOf(CurrentFormData.ServerUrl()) == -1)
{objControl.style.backgroundImage = "url(" + CurrentFormData.ServerUrl() + strRelativeUrl + ")";}}
var iChildren;
for (iChildren = 0; iChildren < objControl.childNodes.length; iChildren++)
{StructuralEditingControl.UpdateBackgroundImagePath(objControl.childNodes[iChildren]);}};
StructuralEditingControl.FocusNewContainer = StructuralEditingControl_FocusNewContainer;
function StructuralEditingControl_FocusNewContainer(objContainerControl)
{var objChildControl = BaseControl.FindFirstFocusableChildControl(objContainerControl);
if (objChildControl != null)
{window.setTimeout(
"StructuralEditingControl_FocusNewContainerHelper('" + objChildControl.id + "')",
10);}
else
{window.setTimeout("SelectionService.Select(document.getElementById('" + objContainerControl.id + "'))", 10);}}
function StructuralEditingControl_FocusNewContainerHelper(strChildControlId)
{var objChildControl = document.getElementById(strChildControlId);
if (objChildControl != null)
{var funcRestoreFocus = BaseControl.FindFunction(objChildControl, "RestoreFocus", true );
if (funcRestoreFocus != null)
{funcRestoreFocus(objChildControl);}}}
StructuralEditingControl.IsSigned = StructuralEditingControl_IsSigned;
function StructuralEditingControl_IsSigned(objCollectionViewDataNode)
{return ViewDataNode.IsSigned(objCollectionViewDataNode);}
StructuralEditingControl.IsReadOnly = StructuralEditingControl_IsReadOnly;
function StructuralEditingControl_IsReadOnly(objControl)
{var objViewDataNode = ViewDataNode_GetViewDataNodeFromHtml(objControl);
return StructuralEditingControl_IsSigned(objViewDataNode) || (Collection_GetCollectionContent(CurrentFormData.ViewDataTree())[0] == 1);}
function xCollectionControl() {}
xCollectionControl.InsertBefore = function(strSectionControlBefore, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objCollectionControl;
var objNewSectionControl;
var strCollectionControlID;
var objSectionControlBefore = document.getElementById(strSectionControlBefore);
;
if (objSectionControlBefore == null)
{return false;}
strCollectionControlID = BaseControl.GetContainerId(objSectionControlBefore.id);
objCollectionControl = document.getElementById(strCollectionControlID);
;
if (objCollectionControl == null)
{return false;}
return xCollectionControl._InsertRelative(true,objSectionControlBefore, objCollectionControl, strXmlToEdit);}
xCollectionControl.InsertAfter = function(strSectionControlAfter, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objCollectionControl;
var objNewSectionControl;
var strCollectionControlID;
var objSectionControlAfter = document.getElementById(strSectionControlAfter);
;
if (objSectionControlAfter == null)
{return false;}
strCollectionControlID = BaseControl.GetContainerId(objSectionControlAfter.id);
objCollectionControl = document.getElementById(strCollectionControlID);
;
if (objCollectionControl == null)
{return false;}
return xCollectionControl._InsertRelative(false,objSectionControlAfter, objCollectionControl, strXmlToEdit);}
xCollectionControl.Insert = function(strCollectionControl, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objCollectionControl = document.getElementById(strCollectionControl);
;
if (objCollectionControl == null)
{return false;}
return xCollectionControl._InsertRelative(false,null, objCollectionControl, strXmlToEdit);}
xCollectionControl.Remove = function(strSectionControl, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objSectionControl = document.getElementById(strSectionControl);
return StructuralEditingControl_Remove(objSectionControl, strXmlToEdit, 4, true );}
xCollectionControl.RemoveAll = function(strContainerControlId, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{SelectionService.Select(null);
return;}
var objCollectionControl;
var strCollectionControlId;
var objContainerControl = document.getElementById(strContainerControlId);
;
if (objContainerControl == null)
{return false;}
strCollectionControlId = BaseControl.GetContainerId(objContainerControl.id);
objCollectionControl = document.getElementById(strCollectionControlId);
;
if (objCollectionControl == null)
{return false;}
var arrChildContainer;
var boolDelete = false;
boolDelete = UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strConfirmRemoveAll, true);
if (boolDelete)
{StructuralEditingControl_OnStructuralEdit();
if (!EventLog_Add(
5,
objCollectionControl,
strCollectionControlId,
"",
"",
false ,
false ,
false ,
0,
3))
{return false;}
var objSnippetElement = Snippet.GetSnippetElementFromHtml(objCollectionControl);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
arrChildContainer = BaseControl.GetChildInfoPathControls(objCollectionControl);
for (var intChildContainer=0; intChildContainer < arrChildContainer.length; intChildContainer++)
{var objChildContainer = arrChildContainer[intChildContainer];
var strScriptClass = objChildContainer.getAttribute("ScriptClass");
;
var objDeletedRootViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objChildContainer);
ViewDataNode.MarkSubtreeAsDeleted(objDeletedRootViewDataNode);
if (!ViewDataNode_OnStructuralChange(
objDeletedRootViewDataNode,
enumRoundTripModel != 2 ,
false ))
{return false;}
ViewDataNode.Delete(objDeletedRootViewDataNode);
SelectionService.Select(null);
objCollectionControl.removeChild(objChildContainer);}
var objNextControl = objCollectionControl;
var objNextFocusableControl = null;
do
{objNextFocusableControl = BaseControl.FindFirstFocusableControl(objNextControl, ViewDataNode.GetViewDataNodeFromHtml(objNextControl));
objNextControl = BaseControl.GetParentInfoPathControl(objNextControl);}
while (objNextFocusableControl == null && objNextControl != null)
if (objNextFocusableControl != null)
{var funcRestoreFocus = BaseControl.FindFunction(objNextFocusableControl, "RestoreFocus", true );
funcRestoreFocus(objNextFocusableControl);}}}
xCollectionControl._InsertRelative = function(
fBefore,
objSectionControlRelative,
objCollectionControl,
strXmlToEdit)
{var intEventID;
if (objSectionControlRelative == null)
{intEventID = 2;}
else if (fBefore)
{intEventID = 2;}
else
{intEventID = 3;}
return StructuralEditingControl.InsertRelative(
intEventID,
fBefore,
objSectionControlRelative,
objCollectionControl,
strXmlToEdit);}
xCollectionControl.IsSigned = StructuralEditingControl_IsSigned;
function Container() {}
Container.OnClick = function(objControl, objEvent)
{;
BaseControl.OnClick(objControl, objEvent);
Util.StopEventProprogation(objEvent);
;}
Container.OnFocus = function(objControl, objEvent)
{Util.StopEventProprogation(objEvent);
return false;}
Container.OnBlur = function(objControl, objEvent)
{}
Container.ShowWidget = function(objControl, intHighlightState)
{var objCollectionControl = BaseControl.GetParentInfoPathControl(objControl);
if (objCollectionControl == null)
{return;}
var objViewDataNode			= ViewDataNode.GetViewDataNodeFromHtml(objCollectionControl);
var arrViewDataNodeChildren	= ViewDataNode.GetChildNodes(objViewDataNode);
var boolUseChildViewDataNode = false;
var objChildViewDataNode = null;
if (arrViewDataNodeChildren.length > 0)
{var arrViewDataNodeGrandChildren = ViewDataNode.GetChildNodes(arrViewDataNodeChildren[0]);
if (arrViewDataNodeGrandChildren.length > 0)
{objChildViewDataNode = arrViewDataNodeGrandChildren[0];
var objChildSnippetElement = ViewDataNode_GetSnippetElement(objChildViewDataNode);
if (Snippet.GetScriptClass(objChildSnippetElement) == "RichTextBox")
{boolUseChildViewDataNode = true;}}}
if (boolUseChildViewDataNode && UserAgentInfo.strBrowser == 1)
{return;}
if (boolUseChildViewDataNode)
{objViewDataNode	= objChildViewDataNode;}
if (!ViewDataNode.IsDisabled(objViewDataNode))
{if (boolUseChildViewDataNode || HoverMenu_ShouldShowWidget(objControl))
{var strWidgetID = objControl.id + "_" + "Widget";
var objWidget = document.getElementById(strWidgetID);
var boolOptional = false;
var boolRichText = false;
var boolTable = false;
var boolFileAttachment = false;
if (objWidget != null && objWidget.style != null)
{var strScriptClass = objCollectionControl.getAttribute("ScriptClass");
var strImgPos;
if (strScriptClass == "Section")
{boolOptional = true;}
else if (strScriptClass == "RichTextCollection")
{boolRichText = true;}
else if (strScriptClass == "RepeatingTable")
{boolTable = true;}
else if (strScriptClass == "FileAttachmentCollection")
{boolFileAttachment = true;}
if (boolOptional)
{strImgPos = SelectionService.IsIpInState(intHighlightState) ? "-57 -3" : "-129 -3";}
else if (boolRichText)
{strImgPos = SelectionService.IsIpInState(intHighlightState) ? "-75 -3" : "-147 -3";}
else if (boolFileAttachment)
{strImgPos = SelectionService.IsIpInState(intHighlightState) ? "-2 -3": "-93 -3";}
else
{strImgPos = SelectionService.IsIpInState(intHighlightState) ? "-165 -3" : "-111 -3";}
if (boolTable && objWidget.style.display == "none")
{var parent = objWidget.parentNode;
var parentParent = parent.parentNode;
parentParent.removeChild(parent);
parentParent.appendChild(parent);}
objWidget.childNodes[0].childNodes[0].style.backgroundPosition = strImgPos;
objWidget.style.display = "block";
;}}}}
Container.HideWidget = function(objControl)
{HoverMenu.HideMenu();
var strWidgetID = objControl.id + "_" + "Widget";
var objWidget = document.getElementById(strWidgetID);
if (objWidget != null && objWidget.style != null)
{objWidget.style.display = "none";
;}}
Container.Highlight = function(objControl, boolSticky)
{BaseControl.Highlight(objControl, boolSticky);
Container.ShowWidget(objControl, SelectionService.GetHighlightState(objControl));}
Container.RemoveHighlight = function(objControl, boolSticky)
{BaseControl.RemoveHighlight(objControl, boolSticky);
var intHighlightState = SelectionService.GetHighlightState(objControl);
;
if (SelectionService.IsIpInState(intHighlightState) || SelectionService.IsHoverInState(intHighlightState))
{Container.ShowWidget(objControl, intHighlightState);}
else
{Container.HideWidget(objControl);}}
Container.Select = function(objControl)
{BaseControl.Select(objControl);}
Container.UnSelect = function(objControl)
{BaseControl.UnSelect(objControl);}
Container.GetChildSnippetElements = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[0];}
Container.GetMenuTopOffset = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[1][0];}
Container.GetMenuHorizontalPositionStyle = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[1][1];}
Container.GetWidgetTopOffset = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[1][2];}
Container.GetWidgetLeftOffset = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[1][3];}
Container.GetTemplateName = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[2];}
Container.GetPrintTemplateName = function(objSnippetElement)
{return Snippet.GetContent(objSnippetElement)[3];}
Container.Render = Container_Render;
function Container_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlTemplateFragments,
arrHtmlToInsertBuilder)
{var arrChildSnippets = Snippet.GetChildNodes(objSnippetElement);
var fAbortRender = arrChildSnippets.length == 1 && Snippet.GetScriptClass(arrChildSnippets[0]) == "RichTextBox";
if (ViewDataNode.IsHidden(objViewDataNode) && !fAbortRender)
{return;}
var templateType = View.GetTemplateType();
var arrTemplate = new Array();
if (templateType == 1)
{arrTemplate = eval(Container.GetPrintTemplateName(objSnippetElement));}
else
{arrTemplate = eval(Container.GetTemplateName(objSnippetElement));}
Container.RenderHelper(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlTemplateFragments,
arrHtmlToInsertBuilder,
arrTemplate);}
Container.RenderHelper = Container_RenderHelper;
function Container_RenderHelper(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlTemplateFragments,
arrHtmlToInsertBuilder,
arrTemplate)
{;
;
;
;
;
;
var strHtmlId = strParentHtmlId;
var strcurrentId = ViewDataNode.GetHtmlId(objViewDataNode);
if (typeof(strcurrentId) == "undefined")
{ViewDataNode.SetHtmlId(objViewDataNode, strHtmlId);}
else
{strHtmlId = strcurrentId;}
;
var arrSnippetCollectionContent = Container.GetChildSnippetElements(objSnippetElement);
var arrViewDataChildNodes = Container.GetChildViewDataNodes(objViewDataNode);
if (arrSnippetCollectionContent.length != arrViewDataChildNodes.length)
{;
return;}
;
;
for (var nCurrentTemplateFragment = 0; nCurrentTemplateFragment < arrTemplate.length; nCurrentTemplateFragment++)
{var objCurrentTemplateFragment = arrTemplate[nCurrentTemplateFragment];
var boolRendered = Container.RenderSpecialValueContainer(
objCurrentTemplateFragment,
objViewDataNode,
objSnippetElement,
strHtmlId,
arrHtmlToInsertBuilder,
arrHtmlTemplateFragments,
arrSnippetCollectionContent,
arrViewDataChildNodes);
;}}
Container.RenderSpecialValueContainer = Container_RenderSpecialValueContainer;
function Container_RenderSpecialValueContainer(
objValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrHtmlTemplateFragments,
arrSnippetCollectionContent,
arrViewDataChildNodes)
{var boolRenderResult = false;
if (Util.GetDataType(objValue) == 1 && objValue == 5)
{Container.RenderSpecialValue(
objViewDataNode,
arrHtmlToInsertBuilder,
arrHtmlTemplateFragments,
arrSnippetCollectionContent,
arrViewDataChildNodes,
strParentHtmlId);
boolRenderResult = true;}
else if (BaseControl.RenderTemplateItem(
objValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder))
{boolRenderResult = true;}
return boolRenderResult;}
Container.RenderSpecialValue = Container_RenderSpecialValue;
function Container_RenderSpecialValue(
objViewDataNode,
arrHtmlToInsertBuilder,
arrHtmlTemplateFragments,
arrSnippetCollectionContent,
arrViewDataChildNodes,
strParentHtmlId)
{var nLastSnippetIndex = -1;
for (var nCurrentContainerFragment = 0; nCurrentContainerFragment < arrHtmlTemplateFragments.length; nCurrentContainerFragment++)
{var objValue = arrHtmlTemplateFragments[nCurrentContainerFragment];
switch (Util.GetDataType(objValue))
{case (2):
{arrHtmlToInsertBuilder.push(objValue);
break;}
case (1):
{if (objValue >= arrSnippetCollectionContent.length ||
objValue >= arrViewDataChildNodes.length)
{;
continue;}
nLastSnippetIndex = objValue;
var objChildSnippetElement = arrSnippetCollectionContent[objValue];
var objChildViewDataNode = arrViewDataChildNodes[objValue];
(objChildViewDataNode._objViewDataNodeParent = objViewDataNode);
var funcRender =  BaseControl.FindFunctionOnSnippet(objChildSnippetElement, "Render");
funcRender(
objChildViewDataNode,
objChildSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder
);
break;}
default:
{;
break;}}}}
function Container_InitializeViewDataNodes(
objParentViewDataNode,
objSnippetElement,
objViewDataNode)
{var enumSnippetType = Snippet.GetSnippetType(objSnippetElement);
;
(objViewDataNode._objViewDataNodeParent = objParentViewDataNode);
switch (enumSnippetType)
{case 4:
case 2:
{ViewDataNode.InitializeViewDataNode(objViewDataNode);
var arrChildSnippetNodes = Snippet.GetChildNodes(objSnippetElement);
var arrChildViewDataNodes = ViewDataNode.GetChildNodes(objViewDataNode);
;
for (var nIndex = 0; nIndex < arrChildViewDataNodes.length; nIndex++)
{Container_InitializeViewDataNodes(objViewDataNode, arrChildSnippetNodes[0], arrChildViewDataNodes[nIndex]);}
break;}
case 6:
{ViewDataNode.CreateDatum(objViewDataNode);
var arrChildSnippetNodes = Snippet.GetChildNodes(objSnippetElement);
var arrChildViewDataNodes = ViewDataNode.GetChildNodes(objViewDataNode);
;
for (var nIndex = 0; nIndex < arrChildSnippetNodes.length; nIndex++)
{Container_InitializeViewDataNodes(objViewDataNode, arrChildSnippetNodes[nIndex], arrChildViewDataNodes[nIndex]);}
break;}
case 3:
{ViewDataNode.CreateDatum(objViewDataNode);
break;}
case 7:
{ViewDataNode.CreateDatum(objViewDataNode);
break;}}}
Container.ResolveSpecialValue = Container_ResolveSpecialValue;
function Container_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{;
;
;
;
if (nSpecialValue == 2)
{return '"' + BaseControl_ComputeCssClasses(objViewDataNode, Snippet.GetCssClasses(objSnippetElement), 0, true ) + '"';}
var objResult = BaseControl.ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId);
if (objResult == null)
{switch (nSpecialValue)
{case 6:
{objResult = "" + Container.GetMenuTopOffset(objSnippetElement);
break;}
case 7:
{objResult = Container.GetMenuHorizontalPositionStyle(objSnippetElement);
break;}
case 8:
{objResult = "" + Container.GetWidgetTopOffset(objSnippetElement);
break;}
case 9:
{objResult = "" + Container.GetWidgetLeftOffset(objSnippetElement);
break;}
case 10:
{var objCollectionViewDataNode = ViewDataNode.GetParent(objViewDataNode);
;
objResult = StructuralEditingControl.GetTitle(ViewDataNode_GetSnippetElement(objCollectionViewDataNode));
if (objResult == null)
{objResult = "";}}}}
return objResult;}
Container.GetChildViewDataNodes = function(objViewDataNode)
{return ViewDataNode.GetContent(objViewDataNode)[2];}
Container.IsSigned = function(objViewDataNode)
{return ViewDataNode.GetContent(objViewDataNode)[3];}
Container.SetDisable = function(objControl, boolDisable)
{}
Container.OnChange = BaseControl.OnChange;
Container.OnKeyPress = BaseControl.OnKeyPress;
Container.OnAfterCreate = BaseControl.OnAfterCreate;
Container.OnMouseOver = BaseControl.OnMouseOver;
Container.OnMouseOut = BaseControl.OnMouseOut;
Container.OnMouseDown = BaseControl.OnMouseDown;
Container.OnMouseUp = BaseControl.OnMouseUp;
Container.IsSelected = BaseControl.IsSelected;
Container.RestoreFocus = BaseControl.RestoreFocus;
function RepeatingTableRow() {}
RepeatingTableRow.OnClick = Container.OnClick;
RepeatingTableRow.ShowWidget = Container.ShowWidget;
RepeatingTableRow.HideWidget = Container.HideWidget;
RepeatingTableRow.Highlight = Container.Highlight;
RepeatingTableRow.RemoveHighlight = Container.RemoveHighlight;
RepeatingTableRow.Select = Container.Select;
RepeatingTableRow.UnSelect = Container.UnSelect;
RepeatingTableRow.GetChildSnippetElements = Container.GetChildSnippetElements;
RepeatingTableRow.GetPaddingLeft = Container.GetPaddingLeft;
RepeatingTableRow.GetPaddingTop = Container.GetPaddingTop;
RepeatingTableRow.Render = RepeatingTableRow_Render;
function RepeatingTableRow_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlTemplateFragments,
arrHtmlToInsertBuilder)
{var templateType = View.GetTemplateType();
var arrTemplate = RepeatingTableRow_Template;
if (templateType == 1)
{arrTemplate = RepeatingTableRow_PrintTemplate;}
Container.RenderHelper(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlTemplateFragments,
arrHtmlToInsertBuilder,
arrTemplate);}
RepeatingTableRow.ResolveSpecialValue = Container.ResolveSpecialValue;
RepeatingTableRow.OnChange = BaseControl.OnChange;
RepeatingTableRow.OnFocus = BaseControl.OnFocus;
RepeatingTableRow.OnBlur = BaseControl.OnBlur;
RepeatingTableRow.OnKeyPress = BaseControl.OnKeyPress;
RepeatingTableRow.OnAfterCreate = BaseControl.OnAfterCreate;
RepeatingTableRow.OnMouseOver = BaseControl.OnMouseOver;
RepeatingTableRow.OnMouseOut = BaseControl.OnMouseOut;
RepeatingTableRow.IsSelected = BaseControl.IsSelected;
RepeatingTableRow.RestoreFocus = BaseControl.RestoreFocus;
function ViewContainer() {}
ViewContainer.OnClick = Container.OnClick;
ViewContainer.ShowWidget = Container.ShowWidget;
ViewContainer.HideWidget = Container.HideWidget;
ViewContainer.Highlight = Container.Highlight;
ViewContainer.RemoveHighlight = Container.RemoveHighlight;
ViewContainer.Select = Container.Select;
ViewContainer.UnSelect = Container.UnSelect;
ViewContainer.GetChildSnippetElements = Container.GetChildSnippetElements;
ViewContainer.GetPaddingLeft = Container.GetPaddingLeft;
ViewContainer.GetPaddingTop = Container.GetPaddingTop;
ViewContainer.Render = ViewContainer_Render;
function ViewContainer_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlTemplateFragments,
arrHtmlToInsertBuilder)
{var templateType = View.GetTemplateType();
var arrTemplate = ViewContainer_Template;
if (templateType == 1)
{arrTemplate = ViewContainer_PrintTemplate;}
Container.RenderHelper(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlTemplateFragments,
arrHtmlToInsertBuilder,
arrTemplate);}
ViewContainer.ResolveSpecialValue = Container.ResolveSpecialValue;
ViewContainer.OnChange = BaseControl.OnChange;
ViewContainer.OnFocus = BaseControl.OnFocus;
ViewContainer.OnBlur = BaseControl.OnBlur;
ViewContainer.OnKeyPress = BaseControl.OnKeyPress;
ViewContainer.OnAfterCreate = BaseControl.OnAfterCreate;
ViewContainer.OnMouseOver = BaseControl.OnMouseOver;
ViewContainer.OnMouseOut = BaseControl.OnMouseOut;
ViewContainer.IsSelected = BaseControl.IsSelected;
ViewContainer.RestoreFocus = BaseControl.RestoreFocus;
function Section() {}
Section.OnChange = BaseControl.OnChange;
Section.OnClick = BaseControl.OnClick;
Section.OnFocus = BaseControl.OnFocus;
Section.OnBlur = BaseControl.OnBlur;
Section.OnMouseOver = BaseControl.OnMouseOver;
Section.OnMouseOut = BaseControl.OnMouseOut;
Section.OnMouseDown = BaseControl.OnMouseDown;
Section.OnMouseUp = BaseControl.OnMouseUp;
Section.OnKeyPress = BaseControl.OnKeyPress;
Section.OnAfterCreate = BaseControl.OnAfterCreate;
Section.IsValid = BaseControl.IsValid;
Section.IsSelected = BaseControl.IsSelected;
Section.Select = BaseControl.Select;
Section.UnSelect = BaseControl.UnSelect;
Section.ResolveSpecialValue = StructuralEditingControl.ResolveSpecialValue;
Section.IsSigned = StructuralEditingControl.IsSigned;
Section.Remove = function(strSectionControl, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objSectionControl = document.getElementById(strSectionControl);
var strCollectionControlId = BaseControl.GetContainerId(objSectionControl.id);
var objCollectionControl = document.getElementById(strCollectionControlId);
;
if (objCollectionControl == null)
{return false;}
var boolDelete = StructuralEditingControl_Remove(objSectionControl, strXmlToEdit, 7, false );
if (boolDelete)
{var objInDocUI = InDocUI.GetInDocUIForCollection(objCollectionControl);
if (objInDocUI != null)
{var objInDocUIDataNode = ViewDataNode.GetViewDataNodeFromHtml(objInDocUI);
ViewDataNode.SetHidden(objInDocUIDataNode, false);
objInDocUI.style.display = "block";
BaseControl.RefreshVisualState(objInDocUI);
ErrorVisualization.UpdateAllAsterisks();
window.setTimeout("Section_RestoreFocusOnIndocUI(\"" + objInDocUI.id + "\")", 1);}
var objInDocSign = InDocSign.GetInDocSignForCollection(objCollectionControl);
if (objInDocSign != null)
{objInDocSign.style.display = "none";}
return boolDelete;}
return true;}
function Section_RestoreFocusOnIndocUI(strInDocUIId)
{var objInDocUI = document.getElementById(strInDocUIId);
var funcRestoreFocus = BaseControl.FindFunction(objInDocUI, "RestoreFocus", true );
funcRestoreFocus(objInDocUI);}
Section.Insert = Section_Insert;
function Section_Insert(
strSectionControlId,
strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objSectionControl = document.getElementById(strSectionControlId);
var strCollectionControlID = BaseControl.GetContainerId(objSectionControl.id);
var objCollectionControl = document.getElementById(strCollectionControlID);
var objNewSectionControl = null;
;
if (objCollectionControl == null)
{return;}
var boolDidntPostback = StructuralEditingControl.InsertRelative(
6,
false,
null,
objSectionControl,
strXmlToEdit);
objSectionControl = document.getElementById(strSectionControlId);
var objInDocUI = InDocUI.GetInDocUIForCollection(objSectionControl);
if (objInDocUI != null)
{var objInDocUIDataNode = ViewDataNode.GetViewDataNodeFromHtml(objInDocUI);
ViewDataNode.SetHidden(objInDocUIDataNode, true);
BaseControl.RefreshVisualState(objInDocUI);
ErrorVisualization.UpdateAllAsterisks();}
var objInDocSign = InDocSign.GetInDocSignForCollection(objSectionControl);
if (objInDocSign != null)
{objInDocSign.style.display = "block";}
return boolDidntPostback;}
Section.Render = Section_Render;
function Section_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{IP_Collection.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
Section_Template);};
function RepeatingSection() {}
RepeatingSection.Render = RepeatingSection_Render;
function RepeatingSection_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{IP_Collection.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
RepeatingSection_Template);};
RepeatingSection.ResolveSpecialValue = StructuralEditingControl.ResolveSpecialValue;
RepeatingSection.OnChange = BaseControl.OnChange;
RepeatingSection.OnClick = BaseControl.OnClick;
RepeatingSection.OnFocus = BaseControl.OnFocus;
RepeatingSection.OnBlur = BaseControl.OnBlur;
RepeatingSection.OnMouseOver = BaseControl.OnMouseOver;
RepeatingSection.OnMouseOut = BaseControl.OnMouseOut;
RepeatingSection.OnMouseDown = BaseControl.OnMouseDown;
RepeatingSection.OnMouseUp = BaseControl.OnMouseUp;
RepeatingSection.OnKeyPress = BaseControl.OnKeyPress;
RepeatingSection.OnAfterCreate = BaseControl.OnAfterCreate;
RepeatingSection.IsValid = BaseControl.IsValid;
RepeatingSection.IsSelected = BaseControl.IsSelected;
RepeatingSection.Select = BaseControl.Select;
RepeatingSection.UnSelect = BaseControl.UnSelect;
RepeatingSection.RestoreFocus = BaseControl.RestoreFocus;
RepeatingSection.IsSigned = StructuralEditingControl.IsSigned;
function RepeatingTable() {}
RepeatingTable.Render = RepeatingTable_Render;
function RepeatingTable_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{IP_Collection.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
RepeatingTable_Template);};
RepeatingTable.ResolveSpecialValue = StructuralEditingControl.ResolveSpecialValue;
RepeatingTable.OnChange = BaseControl.OnChange;
RepeatingTable.OnClick = BaseControl.OnClick;
RepeatingTable.OnFocus = BaseControl.OnFocus;
RepeatingTable.OnBlur = BaseControl.OnBlur;
RepeatingTable.OnMouseOver = BaseControl.OnMouseOver;
RepeatingTable.OnMouseOut = BaseControl.OnMouseOut;
RepeatingTable.OnMouseDown = BaseControl.OnMouseDown;
RepeatingTable.OnMouseUp = BaseControl.OnMouseUp;
RepeatingTable.OnKeyPress = BaseControl.OnKeyPress;
RepeatingTable.OnAfterCreate = BaseControl.OnAfterCreate;
RepeatingTable.IsValid = BaseControl.IsValid;
RepeatingTable.IsSelected = BaseControl.IsSelected;
RepeatingTable.Select = BaseControl.Select;
RepeatingTable.UnSelect = BaseControl.UnSelect;
RepeatingTable.IsSigned = StructuralEditingControl.IsSigned;
function RichTextBox()
{};
RichTextBox.GetFormatting = BaseControl.GetFormatting;
RichTextBox.GetRichValueFromControl = function(objControl)
{if(UserAgentInfo.strBrowser == 1)
{var objEditorDoc = RTE_GetEditorDocument(objControl.id + "_plainText");
return objEditorDoc.body.innerHTML;}
else
{return objControl.innerHTML;}};
RichTextBox.GetValueFromControl = function(objControl)
{var objArray = new Array();
if(UserAgentInfo.strBrowser == 1)
{var objEditorDoc = RTE_GetEditorDocument(objControl.id + "_plainText");
objArray.push(objEditorDoc.body.innerText);
objArray.push(objEditorDoc.body.innerHTML);}
else
{if(UserAgentInfo.strBrowser == 2)
{objArray.push(objControl.innerText);}
else
{objArray.push(objControl.textContent);}
objArray.push(objControl.innerHTML);}
return objArray;};
RichTextBox.SetValueOfControl = function(
objControl,
objValue)
{if (UserAgentInfo.strBrowser == 1)
{var strValue = objValue;
if (Util_GetDataType(objValue) == 3)
{strValue = objValue[1];}
else
{strValue = RichTextBox.QuickEncode(objValue);}
var objTextArea = eval("RTE_GetEditorTextArea(objControl.id + \"_plainText\")");
if (strValue.indexOf("<") == -1)
{strValue = "<div>" + strValue + "</div>";}
var objDocEd = RTE_GetEditorDocument(objControl.id + "_plainText");
if (objDocEd != null)
{objDocEd.body.innerHTML = strValue;}}
else if (objControl != null && objControl.innerText != objValue)
{var strValue = objValue;
var objPlainText = document.getElementById(objControl.id + "_PlainText");
if (Util_GetDataType(objValue) == 3)
{strValue = objValue[1];
RichTextBox.SetRichValueOfControl(objControl, strValue);
Util.SetInnerText(objPlainText, objValue[0]);}
else
{Util.SetInnerText(objControl, objValue);
Util.SetInnerText(objPlainText, objValue);}}};
RichTextBox.SetRichValueOfControl = function(
objControl,
strValue)
{if (UserAgentInfo.strBrowser == 1)
{if (strValue == "")
{strValue = "<div></div>";}
if (strValue.indexOf("<") == -1)
{strValue = "<div>" + strValue + "</div>";}
var objTextArea = RTE_GetEditorTextArea(objControl.id + "_plainText");
objTextArea.innerText = strValue;
var objDocEd = RTE_GetEditorDocument(objControl.id + "_plainText");
if (objDocEd)
{objDocEd.body.innerHTML = strValue;}}
else
{objControl.innerHTML = strValue;}};
RichTextBox.NeedToCreateDropDown = function()
{if (typeof(g_strRTETextEditorPullDownMenuID) != "undefined")
{var objDropDownMenu = document.getElementById(g_strRTETextEditorPullDownMenuID);
return objDropDownMenu == null;}
return false;};
RichTextBox.SetHidden = function(objViewDataNode, objControl, boolValue)
{var containerControlNode = ViewDataNode.GetParent(objViewDataNode);
var collectionControlNode = ViewDataNode.GetParent(containerControlNode);
containerControlNode[4] = boolValue;
(containerControlNode._boolDirty = true);
collectionControlNode[4] = boolValue;
(collectionControlNode._boolDirty = true);
if (UserAgentInfo.strBrowser == 1)
{var strCurrentTextEditor	= g_strRTETextEditorWithTheFocus;
var objControlId			= objControl.id + "_plainText";
if (strCurrentTextEditor == objControlId)
{var objFocusableControl = BaseControl.FindFirstFocusableControl(objControl, ViewDataNode.GetViewDataNodeFromHtml(objControl));
if (objFocusableControl != null)
{var funcRestoreFocus = BaseControl.FindFunction(objFocusableControl, "RestoreFocus", true );
funcRestoreFocus(objFocusableControl);}
else
{RTE_OnBlur(objControlId);}}}
LeafControl.SetHidden(objViewDataNode, objControl, boolValue);};
RichTextBox.SetDisable = function(objControl, boolValue)
{if (UserAgentInfo.strBrowser == 1)
{var objDocument = RTE_GetEditorDocument(objControl.id + "_plainText");
if (objDocument != null)
{objDocument.body.contentEditable = !boolValue;}}};
RichTextBox.AddEventLogEntry = function(objControl)
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
return EventLog_Add(
12,
objControl,
objControl.id,
"",
RichTextBox.GetRichValueFromControl(objControl),
enumRoundTripModel == 1 ,
false ,
false ,
4,
1);};
RichTextBox.AddEventLogEntryValue = function(objControl, strValue)
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var enumRoundTripModel = Snippet.GetRoundTripModel(objSnippetElement);
return EventLog_Add(
12,
objControl,
objControl.id,
"",
strValue,
enumRoundTripModel == 1 ,
false ,
false ,
4,
1);};
RichTextBox.OnAfterCreate = function(objViewDataNode)
{;
;
if (UserMessages.boolDocumentClosed)
{return;}
var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl == null)
{return;}
var objDatum					= ViewDataNode.GetDatum(objViewDataNode);
var objServerUnFormattedValue	= objDatum.GetValue();
var objServerFormattedValue	;
if ((ViewDataNode.GetDatum(objViewDataNode)._changedOnClient == true))
{objServerFormattedValue = BaseControl_GetHtmlValue(objViewDataNode, RichTextBox.GetFormatting);}
else
{objServerFormattedValue = (ViewDataNode.GetContent(objViewDataNode)[0]);}
LeafControl.OnAfterCreate(objViewDataNode);
if (UserAgentInfo.strBrowser == 1)
{var objSnippetElement = ViewDataNode_GetSnippetElement(objViewDataNode);
var offsetHeight = 0;
var offsetWidth = 0;
var fHidden = ViewDataNode.IsHidden(objViewDataNode);
var templateType = View.GetTemplateType();
if (templateType == 1)
{ViewDataNode.Disable(objViewDataNode);}
var strCssClassName = BaseControl_ComputeCssClasses(
objViewDataNode,
Snippet.GetCssClasses(objSnippetElement),
0,
false );
objControl.className = strCssClassName;
offsetHeight = objControl.currentStyle.height;
offsetWidth = objControl.currentStyle.width;
var strOverflowY = objControl.currentStyle.overflowY;
var strOverflowX = objControl.currentStyle.overflowX;
var strRichTextId = objControl.id + "_plainText";
var iPixelPerLine = g_iLineHeight;
var iminSize =  offsetHeight / iPixelPerLine;
if (Util_GetDataType(offsetHeight) != 1)
{var strHeight = LeafControl.ParseLength(Expr.String(offsetHeight));
iminSize =  Expr.Number(strHeight) / iPixelPerLine;}
var fDynamicHeightSizing = strOverflowY != "scroll" && strOverflowY != "auto" && strOverflowY != "hidden";
var fDynamicWidthSizing = objControl.currentStyle.width == "auto";
var strDirection		= objControl.currentStyle.direction;
var strLcid				= CurrentFormData.RichTextLCID();
L_Language_Text = strLcid;
g_fRTEFirstTimeGenerateCalled = RichTextBox.NeedToCreateDropDown();
RTE_ConvertTextAreaToRichEdit(strRichTextId,false,true,strDirection,strLcid,false,true, fDynamicHeightSizing,Number.MAX_VALUE, iminSize, "FullHtml", CurrentFormData.SiteUrl(), null, null, null, null, fDynamicWidthSizing, Number.MAX_VALUE, 0, false , false , false , false );
if (Util.GetDataType(objServerFormattedValue) == 3)
{objServerFormattedValue = objServerFormattedValue[1];}
RichTextBox.SetRichValueOfControl(objControl, objServerFormattedValue);
var objDocument		= RTE_GetEditorDocument(strRichTextId);
var objDropdownMenu = RTE_DD_GetMenuElement();
var ifmContainer	= RTE_GetEditorElement(strRichTextId);
if (objDropdownMenu != null)
{objDropdownMenu.onactivate = RichTextBox.DropDownActivate;
objDropdownMenu.ondeactivate = RichTextBox.DropDownDeactivate;}
var iStyleSheets = 0;
for (iStyleSheets; iStyleSheets < document.styleSheets.length; iStyleSheets++)
{if (document.styleSheets[iStyleSheets].href.indexOf("FormResource.aspx") != -1)
{objDocument.styleSheets[0].addImport(document.styleSheets[iStyleSheets].href);}}
RichTextBox.MoveStyles(objControl);
objControl.onresize = function()
{ErrorVisualization.UpdateAllAsterisks();
var iFrameCollection = document.getElementsByTagName("IFRAME");
var iFrames = iFrameCollection.length;
for (var iFrameIndex = 0; iFrameIndex < iFrames; iFrameIndex++)
{var objFrame = iFrameCollection(iFrameIndex);
if (objFrame.id.indexOf("_RT1_plainText_iframe") != -1)
{objFrame.height = objFrame.offsetHeight - 1;
objFrame.height = objFrame.height + 1;}}};
objDocument.body.ondrop = function()
{objDocument.body.setActive();};
objDocument.body.onkeypress = function()
{RichTextBox.OnKeyPress(objControl.id);};
objDocument.body.onkeydown = function()
{RichTextBox.OnKeyDown(objControl.id);};
objDocument.body.onmouseup = function()
{RichTextBox.OnMouseUp(objControl.id);};
objDocument.body.onblur = function()
{RichTextBox.OnBlur(objControl.id);};
objDocument.body.className			= objControl.className;
objDocument.body.style.fontFamily	= objControl.currentStyle.fontFamily;
objDocument.body.style.fontSize		= objControl.currentStyle.fontSize;
objDocument.body.backgroundColor	= objControl.currentStyle.backgroundColor;
RichTextBox.FixLayoutGrid(objControl, objDocument);
if (objControl.currentStyle.overflowY != "hidden")
{objDocument.body.style.overflowY	= objControl.currentStyle.overflowY;}
objDocument.body.style.textAlign	= objControl.currentStyle.textAlign;
objDocument.body.style.overflow		= "visible";
objControl.parentNode.parentNode.parentNode.parentNode.style.overflowY = "visible";
objDocument.body.style.lineHeight	= objControl.currentStyle.lineHeight;
objDocument.body.accessKey		= objControl.accessKey;
objDocument.body.tabIndex		= objControl.tabIndex;
objDocument.body.title			= objControl.title;
objControl.accessKey = "";
objControl.tabIndex  = "-1";
objControl.style.overflowY = "visible";
objControl.style.overflowX = "visible";
var objDocumentFrame = document.getElementById(RTE_GetEditorIFrameID(strRichTextId));
objDocumentFrame.allowTransparency = true;
if (objControl.currentStyle.width.indexOf("%") != -1)
{ifmContainer.style.width = objControl.currentStyle.width;}
else
{ifmContainer.style.width		= offsetWidth;}
if (objControl.currentStyle.height.indexOf("%") != -1)
{ifmContainer.style.width = objControl.currentStyle.height;}
else
{ifmContainer.style.height		= offsetHeight;}
var objParentViewDataNode = ViewDataNode.GetParent(objViewDataNode);
var objParentControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objParentViewDataNode);
var objCollectionViewDataNode = ViewDataNode.GetParent(objParentViewDataNode);
var objCollectionControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objCollectionViewDataNode);
objParentControl.style.display = "inline";
objCollectionControl.style.display = "inline";
var objParentViewDataNode = ViewDataNode.GetParent(objViewDataNode);
var objParentControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objParentViewDataNode);
if (objParentControl != null)
{objParentControl.style.borderWidth = "0px";
objParentControl.style.padding = "0px";}
BaseControl.RefreshVisualState(objControl);
if (fDynamicHeightSizing)
{window.setTimeout("RTE_DocEditor_AdjustHeight(\"" + strRichTextId + "\")", 1);}
if (fDynamicWidthSizing)
{RTE_DocEditor_AdjustWidth(objControl.id + "_plainText");}
ifmContainer.onactivate = function()
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var strControlId = objControl.id + "_plainText";
if (ViewDataNode.IsHidden(objViewDataNode))
{return;}
HoverMenu.HideMenu();
if (IP_DatePicker.Close != null)
{IP_DatePicker.Close();}
var objEditorDoc = RTE_GetEditorDocument(objControl.id + "_plainText");
if (ifmContainer.onfocus != null)
{ifmContainer.onfocus = null;}
if (ifmContainer.onblur != null)
{ifmContainer.onblur = null;}
if (objEditorDoc.body.contentEditable != "false")
{var edToolbar = document.getElementById(strControlId + "_toolbar");
if (edToolbar == null)
{var objPlainTextControl = document.getElementById(strRichTextId);
var arrSettings = RTE_GetEditorInstanceVariables(strControlId);
var strToolBarHtml = RTE_GenerateToolBarHtmlFromSettings(strControlId, strLcid, objPlainTextControl, arrSettings.aSettings);
var objEditorFrame = document.getElementById(RTE_GetEditorIFrameID(strControlId));
objEditorFrame.parentElement.insertAdjacentHTML("beforeBegin", strToolBarHtml);
RTE_ToolBarMnemonicInitialization(strControlId);
edToolbar = document.getElementById(strControlId + "_toolbar");
RTE_DisableToolBar(strControlId);}
var objEditorDoc = RTE_GetEditorDocument(strControlId);
objEditorDoc.body.focus();
objEditorDoc.selection.createRange().select();
RTE_OnFocus(strControlId);
RTE_GiveEditorFocus(strControlId);
var objEvent = eval("window.event");
LeafControl.OnFocus(objControl, objEvent);
window.setTimeout("SelectionService.SelectId(\"" + objControl.id + "\")", 1);
objControl.backUpData = objEditorDoc.body.innerHTML;
if (objEditorDoc.body.onselectstart == null)
{RTE_EventHookUp(strControlId);}
var objTextControl = document.getElementById(objControl.id + "_plainText");
RichTextBox.CheckDropDown();
var objToolBarIframe = document.getElementById(strRichTextId + "_Toolbar_Iframe");
var objToolBar = RTE_GetEditorToolBar(strControlId);
if (objToolBar.style.position != "absolute")
{objToolBar.parentNode.style.textAlign = objToolBar.currentStyle.textAlign;
objToolBar.style.position = "absolute";
objToolBar.style.top = -objToolBar.offsetHeight;
objToolBar.style.zIndex = "50";
if (strDirection == "rtl")
{objToolBar.style.left = objToolBar.offsetLeft;}}
if (objToolBarIframe == null)
{var objToolBarIframe = IFrameUtils.InsertIframe(null , strRichTextId + "_Toolbar_Iframe", false , "49");
objToolBarIframe.style.position = "absolute";
IFrameUtils.PlaceIFrameBehindControl(edToolbar, objToolBarIframe);
document.body.appendChild(edToolbar.parentNode.removeChild(edToolbar));}
var objFontButton = document.getElementById(strRichTextId + "_" + g_strRTEFontNameMnemonic);
if (objFontButton.CurrentFontOnClick == null)
{objFontButton.CurrentFontOnClick = objFontButton.onclick;
objFontButton.onclick = RichTextBox.FontOnClick;}
var objSizeButton = document.getElementById(strRichTextId + "_" + g_strRTEFontSizeMnemonic);
if (objSizeButton.CurrentSizeOnClick == null)
{objSizeButton.CurrentSizeOnClick = objSizeButton.onclick;
objSizeButton.onclick = RichTextBox.SizeOnClick;}
var objForeColorButton = document.getElementById(strRichTextId + "_" + g_strRTEForeColorMnemonic);
if (objForeColorButton.CurrentForeColorOnClick == null)
{objForeColorButton.CurrentForeColorOnClick = objForeColorButton.children(0).onclick;
objForeColorButton.children(0).onclick = RichTextBox.ForeColorOnClick;}
var objBackColorButton = document.getElementById(strRichTextId + "_" + g_strRTEBackColorMnemonic);
if (objBackColorButton.CurrentBackColorOnClick != null)
{objBackColorButton.CurrentBackColorOnClick = objBackColorButton.children(0).onclick;
objBackColorButton.children(0).onclick = RichTextBox.BackColorOnClick;}
objToolBar.style.display = "";
objToolBarIframe.style.display = "";
var intAbsTop = ErrorVisualization.ComputeAbsoluteTop(objControl);
var intAbsLeft = ErrorVisualization.ComputeAbsoluteLeft(objControl);
if (objToolBar.offsetTop != intAbsTop - objToolBar.offsetHeight)
{objToolBar.style.top = intAbsTop - objToolBar.offsetHeight;
objToolBarIframe.style.top = intAbsTop - objToolBarIframe.offsetHeight;}
if (objToolBar.offsetLeft != intAbsLeft)
{objToolBar.style.left = intAbsLeft;
objToolBarIframe.style.left = intAbsLeft;}
ErrorVisualization.HideShortMessage(objControl);
objControl._disableShortMessage = true;}};
objControl.ondeactivate = function()
{if (RTE_DD_MenuIsOpen())
{return;}
RichTextBox.CheckDropDown();
var objEditorDoc = RTE_GetEditorDocument(objControl.id + "_plainText");
RichTextBox.OnBlur(objControl.id);
var objToolBar = document.getElementById(strRichTextId + "_toolbar");
if (objToolBar != null)
{RTE_OnBlur(strRichTextId);}
var objEditorElement = RTE_GetEditorElement(strRichTextId);
objEditorElement.blur();
if (objToolBar != null)
{var objToolBarIframe = document.getElementById(strRichTextId + "_Toolbar_Iframe");
objToolBar.style.display = "none";
if (objToolBarIframe != null)
{objToolBarIframe.style.display = "none";}}
if (RTE_DD_MenuIsOpen())
{var strOpenToolBarId = g_strRTEDDBaseElementID;
var objToolBar		= RTE_GetEditorToolBar(strOpenToolBarId);
objToolBar.style.display = "none";}
if (objControl.backUpData != null
&& objControl.backUpData != objEditorDoc.body.innerHTML)
{var objEvent = eval("window.event");
if (objEvent != null
&& objEvent.toElement != null
&& objEvent.toElement.id == g_strRTETextEditorPullDownMenuID)
{return;}
var strValue = objEditorDoc.body.innerHTML;
if (!Util_IsValidXmlString(strValue))
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strInvalidCharacterInText, true );
var strOldValue = objDatum.GetValue();
if (Util.GetDataType(strOldValue) == 3)
{strOldValue = strOldValue[1];}
objEditorDoc.body.innerHTML = strOldValue;
objEditorDoc.body.setActive();}
else
{objDatum.SetValue(strValue);
RichTextBox.AddEventLogEntry(objControl);
(objViewDataNode._boolDirty = true);
ViewDataNode.OnControlChange(objControl);
RichTextBox.SetRichValueOfControl(objControl, strValue);}}
objControl.backUpData = null;
if (objEditorDoc.body.getAttribute(g_strRTEUseDynamicHeightSizing) == "true")
{RTE_DocEditor_AdjustHeight(strRichTextId);}
if (objEditorDoc.body.getAttribute(g_strRTEUseDynamicWidthSizing) == "true")
{RTE_DocEditor_AdjustWidth(strRichTextId);}
objControl._disableShortMessage = false;};
objDocument.body.onclick = function()
{var objEvent = eval("objDocument.parentWindow.event");
if (objEvent != null &&
objEvent.srcElement != null &&
objEvent.srcElement.tagName.toLowerCase() == "a")
{open(objEvent.srcElement.href);}
Util.StopEventProprogation(objEvent);
return false;};
if (SelectionService.objSelectedControl)
{SelectionService._Select(SelectionService.objSelectedControl, true );}}
else if (UserAgentInfo.strBrowser != 1)
{BaseControl.RefreshVisualState(objControl);
var objParentViewDataNode = ViewDataNode.GetParent(objViewDataNode);
var objParentControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objParentViewDataNode);
objParentControl.style.width = objControl.offsetWidth + 1;
var objPlainText = document.getElementById(objControl.id + "_PlainText");
var strPlainText = objServerUnFormattedValue.replace(/&lt;/g, "<");
strPlainText = strPlainText.replace(/&gt;/g, ">");
RichTextBox.SetRichValueOfControl(objControl, objServerFormattedValue);
objPlainText.innerHTML = strPlainText;}};
RichTextBox.CheckDropDown = function()
{var objDropDown = RTE_DD_GetMenuElement();
if (objDropDown.parentNode != document.body)
{objDropDown.parentNode.removeChild(objDropDown);
document.body.appendChild(objDropDown);
objDropDown.onactivate = RichTextBox.DropDownActivate;
objDropDown.ondeactivate = RichTextBox.DropDownDeactivate;}};
RichTextBox.FontOnClick = function()
{var objButton = eval("event.srcElement.parentNode");
objButton.CurrentFontOnClick();
RichTextBox.DropDownActivate();};
RichTextBox.SizeOnClick = function()
{var objButton = eval("event.srcElement.parentNode");
objButton.CurrentSizeOnClick();
RichTextBox.DropDownActivate();};
RichTextBox.ForeColorOnClick = function()
{var objButton = eval("event.srcElement.parentNode.parentNode");
objButton.CurrentForeColorOnClick();
RichTextBox.DropDownActivate();
return false;};
RichTextBox.BackColorOnClick = function()
{var objButton = eval("event.srcElement.parentNode.parentNode");
objButton.CurrentBackColorOnClick();
RichTextBox.DropDownActivate();};
RichTextBox.FixLayoutGrid = function(objControl, objDocument)
{if (objControl.currentStyle.layoutGridType != "loose" &&
objControl.style.layoutGridChar == 0 &&
objControl.style.layoutGridLine == 0)
{objControl.style.layoutGridType = "loose";
objControl.style.layoutGridChar = 0;
objControl.style.layoutGridLine = 0;}};
RichTextBox.DropDownActivate = function()
{var objDropDown = RTE_DD_GetMenuElement();
var strCtrlId = "";
var strPreTextEditor		= g_strRTEPrevTextEditor;
var strCurrentTextEditor	= g_strRTETextEditorWithTheFocus;
if (strCurrentTextEditor)
{strCtrlId = strCurrentTextEditor;}
else if (strPreTextEditor)
{strCtrlId = strPreTextEditor;}
else
{return;}
var objToolBar = RTE_GetEditorToolBar(strCtrlId);
objToolBar.style.display = "";
var objToolBarIframe = document.getElementById(strCtrlId + "_Toolbar_Iframe");
objToolBarIframe.style.display = "";
var iLastUnderScore = strCtrlId.lastIndexOf("_");
var strRichTextId = strCtrlId.substring(0, iLastUnderScore);
var objRichTextControl = document.getElementById(strRichTextId);
ErrorVisualization.HideShortMessage(objRichTextControl);
objRichTextControl._disableShortMessage = true;
if (objRichTextControl.currentStyle.direction == "rtl")
{var objButton = document.getElementById(strCtrlId + "_" + g_strRTEFontNameMnemonic);
objDropDown.style.left = LeafControl.ParseLength(objDropDown.style.left) - objDropDown.offsetWidth + objButton.offsetWidth;}};
RichTextBox.DropDownDeactivate = function()
{var strCtrlId = g_strRTEDDBaseElementID;
if (strCtrlId != null)
{var objRichTextEditor = document.getElementById(strCtrlId.replace("_plainText", ""));
objRichTextEditor.ondeactivate();}};
RichTextBox.PreserveHoverMenu = function(objWidgetImage)
{var objRichText = RichTextBox.GetContainerFromChild(objWidgetImage.parentNode.parentNode);
SelectionService.Highlight(objRichText, false , true );};
RichTextBox.MoveStyles = function(objControl)
{var objDocument = RTE_GetEditorDocument(objControl.id + "_plainText");
if (objDocument != null && objDocument.body != null)
{if (objDocument.body.style.backgroundColor != objControl.currentStyle.backgroundColor)
{objDocument.body.style.backgroundColor = objControl.currentStyle.backgroundColor;}
if (objDocument.body.style.color != objControl.currentStyle.color)
{objDocument.body.style.color = objControl.currentStyle.color;}}};
RichTextBox.RemoveHoverMenu = function(objWidgetImage)
{var objRichText = RichTextBox.GetContainerFromChild(objWidgetImage.parentNode);
SelectionService.RemoveHighlight(objRichText , false );};
RichTextBox.GetContainerFromChild = function(objChild)
{var strContainerControlID = BaseControl.GetContainerId(objChild.id);
var objContainerControl = document.getElementById(strContainerControlID);
return objContainerControl;};
RichTextBox.InvokeEditor = function(strContainerControlId)
{var objRichText = document.getElementById(strContainerControlId + "_RT1");
if (objRichText == null)
{return;}
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objRichText);
if (ViewDataNode.IsDisabled(objViewDataNode))
{return;}
var objRichViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objRichText);
if (UserAgentInfo.strBrowser != 1)
{var objPlainText = document.getElementById(objRichText.id + "_PlainText");
if ((objViewDataNode._boolDirty)
|| objViewDataNode._plainTextQueried
|| UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strRichToPlain, true))
{if (objRichText.offsetWidth > 0)
{objPlainText.style.width = objRichText.offsetWidth;}
if (objRichText.offsetHeight > 0)
{objPlainText.style.height = objRichText.offsetHeight;}
objPlainText.style.display	= "inline";
objRichText.style.display	= "none";
objRichViewDataNode[4] = true;
objPlainText.className = objRichText.className;
objPlainText.focus();
var richTextContainerControl = ViewDataNode.GetParent(objRichViewDataNode);
var objRichTextContainerHTMLControl = ViewDataNode_GetHtmlControlFromViewDataNode(richTextContainerControl);
SelectionService.RemoveHighlight(objRichText , true );
Container.HideWidget(objRichTextContainerHTMLControl);}}};
function RichTextBox_DetatchAllEvents()
{var iFrameCollection = document.getElementsByTagName("IFRAME");
if (iFrameCollection != null)
{var iFrames = iFrameCollection.length;
for (var iFrameIndex = 0; iFrameIndex < iFrames; iFrameIndex++)
{var objFrame = iFrameCollection[iFrameIndex];
if (objFrame.id != null && objFrame.id.indexOf("_RT1_plainText_iframe") != -1)
{RichTextBox_CleanupIFrame(objFrame);}}}}
function RichTextBox_CleanupIFrame(objFrame)
{var strRichTextId = objFrame.id.replace("_iframe", "");
var objDocument = RTE_GetEditorDocument(strRichTextId);
var objContainer =  RTE_GetEditorElement(strRichTextId);
var objParent = BaseControl.GetParentInfoPathControl(objFrame);
var strRichTextControlId = strRichTextId.replace("_plainText", "");
var objControl = document.getElementById(strRichTextControlId);
if (objControl != null)
{objControl.onresize = null;
objControl.ondeactivate = null;
objControl.onfocus = null;}
if (objDocument != null && objDocument.body != null)
{objDocument.body.ondrop = null;
objDocument.body.onkeypress = null;
objDocument.body.onkeydown = null;
objDocument.body.onkeyup = null;
objDocument.body.onmouseup = null;
objDocument.body.onblur = null;
objDocument.body.onselectstart = null;
objDocument.body.oncontextmenu = null;
objDocument.body.onclick = null;}
if (objContainer != null)
{objContainer.onactivate = null;
objContainer.ondeactivate = null;
objContainer.onblur = null;
objContainer.onfocus = null;
objContainer.onload = null;}
if (objParent != null)
{objParent.ondeactivate = null;}}
RichTextBox.OnKeyPress = function(strRichTextId)
{var objControl = document.getElementById(strRichTextId);
var objEditorDocument = RTE_GetEditorDocument(objControl.id + "_plainText");
var objEvent = eval("objEditorDocument.parentWindow.event");
if (objEvent != null)
{KeyboardService.OnKeyPress(objEvent);}};
RichTextBox.OnKeyDown = function(strRichTextId)
{var objControl = document.getElementById(strRichTextId);
var objEditorDocument = RTE_GetEditorDocument(objControl.id + "_plainText");
var objEvent = eval("objEditorDocument.parentWindow.event");
if (HoverMenu.isVisible)
{HoverMenu.HideMenu();}
if (objEditorDocument.body.contentEditable == "false")
{objEvent.returnValue = false;
return;}
if (objEvent != null)
{if (KeyboardService.OnKeyDown(objEvent))
RTE_OnKeyDown(objControl.id + "_plainText", objEditorDocument.body);}};
RichTextBox.OnMouseUp = function(strRichTextId)
{var objControl = document.getElementById(strRichTextId);
var objEditorDocument = RTE_GetEditorDocument(objControl.id + "_plainText");
var objEvent = eval("objEditorDocument.parentWindow.event");
if (objEditorDocument.body.contentEditable != "false")
{RTE_OnMouseUp(objControl.id + "_plainText");}};
RichTextBox.OnBlur = function(strRichTextId)
{var strControlId = strRichTextId + "_plainText";
var objActiveEditor = RTE_EditorWithTheFocus();
if (objActiveEditor == null || strControlId != objActiveEditor.id)
{return;}
var objEditorDocument = RTE_GetEditorDocument(strControlId);
var objEvent = eval("objEditorDocument.parentWindow.event");
if (objEditorDocument.body.contentEditable != "false")
{RTE_OnBlur(strControlId);}};
RichTextBox.QuickEncode = function(strValue)
{strValue = strValue.replace(/&/g, "&amp;");
strValue = strValue.replace(/</g, "&lt;");
strValue = strValue.replace(/>/g, "&gt;");
strValue = strValue.replace(/\"/g, "&quot;");
strValue = strValue.replace(/\n/g, "<br/>");
return strValue;};
RichTextBox.PersistPlainText = function(objControl)
{var objRichText = RichTextBox.GetContainerFromChild(objControl);
var strPlainText = objControl.value;
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objRichText);
var objDatum		= ViewDataNode.GetDatum(objViewDataNode);
if (!Util_IsValidXmlString(strPlainText))
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strInvalidCharacterInText, true );
objControl.style.display	= "none";
objRichText.style.display	= "block";
var strOldValue = objDatum.GetValue();
if (Util.GetDataType(strOldValue) == 3)
{strOldValue = strOldValue[0];}
objControl.value = strOldValue;}
else
{var arrValue		= new Array();
arrValue.push(strPlainText);
strPlainText = RichTextBox.QuickEncode(strPlainText);
var strValue = "<div>" + strPlainText + "</div>";
objControl.style.display	= "none";
objRichText.style.display	= "block";
arrValue.push(strValue);
RichTextBox.AddEventLogEntryValue(objRichText, strValue);
RichTextBox.SetRichValueOfControl(objRichText, strValue);}
objViewDataNode[4] = false;
(objViewDataNode._boolDirty = true);
ViewDataNode.OnControlChange(objRichText);
objViewDataNode._plainTextQueried = true;
ErrorVisualization.UpdateAllAsterisks();};
RichTextBox.Render = RichTextBox_Render;
function RichTextBox_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var arrTemplate;
var templateType = View.GetTemplateType();
arrTemplate = RichTextBox_Template;
if (templateType == 1)
{arrTemplate = RichTextBox_PrintTemplate;}
LeafControl.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate);};
RichTextBox.ResolveSpecialValue = LeafControl.ResolveSpecialValue;
RichTextBox.IsFocusable = RichTextBox_IsFocusable;
function RichTextBox_IsFocusable()
{return true;};
RichTextBox.OnFocus = function(objControl, objEvent)
{var strRichTextBoxId = objControl.id + "_plainText";
if (CurrentFormData.ViewTreesAreMerged() == false)
{window.setTimeout("RichTextBox_PostCreate(\"" + strRichTextBoxId + "\")", 5);}
else
{if (UserAgentInfo.strBrowser == 1)
{RTE_GiveEditorFocus(strRichTextBoxId);
RTE_OnFocus(strRichTextBoxId);}
LeafControl.OnFocus(objControl, objEvent);}};
function RichTextBox_PostCreate(strRichTextBoxId)
{var objDocument = RTE_GetEditorDocument(strRichTextBoxId);
objDocument.body.setActive();}
RichTextBox.Highlight		= function(objControl, boolSticky)
{LeafControl.Highlight(objControl, boolSticky);
if (!boolSticky)
{var objContainer = RichTextBox.GetContainerFromChild(objControl);
SelectionService.Highlight(objContainer, boolSticky, true );}};
RichTextBox.RemoveHighlight = function(objControl, boolSticky)
{LeafControl.RemoveHighlight(objControl, boolSticky);
var objContainer = RichTextBox.GetContainerFromChild(objControl);
SelectionService.RemoveHighlight(objContainer, false );};
RichTextBox.Select			= LeafControl.Select;
RichTextBox.UnSelect		= LeafControl.UnSelect;
RichTextBox.OnClick			= LeafControl.OnClick;
RichTextBox.OnChange		= RichTextBox_OnChange;
function RichTextBox_OnChange(
objControl)
{if (UserAgentInfo.strBrowser == 1)
{objControl.ondeactivate();}
else
{var objPlainText = document.getElementById(objControl.id + "_PlainText");
RichTextBox.PersistPlainText(objPlainText);}
LeafControl.OnChange(objControl);}
RichTextBox.OnMouseOver		= LeafControl.OnMouseOver;
RichTextBox.OnMouseOut		= LeafControl.OnMouseOut;
RichTextBox.OnMouseDown		= LeafControl.OnMouseDown;
RichTextBox.IsSelected		= LeafControl.IsSelected;
RichTextBox.RestoreFocus	= LeafControl.RestoreFocus;
RichTextBox.OnBeforeDialog	= LeafControl.OnBeforeDialog;
RichTextBox.OnAfterDialog	= LeafControl.OnAfterDialog;
function RichTextBox_CleanupContainer(objContainer)
{;
var arrChildNodes = ViewDataNode.GetChildNodes(objContainer);
for (var i = 0; i < arrChildNodes.length; i++)
{var objContainerChild = arrChildNodes[i];
var objSnippetElement = ViewDataNode_GetSnippetElement(objContainerChild);
var strChildScriptClass = Snippet.GetScriptClass(objSnippetElement);
var snippetType = Snippet.GetSnippetType(objSnippetElement);
if (strChildScriptClass == "RichTextCollection")
{var arrRTECollectionChildNodes = ViewDataNode.GetChildNodes(objContainerChild);
if (arrRTECollectionChildNodes.length > 0)
{var arrRTECollectionGrandchildNodes = ViewDataNode.GetChildNodes(arrRTECollectionChildNodes[0]);
if (arrRTECollectionGrandchildNodes.length > 0)
{var objRichTextBox = arrRTECollectionGrandchildNodes[0];
var objFrameControl = RTE_GetEditorIFrame(ViewDataNode.GetHtmlId(objRichTextBox) + "_plainText");
if (objFrameControl != null)
{RichTextBox_CleanupIFrame(objFrameControl.frameElement);}}
else
{;}}
else
{;}}
else if (snippetType == 4)
{var arrRepeatingChildNodes = ViewDataNode.GetChildNodes(objContainerChild);
for (var j = 0; j < arrRepeatingChildNodes.length; j++)
{RichTextBox_CleanupContainer(arrRepeatingChildNodes[j]);}}}}
var FileAttachment_k_strRenderModeNormal = "Normal";
function FileAttachment() {};
FileAttachment.GetFormatting = BaseControl.GetFormatting;
FileAttachment.GetValueFromControl = function(objControl)
{return null;}
FileAttachment.SetValueOfControl = function(
objControl,
strValue)
{return;}
function FileAttachment_IsNormalRendering(objViewDataNode)
{var modeFromControl = (ViewDataNode.GetContent(objViewDataNode)[2])[0];
if (modeFromControl == FileAttachment_k_strRenderModeNormal &&
CurrentFormData.IsFileAttachmentPresent())
{return true;}
return false;}
function FileAttachment_IsAttachAllowed(objViewDataNode)
{if (FileAttachment_IsNormalRendering(objViewDataNode) == false ||
(ViewDataNode.GetContent(objViewDataNode)[2])[1] == false ||
LeafControl.IsSigned(objViewDataNode))
{return false;}
return true;}
function FileAttachment_IsDownloadAllowed(objViewDataNode)
{if (FileAttachment_IsNormalRendering(objViewDataNode) == false ||
(ViewDataNode.GetContent(objViewDataNode)[2])[2] == false)
{return false;}
return FileAttachment_GetHasAttachment(objViewDataNode) == true;}
function FileAttachment_IsRemoveAllowed(objViewDataNode)
{if (FileAttachment_IsNormalRendering(objViewDataNode) == false ||
(ViewDataNode.GetContent(objViewDataNode)[2])[3] == false)
{return false;}
return FileAttachment_GetHasAttachment(objViewDataNode) == true;}
function FileAttachment_GetHasAttachment(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[4];}
function FileAttachment_GetFileName(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[5];}
function FileAttachment_GetFileSizeText(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[6];}
function FileAttachment_IsUnsafeExtension(objViewDataNode)
{return (ViewDataNode.GetContent(objViewDataNode)[2])[7];}
FileAttachment.AddEventLogEntry = function (objControl)
{return;}
FileAttachment.DownloadFile = function(objControl)
{EventLog_EnsureEventLogStartEntry();
var arrEventLog = EventLog_Deserialize();
var eventLogStart = arrEventLog[0];
var downloadUrl = CurrentFormData.SiteUrl() +
"/_layouts/FormServerAttachments.aspx?dl=yes&event=" +
encodeURIComponent(eventLogStart) + " " +
"&ctrl=" +
encodeURIComponent(objControl.id);
if (typeof (window.open) != "undefined")
{window.open(downloadUrl);}
else
{Util.Navigate(downloadUrl);}}
FileAttachment.InvokeAttach = function(strSectionControlId, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objControl = document.getElementById(strSectionControlId);
var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (FileAttachment_IsAttachAllowed(objViewDataNode) == false)
{return true;}
Dialog.funcCallbackOnClose = null;
var arrData = new Array();
arrData[1] = IntlCoreStrings.k_strFileAttachmentDialogTitle;
arrData[3] = CurrentFormData.Direction();
arrData[5] = Dialog.TextAlignmentStyle();
arrData[6] = IntlCoreStrings.k_strBrandingToolBarLogoPrefix;
var arrUploadButton =
[0
,IntlCoreStrings.k_strUploadButtonText
,"return Dialog.FileAttachmentServerRequest();Util.StopEventProprogation(event);return false;"
,""
,"submit"
];
var arrCancelButton =
[1
,IntlCoreStrings.k_strCancelButtonText
,"Dialog.OnTerminateButton();Util.StopEventProprogation(event);return false;"
,""
,"button"
];
arrData[2] = [arrUploadButton, arrCancelButton];
arrData[11] = IntlCoreStrings.k_strFileAttachmentDialogMessage;
return Dialog_ShowModalDialogEx(
"FileAttachment",
1 ,
1 ,
false ,
arrData ,
objControl);
return true;}
FileAttachment.InvokeDownload = function(strSectionControlId, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objControl = document.getElementById(strSectionControlId);
var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (FileAttachment_IsDownloadAllowed(objViewDataNode) == false)
{return;}
if (StructuralEditingControl._IsIdCreatedClientSide(objControl.id))
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strFileAttachmentPromptForRefresh, true);
return true;}
else
{if (FileAttachment_IsUnsafeExtension(objViewDataNode))
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strBlacklistedFileType, true);
return true;}
else
{var boolCanDownload = UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strFileAttachmentDownloadPrompt, true);
if (boolCanDownload)
{FileAttachment.DownloadFile(objControl);
return false;}}}}
FileAttachment.InvokeRemove = function(strSectionControlId, strXmlToEdit)
{if (!BaseControl.CanHandleEvents())
{return;}
var objControl = document.getElementById(strSectionControlId);
var objViewDataNode	= ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (FileAttachment_IsRemoveAllowed(objViewDataNode) == false)
{return true;}
var boolRemove = UserMessages.ShowConfirmMessage(IntlCoreStrings.k_strFileAttachmentPromptRemoveFile, true);
if (boolRemove)
{EventLog_Add(
0,
objControl,
objControl.id,
"0" ,
"" ,
true ,
false ,
false ,
0,
1);}
return true;}
FileAttachment.OnClick = FileAttachment_OnClick;
function FileAttachment_OnClick(objControl, objEvent)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (FileAttachment_GetHasAttachment(objViewDataNode) == false)
{FileAttachment.InvokeAttach(objControl.id, HoverMenu.GetXmlToEdit(objViewDataNode));}}
FileAttachment.OnDblClick = FileAttachment_OnDblClick;
function FileAttachment_OnDblClick(objControl, objEvent)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
FileAttachment.InvokeDownload(objControl.id, HoverMenu.GetXmlToEdit(objViewDataNode));}
FileAttachment.OnKeyDown = FileAttachment_OnKeyDown;
function FileAttachment_OnKeyDown(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return true;}
var nVirtualKey = KeyboardService.GetVirtualKey(objEvent);
if (nVirtualKey == 1)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (FileAttachment_GetHasAttachment(objViewDataNode) == true)
{FileAttachment.InvokeDownload(objControl.id, HoverMenu.GetXmlToEdit(objViewDataNode));}
else
{FileAttachment.InvokeAttach(objControl.id, HoverMenu.GetXmlToEdit(objViewDataNode));}}
else if (nVirtualKey == 19)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
FileAttachment.InvokeRemove(objControl.id, HoverMenu.GetXmlToEdit(objViewDataNode));}
return LeafControl.OnKeyPress(objControl, objEvent);}
FileAttachment.ImageStyle = function(objViewDataNode)
{var rev = Util.FindHashForServerImage("MergedImage1.gif");
var boolHasAttachment = FileAttachment_GetHasAttachment(objViewDataNode);
if (boolHasAttachment)
{return "'display:block;vertical-align:middle;width:11;height:30;overflow:hidden;margin-left:10px;margin-right:11px;background-image:url(/_layouts/inc/MergedImage1.gif" + rev + ");background-position:-65 0;'";}
else
{return "'display:block;vertical-align:middle;width:7;height:10;overflow:hidden;margin-left:4px;margin-right:5px;background-image:url(/_layouts/inc/MergedImage1.gif" + rev + ");background-position:-76 -10;'";}}
FileAttachment.FileNameInformation = function(objViewDataNode)
{var boolHasAttachment = FileAttachment_GetHasAttachment(objViewDataNode);
if (boolHasAttachment)
{return STSHtmlEncode(FileAttachment_GetFileName(objViewDataNode)) + " <br>" + FileAttachment_GetFileSizeText(objViewDataNode);}
else
{return IntlCoreStrings.k_strClickHereToAttachFile;}}
FileAttachment.EmbeddedImgStyle = function(objViewDataNode)
{var boolHasAttachment = FileAttachment_GetHasAttachment(objViewDataNode);
if (boolHasAttachment)
{return "width:11;height:30";}
else
{return "width:7;height:10";}}
FileAttachment.OnAfterCreate = function(objViewDataNode)
{;
;
if (!ViewDataNode.IsValid(objViewDataNode))
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{if (ViewDataNode.IsBlank(objViewDataNode))
{;
ErrorVisualization.ShowAsterisk(objControl);}
else
{BaseControl._ApplyCssClasses(objControl, 3);}}}}
FileAttachment.RestoreFocus = FileAttachment_RestoreFocus;
function FileAttachment_RestoreFocus(objControl)
{LeafControl.RestoreFocus(objControl);}
FileAttachment.OnFocus = FileAttachment_OnFocus;
function FileAttachment_OnFocus(objControl, objEvent)
{if (BaseControl.CanHandleEvents())
{LeafControl.RestoreFocus(objControl);
SelectionService.RememberFocus(objControl, objEvent);}}
FileAttachment.Render = FileAttachment_Render;
function FileAttachment_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var templateType = View.GetTemplateType();
var arrTemplate = FileAttachment_Template;
if (templateType == 1)
{arrTemplate = FileAttachment_PrintTemplate;}
var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
LeafControl.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate);}
FileAttachment.IsActionEnabled = function(strAction, objViewDataNode)
{switch (strAction)
{case (HoverMenu.xFileAttachmentAttach):
return FileAttachment_IsAttachAllowed(objViewDataNode);
case (HoverMenu.xFileAttachmentDownload):
return FileAttachment_IsDownloadAllowed(objViewDataNode);
case (HoverMenu.xFileAttachmentRemove):
return FileAttachment_IsRemoveAllowed(objViewDataNode);}
return false;}
FileAttachment.ResolveSpecialValue = FileAttachment_ResolveSpecialValue;
function FileAttachment_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{var objResult = LeafControl.ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId);
if (nSpecialValue == 7 && objResult == "\"\"")
{objResult = "\"" + FileAttachment.FileNameInformation(objViewDataNode) + "\"";}
if (objResult == null)
{var arrLeafSnippetContent = (Snippet.GetContent(objSnippetElement)[3])
switch (nSpecialValue)
{case 10:
objResult = FileAttachment.ImageStyle(objViewDataNode);
break;
case 11:
objResult = FileAttachment.FileNameInformation(objViewDataNode);
break;
case 12:
objResult = FileAttachment.EmbeddedImgStyle(objViewDataNode);
break;}}
return objResult;}
FileAttachment.IsFocusable = FileAttachment_IsFocusable;
function FileAttachment_IsFocusable()
{return true;}
FileAttachment.SetDisable = function(objControl, boolDisable)
{}
FileAttachment.OnChange = LeafControl.OnChange;
FileAttachment.OnBlur = LeafControl.OnBlur;
FileAttachment.OnMouseDown = LeafControl.OnMouseDown;
FileAttachment.OnMouseUp = LeafControl.OnMouseUp;
FileAttachment.OnKeyPress = LeafControl.OnKeyPress;
FileAttachment.IsValid = LeafControl.IsValid;
FileAttachment.IsSelected = LeafControl.IsSelected;
FileAttachment.Select = LeafControl.Select;
FileAttachment.UnSelect = LeafControl.UnSelect;
FileAttachment.Highlight = LeafControl.Highlight;
FileAttachment.RemoveHighlight = LeafControl.RemoveHighlight;
FileAttachment.OnMouseOver = LeafControl.OnMouseOver;
FileAttachment.OnMouseOut = LeafControl.OnMouseOut;
FileAttachment.OnBeforeDialog = LeafControl.OnBeforeDialog;
FileAttachment.OnAfterDialog = LeafControl.OnAfterDialog;
function InDocUI()
{}
InDocUI.SetDisable = function(objControl, boolDisable)
{}
InDocUI.OnClick = function(objControl, objEvent)
{Util.StopEventProprogation(objEvent);
if (!BaseControl.CanHandleEvents())
{return false;}
objControl = BaseControl.GetParentInfoPathControl(objControl);
;
var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
if (ViewDataNode.IsDisabled(objViewDataNode))
{return false;}
var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var strXmlToEdit = InDocUI.GetXmlToEdit(objSnippetElement);
;
if (!Util.IsNonEmptyString(strXmlToEdit))
{return false;}
var strAction = InDocUI.GetAction(objSnippetElement);
;
if (!Util.IsNonEmptyString(strAction))
{return false;}
if (objControl.style.display == "none")
{;
return false;}
var objViewDataNode = ViewDataNode_GetViewDataNodeFromHtml(objControl);
var objCollectionViewDataNode = InDocUI.GetCollectionForInDocUI(objViewDataNode);
if (!ViewDataNode.IsDisabled(objCollectionViewDataNode) && !ViewDataNode.IsSigned(objCollectionViewDataNode))
{var strScriptToExecute = HoverMenu.ScriptToExecute[strAction] + "('" + ViewDataNode.GetHtmlId(objCollectionViewDataNode) + "','" + strXmlToEdit +"');";
try
{eval(strScriptToExecute);}
catch(e)
{;}}
return false;}
InDocUI.OnMouseOver = function(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var objParent = BaseControl.GetParentInfoPathControl(objControl);
if (objParent != null)
{var funcOnMouseOver = BaseControl.FindFunction(objParent, "OnMouseOver");
funcOnMouseOver(objParent, objEvent);}
LeafControl.OnMouseOver(objControl, objEvent);}
InDocUI.OnMouseOut = function(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var objParent = BaseControl.GetParentInfoPathControl(objControl);
if (objParent != null)
{var funcOnMouseOut = BaseControl.FindFunction(objParent, "OnMouseOut");
funcOnMouseOut(objParent, objEvent);}
LeafControl.OnMouseOut(objControl, objEvent);}
InDocUI.GetInDocUIForCollection = function(objCollectionControl)
{var objPotentialInDocUI = BaseControl.GetNextSiblingInfoPathControl(objCollectionControl);
if (objCollectionControl.getAttribute("scriptclass") == "Section" &&
objPotentialInDocUI != null &&
objPotentialInDocUI.getAttribute("scriptclass") == "InDocSign")
{objPotentialInDocUI = BaseControl.GetNextSiblingInfoPathControl(objPotentialInDocUI);
;
if (objPotentialInDocUI.getAttribute("scriptclass") != "InDocUI")
{objPotentialInDocUI = null;}}
return objPotentialInDocUI;}
InDocUI.GetCollectionForInDocUI = function(objViewDataNode)
{var objCollectionViewDataNode = InDocUI_GetCollectionViewDataForInDocUI(objViewDataNode);
return objCollectionViewDataNode;}
function InDocUI_GetCollectionViewDataForInDocUI(objViewDataNode)
{var objCollectionViewDataNode = null;
var arrDataNodeSiblings = ViewDataNode.GetChildNodes(ViewDataNode.GetParent(objViewDataNode));
var boolFoundSelf = false;
for (var nSiblingIndex = arrDataNodeSiblings.length - 1; nSiblingIndex >= 0; nSiblingIndex--)
{if (boolFoundSelf)
{var nType = Snippet.GetSnippetType(ViewDataNode_GetSnippetElement(arrDataNodeSiblings[nSiblingIndex]));
if (nType == 4 || nType == 2)
{objCollectionViewDataNode = arrDataNodeSiblings[nSiblingIndex];
break;}}
else if (arrDataNodeSiblings[nSiblingIndex] == objViewDataNode)
{boolFoundSelf = true;}}
return objCollectionViewDataNode;}
InDocUI.RestoreFocus = InDocUI_RestoreFocus;
function InDocUI_RestoreFocus(objControl)
{if (objControl == null)
{return;}
if (objControl.style.display == "none")
{var objViewDataNode = ViewDataNode_GetViewDataNodeFromHtml(objControl);
var objCollectionViewDataNode = InDocUI.GetCollectionForInDocUI(objViewDataNode);
var objCollectionControl = ViewDataNode_GetHtmlControlFromViewDataNode(objCollectionViewDataNode);
var arrChildInfoPathControls = BaseControl.GetChildInfoPathControls(objCollectionControl);
if (arrChildInfoPathControls.length > 0)
{SelectionService.Select(arrChildInfoPathControls[arrChildInfoPathControls.length - 1]);}
return;}
var objAnchor = Util.FindFirstFocusableHtmlChildControl(objControl);
;
objAnchor.focus();
objAnchor.focus();}
InDocUI.OnFocus = function(objControl, eventObj)
{var objParentControl = BaseControl.GetParentInfoPathControl(objControl);
if (objParentControl != null)
{LeafControl.OnFocus(objParentControl, eventObj);}}
InDocUI.GetXmlToEdit = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[0];}
InDocUI.GetAction = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[1];}
InDocUI.GetInDocUIType = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[2];}
InDocUI.GetUIText = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[3];}
InDocUI.GetTabIndex = function(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[4];}
InDocUI.GetImage = function(objSnippetElement)
{var nInDocUIType = InDocUI.GetInDocUIType(objSnippetElement);
switch (nInDocUIType)
{case (0):
{var rev = Util.FindHashForServerImage("MergedImage2.png");
return "vertical-align:middle;width:10;height:10;overflow:hidden;background-image:url(/_layouts/inc/MergedImage2.png" + rev + ");background-position:-20 -7";}
case (1):
{var rev = Util.FindHashForServerImage("MergedImage1.gif");
return "vertical-align:middle;width:10;height:10;overflow:hidden;background-image:url(/_layouts/inc/MergedImage1.gif" + rev + ");background-position:-55 -10";}
default:
{;}}}
InDocUI.CheckIfShouldShow = function(objViewDataNode)
{var objCollectionViewDataNode = InDocUI_GetCollectionViewDataForInDocUI(objViewDataNode);
if (objCollectionViewDataNode != null)
{if (IP_Collection.IsSigned(objCollectionViewDataNode))
{return false;}
var strClassName = Snippet.GetScriptClass(ViewDataNode_GetSnippetElement(objCollectionViewDataNode));
var arrDataCollectionChildren = ViewDataNode.GetChildNodes(objCollectionViewDataNode);
if (strClassName == "Section")
{if (arrDataCollectionChildren != null && arrDataCollectionChildren.length >= 1)
{return false;}}
for (var nIndex = 0; nIndex < arrDataCollectionChildren.length; nIndex++)
{if (Container.IsSigned(arrDataCollectionChildren[nIndex]))
{return false;}}}
return true;}
InDocUI.Render = InDocUI_Render;
function InDocUI_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var strHtmlId = LeafControl_InitializeViewDataNode(strParentHtmlId, objViewDataNode, objSnippetElement);
var templateType = View.GetTemplateType();
var arrTemplate = InDocUI_Template;
if (templateType == 1)
{arrTemplate = InDocUI_PrintTemplate;
;
return;}
var boolRenderedWrappingSpan = LeafControl_RenderBeginWrappingSpan(strHtmlId, objViewDataNode, objSnippetElement, arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[0]);
var boolShouldShow = InDocUI.CheckIfShouldShow(objViewDataNode);
if (!boolShouldShow)
{ViewDataNode.SetHiddenNoHTML(objViewDataNode, true );}
var styleAttribute = boolShouldShow ? "padding-left:0px; display:block;" : "padding-left:0px; display:none;";
arrHtmlToInsertBuilder.push(" ");
LeafControl_OutputAttribute("style", styleAttribute, arrHtmlToInsertBuilder);
LeafControl_RenderLeafAttributes(
strHtmlId,
objViewDataNode,
objSnippetElement,
true ,
false ,
arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[1]);
arrHtmlToInsertBuilder.push(" ");
LeafControl_OutputAttribute("align", BaseControl_GetTextAlignment(objSnippetElement), arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[2]);
arrHtmlToInsertBuilder.push(InDocUI.GetImage(objSnippetElement));
arrHtmlToInsertBuilder.push(arrTemplate[3]);
arrHtmlToInsertBuilder.push(" ");
LeafControl_OutputConditionalAttribute("tabIndex", InDocUI.GetTabIndex(objSnippetElement), arrHtmlToInsertBuilder);
arrHtmlToInsertBuilder.push(arrTemplate[4]);
arrHtmlToInsertBuilder.push(STSHtmlEncode(InDocUI.GetUIText(objSnippetElement)));
arrHtmlToInsertBuilder.push(arrTemplate[6]);
if (boolRenderedWrappingSpan)
{LeafControl_RenderEndWrappingSpan(arrHtmlToInsertBuilder);}}
InDocUI.IsFocusable = InDocUI_IsFocusable;
function InDocUI_IsFocusable()
{return true;}
InDocUI.OnAfterCreate = LeafControl.OnAfterCreate;
InDocUI.Select = LeafControl.Select;
InDocUI.UnSelect = LeafControl.UnSelect;
InDocUI.Highlight = LeafControl.Highlight;
InDocUI.RemoveHighlight = LeafControl.RemoveHighlight;
InDocUI.SetHidden = LeafControl.SetHidden;
function View()
{}
View.k_nPostbackReasonDefault = 0;
View.k_nPostbackReasonNoButton = 5;
View.k_nPostbackReasonBrowserBack = 25;
View.k_nPostbackTypeOther = 0;
View.boolIsSubmitCalled = false;
function View_OnPostback()
{HoverMenu_ResetWidgetMap();
RadioButton.GroupNameId = 0;}
function View_SubmitForm(boolForceFullPostback, nPostbackReason, nPostbackType, boolDoNotHandleException)
{if (PostbackBody.intPostbacksInProgress > 0 && !boolForceFullPostback)
{return;}
if (PostbackBody.boolPostbacksBlocked)
{PostbackBody.postbackNeeded = new Array(boolForceFullPostback, nPostbackReason, nPostbackType, boolDoNotHandleException);
return;}
PostbackBody.postbackNeeded = null;
View.boolIsSubmitCalled = true;
PostbackBody.intPostbacksInProgress++;
try
{;
View_OnPostback();
if (View.GetTemplateType() == 1)
{PostbackBody.intPostbacksInProgress--;
;
return;}
if(EventLog.objStaticData != null)
{EventLog.objStaticData.PostbackReason = nPostbackReason;
EventLog.objStaticData.PostbackType = nPostbackType;}
if (nPostbackReason != 19)
{EventLog_EnsureEventLogStartEntry();}
if (UserAgentInfo.strBrowser == 1)
{for (var formIndex = 0; formIndex < document.forms.length; formIndex ++)
{try
{window.external.AutoCompleteSaveForm(document.forms[formIndex]);}
catch (e)
{}}}
PostbackBody_Submit(boolForceFullPostback);}
catch (e)
{if (boolDoNotHandleException)
{PostbackBody.intPostbacksInProgress--;
throw e;}
;
PostbackBody_HandlePostbackError(
IntlCoreStrings.k_strOtherPostbackFailure,
5);}}
function View_PostbackComplete()
{View.boolIsSubmitCalled = false;
;
View_OnPostback();
SelectionService_ResetState(CurrentFormData_IsValidViewDataTree());
EventLog_Initialize(false);
EventLog_EnsureEventLogStartEntry();
PostbackBody_HideWaitUI();
View_SetBodyDirection();
if (CurrentFormData.UserMessages() != null &&
CurrentFormData.UserMessages().length > 0 &&
CurrentFormData.UserMessages()[0][0] == 8)
{View_PostbackComplete2();}
else
{Dialog.HideDialogWithCallback(View_PostbackComplete2);}}
function View_PostbackComplete2()
{if (PostbackBody.RetryingPostback)
{return;}
eval("g_aToolBarButtons = null");
g_fRTEMenuMoved = true;
if (typeof(g_strRTEDialogHelperID) != "undefined")
{var objDialogHelper = document.getElementById(g_strRTEDialogHelperID);
if (objDialogHelper != null)
{objDialogHelper.parentNode.removeChild(objDialogHelper);}}
View_UpdatePostbackCounter();
View.UpdatePageTitle();
RichTextBox_DetatchAllEvents();
UserMessages.ShowMessages(View.OnFinishUserMessages);}
function View_CanNavigateToUrl(strUrl)
{if (!Util.IsNullOrEmptyString(strUrl))
{return (window.parent == null ||
window.parent == window ||
encodeURIComponent(window.parent.location.href) != encodeURIComponent(strUrl));}
return false;}
View.OnFinishUserMessages = View_OnFinishUserMessages;
function View_OnFinishUserMessages()
{if (CurrentFormData.ShouldFocusFirstInvalidControl())
{ErrorVisualization.FocusNextInvalidControl(null);}
var boolIsDocumentClosed = UserMessages.boolDocumentClosed == true;
EventLog_Initialize(boolIsDocumentClosed);
EventLog_EnsureEventLogStartEntry();
if (boolIsDocumentClosed)
{var strUrl = CurrentFormData.UrlToNavigateToOnClose();
if (View_CanNavigateToUrl(strUrl))
{Util.Navigate(strUrl);}
else if (!CurrentFormData.IsHosted())
{UserMessages.boolNeedPostBack = true;}
else
{var objXmlFormView = document.getElementById("__XmlFormView");
if (!(typeof(objXmlFormView) == "undefined" ||
objXmlFormView == null))
{Util.SetInnerText(objXmlFormView, "");}
Dialog.ShowFinalMessage(IntlCoreStrings.k_strErrorFormClosed, true );}}
ContactPicker.OnPostBackComplete();
if (UserMessages.boolNeedPostBack)
{PostbackBody.PerformFullPagePostback();}}
function View_SetBodyDirection()
{if (CurrentFormData.IsHosted())
{var viewHtmlContainer = document.getElementById("__ViewContainer");
if (viewHtmlContainer != null && viewHtmlContainer.parentNode.style.direction == "rtl")
{document.body.style.direction = "rtl";}}}
View.UpdatePageTitle = View_UpdatePageTitle;
function View_UpdatePageTitle()
{var strTitle = CurrentFormData.GetPageTitle();
if (!Util.IsNullOrEmptyString(strTitle))
{document.title = strTitle;}}
function View_RenderAfterPostbackInternal()
{var printView = (View.GetTemplateType() == 1);
Toolbar.Show(true);
if (CurrentFormData.EditingSessionId() != "" &&
UserMessages.boolDocumentClosed != true)
{Snippet_BuildSnippetList();
g_objMultipleBindingMap = new Array();
g_objMultipleBindingIdMap = new Array();
Container_InitializeViewDataNodes(null ,
Snippet.GetSnippetTree(),
CurrentFormData.ViewDataTree());
View.GenerateAndInsertHtmlView();
if (!printView)
{Toolbar.RefreshViewDropdown();
SelectionService.RestoreFocus();}}}
View.RenderAfterPostback = View_RenderAfterPostback;
function View_RenderAfterPostback()
{InDocSign_RenderAfterPostback(View_RenderAfterPostbackInternal);}
function View_UpdatePostbackCounter()
{if (UserAgentInfo.strBrowser == 1)
{var objPostbackCounter = document.getElementById("__PostbackCounter");
;
if (objPostbackCounter != null)
{var intCurrentCounter = 0;
var strPostbackCounter = objPostbackCounter.innerHTML;
if (!Util.IsNullOrEmptyString(strPostbackCounter))
{strPostbackCounter = Util.Trim(strPostbackCounter);
intCurrentCounter = parseInt(strPostbackCounter, 10);}
else if (CurrentFormData.PostbackCounter != null)
{intCurrentCounter = CurrentFormData.PostbackCounter();}
;
var strNewPostbackCounter = "" + (intCurrentCounter + 1);
;
objPostbackCounter.innerHTML = strNewPostbackCounter;}}}
View.PreSubmitActions = View_PreSubmitActions;
function View_PreSubmitActions()
{var objInvalidViewDataNode = ErrorVisualization.FindNextInvalidControl(null);
if (objInvalidViewDataNode != null)
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strSubmitBeforeErrors, true);
var objInvalidControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objInvalidViewDataNode);
if (objInvalidControl != null)
{BaseControl.RestoreFocus(objInvalidControl);}
return false;}
else
{if (EventLog.Count() > 1 && CurrentFormData.RefreshViewBeforeSubmit())
{UserMessages.ShowAlertMessage(IntlCoreStrings.k_strSubmitPromptForRefresh, true);
View_SubmitForm(false , 18, 0, false );
return false;}}
return true;}
View.GenerateAndInsertHtmlView = View_GenerateAndInsertHtmlView;
function View_GenerateAndInsertHtmlView()
{var viewHtmlContainer = document.getElementById("__ViewContainer");
g_rgControlsTabOrder = null;
;
if (viewHtmlContainer != null)
{if (typeof(g_objMultipleBindingMap) == "undefined")
{g_objMultipleBindingMap = new Array();
g_objMultipleBindingIdMap = new Array();}
g_arrViewDataHtmlMap = new Array();
var arrHtmlToInsertBuilder = new Array();
View.Render(
CurrentFormData.ViewDataTree(),
Snippet.GetSnippetTree(),
null,
arrHtmlToInsertBuilder);
View.UpdateHtml(arrHtmlToInsertBuilder, viewHtmlContainer);
window.setTimeout("View_PostCreate()", 5);}}
function View_PostCreate()
{var objViewDataTree = CurrentFormData.ViewDataTree();
ViewDataNode.FireOnAfterCreate(objViewDataTree);
CurrentFormData.MarkTreesAreMerged();
g_objMultipleBindingMap = null;}
View.UpdateHtml = View_UpdateHtml;
function View_UpdateHtml(arrHtmlToInsertBuilder, objHtmlContainer)
{if (arrHtmlToInsertBuilder == null || objHtmlContainer == null)
{;
return;}
var strHtml = arrHtmlToInsertBuilder.join('');
objHtmlContainer.innerHTML = strHtml;}
View.Render = View_Render;
function View_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{(objViewDataNode._objViewDataNodeParent = null);
IP_Collection.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
View_Template);};
View.GetName= function(objSnippetElement)
{var strViewName = "";
try
{strViewName = Snippet.GetContent(objSnippetElement)[4][0];}
catch(e)
{}
return strViewName;}
View.GetDirection= function()
{var intDirection = 0;
try
{intDirection = g_objSnippetTree[10];}
catch(e)
{}
;
return intDirection;}
View.GetTemplateType = function()
{var templateType = 0;
try
{var templateType = Collection_GetCollectionContent(CurrentFormData.ViewDataTree())[1];}
catch(e)
{}
;
return templateType;}
View.RestoreFocus = function(objControl)
{if (View.GetTemplateType() == 1)
{return;}
var objFirstFocusableChild = BaseControl.FindFirstFocusableChildControl(objControl);
if (objFirstFocusableChild != null)
{var funcRestoreFocus = BaseControl.FindFunction(objFirstFocusableChild, "RestoreFocus", true);
funcRestoreFocus(objFirstFocusableChild);}}
View.SetDisable = function(objControl, boolDisable)
{}
View.ResolveSpecialValue = StructuralEditingControl.ResolveSpecialValue;
View.OnAfterCreate = BaseControl.OnAfterCreate;
View.OnClick = BaseControl.OnClick;
View.OnFocus = BaseControl.OnFocus;
View.OnBlur = BaseControl.OnBlur;
View.OnMouseOver = BaseControl.OnMouseOver;
View.OnMouseOut = BaseControl.OnMouseOut;
View.OnMouseDown = BaseControl.OnMouseDown;
View.OnMouseUp = BaseControl.OnMouseUp;
View.OnKeyPress = BaseControl.OnKeyPress;
View.IsValid = BaseControl.IsValid;
View.IsSelected = BaseControl.IsSelected;
View.Select = BaseControl.Select;
View.UnSelect = BaseControl.UnSelect;
function ContactPicker()
{}
var ObjectType_None              = 0;
var ObjectType_User              = 1;
var ObjectType_DistributionList  = 2;
var ObjectType_SharePointGroup   = 3;
var ObjectType_SecurityGroup     = 4;
var ObjectType_SmtpAddress       = 5;
ContactPicker.GetFormatting = BaseControl.GetFormatting;
ContactPicker.RefreshValidity = BaseControl.RefreshValidity;
ContactPicker.GetValueFromControl = BaseControl.GetValueFromControl;
ContactPicker.SetValueOfControl = BaseControl.SetValueOfControl;
ContactPicker.IsValid = LeafControl.IsValid;
ContactPicker.IsSelected = LeafControl.IsSelected;
ContactPicker.Select = LeafControl.Select;
ContactPicker.objCheckNamesOnControl = null;
ContactPicker.arrDeferredAddEventLog = new Array();
ContactPicker.fUseContentEditableDiv;
ContactPicker.IsFocusable =
function ContactPicker_IsFocusable()
{return true;}
ContactPicker.RestoreFocus =
function ContactPicker_RestoreFocus(objControl)
{;
SelectionService.Select(objControl);
var objEditBox;
if (ContactPicker.fUseContentEditableDiv)
{var objEditBox = document.getElementById(objControl.id + "_RecipientsList");
objEditBox.focus();
objEditBox.focus();
var objRange = document.body.createTextRange();
objRange.moveToElementText(objEditBox);
objRange.collapse(false);
objRange.select();}
else
{objEditBox = document.getElementById(objControl.id + "_EditBox");
objEditBox.focus();
objEditBox.focus();}}
ContactPicker.Render =
function ContactPicker_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var templateType = View.GetTemplateType();
var arrTemplate = ContactPicker_Template;
if (templateType == 1)
{arrTemplate = ContactPicker_PrintTemplate;}
var arrLeafContent = (ViewDataNode.GetContent(objViewDataNode)[2]);
if (arrLeafContent.length > 2)
ContactPicker.fUseContentEditableDiv = arrLeafContent[2];
else
ContactPicker.fUseContentEditableDiv = UserAgentInfo.strBrowser == 1;
LeafControl.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate);}
ContactPicker.ResolveSpecialValue =
function ContactPicker_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{;
;
;
;
var objResult = LeafControl.ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId);
if (objResult == null)
{var arrLeafSnippetContent = (Snippet.GetContent(objSnippetElement)[3])
switch (nSpecialValue)
{case 10:
objResult = LeafControl_EncodeAttributeValue(arrLeafSnippetContent[0]);
break;
case 11:
objResult = STSHtmlEncode(arrLeafSnippetContent[1]);
break;
case 12:
objResult = arrLeafSnippetContent[2];
break;
case 13:
objResult = arrLeafSnippetContent[3];
case 14:
objResult = '"' + arrLeafSnippetContent[3] + '"';
break;
case 15:
objResult = '"' + IntlCoreStrings.k_strContactPickerAddressButtonTitle + '"';
break;
case 16:
objResult = '"' + IntlCoreStrings.k_strContactPickerResolveButtonTitle + '"';
break;}}
return objResult;}
ContactPicker.GetPickerDialogParam =
function ContactPicker_GetPickerDialogParam(objControl)
{var objSnippetElement = Snippet.GetSnippetElementFromHtml(objControl);
var arrLeafSnippetContent = (Snippet.GetContent(objSnippetElement)[3]);
return arrLeafSnippetContent[4];}
ContactPicker.GetOriginalRecipientsList =
function ContactPicker_GetOriginalRecipientsList(objControl)
{var objViewDataNode = ViewDataNode.GetViewDataNodeFromHtml(objControl);
var arrLeafContent = (ViewDataNode.GetContent(objViewDataNode)[2]);
if (arrLeafContent.length == 0)
{return new Array();}
return arrLeafContent[1];}
ContactPicker.OnAfterCreate = ContactPicker_OnAfterCreate;
function ContactPicker_OnAfterCreate(objViewDataNode)
{var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl == null)
{return;}
var arrLeafContent = (ViewDataNode.GetContent(objViewDataNode)[2]);
if (arrLeafContent.length > 2)
ContactPicker.fUseContentEditableDiv = arrLeafContent[2];
else
ContactPicker.fUseContentEditableDiv = UserAgentInfo.strBrowser == 1;
LeafControl.OnAfterCreate(objViewDataNode);
BaseControl.RefreshVisualState(objControl);
if (UserAgentInfo.strBrowser == 1)
{var objRecipList = document.getElementById(objControl.id + "_RecipientsList");
if (ContactPicker.fUseContentEditableDiv)
{var maxLines = parseInt(objControl.maxlines);
objRecipList.maxHeight =  maxLines * objControl.firstChild.offsetHeight;
objRecipList.style.setExpression("height", "this.scrollHeight<this.maxHeight? this.scrollHeight: this.maxHeight");}
else
{objRecipList.style.display = "none";
var objNCEContactPicker = document.getElementById(objControl.id + "_NCEContactPicker");
objNCEContactPicker.style.display = "block";}}
if (arrLeafContent.length > 0)
{;
var checkNames = arrLeafContent[0];
var arrRecipients = arrLeafContent[1];
var allResolved = ContactPicker.FillRecipientsList(objControl, arrRecipients);
if (checkNames)
{if (!allResolved)
{ContactPicker.objCheckNamesOnControl = objControl;}
else
{ContactPicker.objCheckNamesOnControl = null;}}}
ContactPicker.OnPostBackComplete();}
ContactPicker.SetDisable =
function ContactPicker_SetDisable(objControl, boolDisable)
{if (ContactPicker.fUseContentEditableDiv)
{var objRecipList = document.getElementById(objControl.id + "_RecipientsList");}
else
{var objRecipList = document.getElementById(objControl.id + "_EditBox");}
if (boolDisable)
{objControl.setAttribute("disabled", "disabled");
objRecipList.setAttribute("disabled", "disabled");}
else
{objControl.removeAttribute("disabled");
objRecipList.removeAttribute("disabled");}
if (View.GetTemplateType() == 0)
{var objAddressButton = document.getElementById(objControl.id + "_AddressButton");
var objResolveButton = document.getElementById(objControl.id + "_ResolveButton");
if (boolDisable)
{objAddressButton.setAttribute("disabled", "disabled");
objResolveButton.setAttribute("disabled", "disabled");}
else
{objAddressButton.removeAttribute("disabled");
objResolveButton.removeAttribute("disabled");}}}
ContactPicker.OnFocus =
function ContactPicker_OnFocus(objControl, objEvent)
{LeafControl.OnFocus(objControl, objEvent);}
ContactPicker.OnBlur =
function ContactPicker_OnBlur(objControl, objEvent)
{if (!BaseControl.CanHandleEvents())
{return;}
var arrRecipients = ContactPicker.BuildRecipientsList(objControl);
if (ContactPicker.AddEventLogEntryIfModified(objControl, arrRecipients, true))
{objControl.setAttribute("needspostback", "true");}}
ContactPicker.UnSelect =
function ContactPicker_UnSelect(objControl)
{LeafControl.UnSelect(objControl);
if (objControl.getAttribute("needspostback"))
{objControl.removeAttribute("needspostback");
ContactPicker.SubmitForm();}
else
{var arrRecipients = ContactPicker.BuildRecipientsList(objControl);
ContactPicker.FillRecipientsList(objControl, arrRecipients);}}
ContactPicker.OnClick =
function ContactPicker_OnClick(objControl, objEvent)
{LeafControl.OnClick(objControl, objEvent);}
ContactPicker.OnKeyDown =
function ContactPicker_OnKeyDown(objControl, objEvent)
{var nVirtualKey = KeyboardService.GetVirtualKey(objEvent);
switch (nVirtualKey)
{case 14:
ContactPicker.ResolveAll(objControl);
objEvent.returnValue = false;
break;
case 13:
ContactPicker.ShowAddressBook(objControl, objControl, ContactPicker.AddressBookCallback, true);
objEvent.returnValue = false;
break;
case 12:
case 15:
case 16:
case 17:
break;
case 1:
case 0:
objEvent.returnValue = false;
break;
default:
if (objEvent.ctrlKey && objEvent.keyCode >=65 && objEvent.keyCode <= 90)
{objEvent.returnValue = false;}
break;}
return objEvent.returnValue;}
ContactPicker.OnShowAddressBookClick =
function ContactPicker_OnShowAddressBookClick(objButton, objEvent)
{var objControl = ContactPicker.GetInfoPathControl(objButton);
if (objEvent.currentTarget && objEvent.target && objEvent.currentTarget != objEvent.target)
return;
ContactPicker.ShowAddressBook(objControl, objControl, ContactPicker.AddressBookCallback, true);
Util.StopEventProprogation(objEvent);
objEvent.returnValue = false;
return false;}
ContactPicker.OnResolveAllClick =
function ContactPicker_OnResolveAllClick(objButton, objEvent)
{ContactPicker.ResolveAll(ContactPicker.GetInfoPathControl(objButton));
Util.StopEventProprogation(objEvent);
objEvent.returnValue = false;
return false;}
ContactPicker.OnButtonFocus =
function ContactPicker_OnButtonFocus(objButton, objEvent)
{return ContactPicker.OnFocus(ContactPicker.GetInfoPathControl(objButton), objEvent);}
ContactPicker.OnEditBoxFocus =
function ContactPicker_OnEditBoxFocus(objEditBox, objEvent)
{if (objEvent == null && UserAgentInfo.strBrowser == 1)
objEvent = eval("window.event");
return ContactPicker.OnFocus(ContactPicker.GetInfoPathControl(objEditBox), objEvent);}
ContactPicker.OnEditBoxBlur =
function ContactPicker_OnEditBoxBlur(objEditBox, objEvent)
{ContactPicker.OnBlur(ContactPicker.GetInfoPathControl(objEditBox), objEvent);}
ContactPicker.OnEditBoxMouseDown =
function ContactPicker_OnEditBoxMouseDown(objEditBox, objEvent)
{;
var objRecip = ContactPicker.FindRecipientAncestor(objEvent.srcElement);
if (objRecip)
{if (document.selection.type != "None")
{var objSelectionRange = document.selection.createRange();
var objRecipRange = document.body.createTextRange();
objRecipRange.moveToElementText(objRecip);
if (objSelectionRange.inRange(objRecipRange))
{objRecip.dragDrop();}}}}
ContactPicker.OnEditBoxDragOver =
function ContactPicker_OnEditBoxDragOver(objEditBox, objEvent)
{;
if (ContactPicker.FindRecipientAncestor(objEvent.srcElement))
{objEvent.dataTransfer.dropEffect = "none";
objEvent.returnValue = false;}}
ContactPicker.OnEditBoxDrop =
function ContactPicker_OnEditBoxDrop(objEditBox, objEvent)
{;
ContactPicker.arrDeferredAddEventLog.push(ContactPicker.GetInfoPathControl(objEditBox));}
ContactPicker.OnEditBoxActivate =
function ContactPicker_OnEditBoxActivate(objEditBox, objEvent)
{;
var objRecip = ContactPicker.FindRecipientAncestor(objEvent.srcElement);
if (objRecip)
{objEvent.returnValue = false;
window.setTimeout(function() { ContactPicker.SelectRecipientObject(objRecip); }, 0);}}
ContactPicker.OnEditBoxControlSelect =
function ContactPicker_OnEditBoxControlSelect(objEditBox, objEvent)
{;
objEvent.returnValue = false;
var objControl = ContactPicker.GetInfoPathControl(objEditBox);
window.setTimeout(function() { ContactPicker.RestoreFocus(objControl); }, 0);}
ContactPicker.SelectRecipientObject =
function ContactPicker_SelectRecipientObject(objRecip)
{var objRange = document.selection.createRange();
objRange.moveToElementText(objRecip);
objRange.moveStart("character", -1);
objRange.moveEnd("character", 1);
objRange.select();}
ContactPicker.GetInfoPathControl =
function ContactPicker_GetInfoPathControl(objElement)
{while (objElement.tagName != "TABLE")
{objElement = objElement.parentNode;}
var childDivs = objElement.getElementsByTagName("DIV");
for (var i in childDivs)
{if (BaseControl.IsInfoPathControl(childDivs[i]))
{return childDivs[i];}}
;
return null;}
ContactPicker.FindRecipientAncestor =
function ContactPicker_FindRecipientAncestor(objNode)
{var nMaxLevels = 4
while (objNode && nMaxLevels > 0)
{if (objNode.className.indexOf("recipient") != -1)
{return objNode;}
objNode = objNode.parentNode;
nMaxLevels--;}
return null;}
ContactPicker.OnPostBackComplete =
function ContactPicker_OnPostBackComplete()
{if (ContactPicker.objCheckNamesOnControl != null)
{var objControl = ContactPicker.objCheckNamesOnControl;
ContactPicker.objCheckNamesOnControl = null;
var objContext = new Object;
objContext.iState = 0;
objContext.iRecip = 0;
objContext.objControl = objControl;
objContext.arrRecipients = (new Array()).concat(ContactPicker.GetOriginalRecipientsList(objControl));
ContactPicker.CheckNamesCallback(objContext, null);}}
ContactPicker.CheckNamesCallback =
function ContactPicker_CheckNamesCallback(objContext, objResult)
{if (objContext.iState == 1)
{if (!objResult || objResult.iButton == 0)
{if (ContactPicker.AddEventLogEntryIfModified(objContext.objControl, objContext.arrRecipients, false))
{ContactPicker.SubmitForm();}
return;}
else if (objResult.iButton == 1)
{if (objResult.fDelete)
{objContext.arrRecipients.splice(objContext.iRecip, 1);}
else
{objContext.arrRecipients[objContext.iRecip] =
objContext.arrRecipients[objContext.iRecip] [5] [objResult.iSelected];
objContext.iRecip++;}
ContactPicker.FillRecipientsList(objContext.objControl, objContext.arrRecipients);}
else if (objResult.iButton == 2)
{objContext.iState = 2;
ContactPicker.ShowAddressBook(objContext.objControl, objContext, ContactPicker.CheckNamesCallback, false);
return;}}
else if (objContext.iState == 2)
{if (objResult)
{var arrRecipients = ContactPicker.RecipientsArrayFromABRecipients(objResult);
objContext.arrRecipients[objContext.iRecip] = arrRecipients[0];
objContext.iRecip++;}}
while (objContext.iRecip < objContext.arrRecipients.length)
{if (Util.IsNullOrEmptyString(objContext.arrRecipients[objContext.iRecip][1]))
{objContext.iState = 1;
var objArgs  = new Object;
objArgs.strName = objContext.arrRecipients[objContext.iRecip][0];
objArgs.arrSuggestions = objContext.arrRecipients[objContext.iRecip][5];
ContactPicker.ShowModalDialog(CurrentFormData.SiteUrl() + "/_layouts/ResolveRecipient.aspx", objArgs, ContactPicker.CheckNamesCallback, objContext);
return;}
objContext.iRecip++;}
if (ContactPicker.AddEventLogEntryIfModified(objContext.objControl, objContext.arrRecipients, false))
{ContactPicker.SubmitForm();}
return;}
ContactPicker.ShowAddressBook =
function ContactPicker_ShowAddressBook(objControl, objContext, funcCallback, allowMultiselect)
{var strPickerDialogParam = ContactPicker.GetPickerDialogParam(objControl);
var strUrl = CurrentFormData.GetWebUrl() + "/_layouts/ContainerPicker.aspx?" +
strPickerDialogParam +
"&MultiSelect=" + allowMultiselect.toString() +
"&DialogTitle=" + encodeURIComponent(IntlCoreStrings.k_strAddressBookTitle);
ContactPicker.ShowModalDialog(strUrl, null, funcCallback, objContext);}
ContactPicker.ShowModalDialog =
function ContactPicker_ShowModalDialog(strUrl, objArgument, funcCallback, objContext)
{var strFeatures;
var elForm = document.forms[0];
if (document.getElementById("__spPickerHasReturnValue") == null)
{var elInput = document.createElement("INPUT");
elInput.type = "hidden";
elInput.id = "__spPickerHasReturnValue";
elInput.name = "__spPickerHasReturnValue";
elForm.appendChild(elInput);}
if (document.getElementById("__spPickerHasReturnValueHolder") == null)
{var elInput = document.createElement("INPUT");
elInput.type = "hidden";
elInput.id = "__spPickerReturnValueHolder";
elInput.name = "__spPickerReturnValueHolder";
elForm.appendChild(elInput);}
if (document.getElementById("__spPickerHasReturnValue") != null)
document.getElementById("__spPickerHasReturnValue").value = "";
if (document.getElementById("__spPickerReturnValueHolder") != null)
document.getElementById("__spPickerReturnValueHolder").value = "";
if (window.showModalDialog)
{strFeatures = "resizable: yes; status: no; scroll: no; help: no; center: yes; dialogWidth : 500pt; dialogHeight : 400pt;";}
else
{strFeatures = "resizable=yes,status=no,scrollbars=no,menubar=no,directories=no,location=no,width=650,height=500";}
if(window.showModalDialog)
{var objResult = window.showModalDialog(strUrl, objArgument, strFeatures);
if (objResult == null &&
document.getElementById("__spPickerHasReturnValue") != null &&
document.getElementById("__spPickerHasReturnValue").value == "1" &&
document.getElementById("__spPickerReturnValueHolder") != null)
{objResult = document.getElementById("__spPickerReturnValueHolder").value;}
window.setTimeout(function(){ funcCallback(objContext, objResult); }, 100);}
else
{var objModalDialog = window.open(strUrl, '$__ContactPickerModalDialog__$', strFeatures);
objModalDialog.dialogArguments = objArgument;
var funcOldOnFocus = window.onfocus;
window.onfocus = function()
{if(objModalDialog && !objModalDialog.closed)
objModalDialog.focus();
else
window.onfocus = funcOldOnFocus;}
objModalDialog.onunload = function()
{if (this.location.href == "about:blank")
{return;}
var objResult = null;
if (typeof(objModalDialog.returnValue) != "undefined")
{if (objModalDialog.returnValue)
{objResult = objModalDialog.returnValue;}}
else
{if (document.getElementById("__spPickerHasReturnValue") != null &&
document.getElementById("__spPickerHasReturnValue").value == "1" &&
document.getElementById("__spPickerReturnValueHolder") != null)
{objResult = document.getElementById("__spPickerReturnValueHolder");}}
window.onfocus = funcOldOnFocus;
window.setTimeout(function(){ funcCallback(objContext, objResult); }, 100);}}}
ContactPicker.AddressBookCallback =
function ContactPicker_AddressBookCallback(objControl, strABRecipients)
{if (!strABRecipients)
{return;}
var arrRecipients = ContactPicker.BuildRecipientsList(objControl);
var arrNewRecipients = ContactPicker.RecipientsArrayFromABRecipients(strABRecipients);
arrRecipients = arrRecipients.concat(arrNewRecipients);
ContactPicker.AddEventLogEntryFromList(objControl, arrRecipients, false);
ContactPicker.SubmitForm();}
ContactPicker.EncodeRecipientsArray =
function ContactPicker_EncodeRecipientsArray(arrRecipients)
{var arrStrings = new Array();
for (var i in arrRecipients)
{arrStrings.push(
encodeURIComponent(arrRecipients[i][0]) + "/" +
encodeURIComponent(arrRecipients[i][1]) + "/" +
encodeURIComponent(arrRecipients[i][2]) + "/" +
encodeURIComponent(arrRecipients[i][3]) + "/" +
encodeURIComponent(arrRecipients[i][4])
);}
return encodeURIComponent(arrStrings.join(";"));}
ContactPicker.RecipientsArrayFromABRecipients =
function ContactPicker_RecipientsArrayFromABRecipients(strABRecipients)
{var objDocument = null;
if(document.implementation && document.implementation.createDocument)
{objDocument = document.implementation.createDocument("", "", null);}
else
{try
{objDocument = new ActiveXObject("Msxml2.DOMDocument");}
catch (e)
{return new Array();}}
objDocument.async = false;
var arrRecipients = new Array();
var iStartEntry = strABRecipients.indexOf("<Entity");
while (iStartEntry != -1)
{var iEndEntry = strABRecipients.indexOf("</Entity");
if (iEndEntry != -1)
{var strEntry = strABRecipients.slice(iStartEntry, iEndEntry);
var matchKey = strEntry.match(/Key="([^"]*)"/);
var matchName = strEntry.match(/DisplayText="([^"]*)"/);
var matchType = strEntry.match(/<Key xsi:type="xsd:string">PrincipalType<\/Key><Value xsi:type="xsd:string">([^<]*)<\/Value>/);
var strObjectId = matchKey[1];
var strDisplayName = matchName[1];
var strPrincipalType = null;
if (matchType.index > 0)
var strPrincipalType = matchType[1];
var nObjectType = ObjectType_None;
switch (strPrincipalType)
{case "User":
nObjectType = ObjectType_User;
break;
case "DistributionList":
nObjectType = ObjectType_DistributionList;
break;
case "SecurityGroup":
nObjectType = ObjectType_SecurityGroup;
break;
case "SharePointGroup":
nObjectType = ObjectType_SharePointGroup;
break;}
arrRecipients.push(new Array(strDisplayName, strObjectId, nObjectType, strDisplayName, ""));
strABRecipients = strABRecipients.slice(iEndEntry + 8, strABRecipients.length);
iStartEntry = strABRecipients.indexOf("<Entity");}
else
iStartEntry = -1;}
return arrRecipients;}
ContactPicker.ResolveAll =
function ContactPicker_ResolveAll(objControl, boolCanPostback)
{var arrRecipients = ContactPicker.BuildRecipientsList(objControl);
ContactPicker.AddEventLogEntryFromList(objControl, arrRecipients, true);
ContactPicker.SubmitForm();}
ContactPicker.AddEventLogEntry =
function ContactPicker_AddEventLogEntry(objControl)
{var arrRecipients = ContactPicker.BuildRecipientsList(objControl);
var value = "F" + ContactPicker.EncodeRecipientsArray(arrRecipients);
return EventLog_Add(
18,
objControl,
objControl.id,
"",
value,
false ,
false ,
false ,
0,
1);}
ContactPicker.AddEventLogEntryIfModified =
function ContactPicker_AddEventLogEntryIfModified(objControl, arrRecipients, boolCheckNamesAfterPostback)
{var arrOrigRecipients = ContactPicker.GetOriginalRecipientsList(objControl);
var isModified = false;
if (arrRecipients.length != arrOrigRecipients.length)
{isModified = true;}
else
{for (var i in arrRecipients)
{var arrRecip = arrRecipients[i];
var arrOrigRecip = arrOrigRecipients[i];
if (arrRecip.length < 5 ||
arrRecip[0] != arrOrigRecip[0] ||
arrRecip[1] != arrOrigRecip[1] ||
arrRecip[2] != arrOrigRecip[2] ||
arrRecip[3] != arrOrigRecip[3])
{isModified = true;
break;}}}
if (isModified)
{ContactPicker.AddEventLogEntryFromList(objControl, arrRecipients, boolCheckNamesAfterPostback);
return true;}
else
{return false;}}
ContactPicker.AddEventLogEntryFromList =
function ContactPicker_AddEventLogEntryFromList(objControl, arrRecipients, boolCheckNamesAfterPostback)
{var value = (boolCheckNamesAfterPostback? "T":"F") + ContactPicker.EncodeRecipientsArray(arrRecipients);
EventLog_Add(
18,
objControl,
objControl.id,
"",
value,
false ,
true  ,
false ,
2,
1);}
ContactPicker.SubmitForm =
function ContactPicker_SubmitForm()
{if (PostbackBody.intPostbacksInProgress == 0)
{for (var i in ContactPicker.arrDeferredAddEventLog)
{ContactPicker.AddEventLogEntry(ContactPicker.arrDeferredAddEventLog[i]);}
ContactPicker.arrDeferredAddEventLog = new Array();
View_SubmitForm(false, 2, 1, false );}}
ContactPicker.FillRecipientsList =
function ContactPicker_FillRecipientsList(objControl, arrRecipients)
{var allResolved = true;
var objRecipList = document.getElementById(objControl.id + (ContactPicker.fUseContentEditableDiv ? "_RecipientsList" : "_NCERecipientsList" ));
var objSentinel = document.createTextNode("");
objRecipList.appendChild(objSentinel);
while (objRecipList.firstChild != objSentinel)
{objRecipList.removeChild(objRecipList.firstChild);}
var oDisabled = objControl.getAttribute("disabled");
var isDisabled = oDisabled != null && oDisabled != false;
for (var i in arrRecipients)
{if (i > 0)
{objRecipList.appendChild(document.createTextNode("; "));}
var arrRecip =        arrRecipients[i];
var strDisplayName  = arrRecip[0];
var strObjectId     = arrRecip[1];
var nObjectType     = arrRecip[2];
var strRealName     = arrRecip[3];
var nOrgIndex       = arrRecip[4];
if (nObjectType == ObjectType_None)
{allResolved = false;
if (ContactPicker.fUseContentEditableDiv)
{objRecipList.appendChild(document.createTextNode(strDisplayName));}
else
{var objRecip = ContactPicker.CreateRecipientObject(strDisplayName, isDisabled);
objRecip.className = "recipientUnresolved";
objRecip.setAttribute("displayname",  strDisplayName);
objRecip.setAttribute("orgindex",	  nOrgIndex);
objRecipList.appendChild(objRecip);}}
else
{var strDisplayText = strDisplayName;
if (strDisplayName != strRealName && strDisplayName != strObjectId)
{strDisplayText = strDisplayText.concat(" <",strObjectId,">");}
strDisplayText = strDisplayText.replace(/\x20/g, String.fromCharCode(160));
var objRecip;
if (ContactPicker.fUseContentEditableDiv)
{var objInnerSpan = document.createElement("span");
objInnerSpan.contentEditable = true;
objInnerSpan.tabIndex = -1;
objInnerSpan.innerText = strDisplayText;
objRecip = document.createElement("span");
objRecip.tabIndex = -1;
objRecip.appendChild(objInnerSpan);
objRecipList.appendChild(objRecip);
objRecip.contentEditable = false;}
else
{objRecip = ContactPicker.CreateRecipientObject(strDisplayText, isDisabled);
objRecipList.appendChild(objRecip);}
if (nObjectType == ObjectType_DistributionList ||
nObjectType == ObjectType_SecurityGroup ||
nObjectType == ObjectType_SharePointGroup)
{objRecip.className = "recipientResolvedGroup";}
else
{objRecip.className = "recipientResolvedUser";}
objRecip.setAttribute("ownerid",      objControl.id);
objRecip.setAttribute("displayname",  strDisplayName);
objRecip.setAttribute("objectid",     strObjectId);
objRecip.setAttribute("objecttype",   nObjectType);
objRecip.setAttribute("realname",     strRealName);
objRecip.setAttribute("orgindex",     nOrgIndex);}}
if (objRecipList.lastChild != objSentinel)
{objRecipList.removeChild(objSentinel);}
return allResolved;}
ContactPicker.CreateRecipientObject =
function ContactPicker_CreateRecipientObject(strDisplayText, isDisabled)
{var objRecip = document.createElement("a");
Util.SetInnerText(objRecip, strDisplayText);
if (!isDisabled)
{objRecip.setAttribute("href", "#");
objRecip.tabIndex = 0;
objRecip.onclick = function(objEvent)	 { return ContactPicker.OnRecipientClick(this, objEvent); };
objRecip.onkeydown = function(objEvent) { return ContactPicker.OnRecipientKeyDown(this, objEvent); };
objRecip.onfocus = function(objEvent)	 { return ContactPicker.OnEditBoxFocus(this, objEvent); };}
else
{objRecip.tabIndex = -1;
objRecip.setAttribute("disabled", "disabled");}
return objRecip;}
ContactPicker.OnRecipientClick =
function ContactPicker_OnRecipientClick(objRecip, objEvent)
{if (objEvent == null && UserAgentInfo.strBrowser == 1)
objEvent = eval("window.event");
var i = objRecip.className.indexOf(" recipientSelected");
if (i == -1)
{objRecip.className += " recipientSelected";}
else
{objRecip.className = objRecip.className.substr(0, i);}
return false;}
ContactPicker.OnRecipientKeyDown =
function ContactPicker_OnRecipientKeyDown(objRecip, objEvent)
{if (objEvent == null && UserAgentInfo.strBrowser == 1)
objEvent = eval("window.event");
var nVirtualKey = KeyboardService.GetVirtualKey(objEvent);
switch (nVirtualKey)
{case 18:
ContactPicker.OnRecipientClick(objRecip, objEvent);
return false;
case 19:
case 20:
case 16:
ContactPicker.OnDeleteRecipient(objRecip);
return false;}}
ContactPicker.OnDeleteRecipient =
function ContactPicker_OnDeleteRecipient(objRecip)
{var objRecipList = objRecip.parentNode;
var anySelected = false;
var objNode = objRecipList.firstChild;
while (objNode)
{if (objNode.nodeType == 1 && objNode.className.indexOf("recipientSelected") != -1)
{anySelected = true;
objNode = ContactPicker.RemoveRecipientObject(objRecipList, objNode);}
else
{objNode = objNode.nextSibling;}}
if (anySelected)
{if (!objRecip.parentNode)
{var objControl = ContactPicker.GetInfoPathControl(objRecipList);
var objEditBox = document.getElementById(objControl.id + "_EditBox");
objEditBox.focus();}}
else
{objNode = ContactPicker.RemoveRecipientObject(objRecipList, objRecip);
if (objNode && objNode.focus)
{objNode.focus();}
else
{var objControl = ContactPicker.GetInfoPathControl(objRecipList);
var objEditBox = document.getElementById(objControl.id + "_EditBox");
objEditBox.focus();}}}
ContactPicker.RemoveRecipientObject =
function ContactPicker_RemoveRecipientObject(objRecipList, objNode)
{var objTemp = objNode;
objNode = objNode.nextSibling;
objRecipList.removeChild(objTemp);
if (objNode && objNode.nodeType == 3)
{objTemp = objNode;
objNode = objNode.nextSibling;
objRecipList.removeChild(objTemp);}
return objNode;}
ContactPicker.BuildRecipientsList =
function ContactPicker_BuildRecipientsList(objControl)
{var objRecipList = document.getElementById(objControl.id + (ContactPicker.fUseContentEditableDiv ? "_RecipientsList" : "_NCERecipientsList" ));
var arrRecipients =  new Array();
var strText = "";
for (var objNode = objRecipList.firstChild; objNode; objNode = objNode.nextSibling)
{if (objNode.nodeType == 3)
{strText += objNode.nodeValue;}
else if (objNode.className.indexOf("recipient") != -1)
{ContactPicker.AppendTextRecipients(strText, arrRecipients);
strText = "";
var arrRecip;
if (objNode.className.indexOf("recipientResolved") != -1)
{var strOrgIndex = "";
if (objNode.getAttribute("ownerid") == objControl.id)
{strOrgIndex = objNode.getAttribute("orgindex");}
arrRecip = new Array(objNode.getAttribute("displayname"),
objNode.getAttribute("objectid"),
objNode.getAttribute("objecttype"),
objNode.getAttribute("realname"),
strOrgIndex);
arrRecipients.push(arrRecip);}
else
{ContactPicker.AppendTextRecipients(objNode.getAttribute("displayname"), arrRecipients);}}
else if (objNode.nodeType == 1 && objNode.protocol == "mailto:")
{strText += Util.GetInnerText(objNode);}}
ContactPicker.AppendTextRecipients(strText, arrRecipients);
if (!ContactPicker.fUseContentEditableDiv)
{var objEditBox = document.getElementById(objControl.id + "_EditBox");
ContactPicker.AppendTextRecipients(objEditBox.value, arrRecipients);}
return arrRecipients;}
ContactPicker.AppendTextRecipients =
function ContactPicker_AppendTextRecipients(strText, arrRecipients)
{if (Util.IsNullOrEmptyString(strText))
{return;}
var tokens = strText.split(/[;]/);
for (var i = 0; i < tokens.length; i++)
{var name = Util.Trim(tokens[i].replace(/\xA0/g, " "));
if (Util.IsNonEmptyString(name))
{arrRecipients.push(new Array(name, "", "0", "", ""));}}}
ContactPicker.Highlight = LeafControl.Highlight;
ContactPicker.RemoveHighlight = LeafControl.RemoveHighlight;
ContactPicker.OnMouseOver = LeafControl.OnMouseOver;
ContactPicker.OnMouseOut = LeafControl.OnMouseOut;
ContactPicker.OnBeforeDialog = LeafControl.OnBeforeDialog;
ContactPicker.OnAfterDialog = LeafControl.OnAfterDialog;
ContactPicker.SetHidden = LeafControl.SetHidden;
function RichTextCollection() {}
RichTextCollection.Render = RichTextCollection_Render;
function RichTextCollection_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{objViewDataNode[2] = -1;
IP_Collection.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
RichTextCollection_Template);};
RichTextCollection.ResolveSpecialValue = StructuralEditingControl.ResolveSpecialValue;
RichTextCollection.OnChange = BaseControl.OnChange;
RichTextCollection.OnClick = BaseControl.OnClick;
RichTextCollection.OnFocus = BaseControl.OnFocus;
RichTextCollection.OnBlur = BaseControl.OnBlur;
RichTextCollection.OnMouseOver = BaseControl.OnMouseOver;
RichTextCollection.OnMouseOut = BaseControl.OnMouseOut;
RichTextCollection.OnMouseDown = BaseControl.OnMouseDown;
RichTextCollection.OnMouseUp = BaseControl.OnMouseUp;
RichTextCollection.OnKeyPress = BaseControl.OnKeyPress;
RichTextCollection.OnAfterCreate = function(objViewDataNode)
{;
;
var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl == null)
{return;}
BaseControl.RefreshVisualState(objControl);
BaseControl.OnAfterCreate(objViewDataNode);}
RichTextCollection.IsValid = BaseControl.IsValid;
RichTextCollection.IsSelected = BaseControl.IsSelected;
RichTextCollection.Select = BaseControl.Select;
RichTextCollection.UnSelect = BaseControl.UnSelect;
RichTextCollection.RestoreFocus = BaseControl.RestoreFocus;
RichTextCollection.IsSigned = StructuralEditingControl.IsSigned;
function FileAttachmentCollection() {}
FileAttachmentCollection.Render = FileAttachmentCollection_Render;
function FileAttachmentCollection_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{objViewDataNode[2] = -1;
IP_Collection.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
FileAttachmentCollection_Template);};
FileAttachmentCollection.SetHidden = function(objViewDataNode, objControl, boolVisible)
{BaseControl.RefreshVisualState(objControl);
BaseControl.SetHidden(objViewDataNode, objControl, boolVisible);}
FileAttachmentCollection.ResolveSpecialValue = StructuralEditingControl.ResolveSpecialValue;
FileAttachmentCollection.OnChange = BaseControl.OnChange;
FileAttachmentCollection.OnClick = BaseControl.OnClick;
FileAttachmentCollection.OnFocus = BaseControl.OnFocus;
FileAttachmentCollection.OnBlur = BaseControl.OnBlur;
FileAttachmentCollection.OnMouseOver = BaseControl.OnMouseOver;
FileAttachmentCollection.OnMouseOut = BaseControl.OnMouseOut;
FileAttachmentCollection.OnMouseDown = BaseControl.OnMouseDown;
FileAttachmentCollection.OnMouseUp = BaseControl.OnMouseUp;
FileAttachmentCollection.OnKeyPress = BaseControl.OnKeyPress;
FileAttachmentCollection.OnAfterCreate = function(objViewDataNode)
{;
;
var objControl = ViewDataNode_GetHtmlControlFromViewDataNodeAllowNull(objViewDataNode);
if (objControl != null)
{BaseControl.RefreshVisualState(objControl);}
BaseControl.OnAfterCreate(objViewDataNode);}
FileAttachmentCollection.IsValid = BaseControl.IsValid;
FileAttachmentCollection.IsSelected = BaseControl.IsSelected;
FileAttachmentCollection.Select = BaseControl.Select;
FileAttachmentCollection.UnSelect = BaseControl.UnSelect;
FileAttachmentCollection.RestoreFocus = BaseControl.RestoreFocus;
FileAttachmentCollection.IsSigned = StructuralEditingControl.IsSigned;
function InlineImage() {};
InlineImage.GetFormatting = function()
{return null;};
InlineImage.GetValueFromControl = BaseControl.GetValueFromControl;
InlineImage.SetValueOfControl = BaseControl.SetValueOfControl;
InlineImage.Render = InlineImage_Render;
function InlineImage_Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder)
{var arrTemplate = InlineImage_Template;
LeafControl.Render(
objViewDataNode,
objSnippetElement,
strParentHtmlId,
arrHtmlToInsertBuilder,
arrTemplate);}
InlineImage.GetImageFile = InlineImage_GetImageFile;
function InlineImage_GetImageFile(objSnippetElement)
{return (Snippet.GetContent(objSnippetElement)[3])[0];}
InlineImage.IsFocusable = InlineImage_IsFocusable;
function InlineImage_IsFocusable()
{return false;}
InlineImage.ResolveSpecialValue = InlineImage_ResolveSpecialValue;
function InlineImage_ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId)
{;
;
;
var objResult = LeafControl.ResolveSpecialValue(
nSpecialValue,
objViewDataNode,
objSnippetElement,
strParentHtmlId);
if (objResult == null)
{switch (nSpecialValue)
{case (10):
{var strImageFileName = InlineImage.GetImageFile(objSnippetElement);
if (Util.IsNullOrEmptyString(strImageFileName))
{objResult = "";}
else
{objResult = CurrentFormData.SiteUrl() +
"/_layouts/FormResource.aspx?solutionId=" +
encodeURIComponent(CurrentFormData.SolutionId()) +
"&solutionFile=" +
encodeURIComponent(strImageFileName);}
break;}
case (11):
{var objResult = (Snippet.GetContent(objSnippetElement)[3])[1];
if (objResult == null)
{objResult = "";}}}}
return objResult;}
InlineImage.OnChange = LeafControl.OnChange;
InlineImage.OnFocus = LeafControl.OnFocus;
InlineImage.OnBlur = LeafControl.OnBlur;
InlineImage.OnMouseOver = LeafControl.OnMouseOver;
InlineImage.OnMouseOut = LeafControl.OnMouseOut;
InlineImage.OnMouseDown = LeafControl.OnMouseDown;
InlineImage.OnMouseUp = LeafControl.OnMouseUp;
InlineImage.OnKeyPress = LeafControl.OnKeyPress;
InlineImage.OnAfterCreate = LeafControl.OnAfterCreate;
InlineImage.IsValid = LeafControl.IsValid;
InlineImage.IsSelected = LeafControl.IsSelected;
InlineImage.Select = LeafControl.Select;
InlineImage.UnSelect = LeafControl.UnSelect;
InlineImage.RestoreFocus = LeafControl.RestoreFocus;
InlineImage.Highlight = LeafControl.Highlight;
InlineImage.RemoveHighlight = LeafControl.RemoveHighlight;
