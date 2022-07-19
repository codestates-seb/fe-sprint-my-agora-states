// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => { // 전달인자 obj , obj는 각각의 객체
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 이름 지정
  const discussionContent = document.createElement("div"); // div요소 생성
  discussionContent.className = "discussion__content"; // 클래스 이름 지정
  const discussionAnswered = document.createElement("div"); // div요소 생성
  discussionAnswered.className = "discussion__answered"; // 클래스 이름 지정

  /* 아바타 생성 구간 */
  const avatarlogo = document.createElement('img'); // 아바타 이미지 요소 생성
  avatarlogo.className = "discussion__avatar--image"; // 클래스 이름 지정
  avatarlogo.src = obj.avatarUrl; // 아바타 주소 넣어주기
  avatarlogo.alt = 'avatar of ' + obj.author; // 이미지 정보는 이름으로 대체
  avatarWrapper.append(avatarlogo); // avatarWrapper에 아바타 이미지 요소 생성한 엘리먼트 넣어주기 

  /* 콘텐츠 생성 구간 */
  const contentH2 = document.createElement('h2'); // H2 요소 생성
  contentH2.className = "discussion__title"; // H2 클래스 이름 지정

  const contentA = document.createElement('a'); // a 요소 생성
  contentA.href = obj.url; // a 요소의 링크 지정
  contentA.textContent = obj.title; // a 요소의 텍스트 지정
  contentH2.append(contentA); // 지정한 a 요소를 H2 요소에 집어넣음

  const contentInfo = document.createElement('div'); // div 요소 생성
  contentInfo.className = "discussion__information"; // div 클래스 이름 지정
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; // div의 텍스트는 객체의 author + / + createdAt 3개 포함
  discussionContent.append(contentH2, contentInfo); // 생성된 H2요소와 div요소를 discussionContent에 집어넣음

  /* 체크포인트 생성 구간 */
  const answerCheck = document.createElement('p'); // p 요소 생성
  answerCheck.textContent = obj.answer ? "☑︎" : "◻︎"; // 조건문 obj.answer 두고 참일때 체크있는박스, 거짓일때 체크없는박스
  discussionAnswered.append(answerCheck) // discussionAnswered 요소 안에 answerCheck 요소 추가

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { // element는  ul
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i 변수는 아고라스테이츠디스커션길이보다 작고 1만큼 계속 증가
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // element를 DOM으로 변경한 convertToDiscussion 변수의 객체를 추가
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // render함수

// ul을 전달인자로, ul은 ul요소 ul.discussions__container를 함수 ul에 넣고 돌려서 화면에 그린다
// 넣은 ul을 위 랜더 함수에 넣어 돌린다 반복문사용, element는 ul이다

  /* 질문을 추가할 수 있는 입력 폼 */
  const form = document.querySelector('form.form') ;
  // form태그에 클래스명form을 form 변수에 넣는다
  const title = document.querySelector('div.form__input--title > input');
  // div태그에 클래스명form__input--title 안에 input을 title 변수에 넣는다
  const nameInput = document.querySelector('div.form__input--name > input');
  // div태그에 클래스명form__input--name 안에 input을 nameInput 변수에 넣는다
  const textbox = document.querySelector('div.form__textbox > textarea');
  // div태그에 클래스명form__textbox 안에 textarea을 textbox 변수에 넣는다
  form.addEventListener("submit", (event) => { // submit을 눌렀을때 form 태그 이벤트 추가
    event.preventDefault();
    // 새로운 객체를 만들어야 한다
    // Input에 입력된 값(value)를 넣은 새로운 객체
    // 새로운 객체를 ul요소 아래로 넣어준다
    // 더미 데이터(아고라스테이츠디스커션)에도 추가해준다
    const obj =   { // 객체 생성
      id: "ID",
      createdAt: new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: nameInput.value,
      answer: null,
      bodyHTML: textbox.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    }
    agoraStatesDiscussions.unshift(obj) // 아고라스테이츠디스커션 앞에 생성한 obj(객체)를 넣는다
    const newDiscussion =  convertToDiscussion(obj) // 새로운디스커션 변수를 선언 후 컨버터투디스커션 객체를 넣는다
    ul.prepend(newDiscussion) // 모든 배열을 랜더링하는 ul을 불러와 prepend 요소 내부의 시작 부분에서 새로운디스커션을 넣는다
  });
