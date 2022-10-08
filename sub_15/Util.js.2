  /* useful things */

  var Util = {};
  window.Util = {
    get : function (url){
	var iframe = document.getElementById("getiframe");
	if(!iframe) {
          iframe = document.createElement("IFRAME");
          iframe.id = "getiframe";
          iframe.height = "0";
          iframe.width = "0";
          iframe.border = "0";
          document.body.appendChild(iframe);
        }
        iframe.src = url;
    }
    ,
    setLibName : function (orig,name) {
      if(eval("window." + orig) && !eval("window." + name))
        eval("window." + name + " = window." + orig);
    }
    ,
    addLib : function (baseurl, name, namespace) {
      if(document.getElementById(namespace)) return;
      var ss = document.createElement('script');
      ss.scr = baseurl + "/" + name + ".js";
      name = name.replace(/\//,".");
      ss.id = namespace;
      document.getElementsByTagName('head')[0].appendChild(ss);
    }
    ,
    load : function (id, htmfile) {
      jQuery("#" + id).load(htmfile);
      return false;
    }
    ,
    isIE6 : function () {
      var arVersion = navigator.appVersion.split("MSIE");
      return parseFloat(arVersion[1]) < 7;
    }
    ,
    getBrowserInfo: function () {
      return navigator.userAgent;
    }
    ,
    vnul : function (n,dec) {
      if(!dec) dec = 1;
      dec = Math.pow(10,dec);
      if(n==0)
        return ("" + dec).replace("1","0");
      else
        return (n < dec?("" + (n/dec)).replace(".","") : n);
    }
    ,
    test:function () {
      return(location.href.indexOf("localhost") > -1) ;
    }
    ,
    log:function (s) {
      if(Util.test())
        if(window.console && window.console.log) {
          window.console.log("in:" + arguments.callee.caller.name );
          window.console.log(s);
        }
        else alert(s);
    }
    ,
    sendForm : function (e,f) {
      e = (window.event ? window.event : e);
      var key = e.which || e.keyCode;
      if(key==13) (f)();
    }
    ,

      /* StringBuilder manages an array of strings */
        StringBuilder : function () {
          this.strings = new Array();
          this.length = function(){
            return this.join().length;
          };
          this.append = function(s) {
            this.strings[this.strings.length] = s;
          };
          this.toString = function() {
            var result=this.strings.join("");
            return  result;
          };
          this.join = function(sep) {
            var result=this.strings.join(sep);
            return  result;
          };
          this.clear = function() {
            this.strings.length = 0;
            this.strings = new Array();
          };
          this.get = function(i) {
            if(i>=0 && i < this.strings.length)
              return this.strings[i];
            return null;
          };
          this.count = function() {
            return this.strings.length;
          };
          this.getlast = function() {
            if(this.strings.length>0)
              return this.strings[this.strings.length-1];
            return null;
          };
        }

 };


