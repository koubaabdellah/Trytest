(function () {
if ( selectedMunis ) {
	var regions = {
		mun1: selectedMunis.mun1,
		mun2: selectedMunis.mun2,
		province: selectedMunis.province,
		country: selectedMunis.country
	};
	var mapYear = 2018;	// mapYear should match the municipality composition (year) of the data.
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
	cbs["templateGeoUrl"] = "https://imagescbs.blob.core.windows.net/maps/cbs_gemeente_[year].p1.geo.json";
	cbs["defaultGeoUrl"] = "https://imagescbs.blob.core.windows.net/maps/cbs_gemeente_" + mapYear + ".p1.geo.json";
	var windowWidth = undefined;
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
			return cbs.downloadGeoJson(cbs.defaultGeoUrl);
		}).then(function (data) {
			if (data === undefined || data === null) return;
			if (typeof cbs.autoCompletedInit === "function" && typeof cbs.autoCompleteRegionSearch === "function") cbs.autoCompleteRegionSearch(
				cbs.autoCompletedInit(chart, cbs.selectedPeriod, cbs.selectedSerie));
		});
		jQuery(window).resize(function () {
			var currentWindowWidth = jQuery(window).width();
			if (chart && windowWidth !== currentWindowWidth) {
				windowWidth = currentWindowWidth;
				chart.reflow();
				chart.legend.update();
			}
		});
	});

	function cl(mapData) {
		Highcharts.setOptions({
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
						}, ]
					}
				}
			}
		});
		chart = new Highcharts.Map("highcharts-ljr-bijstandsgezinnen-kaart", {
			"accessibility": {},
			"chart": {
				"events": {
					"render": function () {
						cbs.renderer.renderAdditionalElements(this);
					}
				},
				"type": "map",
				"mapType": "map",
				"geoUrl": "https://imagescbs.blob.core.windows.net/maps/cbs_gemeente_" + mapYear + ".p1.geo.json",
				"geoServiceCbsUrl": null,
				"geoProperty": "statcode",
				"geoNameProperty": "statnaam",
				"animation": false,
				"style": {
					"fontFamily": "\"RO Sans\", \"Akko W01 Regular\", \"Soho W01 Regular Light\", sans-serif",
					"fontSize": "12px",
					"color": "#000"
				},
				"map": {},
				"description": "Kinderen in bijstandsgezinnen"
			},
			"colorAxis": {
				"dataClassColor": "category",
				"dataClasses": [{
					"to": 2,
					"color": "#ffc597",
					"name": "Minder dan 2%"
				}, {
					"from": 2,
					"to": 4,
					"color": "#f89e6b",
					"name": "2 tot 4%"
				}, {
					"from": 4,
					"to": 6,
					"color": "#e74d15",
					"name": "4 tot 6%"
				}, {
					"from": 6,
					"to": 8,
					"color": "#c01f26",
					"name": "6 tot 8%"
				}, {
					"from": 8,
					"color": "#82001e",
					"name": "8% of meer"
				}, {
					"id": "noDataLegendItemId",
					"text": "No data",
					"name": "Geen of onvoldoende data",
					"from": "-",
					"to": "-",
					"color": "#e9e9e9"
				}]
			},
			"legend": {
				"layout": "vertical",
				"align": "left",
				"verticalAlign": "bottom",
				"y": -40,
				"floating": true,
				"padding": 0,
				"valueDecimals": 0,
				"symbolRadius": 0,
				"symbolHeight": 10,
				"symbolWidth": 25,
				"symbolPadding": 10,
				"itemMarginBottom": 6,
				"squareSymbol": false,
				"itemStyle": {
					"fontWeight": "normal"
				},
				"noDataEnabled": true
			},
			"plotOptions": {
				"series": {
					"dataLabels": {
						"allowOverlap": true
					},
					"color": "#F2F2F2"
				},
				"map": {
					"allAreas": true,
					"point": {
						"events": {}
					},
					"borderWidth": 0.5,
					"states": {
						"select": {
							"enabled": false
						}
					}
				}
			},
			"tooltip": {
				"useHTML": false,
				"shared": false,
				"valueSuffix": "%",
				"shape": "callout",
				"followPointer": false,
				"pointFormatter": cbs.mapTooltipFormatter
			},
			"title": {
				"align": "left",
				"useHTML": true,
				"style": {
					"fontFamily": "\"RO Sans\", \"Soho W01 Medium\", \"Akko W01 Regular\", sans-serif",
					"fontSize": "17px",
					"color": "#42145f",
					"fontWeight": "bold"
				},
				"text": "Kinderen in bijstandsgezinnen"
			},
			"colorSelection": "Warm",
			"colors": ["#ffc597", "#f89e6b", "#e74d15", "#c01f26", "#82001e", "#A2A2A2"],
			"subtitle": {},
			"sources": {
				"prefix": "Bron: CBS,",
				"text": ""
			},
			"credits": false,
			"footNote": {
				"text": null
			},
			"settings": {
				"hasGroupedCategories": false,
			},
			"series": [{
				"name": "Gemeente",
				"isSerie": false,
				"nullColor": "#E5E5E5",
				"showInLegend": false,
				"borderColor": "#FFFFFF",
				"visible": true
			}],
			"cultureSelection": "Dutch",
			"selectedCultureId": "nl",
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
			"xAxis": {},
			"yAxis": {},
			"mapColorSelection": "Red"
		}, function (chart) {
			Highcharts.setOptions({
				lang: {
					decimalPoint: chart.options.lang.decimalPoint,
					thousandsSep: chart.options.lang.thousandsSep
				},
				tooltip: {
					// pointFormatter: cbs.mapTooltipFormatter
				}
			});
		});
		function ljrBijstandsgezinnenMapSetData(y) {
			var oDataURL = addMultipleRegionAndYearFilter(ljrODataURLs.bijstandsgezinnen,"RegioS",y);
			var bijstandsgezinnen = [];
			//console.log(oDataURL);
			var call = ajax(oDataURL).then(function(result) {
				var res = result.value;
				for ( var r in res ) {
					var statcode = res[r].RegioS,
						name = "",
						value = res[r].KinderenInBijstandsgezinnen_5,
						valueString = ( value == null ) ? "." : value+"";
					for ( var reg in ljrRegions ) {
						if ( reg == statcode ) {
							name = getName(reg);
						}
					}
					bijstandsgezinnen.push(formatMapData( statcode, name, value, valueString ));
				}
				chart.addSeries({
					"name": "Kinderen in bijstandsgezinnen",
					"isSerie": true,
					"borderColor": "#FFFFFF",
					"data": bijstandsgezinnen,
					"visible": true,
					"type": "map",
					"showInLegend": false,
					"keys": ["statcode", "value"],
					"joinBy": ["statcode", "statcode"]
				});
				if ( chart.get(regions.mun1).value !== null ) { chart.get(regions.mun1).select(); }
				chart.update({
					title: {
						text: chart.title.textStr + ", " + formatYear(y)
					}
				});
			});
		}

		function ljrBijstandsgezinnenMapGetLatestYear() {
			var call = ajax(ljrODataURLs.bijstandsgezinnen_perioden).then(function(result) {
				var latestYear = result.value.slice(-1)[0].Key;
				ljrBijstandsgezinnenMapSetData(latestYear);
			});
		}

		// ljrBijstandsgezinnenMapGetLatestYear();
		ljrBijstandsgezinnenMapSetData("2017JJ00");

		jQuery(window).resize(function () {
			if ( chart.get(regions.mun1).value !== null ) { chart.get(regions.mun1).select(); }
		});
	}

	cbs['noDataLegendItemId'] = 'noDataLegendItemId';
	cbs.renderer['renderAdditionalElements'] = function t(e) {
		if (e) {
			cbs.renderer.clearCanvas();
			var t = e.options.chart.type,
				i = e.options.plotOptions.series.stacking,
				o = e.options.settings.forPrint,
				n = "map" == e.options.chart.mapType,
				a = o && 0 == n ? 1.4 : 1;
			if (o && n && (a = .7), cbs.renderer.logoWidth = cbs.renderer.defaultLogoWidth * a, cbs.renderer.logoHeight = cbs
				.renderer.defaultLogoHeight * a, "map" === t || "pie" == t || e.options.chart.polar) cbs.renderer.renderDefaultLayout(
				e);
			else {
				if (e.options.yAxis.length > 0 && e.options.yAxis[0].cbsTitle) {
					var r = 11,
						l = e.plotTop - cbs.renderer.itemMargin - 6,
						s = e.renderer.text(e.options.yAxis[0].cbsTitle, r, l, !0);
					o && (s = e.renderer.text(e.options.yAxis[0].cbsTitle, r, l - 15, !0).css({
						fontSize: b,
						fontFamily: v
					})), "bar" == t && (r = "percent" == i ? e.chartWidth - 44 : e.chartWidth - 26, l = e.plotTop + e.plotHeight +
						40, s = e.renderer.text(e.options.yAxis[0].cbsTitle, r, l, !0), o && (s = e.renderer.text(e.options.yAxis[0].cbsTitle,
							r, l + 20, !0).css({
							fontSize: b,
							fontFamily: v
						})), s.attr({
							align: "right"
						})), cbs.renderer.yAxisTitle = s.add()
				}
				"bar" != t ? cbs.renderer.renderHorizontalXAxisLayout(e) : cbs.renderer.renderVerticalXAxisLayout(e)
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
			}), a && "map" != e.options.chart.type && cbs.renderer.footNote.attr({
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
			4.9, "v", 13.9, "c", 0, 2.8, 2.2, 5, 5, 5, "h", 84.6, "c", 2.8, 0, 5, -2.2, 5, -5, "v", -39.9, "H", 23.8, "v",
			-7, "h", 75.7, "V", 81.3, "L", 99.5, 81.3, "z"
		]).attr(r).add(cbs.renderer.logo), cbs.renderer.logo.add()
	};
	cbs.renderer['renderFootNote'] = function s(e, t, i) {
		var o = e.options.footNote && e.options.footNote.text,
			n = "map" == e.options.chart.mapType,
			a = e.options.settings.forPrint;
		if (o) {
			var r = e.options.footNote.text,
				l = "",
				s = /<sup>\d\)<\/sup>/g,
				d = r.split(/(?:\r\n|\r|\n)/g) || [];
			e.options.isExporting ? l = d.join("<br>") : d.forEach(function (e) {
				var t = e.match(s) || [];
				if (t) {
					var i = e.split(s) || [];
					t.forEach(function (t, o) {
						e = "<span class='footnote-ref'>" + t + "</span><span>" + i.pop() + "</span>"
					})
				}
				l += "<div class='footnote-line'>" + e + "</div>"
			}), a ? "map" == e.options.chart.type && n ? cbs.renderer.footNote = e.renderer.text(l, t, i, !0).css({
				fontSize: "7.5px",
				fontFamily: v
			}).add() : cbs.renderer.footNote = e.renderer.text(l, t, i + 40, !0).css({
				width: e.chartWidth - t - cbs.renderer.itemMargin,
				fontSize: b,
				fontFamily: v
			}).add() : cbs.renderer.footNote = e.renderer.text(l, t, i, !0).css({
				width: e.chartWidth - t - cbs.renderer.itemMargin
			}).add()
		}
		return o
	};
	cbs.renderer['renderSource'] = function l(e, t, i) {
		var o = e.options.settings.forPrint,
			n = "map" == e.options.chart.mapType,
			a = e.options.sources.prefix + " " + e.options.sources.text;
		o ? "map" == e.options.chart.type && n ? cbs.renderer.source = e.renderer.text(a, t, i).css({
			fontSize: "7.5px",
			fontFamily: v
		}).add() : cbs.renderer.source = e.renderer.text(a, t, i + 20).css({
			fontSize: b,
			fontFamily: v
		}).add() : cbs.renderer.source = e.renderer.text(a, t, i).add()
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
	cbs['pointDescriptionFormatter'] = function (e) {
		return e.value
	};
	cbs['plotOptionsMapPointEventsClick'] = function plotOptionsMapPointEventsClick() {
		var e = this.series.chart.container.firstChild;
		return void 0 !== cbs.cloneToolTip && void 0 !== e && (jQuery.contains(e, cbs.cloneToolTip) && e.removeChild(cbs.cloneToolTip),
			cbs.cloneToolTip.textContent === this.series.chart.tooltip.label.element.textContent) ? void(cbs.cloneToolTip =
			void 0) : (cbs.cloneToolTip = this.series.chart.tooltip.label.element.cloneNode(!0), void e.appendChild(cbs.cloneToolTip))
	};
	cbs['plotOptionsMapPointEventsSelect'] = function plotOptionsMapPointEventsSelect(e) {
		var t = e.target.series.points.filter(function (t) {
			if (t.statcode === e.target.statcode) return t
		});
		this.series.chart.tooltip.isHidden = !0, this.series.chart.tooltip.refresh(t[0]);
		var i = this.series.chart.container.firstChild;
		// return void 0 !== cbs.cloneToolTip && void 0 !== i && (jQuery.contains(i, cbs.cloneToolTip) && i.removeChild(cbs.cloneToolTip),
		// 	cbs.cloneToolTip.textContent === this.series.chart.tooltip.label.element.textContent) ? void(cbs.cloneToolTip =
		// 	void 0) : (cbs.cloneToolTip = this.series.chart.tooltip.label.element.cloneNode(!0), void i.appendChild(cbs.cloneToolTip))
	};
	cbs['legendLabelFormatter'] = function mapLegendLabelFormatter() {
		this.legendGroup.element.onclick = null;
		var e = this.chart.options.selectedCultureId,
			t = this.chart.options.legend.noDataEnabled,
			i = "",
			o = function (e, t) {
				var i = e,
					o = t.chart.tooltip.options.valuePrefix;
				return o && (i = "".concat(o, e)), i
			};
		if (void 0 !== e)
			if (this.id === cbs.noDataLegendItemId) i = t ? this.chart.options.lang.legend.noData : "";
			else {
				i = void 0 !== this.from ? o(Highcharts.cbsFormatNumber(this.displayValueFrom, this.from), this) + " " : this.chart
					.options.lang.legend.less + " ", void 0 !== this.from && void 0 !== this.to && (i += this.chart.options.lang.legend
						.to + " "), i += "" + (void 0 !== this.to ? o(Highcharts.cbsFormatNumber(this.displayValueTo, this.to), this) :
						this.chart.options.lang.legend.more);
				var n = this.chart.tooltip.options.valueSuffix;
				n && (i += " (" + n.trim() + ")")
			} return i
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
	cbs['downloadGeoJson'] = function l(e) {
		return jQuery.getJSON(e).done(function (e) {
			cl(e), chart && chart.update({
				accessibility: {
					pointDescriptionFormatter: cbs.pointDescriptionFormatter
				},
				chart: {
					map: e
				},
				plotOptions: {
					map: {
						point: {
							events: {
								click: cbs.plotOptionsMapPointEventsClick,
								select: cbs.plotOptionsMapPointEventsSelect
							}
						}
					},
					mapbubble: {
						point: {
							events: {
								click: cbs.plotOptionsMapPointEventsClick,
								select: cbs.plotOptionsMapPointEventsSelect
							}
						}
					},
					series: {
						dataLabels: {
							formatter: cbs.dataLabelFormatter
						}
					}
				},
				legend: {
					//labelFormatter: cbs.legendLabelFormatter
				}
			}), cbs.setSerieVisibility()
		})
	};
	cbs['setSerieVisibility'] = function r() {
		if (chart) {
			for (var e in chart.series) {
				var t = chart.series[e];
				t.options.isSerie ? t.options.name === cbs.selectedSerie && t.options.periode === cbs.selectedPeriod ? t.visible ||
					t.show() : t.hide() : t.show()
			}
			chart.reflow(), chart.legend.update()
		}
	};
	cbs['mapTooltipFormatter'] = function e() {
		var e = this.series.chart.options.lang.tooltip.nullDataMessage,
			t = this.series.tooltipOptions.valueSuffix || "",
			i = this.series.tooltipOptions.valuePrefix || "";
		if (!this.properties.statnaam)
			for (var o = ["wijknaam", "buurtnaam"], n = ["wijkcode", "buurtcode"], a = 0; a < o.length; a++) this.properties[
				o[a]] && (this.properties.statnaam = this.properties[o[a]], this.properties.statcode = this.properties[n[a]]);
		var r = this.properties ? this.properties.statnaam + ": " : "";
		if (this.series.tooltipOptions.shared) {
			var l = this,
				s = "<span><b>" + r + "</b><br/>";
			return chart.options.series.forEach(function (o) {
				if (o.isSerie) {
					var n = o.data.filter(function (e) {
						if (e.statcode === l.properties.statcode) return e
					})[0];
					if (n) {
						var a = "." === n.valueString ? e : i + Highcharts.cbsFormatNumber(n.valueString) + t;
						s += o.name + ": <b>" + a + "</b><br/>"
					}
				}
			}), s += "</span>"
		}
		var d = "." === this.valueString ? e : i + Highcharts.cbsFormatNumber(this.valueString) + t;
		return r + "<b>" + d + "</b>"
	};
	cbs['selectedPeriod'] = mapYear+"";
	cbs['selectedSerie'] = "Kinderen bij bijstandsgezinnen";
}
})();