console.log(agoraStatesDiscussions[0]);

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
  const newDate = new Date(obj.createdAt);
  const localDateString = newDate.toLocaleString();
  questionInfo.className = 'discussion__information';
  questionInfo.textContent = obj.author + ' / ' + localDateString;
  discussionContent.append(questionInfo);

  // 답변 여부 설정
  if (obj.answer) {
    discussionAnswered.textContent = '답변완료';
    discussionAnswered.classList.add('isanswered');
  } else {
    discussionAnswered.textContent = '답변대기';
  }

  // 글 내용
  let isClicked = false;
  li.addEventListener('click', () => {
    if (!isClicked) {
      isClicked = true;
      li.classList.add('clicked');
      const questionDetail = document.createElement('div');
      questionDetail.className = 'question__detail';
      questionDetail.insertAdjacentHTML('beforeend', `
        <div class="question__content">
          ${obj.bodyHTML}
        </div>
        `);
      if (obj.answer) {
        questionDetail.insertAdjacentHTML('beforeend', `
            <div class="answer__content">
              ${obj.answer.bodyHTML}
            </div>
          `);
      }

      li.insertAdjacentElement('afterend', questionDetail);

      const closeButton = document.createElement('div');
      closeButton.className = 'question__detail--close-button';
      closeButton.insertAdjacentHTML('beforeend', `
          <button type="button">close</button>
        `);

      questionDetail.insertAdjacentElement('beforeend', closeButton);

      closeButton.addEventListener('click', () => {
        isClicked = false;
        li.classList.remove('clicked');
        questionDetail.remove();
      });
    } else {
      isClicked = false;
      li.classList.remove('clicked');
      const questionContent = li.nextElementSibling;
      if (questionContent && questionContent.classList.contains('question__detail')) {
        questionContent.remove();
      }
    }
  });

  // 목록 추가하기
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// Data Rendering

const ul = document.querySelector("ul.discussions__container");
let currentPage = 1;
const perPageEl = 8;
const totlaPage = document.querySelector('#totalPages');

const render = (element, currentPage) => {
  totlaPage.textContent = Math.ceil(agoraStatesDiscussions.length / perPageEl);
  const startIndex = (currentPage - 1) * perPageEl;
  const endIndex = startIndex + perPageEl;
  for (let i = startIndex; i < endIndex && i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

// Render First Page

render(ul, currentPage);

const clearPage = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// Render Next Page

const nextPageBtn = document.querySelector('#nextPageBtn');
nextPageBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(agoraStatesDiscussions.length / perPageEl)) {
    currentPage += 1;
    document.querySelector('#currentPage').textContent = currentPage;
    clearPage(ul);
    render(ul, currentPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
});

// Render Previous Page

const prevPageBtn = document.querySelector('#prevPageBtn');
prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    document.querySelector('#currentPage').textContent = currentPage;
    clearPage(ul);
    render(ul, currentPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
});

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
    "bodyHTML": storyInput.value.replace(/\n/g, '<br>'),
  };
  agoraStatesDiscussions.unshift(inputData);
  ul.insertBefore(convertToDiscussion(agoraStatesDiscussions[0]), ul.firstChild);
  clearPage(ul);
  render(ul, currentPage);
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