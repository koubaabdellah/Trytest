var process = process || {env: {NODE_ENV: "development"}};
/*jslint browser: true, white: true */
;
/*! JS Utilities */
/* pure helper functions, very basic extra stuff */

function formatDateToString(mindate){
	var day = ("00"+mindate.getDate()).slice(-2);
	var month = ("00"+(mindate.getMonth() + 1)).slice(-2);
	return day+"-"+month+"-"+mindate.getFullYear();
}

function formatDateToStringForFile(mindate){
    var day = ("00"+mindate.getDate()).slice(-2);
    var month = ("00"+(mindate.getMonth() + 1)).slice(-2);
    return day+"-"+month+"-"+mindate.getFullYear()+"_"+mindate.getHours()+"-"+mindate.getMinutes()+"-"+mindate.getSeconds();
}

function formatTimeToString(mindate){
	var hours=("00"+mindate.getHours()).slice(-2);
	var minutes=("00"+mindate.getMinutes()).slice(-2);
	return hours+":"+minutes;
}

function dateTimeFormatter(){
	var now=new Date();
	return formatDateToString(now)+" "+formatTimeToString(now);
}

function validateDate(dayField,monthField,yearField){
	var dayValue=parseInteger($(dayField).val());
	// in this method not -1!!!!!
	var monthValue=parseInteger($(monthField).val());
	var yearValue=parseInteger($(yearField).val());
	if (monthWith30Days(monthValue) && dayValue===31){
		$(dayField).val("");
		dayField.parent().find("ul.error-messages-list li").remove();
		return false;
	} else if (monthValue === 2) {
		if (dayValue > 29 || (dayValue === 29 && !isLeapYear(yearValue))) {
			$(dayField).val("");
			dayField.parent().find("ul.error-messages-list li").remove();
			return false;
		}
	} else {
		return !hasAny0Value(dayValue, monthValue, yearValue);
	}
}

function parseInteger(value) {
	return parseInt(value) || 0;
}

function isLeapYear(yearValue) {
	return (yearValue % 4 === 0 && (yearValue % 100 !== 0 || yearValue % 400 === 0));
}

function monthWith30Days(monthValue) {
	return (monthValue===4 || monthValue===6 || monthValue===9 || monthValue===11);
}

function hasAny0Value(dayValue, monthValue, yearValue) {
	return (dayValue === 0 || monthValue === 0 || yearValue === 0);
}

function hideAndDisableElement(element){
    element.hide();
    element.prop('disabled', true);
}

function showAndDEnableElement(element){
    element.show();
    element.prop('disabled', false);
}

