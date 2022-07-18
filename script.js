// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let j = agoraStatesDiscussions.length-6
let i = agoraStatesDiscussions.length-1
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion_notice = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussions__container_inner_notice"; // 클래스 이름 지정
    const noticeName = document.createElement("div");
    noticeName.className = "noticeName";
    noticeName.innerText = "학습 방향 및 기타"

    const kimploo = document.createElement("span");
    kimploo.className = "kimploo";
    kimploo.innerText = "BeomJoon"

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper_notice";
  
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content_notice";
  
    const avatarImg = document.createElement('img');
    const title = document.createElement('h2');
    title.className = 'discussion__title_notice';
    const titleLink = document.createElement("a");
    titleLink.href = agoraStatesDiscussions[i].url;
    titleLink.innerText = agoraStatesDiscussions[i].title;
  
    
    avatarImg.src = agoraStatesDiscussions[i].avatarUrl;
    avatarImg.alt = 'avatar of' + agoraStatesDiscussions[i].author;
    avatarWrapper.append(avatarImg);
    li.append(noticeName, discussionContent,avatarWrapper,kimploo);
  
    title.append(titleLink);
    discussionContent.append(title);
    i--
    return li;
};
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussions__container_inner"; // 클래스 이름 지정
  
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
  
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";

    const userId = document.createElement("span");
    userId.className = "userId"
    userId.innerText = `#${agoraStatesDiscussions[j].id}`;

    const quetionTime = document.createElement("span");
    quetionTime.className = "quetionTime"
    quetionTime.innerText = `${agoraStatesDiscussions[j].createdAt.replace(/\T/g, "  ").slice(0,-1)}`
  
    const discussionImformation = document.createElement("span");
    discussionImformation.append(userId,quetionTime)
    discussionImformation.className = "discussion__information"
  
  
    const avatarImg = document.createElement('img');
    const title = document.createElement('h2');
    title.className = 'discussion__title';
    const titleLink = document.createElement("a");
    titleLink.href = agoraStatesDiscussions[j].url;
    titleLink.innerText = agoraStatesDiscussions[j].title;
  
    
    avatarImg.src = agoraStatesDiscussions[j].avatarUrl;
    avatarImg.alt = 'avatar of' + agoraStatesDiscussions[j].author;
    avatarWrapper.append(avatarImg);
    li.append(avatarWrapper, discussionContent);
  
    title.append(titleLink);
    discussionContent.append(title);
    discussionContent.append(discussionImformation)
    j--
    return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = agoraStatesDiscussions.length-5; i > 1; i --) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const render2 = (element) => {
  for (let i = 6; i > 1; i --) {
    element.append(convertToDiscussion_notice(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul2 = document.querySelector(".discussions__container_noitce");
const ul = document.querySelector("ul.discussions__container");
render2(ul2);
render(ul);


