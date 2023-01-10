
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const elform = document.querySelector('.form');



 



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
  const avatarImg = document.createElement('img'); // 이미지 생성후 정보 저장
  avatarImg.src = obj.avatarUrl; // 이미지 태그에 더미 데이터 src 속성 부여
  avatarImg.alt = 'avatar of ' + obj.author; // avatar of 더미 데이터 alt 속성 부여
  avatarWrapper.append(avatarImg); // wrapper 부모에 이미지 태그 추가


  const title = document.createElement('h2'); // 질문 제목 테그 h2로 생성
  const a = document.createElement('a'); // 질문 내용을 담을 a 태그 생성

  a.textContent = obj.title; // a 태그에 더미 데이터 문자열 정보 담기
  a.href = obj.url; //a 태그에 href 정보 담기

  title.append(a); // 제목 박스에 내용 담기
  //discussionContent.append(title);

  

  const information = document.createElement('div'); //위의 과정과 비슷한 과정 한번씩 생각해 보기 (생성 -> 속성 추가 -> append)
  information.className = 'discussion__information';

  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(title,information);


  const check = document.createElement('div');
  check.classList.add('discussion__answered')

  check.textContent = obj.answer !== null ? '해결' : ''; // 백준 질문게시판 참고
  
 



  li.append(avatarWrapper, discussionContent, discussionAnswered,check); // 생성한 내용 li에 담기
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

elform.addEventListener('submit',(event) => {
  event.preventDefault();
  let elname = document.querySelector('#name').value; // 눌렀을때 당시의 값을 가져온다
  let eltitle = document.querySelector('#title').value;
  let elquestion = document.querySelector('#story').value;
  console.log(elquestion);// 잘 나오는데 왜 안될까 ? ===> 안에 담긴 거구나...
  
  const data = {
    id: 'JHJ', // 중복 x 정보
    createdAt: new Date(),
    title: eltitle,
    url:'https://github.com/codestates-seb/agora-states-fe/discussions/categories/javascript-node-js',
    author: elname,
    bodyHTML: elquestion,
    answer:{check:1},
    avatarUrl: "https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4"
  }

  //agoraStatesDiscussions.unshift(data); // 더미 데이터 최상단 추가
  const newli = convertToDiscussion(data); // 추가 된 더미 데이터로 전체 li 재생성
  ul.prepend(newli); // ul 최상단에 추가
}) // 사실 아직도 정확하게 했는지 의문 많음

  

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

render(ul);
