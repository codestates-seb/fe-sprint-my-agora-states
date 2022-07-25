const agoraStatesDiscussions = require('./data.js');
require('./style.css');
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// 현지 시간 변환 함수
const getLocalDate = function(date) {
  const loacalDate = date.toLocaleString(); // YYYY.MM.DD. 오전 HH:MM:SS
  
  return loacalDate;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => { // obj -> n번째 객체가 전달
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // 프로필 영역 div
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div"); // 내용 영역 div
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div"); // 답변 영역 div
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement('img'); // 프로필 img
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl; // img url
  avatarImg.alt = 'avatar of ' + obj.author; // img alt (시각장애인에게 정보제공 -> 웹 접근성 증가)
  avatarWrapper.append(avatarImg); // 프로필 영역에 img 추가

  const discussionTitle = document.createElement('h2'); // 글 제목
  const titleUrl = document.createElement('a'); // 글 제목 링크
  titleUrl.textContent = obj.title;
  titleUrl.href = obj.url;

  discussionTitle.classList = "discussion__title";
  discussionTitle.append(titleUrl);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div'); // 글 정보 (작성자/작성일)
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${getLocalDate(new Date(obj.createdAt))}`;
  discussionContent.append(discussionInfo);

  const answerCheck = document.createElement("p");
  const checkBoxIcon = document.createElement("i");

  if(obj.answer !== null){
    checkBoxIcon.className = "fa-solid fa-circle-check";
  } else {
    checkBoxIcon.className = "fa-regular fa-circle-check";
  }
  answerCheck.append(checkBoxIcon);
  discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = ""; // 기존 렌더링 데이터 초기화

  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// submit 버튼에 이벤트 함수 연결
const submitBtn = document.querySelector(".form__submit");
  submitBtn.addEventListener('click', function(event) {
    // submit시 자동 새로고침 방지
    event.preventDefault();

    const formName = document.getElementById("name");
    const formTitle = document.getElementById("title");
    const today = new Date().toLocaleDateString();
    
    const formObj = {
      id: "",
      createdAt: today,
      title: formTitle.value,
      url: "https://github.com/yoohyunju",
      author: formName.value,
      answer: null,
      bodyHTML: "",
      avatarUrl: "https://avatars.githubusercontent.com/u/59650985?v=4",
    }
    
    // 배열 앞에 객체 추가 후 렌더링
    agoraStatesDiscussions.unshift(formObj);
    render(ul);
});

/*
<어드밴스드>
1. 현지 시간 적용 (ex. 오전 10:02:17)
2. 페이지네이션 (한 페이지 10개씩)
3. 새로고침해도 디스커션 유지 (LocalStorage)
4. 답변이 있는 경우, 답변도 화면에 렌더링
*/