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

const avatarImage = document.createElement("img") // 태그이름
avatarImage.className = 'discussion__avatar--image';
avatarImage.src = obj.avatarUrl;
avatarImage.alt = 'avatar of' + obj.author;
avatarWrapper.append(avatarImage);


const discussionTitle = document.createElement("h2");
const discussionTitletext = document.createElement("a");
discussionTitletext.href = obj.url;
discussionTitletext.textContent = obj.title;
discussionTitle.append(discussionTitletext);


const discussionInformation  = document.createElement("div");
discussionInformation.className = "discussion__information";
discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
discussionContent.append(discussionTitle, discussionInformation);


const checked = document.createElement("p");
checked.textContent = obj.answer ? "✅" : "🙄";
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
//localstorage있는 것 더해주기
if(window.localStorage.length >0){

  for(let i = 0; i<window.localStorage.length; i++){
    let newDatas = window.localStorage.getItem(`newData${i}`);
    let Obj = JSON.parse(newDatas);
    agoraStatesDiscussions.unshift(Obj);
    ul.prepend(convertToDiscussion(Obj));
  }

}

const form = document.querySelector('form.form');
const displayauthor = document.querySelector('.form__input--name > input');
const displayTitle = document.querySelector('.form__input--title > input');
const displayQuestion = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id : "new id",
    createdAt : new Date(),
    title: displayTitle.value,
    url:"https://github.com/codestates-seb/agora-states-fe/discussions",
    author: displayauthor.value,
    bodyHTML: displayQuestion.value,
    avatarUrl:"https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg"

  };
alert('등록되었습니다.');

agoraStatesDiscussions.unshift(obj);
ul.prepend(convertToDiscussion(obj));
//local에 저장
const newObj = JSON.stringify(obj);
let len = window.localStorage.length;
window.localStorage.setItem(`newData${len}`, newObj);


//초기화
displayauthor.value = '';
displayTitle .value = '';
displayQuestion.value = '';
}

);

//pagination

