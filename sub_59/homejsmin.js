jQuery(document).ready(()=>{ajax("/-/media/cbs/infographics/Regionale-MBW/data/teksten.json").then(result=>{function checkJson(json){try{JSON.parse(json);}catch(e){return json;}
return JSON.parse(json);}
jQuery('#tekst-content').html(checkJson(result).home);});});