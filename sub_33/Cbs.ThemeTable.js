// hier staat de code voor het opbouwen van de themaboom sidebar
var ThemeTable = window.ThemeTable = (function () {
    var _themaDataTemplate = function (title, data) {
        return '<li class="subs" data-item="' + data + '"><a href="#">' + title + '</a></li>'
    };

    var _tabelDataTemplate = function (title, data) {
        return '<li data-item="' + data + '"><a class="trigger-graph" href="#">' + title + '</a></li>'
    };

    var _setChildThemeTableList = function (parent) {
        $('#test-sidebar-trigger').append('<ul></ul>');
        var newList = $('#test-sidebar-trigger ul').last();

        var tables = [];
        $.each(OData.Catalog.ThemeTable[parent], function (i, t) { tables.push(OData.Catalog.Tables[t.TableID]); });

        $.each(tables, function (i, t) {
            var table = t;
            newList.append(ThemeTable.TabelDataTemplate(table.ShortTitle, table.Identifier));
        });

        var themes = [];
        $.each(OData.Catalog.Themes, function (i, t) {
            themes.push(t);
        });

        themes.sort(function (a, b) {
            if (a.ID > b.ID) { return 1 };
            if (a.ID < b.ID) { return -1 };
            return 0;
        });

        $.each(themes, function (i, t) {
            if (parseInt(parent) == parseInt(t.ParentID)) {
                newList.append(ThemeTable.ThemaDataTemplate(t.Title, t.ID));
            }
        });
    };

    var _showChildThemeTableList = function () {
        var currList = $(this).closest('ul');

        if ($.isNumeric(currList.attr('selected-item'))) {
            return;
        }
        currList.attr('selected-item', $(this).attr('data-item'));

        $('#themaNav h2').last().addClass('hideout');
        $('#themaNav').append('<h2 class="inactive">' + $(this).text() + '</h2>');
        var newItem = $('#themaNav h2').last();

        setTimeout(function () { newItem.removeAttr('class'); }, 175);

        _setChildThemeTableList($(this).attr('data-item'));
        $('#test-sidebar-trigger').animate({ 'left': '-100%' }, function () {
            currList.hide();
            $('#test-sidebar-trigger').css({ 'left': '0' });
        });
    };
    
    var setHeader = function (headerTitle) {
        $('#themaNav h2').last().addClass('hideout');
        $('#themaNav').append('<h2>' + headerTitle + '</h2>');
    };

    var createRoot = function () {
        $('#test-sidebar-trigger').empty();
        $('#test-sidebar-trigger').append('<ul></ul>');
        $('#themaNav').empty();
        $('#themaNav').append('<h2>' + lib.dictionary['Tabellen via thema'] + '</h2>');

        var newList = $('#test-sidebar-trigger ul').last();

        var temp1 = [];
        $.each(OData.Catalog.Themes, function (i, t) {
            temp1.push(t);
        });

        temp1.sort(function (a, b) {
            if (a.ID > b.ID) { return 1 };
            if (a.ID < b.ID) { return -1 };
            return 0;
        });

        temp1 = temp1.filter(function (item) {
            if (item.ParentID === null)
                return item;
        });

        $.each(temp1, function (i, t) {
            if (t.Language.toLowerCase() == lib.title.toLowerCase()) {
                newList.append(ThemeTable.ThemaDataTemplate(t.Title, t.ID));
            }
        });
    };

    var _createParentList = function (themeID) {
        var parentId = OData.Catalog.Themes[themeID].ParentID;

        //if this is not the root element we keep making new lists till we are at the root element.
        if (parentId !== null) {
            _createParentList(parentId);
        }

        var currentTheme = OData.Catalog.Themes[themeID];
        setHeader(currentTheme.Title);

        // make last list not vissible.
        $('#test-sidebar-trigger ul').last().css("display", "none");

        // create a new list and add this to the sidebar
        $('#test-sidebar-trigger').append('<ul></ul>');
        var newList = $('#test-sidebar-trigger ul').last();

        // add tables:
        var tableList = $.map(OData.Catalog.ThemeTable[themeID], function (table) {
            return OData.Catalog.Tables[table.TableID];
        });

        $.each(tableList, function (i, table) {
            newList.append(ThemeTable.TabelDataTemplate(table.ShortTitle, table.Identifier));
        });

        //add themes
        var themeList = $.map(OData.Catalog.Themes, function (theme) { if (theme.ParentID === themeID) return theme });

        $.each(themeList, function (i, theme) {
            newList.append(ThemeTable.ThemaDataTemplate(theme.Title, theme.ID));
        });
    }

    var _setThemeTableList = function () {
        createRoot();

        var parent = Object.is(OData.Theme, undefined) ? "" : OData.Theme.ID;

        if ($.isNumeric(parent)) {
            _createParentList(parent); 
        }
    };

    return {
        ThemaDataTemplate: _themaDataTemplate,
        TabelDataTemplate: _tabelDataTemplate, 
        ShowChildThemeTableList: _showChildThemeTableList,
        SetThemeTableList: _setThemeTableList
    }
})();