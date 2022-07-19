// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.  ->41개 확인
console.log(agoraStatesDiscussions); 

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  console.log(obj)

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요. 
  
  //이미지 
  const avatarImage = document.createElement('img');
  // avatarImage.className = 'discussion__avatar--image'
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = "avatar of " + obj.author;

  avatarWrapper.append(avatarImage);

  //discussion_content
  const discussionTitle = document.createElement('h2')
  const titleAnchor = document.createElement('a')
  discussionTitle.append(titleAnchor)
  titleAnchor.textContent = obj.title;

  discussionContent.append(discussionTitle)

  //div
  const discussionInfo = document.createElement('div')
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  
  discussionContent.append(discussionTitle, discussionInfo)

  // const titleH2 = document.createElement('h2');
  // const titleATag = document.createElement('a');
  // titleATag.innerHTML = obj.title;
  // titleATag.href = obj.url;
  // titleH2.append(titleATag);
  // discussionContent.append(titleH2)

  //체크박스 가져오고 연결하기
  const checkBoxPtag = document.createElement("p")
  checkBoxPtag.textContent = "☑";
  discussionAnswered.append(checkBoxPtag);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//내가 객체 넣을 array
const form = document.querySelector('form.form')
const title = document.querySelector('div.form__input--title > input')
const name = document.querySelector('div.form__input--name > input')
const textbox = document.querySelector ('div.form__textbox > input')

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // 바로 위에 칸 풀어보기

  //새로운 객체를 만들어야 한다.
  //input에 입력된 값(value)를 넣은 새로운 객체.
  //새로운 객체를 ul요소 아래로 넣어준다.
  //더미 데이터 (agoraStatesDiscussions)에도 추가해준다.

  const obj = {
      id: "unique id",
      createdAt: new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: name.value,
      answer: null,
      bodyHTML: textbox.value,
      answer: "☑",
      avatarUrl: 
      "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    }
    
  agoraStatesDiscussions.unshift(obj);
  const newdiscussion = convertToDiscussion(obj)
  ul.prepend(newdiscussion)

  //

});


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
