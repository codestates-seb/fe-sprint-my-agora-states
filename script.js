// 모달 만들기
let modal = document.querySelector("#modal");
/* let modalBackground = document.querySelector('.half_black'); */
  //팝업 노출
  function openPopup() {
    modal.classList.add("modal_open");
    document.querySelector('body').classList.add("scroll_hidden")
/*     modalBackground.classList.remove('hide') */
  }

  //팝업 닫기
  function closePopup() {
    modal.classList.remove("modal_open");
    document.querySelector('body').classList.remove("scroll_hidden")
/*     modalBackground.classList.add('hide') */
    // 데이터 리셋
    inputName.value = '';
    inputTitle.value = '';
    txtQuestion.value = '';
  }

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
 // 아바타 
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarImage.style.width = '50px';
  avatarWrapper.appendChild(avatarImage);

  // 타이틀
  const titleName = document.createElement("h2");
  const titleATag = document.createElement("a");
  titleName.classList.className = 'discussion__title';
  titleATag.textContent = obj.title;
  titleATag.href = obj.url;
  titleName.appendChild(titleATag);
  discussionContent.appendChild(titleName); 
  

  // 인포
  const info = document.createElement("div");
  info.className = 'discussion__information';
  info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-KR')}`;
  discussionContent.appendChild(info);

  // Answered
  const answered = document.createElement('p');
  answered.textContent = obj.answer === null?
  "답변 대기중.."  :  "답변 완료"

  if (obj.answer === null) {
    answered.classList.add("comment-null")
  } else {
    answered.classList.add("comment-ok")
  }
  discussionAnswered.append(answered);

  



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




const form = document.querySelector("form.form");
const inputName = document.querySelector("div.form__input--name > input");
const inputTitle = document.querySelector("div.form__input--title > input");
const txtQuestion = document.querySelector("#story");

form.addEventListener("submit", (event) => {
  // submit 버튼 클릭 시 새로고침 되는거 삭제
  event.preventDefault();
  // 팝업 꺼지게 설정
  modal.classList.remove("modal_open");
  document.querySelector('body').classList.remove("scroll_hidden")
/*   modalBackground.classList.add('hide') */

  //데이터 추가
  const newQuestion = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: inputName.value,
    answer: null,
    bodyHTML: txtQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  }
  //데이터 ul 첫번째에 집어넣기
  agoraStatesDiscussions.unshift(newQuestion);

  // 선택한 요소 내부의 시작부분에 삽입하기
  ul.prepend(convertToDiscussion(newQuestion));

  // 데이터 리셋
  inputName.value = '';
  inputTitle.value = '';
  txtQuestion.value = '';

  render(ul);
})
