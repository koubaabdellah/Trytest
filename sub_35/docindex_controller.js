"use strict";var galleryApp=angular.module("docindexApp",["ngAnimate"]);galleryApp.controller("DocIndexListCtrl",["$scope","$http",function(t,n){n.get("/en/docindex.json").then(function(n){t.galleryitems=n.data}),t.orderProp="appID",t.isEmpty=function(e){return angular.isArray(e)&&e.length===0}}]);