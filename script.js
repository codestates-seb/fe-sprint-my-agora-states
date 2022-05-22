// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

//const section = document.createElement("section");
//section.className = "form__container";








const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  
  const avatarWrapper = document.createElement("div"); //div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; //클래스 이름 지정
  const discussionContent = document.createElement("div"); 
  discussionContent.className = "discussion__content";
    const idCreatedAt = document.createElement("div");
    idCreatedAt.className = "discussion__information";
    idCreatedAt.textContent = obj.id + " / " + obj.createdAt;
    discussionContent.append(idCreatedAt);
  
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
    const check = document.createElement("input");
    check.id = "keep-checkbox";
    check.type = "checkbox";
    discussionAnswered.append(check);

  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //element.innerHTML="" 
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

