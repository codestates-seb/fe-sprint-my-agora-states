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
  //이미지 삽입의 경우
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //제목 삽입 및 링크 달기
  const discussionTitle = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);
  discussionContent.append(discussionTitle);

  //작성자 및 작성된 날짜의 경우
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = obj.author + '/' + obj.createdAt;
  discussionContent.append(discussionInformation);
  
  //체크박스
  const answered = document.createElement('p');
  answered.textContent = obj.answer;
  if (obj.answer === null) {
    answered.textContent = '☒'
  }
  else answered.textContent = '☑'
  discussionAnswered.append(answered);
  
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

const submit = document.querySelector(".submit"); // submit버튼
const author = document.querySelector(".form__input--name #name");
const title = document.querySelector(".form__input--title #name");

const addDiscussions = () => {
  if (author.value == '' || title.value == '') return alert("Error : 입력란을 채워주세요")
  const cutDate = new Date().toLocaleString();
  const avatarURL = 'https://w7.pngwing.com/pngs/395/693/png-transparent-smiley-emoticon-smiley-miscellaneous-face-smiley.png';
  const obj = {
    author: author.value,
    title: title.value,
    createdAt: cutDate,
    avatarUrl: avatarURL,
    url: null,
    checkbox: "☒"
  };
  const objString = JSON.stringify(obj); // 객체 문자열로 변환
  // 현재시간 key, value는 객체로 하여 배열을 문자열로 변환한 후 로컬스토리지에 저장.
  localStorage.setItem(cutDate, objString);

  agoraStatesDiscussions.push(obj);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length - 1]));
  alert("Discusstion 등록 완료");
}

submit.addEventListener('click', addDiscussions)