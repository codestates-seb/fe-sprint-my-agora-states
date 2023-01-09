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

  //이미지
  const profile = document.createElement("img");
  profile.setAttribute("src",obj.avatarUrl);
  profile.setAttribute("alt",`avatar of ${obj.author}`);
  profile.className = "discussion__avatar--image";
  avatarWrapper.append(profile);

  //이름 날짜 링크
  const titleText = document.createElement("h2");
  titleText.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.setAttribute("href", obj.url);
  titleLink.append(obj.title); 
  titleText.append(titleLink);
  const makeTime = document.createElement("div");
  makeTime.className = "discussion__information";
  makeTime.append(`${obj.author} / ${obj.createdAt}`)
  discussionContent.append(titleText);
  discussionContent.append(makeTime);

  //체크박스
  const answerChk = document.createElement("p");
  
  if(obj.answer === null){
    answerChk.append(`☒`)
  }else{
    answerChk.append(`☑`)
  }
  discussionAnswered.append(answerChk);



//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

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
