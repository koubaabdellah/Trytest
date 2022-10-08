Math.log10 = Math.log10 || function(x) {
	return Math.log(x) * Math.LOG10E;
};

var Timescale = {
	minY: -3800,
	maxY: 2000,
	minViewableY: -3652,/*empirical data*/
	maxViewableY: 1997,
	w: 1600,
	x: Math.log10(2100 - 3800),
	x2year: function(x){
		var r = Timescale.minL - (
			x/Timescale.w * (Timescale.maxL)
		);
		return Math.round(2100-Math.pow(10, r));
	},
	year2x: function(y){
		y = Math.max(Timescale.minY, Math.min(Timescale.maxY, y));
		return Math.round((Timescale.minL - Math.log10(2100 - y)) / (Timescale.maxL) * Timescale.w);
	}
};
Timescale.minL = Math.log10(2100 - Timescale.minY);
Timescale.maxL = Timescale.minL - Math.log10(2100 - Timescale.maxY);

var oEras = {
	prehistory:{
		from: -3800,
		to: -800,
		x1: 0,
		x2: 279
	},
	classicalera:{
		from: -800,
		to: 500,
		x1: 279,
		x2: 512
	},
	middleages:{
		from: 500,
		to: 1500,
		x1: 512,
		x2: 897
	},
	moderntimes:{
		from: 1500,
		to: 2000,
		x1: 897,
		x2: 1600
	},
	romanera:{
		from: -50,
		to: 500,
		x1: 396,
		x2: 512
	},
	ageofdiscovery:{
		from: 1400,
		to: 1800,
		x1: 836,
		x2: 1169
	},
	worldwars:{
		from: 1914,
		to: 1946,
		x1: 1356,//svg 1351
		x2: 1431
	},
	holoceen:{
		from: Timescale.minY,
		to: Timescale.maxY,
		x1: 0,
		x2: Timescale.w
	}
};
