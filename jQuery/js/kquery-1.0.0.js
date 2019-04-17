(function(window){
	var kQuery = function(){
		return new kQuery.prototype.init();
	}
	kQuery.prototype = {
		constructor:kQuery,
		init:function(){

		}
	}

	window.kQuery = window.$ = kQuery;
	// window.$ = kQuery;
})(window);