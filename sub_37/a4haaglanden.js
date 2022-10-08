var gameInstance;

$(document).ready(function()
{
	if ($("#webglMap").length > 0 && $('.section.add, .section.edit').length == 0)
	{
		var xmlHttp = new XMLHttpRequest();

		xmlHttp.onreadystatechange = function ()
		{
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			{
				document.getElementById('webglMap').innerHTML = xmlHttp.responseText;

				gameInstance = UnityLoader.instantiate("gameContainer", "//apps.mett.nl/a4-haaglanden/build/A4-Haaglanden.json", {onProgress: UnityProgress});
			}
		};

		xmlHttp.open('GET', '//apps.mett.nl/a4-haaglanden/index.html', true); // true for asynchronous
		xmlHttp.send(null);
	}
});
