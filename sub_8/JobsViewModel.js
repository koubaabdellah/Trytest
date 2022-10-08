//>>built
define("esri/dijit/analysis/JobsViewModel","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has dojo/json dojo/Stateful dojo/topic ./utils ./storageUtils ../../kernel ../../lang".split(" "),function(d,b,f,n,p,g,h,k,l,m,e){d=d([g],{declaredClass:"esri.dijit.analysis.JobsViewModel",constructor:function(a){this.watch("item",b.hitch(this,this.fetchJobs))},_portalUrlSetter:function(a){this.portalUrl=a},_itemSetter:function(a){this.item=a},_jobsSetter:function(a){this.jobs=a},_currentJobSetter:function(a){a&&
a.jobParams&&k.jobParamsToWidgetProps(a).then(b.hitch(this,function(c){this.currentJob=c;h.publish("analysis/jobs/selectedjob",this.currentJob,this.item)}))},fetchJobs:function(){this.portalUrl&&this.item&&l.getResourcesInfo(this.item,{portalUrl:this.portalUrl}).then(b.hitch(this,function(a){a=f.filter(a,function(c){return e.isDefined(c.toolName)&&e.isDefined(c.jobInfo)&&e.isDefined(c.jobParams)});this.set("jobs",a)}),b.hitch(this,function(a){}))}});b.setObject("dijit.analysis.JobsViewModel",d,m);
return d});