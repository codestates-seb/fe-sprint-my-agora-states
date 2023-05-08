// index.html을 열어서 agoraStatesDiscussions 배세열 요소를 확인하요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// <li> append
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //새로운 디스커션 요소 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  //아바타 이미지 가져오기
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  //질문 내용 가져오기
  const discussionTitle = document.createElement('div');
  const discussionLink = document.createElement('a');
  //a 요소 안에 있는 텍스트와 링크여서 discussionLink 변수를 써줌
  discussionLink.textContent = obj.title;
  discussionLink.href = obj.url;
  discussionContent.append(discussionTitle);
  discussionTitle.append(discussionLink);

  //인포가져오기
  const discussionInfo = document.createElement('div');
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(discussionInfo);

  //체크표시
  const discussionAnswer = document.createElement('p')
  discussionAnswer.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// <ul> append
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 아이디,본문 입력하고 디스커션 추가하는 내용
// html 가져오기

const form = document.querySelector("form.form");
const FormName = form.querySelector("div.form__input--name > input");
const FormTitle = form.querySelector("div.form__input--title > input");
const FormTextbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener('submit',(event) => {
  event.preventDefault(); //prevents page reloading

  const newObj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: FormTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: FormName.value,
    answer: null,
    bodyHTML: FormTextbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  //agoraStatesDiscussions앞에 추가
  agoraStatesDiscussions.unshift(newObj);
  //convertToDiscussion요소 생성
  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);
  
  // submit후 리셋
  FormName.value = '';
  FormTitle.value = '';
  FormTextbox.value = '';
}
)

// discussions 숨기기
const toggleBtn = document.querySelector('.toggleBtn');
const category = ducoument.querySelector('.discussions__container');

togglBtn.addEventListener('click', () => {
  category.clasList.toggle('active');
});
