{/* <li class="discussion__container">
  <div class="discussion__avatar--wrapper">
    <img class="discussion__avatar--image"
      src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
      alt="avatar of kimploo">
  </div>
  <div class="discussion__content">
    <h2 class="discussion__title">
    <a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a>
    </h2>
    <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
  </div>
  <div class="discussion__answered"><p>☑</p></div>
</li> */}

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// interface Discussion {
//   id: string;
//   createdAt: string;
//   title: string;
//   url: string;
//   author: string;
//   answer?: Answer | null;
//   bodyHTML: string;
// }

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionTitle = document.createElement("h2");
  discussionTitle.classList.add('discussion__title');
  const discussionAnchor = document.createElement("a");
  const avatarImage = document.createElement('img');
  avatarImage.classList.add('discussion__avatar--image');
  const discussionInformation = document.createElement('div');
  discussionInformation.classList.add('docussion__information');
  const discussionAnsweredYes = document.createElement('span');
  discussionAnsweredYes.classList.add('material-symbols-outlined');
  const discussionAnsweredNo = document.createElement('span');
  discussionAnsweredNo.classList.add('material-symbols-outlined');


  // 시간 데이터
  const time = new Date(obj.createdAt);

  // 수정
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;
  discussionAnchor.target = '_blank';
  avatarImage.src = obj.avatarUrl;
  discussionInformation.textContent = `${obj.author} / ${time.toLocaleDateString()}`;
  discussionAnsweredYes.textContent = 'select_check_box';
  discussionAnsweredNo.textContent = 'check_box_outline_blank'

  // 삽입
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  discussionContent.append(discussionTitle);
  discussionTitle.append(discussionAnchor);
  discussionTitle.append(discussionInformation);
  avatarWrapper.append(avatarImage);

  if (obj.answer != null)
    discussionAnswered.append(discussionAnsweredYes);
  else
    discussionAnswered.append(discussionAnsweredNo);


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


//이름과 제목, 의견을 작성 후 등록 버튼을 누르면 자신의 이름과 작성시간, 답변여부가 등록되게 한다.

let submitBtn = document.querySelector('.form__submit>input');

const addDiscussion = (event) => {
  // 새로고침 방지
  event.preventDefault();
  // 네임 인풋에 작성된 값
  // 제목 인풋에 작성된 값
  // 의견 인풋에 작성된 값
  // 현재 날짜
  // 위 정보들을 모아서 디스커션 객체로 만든다
  // 디스커션 객체를 컨버트투디스커션의 매개변수로 전달한다
  // 컨버트투디스커션 반환값인 li 요소를 ul에 어펜드한다
  // 어펜드말고 맨위에 뜨는 메서드를 찾아본다
  let today = new Date();
  let name = document.getElementById('name').value;
  let title = document.getElementById('title').value;
  let discussion = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: today,
    title: title,
    url: "http://www.google.co.kr",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlTWxLLhXPXn9QHkLaExIX4KS9IhguC2AdQ&usqp=CAU",
    author: name,
    answer: null
  };
  agoraStatesDiscussions.unshift(discussion);
  ul.innerHTML = "";
  render(ul);
};

submitBtn.addEventListener('click', addDiscussion);


//discussions_wrapper의 자식요소의 맨위에 div추가하고 그 안에 select 태그 추가
let discussion__wrapper = document.querySelector('.discussion__wrapper');

const pageSelectWrapper = document.createElement('div');
pageSelectWrapper.classList.add('pageSelectWrapper');
discussion__wrapper.prepend(pageSelectWrapper);

const pageSelect = document.createElement('select');
pageSelect.classList.add('pageSelect');
pageSelectWrapper.prepend(pageSelect);

//select 태크에 option값 추가
let option1 = document.createElement('option');
option1.classList.add('option1');
option1.textContent = '전체보기';
option1.value = 'default';
let option2 = document.createElement('option');
option2.classList.add('option2');
option2.textContent = '3개씩';
option2.value = '3';
pageSelect.append(option1);
pageSelect.append(option2);

//option1을 선택하면 한 페이지에 3개씩 보이게하고, 그에 맞게 페이지바 생성
//option2를 선택하면 한페이지에 전체가 보이게하고, 페이지 번호 1만 생성

let pageChunk = agoraStatesDiscussions.length;
let pages = [];
let pageNum = pages.length;
const page = document.querySelector('.page');
const ol = document.createElement('ol');
ol.classList.add('pages__contaioner');



pageSelect.addEventListener('change', () => {
  console.log(pageSelect.options[pageSelect.selectedIndex]);
  if (pageSelect.options[pageSelect.selectedIndex].value === '3') {
    console.log(pageSelect.options[pageSelect.selectedIndex].value);
    pageChunk = 3;
    pages = chunkArray(agoraStatesDiscussions, pageChunk);
    // pages = [[{},{},{}],[{},{},{}], ... ]
    pageNum = pages.length;
    ul.innerHTML = "";
    renderPagination(pageNum);
    appendPage(ul, 0);
  }
  else {
    console.log(pageSelect.options[pageSelect.selectedIndex].value);
    pageChunk = agoraStatesDiscussions.length;
    pages = chunkArray(agoraStatesDiscussions, pageChunk);
    pageNum = pages.length;
    // pages = [[{},{},{}],[{},{},{}], ... ]\
    renderPagination(pageNum);
    render(ul);
  }
});

// 입력 받은 배열을 입력한 수만큼씩 잘라서 반환하는 함수
const chunkArray = (arr, num) => {
  console.log({ num });
  let arr2 = [];
  for (let i = 0; i < arr.length; i += num) {
    arr2.push([arr[i], arr[i + 1], arr[i + 2]]);
  }
  return arr2;
}

// 입력한 페이지 번호의 화면을 ul에 띄워주는 함수.
const appendPage = (element, page = 0) => {
  //page 매개변수가 전달되지 않았다면, 디폴트로 가장 앞의 5개의 데이터가 들어간다.
  for (let i = 0; i < pages[page].length; i++) {
    element.append(convertToDiscussion(pages[page][i]));
  }
}

// 입력한 숫자만큼 페이지를 표현하는 함수
const renderPagination = (pageNum) => {
  ol.innerHTML = '';
  for (let i = 0; i < pageNum; i++) {
    // 각 li에 페이지 번호를 텍스트로 추가
    const li = document.createElement('li');
    li.textContent = i + 1;
    li.classList.add('page_item');

    // 각 페이지 번호의 텍스트를 누르면 해당 화면으로 전환되게하는 이벤트를 추가
    li.addEventListener('click', (event) => {
      let currentPage = Number(event.target.textContent) - 1;
      ul.innerHTML = '';
      appendPage(ul, currentPage);
    });
    // ol를 초기화하고 ol에 페이지번호를 부여한 li를 추가
    ol.append(li);
  }
  page.append(ol);
}


