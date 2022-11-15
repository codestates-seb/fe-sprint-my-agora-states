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
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author; //alt는 이미지가  깨졌을  때 대체
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2") 
  const titleA = document.createElement("a") 
  titleA.href = obj.url; // 제목의 주소
  titleA.textContent = obj.title;  //제목
  discussionTitle.append(titleA);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  discussionContent.append(discussionTitle, discussionInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒"; //삼항연산자 사용 
  discussionAnswered.append(checked);



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

  const form = document.querySelector("form.form");
  // const author = document.querySelector("div.form__input--name > input").value;
  // const title = document.querySelector("div.form__input--title > input").value;
  // const textbox = document.querySelector("div.form__textbox > textarea").value;

form.addEventListener("submit", (event) => {
  event.preventDefault(); // > 새로고침 막는 이벤트

  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textbox = form.querySelector("div.form__textbox > textarea").value;

  const newObj = {
    id : "new id",
    createdAt : new Date(),
    title : title,
    url : "https://github.com/codestates-seb/agora-states-fe/discussions",
    author : author,
    bodyHTML : textbox,
    avatarUrl : "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"

   }

    agoraStatesDiscussions.unshift(newObj);

    const discussion = convertToDiscussion(newObj);
  
    ul.prepend(discussion);

    form.querySelector("div.form__input--name > input").value = "";
    form.querySelector("div.form__input--title > input").value = "";
    form.querySelector("div.form__textbox > textarea").value = "";


  })




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

