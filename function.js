
let timer = new Date();
let h = timer.getHours();
let m = timer.getMinutes();
let s = timer.getSeconds();
let month = timer.getMonth();
let date = timer.getDate();
let day = timer.getDay();


//분 단위 조절
if(m < 10){
  m = '0' + m;
}


//시계 기능
setInterval(function(){     



  //요일 출력
  switch(day){
    case 0:
        day = "일요일";
        break;
    case 1:
        day = "월요일";
        break;
    case 2:
        day = "화요일";
        break;
    case 3:
        day = "수요일";
        break;
    case 4:
        day = "목요일";
        break;
    case 5:
        day = "금요일";
        break;
    case  6:
        day = "토요일";
}

  document.querySelector('.clock').textContent = h + ":" + m;
  document.querySelector('.day').textContent = month+1 + '월 ' + date + '일 ' + day;
},1000);



let all = document.querySelector('body');
let form = document.querySelector('.form__container')
let id = document.querySelector('.form__container .discussion__info')
let question = document.querySelector('.form__container .discussion__title')
let img = document.querySelector('.discussion__avatar--image')
let center = document.querySelector('.center')
let title = document.querySelector('.title__container')
let newPost = {};

//버튼 기능
all.addEventListener('click', function(event){

  const target = event.target; 

  //알람창 작성
  if(target.matches('.form__button')){
    ul.style.cssText = 'filter: blur(2px)';
    center.style.cssText = 'filter: blur(2px)';
    title.style.cssText = 'filter: blur(2px)';
    form.style.cssText = 'display: block';

  } else 

  //삭제
  if(target.matches('.delete__button')){
    agoraStatesDiscussions.shift(newPost)
    while(ul.firstChild)  {
      ul.firstChild.remove()
    }
    render(ul);
  } else

  //작성글
  if(target.matches('.discussion__title')){
  } else 

  //작성
  if(target.matches('.submit')){


    newPost.id = id.value;
    newPost.createdAt =  h + ":" + m;
    newPost.title = question.value;
    newPost.avatarUrl = img.src;
    agoraStatesDiscussions.unshift(newPost)

    // 자식 노드 삭제
    while(ul.firstChild)  {
      ul.firstChild.remove()
    }
    render(ul);
    ul.style.cssText = 'filter: none';
    center.style.cssText = 'filter: none';
    title.style.cssText = 'filter: none';
    form.style.cssText = 'display: none';

  } else {
    all.style.cssText = 'filter: none'; 
   }
})

