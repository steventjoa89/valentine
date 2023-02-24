$(window).on('load', function(){
  $('#cover').fadeOut(10);
});

let i = 0;
$('#button-control').click(() => {
  switch (i){
    case 0:
      var audio = $('.song')[0];
      audio.play();
      $('#image-control').fadeOut('slow');
      $('#button-control').fadeOut('slow');
      break;
    case 1:
      // flyBalloon();
      $('#image-postcard-control').fadeOut('slow');
      $('#button-control').fadeOut('slow').delay(1000).promise().done(() => {
        displayMessage(0);
        flyBalloons();
        ;
      });
      break;
    default:
      break;
  }
  
  i=i+1;
  if(i==0||i==1){
    setTimeout(function() {
      // display button again
      $('#button-control').html("Open Post Card");
      $('#image-postcard-control').fadeIn('slow').delay(1000).promise().done(() => {
        $('#button-control').fadeIn('slow');
      });
    }, 2000);
  }
});

let isChangeTitle = false;

var displayMessage = (msgCounter) => {
  $(`.message-content#id-${msgCounter}`).fadeOut('slow').delay(1000).promise().done(() => {
    if(msgCounter<16){
      msgCounter=msgCounter+1;
    }else if(msgCounter==16){
      isChangeTitle = true;
      changeTitleText(0);        // Change Title Text
    }
    $(`.message-content#id-${msgCounter}`).css("fontSize", 50).fadeIn('slow').delay(5000);
    if(!isChangeTitle){
      displayMessage(msgCounter);
    }
  });
}



var flyBalloon = async (idBalloon) => {
  $(idBalloon).css('bottom', '-200px');
  $(idBalloon).css('opacity', Math.random() * 0.5 + 0.3);

  let leftPosition = $(window).width()*Math.random();
  $(idBalloon).css('left', leftPosition);

  $(idBalloon).animate({top:0},10000).delay(3000).promise().done(() => {
    $(idBalloon).animate({opacity: 0}, 1500);
  });
}


let totalBallons = 35;
var flyBalloons = () => {
  let balloonHtml = "";
  for(let i=1;i<=totalBallons;i++){
    balloonHtml += `<div class="balloons text-center" id="heart-balloon-${i}"></div>`;
  }
  $('.balloons-div').html(balloonHtml);

  
  for(let i=1;i<=totalBallons;i++){
    (function(i) {
      const a = setTimeout(function() { 
        flyBalloon(`#heart-balloon-${i}`); 
      }, 3800 * i);
    })(i);
  }
}

var changeTitleText = (titleCounter) => {
  $('p#title').fadeOut('slow').delay(100).promise().done(() => {
    let title = "";
    switch(titleCounter){
      case 0:
        title = "It's You";
        break;
      case 1:
        title = "It's always been You";
        break;
      case 2:
        title = "是你";
        break;
      case 3:
        title = "너야";
        break;
      case 4:
        title = "사랑해요";
        break;
      default:
        break;
    }
    if(titleCounter<=4){
      titleCounter = titleCounter+1;
    }
    $('p#title').text(title);
    $('p#title').fadeIn('slow').delay(2000).promise().done(() => {
      if(titleCounter<=4){
        changeTitleText(titleCounter);
      }
    });
  });
}
