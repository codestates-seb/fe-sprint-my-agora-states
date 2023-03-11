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
  // 이미지 만들기
  const avatarimg = document.createElement('img');
  avatarimg.className = "discussion__avatar--image";
  avatarimg.src = obj.avatarUrl;
  avatarimg.alt = 'avatar ${obj.author}';
  avatarWrapper.append(avatarimg)
  // 제목 만들기
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";

  const TitleAchor = document.createElement('a');
  TitleAchor.href = obj.url;
  TitleAchor.textContent = obj.title;
  contentTitle.append(TitleAchor);
  discussionContent.append(contentTitle);
  // 글쓴이 날짜 만들기 
  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`;
  discussionContent.append(contentTitle, contentInfo);
  // 체크박스 만들기
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? "✅" : "❌"
  discussionAnswered.append(checked);

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
//  문서 내용 가져오기
const form = document.querySelector("form.form");
const title = document.querySelector("input#title");
const author = document.querySelector("input#name");
const question = document.querySelector("textarea#story");

form.addEventListener('submit',(event) => {
  event.preventDefault(); // 서브밋 이벤트로 사용시 꼭 사용해야함
  const newdic = {
    id : "new id",
    createdAt : new Date().toISOString(),
    title : title.value ,
    url : "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author : author.value,
    bodyHTML : question.value,
    avatarUrl : "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4"
  }
  ul.prepend(convertToDiscussion(newdic));
  title.value = "";
  author.value = "";
  question.value = "";

})
  





// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
