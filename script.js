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

  //이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = 'discussion__avatar--image';
  avatarWrapper.append(avatarImg);

  //제목
  const title = document.createElement('a');
  title.textContent = obj.title;
  title.href = obj.url;
  title.className = 'discussion__title';

  //정보
  const name = document.createElement('div');
  name.textContent = obj.id;
  name.className = 'discussion__name';

  const createdAt = document.createElement('div');
  createdAt.textContent = obj.createdAt;
  createdAt.className = 'discussion__createdAte';
  
  // //내용
  // const content = document.createElement('div');
  // content.textContent = obj.bodyHTML;

  discussionContent.append(name, title, createdAt)

  //체크
  // const answered = document.createElement('p')
  // answered.textContent = '☑';
  // answered.className = 'discussion__answered';
  // discussionAnswered.append(answered)


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
