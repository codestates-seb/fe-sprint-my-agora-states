// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 아바타 정보 담기
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of "+ obj.author;

  avatarWrapper.append(avatarImg);

  // 컨텐츠 정보 담기
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // 제목
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;

  discussionTitle.append(discussionTitleLink);
  // 작성자, 날짜
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author +" / "+ new Date(obj.createdAt).toLocaleString();
  
  discussionContent.append(discussionTitle, discussionInfo);
  
  // 답글 정보 담기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionAnsweredChk = document.createElement("span");
  discussionAnsweredChk.className = "discussion__answered--icon";
  discussionAnsweredChk.textContent = (obj.answer) ? "✔" : "✖";
  discussionAnswered.append(discussionAnsweredChk);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // local storage 게시물
  for (let i = localStorage.length; i >= 1; i--){
    element.append(convertToDiscussion(JSON.parse(localStorage.getItem(i))));
  }

  // data.js 게시물 
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 질문 입력 후 submit 눌렀을 때, local storage에 저장
document.querySelector(".form").addEventListener("submit", (event) => {
  const idx = localStorage.length + 1;
  const discussionNewData = {
    id: idx,
    createdAt: new Date(),
    title: form["title"].value,
    url: "about:blank",
    author: form["name"].value,
    answer: null,
    bodyHTML: form["story"].value,
    avatarUrl: getAvataImgRandom(),
  }; 
  
  localStorage.setItem(idx, JSON.stringify(discussionNewData));
});

// document.querySelector("#pageForm").addEventListener("submit", (event) => {
//   alert('page form submit')
// });

// // 페이징 눌렀을 때
// document.querySelector(".navigator__page").addEventListener("click", (event) => {
//   // const ele = ;
//   // const goPage = ele.;
//   const pageForm = document.querySelector("#pageForm");
//   pageForm["page"].value = event.target.textContent;
//   pageForm.onsubmit();
  
// });

// 아바타 이미지 정보 가져오기. 랜덤
function getAvataImgRandom() {
  const arrImg = [
    'https://img.icons8.com/fluency/48/000000/walter-white.png',
    'https://img.icons8.com/color/48/000000/cookie-monster.png',
    'https://img.icons8.com/fluency/48/000000/mummy.png',
    'https://img.icons8.com/fluency/48/000000/scream.png',
    'https://img.icons8.com/fluency/48/000000/luigi.png',
    'https://img.icons8.com/fluency/48/000000/smurf.png',
    'https://img.icons8.com/color/48/000000/genie.png',
    'https://img.icons8.com/fluency/48/000000/bmo.png',
    'https://img.icons8.com/fluency/48/000000/jake.png'
  ];

  let randomIdx = Math.floor(Math.random() * arrImg.length);
  return arrImg[randomIdx];
}