// 제출시 로컬스토리지를 불러오는 변수를 전역에서 선언하여 렌더링 함수에도 쓸 수 있게
let getLocalDates = JSON.parse(localStorage.getItem("agoraLocalData"));
agoraStatesDiscussions.unshift(getLocalDates);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // li 요소 생성 및 클래스 맞춰줌
  const li = document.createElement("li");
  li.className = "discussion__container";

  // 이미지 div 요소 생성 및 클래스 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // img 요소 제작, data.js의 배열 데이터 가져오기
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  // HTML에 맞게 자식으로 넣어주기
  avatarWrapper.append(avatarImg);

  // content 불러오기
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // 제목 불러오기
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  // 인포메이션 불러오기
  const discussionInfomation = document.createElement("div");
  discussionInfomation.className = "discussion__information";
  discussionInfomation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  // 마무으리
  discussionContent.append(discussionTitle, discussionInfomation);

  // 답변 유무 불러오기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const isAnswer = document.createElement("p");
  isAnswer.textContent = obj.answer !== null ? "☑" : "☒";
  discussionAnswered.append(isAnswer);
  discussionContent.append(discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 제출
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  // submit 이벤트 필수, 새로고침 안되게
  // 로컬스토리지화 되면서 새로고침돼도 안없어지니 필요없어짐
  // event.preventDefault();
  // 제출된 내용(Value) 변수화
  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textbox = form.querySelector("div.form__textbox > textarea").value;
  // 들어갈 임시 객체 그릇 만들기
  // 입력되면 객체 그릇에 내용 담기
  // data.js에 옮기고 convertToDiscussion로 DOM 변환
  // render에 넣어서 렌더링 되게 하기

  const newObj = {
    id: "new id",
    createdAt: new Date(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author,
    answer: null,
    bodyHTML: textbox,
    // 랜덤 이미지 출력
    avatarUrl: "https://i.pravatar.cc/300",
  };
  // 로컬스토리지에 저장, getItem으로 불러와야함
  localStorage.setItem("agoraLocalData", JSON.stringify(newObj));

  // submit 후 빈칸으로 리셋
  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // for (let i = 0; i < getLocalDates.length; i++) {
  //   element.append(convertToDiscussion(getLocalDates));
  // }
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 시계
const clock = document.getElementById("clock");
function getClock() {
  // 현재 시간 가져옴, 시간분초 다 따로 가져와야함
  const date = new Date();
  // get~으로 시분초 가져와서 변수 할당
  // number이기 때문에 String 변환해 textContent로 갖고오기
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());
  // 10 이상 즉 2자리수 이상일 시 0을 붙이게 삼항연사자 썼음
  clock.textContent = `${hours < 10 ? `0${hours}` : hours} : 
    ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}
getClock();
// 코드 조각이나 함수를 1000ms로 계속 실행시키게 만드는
setInterval(getClock, 1000);

/**
 * 페이지 스크롤에 따른 요소 제어
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!

const toTopEl = document.querySelector("#to-top");
// window: 윈도우 객체, 윈도우 창을 뜻함, 우리가 보는 화면 자체
window.addEventListener(
  "scroll",
  _.throttle(function () {
    // lodash 라이브러리를 통해 등록 후 여기서 사용
    console.log(window.scrollY);
    if (window.scrollY > 500) {
      // 상단으로 스크롤 버튼 보이기!
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      // 상단으로 스크롤 버튼 숨기기!
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
); // 300 ms라는 뜻, 스크롤을 굴려도 0.3초마다 실행되게!
// _.throttle(함수() {}, 시간)
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener("click", function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, 0.7, {
    scrollTo: 0, // 회면의 위치를 0으로
  });
});
