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
  //avartarWrapper 채우기
  const avatarImg = document.createElement("img"); //이미지 태그 생성.
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl; //이미지 소스 가져오기 ,obj로 하는이유: 매개변수 안에 42번째줄 보면 data의 i번째가 들어가고 있음.
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  //discussionContent 채우기
  const discussionTitle = document.createElement("h2"); //h2 요소 생성.
  discussionTitle.className = "discussion__title";
  const discussionTitle__a = document.createElement("a"); //a 요소 생성.
  discussionTitle__a.href = obj.url;
  discussionTitle__a.textContent = obj.title;
  discussionTitle.append(discussionTitle__a); //a요소 h2요소에 어펜드.
  const discussionInfor = document.createElement("div"); //작성자 정보,시간 div생성.
  discussionInfor.className = "discussion__information";
  discussionInfor.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionTitle, discussionInfor);

  //discussionAnswered 채우기
  const discussionAnswered__p = document.createElement("p");
  discussionAnswered__p.textContent = "☑";
  discussionAnswered.append(discussionAnswered__p);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); //여기서 데이터가 계속 순회중.
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
