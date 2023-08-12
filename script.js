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
  // img
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion__content
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionInformation = document.createElement("div")
  discussionInformation.className = "discussion__information";
  discussionContent.append(discussionTitle, discussionInformation)

  // title
  const innerTitle = document.createElement("a");
  innerTitle.href = obj.url;
  const titleText = document.textContent = obj.title;
  innerTitle.append(titleText);
  discussionTitle.append(innerTitle);

  // information
  const informationText = document.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionInformation.append(informationText);

  // answerde
  const answerCheck = document.createElement("p");
  const checkBox =document.textContent = `☑`;
  answerCheck.append(checkBox);
  discussionAnswered.append(answerCheck);


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


//submit 클릭시 제출이벤트
// form안에 input이 있고 그것을 한번에 제출할 때 form 많이 사용

const form = document.querySelector('form.form');
const inputTitle = document.querySelector('#title');
const inputName = document.querySelector('#name')
const textBox = document.querySelector('#story')

form.addEventListener("submit", (event) => {
  event.preventDefault(); // 새로고침 방지
  // 새로운 객체 만들어야 함
  //Input에 입력된 값(value)를 넣은 새로운 객체
  // 새로운 객체를  ul요소 아래로 넣어준다
  // 더미 데이터(agoraStatesDiscussions)앞에 추가한다.
  const newObj = {
    id: "Unique id",
    createdAt: new Date().toLocaleString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: textBox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(newObj);
  const newDiscussion = convertToDiscussion(newObj);
  ul.prepend(newDiscussion);
  
})

fetch("http://localhost:4000/discussions/")
  .then(response => response.json())
  .then(json => {
    let agoraStatesDiscussions = json; 	//위에서 agoraStatesDiscussions 라는 dummy data를 사용했었다.
    const ul = document.querySelector("ul.discussions__container"); 
    render(ul); //화면에 dom elements를 render 해주는 함수를 위에서 구현했었다.
  })
// 페이지네이션

// const totalCount = agoraStatesDiscussions.length;
// const limit = 10;

// let totalPage = Math.ceil(totalCount / limit);
