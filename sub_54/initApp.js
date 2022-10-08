document.addEventListener("DOMContentLoaded", init, false);
function init() {
    checkPageBlock();
}
function checkPageBlock() {
    var url = new URL(location.href);
    var urlToCheck = url + "/apps/configure-template/app/widgets/WebAnalytics/WebAnalytics.js";
    var init = {
        method: "HEAD",
        mode: "no-cors"
    };
    var req = new Request(urlToCheck, init);
    fetch(req)
        .then(function () {
        require(["Application"]);
    })
        .catch(function () {
        require(["PageBlock"]);
    });
}
