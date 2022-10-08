var arcScripts = null;

function ArcScripts(){
    var self = this;

    self.showTopNum = function(cap){
        var total = $('#gl-content-ul').children().length;
        var hideStart = total - cap;

        $('#gl-content-ul').children().each(function(index){
            if(index >= cap){
                $(this).addClass('hide');
            }
        });
    }

    self.init = function(){
        //self.showTopNum(30);
    }
}



