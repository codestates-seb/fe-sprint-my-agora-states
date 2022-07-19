// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  
  // 함수의 목적: li요소 안에 있는 하위요소들을 새로 만듬
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement("img");
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 'avartar of ' + obj.author;
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  const TitleHref = document.createElement("a");
  discussionContent.append(TitleHref);
  TitleHref.textContent = obj.title;
  TitleHref.href = obj.url;

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; //현지 시간에 맞게 표현 (ex. 오전 10:02:17)
  discussionContent.append(discussionTitle, discussionInfo);

  const check = document.createElement("p");

  obj.answer !== null ? check.textContent = "☑" : check.textContent = "☒";
  // if(obj.answer !== null){
  //   check.textContent = "☑";
  // }else{
  //   check.textContent = "☒";
  // }
  discussionAnswered.append(check);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 디스커션 추가 기능 구현, `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작
//`agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다.

//form 선택
const form = document.querySelector("form.form");
const title = document.querySelector("div.form__input--title > input");
const nameInput = document.querySelector("div.form__input--name > input");
const textbox = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => { 
  event.preventDefault(); //넣어야하는 이유? 지우면 생겼다 다시 사라짐.. submit 됨과 동시에 창이 다시 실행되기 때문에 다시 초기 화면으로 돌아오게 됨. preventDefault로 방지할 수 있음.

  //새로운 객체를 만들어야 한다.
  //input에 입력된 값(value)를 넣은 새로운 객체.
  //새로운 객체를 ui요소 아래로 넣어준다.
  //더미 데이터(agoraStatesDiscussions)에도 추가해준다.(배열안에 앞으로 추가)  
  const obj = {
      id: "unique id",
      createdAt: new Date(), //event가 발생한 시각이 기록됨
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: nameInput.value,
      answer: null,
      bodyHTML: textbox.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    };
  agoraStatesDiscussions.unshift(obj); //더미데이터의 맨 앞에 추가
  const newDiscussion = convertToDiscussion(obj); //convertToDiscussion함수에 생성한 객체를 전달해서
  ul.prepend(newDiscussion); //ul요소의 맨 앞에 추가

})



//<advanced>

//페이지네이션 기능: 한 페이지에 10개씩 디스커션이 보여야 합니다. 
//다음 페이지로 넘어갈 수 있어야 합니다.이전 페이지로 돌아올 수 있어야 합니다.
//다음 페이지가 없거나, 이전 페이지가 없는 경우 페이지를 유지해야 합니다.


//디스커션 유지 기능: LocalStorage에 대해서 스스로 학습하고, 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되도록 제작합니다.


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //element에 들어오는 것: ul 요소
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    //데이터를 DOM으로 바꿔준 것을 반복적으로 append
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
