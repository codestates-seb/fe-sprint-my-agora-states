// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  let aRL = obj.length;
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.


  //url
  //id
  //bodyHtml
  //질문자 아바타 url 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //title
  const question_title = document.createElement("h2");
  question_title.className = "discussion__title";
  const question_title_url = document.createElement("a");
  question_title_url.href = obj.url;
  question_title_url.textContent = obj.title;

  question_title.append(question_title_url);
  discussionContent.append(question_title);


  //질문자 author + createdAt생성날짜 + title + url + id + bodyHTML + avatarUrl
  //질문자 author + createdAt
  const user_questionID = document.createElement("div");
  user_questionID.className = "discussion__information";
  user_questionID.textContent= obj.author + obj.createdAt;
  discussionContent.append(user_questionID);

  //답변자 전체
  const answerCheck = document.createElement("div");
  answerCheck.className = "discussion__answerd";
  const answerCheck_icon = document.createElement("p");
  let checkBox = '☑';
  if( obj.answer){
  }
  else{
    checkBox = '☒';
  }
  answerCheck_icon.textContent = checkBox;

  answerCheck.append(answerCheck_icon);
  discussionAnswered.append(answerCheck);


  li.append(avatarWrapper, discussionContent, discussionAnswered);

  //append avatarUrl=> avatarWrapper
  //append author+user_questionID =>discussionContent
  //append  obj.answer.author+img+createdAt =>discussionAnswered

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
//const ul = document.querySelector('ul.discussions__container');
//ul.append(li);
