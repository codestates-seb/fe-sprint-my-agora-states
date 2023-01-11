debugger;
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
    const avatarImg = document.createElement("img");
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of' + obj.author;

    avatarImg.classList.add('discussion__avatar--image')

    avatarWrapper.append(avatarImg);

    /*discussionContent*/
    const distitle = document.createElement("h2");
    distitle.classList.add('discussion__title')
    const titleAnchor = document.createElement("a");
    
    
    titleAnchor.textContent = obj.title;
    titleAnchor.href = obj.url;
    
    distitle.append(titleAnchor);
    discussionContent.append(distitle);

    //<div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>//
    const disinfo = document.createElement("div");
    disinfo.textContent = obj.author + '/' + obj.createdAt;
    disinfo.classList.add('discussion__information')

    discussionContent.append(disinfo);

    
    const answeredP = document.createElement("p");



    answeredP.textContent = '☑';

    
    discussionAnswered.append(answeredP);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// onclick event - 새로운 discussion 추가 기능//
const submit = document.querySelector(".form__submit");
submit.addEventListener("click", addDiscussion);

function addDiscussion() {
  let newArray = {};
  agoraStatesDiscussions.unshift(newArray);
  newArray.id = 'a';
  newArray.title = titleText;
  
}

// type event - 사용자가 text를 입력할 때 마다 값을 저장//
const titleText = document.querySelector(".form__input--title")
titleText.addEventListener("onkeydown", addTitleText);

function addTitleText() {
  let titleOnKey = titleText.textContent;
  return titleOnKey;
} 

const questionText = document.querySelector(".form__textbox")
questionText.addEventListener("onkeydown", addFormText);

function addFormText() {
  let formOnKey = questionText.textContent;
  return formOnKey;
}


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
