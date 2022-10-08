if(typeof(MooTools)!='undefined'){var subnav=new Array();Element.extend({hide:function(timeout)
{this.status='hide';clearTimeout(this.timeout);if(timeout)
{this.timeout=setTimeout(this.anim.bind(this),timeout);}else{this.anim();}},show:function(timeout)
{this.status='show';clearTimeout(this.timeout);if(timeout)
{this.timeout=setTimeout(this.anim.bind(this),timeout);}else{this.anim();}},setActive:function(){this.className+='sfhover';},setDeactive:function(){this.className=this.className.replace(new RegExp("sfhover\\b"),"");},anim:function(){if((this.status=='hide'&&this.style.left!='auto')||(this.status=='show'&&this.style.left=='auto'&&!this.hidding))return;this.setStyle('overflow','hidden');if(this.status=='show'){this.hidding=0;this.hideAll();}else{}
if(this.status=='hide')
{this.hidding=1;this.myFx2.stop();if(this.parent._id)this.myFx2.start(this.offsetWidth,0);else this.myFx2.start(this.offsetHeight,0);}else{this.setStyle('left','auto');this.myFx2.stop();if(this.parent._id)this.myFx2.start(0,this.mw);else this.myFx2.start(0,this.mh);}},init:function(){this.mw=this.clientWidth;this.mh=this.clientHeight;if(this.parent._id)
{this.myFx2=new Fx.Style(this,'width',{duration:300});this.myFx2.set(0);}else{this.myFx2=new Fx.Style(this,'height',{duration:300});this.myFx2.set(0);}
this.setStyle('left','-999em');animComp=function(){if(this.status=='hide')
{this.setStyle('left','-999em');this.hidding=0;}
this.setStyle('overflow','');}
this.myFx2.addEvent('onComplete',animComp.bind(this));},hideAll:function(){for(var i=0;i<subnav.length;i++){if(!this.isChild(subnav[i]))
{subnav[i].hide(0);}}},isChild:function(_obj){obj=this;while(obj.parent)
{if(obj._id==_obj._id)
{return true;}
obj=obj.parent;}
return false;}});var DropdownMenu=new Class({initialize:function(element)
{$A($(element).childNodes).each(function(el)
{if(el.nodeName.toLowerCase()=='li')
{$A($(el).childNodes).each(function(el2)
{if(el2.nodeName.toLowerCase()=='ul')
{$(el2)._id=subnav.length+1;$(el2).parent=$(element);subnav.push($(el2));el2.init();el.addEvent('mouseover',function()
{el.setActive();el2.show(0);return false;});el.addEvent('mouseout',function()
{el.setDeactive();el2.hide(20);});new DropdownMenu(el2);el.hasSub=1;}});if(!el.hasSub)
{el.addEvent('mouseover',function()
{el.setActive();return false;});el.addEvent('mouseout',function()
{el.setDeactive();});}}});return this;}});window.addEvent('domready',function(){new DropdownMenu($('ja-cssmenu'))});}else{sfHover=function(){var sfEls=document.getElementById("ja-cssmenu").getElementsByTagName("li");for(var i=0;i<sfEls.length;++i){sfEls[i].onmouseover=function(){this.className+="sfhover";}
sfEls[i].onmouseout=function(){this.className=this.className.replace(new RegExp("sfhover\\b"),"");}}}
if(window.attachEvent)window.attachEvent("onload",sfHover);}
document.addEventListener("DOMContentLoaded",ready);function ready(){if(document.querySelector('.toggle-nav')!==null){const mobileMenuBtn=document.querySelector('.toggle-nav');const contOver=document.querySelector('.content-overlay');mobileMenuBtn.addEventListener("click",()=>{toggleNav(),false});contOver.addEventListener("click",()=>{toggleNav(),false});function fadeIn(el){var opacity=0.01;document.querySelector(el).style.display="block";var timer=setInterval(function(){if(opacity>=1){clearInterval(timer);}
document.querySelector(el).style.opacity=opacity;opacity+=opacity*0.2;},5);}
function fadeOut(el){var opacity=1;var timer=setInterval(function(){if(opacity<=0.1){clearInterval(timer);document.querySelector(el).style.display="none";}
document.querySelector(el).style.opacity=opacity;opacity-=opacity*0.2;},2);}
function toggleNav(){if(document.body.classList.contains('show-nav')){fadeOut(".content-overlay");document.getElementById("ja-mainnavwrap").animate([{left:'0px'},{left:'-320px'}],{duration:500,fill:'forwards',easing:"ease"})
document.body.classList.remove('show-nav');}else{fadeIn(".content-overlay");document.getElementById("ja-mainnavwrap").animate([{left:'-320px'},{left:'0px'}],{duration:500,fill:'forwards',easing:"ease"})
document.body.classList.add('show-nav');}}}}