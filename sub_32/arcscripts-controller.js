app.controller('arcScriptsController', arcScriptsController);
arcScriptsController.$inject = ['$sce', '$scope', '$http', 'UploaderService'];

function arcScriptsController($sce, $scope, $http, UploaderService) {

    window._arcScriptsController = $scope;

    $scope.sideFilter = [
        {
            catName: 'Show Me',
            options: [{ display: 'All', name: 'all', value: 'All', current: true }]
        },
        {
            catName: 'Language',
            options: [
                { display: 'C#', value: 'C#', search: 'C#', defaultImage: 'c-sharp.png' },
                { display: 'C++', value: 'C++', search: 'C++', defaultImage: 'cpp.png' },
                { display: 'Flex', value: 'Flex', search: 'Flex', defaultImage: 'flex.png' },
                { display: 'Java', value: 'Java', search: 'Java', defaultImage: 'java.png' },
                { display: 'JavaScript', value: 'JavaScript', search: 'JavaScript', defaultImage: 'javascript.png' },
                { display: 'Objective C', value: 'Objective C', search: 'Objective C', defaultImage: 'objective-c.png' },
                { display: 'Python', value: 'Python', search: 'Python', defaultImage: 'python.png' },
                { display: 'QML', value: 'QML', search: 'QML', defaultImage: 'qml.png' },
                { display: 'Swift', value: 'Swift', search: 'Swift', defaultImage: 'swift.png' },
                { display: 'Visual Basic', value: 'Visual Basic', search: 'Visual Basic', defaultImage: 'vb.png' },
                { display: 'XML', value: 'XML', search: 'XML', defaultImage: '' }]
        },
        {
            catName: 'Software Product',
            options: [{ display: 'AppStudio for ArcGIS', value: 'AppStudio for ArcGIS', search: 'appstudio' },
            { display: 'ArcGIS Engine', value: 'ArcGIS Engine', search: 'arcgis engine' },
            { display: 'ArcGIS Online', value: 'ArcGIS Online', search: 'arcgis online' },
            { display: 'ArcGIS Pro', value: 'ArcGIS Pro', search: 'arcgis pro' },
            { display: 'ArcGIS Runtime APIs', value: 'ArcGIS Runtime APIs', search: 'arcgis runtime' },
            { display: 'ArcGIS Viewer for Flex', value: 'ArcGIS Viewer for Flex', search: 'arcgis viewer' },
            { display: 'ArcGIS Viewer for Silverlight', value: 'ArcGIS Viewer for Silverlight', search: 'silverlight' },
            { display: 'ArcGIS Web APIs', value: 'ArcGIS Web APIs', search: 'web api' },
            { display: 'ArcGIS Web AppBuilder', value: 'ArcGIS Web AppBuilder', search: 'appbuilder' },
            { display: 'ArcGIS for Desktop', value: 'ArcGIS for Desktop', search: 'desktop' },
            { display: 'ArcGIS for Server', value: 'ArcGIS for Server', search: 'arcgis server' },
            { display: 'ArcGIS for Windows Mobile', value: 'ArcGIS for Windows Mobile', search: 'arcgis windows mobile' },
            { display: 'ArcPad', value: 'ArcPad', search: 'arcpad' },
            { display: 'ArcSDE', value: 'ArcSDE', search: 'arcsde' },
            { display: 'CityEngine', value: 'CityEngine', search: 'cityengine' }]
        },
        {
            catName: 'Result Type',
            options: [
                { display: 'Code samples', value: 'Code samples', search: 'Code samples', uploadId: 'Code Sample', allowedFiles: ['.zip'] },
                { display: 'Add-ins', value: 'Add-ins', search: 'Add-ins', uploadId: 'Desktop Add In', allowedFiles: ['.esriAddIn', '.esriAddInX', '.eaz'] },
                { display: 'Geoprocessing samples', value: 'Geoprocessing samples', search: 'Geoprocessing samples', uploadId: 'Geoprocessing Sample', allowedFiles: ['.zip'] },
                { display: 'Github repository', value: 'Web Mapping Application', search: 'Github repository', uploadId: 'Web Mapping Application', allowedFiles: [] }
            ]
        }
    ];
    $scope.industries = [
        'Administration',
        'Agriculture',
        'Archaeology',
        'Architecture/Engineering/Construction',
        'Assessor/Cadastral Records',
        'Banking/Credit Unions/Financial Services',
        'Business Services',
        'Cartography',
        'Conservation',
        'Defense/Intelligence',
        'Demographics/Census/Elections',
        'Electric/Gas Utility',
        'Environmental Management',
        'Fire',
        'Fisheries &amp; Wildlife',
        'Forestry',
        'GIS Services',
        'Health and Human Services',
        'Higher Education',
        'Homeland Security',
        'Insurance',
        'K-12 Education',
        'Law Enforcement',
        'Library/Museum',
        'Location-based Services',
        'Media/Publishing',
        'Mining',
        'Natural Resources',
        'Oceans/Maritime',
        'Other',
        'Petroleum',
        'Pipeline',
        'Planning/Economic Development',
        'Public Safety/Emergency Management',
        'Public Works',
        'Real Estate',
        'Retail/Commercial Business',
        'Survey',
        'Telecommunication',
        'Transportation/Fleet Management',
        'Water Resources',
        'Water/Wastewater/Stormwater'
    ];
    $scope.isLoading = false;
    $scope.submitEnabled = false;

    var currentPage = 1;

    function loadArcScripts(params) {
        if (!$scope.isLoading) {
            // $scope.isLoading = true;
            params.query = (params.query) ? params.query : '""';

            if (!params.addToArray) {
                currentPage = 1;
            }

            var nextStart = '';
            var resultTypes = (params.filterSelection.indexOf('type') == -1)
                ? '(type:"code samples" OR type:"add-ins" OR type:"geoprocessing samples") '
                : '';
            var searchTerm = (params.query.trim()) ? params.query : '""';
            var query = '(' + searchTerm + ' OR owner:' + searchTerm + ') ' +
                params.filterSelection +
                resultTypes +
                '-type:"Code Attachment" ' +
                '-type:"Featured Items" ' +
                '-type:"Symbol Set" ' +
                '-type:"Color Set" ' +
                '-type:"Windows Viewer Add In" ' +
                '-type:"Windows Viewer Configuration" ';

            if (params.query.trim() === "appstudio") {
                query = '(((appstudio OR owner: appstudio)  AND (!.ipa OR !.apk OR !.exe OR !.run OR !.dmg)) (type:"Native Application") -type:"appstudio") OR (((appstudio OR owner: appstudio) AND (!.ipa OR !.apk OR !.exe OR !.run OR !.dmg)) (type:"code samples") -type:"AppStudio For ArcGIS")';
            }

            var url = '//www.arcgis.com/sharing/rest/search?callback=JSON_CALLBACK&' +
                'q=' + query +
                '&start=' + ((params.start) ? params.start : '1') +
                '&num=' + params.count +
                '&f=json' +
                '&sortField=modified' +
                '&sortOrder=desc';

            $http.jsonp(url)
                .success(function (response) {
                    if (response.results.length > 0) {
                        $scope.total = response.total;
                        var results = response.results.map(function (item) {
                            return {
                                id: item.id,
                                targetUrl: 'https://www.arcgis.com/home/item.html?id=' + item.id,
                                title: item.title,
                                software: '[software]',
                                language: (item.languages.length > 0) ? languages[0] : '',
                                author: item.owner,
                                modified: item.modified,
                                resultType: item.type,
                                typeKeywords: item.typeKeywords.join(),
                                fileUploadName: item.name,
                                tags: item.tags.join(),
                                thumbnail: defaultImg(
                                    item.id,
                                    item.thumbnail,
                                    (params.filterSelection + item.typeKeywords.join() + item.tags.join())
                                )
                            };
                        });

                        $scope.arcScripts = params.addToArray ? $scope.arcScripts.concat(results) : results;
                    }
                    else {
                        if (!params.addToArray) {
                            $scope.arcScripts = [];
                            $scope.total = 0;
                        }
                    }
                    $scope.isLoading = false;
                });
        }
    };

    function doesStringContain(str, strArray) {
        var ret = false;

        if (strArray && str) {
            strArray.forEach(function (subStr) {
                if (str.toLowerCase().indexOf(subStr.toLowerCase()) > -1) {
                    ret = true;
                }
            });
        }

        return ret;
    }

    function filterBuilder() {
        var query = '';
        var tagName = '';

        $scope.sideFilter.forEach(function (cat) {

            tagName = (cat.catName == 'Result Type') ? 'type:' : 'tags:';

            for (var i = 0; i < cat.options.length; i++) {

                var opt = cat.options[i];

                if (opt.current && opt.value != 'All') {

                    if (tagName == 'type:') {
                        query += tagName + '"' + encodeURIComponent(opt.search) + '" ';
                    }
                    else { //tags
                        if (cat.catName != 'Software Product') {
                            query += tagName + encodeURIComponent(opt.search) + ' ';
                        }
                    }

                }
            }
        });

        return query;
    };

    function defaultImg(id, thumbnail, tags) {

        tags = tags.toLowerCase();
        tags = decodeURIComponent(tags.toLowerCase());

        var imagePath = 'img/esri-thumbnails/';

        var selected = $scope.sideFilter[1].options.filter(function (option) {
            return option.current == true;
        });

        var selectedLanguage = (selected.length > 0) ? decodeURIComponent(selected[0].value) : '';
        var defaultImage = (selected.length > 0) ? selected[0].defaultImage : 'random/' + (Math.floor(Math.random() * 6) + 1) + '.png';
        var temp = '';

        if (!selectedLanguage) {
            $scope.sideFilter[1].options.forEach(function (option) {
                temp = option.value.toLowerCase();
                if (tags.includes(temp)) {
                    defaultImage = option.defaultImage;
                    return false;
                }
            });
        }

        if (thumbnail && !thumbnail.includes('ago_downloaded.png')) {
            return 'https://www.arcgis.com/sharing/rest/content/items/' + id + '/info/' + thumbnail;
        }
        else {
            return 'img/esri-thumbnails/' + defaultImage;
        }
    }

    function allPropertiesHaveValues(obj, exclude) {
        var results = { success: true, emptyProperties: [] };
        var emptyProperties = [];

        Object.keys(obj).forEach(function (key) {
            if (key != exclude) {
                if (!obj[key]) {
                    results.success = false;
                    results.emptyProperties.push(key);
                }
            }
        });

        return results;
    }

    $scope.allowedFiles = '';
    $scope.setAllowedFiles = function () {
        var selected = $scope.uploadForm.itemType;

        var option = $scope.sideFilter[3].options.filter(function (option) {
            return option.uploadId == selected;
        });

        option = option[0];

        if (option.allowedFiles.length > 0) {
            $scope.allowedFiles = 'Upload ' + option.allowedFiles.join() + ' files only.';
        } else {
            $scope.allowedFiles = '';
        }

    };

    $scope.$watch('searchTerm', function () {

        var selected = $scope.sideFilter[2].options.filter(function (option) {
            return option.current == true;
        });

        loadArcScripts({ query: $scope.searchTerm, count: '25', filterSelection: '', addToArray: false });
    });

    $scope.filter = function (sideFilter, option) {
        //section: 'show-me
        if (sideFilter.catName == 'Show Me') {

            //clear all and highlight "all" option
            $scope.sideFilter.forEach(function (sf) {
                sf.options.forEach(function (opt) {
                    opt.current = false;
                });
            });

            $scope.sideFilter[0].options[0].current = true;
        }
        else {
            //remove "all" highlight
            $scope.sideFilter[0].options[0].current = false;

            //removes highlight of all options in section
            var hasFilter = false;

            sideFilter.options.forEach(function (opt) {
                if (option.value == opt.value) {
                    option.current = option.current ? false : true;
                    if (option.current) {
                        hasFilter = true;
                    }
                }
                else {
                    opt.current = false;
                }
            });
        }

        var selected = $scope.sideFilter[2].options.filter(function (option) {
            return option.current == true;
        });

        var term = ($scope.searchTerm) ? $scope.searchTerm : '';
        var product = (selected[0]) ? selected[0].search : '';
        $scope.selectedProduct = product;

        var filterQuery = filterBuilder();
        loadArcScripts({ query: term + ' ' + product, count: '100', filterSelection: (filterQuery) ? filterQuery : '', addToArray: false });
    }

    $scope.showLogin = function () {
        AuthScriptsAuth.showOAuthLogin();

        //refresh form
        $scope.formError = '';
        $scope.loading = false;
        $scope.uploadForm = {
            itemType: '',
            url: '',
            productName: '',
            language: '',
            industry: '',
            title: '',
            tags: '',
            summary: '',
            file: {}
        };
    };

    var watchItems = '[uploadForm.itemType, uploadForm.productName' +
        ', uploadForm.language, uploadForm.industry, uploadForm.title' +
        ', uploadForm.tags, uploadForm.summary, uploadForm.file]';

    $scope.$watchCollection(watchItems, function (newValues, oldValues) {
        var isValid = true;
        newValues.forEach(function (value) {
            if (!value) {
                isValid = false;
                return;
            }
        });

        $scope.submitEnabled = isValid;
    });

    $scope.sendData = function () {

        var result = {};
        result.isValid = true;
        result.message = '';
        var selectedItemType = {};
        var exclude = ($scope.uploadForm.itemType != 'Web Mapping Application') ? 'url' : ''; //don't validate url if WMA

        var propCheck = allPropertiesHaveValues($scope.uploadForm, exclude); //exclude url

        if (propCheck.success) {

            var itemType = $scope.sideFilter[3].options.filter(function (option) {
                return option.uploadId == $scope.uploadForm.itemType;
            });

            var allowedFiles = itemType[0].allowedFiles;

            switch ($scope.uploadForm.itemType) {
                case 'Web Mapping Application':

                    if ($scope.uploadForm.tags.toLowerCase().indexOf('github') == -1) {
                        $scope.uploadForm.tags += ', Github';
                    }
                    break;
                default:
                    if (!doesStringContain($scope.uploadForm.file.name, allowedFiles)) {
                        result.isValid = false;
                        result.message += 'file: ' + allowedFiles.join() + ' files only<br />';
                    }
            }

        } else {
            result.message += 'Required fields: ' + propCheck.emptyProperties;
            result.isValid = false;
        }

        //add industry to tag
        if ($scope.uploadForm.tags.indexOf($scope.uploadForm.industry) == -1) {
            $scope.uploadForm.tags += ', ' + $scope.uploadForm.industry;
        }

        if (result.isValid) {
            $scope.loading = true;
            UploaderService.sendData($scope.uploadForm).then(
                function (itemURL) {
                    $scope.itemUrl = itemURL;
                    $scope.formError = '';
                    $scope.loading = false;
                    $scope.$apply();
                },
                function (error) {
                    $scope.formError = (error) ? error : error.message;
                    $scope.itemUrl = '';
                    $scope.loading = false;
                    $scope.$apply();
                }
            );
        } else {
            //result.message += ' required.';
            $scope.formError = $sce.trustAsHtml(result.message);
            $scope.loading = false;
        }
    };

    $scope.scrollToTop = function (pixNum) {
        $("html, body").animate({ scrollTop: pixNum + "px" });
    };

    $scope.loadMore = function () {
        var term = ($scope.searchTerm) ? $scope.searchTerm : '';
        var product = ($scope.selectedProduct) ? $scope.selectedProduct : '';
        var filterQuery = filterBuilder();
        loadArcScripts({
            query: term + ' ' + product,
            start: (101 * currentPage),
            count: '100',
            filterSelection: (filterQuery) ? filterQuery : '',
            addToArray: true
        });
        currentPage++;
    }

    var currentPage = 1;

}
