// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

console.log(agoraStatesDiscussions);
const LIST = 'boardlist';

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  let contentTitle = document.createElement("h2");
  contentTitle.classList.add('discussion__title');
  if (obj.title.length < 22) {
  contentTitle.textContent = `${obj.title}`;
  } else {
    contentTitle.textContent = `${obj.title.substring(0,40)}...`
  }
  let contentLink = document.createElement("a");
  contentLink.setAttribute('href' , `${obj.url}`);
  contentLink.append(contentTitle);
  discussionContent.append(contentLink);

  let avatarImg = document.createElement("img");
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.setAttribute('src' ,`${obj.avatarUrl}`);
  avatarWrapper.append(avatarImg)

  let contentInfo = document.createElement('div');
  contentInfo.classList.add('discussion__information');
  let contentName = document.createElement('span');
  contentName.classList.add('content__name');
  contentName.textContent = `${obj.author}`;
  let contentDate = document.createElement('span');
  contentDate.classList.add('content__date');
  contentDate.textContent = `${obj.createdAt}`;
  contentInfo.append(contentName);
  contentInfo.append(contentDate);
  discussionContent.append(contentInfo);

  let answerChecked = document.createElement("div");
  answerChecked.className = "answered";
  if(obj.answer === null) {
    answerChecked.textContent = "⚪️ 답변 없음";
  } else {answerChecked.textContent = "🟢 답변 완료";
  }
  discussionAnswered.append(answerChecked);

  li.append(discussionContent, avatarWrapper, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let lists = JSON.parse(localStorage.getItem('boardlist'));
if (!lists) {
  lists = agoraStatesDiscussions;
} 

const render = (element) => {
  for (let i = 0; i < 8; i += 1) {
    element.append(convertToDiscussion(lists[i]));
  }
  return;
}

let loadBtn = document.querySelector('.loading');
let viewedContent = 8;
loadBtn.onclick = function () {
  const reRender = (element) => {
    for (let i = viewedContent; i < viewedContent + 8 ; i++) {
      element.append(convertToDiscussion(lists[i]));
    }
    viewedContent += 8;
    return;
  }
  reRender(ul);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submitBtn = document.querySelector(".form__submit--btn");
submitBtn.onclick = function (event) {
  let inputName = document.querySelector(".name");
  let newName = inputName.value;
  let inputTitle = document.querySelector(".title");
  let newTitle = inputTitle.value;
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let dateString = ''
  if (hour > 12){
    dateString = `${year}년 ${month+1}월 ${date}일 오후 ${hour-12}시 ${minute}분`;
  } else {
    dateString = `${year}년 ${month+1}월 ${date}일 오전 ${hour}시 ${minute}분`;
  }

  lists.unshift({
  title: `${newTitle}`,
  author: `${newName}`,
  createdAt: `${dateString}`,
  answer: null,
  avatarUrl: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/325/ninja_1f977.png",
  });
  
  localStorage.setItem(LIST, JSON.stringify(lists));
} 