// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  
  const avatarImg = document.createElement('img');
  avatarImg.src =obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className ="discussion__avatar--image"

  avatarWrapper.append(avatarImg);


  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className ="discussion__title";

  const ahref = document.createElement("a");
  ahref.href =obj.url;
  ahref.innerHTML = obj.title
  discussionTitle.append(ahref);

  const discussioninformation = document.createElement("div");
  discussioninformation.innerHTML = `${obj.author} / ${obj.createdAt}`;
  discussioninformation.className = "discussion__information";

  discussionContent.append(discussionTitle, discussioninformation);


  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑" : "☒"
  discussionAnswered.append(checked);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox =document.querySelector('div.form__textbox > textarea');


form.addEventListener("submit",(event) => {
  event.preventDefault();
  //새로운 객체 만들기
  //input에 입력된 값(value)를 넣은 새로운 객체
  //새로운 객체를 uld요소 아래로 넣어준다.
  //더미 데이터에도 추가해준다.

  const obj ={
    id: "unique id",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer:null,
    bodyHTML:textbox.value,
// free.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
    avatarUrl:

      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"

  }
  agoraStatesDiscussions.unshift(obj);

  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion)
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
