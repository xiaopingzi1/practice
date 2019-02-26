//1.让每一张图片依次进入显示
(function (window) {
  var index = 0;
  var time = setInterval(function () {
    //奇数张显示
    if (index % 2 == 0) {
      $('.top_pic img').eq(index).fadeIn('slow', function () {
        index++;
      });
      if (index == 8) {
        clearInterval(time);
        index = -1;
        var timer = setInterval(function () {
          //偶数张显示
          if (index % 2 != 0) {
            $('.top_pic img').eq(index).fadeIn('slow', function () {
              index++;
            });
            if (index == 9) {
              clearInterval(timer);
            }
          }
          index += 1;
        }, 1000);
      }
    }
    index += 1;
  }, 1000);
})(window);

// 左侧寄语部分
(function (window) {
  //定义内容
  var arr = ['美景和美食，可以抵抗全世界的悲伤和迷惘.',
    '美食和风景的意义，不是逃避，不是躲藏，不',
    '是获取，不是记录，而是在想象之外的环境里，去',
    '改变自己的世界观，从此慢慢改变自己心中真正觉',
    '得重要的东西。',
    '就算过几天就要回去，依旧上班，依旧吵闹,依',
    '旧心烦，可是你，已经对世界有了新的看法.就算',
    '什么改变都没有发生，至少，人生就像一本书，你',
    '的这本也比别人多了几张彩页，这就是旅行的意义',
    '如果，你愿意将你旅途中的美食美景与更多的',
    '人分享,请在右边留下你联系方式❤'
  ];
  var index = 0;
  var btn = $('#btn');
  var offsetTop = btn.offset().top;
  console.log(offsetTop);
  //给页面注册滚轮事件
  var flag = true;
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var addNum = scrollTop + windowHeight;
    console.log(addNum,offsetTop,flag);
    if (addNum >= offsetTop && flag == true) {
      searchArr();
      flag = false;
    }
    if ($(window).scrollTop() >= 100) {
      $('.siteNav').addClass('fixed');
      $('.top_pic').css('margin-top',100);
    } else {
      $('.siteNav').removeClass('fixed');
      $('.top_pic').css('margin-top',0);
    }
  });

  // 获取输入框对象
  var input = $('.rightInput input');
  var textArea = $('.rightInput textarea');
  //获取按钮
  btn.click(function () {
    alert('我们已经收到了您的信息~感谢您的参与')
    // 清空输入框中的内容
    input.val('');
    textArea.val('');
  })

  //函数----循环遍历数组，依次获取每个句子----
  function searchArr() {
    if (index == arr.length) {
      return;
    }
    //动态输出第index个句子
    dynamicInput(arr[index]);
    //执行完上一句之后，使index++
    index++;
  }

  // 函数----实现子的动态输入----
  function dynamicInput(val) {
    var str = '';
    var i = 0;
    var StrBlock = setInterval(function () {
      if (i >= val.length) {
        clearInterval(StrBlock);
        searchArr();
        return;
      }
      str += val[i];
      $('#leftNote_content>p').eq(index - 1).text(str).fadeIn();
      i++;
    }, 100);
  }
})(window);
(function () {
//鼠标上移到导航栏
  $('.siteNav .menu-item').mouseenter(function () {
    //在导航栏没有固定的前提下（也就是没有fixed类）
    if (!$('.siteNav').hasClass('fixed')) {
      //初始化其他li的二级菜单,让其不显示，鼠标上移到某个li,这个li的二级菜单才显示
      $('.siteNav .menu-item ul').hide();
      //初始化borderTop，让全部的宽度为0
      $('.siteNav .menu-item').stop().animate({
        //上移到li，上面的borderTop变宽
        borderTopWidth: 0
      }, 500);
      //上移到li,此时的二级菜单显示
      $(this).find('ul').show();
      //上移到li,borderTop的宽度变大
      $(this).stop().animate({
        borderTopWidth: 4
      }, 500)
    }
  });
//鼠标离开事件
  $('.siteNav').mouseleave(function () {
    //鼠标离开某个li,这个li的borderTop恢复为0，二级菜单隐藏
    $('.siteNav .menu-item').stop().animate({
      borderTopWidth: 0
    }, 500)
    $('.siteNav .menu-item ul').hide();
  });
}());

