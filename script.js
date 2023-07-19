// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
const ul = document.querySelector("ul.discussions__container");

// 질문 등록 버튼을 눌렀을 때의 동작
const btn_submit = document.querySelector('.form__submit--button');
btn_submit.addEventListener('click',createNewDiscussion());

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //image 데이터
  const avatar = document.createElement('img');
  avatar.className='discussion__avatar--image';
  avatar.src = obj.avatarUrl;
  
  //title 데이터
  const title = document.createElement('h2');
  title.className = 'discussion__title';
  const url = document.createElement('a');
  url.href = obj.url;
  url.textContent = obj.title;
  title.appendChild(url);

  //답변수, id, 날짜 데이터
  const information = document.createElement('div');
  information.className = 'discussion__information';
  information.textContent = 
  obj.author+' / '+obj.createdAt.substr(0,4)+'년 '+obj.createdAt.substr(5,2)+'월 '+obj.createdAt.substr(8,2)+'일 '
  +obj.createdAt.substr(11,2)+'시 '+obj.createdAt.substr(14,2)+'분';
  
  //답변완료여부
  const answered = document.createElement('button');
  answered.className = 'discussion__answered--checkBtn';
  obj.answer!==null?answered.textContent = '✅':'';

  //답변 전체
  const answer = document.querySelector('.answer');

  //답변완료 여부 선택 시 answer 정보 출력
  answered.addEventListener('click',showAnswer(obj, answer))

  //answer의 ❌ 버튼 누르면 answer hide
  const answer__closeBtn = document.querySelector('.answer__title--closeBtn');
  answer__closeBtn.addEventListener('click',() => {
      answer.classList.add('hide');
    })

  avatarWrapper.appendChild(avatar);
  discussionContent.appendChild(title);
  discussionContent.appendChild(information);
  discussionAnswered.appendChild(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

let cnt = 0; //추가할 discussions의 시작 index
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = cnt; i < cnt+10; i += 1) {
    if(i>=agoraStatesDiscussions.length) {
      btn_more.classList.add('hide');
      break;
    }
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  // li의 마지막 부분에 더보기 버튼 추가
  const btn_more=document.createElement('button');
  btn_more.id='btn_more';
  btn_more.textContent='더보기'

  btn_more.addEventListener('click', function(){
    if(cnt>=agoraStatesDiscussions.length) return;
    cnt += 10;
    btn_more.remove();
    render(ul);
  })

  element.append(btn_more);
  return;
};

//게시물 등록 시 제일 위의 하나의 데이터만 랜더링하는 함수
const render_new = function(element) {
  element.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);

function showAnswer(obj, answer) {
  return function () {
    console.log(obj.answer['bodyHTML']);
    const answer__author = document.querySelector('.answer__content--author');
    answer__author.textContent = `작성자 : ${obj.answer['author']}`;
    const answer__bodyHtml = document.querySelector('.answer__content--bodyHtml');
    answer__bodyHtml.innerHTML = obj.answer['bodyHTML'];
    const answer__questionTitle = document.querySelector('.answer__questionTitle');
    answer__questionTitle.textContent = `Q. ${obj.title}`;
    answer.classList.remove('hide');
  };
}

//새로운 discussion을 등록하는 메소드
function createNewDiscussion() {
  return function () {
    let inputName = document.querySelector('#name');
    let inputTitle = document.querySelector('#title');
    let inputStory = document.querySelector('#story');

    if (inputName.value.length === 0 || inputTitle.value.length === 0 || inputStory.value.length === 0) {
      return;
    }
    // 입력 날짜 형식 맞추기
    let today = new Date();
    console.log(today);
    let yyyy = today.getFullYear().toString();
    let mm = (today.getMonth() + 1).toString();
    mm.length === 1 ? mm = '0' + mm : mm = mm;
    let dd = (today.getDate()).toString();
    dd.length === 1 ? dd = '0' + dd : dd = dd;
    let HH = (today.getHours()).toString();
    HH.length === 1 ? HH = '0' + HH : HH = HH;
    let min = today.getMinutes().toString();
    min.length === 1 ? min = '0' + min : min = min;
    let sec = today.getSeconds().toString();
    sec.length === 1 ? sec = '0' + sec : sec = sec;
    todayFormat = `${yyyy}-${mm}-${dd}T${HH}:${min}:${sec}`;

    //agoraStatesDiscussions 배열에 요소 추가
    const agoraStatesDiscussion = {
      id: '012345',
      createdAt: todayFormat,
      title: inputTitle.value,
      url: null,
      author: inputName.value,
      answer: null,
      bodyHTML: '<p></p>',
      avatarUrl: 'assets/images/profile.png',
    };
    agoraStatesDiscussions.unshift(agoraStatesDiscussion);

    //li에 새로 등록한 데이터 1개 추가하기
    render_new(ul);

    //input value 초기화
    inputName.value = '';
    inputTitle.value = '';
    inputStory.value = '';
  };
}

