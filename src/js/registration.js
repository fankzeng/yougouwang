
$(function(){
	safeCode = ['d8dw','7b9f','n5cc','amkw','b9am','ds83',
	            '6cvk','dw3e','scd7','xbd2','f784','ms3a']
	codeImg = ['../img/imageCaptcha1.png','../img/imageCaptcha2.png','../img/imageCaptcha3.png',
	           '../img/imageCaptcha4.png','../img/imageCaptcha5.png','../img/imageCaptcha6.png',
	           '../img/imageCaptcha7.png','../img/imageCaptcha8.png','../img/imageCaptcha9.png',
	           '../img/imageCaptcha10.png','../img/imageCaptcha11.png','../img/imageCaptcha12.png']
	/*注册账号的方式选择切换*/
	var $methods = $('.methods');
	var $acctselect = $('.acctselect i');

	$methods.each(function(){
		$(this).children('span').on('click',function(){
			$('.acctselect').show();
		})
	})
	//选择方式
	$acctselect.on('click',function(){
		var index = $(this).index();
		$methods.each(function(idx,ele){
			if(index == idx){
				$(this).show().siblings('.methods').hide();
			}
			if(index == 1){
				$('.msgCode').hide();
			}else{
				$('.msgCode').show();
			}
		})
		$('.acctselect').hide();
	})


	/***********************输入框验证**************************/
	// 账号验证
	// 1、手机号方式
	var $phoneInput = $('.phone').find('input');
	var $accountTip = $('.account').find('em');
	var $accountright = $('.account').find('strong');
	var isCurrent = true;
	
	function phone(){
		if($phoneInput.val()==''){
			$accountTip.css({'display':'block'}).html('请输入手机号码');
	        $('.account').css({'border':'1px solid #f00'});
	        $accountright.hide();
	        isCurrent = false;
		}else if(!/^1\d{10}$/.test($phoneInput.val())){
			$accountTip.css({'display':'block'}).html('格式错误');
	        $('.account').css({'border':'1px solid #f00'});
	        $accountright.hide();
	        isCurrent = false;
		}else{
			$accountTip.css({'display':'none'});
			$accountright.show();
			$('.account').css({'border':'1px solid #E3E2E2'});
			isCurrent = true;
		}
	}

	$phoneInput.blur(function(){
		phone();
	})

	//2、邮箱方式
	var $emailInput = $('.email').find('input');
	var $accountTip = $('.account').find('em');
	function email(){
		if($emailInput.val()==''){
			$accountTip.css({'display':'block'}).html('请输入邮箱');
	        $('.account').css({'border':'1px solid #f00'});
	        $accountright.hide();	
	        isCurrent = false;	
	    }else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($emailInput.val())){
	    	$accountTip.css({'display':'block'}).html('格式错误');
	        $('.account').css({'border':'1px solid #f00'});
	        $accountright.hide();
	        isCurrent = false;
	    }else{
			$accountTip.css({'display':'none'});
			$accountright.show();
			$('.account').css({'border':'1px solid #E3E2E2'});
			isCurrent = true;
		}
	}
	$emailInput.blur(function(){
		email();
	})


	/*=====================验证码验证====================*/
	
	
	var $inputCode = $('.inputCode').find('input');
	var $veriCodeTip = $('.veriCode').find('em');
	var $codeImg = $('.codeImg').find('img');
	var $codeRight =$('.codeRight');
	var imgIndex =parseInt(Math.random()*11+1);
	$codeImg.attr('src',codeImg[imgIndex]);
	//点击验证码图片切换验证码
	$codeImg.on('click',function(){
		imgIndex = parseInt(Math.random()*11+1);
		$codeImg.attr('src',codeImg[imgIndex]);

	});

	//验证
	
	function imgCode(){
		if($inputCode.val()==''){      //为空时给出提示
			$veriCodeTip.css({'display':'block'}).html('请输入验证码');
			$('.inputCode').css({'border':'1px solid #f00'});
			isCurrent = false;

		}else if($inputCode.val() == safeCode[imgIndex]){
			$('.inputCode').css({'border':'1px solid #E3E2E2'});
	        $codeRight.show();
	        $veriCodeTip.css({'display':'none'})
	        isCurrent = true;
		}else{
			$codeRight.hide();
			$veriCodeTip.css({'display':'block'}).html('输入错误');
			$('.inputCode').css({'border':'1px solid #f00'});
			isCurrent = false;
		}

	}



	$inputCode.blur(function(){
		imgCode();
	})
	//短信验证码
	var $inputmsgCode = $('.inputmsgCode').find('input');
	var $msgCodeTip = $('.msgCode').find('em');
	function msgCode(){
		if($inputmsgCode.val()==''){
			$msgCodeTip.css({'display':'block'});
			$('.inputmsgCode').css({'border':'1px solid #f00'});
			isCurrent = false;
		}else{
			$msgCodeTip.css({'display':'none'});
			$('.inputmsgCode').css({'border':'1px solid #E3E2E2'});
			isCurrent = true;
		}
	}

	$inputmsgCode.blur(function(){
		msgCode();
	})
    

	//密码
	var $passwd = $('.passwd').find('input');
	var $passwdTip = $('.passwd').find('em');
	var $passwdright = $('.passwd').find('strong');
	function passwd(){	
		if($passwd.val()==''){
			$passwdTip.css({'display':'block'}).html('请输入密码');
			$('.passwd').css({'border':'1px solid #f00'});
			$passwdright.hide();
			$('.securityTip').hide();
			isCurrent = false;
		}else if(!/\S{5,24}/.test($passwd.val()) && $passwd.val()!= ''){
			$passwdTip.css({'display':'block'}).html('密码应6-25位之间');
	        $('.passwd').css({'border':'1px solid #f00'});
	        $passwdright.hide();
	        isCurrent = false;
		}else{
			$passwdTip.css({'display':'none'});
			$passwdright.show();
			$('.passwd').css({'border':'1px solid #E3E2E2'});
			isCurrent = true;
		}
	}
	//密码设置安全性
	function security(){

		if(/\S{0,9}/.test($passwd.val())){      //低
			$('.securityTip').show();
			$('.low').css('background','#E60011').siblings('b').css('background','#EFEFEF');
		}if(/\S{10,17}/.test($passwd.val())){     //中
			$('.securityTip').show();
			$('.mid').css('background','#FEBD04').siblings('b').css('background','#EFEFEF');
		}if(/\S{18,24}/.test($passwd.val())){       //高
			$('.securityTip').show();
			$('.hig').css('background','#00f').siblings('b').css('background','#EFEFEF');
		}if($passwd.val()==''){              //为输入则隐藏
			$('.securityTip').hide();
			//clearInterval(timer);
		}
	}

	$passwd.blur(function(){
		passwd();
	})	

	$passwd.focus(function(){
		$(window).keyup(function(){
			security();
		})
	})	
		
	//确认密码
	var $checkPasswd = $('.checkPasswd').find('input');
	var $checkPasswdTip = $('.checkPasswd').find('em');
	var $checkpasswdright = $('.checkPasswd').find('strong');
	
	function checkPasswd(){
		if($checkPasswd.val()==''){
			$checkPasswdTip.css({'display':'block'}).html('请输入确认密码');
			$('.checkPasswd').css({'border':'1px solid #f00'});
			$checkpasswdright.hide();
			isCurrent = false;
		}else if(!/\S{5,24}/.test($checkPasswd.val()) && $checkPasswd.val()!= ''){
			$checkPasswdTip.css({'display':'block'}).html('密码应6-25位之间');
	        $('.checkPasswd').css({'border':'1px solid #f00'});
	        $checkpasswdright.hide();
	        isCurrent = false;
		}else if($passwd.val()!==$checkPasswd.val() && $checkPasswd.val()!=''){
			$checkPasswdTip.css({'display':'block'}).html('两次密码输入不一致');
			$('.checkPasswd').css({'border':'1px solid #f00'});
			$checkpasswdright.hide();
			isCurrent = false;
		}else{                  //通过
			$checkPasswdTip.css({'display':'none'});
			$checkpasswdright.show();
			$('.checkPasswd').css({'border':'1px solid #E3E2E2'});
			isCurrent = true;
		}
	}
	$checkPasswd.blur(function(){
		checkPasswd();
	})

	
	$('.confirm').on('click',function(){
		email();
		phone();
		imgCode();
		msgCode();
		passwd();
		security();
		checkPasswd();
		var $isAgree = $('.isAgree');
		if($isAgree.is(':checked')){
			console.log(isCurrent)
			if(isCurrent){
				var $accountVal = $phoneInput.val()||$emailInput.val();
				var $passwordVal = $passwd.val();
				var master = {
								"username":$accountVal,
								"password":$passwordVal,
								"islogin":0
							};
				var changeStr = JSON.stringify(master); //设置值
				var keyStr = 'denglu'; //设置键
				document.cookie = keyStr +"="+changeStr+";path=/;";
				console.log(document.cookie);
				alert("注册成功");
				location.href = 'login.html';
			}else{
				return false;
			}
			
		}else{
			alert('请阅读交易条款');
			return false;
		}

	})
})