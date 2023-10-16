//  <li class="discussion__container">
// <div class="discussion__avatar--wrapper">
// <img class="discussion__avatar--image"
//   src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
//   alt="avatar of kimploo">
// </div>
// <div class="discussion__content">
// <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
// <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
// </div>
// <div class="discussion__answered"><p>☑</p></div>
// </li>





// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// interface Discussion {
//   id: string;
//   createdAt: string;
//   title: string;
//   url: string;
//   author: string;
//   answer?: Answer | null;
//   bodyHTML: string;
// }
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  //생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  const discussionAnchor = document.createElement('a');
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  const discussionImformation = document.createElement('div');

  //수정

  //아바타 래퍼에 아바타 이미지를 삽입한다.

  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;
  discussionAnchor.target = '_blank';
  avatarImg.src = obj.avatarUrl;

  // 삼항연산자를 사용해서 answer가 null이라면
  // discussionAnswered.textContent에 빈 네모를 할당하고 아니라면 ✔️를 할당해줘
  // if (obj.answer === null) {
  //   discussionAnswered.textContent ='◻️'
  // }
  // else{
  //   discussionAnswered.textContent ='✔️'
  // }
  discussionAnswered.textContent = obj.answer === null ? '❔' : '💬'
  discussionImformation.textContent = `${obj.author}:${new Date(obj.createdAt).toLocaleString()}`

  //삽입
  avatarWrapper.append(avatarImg);
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle);
  discussionTitle.append(discussionImformation);
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

const submitButton = document.querySelector('.form__submit>input')

const addDiscussion = (event) => {
  event.preventDefault();
  const formName = document.getElementById('name').value;
  const formTitle = document.getElementById('title').value;
  const formStory = document.getElementById('story').value;
  let today = new Date();


  const createdData = {
    id: "D_kwDOHOApLM4APjJi" + Math.random(),
    // 현재 날짜
    createdAt: today,
    title: formTitle,
    url: "https://github.com/",
    author: formName,
    answer: null,
    avatarUrl: "https://d1fdloi71mui9q.cloudfront.net/fIOhlzNjR3682oussW7o_poster"
  };
  ul.prepend(convertToDiscussion(createdData))
}
submitButton.addEventListener('click', addDiscussion)





