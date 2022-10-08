
jQuery.validator.unobtrusive.adapters.addSingleVal("validpostcode", "dependency");

jQuery.validator.addMethod("validpostcode",
    function (val, element, dependency) {
        if ($('.' + dependency).length) {
            if ($('.js-postcode-format').val() == "NL") {
                var formatnl = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
                return formatnl.test(val);
            } else if ($('.js-postcode-format').val() == "BE") {
                var formatbe = /^[1-9][0-9]{3}$/i; 
                return formatbe.test(val);
            }
        }
        return true;
    }
);

