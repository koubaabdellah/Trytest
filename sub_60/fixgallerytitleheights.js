(function(){var e;e=function(e){var i,s,a;a="> .grid-element > .grid-edge > .grid-title",(s=$(".type-galerij .grid-nesting > .row-clear, .type-galerij .grid-nesting > .grid-blok",e)).find(a).css({height:"auto"}).removeClass("title-resized"),($("body").hasClass("medium")||$("body").hasClass("large"))&&(i=0,s.each((function(){var e,s;return e=$(this),s=$(a,e).height(),e.hasClass("grid-blok")?s>i?i=s:void 0:(e.data("rowmax",i),i=0)})),s.reverse().each((function(){var e;return(e=$(this)).hasClass("grid-blok")?i>0?$(a,e).height(i).addClass("title-resized"):void 0:i=e.data("rowmax")})))},this.responsiveBehaviours.push(e),$(window).on("load",(function(){e(document)})),$(window).smartresize((function(){e(document)}))}).call(this);