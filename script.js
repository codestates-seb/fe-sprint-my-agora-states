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
  const avatar = document.createElement('img');
  avatar.src = obj.avatarUrl;
  avatar.alt = "avatar of" + obj.author
  avatarWrapper.append(avatar);

  const contentTitle = document.createElement("h2");
  const contentLink = document.createElement("a");
  contentLink.textContent = obj.title;
  contentLink.href = obj.url;
  discussionContent.append(contentTitle); // 제목을 넣어준다
  contentTitle.append(contentLink); // 제목에 링크를 붙여줌

  const contentInfo = document.createElement("div");
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(contentInfo)

  const checkBox = document.createElement("div");
  checkBox.textContent = obj.answer ? "✅" : "❌";
  discussionAnswered.append(checkBox)




  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

let submitBtn = document.querySelector('.form')
submitBtn.addEventListener('submit', (event) => {
  console.log(event)
  event.preventDefault();
  const addTitle = document.querySelector('.form__input--title > input');
  const addName = document.querySelector('.form__input--name > input');
  const textbox = document.querySelector("div.form__textbox > textarea");
  let today = new Date()

  const face = [ // 아바타 프로필 랜덤주소들을 담은 배열.
    "https://i.seadn.io/gae/NkSxWjGhI9gmMBEU_vqId3lixlc19TFuJVFyu0Bsr68ZnHQauBOitIdbB9HVXjG2Ln1pXgmM7oU7Mrfu80qdXn0NdEiqhNlORgqL9A?w=500&auto=format",
    "https://i.seadn.io/gae/jae2BdxsEAaAtxROMDy1LPTWsWJ9Ife_bwNpbUW3FOf2c7faxyBvNxYS2H98IshedxpXtOj1BWjNsMM-AYdhJtzuptn74vYjWgffHA?w=500&auto=format",
    "https://i.seadn.io/gae/bhJF5ykyVNv_04oVeUBlRB7xNYgy8275d9eO_OvPxQZje0lqUBozt5X_krdec1dBMU_zlITWRCieQF3BlgAxq1jgRYH8OLqnVags?w=500&auto=format",
    "https://i.seadn.io/gae/bhJF5ykyVNv_04oVeUBlRB7xNYgy8275d9eO_OvPxQZje0lqUBozt5X_krdec1dBMU_zlITWRCieQF3BlgAxq1jgRYH8OLqnVags?w=500&auto=format",
    "https://i.seadn.io/gae/dcNkxOr5ONyx-L9OPfjFYeel7X8Sfnckz4rYK_R8Y6GfWu2Gv645yZWNVKxnJaTeTVqj5Hl7-k8ZSDlv86hK9Nsv77F6i2AgFCosdg?w=500&auto=format",
    "https://i.seadn.io/gae/THh4dEqZwcZTOAy3DSm1pnaQE0KDJEBC7W35UPgRPyus7cUL9RsqYliVHT8ZKHe3WcO38UImMHdrL0bkqBDbdF_9LjKDx61cmzSkvA?w=500&auto=format",
    "https://i.seadn.io/gae/Yc7ZPMaTJuXVI7Ls9rDg8siPKV64cLva5IWPw-guEQR1_4piSRcNzWQtTNKnxwthJSvEFUneA35BELNaAPJrxSRr0jfVPmdi0UaKQQ?w=500&auto=format",
    "https://i.seadn.io/gae/wv2Q2VKCTzObuhz51ACJrRgwNeCvJYeFS19cRu88W5Dc1fzXIslJNZ4BK10kKSYPldQnLu_cMKul8XRv2ZcdAYQNt4glDaPDuvmB62I?w=500&auto=format",
    "https://i.seadn.io/gae/-geAdcgKsCCyeIW3hVsHt_DDFOq52gt7MJPvird5Wgcm4juqM77t4P1QmhNgOQxIFAKeOCCfuJCK2KB3ML0JtLasa2lJ-ijFUEbt4Bc?w=500&auto=format",
    "https://i.seadn.io/gae/YOEwXVFMdGvvKp1eLh2CUMt3v2qpsXZ3k7UclW6jJjrg5tXO0pjSe8kTaQr-mVPxqU4HPzvwKO2dkhQvSVRshCHPuDaWb0t1HI2dng?w=500&auto=format",
    "https://i.seadn.io/gae/_u1kVJe4yA7yHYuD0Wm-x4u4WoqHLUtj30hBCjp0jeyGa0ywSxOnNVXm9DBugnsz3IhhupAQgRfyEcpDplEmT1zSsW797zqm2I6_RA?w=500&auto=format",
    "https://1.bp.blogspot.com/-uJDND-FYvMY/YPKvwxcD7hI/AAAAAAAAPu0/c-PGGUKkVNspsYuNbp7p9AvlWioxkeFKQCLcBGAsYHQ/s1000/37207f5e625857e005f46bc83c90a9a88240f1a8.gif"
  ];

  function randomuserFace(array) { // 배열을 임의로 랜덤하여 추출해주는 함수.
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }
  const userFace = randomuserFace(face);

  const newObj = {
    title: addTitle.value,
    author: addName.value,
    bodyHTML: textbox.value,
    avatarUrl: userFace,
    createdAt: today
  }

  agoraStatesDiscussions.unshift(newObj);
  const addContent = convertToDiscussion(newObj);
  ul.prepend(addContent);

  addTitle.value = '';
  addName.value = '';
  textbox.value = '';

});

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
