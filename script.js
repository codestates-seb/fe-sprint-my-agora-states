// 리스트에 요소 추가
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 유저 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarImg.className = 'discussion__avatar--image'
  avatarWrapper.append(avatarImg);

  // 질문 제목
  const questionTitle = document.createElement('h2');
  questionTitle.className = 'discussion__title';
  questionTitle.textContent = obj.title;
  discussionContent.append(questionTitle);

  // 질문 정보
  const questionInfo = document.createElement('div');
  questionInfo.className = 'discussion__information';
  questionInfo.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(questionInfo);

  // 답변 여부 설정
  if (obj.answer) {
    discussionAnswered.textContent = '답변완료';
    discussionAnswered.classList.add('isanswered');
  } else {
    discussionAnswered.textContent = '답변대기';
  }

  // block 전체에 링크 걸기
  li.addEventListener('click', () => {
    location.href = obj.url;
  })

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// Data Rendering

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const ul = document.querySelector("ul.discussions__container");
render(ul);

// Modal Focusing

const myModal = document.querySelector('#staticBackdrop');
myModal.addEventListener('shown.bs.modal', () => {
  document.querySelector('#name').focus();
});

// Form Handling

const nameInput = document.querySelector('#name');
const titleInput = document.querySelector('#title');
const storyInput = document.querySelector('#story');
const formBtns = document.querySelectorAll('.modal-dialog button');
const submitBtn = document.querySelector('.form__submit');

// Check Input Validation

const checkSubmitValid = () => {
  return (nameInput.value !== '' && titleInput.value !== '' && storyInput.value !== '');
}

// Manage Submit Button Activation state

const toggleSubmitBtn = () => {
  if (checkSubmitValid()) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', '');
  }
}

nameInput.onkeyup = toggleSubmitBtn;
titleInput.onkeyup = toggleSubmitBtn;
storyInput.onkeyup = toggleSubmitBtn;

// Submit Event Handler

submitBtn.addEventListener('click', () => {
  const inputData = {
    "author": nameInput.value,
    "avatarUrl": "https://blog.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg",
    "title": titleInput.value,
    "url": "https://github.com/codestates-seb/fe-sprint-my-agora-states",
    "createdAt": new Date(),
  };
  agoraStatesDiscussions.unshift(inputData);
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: '질문이 등록되었습니다.',
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'my-sweetalert2-popup-class',
    }
  });

  ul.insertBefore(convertToDiscussion(agoraStatesDiscussions[0]), ul.firstChild);
});

// Form Reset
const formReset = () => {
  nameInput.value = '';
  titleInput.value = '';
  storyInput.value = '';
}

formBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    formReset();
  });
});

// Popup

document.querySelector('h1').addEventListener('click', () => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: '질문이 등록되었습니다.',
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'my-sweetalert2-popup-class',
    }
  });
});