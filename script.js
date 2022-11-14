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

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg)

  const discussionTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a')
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor)
  discussionContent.append(discussionTitle)

  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionInfo)


  const checked = document.createElement('p')
  checked.textContent = obj.answer ? "☑︎" : "◻︎";
  discussionAnswered.append(checked)


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


  // 디스커션 추가 구현


// 문서 내용 가져 오기

const form = document.querySelector("form.form")

form.addEventListener ("submit",
  (event) => {
    event.preventDefault();

    const author = form.querySelector("div.form__input--name > input").value
    const title = form.querySelector("div.form__input--title > input").value
    const textbox = form.querySelector("div.form__textbox > textarea").value

    const newObj = {
      id: "new id",
      createdAt: new Date().toISOString(),
      title: title,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: author,
      bodyHTML: textbox,
      avatarUrl: "https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4",
    }

    agoraStatesDiscussions.unshift(newObj);

    const discussion = convertToDiscussion(newObj)

    ul.prepend(discussion)

    form.querySelector("div.form__input--name > input").value
    form.querySelector("div.form__input--title > input").value
    form.querySelector("div.form__textbox > textarea").value

  }

)

