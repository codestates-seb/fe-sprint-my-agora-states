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
  // 이미지 불러오기
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;


//   // 타이틀 불러오기
  const discussionTitle = document.createElement("h2")
  discussionTitle.className = "discussion__title";
//   // 타이틀 url  불러오기
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  discussionTitle.append(titleAnchor);

//  //정보 불러오기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

//  //체크 박스 불러오기
  const discussionAnsweredCheckbox = document.createElement("p");

// 웹페이지에 뿌려주기
  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionTitle, discussionInformation);
  discussionAnswered.append(discussionAnsweredCheckbox);



  titleAnchor.textContent = obj.title;
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionAnsweredCheckbox.textContent = obj.answer ? "✅": "☐";

  li.append(avatarWrapper, discussionContent, discussionAnswered);


  return li;
};

const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name input')
const inputTitle = document.querySelector('.form__input--title input')
const inputQuestion = document.querySelector('.form__textbox textarea')

form.addEventListener('submit',(event) => {
  event.preventDefault(); 
  const obj =  {

      id: "999",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com",
      author: inputName.value,
      answer: null, 
      bodyHTML: inputQuestion.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    }
    agoraStatesDiscussions.unshift(obj);
    ul.prepend(convertToDiscussion(obj));

    inputName.value = '';
    inputTitle.value = '';
    inputQuestion.value = '';

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