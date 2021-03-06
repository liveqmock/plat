$(function(){
	//推荐服务列表
	$('#recommend-tab').find('li').eq(0).addClass('current');
	$('#recommend-tab').find('li:first').addClass('first');
	$('.recommend-box').find('.recommend-list').eq(0).show();
	$('#recommend-tab').find('li').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
		var actives = $('#recommend-tab').find('li').index(this);
		$('.recommend-box').children().eq(actives).show().siblings().hide();
	});
	//左侧菜单
	$('.mod-cate li').hover(function(){
		$(this).children('.name-wrap').children('.name-column').addClass('on');
		$(this).children('.mod-sub-cate').show();
	},function(){
		$(this).children('.name-wrap').children('.name-column').removeClass('on');
		$(this).children('.mod-sub-cate').hide();
	});
	//商品滚动
	//$('#mycarousel').jcarousel();

	$.ajax({
		url: 'mall/findServiceByMall',
		type: 'post',
		dataType: 'json',
		async: false,
		data:{mallId:mid},
		success: function(data){
			$('.mod-cate').html(data.message);
			/* 左侧菜单 */
			$('.mod-cate li').hover(function(){
				$(this).children('.name-wrap').children('.name-column').addClass('on');
				$(this).children('.mod-sub-cate').show();
			},function(){
				$(this).children('.name-wrap').children('.name-column').removeClass('on');
				$(this).children('.mod-sub-cate').hide();
			});
		},
		failure: function(data){
			console.log(data.message);
		}
	});
})
$(function(){
	var index = 0;
	var picTimer;
	var bannerSlide = $('.dom-banner');
	var bannerPicLen = $('.dom-box li').length;

	/* 添加圆点 */
	var dot = "<p id=\"dotList\" class=\"dom-dots\">";
		for(var i = 0; i < bannerPicLen; i++ ) {
			dot += "<span></span>";
		}
		dot += "</p>";
	bannerSlide.append(dot);

	/* 幻灯延迟动画 */
	showPic(index);
	autoSlide(index);

	/*鼠标滑动方块*/
	$('.dom-dots span').hover(function() {
		clearInterval(picTimer);
		index = $(this).index();
		showPic(index);
	}, function() {
		autoSlide(index);
	});
	/*自动播放*/
	function autoSlide(index) {
		picTimer = setInterval(function(){
			showPic(index);
			index++;
			index = (index == bannerPicLen) ? 0 : index;
		},2000);
	}
	/*动画显示图片*/
	function showPic(index){
		$('.dom-box li').eq(index).animate({"opacity": 1, "z-index": 1}, 1000).siblings('li').animate({"opacity": 0, "z-index": 0}, 1000);
		$('.dom-dots span').eq(index).addClass('current').siblings('span').removeClass('current');
	}
})