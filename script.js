// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줌
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
  
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;

  const contentInfo = document.createElement('div');
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  contentInfo.className = 'discussion__information';

  contentTitle.append(titleAnchor);

  discussionContent.append(contentTitle, contentInfo);  


  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '☑' :'☒';  //삼항 연산자  (조건) ? value1 : value2 조건이 참인 경우 value1 실행, 거짓이면 value2실행
  discussionAnswered.append(checked);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector(".form");
const inputName = document.querySelector(".form__input--name > input");
const inputTitle = document.querySelector(".form__input--title > input");
const inputQuestion = document.querySelector(".form__textbox > textarea");


form.addEventListener('submit',(event) =>{ //form 에서 이벤트가 실행된다.
  event.preventDefault();  //새로고침 되는 것을 막아준다. 제출은 되지만 새로고침은 따로 되지 않게 만들어준다.

  const obj = {  
    id : '999' , //id는 자동으로 값이 나와서 임의값을 준다.
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null, //없어도 된다. 
    bodyHTML: inputQuestion.value, //본문 내용 부분. 내가 질문 작성한 내용을 적는 곳이다.
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }


  //기존 데이터 가장 앞에 추가.
  agoraStatesDiscussions.unshift(obj);
  ul.prepend (convertToDiscussion(obj));  //converToDiscussion함수에 넣어서 돔으로 만들고, ul에 맨 앞으로 추가해주기!

  //작성지 다시 비워지게 만들어주자.
  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';

})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수
const render = (element) => {
//agoraStatesDiscussions 이 데이터에 있는 모든 요소를 순회하면서
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //ul(디스커션들이 들어있는 컨테이너)에 append 한다(추가한다.)
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); //베열의 i번째 요소 > 이게 바로 obj render 함수로 obj에 아고라스테이츠에 데이터가 전달된다
  }
  return;
};



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링
const ul = document.querySelector("ul.discussions__container");
render(ul);


