// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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

  // 반복문으로 그림을 다 찾아서  
  // 만약 첫번째 배열에 그림이 들어있으면 다음 배열에 그림의 인덱스 +1 한 그림 넣기

  // for(let i = 0; i < agoraStatesDiscussions.length; i += 1){
    
  // }


  // 일단 다른 데이터들도 반복문 없이 넣어보기
  // 왼쪽 엘리먼트
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 가운데 엘리먼트
  const avatitle = document.createElement('h2');
  avatitle.className = "discussion__title"
  const ava_a = document.createElement('a');
  const avainfromation = document.createElement('div');
  avainfromation.className = "discussion__information";
  ava_a.href = obj.url;
  ava_a.textContent = obj.title;
  avainfromation.textContent = obj.author + obj.createdAt;
  avatitle.append(ava_a);
  discussionContent.append(avatitle);
  discussionContent.append(avainfromation);

  // 오른쪽 엘리먼트
const ava_p = document.createElement('p')
discussionAnswered.append(ava_p);
ava_p.textContent = '☑';

// const ul = document.querySelector('ul.discussions__container')
// ul.append(li);


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
