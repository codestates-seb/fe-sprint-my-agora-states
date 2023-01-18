// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// li들 dom. 새로운 li 뭉치를 만들기 위한 과정
// obj에 agoraStatesDiscussions[i] 들어감
// 수정
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

// li요소들
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
// li 안 요소들
  const avatarImg = document.createElement("img");
// 요소 속성들
  avatarImg.className = "discussion__avatar--image";
  avatarImg.alt = "avatar of" + obj.author
  avatarImg.src = obj.avatarUrl;
// img 태그 div 요소 안에 넣기
  avatarWrapper.append(avatarImg);

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const contentTitle = document.createElement("h2");
  const contentTitleLink = document.createElement("a")
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;

  const contentInfo = document.createElement('div');
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`

  contentTitle.append(contentTitleLink)
  discussionContent.append(contentTitle, contentInfo)
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 삼항연산자 사용해서 비교
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// 값만 부여해주고 삽입되지 않았던 것들을 위치 지정
// li 요소로
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// element에 ul.discussions__container가 들어온다
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // agoraStatesDiscussions의 인덱스별 출력을 작성한걸로
    // 변경해주는 과정
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);




// form @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// #### form은 데이터를 받기 위한 것들
const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector(".form__input--title > input");
const inputQuestion = document.querySelector('.form__textbox > textarea');


// submit

form.addEventListener('submit', (event) => {
  event.preventDefault() ; // 서브밋 이벤트 때 사용
  const obj = {
    id: "999",
    createAt: new Date().toLocaleString,
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
  }

  // 새로 추가한거 기존 데이터 가장 앞에 추가.(date.js)

  agoraStatesDiscussions.unshift(obj);
  // convertTO~에 넣어서 하나의 DOM으로 만들어준다
  // 그리고 마지막으로 전체 컨테이너에 추가해서 맨 앞으로 가지고 온다(data.js에 있던 거를 밖으로)
  ul.prepend(convertToDiscussion(obj));

  //submit 후 초기화
  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
})