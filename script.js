// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정

    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'discussion__avatar--wrapper';
    const discussionContent = document.createElement('div');
    discussionContent.className = 'discussion__content';
    const discussionAnswered = document.createElement('div');
    discussionAnswered.className = 'discussion__answered';
    // 왜 새롭게 만들어주어야하는가?
    // convertToDiscussion 이 함수의 목적은 값을 추출해서 새로운 il뭉치를 만들기 위해 

    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

    const Profile = document.createElement("img") // 프로필 사진
    Profile.src = obj.avatarUrl;
    Profile.alt = "avatar of" + obj.author;
    avatarWrapper.append(Profile);

    //디스커션 만들기
    const discussionTitle = document.createElement("h2");
    const titleAnchor = document.createElement("a");
    titleAnchor.href = obj.url;
    titleAnchor.textContent = obj.title;
    discussionTitle.append(titleAnchor);
    discussionContent.append(discussionTitle);

    //시간
    const discussionInfo = document.createElement("div");
    discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul" })}`; 
    discussionContent.append(discussionTitle, discussionInfo);
    
    //체크박스
    const checked = document.createElement("p");
    checked.textContent = obj.answer ? "☑︎" : "☒";
    discussionAnswered.append(checked);

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li; // il요소를 위의 함수를 통해 가공해서 append
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    for (let i = 0; i <= 10; i += 1) { // 10개 불러오게 만듬
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
};
const ul = document.querySelector("ul.discussions__container");
render(ul);


const form = document.querySelector("form.form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textbox = form.querySelector("div.form__textbox > textarea").value;

  const newObj = {
    id: "id",
    createdAt: new Date().toISOString(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author,
    bodyHTML: textbox,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }

  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  form.querySelector("div.form__input--name > input").value = 
  form.querySelector("div.form__input--title > input").value = 
  form.querySelector("div.form__textbox > textarea").value = "";
});
