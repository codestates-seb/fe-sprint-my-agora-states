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
  //이미지 삽입의 경우
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //제목 삽입 및 링크 달기
  const discussionTitle = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);
  discussionContent.append(discussionTitle);

  //작성자 및 작성된 날짜의 경우
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  //new Date(obj.createdAt) -> 한국 표준시를 불러온다
  //여기에 toLocaleTimeString()을 이용해 해당 시간을 문자열로 변환해준다.
  let dateTime = new Date(obj.createdAt);
  discussionInformation.textContent = `${obj.author} / ${dateTime.toLocaleTimeString()}`; 
  discussionContent.append(discussionInformation);
  
  //체크박스
  const answered = document.createElement('p');
  answered.textContent = obj.answer;
  if (obj.answer === null) {
    answered.textContent = '☒'
  }
  else answered.textContent = '☑'
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
/*
async function getPromise() {
  await fetch(`http://localhost:3001/discussions`)
  .then(res => res.json())
  .then(data => (agoraStatesDiscussions = data));
}
*/
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  fetch("http://localhost:3001/discussions")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i += 1) {
        element.append(convertToDiscussion(data[i]));
      }
    });

  // for (let i = 0; i < agoraData.length; i += 1) {
  //   element.append(convertToDiscussion(agoraData[i]));
  // }
  // return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//새로운 데이터를 추가
const submit = document.querySelector(".form__submit");
submit.onclick = function (e) {
  e.preventDefault(); // 기본 이벤트 방지 
  const inputName = document.querySelector("#name");
  const inputTitle = document.querySelector("#title");
  //만약 이름과 제목, 내용을 작성하지 않으면 경고 메시지 출력
  if(inputName.value === '' || inputTitle.value === '') {
    return alert("이름과 제목, 내용을 모두 작성해주세요");
  }

  const newObj =
  {
    id: "",
    createdAt: Date(), //현재 작성 시간 표현을 표현
    // convertToDiscussion에서 시간 설정을 new Date().toLocaleTimeString()을 통해 해주었기 때문에
    //새로운 데이터 할당시에는 Date()를 통해 시간을 불러와 다시 실행해주어야한다 (???) -> Date(), new Date() 공부 필요
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: "",
    avatarUrl: "https://img.icons8.com/ios/500/css.png"
  }

  agoraStatesDiscussions.unshift(newObj);
  render(ul);
};