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

  // 질문자의 프로필 사진
  // 예) <img class="discussion__avatar--image" src="https://avatars.githubusercontent.com/u/12145019?s=64&amp;u=5c97f25ee02d87898457e23c0e61b884241838e3&amp;v=4" alt="avatar of kimploo">
  const face = document.createElement("img") // 프로필에 사진을 링크해주기 위해 img 추가
  avatarWrapper.append(face); // avatarWrapper 의 자식으로 face 추가
  face.src = obj.avatarUrl; // face의 링크로 avatarUrl를 가져옴.
  face.alt = "avatar of" + obj.author; //해당 프로필의 이름으로 
  face.title = obj.id; // 마우스 오버 하면 작성자의 아이디


  // 질문의 제목과 질문페이지로의 링크
  // 예) <a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a>
  const questionTitle = document.createElement("h2");  // << 기존 1번 질문의 타이틀이 h2 라서 그 뒤에도 h2 로 통일해 한번 css 해주기위해서 새로 생성
  const question = document.createElement("a"); // title 에 링크를 걸기 위해 a 요소를 생성후에
  question.href = obj.url; // 링크의 주소를 적고 
  question.textContent = obj.title; // 객체값들의 링크를 구분하기 위해 이름을정해준다
  questionTitle.append(question); // h2의 자식 questionTitle 의 자식으로 question를 추가
  discussionContent.append(questionTitle);


  // 저자, 생성일을 함께 작성
  // 예) <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
  // 
  const time = document.createElement("div");
  time.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  discussionContent.append(questionTitle, time);


  
  


  // 질문에 답변이 있는지 없는지
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);



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

//이벤트 리스너를 사용하여 querySelector 요소들을 조회하고 read
const form = document.querySelector('.form');
const author = document.querySelector('.form__input--name > input'); //input-name에 입력하는 input 요소들
const title = document.querySelector('.form__input--title > input'); //inp;ut-title에 입력하는 input 요소들
const textArea = document.querySelector('.form__textbox > textarea'); //form_textbox에 입력하는 질문 textarea 요소들

// 함수form.addEventListener의 'submit'이벤트를 통해 각각의 데이터 정보를 -> 아래 form에 맞춰 리턴해라.
form.addEventListener('submit', (event) => {
  event.preventDefault(); //1)submit눌렀을때 새로고침되는걸 방지
  // const convertToDiscussion = (obj)/에 돌려줄 obj 객체를 하나 만든다.
  const obj ={
    id: "unique number",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: {
    id: "111",
    createdAt: "111",
    url: "111",
    author: "111",
    bodyHTML: textArea.value,
      avatarUrl: "111",
    },
    bodyHTML:
      '1111',
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  //만든 배열을 data더미의 배열에 추가해준다.(맨 앞 요소로)
  agoraStatesDiscussions.unshift(obj);
  //전체 데이터 더미를 ui로 append해준다(맨 앞으로->prepend)
  ul.prepend(convertToDiscussion(obj));
  //입력한 값을 submit에서 댓글창으로 append 되면 값을 초기화한다.
  author.value = "";
  title.value  = "";
  textArea.value = "";
});

