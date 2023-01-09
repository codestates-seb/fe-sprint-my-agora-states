// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  for(let i = 0; i < agoraStatesDiscussions.length; i += 1){
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // discussion__avatar--wrapper(이미지) 넣기
  const avatarImg = document.createElement('img');
  // class를 안지정해줘서 이미지가 뒤죽박죽이였다.
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = agoraStatesDiscussions[i].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[i].author;
  avatarWrapper.append(avatarImg);

  // discussion__content(질문 제목) 넣기
  const discussion__title__maker = document.createElement("h2");
  discussion__title__maker.className =  "discussion__title";
  const title_Url = document.createElement("a");
  title_Url.href = agoraStatesDiscussions[i].url;
  title_Url.textContent = agoraStatesDiscussions[i].title;
  discussion__title__maker.append(title_Url);
  discussionContent.append(discussion__title__maker);

  // discussionAnswered(작성자와 날짜) 넣기
  const discussion__information__maker = document.createElement("div");
  discussion__information__maker.className =  "discussion__information"
  discussion__information__maker.textContent = agoraStatesDiscussions[i].id + ' / ' + agoraStatesDiscussions[i].createdAt;
  discussionContent.append(discussion__information__maker);

  // 체크박스 넣기 answer=null이라면 네모칸만 
  const checkbox__maker = document.createElement("p");
  if(agoraStatesDiscussions[i].answer === null){
    checkbox__maker.textContent = "☒";
  }
  else{
    checkbox__maker.textContent = "☑︎";
  }
  discussionAnswered.append(checkbox__maker)



  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const ul = document.querySelector('ul.discussions__container');
ul.append(li);

  }
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
