// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
history.scrollRestoration = "auto"
// agoraStatesDiscussions >>> 객체 정보 담고있는 배열
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// 포스트잇에 넣을 내용을 data.js에서 가져옴
const convertToDiscussion = (obj) => {
  // html요소 만들어줌
  const postIt = document.createElement("div");
  postIt.className = ("post-it")
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const author = obj.author;
  const createdAt = obj.createdAt;
  // 이미지 가져와서 태그 만들어줌
  const avatar = document.createElement("img");
  avatar.className = "discussion__avatar--image";
  const avatarUrl = obj.avatarUrl;
  avatar.src = avatarUrl;
  avatarWrapper.append(avatar);

  //타이틀 만들어줌
  const url = obj.url
  const title = obj.title
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title"
  const discussionTitle2 = document.createElement("a");
  discussionTitle2.target="_blank";
  discussionTitle2.href = url
  discussionTitle2.textContent = title
  // 작성자와 날짜
  const discussionInformation = document.createElement("div");
  discussionInformation.className ="discussion__information"
  discussionInformation.textContent = `${author} / ${createdAt}`

  // 질문 내용
  const discussionQuestion = document.createElement("div");
  discussionQuestion.className = "discussion-question hide"
  obj.url === null ? discussionQuestion.textContent = obj.bodyHTML
  :discussionQuestion.textContent = obj.url

  // 답변
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered hide";
  if(obj.answer !== null){
    const discussionAnsweredAuthor = document.createElement("div");
    discussionAnsweredAuthor.className = "discussion-answered-author"
    discussionAnsweredAuthor.textContent = obj.answer.author
    const discussionAnsweredAvatarUrl = document.createElement("img")
    discussionAnsweredAvatarUrl.className= "discussion-answered-avatarUrl"
    discussionAnsweredAvatarUrl.src = obj.answer.avatarUrl
    // TODO: 여기부터 답변의 날짜와 URL을 넣고 discussionAnswered에 넣어주기
    const discussionAnsweredUrl = document.createElement("div")
    discussionAnsweredUrl.className = 'discussion-answered-url'
    discussionAnsweredUrl.textContent = obj.answer.url
    const discussionAnsweredCreatedAt = document.createElement("div")
    discussionAnsweredCreatedAt.className = 'discussion-answered-createdAt'
    discussionAnsweredCreatedAt.textContent = obj.answer.createdAt
    discussionAnswered.append(discussionAnsweredAuthor,discussionAnsweredAvatarUrl, discussionAnsweredUrl, discussionAnsweredCreatedAt)
  }


  //트리 구조로 넣어줌
  discussionTitle.append(discussionTitle2)
  discussionContent.append(discussionTitle, discussionInformation)
  postIt.append(avatarWrapper, discussionContent,discussionQuestion, discussionAnswered);
  return postIt;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// 10개씩만 불러오도록 함
let dataLengthCount = 0;
const render = (element) => {
  for (let i = dataLengthCount; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    dataLengthCount = dataLengthCount +1;
    if(i !== 0 && (i+1) % 10 === 0) {
      return
    }
  }
  return;
};

// 포스트잇에 agoraStatesDiscussions 배열의 데이터를 화면에 렌더링합니다.
const postContainer = document.querySelector(".post-container");
render(postContainer);
