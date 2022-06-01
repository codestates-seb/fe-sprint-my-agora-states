let discussions = localStorage.getItem('agoraStatesDiscussions')
if (!discussions) {
  localStorage.setItem('agoraStatesDiscussions',JSON.stringify(agoraStatesDiscussions))
}
discussions = JSON.parse(discussions)

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
  // div.discussion__avatar--wrapper 정보 갱신
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // div.discussion__content 정보 갱신
  const discussionTitle = document.createElement('h2');
  const titleHref = document.createElement('a');
  titleHref.href = obj.url;
  titleHref.textContent = obj.title;
  discussionTitle.append(titleHref);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information"
  time = Date(obj.createdAt).toLocaleString().slice(4,24)
  discussionInformation.textContent = `${obj.author} / ${time}`

  discussionContent.append(discussionTitle)
  discussionContent.append(discussionInformation)

  // div.discussion__answered 정보 갱신
  // const discussionAnswered = document.createElement('div')
  const isAnswered = document.createElement('p')
  isAnswered.textContent = obj.answer? '☑':'☒'
  discussionAnswered.append(isAnswered)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < discussions.length; i += 1) {
    element.append(convertToDiscussion(discussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

let nameInput = document.getElementById('name')
let titleInput = document.getElementById('title')
let questionInput = document.getElementById('story')

document.querySelector('form.form').addEventListener('submit', function (e) {

  //prevent the normal submission of the form
  e.preventDefault();

  console.log(nameInput.value);    

  now = new Date().toISOString()
  let formData =  
    {
      id: null,
      createdAt: now,
      title: title.value,
      url: null,
      author: nameInput.value,
      answer: null,
      bodyHTML: null,
      avatarUrl: 'https://avatars.githubusercontent.com/u/99641988?s=64&v=4',
    }

  console.log(formData)
  discussions.unshift(formData)
  localStorage.setItem('agoraStatesDiscussions',JSON.stringify(discussions))
  ul.prepend(convertToDiscussion(formData))
  return false

});
