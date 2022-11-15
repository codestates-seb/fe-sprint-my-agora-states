// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const secdis = document.querySelector('.discussion__wrapper')
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

  // agoraStatesDiscussions의 아바타사진 집어넣기
  const avatarImg = document.createElement('img'); // avatarImg에 <img/> 요소를 생성, 할당하고
  avatarImg.className = 'discussion__avatar--image'; // avatarImg에 클래스 지정해주고
  avatarImg.src = obj.avatarUrl; //artarImg의 src속성으로 agoraStatesDiscussions의 0번째 배열인 객체의
                                                        // avatarUrl 키의 값을 할당 
  avatarImg.alt = 'avatar of ' + obj.author;//artarImg의 alt속성으로 agoraStatesDiscussions의 0번째 배열인 객체의
                                                                  // author 키의 값을 할당 
  avatarWrapper.append(avatarImg);

// 가운데 discussionContent 넣기
  // title
const a = document.createElement('a'); // a 에 <a></a> 요소를 생성, 할당하고
const h2 = document.createElement('h2'); 
h2.className = 'discussion__title';
a.href = obj.url;
a.textContent = obj.title;
h2.append(a);
discussionContent.append(h2);
  // 아이디, 시간
const contentinfo = document.createElement('div');
contentinfo.className = 'discussion__information';
contentinfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; // 현지시간 ${new Date}
discussionContent.append(contentinfo);

// 끝부분 discussionAnswered 넣기
// 이건 if문을 써야겠는걸?
const div2 = document.createElement('div');
const p = document.createElement('p');
const msg = document.createElement('i');
msg.className = 'fa-solid fa-comment';
const msgSlash = document.createElement('i');
msgSlash.className = 'fa-regular fa-comment';

  if (obj.answer === null) {
  // p.textContent = '❎';
  discussionAnswered.append(msgSlash);
} else {
  // p.textContent = '✅';
  discussionAnswered.append(msg);
}
//p.textContent = obj;answer ? '체크' : 'X';
div2.append(p);
discussionAnswered.append(div2);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
const realli = document.querySelector(".discussion__container");
// todo1 : #name에 작성한 내용이 > agoraStatesDiscussions.author value로 >> 객체.author = #name 이런식
// todo2 : #title에 작성한 내용이 > agoraStatesDiscussions.title value로 >> 객체.title = #title
// todo3 : #story에 작성한 내용이 > agoraStatesDiscussions.bodyHTML 로 >>객체.bodyHTML = #story
// >> 빈 객체 선언할당, 객체에 위에꺼 추가하고, 그 객체를 agoraStatesDiscussions.push(그객체)로 추가하는 반복문
// const submitButton = document.querySelector('#submitbut') //submitButton에 버튼할당
// submitButton.addEventListener('click',함수(인자) {}) //
// const form  = document.getElementById('signup');

// form.addEventListener('submit', (event) => {
  // handle the form data
// });
// const submitButton = document.querySelector('#submitbut'); //submitButton에 버튼할당
// const name = document.querySelector('#name').value;
// const title = document.querySelector('#title').value;
// const story = document.querySelector('#story').value;
// submitButton.addEventListener('click', submit); //
// function submit (event) {
//   event.preventDefault();
//   let name = document.querySelector('#name').value;
//   let title = document.querySelector('#title').value;
//   let emptyobject = Object();

//   console.log(realli);
//   console.log(name);
//   console.log(title);
//   emptyobject.author = name;
//   emptyobject.title = title;
//   console.log(emptyobject);
//   // emptyobject.bodyHTML = story;
//   agoraStatesDiscussions.unshift(emptyobject);
//   console.log(agoraStatesDiscussions);
//   // ul.removeChild();
//   render (ul);

// }
const form = document.querySelector('form.form'); //form요소이면서 class가 form
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');


form.addEventListener('submit', (event) => {
  event.preventDefault(); //submit 자체의 새로고침효과를 막아주는 역할
  // 내용물들을 모아서 하나의 obj로 만들어서 함수에 넣으면 되지 않을까?
  const obj =   {
    id: "random",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  // 기존의 데이터앞에 추가 unshift
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj)); //ul요소 앞쪽에 convertToDiscussion(obj)요소를 추가

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';


})
// time에 실시간 넣어주기
const statustime = document.querySelector('#time')
const date = new Date();
const hours = date.getHours();
const minutes = String(date.getMinutes()).padStart(2,'0'); // 2글자가 안되면 앞에 0을 넣어줌 . 그런데 .getMinutes()로 얻는 값이 number, padStart는 string에만 가능. > String()사용
statustime.textContent = `${hours}:${minutes}`




// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
//script.js 파일 내부에는 agoraStatesDiscussions 배열의 모든 데이터를 반복문을 사용하여 화면에 렌더링하는 함수인 render()가 
//이미 작성되어 있습니다. 
// render() 함수가 어떻게 사용되고 있는지 코드를 천천히 살펴본 후, convertToDiscussion() 함수를 완성해 보세요.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) { // agoraStatesDiscussions의 길이보다 i가 작을 때 까지
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // element에 (convertToDiscussion(agoraStatesDiscussions[i]) 함수 발동)
                                                   // 한 결과값을 자식노드로 넣는다
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

render(ul); // 이게 마지막에 돌아서 뿌려주는건데 


