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

  //create avatar image, and connect it to the data
  const avatImg = document.createElement('img');
  avatImg.src = obj.avatarUrl;
  avatImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatImg);

  //fill in discussion content
  const disTitle = document.createElement('h2');
  disTitle.className = "discussion__title";
  const disInfo = document.createElement('div');
  disInfo.className = "discussion__information";
  const disTitleLink = document.createElement('a');
  disTitleLink.href = obj.url;
  console.log(disTitleLink);
  disTitle.append(disTitleLink);
  disTitleLink.textContent = obj.title;
  disInfo.textContent = obj.author  + " / " + obj.createdAt;
  discussionContent.append(disTitle, disInfo);

  //fill in discussed answered boolean
  const disAnswer = document.createElement('div');
  disAnswer.className = "discussion__answered";
  if (obj.answer) disAnswer.textContent = '☑';
  else disAnswer.textContent = '☒';
  discussionAnswered.append(disAnswer);


  li.append(discussionContent, avatarWrapper, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // console.log(agoraStatesDiscussions[i].avatarUrl);
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
