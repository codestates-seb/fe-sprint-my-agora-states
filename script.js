// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const ul = document.querySelector("ul.discussions__container");

const form = document.querySelector("form.form");
const formInputName = form.querySelector("div.form__input--name > input");
const formInputTitle = form.querySelector("div.form__input--title > input");
const formTextbox = form.querySelector("div.form__textbox > textarea");




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

  //이미지 객체 추가
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);


  //제목, url 객체 추가
  const discussionTitle=document.createElement("h2");
  discussionTitle.className="discussion__title";
  discussionContent.append(discussionTitle);

  const disscussionUrl=document.createElement("a");
  disscussionUrl.href=obj.url;
  disscussionUrl.textContent=obj.title;
  discussionTitle.append(disscussionUrl);

  //글쓴이, 작성일자 객체 추가
  const discussionInformation=document.createElement("div")
  discussionInformation.className="discussion__information";
  discussionInformation.textContent=obj.author+ ' / ' +obj.createdAt;
  discussionContent.append(discussionInformation);
  
  if(obj.answer)
    discussionAnswered.textContent='☑';
  else
    discussionAnswered.textContent='ㅁ';
    
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
render(ul);

//const form = document.getElementsByClassName('form__submit');

//console.log(form.Name);
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log('hi');

    console.log(form);
    console.log(formInputName.value);
    console.log(formInputTitle.value);

    agoraStatesDiscussions.unshift({id: formInputName.value, title: formInputTitle.value, createdAt: new Date(),avatarUrl: 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4'});

    console.log(agoraStatesDiscussions);
    //ul.append(convertToDiscussion(tempObj));
    //console.log(convertToDiscussion(tempObj));

    ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
});


