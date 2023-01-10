// * TODO 2 디스커션 추가 기능 :
/*
- section.form__container 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
- 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
- agoraStatesDiscussions 배열에 추가한 데이터가 실제 쌓여야 합니다.
const agoraStatesDiscussions = [
  {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: "2022-05-16T01:02:17Z",
    title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: "dubipy",
    bodyHTML:"",
    avatarUrl:
  "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  },
  ...
]*/

/*
2-1. submit 버튼 누르면 배열의 첫번째에 객체를 추가하는 함수를 트리거하기(이벤트 리스너?)
  {
    id: "랜덤?",
    createdAt: "현재 시간 넣기", // 
    title: "title",
    url: "/",
    author: "dubipy",
    answer: null,
    bodyHTML:"",
    avatarUrl:
  "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  },
2-2. name, title 받아와서 author, title 에 넣기
2-3. story (질문 내용)받아와서 bodyHTML 에 넣기
2-4. submit 클릭 시 이 내용으로 질문을 제출하시겠습니까? 확인창(confirm) 띄워주기

*/


// data 변경가능여부(배열에 추가 가능여부) 테스트 ==> 성공

// const newQuestion = {
//   id : "randomStr",
//   createdAt: "date.toLocaleString('ko-kr')",
//   title: "inputTitle",
//   url: "/",
//   author: "inputName",
//   answer: null,
//   bodyHTML:"inputStory",
//   avatarUrl:"http://source.unsplash.com/featured/?{animal}" // unsplash 랜덤 animal 이미지
// };
// agoraStatesDiscussions.unshift(newQuestion);
// console.log(agoraStatesDiscussions[0]);


const submittedQuestion = document.querySelector('.submitted--form');
submittedQuestion.addEventListener("submit", (event) => {
  event.preventDefault(); // -----> submit 시 새로고침 방지!!

  let randomId = Math.random().toString(36).substring(2, 12); // 랜덤넘버, 36진수 사용
  const date = new Date();// Date 함수 사용
  const inputName = document.querySelector('#name');
  const inputTitle = document.querySelector('#title');
  const inputStory = document.querySelector('#story');
  console.log(inputName);
  console.log(inputTitle);
  console.log(inputStory);

  const newQuestion = {
    id : randomId,
    createdAt: date.toLocaleString('ko-kr'),
    title: inputTitle,
    url: "/",
    author: inputName,
    answer: null,
    bodyHTML:inputStory,
    avatarUrl:"http://source.unsplash.com/featured/?{animal}" // unsplash 랜덤 animal 이미지
  };

  console.log(newQuestion);
  
  if(event.type === onsubmit){
    window.confirm("이 내용으로 질문을 제출하시겠습니까?"); // 2-4.
    console.log('질문 제출 완료');
    agoraStatesDiscussions.unshift(newQuestion); // 다른 파일에 이렇게 넣을 수 있나? export, import???
  }

 console.log(agoraStatesDiscussions[0]);
  return agoraStatesDiscussions;

});








/*
+. 삭제 버튼 추가

1) id 생성하기(Math.random 으로 리턴된 결과를 toString(36)으로 36진수로 변환 후 0.을 제거하고 뒤의 문자들을 랜덤 문자열로 사용하는 방법)
let randomStr = Math.random().toString(36).substring(2, 12);
2) submit 및 생성될 때 id 를 삭제버튼과 .discussion__container 에 연동하기
3) 삭제 버튼 클릭 시 해당 버튼 상위의 .discussion__container 삭제하기 element.remove()

*/


/* TODO 3 : 답변이 있는 경우, 답변도 화면에 렌더링하기
1. ::after 등에 hover 시 말풍선 띄우기(display:none; -> :after 로 넣고 위치 조정하기)
.discussion__title:hover + div.bodyHTML_box {
  display: block;
}
2. answer 가 없는 경우 : 해당 글의 타이틀, 내용 앞쪽 일부만 보이기(overflow: ellipsis;)
3. answer 가 있는 경우 : 2번 아랫부분에 id replied, 답변 내용 일부만 보이기
*/
