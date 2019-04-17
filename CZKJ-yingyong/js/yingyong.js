// 张燕应用页面js

// 顶部导航购物车js
(function(){
	var oLink = document.getElementById('link');
	var oI = document.querySelector('.top-nav .nav-shop #link i');
	var oTankuang = document.getElementById('tankuang');
	var timer = 0;
	oLink.onmouseenter = function(){
		clearTimeout(timer);
		oTankuang.style.display = 'block';
		oI.style.color = '#999';
	}
	oLink.onmouseleave = function(){
		timer = setTimeout(function(){
			oTankuang.style.display = 'none';
			oI.style.color = '#aaa';
		},300);
	}
	oTankuang.onmouseenter = function(){
		clearTimeout(timer);
		oTankuang.style.display = 'block';
		oI.style.color = '#999';
	}
	oTankuang.onmouseleave = function(){
		timer = setTimeout(function(){
			oTankuang.style.display = 'none';
			oI.style.color = '#aaa';
		},300);
	}
})();

// 轮播图js
(function(){
	var aImg = document.querySelector('.title-box .carousel .carousel-img').children;
	var oBottomBtn = document.querySelector('.title-box .carousel .carousel-btn').children;
	var oCarousel = document.querySelector('.carousel');
	// console.log(aImg);
	// console.log(oCarousel);
	// console.log(oBottomBtn);
	// console.log(oCarousel);
	// 当前图片
	var now = 0;
	var timer = 0;
	// 切换函数
	function tab(){
		for (var i = 0; i < aImg.length; i++) {
			aImg[i].style.zIndex = '0';
			aImg[i].style.opacity = '0';
			oBottomBtn[i].className = '';
		}
		aImg[now].style.zIndex = '99';
		aImg[now].style.opacity = '1';
		oBottomBtn[now].className = 'active';
	}
	// 底部按钮对应图片
	for (var i = 0; i < oBottomBtn.length; i++) {
		oBottomBtn[i].index = i;
		oBottomBtn[i].onclick = function(){
			now = this.index;
			tab();
		}
	}
	// 自动轮播
	timer = setInterval(function(){
		now++;
		if (now>=aImg.length) {
			now = 0;
		}
		tab();
	},3000);
	oCarousel.onmouseover = function(){
		clearInterval(timer);
	}
	oCarousel.onmouseout = function(){
		timer = setInterval(function(){
			now++;
			if (now>=aImg.length) {
				now = 0;
			}
			tab();
		},3000);
	}
})();

// 导航下拉列表js
(function(){
	var oListLi = document.querySelector('.list-nav .list li:last-child');
	var aListContentBox = document.querySelector('.list-nav-content');
	var timer = 0;
	// console.log(aListContentBox);
	// console.log(aListLi);
	oListLi.onmouseenter = function(){
		clearTimeout(timer);
		animate(aListContentBox,{'height':250},true);
	}
	oListLi.onmouseleave = function(){
		timer = setTimeout(function(){
			animate(aListContentBox,{'height':0},true);
		},300);
	}
	aListContentBox.onmouseenter = function(){
		clearTimeout(timer);
		animate(aListContentBox,{'height':250},true);
	}
	aListContentBox.onmouseleave = function(){
		timer = setTimeout(function(){
			animate(aListContentBox,{'height':0},true);
		},300);
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