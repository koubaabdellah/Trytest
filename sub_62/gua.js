window.gaAvailable=window.gaAvailable||!1,runOnLoad((function(e){$("a.externLink, a.importLink",e).unlessProcessed("gua-event-action").on("click",(function(e){var n=$(this);if(!window.gaAvailable||n.hasClass("guaPrevent"))return n.removeClass("guaPrevent"),!0;var a=n.attr("href");if(n.hasClass("importLink")){var t=n.attr("class").replace("importLink ","").toUpperCase();return ga("send","event",{eventCategory:"Download",eventAction:t,eventLabel:a}),!0}return n.hasClass("openinnewwindow")||e.ctrlKey?(ga("send","event",{eventCategory:"Externe link",eventAction:a}),!0):(e.stopImmediatePropagation(),n.addClass("guaPrevent"),ga("send","event",{eventCategory:"Externe link",eventAction:a,hitCallback:function(){n[0].click()},hitCallbackFail:function(){n[0].click()}}),!1)}))}),{prepend:!0});