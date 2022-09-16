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

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title'
  const discussionTitleLink = document.createElement('a');
  const discussionTitleLinkText = document.createTextNode(obj.title);
  discussionTitleLink.setAttribute('href', obj.url);
  discussionTitleLink.appendChild(discussionTitleLinkText);
  discussionTitle.appendChild(discussionTitleLink);
  discussionContent.append(discussionTitle);


  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information'
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInformation);

  const discussionCheckbox = document.createElement('img');
  if (obj.answer === null) {
    discussionCheckbox.className = 'answer__complete'
    discussionCheckbox.src = 'https://i.postimg.cc/0Nxrs6v1/Png-Item-5043128.png';
    discussionCheckbox.alt = 'answer complete';
  } else {
    discussionCheckbox.className = 'answer__notcomplete'
    discussionCheckbox.src = 'https://i.postimg.cc/brL9xXRs/Png-Item-692608.png';
    discussionCheckbox.alt = 'answer not complete';
  }
  discussionAnswered.append(discussionCheckbox);


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



//디스커션 추가

const elForm = document.querySelector(".form");
const elAuthor = elForm.querySelector("div.form__input--name > input");
const elTitle = elForm.querySelector("div.form__input--title > input");
const elTextbox = elForm.querySelector("div.form__textbox > textarea");

elForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let elAvatar = agoraStatesDiscussions[Math.floor(Math.random() * agoraStatesDiscussions.length)];

  const obj = {
      id: 'random id',
      createdAt: new Date(),
      title: elTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: elAuthor.value,
      answer: null,
      bodyHTML: elTextbox.value,
      avatarUrl: elAvatar.avatarUrl,
    };

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);

  elAuthor.value = '';
  elTitle.value = '';
  elTextbox.value = '';
  elAvatar.avatarUrl= '';
})
