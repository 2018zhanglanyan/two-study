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
					iSpeed = -15;
				}else{
					iSpeed = 15;
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

//轮播图封装函数
function Carousel(options){
	// 1.罗列属性
	this.oBox = document.getElementById(options.id);
	this.aImg = options.aImg;
	this.width = options.width;
	this.height = options.height;
	this.oUlImg = null;
	this.oUlBtn = null;
	this.oLeftArrow = null;
	this.oRightArrow = null;
	this.now = 0;//当前显示的图片下标
	this.playDuration = options.playDuration;
	// 2.初始化DOM节点
	this.init();
	// 3.绑定事件
	this.bindEvent();
	//自动播放
	if (this.playDuration) {
		this.auto();
	}
}

Carousel.prototype.init = function(){
	//添加图片的容器到外层父容器中
	this.oBox.style.position = 'relative';
	this.oBox.style.width = this.width + 'px';
	this.oBox.style.height = this.height + 'px';
	// this.oBox.style.margin = '100px auto';

	//生成图片的容器
	this.oUlImg = document.createElement('ul');
	//生成底部按钮
	this.oUlBtn = document.createElement('ul');
	this.oUlBtn.className = 'ulBtn';
	this.oUlBtn.style.zIndex = 99;
	
	//因为是多个li所以要在循环里面添加
	for (var i = 0; i < this.aImg.length; i++) {
		//生成li
		aLi = document.createElement('li');
		aLi.style.position = 'absolute';
		aLi.style.top = '0px';
		aLi.style.left = '0px';
		aLi.style.width = '980px';
		aLi.style.height = '460px';
		
		// console.log(aLi);
		//生成底部按钮
		var aBtn = document.createElement('li');

		//判断是不是第一张图片
		if (i == 0) {
			aLi.style.zIndex = 50;
			aBtn.className = 'active';
			aLi.style.opacity = 1;
		}else{
			aLi.style.zIndex = 0;
			aBtn.className = '';
			aLi.style.opacity = 0.5;
		}

		//生成img
		var oImg = document.createElement('img');
		oImg.src = this.aImg[i];
		// 处理图片
		oImg.style.width = '1226px';
		oImg.style.height = '460px';

		//添加img  处理li
		aLi.appendChild(oImg);
		//添加li
		this.oUlImg.appendChild(aLi);
		// console.log(aLi);
		//添加btn
		this.oUlBtn.appendChild(aBtn);
	}
	//生成左右按钮
	this.oLeftArrow = document.createElement('span');
	this.oRightArrow = document.createElement('span');

	this.oLeftArrow.className = 'leftArrow';
	this.oRightArrow.className = 'rightArrow';

	this.oLeftArrow.style.zIndex = 99;
	this.oRightArrow.style.zIndex = 99;

	this.oLeftArrow.innerHTML = '&lt;'
	this.oRightArrow.innerHTML = '&gt;'

	//添加图片按钮到父容器中
	this.oBox.appendChild(this.oUlImg);
	//添加左右按钮到父容器中
	this.oBox.appendChild(this.oLeftArrow);
	this.oBox.appendChild(this.oRightArrow);
	//添加底部按钮到父容器中
	this.oBox.appendChild(this.oUlBtn);
	// console.log(this.oUlBtn.offsetWidth);
	//计算底部按钮放中间的left值
	// this.oUlBtn.style.marginLeft = -this.oUlBtn.offsetWidth * 0.5 + 'px';
}

Carousel.prototype.bindEvent = function(){
	// console.log(this);
	var _this = this;
	//绑定右边按钮事件
	this.oRightArrow.onclick = function(){
		//显示下一张
		_this.now++;
		if (_this.now >= _this.aImg.length) {
			_this.now = 0;
		}
		_this.tab();
	}
	//绑定左边按钮事件
	this.oLeftArrow.onclick = function(){
		//显示上一张
		_this.now--;
		if (_this.now < 0) {
			_this.now = _this.aImg.length-1;
		}
		_this.tab();
	}
	//绑定底部按钮事件
	for (var i = 0; i < this.oUlBtn.children.length; i++) {
		this.oUlBtn.children[i].index = i;
		this.oUlBtn.children[i].onclick = function(){
			_this.now = this.index;
			_this.tab();
		}
	}
}

Carousel.prototype.tab = function(){
	//1.清除所有
	for (var i = 0; i < this.aImg.length; i++) {
		this.oUlImg.children[i].style.zIndex = 0;
		this.oUlImg.children[i].style.opacity = 0;
		this.oUlBtn.children[i].className = '';
	}

	this.oUlImg.children[this.now].style.zIndex = 50;
	this.oUlImg.children[this.now].style.opacity = 1;
	this.oUlBtn.children[this.now].className = 'active';
		
}

Carousel.prototype.auto = function(){
	var timer = 0;
	var _this = this;
	timer = setInterval(this.oRightArrow.onclick,this.playDuration);
	this.oBox.onmouseover = function(){
		clearInterval(timer);
	}
	this.oBox.onmouseout = function(){
		timer = setInterval(_this.oRightArrow.onclick,_this.playDuration);
	}
}


function getScrollTop(){
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

function getScrollLeft(){
	return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}