$(function(){
	var $allSelect = $('.all_select');
	var $checkbox = $(':checkbox');

	/*=================从cookie中取得数据======================*/
	function getCookie(){
		var _cookie = document.cookie.split('; ');
		if(_cookie != ''){
			$.each(_cookie,function(idx,val){
				var info = JSON.parse(val.split('=')[1]);
				//console.log(info);       //值
				//console.log(val.split('=')[0])  //键
				var $carGoods = $('.prod_list').clone().appendTo('.car_table');
				$('.prod_name').children('a').html(info.goodsName);
				$('.color').html(info.goodsColor);
				var $goodsSize = $('.size').html(info.goodsSize);
				var $goodsPrice = $('.each_price').html(info.goodsPrice);
				var $number = $('.number').html(info.goodsCount);
				$('.subtotal').html(info.goodsPrice*info.goodsCount);
			});
		}
	}

	getCookie();


	/*========全选功能========*/
	$allSelect.click(function(){
		//先获取#all的选择状态
		$(this).toggleClass('selected');
		$checkbox.prop('checked',$(this).hasClass('selected'));
		checkAll();
	});


	$checkbox.on('click',function(){
		checkAll();
		totalprice();
	})

    
	function checkAll(){
		var $checked = $checkbox.filter(':checked');
		$allSelect.prop('checked',$checkbox.length == $checked.length);
	}


	/*========删除功能=========*/
	var $delete = $('.delete');
	$delete.on('click',function(){
		$(this).parents('.prod_list').remove();
		console.log($(this).parents('.prod_list').length)
		if($('.car_table').find('.prod_list').length == 0){
			$('.shopcar_cont').hide();
			$('.empty_cont').show();
		}

		/*var index = $(this).index();
		// 把过期时间设置成昨天
		var now = new Date();
		now.setDate(now.getDate()-1);

		// 删除cookie
		document.cookie = 'goods' +index+ '=null;expires=' + now;
		getCookie();
		totalprice();*/
	})

	/*=========多删除功能========*/
	var $allRemove = $('.all_remove');
	$allRemove.on('click',function(){
		var $checked = $checkbox.filter(':checked');
		console.log($checked)
		$checked.parents('.prod_list').hide();
		totalprice();
	})

	/*==========清空购物车===========*/
	var $clearCar = $('.clearCar');
	$clearCar.on('click',function(){
		$('.shopcar_cont').hide();
		$('.empty_cont').show();
	})

	/*===========购物车商品数量更改=============*/
	var $subnum = $('.subnum');
	var $number = $('.number');
	var $addnum = $('.addnum');
	var index = 1;
	//减少
	$subnum.on('click',function(){
		index--;
		if(index<1){
			index=1;
		}
		$(this).next().html(index);
		//随着数量减少价钱
		var $subtotal = $(this).parent().siblings('.subtotal');
		var $each_price = $(this).parent().siblings('.each_price');
		if($subtotal.html()<$each_price.html()){
			$subtotal.html($each_price.html()); 
		}
		$subtotal.html($each_price.html()*index);
		totalprice();
	})

	//添加
	$addnum.on('click',function(){
		index++;
		$(this).prev().html(index);
		//随着数量增加价钱
		var $subtotal = $(this).parent().siblings('.subtotal');
		var $each_price = $(this).parent().siblings('.each_price');
		$subtotal.html($each_price.html()*index);
		totalprice();
	})

	//得出价钱总计
	function totalprice(){
		var $moneyNum = 0;
		var $totalPrice = $('.total_price');
		var $select_prod = $('.car_table').find('.select:checked');
		$select_prod.each(function(){
			$moneyNum = $moneyNum + parseInt($(this).siblings('.subtotal').html());
			console.log('$moneyNum')
		})
		
		$totalPrice.html($moneyNum);
	}

	//显示所有商品总价
	totalprice();
})