// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const discussionTop = document.createElement("div");
  discussionTop.className = "discussion__top";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checked = document.createElement('p');
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  const discussionAuthor = document.createElement('span');
  discussionAuthor.className = 'discussion__Author'
  const discussionTitle = document.createElement('h3');
  discussionTitle.className = 'discussion__title';
  const discussionTitleLink = document.createElement('a');
  const discussionDate = document.createElement('div');
  discussionDate.className = 'discusson_date';
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 상단 프로필
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  discussionAuthor.textContent = obj.author;
  avatarWrapper.append(avatarImg)

  discussionTop.append(avatarWrapper)
  discussionTop.append(discussionAuthor);

  // 타이틀
  discussionTitleLink.setAttribute('href', obj.url)
  discussionTitleLink.setAttribute('target','_blank')
  discussionTitleLink.textContent = obj.title
  discussionTitle.append(discussionTitleLink)
  discussionContent.append(discussionTitle)

  // 인포

  discussionDate.textContent = `${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(discussionDate);

  // 대답 완료 표시
  // checked.textContent = obj.answer ? '답변 완료!' : '답변 대기중';

  if(obj.answer !== null){
    checked.classList.add('complete')
    checked.classList.remove('waiting')
    checked.textContent = '답변 완료!'
  } else {
    checked.classList.add('waiting')
    checked.classList.remove('complete')
    checked.textContent = '답변 대기중'
  }

  discussionAnswered.append(checked)

  li.append(discussionTop, discussionContent, discussionAnswered);
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


// 디스커션 추가 기능
// submit 버튼을 누르면 디스커션에 추가되어야한다.

const form = document.querySelector("form.form");
const formAuthor = form.querySelector(".form__input--name > input");
const formTitle = form.querySelector(".form__input--title > input");
const formTextbox = form.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: formTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: formAuthor.value,
    answer: null,
    bodyHTML: formTextbox.value,
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1173873201039806464/R1lWiNES_400x400.jpg",
  };
  agoraStatesDiscussions.unshift(obj);
  
  // 렌더링
  ul.prepend(convertToDiscussion(obj))
  formAuthor.value = '';
  formTitle.value = '';
  formTextbox.value = '';
  
  
});

// document ready 이벤트

document.addEventListener("DOMContentLoaded", function () {

  form.classList.add('active')

});

