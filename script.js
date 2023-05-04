// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const allContent = document.createElement("div");
  allContent.className = "all__content";

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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h3');
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const a = document.createElement('a')
  a.href = obj.url;
  a.textContent = obj.title;
  discussionTitle.append(a);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleString();
  discussionContent.append(discussionInformation);

  const p = document.createElement('p')
  if (obj.answer !== null) {
    p.textContent = '✅'
  }
  else {
    p.textContent = '✋'
  };
  discussionAnswered.append(p);
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const answer = document.createElement("li");
  answer.className = "answer__container";
  if (obj.answer !== null) {
    const answerAvatarWrapper = document.createElement("div");
    answerAvatarWrapper.className = "answer__avatar--wrapper";
    const answerContent = document.createElement("div");
    answerContent.className = "answer__content";


    const answerAvatarImg = document.createElement('img');
    answerAvatarImg.className = "answer__avatar--image";
    answerAvatarImg.src = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
    answerAvatarImg.alt = 'avatar of ' + obj.answer.author;
    answerAvatarWrapper.append(answerAvatarImg);

    const answerText = document.createElement('p');
    answerText.className = "answer__text";
    answerText.innerHTML = obj.answer.bodyHTML;
    answerContent.append(answerText);


    const answerInformation = document.createElement("div");
    answerInformation.className = "answer__information";
    answerInformation.textContent = obj.answer.author + ' / ' + new Date(obj.answer.createdAt).toLocaleString();
    answerContent.append(answerInformation);

    answer.append(answerAvatarWrapper, answerContent);
  }

  answer.style.display = 'none'

  p.addEventListener('click', function () {
    if (p.textContent === '✅') {
      if (answer.style.display === 'none') {
        answer.style.display = ''
      }
      else {
        answer.style.display = 'none'
      }
    }
  })
  allContent.append(li, answer);
  return allContent;




};

const form = document.querySelector('form.form');
const title = document.querySelector('input#title')
const author = document.querySelector('input#name')
const story = document.querySelector('textarea#story')
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newDiscussion = {
    id: 'unique value',
    createdAt: new Date(),
    title: title.value,
    url: '#',
    author: author.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'

  };
  ul.prepend(convertToDiscussion(newDiscussion))
  title.value = "";
  author.value = "";
  story.value = "";
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

//페이지네이션
