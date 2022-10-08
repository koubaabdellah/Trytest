if(!docConfig){
		var docConfig = {};
}
if(!docConfig.switcher){
	docConfig.switcher = {
		"basepaths": {
			"iis": "iis",
			"java-windows": "java-windows",
			"java-linux": "java-linux",
			"11.0" : "web-adaptor/latest/",
			"10.9.1" : "web-adaptor/10.9.1/",
			"10.9" : "web-adaptor/10.9/",
			"10.8" : "web-adaptor/10.8/",
			"10.7" : "web-adaptor/10.7/"
		},

		"switchercases": {
			"11.0~": "11.0",
			"11.0~iis": "IIS",
			"11.0~java-windows": "Java (Windows)",
			"11.0~java-linux": "Java (Linux)",
			"10.9.1~": "10.9.1",
			"10.9.1~iis": "IIS",
			"10.9.1~java-windows": "Java (Windows)",
			"10.9.1~java-linux": "Java (Linux)",
			"10.9~": "10.9",
			"10.9~iis": "IIS",
			"10.9~java-windows": "Java (Windows)",
			"10.9~java-linux": "Java (Linux)",
			"10.8~": "10.8.x",
			"10.8~iis": "IIS",
			"10.8~java-windows": "Java (Windows)",
			"10.8~java-linux": "Java (Linux)",
			"10.7~": "10.7.x",
			"10.7~iis": "IIS",
			"10.7~java-windows": "Java (Windows)",
			"10.7~java-linux": "Java (Linux)"

		},

		"caseTbl": {
			"__order": {
				"11.0~iis": 1,
				"11.0~java-windows": 2,
				"11.0~java-linux": 3,
				"10.9.1~iis": 4,
				"10.9.1~java-windows": 5,
				"10.9.1~java-linux": 6,
				"10.9~iis": 7,
				"10.9~java-windows": 8,
				"10.9~java-linux": 9,
				"10.8~iis": 10,
				"10.8~java-windows": 11,
				"10.8~java-linux": 12,
				"10.7~iis": 13,
				"10.7~java-windows": 14,
				"10.7~java-linux": 15
			},
			
		},

		"switcherdisplay": true,
	};
}
;
