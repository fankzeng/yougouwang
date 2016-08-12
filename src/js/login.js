// 账号验证
$(function(){
	
//账号验证
	var isInput = 1;
	var $accountInput = $('.account').find('input');
	var $accountTip = $('.account').find('em');
	
	function account(){
		if($accountInput.val()==''){
			$accountTip.css({'display':'block'});
            $('.account').css({'border':'1px solid #f00'});
            isInput = 0;
		}else{
			$accountTip.css({'display':'none'});
            $('.account').css({'border':'1px solid #E3E2E2'});
            isInput = 1;
		}
	}

	$accountInput.blur(function(){
		account();
	})	

//密码
	var $passwd = $('.passwd').find('input');
	var $passwdTip = $('.passwd').find('em');

	function passwd(){
		if($passwd.val()==''){
			$passwdTip.css({'display':'block'});
			$('.passwd').css({'border':'1px solid #f00'});
			isInput = 0;
		}else{
			$passwdTip.css({'display':'none'});
			$('.passwd').css({'border':'1px solid #E3E2E2'});
			isInput = 1;
		}
	}
		
	$passwd.blur(function(){
		passwd();
	})


	var isPass = false;
	var $accountVal = $accountInput.val();
	var $passwordVal = $passwd.val();
	function getCookie(){
		var _cookie = document.cookie.split('; ');
		if(_cookie != ''){
			$.each(_cookie,function(idx,val){
				var info = JSON.parse(val.split('=')[1]);
				//console.log(info);       //值
				//console.log(val.split('=')[0])  //键
				console.log(info.passwd)
				if($accountInput.val()==info.username && $passwd.val() == info.password){
					isPass = true;
					info.islogin = 1;
					var changeStr = JSON.stringify(info); //设置值
					var keyName = 'denglu'; //设置键
					document.cookie = keyName + "="+changeStr+";path=/;";
				}
			});
		}
	}

	
	//点击登录验证是否全部通过
	$('.login').on("click",function(e){
		account();
  		passwd();
		if(isInput){
			getCookie();
			if(isPass){
				location.href='../index.html';

			}else{
				alert('账号或密码输入错误！')
			}
		}else{
			alert("请输入密码和账号！");
			return false;
		}
	});

})