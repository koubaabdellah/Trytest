var apiUrl = '//www.arcgis.com/sharing/rest/content/users/';

app.service('UploaderService', UploaderService);
UploaderService.$inject = [];

function UploaderService() {

    var svc = {};
    window._uploaderService = svc;

    svc.sendData = function (formData) {
        return new Promise(function (resolve, reject) {
            var uploadFunction = uploadItem;

            uploadFunction(formData).then(
                function (responseId) {
                    // console.log('uploadItem worked! id=' + responseId);
                    waitForUploadToComplete(responseId).then(
                        function () {
                            // console.log('waitForUploadToComplete done.');
                            addAdditionalInfoToItem(responseId, formData).then(
                                function () {
                                    // console.log('addAdditionalInfoToItem complete');
                                    shareItem(responseId).then(
                                        function (itemURL) {
                                            // console.log('shareItem complete');
                                            resolve(itemURL);
                                        },
                                        function (error) {
                                            reject(error);
                                        }
                                    )
                                },
                                function (error) {
                                    reject(error);
                                }
                            );
                        },
                        function (error) {
                            reject(error);
                        }
                    );
                },
                function (error) {
                    reject(error);
                }
            );
        });
    };

    function uploadItem(formData) {
        return new Promise(function (resolve, reject) {
            var postUrl = apiUrl + AuthScriptsAuth.authInfo.username + '/addItem';
            var typeKeywords = formData.itemType + ',' + formData.productName + ',' + formData.language;
            var payload = {
                "type": formData.itemType,
                "typeKeywords" : typeKeywords,
                "codesample" : formData.language,
                "title" : formData.title,
                "tags" : formData.tags + ',' + typeKeywords,
                "file" : formData.file,
                "token" : AuthScriptsAuth.authInfo.access_token,
                "itemType" : "file",
                "url" : formData.url || "",
                "storeauth" : "nostore",
                "archiveSelect" : "codesample",
                "arcpadpackage" : "ArcPad Project",
                "stylx" : "2d",
                "enablePublishing" : "on",
                "purpose" : "Ready To Use",
                "desktopapi" : "JavaScript",
                "mobileapi" : "ArcGIS for Android",
                "apidesktopapp" : "Java",
                "geocode" : "locationTypes",
                "geocodeAddress" : "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                "geocodeAddress" : "us",
                "thumbnailURL" : "//static.arcgis.com/images/desktopapp.png",
                "overwrite" : "true",
                "async" : "true",
                "f" : "json"
            };

            uploadUsingFormData(postUrl, payload).then(
                function(results){
                    resolve(results.id);
                },
                function(err){
                    reject(err);
                }
            );
        });
    }

    function waitForUploadToComplete(itemId) {
        return new Promise(function (resolve, reject) {

            var checkUrl = apiUrl + AuthScriptsAuth.authInfo.username + '/items/' + itemId + '/status';
            $.get(checkUrl, {f: 'json', token: AuthScriptsAuth.authInfo.access_token}, function (results) {
                switch (results.status) {
                    case 'processing':
                        setTimeout(function () {
                            waitForUploadToComplete(itemId).then(
                                function () {
                                    resolve();
                                },
                                function (error) {
                                    reject(error);
                                }
                            );
                        }, 100);
                        break;
                    case 'completed':
                        resolve();
                        break;
                    case 'failed':
                        reject(results.statusMessage);
                        break;
                    default:
                        resolve();
                        break;
                }
            });
        });
    }

    function addAdditionalInfoToItem(itemId, formData) {
        return new Promise(function (resolve, reject) {
            var postUrl = apiUrl + AuthScriptsAuth.authInfo.username + '/items/' + itemId + '/update';
            var typeKeywords = formData.itemType + ',' + formData.productName + ',' + formData.language;

            var payload = {
                "type" : formData.itemType,
                "typeKeywords" : typeKeywords,
                "title" : formData.title,
                "tags" : formData.tags + ',' + typeKeywords,
                "token" : AuthScriptsAuth.authInfo.access_token,
                "snippet" : formData.title,
                "description" : formData.summary,
                "licenseInfo" : "",
                "overwrite" : "false",
                "item" : "",
                "url" : formData.url || "",
                "accessInformation" : "",
                "extent" : "",
                "thumbnailURL" : "//static.arcgis.com/images/desktopapp.png",
                "listingProperties" : "",
                "clearEmptyFields" : "true",
                "opRouting" : "on",
                "opMeasure" : "on",
                "opBasemap" : "on",
                "opFindLocations" : "on",
                "opByLayer" : "on",
                "opByAddress" : "on",
                "text" : "",
                "f" : "json"
            };

            uploadUsingFormData(postUrl, payload).then(
                function(results){
                    resolve(results);
                },
                function(err){
                    reject(err);
                }
            );
        });
    }

    function shareItem(itemId) {
        return new Promise(function (resolve, reject) {
            var postUrl = apiUrl + AuthScriptsAuth.authInfo.username + '/shareItems';
            var payload = {
                "items" : itemId,
                "groups" : '',
                "everyone" : 'true',
                "account" : 'false',
                "token" : AuthScriptsAuth.authInfo.access_token,
                "f" : "json"
            };

            uploadUsingFormData(postUrl, payload).then(
                function(results){
                    resolve('//www.arcgis.com/home/item.html?id=' + itemId);
                },
                function(err){
                    reject(err);
                }
            );
        });
    }

    //Helpers
    function uploadUsingFormData(postUrl, payload){
        return new Promise(function(resolve, reject){
            var uploadForm = new FormData();

            for(var i in payload){
                if(payload.hasOwnProperty(i)){
                    uploadForm.append(i, payload[i]);
                }
            }

            var xReq = new XMLHttpRequest();
            xReq.open("POST", postUrl);

            xReq.onreadystatechange = function () {
                if (xReq.readyState == 4 && xReq.status == 200) {
                    var response = JSON.parse(xReq.responseText);
                    if(response.results){
                        response = response.results[0];
                    }

                    if (response.success == true) {
                        resolve(response);
                    } else {
                        reject(response.error.message);
                    }
                }
            };
            xReq.send(uploadForm);
        });
    }

    return svc;
}