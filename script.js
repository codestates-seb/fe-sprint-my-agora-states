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
  // 이미지 데이터 삽입 
  const imgElement = document.createElement('img');
  imgElement.className = 'discussion__avatar--image';
  imgElement.src = obj.avatarUrl;
  imgElement.alt = 'avata of ' + obj.author;
  avatarWrapper.append(imgElement);
  //  제목 입력 
  const TitleElement = document.createElement('h2');
  TitleElement.className = "discussion__title";
  const aTag = document.createElement('a');
  aTag.href = obj.avatarUrl;
  aTag.textContent = obj.title;
  TitleElement.append(aTag);
  discussionContent.append(TitleElement);

  // 내용 삽입 
  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author + " / " +  obj.createdAt;
  discussionContent.append(discussionInfo);

  // 대답확인 
  const p_tag = document.createElement('p');
  p_tag.textContent = '☑';
  discussionAnswered.append(p_tag);

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
// const title = document.querySelector('#title');
// const name =  document.querySelector('#name');
// // const story = document.querySelector('#story');
// // button
// const btn = document.querySelector('.form__submit input');

// const submitInfo = {
//   "id": name.value,
//   "createdAt": new Date().toDateString,
//   "title": title.value,
//   "url": "https://github.com/codestates-seb/agora-states-fe/discussions/45",

// }
// btn.addEventListener('click', function() {
//     agoraStatesDiscussions.append(submitInfo);
//     render(ul);
//     console.log('입력 완료');
// });

// 입력폼의 요소들을 가져와서 객체에 내용을 채운다.
const submitForm = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const storyInput = document.querySelector('#story');

submitForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  const obj = {
    id: "temporaryId",
    title: titleInput.value,
    author: nameInput.value,
    avatarUrl: "https://nooks-list.com/img/rct.png" , 
    createdAt: new Date().toLocaleString()
  }
  
  // 기존에 있던 디스커션 배열의 앞에 객체를 넣어준다.
  agoraStatesDiscussions.unshift(obj);
  // 배열에 넣은 객체를 함수에 인자로 전달해 화면에 추가한다.
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
  // 입력 값 초기화 
  initInput();
});
function initInput (){
  nameInput.value = '';
  titleInput.value = '';
  storyInput.value = ''; 
}