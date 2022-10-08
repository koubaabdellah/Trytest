/*
 here is the use of this 
 where to lazy load content then put the response into the lazy load
 ubuyLazyContent.set("#related-products",'ls_related_products',response,{cb_fn:'reloadRelatedCrowsel'});
 */
var ubuyLazyContent = {
    cls: 'lazy-content',
    init: function () {
        var lc = [].slice.call(document.querySelectorAll("." + this.cls));
        lc.forEach(this.lazyContentObserve,this);
    },
    emitAll: function () {
        var lc = [].slice.call(document.querySelectorAll("." + this.cls));
        lc.forEach(this.emitContent,this);
    },
    isSupportStorage: function () {
        return (typeof Storage != 'undefined');
    },
    set: function (s, k, d, o) {
        /*selector, storageKey, storageData, options*/
        console.log('setToLazyLoadContent', s, k, o);
        jQuery(s).addClass(this.cls).attr('data-storage', k).html('');
        if (typeof o != 'undefined') {
            if (typeof o.cb_fn != 'undefined') {
                jQuery(s).attr('data-cb_fn', o.cb_fn);
            }
            if (typeof o.execute_script != 'undefined') {
                const r = d.match(/<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g);
                r.forEach(function (v) {
                    jQuery(s).html(v);
                });
            }
        }
        this.lazyContentObserve(jQuery(s)[0]);
        sessionStorage.setItem(k, d);
    },
    checkStorageAvailable: function () {
        var _lsTotal = 0, _xLen, _x;
        for (_x in sessionStorage) {
            if (!sessionStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = ((sessionStorage[_x].length + _x.length) * 2);
            _lsTotal += _xLen;
        }
        return (_lsTotal / 1024).toFixed(2); // in KB ;
    },
    emitContent: function (t) {
        console.log('emitLazyLoadContent', t.id);
        if (!jQuery(t).hasClass(this.cls)) {
            return false;
        }
        let k = t.dataset.storage;
        jQuery(t).html(sessionStorage.getItem(k));
        t.classList.remove(this.cls);
        if (t.dataset.cb_fn) {
            let cb_fn = t.dataset.cb_fn;
            eval(cb_fn)();
        }
        sessionStorage.removeItem(k);
        this._observer.unobserve(t);
    },
    _observer: new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                ubuyLazyContent.emitContent(entry.target);
            }
        });
    }),
    lazyContentObserve: function (lazyContent) {
        this._observer.observe(lazyContent);
    }
}
