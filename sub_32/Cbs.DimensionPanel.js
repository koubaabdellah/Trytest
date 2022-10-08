var DimensionsPanel = window.DimensionsPanel = (function () {
    var _panel;
    var _currentTableIdentifier;
    var _filterData = {};
    var _filterDataODataSelect = {};
    var _action;
    var _actionSelectDimension;

    var init = function () {
        _panel = new Panel();
        _panel.SetContent(_content);
        _panel.SetPanelSelector("#selection-panel-dimensions");
    }

    var isItemPartOfSelectedGroup = function (item, collection, data)
    {
        var selectedGroups = collection.filter(function (item) { if (item.key == '-2') return item; }).map(function (item) { return item.data.substring; });

        if (Object.keys(data).indexOf(item.key) > -1 && selectedGroups.indexOf(item.key.substring(0, 2)) > -1)
        {
            return true;
        }
        return false;
    }

    var countFilterData = function (collection, data) {
        var retVal = 0;
        if (collection) {
            //var selectedGroups = collection.filter(e => e.)
            $.each(collection, function (index) {
                if (!this.folder) {
                    switch (this.key) {
                        case '-1'://alles, dus tel niets mee;
                            break;
                        case '-2'://MM, JJ, PV
                            var substr = this.data.substring;
                            var groupCount = 0;
                            $.each(data, function (index) {
                                //Bevat de MM/JJ/PV Key
                                if (index.indexOf(substr) >= 0) { groupCount++; }
                            });
                            retVal += groupCount;
                            break;
                        case '-3'://GeoDetail, GM0000;
                            var substr = this.data.substring.substring(2, 6);
                            var groupCount = 0;
                            $.each(data, function (index) {
                                if (index.substring(2, 6) == substr) { groupCount++; }
                            });
                            retVal += groupCount;
                            break;
                        default:
                            if (!isItemPartOfSelectedGroup(this, collection, data))
                            {
                                retVal++;
                            }
                    }
                }
            });
        }
        return retVal;
    }
    var _content = function () {
        var retVal = 'Loading...';
        _currentTableIdentifier = OData.Table.Identifier;


        ODataRepository.loadTableMetadata(_currentTableIdentifier, function (table) {
            var $retVal = $('<div></div>');

            var columnCount = 1;
            var topicsCount = $.map(OData.Metadata.Topics, function (n, i) {
                return i;
            }).length;
            var selectedCount = countFilterData(_filterData['Topics'], OData.Metadata.Topics);
            var title = lib.dictionary['Onderwerpen'];
            var selectionTag = lib.dictionary['Alles'] + ' (' + topicsCount + ')';
            if (selectedCount != 0) {
                selectionTag = lib.dictionary['Selectie'] + ' (' + selectedCount + ' / ' + topicsCount + ')';
            }

            $retVal.append('<section class="single" data-dimension="Topics"><header><h1>' + title + '</h1></header><ul><li>' + selectionTag + '</li></ul></section>');

            columnCount = selectedCount || topicsCount;
            var dimenssionCellCount = columnCount;
            $.each(OData.Metadata.Dimensions, function (index) {
                columnCount++;
                var categoriesCount = $.map(this.Categories, function (n, i) {
                    return i;
                }).length;
                var selectedCount = countFilterData(_filterData[this.Key], this.Categories);
                var title = this.Title;
                var selectionTag = lib.dictionary['Alles'] + ' (' + categoriesCount + ')';
                if (selectedCount != 0) {
                    selectionTag = lib.dictionary['Selectie'] + ' (' + selectedCount + ' / ' + categoriesCount + ')';
                }

                $retVal.append('<section class="single" data-dimension="' + this.Key + '"><header><h1>' + title + '</h1></header><ul><li>' + selectionTag + '</li></ul></section>');
                dimenssionCellCount = (dimenssionCellCount * (selectedCount || categoriesCount));
            });

            //var summary = lib.dictionary['Aantal geselecteerde cellen'] + ': ' + (columnCount * dimenssionCellCount);

            var thousendFormat = function (nr) { return nr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
            var summary = lib.dictionary['Aantal geselecteerde cellen'] + ': ' + thousendFormat(dimenssionCellCount);


            $sumarySection = $('<section class="single no-info"><header><h1>' + summary + '</h1><ul><li></li></ul></header></section>');
            $downloadSection = $('<section class="single no-info"><header><h1>' + lib.dictionary['Bestandsformaat'] + '</h1></header><ul style="text-align:center;"><li><button class="cbs-btn">Download CSV</button></li><li><button class="cbs-btn">Download JSON</button></li></ul></section>');


            $retVal.find('section[data-dimension]').click(function () {
                _selectDimension($(this).attr('data-dimension'), _currentTableIdentifier);
            });

            var isEI9OrBelow = function () { return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10; };
            if (isEI9OrBelow()) {
                $downloadSection.find('button').last().hide();
            }
            if ((dimenssionCellCount) > 1000000) {
                $sumarySection.find('ul li:first').html(lib.dictionary['Teveel aantal geselecteerde cellen']);
                $downloadSection.find('button').addClass('cbs-btn-disabled');
            }
            else {
                var args1 = $.extend({}, _filterDataODataSelect);
                var args2 = $.extend({}, _filterDataODataSelect); args2['$format'] = 'json';
                $downloadSection.find('button').first().click(function () {
                    _onAction(args1);
                });
                $downloadSection.find('button').last().click(function () {
                    _onAction(args2);
                });
            }

            $retVal.append($sumarySection);
            $retVal.append($downloadSection);
            retVal = $retVal;
            _panel.SetContent($retVal);
        });

        return retVal;
    };
    var _selectDimension = function (args, identifier) {
        if ($.isFunction(_actionSelectDimension)) {
            _actionSelectDimension(args, identifier);
        }
    }
    var _onAction = function (args) {
        if ($.isFunction(_action)) {
            _action(args);
        }
    }

    var _showPanel = function (label) {
        if (_currentTableIdentifier != OData.Table.Identifier) {
            _filterData = {};
            _filterDataODataSelect = {};
            _panel.SetContent(_content);
        }
        _panel.ShowPanel(label);
    };
    var _hidePanel = function () {
        _panel.HidePanel();
    }

    var _setSelectionFilters = function (filterData) {
        _filterData = filterData;
        _filterDataODataSelect = _parseFilterToODataFilterSelect(filterData);
        _panel.SetContent(_content);
    }

    var _parseFilterToODataFilterSelect = function (filterData) {
        result = {};
        var filter = [];
        var select = [];
        select.push("ID");
        $.each(OData.Metadata.Dimensions, function (index) {
            select.push(this.Key);
        });

        var hasTopicsFilter = false;
        $.each(filterData, function (index) {
            var collection = index;
            var collectionFilter = [];
            $.each(this, function (index) {
                if (!this.folder && this.selected) {

                    if (collection == 'Topics') {
                        //bij topics kan ook het 'alles' filter bestaand; (verder geen dimenssie groep filters)
                        switch (this.key) {
                            case '-1'://alles, dus geen filter;
                                break;
                            default:
                                hasTopicsFilter = true;
                                select.push(this.key);
                        }
                    } else {
                        switch (this.key) {
                            case '-1'://alles, dus geen filter;
                                break;
                            case '-2'://Dimensie groepering; (MM / JJ / GM / PV)
                                collectionFilter.push('substringof(\'' + this.data.substring + '\',' + collection + ')');
                                break;
                            case '-3'://GeoDetail selectie
                                collectionFilter.push('substring(' + collection + ',2,4) eq \'' + this.data.substring.substring(2, 6) + '\'');
                                break;
                            default:
                                collectionFilter.push(collection + ' eq \'' + this.key + '\'');
                        }
                    }
                }
            });
            filter.push(collectionFilter);
        });

        //topics zijn niet gefiltert; select parameter kan volledig weg
        if (!hasTopicsFilter) {
            select = [];
        };

        var filterString = $.map(filter, function (v, k) {
            var collectionFilter = $.map(v, function (v, k) {
                return (v.length > 0) ? '(' + v + ')' : '';
            }).join(' or ');
            if (collectionFilter.length > 0) {
                return '(' + collectionFilter + ')';
            }
        }).join(' and ');

        var selectString = $.map(select, function (v, k) {
            return v;
        }).join(', ');

        var result = {};
        if (filterString != '') {
            result['$filter'] = filterString;
        }
        if (selectString != '') {
            result['$select'] = selectString;
        }

        return result;
    }

    var _setAction = function (action) {
        _action = action;
    };
    var _setActionSelectDimension = function (action) {
        _actionSelectDimension = action;
    };

    var _onBeforeShow = function (event) {
        _panel.OnBeforeShow(event);
    }
    var _onAfterHide = function (event) {
        _panel.OnAfterHide(event);
    }

    init();
    return {
        GetLabel: _panel.GetLabel,
        OnBeforeShow: _onBeforeShow,
        OnAfterHide: _onAfterHide,
        ShowPanel: _showPanel,
        HidePanel: _hidePanel,
        RenderContent: _panel.RenderContent,
        SetSelectionFilters: _setSelectionFilters,
        SetAction: _setAction,
        SetActionSelectDimension: _setActionSelectDimension
    }
})();