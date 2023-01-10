

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  

  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  const QuestionTitle = document.createElement("h2");
  const QuestionAnchor = document.createElement("a");
  QuestionAnchor.className = 'discussion__titleLink'
  QuestionAnchor.href = obj.url;
  QuestionAnchor.textContent = obj.title;
  QuestionTitle.append(QuestionAnchor);
  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionIformation = document.createElement("div");
  discussionIformation.className = "discussion_information";
  discussionIformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(QuestionTitle, discussionIformation);

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "🙆" : "🙅";
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);


  return li;  
}

//agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
//선언만 해서 실행 안됨 

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);



const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => { 
  event.preventDefault();
  const newData = {
    id: Math.round(Math.random() * 100000),
    createAt: new Date().toISOString(),
    title: title.value,
    url: "http://github.com.codestates-seb/agora-states-fe/discussions", 
    author: author.value,
    answer: null,
    bodyHtml : textbox.value,
    avatarUrl:
    "https://postfiles.pstatic.net/MjAyMTA3MDVfMjM2/MDAxNjI1NDgzMDE5MzA0.XtJ8b8l3GEB5bNLjy7mgUD-sKA8P15yYHwX9IA6Yn70g.RxZnW5_qVaVizNk26oxU1e2VEntlm3WtbTcKN8xL26Qg.JPEG.hyeo1207/%EC%B9%B4%ED%86%A1_%ED%88%AC%EB%AA%85%EC%82%AC%EC%A7%84.jpg?type=w966"
  };
  agoraStatesDiscussions.unshift(newData);

  while (ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
  render(ul);
});






