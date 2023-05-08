


if (localStorage.getItem('key') != undefined) {
  let callLocal = JSON.parse(localStorage.getItem('key'));
  for (let i = 0; i < callLocal.length; i++) {
    agoraStatesDiscussions.unshift(callLocal[i])
  }
}

let page = 1;
localStorage.getItem('page') == undefined ? page = 1 : page = Number(localStorage.getItem('page'))
document.getElementsByClassName('page__now')[0].textContent = page ;
let min_page = 1;
let max_page = Math.floor(agoraStatesDiscussions.length / 10) + 1;

let newObj = {
  id:'',
  createdAt:'',
  title:'',
  url:'',
  author:'',
  answer:'',
  bodyHTML:'',
  avatarUrl:'',
}

document.querySelector('#name').addEventListener('input', function () {
  newObj.author = document.querySelector('#name').value;
})
document.querySelector('#title').addEventListener('input', function () {
  newObj.title = document.querySelector('#title').value;
})
document.querySelector('#story').addEventListener('input', function () {
  newObj.bodyHTML = document.querySelector('#story').value;
})
document.querySelector('.form__submit').addEventListener('click', function () {
  if (newObj.author === '' || newObj.title === '' || newObj.bodyHTML === '') {
    return;
  }
  newObj.createdAt = new Date().toISOString();
  newObj.url = 'https://github.com/codestates-seb/agora-states-fe/discussions/6'
  newObj.avatarUrl = 'https://mblogthumb-phinf.pstatic.net/20160913_273/chungmanwon_1473717388747nt2Pc_PNG/%BD%BA%B6%F6.PNG?type=w2'
  newObj.answer = null;
  if (localStorage.getItem('key') != undefined) {
    let localData = JSON.parse(localStorage.getItem('key'));
    localData.push(newObj);
    localStorage.setItem('key', JSON.stringify(localData))
  } else {
    localStorage.setItem('key', JSON.stringify([newObj]))
  }
})

document.querySelector('.page__container').addEventListener('click', function (event) {
  event.target.className === 'front__but' && page !== min_page ? (page -= 1, localStorage.setItem('page', page)) : undefined;
  event.target.className === 'next__but' && page !== max_page ? (page += 1, localStorage.setItem('page', page)) : undefined;
})


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement('a');
  const discussionInfor = document.createElement("div");
  discussionInfor.className = "discussion__information";
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnswerCh = document.createElement('p')
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //작성일자를 받아서 같은 날일 경우 시간, 같은 연도일 경우 월,일 다른 연도일 경우 년,월,일을 리턴하는 함수
  const isSameDay = function (day) {
    let today = new Date();
    let createdDay = new Date(day); 
    if (today.getFullYear() === createdDay.getFullYear() && today.getMonth() === createdDay.getMonth() && today.getDate() === createdDay.getDate()) {
      return createdDay.toLocaleTimeString();
    }else if (today.getFullYear() === createdDay.getFullYear()) {
      return `${createdDay.getMonth()+1}월 ${createdDay.getDate()}일`
    } else {
      return `${createdDay.getFullYear()}년 ${createdDay.getMonth()+1}월 ${createdDay.getDate()}일`
    }
  }

  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  discussionUrl.href = obj.url; 
  discussionUrl.textContent = obj.title; 
  discussionInfor.textContent = `${obj.author}/${isSameDay(obj.createdAt)}`
  
  if (obj.answer !== null) {
    discussionAnswerCh.textContent = '☑';
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarImage);
  discussionContent.append(discussionTitle, discussionInfor)
  discussionTitle.append(discussionUrl)
  discussionAnswered.append(discussionAnswerCh)
  
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = (page-1)*10; i < page*10; i += 1) {
    agoraStatesDiscussions[i] != undefined ? element.append(convertToDiscussion(agoraStatesDiscussions[i])) : undefined;
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
