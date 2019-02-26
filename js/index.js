//旋转木马
(function () {
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

// 3.给左箭头(#arrLeft)绑定点击事件，点击一下时，让中间图片的左侧的一张图片在中间位置显示
//3.1创建一个全局变量的数组，用来存储内容区(div.slide)中li的类名
  var classArr = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];

//3.2封装函数，实现赋值类名操作

  function renameClass() {
    //3.3遍历数组，将数组中的每一个值赋值给内容区对应位置的li的className
    classArr.forEach(function (item, index) {
      $('.slide ul li')[index].className = item;
    });
  };
  $('#arrLeft').click(function () {
    //3.4点击时，将数组中的第一个值取出，添加到尾部
    var firstClassName = classArr.shift();
    classArr.push(firstClassName);
    //3.3调用renameClass函数，实现赋值操作
    renameClass();
    //3.4更换.banner的背景
    change();
  });
//4.同理，给右箭头(#arrRight)绑定点击事件,点击一下时，让中间图片右侧的一张图片在中间显示
  $('#arrRight').click(function () {
    //4.1点击时，将数组中的最后一个值取出，添加到头部
    var lastClassName = classArr.pop();
    classArr.unshift(lastClassName);
    //4.2调用renameClass函数，实现赋值操作
    renameClass();
//4.3更换.banner的背景
    change();
  });

  // 设置定时器，自动轮播
  function fn() {
    $('#arrRight').click();
  }

  var timer = setInterval(fn, 2000);
  // 1.鼠标进入div.slide时，通过修改 div.arrow的opacity为1，显示左右箭头
  $('.slide').mouseenter(function () {
    console.log(timer);
    clearInterval(timer);
    $('.arrow', this).css('opacity', 1);
  });

//2.鼠标离开div.slide时，通过修改 div.arrow的opacity为0，隐藏左右箭头
  $('.slide').mouseleave(function () {
    $('.arrow', this).css('opacity', 0);
    timer = setInterval(fn, 2000);
  });

//封装切换.banner背景的函数
  function change() {
    var imgSrc = $('.slide3 img').attr('src');
    $('.rotateBan').css('background-image', 'url(' + imgSrc + ')');
  }
}());

// 过渡条
(function () {
  $(window).scroll(function () {
    // 获取浏览器的卷起高度
    var windowTop = $('html,body').scrollTop();
    // 获取浏览器可视区域的高度
    var windowHeight = $(window).height();

    function showSplit(ele1) {
      // 获取进度条距离文档的高度
      var lineTop = $(ele1).offset().top;
      if (windowHeight + windowTop >= lineTop) {
        $(ele1).stop().animate({
          width: '100%'
        }, 5000, 'linear');
      } else {
        $(ele1).width(0);
      }
    }

    showSplit('.splitLine1 .line');
    showSplit('.splitLine2 .line');
    showSplit('.splitLine3 .line');
  });
}());

// 小吃热推
(function ScrollImgLeft() {
  // 横向滚动实现
  var speed = 10;
  var scroll_begin = document.getElementById("scroll_begin");
  var scroll_end = document.getElementById("scroll_end");
  var scroll_div = document.getElementById("scroll_div");
  scroll_end.innerHTML = scroll_begin.innerHTML;

  function Marquee() {
    if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) {
      scroll_div.scrollLeft -= scroll_begin.offsetWidth;
    }
    else {
      scroll_div.scrollLeft++;
    }
  }

  var MyMar = setInterval(Marquee, speed);
  scroll_div.onmouseover = function () {
    clearInterval(MyMar);
  }
  scroll_div.onmouseout = function () {
    MyMar = setInterval(Marquee, speed);
  }

  // tab栏切换
  function tabChange() {
    var index = $(this).index();
    console.log(index);
    $('#tabContent .main').eq(index).addClass('selected').siblings().removeClass('selected');
  }
  $('.scroll_div #scroll_begin li').mouseenter(tabChange);
  $('.scroll_div #scroll_end li').mouseenter(tabChange);


  $('.cuisine .arrow1 .arrowToP').click(function(){
    $(this).animate({
      'opacity':1
    });
    $('.cuisine .arrow1 .arrowBottom').animate({
      'opacity':0.5
    });
    //第一组图片显示，第二组图片隐藏
    $('.cuisineTop').fadeToggle();
    $('.cuisineBottom').fadeToggle();
  });
  //点击下箭头，此时高亮，另一个箭头透明度降低
  $('.cuisine .arrow1 .arrowBottom').click(function(){
    $(this).animate({
      'opacity':1
    });
    $('.cuisine .arrow1 .arrowToP').animate({
      'opacity':0.5
    });
    //第二组图片显示，第一组图片隐藏
    $('.cuisineTop').fadeToggle();
    $('.cuisineBottom').fadeToggle();
  });
}());
//出游推荐
(function(){
  //地图上盒子定位事件
  $('.mapLeft .box').on('click', function () {
    //获取点击时的index值
    var vid=$(this).index();
    //显示此时的盒子，其他兄弟节点隐藏
    $('.mapRight .tour-item').eq(vid-1).show().siblings().hide();
  });
})()




