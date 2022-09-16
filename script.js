// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

//console.log(agoraStatesDiscussions);

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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const title = document.createElement('h2');
  title.className = "discussion__title";
  
  const url = document.createElement('a');
  url.href = obj.url;
  url.target = '_blank';
  url.textContent = `${obj.title}`

  title.append(url);

  const information = document.createElement('div');
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  
  discussionContent.append(title, information);

  const answered = document.createElement('p');
  answered.textContent = obj.answer ? "☑" :  "□";

  discussionAnswered.append(answered);

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

// 내용 입력 완료 함수
function NotNull() {
  return (inputName.value !== '' && inputTitle.value !== '' && inputStory.value !== '');
}

// 이벤트 리스너
const submitClick = document.querySelector('.submit');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
const alert = document.querySelector('.alert');

submitClick.addEventListener("click", function() {
  if(NotNull()) {

    agoraStatesDiscussions.unshift({
      
      id: "unique number",
      createdAt: new Date(),
      title: inputTitle.value,
      author: inputName.value,
      answer: null,
      bodyHTML: inputStory.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/76990149?v=4",
    });
    
    ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
    
    inputTitle.value = "";
    inputName.value = "";
    inputStory.value = "";

    alert.classList.add('hide');
  }
  else {
    alert.classList.remove('hide');
  }
  

  console.log(agoraStatesDiscussions);
  console.log(inputName.value);
  });
  