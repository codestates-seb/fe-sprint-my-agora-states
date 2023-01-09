// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";
  // * li.discussion__container 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // * li 자식으로 div 생성
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  // ** div.discussion__avatar--wrapper Fin

  const discussionTitle = document.createElement("h2");
  const link = document.createElement("a");
  discussionTitle.className = "discussion__title"
  link.href = obj.url;
  link.textContent = obj.title;
  discussionTitle.append(link);
  // *** content-title
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(discussionTitle, discussionInformation);
  // *** content-info
  // ** div.discussion__content Fin

  const p = document.createElement("p")
  p.textContent = obj.answer ? '⭕️' : '❌';
  discussionAnswered.append(p)
  // ** div.discussion__answered Fin

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  // * li에 data값을 넣은 div 3개를 붙임
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // return li
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // return ul.append(li)

// form 입력시 discussion이 추가되는 함수.
const actionForm = (event) => {
  event.preventDefault();
  const formNameValue = document.querySelector("#name").value;
  const formTitleValue = document.querySelector("#title").value;
  const formTextValue = document.querySelector("#story").value;

  let discussion = {
    id : Date.now(),
    createdAt: new Date(),
    title: formTitleValue,
    url: "#",
    author: formNameValue,
    answer: null,
    bodyHTML: formTextValue,
    avatarUrl: formNameValue ? `https://avatars.githubusercontent.com/${formNameValue}` : 'https://github.githubassets.com/images/mona-loading-default.gif'
  }
  ul.prepend(convertToDiscussion(discussion));
}
const submit = document.querySelector("input[type='submit']");
submit.onclick = actionForm



/*
1. render 함수에 ul정보 전달
2. render 함수에서 data.js에 있는 배열의 길이만큼 돌면서,
   converToDiscussion 함수에 배열의 값들을 인수로 차례로 전달 (매개변수 : obj),
   converToDiscussion return 값들을 ul에 붙인다.
3. converToDiscussion return 값은 li.
   그리고 그 li 안에 세 개의 div가 있다,
   이 div에는 obj의 프로퍼티 값을 넣음
*/


