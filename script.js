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

  // 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠 내용
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionContent.append(discussionTitle);
  discussionTitle.append(titleLink);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInformation);

  // 그 옆에 아이콘 하여튼 그
  // p만들고
  // p의 innerHTML에 아이콘 넣어주고
   // obj.anser 가 비어있으면 x자, 들어가있으면 v자
  // p를 discussionAnswered에 append해주고

  const answeredIcon = document.createElement('p');
  if (obj.answer === null) {
    answeredIcon.innerText = "☒";
    answeredIcon.style.color ='red';
  } else {
    answeredIcon.innerText = "☑";
    answeredIcon.style.color = "black";
  }
  discussionAnswered.append(answeredIcon);
 
    li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



const submitBtn = document.querySelector(".form__submit").querySelector('input'); //submit버튼을 눌렀을 경우 이벤트 리스너 작성
submitBtn.addEventListener("click", (e) => {
  const questionName = document.querySelector(".form__input--name").querySelector("input").value; // ".form__input--name"의 input에 적혀진 이름을 받아옴
  const questionTitle = document.querySelector(".form__input--title").querySelector("input").value; // form__input--title의 input에 적힌 타이틀을 받아옴
  const questionContent = document.querySelector(".form__textbox").querySelector("textarea").value; //".form__textbox"의 textarea에 적힌 질문내용을 받아옴

  e.preventDefault(); // 버튼을 클릭해도 안넘어가도록
  const newProperty = {
    title: questionTitle,
    createdAt: new Date().toISOString(),
    author: questionName,
    answer: null,
    bodyHTML: questionContent,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };
  agoraStatesDiscussions.unshift(newProperty);
  const newDiscussion = convertToDiscussion(newProperty)
  ul.prepend(newDiscussion)

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

