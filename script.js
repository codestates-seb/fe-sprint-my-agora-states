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

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title"
  
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);





  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
/*
li class = d

*/
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.




  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg); 


  const checked = document.createElement('p');
  checked.textContent = obj.answer ? "🌟" : "🌙"
  discussionAnswered.append(checked);

//submit 했을때 추가하기



btn.addEventListener('click',onBtn);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
const formName = document.querySelector('#name');
const formTitle = document.querySelector('#title');
const btn = document.querySelector('#submitBtn');
const plusObj = {
  createdAt: "2022-05-16T01:02:17Z",
  title: formTitle.value,
  author: formName.value,
  avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  answer: null
};

const onBtn = (e) => {
plusObj.title = formTitle.value;
plusObj.author = formName.value;

agoraStatesDiscussions.unshift(plusObj);
let li = convertToDiscussion(plusObj);
ul.prepend(li);
formName.value = '';
formTitle.value = '';
}
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    if(agoraStatesDiscussions[i].author == ''){
       agoraStatesDiscussions[i].shift();
    }
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//디스커션 추가 기능
//form 속에
//form__input--name , form__input--title, form__textbox
//input에 값이 입력되고 submit을 누르면 discussion에 집어넣기
//input 애들을 변수 할당하고 submit 함수를 만들어서 discussion에 집어넣는다
