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

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;


  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  contentTitle.append(titleAnchor);

  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentTitle, contentInfo);

  const checked = document.createElement('p');
  checked.textContent = obj.answer ? 'v' : 'x'


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  /*
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);
*/

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
  
};

  const form = document.querySelector('form.form');
  const title = document.querySelector('input#title');
  const author = document.querySelector('input#name');
  const story = document.querySelector('textarea#story')
  form.addEventListener('submit', (event) => {
    //하나의 객체를 만들어서 함수를 돌려 li로 만든다음 ul요소에 append
    event.preventDefault(); // 자동 새로고침 방지
    const newDiscussion = {  
      id: "unique value", // 객체의 고유값을 나타내는 속성
      createdAt: new Date(), // 날짜 생성
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: author.value,
      bodyHTML: story.value,
      avatarUrl: "https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/70f51863611542339982e1bfca7578a2/9079255d0f6c49f6a211f92291ff0784_1643284680.png",
    };
    ul.prepend(convertToDiscussion(newDiscussion));
    title.value ="";
    author.value="";
    story.value = "";

  })

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return; //배열의 길이만큼 append 작업을 해주는 함수
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);