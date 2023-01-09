// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper'; // 아바타 이미지
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content'; // 타이틀, 날짜
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered'; // 체크

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatar = document.createElement('img');
  avatar.src = obj.avatarUrl;
  avatarWrapper.append(avatar);

  const content = document.createElement('h2');
  const title = document.createElement('a');
  title.href = obj.url;
  title.innerText = obj.title;
  content.append(title); // <h2>안에 <a>가 있음.
  discussionContent.append(content);

  const information = document.createElement('div');
  information.innerText = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(information);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
