// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

///////////////// 후에 플래시카드 만들기 ////////////////
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");  // div요소 생성 avatarWrapper > img
  avatarWrapper.className = "discussion__avatar--wrapper"; 
  const discussionContent = document.createElement("div"); // discussionContent > info, title>href
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div"); // discussionAnswered > p태그
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 기본구조 ul>li>div*3
  // 불러올 것 이미지, 제목<h2 class="discussion__title">,
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl; // agoraStatesDiscussions[i].avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author; // x의 아바타
    avatarWrapper.append(avatarImg);

    // 제목+링크 불러오기
    // discussion__content > h2 class="discussion__title"
  const avatarTitle = document.createElement('h2'); // h2태그 생성
    avatarTitle.className = "discussion__title";  // 태그네임 설정
  const titleHref = document.createElement('a');  // a태그 생성(제목, 링크)
    titleHref.textContent = obj.title; // 더미title 컨텐츠 삽입
    titleHref.href = obj.url; // 더미링크 삽입
    avatarTitle.append(titleHref);  // h2태그에 <a href:agora[0].url> 어펜드
    discussionContent.append(avatarTitle); // div>h2>a href
    
    // 작성자 / 날짜 불러오기
  const info = document.createElement('div');
    info.className = "discussion__information";
    // obj.createdAt 날짜
    // obj.author 이름
    info.append(`${obj.author} / ${obj.createdAt}`);  // <div>kimploo / 2022-04-22T14:08:33Z</div>
    discussionContent.append(info);
  // const check = document.createElement('div'); div태그 중복
  const checkPtag = document.createElement('p');   // <div><p>☑</p></div>
    obj.answer === null ? checkPtag.append('☒') : checkPtag.append('☑︎');
    discussionAnswered.append(checkPtag);
  // if(obj.answer === null){
  //   // 값 널이면 엑스표 추가
  //   checkPtag.append('☒');
  //   discussionAnswered.append(checkPtag);
  // } else{
  //   // 값 있으면 체크추가
  //   checkPtag.append('☑');
  //   discussionAnswered.append(checkPtag);
  // }
  // 리턴변수는 각각 div 형성.(사진, 내용, 작성자&작성일)
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { // ul > 더미배열 [i]값 반환
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // console.log(JSON.stringify(agoraStatesDiscussions[i]));
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // 더미[i]를 인자로 사용
  }
  return;
  
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 서브밋 클릭시 데이터 들어가게하기.
// 이름 : ""; author: "dubipy",
// 제목 : ""; title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다",
// 질문 : ""; bodyHTML: '주저리주저리',
// 1. 선택 할 쿼리셀렉터(클랙스명 or 아이디) -> 서브밋 클릭시 추가시킬 함수.
const form = document.querySelector('form'); // 작성세션 전체
form.addEventListener('submit', (event) => {
  // const target = event.target;
  // const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  // const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  event.preventDefault(); // 기본동작 정지
  // 대상쿼리 잡기
  const formName = document.querySelector('.form__input--name #name') // .value;  .value까지 쓰면 초기화코드가 길어짐. 정적인 변수가 됨.
  const formTitle = document.querySelector('.form__input--title #title')  // .value;  매번 변수만들기 귀찮음
  const formBox = document.querySelector('.form__textbox #story') // .value;
  // console.log(formName);
  const obj = {
    id: "id 불명",
    createdAt: new Date(),
    title: formTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: formName.value,
    answer: null,
    bodyHTML: formBox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj)); // 렌더링 그대로 전달

  formTitle.value = ''; // 초기화
  formName.value = '';
  formBox.value = '';

});

// const liTag = document.querySelector('li.discussion__container'); // 게시물


// 로컬 스토리지 구축해보기
// localStorage.setItem(local['qwe'], 'qweqwe')
// localStorage.getItem(local['qwe'])
// 페이징처리.



// const obj = {}
//   localStorage.setItem(obj['id'], 'id 불명'),
//   localStorage.setItem(obj['createdAt'], new Date()),
//   localStorage.setItem(obj['title'], formTitle.value),
//   localStorage.setItem(obj['url'], "https://github.com/codestates-seb/agora-states-fe/discussions/44"),
//   localStorage.setItem(obj['author'], formName.value),
//   localStorage.setItem(obj['answer'], null),
//   localStorage.setItem(obj['bodyHTML'], formBox.value),
//   localStorage.setItem(obj['avatarUrl'], "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"),

//   localStorage.getItem(obj['id']),
//   localStorage.setItem(obj['createdAt']),
//   localStorage.setItem(obj['title']),
//   localStorage.setItem(obj['url']),
//   localStorage.setItem(obj['author']),
//   localStorage.setItem(obj['answer']),
//   localStorage.setItem(obj['bodyHTML']),
//   localStorage.setItem(obj['avatarUrl'])

  // localStorage에 저장할 객체
// const obj = {
//   name : 'anna',
//   age : 20
// }
 
// // localStorage에 저장할 배열
// const arr = [1, 2, 3];
 
// // 객체, 배열을 JSON 문자열로 변환
// const objString = JSON.stringify(obj);
// const arrObj = JSON.stringify(agoraStatesDiscussions[i]);
// console.log(objArr);
// 아고라스테이츠디스커션[i번]['키'] -> string변환
// 변환 한 string타입 변수에 잘 담아서 뿌려주기.
// 입력한 정보 로컬에 넣기.
// 문자열변환 -> 셋아이템 키:값 넣기 -> 겟아이템 키로 가져오기.
 
// // setItem
// window.localStorage.setItem('person', objString);
 
// // getItem
// const personString = window.localStorage.getItem('person');
// const numsString = window.localStorage.getItem('nums');
 
// // JSON 문자열을 객체, 배열로 변환
// const personObj = JSON.parse(personString);
// const numsArr = JSON.parse(numsString);
