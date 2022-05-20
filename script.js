// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 답변이 달린 질문은 체크박스 체크
const checked = (obj) => {
  if (obj.answer) {
    document.querySelector(`.${obj.id}Btn`).checked = true;
  } else {
    document.querySelector(`.${obj.id}Btn`).checked = false;
  }
};

// 답변이 달린 질문은 답변 링크 추가
const addLinks = (obj) => {
  if (obj.answer) {
    document.querySelector(`.${obj.id}`).setAttribute("href", obj.answer.url);
  }
};

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

  // 아바타 이미지
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // 질문 타이틀
  const contentH2 = document.createElement("h2");
  const contentA = document.createElement("a");
  contentA.textContent = obj.title;
  contentA.className = `${obj.id}`;
  contentH2.append(contentA);
  contentH2.className = "discussion__title";

  // 질문자명 / 작성 시간
  const contentInfo = document.createElement("div");
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString("ko-kr")}`;
  contentInfo.className = "discussion__information";
  discussionContent.append(contentH2);
  discussionContent.append(contentInfo);

  // 체크박스
  const answeredBtn = document.createElement("input");
  answeredBtn.setAttribute("type", "checkbox");
  answeredBtn.className = `checkboxBtn ${obj.id}Btn`;
  discussionAnswered.append(answeredBtn);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    checked(agoraStatesDiscussions[i]);
    addLinks(agoraStatesDiscussions[i]);

    const answerTag = document.querySelectorAll("a");

    Object.values(answerTag).forEach((answer, index) => {
      answer.addEventListener("mouseover", () => {
        const answerHTML = document.createElement("div");
        try {
          answerHTML.textContent = htmlParser(
            agoraStatesDiscussions[index].answer.bodyHTML
          );
        } catch {}

        answerHTML.className = "answered";
        answerHTML.style.position = "absolute";
        answerHTML.style.backgroundColor = "#f0e6c6";
        answerHTML.style.padding = "10px 10px";
        answerHTML.style.width = "400px";
        answerHTML.style.fontSize = "18px";
        answer.append(answerHTML);
      });
    });

    Object.values(answerTag).forEach((answer, index) => {
      answer.addEventListener("mouseout", () => {
        const answered = document.querySelector(".answered");
        answer.removeChild(answered);
      });
    });
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// submit 눌렀을때 새로 추가
const submitForm = document
  .querySelector(".form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    agoraStatesDiscussions.unshift({
      author: e.target[0].value,
      title: e.target[1].value,
      content: e.target[2].value,
      createdAt: new Date().toLocaleString("ko-kr"),
      avatarUrl:
        "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    });
    const ulTag = document.querySelector("ul");
    ulTag.textContent = "";
    render(ul);
  });

const htmlParser = (content) => {
  return content.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, "");
};
