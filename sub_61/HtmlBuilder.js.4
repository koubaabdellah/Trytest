/* static methods for generating HTML strings */
HtmlBuilder = {};
(function() {
  HtmlBuilder = {
    attr : function(attribs) {
      /* class property must be in quotes for ie */
      /* no Function support: put the call in a string */
      /*
       * example: {style:"color:white;",onclick:"alert('like
       * so'),'class':'hilite'}
       */
      var att = new Util.StringBuilder();
      if (attribs) {
        for ( var p in attribs) {
          att.append(' ' + p + '="' + attribs[p] + '"');
        }
      }
      return att.join("");
    },
    html : function(s) {
      return "<html>" + s + "</html>\n";
    },
    head : function(s) {
      return "<head>" + s + "</head>\n";
    },
    body : function(s, attribs) {
      return "<body" + HtmlBuilder.attr(attribs) + ">" + s + "</body>\n";
    },
    a : function(href, text, attribs) {
      return "<a" + this.attr(attribs) + " href='" + href + "'>"
          + text + "</a>\n";
    },
    link : function (s) {
    	return this.a(s,s, {'style':'font-size:9pt'});
    },
    nbsp : function(n) {
      var r = "&nbsp;";
      if (n)
        while (n > 1) {
          r += h.nbsp();
          n--;
        }
      ;
      return r;
    },
    br : function() {
      return "<br />\n";
    },
    p : function(s) {
      return "<p>" + (s ? s : "&nbsp;") + "</p>\n";
    },
    h : function(size, s) {
      return "<h" + size + ">" + s + "</h" + size + ">\n";
    },
    b : function(s) {
      return "<b>" + s + "</b>\n";
    },
    i : function(s) {
      return "<i>" + s + "</i>\n";
    },
    u : function(s) {
      return "<u>" + s + "</u>\n";
    },
    li : function(s) {
      return "<li>" + s + "</li>\n";
    },
    ul : function(s) {
      return "<ul>" + s + "</ul>\n";
    },
    smaller : function(s) {
      return "<smaller>" + s + "</smaller>\n";
    },
    img : function(src, attribs) {
      return "<img" + HtmlBuilder.attr(attribs) + " src='" + src + "'/>\n";
    },
    span : function(s, attribs) {
      var sp = "<span" + HtmlBuilder.attr(attribs) + ">" + s + "</span>\n";
      return sp;
    },
    div : function(attribs, s) {
      return "<div" + HtmlBuilder.attr(attribs)+ ">" + (s?s:"") + "</div>\n";
    },
    dd : function(s, attribs) {
      return ("<dd" + HtmlBuilder.attr(attribs) + ">" + (s ? s : "") + "</dd>");
    },
    form : function(s, attribs) {
      return "<form " + HtmlBuilder.attr(attribs) + ">" + s + "</form>\n";
    },
    labelfor : function(inp_elm, for_id, text, attribs) {
      return "<label for='" + for_id + "'" + HtmlBuilder.attr(attribs) + ">" + inp_elm + text + "</label>\n";
    },
    option : function(text, value) {
      return "<option value='" + value + "'>" + text + "</option>\n";
    },
    input : function(attribs) {
      var html = "<input " + HtmlBuilder.attr(attribs) + "/>\n";
      if (attribs.label && attribs.id) {
          html += '<label for="' + attribs.id + '">' + attribs.label + '</label>\n';
      }
      return html;
    },
    any : function(el, s, attribs) {
      return "<" + el + HtmlBuilder.attr(attribs) + ">" + (s?s:"") + "</" + el
          + ">\n";
    },
    cdata : function(s) {
      return "<![CDATA[" + s + "]]>\n";
    },
    table : function(s, attribs) {
      return ("<table" + HtmlBuilder.attr(attribs) + ">" + s + "</table>");
    },
    /* two builded not td objects of two unstyled td's */
    tr2td : function(s1, s2) {
      return ("<tr><td>" + s1 + "</td><td>" + s2 + "</td></tr>");
    },
    /* s = td objects or null if only start tag (with attribs) is needed */
    tr : function(s, attribs) {
      return "<tr" + HtmlBuilder.attr(attribs) + ">"
          + (s ? s + "</tr>" : "");
    },
    rt : function() {
      return ("</tr>");
    },
    th : function(s, attribs) {
      return ("<th" + HtmlBuilder.attr(attribs) + ">" + s + "</th>");
    },
    td : function(s, attribs) {
      return ("<td" + HtmlBuilder.attr(attribs) + ">" + s + "</td>");
    },
    label : function(s, attribs) {
      return ("<label" + HtmlBuilder.attr(attribs) + ">" + s + "</label>");
    }
  };

})();
