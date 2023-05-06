// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

let agoraStatesDiscussions = []
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

  //이미지 가져오기
  const avatarImg = document.createElement("img")
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = "avatar of" + obj.author
 
  avatarWrapper.append(avatarImg)

  //디스커션 가져오기
  const discussionTitle = document.createElement("h2")
  discussionTitle.className = "discussion__title"
  const discussionTitleA = document.createElement("a")
  discussionTitleA.href = obj.url
  discussionTitleA.textContent = obj.title

  discussionTitle.append(discussionTitleA)
  discussionContent.append(discussionTitle)

  //작성자 정보 가져오기
  const discussionInfo = document.createElement("div")
  discussionInfo.className = "discussion__information"
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionInfo)

  //답변여부 가져오기
  const discussionAnswer = document.createElement("div")
  discussionAnswer.className = "discussion__answered"
  const checkbox = document.createElement("p")
  if (obj.answer !== null){
    checkbox.textContent = '😆'
  } else {checkbox.textContent = '😭'}
  discussionAnswer.append(checkbox)
  discussionAnswered.append(discussionAnswer)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i ++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// fetch에 첫번째 인자로 리소스(url)을 준다 => 리턴 값이 뭐냐? Promise데이터 타입 => 이 Promise데이터 타입은 Response object를 돌려줌
// 어떤 함수를 사용하는데 그 함수의 리턴 값이 프로미스다? => 그 함수는 비동기적으로 동작하는 함수일 가능성이 높음
// 그 함수가 리턴한 값은 2개의 메소드를 사용할 수 있다. 1. then 2. catch
// 둘 다 콜백함수를 받으며 둘 다 파라미터를 하나씩 갖고 있음. 이름은 아무렇게나 해도 되지만
// then 패치의 결과 성공했을 때 then으로 전달된 콜백함수가 호출되도록 약속 => 그 콜백함수가 호출되면서 그 결과값이 있다면 첫번째 파라미터로 받을 수 있음
  // reponse 객체가 들어옴
// catch 실패다? catch 안으로 전달된 콜백함수 호출 => 파라미터로는 그 이유를 알려줌

// promise 사용하는 이유
  // 비동기적인 작업을 처리할 때 그 작업이 성공했는지 실패했는지를 표준화 된 방식(성공했을때 then, 실패 catch)을 이용해서 처리할 수 있도록 해준다

fetch('http://localhost:4000/discussions')//JSON 데이터 타입으로 데이터를 가져옴
//then : 응답이 끝나면 콜백함수로 전달된 함수를 실행시켜줘
//then에 콜백함수를 주면 fetch API가 실행시킬 때 함수의 첫번째 인자의 값으로 responese객체를 주겠습니다.(이름은 아무렇게나)
//이 response객체의 여러 속성 값들이 있음(status 등)

//리턴값이 프로미스 객체니까 .then // 애도 실행시키면 프로미스 뱉어내니까(res.json())(체이닝) 다시 .then 이나 .catch
.then(res => res.json())//자바스크립트의 데이터 타입으로 바꾼 것 // 가져온 데이터가 json타입이라는걸 자바스크립트에게 알려줌 "야 이거 json이야"
// 그럼 자바스크립트는 json 타입에 맞게 해석해서 자바스크립트 데이터 타입으로 돌려줌
// 여기서 response에 json 메서드 입혔는데 왜 promise가 나오냐?
  // 아직 데이터를 다 받지 않은 상태여서. (header만 도착하고 body가 오지 않음)
  //그래서 다시 체이닝을 통해 작업하는 것(데이터가 다 도착한 이후에). 이게 싫으면 전체에 await걸어서 기다린 이후에 json()
.then(json => { // 여기 json이라는 이름으로 전달된 데이터에 우리가 궁극적으로 필요한 데이터가 담겨있음
  console.log(json)
  agoraStatesDiscussions = json // 빈 배열에 필요한 데이터 담아주고 
  const ul = document.querySelector("ul.discussions__container") // 새로운 변수 선언하고 클래스 이름이 ~~ 인 ul을 지정해서 변수에 할당
  render(ul) // 위에서 정의한 데이터 뿌려주는 함수에다가 전달
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// 겹친다고 날려버리면 추가 기능이 죽어버림(스코프)
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 새로 작성하면 추가
const form = document.querySelector("form.form")
const author = document.querySelector("div.form__input--name > input")
const title = document.querySelector("div.form__input--title > input")
const textbox = document.querySelector("div.form__textbox > textarea")

//submit이라는 이벤트 
form.addEventListener("submit", (event)=> {
  event.preventDefault() // 새로고침 방지 옛날에나 새로고침

  //새로운 배열 만들고
  const addObj = {
    id: "unknownUser",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://codestates.com/",
    author: author.value,
    bodyHTML:
      textbox.value,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/119163273?v=4",
  }
  //data.js에 집어넣고
  agoraStatesDiscussions.unshift(addObj)
  //ul 싹 지우고 다시 렌더 하거나 (?)

  //li로 바꾸고 ul에 넣기
  const discussion = convertToDiscussion(addObj)
  ul.prepend(discussion)

  //입력값 초기화
  author.value = ''
  title.value = ''
  textbox.value = ''
})

  // //페이지네이션
  // const pageGroup = 