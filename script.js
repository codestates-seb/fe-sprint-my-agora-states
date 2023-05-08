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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);
  const contentLink = document.createElement("a");
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);

  const contentIformation = document.createElement('div');
  contentIformation.className = "discussion__information";
  contentIformation.textContent = obj.author;
  discussionContent.append(contentIformation);

  const contentAns = document.createElement('p');
  contentAns.className = "discussion__answered";
  discussionAnswered.append(contentAns);
  if(obj.answer === null){
    contentAns.textContent = "🤐";
  }else{
    contentAns.textContent = "😉";
  }
  contentIformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`;


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector("form.form");
// 질문 추가
form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함
  const author = form.querySelector("div.form__input--name > input");
  const title = form.querySelector("div.form__input--title > input");
  const textbox = form.querySelector("div.form__textbox > textarea");

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: "https://i.pinimg.com/550x/0e/3c/9e/0e3c9ee3350b3e287929a17aa2b17eed.jpg"
  }

  agoraStatesDiscussions.unshift(newObj);
  const discussion = convertToDiscussion(newObj);
  ul.prepend(discussion);

  //제출 후 리셋하기
  title.value = "";
  author.value = "";
  textbox.value = "";

})


const topBtn = document.querySelector('.top')

topBtn.addEventListener('click',() => {
  window.scrollTo({top: 0, behavior: 'smooth'});
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
ul.append(li)



