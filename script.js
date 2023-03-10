// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //div 요소 안의 추가한다
  avatarWrapper.className = "discussion__avatar--wrapper"; //클래스명 discussion__avatar--wrapper를
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //title
  const discussionstTitle = document.createElement('h2');
  discussionstTitle.className = "discussion__title";
  discussionContent.append(discussionstTitle);
  const discussionsLink = document.createElement('a');
  discussionsLink.href = obj.url;
  discussionsLink.target = "_black"; //질문 클릭시 새페이지에서 열리게
  discussionsLink.textContent = obj.title;
  discussionstTitle.append(discussionsLink);

  const discussionsInfo = document.createElement("div");
  discussionsInfo.className = "discussion__information";
  discussionsInfo.textContent = obj.author;
  discussionsInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`; //현재시간 반영
  discussionContent.append(discussionsInfo);

  const discussionsAns = document.createElement('p');
  discussionsAns.textContent = obj.answer ? '🟢' : '🔴'; //삼함연산자 사용
  discussionAnswered.append(discussionsAns)
   /*discussionsAnswered.className = "discussion__answered";
  discussionAnswered.append(discussionsAnswered);
  if( obj.answer === null ){
    discussionsAnswered.textContent = "🔴"; //미완료
  }else{
    discussionsAnswered.textContent = "🟢"; //완료
  }*/

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


/// 폼 요소 추가
const inputform = document.querySelector("form.form")
const inputName = document.querySelector("#name") // 작성자
const inputTitle = document.querySelector("#title") // 제목
const inputStory = document.querySelector("#story") // 내용

inputform.addEventListener("submit", (event) => { //submit을 눌렀을때 이벤트핸들러
  event.preventDefault(); // 새로고침 방지

  const newDiscussions = { 
    id: 'id', //Discussion의 고유한 값
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://www.google.com/",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/85865061?s=400&v=4",
  };
  agoraStatesDiscussions.unshift(newDiscussions); 
  const discussion = convertToDiscussion(newDiscussions); 
  ul.prepend(discussion); 
  render(ul); 

  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';

});

/* -----------------------페이지네이션-------------------------*/
