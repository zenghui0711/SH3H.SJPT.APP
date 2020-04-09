Vue.component("Navbar", {
	template: '<div data-am-widget="navbar" class="am-navbar am-cf am-navbar-default " id="">' +
	'<ul class="am-navbar-nav am-cf am-avg-sm-4">' +
	
	//首页
	'<li :class="this.active" @click="Location(\'home\')">' +
	'<a href="javascript:;" class="">' +
	'<span class="my-nav-icon home" icon-type="home_on"></span>' +
	'</a>' +
	'</li>' +
	
	//消息
	'<li :class="this.active" @click="Location(\'envelope\')">' +
	'<a href="javascript:;" class="">' +
	'<span class="my-nav-icon envelope" icon-type="envelope_on"></span>' +
	'</a>' +
	'</li>' +
	
	//消息
	'<li :class="this.active" @click="Location(\'search\')">' +
	'<a href="javascript:;" class="">' +
	'<span class="my-nav-icon search" icon-type="search_on"></span>' +
	'</a>' +
	'</li>' +
	
	//消息
	'<li :class="this.active" @click="Location(\'me\')">' +
	'<a href="javascript:;" class="">' +
	'<span class="my-nav-icon me" icon-type="me_on"></span>' +
	'</a>' +
	'</li>' +
	
	'</ul>' +
	'</div>',
	props: ["active"],
	methods:{
		
		Location:function(item){
			
			this.active=item;
			if(item=="home"){
				window.location="http://127.0.0.1:8020/APP/Web/SJDW/SY.html?iconType="+item;
			}
			else if(item=="envelope"){
				window.location="http://127.0.0.1:8020/APP/Web/Message.html?iconType="+item;
				//window.location="http://128.1.2.192:8020/APP/Web/SJDW/SY.html?iconType="+item;
			}
			else if(item=="search"){
				window.location="http://127.0.0.1:8020/APP/Web/Search.html?iconType="+item;
				//window.location="http://128.1.2.192:8020/APP/Web/SJDW/SY.html?iconType="+item;
			}
			else if(item=="me"){
				window.location="http://127.0.0.1:8020/APP/Web/UserInfo.html?iconType="+item;
			}
		}
	}

})