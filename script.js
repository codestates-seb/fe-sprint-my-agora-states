
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// obj가 원래 agoraStatesDiscussions[i]였고 for문을 한번더 사용했다.
const convertToDiscussion = (obj) => {

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // avatarWrapper에 이미지 넣기
  const avatarImg = document.createElement('img');
  // class를 안지정해줘서 이미지가 뒤죽박죽이였다.
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussionContent에 질문 제목 넣기
  const discussion__title__maker = document.createElement("h2");
  discussion__title__maker.className =  "discussion__title";
  const title_Url = document.createElement("a");
  title_Url.href = obj.url;
  title_Url.textContent = obj.title;
  discussion__title__maker.append(title_Url);
  discussionContent.append(discussion__title__maker);

  // discussionContent에 작성자와 날짜 넣기
  const discussion__information__maker = document.createElement("div");
  discussion__information__maker.className =  "discussion__information"
  discussion__information__maker.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(discussion__information__maker);

  // discussionAnswered에 체크박스 넣기 
  // answer=null이라면 네모칸만 
  const checkbox__maker = document.createElement("p");
  if(obj.answer === null){
    checkbox__maker.textContent = "☒";
  }
  else{
    checkbox__maker.textContent = "☑︎";
  }
  discussionAnswered.append(checkbox__maker)


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // return li를 안해서 여기서 자꾸 undefined가 떳다.
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
}
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// date.js양식처럼 값을가져와 convertToDiscussion로 돌린다.
// let으로 변경가능하게 바꾼다.
// unshift를 통해서 넣어준다. 
let submitForm = {
  name:"1",
  createdAt:"2",
  titie:"3",
  url:"4",
  author:"5",
  answer:"6",
  bodyHTML:"7",
  avatarUrl:"https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
}

