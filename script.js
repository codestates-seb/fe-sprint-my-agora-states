// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // li에 들어갈 element들을 생성한 후, 클래스 이름 지정하기

  // 아바타 wrapper 태그 만들기
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
    const avatarImage = document.createElement("img");
    avatarImage.className = "discussion__avatar--wrapper";
      avatarImage.setAttribute("src", obj.avatarUrl);
      avatarImage.setAttribute("alt", `avatar of ${obj.author}`);



  // discussion 내용(content) 태그 만들기
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
    const discussionTitle = document.createElement("h2");
    discussionTitle.className = "discussion__title";
      const aTag = document.createElement("a");
      aTag.setAttribute("href", obj.url);

    const discussionInfo = document.createElement("div");
    discussionInfo.className = "discussion__information";


  // discussion 답변 태그 만들기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
    const pTag = document.createElement("p");
    

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionTitle.textContent = obj.title;
  discussionInfo.textContent = obj.author + " / " + obj.createdAt;


  // li 하위 태그들 생성  
  avatarWrapper.append(avatarImage);

  discussionTitle.append(aTag);
  discussionContent.append(discussionTitle, discussionInfo);

  discussionAnswered.append(pTag);

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
