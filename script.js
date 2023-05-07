// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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

  // const formSubmit = document.querySelector("submit")

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
    if(obj.answer === null){

      discussionAnswered.innerHTML=
      `<p>🖤</p>`;
    }
    else{
      avatarWrapper.innerHTML=
      `<img class="discussion__avatar--image"
      src="${obj.avatarUrl}"
      alt="avatar of ${obj.author}">`;
      discussionAnswered.innerHTML=
      `<p>💗</p>`;
    }

  discussionContent.innerHTML=
    `<h2 class="discussion__title"><a href="${obj.url}" target="contentBox">${obj.title}</a></h2>
    <div class="discussion__information">${obj.author} / ${obj.createdAt}</div>` // author의 아바타 이미지는 왜 없는지..?

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { //element를 넣으면
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) { //질문 갯수만큼
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); //
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container"); // 변수 ul은 ul박스
render(ul);

document.querySelector("input").onclick = console.log(document.getElementsByClassName(".form").value)