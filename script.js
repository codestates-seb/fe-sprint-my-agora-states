// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion에 obj를 넣어 li를 리턴하는 함수
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 1. 아바타 박스
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // 2. 컨텐츠 박스
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // 3. 응답체크 박스
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // 아바타 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // h2태그 제목
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);
  // 링크
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  contentTitle.append(titleLink);

  // 저자, 생성일 정보
  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information";

  // 작성날짜시간
  let createdAtTime = obj.createdAt.slice(-9,-1); // 시간만 잘라불러오기(그 뒤분초들은 slice(2)해서 붙이기)
  if(createdAtTime.slice(0,2) < 13){
    createdAtTime = `오전 ${createdAtTime}`
  } else if(createdAtTime.slice(0,2) >= 13 && createdAtTime.slice(0,2) < 22){
    createdAtTime = `오후 0${createdAtTime.slice(0,2)-12}${createdAtTime.slice(2)}`;
  } else {
    createdAtTime =`오후 ${createdAtTime.slice(0,2)-12}${createdAtTime.slice(2)}`;
  }
  discussionInformation.textContent = `${obj.author} / ${createdAtTime}`
  discussionContent.append(discussionInformation);


  // 체크박스
  const answeredCheckbox = document.createElement('p');
  if(obj.answer){
    answeredCheckbox.textContent = '☑';
  } else {
    answeredCheckbox.textContent = '☒';
  }
  discussionAnswered.append(answeredCheckbox);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 폼 컨테이너 DOM으로 불러오기

const form = document.querySelector('form.form'); // 폼 입력 컨테이너
const author = document.querySelector('#name'); // 이름 입력 칸
const title = document.querySelector('#title'); // 제목 입력 칸
const textbox = document.querySelector('#story'); // 질문 입력 칸

let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let date = ('0' + today.getDate()).slice(-2); 
let hours = ('0' + today.getHours()).slice(-2); 
let minutes = ('0' + today.getMinutes()).slice(-2);
let seconds = ('0' + today.getSeconds()).slice(-2);

let dateString = year + '-' + month + '-' + date;
let timeString = hours + ':' + minutes + ':' + seconds;



form.addEventListener('submit',(event) => {
  // 브라우저의 기본동작을 막아주는 메소드 .preventDefault()
  // form,input태그들은 사용자의 입력값을 submit해주고, 페이지를 새로고침하는 기본동작을 가지고 있어서 이벤트리스너를 하기전 동작을 강제 중지 시킨다.
  event.preventDefault(); 
  // 무엇을 넣어줘야하나?? 사용자의 입력값!
  // 더미데이터에 쌓여있는 배열형태의 객체(obj)에 적용시켜야 그 틀을 기반으로 사용자의 입력값이 우리가 만든 디스커션에 추가가 될수 있겠지?
  // 예시 객체를 하나 불러와서 실제 화면에 보이는 디스커션 정보만 넣고 나머지는 정보없음처리
  // 그 후에 그 예시 객체를 원본객체에 추가(unshift)한다
  // 예시 객체를 DOM으로 바꿔 주는 함수를 통해 새로운 객체 만든다
  // 마지막으로 디스커션 전체 목록(ul)에 예시객체를 선택한 요소에 자식중 첫번째로 넣는다(위로 쌓여야 하니깐)
  const objAdd = {
    id: "unique id",
    createdAt: `${dateString}T${timeString}Z`,
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value, 
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  //41개 배열에서 하나 추가되어 42개 배열이됨
  agoraStatesDiscussions.unshift(objAdd);

  // while(ul.firstChild){
  //   ul.removeChild(ul.firstChild);
  // }
  const newObj = convertToDiscussion(objAdd);
  ul.prepend(newObj);

  render(ul)
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