
  var Links ={
    SetColor:   function (color){
      //   var alist = document.querySelectorAll('a');
      //   var i=0;
      //   while(i<alist.length){
      //   alist[i].style.color= color;
      //   i++;
      // }
      $("a").css("color", color); //모든 a태그를 jquery로 하겠다!
    }
  }

  var body = {
    Color: function (color){
      // document.querySelector('body').style.color = color;
      $("body").css("color", color);
    },
    BackgroundColor:function (color){
      $("body").css("backgroundColor", color);
        // document.querySelector('body').style.backgroundColor = color;
    }

  }

  function nightDayhandler(self){
    var target = document.querySelector('body');
    if(self.value === 'night'){
      body.BackgroundColor('black');
      self.value = 'day';
      body.Color('white');
      Links.SetColor('powderblue');
    }
    else {
      body.BackgroundColor('white');
      body.Color('black');
      self.value = 'night';
      Links.SetColor('blue');
    }

  }
