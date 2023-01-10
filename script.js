// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

///////////////// 후에 플래시카드 만들기 ////////////////
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // avatarWrapper > img
  const avatarWrapper = document.createElement("div");  // div요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper";  // div요소 클랙스명 지정
  // discussionContent > info, title>href
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // discussionAnswered > p태그
  const discussionAnswered = document.createElement("div");
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

// ul을 인자로 render실행 
// -> 해당ul에 더미배열 [i]값 반환 
// -> convertToDiscussion함수가 더미[i]를 인자로 사용
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

// 서브밋 클릭시 데이터 들어가게하기.
// 이름 : ""; author: "dubipy",
// 제목 : ""; title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다",
// 질문 : ""; bodyHTML: '주저리주저리',
// 1. 선택 할 쿼리셀렉터(클랙스명 or 아이디) -> 서브밋 클릭시 추가시킬 함수.
const form = document.querySelector('form'); // 작성세션 전체
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // 대상쿼리 잡기
  const formName = document.querySelector('.form__input--name #name').value;
  const formTitle = document.querySelector('.form__input--title #name').value;
  const formBox = document.querySelector('.form__textbox #story').value;
  // console.log(formName);
  const obj = {
    id: "id 불명",
    createdAt: new Date(),
    title: formTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: formName,
    answer: null,
    bodyHTML: formBox,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(obj);
  
  ul.prepend(convertToDiscussion(obj));

});

const liTag = document.querySelector('li.discussion__container'); // 게시물
{/* <li class="discussion__container">
<div class="discussion__avatar--wrapper"> <!-- -->
  <img class="discussion__avatar--image"
    src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
    alt="avatar of kimploo">
</div>
<div class="discussion__content"> <!-- -->
  <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
  <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
</div>
<div class="discussion__answered"><p>☑︎</p></div> <!-- -->
</li> */}

// 로컬 스토리지 구축해보기
// 페이징처리.
