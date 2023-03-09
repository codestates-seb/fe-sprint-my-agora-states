// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// 페이지 네이션, 디스커션 유지
// + 시간순 나열, notice 는 고정 + 검색(제목 , 저자)
// 랜덤 아바타 이미지 


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //li > avatarWrapper , discussionContent, discussionAnswered
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
 
  //avatarWrapper > avartarImg(src, alt)
  //아바타 이미지
  const avartarImg = document.createElement("img");
  avartarImg.className = "discussion__avatar--wrapper--img";
  avartarImg.setAttribute("src", obj.avatarUrl);
  avartarImg.setAttribute("alt", obj.author);

  //avatartWrapper 에 avatarImg
  avatarWrapper.append(avartarImg);

  //discussionContent > disscussion_title(h2>a), discussion__information
  //disscussion_title(h2>a)
  const discussionTitle = document.createElement("h2");
  discussionTitle.setAttribute("class", "discussion_title");

  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute("href", obj.url);
  discussionTitleA.textContent =  obj.title;
  discussionTitle.append(discussionTitleA);


  //discussion__information
  const discussionInfo = document.createElement("div");
  discussionInfo.setAttribute("class", "discussion__information");
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  // discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;

  discussionContent.append(discussionTitle, discussionInfo);


  //discussionAnswered > p
  const answerChecked = document.createElement("p");
  answerChecked.textContent = obj.answer === null ? '☒' : '☑';


  discussionAnswered.append(answerChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // const sortedAgoraStatesDiscussions = agoraStatesDiscussions.sort((a, b) => a.createdAt - b.createdAt);
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// discussion 추가
// const form= document.querySelector('.form__container');
// let elInputUserName = document.querySelector('#name');
// let elInputTitle = document.querySelector('#title');
// let elInputTextBox = document.querySelector('#story');

// form.addEventListener('submit', function(e) {
//   e.preventDefault();

//   const newDiscussion = {
//     createdAt : new Date().toLocaleString(),
//     title : elInputTitle.value,
//     url: "https://github.com/codestates-seb/agora-states-fe/discussions",
//     author : elInputUserName.value,
//     answer : null,
//     bodyHTML : elInputTextBox.value,
//     avatarUrl : 'https://velog.velcdn.com/images/jeongjwon/profile/b4c71781-8b27-4f09-bb22-400d72d0e8cc/image.png'
//   };
  
  
//  agoraStatesDiscussions.unshift(newDiscussion);
//  const newArr = convertToDiscussion(newDiscussion);
//  ul.prepend(newArr);
// });





//filter - notice
const noticeDiscussions = agoraStatesDiscussions.filter(obj => obj === 'kimploo');
const otherDiscussions  = agoraStatesDiscussions.filter(obj => obj !== 'kimploo');

