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

  // 아바타이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // Discusstion 제목
  const H2 = document.createElement('h2'); // h2 tag create
  H2.className = 'discussion__title';
  const a = document.createElement('a'); // a tag create
  a.href = obj.url;
  a.textContent = obj.title;
  H2.append(a); // append a tag to h2 tag

  // Discusstion information
  const information = document.createElement('div');
  information.className = 'discussion__information';
  information.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(H2, information); // append h2 tag to discussion__content class

  // Discusstion answered
  const answered = document.createElement('div');
  answered.className = 'discussion__answered';
  const p = document.createElement('p');
  obj.checkbox ? p.textContent = '☒' : p.textContent = '☑'; // 새로 들어오는 데이터는 체크박스 x
  answered.append(p);
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

// 로컬스토리지 데이터를 agoraStatesDiscussions배열에 추가하는 함수
const addLocalStorageData = () => {
  let keys = Object.keys(localStorage);
  for (let key of keys.sort())
    agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem(key)));
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
addLocalStorageData(); // 로컬스토리지 데이터를 agoraStatesDiscussions배열에 추가
render(ul);

// 디스커션 추가 기능 submit버튼 누르면 실제 디스커션이 추가되어야 한다.
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
    url: 'https://velog.io/@zer0jun',
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
