/**
 * 객체(object)를 받아서 HTML 요소로 반환해주는 함수입니다.
 * @param {object} obj 게시글의 정보가 들어있는 객체를 넣어주세요.
 * @returns 완성된 HTML 요소를 반환합니다.
 */
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  obj.isNotice ? li.className = "swiper-slide" : li.className = "discussion__container";

  // 아바타 관련 요소 생성 구간입니다.
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 글의 제목 및 작성자, 작성일 관련 요소 생성 구간입니다.
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.setAttribute('href', obj.url);
  discussionTitleLink.innerText = obj.title;
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  obj.isNotice ? discussionInformation.innerText = `${obj.author}` : discussionInformation.innerText = `${obj.author} / ${obj.createdAt}`;;
  
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);
  discussionTitle.append(discussionTitleLink);

  // 답변 여부 관련 요소 생성 구간입니다.
  const discussionAnswered = document.createElement("div");
  
  if(!obj.isNotice){
    discussionAnswered.className = "discussion__answered";
    const discussionContentP = document.createElement("p");
    if(obj.answer === null){
      discussionContentP.innerText = `✅`;
    } else{
      discussionContentP.innerText = `❎`;
    }
    discussionAnswered.append(discussionContentP);
  }

  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/**
 * 공지사항에 넣을 ul과 질문들을 넣을 ul을 받아 해당 요소에 convertToDiscussion()으로 반환된 요소를 추가해줍니다.
 * @param {*} notices 공지사항을 나타내는 ul을 입력해주세요.
 * @param {*} topics 질문들을 나타내는 ul을 입력해주세요.
 * @returns 리턴 값은 없습니다.
 */
const render = (notices, topics) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    if(agoraStatesDiscussions[i].isNotice){
      notices.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }else{
      topics.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const notices = document.querySelector("ul.swiper-wrapper");
const topics = document.querySelector("ul.discussions__container");
render(notices, topics);