$(document).ready(function(){
    document.bindMiFIDEvents();
    
    if (typeof Sys != 'undefined')
    {
        var prm = Sys.WebForms.PageRequestManager.getInstance();
        prm.add_endRequest(CustomEndRequest);
    }
});


function CustomEndRequest(sender, args) {
    document.updateMiFIDInitialState();
}
    
document.bindMiFIDEvents = function () {
    // Bind the OnChange to the click event
    $('.select_all').live('click', function() {
        $(this).change();
    });
    
    // The change event for the select all checkboxes
    $('.select_all').live('change', function() {
        var uniqueSelectPrefix = document.getUniqueSelectPrefix(this);
        var checked = this.checked;
        var column = uniqueSelectPrefix + ' .'  + this.className.split(' ').pop() + ':not(.select_all)';
        
        // Check ur uncheck the column elements
        $(column).each(function() {
            if (!this.disabled) {
                this.checked = checked;
            
                document.updateCheckBox(this);
            }
        });
    });
    
     // Bind the OnChange to the click event
    $('.itemRow input').live('click', function() {
        $(this).change();
    });
    
    // The change event for the individual checkboxes
    $('.itemRow input').live('change', function() {      
        document.updateCheckBox(this);
        
        var uniqueSelectPrefix = document.getUniqueSelectPrefix(this);
        document.updateSelectAllCheckBox(uniqueSelectPrefix, this.className.split(' ').pop());
    });
    
    $('#UpdatePanelLoad').live('click', function() {
        document.updateAllCheckboxes();
    });
}

document.updateMiFIDInitialState = function () {
    // Loop through each mifid on the screen
    $('.mifidTable').each(function() {
        var uniqueSelectPrefix = document.getUniqueSelectPrefix(this);
        
        // Update the initial state of the select all checkboxes
        for (var i = 1; i <= 8; i++) {
            document.updateSelectAllCheckBox(uniqueSelectPrefix, 'A' + i);
            document.disableSelectAllCheckBox(uniqueSelectPrefix, 'A' + i);
        }
    
        for (var i = 1; i <= 7; i++) {
            document.updateSelectAllCheckBox(uniqueSelectPrefix, 'B' + i);
            document.disableSelectAllCheckBox(uniqueSelectPrefix, 'B' + i);
        }
    });
}

document.updateAllCheckboxes = function() {
    // Update the css classes for the checkboxes (postback)
    for (var i = 1; i <= 8; i++) {
        $('.A' + i).each(function() {
            document.updateCheckBox(this);
        });
    }
    
    for (var i = 1; i <= 7; i++) {
        $('.B' + i).each(function() {
            document.updateCheckBox(this);
        });
    }
}

document.updateCheckBox = function(checkBox) {

    if (checkBox.europeespaspoorttype == 'uitgaand') {
        if (checkBox.europeespaspoortpdcid) {
            if (!checkBox.checked) {
                $(checkBox).parent().addClass('unchecked');
            } else {
                $(checkBox).parent().removeClass('unchecked');
            }
        }
        
        if (!checkBox.europeespaspoortpdcid)
        {
            if (checkBox.checked) {
                $(checkBox).parent().addClass('checked');
            } else {
                $(checkBox).parent().removeClass('checked');
            }
        }
    }
    else {
        if (checkBox.afgenomenpdcid) {
            if (!checkBox.checked) {
                $(checkBox).parent().addClass('unchecked');
            } else {
                $(checkBox).parent().removeClass('unchecked');
            }
        }
        
        if (!checkBox.afgenomenpdcid)
        {
            if (checkBox.checked) {
                $(checkBox).parent().addClass('checked');
            } else {
                $(checkBox).parent().removeClass('checked');
            }
        }
    }
};

document.disableSelectAllCheckBox = function(uniqueSelectPrefix, columnName) {
    var allDisabled = true;
    var column = uniqueSelectPrefix + ' .'  + columnName + ':not(.select_all)';
    var columnSelectAll = uniqueSelectPrefix + ' .select_all.' + columnName;
    
    // Check whether the whole column is disabled
    $(column).each(function() {
        allDisabled = allDisabled && this.disabled;
    });
    
    // Disable the select_all checkbox
    if (allDisabled) {
        $(columnSelectAll).attr('disabled', allDisabled);  
    }
    
};

document.updateSelectAllCheckBox = function(uniqueSelectPrefix, columnName) {
    var allChecked = true;
    var column = uniqueSelectPrefix + ' .'  + columnName + ':not(.select_all)';
    var columnSelectAll = uniqueSelectPrefix + ' .select_all.' + columnName;
    
    // Check whether the whole column is checked
    $(column).each(function() {
        allChecked = allChecked && this.checked;
    });
    
    // Update the select_all checkbox
    $(columnSelectAll).attr('checked', allChecked);  
};

document.getParentNodeWithUniqueId = function(node) {
    if (node.id) {
        return node;
    } else {
        return document.getParentNodeWithUniqueId(node.parentNode);
    }
};

document.getUniqueSelectPrefix = function(element) {
    var uniqueId = document.getParentNodeWithUniqueId(element).id;
    return '#' + uniqueId;
}