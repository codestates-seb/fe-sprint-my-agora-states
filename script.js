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
  const avatarImg = document.createElement('img');//프로필사진
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.setAttribute('class','discussion__avatar--image');
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2'); //타이틀
  const discussionTitleLink = document.createElement('a'); //타이틀링크 
  discussionTitleLink.textContent = obj.title;
  discussionTitleLink.setAttribute('href', obj.url);
  discussionTitle.append(discussionTitleLink);

  const discussionInfo = document.createElement('div'); //글쓴이 & 날짜
  discussionInfo.textContent = obj.author + ' / ' + obj.createdAt;
  discussionInfo.className = 'discussion__information';
  discussionContent.append(discussionInfo, discussionTitle);

  const discussionAnsweredCheck = document.createElement('p'); //답변입력 여부 체크마크
  discussionAnsweredCheck.textContent = '☑';
  discussionAnswered.append(discussionAnsweredCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //여기서 convertToDiscussion의 전달인자가 입력 ( obj = agroaStatesDiscussion[i] )
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
