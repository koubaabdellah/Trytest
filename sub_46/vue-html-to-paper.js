(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.VueHtmlToPaper = factory());
}(this, function () {
    'use strict';

    function addStyles(win, styles) {
        styles.forEach(function (style) {
            let link = win.document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', style);
            win.document.getElementsByTagName('head')[0].appendChild(link);
        });
    }

    const VueHtmlToPaper = {
        install: function (Vue, options) {
            Vue.prototype.$htmlToPaper = function (el, localOptions, cb) {
                if (cb === undefined) { cb = function () { return true; } }
                let defaultName = '_blank',
                    defaultSpecs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
                    defaultReplace = true,
                    defaultStyles = [];
                let name = options.name !== undefined ? options.name : defaultName ;
                let specs = options.specs !== undefined ? options.specs : defaultSpecs;
                let replace = options.replace !== undefined ? options.replace : defaultReplace;
                let styles = options.styles !== undefined ? options.styles : defaultStyles;

                // If has localOptions
                // TODO: improve logic
                if (!!localOptions) {
                    if (localOptions.name) name = localOptions.name;
                    if (localOptions.specs) specs = localOptions.specs;
                    if (localOptions.replace) replace = localOptions.replace;
                    if (localOptions.styles) styles = localOptions.styles;
                }

                console.warn(styles);

                specs = !!specs.length ? specs.join(',') : '';

                const element = document.getElementById(el);

                if (!element) {
                    alert('Element to print #' + el + ' not found!');
                    return;
                }

                const url = '';
                const win = window.open(url, name, specs, replace);

                win.document.write('<html><head><title>' + document.title + '</title></head><body>' + element.innerHTML + '</body></html>');

                addStyles(win, styles);

                setTimeout(function () {
                    win.document.close();
                    win.focus();
                    win.print();
                    win.close();
                    cb();
                }, 1000);

                return true;
            };
        }
    };

    return VueHtmlToPaper;

}));
