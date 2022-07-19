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

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.className = "discussion__avatar--image";
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const answerh2 = document.createElement('h2');
  answerh2.className = "discussion__title";
  const answerh2a = document.createElement('a');
  answerh2a.href = obj.url;
  answerh2a.textContent = obj.title;
  answerh2.append(answerh2a);
  discussionContent.append(answerh2);

  const answeredContent = document.createElement('div');
  answeredContent.className = "discussion__information";
  const answertext = document.createTextNode(obj.author + " / " + new Date(obj.createdAt).toLocaleTimeString());
  answeredContent.appendChild(answertext);
  discussionContent.append(answeredContent);

  //체크박스
  const discussionAnsweredP = document.createElement('p');
  if(obj.answer === null){
    discussionAnsweredP.append('ㅁ');
  } else{
    discussionAnsweredP.append('☑');
  }
  discussionAnswered.append(discussionAnsweredP);

  // let pageNum = 1;
  // const paging = document.querySelector('ul.page');
  // const pageSu = paging.document.createElement('li');
  // // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // if(obj.length > 0){
  //   for(let i = 0; i < obj.length ; i++){
  //     if(i < 10) { 
  //       pageSu.name = `${pageNum}`;
  //       pageSu.textContent = pageNum;
  //     }
  //   }
  // }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}
let data = [];
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    data.push(agoraStatesDiscussions[i])
    window.localStorage.setItem('data',JSON.stringify(data));
    element.append(convertToDiscussion(data[i])); 
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const form = document.querySelector("form.form");
const author = document.querySelector("div.form__input--name > input");
const title = document.querySelector("div.form__input--title > input");
const textarea = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  // 새로운 객체를 만들어야한다.
  // input에 입력된 값(value)를 넣은 새로운 객체.
  // 새로운 객체를 ul요소 아래로 넣어준다.
  // 더미 데이터(agoraStatesDiscussions)에도 추가한다.
  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "javascript:void(0)",
    author: author.value,
    answer: null,
    bodyHTML: textarea.value,
    avatarUrl: "./고양이.jpg"
  };

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);

  title.value = "";
  author.value = "";
  textarea.value = ""; 

})