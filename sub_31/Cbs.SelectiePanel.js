var SelectiePanel = window.SelectiePanel = (function () {
    var _panel;
    var _identifier;
    var _selectionLabel;
    var _selectedGroupItems = {};//per selectionLabel de selected items;
    var _fancyTree = {};

    var init = function () {
        _panel = new Panel();
        _panel.SetContent(_content);
        _panel.SetPanelSelector("#selection-panel");
    }

    var _content = function () {
        var retVal = $();
        var objList = {};
        var treeData = [];

        $("#selection-panel #selection-content").removeClass('wide');
        if (_selectionLabel == 'Topics') {
            $("#selection-panel #selection-content").addClass('wide');
            treeData = _buildTopicTree(OData.Metadata.TopicGroups, OData.Metadata.Topics, null, false, true);
        }
        else {
            if (OData.Metadata.Dimensions[_selectionLabel].Type != 'GeoDetail') {
                treeData = _buildDimensionTree(OData.Metadata.Dimensions[_selectionLabel]);
                var extraNodes = _getGroupedNodes(OData.Metadata.Dimensions[_selectionLabel]);
                if (extraNodes.length >= 2) {
                    $.each(extraNodes.reverse(), function (index) {
                        treeData.unshift({
                            key: -2, title: this.name, substring: this.key
                        });
                    });
                }
            }
            else {
                var extraNodes = _getGroupedNodes(OData.Metadata.Dimensions[_selectionLabel]);
                $.each(extraNodes.reverse(), function (index) {
                    treeData.unshift({
                        key: -3, title: this.name, substring: this.key
                    });
                });
            }

        }


        treeData.unshift({ key: -1, title: lib.dictionary['Alles'] });

        var $treeContent = _treeBuilder(treeData, $('#selection-panel'));

        var selectedItems = _selectedGroupItems[_selectionLabel];
        if (selectedItems) {
            var tree = $.ui.fancytree.getTree($treeContent);
            $.each(selectedItems, function (index, value) {
                var currentNode = tree.getNodeByKey(value.key);
                if (currentNode) {
                    currentNode.setSelected();
                }
            });
            _fixSelection3(tree);
        }
        else {
            //Selecteer 'alles';
            var tree = $.ui.fancytree.getTree($treeContent);
            _setSelected([tree.getNodeByKey("-1")], true);
        }
        $preTitle = $('<div>' + lib.dictionary['max.20 items'] + '</div>');
        return $preTitle.append($treeContent);
    };


    var _getSelectionFilters = function () {
        return _selectedGroupItems;
    }
    var _showPanel = function (label, identifier) {

        if ((_selectionLabel != label) || (_identifier != identifier)) {
            if (_identifier != identifier) {
                _selectedGroupItems = {};
            }

            _identifier = identifier;
            _selectionLabel = label;
            _panel.SetContent(_content);
        };

        var panelTitle = label;
        if (label == 'Topics') {
            panelTitle = lib.dictionary['Onderwerpen'];
        } else {
            panelTitle = OData.Metadata.Dimensions[_selectionLabel].Title;
        }

        _panel.ShowPanel(panelTitle);
    };
    var _hidePanel = function () {
        _panel.HidePanel();
    }


    var _onBeforeShow = function (event) {
        _panel.OnBeforeShow(event);
    }
    var _onAfterHide = function (event) {
        _panel.OnAfterHide(event);
    }

    var _buildTopicTree = function (topicGroups, topics, parentID, lazy, showUnits) {
        // https://github.com/mar10/fancytree/wiki/TutorialLoadData
        var nodes = [],
            node;
        $.each(topicGroups, function (i, t) {
            if (t.ParentID === parentID) {
                node = { id: t.ID, title: t.Title, key: t.Key, folder: true, unselectable: true };
                if (lazy) {
                    node.lazy = true;
                    nodes.push(node);
                }
                else {
                    var children = _buildTopicTree(topicGroups, topics, t.ID, lazy, showUnits);
                    node.children = children;
                    node.expanded = true;
                    nodes.push(node);
                }
            }
        });
        $.each(topics, function (i, t) {
            if (t.ParentID === parentID) {
                var title = t.Title;
                if (showUnits) {
                    title += "<span class='unit'>" + t.Unit + "</span>";
                };
                node = {
                    id: t.ID, title: title, key: t.Key, topic: t
                };
                nodes.push(node);
            }
        });
        return nodes.sort(function (node1, node2) {
            var node1ID = node1.id;
            var node2ID = node2.id;
            return ((node1ID < node2ID) ? -1 : ((node1ID > node2ID) ? 1 : 0));
        });
    };

    var _buildDimensionTree = function (dimension) {
        //nu nog een platte lijst
        var nodes = [],
            node;
        $.each(dimension.Categories, function (i, t) {
            node = {
                id: t.ID, title: t.Title, key: t.Key, category: t
            };
            nodes.push(node);
        });
        return nodes.sort(function (node1, node2) {
            var node1ID = node1.id;
            var node2ID = node2.id;
            return ((node1ID < node2ID) ? -1 : ((node1ID > node2ID) ? 1 : 0));
        });
    }

    var _treeBuilder = function (treeData, scrollParent) {
        scrollParent = scrollParent ? scrollParent : $("#selection-items");

        $tree = $("<div id=\"tree\"></div>");
        $tree.addClass("multiselect");

        _fancyTree = $.ui.fancytree.createTree($tree, {
            extensions: ["glyph"],
            checkbox: true,
            icon: false,
            selectMode: 3,
            autoScroll: true,
            scrollParent: scrollParent,
            toggleEffect: {
                effect: "drop", options: {
                    direction: "left"
                }, duration: 400
            },
            click: function (event, data) {
                var tree = data.tree;
                var treeNode = data.node;
                if (!treeNode.unselectable) {
                    var currentCount = _getSelectCount(tree);
                    var isSystemNode = false;
                    switch (treeNode.key) {
                        case '-1'://De 'alles' node mag in alle tijden geselecteerd worden, ook wanneer maximaal aantal is bereikt.
                            isSystemNode = true;
                            break;
                    }
                    if (isSystemNode || currentCount < 20 || treeNode.selected) {
                        treeNode.toggleSelected();
                        var selectedNodes = tree.getSelectedNodes();
                        if (treeNode.key == "-1") {
                            //'alles' is gekozen, deactiveer alle andere items;
                            _setSelected(selectedNodes, false);
                        }
                        else {
                            //Een item is geselecteerd; deactiveer 'alles';
                            _setSelected([tree.getNodeByKey("-1")], false);
                        }
                        _fixSelection3(data.tree);

                        var selectedNodes = tree.getSelectedNodes();
                        if (selectedNodes.length <= 0) {
                            _setSelected([tree.getNodeByKey("-1")]);
                        }
                        _selectedGroupItems[_selectionLabel] = tree.getSelectedNodes();
                    }
                }
                else {
                    treeNode.toggleExpanded();
                }
                event.preventDefault();
                event.stopPropagation();
            },
            glyph: {
                preset: "awesome4",
                map: {
                    doc: "fa fa-file-o",
                    docOpen: "fa fa-file-o",
                    checkbox: "fa fa-square-o",
                    checkboxSelected: "fa fa-check-square-o",
                    checkboxUnknown: "fa fa-square",
                    error: "fa fa-warning",
                    expanderClosed: "fa fa-chevron-down",
                    expanderLazy: "fa fa-angle-right",
                    expanderOpen: "fa fa-chevron-up",
                    folder: "fa fa-folder-o",
                    folderOpen: "fa fa-folder-open-o",
                    loading: "fa fa-spinner fa-pulse"
                }
            },
            source: treeData
        });
        return $tree;
    }

    var _getSelectCount = function (tree) {
        var selectedCount = 0;
        var selectedNodes = tree.getSelectedNodes();
        $.each(selectedNodes, function (index) {
            if (!this.folder && this.selected) {
                selectedCount++;
            }
        });
        return selectedCount;
    }

    var _setSelected = function (nodeArr, value) {
        $.each(nodeArr, function (index) {
            this.setSelected((value !== undefined) ? value : true);
        });
    }
    var _fixSelection3 = function (tree) {
        var selectedNodes = tree.getSelectedNodes(true);
        $.map(selectedNodes, function (node, index) {
            node.fixSelection3FromEndNodes();
        });
    };

    //returning the extra nodes; ie: 'Alle maanden', alle gemeentes etc..
    var _getGroupedNodes = function (dimension) {
        var nodes = [];
        switch (dimension.Type) {
            case 'TimeDimension':
                var unqGroupedCategories = {
                };
                $.each(dimension.Categories, function (index) {
                    var tag = this.Key.substring(4, 6);
                    unqGroupedCategories[tag] = 1;
                });
                $.each(lib.timeCategories, function (index) {
                    if (unqGroupedCategories[index] == 1) {
                        nodes.push({
                            'key': index, 'name': this
                        });
                    }
                });
                break;
            case 'GeoDetail':
                var unqGroupedCategories = {
                };
                var sortList = $.map(dimension.Categories, function (v, k) { return v; }).sort(function (a, b) { return (a.Title < b.Title) ? -1 : (a.Title > b.Title) ? 1 : 0; })
                $.each(sortList, function (index) {
                    var tag = this.DetailRegionCode.substring(0, 2);
                    if (tag == 'GM') {
                        unqGroupedCategories[this.Municipality] = this.Title;
                    };

                });
                $.each(unqGroupedCategories, function (index) {
                    nodes.push({
                        'key': index, 'name': this
                    });
                });
                break;
            //DetailRegionCode
            case 'GeoDimension':
                var unqGroupedCategories = {};
                $.each(dimension.Categories, function (index) {
                    var tag = this.Key.substring(0, 2);
                    unqGroupedCategories[tag] = 1;
                });
                $.each(lib.geoCategories, function (index) {
                    if (unqGroupedCategories[index] == 1) {
                        nodes.push({
                            'key': index, 'name': this
                        });
                    }
                });
                break;
            case 'Dimension':
                break;
        }
        return nodes;
    }
    init();
    return {
        GetLabel: _panel.GetLabel,
        GetSelectionFilters: _getSelectionFilters,
        OnBeforeShow: _onBeforeShow,
        OnAfterHide: _onAfterHide,
        ShowPanel: _showPanel,
        HidePanel: _hidePanel,
        RenderContent: _panel.RenderContent
    }
})();