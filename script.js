/* <li class="discussion__container">
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
  <div class="discussion__answered"><p>☑</p>
</div>
</li> */

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

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  const discussionAnchor = document.createElement('a');
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  // const avatarImg = document.createElement('img');
  // avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  // avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  // avatarWrapper.append(avatarImg);

  //======================================================================================================
  const userName = document.createElement('span');
  userName.textContent = obj.author;
  userName.className = 'discussion__name';
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleString();
  const timeElement = document.createElement('span');
  timeElement.textContent = currentTime;
  timeElement.className = 'discussion__time';
  //========================================================================================


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;
  discussionAnchor.target = '_blank';
  avatarImg.src = obj.avatarUrl;

  // li의 자식인가 discussion__Container의 자식인가
  avatarWrapper.append(avatarImg)
  discussionContent.append(userName, discussionTitle, timeElement);
  discussionTitle.append(discussionAnchor);
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
//================================================================================================================================================
// 페이지네이션에 사용할 페이지 크기를 정의합니다.
// const pageSize = 12; // 각 페이지에 표시할 항목 수

// // agoraStatesDiscussions 배열을 페이지 크기로 나눈 이중 배열을 생성합니다.
// const paginatedDiscussions = [];
// for (let i = 0; i < agoraStatesDiscussions.length; i += pageSize) {
//   paginatedDiscussions.push(agoraStatesDiscussions.slice(i, i + pageSize));
// }

// // 현재 페이지를 나타내는 변수를 초기화합니다.
// let currentPage = 0;

// // render 함수를 수정하여 현재 페이지의 데이터만을 렌더링하도록 합니다.
// const render = (element, page) => {
//   if (page < 0 || page >= paginatedDiscussions.length) {
//     console.error('유효하지 않은 페이지입니다.');
//     return;
//   }

//   // 현재 페이지의 데이터만을 렌더링합니다.
//   element.innerHTML = ''; // 화면 초기화
//   const discussions = paginatedDiscussions[page];
//   for (let i = 0; i < discussions.length; i += 1) {
//     element.append(convertToDiscussion(discussions[i]));
//   }

//   // 페이지 번호를 업데이트합니다.
//   currentPage = page;

//   return
// };

// // 최초 페이지를 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, page = 0);
//=======================================================================================================================================================

// 페이지 버튼을 동적으로 만듦
// 그 길이만큼 for문을 돌림
// div 먼저 생성
// for문 한번 실행마다 버튼을 하나씩 생성
// 생성할때 addeventlistener 같이 생성
// 페이지 버튼을 누르면 ul 안에 있는 자식들이 모두 지워진다
// 그리고 render 함수를 호출하는데 render함수 안에 두번째 인자로 page 번호를 지정한다.
// 그 값은 for문에 아직 돌고 있기 때문에 인덱스에 위치한 배열 호출
//========================================================================================================================================================
// *새로운 질문 추가 구현하기
// 1. 서브밋 버튼을 쿼리셀렉터로 가져온 후 변수에 할당한다.
const submit = document.querySelector(".form__button>input")
// 2. 버튼의 클릭 이벤트에 할당할 함수를 작성한다.
const submitEvent = (event) => {
  event.preventDefault()
  // 3. 인풋에 입력된 작성자 , 제목 , 내용을 쿼리셀렉터로 가져온다
  const submitName = document.querySelector("#name");
  const submitTitle = document.querySelector("#title");
  // const submitContent = document.querySelector("#stroy");

  if (submitName.value === '' || submitTitle === "") {
    return alert('내용을 입력해주세요')
  }

  // // 4. 정보들을 모아 하나의 discussion 객체로 만든다.
  const submitDiscussion = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date(),
    avatarUrl: 'https://file2.nocutnews.co.kr/newsroom/image/2023/01/21/202301210408091762_0.jpg',
    title: submitTitle.value,
    url: 'https://www.naver.com',
    author: submitName.value,
    answer: null,
    // bodyHTML: submitContent.value,
  }

  // // 5. ul 태그 안 자식 태그(기존의 디스커션) 들을 모두 지운다.
  // const ul = document.querySelector("ul.discussions__container");
  // ul.innerHTML = '';
  // // 6. discussion 배열에 만들어놓은 객체를 추가한다.
  ul.prepend(convertToDiscussion(submitDiscussion))
  // // agoraStatesDiscussions.push(submitDiscussion);
  // // 7. render 메서드를 다시 호출하여 새로운 객체가 추가된 배열을 랜더링하게 만든다.
  // render(ul);
  // li.append(submitName, submitTitle, submitContent);
  // return li;
};

// function submitSpace() {
//   return alert('내용을 입력하세요 !');

// }
submit.addEventListener('click', submitEvent)
//8