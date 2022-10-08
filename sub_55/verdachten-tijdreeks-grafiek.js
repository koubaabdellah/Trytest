(function () {
if ( selectedMunis ) {
	var regions = {
		mun1: selectedMunis.mun1,
		mun2: selectedMunis.mun2,
		province: selectedMunis.province,
		country: selectedMunis.country
	};
	var cbs = {
		renderer: {
			footNote: null,
			source: null,
			yAxisTitle: null,
			xAxisBg: null,
			logoWidth: 20,
			logoHeight: 30,
			defaultLogoWidth: 20,
			defaultLogoHeight: 30,
			itemMargin: 12,
			cornerRadius: 6,
			printFontFamily: '"RO Sans", "Akko Pro Light", "Soho W01 Regular Light"',
			printFontSize: '22.5px'
		}
	};
	var chart;
	jQuery(function () {
		jQuery.when().then(function () {
			Highcharts.cbsFormatNumber = function (e, t, i, o) {
				i = void 0 == i ? Highcharts.defaultOptions.lang.thousandsSep : i, o = void 0 == o ? Highcharts.defaultOptions
					.lang.decimalPoint : o, "number" == typeof e ? e = e.toString() : void 0 != e && null != e || (e = "");
				var n = t || 0 == t ? t.toString() : e;
				e = e ? e.replace(/[\s,.]/g, "") : "";
				var a = n.split(".");
				1 == a.length && (a = n.split(","));
				var r = a[0] || "",
					l = r.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + i),
					s = r && r.length > 0 ? e.substring(r.length) : null,
					d = l;
				return s && (d += o + s), d
			};
		}).then(function () {
			cl();
		});
		jQuery(window).resize(function () {
			if (chart) {
				chart.reflow();
				chart.legend.update();
			}
		});
	});

	function cl() {
		Highcharts.setOptions({
			lang: {
				"downloadJPEG": "Download JPEG afbeelding",
				"downloadPDF": "Download PDF document",
				"downloadPNG": "Download PNG afbeelding",
				"downloadSVG": "Download SVG",
				"downloadCSV": "Download CSV",
				"drillUpText": "Terug naar {series.name}",
				"loading": "Laden...",
				"noData": "Geen data om weer te geven",
				"printChart": "Afdrukken",
				"resetZoom": "Herstel zoom",
				"resetZoomTitle": "Herstel zoom level 1:1",
				"legend": {
					"less": "Minder dan",
					"more": "of meer",
					"to": "tot",
					"noData": "Geen data"
				},
				"tooltip": {
					"nullDataMessage": "Data is onbekend of geheim"
				},
				"decimalPoint": ",",
				"thousandsSep": " "
			}
		});
		Highcharts.setOptions({
			yAxis: {
				labels: {
					formatter: cbs.yAxisLabelFormatter
				}
			},
			exporting: {
				chartOptions: {
					isExporting: true
				},
				buttons: {
					contextButton: {
						menuItems: [{
							textKey: "printChart",
							onclick: function () {
								this.print();
							}
						}, {
							separator: true
						}, {
							textKey: "downloadPNG",
							onclick: function () {
								this.exportChartLocal();
								this.redraw();
							}
						}, {
							textKey: "downloadJPEG",
							onclick: function () {
								this.exportChartLocal({
									type: "image/jpeg"
								});
								this.redraw();
							}
						}, {
							textKey: "downloadSVG",
							onclick: function () {
								this.exportChartLocal({
									type: "image/svg+xml"
								});
								this.redraw();
							}
						}, {
							textKey: "downloadCSV",
							onclick: function () {
								this.downloadCSV();
							}
						}]
					}
				}
			}
		});
		chart = new Highcharts.Chart("highcharts-ljr-verdachten-tr-grafiek", {
			"chart": {
				"animation": false,
				"events": {
					"render": function () {
						cbs.renderer.renderAdditionalElements(this);
					}
				},
				"type": "line",
				"polar": false,
				"marginBottom": 180,
				"style": {
					"fontFamily": "\"RO Sans\", \"Akko W01 Regular\", \"Soho W01 Regular Light\", sans-serif",
					"fontSize": "12px",
					"color": "#000"
				}
			},
			"colorSelection": "Warm",
			"colors": ["#e94c0a","#ffcc00","#af0e80","#f39200","#53a31d","#afcb05","#0058b8","#00a1cd","#b23d02","#e1b600","#82045e","#ce7c00","#488225","#899d0c","#163a72","#0581a2"],
			"title": {
				"align": "left",
				"margin": 35,
				"useHTML": true,
				"style": {
					"fontFamily": "\"RO Sans\", \"Soho W01 Medium\", \"Akko W01 Regular\", sans-serif",
					"fontSize": "17px",
					"color": "#42145f",
					"fontWeight": "bold"
				},
				"text": "Geregistreerde verdachten"
			},
			"subtitle": {
				"align": "left"
			},
			"plotOptions": {
				"series": {
					"animation": false,
					"pointPlacement": null,
					"events": {},
					"marker": {
						"enabled": false
					},
					"lineWidth": 1.5,
					"dataLabels": {}
				}
			},
			"sources": {
				"prefix": "Bron: CBS,",
				"text": ""
			},
			"legend": {
				"enabled": true,
				"align": "left",
				"verticalAlign": "bottom",
				"y": -40,
				"padding": 0,
				"itemStyle": {
					"fontWeight": "normal",
					"color": "#000000"
				},
				"symbolPadding": 10,
				"itemDistance": 25,
				"squareSymbol": false,
				"symbolRadius": 0,
				"symbolHeight": 10,
				"symbolWidth": 25,
				"itemMarginBottom": 6,
				"noDataEnabled": false
			},
			"credits": {
				"enabled": false
			},
			"footNote": {
				"text": "* Voorlopige cijfers"
			},
			"series": ljrVerdachtenTRGrafiekGetData(-5),
			"accessibility": {
				"enabled": true
			},
			"xAxis": [{
				"drawHorizontalBorders": false,
				"lineColor": "#666666",
				"lineWidth": 1,
				"tickColor": "#C6C6C6",
				"tickLength": 9,
				"title": {
					"align": "high",
					"style": {
						"color": "#000000"
					},
					"useHTML": true,
					"x": -12
				},
				"labels": {
					"autoRotation": false,
					"style": {
						"color": "#000000"
					}
				},
				"startOnTick": false,
				"showFirstLabel": true,
				"endOnTick": false,
				"showLastLabel": true,
				"tickmarkPlacement": "between",
				"categories": [],
				"tickInterval": 1
			}],
			"yAxis": [{
				"lineColor": "#666666",
				"lineWidth": 0,
				"tickColor": "#C6C6C6",
				"tickLength": 9,
				"title": {
					"text": null,
					"useHTML": true
				},
				"gridLineColor": "#666666",
				"gridLineWidth": 0.25,
				"showFirstLabel": true,
				"showLastLabel": true,
				"tickmarkPlacement": "on",
				"gridLineInterpolation": null,
				"labels": {
					"enabled": true,
					"style": {
						"color": "#000000"
					}
				},
				"endOnTick": true,
				"startOnTick": true,
				"softMin": 0,
				"plotLines": [{
					"value": 0,
					"width": 2,
					"color": "#666666",
					"zIndex": 0
				}],
				"cbsTitle": "% van 12- tot 25-jarige inwoners"
			}],
			"tooltip": {
				"enabled": true,
				"shared": true,
				"followPointer": true,
				"backgroundColor": "white",
				"valueSuffix": "%",
				"pointFormatter": cbs.chartTooltipFormatter
			},
			"settings": {
				"hasGroupedCategories": true
			},
			"lang": {
				"downloadJPEG": "Download JPEG afbeelding",
				"downloadPDF": "Download PDF document",
				"downloadPNG": "Download PNG afbeelding",
				"downloadSVG": "Download SVG",
				"drillUpText": "Terug naar {series.name}",
				"loading": "Laden...",
				"noData": "Geen data om weer te geven",
				"printChart": "Afdrukken",
				"resetZoom": "Herstel zoom",
				"resetZoomTitle": "Herstel zoom level 1:1",
				"legend": {
					"less": "Minder dan",
					"more": "of meer",
					"to": "tot",
					"noData": "Geen data"
				},
				"tooltip": {
					"nullDataMessage": "Data is onbekend of geheim"
				},
				"decimalPoint": ",",
				"thousandsSep": " "
			},
			"cultureSelection": "Dutch",
			"selectedCultureId": "nl"
		}, function (chart) {
			Highcharts.setOptions({
				lang: {
					decimalPoint: chart.options.lang.decimalPoint,
					thousandsSep: chart.options.lang.thousandsSep
				},
				tooltip: {
					// pointFormatter: cbs.chartTooltipFormatter
				}
			});
			chart.update({
				plotOptions: {
					series: {
						events: {
							click: cbs.plotOptionsPointEventsClick
						},
						dataLabels: {
							formatter: cbs.dataLabelFormatter
						}
					}
				}
			});
		});

		function ljrVerdachtenTRGrafiekGetData(slice) {
			var oDataURL = addRegionFilter(ljrODataURLs.verdachtenTR,regions,"RegioS",6);
			//console.log(oDataURL);
			var call = ajax(oDataURL).then(function(result) {
				var res = result.value,
					xCats = [], xCatsSet = false,
					verdachtenTR = [];
				for ( var reg in regions ) {
					var regio = regions[reg];
					if (regio) {
						verdachtenTR[regions[reg]] = [];
						for (r in res) {
							if ( res[r].RegioS.trim() == regio ) {
								if (xCatsSet === false) {
									xCats.push(res[r].Perioden);
								}
								var	periode = formatYear(res[r].Perioden),
									verdachten = (res[r].GeregistreerdeVerdachten_8 == null) ? null : Math.round(res[r].GeregistreerdeVerdachten_8 * 100) / 10000;
								verdachtenTR[regio].push(formatData(periode, verdachten));
							}
						}
						xCatsSet = true;
						chart.addSeries({name: ljrRegionTypes[ljrRegions[regio].type] + " " + getName(regio), isSerie: true, data: verdachtenTR[regio].slice(slice)});
					}
				}
				console.log(verdachtenTR);
				xCats[xCats.length-1] += "*";
				chart.update({
					xAxis: {
						categories: yearXCats(xCats.slice(slice))
					}
				});
			});
		}

	}
	cbs['yAxisLabelFormatter'] = function t() {
		var e, t = this.axis,
			i = this.value,
			n = t.categories,
			a = this.dateTimeLabelFormat,
			r = (Highcharts.getOptions().lang, t.options.labels.format);
		return r ? e = o(r, this) : n ? e = i : this.chart.options.barType && this.chart.options.barType.negative ? e = i <
			0 ? Highcharts.numberFormat(i, -1).substring(1) : Highcharts.numberFormat(i, -1) : a && (e = Highcharts.dateFormat(
				a, i)), void 0 === e && (e = Math.abs(i) >= 1e3 ? Highcharts.numberFormat(i, -1) : Highcharts.numberFormat(i, -1,
				void 0, "")), e
	};

	function o(e, t) {
		for (var i, o, n, a, r, l, s, d = "{", h = !1, c = []; e && (s = e.indexOf(d), s !== -1);) {
			if (i = e.slice(0, s), h) {
				for (o = i.split(":"), n = o.shift().split("."), r = n.length, l = t, a = 0; a < r; a++) l = l[n[a]];
				if (l < 0 && t.chart.options.barType && t.chart.options.barType.negative && (l *= -1), o.length) {
					var p, u = o.join(":"),
						g = /f$/,
						m = /\.([0-9])/,
						f = Highcharts.getOptions().lang;
					g.test(u) ? (p = u.match(m), p = p ? p[1] : -1, null !== l && (l = Highcharts.numberFormat(l, p, f.decimalPoint,
						f.thousandsSep))) : l = Highcharts.dateFormat(format, l)
				} else l = Highcharts.numberFormat(l, -1);
				c.push(l)
			} else c.push(i);
			e = e.slice(s + 1), h = !h, d = h ? "}" : "{"
		}
		return c.push(e), c.join("")
	};
	cbs['dataLabelFormatter'] = function i() {
		var e = "";
		if (void 0 !== this.point.value && null !== this.point.value && this.point.plotX && this.point.plotY ? e = this.point
			.valueString : this.point.yString && (e = this.point.yString), "pie" === this.series.chart.options.chart.type) {
			var t = (100 * this.point.y / this.series.total).toFixed(1);
			e = Highcharts.cbsFormatNumber(t) + " %"
		} else e = "." === e ? "" : e && this.series.chart.options.barType && this.series.chart.options.barType.negative &&
			0 == e.indexOf("-") ? e.substring(1) : Highcharts.cbsFormatNumber(e);
		return e
	};
	cbs.renderer['renderAdditionalElements'] = function t(e) {
		if (e) {
			cbs.renderer.clearCanvas();
			var t = e.options.settings.forPrint,
				i = t ? 1.4 : 1;
			cbs.renderer.logoWidth = cbs.renderer.defaultLogoWidth * i, cbs.renderer.logoHeight = cbs.renderer.defaultLogoHeight *
				i;
			var o = e.options.chart.type,
				n = e.options.plotOptions.series.stacking;
			if ("map" === o || "pie" == o || e.options.chart.polar) cbs.renderer.renderDefaultLayout(e);
			else {
				if (e.options.yAxis.length > 0 && e.options.yAxis[0].cbsTitle) {
					var a = 11,
						r = e.plotTop - cbs.renderer.itemMargin - 6,
						l = e.renderer.text(e.options.yAxis[0].cbsTitle, a, r, !0);
					t && (l = e.renderer.text(e.options.yAxis[0].cbsTitle, a, r - 15, !0).css({
						fontSize: b,
						fontFamily: v
					})), "bar" == o && (a = "percent" == n ? e.chartWidth - 44 : e.chartWidth - 26, r = e.plotTop + e.plotHeight +
						40, l = e.renderer.text(e.options.yAxis[0].cbsTitle, a, r, !0), t && (l = e.renderer.text(e.options.yAxis[0].cbsTitle,
							a, r + 20, !0).css({
							fontSize: b,
							fontFamily: v
						})), l.attr({
							align: "right"
						})), cbs.renderer.yAxisTitle = l.add()
				}
				"bar" != o ? cbs.renderer.renderHorizontalXAxisLayout(e) : cbs.renderer.renderVerticalXAxisLayout(e)
			}
			cbs.renderer.calculateMarginBottom(e)
		}
	};
	cbs['plotOptionsPointEventsClick'] = function plotOptionsPointEventsClick() {
		var e = this.chart.container.firstChild;
		return void 0 !== cbs.cloneToolTip && void 0 !== e && (jQuery.contains(e, cbs.cloneToolTip) && e.removeChild(cbs.cloneToolTip),
				cbs.cloneToolTip.textContent === this.chart.tooltip.label.element.textContent) ? void(cbs.cloneToolTip = void 0) :
			(cbs.cloneToolTip = this.chart.tooltip.label.element.cloneNode(!0), void e.appendChild(cbs.cloneToolTip))
	};
	cbs['chartTooltipFormatter'] = function chartTooltipFormatter() {
		var e = '<span style="color:' + this.color + '">■</span> ' + this.series.name + ": <b>",
			t = Highcharts.cbsFormatNumber(this.yString);
		return this.series.tooltipOptions.valuePrefix && (e += this.series.tooltipOptions.valuePrefix), this.negative &&
			this.series.chart.options.barType && this.series.chart.options.barType.negative && (t = t.substring(1)), e += t,
			this.series.tooltipOptions.valueSuffix && (e += this.series.tooltipOptions.valueSuffix), e += "</b><br/>"
	};
	cbs.renderer['renderHorizontalXAxisLayout'] = function o(e) {
		var t = cbs.renderer.cornerRadius,
			i = cbs.renderer.itemMargin,
			o = cbs.renderer.logoHeight,
			n = e.plotBox.x || 0,
			a = e.plotBox.y + e.plotBox.height,
			r = e.options.settings.hasGroupedCategories,
			l = e.options.settings.forPrint,
			s = l ? 55 : 32,
			d = r ? s : e.xAxis[0].labelGroup.getBBox().height + (e.options.xAxis[0].tickLength || 0),
			h = Array.isArray(e.xAxis) && e.xAxis[0].axisTitle ? e.xAxis[0].axisTitle.getBBox().height : 0,
			c = d + h + i + o + i;
		c += i;
		var p = e.yAxis[0].width - 2 * t;
		cbs.renderer.xAxisBg = e.renderer.path(["M", n, a, "v", c - t, "a", t, t, 0, 0, 0, t, t, "h", p, "a", t, t, 0, 0,
			0, t, -t, "v", -c + t, "z"
		]).attr({
			"stroke-width": 0,
			fill: "#efefef",
			zIndex: -1
		}).add(), cbs.renderer.renderLogo(e, n + i, a + c - i - o);
		var u = a + c + 2 * i,
			g = e.legend.group ? e.legend.group.getBBox().height : 0,
			m = 10,
			f = cbs.renderer.positionLegend(e, n, u) ? u + g - 2 + i + m : u,
			b = e.options.sources && e.options.sources.text;
		b && cbs.renderer.renderSource(e, n, f);
		var v = b ? f + i + m : f;
		cbs.renderer.renderFootNote(e, n, v)
	};
	cbs.renderer['renderVerticalXAxisLayout'] = function n(e) {
		var t = cbs.renderer.cornerRadius,
			i = cbs.renderer.itemMargin,
			o = cbs.renderer.logoHeight,
			n = e.plotBox.x || 0,
			a = e.plotBox.y || 0,
			r = e.plotBox.height,
			l = n - i;
		cbs.renderer.xAxisBg = e.renderer.path(["M", n, a, "h", -(l - t), "a", t, t, 0, 0, 0, -t, t, "v", r - 2 * t, "a",
			t, t, 0, 0, 0, t, t, "h", l - t, "z"
		]).attr({
			"stroke-width": 0,
			fill: "#efefef",
			zIndex: -1
		}).add();
		var s = n - l + i;
		cbs.renderer.renderLogo(e, s, a + r - i - o), s -= i;
		var d = cbs.renderer.yAxisTitle ? cbs.renderer.yAxisTitle.getBBox().height + i : 0,
			h = e.legend.group ? e.legend.group.getBBox().height : 0,
			c = e.yAxis[0].labelGroup.getBBox().height + (e.options.yAxis[0].tickLength || 0) + i,
			p = a + r + c + i + d,
			u = cbs.renderer.positionLegend(e, s, p) ? p + h + 2 * i : p,
			g = e.options.sources && e.options.sources.text;
		g && cbs.renderer.renderSource(e, s, u);
		var m = g ? u + 2 * i : u;
		cbs.renderer.renderFootNote(e, s, m)
	};
	cbs.renderer['renderDefaultLayout'] = function i(e) {
		cbs.renderer.clearCanvas();
		var t = cbs.renderer.itemMargin,
			i = t,
			o = e.chartHeight,
			n = e.options.footNote && e.options.footNote.text,
			a = e.options.settings.forPrint;
		if (n) {
			o -= t, cbs.renderer.renderFootNote(e, i, o);
			var r = cbs.renderer.footNote.getBBox().height,
				l = t - r;
			l && (cbs.renderer.footNote.attr({
				y: o + l
			}), a && cbs.renderer.footNote.attr({
				y: o + l + 23
			})), o -= r
		}
		var s = e.options.sources && e.options.sources.text;
		if (s) {
			o -= t, cbs.renderer.renderSource(e, i, o);
			var d = cbs.renderer.source.getBBox().height;
			o -= d
		}
		if (o -= cbs.renderer.logoHeight + cbs.renderer.itemMargin, cbs.renderer.renderLogo(e, i, o), e.options.chart.polar ||
			"pie" == e.options.chart.type || "map" == e.options.chart.type) {
			var h = e.legend.group ? e.legend.group.getBBox().height : 0;
			cbs.renderer.positionLegend(e, i, o - cbs.renderer.itemMargin - h)
		} else e.options.legend.y = o - e.chartHeight
	};
	cbs.renderer['clearCanvas'] = function e() {
		cbs.renderer.logo && (cbs.renderer.logo.destroy(), cbs.renderer.logo = null), cbs.renderer.footNote && (cbs.renderer
				.footNote.destroy(), cbs.renderer.footNote = null), cbs.renderer.source && (cbs.renderer.source.destroy(), cbs.renderer
				.source = null), cbs.renderer.yAxisTitle && (cbs.renderer.yAxisTitle.destroy(), cbs.renderer.yAxisTitle = null),
			cbs.renderer.xAxisBg && (cbs.renderer.xAxisBg.destroy(), cbs.renderer.xAxisBg = null)
	};
	cbs.renderer['renderLogo'] = function r(e, t, i) {
		var o = 156,
			n = cbs.renderer.logoHeight / o,
			a = 1;
		cbs.renderer.logo = e.renderer.g("logo").attr({
			zIndex: 1,
			transform: "translate(" + (t - a) + "," + i + ") scale(" + n + ")"
		});
		var r = {
			fill: "#929292",
			"stroke-width": 3
		};
		e.renderer.path(["M", 41.3, 34.1, "V", 42, "H", 23.8, "h", -5.5, "v", 5.5, "v", 7.9, "v", 5.5, "h", 5.5, "h", 17.5,
			"v", 7.9, "H", 10.4, "V", 34.1, "H", 41.3, "M", 46.8, 28.6, "H", 9.9, "c", -2.8, 0, -5, 2.2, -5, 5, "v", 40.6,
			"h", 41.9, "V", 55.3, "h", -23, "v", -7.9, "h", 23, "V", 28.6, "L", 46.9, 28.6, "z"
		]).attr(r).add(cbs.renderer.logo), e.renderer.path(["M", 67.3, 11.4, "v", 17.2, "v", 5.5, "h", 5.5, "h", 21.3,
			"v", 34.6, "H", 59.4, "V", 11.4, "H", 67.3, "M", 67.2, 60.8, "h", 5.5, "h", 7.9, "h", 5.5, "v", -5.5, "v", -7.9,
			"v", -5.5, "h", -5.5, "h", -7.9, "h", -5.5, "v", 5.5, "v", 7.9, "V", 60.8, "M", 67.8, 5.9, "H", 53.9, "v", 68.3,
			"h", 45.7, "V", 33.6, "c", 0, -2.8, -2.2, -5, -5, -5, "H", 72.8, "V", 11.2, "C", 72.8, 8.4, 70.5, 5.9, 67.8,
			5.9, "L", 67.8, 5.9, "z", "M", 72.7, 55.3, "v", -7.9, "h", 7.9, "v", 7.9, "H", 72.7, "L", 72.7, 55.3, "z"
		]).attr(r).add(cbs.renderer.logo), e.renderer.path(["M", 94, 86.8, "v", 8, "H", 23.8, "h", -5.5, "v", 5.5, "v", 7,
			"v", 5.5, "h", 5.5, "H", 94, "v", 33.9, "H", 10.4, "v", -7.9, "h", 70.3, "h", 5.5, "v", -5.5, "v", -7.1, "v", -
			5.5, "h", -5.5, "H", 10.4, "V", 86.8, "H", 94, "M", 99.5, 81.3, "H", 4.9, "v", 44.9, "h", 75.8, "v", 7.1, "H",
			4.9, "v", 13.9, "c", 0, 2.8, 2.2, 5, 5, 5, "h", 84.6, "c", 2.8, 0, 5, -2.2, 5, -5, "v", -39.9, "H", 23.8, "v", -
			7, "h", 75.7, "V", 81.3, "L", 99.5, 81.3, "z"
		]).attr(r).add(cbs.renderer.logo), cbs.renderer.logo.add()
	};
	cbs.renderer['renderFootNote'] = function s(e, t, i) {
		var o = e.options.footNote && e.options.footNote.text,
			n = e.options.settings.forPrint;
		if (o) {
			var a = e.options.footNote.text,
				r = "",
				l = /<sup>\d\)<\/sup>/g,
				s = a.split(/(?:\r\n|\r|\n)/g) || [];
			e.options.isExporting ? r = s.join("<br>") : s.forEach(function (e) {
				var t = e.match(l) || [];
				if (t) {
					var i = e.split(l) || [];
					t.forEach(function (t, o) {
						e = "<span class='footnote-ref'>" + t + "</span><span>" + i.pop() + "</span>"
					})
				}
				r += "<div class='footnote-line'>" + e + "</div>"
			}), n ? cbs.renderer.footNote = e.renderer.text(r, t, i + 40, !0).css({
				width: e.chartWidth - t - cbs.renderer.itemMargin,
				fontSize: b,
				fontFamily: v
			}).add() : cbs.renderer.footNote = e.renderer.text(r, t, i, !0).css({
				width: e.chartWidth - t - cbs.renderer.itemMargin
			}).add()
		}
		return o
	};
	cbs.renderer['renderSource'] = function l(e, t, i) {
		var o = e.options.settings.forPrint,
			n = e.options.sources.prefix + " " + e.options.sources.text;
		o ? cbs.renderer.source = e.renderer.text(n, t, i + 20).css({
			fontSize: b,
			fontFamily: v
		}).add() : cbs.renderer.source = e.renderer.text(n, t, i).add()
	};
	cbs.renderer['positionLegend'] = function d(e, t, i) {
		var o = e.legend && e.legend.group;
		return o && e.legend.group.translate(t, i), o
	};
	cbs.renderer['calculateMarginBottom'] = function h(e) {
		if (e) {
			var t = cbs.renderer.itemMargin,
				i = t,
				o = e.options.chart.type,
				n = e.options.chart.geoType,
				a = e.options.settings.forPrint;
			cbs.renderer.footNote && (i += Math.ceil(cbs.renderer.footNote.getBBox().height) + t), cbs.renderer.source && (i +=
				Math.ceil(cbs.renderer.source.getBBox().height) + t);
			var r = e.legend && e.legend.group;
			if (r && (i += Math.ceil(e.legend.group.getBBox().height) + t, "map" === o && ("district" === n || "neighborhood" ===
					n ? i += "mapbubble" === e.options.chart.mapType ? 10 : 18 : i -= 82), a && (i += 2 * t)), "map" !== o)
				if ("bar" === o) {
					if (i += e.yAxis[0].labelGroup.getBBox().height + (e.options.yAxis[0].tickLength || 0) + t, cbs.renderer.yAxisTitle) {
						var l = cbs.renderer.yAxisTitle ? Math.ceil(cbs.renderer.yAxisTitle.getBBox().height) + t : 0;
						i += l
					}
				} else cbs.renderer.xAxisBg && (i += cbs.renderer.xAxisBg.getBBox().height + t);
			("map" === o || e.options.chart.polar) && (i += cbs.renderer.logoHeight + t, a && (i += 3 * t)), i = Math.ceil(i);
			var s = i - (e.options.chart.marginBottom || 0);
			(s < -1 || s > 1) && e.update({
				chart: {
					marginBottom: i
				}
			})
		}
	};
}
})();