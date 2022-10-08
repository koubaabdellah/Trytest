/* ************************************************** */
/* **************** OLD FUNCTIONS     *************** */
/* ************************************************** */

function change_status(sStatus, iGebruikerID)
{
    window.location = "veranderStatusGebruiker.php?status=" + sStatus + "&gebruikerID=" + iGebruikerID;
}
;

function change_statusPortal(sStatus, iGebruikerID)
{
    window.location = "veranderStatusGebruiker.php?statusPortal=" + sStatus + "&gebruikerID=" + iGebruikerID;
}
;


//onSubmit="checkPassword(this, this.changepwd.value);return false;"

/**
 * Validate a strong password
 * Passowrd must contain at least one lowercase char, uppercase char, number and special char (only @$%^!*)
 */

$(function ()
{
    $('form[name="changePasswordForm"]').each(function ()
    {
        var $form = $(this);
        $form.password = new password($form);

    });
});

var password = function ($form, fCloseFunction)
{
    /* Settings */
    var self = this;

    this.$form = $form;
    this.$submitButton = this.$form.find('button[type="submit"]');

    this.oResultSubmit = {'errors': [{'code': 'not_send'}]};
    this.fCloseFunction = typeof (fCloseFunction) == 'function' ? fCloseFunction : function () {
        self.desturct()
    };

    this.iFilled = 0;
    this.$inputs = [];
    this.$input = [];
    this.HiddenValues = {};

    this.iTimerId = 0;

    this.settings = {
        passwordUrl: 'ajax/password/', /* URL for ajax calls */
        timeOutTime: 500              /* in milliseconds */
    };


    this.msg = {}; /* messages object for returning errors to the client */

    /* ************************************************** */
    /* ********************* INIT SECTION *************** */
    /* ************************************************** */
    this.init = function ()
    {
        self.getSettings()
                .bindForm()
                .bindButton()
                .inputs(self.$form.find('input[type="password"]'))
                .hiddenValues(self.$form.find('input[type="hidden"]'))
                .bindInputs()
                .setPlaceholders()
                ;

        self.setFields();
    };



    this.getSettings = function ()
    {
        $.post(
                self.settings.passwordUrl,
                {
                    action: 'getSettings'
                },
                function (oResult)
                {
                    oResult = self.parse(oResult);

                    if (typeof (oResult.results.settings) == 'object')
                    {
                        for (var i in oResult.results.settings)
                        {
                            self.settings[i] = oResult.results.settings[i];
                        }
                    }

                    if (typeof (oResult.results.messages) == 'object')
                    {
                        self.msg = oResult.results.messages;
                    }
                }
        );
        return self;
    };

    this.desturct = function ()
    {
        /* can be used for unsetting values */
        return self;
    }

    /* END OF INIT */

    /* ************************************************** */
    /* ********************* BIND SECTION *************** */
    /* ************************************************** */


    /* if correct the warning class is removed */
    this.checkField = function (triggerEvent)
    {
        if (self.$input.hasClass('disabled'))
        {
            return self;
        }

        self.$input.addClass('warning')
                .removeClass('correct')
                ;

        if (self.$input.val().length == 0)
        {
            /* don't show an error is empty */
            return self
                    .error({
                        'code': 'code_to_short',
                        'Class': 'display-none'
                    })
                    .setMsg()
                    ;
        }

        switch (self.inputs().index(self.$input))
        {

            case 0: /* currenct password field */
                self.validation.reset()
                        //		.validation.checkMinLength()
                        .validation.checkCurrentPass()
                        ;
                break;

            case 1: /* new password field */
                self.validation.reset()
                        .validation.checkMinLength()
                        .validation.checkValidation()
                        .validation.checkMatchUsername()
                        .validation.checkMatchName()
                        .validation.checkNotCurrentPass()
                        .validation.checkMatchPrevPass()
                        .validation.checkMatchInPassHistory()
                        .validation.checkMatchOtherUserPasswords()
                        ;
                if (triggerEvent.type == 'keyup' || triggerEvent.type == 'change')
                {
                    self.inputs().filter(':last')
                            .val('')
                            .change();
                }

                break;

            case 2: /* confirmation field */
                self.validation.reset()
                        .validation.matchPassCheck();

                break;
        }

        return self.setMsg();
    };

    this.showHideErrors = function ()
    {
        if (self.errors().length > 0)
        {
            self.$form.removeClass('ready');

            self.$input
                    .addClass('warning')
                    .removeClass('correct')
                    ;
        } else
        {
            self.$input
                    .removeClass('warning')
                    .addClass('correct')
                    ;
        }
        return self.setFields();
    };

    this.bindInputs = function ()
    {
        self.inputs().each(function ()
        {
            self.bindInput(this);
        });
        return self;
    };
    this.clearInputs = function ()
    {
        self.inputs().each(function ()
        {
            $(this)
                    .val('')
                    .removeClass('correct')
                    .addClass('warning')
                    ;
        });
        return self;
    };
    this.clearMsgs = function ()
    {
        self.$form.find('.msg').removeClass('success').html('');

        return self
    };

    this.bindInput = function (input)
    {
        return $(input)
                .addClass('warning') /* mark all */
                .bind(
                        'keyup blur change',
                        function (event)
                        {
                            var $input = $(this);

                            /* set a timeout to slowdown typeing */
                            clearTimeout(self.iTimerId);

                            self.iTimerId = setTimeout(
                                    function ()
                                    {
                                        self.$input = $input;

                                        $input.validation = {
                                            errors: [],
                                            success: []
                                        };

                                        self.checkField(event);

                                        return false;
                                    },
                                    self.settings.timeOutTime
                                    );

                            return false;
                        }
                )
                ;
    };

    this.setFields = function ()
    {
        var $currentField = self.inputs()
                .add(self.$submitButton)
                .removeClass('disabled')
                .removeAttr('disabled')

                .filter('input.warning:first')
                .parents('p:first')
                .nextAll()
                .find('input, button[type="submit"]')

                .addClass('disabled')
                .attr('disabled', 'disabled')
                ;
        return self;
    };

    this.setPlaceholders = function ()
    {
        self.inputs()
                .filter(':not([placeholder])')
                .each(function ()
                {
                    self.bindInput(this)
                            .attr(
                                    'placeholder',
                                    $('label[for="' + this.id + '"]', $form)
                                    .text()
                                    )
                            ;
                })
    };

    this.bindForm = function ()
    {
        self.$form
                .unbind()
                .submit(function ()
                {
                    var oValues = {};
//test
//$('input').each(function(index){this.value += index});
                    self
                            .validation.reset()
                            .inputs().add(self.$submitButton)
                            .unbind()
                            .addClass('disabled')
                            .attr('disabled', 'disabled')
                            .removeClass('hover')
                            ;

                    self.submitForm(function ()
                    {
                        self.showSubmitResult();
                    });

                    return false;
                }
                );

        return self;
    };

    this.bindButton = function ()
    {
        self.$submitButton
                .unbind()
                .hover(
                        function () {
                            self.$submitButton.addClass('hover');
                            return false;
                        },
                        function () {
                            self.$submitButton.removeClass('hover');
                            return false;
                        }
                )
                .click(function ()
                {
                    self.inputs()
                            .add(self.$submitButton)
                            .unbind()
                            .addClass('disabled')
                            .attr('disabled', 'disabled')
                            .removeClass('hover')
                            ;

                    self.$form.submit();
                    return false;
                })
                ;
        return self;
    }

    /* END OF BIND SECTION */

    /* ************************************************** */
    /* **************** VALIDATION SECTION*************** */
    /* ************************************************** */
    this.validation = {
        errors: [],
        success: [],
        'reset': function ()
        {
            self.validation.errors = [];
            self.validation.success = [];
            return self;
        },

        stdFunction: function () {
            self.setMsg().setFields();
        },

        checkMinLength: function ()
        {
            if (self.$input.val().length < self.settings.min_pass_lenth)
            {
                self.error({code: 'min_amount_chars'});
            }

            return self;
        },
        checkValidation: function ()
        {
            if (typeof (self.settings.passReg) == 'string')
            {
                self.settings.passReg = eval(self.settings.passReg);
            }

            if (self.settings.passReg.test(self.$input.val()) == false)
            {
                self.error({code: 'wrong_validation'});
            }

            return self;
        },
        matchPassCheck: function ()
        {
            if (self.inputs().eq(1).val() != self.$input.val())
            {
                self.error({code: 'passwords_dont_match'});
            }

            return self;
        },

        /* AJAX functions */
        checkCurrentPass: function ()
        {
            return self.check('checkCurrentPass', this.stdFunction);
        },

        checkMatchUsername: function ()
        {
            return self.check('checkMatchUsername', this.stdFunction);
        },
        checkMatchName: function ()
        {
            return self.check('checkMatchName', this.stdFunction);
        },

        checkNotCurrentPass: function ()
        {
            return self.check('checkNotCurrentPass', this.stdFunction);
        },

        checkMatchPrevPass: function ()
        {
            return self.check('checkMatchPrevPass', this.stdFunction);
        },
        checkMatchInPassHistory: function ()
        {
            return self.check('checkMatchInPassHistory', this.stdFunction);
        },
        checkMatchOtherUserPasswords: function ()
        {
            return self.check('checkMatchOtherUserPasswords', this.stdFunction);
        }
    };

    /* ************************************************** */
    /* **************** PARSING SECTION   *************** */
    /* ************************************************** */

    this.inputs = function ($inputs)
    {
        if (typeof ($inputs) == 'undefined')
        {
            return self.$inputs;
        }

        self.$inputs = $inputs;
        return self;
    }

    this.hiddenValues = function ($inputs)
    {
        if (typeof ($inputs) == 'undefined')
        {
            return self.HiddenValues;
        }

        $inputs.each(function ()
        {
            self.HiddenValues[this.name] = this.value;
        });
        return self;
    };

    this.getValues = function ()
    {
        var oValues = {};
        this.inputs().each(function ()
        {
            if (this.name == '')
            {
                return true;
            }
            oValues[this.name] = this.value;
        })
        return oValues;
    }

    this.setMsg = function ()
    {
        self.showHideErrors();

        var $msg = self.$input.parent().children('.msg')
                .attr('class', 'msg');

        if (self.errors().length > 0)
        {

            $msg
                    .addClass('error')
                    .html(self.errorMsg())
                    .addClass(self.error().Class);
            ;
        } else
        {
            $msg
                    .addClass('success')
                    .html(self.msg.success.general);
        }

        if ($msg.html().length > 0)
        {
            $msg.fadeIn('fast');
        } else
        {
            $msg.fadeOut('fast');
        }


        return self;
    };

    this.errorMsg = function (oError)
    {
        if (typeof (oError) == 'undefined')
        {
            oError = self.error();
        }

        if (typeof (oError) == 'undefined' || typeof (self.msg.errors[oError.code]) == 'undefined')
        {
            return self.msg.errors.unknown_error;
        }

        return  self.msg.errors[oError.code];
    };
    this.errorMsgs = function ()
    {
        var aErrormsgs = [];
        for (var i in self.errors())
        {
            aErrormsgs.push(self.errorMsg(self.errors()[i]));
        }
        return aErrormsgs;
    }


    this.successMsg = function (oSuccess)
    {
        if (typeof (oSuccess) == 'undefined')
        {
            oSuccess = self.success();
        }

        if (typeof (oSuccess) == 'undefined' || typeof (self.msg.success[oSuccess.code]) == 'undefined')
        {
            return self.msg.success.general;
        }

        return  self.msg.success[oSuccess.code];
    };
    this.successMsgs = function ()
    {
        var aoSuccessMsgs = [];
        for (var i in self.successs())
        {
            aoSuccessMsgs.push(self.successMsg(self.successs()[i]));
        }
        return aoSuccessMsgs;
    }


    this.resultSubmit = function (oResultSubmit)
    {
        if (typeof (oResultSubmit) != 'string')
        {
            return self.oResultSubmit;
        }



        self.oResultSubmit = self.parse(oResultSubmit).results;

        self.errors(self.oResultSubmit.errors);
        self.successs(self.oResultSubmit.success);

        return self;
    }

    /* ************************************************** */
    /* **************** RESULT SECTION    *************** */
    /* ************************************************** */
    this.showSubmitResult = function ()
    {
        if (self.resultSubmit().errors.length == 0)
        {
            self.$SubmitResult = $('\
					<div class="dialog password success"> \
						' + self.successMsgs().pop() + ' \
					</div> \
				')
                    .dialog(
                            {
                                modal: true,
                                buttons: {
                                    'ok': function ()
                                    {
                                        self.clearInputs()
                                                .clearMsgs()
                                                .bindInputs()
                                                .setFields()

                                        $(this).dialog("close");

                                        document.location.href = '/';
                                    }

                                },
                                close: function ()
                                {
                                    if (typeof (self.fCloseFunction) == 'function')
                                    {
                                        self.fCloseFunction('error');
                                    }
                                }
                            }
                    );
            return self;
        }


        self.$SubmitResult = $('\
			<div class="dialog password error"> \
				Er zijn fouten opgetreden: \
				<ul> \
					<li> \
						' + self.errorMsgs().join('</li><li>') + ' \
					</li> \
				</ul> \
			</div> \
		')
                .dialog({
                    modal: true,
                    buttons: {
                        'Aanpassen': function ()
                        {
                            self.bindInputs()
                                    .setFields()
                            $(this).dialog("close");
                        },
                        'sluiten': function ()
                        {
                            if (typeof (self.fCloseFunction) == 'function')
                            {
                                self.fCloseFunction('error');
                            }
                        }
                    }
                });

        return self;
    }

    /* ************************************************** */
    /* **************** SERVER SECTION    *************** */
    /* ************************************************** */

    this.check = function (sAction, fReturn)
    {
        /* save server load */
        if (self.errors().length > 0)
        {
            return self;
        }

        $.post(
                self.settings.passwordUrl + '?' + sAction,
                {
                    'action': sAction,
                    'find': self.$input.val(),
                    'params': self.hiddenValues(),
                    'values': self.getValues()
                },
                function (oResult)
                {
                    oResult = self.parse(oResult);

                    if (typeof (oResult.results.errors) != 'undefined')
                    {
                        self.errors(oResult.results.errors);
                    }

                    if (typeof (oResult.results.success) != 'undefined')
                    {
                        self.successs(oResult.results.success);
                    }

                    if (typeof (fReturn) == 'function')
                    {
                        fReturn();
                    }
                }
        );
        return self;
    };

    this.parse = function (sJSON)
    {
        var sNeedle = '#response#';
        if (sJSON.indexOf(sNeedle) > -1)
        {
            sJSON = sJSON.substr(
                    sJSON.indexOf(sNeedle) + sNeedle.length
                    );
        }

        sJSON = $.trim(sJSON);
        try
        {
            return $.parseJSON(sJSON);
        } catch (e)
        {
            console.log(e, sJSON);
        }
        return sJSON;
    };

    this.submitForm = function (fReturn)
    {
        $.post(
                self.settings.passwordUrl + '?submitform',
                {
                    action: 'changePassword',
                    values: self.getValues(),
                    'params': self.hiddenValues()
                },
                function (oResult)
                {
                    self.resultSubmit(oResult);

                    if (typeof (fReturn) == 'function')
                    {
                        fReturn()
                    }
                }
        );
        return self;
    };

    /* ************ Field error handeling ***************** */
    this.error = function (oError)
    {
        if (typeof (oError) == 'undefined')
        {
            return self.validation.errors[0];
        }

        self.validation.errors.push(oError);
        return self;
    };
    this.errors = function (oErrors)
    {
        if (typeof (oErrors) == 'undefined')
        {
            return self.validation.errors;
        }

        self.validation.errors = self.validation.errors.concat(oErrors);
        return self;
    };

    /* ************ Field success handeling ***************** */
    this.success = function (oSuccess)
    {
        if (typeof (oSuccess) == 'undefined')
        {
            return self.validation.success[0];
        }

        self.validation.success.push(oSuccess);
        return self;
    };

    this.successs = function (oSuccesss)
    {
        if (typeof (oSuccesss) == 'undefined')
        {
            return self.validation.success;
        }

        self.validation.success = self.validation.success.concat(oSuccesss);
        return self;
    };

    this.init();
};
