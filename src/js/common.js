$(function(){

	//获得cookie值，右上角购物车显示数量
	var _cookie = document.cookie.split('; ');
	if(_cookie != ''){
		$.each(_cookie,function(idx,val){
			var info = JSON.parse(val.split('=')[1]);
			//console.log(info);       //值
			//console.log(val.split('=')[0])  //键
	/*		var $carGoods = $('.prod_list').clone().appendTo('.car_table');
			$('.prod_name').children('a').html(info.goodsName);
			$('.color').html(info.goodsColor);
			var $goodsSize = $('.size').html(info.goodsSize);
			var $goodsPrice = $('.each_price').html(info.goodsPrice);*/
			if(info.goodsCount){
				var $number = $('.shopCar').find('em').html('购物车('+info.goodsCount+')件').css('color','#666');
			}
			//$('.subtotal').html(info.goodsPrice*info.goodsCount);
			if(info.islogin){
				$('.enter').find('a').html('您好：'+info.username)
			}
		});
	}
	
	/*=========================导航栏NAV=======================*/
	//手机优购鼠标事件
	$('.phone_download').on('mouseenter',function(){
		$('.download').show();
	}).on('mouseleave',function(){
		$('.download').hide();
	})
	//我的优购鼠标事件
	$('.myshop').on('mouseenter',function(){
		$('.mycollect').show();
	}).on('mouseleave',function(){
		$('.mycollect').hide();
	})
	//公告鼠标事件
	$('.notice').on('mouseenter',function(){
		$('.notcont').show();
	}).on('mouseleave',function(){
		$('.notcont').hide();
	})
	//‘更多’鼠标事件
	$('.more').on('mouseenter',function(){
		$('.morecont').show();
	}).on('mouseleave',function(){
		$('.morecont').hide();
	})

	/*====================优购导购的翻页效果=====================*/
	var $prevBnt = $('.prev_bnt');
	var $nextBnt = $('.next_bnt');
	var $guideBrand = $('.guide_brand');
	var brand_idx = 0;
	$prevBnt.on('click',function(){
		brand_idx--;
		if(brand_idx<0){
			brand_idx = 0;
		}
		$guideBrand.each(function(idx,ele){
			if(brand_idx==idx){
				console.log(brand_idx)
				$(this).show().siblings('.guide_brand').hide();
			}
		})
	})

	$nextBnt.on('click',function(){
		brand_idx++;
		if(brand_idx>$guideBrand.length-1){
			brand_idx = $guideBrand.length-1;
		}
		$guideBrand.each(function(idx,ele){
			if(brand_idx==idx){
				$(this).show().siblings('.guide_brand').hide();
			}
		})
	})

})