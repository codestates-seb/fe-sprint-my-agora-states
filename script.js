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

  // 아바타
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 컨텐츠
  // h2 > a > title
  const content_h2 = document.createElement('h2');
  content_h2.className = 'discussion__title'
  const content_a = document.createElement('a');  
  content_a.href = obj.url;
  content_a.textContent = obj.title;

  content_h2.append(content_a);
  discussionContent.append(content_h2);

  // div > author / createdAt
  const content_div = document.createElement('div');
  content_div.className = 'discussion__information';
  const content_p = document.createElement('p');
  content_p.textContent = `${obj.author} ${new Date(obj.createdAt).toLocaleDateString()}`;

  content_div.append(content_p);
  discussionContent.append(content_div);

  // 체크
  const answered_div = document.createElement('div');
  answered_div.className = 'discussion__answered';
  answered_div.textContent = obj.answer ? '🌝' : '🌚';
  discussionAnswered.append(answered_div);

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

// 새로운 질문 추가
const input_name = document.querySelector('#name');
const input_title = document.querySelector('#title');
const input_story = document.querySelector('#story');

const formSubmit = document.querySelector(".form__container form");
formSubmit.addEventListener('submit', formFunc)

function formFunc (event){
  event.preventDefault();
  
  const newObj = {
    id: "unique value",
    createdAt: new Date(),
    title: input_title.value,
    url: "http://google.com",
    author: input_name.value,
    answer: null,
    bodyHTML: input_story.value,  
    avatarUrl: "https://avatars.githubusercontent.com/u/25774030?s=64&v=4"
  }
  
  ul.prepend(convertToDiscussion(newObj))

  input_title.value = "";
  input_name.value = "";
  input_story.value = "";
}