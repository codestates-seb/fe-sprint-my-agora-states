// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = createElementWithClass ('div', 'discussion__avatar--wrapper')
  const discussionContent = createElementWithClass('div', 'discussion__content')
  const discussionAnswered = createElementWithClass ('div', 'discussion__answered')

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = createElementWithClass ('img', 'discussion__avatar--image')
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);


const discussionTitle = createElementWithClass('h2', 'discussion__title');
// document.createElement('h2'); 
const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);

const discussionInfo = createElementWithClass('div', 'discussion__information');
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toISOString()}`
  discussionContent.append(discussionInfo);


const checked = document.createElement('p');
  if (obj.answer) {
    checked.textContent = "😇";
  } else {
    checked.textContent = "🤯";
  }
discussionAnswered.append(checked);

  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;


};

const createElementWithClass = (tagname, classname) => {
  const result = document.createElement(tagname);
  if (classname) result.className = classname;
  return result;
};


// const propertyMaker = (element, property, content) => {
//   element[property] = content;
//   return element;
// };​

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



const form = document.querySelector('form.form');



//submit 눌러도 새로고침 방지 
// function onSubmitAddQuestion(event) {
//   event.preverntDefault();
  
// }
// formSubmit.addEventListener("submit", onSubmitAddQuestion);


form.addEventListener("submit", (event) => {
  event.preventDefault();

const author = document.querySelector('div.form__input--name > input').value;
const title = document.querySelector('div.form__input--title >input').value;
const textbox = document.querySelector('div.form__textbox > textarea').value;

const newObj = {
  id : "new id",
  createdAt : new Date().toISOString(),
  title: title,
  url :  "https://github.com/codestates-seb/agora-states-fe/discussions/44",
  author : author,
  bodyHTML: textbox,
  avatarUrl :"https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519_1280.jpg"
};

const discussion = convertToDiscussion(newObj);
agoraStatesDiscussions.unshift(discussion);
ul.prepend(discussion);

form.querySelector('div.form__input--name > input').value = "";
form.querySelector('div.form__input--title >input').value = "";
form.querySelector('div.form__textbox > textarea').value = "";

})

//`agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다. 어떻게 확인하나요?
// console 찍어보면 새로 생성된 discussion 값이 더미데이터처럼 보일 수 있게 하는지
//길종님 


//   인풋만들기 수도태그.
//  1. submit이벤트 발생하면 nameinput.value titleinput.value questioninput.value를 받아옵니다. 
// 2. html요소들을 만들어줍니다. li, div, avatar , h2, a태그 등이 필요해요 (아바타는 귀여운 이미지 하나 따와서 폴더에 저장한걸 쓰면 좋음 ) 
// 3. 각 요소들을 li태그에 이어붙인다음 ul태그에 append 합니다. 
// 4. 각 입력값들을 잘 조합해서 객체로 만든뒤 agorastates 배열에 unshift합니다.