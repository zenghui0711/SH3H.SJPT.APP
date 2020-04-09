(function() {

	window.Navbar = function(iconType) {
		if(iconType == "" || iconType == undefined)
			iconType = "home";

		//判断当前处于哪个Navbar
		var $aNavli = $(".am-navbar-nav li");
		$aNavli.each(function() {
			var icon_type = $(this).find('span').attr('icon-type');
			if(iconType == icon_type) {
				$(this).addClass('on').siblings().removeClass('on');
				$(this).find('span').attr('icon-type', icon_type + '_on');

				var $aSpa = $(this).siblings().find('span');
				$aSpa.each(function() {
					icon_type = $(this).attr('icon-type');
					$(this).attr('icon-type', icon_type.replace('_on', ''));
				})
			}

		});

		//跳转页面
		$(".am-navbar-nav li").on('click', function() {
			var hre_name = $(this).attr('hre-name'); //跳转页面名称
			console.log('hre_name', hre_name)

			if(hre_name == "home") {
				//首页
				hre_name = "SJDW/SY.html?iconType=" + hre_name
			} else if(hre_name == "envelope") {
				//消息
				hre_name = "SY.html?iconType=" + hre_name
			} else if(hre_name == "search") {
				//搜索
				hre_name = "SY.html?iconType=" + hre_name
			} else if(hre_name == "me") {
				//个人信息
				hre_name = "UserInfo.html?iconType=" + hre_name
			}
			window.location = hre_name;
		});
	}

	window.headerLink = function(left_URL, titleURL, rightURL) {
		$('.leftlink').on('click', function() {
			if(left_URL != undefined && left_URL != "undefined" && left_URL != null && left_URL != "")
				window.location = left_URL;
			else
				window.history.back();
		});
		$('.titlelink').on('click', function() {
			if(titleURL != undefined && titleURL != "undefined" && titleURL != null && titleURL != "")
				window.location = titleURL;
		});
		$('.rightlink').on('click', function() {
			if(rightURL != undefined && rightURL != "undefined" && rightURL != null && rightURL != "")
				window.location = rightURL;
			else
				window.location = '../SetUp.html?iconType=home';
		});
	}

	window.GetRequest = function() {
		var url = location.search; //获取url中"?"符后的字串   
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
})();