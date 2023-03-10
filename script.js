// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container shadow__box"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content  white";
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title white";
  const contentInformation = document.createElement('div');
  contentInformation.className = "discussion__information  white";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered  white";
  const answerCheck = document.createElement("img");
  answerCheck.className = "answer-check white";

  const a = document.createElement('a');
  a.className = "link white"
  a.href = obj.url;
  
  a.textContent = obj.title;
  contentInformation.textContent = `${obj.author}  / ${new Date(obj.createdAt).toLocaleString()}`;
  

  if(obj.answer){
    answerCheck.src = "ic-check.png"
  } else {
    answerCheck.src = "ic-x.png"
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  discussionContent.append(contentTitle, contentInformation);
  contentTitle.append(a);
  discussionAnswered.append(answerCheck);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const form = document.createElement("form");
form.className = "form";

// submit 누르면 input에서 가져온 값들을 새로 만든 li에 넣어 ul의 첫번째 자식으로 append
function quSubmit() {
  let name = document.getElementById('name').value;
  let title = document.getElementById('title').value;
  let story = document.getElementById('story').value;

  let obj = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: new Date(),
    title: `${title}`,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: `${name}`,
    answer: null,
    bodyHTML: `${story}`,
    avatarUrl: 
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  }

  agoraStatesDiscussions.unshift(obj);
  ul.insertBefore(convertToDiscussion(obj),ul.firstChild);
  console.log(agoraStatesDiscussions);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//top 버튼 구현
const $topBtn = document.querySelector(".toTheTop");

// 버튼 클릭 시 맨 위로 이동
$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });  
}