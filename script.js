// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const cssFilePath = "style.css";

// link 요소를 생성합니다.
const linkElement = document.createElement("link");
linkElement.rel = "stylesheet"; // 스타일시트로 지정
linkElement.href = cssFilePath; // CSS 파일 경로

// HTML 문서의 head 부분에 link 요소를 추가합니다.
document.head.appendChild(linkElement);
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
 
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 디스커션 제목 추가
  const title = document.createElement("h2");
  title.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.href = obj.url; // 객체의 링크 속성에서 URL을 가져옴
  titleLink.textContent = obj.title; // 객체의 제목 속성에서 제목을 가져옴
  title.appendChild(titleLink);
  discussionContent.appendChild(title);

  //img 태그를 만든다
  //img태그의 src 속성을 obj의 avatarUrl 속성값으로 할당한다
  //img 태그를 avatarWrapper의 자식 요소로 삽입하다
  const avatarImg = document.createElement("img");
 
  avatarWrapper.appendChild(avatarImg);

; // obj의 avatarUrl 속성값을 가져와서 src 속성에 할당합니다.

// img 태그를 avatarWrapper의 자식 요소로 추가합니다.
avatarWrapper.appendChild(avatarImg);
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
//새로운 질문 추가 구성하기
//1. 서브밋 버튼을 쿼리셀렉터로 가져온 후 변수에 할당한다
//2. 버튼의 출력 이벤트에 할당할 함수를 작성한다.
discussionTitle.append(discussionAncher)


const itemsPerPage = 10; // 페이지당 아이템 수
let currentPage = 1; // 현재 페이지

// 이전 페이지로 이동하는 함수
function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderDiscussionList(); // 현재 페이지에 따라 디스커션 목록을 다시 렌더링
  }
}

// 다음 페이지로 이동하는 함수

function goToNextPage() {
  const totalItems = agoraStatesDiscussions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    // 새로운 페이지로 이동
    window.location.href = "next-page.html"; // 변경하려는 페이지의 URL로 대체하세요
  }
}

document.getElementById("script copy").addEventListener("click", submit);

// "다음 페이지" 버튼 클릭 시 다음 페이지로 이동
avatarUrl:
        "https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4"
        function addAvatarImage(avatarUrl) {
          // li 요소 내에서 아바타 이미지를 찾아야 합니다.
          const liElements = document.querySelectorAll(".discussion__container");
        
          liElements.forEach((li) => {
            const avatarWrapper = li.querySelector(".discussion__avatar--wrapper");
        
            // 이미지 태그를 만들고 src 속성을 할당합니다.
            const avatarImg = document.createElement("img");
            avatarImg.src = avatarUrl;
        
            // 이미지 태그를 아바타 래퍼에 추가합니다.
            avatarWrapper.appendChild(avatarImg);
          });
        }
        
        // 사용 예시:
        // addAvatarImage("URL_OF_YOUR_AVATAR_IMAGE");
        fetch("other-page.html")
  .then(response => response.text())
  .then(data => {
    // data를 현재 페이지에 삽입하거나 처리합니다.
  })
  .catch(error => {
    console.error("데이터를 가져오는 중 오류가 발생했습니다.");
  });
  localStorage.setItem('key', 'value');

// 데이터 불러오기
const data = localStorage.getItem('key');

// 데이터 삭제
localStorage.removeItem('key');

// 모든 데이터 삭제
localStorage.clear();

const submitBtn = document.getElementById("submitBtn");

// submit 버튼에 클릭 이벤트 리스너 할당
submitBtn.addEventListener("click", function(event) {
  // 이벤트 핸들러 내용
  event.preventDefault(); // 폼 제출 방지 또는 제출 로직을 여기에 추가
});
// "Submit" 버튼을 id로 선택
const submitButton = document.getElementById("submit");

// 클릭 이벤트 핸들러를 할당
submitButton.addEventListener("click", function(event) {
  event.preventDefault(); // 폼 제출 방지
  // 이벤트 핸들러 내용: 버튼이 클릭될 때 실행할 작업을 여기에 추가
});

// key1의 값을 key2로 치환
myObject.name = myObject.name;

console.log(myObject.name); // 출력: "value1"
