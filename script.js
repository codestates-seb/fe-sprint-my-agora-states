// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const agoraFormCont = document.querySelector(".form__container")
const agoraForm = agoraFormCont.querySelector(".form");
const nameInput = agoraFormCont.querySelector(".form__input--name input");
const titInput = agoraFormCont.querySelector(".form__input--title input");
const questionInput = agoraFormCont.querySelector(".form__textbox textarea");

//제출하기 클릭 시 
const showBtn = document.querySelector(".discussion__header .show-btn")
const submitBtn = agoraFormCont.querySelector(".submit-btn")

// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
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
  const discussionContentFooter = document.createElement("div")
  discussionContentFooter.className = "discussion__footer"

  // 프로필 사진
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  // 타이틀
  const discussionTit = document.createElement("h3");
  discussionTit.className = "discussion__title";
  const discussionTitAuthor = document.createElement("a");
  discussionTitAuthor.textContent = obj.title;
  discussionTitAuthor.href = obj.url;
  discussionContent.append(discussionTit, discussionContentFooter);
  discussionTit.append(discussionTitAuthor);

  // 하단 정보 footer
  const discussionInfo = document.createElement("div");
  const createdAtDate = new Date(obj.createdAt);
  let atHours = createdAtDate.getHours();

  //오전, 오후 나누기
  if (Number(atHours) >= 13) {
    atHours = "오후 " + String(atHours - 12).padStart(2, "0");
  } else {
    atHours = "오전 " + String(atHours).padStart(2, "0");
  }
  const atMinutes = String(createdAtDate.getMinutes()).padStart(2, "0");
  const atSeconds = String(createdAtDate.getSeconds()).padStart(2, "0");

  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${atHours}:${atMinutes}:${atSeconds}`;

  //질문 유무
  const discussionAnswer = document.createElement("span");
  if (obj.answer === null) {
    discussionAnswer.classList.add("answer-no");
    discussionAnswer.textContent = '미답변';
  } else {
    discussionAnswer.classList.add("answer-yes");
    discussionAnswer.textContent = '답변 완료';
  }

  //유저 정보 넣어주기
  discussionContentFooter.append(discussionInfo, discussionAnswer);

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


//질문하기 버튼 클릭 시 팝업 창 보이기
function showForm() {
  agoraFormCont.classList.remove("hide");

  //팝업창 닫기
  const closeBtn = agoraFormCont.querySelector(".close-btn");
  closeBtn.addEventListener("click", function () {
    agoraFormCont.classList.add("hide");
  })
}
showBtn.addEventListener("click", showForm);


function saveAgora(){
  localStorage.setItem('AGORA_KEY', JSON.stringify(agoraStatesDiscussions));
}

const savedAgora = localStorage.getItem('AGORA_KEY');

function paintAgora(){
  const paintAgora = JSON.parse('AGORA_KEY');
  agoraStatesDiscussions = paintAgora;
}


//submit 할 경우
function agoraSubmit(event) {
  event.preventDefault();
  
  const title = titInput.value;
  const author = nameInput.value;
  const bodyHTML = questionInput.value;

  //객체 생성
  let creatObj = {
    id: "id",
    createdAt: new Date(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author,
    answer: null,
    bodyHTML: bodyHTML,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  
  agoraStatesDiscussions.unshift({ ...creatObj });
  const discussion = convertToDiscussion(creatObj);

  ul.prepend(discussion);

  //submit 이후 입력 값 초기화
  nameInput.value = "";
  titInput.value = "";
  questionInput.value = "";

  //입력 후 클릭 시 팝업창 사라지게
  agoraFormCont.classList.add("hide");
  saveAgora();
  paintAgora();
};

agoraForm.addEventListener("submit", agoraSubmit);