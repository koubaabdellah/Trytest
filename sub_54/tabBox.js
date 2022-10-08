	
	function tabBox(tabToShow, totalTabs){
		// start by hiding any displayed tab content and unselecting all tabs
		for (var i = 1; i <= totalTabs; i ++){
			var tmpTab = "tab" + i;
			var tmpContent = "tabContent" + i;
			document.getElementById(tmpTab).className = "";
			document.getElementById(tmpContent).style.display = "none";
		}
		//display the selected tab and contents
		tmpTab = "tab" + tabToShow;
		tmpContent = "tabContent" + tabToShow;
		document.getElementById(tmpTab).className = "selected";
		document.getElementById(tmpContent).style.display = "block";
	}
