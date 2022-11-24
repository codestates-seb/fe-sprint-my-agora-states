// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  // li
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // li - 아바타 div
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // 아바타디브 클래스 지정
  // li - 아바타 div - img
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;  // 아바타 이미지 요소 추가
  avatarImg.alt = `avatar of ${obj.author}`; // 이미지 이름 추가
  avatarWrapper.append(avatarImg); // 이미지를 자식으로 추가

  // li - 컨텐츠 div
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // 텍스트컨텐츠 클래스 지정
  // li - 컨텐츠 div - 제목 h2
  const discussionTitle = document.createElement('h2'); // 제목 태그 생성
  discussionTitle.className = 'discussion__title'; // 제목 클래스 이름 지정
  // li - 컨텐츠 div - 제목 h2 - a 링크
  const textLink = document.createElement('a'); // a링크 추가
  textLink.href = obj.url; // 주소 할당
  textLink.textContent = obj.title; // 제목 텍스트 가져오기
  discussionTitle.append(textLink); // 링크를 자식으로 추가
  discussionContent.append(discussionTitle); // 제목을 자식으로 추가
  // li - 컨텐츠 div - 생성자 div
  const discussionInfo = document.createElement('div'); // 디브 생성
  discussionInfo.className = 'discussion__information'; // 생성자 클래스 추가
  discussionInfo.textContent = `${obj.author} · ${new Date(obj.createdAt).toLocaleDateString()}`; // 내용 추가
  discussionContent.append(discussionInfo); // 생성자를 자식으로 추가

  // li - 대답했안했 div
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // 대답했안했 클래스 지정
  // li - 대답했안했 div - 상태ui p태그
  const statusUI = document.createElement('p'); // p태그 생성
  statusUI.className = 'tag';
  statusUI.textContent = obj.answer ? '답변완료' : '답변중'; // 나중에 체크박스 기능 추가 // 여유되면 디자인 변경
  discussionAnswered.append(statusUI); // p태그를 자식으로 추가
  discussionContent.prepend(discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 div, 컨텐츠 div, 대답했안했 div -> li
  li.append(avatarWrapper, discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

// form을 불러오자
const form = document.querySelector('form.form');
const formAuthor = form.querySelector('div.form__input--name > input');
const formTitle = form.querySelector('div.form__input--title > input');
const formTextbox = form.querySelector('div.form__textbox > input');

// submit 이벤트 시 li안에 들어갈 정보 추가
form.addEventListener('submit',(event) => {
  event.preventDefault();
  const submitObj = {
    id: 'gest',
    createdAt: new Date().toDateString(),
    title: formTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
    author: formAuthor.value,
    bodyHTML: formTextbox.value,
    avatarUrl: 'https://source.unsplash.com/random'
  }
  // data.js의 agoraStatesDiscussions 배열 안으로 submit된 obj 변수를 추가한다
  // unshift를 사용해서 맨 앞으로 보낸다(최신순)
  agoraStatesDiscussions.unshift(submitObj);
  // data.js의 agoraStatesDiscussions.obj를 convertToDiscussion 함수에 넣어 li 안의 자식 태그들로 변환시켜 li 더미를 반환시킨다.
  const discussion = convertToDiscussion(submitObj);
  // 이걸 또 변수로 선언해서 ul안의 첫째 li로 넣어준다
  ul.prepend(discussion); // prepend는 append처럼 자식으로 만드는데 첫째로 바꾼다
  alert ('게시물이 등록되었습니다.'); // 등록 시 알림팝업
  formAuthor.value = ''; // 이름 초기화
  formTitle.value = ''; // 제목 초기화
  formTextbox.value = ''; // 내용 초기화
});


const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // 
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

render(ul);


