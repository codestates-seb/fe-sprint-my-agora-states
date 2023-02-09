// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
const ul = document.querySelector("ul.discussions__container");
///////////////// 후에 플래시카드 만들기 ////////////////

// 서브밋 클릭시 데이터 들어가게하기.
// 1. 선택 할 쿼리셀렉터(클랙스명 or 아이디) -> 서브밋 클릭시 추가시킬 함수
const form = document.querySelector('form.form'); // 작성세션 전체
let localData = JSON.parse(localStorage.getItem("myAgora")) || [];

console.log("로컬겟 : ", localData)
const addLocalStorage = (() => {
  if(!localStorage.myAgora) {
      localStorage.setItem('myAgora', JSON.stringify([]));
  }
})()

console.log("로컬데이타 ",localData)

const resetForm = () => {
  document.querySelector('.form__input--title #title').value = '';
  document.querySelector('.form__input--name #name').value = '';
  document.querySelector('.form__textbox #story').value = '';
}
const addLocal = () => {
  localData.push({
    id: "id 불명",
    createdAt: new Date(),
    title: document.querySelector('.form__input--title #title').value,
    url: "",
    author: document.querySelector('.form__input--name #name').value,
    answer: null,
    bodyHTML: document.querySelector('.form__textbox #story').value,
    avatarUrl: `https://avatars.githubusercontent.com/u/${parseInt(Math.random() * 100)}`,
  });
  localStorage.setItem("myAgora", JSON.stringify(localData));
  // agoraStatesDiscussions.unshift(obj); // 서브밋 -> 추가
  ul.prepend(convertToDiscussion(...localData)); // 추가 -> 렌더링 그대로 전달
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // 기본동작 정지
  addLocal();
  resetForm();
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
console.log("컨버트 로컬 : ", JSON.parse(localStorage.getItem("myAgora")));
const convertToDiscussion = (obj) => {
const li = document.createElement("li") // li 요소 생성
const avatarWrapper = document.createElement("div");  // div요소 생성 avatarWrapper > img
const discussionContent = document.createElement("div"); // discussionContent > info, title>href
const discussionAnswered = document.createElement("div"); // discussionAnswered > p태그
  li.classList = "discussion__container"; // 클래스 이름 지정
  avatarWrapper.classList = "discussion__avatar--wrapper"; 
  discussionContent.classList = "discussion__content";
  discussionAnswered.classList = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 기본구조 ul>li>div*3
  const avatarImg = document.createElement('img');
    avatarImg.classList = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl; // agoraStatesDiscussions[i].avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author; // x의 이름
    
    // 제목+링크 불러오기
  const avatarTitle = document.createElement('h2'); // h2태그 생성
    avatarTitle.classList = "discussion__title";  // 태그네임 설정
    
  const titleHref = document.createElement('a');  // a태그 생성(제목, 링크)
    titleHref.textContent = obj.title; // 더미title 컨텐츠 삽입
    titleHref.href = obj.url; // 더미링크 삽입
    
    // 작성자 / 날짜 불러오기
  const info = document.createElement('div');
    info.classList = "discussion__information";
    
  const checkPtag = document.createElement('p');
    obj.answer === null ? checkPtag.append('☒') : checkPtag.append('☑︎');
    
    avatarWrapper.append(avatarImg);
    avatarTitle.append(titleHref);  // h2태그에 <a href:agora[0].url> 어펜드
    discussionContent.append(avatarTitle); // div>h2>a href
    discussionContent.append(info);
    discussionAnswered.append(checkPtag);
    info.append(  // <div>kimploo / 2022-04-22T14:08:33Z</div>
      `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
      );
    
  // 리턴변수는 각각 div 형성.(사진, 내용, 작성자&작성일)
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { // ul > 더미배열 [i]값 반환
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // console.log(JSON.stringify(agoraStatesDiscussions[i]));
    element.append(convertToDiscussion(agoraStatesDiscussions[i], )); // 더미[i]를 인자로 사용
  }
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// render(ul);


/** 
 * 1. http://localhost:4000/discussions라는 URL로부터 
 * 데이터를 불러옴.
 * 
 * 2. fetch 함수를 사용하여 http://localhost:4000/discussions URL로부터 
 * 데이터를 요청 -> 완료되면 .then() 메소드를 사용하여 받아온 데이터를 처리.
 * 
 * 3. res.json() 메소드를 사용하여 응답 데이터의 형식을 JSON으로 변환.
 * JSON 데이터가 변환된 후, json 변수에 할당
 * 
 * 4. agoraStatesDiscussions 변수에 json 변수의 값을 할당하여, 
 * 불러온 데이터를 저장
 * 
 * 5. render 함수를 호출하여, 불러온 데이터를 화면에 표시
 * 
 * 만약 fetch API를 사용하여 데이터를 불러오는 동안 오류발생시
 * .catch() 메소드를 사용하여 오류를 처리하고, 
 * console.error 함수를 사용하여 오류 메시지를 출력.
*/
// fetch('http://localhost:4000/discussions')
//   .then(res => res.json())
//   .then(json => {
//     agoraStatesDiscussions = json;
//     render(ul);
//   })
//   .catch(err => console.error(err));

async function fetchData() {
  try {
    const response = await fetch('http://localhost:4000/discussions'); // fetch API를 호출 http://localhost:4000/discussions URL로부터 데이터를 가져온다.
    const json = await response.json(); // 가져온 데이터의 형식이 JSON이므로 json() 메소드를 호출하여 파싱한다.
    agoraStatesDiscussions = json; // 파싱한 JSON 데이터를 agoraStatesDiscussions에 저장한다.
    render(ul); // 렌더링을 호출한다.
  } catch (err) {
    console.error(err); // 오류가 발생할 경우 catch 블록에서 오류 메시지를 출력한다.
  }
}
fetchData();

