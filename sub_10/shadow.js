define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.queryShadowRoot = void 0;
    function queryShadowRoot(root, skipNode, isMatch, maxDepth, depth) {
        if (maxDepth === void 0) { maxDepth = 20; }
        if (depth === void 0) { depth = 0; }
        var matches = [];
        if (depth >= maxDepth) {
            return matches;
        }
        var traverseSlot = function ($slot) {
            var assignedNodes = $slot
                .assignedNodes()
                .filter(function (node) { return node.nodeType === 1; });
            if (assignedNodes.length > 0) {
                var $slotParent = assignedNodes[0].parentElement;
                return queryShadowRoot($slotParent, skipNode, isMatch, maxDepth, depth + 1);
            }
            return [];
        };
        var children = Array.from(root.children || []);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var $child = children_1[_i];
            if (skipNode($child)) {
                continue;
            }
            if (isMatch($child)) {
                matches.push($child);
            }
            if ($child.shadowRoot != null) {
                matches.push.apply(matches, queryShadowRoot($child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));
            }
            else if ($child.tagName === "SLOT") {
                matches.push.apply(matches, traverseSlot($child));
            }
            else {
                matches.push.apply(matches, queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1));
            }
        }
        return matches;
    }
    exports.queryShadowRoot = queryShadowRoot;
});
