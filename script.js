// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 아바타 코드
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img")
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;

  // 질문 코드
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title"
  const discussionTitleAnchor = document.createElement("a");
  discussionTitle.append(discussionTitleAnchor);
  discussionTitleAnchor.textContent = obj.title;
  discussionTitleAnchor.href = obj.url;
  // discussionTitleAnchor.setAttribute("href", obj.url);
  const discussionInformation = document.createElement("div")
  discussionInformation.className = "discussion__information"
  discussionInformation.textContent = `${obj.id} / ${obj.createdAt}`
  
  // checkbox
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnsweredP = document.createElement("p");
  discussionAnsweredP.textContent = "☑"
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionTitle, discussionInformation);
  discussionAnswered.append(discussionAnsweredP);
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

// submit을 눌렀을때
const submit = document.querySelector('.form__submit input')
submit.addEventListener('click', function() {
  // console.log('submit 버튼 누름')
  
  const name = document.querySelector('.form__input--name input').value;
  const title = document.querySelector('.form__input--title input').value;
  const question = document.querySelector('.form__textbox textarea').value;
  let today = new Date();
  let year = today.getFullYear(); //년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  const eng = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  let day = eng[today.getDay()];  // 요일
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초

  let newForm = {
    id : name,
    title : title,
    bodyHTML : question,
    createdAt: `${year}-${month}-${date}${day}${hours}:${minutes}:${seconds}`,
    url: "#",
    avatarUrl:
    "https://pbs.twimg.com/media/EjDeXNOU4AA_lE1.jpg",
  }
  if (name !== '' && title !== '' && question !== '') {
    agoraStatesDiscussions.unshift(newForm);
    ul.before(convertToDiscussion(agoraStatesDiscussions[0]));
  }
});