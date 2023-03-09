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
  const discussionAnsweredPara = document.createElement('p');
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionTitleLink = document.createElement('a');
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discusson_information';
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 프로필 이미지

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  // 타이틀

  discussionTitleLink.textContent = obj.title
  discussionTitle.append(discussionTitleLink)
  discussionContent.append(discussionTitle)

  // 인포

  discussionInfo.textContent = obj.author + ' / ' + obj.createdAt
  discussionContent.append(discussionInfo);

// 대답 완료 표시
  if(obj.answer !== null){
    discussionAnsweredPara.textContent =  '❤️';
  } else {
    discussionAnsweredPara.textContent = '🥺';
  }
  
  discussionAnswered.append(discussionAnsweredPara)

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


// 디스커션 추가 기능
// submit 버튼을 누르면 디스커션에 추가되어야한다.

const newDiscussion = (obj) => {
  const formName = document.querySelector('#id');
  const formTitle = document.querySelector('#title')
  const formStory = document.querySelector('#story')
  const btnSubmit = document. querySelector('#btnSubmit')

  // 버튼이 눌리면
  // form의 value가 추가된다
}