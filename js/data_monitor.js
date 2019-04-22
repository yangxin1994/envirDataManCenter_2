$(function () {
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

	
	/* 左边曲线  */
    bulgeDraw('InterfaceCallCanvas', 5);//draw(elementId,需要展示的曲线条数)
    /* 左边曲线上所有的光点的方法对象  */
    var lightLoopLeft = new BulgeLightLoop('.InterfaceCallLightBox', 5, "converage");//converage 往集中方向
})
var serviceMonitorData={
	typeArr:['空气自动监控数据', '地表水水质', '饮用水源地', '功能区噪声', '道路噪声', '空气预量', '空气质量评价'],
	totalData:[440,434,402,438,480,560,530],
	normalData:[320, 302, 301, 334, 390, 330, 320],
	abnormalData:[120, 132, 101, 134, 90, 230, 210],
}
var optionBar = {
	color: ['#00ffcc','#00ffcc', '#ff7e00'],
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
	series: [
		{
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
			barGap:"-100%",
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
			barGap:"-100%",
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



//利用canvas绘制曲线
/**
* 
* @param {*} elementId 绘制曲线的canvas的ID
* @param {*} n         需要绘制曲线的数量
*/
function bulgeDraw(elementId, n) {
    var canvas = document.getElementById(elementId);
    //var boxHeight=canvas.style.height;
    //设置或得到整个canvas的高度
   
    var boxHeight = $('#' + elementId).height();         //canvas的高度 待完善
    var boxWidth = $('#' + elementId).width();          //canvas的宽度 待完善
    var perHeight = parseInt(boxHeight / n);
    var centerY = parseInt(boxHeight / 2);
    var centerNum=n/2;
    var context = canvas.getContext('2d');

    //绘制2次贝塞尔曲线 
    context.setLineDash([6, 6]);//设置线条为虚线的样式
    for (var i = 0; i < n; i++) {
		var startY = perHeight / 2 + perHeight * i;
		if(i<=n/2){
			
		}
		var controlY=parseInt(centerY+perHeight/16*(i-n/2));
		var offset=84;
        context.beginPath();
        context.moveTo(offset, startY); //曲线绘制的起点
        //quadraticCurveTo(cpx,cpy,x,y)　　//cpx，cpy表示控制点的坐标,x，y表示终点坐标；
        //曲线绘制的控制点位整个canvas
        context.quadraticCurveTo(boxWidth-30, controlY, boxWidth, centerY);
        context.strokeStyle = "#078dff";//设置贝塞尔曲线的颜色
        context.stroke();
    }
}

//移动点的原型
/**
* 
* @param {*} element   移动点的父元素的选择器
* @param {*} n         总共移动点的数量
* @param {*} direction     需要绘制曲线的方向,只能为 "converage"|'spread'
*/
function BulgeLightLoop(element, n,type) {
    this.element=element
    this.type=type;
    this.boxHeight = $(this.element).height();         //移动点的的高度  
    this.boxWidth = $(this.element).width();          //移动点的父元素的的宽度
    this.perHeight = parseInt(this.boxHeight / n);
    this.childWidth = $(this.element).children().width();                   //移动点的子元素的宽度    
    this.childHeight = $(this.element).children().height();                 //移动点的子元素的高度
    //控制点p1统一为
    this.controlX = 30;                                          //离canvas做左侧的水平距离 统一为30；
    //终点p2统一为右边终点
    this.endX = this.boxWidth;
    this.endY = this.boxHeight / 2;//垂直中心
    this.radio = 0;//贝塞尔曲线的比值
    
    var _this = this;
    var LightTurnOn = setInterval(function () {
        _this.turn();
    }, 40)

    this.turn = function () {
        if (this.radio >= 1) {
            this.radio = 0
        } else {
            this.radio = this.radio + 0.005;
        }
        for (var i = 0; i < n; i++) {
            var obj = {};
             //控制点p1
            obj.controlY= this.boxHeight / 2+this.perHeight/16*(i-n/2);                          
            //如果是光点往集中方向移动的类型
            if(this.type==="converage"){
            //起点p0                
                obj.startX = 0;                                              //离canvas做左侧的水平距离            
                obj.startY = this.perHeight / 2 + this.perHeight * i;             //离canvas顶部的垂直距离  
                obj.endX=this.endX;
                obj.endY=this.endY;    
                //计算斜率，得到点的切线方向，得到角度
                obj.k = [(1 - this.radio) * (obj.controlY - obj.startY) + this.radio * (obj.endY - obj.controlY)] / [(1 - this.radio) * (this.controlX - obj.startX) + this.radio * (obj.endX - this.controlX)];
                //根据斜率，求得需要切斜的角度 单位为弧度，/0.017453293 转化为角度
                obj.angle = Math.atan(obj.k) / 0.017453293;//根据斜率得到旋转角度
            //如果是光点往分散方向移动的类型
            }else{
                obj.startX = this.endX;                                                       
                obj.startY = this.endY;             
                obj.endX=0;
                obj.endY=this.perHeight / 2 + this.perHeight * i;  
        
                //计算斜率，得到点的切线方向，得到角度
                obj.k = [(1 - this.radio) * (obj.controlY - obj.startY) + this.radio * (obj.endY - obj.controlY)] / [(1 - this.radio) * (this.controlX - obj.startX) + this.radio * (obj.endX - this.controlX)];
               
                //根据斜率，求得需要切斜的角度 单位为弧度，/0.017453293 转化为角度
                obj.angle = Math.atan(obj.k) / 0.017453293+180; //根据斜率得到旋转角度，+180另外图标自身要换反方向
            }
             //根据比值this.radio变化计算点的坐标值；p=(1-this.radio)*(1-this.radio)p0+2*this.radio*(1-this.radio)*p1+this.radio*this.radio*p2;
             obj.nowX = (1 - this.radio) * (1 - this.radio) * obj.startX + 2 * this.radio * (1 - this.radio) * this.controlX + this.radio * this.radio * obj.endX;
             obj.nowY = (1 - this.radio) * (1 - this.radio) * obj.startY + 2 * this.radio * (1 - this.radio) *obj.controlY + this.radio * this.radio * obj.endY;
            $(this.element + ' .LineIcon:eq(' + i + ')').css({
                'left': obj.nowX - this.childWidth / 2,
                'top': obj.nowY - this.childHeight / 2,
                'transform': 'rotate(' + obj.angle + 'deg)'
            });
        }
    }

     //重置光点移动方式
    this.setType=function(newType){                                 
        this.type=newType;
        clearInterval(LightTurnOn);
        this.radio = 0;//重置曲线的绘制比值
        LightTurnOn = setInterval(function () {
            _this.turn();
        }, 40)
    }
    
}