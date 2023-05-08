// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // div태그생성 => 클래스명 discussion__avatar--wrapper 설정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

   // div태그생성 => 클래스명 discussion__content 설정
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.3

  // 아바타 이미지 img태그 생성
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion__content 자식요소인 discussion__title h2태그 생성, h2태그 자식 요소인 a 태그 생성 => 질문제목/링크 넣기
  const content__title = document.createElement('h2');
  content__title.className = "discussion__title";
  const content__titleUrl = document.createElement('a');
  
  content__titleUrl.href = obj.url;
  content__titleUrl.textContent = obj.title;
    
  content__title.append(content__titleUrl);
  discussionContent.append(content__title);

  //discussion__content 자식요소인 discussion__information div태그 생성 => author, 날자 등 작성 정보 넣기
  const content__information = document.createElement('div');
  content__information.className = "discussion__information";

  // 백틱내에 줄바꿈이 안되서 innerHTML로 바꿔봄
  content__information.innerHTML = `닉네임: ${obj.author} <br>작성일: ${new Date(obj.createdAt).toLocaleString("ko-KR")} `;
  discussionContent.append(content__information);


  //discussion__container li 자식요소인 discussion__answered div 태그 생성 => p태그 넣기 (답변여부 확인)
  // div태그생성 => 클래스명 discussion__answered 설정
  // 답변 여부 및 답변창뜨는 모달 구현 부분

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerCheck = document.createElement('p');
  answerCheck.className="popupBtn";

  const answerContainer = document.createElement('div');
  answerContainer.className ="answer__container";

  
  const answerContent = document.createElement('div');
  answerContent.className = "answer__content";

  if(obj.answer === null){
    answerCheck.textContent = '☒';
  } else{
    answerCheck.textContent = '☑';
    answerContent.innerHTML = `<span id="closeBtn">&times;</span>` + obj.answer.bodyHTML;
    console.log(answerContent);
    
  }
  discussionAnswered.append(answerCheck);
  discussionAnswered.append(answerContainer);
  answerContainer.append(answerContent);

  
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;


};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// convertToDiscussion 함수 완성시켜야함
const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));

  }
  return ;
};


const form = document.querySelector(".form");
//console.log(form);
const author = form.querySelector("#name");
const title = form.querySelector("#title");
const textbox = form.querySelector("#story");



form.addEventListener("submit", (event) => {
  event.preventDefault(); // submit 기본값인 새로고침 방지

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value,
    answer: null,
    url: "",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: "/imgs/head_image.png"
  }

  agoraStatesDiscussions.unshift(newObj);
  const NewDiscussion = convertToDiscussion(newObj);
  
  // agoraStatesDiscussions에 새로만들 배열 맨앞에 삽입
  ul.prepend(NewDiscussion);

  // submit 후 입력란 빈칸 리셋
  author.value = "";
  title.value = "";
  textbox.value = "";
})



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);



// 답변클릭시 모달 구현 -실패

const btn = document.querySelector('.popupBtn');
const modal = document.querySelector('.answer__container');
const closeBtn = document.querySelector('.closeBtn');

btn.onclick = function() {
  modal.style.display = 'block';
}
// closeBtn.onclick = function() {
//   modal.style.display = 'none';
// }

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}