// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  //함수의 목적이 값을 추출해 새로운 il 목록을 만드는 것이므로 createElement로 새로 만들어 준다.

  //왼쪽 박스
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; //아바타 사진이 들어갈 박스 div를 만들고 class 이름을 설정
      //왼쪽박스 내 아바타img
  const avatarImg = document.createElement("img");  //img를 생성
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;  //이미지가 뜨지 않을 때 누구의 아바타입니다 라고 읽어주도록
  avatarImg.className = "discussion__avatar--image"; // 클래스 이름을 지정
  avatarWrapper.append(avatarImg); // 아바타 이미지를 왼쪽 상자에 넣어준다. 

  //중간 박스
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";  //중간 박스 내용이 들어갈 div를 만들고 class 이름을 설정 
    //중간박스 내 제목
  const discussionTitle = document.createElement("h2"); //내용박스의 질문제목
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement("a"); // a링크
  discussionUrl.href = obj.url; // a링크로 이어지는 주소를 객체에서 넣어준다.
  discussionUrl.textContent = obj.title; //제목이 곧 a링크라서 제목text
  discussionTitle.append(discussionUrl); //
    //중간박스 내 작성자, 날짜
  const discussionInformation = document.createElement("div"); // 작성자와 날짜를 넣을 div 생성
  discussionInformation.className = "discussion__information"; // 클래스이름을 만들어 준다.

  const createdAtDate = new Date(obj.createdAt).toLocaleString();  //new Date에 객체내 작성날짜(createAt)요소를 넣어준다.
      //날짜 형식은 toLocaledateString()메서드를 사용해 yyyy.mm.dd. 으로 가져온다.
  discussionInformation.textContent = `${obj.author} / ${createdAtDate}`;
     //discussionInformation 의 텍스트의 형식을 정해줍니다. 이때 객체에서 작성자 이름의 키를 넣어준다.
  discussionContent.append(discussionTitle, discussionInformation); 
     //중간 박스 안에 타이틀과 인포메이션 요소를 넣어준다. 

  //오른쪽 박스
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; //오른쪽 div를 만들고 class 이름을 설정
      //오른쪽 박스의 p요소
  const discussionCheckbox = document.createElement("p"); //박스 안에 체크박스 p요소를 넣어준다.
      // 답변이 있을 때 체크, 없을 땐(null) 체크표시가 없도록 만든다.
  discussionCheckbox.textContent = obj.answer ? '❤' : '♡' ;
  discussionAnswered.append(discussionCheckbox); //오른쪽 박스에 체크박스p요소를 넣어준다.


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;  // obj -> li를 리턴하는 함수
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. 
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
//---여기까지 모두 선언

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);  // 함수를 실행

const form = document.querySelector("form.form");
//form에는 submit이라는 이벤트가 지정되어 있습니다.
form.addEventListener("submit", (event) => {
  
const author = form.querySelector('div.form__input--name > input');
const inputTitle = form.querySelector('div.form__input--title> input');
const textbox = form.querySelector('div.form__textbox > textarea');

// console.log(event);
// console.log(event.target);
// console.log(event.target.value);

  //제출을 누르면 새로고침 현상이 생긴다.(브라우저 기본동작) 
  event.preventDefault(); //브라우저 기본동작(새로고침)을 막는다.(submit사용시 꼭 함께 사용!)

  //   // 입력될 내용을 기분으로 data.js와 똑같은 형태의 데이터를 만듭니다.
  const newObj = {
    id : "new id",
    createdAt : new Date().toISOString(),
    title : inputTitle.value,
    author : author.value,
    bodyHTML : textbox.value,
    avatarUrl : "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
  }

  //로컬스토리지를 이용하면 디스커션을 유지할 수 있으나 사용법에 대한 공부가 더 필요하다
  //localStorage.setItem("키", 값)
  //로컬 스토리지를 이용할 땐 event.preventDefault를 해제해야 한다.

   //원래 있던 배열에 추가하여 위에 만든 함수에 새 객체를 넣어줍니다.
  //새로 쓴 글을 위로 오게 하려고 unshift 를 사용합니다.
  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);
  ul.prepend(discussion);

  const storage = login
 
  //ul 에 있는 걸 지운다.
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
//   // ul.innerHTML = '';

  render(ul); // 새 데이터를 추가해 새롭게 렌더

});
