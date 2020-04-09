(function() {

	var map; // 创建Map实例
	var myGeo; //创建地址解析器实列

	window.getPoint = function(address) {
		//将地址解析结果显示在地图上,并调整地图视野
		var address = "闻喜路1000弄1号504";
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(address, function(point) {
			if(point) {
				map.centerAndZoom(point, 17);
				map.addOverlay(new BMap.Marker(point));
				$("#txt_searchaddress").val(address);

			} else {
				//alert("您选择地址没有解析到结果!");
			}
		}, "上海市");
	}

	window.MapInit = function() {
		$("#container").css("height", (window.innerHeight * 0.56) + "px");

		map = new BMap.Map("container"); // 创建Map实例
		map.centerAndZoom(new BMap.Point(121.445107, 31.195045), 15); // 初始化地图,设置中心点坐标和地图级别               

		map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
		map.disableDoubleClickZoom();
		map.enableDragging();
		myGeo = new BMap.Geocoder();

		//prompt(); //打开窗体or关闭窗体

		MapClick();
	}
	//地图点击事件     
	function MapClick(callback) { //地图点击事件
		map.addEventListener("click", function(e) {

			if(!e.overlay) {
				var pt = e.point;
				if(pt) {
					map.clearOverlays();
					map.addOverlay(new BMap.Marker(pt));
					map.panTo(pt);
					map.setCenter(pt);
				}
				myGeo.getLocation(pt, function(rs) {
					var addComp = rs.addressComponents;
					$("#txt_searchaddress").val(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
					ImgUrl(pt.lng, pt.lat);
				});
			}

		});
	}

	//坐标转化
	function Exchange(x, y) {

		var ggPoint = new BMap.Point(x, y);

		translateCallback = function(data) {
			if(data.status === 0) {
				myGeo.getLocation(data.points[0], function(rs) {
					map.addOverlay(new BMap.Marker(data.points[0]));
					map.panTo(data.points[0]);
					map.setCenter(data.points[0]);
					var addComp = rs.addressComponents;
					$("#txt_searchaddress").val(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
					ImgUrl(data.points[0].lng, data.points[0].lat);
				});
			}
		}
		setTimeout(function() {
			var convertor = new BMap.Convertor();
			var pointArr = [];
			pointArr.push(ggPoint);
			convertor.translate(pointArr, 1, 5, translateCallback)
		}, 1000);

	}

	//返回静态图片
	function ImgUrl(x, y) {
		$("#hd_mapx").val(x);
		$("#hd_mapy").val(y);

	}

	function MapImg(x, y) {
		var point = x + "," + y;
		var url = "http://api.map.baidu.com/staticimage/v2?ak=hMxwGeMj4ddWIaH0lSbGNSpIwaF9mQju&mcode=666666&center=" + point + "&width=300&height=200&zoom=17";
		return url;
	}

	//模态框、弹出框打开关闭操作、解析地址到地图并调整地图视野
	window.prompt = function(btnMapId, promptID, address, callback) {
		$("#" + btnMapId).on('click', function() {
			$('#' + promptID).modal('open'); //打开窗体

			if(address != "" && address != undefined) {
				// 将地址解析结果显示在地图上,并调整地图视野
				getPoint(address);
			}

		})

		$("#Close,.close").on('click', function() {
			$('#' + promptID).modal('close'); //关闭窗体

			if(callback != undefined) {
				var ImgUrl = MapImg($("#hd_mapx").val(), $("#hd_mapy").val());
				callback(ImgUrl);
				//需要提交地址、生成地图图片可在回调中实现以下代码
				//var bd09togcj02 = coordtransform.bd09togcj02(parseFloat($("#hd_mapx").val()), parseFloat($("#hd_mapy").val()));
				//var gcj02towgs84 = coordtransform.gcj02towgs84(parseFloat(bd09togcj02[0]), parseFloat(bd09togcj02[1]));
				//$("#hd_mapx").val(gcj02towgs84[0]);
				//$("#hd_mapy").val(gcj02towgs84[1]);
				//$("#hd_map_pic").val(ImgUrl);
			}
		})
	}

	//地图关闭按钮操作
	window.MapClose = function() {
		$("#Close,.close").on('click', function() {

		})
	}

})();