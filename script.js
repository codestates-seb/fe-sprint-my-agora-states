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

  // 프로필 이미지 생성하고 넣기
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.setAttribute("src", obj["avatarUrl"]);
  avatarWrapper.append(avatarImage);

  // 타이틀 생성하고 discussionContent 에 넣기
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  
  const discussionTitleTagA = document.createElement("a");
  discussionTitleTagA.setAttribute("href", obj["url"]);
  discussionTitleTagA.textContent = obj["title"];

  discussionTitle.append(discussionTitleTagA);
  discussionContent.append(discussionTitle);

  // 닉네임, 작성일자 생성후 discussionContent 에 넣기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj["author"]} / ${obj["createdAt"]}`;

  discussionContent.append(discussionInformation);

  // 디스커션에 object 가 있는지 확인하고 없으면 스킵, 있으면 넣기
  const answeredFlag = obj["answer"];
  const disscusionAnsweredPtag = document.createElement("p");
  if (answeredFlag !== null ) {
    disscusionAnsweredPtag.textContent = "☑";
  } else {
    disscusionAnsweredPtag.textContent = "🔲";
  }
  
  discussionAnswered.append(disscusionAnsweredPtag);

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


// textarea 의 내용이 늘어나면 자동으로 크기를 늘려주는 함수
const renameHeader = (e) => {
  const _textarea = document.querySelector("h1");
  _textarea.textContent = 'MyAgoraStates';
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
renameHeader();