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
  // 두번째 컨테이너에 이미지를 생성해 주었다.
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('discussion__avatar--image')
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    // 두번째 컨테이너에 제목인 링크테그를 생성해 주었다.
    const avatarTitle = document.createElement('h2');
    avatarTitle.classList.add('discussion__title'); 
    const avatarTitleLink = document.createElement('a');
    avatarTitleLink.href = obj.url
    avatarTitle.append(avatarTitleLink);
    avatarTitleLink.textContent = obj.title;
    discussionContent.append(avatarTitle);

    // 두번째 컨테이너에 information 을 생성해 주었다.
    const avatarInformation = document.createElement('div');
    avatarInformation.classList.add('discussion__information')
    avatarInformation.textContent = `${obj.author }/ ${ obj.createdAt}`;
    discussionContent.append(avatarInformation);

    // 두번재 컨테이너에 체크이미지를 생성해 주었다.
    const avatarCheckboxImg = document.createElement('p');
    avatarCheckboxImg.classList.add('discussion__answered')
    avatarCheckboxImg.textContent = '☑'
    discussionAnswered.append(avatarCheckboxImg);

    // 두번째 컨테이너까지 다 만들었다. 이제 반복문을 어떻게 써워야 할지 고민을 해봐야 겠다. 

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element.innerHTML=" "
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const elInput = document.querySelectorAll('#name') // input 들을 모두 선택
const elInputName = elInput[0]; // 첫번째 input Name
const elInputTitle = elInput[1]; // 두번재 input Title
const elInputStroy = document.querySelector('#story');
const formSubmit = document.querySelector('.form__submit');

// input 버튼

/*
input 버튼을 눌렀을 경우 생기는 일에 대한 의사코드
1. li태그가 생긴다.
2. li태그 안에 name 과 title, inputarea가 생성이 된다.
3. li 태그의 자식 요소로 생성된 태그에 값을 넣어준다. 
*/

// newContent.onclick = function() {
//   const NewLi = document.createElement('li') //li이를 먼저 생성
//   NewLi.classList.add('discussion__container') //생성된 li이에 class를 부여함.

//   const newInputWrapper = document.createElement('div') // avatar의 div 생성
//   newInputWrapper.classList.add('discussion__avatar--wrapper')
//   const newAvatarImg = document.createElement('img') // avatarimg 생성
//   newAvatarImg.src = agoraStatesDiscussions[0].avatarUrl //img url 지정
//   newAvatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
//   //author 은 input name이 들어가야 한다.
//   newInputWrapper.append(newAvatarImg)
//   // 여기까지 첫번째 컨테이너 완성

//   const newInputContent = document.createElement('div')
//   newInputContent.classList.add('discussion__content')
//   const newInputContentH2 = document.createElement('h2')
//   newInputContentH2.classList.add('discussion__title')
//   const newInputContentLink = document.createElement('a');
//   const newInputInfor = document.createElement('div');
//   newInputInfor.classList.add('discussion__information')
//   newInputContentLink.href = "https://github.com/codestates-seb/agora-states-fe/discussions/6";
//   newInputContentLink.textContent = elInputTitle.textContent
//   //여기에 title이 들어가야 한다.;
//   console.log(newInputContentLink.textContent)

//   newInputContentH2.append(newInputContentLink);
//   newInputContent.append(newInputContentH2, newInputInfor)
  
//   console.log(newInputContent)
// }

const newContent = document.querySelector("#makeContent")
const newName = document.querySelector('#name');
const newTitle = document.querySelector('#title');
const newStory = document.querySelector('#story');

newContent.addEventListener('click',(event) =>{
  event.preventDefault();
  console.log(newContent.value, newName.value, newTitle.value, newStory.value)
  const newObj = {
    id: Date.now(),
    createdAt: new Date(),
    title: newTitle.value ,
    url: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    author:newName.value, //여기가 name이 들어가야 할 곳
    answer: null,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  }

  const newLi = convertToDiscussion(newObj)
  ul.prepend(newLi)

  agoraStatesDiscussions.unshift(newObj)
  render(ul);

})