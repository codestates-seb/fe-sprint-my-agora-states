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

  const avataImg = document.createElement('img') // 사진
  avataImg.src = obj.avatarUrl;
  avataImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avataImg);


const discussionTitle = document.createElement('h2') // 질문 제목
const titleLink = document.createElement('a') // 질문 링크
titleLink.href = obj.url;
titleLink.textContent = obj.title;
discussionTitle.append(titleLink);
discussionContent.append(discussionTitle);



const discussioninfo = document.createElement('div');
discussioninfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
discussionContent.append(discussionTitle, discussioninfo)

const check = document.createElement('p')
check.textContent = obj.answer ? "☑︎" : "☒";
discussionAnswered.append(check);

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
