// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
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
  information.textContent = obj.author+' / '+obj.createdAt;
  
  //답변완료여부
  const answered = document.createElement('button');
  answered.className = 'discussion__answered--checkBtn';
  obj.answer!==null?answered.textContent = '✅':'';

  //답변 전체
  const answer = document.querySelector('.answer');

  //답변완료 여부 선택 시 answer 정보 출력
  answered.addEventListener('click',function(){
    console.log(obj.answer['bodyHTML']);
    const answer__author = document.querySelector('.answer__content--author');
    answer__author.textContent = `작성자 : ${obj.answer['author']}`;
    const answer__bodyHtml = document.querySelector('.answer__content--bodyHtml');
    answer__bodyHtml.innerHTML = obj.answer['bodyHTML'];
    const answer__questionTitle = document.querySelector('.answer__questionTitle');
    answer__questionTitle.textContent = `Q. ${obj.title}`;
    answer.classList.remove('hide');
  })

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

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);