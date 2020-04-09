window.SH3H = (function($Wmap) {
	return $Wmap;
})(window.SH3H || {});
(function($Wmap) {

	$Wmap.WechatBMap = {
		dfd: $.Deferred(), //创建一个deferred对象
		domIds: {
			parent_domId: "map_model", //地图面板domID
			map_domId: "container", //地图容器domID
			search_domId: "r-result", //检索面板容器domID
			input_domId: "searchAddress", //地址输入框domID
			inputX_domId: "hd_mapx", //隐藏域经度坐标domID
			inputY_domId: "hd_mapy", //隐藏域纬度坐标domID
		},
		option: {
			ak: 'hMxwGeMj4ddWIaH0lSbGNSpIwaF9mQju',
			mapJS: "http://api.map.baidu.com/api?v=2.0&ak=" + this.ak + "&callback=SH3H.WechatBMap.MapInit", //
		},
		init: function(domIds, callBack) {
			var _this = $Wmap.WechatBMap;
			try {
				domIds = domIds || {};

				_this.domIds.map_domId = domIds.map_domId || _this.domIds.map_domId;
				_this.domIds.search_domId = domIds.search_domId || _this.domIds.search_domId;

				_this.loadScript(_this.option.mapJS, function(e) {

					_this.loadpanel(); //创建地图面板 
					_this.loadHtml(_this.domIds.map_domId, _this.domIds.parent_domId); //创建地图容器
					_this.loadHtml(_this.domIds.search_domId, _this.domIds.parent_domId); //创建地图检索容器
					_this.hideBMap(); //默认隐藏地图

					_this.dfd.done(function(map, option) {
						callBack(map, option);
					});

				});

			} catch(ex) {
				console.log('map.baidu ERROR::', ex);
			}

		},
		loadScript: function(src, callback) {
			var _this = $Wmap.WechatBMap;
			var script = document.createElement('script'),
				head = document.getElementsByTagName('head')[0];
			script.type = 'text/javascript';
			script.async = 'async';
			script.charset = 'UTF-8';
			script.src = src;
			head.appendChild(script);
			//document.body.appendChild(script);

			if(script.addEventListener) { //非IE
				script.addEventListener('load', function() {
					callback();
				}, false);
			} else if(script.attachEvent) { //IE
				script.attachEvent('onreadystatechange', function() {
					var target = window.event.srcElement;
					if(target.readyState === 'loaded') {
						callback();
					}
				});
			}
		},
		loadHtml: function(domId, parentId) {
			var container = document.createElement("div");
			container.setAttribute('id', domId)
			if(parentId) {
				document.getElementById(parentId).appendChild(container);

			} else {
				document.body.appendChild(container);
			}
		},
		loadpanel: function() {
			var _this = $Wmap.WechatBMap;

			var panel = document.createElement("div");
			panel.setAttribute('class', 'map-panel');
			document.body.appendChild(panel);

			var map_model = panel.appendChild(document.createElement("div"));
			map_model.setAttribute('id', _this.domIds.parent_domId)

			/********title**********/
			var title = map_model.appendChild(document.createElement("div"));
			title.setAttribute('class', "map_model-title");

			var title_span = title.appendChild(document.createElement("span"));
			title_span.textContent = "地图信息";

			var title_icon = title.appendChild(document.createElement("icon"));
			title_icon.setAttribute('class', "close-map");
			/********title**********/

			/********tips**********/
			var tips = map_model.appendChild(document.createElement("div"));
			tips.setAttribute('class', "map_model-tips");

			var tips_icon = tips.appendChild(document.createElement("icon"));
			tips_icon.setAttribute('class', "map_model-location");

			var tips_label = tips.appendChild(document.createElement("label"));
			tips_label.textContent = "地图定位";

			var tips_span = tips.appendChild(document.createElement("span"));
			tips_span.textContent = "仅供参考，不覆盖您输入的地址";
			/********tips**********/

			/********search**********/
			var search = map_model.appendChild(document.createElement("div"));
			search.setAttribute('class', "map_model-search");

			var search_input = search.appendChild(document.createElement("input"));
			search_input.setAttribute('id', _this.domIds.input_domId);
			search_input.type = "text";
			search_input.setAttribute('value', "");
			search_input.setAttribute('disabled', "disabled");
			/********search**********/

			var btns = panel.appendChild(document.createElement("div"));
			btns.setAttribute('class', "map_model-btns");

			var _button = btns.appendChild(document.createElement("button"));
			_button.setAttribute('class', "btn-secondary save-map");
			_button.type = "button";
			_button.textContent = "确认";

			/********hd_mapx、hd_mapy**********/
			var hd_mapx = panel.appendChild(document.createElement("input"));
			hd_mapx.type = "hidden";
			hd_mapx.setAttribute('value', "0");
			hd_mapx.setAttribute('id', _this.domIds.inputX_domId);

			var hd_mapy = panel.appendChild(document.createElement("input"));
			hd_mapy.type = "hidden";
			hd_mapy.setAttribute('value', "0");
			hd_mapy.setAttribute('id', _this.domIds.inputY_domId);
			/********search**********/

			_this.closeBMap();

		},
		MapInit: function() {
			var _this = $Wmap.WechatBMap;

			var _option = {
				x: 121.491, //地理经度lng
				y: 31.233, //地理纬度lat
				zoom: 17 //范围3-19级,若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级
			}
			var map = new BMap.Map(_this.domIds.map_domId); //创建地图实例
			var point = new BMap.Point(_option.x, _option.y); //设置默认中心点坐标
			map.centerAndZoom(point, _option.zoom); //地图初始化，同时设置地图默认展示级别
			map.enableScrollWheelZoom(); //启用滚轮放大缩小			map.disableDoubleClickZoom(); //禁用双击放大
			map.enableDragging(); //开启标注拖拽功能

			_this.dfd.resolve(map, _option);
			return _this.dfd.promise(); //返回 Promise 对象，调用者不能改变延迟对象
		},
		geocoderApi: function(y, x, callback) {
			var _this = $Wmap.WechatBMap;
			var p = _this.MapabcEncryptToBdmap(y, x);
			//坐标转地址
			$.ajax({
				url: "https://api.map.baidu.com/geocoder/v2/?output=json&pois=1&latest_admin=1&ak=" + _this.option.ak,
				type: "get",
				data: {
					location: p.lat + ',' + p.lng
				},
				async: true,
				dataType: "jsonp",
				success: function(res) {
					console.log('geocoder', res)
					if(callback) {
						callback(res);
					}
				}
			})
		},
		MapabcEncryptToBdmap: function(gg_lat, gg_lon) {
			var point = new Object();
			var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
			var x = new Number(gg_lon);
			var y = new Number(gg_lat);
			var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
			var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
			var bd_lon = z * Math.cos(theta) + 0.0065;
			var bd_lat = z * Math.sin(theta) + 0.006;
			point.lng = bd_lon;
			point.lat = bd_lat;
			return point;
		},
		geoconvApi: function(lat, lng, callback) {
			//坐标转换:微信返回WGS84坐标
			//from 1：GPS设备获取的角度坐标，WGS84坐标;
			//to 5：bd09ll(百度经纬度坐标);
			var _this = $Wmap.WechatBMap;
			//坐标转地址
			$.ajax({
				url: 'http://api.map.baidu.com/geoconv/v1/?from=1&to=5&ak=' + _this.option.ak,
				type: "get",
				data: {
					coords: lat + ',' + lng
				},
				async: true,
				dataType: 'jsonp',
				success: function(res) {
					console.log('geoconv', res)
					if(callback) {
						callback(res);
					}
				}
			});
		},
		convertor: function(x, y, callback) {
			var _this = $Wmap.WechatBMap;

			var ggPoint = new BMap.Point(x, y);

			//坐标转换完之后的回调函数
			translateCallback = function(res) {
				console.log('convertor', res)
				if(callback) {
					callback(res);
				}
			}

			setTimeout(function() {
				var convertor = new BMap.Convertor();
				var pointArr = [];
				pointArr.push(ggPoint);
				convertor.translate(pointArr, 1, 5, translateCallback)
			}, 1000);
		},
		ImgUrl: function(x, y) {
			var _this = $Wmap.WechatBMap;
			$("#" + _this.domIds.inputX_domId).val(x);
			$("#" + _this.domIds.inputY_domId).val(y);

		},
		MapImg: function(x, y, markers) {
			var _this = $Wmap.WechatBMap;
			markers = markers || [];
			
			var point = x + "," + y;//中心点

			
			//标注，可通过经纬度或地址/地名描述；多个标注之间用竖线分隔。例如:markers=116.288891,40.004261|116.487812,40.017524
			var _markers = '';
			$(markers).each(function(item,index) {
				_markers+=item.x+','+item.y+'|';
			});

			//&scale=2  高清模式
			var url = "http://api.map.baidu.com/staticimage/v2?ak=" + _this.option.ak 
			+ "&mcode=666666&center=" + point 
			+ "&width=300&height=200&zoom=17&markers=" + (_markers||point);

			return url;
		},
		closeBMap: function() {
			//点击地图关闭按钮或关闭图标 
			var _this = $Wmap.WechatBMap;
			$(".close-map").on('click', function() {
				_this.hideBMap();
			});
		},
		showBMap: function(callback) {
			//展示地图面板
			var _this = $Wmap.WechatBMap;
			$(".map-panel").show();
			document.getElementById(_this.domIds.search_domId).innerHTML=''; 
			document.getElementById(_this.domIds.search_domId).style.display = "none"; //隐藏地图检索容器
			
			if(callback) {
				callback()
			}
		},
		hideBMap: function(callback) {
			//隐藏地图面板
			$(".map-panel").hide();
			if(callback) {
				callback()
			}
		},
		saveAddress: function(callback) {
			//点击地确认按钮
			$(".save-map").on('click', function() {
				console.log('save-map')
				if(callback) {
					callback()
				}
			});
		}

	};

})(SH3H);