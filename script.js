// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

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

  const discussionAvatarImage = document.createElement("img");
  discussionAvatarImage.className = "discussion__avatar--image";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  avatarWrapper.append(discussionAvatarImage);
  discussionContent.append(discussionTitle);
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionInformation);

  /*   좋은 삽질이였다.
    letsMappingDatas(
    obj,
    discussionAvatarImage,
    discussionTitle,
    discussionInformation,
    discussionLink,
    discussionAnswered,
  ); */
  discussionAvatarImage.src = obj.avatarUrl;
  discussionAvatarImage.alt =
    "https://faopharmacy.unc.edu/wp-content/uploads/sites/200/2022/04/noimage.png";
  discussionLink.textContent = obj.title;
  discussionLink.href = obj.url;
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionAnswered.textContent = obj.answer === null ? "X" : "O";

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// /**
//  * 아아아앙대
//  * @param {*} obj, arguments
//  * @returns boolean
//  */
// const letsMappingDatas = (obj) => {
//   return obj && arguments.length != 0
//     ? function () {
//         let avatar, title, link, information, answer;
//         for (arg of arguments) {
//           switch (arg.className) {
//             case "discussion__avatar--image":
//               avatar = arg;
//               break;
//             case "discussion__title":
//               title = arg;
//               break;
//             case "discussion__link":
//               link = arg;
//               break;
//             case "discussion__information":
//               information = arg;
//               break;
//             case "discussion__answered":
//               answer = arg;
//             default:
//               return false;
//           }
//         }
//         if(avatar)
//           avatar.src = obj.avatarUrl;
//       }
//     : false;
// };

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //로컬스토리지 READ
  const dummyArrInLocalStorage = JSON.parse(localStorage.getItem(DATA_KEY));

  for (let i = 0; i < dummyArrInLocalStorage.length; i += 1) 
    element.append(convertToDiscussion(dummyArrInLocalStorage[i]));
  
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const containerForm = document.querySelector(".form");


/**
 * dummyData insert
 * @param {form data submit action} event 
 */
containerForm.onsubmit = (event) => {
  event.preventDefault();
  //console.log(agoraStatesDiscussions.length);
  //로컬 스토리지 READ
  const dummyArrInLocalStorage = JSON.parse(localStorage.getItem(DATA_KEY));
  const randomObj =
    dummyArrInLocalStorage[
      getRandomIndexFromDummyArr(dummyArrInLocalStorage.length)
    ];

  const copyObj = Object.assign({}, randomObj);

  copyObj.author = this.id.value;
  copyObj.title = this.title.value;
  copyObj.createdAt = new Date();
  if(Math.random() > 0.5)
    copyObj.answer = null;

  dummyArrInLocalStorage.unshift(copyObj);

  //console.log(agoraStatesDiscussions.length);
  //추가문
  ul.prepend(convertToDiscussion(copyObj));

  //로컬 스토리지 UPDATE
  LOCAL_STORAGE.setItem(DATA_KEY, JSON.stringify(dummyArrInLocalStorage));

  console.log(JSON.parse(LOCAL_STORAGE.getItem(DATA_KEY)));
};

const getRandomIndexFromDummyArr = (arrLength) =>
  Math.floor(Math.random() * arrLength);


