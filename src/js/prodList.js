
$(function(){
	var idx = 1;
	$.ajaxSetup({
		type:"POST",
    	url:"http://codeofcyg.duapp.com/goods.php",
    	dataType:"json",
    	data:{"page" : 1
    },
		success:function(data){
				var $ul = $('<ul/>').appendTo('.pic_list');
				var $li = $('<li/>').appendTo($ul);
				var $picDiv = $('<div/>').appendTo($li);
				var $picA = $('<a/>').attr('href','../html/productDetails.html').appendTo($picDiv);
				var $picImg = $('<img/>').attr('src','../img/tm_outdoor3.jpg').appendTo($picA);
				var $msgDiv = $('<div/>').appendTo($li);
				var $msgSpan = $('<span/>').appendTo($msgDiv);
				var $msgA = $('<a/>').html(data[0].name).attr({'href':'../html/productDetails.html','target':'_blank'}).appendTo($msgSpan);
				var $msgP = $('<p/>').appendTo($msgDiv);
				var $msgEm = $('<em/>').html('￥<i>'+data[0].price+'</i>').appendTo($msgP);
				var $msgDel = $('<del/>').html('￥'+data[0].price).appendTo($msgP);
		}

	})
	$.ajax();
	$('.nextPage').on('click',function(){
		$('.pic_list').empty();
		$.ajax({
			data:{'page':++idx}
		});
		$('.nowPage').html(idx);
	})

	$('.prevPage').on('click',function(){
		idx--
		if(idx<1){
			idx= 1;
		}
		$('.pic_list').empty();
		$.ajax({
			data:{'page':idx}
			
		});
		$('.nowPage').html(idx);

	})
})

