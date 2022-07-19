// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions[1].author);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // <avatarWrapper> 부분
  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper";  // 클래스 이름 지정

  const avatarImg = document.createElement('img'); // img 요소 생성
  avatarImg.className = "discussion__avatar--image"; // img 요소의 클래스 이름 지정 (빼먹어서 문제 발생!)
  avatarImg.src = obj.avatarUrl; // img 요소의 속성 추가  ?? setAttribute 안쓰고?
  avatarImg.alt = 'avatar of' + obj.author;

  avatarWrapper.append(avatarImg);      // 한번에 여러개의 자식 요소를 추가할 때는 appendChild 대신 append

  // console.log(avatarWrapper); // 확인용 [문제해결] 위에서 클래스 이름 생성을 안해줘서 css 적용이 계속 안됐음 ㅠ

  // <discussionContent> 부분
  const discussionContent = document.createElement("div"); // div 요소 생성
    discussionContent.className = "discussion__content";  // 클래스 이름 지정

  const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
    discussionContentTitle.className = "discussion__title" // 클래스 이름 지정

  const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
    discussionContentTitleAnchor.href = obj.url; // a 요소 속성 href 추가
    discussionContentTitleAnchor.textContent = obj.title;  // a 요소 내용 추가

  discussionContentTitle.appendChild(discussionContentTitleAnchor); // h2 태그 안에 생성한 a 요소 넣기

  const dicussionContentInformation = document.createElement("div"); // div 요소 생성
    dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
    dicussionContentInformation.textContent = obj.author + " / " + new Date(obj.createdAt).toLocaleString(); // div 요소 내용 작성자, 작성시간 추가

  discussionContent.appendChild(discussionContentTitle, dicussionContentInformation);

  // console.log(discussionContent);  // 확인용

  // <discussionAnswered> 부분
  const discussionAnswered = document.createElement("div");  // div 요소 생성
  discussionAnswered.className = "discussion__answered" // 클래스 이름 지정

  const discussionAnsweredContent = document.createElement("p"); // p 요소 생성

    discussionAnswered.append(discussionAnsweredContent); // div 안에 생성한 p 요소 삽입

    const isAnswerNull = (answer) => answer === null ? "☒" : "☑"; // answer 가 null인 경우와 아닌 경우 판별 함수
    discussionAnsweredContent.textContent = isAnswerNull(obj.answer); // answer 데이터 판별 결과를 내용에 넣기

    // console.log(discussionAnswered); // 확인용

  // 작성한 div 요소 3부분 append
    discussionContent.append(discussionContentTitle, dicussionContentInformation, discussionAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;

};

// ===== 폼 작성하면 추가되는 부분 ======
// < 핵심로직 >
// 새로운 객체를 하나 만들고
// submit 버튼을 누르면
// 새로운 객체에 내용을 추가해서 하나 만들고
// 그 새로운 객체를 기존 더미데이터 앞에 가져다 붙인다

const AskForm = document.querySelector("form.form");   // 작성폼 전체
const nameInput = document.querySelector(".form__input--name > input");   // 이름 작성 입력부분
const titleInput = document.querySelector(".form__input--title > input");   // 이름 작성 입력부분
const textBox = document.querySelector(".form__textbox > textarea");   // 이름 작성 입력부분


AskForm.addEventListener("submit", (e) => {   // // 작성폼 제출시 함수 작동하는 이벤트 리스너 생성 및 함수 실행 []
  e.preventDefault();         // submit 시 디폴트로 발생하는 내장 기능이 멈춰지도록 실행하는 메서드 
  
  const newObj = {  // 새로운 객체 하나 만들기 (기존 더미데이터 폼과 일치해야 하므로 하나를 따온다) => 입력폼과 매칭되는 것만 작성!(의심했던 부분!)
    id: "unique id",
    createdAt: new Date(),  // convertToDiscussion 를 거치면서 toLocaleString 메서드라 적용될 것이므로 미리 해줄 필요 없음
    title: titleInput.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,  // 일단 추가될 객체의 답변 상태 여부는 없는 상태로 처리
    // answer: {
    //   id: "DC_kwDOHOApLM4AKg6M",
    //   createdAt: "2022-05-16T02:09:52Z",
    //   url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
    //   author: "Kingsenal",
    //   bodyHTML:
    //     '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
    //   avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    //   },
    bodyHTML: textBox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  nameInput.value = "";  // 입력한 후 창이 빈상태로 만들기
  titleInput.value = "";  // 입력한 후 창이 빈상태로 만들기
  textBox.value = "";  // 입력한 후 창이 빈상태로 만들기

  let arrInputObj = []; // 로컬 스토리지 작업을 위한 기본 배열 초기 세팅 (데이터들이 계속 변동이 되니까 디폴트 박스를 하나 만들어준다고 생각)

  // console.log(arrInputObj)

  agoraStatesDiscussions.unshift(newObj); // 기존 객체의 앞부분에 새로운 객체 삽입, mutable 메서드 이므로 원본인 agoraStatesDiscussions도 변경됨
  arrInputObj.unshift(newObj);
  // console.log(agoraStatesDiscussions) // 배열 형태로 나오는거 확인!
  // console.log(arrInputObj) // 배열 형태로 나오는거, 자료 담긴거 확인!

  function saveInputObj(arr) {
    localStorage.setItem("arrInputObj", JSON.stringify(arr)); //  JSON.stringify로 배열을 stirng으로 변환(로컬 스토리지는 string 형태로만 저장 가능)
  }

  // console.log(newObj)
  // console.log(arrInputObj);
  saveInputObj(arrInputObj); // 새로 추가되서 업데이트 된 를 string으로 변환해서 로컬 스토리지에 저장


  const newdiscussion = convertToDiscussion(newObj); // 새로운 객체가 삽입된 상태의 더미데이터를 변수에 저장

  ul.prepend(newdiscussion);  // [질문] 음.. 어차피 unshift로 넣어서 새롭게 생성된 객체인데 prepend로 넣는 이유가 뭘까?

});


// let arrInputObj = []; // 로컬 스토리지 작업을 위한 기본 배열 초기 세팅 (데이터들이 계속 변동이 되니까 디폴트 박스를 하나 만들어준다고 생각)

// function saveInputObj(arr) {
//   arrInputObj.push(arr);
//   localStorage.setItem("arrInputObj", JSON.stringify(arr)); //  JSON.stringify로 stirng으로 변환(로컬 스토리지는 string 형태로만 저장 가능)

// }




// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// for of 를 이용한 방식 적용 해보기
// 배열 요소의 각각인 el 에 convertToDiscussion 함수를 적용해서 append 해줘

const render = (element) => {
  for (let el of agoraStatesDiscussions) {
    element.append(convertToDiscussion(el));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


const savedInputObj = localStorage.getItem("arrInputObj");  // 로컬 스토리지에 저장된 데이터를 조회(접근)해서 변수에 담기 (string 상태)
// console.log(savedInputObj);

if (savedInputObj) {       // 로컬 스토리지에 데이터가 있다면 (비어있지 않으면)
  const parsedInputObj = JSON.parse(savedInputObj);   // JSON.parse로 데이터들을 array 로 변환
  console.log(parsedInputObj);
  arrInputObj = parsedInputObj;   // 파싱된 데이터를 기존 초기 세팅 배열에 다시 담아주고

  console.log(arrInputObj);

  arrInputObj.forEach(render);

}


// ======== 디스커션 추가후 상태 유지 (로컬 스토리지 활용) =========

// 추가 작성된 정보를 변수에 담아 로컬 스토리지에 넣기, 넣을때 string으로 변환해서 넣어야 함
// 로컬 스토리지에 저장된 정보에 접근해서 변수에 담아놓기
// string 인 상태를 다시 parse 해서 배열로 불러오기
// 불러온 배열 요소 하나하나를 다시 화면에 보여주기



// ========== 잘못된 접근 방법으로 삽질했던 부분 ==========

// const toAskForm = document.querySelector(".form");   // 작성폼
// // console.log(toAskForm);
// const toAskInputName = toAskForm.querySelector("#name");  //
// const toAskInputTitle = toAskForm.querySelector("#title");  //
// const toAskInputQuestion = toAskForm.querySelector("#story") //

// let arrAskInputName = [];
// let arrAskInputTitle = [];

// // 로컬 스토리지에 array 형태로 저장할 수 없음. string 형태로만 저장 가능
// function saveToAskName(arrAskInputName) {
//   localStorage.setItem("toAskInputName", JSON.stringify(arrAskInputName)); //  JSON.stringify로 stirng으로 변환
// }

// function saveToAskTitle(arrAskInputTitle) {
//   localStorage.setItem("toAskInputTitle", JSON.stringify(arrAskInputTitle)); //  JSON.stringify로 stirng으로 변환
// }

// function paintToAsk(newInputName, newInputTitle) {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   // <discussionContent> 부분
//   const discussionContent = document.createElement("div"); // div 요소 생성
//     discussionContent.className = "discussion__content";  // 클래스 이름 지정

//   const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
//     discussionContentTitle.className = "discussion__title" // 클래스 이름 지정

//   const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
//     // discussionContentTitleAnchor.href = obj.url; // a 요소 속성 href 추가
//     discussionContentTitleAnchor.textContent = newInputTitle;  // a 요소 내용 추가

//   discussionContentTitle.appendChild(discussionContentTitleAnchor); // h2 태그 안에 생성한 a 요소 넣기

//   const dicussionContentInformation = document.createElement("div"); // div 요소 생성
//     dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
//     dicussionContentInformation.textContent = newInputName + " / " + new Date().toLocaleString(); // div 요소 내용 작성자, 작성시간 추가

//   discussionContent.append(discussionContentTitle, dicussionContentInformation);

//   // <discussionAnswered> 부분
//   const discussionAnswered = document.createElement("div");  // div 요소 생성
//   discussionAnswered.className = "discussion__answered" // 클래스 이름 지정

//   const discussionAnsweredContent = document.createElement("p"); // p 요소 생성

//     discussionAnswered.append(discussionAnsweredContent); // div 안에 생성한 p 요소 삽입

//     discussionAnsweredContent.textContent = "☒"; // 일단 초기에 만들어지는 질문이므로 그냥 답변 안되있는 표시로 내용 작성

//   li.append(discussionContent, discussionAnswered);
  
//   // console.log(li);

//   ul.append(li);
//   return ul;

// }

// function handleToDoSubmit(e) {  // 이벤트 발생시 작동할 리스너의 함수 [텍스트 입력 내용을 변수에 저장하고, 초기화함 + 화면에 보여주는기능(함수로)]
//   e.preventDefault();           // submit 시 디폴트로 발생하는 내장 기능이 멈춰지도록 실행하는 메서드 
//   // console.log(toAskInputName.value);
//   // console.log(toAskInputTitle.value);

//   const newInputName = toAskInputName.value;  // 압력한 이름을 저장
//   const newInputTitle = toAskInputTitle.value;  // 입력한 제목을 저장

//   toAskInputName.value = "";  // 입력한 후 창이 빈상태로 만들기
//   toAskInputTitle.value = "";  // 입력한 후 창이 빈상태로 만들기
//   toAskInputQuestion.value = "";  // 입력한 후 창이 빈상태로 만들기

//   arrAskInputName.unshift(newInputName); //
//   arrAskInputTitle.unshift(newInputTitle); //
//   paintToAsk(newInputName, newInputTitle);
//   saveToAskName(arrAskInputName);
//   saveToAskTitle(arrAskInputTitle);
  
// }

// // console.log(arrAskInputName);

// toAskForm.addEventListener("submit", handleToDoSubmit);  // submit 이벤트시 handleToDoSubmit 함수가 작동하는 이벤트리스너

// const savedNameToAsks = localStorage.getItem("toAskInputName");
// const savedTitleToAsks = localStorage.getItem("toAskInputTitle");

// console.log(savedNameToAsks);
// console.log(savedTitleToAsks);


// if (savedNameToAsks !== null && savedTitleToAsks !== null) {
//   const parsedNameToAsks = JSON.parse(savedNameToAsks);
//   const parsedTitleToAsks = JSON.parse(savedTitleToAsks);


//   arrAskInputName = parsedNameToAsks;
//   arrAskInputTitle = parsedTitleToAsks;

//   console.log(parsedNameToAsks);
//   console.log(parsedTitleToAsks);

//   // 2배열을 합쳐야 하나? 인덱스별 짝지어서 새로운 배열을 ??? 

//   parsedNameToAsks.forEach(paintToAsk);
//   parsedTitleToAsks.forEach(paintToAsk);
//   // console.log(parsedTitleToAsks);
// }