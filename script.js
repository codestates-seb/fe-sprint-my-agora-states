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
  // console.log(obj)
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  // console.log(avatarImg);
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.Author} / ${new Date(
    obj.createAt
  ).toLocaleTimeString()}`
  discussionContent.append(discussionTitle, discussionInformation);


  const answeredContents = document.createElement('p');
  answeredContents.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(answeredContents);


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

//이벤트를 받아서 배열에 추가해보자
const InputSubmit = document.querySelector(".btn-submit");
const author = document.querySelector(".form__input--name #name");
const title = document.querySelector(".form__input--title #name");
const story = document.querySelector("#story");

const newobj = {
  id: "D_kwDOHOApLM4APewe",
  createdAt: "2022-05-07T08:33:57Z",
  author: author.value,
  title: title.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
  bodyHTML: story.value,
  avatarUrl:
    "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
};
const addClickDiscussion = (e) => {
  e.preventDefault(); //submit이벤트가 실행되면 다시 로드됨? 그래서 해주는것 같음.....
  newobj.title = title.value;
  newobj.author = author.value;
  // newobj.createdAt = addNowTime();
  agoraStatesDiscussions.push(newobj);

  ul.prepend(
    convertToDiscussion(
      agoraStatesDiscussions[agoraStatesDiscussions.length - 1]
    )
  );
};

InputSubmit.addEventListener('click', addClickDiscussion)




