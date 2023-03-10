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

  //이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of + ${obj.author}`;
  avatarWrapper.append(avatarImg);

  //제목
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion_title";
  discussionContent.append(contentTitle);
  
  //링크
  const contentLink = document.createElement('a');
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);

  //작성자 정보
  const contentInformation = document.createElement('div');
  contentInformation.className = "discussion__information";
  contentInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentInformation);

  //답변 체크
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(checked);

  /* if (obj.answer) { //답변이 있는 경우
    contentAnswer.textContent = "☑";
  } else { //답변이 없는 경우
    contentAnswer.textContent = "☒";
  }*/

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//form 제출하는 함수 만들기
const form = document.querySelector('form.form');
const title = document.querySelector('input#title');
const author = document.querySelector('input#name');
const story = document.querySelector('textarea#story');

form.addEventListener('submit', (event) => {
  event.preventDefault(); //form이 가지고 있는 기본속성을 막는 것(제출하면 새로고침 되는 것)
  //하나의 객체를 만들어서 converToDiscussion 함수에 넣어서 li로 만든 다음 ul요소에 append한다
  const newDiscussion = {
    id: "unique value",
    createdAt: new Date(),
    title: title.value,
    url: "https://discord.com/channels/959363007106924565/1073261980896473088",
    author: author.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl: "https://thumbs.dreamstime.com/b/ancient-statue-rgb-color-icon-ancient-statue-rgb-color-icon-art-history-ancient-greek-sculpture-depicting-realistic-human-form-219099524.jpg"

  };
  ul.prepend(convertToDiscussion(newDiscussion))
  title.value = '';
  author.value = '';
  story.value = '';
  })

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
