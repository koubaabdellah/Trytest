//function filterlijstTonen(obj) {
//    var o = $(obj), p = o.parent(), cs = p.children(), dispLijst, dispMM, t, c, exp;

//    if (o.attr('expandedLijst') == 'expandedLijst') { dispLijst = 'none'; exp = ''; cls = 'close'; } else { dispLijst = 'block'; exp = 'expandedLijst'; cls = 'open'; }
//    o.attr('expandedLijst', exp);
//    o.removeClass('close');
//    o.removeClass('open');
//    o.addClass(cls);
//    if (dispLijst == 'block') {
//        if (o.attr('expandedMM') == 'expandedMM') { dispMM = 'block'; } else { dispMM = 'none'; }
//    } else {
//        dispMM = 'none';
//    }
//    for (t = 1; t < cs.length; t++) {
//        c = $(cs[t]);
//        if (t <= 3) {
//            c.css('display', dispLijst);
//        } else {
//            c.css('display', dispMM);
//        }
//    }
//}

//function filterlijstMeerMinder(no) {
//    var els = $('ul.filterlist').children();
//    var l = $(els[no]).children(); // <LI>
//    var d = $(l[0]); 		// <DIV>
//    var dc = d.children();
//    var h3 = $(dc[0]); 			// <H3>

//    var h3c = h3.children();
//    var but1 = $(h3c[1]); 	// <BUTTON>
//    var fs = $(dc[1]); 		// <FIELDSET>
//    var fsc = fs.children();
//    var but2 = $(fsc[2]); 	// <BUTTON>
//    var cs = $(fsc[1]).children(); // UL -> LI's

//    if (h3.attr('expandedMM') == 'expandedMM') { dispMM = 'none'; exp = ''; tit = 'Meer' } else { dispMM = 'block'; exp = 'expandedMM'; tit = 'Minder' }
//    h3.attr('expandedMM', exp);
//    but2 = document.getElementById('pleaseLetMeBe' + no);
//    but2.value = tit;
//    for (t = 3; t < cs.length; t++) {
//        c = $(cs[t]);
//        var c1 = c.children(); c1 = c1[0];
//        c.css('display', (c1.checked ? 'block' : dispMM));
//    }
//}

//function Fold() {
//    var els = $('ul.filterlist').children(), t = 0;
//    els.each(function () {
//        // elk element in de filterlist bestaat uit een <li> met daarin een <h3> en een <ul>
//        // h is de <h3>, cs de <li>'s in de <ul>
//        var l = $(this).children(); 	// <LI>
//        var d = $(l[0]); 			// <DIV>
//        var dc = d.children();
//        var h3 = $(dc[0]); 			// <H3>
//        var h3c = h3.children();
//        var but1 = $(h3c[1]); 	// <BUTTON>
//        var fs = $(dc[1]); 		// <FIELDSET>
//        var fsc = fs.children();
//        var but2 = $(fsc[2]); 	// <BUTTON>

//        h3.attr('expandedLijst', '');
//        h3.attr('expandedMM', '');
//        var fsccc = $(fsc[1]).children();
//        if (fsccc.length > 3) {
//            but2 = but2.replaceWith('<INPUT id="pleaseLetMeBe' + t + '" type="button" class="submit" onclick="filterlijstMeerMinder(' + t + ');" value="Minder" />');
//            filterlijstMeerMinder(t);
//        } else {
//            but2.remove();
//        }
//        but1.click(function () { filterlijstTonen(h3); });
//        filterlijstTonen(h3);
//        t++;
//    });
//    setTimeout(function () {
//        var els = $('ul.filterlist').children(), t = 0;
//        els.each(function () {
//            var l = $(this).children(); 	// <LI>
//            var d = $(l[0]); 			// <DIV>
//            var dc = d.children();
//            var h3 = $(dc[0]); 			// <H3>
//            var h3c = h3.children();
//            var but1 = $(h3c[1]); 	// <BUTTON>
//            var fs = $(dc[1]); 		// <FIELDSET>
//            var fsc = fs.children();
//            var but2 = $(fsc[2]); 	// <BUTTON>

//            var fsccc = $(fsc[1]).children();
//            if (fsccc.length > 3) {
//                filterlijstMeerMinder(t);
//            }
//            //			filterlijstTonen(h3);
//            t++;
//        });
//    }, 100);
//}

/// <reference path="jquery-1.7.1.min.js" />



// declaratie globale variabelen die na eerste aanroep van Fold(); een array met default waarden voor in/uitklap bevatten.
var expandedLijst = false;
var expandedMM = false;


function filterlijstTonen(obj, doClick) {
    var o = $(obj), p = o.parent(), cs = p.children(), dispLijst, dispMM, t, c, exp, id, oc, b;

    id = obj.attr('id');
    no = parseInt(id.substr(13));
    if (doClick) {
        if (expandedLijst[no]) { exp = false; } else { exp = true; }
        expandedLijst[no] = exp;
    }
    if (expandedLijst[no]) { dispLijst = 'none'; cls = 'close'; } else { dispLijst = 'block'; cls = 'open'; }
    oc = o.children();
    b=$(oc[1]);
    b.removeClass('close');
    b.removeClass('open');
    b.addClass(cls);
    b.addClass('bla');
    if (dispLijst == 'block') {
        if (expandedMM[no]) { dispMM = 'block'; } else { dispMM = 'none'; }
    } else {
        dispMM = 'none';
    }
    for (t = 1; t < cs.length; t++) {
        c = $(cs[t]);
        if (t <= 3) {
            c.css('display', dispLijst);
        } else {
            c.css('display', dispMM);
        }
    }
    return false; // voorkom dat event wordt doorgegeven aan 'onderliggende' elementen
}

function filterlijstMeerMinder(no, doClick) {
    var els = $('ul.filterlist').children();
    var l = $(els[no]).children(); // <LI>
    var d = $(l[0]); 		// <DIV>
    var dc = d.children();
    var h3 = $(dc[0]); 			// <H3>

    var h3c = h3.children();
    var but1 = $(h3c[1]); 	// <BUTTON>
    var fs = $(dc[1]); 		// <FIELDSET>
    var fsc = fs.children();
    var but2 = $(fsc[2]); 	// <BUTTON>
    var cs = $(fsc[1]).children(); // UL -> LI's

    if (doClick) {
        if (expandedMM[no]) { exp = false; } else { exp = true; }
        expandedMM[no] = exp;
    }
    if (expandedMM[no]) { dispMM = 'none'; tit = 'Meer' } else { dispMM = 'block'; tit = 'Minder' }
    but2 = document.getElementById('pleaseLetMeBe' + no);
    //	but2.innerHTML=tit;
    but2.value = tit;
    for (t = 3; t < cs.length; t++) {
        c = $(cs[t]);
        var c1 = c.children(); c1 = c1[0];
        c.css('display', (c1.checked ? 'block' : dispMM));
    }
    return false; // voorkom dat event wordt doorgegeven aan 'onderliggende' elementen
}

// De functie Fold doet 2 dingen:
// 1. Elementen aanpassen of vervangen.
// 2. De functies aanroepen om de 'oude in/uitklap-waarden' weer in te stellen.
// Het aanpassen van elementen wordt alleen gedaan indien dit nog niet eerder is gebeurd. De functie kan daarom
// zonder problemen meermaals worden aangeroepen.
// De in/uitklap-waarden worden onthouden in 2 arrays. Als deze (nog) niet bestaan, worden ze aangemaakt en van
// default waarden voorzien.
function Fold() {
    var els = $('ul.filterlist').children(), t = 0, no;
    if (!expandedLijst) {
        expandedLijst = new Array();
        expandedMM = new Array();
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Default settings
        // Als je andere defaults in wilt stellen, kan evt. een if worden gebruikt. Om bijvoorbeeld de eerste lijst
        // geheel te tonen gebruik je: if (t==0) {expandedMM[no]=false;} else {expandedMM[no]=true;}
        //
        for (no = 0; no < els.length; no++) {
            expandedLijst[no] = false; // Default: Lijst niet ingeklapt
            expandedMM[no] = true; 	// Default: Meer/Minder is 'Laat er 3 zien'
        }
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    }
   
    els.each(function () {
        // elk element in de filterlist bestaat uit een <li> met daarin een <h3> en een <ul>
        // h is de <h3>, cs de <li>'s in de <ul>
        var l = $(this).children(); 	// <LI>
        var d = $(l[0]); 			// <DIV>
        var dc = d.children();
        var h3 = $(dc[0]); 			// <H3>
        var h3c = h3.children();
        var but1 = $(h3c[1]); 	// <BUTTON>
        var fs = $(dc[1]); 		// <FIELDSET>
        var fsc = fs.children();
        var but2 = $(fsc[2]); 	// <BUTTON>

        var id = h3.attr('id'), repl;
        if (id) { repl = false; } else { repl = true; } // repl bepaald of de elementen al (eerder) zijn aangepast, of niet (waarna aapassing volgt).
        h3.attr('id', 'expandedLijst' + t);
        var fsccc = $(fsc[1]).children();
        if (fsccc.length > 3) {
            if (repl) {
                //but2=but2.replaceWith('<BUTTON id="pleaseLetMeBe'+t+'" class="submit" onclick="filterlijstMeerMinder('+t+', true);">Minder</BUTTON>');
                but2 = but2.replaceWith('<INPUT id="pleaseLetMeBe' + t + '" type="button" class="submit" onclick="filterlijstMeerMinder(' + t + ', true);" value="Minder" />');
            }
            filterlijstMeerMinder(t, false);
        } else {
            if (repl) {
               but2.remove();
            }
        }
        if (repl) {
            but1.click(function () { filterlijstTonen(h3, true); });
        }
        filterlijstTonen(h3, false);
        t++;
    });

    // Als het setten van de defaults fouten oplevert, kan dit komen doordat niet alle elementen door de browser al gerenderd zijn.
    // Dan moeten de functies filterlijstMeerMinder(t, false); en filterlijstTonen(h3,false); 'vertraagt' worden aangeroepen
    // Dat kan met onderstaande code (100 miliseconden vertraagt);
    // Dan moeten die 2 functies in de code hierboven wel 'uit' worden gezet.
    /*	setTimeout(function() {
    var els = $('ul.filterlist').children(), t=0;
    els.each(function () {
    var l=$(this).children(); 	// <LI>
    var d = $(l[0]); 			// <DIV>
    var dc=d.children();
    var h3=$(dc[0]); 			// <H3>
    var h3c=h3.children();
    var but1=$(h3c[1]);		// <BUTTON>
    var fs=$(dc[1]);			// <FIELDSET>
    var fsc=fs.children();
    var but2=$(fsc[2]);		// <BUTTON>
	
    var fsccc=$(fsc[1]).children();
    if (fsccc.length>3) {
    filterlijstMeerMinder(t, false);
    }
    filterlijstTonen(h3,false);
    t++;
    });
    }, 100);*/
}