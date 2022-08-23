// data.js을 열어서 더미 데이터 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// html 조작을 DOM으로 하기위해 HTML의 요소들을 DOM으로 넣어주는 작업
// li의 자식 요소들 TODO에 하위요소 만들고 마지막에 append 할대 씀
const convertToDiscussion = (obj) => {
  //obj는 각각의 객체들 
  // 이 함수의 목적은 => li 뭉치를 만들기 위해서
  // ul 아래에 있는 요소들을 다시 새로 생성해서 데이터들을 뿌려주는 역할
  const li = document.createElement("li"); // 1.li 요소 생성
  li.className = "discussion__container"; // 2.클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 1. li의 하위 요소들 찾아서 요소 생성해주고
  // 2. className 넣어주고   3. src나 alt 에 객체 obj 써서 data.js 끌어와서 
  // obj. 배열의 속성으로 연결해주기 ex) disImg.alt = obj.author
  // 4. 상위요소.append(disImg)
  const disImg = document.createElement("img");
  disImg.className = "discussion__avatar--image";
  disImg.src = obj.avatarUrl;  // 사진 url 과 src 연결 
  disImg.alt = "avatar of" + obj.author;   // 이름 왜 안나와..
  avatarWrapper.append(disImg); //부모요소에 자식요소 append

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  discussionTitle.className = "discussion__title";
  titleAnchor.href = obj.url // href 적용해서 클릭하면 anchor 기능하도록! 
  // title.textContent = obj.title;
  discussionContent.append(titleAnchor);   // a를 append 해주고
  titleAnchor.textContent = obj.title;
  discussionContent.append(discussionTitle)   // h2도 append 해주기

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent= `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  // 한국사람이 보기 좋은 시간은 toLocaleString  날짜 형식 , 잘 파악해두면 좋음
  discussionContent.append(discussionInfo);  // Info도 append 해주기

  const checkAnswer = document.createElement("p");
  const icon1 = document.createElement("i");
  const icon2 = document.createElement("i");
    if(obj.answer !== null) {
    icon1.innerHTML = '<i class="fa-regular fa-circle-check"></i>'
    } else {
     icon2.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'
    }
  discussionAnswered.append(checkAnswer);
  discussionAnswered.append(icon1);
  discussionAnswered.append(icon2);



  

  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
// 디스커션 추가 기능 (submit 누르면 디스커션이 추가되어야함! )
//form 요소에 form 클래스 form.form
const form = document.querySelector('form.form');
//div요소의 form__input--title클래스의 input 자식만
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea');

//form에 submit 이벤트 추가  (click 도 있음 )
form.addEventListener("submit", (event) => {
  // 질문 넣으면 다시 reset하는 과정도 해보기
  // 질문한걸 유지하려면 로컬스토리지 기능을 사용해야함
  
  //click - 새로고침 왜? - 선조님들의 사정이 있음
  // 브라우저 -> 구글, 애플, 엣지 
  event.preventDefault();  
  // submit이벤트 => 요청을 보내고 => 새로고침하기로 약속을 막는 것!
  
  //새로운 객체를 만들어야 한다.
  // Input에 입력된 값(value)를 넣은 새로운 객체.
  // 새로운 객체를 ul요소 아래로 넣어준다.
  // 더미 데이터(agoraStatesDiscussions)애도 추가해준다.
  const obj = {
    id: "unique id", // id는 1,2,씩 들어옴
    createdAt: new Date(),
    // 이벤트가 발생한 시간이 기록이 됨
    title: title.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
 
  }
  // 확인해보기 console.log(title.value, autohr.value, textbox.value);
  // 확인해보기! console.log(obj)
  agoraStatesDiscussions.unshift(obj) 
  //  추가 데이터 위부터 추가하려고 
  //DOM 으로 변경
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
  //while(ul.firstCHild) { 다시 다 없앤다음에 함수 불러오기
  //   ul.removeChild(ul.firstChild);
  // }
  // render(ul);
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// 41개의 내용을 넣어주기 위한 함수 (반복문)
const render = (element) => { 
  // element에는 ul 요소가 들어옴
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return ;
}
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 보여줍니다.

const ul = document.querySelector("ul.discussions__container");
render(ul);
// rendering 화면에 그리는 것 render 함수 호출하면서 위에 render가 실행됨


// 동아리 가입
 // 문서에다가 꼭 필요한 내용 적어야 합니다. => 유저 => 테스트
  //이름 : 김코딩 : 꼭 필요한 내용
  //학번 : 001001001
  // ....
  // 지원의사
  // 자기소개서 <- 필수가 아닐수 있다.

// 문서의 내용을 확인해야 합니다.


// 문서 => 동아리 선배님에게 문서를 제출