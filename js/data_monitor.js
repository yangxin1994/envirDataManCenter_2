$(function () {
	//自动滚动  
	autoScrollFun('.scrollBox');

	var pollNameList = [{
		pollId: 21,
		pollName: "监测中心站1"
	}, {
		pollId: 22,
		pollName: "监测中心站2"
	}, {
		pollId: 23,
		pollName: "监测中心站3"
	}];
	//根据数据 渲染HTML
	initSelectlist(pollNameList, '.polSelct');
	//选择框的所有交互
	selectToggle('.polSelct');

	var echartsBar = echarts.init(document.getElementById('ServiceMonitor'));
	echartsBar.setOption(optionBar);

    
	/* 接口调用-绘制曲线组  */
	bulgeDraw('InterfaceCallCanvas','.InterfaceCall',5, 200); //draw(elementId,需要展示的曲线条数,相lin)
	/* 接口调用-曲线上所有的光点的方法对象  */
	lightLoopLeft = new BulgeLightLoop('.InterfaceCallLightBox',5, 200, "spread"); //converage/spread 往集中方向/分散方向
    
	/* 中间库交换-绘制曲线组  */
	bulgeDraw('InterLibraryCallCanvas','.InterLibraryExchange', 4, 200); //draw(elementId,需要展示的曲线条数,相lin)
	/* 中间库交换-曲线上所有的光点的方法对象  */
	interLibraryLoopLeft = new BulgeLightLoop('.InterLibraryExcLightBox',4, 200, "spread"); //converage/spread 往集中方向/分散方向
})

var lightLoopLeft=null;//接口调用-曲线上所有的光点的方法对象 
var interLibraryLoopLeft=null;// 中间库交换-曲线上所有的光点的方法对象 
  
var serviceMonitorData = {
	typeArr: ['空气自动监控数据', '地表水水质', '饮用水源地', '功能区噪声', '道路噪声', '空气预量', '空气质量评价'],
	totalData: [440, 434, 402, 438, 480, 560, 530],
	normalData: [320, 302, 301, 334, 390, 330, 320],
	abnormalData: [120, 132, 101, 134, 90, 230, 210],
}
var optionBar = {
	color: ['#00ffcc', '#00ffcc', '#ff7e00'],
	tooltip: {
		show: true,
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},

	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		axisTick: {
			show: false
		},
		axisLine: {
			show: false,
		},
		axisLabel: {
			color: '#fff'
		},
		splitLine: {
			lineStyle: {
				color: ['#fff'],
				type: 'dashed'
			}
		}
	},
	yAxis: {
		type: 'category',
		data: serviceMonitorData.typeArr,
		axisTick: {
			show: false
		},
		axisLine: {
			show: false,
		},
		axisLabel: {
			color: '#fff'
		},
		inverse: true,
		//label:{show:false}
	},
	series: [{
			name: '总量',
			type: 'bar',
			stack: '总量',
			barWidth: "35%",
			label: {
				show: false,
			},
			itemStyle: {
				barBorderRadius: 6
			},
			data: serviceMonitorData.totalData
		},
		{
			name: '正常',
			type: 'bar',
			stack: '分量',
			barWidth: "35%",
			barGap: "-100%",
			label: {
				color: "#333",
				show: true,
				position: 'insideRight',
			},
			data: serviceMonitorData.normalData
		},
		{
			name: '异常',
			type: 'bar',
			stack: '分量',
			barWidth: "35%",
			label: {
				color: "#333",
				show: true,
				position: 'insideRight',
			},
			barGap: "-100%",
			itemStyle: {
				barBorderRadius: 9
			},
			data: serviceMonitorData.abnormalData
		}

	]
};

//顶部主题切换  tab点击切换事件
$("body").on('click', '.TabsDiv .TabSpan', function () {
	$('.TabsDiv .TabSpan').removeClass('active');
	$(this).addClass('active');
	var themeName = $(this).attr('data-theme');
	$('.CardListDiv[data-theme=' + themeName + ']').css({
		display: 'block'
	});
	$('.CardListDiv[data-theme=' + themeName + ']').siblings('.CardListDiv').css({
		display: 'none'
	});
	

})

//主题数据。服务  tab点击切换事件
$("body").on('click', '.LeftTabs .TabSpan', function () {
	var themeName = $(this).attr('data-theme');
	if(themeName==="Overall"){
		bulgeDraw('InterfaceCallCanvas','.InterfaceCall',5, 200); 
		lightLoopLeft.reset(5, 200, "spread");
		bulgeDraw('InterLibraryCallCanvas','.InterLibraryExchange', 3, 200);
		interLibraryLoopLeft.reset(3, 200, "spread");
	}else if(themeName==="ResourceClassification"){
		bulgeDraw('InterfaceCallCanvas','.InterfaceCall',4, 200); 
		lightLoopLeft.reset(4, 200, "spread");
		bulgeDraw('InterLibraryCallCanvas','.InterLibraryExchange',2, 200);
		interLibraryLoopLeft.reset(2, 200, "spread");
	}else if(themeName==="DepartmentalResources"){
		bulgeDraw('InterfaceCallCanvas','.InterfaceCall',3, 200); 
		lightLoopLeft.reset(3, 200, "spread");
		bulgeDraw('InterLibraryCallCanvas','.InterLibraryExchange',1, 200);
		interLibraryLoopLeft.reset(1, 200, "spread");
	}
})
//主题数据。服务  tab点击切换事件
$("body").on('click', '.HeaderDiv .TabSpan', function () {
	$('.HeaderDiv .TabSpan').removeClass('active');
	$(this).addClass('active');
	var themeName = $(this).attr('data-theme');
	$('.ServiceCanvas[data-theme=' + themeName + ']').css({
		display: 'block'
	});
	$('.ServiceCanvas[data-theme=' + themeName + ']').siblings('.ServiceCanvas').css({
		display: 'none'
	});
})

$("body").on('click', '.TimeTypeSpan', function () {
	$('.TimeTypeSpan').removeClass('active');
	$(this).addClass('active');
	var type = $(this).attr('data-theme');

})

/*初始化某个弹幕的选框的dom  
 *{arr}   需要渲染的数据来源
 *{elementClass}   徐然的目标大容器的选择器
 */
function initSelectlist(arr, elementClass) { //待完善
	var innerHtml = '';
	innerHtml = '<span class="selectSpan ">' +
		'<span class="spanInner active" data-key="' + arr[0].pollId + '" >' + arr[0].pollName + '</span>' +
		'<i class="icon dropIcon"></i>' +
		'</span>' +
		'<ul class="TreeList" >';
	var listArr = '';
	for (var i = 0; i < arr.length; i++) {
		var lihtml = '';
		if (i === 0) {
			lihtml = '<li class="treeLi active" data-index="' + arr[0].pollId + '" >' + arr[i].pollName + '</li>'
		} else {
			lihtml = '<li class="treeLi" data-index="' + arr[i].pollId + '">' + arr[i].pollName + '</li>'
		}
		listArr += lihtml;
	}
	innerHtml += listArr;
	innerHtml += '</ul>';
	$(elementClass + ' .selectLi').html(innerHtml);
}


/*选择框的所有交互 
 *{elementClass}   徐然的目标大容器的选择器
 */
function selectToggle(elementClass) {
	$("body").on('click', elementClass + ' .selectLi', function (e) {
		//stopBubble(e);
		$(elementClass + ' .TreeList').toggleClass('show');
		$(elementClass + ' .dropIcon.icon').toggleClass('rotatel');
	})
	$("body").on('click', elementClass + ' .treeLi', function (e) {
		//stopBubble(e);
		var name = $(this).html();
		var index = $(this).attr('data-key');
		$(elementClass + ' .spanInner').attr('data-key', index);
		$(elementClass + ' .spanInner').html(name);
		$(elementClass + ' .treeLi').removeClass("active");
		$(this).addClass("active");
		$(elementClass + ' .spanInner').addClass("active");
		setTimeout(function () {
			$(elementClass + ' .TreeList').removeClass('show');
			$(elementClass + ' .dropIcon.icon').removeClass('rotatel');
		}, 1000);
		var getData = null;
		//发送数据请求             !!!!!!!!!!!!!!!需要后台根据'data-key'来发送请求
		//$.getJSON("words.json", {pollId: index}, function (data) {
		//var getData=data;  
		//postCallback();
		//});

	})
}

/**
 * 利用canvas绘制曲线
 * @param {string} elementId 绘制曲线的canvas的ID
 * @param {string} elementClass 此模块的容器ServiceCanvas的独特类名
 * @param {number} n         需要绘制曲线的数量
 * @param {number} curveGap   曲线的间距
 */ 

function bulgeDraw(elementId,elementClass, n, curveGap) {
	var canvas = document.getElementById(elementId);
	var context = canvas.getContext('2d');
	var cruvePathArr=[];
	//设置或得到整个canvas的高度

	var boxHeight = $('#' + elementId).height();
	var boxWidth = $('#' + elementId).width();
	var rectWidth = $('.rect-icon').width();
	var perWidth = parseInt(boxWidth / n);

	var centerX = parseInt(boxWidth / 2);
	//数量是奇数，还是偶数
	var numType = n % 2 === 0 ? '偶数' : '奇数';

	var bomMinNo = null;
	var centerNo = null;

	if (numType == '奇数') {
		centerNo = parseInt((n + 1) / 2);
	} else {
		bomMinNo = parseInt(n / 2) + 1;
	}

	//绘制2次贝塞尔曲线 

	context.setLineDash([3, 3]); //设置线条为虚线的样式
	$(elementClass+' .rect-icon').removeClass('center');

	//清楚之前所绘制内容
	context.clearRect(0,0,boxWidth,boxHeight);
	$(elementClass+' .rect-icon').css('left','-500px');
	//循环展示各条曲线
	for (var i = 0; i < n; i++) {
		var index = i + 1; //从1开始
		var startX = null;
		var offset = 84;
		var controlX = null;
		
		if (numType === '奇数') {
			if (index < centerNo) {
				startX = parseInt((index - 1) * curveGap) + (rectWidth / 2);
				controlX = startX + curveGap * 0.1;
				$(elementClass+' .rect-icon:eq('+i+')').css('left',parseInt((index - 1) * curveGap)+'px');
			} else if (index === centerNo) {
				offset = 0;
				startX = centerX;
				controlX = startX;
				$(elementClass).find('.rect-icon:eq('+i+')').addClass('center');
				$(elementClass+' .rect-icon:eq('+i+')').css('left',centerX- ($(elementClass+' .rect-icon:eq('+i+')').width() / 2)+'px');
			} else {
				startX = boxWidth - parseInt((n - index) * curveGap) - (rectWidth / 2);
				controlX = startX - curveGap * 0.1;
				$(elementClass+' .rect-icon:eq('+i+')').css('left',boxWidth - parseInt((n - index) * curveGap)-rectWidth+'px');
			}

		} else {
			if (index < bomMinNo) {
				startX = parseInt((index - 1) * curveGap) + (rectWidth / 2);
				controlX = startX + curveGap * 0.1;
				$(elementClass+' .rect-icon:eq('+i+')').css('left',parseInt((index - 1) * curveGap) +'px');
			} else {
				startX = boxWidth - parseInt((n - index) * curveGap) - (rectWidth / 2);
				controlX = startX - curveGap * 0.1;
				$(elementClass+' .rect-icon:eq('+i+')').css('left',boxWidth - parseInt((n - index) * curveGap)-rectWidth+'px');
			}
		}
		
		context.beginPath();
		context.moveTo(startX, offset); //曲线绘制的起点
		cruvePathArr.push([startX, offset,controlX]);
		//曲线绘制的控制点位整个canvas //quadraticCurveTo(cpx,cpy,x,y)　　cpx，cpy表示控制点的坐标,x，y表示终点坐标；
		context.quadraticCurveTo(controlX, boxHeight - 30, boxWidth / 2, boxHeight);
		context.strokeStyle = "#01efea"; //设置贝塞尔曲线的颜色
		//if (numType === '奇数' && index === centerNo) {
			//context.strokeStyle = "#ffcc00"; //设置贝塞尔曲线的颜色
		//}
		context.stroke();
	}

	//鼠标移入时 ".rect-icon"  曲线重绘
	// $("body").on('mouseenter',elementClass+" .rect-icon",function(){
		// 	var index=$(this).index();
		// 	$(this).hover(function () {
				
		// 		$(elementClass+' .line-icon:eq('+index+')').addClass('gold');
		// 		//console.log(1,$(this),index);
		// 		context.clearRect(0,0,boxWidth,boxHeight);
		// 		for(var i=0;i<cruvePathArr.length;i++){
		// 			context.beginPath();
		// 			context.moveTo(cruvePathArr[i][0], cruvePathArr[i][1]); //曲线绘制的起点
		// 			//曲线绘制的控制点位整个canvas //quadraticCurveTo(cpx,cpy,x,y)　　cpx，cpy表示控制点的坐标,x，y表示终点坐标；
		// 			context.quadraticCurveTo(cruvePathArr[i][2], boxHeight - 30, boxWidth / 2, boxHeight);
		// 			context.strokeStyle = "#01efea"; //设置贝塞尔曲线的颜色
		// 			if (index === i) {
		// 				context.strokeStyle = "#ffcc00"; //设置贝塞尔曲线的颜色
		// 			}
		// 			context.stroke();
		// 		}
	// 	}, function () {
		// 		var index=$(this).index();
		// 		$(elementClass+' .line-icon').removeClass('gold');
		// 		context.clearRect(0,0,boxWidth,boxHeight);
		// 		for(var i=0;i<cruvePathArr.length;i++){
		// 			context.beginPath();
		// 			context.moveTo(cruvePathArr[i][0], cruvePathArr[i][1]); //曲线绘制的起点
		// 			//曲线绘制的控制点位整个canvas //quadraticCurveTo(cpx,cpy,x,y)　　cpx，cpy表示控制点的坐标,x，y表示终点坐标；
		// 			context.quadraticCurveTo(cruvePathArr[i][2],boxHeight - 30, boxWidth / 2, boxHeight);
		// 			context.strokeStyle = "#01efea"; //设置贝塞尔曲线的颜色
		// 			context.stroke();
		// 		}
	// 	}).trigger('mouseleave');	
	// })
}	





//移动点的原型
/**
 * 
 * @param {string} element   移动点的父元素的选择器
 * @param {number} n         总共移动点的数量
 * @param {number} curveGap   曲线的间距
 * @param {string} direction     需要绘制曲线的方向,只能为 "converage"|'spread'
 */
function BulgeLightLoop(element,n, curveGap, type) {
	//初始化初始值
	this.element = element;
	this.init=function(n, curveGap, type){
		
		this.curveGap = curveGap;
		this.n=n;
		this.type = type||"spread";
		//数量是奇数，还是偶数
		this.numType = this.n % 2 === 0 ? '偶数' : '奇数';
		this.bomMinNo = null;
		this.centerNo = null;
		this.radio = 0; //贝塞尔曲线的比值
		if (this.numType == '奇数') {
			this.centerNo = parseInt((this.n + 1) / 2);
		} else {
			this.bomMinNo = parseInt(this.n / 2) + 1;
		}
		
		
	}
	this.initLight=function(){
		var listHtml='';
		for(var i=0;i<this.n;i++){
			var liHtml='<span class="line-icon "></span>';
			listHtml+=liHtml;
		}
		$(this.element).html(listHtml);
	}
	this.init(n, curveGap, type);
	this.initLight();
	this.boxHeight = $(this.element).height()||224; //移动点的的高度  
	this.boxWidth = $(this.element).width()||830; //移动点的父元素的的宽度
	this.centerX = parseInt(this.boxWidth / 2);
	this.childWidth = $(this.element).children().width(); //移动点的子元素的宽度    
	this.childHeight = $(this.element).children().height(); //移动点的子元素的高度
	this.rectWidth = $('.rect-icon').width();
	//控制点p1统一为
	this.controlY = this.boxHeight - 30; //离canvas做左侧的水平距离 统一为30；
	//终点p2统一为右边终点
	this.endX = this.boxWidth / 2;
	this.endY = this.boxHeight; //垂直中心

	var _this = this;
	var lightTurnOn = setInterval(function () {
		_this.turn();
	}, 40)
	this.turn = function () {
		if (this.radio >= 0.95) {
			this.radio = 0
		} else {
			this.radio = this.radio + 0.005;
		}
		for (var i = 0; i < this.n; i++) {
			var obj = {};
			var index = i + 1; //从1开始
			obj.startX = null;
			obj.offset = 84;
			obj.controlX = null;
			if (this.numType === '奇数') {
				if (index < this.centerNo) {
					obj.startX = parseInt((index - 1) * this.curveGap) + (this.rectWidth / 2);
					obj.controlX = obj.startX + this.curveGap * 0.1;
				} else if (index === this.centerNo) {
					obj.offset = 0;
					obj.startX = this.centerX;
					obj.controlX = obj.startX;
				} else {
					obj.startX = this.boxWidth - parseInt((this.n - index) * this.curveGap) - (this.rectWidth / 2);
					obj.controlX = obj.startX - this.curveGap * 0.1;
				}
			} else {
				if (index < this.bomMinNo) {
					obj.startX = parseInt((index - 1) * this.curveGap) + (this.rectWidth / 2);
					obj.controlX = obj.startX + this.curveGap * 0.1;
				} else {
					obj.startX = this.boxWidth - parseInt((this.n - index) * this.curveGap) - (this.rectWidth / 2);
					obj.controlX = obj.startX - this.curveGap * 0.1;
				}
			}
			//控制点p1
			obj.controlY = this.controlY;
			//如果是光点往集中方向移动的类型
			if (this.type === "converage") {
				//起点p0                
				obj.startY = obj.offset; //离canvas做左侧的垂直距离            
				obj.endX = this.endX;
				obj.endY = this.endY;
				//计算斜率，得到点的切线方向，得到角度

				obj.k = [(1 - this.radio) * (obj.controlY - obj.startY) + this.radio * (obj.endY - obj.controlY)] / [(1 - this.radio) * (obj.controlX - obj.startX) + this.radio * (obj.endX - obj.controlX)];
				obj.angle = Math.atan(obj.k) / 0.017453293 - 90; //根据斜率得到旋转角度
				//根据斜率，求得需要切斜的角度 单位为弧度，/0.017453293 转化为角度
				
				if (index < this.centerNo || index < this.bomMinNo) {
					obj.angle = obj.angle + 180;
				} else if (index === this.centerNo) {
					obj.angle = 180;
				}

				//如果是光点往分散方向移动的类型
			} else {
				//起点p0 
				obj.endX = obj.startX;
				obj.endY = obj.offset;
				obj.startX = this.endX;
				obj.startY = this.endY;

				//计算斜率，得到点的切线方向，得到角度
				obj.k = [(1 - this.radio) * (obj.controlY - obj.startY) + this.radio * (obj.endY - obj.controlY)] / [(1 - this.radio) * (obj.controlX - obj.startX) + this.radio * (obj.endX - obj.controlX)];
				//根据斜率，求得需要切斜的角度 单位为弧度，/0.017453293 转化为角度
				obj.angle = Math.atan(obj.k) / 0.017453293 + 90; //根据斜率得到旋转角度
				
				if (index < this.centerNo || index < this.bomMinNo) {
					obj.angle = obj.angle + 180;
				} else if (index === this.centerNo) {
					obj.angle = 0;
				}
			}

			//根据比值this.radio变化计算点的坐标值；p=(1-this.radio)*(1-this.radio)p0+2*this.radio*(1-this.radio)*p1+this.radio*this.radio*p2;
			obj.nowX = (1 - this.radio) * (1 - this.radio) * obj.startX + 2 * this.radio * (1 - this.radio) * obj.controlX + this.radio * this.radio * obj.endX;
			obj.nowY = (1 - this.radio) * (1 - this.radio) * obj.startY + 2 * this.radio * (1 - this.radio) * obj.controlY + this.radio * this.radio * obj.endY;

			$(this.element + ' .line-icon:eq(' + i + ')').css({
				'left': obj.nowX - this.childWidth / 2,
				'top': obj.nowY - this.childHeight / 2,
				'transform': 'rotate(' + obj.angle + 'deg)'
			});
		}
	}

	//重置光点移动方式
	this.setType = function (newType) {
		this.type = newType;
		clearInterval(lightTurnOn);
		this.radio = 0; //重置曲线的绘制比值
		lightTurnOn = setInterval(function () {
			_this.turn();
		}, 40)
	}
	
	//重置参数；
	this.reset=function(n, curveGap, type){
		
		clearInterval(lightTurnOn);
		_this.init(n, curveGap, type);
		_this.initLight();
		lightTurnOn = setInterval(function () {
			_this.turn();
		}, 40)
		//console.log(this);
	}

}
