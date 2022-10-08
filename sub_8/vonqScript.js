// Tracker initialization part
(function(p,l,o,w,i,n,g){
    if(!p[i]){
        p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
        p.GlobalSnowplowNamespace.push(i);
        p[i] = function () {
            (p[i].q = p[i].q || []).push(arguments);
        };
        p[i].q=p[i].q||[];
        n=l.createElement(o);
        g=l.getElementsByTagName(o)[0];
        n.async=1;
        n.src=w;
        g.parentNode.insertBefore(n, g);
    }
}(window,document,"script","//d6unz3nsyh8vw.cloudfront.net/3SFv8DuWrRsddehY9xMi45LjA.js","snowplow"));

window.snowplow('newTracker', 'co', "com-vonq-main.collector.snplow.net", {
    platform: 'web',
    post: true,
    contexts: {     
        webPage: true,     
        performanceTiming: true     
    }
});
// End of tracker initialization

// Track a Job Description Page View Event
window.snowplow('trackSelfDescribingEvent', {
    schema: 'iglu:com.vonq/step_view/jsonschema/1-2-0',
    data: {     
        label : vonqLabel,
        // Set this field to a unique id or hash that identifies the job in customer's system.  
        // Required for websites that don't have a uniquely identifying absoulte job URL to match with a campaign     
        customerReferenceId: vonqJobId,
        entity : "3c435103-40a8-40a9-9d56-d765e2adaca3"     
    }
});

(function () {
    var vqParam=(location.search.split('_vq=')[1]||'').split('&')[0];
    if (vqParam.length) {
        try {
            var vqString = window.atob(vqParam);
            var vqObj = JSON.parse(vqString);
            window.snowplow('trackSelfDescribingEvent', {     
                schema: 'iglu:com.vonq/cta/jsonschema/1-0-1',     
                data: vqObj     
            });
        } catch (e) {/* Do nothing, invalid input */ };
    }
}());

window.snowplow('enableActivityTracking',10,10);
window.snowplow('trackPageView');