// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div"); // 프로필 사진이 들어가 있는 div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 위의 div 요소에 class=discussion__avatar--wrapper 지정
  const discussionContent = document.createElement("div"); // 재목,작성자,날짜 나오는 div 요소 생성
  discussionContent.className = "discussion__content"; // 위의 div 요소에 class=discussion__content 지정
  const discussionAnswered = document.createElement("div"); // 응답여부가 체크된 div 요소 생성
  discussionAnswered.className = "discussion__answered"; // 위의 div 요소에 class=discussion__answered 지정


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.className = "dicussion__avatar--image";
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.src = obj.avatarUrl;
 
  avatarWrapper.append(avatarImg);  // [ avatarWrapper ] 에 [ avatarImg ] 이 친구 넣을게


  const discussionTitle = document.createElement('h2'); // discussion 제목 넣을게
  discussionTitle.className = "discussion__title"; // class=discussion__title 지정
  const discussionLink = document.createElement('a'); // 링크 넣을게
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title; // 여기 내용은 data 객체에서 key 를 title 로 갖는 친구임
 
  discussionTitle.append(discussionLink);
  

  const discussionInfo = document.createElement('div'); // discussion 발행일자 넣을게
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; // 여기 내용은 data 객체에서 key 를 createdAt 로 갖는 친구임
  
  discussionContent.append(discussionTitle, discussionInfo); // discussion 컨텐츠에 이거 두개 넣을게


  const discAnswered = document.createElement('p');
  discAnswered.className = "discussion__answered";
  discAnswered.textContent = obj.answer ? '✅' : '⏳' ;

  discussionAnswered.append(discAnswered)



  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.


  const ul = document.querySelector('ul.discussions__container');// ul 은 class=discussions__container 이 친구거든?
  ul.append(li);// [ ul ] 에 [ li ] 넣을게

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;// [ li ] 에 [ 아바타 사진 + discussion 내용 + 응답 여부 ] 이 친구들을 넣을게
};

const form = document.querySelector("form.form");
const inputName = document.querySelector(".form__input--name > input");
const inputTitle = document.querySelector(".form__input--title > input");
const inputQuestion = document.querySelector(".form__textbox > textarea");

form.addEventListener("submit",(event) => {
  event.preventDefault();
  const obj =  {
    id: "999",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML:
      inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  
  // 기존의 배열의 가장 앞에 넣어주기
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj))
    
  inputName.value = ''
  inputTitle.value = ''
  inputQuestion.value = ''
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
