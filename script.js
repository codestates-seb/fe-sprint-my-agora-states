// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}


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


  //이미지
  const avatarImage = document.createElement('img');
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImage)

  //제목
  const discussionTitleH2 = document.createElement("h2");
  discussionTitleH2.className = 'discussion__title';
  const discussionTitleA = document.createElement("a");
  discussionTitleA.textContent = obj.title;
  discussionTitleA.href = obj.url;
  discussionTitleH2.append(discussionTitleA);
  discussionContent.append(discussionTitleH2);

  //컨텐츠 정보 (작성자, 날짜)

  const discussionInformation = document.createElement('div')
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = "작성자 : " + obj.author + " ,  작성일 : " + `${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInformation);

  //체크박스
  const check = document.createElement('p');
  check.innerHTML = obj.answer ? '<i class="fa-regular fa-square-check"></i>' : '<i class="fa-regular fa-square"></i>'

  discussionAnswered.append(check);


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};




//submit event
const form = document.querySelector('.form');
const author = document.querySelector('#name');
const title = document.querySelector('#title');
const textbox = document.querySelector('#story');

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    author: author.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/2",
    createdAt: new Date(),
  }

  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  author.value = " ";
  title.value = " ";
  textbox.value = " ";

})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  console.log(from, to)

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  
  return;
};
const rowsPerPage = 10;
let  page = 1;

const rowsCount = agoraStatesDiscussions.length;
const pageCount = Math.ceil(rowsCount / rowsPerPage)

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, rowsPerPage);

const getPageStartEnd = (rowsPerPage, page) => {
  
  let start = page * rowsPerPage;
  let end = start + rowsPerPage;
  
  console.log(start, end)
  return { start, end };
};



const numbers = document.querySelector('.pagination');

//페이지 버튼 생성
for (let i = 1; i <= pageCount; i++) {
  numbers.innerHTML += ` <li class="page-item"><a class="page-link">${i}</a></li>`
}

const numberItem = document.querySelectorAll('.page-link');
console.log(numberItem[0].classList.add('active'))
numberItem.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault(); //a태그 기능 막기
    for (el of numberItem) {
      el.classList.remove('active');
    }
    e.target.classList.add('active')
    
    const { start, end } = getPageStartEnd(rowsPerPage, Number(e.target.textContent)-1);
    render(ul, start, end);
    
  })
});



