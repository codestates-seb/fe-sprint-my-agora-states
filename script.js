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
  const avatarsImg= document.createElement('img');
    avatarsImg.src= obj.avatarUrl;
    avatarsImg.alt= 'avatar of'+ obj.author;
    avatarWrapper.append(avatarsImg);

  const Title= document.createElement('h2');
    const Title_2= document.createElement('a');
      Title_2.href= obj.url;
      Title_2.textContent= obj.title;
      Title.append(Title_2);
    discussionContent.append(Title);

  const Information= document.createElement('div');
    Information.className= 'discussion__information';
    Information.textContent= obj.id +' / '+ obj.createdAt;
    discussionContent.append(Information);

  const Answered= document.createElement('p');
    Answered.textContent= '☑';
    discussionAnswered.append(Answered);

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


// 포스팅 박스 제어하기 => 구글 ajax

function openclose() {
    // id 값 post-box의 display 값이 block 이면
    if ($('#post-box').css('display') == 'block') {
        // post-box를 가리고
        $('#post-box').hide();
				// 가렸으니까 이제 열기로 바꿔두기
        $('#question_btn').text('나도 질문하기');
    } else {
        // 아니면 post-box를 펴라
        $('#post-box').show();
				// 폈으니까 이제 닫기로 바꿔두기
        $('#question_btn').text('질문창 닫기');
    }
}

// submit버튼 눌렀을 때 작동

// 01. 먼저 index에 있는 시멘틱요소들을 DOM으로 바꾼다.
const submitBtn = document.querySelector(".form"); // form action버튼? 왜필요하지?
// (form태그의 action속성)
  inputId = document.querySelector(".form__input--name > input"); // 이름입력란
  inputTitle = document.querySelector(".form__input--title > input"); // 제목입력란
  inputQuestion = document.querySelector(".form__textbox > textarea"); // 내용입력란
  inputSubmit = document.querySelector(".form__submit > input"); // submit버튼

const NEWOBJ_LS = "newobj";
let newObjs = [];

function discussionObj(author, title, text) { // 입력되는 값들을 매개변수(parameter)로 하는 함수를 만들어준다.
  return { 
    // 이 값들이 들어오면 다음과 같은 객체를 리턴한다. 
    // data.js에 있는 객체 key값 참고
    id: String(Date.now()), // id는 
    createdAt: new Date().toISOString(),
    answer: null, // 답변은 없는걸로 한다. (값이 없음)
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4", // 같은사진
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45", // 해당 글 링크주소
    author, // 글쓴이 이름
    title, // 제목
    text, // 내용
  };
}

function handleSubmit(e) {  // e??
  e.preventDefault(); // ???
  const discussions = discussionObj( // discussions라는 변수에 함수 discussionObj를 할당한다.
    inputId.value, // 첫번째 매개변수(author)는 inputID에 들어간 내용
    inputTitle.value, // 두번째 매개변수(title)는 inputTitle에 들어간 내용
    inputQuestion.value // 세번째 매개변수(text)는 inputQuestion에 들어간 내용
  );
  agoraStatesDiscussions.unshift(discussions); // 배열에 추가

  paintObj(discussions);
  inputId.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
}

function paintObj(task) {
  const ul = document.querySelector("ul.discussions__container");
  const li = convertToDiscussion(task);
  ul.prepend(li); // 첫번째에 추가

  newObjs.push(task);
  saveObj();
}

// 이 밑에부터 모르겠음

function saveObj() { // 저장 함수 만들기
  const objString = JSON.stringify(newObjs); // ?
  localStorage.setItem(NEWOBJ_LS, objString); // ?
}


function loadObj() {
  const loadedObjs = localStorage.getItem(NEWOBJ_LS);
  if (loadedObjs) {
    const parsedObjs = JSON.parse(loadedObjs);
    parsedObjs.forEach((task) => {
      paintObj(task);
    });
  }
}


function init() {
  loadObj();
  submitBtn.addEventListener("submit", handleSubmit);
}
init();
