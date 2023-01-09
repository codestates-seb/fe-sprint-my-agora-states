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
  // 객체를 파라미터로 받아 속성 채워주기 (여기서 파라미터는 obj)

  // 아바타 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 글제목
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionALink = document.createElement('a');
  discussionALink.href = obj.url;
  discussionALink.textContent = obj.title;
  discussionTitle.append(discussionALink);

  // 작성자 및 날짜
  const discussionAuthor = document.createElement('div')
  discussionAuthor.className = 'discussion__information';
  discussionAuthor.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(discussionTitle, discussionAuthor);

  // 답변 여부
  const discussionAnsweredBox = document.createElement('p')
  if (obj.answer === null) {
    discussionAnsweredBox.textContent = '☒';
  } else {
    discussionAnsweredBox.textContent = '☑';
      // 답변 내용
    const answerContainer = document.createElement('div');
    answerContainer.className = 'answer__container';
    const answerWrapper = document.createElement("div");
    answerWrapper.className = "discussion__avatar--wrapper";
    const answerContent = document.createElement("div");
    answerContent.className = "discussion__content";


    const answerAvatarImg = document.createElement('img');
    answerAvatarImg.className = 'discussion__avatar--image';
    answerAvatarImg.src = obj.answer['avatarUrl'];
    answerAvatarImg.alt = 'avatar of ' + obj.answer['author'];
    answerWrapper.append(answerAvatarImg);

    const answerComment = document.createElement('p');
    answerComment.className = 'discussion__title';
    const answerALink = document.createElement('a');
    answerALink.href = obj.answer['url'];
    answerALink.innerHTML = obj.answer['bodyHTML'];
    answerComment.append(answerALink);

    const answerAuthor = document.createElement('div')
    answerAuthor.className = 'discussion__information';
    answerAuthor.textContent = obj.answer['author'] + ' / ' + obj.answer['createdAt'];
    answerContent.append(answerComment, answerAuthor);

    discussionAnsweredBox.addEventListener('click', function() {
      answerContainer.classList.toggle('show');
    })

    answerContainer.append(answerWrapper, answerContent);
    discussionAnswered.appendChild(answerContainer);
  }
  discussionAnswered.prepend(discussionAnsweredBox);

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
