var nodeServerHelper=(function(f,y){var m="/appstudio/rest/apps/createApp",p="/appstudio/rest/apps/setConfig",b="/appstudio/rest/apps/getConfig",h="/appstudio/rest/apps/setImage",j="/appstudio/rest/apps/saveApp",i="/appstudio/rest/apps/deleteApp",q="/appstudio/rest/apps/uploadDefaultThumbnail",x="/appstudio/rest/apps/hasLandingPage",r="/appstudio/rest/apps/createLandingPage",u="/appstudio/rest/serverrest/getConfig",t="/appstudio/rest/serverrest/cleanCache";function n(z){f.post(t+"?"+f.param({username:y.getUsername(),token:y.getToken()})).done(function(A){if(z){z(A)}})}function c(z){f.get(u+"?"+f.param({username:y.getUsername(),token:y.getToken(),time:(new Date()).valueOf()})).done(function(A){if(z){z(A)}})}function e(z,A){f.post(m+"?"+f.param({username:y.getUsername(),token:y.getToken(),template:z})).done(function(B){if(A){A(B)}})}function k(z,A){f.get(b+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:z,time:(new Date()).valueOf()})).done(function(B){if(A){A(B)}})}function w(A,z,B){f.post(p+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:A}),z).done(function(C){if(B){B(C)}})}function v(D,z,E){var C,B=new FormData();for(var A=0;A<z.length;A++){C=z[A];B.append(C.type,C.image)}f.ajax({url:h+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:D}),data:B,method:"POST",cache:false,contentType:false,processData:false}).done(function(F){if(E){E(F)}})}function l(A,z,B){f.post(j+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:A}),z).done(function(C){if(B){B(C)}})}function s(z,A){f.post(i+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:z})).done(function(B){if(A){A(B)}})}function d(z,B,A){f.post(q+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:z,thumbnailName:B})).done(function(C){if(A){A(C)}})}function g(z,A){f.get(x+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:z,time:(new Date()).valueOf()})).done(function(B){if(A){A(B)}})}function o(z,A){f.post(r+"?"+f.param({username:y.getUsername(),token:y.getToken(),itemId:z})).done(function(B){if(A){A(B)}})}var a={};a.createApp=function(z,A){e(z,A)};a.getAppConfig=function(z,A){k(z,A)};a.setAppConfig=function(A,z,B){w(A,z,B)};a.setAppImage=function(A,z,B){v(A,z,B)};a.saveApp=function(A,z,B){l(A,z,B)};a.deleteApp=function(z,A){s(z,A)};a.uploadDefaultThumbnail=function(z,B,A){d(z,B,A)};a.hasLandingPage=function(z,A){g(z,A)};a.createLandingPage=function(z,A){o(z,A)};a.getClientConfig=function(z){c(z)};a.cleanUserCache=function(z){n(z)};return a}($,user));