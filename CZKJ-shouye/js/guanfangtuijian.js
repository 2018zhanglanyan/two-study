// 张燕官方推荐页面的js

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

//搜索弹框js
(function(){
	var oTxt = document.getElementById('txt');
	var oRight = document.getElementById('rightSousuo');
	var oList = document.getElementById('sousuoList');
	oTxt.onclick = function(ev){
		event.stopPropagation(window);
		this.placeholder = '请输入搜索的商品';
		oRight.style.display = 'none';
		oList.style.display = 'block';
	}
	window.onclick = function(){
		oTxt.placeholder = '';
		oRight.style.display = 'block';
		oList.style.display = 'none';
	}
})();

// 导航下拉列表js
(function(){
	var aListLi = document.querySelectorAll('.list-nav .list li');
	var aListContentBox = document.querySelector('.list-nav-content');
	var aListContentBoxHtml = document.querySelector('.list-nav-content .container');
	var timer = 0;
	// console.log(aListContentBox);
	// console.log(aListLi);
	for (var i = 0; i < aListLi.length-3; i++) {
		aListLi[i].index = i;
		aListLi[i].onmouseenter = function(){
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

// 中心内容选项卡js
(function(){
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
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(5) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(5) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(6) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(6) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(10) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(10) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(16) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(16) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(19) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(19) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(20) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(20) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(21) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(21) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(22) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(22) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(23) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(23) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(24) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(24) .list-image li');
	new Tab('.content-box .gt-list ul .gt-list-item:nth-child(25) .link .list-btn li','.content-box .gt-list ul .gt-list-item:nth-child(25) .list-image li');
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