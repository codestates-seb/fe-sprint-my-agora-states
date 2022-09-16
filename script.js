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

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl; //agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of ' +  obj.author; //agoraStatesDiscussions[0].author; // agora 자리에 obj
  avatarWrapper.append(avatarImg);
 // title
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussiontitle";
  const ancor = document.createElement('a');
  ancor.herf = obj.url;
  ancor.textContent = obj.title;
  discussionTitle.append(ancor);
  discussionContent.append(discussionTitle);
  //시간
  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussioninformation";
  //information.textContent = obj.author + ' / ' obj.createAt
  discussionInformation.textConent = `${obj.author}` / `${new Date(obj.createAt).toLocaleString()}`;
  discussionContent.append(discussionInformation)
  // const discussionInfo = document.createElement('div');
  // discussionInfo.textContent = `${obj.author}` / `${new Date(obj.createAt).toLocaleString()}`;
  // //체크박스
  // const p = document.createElement("p");
  // /* p.textContent =   answer 부분이 null이면 다른 모양으로 나오게 해야 하는데...어쩔...*/
  // discussionAnswered.append(p);

  li.append(avatarWrapper, discussionContent, discussionAnswered)
  return li;
};

const form = document.querySelector(".form");
const title = document.querySelector("div.form__input--title > input");
const nameInput = document.querySelector("div.form__input--name > input");
const textbox = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //새로운 객체를 만들어준다
  //Input에 입력된 값(value)를 넣은 새로운 객체.
  //새로운 객체를 ul요소로 넣어준다.
  //더미 데이터(agoraStatesDiscussions)에도 추가해준다.
  const obj = {
    id: "unique id",
    createdAt: new Date().toLocaleString,
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj); // 위에 디스커션 추가해주는 함수불러와서 적용
  ul.prepend(newDiscussion);
});



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
// element는 ul


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); //render 함수 호출
