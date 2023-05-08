// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다. DOM생성!
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container"; 

// 이미지 추가
  const avatarWrapper = document.createElement("div"); // 사용자 프로필 이미지를 감싸는 div 요소를 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 생성된 div 요소에 클래스 이름을 추가
    const avatarEl = document.createElement("img"); // 사용자 프로필 이미지를 위한 img 요소를 생성
    avatarEl.src =  obj.avatarUrl; // img 요소의 src 속성에 사용자 프로필 이미지 URL을 할당
    avatarEl.className = "discussion__avatar--image"; // img 요소에 클래스 이름을 추가
    avatarWrapper.appendChild(avatarEl); // div 요소에 img 요소를 자식 요소로 추가

// title, information 포함한 박스 
// discussionContent 요소에 titleEl 요소와 informationEl 요소를 자식 요소로 추가하여, 해당 토론 객체의 제목과 작성자, 작성일 정보를 함께 보여줌
  const discussionContent = document.createElement("div"); 
  discussionContent.className = "discussion__content";
    // 타이틀 질문 추가
    const titleEl = document.createElement('div'); 
    titleEl.innerHTML = obj.title; // titleEl 요소의 innerHTML 속성에 obj의 title 속성 값을 할당
    discussionContent.appendChild(titleEl); // discussionContent 요소의 자식 요소로 titleEl 요소를 추가
    titleEl.className = "discussion__title";
    // 작성일자,작성자 추가
    const informationEl = document.createElement('div') ;
    informationEl.className = 'discussion__information' ;
    informationEl.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; // obj 객체에서 가져온 createdAt 값을 Date 객체로 변환한 후, 현재 로케일에 맞게 문자열로 표시
    discussionContent.appendChild(informationEl) ;

// 답변 박스
  const discussionAnswered = document.createElement("div"); 
  discussionAnswered.className = "discussion__answered"; 
    // 답변 여부 표시 추가
    const answeredEl = document.createElement('input');
    answeredEl.type = 'checkbox';
    answeredEl.checked = obj.answer; //obj.answer가 true인 경우 checked 값은 true로 설정됨, 그렇지 않은 경우 false로 설정, checked는 체크박스가 선택되었는지 여부를 나타냄 (obj.answer의 값을 체크박스의 checked 속성에 할당)
    discussionAnswered.appendChild(answeredEl);


// li 요소에 생성한 자식 요소(avatarWrapper, discussionContent, discussionAnswered)들을 추가
  li.append(avatarWrapper, discussionContent, discussionAnswered); 
  return li; // 생성한 li 요소를 반환
};

//~~~~~~렌더링~~~~~~//
// convertToDiscussion 함수를 호출하여 agoraStatesDiscussions 배열에 저장된 모든 요소를 HTML 요소로 변환
// 이를 ul.discussions__container 요소에 추가 이를통해 해당 DOM 요소를 화면에 표시할 수 있게 됨
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) { // 아고라 스테이츠 데이터 배열의 모든 요소를 순환 후
  element.append(convertToDiscussion(agoraStatesDiscussions[i])); // ul의 자식 요소로 추가한다. (element는 ul 요소를 참조)
  }
  return;
  };
const ul = document.querySelector("ul.discussions__container"); 
render(ul); // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면 렌더링

//~~~~~~form~~~~~~//

const form = document.querySelector('.form__container');

// input 정보를 가져와 새로운 토론 객체를 생성하는 함수
  function onSubmit(event) {
    event.preventDefault();

// 토론 객체 생성을 위한 데이터 수집

  const avatarUrl = 'https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4';
  const title = form.querySelector('#title').value;
  const author = form.querySelector('#name').value;
  const createdAt = (new Date()).toISOString(); // 현재 시간 정보 추가 
  const answer = false;

// 새로운 토론 객체를 agoraStatesDiscussions 배열에 추가
  const newDiscussion = { avatarUrl, title, author, createdAt, answer };
  agoraStatesDiscussions.push(newDiscussion);
  agoraStatesDiscussions.unshift(newDiscussion); // 상단에 노출

// 토론 목록을 갱신하기 위해 HTML을 새로 렌더링
  const ul = document.querySelector("ul.discussions__container");
  ul.innerHTML = '';
  render(ul);

// 입력된 내용 초기화
  form.querySelector('#name').value = '';
  form.querySelector('#title').value = '';
  form.querySelector('#story').value = '';}

// submit 이벤트 발생 시 onSubmit 함수 실행
form.addEventListener('submit', onSubmit);
