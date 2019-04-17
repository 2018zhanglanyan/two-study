// 小米首页js部分

handleGouWuKuang();// 购物车下拉框
handleNavXiaLa();// 顶部导航下拉列表
handleJiaDian();//家电列表
handleCarouwsel()//轮播图
handleList();//轮播列表

// 处理购物车下拉框
function handleGouWuKuang(){
	var oGouwu = document.getElementById('gouwu');
	var oGouWuKuang = document.querySelector('.box .gouwu .gouwukuang');
	var oLoading = document.getElementById('box');
	var oTxt = document.querySelector('.box .gouwu .gouwukuang p');
	// console.log(oGouwu);
	// console.log(oGouWuKuang);
	oGouwu.onmouseenter = function(){
		// oGouWuKuang.style.height = '100px';
		oLoading.style.display = 'block';
		animate(oGouWuKuang,{height:100},true,function(){
			oLoading.style.display = 'none';
			oTxt.style.display = 'block';
		});
	}
	oGouwu.onmouseleave = function(){
		// oGouWuKuang.style.height = '0px';
		animate(oGouWuKuang,{height:0},true);
		oLoading.style.display = 'none';
		oTxt.style.display = 'none';
	}
};
// 处理顶部导航下拉列表
function handleNavXiaLa(){
	var oNavXiaLa = document.querySelector('.title-nav .nav-content');
	var oNavContainer = oNavXiaLa.querySelector('.container');
	var aLi = document.querySelectorAll('.title-nav .title-nav-item ul li');
	// console.log(oNavXiaLa);
	// console.log(aLi);
	var timer = 0;
	for (var i = 0; i < aLi.length-2; i++) {
		aLi[i].index = i;
		aLi[i].onmouseenter = function(){
			// oNavXiaLa.style.height = '230px';
			clearTimeout(timer);
			oNavXiaLa.style.borderTop = '1px solid #ccc';
			animate(oNavXiaLa,{height:230},true,function(){
				oNavXiaLa.style.overflow = 'visible';
			});
			loadData(this.index);
		}
		aLi[i].onmouseleave = function(){
			// oNavXiaLa.style.height = '0px';
			hideNav();
		}
		
	}
	oNavXiaLa.onmouseenter = function(){
		clearTimeout(timer);
	}
	oNavXiaLa.onmouseleave = function(){	
		hideNav();
	}

	function hideNav(){
		timer = setTimeout(function(){
			oNavXiaLa.style.overflow = 'hidden';
			animate(oNavXiaLa,{height:0},true,function(){
				oNavXiaLa.style.borderTop = '';
			});
		},500)
	}

	function loadData(index){
		// console.log(index);
		var data = aNavItem[index];
		// console.log(data);
		var html = '<ul>';
		for (var i = 0; i < data.length; i++) {
			html += '<li>';	
			html += 	'<div class="image">';
			html += 		'<a href="'+data[i].url+'">';
			html += 			'<img src="'+data[i].img+'">';
			html += 		'</a>';
			html += 	'</div>';
			html += 	'<a href="#">'+data[i].name+'</a>';
			html += 	'<p>'+data[i].price+'元起</p>';
			if (data[i].tag) {
				html += 	'<div class="xinpin">'+data[i].tag+'</div>';
			}
			html += '</li>';
		}
		html += '</ul>';
		oNavContainer.innerHTML = html;
	}
};
//处理轮播图
function handleCarouwsel(){
	new Carousel({
		id:'title-carousel',
		aImg:['images/lunbo1.jpg','images/lunbo2.jpg','images/lunbo3.jpg','images/lunbo4.jpg','images/lunbo5.jpg'],
		width:1226,
		height:460,
		playDuration:3000
	});
}
//处理轮播列表
function handleList(){
	var aListTitle = document.querySelectorAll('.carousel-shangou-box .title-box .title-list .title-list-item');
	var oListTitleContent = document.querySelector('.carousel-shangou-box .title-box .title-content');
	var oTitle = document.querySelector('.carousel-shangou-box .title-box .title');
	// console.log(oListTitle);
	// console.log(oListTitleContent);
	for (var i = 0; i < aListTitle.length; i++) {
		aListTitle[i].index = i;
		aListTitle[i].onmouseenter = function(){
			for (var j = 0; j < aListTitle.length; j++) {
				aListTitle[j].className = 'title-list-item';
			}
			oListTitleContent.style.display = 'block';
			this.className = 'title-list-item active';
			//加载数据
			loadData(this.index);
		}
	}
	oTitle.onmouseleave = function(){
		oListTitleContent.style.display = 'none';
		for (var j = 0; j < aListTitle.length; j++) {
			aListTitle[j].className = 'title-list-item';
		}
	}

	function loadData(index){
		var data = aListItem[index];
		// console.log(data);
		var html = '<ul>';
		for (var i = 0; i < data.length; i++) {
			html += '<li>';
			html += ' <a href="'+data[i].url+'">';
			html += '	<img src="'+data[i].img+'">';
			html += '	<span>'+data[i].name+'</span>';
			html += ' </a>';
			html += '</li>';
		}
		html += '</ul>';

		oListTitleContent.innerHTML = html;
		// console.log(oListTitleContent.innerHTML);
	} 
}
//处理家电
function handleJiaDian(){
	var aJiaDianItem = document.querySelectorAll('.jiadian-content .shangou-title .remen-gt ul li');
	var oJiaDianBox = document.querySelectorAll('.jiadian-content .shouji-box .shouji-chanpin');
	// console.log(aJiaDianItem);
	console.log(oJiaDianBox);
	for (var i = 0; i < aJiaDianItem.length; i++) {
		aJiaDianItem[i].index = i;
		aJiaDianItem[i].onmouseenter = function(){
			for (var j = 0; j < aJiaDianItem.length; j++) {
				aJiaDianItem[j].className = '';
			}
			this.className = 'active';
			loadData(this.index);
		}
	}
	function loadData(index){
		var data = aJiaDian[index];
		console.log(data);
		var html = '<ul>';
		for (var i = 0; i < data.length; i++) {
			html += '<li>';
			html += '	<a href="'+data[i].url+'" class="link">';
			html += '		<img src="'+data[i].img+'">';
			html += '		<p>'+data[i].name+'</p>';
			html += '		<p>'+data[i].desc+'</p>';
			html += '		<p>';
			html += '			<span>'+data[i].price+'</span>元';
			html += '			<del>'+data[i].del+'</del>';
			html += '		</p>';
			if (data[i].tag) {
				html += '	<div class="new">'+data[i].tag+'</div>';
			}
			html += '	</a>';
			html += '</li>';
		}
		html += '</ul>';
		oJiaDianBox.innerHTML = html;
		console.log(oJiaDianBox.innerHTML);
	}
}