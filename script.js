// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; //div로 아바타를 덮고 있는 애를 만듦
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; //div로 디스커션 할 콘텐츠 상자를 만듦
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; //div로 답변 체크 상자를 만듦

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "avatar-img";
  avatarWrapper.append(avatarImg); // 아바타 상자에 아바타 이미지가 들어갈 수 있도록 div 아바타 상자 안에 넣어줌

  const titleData = document.createElement("h2");
  titleData.className = "discussion__title";
  discussionContent.append(titleData);

  const titleUrl = document.createElement("a");
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  titleData.append(titleUrl);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author}/${obj.createdAt}`;
  discussionContent.append(discussionInfo);

  const checkAnswer = document.createElement("div");
  checkAnswer.textContent = answerConfirm(obj); //답변 체크된 거 어케 만들지
  discussionAnswered.append(checkAnswer);

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

const answerConfirm = (value) => {
  if (value.answer === null) {
    return "❌";
  } else {
    return "✅";
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//폼에다가 입력하고, submit 버튼을 클릭했을 때(onclick 이벤트 핸들러 써야하는 건 맞는 거 같음)
// 폼에 입력된 정보가 객체에 담긴다 (키와 값으로)
//id가 name에 담긴 건 key 'author'에 담겨야 하고
//id title에 담긴 건 key 'title'에 담겨야 한다.
//날짜도 담겨야 하네 생각해보니...
// 배열인 agoraStatesDiscussions의 가장 뒤에 만들어진 객체가 더해진다.
//agoraStatesDiscussion.push('요소')

const Form = document.querySelector(".form");
const submitBtn = document.querySelector("#send");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
let ObjectForForm = {};

Form.submit = function () {
  if (
    (inputName.textContent !== "",
    inputTitle.textContent !== "",
    inputStory !== "")
  ) {
    ObjectForForm.author = inputName.textContent;
    ObjectForForm.title = inputTitle.textContent;
    ObjectForForm.createdAt = new Date();
    ObjectForForm.avatarUrl =
      agoraStatesDiscussions[
        Math.floor(Math.random() * agoraStatesDiscussions.length)
      ].avatarUrl;
    agoraStatesDiscussions.push(ObjectForForm);
  }
};
