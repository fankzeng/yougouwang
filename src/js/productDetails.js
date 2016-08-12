$(function(){

// 树形菜单鼠标悬停出现二级菜单
    var $sort = $('.sort');
    var $menuArea = $('.menu_area');
    var $sortMenu = $('.sort_menu');
    $menuArea.on('mouseenter',function(){
    	$('.menu').show();
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
    }).on('mouseleave',function(){
    	$('.menu').hide();
    })
	

/*=======================放大镜效果=============================*/
	var $liImg = $('.pic_list').find('li');     //选择展示列表
	var $liSpan = $('.pic_list').find('span');   //指向三角形
	var $bigPic = $('.bigpic');                  //展示的图片
	var $showBigPic = $('.showBigPic');			 //放大图的显示区域
	var $bigerPic = $showBigPic.find('img');      //放大图
	var $dragPop = $('.dragPop');                 //需放大区域的遮罩层
	var multiple = $showBigPic.width()/$dragPop.width();      //放大区域与遮罩层倍数
	var index;      
	//选择展示列表的鼠标悬停选择需展示的图片
	$liImg.on('mouseenter',function(){
		index = $(this).index();
		if(index>4){
			index = 4;
		}
		$(this).find('img').css('border-color','#ff5000');
		$(this).siblings().find('img').css('border-color','#ddd');
		$(this).find('span').show();
		$(this).siblings().find('span').hide();         
		$bigPic.attr('src','../img/mainpic_0'+(index+1)+'.jpg');
		$bigerPic.attr('src','../img/main_pig_big0'+(index+1)+'.jpg');
	})
	
	//展示图鼠标滑动时放大
	$('.pop').mousemove(function(e){
		$dragPop.css('display','block');
		$showBigPic.css('display','block');
	    //获取坐标的方法
	   	var iX = e.pageX - $(this).offset().left - $dragPop.width()/2,
	   		iY = e.pageY - $(this).offset().top - $dragPop.height()/2,	
	   		MaxX = $(this).width()-$dragPop.width(),
	   		MaxY = $(this).height()-$dragPop.height();
		//放大区域遮罩层防止跑出图片区域		
	   	iX = iX > 0 ? iX : 0;
	   	iX = iX < MaxX ? iX : MaxX;
	   	iY = iY > 0 ? iY : 0;
	   	iY = iY < MaxY ? iY : MaxY;

	   	$dragPop.css({left:iX+'px',top:iY+'px'});	   		//遮罩层定位
	   	//放大区域的放大显示定位
	   	$bigerPic.css({left:-multiple*iX+'px',top:-multiple*iY+'px'});   
	   	//return false;
	}).mouseout(function(){
	   	$dragPop.hide();
		$showBigPic.hide();
	});


    /*===================商品尺码、颜色、数量选择=====================*/
    var $sizeselect = $('.sizeselect');
    var $size = $sizeselect.find('i');
    var $num = $('.num');
    var $subprod = $('.sub');
    var $addprod = $('.add');
    var num = 1;
    var is
    $size.on('click',function(){
    	$(this).css('border-color','#ec0012').siblings('i').css('border-color','#ececec').children('b').hide();
    	$(this).children('b').show();
    })
    //点击商品数量加一
    $addprod.on('click',function(){
    	num++;
    	$num.html(num);
    })
    //点击商品数量减一
    $subprod.on('click',function(){
    	num--;
    	if(num<1)
    	{
    		num=1;
    	}
    	$num.html(num);
    })

   /*==============点击提交到购物车,把商品信息添加到cookie==============*/
   var goodsSize;    //商品尺寸
   var sizeList = $('.sizeselect').find('i');   //尺寸选择
   //获得选择的尺寸
   sizeList.on('click',function(){
		goodsSize = $(this).text();
	})
   function addCookie(){
		var goodsName = $('.prodname').html();     //商品名
		var goodsColor = $('.goodscolor').html();   //商品颜色
		var goodsPrice = $('.eachPrice').html().substring(1);  //单价
		
		//var gTotalPrice = goodsCount*goodsPrice;   //该商品总价钱


		var index = $(this).index();
		var goodsCount = $('.selectnum .num').html();   //数量
		console.log(goodsCount);
		var goods = {
			"goodsName":goodsName,
			"goodsColor":goodsColor,
			"goodsPrice":goodsPrice,
			"goodsCount":goodsCount,
			//"gTotalPrice":gTotalPrice,
			"goodsSize":goodsSize
		};

		if(goodsSize){
			//将商品的属性存入cookie
			var changeStr = JSON.stringify(goods);//设置值
			var keyStr = 'carGoods'+index;//设置键

			// 把过期时间设置成昨天
			var now = new Date();
			now.setDate(now.getDate()+7);

			document.cookie = keyStr+"="+changeStr+ ';expires=' + now + ";path=/;";
			alert('添加成功');
		}else{
			alert('请选择尺码');
			return false;
		}
   }
    
   	//点击'加入购物车按钮'添加cookie
	$('.addcar').on('click',function(e){
		addCookie();
		location.href = 'productDetails.html';
	});

})