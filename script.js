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
  const discussionText = document.createElement('div');
  discussionText.className = "discussion__text";
  discussionText.textContent = "본문보기";

  const answerContainer = document.createElement('div');
  answerContainer.className = 'answer__container';
  const answerWrapper = document.createElement("div");
  answerWrapper.className = "discussion__avatar--wrapper";
  const answerContent = document.createElement("div");
  answerContent.className = "discussion__content";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 객체를 파라미터로 받아 속성 채워주기 (여기서 파라미터는 obj)

  // 아바타 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 글
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionTitle.textContent = obj.title;
  const discussionStory = document.createElement('div');
  discussionStory.className = 'discussion__story';
  discussionStory.innerHTML = obj.bodyHTML;

  discussionText.addEventListener('click', function() {
    discussionStory.classList.toggle('show');
  });

  // 작성자 및 날짜
  const discussionAuthor = document.createElement('div')
  discussionAuthor.className = 'discussion__information';
  const authorName = document.createElement('span')
  authorName.className = 'author__name';
  authorName.textContent = obj.author;
  const authorDate = document.createElement('span')
  authorDate.className = 'author__date';
  authorDate.textContent = obj.createdAt;
  discussionAuthor.append(authorName, authorDate)
  avatarWrapper.append(discussionAuthor)
  discussionContent.append(avatarWrapper, discussionText);

  // 답변 여부
  const discussionAnsweredBox = document.createElement('p')
  if (obj.answer === null) {
    discussionAnsweredBox.textContent = '답변없음';
    discussionAnswered.className += ' noReply';
  } else {
    discussionAnsweredBox.textContent = '답변보기';
    discussionAnsweredBox.addEventListener('click', function() {
      answerContainer.classList.toggle('show');
    })

      // 답변 내용
    const answerAvatarImg = document.createElement('img');
    answerAvatarImg.className = 'discussion__avatar--image';
    answerAvatarImg.src = obj.answer['avatarUrl'];
    answerAvatarImg.alt = 'avatar of ' + obj.answer['author'];

    const answerComment = document.createElement('p');
    answerComment.className = 'answer__comment';
    answerComment.innerHTML = obj.answer['bodyHTML'];

    const answerAuthor = document.createElement('div')
    answerAuthor.className = 'discussion__information';
    const answerName = document.createElement('span')
    answerName.className = 'author__name';
    answerName.textContent = obj.author;
    const answerDate = document.createElement('span')
    answerDate.className = 'author__date';
    answerDate.textContent = obj.createdAt;
    answerAuthor.append(answerName, answerDate)
    answerWrapper.append(answerAvatarImg, answerAuthor);
    answerContent.append(answerComment);
    answerContainer.append(answerWrapper, answerContent);
  }
  discussionAnswered.appendChild(discussionAnsweredBox);
  li.append(discussionTitle, discussionContent, discussionStory, discussionAnswered, answerContainer);
  return li;
};

// submit click시 새로운 디스커션 생성

const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
const form = document.querySelector('form');
const submitButton = document.querySelector('[type=Submit]');

form.addEventListener('submit', function (event) {
  event.preventDefault();
})

const qustionToggle = document.querySelector('.form__title');
qustionToggle.addEventListener('click', function() {
  form.classList.toggle('show');
})



const date = new Date();

const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const hours = ('0' + date.getHours()).slice(-2); 
const minutes = ('0' + date.getMinutes()).slice(-2);
const seconds = ('0' + date.getSeconds()).slice(-2); 

const dateStr = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes  + ':' + seconds + 'Z'; ;


function newDiscussion(event) {
  if(event.target.type === 'submit') {
    if(inputTitle.value === '' || inputName.value === '' || inputStory.value === '') {
      return ;
    }
  agoraStatesDiscussions.push({
      createdAt: dateStr,
      title: inputTitle.value,
      author: inputName.value,
      answer: null,
      bodyHTML: inputStory.value,     
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    })
    console.log(agoraStatesDiscussions);
    ul.prepend(convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length - 1]));
  }
  inputTitle.value = '';
  inputName.value = '';
  inputStory.value = '';
}

submitButton.addEventListener('click', newDiscussion);

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
