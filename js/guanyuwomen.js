  // 第一个文件
$(function () {
  $(window).scroll(function(){
    //鼠标滚动，固定导航栏显示
    if($(window).scrollTop()>100){
      $('.siteNav').addClass('fixed');
    }else{
      $('.siteNav').removeClass('fixed');
    }
  });
  //鼠标上移到导航栏
  $('.siteNav .menu-item').mouseenter(function () {
    //在导航栏没有固定的前提下（也就是没有fixed类）
    if(!$('.siteNav').hasClass('fixed')){
      //初始化其他li的二级菜单,让其不显示，鼠标上移到某个li,这个li的二级菜单才显示
      $('.siteNav .menu-item ul').hide();
      //初始化borderTop，让全部的宽度为0
      $('.siteNav .menu-item').stop().animate({
        //上移到li，上面的borderTop变宽
        borderTopWidth:0
      },500);
      //上移到li,此时的二级菜单显示
      $(this).find('ul').show();
      //上移到li,borderTop的宽度变大
      $(this).stop().animate({
        borderTopWidth:4
      },500)
    }
  });
  //鼠标离开事件
  $('.siteNav').mouseleave(function () {
    //鼠标离开某个li,这个li的borderTop恢复为0，二级菜单隐藏
    $('.siteNav .menu-item').stop().animate({
      borderTopWidth:0
    },500)
    $('.siteNav .menu-item ul').hide();
  });

})

// 第二个文件
$(function () {
  //评分
  var starRating = 0;
  $('.photo span').on('mouseenter',function () {
      var index = $(this).index()+1;
      $(this).prevAll().find('.high').css('z-index',1)
      $(this).find('.high').css('z-index',1)
      $(this).nextAll().find('.high').css('z-index',0)
      $('.starNum').html((index*2).toFixed(1)+'分')
  })
  $('.photo').on('mouseleave',function () {
      $(this).find('.high').css('z-index',0)
      var count = starRating / 2
      if(count == 5) {
          $('.photo span').find('.high').css('z-index',1);
      } else {
          $('.photo span').eq(count).prevAll().find('.high').css('z-index',1);
      }
      $('.starNum').html(starRating.toFixed(1)+'分')
  })
  $('.photo span').on('click',function () {
      var index = $(this).index()+1;
      $(this).prevAll().find('.high').css('z-index',1)
      $(this).find('.high').css('z-index',1)
      starRating = index*2;
      $('.starNum').html(starRating.toFixed(1)+'分');
      alert('评分：'+(starRating.toFixed(1)+'分'))
  })
  //取消评分
  $('.cancleStar').on('click',function () {
      starRating = 0;
      $('.photo span').find('.high').css('z-index',0);
      $('.starNum').html(starRating.toFixed(1)+'分');
  })
  //确定评分
  $('.sureStar').on('click',function () {
      if(starRating===0) {
          alert('最低一颗星！');
      } else {
         alert('评分：'+(starRating.toFixed(1)+'分'))
      }
  })
})

