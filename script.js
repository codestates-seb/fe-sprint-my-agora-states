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
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.setAttribute('src' ,`${obj.avatarUrl}`);
  avatarWrapper.append(avatarImg)

  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  
  const anchorGit = document.createElement('a');
  anchorGit.setAttribute('href', `${obj.url}`);
  anchorGit.textContent = `${obj.title}`;
  discussionTitle.append(anchorGit);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.classList.add('discussion__information');
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`
  discussionAnswered.append(discussionInfo);

  const discussionCheck = document.createElement('p');
  discussionCheck.classList.add('discussion__answered');
  discussionCheck.textContent = `☑`;
  discussionAnswered.append(discussionCheck);


  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const modalBtn = document.querySelector('.add-btn');
  modalBtn.addEventListener('click', () => {
    openModal();
  });

  const closeBtn = document.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    closeModal();
  });



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



const openModal = () => {
  const modal = document.querySelector('.form__container');
  modal.classList.remove('hide');
  modal.classList.add('fadeIn');
}


const closeModal = () => {
  const modal = document.querySelector('.form__container');
  modal.classList.add('hide');
  modal.classList.remove('fadeIn');
  // modal.children[0].addEventListener('click', (v) => {
  //   v.stopPropagation();
  // });
}