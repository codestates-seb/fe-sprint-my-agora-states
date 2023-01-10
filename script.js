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
  avatarImg.className='discussion__avatar--image';
  avatarImg.src=obj.avatarUrl;
  avatarImg.alt='avatar of '+obj.author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h4');
  contentTitle.className = 'discussion__title';
  const contentLink = document.createElement('a');
  contentLink.href=obj.url;
  contentLink.textContent=obj.title;
  const contentInfo = document.createElement('div');
  contentInfo.className='discussion__information';
  contentInfo.textContent=`${obj.author} / ${new Date(obj.createdAt).toDateString()}`;
  contentTitle.append(contentLink);
  discussionContent.append(contentTitle, contentInfo)

  const answerCheck = document.createElement('div');
  answerCheck.className='discussion__answered';
  const answerLink = document.createElement('a');
  const answerBox = document.createElement('img');
  answerBox.className = 'answerImg';
  // const answerDiv = document.createElement("div");
  // const answerAvatarWrapper = document.createElement("div");
  // const answerDiscussionContent = document.createElement("div");
  // const answerAvatarImg = document.createElement('img');
  // const answeredTitle = document.createElement('h3');
  // const answeredLink = document.createElement('a');
  // const answeredInfo = document.createElement('div');

  if (obj['answer']===null) {
    answerBox.src='https://cdn.pixabay.com/photo/2014/04/02/10/44/cross-mark-304374_1280.png';
    answerLink.href='https://github.com/codestates-seb/agora-states-fe/discussions';
  } else {
    answerBox.src='https://cdn.pixabay.com/photo/2012/04/11/10/39/tick-27406_1280.png';
    answerLink.href=obj['answer'].url
    // answerDiv.className = "answered__container answeredHide";
    // answerAvatarWrapper.className = "discussion__avatar--wrapper";
    // answerDiscussionContent.className = "discussion__content";
    // answerAvatarImg.className='discussion__avatar--image';
    // answerAvatarImg.src=obj['answer'].avatarUrl;
    // answerAvatarImg.alt='avatar of '+obj['answer'].author;
    // answerAvatarWrapper.append(answerAvatarImg);
    // answeredTitle.className = 'discussion__title';
    // answeredLink.href=obj['answer'].url;
    // answeredLink.textContent='답변보러가기';
    // answeredInfo.className='discussion__information';
    // answeredInfo.textContent=`${obj['answer'].author} / ${new Date(obj['answer'].createdAt).toDateString()}`;
    // answeredTitle.append(answeredLink);
    // answerDiscussionContent.append(answeredTitle, answeredInfo);
    // answerDiv.append(answerDiscussionContent, answerAvatarWrapper, answerDiscussionContent);
  }

  answerLink.append(answerBox);
  discussionAnswered.append(answerCheck, answerLink);

  li.append(avatarWrapper, discussionContent, discussionAnswered); //, answerDiv
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

// ㅇㅣ하

// const nameId = document.querySelector('#name');
// const title = document.querySelector('#title');
// const story = document.querySelector('#stroy');

// let notice = {
//   author: nameId, 
//   title: title,
//   url: story,
// }


// 다시

const form = document.querySelector("form.form");


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textbox = form.querySelector("div.form__textbox > textarea").value;

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author,
    answer: null,
    bodyHTML: textbox,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  form.querySelector("div.form__input--name > input").value ="";
  form.querySelector("div.form__textbox > textarea").value = "";
  form.querySelector("div.form__input--title > input").value = "";
}); 