// 放小米首页js

// 首页导航购物车js
;(function(){
	var oGouwu = document.querySelector('.box .gouwu');
	var oLink = document.querySelector('.box .gouwu .link');
	var oLoading = document.querySelector('.loading');
	// console.log(oGouwu);
	oGouwu.onmouseover = function(){
		this.style.backgroundColor = '#fff';
		oLink.style.color = '#ff6700';
		oLoading.style.height = '98px';
	}
	oGouwu.onmouseout = function(){
		this.style.backgroundColor = '#424242';
		oLink.style.color = '#b0b0b0';
		oLoading.style.height = '0px';
	}
})();