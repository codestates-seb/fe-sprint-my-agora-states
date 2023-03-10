// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of' ${obj.author}`;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const contentTitle = document.createElement("h3");
  contentTitle.className = 'discussion__title';
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  contentTitle.append(titleAnchor) 

  const contentInfo = document.createElement("div");
  contentInfo.className = 'discussion__information';
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentTitle, contentInfo);
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '✅' : '❎';
  discussionAnswered.append(checked);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
};

const form = document.querySelector('form.form');
  const title = document.querySelector('input#title')
  const author = document.querySelector('input#name')
  const story = document.querySelector('textarea#story')
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newDicussion = {
      id: "unique value",
      createdAt: new Date(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: author.value,
      answer: {
        id: "DC_kwDOHOApLM4AKg6M",
        createdAt: "2022-05-16T02:09:52Z",
        url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
        author: "Kingsenal",
        bodyHTML: '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>',
        avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
      },
    bodyHTML: story.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4", 
    };
  ul.prepend(convertToDiscussion(newDicussion))
  title.value = "";
  author.value = "";
  story.value = "";
  })

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
function render(element) {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
