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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //image
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + Object.author;
  avatarWrapper.append(avatarImg);

  //title
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);
  discussionContent.append(discussionTitle);

  //information
  const discussionInformation = document.createElement('div');
  discussionInformation.classList.add('discussion__information');
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionInformation);

  //answer 유무 조건
  const discussionAnsweredP = document.createElement('p');
  if (obj.answer !== null) {
    discussionAnsweredP.textContent = '✅';
  } else {
    discussionAnsweredP.textContent = '❎';
  }
  discussionAnswered.append(discussionAnsweredP);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//event 리스너
const form = document.querySelector('.form');
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
const text = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = {
    id: 'number',
    createdAt: new Date(),
    title: title.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/36',
    author: author.value,
    answer: {
      id: 'DC_kwDOHOApLM4AKW7k',
      createdAt: '2022-05-09T14:47:22Z',
      url: 'https://github.com/codestates-seb/agora-states-fe/discussions/36#discussioncomment-2715364',
      author: 'Citysquirrel',
      bodyHTML:
        '<p dir="auto">안녕하세요 <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/Gwanghyun-Jeon/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/Gwanghyun-Jeon">@Gwanghyun-Jeon</a>  님!<br>\n코드스테이츠 교육 엔지니어 곽명우입니다 <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<hr>\n<p dir="auto"><code class="notranslate">package.json</code>에 적힌 <code class="notranslate">dependencies</code>는 글자 그대로 <strong>의존성</strong>을 의미합니다.</p>\n<blockquote>\n<p dir="auto"><em>이 프로젝트를 구동하기 위해서는 이러이러한 package들이 필요해</em></p>\n</blockquote>\n<p dir="auto">프로젝트에서 필요한 모듈을 가져와서 사용했고, 이 모듈들이 없으면 프로젝트는 <code class="notranslate">module not found</code> 에러를 뱉어냅니다.</p>\n<p dir="auto">여기서, 나의 프로젝트 뿐만 아니라 해당 모듈(패키지)들도 하나의 프로젝트들로 볼 수 있고, 이 녀석들도 어떠한 모듈들에 의존합니다.<br>\n<code class="notranslate">node_modules</code> 폴더에 package.json에는 기록되지 않은 수많은 모듈들이 설치되는 것은 바로 이 때문입니다.</p>\n<p dir="auto">더 자세한 내용은 다음 키워드를 검색해서 알아보세요 :)</p>\n<ul dir="auto">\n<li>package.json dependency tree (의존성 트리)</li>\n<li><code class="notranslate">npm list</code> 명령어</li>\n<li>package-lock.json 의 역할</li>\n</ul>\n<hr>\n<p dir="auto">답변이 도움이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 Mark as answer를 눌러주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n추가 질문이 있으시면 꼭! 답글을 달아주세요.</p>\n<p dir="auto">감사합니다.<br>\n코드스테이츠 교육 엔지니어<br>\n곽명우 드림</p>',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4',
    },
    bodyHTML:
      '<p dir="auto">강의에서 들을 때는 package.json 에 필요한 모듈 목록이 써 있고,<br>\nnpm install을 하면 필요한 모듈들이 다운로드 되는 걸로 이해하고 있었습니다.</p>\n<p dir="auto">오늘 과제 항목 \'fe-sprint-cli-practice-main\' 에서 package.json 내용은 아래와 같습니다.<br>\n<code class="notranslate"> "name": "fe-sprint-cli-practice", "version": "1.0.0", "description": "", "main": "index.js", "scripts": { "start": "", "test": "mocha getListMultiplesOfTwo.test.js --timeout 50000 --reporter mocha-multi-reporters --reporter-options configFile=multi-reporters.json", "report": "mocha getListMultiplesOfTwo.test.js --sort --reporter @mochajs/json-file-reporter", "submit": "codestates" }, "keywords": [], "author": "", "license": "ISC", "devDependencies": { "codestates-assignment-manager": "^1.7.0", "mocha-multi-reporters": "^1.5.1", "@mochajs/json-file-reporter": "^1.3.0", "chai": "^4.3.4", "mocha": "^8.3.2"</code><br>\n필요한 모듈이 써있는 "devDependencies" 항목에는 5개의 항목이 있는데,<br>\nnode_modules 폴더에 설치된 항목은 604개가 다운로드 되었습니다.</p>\n<p dir="auto">질문) npm install 명령어 사용시 package.json 파일에 명시 되어있는 항목만 다운로드 되는게 아닌가요?</p>',
    avatarUrl: 'https://avatars.githubusercontent.com/u/73211553?s=64&v=4',
  };
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  title.value = '';
  author.value = '';
  text.value = '';
});

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
