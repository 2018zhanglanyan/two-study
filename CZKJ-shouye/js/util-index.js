/*
*	封装减速动画函数
*
*	第一个参数：{[object]} obj [DOM节点对象]
*	第二个参数：{[object]} options [属性和属性目标值]
*	第三个参数：{[Boolean]} isLiner [是否是匀速动画]
*	第四个参数：{[function]} fnEnd [动画结束时执行的函数]
*
*/

function animate(obj,options,isLiner,fnEnd){
	//如果isLiner是undefined 就默认是匀速动画
	//传参的时候是false 就是减速动画
	if (isLiner == undefined) {
		isLiner = true;
	}
	//防止多次执行  开启多个定时器
	clearInterval(obj.timer);
	//速度
	var iSpeed = 0;
	//开启定时器
	obj.timer = setInterval(function(){
		//是否终止所有动画
		var isStopAll = true;
		for (var attr in options){
			//isStopCurrent 代表是否当终止前动画 ，由于在循环定时器中，所以每次执行都会变为false,代表不终止当前动画
			var isStopCurrent = false;
			//获取当前最新的值
			var current = parseFloat(getComputedStyle(obj,false)[attr]);
			// console.log(current);
			//‘opacity’透明度的处理
			if (attr == 'opacity') {
				//1.乘以100是为了计算
				//2.四舍五入是为了处理小数
				current = Math.round(current*100);
			}
			//是否是匀速动画
			if (isLiner) {
				//匀速动画处理速度
				if (current > options[attr]) {
					iSpeed = -10;
				}else{
					iSpeed = 10;
				}
				//匀速动画终止条件
				if (Math.abs(options[attr]-current) < Math.abs(iSpeed)) {
					//匀速动画终止后的处理：如果最后一次动画不够一个速度就直接到目标值
					if (attr == 'opacity') {
						obj.style.opacity = options[attr] / 100;
					}else{
						obj.style[attr] = options[attr] + 'px';
					}
					//代表终止当前动画
					isStopCurrent = true;
				}else{
					isStopAll = false;
				}
			}else{
				//减速动画处理速度
				iSpeed = (options[attr] - current) / 10;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				//减速动画终止条件
				if (!iSpeed) {
					isStopCurrent = true;
				}else{
					//如果当前动画还没有结束,就不能终止所有动画
					isStopAll = false;
				}
			}
			//如果不终止就继续运动
			if (!isStopCurrent) {
				if (attr == 'opacity') {	
					obj.style[attr] = (current + iSpeed) / 100;
				}else{
					obj.style[attr] = current + iSpeed + 'px';
				}
			}
		}
		//如果终止当前动画，清除定时器
		if (isStopAll) {
			clearInterval(obj.timer);
			//动画执行完毕后的执行函数
			typeof fnEnd == 'function' && fnEnd();
		}
	},30);
}

function getScrollTop(){
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

function getScrollLeft(){
	return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}