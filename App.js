let discussions = []; 

fetch('http://localhost:4000/discussions')
  .then(res => res.json())
  .then(json => {
    discussions = json;
    const ul = document.querySelector('ul.discussions__container');
    render(ul);
  });

// discussion의 요소들을 디자인에 맞게 가공하는 함수
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 아바타 이미지 렌더링 기능 구현
  const avatarImg = document.createElement("img");

  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

  avatarWrapper.append(avatarImg);

  // Discussion 콘텐츠 렌더링 기능 구현
  const title = document.createElement("h2");
  const titleLink = document.createElement("a");
  const information = document.createElement("div");

  title.className = "discussion__title";
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

  discussionContent.append(title);
  discussionContent.append(information);

  // 답변 체크 렌더링 기능 구현
  const answered = document.createElement("div");
  const answeredCheck = document.createElement("p");

  if(obj.answer !== null) {
    answeredCheck.textContent = '☑︎';
  } else {
    answeredCheck.textContent = '☒';
  }

  answered.className = "discussion__answered";
  answered.append(answeredCheck);

  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (el) => {
  for (let i = 0; i < discussions.length; i++) {
    el.append(convertToDiscussion(discussions[i]));
  }
  return;
};
