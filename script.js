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

  // 프로필 이미지 생성
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 제목 링크 생성
  const titleLink = document.createElement('h2');
  titleLink.className = "discussion__title";
  discussionContent.append(titleLink);
  const titleLinkA = document.createElement('a');
  titleLink.append(titleLinkA);
  titleLinkA.href = obj.url;
  titleLinkA.target = '_blank';
  titleLinkA.textContent = obj.title;

  // 답변여부 아이콘 생성
  const icanswerCheck = document.createElement('span');
  discussionAnswered.append(icanswerCheck)
  if(obj.answer === null){
    icanswerCheck.classList.add('null')
  }

  // 만든 이, 만든 날짜 생성
  const createDate = document.createElement('div');
  createDate.className = "discussion__information";
  createDate.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(createDate);

  // 답변내용 생성
  // const elAnswer = document.createElement('div');
  // elAnswer.className = "discussion__answeredBox";
  // if(obj.answer !== null){
  //   elAnswer.innerHTML = obj.answer.bodyHTML;
  // }







  // li.append(avatarWrapper, discussionContent, discussionAnswered, elAnswer);
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


let elInpName = document.querySelector('#name');
let elInpTitle = document.querySelector('#title');
let elInpQuestion = document.querySelector('#story');
let elInpSubmit = document.querySelector('.form__submit').querySelector('input')
let form = document.querySelector("form.form");

// 초기화: localStorage에 데이터가 없으면 agoraStatesDiscussions 배열을 초기화하고, 있으면 localStorage에서 agoraStatesDiscussions 배열을 가져옵니다.
if (!localStorage.getItem('agoraStatesDiscussions')) {
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(agoraStatesDiscussions));
} else {
  agoraStatesDiscussions = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
}

// form submit 이벤트 핸들러
form.addEventListener("submit", (event) => {
  event.preventDefault(); // 서브밋 이벤트로 사용시 꼭 함께 사용해주어야 함, 새로고침 막아줍니다.
  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: elInpTitle.value,
    answer: null,
    url: "#",
    author: elInpName.value,
    bodyHTML: elInpQuestion.value,
    avatarUrl: "profile.jpg"
  };

  const discussion = convertToDiscussion(newObj);
  ul.prepend(discussion);

  agoraStatesDiscussions.unshift(newObj);
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(agoraStatesDiscussions)); // agoraStatesDiscussions 배열을 localStorage에 저장합니다.

  // 폼 입력값 초기화
  elInpName.value = "";
  elInpTitle.value = "";
  elInpQuestion.value = "";
});

const ul = document.querySelector("ul.discussions__container");
render(ul);