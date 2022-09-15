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
  // 이미지 가져옴
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  // 타이틀 가져옴
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);
  // 디스커션 인포메이션 가져오기
  const disscussionInformation = document.createElement("div");
  disscussionInformation.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleString();
  discussionContent.append(disscussionInformation);
    
  // 체크표시
  const discussionAnswer = document.createElement("p");
  discussionAnswer.textContent = '☑';
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input')
const nameInput  = document.querySelector('div.form__input--name > input')
const textbox = document.querySelector('div.form__textbox > textarea')
form.addEventListener("submit", (event) => {
  //submit 됨과 동시에 창이 다시 실행됨 -> 초기화면으로 그것을 막기위해사용
  event.preventDefault();
  // 새로운 개체 만들기 , 더미 데이터에도 추가
  const obj = {
      id: "id",
      createdAt: new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: nameInput.value,
      answer: null,
      bodyHTML:textbox.value,
        avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    }
  // input에 받은 값을 넣은 새로운 객체 만들기
  agoraStatesDiscussions.unshift(obj);
  // 새로운 객체를 ul 요소로 넣어준다
  ul.prepend(convertToDiscussion(obj));
})

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
