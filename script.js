// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("h3");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionTitle = document.createElement('a');
  discussionTitle.className = "discussion__title";
  discussionTitle.textContent = obj.title;
  discussionTitle.href = obj.url

  discussionContent.append(discussionTitle);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information"
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt || Date.now()
  ).toISOString()}`;
  discussionContent.appendChild(discussionInformation);

  const discussionCheckbox = document.createElement('p');
  discussionCheckbox.className = "discussion__answered"
  discussionCheckbox.textContent = '☑'
  discussionAnswered.append(discussionCheckbox);

  

  


  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  

  
  
 
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

  
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
   
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

const ul = document.querySelector("ul.discussions__container");
render(ul);


const perPage = 10; // 한 페이지에 보여줄 데이터 수
const pers = document.querySelectorAll('.discussion__container');
const pageCount = Math.ceil(pers.length / perPage); // 전체 페이지 수
const numbers = document.querySelector('.page-btns');

// 페이지 버튼 생성
for (let i = 1; i <= pageCount; i++) {
  const pageButton = document.createElement('button');
  pageButton.classList.add('page-btn');
  pageButton.textContent = i;
  numbers.appendChild(pageButton);
}

const pageButtons = document.querySelectorAll('.page-btn');

// 초기 페이지 설정
let currentPage = 1;

// 페이지 버튼 클릭 시 이벤트 리스너 등록
pageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentPage = Number(button.textContent);
    renderData();
  });
});

// 데이터 렌더링 함수
function renderData() {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const slicedPers = [...pers].slice(start, end);

  const discussionsContainer = document.querySelector('.discussions__container');
  discussionsContainer.innerHTML = '';

  slicedPers.forEach((per) => {
    discussionsContainer.appendChild(per);
  });
}

// 초기 렌더링
renderData();







   // 폼의 기본 동작(새로고침)을 막는다
   const form = document.querySelector("form.form");
   const author = form.querySelector("div.form__input--name > input");
   const title = form.querySelector("div.form__input--title > input");
   const textbox = form.querySelector("div.form__textbox > textarea");
   
   form.addEventListener("submit", (event) => {
     event.preventDefault();
     
     
   
     const obj = {
       id: "unique id",
       createdAt: new Date().toISOString(),
       title: title.value,
       url: "https://github.com/codestates-seb/agora-states-fe/discussions",
       author: author.value,
       answer: null,
       bodyHTML: textbox.value,
       avatarUrl:
         "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
     };
   
     // agoraStatesDiscussions 객체 추가
     agoraStatesDiscussions.unshift(obj);
   
     // 화면 다 지우고 
     while (ul.firstChild) {
       ul.removeChild(ul.firstChild);
     }
   
     // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
     render(ul);
   
});

