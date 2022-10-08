define(["require", "exports", "tslib", "./escapeStringRegexp"], function (require, exports, tslib_1, escapeStringRegexp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    escapeStringRegexp_1 = tslib_1.__importDefault(escapeStringRegexp_1);
    var startsWithWildcardRegExp = /^\*\./;
    var endsWithWildcardRegExp = /\.\*$/;
    var trailingSlashesRegExp = /\/.*$/;
    var portRegExp = /:(\d+)$/;
    var protocolRegExp = /^(\w+):\/\//;
    var wildcardRegExp = /\\\.\\\*/g;
    function parseUrl(url) {
        if (!url || typeof url !== 'string')
            return null;
        var protocol = url.match(protocolRegExp);
        protocol = protocol ? protocol[1] : null;
        url = url.replace(protocolRegExp, '');
        url = url.replace(trailingSlashesRegExp, '');
        var port = url.match(portRegExp);
        port = port ? parseInt(port[1], 10) : null;
        url = url.replace(portRegExp, '');
        return { protocol: protocol, url: url, port: port };
    }
    function prepareRule(url) {
        var rule = parseUrl(url);
        if (rule) {
            rule.url = rule.url.replace(startsWithWildcardRegExp, '.');
            rule.url = rule.url.replace(endsWithWildcardRegExp, '.');
        }
        return rule;
    }
    function urlMatchRule(sourceUrl, rule) {
        if (!sourceUrl || !rule)
            return false;
        var matchByProtocols = !rule.protocol || !sourceUrl.protocol || rule.protocol === sourceUrl.protocol;
        var matchByPorts = !rule.port || sourceUrl.port === rule.port;
        var domainRequiredBeforeRule = rule.url.startsWith('.');
        var domainRequiredAfterRule = rule.url.endsWith('.');
        var regExStr = '^';
        if (domainRequiredBeforeRule)
            regExStr += '.+';
        regExStr += escapeStringRegexp_1.default(rule.url).replace(wildcardRegExp, '\\..*');
        if (domainRequiredAfterRule)
            regExStr += '.+';
        regExStr += '$';
        return new RegExp(regExStr).test(sourceUrl.url) && matchByProtocols && matchByPorts;
    }
    function default_1(url, rules) {
        if (!Array.isArray(rules))
            rules = [rules];
        return rules.some(function (rule) { return urlMatchRule(parseUrl(url), prepareRule(rule)); });
    }
    exports.default = default_1;
});
