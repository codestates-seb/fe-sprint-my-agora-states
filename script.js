// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 이미지 
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

   const avatarImg = document.createElement('img');
   avatarImg.src = obj.avatarUrl;
   avatarImg.alt = 'avatar of ' + obj.author;
   avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  
   const discussionTitle = document.createElement("h2");
   discussionTitle.classList = "discussion__title";
   const titlehref = document.createElement("a");
   titlehref.textContent = obj.title;
   titlehref.href = obj.url;
   discussionTitle.append(titlehref);
   
   const discussionInformation = document.createElement("div");
   discussionInformation.classList = "discussion__information";
   discussionInformation.textContent = `${obj.id} / ${obj.createdAt}`
   discussionContent.append(discussionTitle,discussionInformation);


  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answercheckbox = document.createElement("p")
  answercheckbox.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(answercheckbox);


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



  