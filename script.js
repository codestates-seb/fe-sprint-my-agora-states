
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

  // 아바타 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 컨텐츠 제목
  const contentLink = document.createElement('a');
  contentLink.className = 'discussion__title';
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  discussionContent.append(contentLink);
  
  // information
  const contentInformation = document.createElement('div');
  contentInformation.className = 'discussion__information';
  contentInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}` 
  // new Date(obj.createdAt).toLocaleString()
  discussionContent.append(contentInformation);

  // 답변
  const checkAnswered = document.createElement("img");
  discussionAnswered.append(checkAnswered);
  obj.answer
    ? (checkAnswered.src = "icon/check_on.png") : (checkAnswered.src = "icon/check_off.png");

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 새로운 질문등록
const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // 새로고침 막아줌
  
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  
  // index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
  console.log(agoraStatesDiscussions);
  agoraStatesDiscussions.unshift(obj);

  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);

  title.value = '';
  nameInput.value = '';
  textbox.value = '';
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);





/*
let 총 페이지수 = Math.ceil(총갯수 / 1개화면에서 보여줄 갯수)

let 나머지 = 현재나의페이지 % 하단부크기
let 하단부첫번째숫자 = 현재나의페이지 - 현재나의페이지%하단부크기 + 1

ex) 
현재나의페이지 = 11
하단부크기 = 10
하단부첫번째숫자 = 11 - 11%10 + 1 // 11

현재나의페이지 = 3
하단부크기 = 10
하단부첫번째숫자 = 3 - 3%10 + 1 // 1

let 하단부마지막숫자 = 현재나의페이지 - 현재나의페이지%하단부크기 + 페이지하단부크기
현재나의페이지 = 3
하단부크기 = 10
하단부마지막숫자 = 3 + 3%10 + 10 // 10

하단부의 마지막 숫자는 총 갯수를 넘어갈 수 없어야 한다.
if(하단부마지막숫자 > 총페이지수){
    하단부마지막숫자 = 총페이지수
}


function pageAlgo(total, bottomSize, listSize, cursor ){
    //total = 총 갯수
    //bottomSize = 하단크기
    //listSize = 화면에서 보여줄 크기
    //cursor = 현재 나의 페이지

    let totalPageSize = Math.ceil(total / listSize)  //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 

    let firstBottomNumber = cursor - cursor % bottomSize + 1;  //하단 최초 숫자
    let lastBottomNumber = cursor - cursor % bottomSize + bottomSize;  //하단 마지막 숫자

    if(lastBottomNumber > totalPageSize) lastBottomNumber = totalPageSize  //총 갯수보다 큰 경우 방지

    return {
        firstBottomNumber,
        lastBottomNumber,
        totalPageSize,
        total,
        bottomSize,
        listSize,
        cursor
    }
}

//280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
let info = pageAlgo(50, 5, 5, 6)  


//실제 출력하는 방법 샘플
for(let i = info.firstBottomNumber ; i <= info.lastBottomNumber; i++){
    i == info.cursor ? console.log(`<span>cur : ${i}</span>`) : console.log(`<span>${i}</span>`)
}
*/




const pagination_element = document.querySelector('#pagination');

let current_page = 1;
const rows = 10;

const DisplayList = (items, wrapper, rows_per_page, page)=>{
    wrapper.innerHTML = "";
    page--;

    const start = rows_per_page * page;
    const end = start + rows_per_page;
    const paginatedItems = items.slice(start, end);

    for(let i=0; i < paginatedItems.length; i++){
        
        const item = paginatedItems[i];

        const item_element = convertToDiscussion(item);
        
        wrapper.appendChild(item_element);

    }
}

const setupPagination = (items, wrapper, rows_per_page) => {
    wrapper.innerHTML = "";
    const page_count = Math.ceil(items.length / rows_per_page);
    
    for(let i=1; i < page_count +1; i++){
        const btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

const paginationButton = (page, items) => {
    const button = document.createElement('button');
    button.textContent = page;
    
    if(current_page === page) button.classList.add('active');

    button.addEventListener('click', function(){
        current_page = page;
        DisplayList(items, ul, rows, current_page);

        const current_btn = document.querySelector('#pagination button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

const leftBtn = document.querySelector('#left__btn');
const rightBtn = document.querySelector('#right__btn');

leftBtn.addEventListener('click', () => {
    current_page--;
    if(current_page < 1){
        current_page = 1;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    const current_btn = document.querySelectorAll('#pagination button');
    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');


})

rightBtn.addEventListener('click', () => {
    const current_btn = document.querySelectorAll('#pagination button');

    current_page++;
    if(current_page > current_btn.length){
        current_page = current_btn.length;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');
})


DisplayList(agoraStatesDiscussions, ul, rows, current_page);
setupPagination(agoraStatesDiscussions, pagination_element, rows);


