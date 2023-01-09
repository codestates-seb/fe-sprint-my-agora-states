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
  // 아바타 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;

  // 디스커션 제목
  const discussionTitle = document.createElement("h2");
  const discussionLink = document.createElement("a");

  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;

  discussionTitle.className = "discussion__title";
  discussionTitle.append(discussionLink);

  // 디스커션 작성자 + 작성날짜
  const discussionInformation = document.createElement("div");
  const createdAt = new Date(obj.createdAt);
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${
    obj.author
  } / ${createdAt.toLocaleString("ko-KR")}`;
  // advanced - 샘플시간 변형해서 현지시간에 맞게 표현
  // 샘플 : yyyy-mm-ddT00:00:00Z <- .toISOString() 으로 변환하면 왼쪽같은 형식으로 날짜가 반환됨.
  // .toISOString() : 주어진 날짜를 국제표준시 기준 ISO 8601 형식으로 표현해 문자열로 리턴한다.

  //Date.prototype.toLocaleString()
  // 지정된 지역에서 표현하는 방식의 날짜를 문자열로 리턴한다.
  // Date.toLocaleString('ko-KR') : 날짜를 한국식으로 표현한다

  // 디스커션 답변 여부
  const discussionAnsweredCheck = document.createElement("p");
  discussionAnsweredCheck.textContent = obj.answer
    ? obj.answer.author
    : "답변없음";

  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionTitle, discussionInformation);
  discussionAnswered.append(discussionAnsweredCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // 배열의 모든 요소 개수만큼 반복
    // 배열 인덱스번째의 객체가 convertToDiscussion의 매개변수가 된다.
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 디스커션 추가기능
// 이름, 제목, 본문 작성 후 sumbit 버튼 클릭시 실제 화면에 디스커션이 추가되어야 함
// agoraStatesDiscussions 배열에 작성한 내용이 추가되어야 함.

// 의사코드
// 버튼이 클릭시 이벤트 발생
// 이름, 제목, 본문을 가져와서 배열에 추가한다.
// 추가된 내용은 dom으로 만들어서 렌더링되게 한다.
// 추가된 내용은 배열과 화면 모두 맨 뒤가 아니라 맨 앞에 와야한다. (최신순)
const addDiscussion = () => {
  // 가져와야 할 내용들
  // 이름(author), 제목(title), 본문(bodyHTML), 현재 시간(클릭된 시간)(createdAt)
  // url, answer = null, avatarUrl 은 되면 추가로 작성
  event.preventDefault(); // submit 이벤트 발생시 새로고침 방지

  const author = document.querySelector("#name");
  const title = document.querySelector("#title");
  const story = document.querySelector("#story");
  const date = Date(); // new Date() : date객체 반환, Date() : 현재 날짜와 시간 나타내는 문자열 반환
  // Invalid Date ?? : 크로스 브라우징 이슈때문에 나타나는 에러
  const newObj = {
    // id: 1,
    createdAt: date,
    title: title.value,
    // url: 1,
    author: author.value,
    answer: false,
    bodyHTML: story.value,
    // avatarUrl: 1,
  };

  agoraStatesDiscussions.unshift(newObj);
  console.log(agoraStatesDiscussions[0]);
  console.log(agoraStatesDiscussions);
  ul.prepend(convertToDiscussion(newObj));
};
const btnSubmit = document.querySelector(".form__submit input");
btnSubmit.onclick = addDiscussion;
/* ??? 버튼 클릭 이벤트시 GET http://127.0.0.1:5500/false 404 (Not Found) 에러가 발생하는 것 같다. 값이 무엇이든지 관계없이 404 에러가 발생함 */
