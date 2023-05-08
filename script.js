// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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

  //image (convertToDiscussion function)
  const image = document.createElement("img")
  image.className = "discussion__avatar--image";
  image.src = obj.avatarUrl;
  image.alt = "avatar of " + obj.author;
  avatarWrapper.append(image);

  //contents (convertToDiscussion function)
  const title = document.createElement("h2");
  title.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);

  const titleInformation = document.createElement("div");
  titleInformation.className = "discussion__information";
  titleInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(title);
  discussionContent.append(titleInformation);

  //content (convertToDiscussion function)
  const answer = document.createElement("div");
  answer.className = "discussion__answered";
  const answerCheck = document.createElement("p");
  if(obj.answer===null){
    answerCheck.textContent = '✘';
  }else{
    answerCheck.textContent = '✔';
  }
  answer.append(answerCheck);
  discussionAnswered.append(answer);

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

const form = document.querySelector("form");

const convertToDiscussion2 = (obj) => {
  const li = document.createElement("li"); 
  li.className = "discussion__container"; 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //content image (convertToDiscussion2)
  const image = document.createElement("img")
  image.className = "discussion__avatar--image";
  image.src = "https://cdn-icons-png.flaticon.com/512/2732/2732700.png";
  image.alt = "avatar of " + obj.name;
  avatarWrapper.append(image);

  //content (convertToDiscussion2 function)
  const title = document.createElement("h2");
  title.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.href = '#';
  titleLink.textContent = obj.title;
  title.append(titleLink);

  const titleInformation = document.createElement("div");
  titleInformation.className = "discussion__information";
  titleInformation.textContent = obj.name + ' / ' + obj.createdAt;
  discussionContent.append(title);
  discussionContent.append(titleInformation);

  //content (convertToDiscussion2 function)
  const answer = document.createElement("div");
  answer.className = "discussion__answered";
  const answerCheck = document.createElement("p");
  if(obj.answer===null){
    answerCheck.textContent = '✘';
  }else{
    answerCheck.textContent = '✔';
  }
  answer.append(answerCheck);
  discussionAnswered.append(answer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // handle submit
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value;

  const titleInput = document.getElementById("title");
  const titleValue = titleInput.value;

  const storyInput = document.getElementById("story");
  const storyValue = storyInput.value;

  let today = new Date();
  const newobj = {
    name: nameValue,
    createdAt: `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`,
    title: titleValue,
    answer: null,
    bodyHTML: storyInput.value,
  }
  ul.prepend(convertToDiscussion2(newobj));
  nameInput.value = "";
  titleInput.value = "";
  storyInput.value = "";

});
