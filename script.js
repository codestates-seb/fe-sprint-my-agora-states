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
  const avatarImage = document.createElement("img");
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const idTime = document.createElement("div");
  idTime.className = 'discussion__information';
  idTime.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionTitle, idTime);

  const checkanswered = document.createElement('p');
  checkanswered.textContent = obj.answer ? 'V' : 'X';
  discussionAnswered.append(checkanswered);


  const title = document.createElement('a');
  title.href = obj.url;
  title.textContent = obj.title;
  discussionTitle.append(title);

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




//DOM을 데이터로
function questionStyle(){
  let newobj = {
    author : document.getElementById('name').value,
    title : document.getElementById('title').value,
    story : document.getElementById('story').value,
    createdAt: new Date().toLocaleString(),
    avatarUrl :"https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    alt : "no image",
  }
  return newobj;
}

//입력창에 서브밋하면 반영하기
let form = document.querySelector(".form");
form.addEventListener("submit", submitEvent);
function submitEvent(e){
  e.preventDefault(); //새로고침 안되게
  console.log('good');
  //unshift된 값이 계속 바뀌지 않고 쌓이도록 let 대신 const
  const newobj = questionStyle();
  agoraStatesDiscussions.unshift(newobj);

  console.log(agoraStatesDiscussions[0]);

  ul.prepend(convertToDiscussion(newobj));
  render(ul);
  
}
//이벤트 헨들러는 onclick, onkeyup 등 이고, 이벤트 리스너는 addEventListener 이다.
//이벤트 헨들러 혹은 이벤트 리스너로 이벤트를 등록할 수 있다.
//둘의 차이점은 이벤트 헨들러는 동일한 이벤트를 두 번 등록하면 마지막 것만 실행된다.
//이벤트 리스너로 등록하면 동일한 이벤트를 여러번 등록해도 모두 실행된다.


