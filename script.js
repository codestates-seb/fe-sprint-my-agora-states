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

  // 이미지
  const avatarIge = document.createElement('img');
  avatarIge.className = 'discussion__avatar--image';
  avatarIge.src = obj.avatarUrl;
  avatarIge.art = `avator of ${obj.author}`
  avatarWrapper.append(avatarIge);

  // 컨텐츠
  const contentTitle = document.createElement('h3');
  const contentTitleLink = document.createElement('a');
  const contentInfo = document.createElement('div');
  contentTitle.className = 'discussion__title';
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);
  discussionContent.append(contentTitle);

  contentInfo.className = 'discussion__information';
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(contentInfo);
  
  // 답변확인
  const chkAnswer = document.createElement('p')
  chkAnswer.textContent = '☑'
  discussionAnswered.append(chkAnswer);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element.innerHTML = "";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 입력한 데이터 출력
const SUBMIT = document.querySelector(".form__submit");

SUBMIT.addEventListener('click', function(event){
  event.preventDefault();

  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2,'0');
  let date = String(today.getDate()).padStart(2,'0');
  let day = today.getDay();
  let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  let hour = String(today.getHours()).padStart(2,'0');
  let minutes = String(today.getMinutes()).padStart(2,'0');
  let seconds = String(today.getSeconds()).padStart(2,'0');
  
  let current = `${year}-${month}-${date} ${week[day]} ${hour}:${minutes}:${seconds}`;

  const inputName = document.querySelector(".form__input--name input");
  const inputTitle = document.querySelector(".form__input--title input");
  const addDiscussion = {
    id: "작성해야함",
    createdAt: current,
    title: inputTitle.value,
    url: "#",
    author: inputName.value,
    answer: null,
    bodyHTML: '',
    avatarUrl: "#",
  }
  agoraStatesDiscussions.unshift(addDiscussion);
  
  const discussion__container = document.querySelectorAll(".discussion__container");
  discussion__container.forEach(function(i) {
    i.remove();
  })
  render(ul);
  
})

