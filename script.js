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
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.setAttribute('src' ,`${obj.avatarUrl}`);
  avatarWrapper.append(avatarImg)

  const anchorUrl = document.createElement('a');
  anchorUrl.setAttribute('href', `${obj.url}`);
  anchorUrl.textContent = `${obj.title}`

  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');

  const discussionInfo = document.createElement('div');
  discussionInfo.classList.add('discussion__information');
  discussionInfo.textContent = `${new Date(obj.createdAt).toLocaleString()}, ${obj.author}`;

  discussionTitle.append(anchorUrl);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInfo);

const checkBox = document.createElement('p');
checkBox.textContent = '☑';
discussionAnswered.append(checkBox);



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector(`form.form`)
const title = document.querySelector(`div.form__input--title > input`)
const nameInput = document.querySelector(`div.form__input--name > input`)
const textbox = document.querySelector(`div.form__textbox > textarea`)

form.addEventListener("submit",(event) =>{
  event.preventDefault();
const obj = {
    id: "unique id",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/42",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
        
      avatarUrl:
        "https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4",
     
  }

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj)
  ul.prepend(newDiscussion)
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

