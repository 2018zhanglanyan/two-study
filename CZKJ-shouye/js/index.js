// 张燕的首页js

// 顶部导航购物车js
(function(){
	var oLink = document.getElementById('link');
	var oTankuang = document.getElementById('tankuang');
	var timer = 0;
	oLink.onmouseenter = function(){
		clearTimeout(timer);
		oTankuang.style.display = 'block';
	}
	oLink.onmouseleave = function(){
		timer = setTimeout(function(){
			oTankuang.style.display = 'none';
		},300);
	}
	oTankuang.onmouseenter = function(){
		clearTimeout(timer);
		oTankuang.style.display = 'block';
	}
	oTankuang.onmouseleave = function(){
		timer = setTimeout(function(){
			oTankuang.style.display = 'none';
		},300);
	}
})();

// 顶部固定导航js
(function(){
	var oTopNav = document.querySelector('.xiala-nav');
	var isShow = false;
	var timer = 0;
	// console.log(oTopNav);
	function animate(obj,attr,target){
		//防止多次执行
		clearInterval(obj.timer);
		var iSpeed = 0;
		obj.timer = setInterval(function(){
			var current = parseFloat(getComputedStyle(obj,false)[attr]);
			//透明度处理
			if (attr == 'opacity') {
				current = Math.round(current * 100);
			}
			//匀速动画处理速度
			if (current > target) {
				iSpeed = -10;
			}else{
				iSpeed = 10;
			}
			//匀速动画终止条件处理
			if (Math.abs(target-current) < Math.abs(iSpeed)) {
				if (attr == 'opacity') {
					obj.style.opacity = target / 100;
				}else{
					obj.style[attr] = target + 'px';
				}
				clearInterval(obj.timer);
			}else{
				if (attr == 'opacity') {
					obj.style.opacity = (current + iSpeed) / 100;
				}else{
					obj.style[attr] = current + iSpeed + 'px';
				}
			}
		},30);
	}
	window.onscroll = function(){
		if (getScrollTop() >= 100) {
			if (!isShow) {
				// console.log('aa');
				animate(oTopNav,'height',60);
				timer = setTimeout(function(){
					oTopNav.style.overflow = 'visible';
				},400);
				isShow = true;
			}
		}else{
			if (isShow) {
				// console.log('bb');
				clearTimeout(timer);
				animate(oTopNav,'height',0);
				oTopNav.style.overflow = 'hidden';
				isShow = false;
			}
		}
	}
})();

// 顶部固定导航的购物车js
(function(){
	var oTopLink = document.querySelector('.xiala-nav .nav-shop #link');
	var oTopNavTanKuang = document.querySelector('.xiala-nav .nav-shop .tankuang');
	var timer = 0;
	// console.log(oTopNavTanKuang);
	// console.log(oTopLink);
	oTopLink.onmouseenter = function(){
		clearTimeout(timer);
		oTopNavTanKuang.style.display = 'block';
	}
	oTopLink.onmouseleave = function(){
		timer = setTimeout(function(){
			oTopNavTanKuang.style.display = 'none';
		},300);
	}
	oTopNavTanKuang.onmouseenter = function(){
		clearTimeout(timer);
		oTopNavTanKuang.style.display = 'block';
	}
	oTopNavTanKuang.onmouseleave = function(){
		timer = setTimeout(function(){
			oTopNavTanKuang.style.display = 'none';
		},300);
	}
})();

// 导航下拉列表js  // 搜索弹框js
(function(){
	// 搜索弹框js
	var oTxt = document.getElementById('txt');
	var oRight = document.getElementById('rightSousuo');
	var oList = document.getElementById('sousuoList');
	oTxt.onclick = function(ev){
		event.stopPropagation(window);
		this.placeholder = '请输入搜索的商品';
		oRight.style.display = 'none';
		oList.style.display = 'block';
	}
	oTxt.onkeydown = function(){
		if (oTxt.value == '') {
			this.placeholder = '请输入搜索的商品';
			oRight.style.display = 'none';
			oList.style.display = 'block';
		}else{
			oList.style.display = 'none';
		}
	}
	window.onclick = function(){
		oTxt.placeholder = '';
		oRight.style.display = 'block';
		oList.style.display = 'none';
	}

	// 导航下拉列表js
	var aListLi = document.querySelectorAll('.list-nav .list li');
	var aListContentBox = document.querySelector('.list-nav-content');
	var aListContentBoxHtml = document.querySelector('.list-nav-content .container');
	
	var timer = 0;
	// console.log(aListContentBox);
	// console.log(aListLi);
	for (var i = 0; i < aListLi.length-3; i++) {
		aListLi[i].index = i;
		aListLi[i].onmouseenter = function(){
			oList.style.display = 'none';
			oTxt.placeholder = '';
			oRight.style.display = 'block';
			clearTimeout(timer);
			animate(aListContentBox,{'height':266},true);
			loadData(this.index);
		}
		aListLi[i].onmouseleave = function(){
			timer = setTimeout(function(){
				animate(aListContentBox,{'height':0},true);
			},300);
		}
	}
	aListContentBox.onmouseenter = function(){
		clearTimeout(timer);
		animate(aListContentBox,{'height':266},true);
	}
	aListContentBox.onmouseleave = function(){
		timer = setTimeout(function(){
			animate(aListContentBox,{'height':0},true);
		},300);
	}
	// 顶部固定导航下拉列表js
	var aXiaLaLi = document.querySelectorAll('.xiala-nav .container .list ul li');
	var aXiaLaContent = document.querySelector('.xiala-nav-content');
	var aXiaLaContentBoxHtml = document.querySelector('.xiala-nav-content .container');
	// console.log(aXiaLaLi);
	// console.log(aXiaLaContent);
	// console.log(aXiaLaContentBoxHtml);
	for (var i = 0; i < aXiaLaLi.length-3; i++) {
		aXiaLaLi[i].index = i;
		aXiaLaLi[i].onmouseenter = function(){
			clearTimeout(timer);
			animate(aXiaLaContent,{'height':266},true);
			loadData(this.index);
		}
		aXiaLaLi[i].onmouseleave = function(){
			timer = setTimeout(function(){
				animate(aXiaLaContent,{'height':0},true);
			},300);
		}
	}
	aXiaLaContent.onmouseenter = function(){
		clearTimeout(timer);
		animate(aXiaLaContent,{'height':266},true);
	}
	aXiaLaContent.onmouseleave = function(){
		timer = setTimeout(function(){
			animate(aXiaLaContent,{'height':0},true);
		},300);
	}
	function loadData(index){
		// console.log(index);
		var data = aListContent[index];
		// console.log(data);
		var html = '<ul>';
		// console.log(index);
		if (index == 0 || index == 3 || index == 6) {
			// console.log('aa');
			for (var i = 0; i < data.length; i++) {
				html += '<li>';
				html += '	<h4>'+data[i].title+'</h4>';
				html += '	<a href='+data[i].url+'>';
				for (var j = 0; j < data[i].obj.length; j++) {
					// console.log(data[i].obj[j]);
					html += '		<span>';
					html += '			<img src='+data[i].obj[j].img+'>';
					// console.log(data[i].obj[0]);
					html += '			<span class="text">'+data[i].obj[j].txt+'</span>';
					html += '		</span>';
				}
				html += '	</a>';
				html += '</li>';
			}
		}else{
			// console.log('bb');
			for (var i = 0; i < data.length; i++) {
				html += '<li>';
				html += '	<a href='+data[i].url+'>';
				html += '		<img class="da" src='+data[i].img+'>';
				html += '		<p class="txt">'+data[i].txt+'</p>';
				html += '		<p class="price"><span>'+data[i].price+'</span>元起</p>';
				html += '	</a>';
				html += '</li>';
			}
		} 
		html += '</ul>';
		aListContentBoxHtml.innerHTML = html;
		aXiaLaContentBoxHtml.innerHTML = html;
	}
})();

// 轮播图js
(function(){
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
			aLi.style.width = '1220px';
			aLi.style.height = '498px';
			
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
			oImg.style.width = '1220px';
			oImg.style.height = '498px';
			oImg.style.borderRadius = '10px';

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
		this.oUlBtn.style.marginLeft = -this.oUlBtn.offsetWidth * 0.5 + 'px';
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
	new Carousel({
		id:'box',
		aImg:['images/lunbo1.jpg','images/lunbo2.jpg','images/lunbo3.jpg'],
		width:1220,
		height:460,
		playDuration:3000
	});
})();

// 热门商品的js
(function(){
	// 热门商品按钮部分
	var oBtn1 = document.getElementById('btn1');
	var oBtn2 = document.getElementById('btn2');
	var oListbox = document.getElementById('listBox');
	// console.log(oListbox);
	oBtn1.onclick = function(){
		oListbox.style.marginLeft = '0px';
		this.className = '';
		oBtn2.className = 'active';
	}
	oBtn2.onclick = function(){
		oListbox.style.marginLeft = '-1220px';
		this.className = '';
		oBtn1.className = 'active';
	}
	// 热门商品每个li的display部分
	var aLi = document.querySelectorAll('.rexiao-list-gt .list-box .list-box-item');
	var aLiText = document.querySelectorAll('.rexiao-list-gt .list-box .list-box-item a .text');
	var aLiPrice = document.querySelectorAll('.rexiao-list-gt .list-box .list-box-item a .price');
	var aLiMiaoShu = document.querySelectorAll('.rexiao-list-gt .list-box .list-box-item a .miaoshu');
	var aLiXiangQing = document.querySelectorAll('.rexiao-list-gt .list-box .list-box-item a .xiangqing');
	var oLiBtn = document.querySelector('.rexiao-list-gt .list-box .list-box-item a .bg-gou');
	var oLiWan = document.querySelector('.rexiao-list-gt .list-box .list-box-item a .bg-wan');
	// console.log(aLi);
	// console.log(aLiText);
	// console.log(aLiPrice);
	// console.log(aLiMiaoShu);
	// console.log(aLiXiangQing);
	// console.log(oLiBtn);
	// console.log(oLiWan);

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].onmouseenter = function(){
			aLiText[this.index].style.display = 'none';
			aLiPrice[this.index].style.display = 'none';
			aLiMiaoShu[this.index].style.display = 'block';
			aLiXiangQing[this.index].style.display = 'inline-block';
			if (this.index == 2) {
				// console.log('aa');
				oLiBtn.style.display = 'inline-block';
			}else if (this.index == 3) {
				// console.log('bb');
				oLiWan.style.display = 'inline-block';
			}	
		}
		aLi[i].onmouseleave = function(){
			aLiText[this.index].style.display = 'block';
			aLiPrice[this.index].style.display = 'block';
			aLiMiaoShu[this.index].style.display = 'none';
			aLiXiangQing[this.index].style.display = 'none';
			oLiBtn.style.display = 'none';
			oLiWan.style.display = 'none';
		}
		
	}

	// 热门商品选项卡部分
	function Tab(listSelector,contentSelector){
		// 1.罗列属性
		this.aBtnLi = document.querySelectorAll(listSelector);
		this.aImgLi = document.querySelectorAll(contentSelector);
		// 2.绑定事件
		this.bindEvent();
	}
	Tab.prototype.bindEvent = function(){
		var _this = this;
		for (var i = 0; i < this.aBtnLi.length; i++) {
			this.aBtnLi[i].index = i;
			this.aBtnLi[i].onmouseenter = function(){
				_this.fnMouseenter(this);
			}
		}
	}
	Tab.prototype.fnMouseenter = function(aBtnLi){
		// console.log(this);
		for (var i = 0; i < this.aBtnLi.length; i++) {
			this.aBtnLi[i].className = '';
			this.aImgLi[i].style.zIndex = '0';
			// console.log(this.aBtnLi[i]);
		}
		aBtnLi.className = 'active';
		this.aImgLi[aBtnLi.index].style.zIndex = '99';
	}
	// 热门商品选项卡 按钮和图片
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(1) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(1) a .image li');
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(2) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(2) a .image li');
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(3) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(3) a .image li');
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(4) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(4) a .image li');
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(5) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(5) a .image li');
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(6) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(6) a .image li');
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(7) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(7) a .image li');
	new Tab('.rexiao-list-gt .list-box .list-box-item:nth-child(8) a .btn li','.rexiao-list-gt .list-box .list-box-item:nth-child(8) a .image li');
	
	// 中心内容选项卡  按钮和图片
	// 新品首发
	new Tab('.xinpin-box .gt-list ul .gt-list-item:nth-child(2) .link .list-btn li','.xinpin-box .gt-list ul .gt-list-item:nth-child(2) .link .list-image li');
	new Tab('.xinpin-box .gt-list ul .gt-list-item:nth-child(3) .link .list-btn li','.xinpin-box .gt-list ul .gt-list-item:nth-child(3) .link .list-image li');
	// 坚果手机系列
	new Tab('.jianguo-box .gt-list ul .gt-list-item:nth-child(2) .link .list-btn li','.jianguo-box .gt-list ul .gt-list-item:nth-child(2) .link .list-image li');
	new Tab('.jianguo-box .gt-list ul .gt-list-item:nth-child(3) .link .list-btn li','.jianguo-box .gt-list ul .gt-list-item:nth-child(3) .link .list-image li');
	// 官方精选配件
	new Tab('.guanfang-box .gt-list ul .gt-list-item:nth-child(2) .link .list-btn li','.guanfang-box .gt-list ul .gt-list-item:nth-child(2) .link .list-image li');
	new Tab('.guanfang-box .gt-list ul .gt-list-item:nth-child(3) .link .list-btn li','.guanfang-box .gt-list ul .gt-list-item:nth-child(3) .link .list-image li');
	new Tab('.jinghuaqi-box .gt-list ul .gt-list-item:nth-child(5) .link .list-btn li','.jinghuaqi-box .gt-list ul .gt-list-item:nth-child(5) .link .list-image li');
	// 净化器及配件
	new Tab('.jinghuaqi-box .gt-list ul .gt-list-item:nth-child(5) .link .list-btn li','.jinghuaqi-box .gt-list ul .gt-list-item:nth-child(5) .link .list-image li');
	// 品牌周边
	new Tab('.zhoubian-box .gt-list ul .gt-list-item:nth-child(2) .link .list-btn li','.zhoubian-box .gt-list ul .gt-list-item:nth-child(2) .link .list-image li');
	new Tab('.zhoubian-box .gt-list ul .gt-list-item:nth-child(3) .link .list-btn li','.zhoubian-box .gt-list ul .gt-list-item:nth-child(3) .link .list-image li');
	new Tab('.zhoubian-box .gt-list ul .gt-list-item:nth-child(4) .link .list-btn li','.zhoubian-box .gt-list ul .gt-list-item:nth-child(4) .link .list-image li');
	new Tab('.zhoubian-box .gt-list ul .gt-list-item:nth-child(5) .link .list-btn li','.zhoubian-box .gt-list ul .gt-list-item:nth-child(5) .link .list-image li');
	new Tab('.zhoubian-box .gt-list ul .gt-list-item:nth-child(6) .link .list-btn li','.zhoubian-box .gt-list ul .gt-list-item:nth-child(6) .link .list-image li');
	new Tab('.zhoubian-box .gt-list ul .gt-list-item:nth-child(7) .link .list-btn li','.zhoubian-box .gt-list ul .gt-list-item:nth-child(7) .link .list-image li');
	// 品牌精选
	new Tab('.jingxuan-box .gt-list ul .gt-list-item:nth-child(2) .link .list-btn li','.jingxuan-box .gt-list ul .gt-list-item:nth-child(2) .link .list-image li');
	
	// 中心内容选项卡 按钮和图片
})();

// 中心内容js
(function(){
	var oPinZhiBtn = document.querySelector('.jingxuan-box .rexiao-top-gt .link .pinzhi');
	var oZhinengBtn = document.querySelector('.jingxuan-box .rexiao-top-gt .link .zhineng');
	var oPinZhiBox = document.querySelector('.jingxuan-box .gt-list ul:nth-child(1)');
	var oZhinengBox = document.querySelector('.jingxuan-box .gt-list ul:nth-child(2)');
	// console.log(oZhinengBtn);
	// console.log(oPinZhiBtn);
	oZhinengBtn.onmouseenter = function(){
		oPinZhiBox.style.marginLeft = '-1220px';
		oZhinengBtn.className = 'zhineng active';
	}
	oPinZhiBtn.onmouseenter = function(){
		oPinZhiBox.style.marginLeft = '0px';
		oZhinengBtn.className = 'zhineng';
	}
})();

// 底部锤子应用js
(function(){
	var oFootBox = document.querySelector('.foot .foot-nav .right-nav');
	var oFootBtn = document.querySelector('.foot .foot-nav .right-nav .link i');
	var oFootYing = document.querySelector('.foot .foot-nav .right-nav .ying');
	var oFootZhong = document.querySelector('.foot .foot-nav .right-nav .link');
	// console.log(oFootBox);
	// console.log(oBtn);
	var isShow = false;
	oFootBox.onclick = function(){
		if (!isShow) {
			oFootBox.className = 'right-nav active';
			oFootBtn.style.transform = 'rotate(180deg)';
			oFootYing.style.visibility = 'visible';
			oFootYing.style.opacity = '1';
			oFootZhong.className = 'link active';
			isShow = true;
		}else{
			if (isShow) {
				oFootBox.className = 'right-nav';
				oFootBtn.style.transform = 'rotate(0deg)';
				oFootYing.style.visibility = 'hidden';
				oFootYing.style.opacity = '0';
				oFootZhong.className = 'link';
				isShow = false;
			}
		}
		
	}
})();