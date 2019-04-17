// 轮播图封装函数
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