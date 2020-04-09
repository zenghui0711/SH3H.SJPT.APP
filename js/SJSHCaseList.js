// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
	data: function() {
		return {
			comdata: '../../../images/5EC6D2161526A179BB5B29E6989AC3EA.jpg'
		}
	},
	template: '<div class="am-panel-bd" >' +
		'<div class="am-panel am-panel-default box_border_radius_big">' +
		'<div class="am-panel-bd ">' +
		'<div class="case_image_one">' +
		'<div class="case_info_img">' +
		'<img :src="comdata" />' +
		'</div>' +
		'<div class="case_status_bac">'+
		'<span>退单审核</span>'+						
		'</div>'+				
		'<div class="case_status_img" v-if="this.count.statusText!=\'\'">' +
		'<img :src="\'../../../images/\'+this.count.statusText+\'水印.png\'" />' +
		'</div>' +
		'</div>' +
		'<div class="caseinfo_text" >' +
		'<div>' +
		'<div>' +
		'<div class="TASK_ID">{{this.count.row1}}<span class="taskid_from taskid_from_backg_one">{{this.count.row1Value}}</span></div>' +
		'</div>' +
		'<div class="case_context">' +
		'<div>{{this.count.row2}}<span>{{this.count.row2Value}}</span></div>' +
		'</div>' +
		'<div class="case_time">' +
		'<div><span class="case_title">{{this.count.row3}}</span> <span>{{this.count.row3Value}}</span></div>' +
		'</div>' +
		'<div class="case_time">' +
		'<div><span class="case_title">{{this.count.row4}}</span> <span>{{this.count.row4Value}}</span></div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>',
	props: ["count", "img"],
	watch: {
		comdata: function(val, oldVal) {
			console.log('new: %s, old: %s', val, oldVal);
		}
	},
	methods: {
		getData: function() {
			//			console.log(this.count)
			$.ajax({
				type: "GET",
				url: "../../../data/image.json",
				data: null,
				dataType: "json",
				success: function(data) {
					this.comdata = data.img;
					//					console.log(this.count);
					console.log(this.comdata);
					return data.img;

				}

			});
		}
	},
	computed: {

		normalizedSize: function() {
			$.ajax({
				type: "GET",
				url: "../../../data/image.json",
				data: null,
				dataType: "json",
				success: function(data) {
					console.log(data);
					return data.img;
				}

			});
			//return this.comdata="../../../images/8FFF0F404AA8223BF2657EC7A56C2500.JPG";

		}

	},
	created: function() {
		//		this.normalizedSize();
	}
})