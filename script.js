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
  // const discussionInformation = document.createElement('div');
  // discussionInformation.className = "discussion__information";
//li자식요소들을 새롭게 입히는 과정, append 해주면 새로 li요소를 만들어냄.

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  discussionTitle.append(titleAnchor)
  titleAnchor.textContent = obj.title;
  titleAnchor.href = obj.url;

  const discussionInfo = document.createElement('div')
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  
  discussionContent.append(discussionTitle, discussionInfo)
  // discussitonTitle.textcontent = obj.title;

  // const titleLink = document.createElement('a');
  // titleLink.href = obj.url;
  // titleLink.textContent = obj.title;





  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
// console.log(obj);

// discussionContent.appendChild(titleLink);


// obj.author + ' / ' + obj.createdAt;

if (obj.answer !== null) {
 discussionAnswered.textContent = '☑'
};




  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form')
const title = document.querySelector('div.form__input--title > input')
const nameInput = document.querySelector('div.form__input--name > input')
const textbox = document.querySelector('div.form__textbox > textarea')

form.addEventListener('submit', (event) => {
//새로운 객체 필요
//input에 입력된 값(value) 넣은 새로운 객체.
//새로운 객체를 ul요소 아래로 넣어준다.
//더미데이터(agoraStatesDiscussions)에도 추가해준다. (배열안에 앞으로 추가)
 
event.preventDefault()
const obj = {
    //새로운 객체 만들기
    
      id: "unique id",
      createdAt: new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: nameInput.value,
      answer: null,
      bodyHTML: textbox.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion)

  console.log(title.value);
})


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //element에는 ul(여기서 ul에 element) 요소인 디스커션컨테이너가 들어옴
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
//렌더함수를 호출하면서 끝남

