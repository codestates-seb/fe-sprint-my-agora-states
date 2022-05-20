// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container"; 
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타
  const avatarWrapperImg = document.createElement("img");
  avatarWrapperImg.className = "discussion__avatar--image";
  avatarWrapperImg.src = obj.avatarUrl;
  avatarWrapperImg.alt = "avatar of " + agoraStatesDiscussions[0].author;
  // 작성자/날짜
  const information = document.createElement('div')
  information.className = "discussion__information"
  information.textContent = obj.author + ' / ' + obj.createdAt;
  // 제목
  const discussionTitle = document.createElement('h2')
  discussionTitle.className = "discussion__title"
  // 체크박스
  const answeredCheckbox = document.createElement('p')
  answeredCheckbox.textContent = '☑';
  // title 
  const titleUrl = document.createElement('a')
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  // append
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarWrapperImg)
  discussionContent.append(discussionTitle,information)
  discussionTitle.append(titleUrl)
  discussionAnswered.append(answeredCheckbox)

  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element.innerHTML = "";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// ul.push()
render(ul);

const submitButton = document.querySelector('#submit')
const submitName = document.querySelector('#name')
// names = submitName.textContent
const submitTitle = document.querySelector('#title')
// titles = submitTitle.textContent
const submitStory = document.querySelector('#story')
const inputObj = {
  id: "D_kwDOHOApLM4APjJi",
  createdAt: "2022-05-16T01:02:17Z",
  title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다",
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
  author: "dubipy",
  answer: {
    id: "DC_kwDOHOApLM4AKg6M",
    createdAt: "2022-05-16T02:09:52Z",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
    author: "Kingsenal",
    bodyHTML:
      '',
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  }
}

const inputSumbit = function () {
  inputObj.author = submitName.value;
  inputObj.title = submitTitle.value;
  inputObj.answer.bodyHTML = submitStory.value;
  agoraStatesDiscussions.unshift(inputObj);
  let li = convertToDiscussion(inputObj);
  ul.prepend(li)
  return render(ul)
}

submitButton.addEventListener('click', inputSumbit)
