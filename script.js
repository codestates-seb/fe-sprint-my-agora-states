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
 
 //1. 작성자 프로필 이미지 부분
  const avatarImg = document.createElement('img');  //createElemet 메서드로 img 태그 추가
  avatarImg.className = "discussion__avatar--image";  //<img class="discussion__avatar--image">
  avatarImg.setAttribute('src',`${obj.avatarUrl}`) //element.setAttribute( 'attributename', 'attributevalue' ) // 이미지 src 속성 추가 
  avatarImg.setAttribute('alt',`avatar of ${obj.author}` );  //이미지 alt 속성 추가
  avatarWrapper.append(avatarImg); //avatarWrapper에 자식 요소로 추가
  
  
  //2. content 부분 (질문)
  const discussionTitle  = document.createElement('h2'); 
  discussionTitle.className = 'discussion__title';
  const aHref = document.createElement('a');  
  aHref.setAttribute('href', `${obj.url}`);  
  aHref.textContent = obj.title;
  discussionTitle.append(aHref);
  discussionContent.append(discussionTitle);

  //3. content 부분 (질문자, 날짜)
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;   
  discussionContent.append(discussionInformation);

  //4. 체크표시 부분
  const discussionCheck = document.createElement('p');
  discussionCheck.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(discussionCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


//디스커션 추가기능 (name, title 입력하고 submit 눌렀을 때만 작동)
const subBtn = document.querySelector(".form__submit > input");
const inputName = document.querySelector(".form__input--name > #name");
const inputTitle = document.querySelector(".form__input--title > #name");
const timezoneOffset = new Date().getTimezoneOffset() * 60000;  //UTC시간과 한국시간은 9시간 차이가 나기 때문에 1. 밀리초단위를 인자로 받는 new Date() 함수에 넣기 위해서 1000(밀리초) * 60(초)를 곱해 밀리초 단위를 만든다.
const timezoneDate = new Date(Date.now() - timezoneOffset); //2. 현재시간 - timezoneOffset
const inputText = document.querySelector("textarea");
subBtn.onclick = function () {
  if(inputName.value === '') {
    alert('이름을 입력하세요');
  } else if (inputTitle.value === '') {
    alert('제목을 입력하세요');
  } else {
  const nObj = {};
  nObj.createdAt = timezoneDate.toISOString();
  nObj.title = inputTitle.value;
  nObj.author = inputName.value;
  nObj.text = inputText.value;
  nObj.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
  agoraStatesDiscussions.unshift(nObj);
  console.log(nObj);
  console.log(agoraStatesDiscussions);
  ul.append(convertToDiscussion(agoraStatesDiscussions[0]));
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
}
}
 //convertToDiscussion(goraStatesDiscussions[agoraStatesDiscussions.length - 1]);


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

