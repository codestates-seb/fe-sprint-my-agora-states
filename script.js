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

  // todo : img.discussion__avatar--image 아바타 사진 및 대체 텍스트 입력
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`
  // todo : 만들어진 아바타 이미지 avatarWrapper에 append
  avatarWrapper.append(avatarImage);

  // todo : discussion__title 제목 삽입 (링크 포함)
  const discussionTitle = document.createElement('h2');
  const discussionTitleLink = document.createElement('a');
  discussionTitle.className = 'discussion__title';
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);
  // todo : discussion__information 작성자 및 작성 일시 삽입
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt.slice(0, 10)} ${obj.createdAt.slice(11, 19)}`
  // todo : discussionContent 만들어진 내부 컨텐츠 append
  discussionContent.append(discussionTitle, discussionInformation);

  // todo : discussion__answered 답변 삽입
  if(obj.answer !== null){
    // * AnsweredReply 생성 및 내용 삽입
    const discussionAnsweredReply = document.createElement('div');
    discussionAnsweredReply.className = 'discussion__answered--reply';
    discussionAnsweredReply.textContent = '└';
  
    // * AnsweredContent 생성 및 내부 컨텐츠 생성 후 내용 삽입
    const discussionAnsweredContent = document.createElement('div');
    discussionAnsweredContent.className = 'discussion__answered--content';
  
    const discussionAnsweredTitle = document.createElement('p');
    discussionAnsweredTitle.className = 'discussion__answered--title';
    discussionAnsweredContent.append(discussionAnsweredTitle);
  
    const discussionAnsweredTitleLink = document.createElement('a');
    discussionAnsweredTitleLink.href = obj.answer.url;
    discussionAnsweredTitleLink.textContent = `${obj.answer.bodyHTML.slice(0,120)}...`;
    discussionAnsweredTitle.append(discussionAnsweredTitleLink);
  
    const discussionAnsweredInfomation = document.createElement('div');
    discussionAnsweredInfomation.className = 'discussion__answered--information';
    discussionAnsweredInfomation.textContent = `${obj.answer.author} / ${obj.answer.createdAt.slice(0, 10)} ${obj.answer.createdAt.slice(11, 19)}`
    discussionAnsweredContent.append(discussionAnsweredInfomation);
  
    // * AnsweredAvatar 생성 및 내부 컨텐츠 생성 후 내용 삽입
    const answeredAvatarWrapper = document.createElement('div');
    answeredAvatarWrapper.className = 'discussion__answared--avatar--wrapper';
    const answeredAvatarImg = document.createElement('img');
    answeredAvatarImg.className = 'discussion__answared--avatar--image';
    answeredAvatarImg.src = obj.answer.avatarUrl;
    answeredAvatarImg.alt = `avatar of ${obj.answer.author}`
    answeredAvatarWrapper.append(answeredAvatarImg);
  
    // * Answered content append
    discussionAnswered.append(discussionAnsweredReply, discussionAnsweredContent, answeredAvatarWrapper);
  }

  // todo : discussionAnswered append
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
