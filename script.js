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
  // 요소를 선택한다.☑ 문제점 해결
  // const elDiscussionAvatarWrapper = document.querySelector('.discussion__avatar--wrapper');
  // const elDiscussionContent = document.querySelector('.discussion__content');
  // const elDiscussionAnswered = document.querySelector('.discussion__answered');
  
  // 선택한 요소들의 자식태그를 만들어준다.
  // 1. avatarwrapper 안에는 img 자식이 있고, 
  // 2. discussioncontent 안에는 h2, div 자식이 있고,
  // 3. discussionanswered 안에는 p 자식이 있다.
  // 자식태그의 클래스명과 속성들을 추가해준다.
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl; // data.js의 키값 바로 가져와도 되나..?
  avatarImg.alt = "avatar" + "of" + obj.author;
  
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  // h2에는 href 속성을 가지는 <a> 자식이 있다.
  // const discussionTitleUrl = document.createElement("a");
  // discussionTitleUrl.href = obj.url;
  
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  
  const discussionAnsweredCheckbox = document.createElement("p");

  // 요소 안에 적절한 자식요소를 넣어준다.☑ 문제점 해결
  // elDiscussionAvatarWrapper.append(avatarImg);
  // elDiscussionContent.append(discussionTitle, discussionInformation);
  // elDiscussionAnswered.append(discussionAnsweredCheckbox);
  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionTitle, discussionInformation);
  discussionAnswered.append(discussionAnsweredCheckbox);


  // 자식요소들에 들어갈 값을 넣어준다.
  // 1. 질문 제목
  // 2. 작성자와 작성날짜
  // 3. 체크박스

  discussionTitle.textContent = obj.title;
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  discussionAnsweredCheckbox.textContent = "☑";
  



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
