// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
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


  //아바타 
  const face = document.createElement('img')
  face.src = obj.avatarUrl;
  face.className = "discussion__avatar--image"
  face.alt = "avatar of " + obj.author
  avatarWrapper.append(face)

  //제목
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);


  //작성자 /날짜 
  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}` // 
  discussionContent.append(discussionTitle, discussionInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);




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



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


const submitButton = document.querySelector("submit-button")

submitButton.addEventListener("submit", (event) => {
  event.preventDefault(); //submit 이벤트에서 써줘야한다고 함. 작동정지 방지

  const newAuthor = document.querySelector("form__input--name > input")
  console.log('author', newAuthor);
  const newTitle = document.querySelector("form__input--title > input")
  console.log('title', newTitle);
  const newTextBox = document.querySelector("form__textbox > textarea")
  console.log('textBox', newTextBox);

  const newObj = {
    id: "new id",
    createdAt: new Date().toLocaleTimeString(),
    title: newTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: newAuthor.value,
    bodyHTML: newTextBox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/118284808?v=4",
  }



  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  // submit 후 빈칸 리셋
  author.value = ""
  title.value = ""
  textBox.value = ""

})

