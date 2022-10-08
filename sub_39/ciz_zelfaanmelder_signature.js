var process = process || {env: {NODE_ENV: "development"}};
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;
var canvas;
var context;
var canvasWidth = 320;
var canvasHeight = 150;
var handtekening;
var myImage = new Image();

function initSignature() {
    handtekening = $('#handtekening').val()
    prepareSimpleCanvas();
    initializeEvents();
}

myImage.onload = function () {
    context.drawImage(myImage, 0, 0, canvasWidth, canvasHeight);
    saveImage();
};

function prepareSimpleCanvas() {

    var canvasDiv = document.getElementById('canvasSimpleDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvasSimple');
    if(canvasDiv!==null && canvasDiv!==undefined) {
        canvasDiv.appendChild(canvas);
    }
    if (typeof G_vmlCanvasManager !== 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");
    if (handtekening !==undefined && handtekening !== null && handtekening !== '') {
        myImage.src = 'data:image/png;base64,' + handtekening;
    }
}

function initializeEvents(){
    $('#canvasSimple').mousedown(function (e) {
        var rect = this.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        paint = true;
        $("#canvasSimpleDiv").removeClass('errorBorder');
        $("#handtekeningImage_required").hide();
        addClickSimple(mouseX, mouseY, false);
        redrawSimple();
    });

    $('#canvasSimple').mousemove(function (e) {
        var rect = this.getBoundingClientRect();
        if (paint) {
            addClickSimple(e.clientX - rect.left, e.clientY - rect.top, true);
            redrawSimple();
        }
    });

    $('#canvasSimple').mouseup(function (e) {
        paint = false;
        redrawSimple();
    });

    $('#canvasSimple').mouseleave(function (e) {
        paint = false;
    });

    $('#clearCanvasSimple').click(function (e) {
        e.preventDefault();
        clickX = [];
        clickY = [];
        clickDrag = [];
        clearCanvas();
        $('#handtekeningImage').val('');
    });

}

function addClickSimple(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawSimple() {
    clearCanvas();

    var radius = 3;
    context.strokeStyle = "#000000";
    context.lineJoin = "round";
    context.lineWidth = radius;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag [i] && i) {
            context.moveTo(clickX [i - 1], clickY [i - 1]);
        } else {
            context.moveTo(clickX [i] - 1, clickY [i]);
        }
        context.lineTo(clickX [i], clickY [i]);
        context.closePath();
        context.stroke();
    }
    saveImage();

}

function saveImage() {
    if (canvas.getContext) {
        handtekening = canvas.toDataURL("image/png");
        $('#handtekeningImage').val(handtekening.substring(22, handtekening.length));
    }
}






