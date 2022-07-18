// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 배열 속 n번째 객체의 데이터 값을 가져오기 위해 n를 0으로 설정하고 함수가 끝날 때마다 1씩 증가하도록
let n = 0;

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


  // avatarWrapper
    const avatarImg = document.createElement("img");
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = agoraStatesDiscussions[n]['avatarUrl'];
    avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[n]['author'];
    avatarWrapper.append(avatarImg);


  // discussionContent - 제목
    // <h2>를 만들어 변수 discussioTitle에 할당한다.
    const discussionTitle = document.createElement("h2");
    // <h2>의 클래스 네임으로 discussion__title 을 붙여준다
    discussionTitle.className = "discussion__title";
    // <a>를 만들어 변수 discussionTitleLink에 할당한다.
    const discussionTitleLink = document.createElement("a");
    // discussionTitle에 discussionTitleLink를 append한다.
    discussionTitle.append(discussionTitleLink);
    // <a>의 href에 agoraStatesDiscussions[n]['url'] 값을 할당한다.
    discussionTitleLink.href = agoraStatesDiscussions[n]['url'];
    // discussioTitle의 textContent를 agoraStatesDiscussions[n]['title']
    discussionTitleLink.textContent = agoraStatesDiscussions[n]['title'];
    // discussionTitle을 discussionContent에 append
    discussionContent.append(discussionTitle);


  // discussionContent - 닉네임과 게시일
    // <div>를 만들어 변수 discussionInfo에 할당한다
    const discussionInfo = document.createElement("div");
    // <div>의 클래스 네임으로 discussion__information 을 붙여준다
    discussionInfo.className = "discussion__information";
    // discussionInfo의 textContent를 agoraStatesDiscussions[n]['author'] + ' / ' + agoraStatesDiscussions[n]['createdAt']
    discussionInfo.textContent = agoraStatesDiscussions[n]['author'] + ' / ' + agoraStatesDiscussions[n]['createdAt'];
    // discussionInfo를 discussionContent에 append
    discussionContent.append(discussionInfo);


  n++
    

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
