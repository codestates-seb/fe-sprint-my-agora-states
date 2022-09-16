// data.js 에서 정보를 뽑아내서 추가하는 역할
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
//여기까지 프레임 만드는 과정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarImg.className = "discussion__avatar--image"
  avatarWrapper.append(avatarImg);
  //image 
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
    const discussionTitle = document.createElement("h2");
    discussionTitle.className = "discussion__title";
      const titleAnchor = document.createElement('a');
      titleAnchor.href = obj.url;
      titleAnchor.textContent = obj.title;
      discussionTitle.append(titleAnchor);
      //content
    const discussionInformation = document.createElement("div");
    discussionInformation.className = "discussion__information";
    discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
    //author&date
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
    discussionAnswered.textContent = obj.answer ? "☑" : "☒";
  discussionContent.append(discussionTitle, discussionInformation);

  const ul = document.querySelector("ul.discussions__container");
  ul.append(li);//add extra list 

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

 //agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

//submit function
const form = document.querySelector(".form")
const author =document.querySelector(".form__input--name > input");
const title =document.querySelector(".form__input--title > input");
const textArea =document.querySelector(".form__textbox > textarea");

 
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("event checking");
  //new Obj
  const obj = {  
    id: "default",
    createdAt: new Date(),
    title: title.value,
    url: '',
    author: author.value,
    answer: {
      id: "default",
      createdAt: new Date(),
      url: "",
      author: "",
      bodyHTML: "",
      avatarUrl: "",
    },
    bodyHTML: "",
    avatarUrl: "https://avatars.githubusercontent.com/u/22221941?s=64&u=7332dde3a563f98d2912e107f455ce2265ccca45&v=4",
  }
  ul.prepend(convertToDiscussion(obj))
  //reset function
  title.value = "";
  author.value ="";
  textArea.value = "";
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
