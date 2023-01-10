
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

  //현지시간으로 바꾸기
  let submitTime = obj.createdAt.slice(-9,-1);
  let submitTimes = submitTime.split(":");
  let hour = submitTimes[0]
  let min = submitTimes[1]
  let sec = submitTimes[2]

  if(hour >= 12){
    console.log(hour)
    hour = hour - 12;
    console.log(hour)
    submitTime = `오후 ${hour}:${min}:${sec}`;
  }else{
    submitTime 
    = `오전 ${hour}:${min}:${sec}`;
  }

  discussion__information__maker.textContent = obj.author + ' / ' + submitTime;
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
  for (let i = agoraStatesDiscussions.length-1; i >= 1; i--) {
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
// unshift로 넣어준다.
// const submitForm = {
//   id : "1",
//   createdAt :"2",
//   titie : 'story',
//   url :"",
//   author : 'aa',
//   answer : "",
//   bodyHTML: "",
//   avatarUrl : "https://avatars.githubusercontent.com/u/116322645?v=4",
// }

// 이게 맞나?
function InputInform(name, title, story){
this.id = name;
this.author = name;
this.createdAt = new Date().toLocaleDateString();
this.title = title;
this.story = story;
this.story = story;
this.avatarUrl = "https://avatars.githubusercontent.com/u/116322645?v=4";
}

// 날짜 양식 바꾸기
// let today = new Date();
// console.log(today)
// let dateFormat1 = today.getFullYear()+'-'+(today.getMonth()+1)+'T'+date.getHours();+':'+date.getMinutes();+':'+today.getSeconds()+'Z'

const submitBtn = document.querySelector('.form')

submitBtn.addEventListener('submit', (e) => {

e.preventDefault();
//submit 입력 값 뽑아내기 
nameText = document.querySelector('#name');
titleText = document.querySelector('#title');
storyText = document.querySelector('#story');

const newObj = new InputInform(nameText.value, titleText.value, storyText.value);
agoraStatesDiscussions.unshift(newObj);

const discussion = convertToDiscussion(agoraStatesDiscussions[0],0);
ul.prepend(discussion)

storyText.value = titleText.value = nameText.value = '';
});