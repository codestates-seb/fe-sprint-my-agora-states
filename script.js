// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
 
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // css가 잘먹도록 같은 클래스이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";




  /*소스 데이터.js에서 갖다붙이기*/

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussTitle = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent =obj.title;
  discussTitle.append(titleLink);

  const discussInfo = document.createElement('div');
  discussInfo.className = 'discussion__information';
  discussInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(discussTitle,discussInfo);

  const chk = document.createElement('p');
  chk.textContent = obj.answer? '☑️' : '✏️';
  discussionAnswered.append(chk);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


//폼요소 코드 구현 시작//
const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

// 서브밋단추가 눌리는 순간 폼에 이벤트가 시작됩니다
form.addEventListener ('submit',(event)=>{
  event.preventDefault() //새로고침되는걸 없애고
  const obj =   //폼에 입력된 결과물을 아래 함수에 전달인자로 넣어주면 되지 않을가?
  {
    id: "11", //아이디는 어차피 자동으로 불러와진대요
    createdAt: new Date(),
    title: inputTitle.value, //인풋요소에 값을 타이틀로 해요
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer : null,
    bodyHTML:inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  //기존 데이터 가장 앞에 추가
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  //서브밋 후 입력폼 초기화
  inputName.value = '';
  inputTitle.value ='';
  inputQuestion.value ='';
})






// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);




