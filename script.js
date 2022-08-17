// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const ul = document.querySelector('ul.discussions__container');
  ul.append(li);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const discussionTiile = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  discussionTiile.className = 'discussion__title';
  titleAnchor.textContent = obj.title;
  titleAnchor.href = obj.url;
  discussionTiile.append(titleAnchor);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleDateString()}`;
  discussionContent.append(discussionTiile, discussionInformation);
  //ㅎㅎㅎㅎㅎ
  const checked = document.createElement('p');
  checked.className = 'discussion__answered';
  checked.textContent = obj.answer ? '✓' : '𐄂';
  discussionAnswered.append(checked);

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
const ul = document.querySelector('ul.discussions__container');
render(ul);

document.querySelector('.form').onsubmit = function () {
  var nameValue = this.name.value;
  var titleValue = this.title.value;

  let newArray = {
    author: nameValue,
    title: titleValue,
    answer: null,
    createdAt: new Date(),
    avatarUrl:
      'https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4',
  };

  console.log(newArray);
  agoraStatesDiscussions.unshift(newArray);
  console.log(agoraStatesDiscussions);

  ul.prepend(convertToDiscussion(newArray));

  this.name.value = '';
  this.title.value = '';
  this.story.value = '';

  return false;
  //
};
