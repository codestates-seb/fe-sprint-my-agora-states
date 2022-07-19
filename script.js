// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 튜토리얼 2
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //  실시간 세션
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // li에 들어갈 세 개의 div 요소 추가하기
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 프로필 사진이 들어갈 image 요소 추가
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl; // 주소가 불려옴.
  avatarImg.alt = "avatar of" + obj.author; // alt도 꼭 써주는 게 좋음
  // 나오기 위해서는 append를 해줘야 함.
  avatarWrapper.append(avatarImg)




  const discussionTitle = document.createElement('h2');
  // 제목에 링크 나오면 a(anchor) 붙여서 하면 됨
  const titleAnchor = document.createElement('a');
  discussionTitle.append(titleAnchor);
  // titleAnchor.textContent = "안녕하세요 제목입니다"; // 이러면 제목이 들어간다
  titleAnchor.textContent = obj.title; // 이렇게 하면 각자 제목이 붙는다
  discussionContent.append(discussionTitle);

  // div 만들 것
  const discussionInfo = document.createElement('div');
  // textContent 어디 있는지 찾기
  // createAt=> createdAt이고, toLocalString에 () 붙여줘야함.
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}` // 날짜 넣기
  discussionContent.append(discussionTitle,discussionInfo)


  //-------------------------------------------------------------------------

  // div 요소를 li.discussion__container에 자식 요소로 추가함. 순서를 바꿨더니 실행됨.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

  const ul = document.querySelector('ul.discussion__container');
  ul.append(li);
};

//------------------------------실시간 세션 --------------------

const form = document.querySelector('form.form'); // 나중에 또 다른 form생길 수도 있으니까 class명도 찾아와
// 제목으로 입력한 title 가져오기
// div.form__input--title > input으로 해서 정확한 위치 지정하기
const title = document.querySelector('div.form__input--title > input');      
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea')
const answer = document.querySelector('div.discussion__answered')

form.addEventListener("submit", (event) =>{       // submit이 들어올 때 어떤 일이 발생할지
  event.preventDefault(); // 이게 왜 있어야 할까?
  // 새로운 객체를 만들어야 함
  // input에 입력된 값(value)를 넣은 새로운 객체
  // 새로운 객체를 ul 요소 아래로 넣어준다
  // 더미 데이터 (agoraStatesDiscussion)에도 추가
  const obj = {                                   // 객체로 저장
    //data.js에서 뽑아오기
    id: "unique id",
    createdAt: new Date().toLocaleString(),       // 이걸 기록한 날짜가 저장된다.
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: answer.value,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
    // 요 밑이 문제여서 싹 사라졌었네 왜 문제였을까?
    agoraStatesDiscussions.unshift(obj);
    const newDiscussion = convertToDiscussion(obj);
    ul.prepend(newDiscussion);
  
});




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
