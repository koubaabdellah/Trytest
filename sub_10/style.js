var barcodeinterval;

function popup(width, height, src, close)
{
	clearInterval(barcodeinterval);
	
	$(".popup-close").show();
	
	$(".popup-container").css("width", width + "px").css("height", height + "px");
	$(".popup-container").find("iframe").attr("src", src);
	
	if(close == 'false')
	{
		$(".popup-close").hide();
	}
	
	$(".popup").fadeIn("fast");
}

function startBarcodeInterval()
{
	barcodeinterval = setInterval(
		function()
		{
			$("input#search").focus();
		}, 200
	);
}

$(document).ready(
	function($)
	{
		$(document).keyup(
			function(e) 
			{
				if(e.key === "Escape") 
				{
					$(".popup-close").trigger("click");
				}
			}
		);
		
		$("div.pdf").find("div.close").on("click",
			function()
			{
				$("div.popup-bg").hide();
				$("div.pdf").hide().find("iframe").attr("src", "about:blank");
			}
		);
		
		if($("input#search").length > 0)
		{
			startBarcodeInterval();
		}
		
		$("input, select").first().focus();
		
		if($("table.select").find("tbody").find("tr.active").length > 0)
		{
			var top = $("table.select").find("tbody").find("tr.active").offset().top;
			top = top - 120;
			
			$("div.container").scrollTop(top);
		}
		
		$(".popup-close").on("click",
			function()
			{
				$(".popup").fadeOut("fast");
				$("popup-container").find("iframe").attr("src", "about:blank");
				
				startBarcodeInterval();
			}
		);
		
		var clicked = false, clickY, topY, dragged;
		
		$(document).on({
		    'mousemove': function(e) {
		        clicked && updateScrollPos(e);
		    },
		    'mousedown': function(e) {
		        clicked = true;
		        clickY = e.pageY;
				topY = $("div.container").scrollTop();
		    },
		    'mouseup': function(e) {
				clicked = false;
				
				setTimeout(
					function()
					{
						dragged = 0;
					}, 100
				);
		    }
			
		});
		
		var updateScrollPos = function(e) {
			var scrollTop = topY + (clickY - e.pageY);
			dragged = (clickY - e.pageY);
		    $("div.container").scrollTop(scrollTop);
		}
		
		$("table.select").find("tbody").find("td").on("click",
			function()
			{
				$(this).closest("tbody").find("tr.active").removeClass("active");
				$(this).parent("tr").addClass("active");
			}
		);
	}
);