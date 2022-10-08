function openPopUp(id) {
    pop.Initialize;
    pop.SetContentUrl("Indicator.aspx?id=" + id);
    pop.SetSize(800, 600);
    var HF = document.getElementById("HFLocale");
    if (HF.value == "nl") {
        pop.SetHeaderText("Toelichting indicator");
    }
    else {
        pop.SetHeaderText("Indicator explanation");
    }
    pop.ShowAtElementByID("imgind");
}

function ShowProcessMessage() {
    var pw = document.getElementById("ProcessingWindow");
    if (pw !== null) {
        document.getElementById("ProcessingWindow").style.display = "block";
        document.getElementById("ProcessingWindow").innerHTML = "<img src='../Images/loading.gif' /> De data wordt geladen...";
    }
    return true;
}

function openPopUpThemaOms(id) {
    pop.Initialize;
    var HF = document.getElementById("HFLocale");
    if (HF.value == "nl") {
        pop.SetHeaderText("Thema omschrijving");
    }
    else {
        pop.SetHeaderText("Theme description");
    }
    pop.SetContentUrl("thema.aspx?type=Omschrijving&id=" + id);
    pop.SetSize(800, 600);
    pop.ShowAtElementByID("imgthemaoms");
}

function openPopUpArchief(id) {
    pop.Initialize;
    var HF = document.getElementById("HFLocale");
    if (HF.value == "nl") {
        pop.SetHeaderText("Archief");
    }
    else {
        pop.SetHeaderText("Archive");
    }
    var i;
    var defaulturl = "archief.aspx?"
    var url = defaulturl;
    for (i = 0; i < arguments.length; i++) {
        if (url != defaulturl) {
            url = url + "&";
        }
        url = url + "id" + (i + 1) + "=" + arguments[i];
    }
    pop.SetContentUrl(url);
    pop.SetSize(800, 600);
    pop.ShowAtElementByID("imgarchief");
}

function openPopUpThemaBeleid(id) {
    //window.open("thema.aspx?type=Beleid&id=" + id, "_blank", "width=600,height=800,scrollbars=1,resizable=yes,top=20,left=20")
    pop.Initialize;
    var HF = document.getElementById("HFLocale");
    if (HF.value == "nl") {
        pop.SetHeaderText("Beleidsinformatie");
    }
    else {
        pop.SetHeaderText("Policy information");
    }
    pop.SetContentUrl("thema.aspx?type=Beleid&id=" + id);
    pop.SetSize(800, 600);
    pop.ShowAtElementByID("imgthemabel");
}


$(document).ready(function () {
    if (document.getElementById("HFddSector") == null) {
        return;
    }
    var HF = document.getElementById("HFddSector");
    if (HF.value == "") {
        //geen sectormenu
        $("li#ddsector").remove();
    }
    else {
        $("div#ddsectorlist").empty();
        $("div#ddsectorlist").append(htmlDecode(HF.value));
    }

    var HF1 = document.getElementById("HFddThema");
    var inh = htmlDecode(HF1.value);
    if (inh == "<ul></ul>") {
        //geen themamenu
        $("li#ddthema").remove();
    }
    else {
        $("div#ddthemalist").empty();
        $("div#ddthemalist").append(htmlDecode(HF1.value));
    }

    var HF2 = document.getElementById("HFddData");
    inh = htmlDecode(HF2.value);
    if (inh == "<ul></ul>") {
        //geen datamenu
        $("li#dddata").remove();
    }
    else {
        $("div#dddatalist").empty();
        $("div#dddatalist").append(htmlDecode(HF2.value));
    }


    var publist = document.getElementById("HFddPublicatie");
    if (publist.value == "") {
        $("i#homecaret").remove();
        $("div#ddpublicatielistdropdown").remove();
    }
    else {
        $("div#ddpublicatielist").empty();
        $("div#ddpublicatielist").append(htmlDecode(publist.value));
    }
    var pubid = document.getElementById("HFPubID");
    $("a[href='Over_Ons.aspx']").attr('href', 'Over_Ons.aspx?subpubID=' + pubid.value);
    $("a[href='Nieuws.aspx']").attr('href', 'Nieuws.aspx?subpubID=' + pubid.value);
    $("a[href='Zoeken2.aspx']").attr('href', 'Zoeken2.aspx?subpubID=' + pubid.value);
});

$(document).ready(function () {   
    setRSSURL();
    var pubid = document.getElementById("HFPubID");
    var HF = document.getElementById("HFLocale");
    if (HF.value == "nl") {
        $('h1').text("Agrimatie - informatie over de agrosector")
    }
    else {
        $('h1').text("Agro & food portal")
    }

    var element = "";
    element = $("[title='ddSector']")
    if (HF.value == "nl") {
        $(element).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sector");
    }
    else {
        $(element).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sector");
    }

    if (HF.value != "nl") {
        $("a[href='LogIn.aspx']").remove();
    }

    element = $("[title='ddthema']")
    HFthema = document.getElementById("HFddThema");
    if (HFthema == null) return;
    var themamenu = htmlDecode(HFthema.value);
    var count = themamenu.match(/<a/g);
    if (count == null) {
        $("li#ddthema").remove();
    }
    else {
        if (count.length == 1) {
            //geen submenu, direct naar themaresultaatpagina               
            var thema = themamenu.substring(themamenu.indexOf("themaID="));
            thema = thema.substring(8, thema.indexOf(">"));
            $(element).attr('title', 'Resultaat');
            $(element).html('<a href=ThemaResultaat.aspx?subpubID=' + pubid.value + '&themaID=' + thema + '>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Resultaat</a>');
            $("div#ddthemalist").remove();
            $("i#themacaret").remove();
            $("div#dropdownthema").remove();
        }
        if (count.length > 1) {
            if (HF.value == "nl") {
                $(element).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thema");
            }
            else {
                $(element).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Theme");
            }
        }
    }
    //url = "a[href='Over_Ons.aspx?subpubID=" + pubid.value + "']";
    if (HF.value == "nl") {
        $("a#over").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Over ons");
        $("a#oversimple").html("Over ons");
    }
    else {
        $("a#over").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About us");
        $("a#oversimple").html("About us");
    }

    url = "a[href='Nieuws.aspx?subpubID=" + pubid.value + "']";
    if (HF.value == "nl") {
        $(url).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nieuws");
    }
    else {
        $(url).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;News");
    }

    url = "a[href='Zoeken2.aspx?subpubID=" + pubid.value + "']";
    if (HF.value == "nl") {
        $(url).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Zoeken");
    }
    else {
        $(url).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search");
    }
    //publicatiepagina: sectorpagina wordt publicatiepagina en themapagina verdwijnt  
    //thema menu aan publicatiepagina
    //sector = 3534 --> is voor veb, moet dynamisch uit db   
    var HFpubpagina = document.getElementById("HFPublicatiePagina");
    if (HFpubpagina.value == "True") {
        element = $("[title='ddSector']")
        if (HF.value == "nl") {
            $(element).attr('title', 'Thema');
            $(element).html('<a href=PublicatiePage.aspx?subpubID=' + pubid.value + '&sectorID=3534>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thema</a>');
        }
        else {
            $(element).attr('title', 'Theme');
            $(element).html('<a href=PublicatiePage.aspx?subpubID=' + pubid.value + '&sectorID=3534>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Theme</a>');
        }
        //document.getElementById("ddsectorlist").innerHTML = document.getElementById("ddthemalist").innerHTML;
        if (document.getElementById("ddthemalist") == null)
        {
            //Er is maar 1 thema
            $("div#ddsectorlist").remove();
            $("i#sectorcaret").remove();
            $("div#dropdownsector").remove();
        }
        else
        {           
            document.getElementById("ddsectorlist").innerHTML = document.getElementById("ddthemalist").innerHTML;
        }

        $("li#ddthema").remove();
        var pubid = document.getElementById("HFPubID");
        if (pubid.value == "2525" || pubid.value == "2523" || pubid.value == "3305") {
            $("li#dddata").remove(); 
        }
    }
    //regio pagina
    var HFregiopagina = document.getElementById("HFRegioPagina");
    if (HFregiopagina.value == "True") {
        element = $("[title='ddSector']")
        if (HF.value == "nl") {
            $(element).attr('title', 'Thema');
            $(element).html('<a href=PublicatieRegio.aspx?subpubID=' + pubid.value + '&sectorID=3534>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thema</a>');
        }
        else {
            $(element).attr('title', 'Theme');
            $(element).html('<a href=PublicatieRegio.aspx?subpubID=' + pubid.value + '&sectorID=3534>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Theme</a>');
        }
        document.getElementById("ddsectorlist").innerHTML = document.getElementById("ddthemalist").innerHTML;
        $("li#ddthema").remove();
    }
});

function setRSSURL() {
    var rss_img = document.getElementById("imgRSS");
    if (rss_img === null) return;   
    var hfRSS = document.getElementById("HFRssUrl");
    if (hfRSS === null) return;
    $("#rss-url").attr("href", hfRSS.value + "RSS.xml");
}

$(document).ready(function () {
    socialMedia();
    var Im;
    for (var i = 2; i < 17; i++) {
        Im = document.getElementById("ContentPlaceHolder1_Image" + i);
        if (Im == null) { return; }
        if (Im.style.visibility = "visible") {
            $("div#greenboxdiv" + i).removeClass("invisible");
        }
    }
});

function socialMedia() {   
        var urlStr = encodeURIComponent(location.href);
        //development
        //urlStr = urlStr.replace("localhost%3A55642", "www3.lei.wur.nl");
        //urlStr = urlStr.replace("sector_cijfers", "sectorcijfers");
        //einde development  
        var title = $(".Kop")[0].innerHTML;     
        var shareTxt;
        var HFLocale = document.getElementById("HFLocale");        
        if (title == undefined) {
            if (HFLocale.value == "nl") {
                shareTxt = "interessante link";
            }
            else {
                shareTxt = "interesting link";
            }
        }
        else {
            shareTxt = title;
        }
        shareTxt = shareTxt.replace(" ", "%20");
        //twitter
        $("a[href='https://twitter.com/intent/tweet/']").attr('href', 'https://twitter.com/intent/tweet/?url=' + urlStr + '&text=' + shareTxt);
        //linkedIn
        $("a[href='http://www.linkedin.com/shareArticle']").attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + urlStr + '&title=' + shareTxt);
        //facebook
        $("a[href='http://www.facebook.com/sharer.php']").attr('href', 'http://www.facebook.com/sharer.php?s=100&p[url]=' + urlStr + '&p[title]=' + shareTxt.replace("%20", '+'));
        //mail 
        $("a[href='http://www.mailen.nl']").attr('href', 'mailto:contact@naam.nl?Body=' + shareTxt.replace("%20", ' ') + ' ' + urlStr);    
}

function removeElementSectorAddToDDMenu() {
    document.getElementById("ddsector").style.display = "none";
}

function removeElementThemaAddToDDMenu() {
    document.getElementById("ddthema").style.display = "none";
}

function HidePopupAndRedirect(returnValue) {
    pop.Hide();
    var HFLocale = document.getElementById("HFLocale");
    window.open("ArchiefResultaat.aspx?id=" + returnValue + "&lang=" + HFLocale.value, "_blank");
}



