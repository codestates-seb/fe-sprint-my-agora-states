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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //avatarImg
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //title
  const titleText = document.createElement('h2');
  titleText.className = 'discussion__title';
  discussionContent.append(titleText);

  //title > a
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  titleText.append(titleLink);

  //information
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  //answer
  const answerBox = document.createElement('p');
  discussionAnswered.className = 'discussion__answered';
  if(obj.answer === null){
    //answer 값이 nell이면 x표시
    answerBox.textContent = '답변 대기☒';
  }else{
    //아니라면 check표시
    answerBox.textContent = '답변 완료☑';
  }
  discussionAnswered.append(answerBox);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

  const form = document.querySelector('form.form');
  const inputName = document.querySelector('.form__input--name input');
  const inputTitle = document.querySelector('.form__input--title input');
  const inputQustion = document.querySelector('.form__textbox textarea');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const obj = {
      id: "999",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: inputName.value,
      answer: null,
      avatarUrl: 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
      bodyHTML: inputQustion.value,
    }

    //기존 데이터 가장 앞에 추가
    agoraStatesDiscussions.unshift(obj);
    ul.prepend(convertToDiscussion(obj));
  });

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


//page nation------------------------------------------------

/* let currentPage = 1; // 현재 페이지. 초기값은 1

const prevButton = document.querySelector("#button__pagination--prev");
const nextButton = document.querySelector("#button__pagination--next");

const discussions = ul.children; // 공지사항을 포함한 디스커션
let totalCount = discussions.length; // 총 디스커션의 갯수
const pageCount = 5; // 한 번에 보여줄 페이지 버튼의 최대 갯수
const limit = 10; // 한 페이지에 보여줄 디스커션의 갯수

// 1.총 페이지의 갯수 구하기
let totalPage = Math.ceil(totalCount / limit);

// 2-1.현재 페이지의 그룹 계산하기
let pageGroup = Math.ceil(currentPage / pageCount);
// 2-2.페이지 그룹의 첫번째 숫자와 마지막 숫자 구하기
let lastPageNumber = pageGroup * pageCount;
if (lastPageNumber > totalPage) {
  lastPageNumber = totalPage;
};
let firstPageNumber = (pageGroup - 1) * pageCount + 1;
let numberButtons = document.querySelectorAll(".pagination--number");
// 2-3.페이지 그룹 버튼 생성
const makeNumberButtons = () => {
    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      const pageNumberButton = document.createElement('li');
      pageNumberButton.classList.add("pagination--number");
      pageNumberButton.setAttribute("id", `button__pagination--num${i}`);
      pageNumberButton.textContent = i;
      nextButton.before(pageNumberButton);
      numberButtons = document.querySelectorAll(".pagination--number");
    };
};
makeNumberButtons();


// 3.현재 페이지 인덱스 표시하기
const currPageIndex = () => {
    numberButtons.forEach( el => {
        el.classList.remove("current__page");
    });
    let currentPageButton = document.querySelector(`#button__pagination--num${currentPage}`);
    currentPageButton.classList.add("current__page");
};
currPageIndex();

// 4.한 페이지에서 디스커션 10개만 보여준다
const pageChange = () => {
    // 전체 디스커션 갯수, 전체 페이지 수, 페이지그룹의 마지막 페이지 다시 계산
    totalCount = discussions.length;
    totalPage = Math.ceil(totalCount / limit);
    lastPageNumber = pageGroup * pageCount; 

    if (lastPageNumber > totalPage) {
      lastPageNumber = totalPage;
    };
    let firstIndexNum = (currentPage - 1) * limit; //0
    let lastIndexNum = (currentPage * limit) - 1; //9
    for (let i = 0; i < totalCount; i++) {
    if (i < firstIndexNum || i > lastIndexNum) {
        discussions[i].style = "display : none";
    } else {
        discussions[i].style = "display : flex";
    }
    }
};
pageChange();
// 5.페이지 번호를 클릭하면 해당 페이지 화면으로 전환한다
const handlePageChange = () => {
  currPageIndex();
  pageChange();
}

numberButtons.forEach( el => {
  el.addEventListener("click", (event) => {
      let selectedNum = Number(event.target.textContent);
      currentPage = selectedNum;
      handlePageChange();
  })
});

// 6.이전페이지 버튼을 작동시킨다
prevButton.addEventListener("click", () => {
  if (currentPage === firstPageNumber) {
      if (currentPage === 1) {
          alert("처음 페이지 입니다.");
          return;
      } else {
          numberButtons.forEach(function(button){
              button.remove();
          });
          pageGroup -= 1;
          lastPageNumber = pageGroup * pageCount;
          if (lastPageNumber > totalPage) {
              lastPageNumber = totalPage;
          };
          firstPageNumber = (pageGroup - 1) * pageCount + 1;
          makeNumberButtons();
          numberButtons.forEach( el => {
              el.addEventListener("click", (event) => {
                  let selectedNum = Number(event.target.textContent);
                  currentPage = selectedNum;
                  handlePageChange();
              })
          });
      }
  }
  currentPage -= 1;
  handlePageChange();
});

// 7.다음페이지 버튼을 작동시킨다
nextButton.addEventListener("click", () => {
  if (currentPage === lastPageNumber) {
      if (lastPageNumber === totalPage) {
          alert("마지막 페이지 입니다.");
          return;
      } else {
          numberButtons.forEach(function(button){
              button.remove();
          });
          pageGroup += 1;
          lastPageNumber = pageGroup * pageCount;
          if (lastPageNumber > totalPage) {
              lastPageNumber = totalPage;
          };
          firstPageNumber = (pageGroup - 1) * pageCount + 1;
          makeNumberButtons();
          numberButtons.forEach( el => {
              el.addEventListener("click", (event) => {
                  let selectedNum = Number(event.target.textContent);
                  currentPage = selectedNum;
                  handlePageChange();
              })
          });
      }
  }
  currentPage += 1;
  handlePageChange();
}); */