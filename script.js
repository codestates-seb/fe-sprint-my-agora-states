//index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
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
  //1.프로필 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //2.질문 제목/ 작성자
  const qTitle = document.createElement('h2');
  const titleLink = document.createElement('a');
  const qName = document.createElement('div');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  qName.textContent = obj.author + ' / ' + obj.createdAt;
  qTitle.className = "discussion__title";
  qTitle.append(titleLink);
  qName.className = "discussion__information";
  discussionContent.append(qTitle, qName);

  //3.체크 박스
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? "✔" : "✘";
  checked.className = "discussion__answered";
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

//이벤트

const form = document.querySelector('.form');
const author = document.querySelector('.form__input--name > input')
const title = document.querySelector('.form__input--title > input')
const textArea = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const obj = {
    id: "anythings",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/22",
    author: author.value,
    answer: {
      id: "DC_kwDOHOApLM4AKV9Z",
      createdAt: "2022-05-09T03:06:41Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/22#discussioncomment-2711385",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dukjjang/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dukjjang">@dukjjang</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은  과제제출 매니저 설치가 안돼서 질문 주신 것 같은데요 !</p>\n<p dir="auto">매니저 설치를 하시는 폴더가 잘못된 것 같아 안되는 것 같습니다 !<br>\n계산기 폴더 안에서 다시 한 번 설치해보시겠어요 ?</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문 부탁드립니다 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML:
      '<p dir="auto"><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/102455275/167331807-64564418-a2f5-4077-8c0d-6c133065e16a.png"><img src="https://user-images.githubusercontent.com/102455275/167331807-64564418-a2f5-4077-8c0d-6c133065e16a.png" alt="스크린샷 2022-05-09 오전 11 43 27" style="max-width: 100%;"></a></p>\n<p dir="auto">Node Version Manager (v0.39.1)이 설치 되어 있습니다 .<br>\n위와 같이 과제제출 매니저 설치하려고 하는데 에러가 떠서 진행을 못하고 있습니다.</p>',
    avatarUrl: "https://avatars.githubusercontent.com/u/102455275?s=64&v=4",
  };

  ul.prepend(convertToDiscussion(obj));

})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
