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

  // 아바타 이미지 넣기
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.classList.add('discussion__avatar--image'); // 기존의 클래스 추가
  avatarWrapper.append(avatarImg);

  li.append(avatarWrapper, discussionContent, discussionAnswered);



  // * TODO 세분화 : 


  // 1. 제목(title) 넣기, url 연결하기(클릭 시 새창으로 연결)

  // 1-1. dom 에 h2 > a 생성하고 넣어주기.
  // html : <h2 class="discussion__title"><a class="title__link"></a></h2>

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.appendChild(discussionTitle);
  const discussionA = document.createElement("a");
  discussionA.className = "title__link'";
  discussionTitle.appendChild(discussionA);

  // 1-2. title, url 넣어주기
  // html : <a class="title__link" href="~[i].url">~[i].title</a>
  
  discussionA.textContent = obj.title;
  discussionA.href = obj.url;
  // (에러 1 : 타이틀 링크 a 태그에 새로 생성한 클래스(.title__link) 추가 ---> 에러! ===> 해결/ discussionTitle 로 h2 를 불러와서 그 안의 a 태그가 덮어씌워졌던 거였음
  // 에러 2 : 
  // const discussionTitleText = discussionA.textContent;
  // const discussionTitleLink = discussionA.href; 
  // 변수에 담아서 내용을 할당했더니 에러남. 왜지?)

  
  // 2. id, 작성 시간(createdAt) 넣기
  // 2-1. div 생성
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionContent.appendChild(discussionInfo);
  // 2-2. text 변경
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`


  // 3. 답변 완료 여부(answer, .discussion__answered) 넣기
  // 3-1. div 생성
  // const discussionAnswer = document.createElement("div");
  // discussionAnswer.className = "discussion__answered";
  // discussionContent.appendChild(discussionAnswer); // 위에서 선언해준 줄 모르고 다시 불러왔다가 지웠다. 기존 파일 잘 읽을 것!!
  const discussionAnswerCheck = document.createElement("p");
  discussionAnswerCheck.className = "check__answer"; // p 태그에 새로 클래스 네임 생성해줌
  discussionAnswered.appendChild(discussionAnswerCheck);
  // 3-2. p 안의 체크표시 바꾸기
  (obj.answer === null) ? 
  discussionAnswered.textContent = '❎' : discussionAnswered.textContent = '✅';
  
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
