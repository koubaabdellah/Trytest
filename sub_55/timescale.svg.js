/*
 * <script xlink:href="../js/timescale.js" />
 * <script xlink:href="timescale.svg.js" />
 */

(function(Timescale, oEras){
	function matrix(el){
		var i, aMatches, regexpMatrix = /matrix\(([\d. -]+)\)/g;
		var aTransform, sTransfrom = el.getAttributeNS(null, 'transform');
		if( sTransfrom ){
			aMatches = regexpMatrix.exec(sTransfrom);
			if( aMatches ){
				aTransform = aMatches[1].split(' ');

				for(i=0; i<aTransform.length; i++){
					aTransform[i] = parseFloat(aTransform[i]);
				}
				return aTransform;
			}
		}
	}

	function selectPeriod(evt){
		evt.stopPropagation;
		currentEra = this.getAttribute('data-era') || this.id.substring(1);
		if( currentEra ){
			leftX = oEras[currentEra].x1;
			rightX = oEras[currentEra].x2 - Timescale.w;
			setMarkers();
			notify();
		}
	}

	function selectElement(evt){
		selectedElement = evt.target;
		while( selectedElement.getAttribute('class') != 'draggable' ){
			selectedElement = selectedElement.parentNode;
		}

		currentMatrix = matrix(selectedElement);
		currentX = typeof(window.event.touches) == 'undefined' ? evt.clientX : window.event.touches[0].clientX;
	}

	function setMarkers(){
		//compensate for material thickness
		leftX = Math.max(0, leftX-10);
		rightX = Math.min(0, rightX+10);
		moveElementX('leftmarker', leftX);
		moveElementX('rightmarker', rightX);
	}

	function moveElementX(id, dx){
		var m, sNewMatrix, el = document.getElementById(id);
		if( el ){
			m = matrix(el) || [1, 0, 0, 1, 0, 0];
			if( m ){
				m[4] = dx;
				sNewMatrix = "matrix(" + m.join(' ') + ')';

				el.setAttributeNS(null, 'transform', sNewMatrix);
			}
		}
	}

	function moveElement(evt){	
		var f, sNewMatrix, dx = (typeof(window.event.touches) == 'undefined' ? evt.clientX : window.event.touches[0].clientX) - currentX;
		if( parent.document.body && parent.document.body.clientWidth ){
			//embedded in page, use resize factor
			f = oBoundaries.width / parent.document.body.clientWidth;
			dx = Math.round(dx * f);
		}

		if( dx && currentMatrix && selectedElement ){
			currentMatrix[4] += dx;
			if(selectedElement.id == 'leftmarker'){
				if( currentMatrix[4] < 0 ){
					currentMatrix[4] = 0;
				}else if( currentMatrix[4] > (Timescale.w - 50 + rightX) ){
					currentMatrix[4] = Timescale.w - 50 + rightX;
				}
				leftX = currentMatrix[4];
			}
			if(selectedElement.id == 'rightmarker'){
				if( currentMatrix[4] > 0 ){
					currentMatrix[4] = 0;
				}else if( currentMatrix[4] < (leftX - Timescale.w + 50) ){
					currentMatrix[4] = leftX - Timescale.w + 50;
				}
				rightX = currentMatrix[4];
			}
			sNewMatrix = 'matrix(' + currentMatrix.join(' ') + ')';

			selectedElement.setAttributeNS(null, 'transform', sNewMatrix);
			currentX = (typeof(window.event.touches) == 'undefined' ? evt.clientX : window.event.touches[0].clientX);
			currentEra = null;
		}
	}

	function notify(){
		//compensate for material thickness
		var fromY = Timescale.x2year(leftX + 10);
		var toY = Timescale.x2year(Timescale.w + rightX - 10);

		if( typeof(parent.filterOnTimescale) == 'function' ){
			parent.filterOnTimescale(fromY, toY, currentEra);
		}else if(typeof(console.log) == 'function'){
			console.log(fromY, toY, currentEra);
		}
	}

	function deselectElement(evt){
		if( selectedElement != null ){
			notify();
			selectedElement.onmousemove = null;
			selectedElement.onmouseup = null;
			selectedElement = null;
		}
	}

	function isNumeric(s){
		return typeof(s) == 'string' && s > '' && !isNaN(s);
	}

	var i, elEra, s
		, aMarkers = document.getElementsByClassName('draggable')
		, aAreas = document.getElementsByClassName('clickable')
		, aTexts = document.getElementsByTagName('text')
		, aParams = (window.location.search.substring(1)).split(',')
		, sLang = (aParams[0] || 'en').substring(0, 2).toLowerCase()
		, oTimescale = document.getElementById('timescale')
		, oTimeControl = document.getElementById('timecontrol')
		, oBoundaries = oTimescale.getBBox()
		, selectedElement = null
		, currentX = 0
		, currentMatrix = null
		, currentEra = null
		, leftX = 0
		, rightX = -100;

	Timescale.w = oBoundaries.width;

	//initial position of markers
	if( isNumeric(aParams[1]) ){
		leftX = Timescale.year2x(aParams[1]);
	}
	if( isNumeric(aParams[2]) ){
		rightX = Timescale.year2x(aParams[2]) - Timescale.w;
	}
	setMarkers();

	//language
	for(i=0; i<aTexts.length; i++){
		s = aTexts[i].getAttribute('lang');
		if( s ){
			aTexts[i].style.display = (s == sLang) ? 'block' : 'none';
		}
	}

	//bind events
	oTimeControl.onmousemove = moveElement;
	oTimeControl.ontouchmove = moveElement;

	window.onmouseup = deselectElement;
	window.ontouchend = deselectElement;

	for(i=0; i<aMarkers.length; i++){
		aMarkers[i].onmousedown = selectElement;
		aMarkers[i].ontouchstart = selectElement;
		aMarkers[i].style.cursor = 'move';
	}

	for(i=0; i<aAreas.length; i++){
		aAreas[i].onclick = selectPeriod;
		aAreas[i].style.cursor = 'pointer';
	}
})(Timescale, oEras);