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
  // 이미지 불러오기
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);


  // 타이틀 불러오기, 링크 불러오기
  const discussionTitle = document.createElement("h3");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;

  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);
  

  // 날짜랑 아이디 불러오기
  const discussionInfo = document.createElement('div')
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = obj.author + '/' + obj.createdAt;

  discussionContent.append(discussionInfo);


  //체크박스 불러오기
  const checkedAnswered = document.createElement('p');
  discussionAnswered.append(checkedAnswered);
  obj.answer
    ? (checkedAnswered.textContent = '✅')
    : (checkedAnswered.textContent = '☑️');
 
  // li에 div 넣기
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  // ul.prepend(li);
  return li;
};


// 디스커션 추가하기
const formSubmit = document.querySelector('#submitBtn');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
// 현재시간 구현 서치 


// submitBtn클릭 이벤트
submitBtn.addEventListener ('click', (e) => {
  e.preventDefault(); //submitBtn클릭해도 새로고침 되지 않음

  const newArr = {};

  newArr.author = inputName.value;
  newArr.title = inputTitle.value;
  newArr.story = inputStory.value;
  newArr.avatarUrl = "https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4"
  agoraStatesDiscussions.unshift(newArr);

  
  ul.innerHTML = "";
  render(ul);
  // 입력칸 내용 초기화
  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";


})

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










  

 
  










