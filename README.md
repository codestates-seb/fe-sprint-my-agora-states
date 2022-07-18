# My Agora States

2
const li = document.createElement('li'); // li 요소 생성
li.className = 'discussion__container'; // 클래스 이름 지정

const avatarWrapper = document.createElement('div');
avatarWrapper.className = 'discussion__avatar--wrapper';
const discussionContent = document.createElement('div');
discussionContent.className = 'discussion__content';
const discussionAnswered = document.createElement('div');
discussionAnswered.className = 'discussion__answered';

const avatarImg = document.createElement('img');
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

li.append(avatarWrapper, discussionContent, discussionAnswered);

const ul = document.querySelector('ul.discussions__container');
ul.append(li);