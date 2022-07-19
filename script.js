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
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  //아바타 이미지를 연결해줌

  const disTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  disTitle.append(titleAnchor);
  titleAnchor.href = obj.url;
  disTitle.classList.add('discussion__title')
  titleAnchor.append (obj.title)
  //디스커션 콘텐츠 안에 타이틀을 append해줌

  const disInfo = document.createElement('div');
  disInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  disInfo.classList.add('discussion__information')
  discussionContent.append(disTitle,disInfo);
  // 디스커션 콘텐츠 안에 제목과 인포메이션을 append해줌

  const disAnswer = document.createElement('p');
  disAnswer.textContent = '☑'
  discussionAnswered.append(disAnswer);

  const disAnswerTitle = document.createElement('div');
  const answerTitleAnchor = document.createElement('a');
  disAnswerTitle.append(answerTitleAnchor);
  disAnswerTitle.classList.add('discussion__answertitle')
  answerTitleAnchor.href = obj.answer;
  discussionContent.append(disAnswerTitle);
  // 답변 타이틀 추가해줌

  // const disTitle = document.createElement('h2');
  // disTitle.classList.add('discussion__title')
  // disTitle.textContent = agoraStatesDiscussions[i].title;
  // discussionContent.append(disTitle)
  // 타이틀 렌더링 실패코드 agoraStatesDiscussions[i]이 아닌 obj가 들어와야 함.

  // const disInfo = document.createElement('div');
  // disInfo.classList.add('discussion__information')
  // disInfo.textContent = `${agoraStatesDiscussions[1].author} / ${agoraStatesDiscussions[1].createdAt}`
  // disInfo.alt = 'this is author & info';
  // discussionContent.append(disInfo)
  // info 부분 실패 코드/

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
