function switchFontSize(ckname,val){var bd=$E('BODY');switch(val){case 'inc':if(CurrentFontSize+1<7){bd.removeClass('fs'+CurrentFontSize);CurrentFontSize++;bd.addClass('fs'+CurrentFontSize);}
break;case 'dec':if(CurrentFontSize-1>0){bd.removeClass('fs'+CurrentFontSize);CurrentFontSize--;bd.addClass('fs'+CurrentFontSize);}
break;default:bd.removeClass('fs'+CurrentFontSize);CurrentFontSize=val;bd.addClass('fs'+CurrentFontSize);}
equalHeight();Cookie.set(ckname,CurrentFontSize,{duration:365,path:'/'});}
function switchTool(ckname,val){createCookie(ckname,val,365);window.location.reload();}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else expires="";document.cookie=name+"="+value+expires+"; path=/";}
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"");};function jaAddEvent(obj,evType,fn){if(obj.addEventListener){obj.addEventListener(evType,fn,false);return true;}else if(obj.attachEvent){var r=obj.attachEvent("on"+evType,fn);return r;}else{return false;}}
function equalHeight(){makeEqualHeight($('ja-botsl').getChildren());makeEqualHeight($$(['ja-content','ja-col1-bot','ja-col2']));}
function makeEqualHeight(divs){if(!divs||divs.length<2)return;var maxh=0;divs.each(function(el,i){var ch=el.getCoordinates().height;maxh=(maxh<ch)?ch:maxh;},this);divs.each(function(el,i){el.setStyle('height',maxh-el.getStyle('padding-top').toInt()-el.getStyle('padding-bottom').toInt());},this);}
function getDeepestDiv(div){while(div.getChildren().length==1&&(div.getChildren()[0].tagName=='DIV'))
{div=div.getChildren()[0];}
return div;}
function preloadImages(){var imgs=new Array();for(var i=0;i<arguments.length;i++){var imgsrc=arguments[i];imgs[i]=new Image();imgs[i].src=imgsrc;}}
function makeTransBg(el,bgimgdf,sizingMethod,type,offset){var objs=el;if(!objs)return;if($type(objs)!='array')objs=[objs];if(!sizingMethod)sizingMethod='crop';if(!offset)offset=0;var blankimg=siteurl+'images/blank.png';objs.each(function(obj){var bgimg=bgimgdf;if(obj.tagName=='IMG'){if(!bgimg)bgimg=obj.src;if(!(/\.png$/i).test(bgimg)||(/blank\.png$/i).test(bgimg))return;obj.setStyle('height',obj.offsetHeight);obj.setStyle('width',obj.offsetWidth);obj.src=blankimg;obj.setStyle('visibility','visible');obj.setStyle('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+bgimg+", sizingMethod='"+sizingMethod+"')");}else{if(!bgimg)bgimg=obj.getStyle('backgroundImage');var pattern=new RegExp('url\s*[\(\"\']*([^\'\"\)]*)[\'\"\)]*');if((m=pattern.exec(bgimg)))bgimg=m[1];if(!(/\.png$/i).test(bgimg)||(/blank\.png$/i).test(bgimg))return;if(!type)
{obj.setStyles({'background':'none'});if(obj.getStyle('position')!='absolute'&&obj.getStyle('position')!='relative'){obj.setStyle('position','relative');}
obj.getChildren().each(function(el){if(el.getStyle('position')!='absolute'&&el.getStyle('position')!='relative')
{el.setStyle('position','relative');}
el.setStyle('z-index',2);});var bgdiv=new Element('IMG');bgdiv.src=blankimg;bgdiv.width=obj.offsetWidth-offset;bgdiv.height=obj.offsetHeight-offset;bgdiv.setStyles({'position':'absolute','top':0,'left':-obj.getStyle('padding-left').toInt()});bgdiv.className='TransBG';bgdiv.setStyle('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+bgimg+", sizingMethod='"+sizingMethod+"')");bgdiv.inject(obj,'top');}else{obj.setStyle('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+bgimg+", sizingMethod='"+sizingMethod+"')");}}}.bind(this));}
function isIE6(){version=0
if(navigator.appVersion.indexOf("MSIE")!=-1){temp=navigator.appVersion.split("MSIE")
version=parseFloat(temp[1])}
return(version&&(version<7));}
function getElementsByClass(searchClass,node,tag){var classElements=new Array();var j=0;if(node==null)
node=document;if(tag==null)
tag='*';var els=node.getElementsByTagName(tag);var elsLen=els.length;var pattern=new RegExp('(^|\\s)'+searchClass+'(\\s|$)');for(var i=0;i<elsLen;i++){if(pattern.test(els[i].className)){classElements[j]=els[i];j++;}}
return classElements;}
function hackReadon(){var readons=getElementsByClass("readon",null,"A");var readons=$$(".readon");if(!readons||!readons.length)return;readons.each(function(el){var p=el;while(p.getParent()&&p.getParent().getChildren().length==1){p=p.getParent();}
if(!p||p.tagName!='TR')return;var pc=p.getPrevious();if(!pc)return;var tc=pc.getFirst();if(!tc)return;tc.adopt(el);p.remove();el.setStyle('display','block');});}
function addSpanToTitle(){var colobj=document.getElementById('bd');if(!colobj)return;var modules=getElementsByClass('moduletable.*',colobj,"DIV");if(!modules)return;for(var i=0;i<modules.length;i++){var module=modules[i];var title=module.getElementsByTagName("h3")[0];if(title){title.innerHTML="<span>"+title.innerHTML+"</span>";}}}
jaToolsHover=function(){var jautw=document.getElementById("ja-usertoolswrap");if(!jautw)return;jautw.onmouseover=function(){this.className="ja-toolswraphover";}
jautw.onmouseout=function(){this.className="";}}
jaHackInputBox=function(){if($$('INPUT')){$$('INPUT').each(function(el){cls='';if(el.type=='text')cls='text';if(el.type=='submit'||el.type=='reset'||el.type=='button')cls='button';if(cls){new Element('SPAN').setProperty('class',cls+'-left').injectBefore(el);new Element('SPAN').setProperty('class',cls+'-right').injectAfter(el);}});}}
jaInit=function(){hackReadon();addSpanToTitle();equalHeight();jaToolsHover();jaHackInputBox();}
if(isIE6())window.addEvent('domready',jaInit);else window.addEvent('load',jaInit);