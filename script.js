// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container"; 
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // 썸네일 이미지
  const avatarWrapperImg = document.createElement("img");
  avatarWrapperImg.className = "discussion__avatar--image";
  avatarWrapperImg.src = obj.avatarUrl;
  avatarWrapperImg.alt = "avatar of " + agoraStatesDiscussions[0].author;
  // 작성자/날짜
  const information = document.createElement('div')
  information.className = "discussion__information"
  information.textContent = obj.author + ' / ' + obj.createdAt;
  // 제목
  const discussionTitle = document.createElement('h2')
  discussionTitle.className = "discussion__title"
  // 체크박스
  const answeredCheckbox = document.createElement('input')
  answeredCheckbox.type = 'checkbox';
  answeredCheckbox.className = 'discussion_answered';
  // title
  const titleUrl = document.createElement('a')
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  // append
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarWrapperImg)
  discussionContent.append(discussionTitle,information)
  discussionTitle.append(titleUrl)
  discussionAnswered.append(answeredCheckbox)
  return li;
};
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element.innerHTML = "";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// ul.push()
render(ul);
// const checkbox = document.querySelector('p')
// checkbox.textContent = '◻︎'
// checkbox.addEventListener('click', () => {
//   if (checkbox.textContent === '◻︎') {
//     return checkbox.textContent = '☑'
//   } else {
//     return checkbox.textContent = '◻︎'
//   }
// })

const submitButton = document.querySelector('#submit')
const submitName = document.querySelector('#name')
const submitTitle = document.querySelector('#title')
const submitStory = document.querySelector('#story')
const submitavatarUrl = "https://avatars.githubusercontent.com/u/82711000?v=4"

const inputObj = {
  id: "",
  createdAt: "2022-05-16T01:02:17Z",
  title: "",
  url: "",
  author: "",
  answer: {
    id: "",
    createdAt: "2022-05-16T02:09:52Z",
    url: "",
    author: "",
    bodyHTML:
      '',
      avatarUrl: "",
    }
  }
  // discussion에 현재 날짜,시간 남기는 함수
const submitDate = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let hour = currentDate.getHours()
  let miniute = currentDate.getMinutes()
  let seconds = currentDate.getSeconds()
  let recordDate = year + '-' + month + '-' + day + '-' + hour + ':' + miniute + ':' + seconds;
  return recordDate
}

// submit시 이름,제목,내용,시간 화면에 출력
const inputSumbit = function (e) {
  e.preventDefault(); // 버튼 클릭 시 새로고침하여 데이터 reset을 막음.
  inputObj.author = submitName.value;
  inputObj.title = submitTitle.value;
  inputObj.answer.bodyHTML = submitStory.value;
  inputObj.avatarUrl = submitavatarUrl;
  inputObj.createdAt = submitDate()
  agoraStatesDiscussions.unshift(inputObj);
  let liTwo = convertToDiscussion(inputObj);
  ul.prepend(liTwo) 
  submitName.value = "";
  submitTitle.value = "";
  submitStory.value = "";
  return render(ul)
}

submitButton.addEventListener('click', inputSumbit)