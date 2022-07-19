// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //div태그 생성 변수 // avatarUrl
  avatarWrapper.className = "discussion__avatar--wrapper"; // div태그 클래스네임 
  const imgTag = document.createElement('img');
  imgTag.src = obj.avatarUrl;
  imgTag.alt = 'avatar of' + ' ' + obj.author;
  avatarWrapper.append(imgTag);
  
  const discussionContent = document.createElement("div"); // div태그 생성 변수 // 
  discussionContent.className = "discussion__content"; // div태그 클래스 네임
  const h2Tag = document.createElement('h2');
  h2Tag.className = 'discussion__title';
  const aTag = document.createElement('a');
  aTag.className = 'discussion__content';
  aTag.href = obj.url;
  aTag.textContent = obj.title;
  discussionContent.append(aTag);

  const discussionInformation = document.createElement('div');
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  
  const discussionAnswered = document.createElement("div"); // div태그 생성 변수
  discussionAnswered.className = "discussion__answered"; // div태그 클래스 네임
  const pTag = document.createElement('p');
  pTag.textContent = obj.answer ? '✅ 답변 완료' : '❎ 답변 없음'
  discussionAnswered.append(pTag);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



  li.append(avatarWrapper, discussionContent, discussionInformation, discussionAnswered);
  return li;
};

// 입력창에 적는거 li에 그대로 담겨 나오게하기
// 이름 , 제목, 질문내용, 날짜 나오게하기
// submit버튼 누르면 추가 되게끔 하기
// 더미데이터 요소 젤 앞에 추가하기
// new Date().toLocaleString() 으로 현재시간날짜 보기좋게 표현하기

const inputName = document.querySelector('div.form__input--name > input'); //input 태그 불러오기
const inputTitle = document.querySelector('div.form__input--title > input'); // input 태그 불러오기
const inputTextBox = document.querySelector('div.form__textbox > textarea'); //input 태그 불러오기
// const button = document.querySelector('.submitBtn'); //버튼 태그 불러오기
const form = document.querySelector('form.form');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const newObj = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date().toLocaleString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML:
      inputTextBox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(newObj);
  const newDis = convertToDiscussion(newObj);
  ul.prepend(newDis);
  // convertToDiscussion(newObj);
})



// for(let i = 0; i < agoraStatesDiscussions.length; i++){
//   console.log(agoraStatesDiscussions[i].createdAt)
// }

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // render() 함수의 인자로 ul을 넣어준후 실행되고 끝
