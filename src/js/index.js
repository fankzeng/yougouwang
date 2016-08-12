$(function(){
	
	//head_nav的首尔站鼠标接触后变英文
	$('.shouer').on('mouseenter',function(){
		$(this).html('seoul station');
	}).on('mouseleave',function(){
		$(this).html('首尔站');
	})
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


	// 树形菜单鼠标悬停出现二级菜单
	var $sortMenu = $('.sort_menu');
	$sortMenu.on('mouseenter',function(){
		var menu_index = $(this).index();
		$('.secondMenu').each(function(idx,ele){
			if(menu_index==idx){
				$(this).show().siblings('.secondMenu').hide();
			}
		})
	}).on('mouseleave',function(){
		$('.secondMenu').each(function(idx,ele){
			$(this).hide();
		})
	})

	/***********************banner轮播图***********************/
	var $imgbox = $('.imgbox');
	var $li = $('.banbnt').children('li');
	var index=0;
	lunbo();
	var timer = setInterval(sport,3000);
	$imgbox.on('mouseenter',function(){
		clearInterval(timer);
	}).on('mouseleave',function(){
		timer = setInterval(sport,3000);
	})
	//给导航栏右下角的标签添加点击事件
	$li.on('mouseenter',function(){
		clearInterval(timer);
	}).on('mouseleave',function(){
		timer = setInterval(sport,3000);
	})

	$li.each(function(idx,ele){
		$(this).on('click',function(){
			index = idx;
			lunbo();
		})
	})
    //轮播计数器的生成
	function sport(){
		index++;
		if(index>$imgbox.length-1){
			index=0;
		}
		lunbo();
	}
    //轮播运动
	function lunbo(){
		$imgbox.each(function(idx,ele){
			if(index==idx){
				$(this).show().siblings('div').hide();
			}
		})

		$li.each(function(idx,ele){
			if(index==idx){
				$(this).css('background','#f00').siblings().css('background','#000');
			}
		})
	}

	/********************特卖专区的tab菜单鼠标悬停**********************/
	var $tabMenu = $('.tab_menu');
	$tabMenu.on('mouseenter','li',function(){
		$(this).addClass('li_tab').siblings().removeClass('li_tab');
		var index = $(this).index();
		var $tmlist = $('.tmlist');
		$tmlist.each(function(idx,ele){
			if(idx==index){
				$(this).show().siblings('.tmlist').hide();
			}
		})
	})


	/****************右边竖型导航栏的位置*******************/
	var $rightNav = $('right_nav');
	$(window).scroll(function(){
		var $scrollTop = $(window).scrollTop();
		var navtop = document.getElementsByClassName('right_nav')[0];
		console.log($scrollTop);
		if($scrollTop>265){
			/*$rightNav.offset({top:$scrollTop})
			var navtop = $rightNav.offset().top;
			console.log(navtop)*/
			navtop.style.top = $scrollTop+15+'px';
		}else{
			navtop.style.top = 265+'px';
		}
	})

	$rightNav.on('click',function(){
		$(window).scrollTop() = 0;
	})
})