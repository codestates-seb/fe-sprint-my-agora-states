// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //이 함수를 돌고 나면, obj객체를 받아서,
  // <li>와 <div>*3을 생성하고 ,
  // <img>요소를 생성하여 원래 있던 리스트 밑에 이어 붙인다.

  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //img
  const avatarImg = document.createElement("img");
  avatarImg.style.cssText;
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  // title
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  //author
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author}/${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInformation);

  // check
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "✅" : "❎";
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered); // li 밑에 (avatarWrapper,discussionContent,discussionAnswered) 를 붙인다.
  return li; //li를 리턴한다.
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
//이 함수는 el를 받아서, el밑에 요소를 추가해주는 함수이다. 그리고 밑에 붙는 요소는 우리의 데이터(agoraStatesDiscussions) 길이의 i번째만큼 돌려준다. 따라서 이 함수는 총 41번 실행된다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
//discussion container는 리스트li들의 전체 리스트ul이다. 위에서 붙여준 내용들을 다시한번 렌더링 한다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
