$.validator.unobtrusive.adapters.addBool("validiban");

$.validator.addMethod("validiban",
    function (val, element) {
        console.log('iban validation');
        //Validate if input is empty
        if (val == "") {
            return true;
        }
        return IBAN.isValid(val);
    }
);
$.validator.unobtrusive.adapters.addBool("validbic");
$.validator.addMethod("validbic",
    function (value, element) {
        console.log('bic validation');
        return this.optional(element) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(value.toUpperCase());
    }
);