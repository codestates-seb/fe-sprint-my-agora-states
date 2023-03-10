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
  // avatar wrapper 에 이미지 dom 넣기
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `picture of ${obj.author}`
  avatarWrapper.append(avatarImg)

  //Discussion content 에 내용 넣기
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionLink = document.createElement('a');
  discussionLink.href = obj.url;
  discussionLink.target = '_blank';
  discussionLink.innerHTML = obj.title;
  discussionTitle.appendChild(discussionLink);
  const discussionDate = document.createElement('div');
  discussionDate.className = 'discussion__information';
  discussionDate.innerHTML = obj.createdAt
  discussionContent.appendChild(discussionTitle);
  discussionContent.appendChild(discussionDate);
  
  //Discussion Answered 넣기
  const answered = document.createElement('div');
  if(obj.answer) {
    answered.innerHTML = '☑'
  } else {
    answered.innerHTML = 'X'
  }
  discussionAnswered.appendChild(answered)


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



//스크롤 애니메이션
let observer = new IntersectionObserver((e) => {
  e.forEach(element => {
    if(element.isIntersecting) {
      element.target.style.opacity = 1;
    } else {
      element.target.style.opacity = 0;
    }
  })
})

const discussion_container = document.querySelectorAll('.discussion__container');
discussion_container.forEach((discussion, i) => {
  observer.observe(discussion);
})
