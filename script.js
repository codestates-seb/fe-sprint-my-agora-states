// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.


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

 

  //이미지 넣기

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);


  //타이틀 넣기(링크까지)
  const title = document.createElement('h2');
  const titleLink = document.createElement('a')
  titleLink.href = obj.url;
  titleLink.append(obj.title)
  title.append(titleLink)
  title.className = "discussion__title";
  discussionContent.append(title);

  //인포메이션 넣기
  const info = document.createElement('div');
  info.className = 'discussion__information'
  info.append(obj.author + "/" + obj.createdAt)
  discussionContent.append(info);

  //답변체크박스
  const checkBox = document.createElement('p');
  checkBox.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(checkBox)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input')
const inputTitle = document.querySelector('.form__input--title > input')
const inputQuestion = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit',(event) => {
  event.preventDefault(); //새로고침방지
  const obj = {
    id: "9",//임의의값
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer:null,
    bodyHTML:inputQuestion.value, 
    avatarUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51zpgflCyj4qpnHqAqnEf4bL-J8_2-7vyeYsBoUFgSKXtS2rp2-S81R-qeJToqVoldy0&usqp=CAU",
}

agoraStatesDiscussions.unshift(obj);
ul.prepend(convertToDiscussion(obj))
inputTitle.value=""
inputName.value=""
inputQuestion.value=""
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
