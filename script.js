// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

const avatarWrapper = document.createElement('div');
avatarWrapper.className = 'discussion__avatar--wrapper';
const discussionContent = document.createElement('div');
discussionContent.className = 'discussion__content';
const discussionAnswered = document.createElement('div');
discussionAnswered.className = 'discussion__answered';
  // 왜 새롭게 만들어주어야하는가?
  // convertToDiscussion 이 함수의 목적은 값을 추출해서 새로운 il뭉치를 만들기 위해 


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const face = document.createElement("img") // 프로필 사진
  face.src = obj.avatarUrl;
  face.alt = "avatar of" + obj.author;
  avatarWrapper.append(face);
  

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);
  

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createAt).toLocaleTimeString()}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  discussionContent.append(discussionTitle, discussionInfo);


  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li; // il요소를 위의 함수를 통해 가공해서 append
};

// 폼요소 가져오기


// const formTitle = document.querySelector("div.form__input--title >input")
// const nameInput = document.querySelector("form__input--name >input")
// const textBox = document.querySelector("form__textbox > textarea ")

// form.addEventListener("submit", (event) => {
//   // 새로운 객체 만들어야 한다
//   // Input에 입력된 값을 넣은 새로운 객체가 필요
//   // 새로운 객체를 ul 아래로 넣어준다
//   // 더미데이터를 추가해준다.
//   const newObj = {
//     id: "id",
//     createdAt: new Date().toLocaleTimeString(),
//     title: formTitle.value,
//     author: nameInput.value,
//     answer: null,
//     };
//   agoraStatesDiscussions.unshift(newObj);

//   ul.prepend(li)
// })




// 새로운 글 생성
const newDiscussion = document.querySelector('form');

newDiscussion.addEventListener('submit', (event) => {
  event.preventDefault();
  const yourName = document.querySelector('#name').value; 
  const yourTitle = document.querySelector('#title').value;
  const addNewDiscussion = {
    createdAt: new Date().toLocaleString(),
    title: yourTitle,
    author: yourName
  }
  agoraStatesDiscussions.unshift(addNewDiscussion);

  while(ul.children.length > 1) {
    ul.removeChild(ul.lastChild);
  }

  render(ul);
}); 




// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { // 여기 엘리먼트는 ul.discussions__container 이게 들어옴
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); 
// 화면에 그리는 작업을 렌더링이라고 하는데 지금 이 함수는 렌더링함수 이렇게 호출하면서 끝난다.
