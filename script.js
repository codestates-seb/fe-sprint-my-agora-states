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

  // avartarWrapper > img
  const img = document.createElement("img");
  avatarWrapper.append(img);
  img.className = "discussion__avatar--image";
  img.src = obj.avatarUrl;

  // discussionContent > title
  const title = document.createElement("h2");
  discussionContent.append(title);
  title.className = "discusstion__title";
  const titleContent = document.createElement("a");
  title.append(titleContent);
  titleContent.href = obj.url;
  titleContent.textContent = obj.title;


  // discussionContent > question
  const question = document.createElement("h3");
  discussionContent.append(question);
  question.className = "discusstion__question";
  question.textContent = obj.story;

  // discussionContent > author
  const information = document.createElement("div");
  discussionContent.append(information);
  information.className = "discusstion__information";
  information.textContent = `${obj.author}`;

  // time
  const time = document.createElement("div");
  information.append(time);
  time.className = "information__time";
  time.textContent = `${obj.createdAt}`;

  // discussionAnswered
  const answerCheck = document.createElement("p");
  discussionAnswered.append(answerCheck);
  const checkBox = document.createElement("i");
  answerCheck.append(checkBox);
  checkBox.className = "fa-solid fa-circle-check";
  // answer 하면 색깔 생기게하기
  if(obj.answer){
    checkBox.classList.add('green');
    checkBox.classList.remove('grey');
  }else{
    checkBox.classList.remove('green');
    checkBox.classList.add('grey');
  }

  // delete form
  const deleteForm = document.createElement("div");
  li.append(deleteForm);
  deleteForm.className = "deleteBtn";

  const deleteClick = document.createElement("button");
  deleteForm.append(deleteClick);
  const trashCan = document.createElement("i");
  deleteClick.append(trashCan);
  trashCan.className = "fa-solid fa-trash-can";


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

  // delete form 을 눌러서 현재 li를 삭제

// deleteBtn.addEventListener("click", function(){

// })



// const originalAgora = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.




// textBox to agora
// function submitClick() {

//   let storyName = document.getElementById('storyName').value;
//   let storyTitle = document.getElementById('storyTitle').value;
//   let story = document.getElementById('story').value;
//   let submitResult = {
//     createdAt: new Date(),
//     title: storyTitle
//   };

//   return element.append(convertToDiscussion(submitResult['0']));
// };
let formSubmit = document.querySelector('.form__submit');
let storyName = document.querySelector('#storyName');
let storyTitle = document.querySelector('#storyTitle');
let story = document.querySelector('#story');
// why getElementById('').value; 하면 안나옴.. 같다고 생각했는데

formSubmit.addEventListener("click", function(){
  let newObj = {
    createdAt: `${new Date().getHours()}시 ${new Date().getMinutes()}분 ${new Date().getSeconds()}초`,
    title: storyTitle.value,
    author: storyName.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/53474999?v=4",
    story: story.value,
  };


  const originalAgora = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
  let resultAgora = originalAgora.unshift(newObj);
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(originalAgora));
  //반복되게 할려면 agora에 수정된 값을 다시 넣어준다...
  //새로운 곳에 선언하면 기존 agora의 첫번째에 계속 값이 들어가게된다

});

newAgora = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));

const render = (element) => {
  //element 는 ul
    for (let i = 0; i < newAgora.length; i += 1) {
      element.append(convertToDiscussion(newAgora[i]));
    }
    return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); 

// if(){
// const deleteBtn = document.querySelector(".deleteBtn");
//   deleteBtn.addEventListener("click", function(){
//     console.log("되나");
//   })
// }