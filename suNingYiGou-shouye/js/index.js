// 苏宁易购js

// 顶部导航隐藏图片
(function(){
	var oOff = document.querySelector('.dingbu .btn-off');
	var oOpen = document.querySelector('.top-nav .btn-open');
	var oImg = document.querySelector('.dingbu');
	// console.log(oOff);
	// console.log(oOpen);
	oOpen.onclick = function(){
		oImg.style.display = 'block';
		this.style.display = 'none';
		oOff.style.display = 'block';
	}
	oOff.onclick = function(){
		oImg.style.display = 'none';
		oOpen.style.display = 'block';
	}
})();