// 이전 스크롤 위치를 기억하는 것을 무효화하기
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
const convertToDiscussion = (obj) => {
  // <li class="discussion__container">
  //   <div class="answer">답변보기</div>
  //   <div class="discussion__content">
  //     <div class="avatar__container">
  //       <img class="avatar" src="">
  //         <span class="author">dubipy</span>
  //     </div>
  //     <div class="content__container">
  //       <div class="content">koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다</div>
  //       <span class="date">2022. 5. 16. 오전 10:02:17</span>
  //     </div>
  //   </div>
  // </li>
  const li = document.createElement("li");
  li.className = "discussion__container";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar__container";
  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = obj.avatarUrl;
  const author = document.createElement("span");
  author.className = "author";
  author.textContent = obj.author;
  avatarContainer.append(avatar, author);

  const contentContainer = document.createElement("div");
  contentContainer.className = "content__container";
  const content = document.createElement("div");
  content.className = "content";
  content.textContent = obj.title;
  const date = document.createElement("span");
  date.className = "date";
  date.textContent = `${new Date(obj.createdAt).toLocaleString()}`;
  contentContainer.append(content, date);

  discussionContent.append(avatarContainer, contentContainer);

  const viewAnswer = document.createElement("div");
  viewAnswer.className = "answer";
  viewAnswer.textContent = "답변보기";

  li.append(viewAnswer, discussionContent);
  return li;
};

const discussionsPerLoad = 10;
let start = 0;
let loading = false; // 데이터를 가져오는 중인지 여부를 나타내는 변수

const getData = (start, limit) => {
  return agoraStatesDiscussions.slice(start, start + limit);
};

let discussions = getData(start, discussionsPerLoad);

const appendData = (element, data) => {
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
};

const ul = document.querySelector(".유엘");
appendData(ul, discussions);

let body = document.querySelector("body");

// 인피니티 스크롤
window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // 데이터를 가져오는 중이거나 모든 데이터를 다 가져왔으면 더 이상 작업을 하지 않습니다.
  if (loading || start >= agoraStatesDiscussions.length) {
    return;
  }

  if (scrollTop + clientHeight >= scrollHeight) {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
    loading = true;
    setTimeout(() => {
      loader.style.display = "none";
      if (agoraStatesDiscussions.length - start < 10) {
        start += discussionsPerLoad;
      } else {
        start += discussionsPerLoad;
      }
      console.log(start);
      discussions = getData(start, discussionsPerLoad);
      appendData(ul, discussions);
      loading = false;
    }, 1000);
  }
});

// 최상단으로 이동하기
const scrollButton = document.querySelector(".scroll");
scrollButton.addEventListener("click", function () {
  window.scroll({
    behavior: "smooth",
    top: body.offsetTop,
  });
});
