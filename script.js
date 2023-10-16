// <li class="discussion__container">
// <div class="discussion__avatar--wrapper">
//   <img class="discussion__avatar--image"
//     src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
//     alt="avatar of kimploo">
// </div>
// <div class="discussion__content">
//   <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
//   <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
// </div>
// <div class="discussion__answered"><p>☑</p></div>
// </li>

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// interface Discussion {
//   id: string;
//   createdAt: string;
//   title: string;
//   url: string;
//   author: string;
//   answer?: Answer | null;
//   bodyHTML: string;
// }

// agoraStatesDiscussions 배열 초기화
// let agoraStatesDiscussions = [];

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  const discussionAnchor = document.createElement('a');
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');

  //체크박스 조건문
  if (obj.answer === null && !obj.title.includes('notice')) {
    // ❌ 이미지를 표시
    const imageElement = document.createElement('img');
    imageElement.src = 'x.jpg'; // 이미지 파일의 경로
    discussionAnswered.append(imageElement); // 이미지 엘리먼트를 추가
  } else if (obj.title.includes('notice')) {
    discussionAnswered.textContent = ' ';
  } else {
    // ✔️ 이미지를 표시
    const imageElement = document.createElement('img');
    imageElement.src = 'check.jpg'; // 다른 이미지 파일의 경로
    discussionAnswered.append(imageElement); // 이미지 엘리먼트를 추가
  }

  // h1에 이미지 추가
  const h1 = document.createElement('h1');
  // <img> 요소 생성
  const img = document.createElement('img');

  // 수정
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;
  discussionAnchor.target = '_blank';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  img.src = '내부이미지의-경로.jpg';
  img.alt = '내부 이미지';

  // 삽입
  // li의 자식인가? discussion의 자식인가? 어디에 속해있는지를 보기
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle);
  // avatarWrapper에 avatarImg를 삽입한다.
  avatarWrapper.append(avatarImg);

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
const ul = document.querySelector('ul.discussions__container');
render(ul);

// generateRandomString 함수를 추가
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// //const로 변수 만들기(함수 내에서 tag로 공간을 만든다.)
// //클래스도 지정해주기(선택)
// //내가 만든 DOM에 객체의 요소를 넣는다.
// //화면에 적절한 위치에 append로 붙여준다.

// //오브젝트
// //버튼을 누르는 이벤트
// //변수 btnsubmit =
let submitBtn = document.querySelector('.form__submit>input');

const addDiscussion = (event) => {
  event.preventDefault();

  // 새로운 ID 생성
  const randomID = 'D_' + generateRandomString(16);

  // 네임 인풋에 작성된 값
  // 제목 인풋에 작성된 값
  // 의견 인풋에 작성된 값
  // 현재 날짜
  // 위 정보들을 모아서 디스커션 객체로 만든다
  // 디스커션 객체를 컨버트투디스커션의 매개변수로 전달한다
  // 컨버트투디스커션 반환값인 li 요소를 ul에 어펜드한다
  // 어펜드말고 맨위에 뜨는 메서드를 찾아본다
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMinutes();
  let day = today.getDay();
  let second = today.getSeconds();
  let nameInput = document.getElementById('name');
  let titleInput = document.getElementById('title');
  let storyInput = document.getElementById('story');
  let name = nameInput.value;
  let title = titleInput.value;
  let story = storyInput.value;

  let discussion = {
    id: randomID,
    createdAt: today,
    title: title,
    url: 'https://google.com/',
    avatarUrl:
      'https://thumbs.dreamstime.com/b/pixel-mario-vector-pixel-mario-vector-icon-illustration-130142717.jpg',
    author: name,
    answer: null,
  };

  // 새로운 질문을 배열에 추가
  agoraStatesDiscussions.push(discussion);

  // 저장된 질문 배열을 로컬 스토리지에 업데이트
  localStorage.setItem(
    'agoraStatesDiscussions',
    JSON.stringify(agoraStatesDiscussions)
  );

  ul.prepend(convertToDiscussion(discussion));

  // 입력 필드 초기화
  nameInput.value = '';
  titleInput.value = '';
  storyInput.value = '';

  // 화면 갱신을 위해 render 함수 호출
  render();
};

// // 페이지가 로드될 때 로컬 스토리지에서 저장된 질문을 불러와 agoraStatesDiscussions 배열에 설정
// window.addEventListener('load', () => {
//   let storedDiscussions = localStorage.getItem('agoraStatesDiscussions');
//   if (storedDiscussions) {
//     agoraStatesDiscussions = JSON.parse(storedDiscussions);
//     render(ul); // 페이지 로드 시 저장된 질문을 다시 렌더링
//   }
// });

submitBtn.addEventListener('click', addDiscussion);
