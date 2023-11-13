// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//로컬 저장소에서 데이터를 받아 내 데이터 업데이트
if (localStorage.getItem("agoraStatesDiscussions")) {
  agoraStatesDiscussions = JSON.parse(localStorage.getItem("agoraStatesDiscussions"));
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, idx) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("img");
  discussionAnswered.className = "discussion__answered__img";

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const title = document.createElement('h2');
  title.className = "discussion__title";
  title.textContent = obj.title;
  discussionContent.append(title);


  const information = document.createElement('div');
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${formatDate(obj.createdAt)}`;
  discussionContent.append(information);

  if (obj.hasOwnProperty('notice')) {
    discussionAnswered.src = "checkstar.jpg";
  } else if (obj.answer === null) {
    discussionAnswered.src = "checkx.png";
  } else {
    discussionAnswered.src = "check.png";
  }

  discussionAnswered.dataset.index = idx; // 인덱스를 데이터 속성에 추가

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


//페이지네이션ㄱㄱ
const prevButton = document.querySelector('.discussion__page_prevButton')
const nextButton = document.querySelector('.discussion__page_nextButton')
const currentPageElement = document.querySelector('#currentPage');

let itemsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil( agoraStatesDiscussions.length / itemsPerPage);

function displayItems() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  render(ul, startIndex, endIndex);
  currentPageElement.textContent = `  ${currentPage}  /  ${totalPages}  `;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}


prevButton.addEventListener('click', () => {
  currentPage -= 1;
  displayItems();
});

nextButton.addEventListener('click', () => {
  currentPage += 1;
  displayItems();
});





//페이지네이션


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, startIndex, endIndex) => {
  element.innerHTML = ''; // 기존 항목을 지웁니다.
  for (let i = startIndex; i < endIndex; i += 1) {
    if (i < agoraStatesDiscussions.length) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i], i)); // 인덱스를 전달
    }
  }
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//로컬 저장소 업데이트 함수
function updateLocalStorage(discussionsArray) {
  const updatedDiscussionsArray = JSON.stringify(discussionsArray);
  localStorage.setItem("agoraStatesDiscussions", updatedDiscussionsArray);
}

////질문 등록하기
// form 요소 찾기
const form = document.querySelector("form");

// submit 이벤트 리스너 추가
form.addEventListener("submit", (event) => {

  // 기본 폼 제출 동작 막기(기본값이 페이지 새로고침이기 때문에)
  event.preventDefault();

  // 입력 요소에서 값 가져오기
  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const story = document.getElementById("story").value;
  const now = new Date();

  // 새 객체 생성
  const newDiscussion = {
    author: name,
    title: title,
    bodyHTML: story.replace(/\n/g, "<br>"),
    avatarUrl: "https://w7.pngwing.com/pngs/541/8/png-transparent-yellow-thinking-emoji-illustration-world-emoji-day-whatsapp-thought-emoticon-thinking-people-smiley-sticker-thumbnail.png",
    createdAt: now,
    answer: null,
    index: 0 // 인덱스는 0으로 설정
  };
 
  // 배열에 새 객체 추가
  agoraStatesDiscussions.splice(1, 0, newDiscussion); // 앞에서 두 번째 위치에 새 객체 삽입
  // 기존 객체들의 인덱스를 1씩 증가
  for (let i = 2; i < agoraStatesDiscussions.length; i++) {
    agoraStatesDiscussions[i].index++;
  }
  // 새 객체를 DOM 요소로 변환하고 항목 목록에 추가
  if(currentPage===1){
    const newListItem = convertToDiscussion(newDiscussion);
    ul.insertBefore(newListItem, ul.children[1]); // 앞에서 두 번째 위치에 새 항목 삽입
  }
  //새로운 데이터로 로컬 저장소 업데이트
  updateLocalStorage(agoraStatesDiscussions);
  
  // 입력 값을 지우기
  document.getElementById("name").value = "";
  document.getElementById("title").value = "";
  document.getElementById("story").value = "";
});


//질문하기 버튼
const questionButton = document.getElementById("question_button");
const formSection = document.getElementsByClassName("form__container")[0];

questionButton.addEventListener("click", function () {
  if (formSection.classList.contains("hide")) {
    formSection.classList.remove("hide");
  }
  else { formSection.classList.add("hide"); }
});
//질문하기 버튼


//내용 불러오기
const detailSection = document.querySelector(".discussion__detail")
const titles = document.querySelectorAll(".discussion__title")
let selectedTitle = null;

let targetIndex;

ul.addEventListener('click', function (event) {
  const target = event.target
  if (target.classList.contains("discussion__title")) {

    //초기화
    detailSection.innerHTML = '';

    const titlesArray = Array.from(document.querySelectorAll(".discussion__title"));
    targetIndex = titlesArray.indexOf(target);

    if (agoraStatesDiscussions[targetIndex].answer !== null) {
      const question_html = document.createElement('div');
      question_html.className = "discussion__detail__question";
      const answered_html = document.createElement('div');
      answered_html.className = "discussion__detail__answered"
      const answered_information = document.createElement('div');
      answered_information.className = "discussion__detail__information";

      detailSection.append(question_html, answered_information, answered_html);

      question_html.innerHTML = agoraStatesDiscussions[targetIndex].bodyHTML;
      answered_html.innerHTML = agoraStatesDiscussions[targetIndex].answer.bodyHTML;

      const answered_information_img = document.createElement('img');
      answered_information_img.className = "discussion__detail__information__img"
      const answered_information_id_date = document.createElement('div');
      answered_information_id_date.className = "discussion__detail__information__id__date"

      answered_information.append(answered_information_img, answered_information_id_date);

      answered_information_img.src = agoraStatesDiscussions[targetIndex].answer.avatarUrl
      answered_information_id_date.textContent = `${agoraStatesDiscussions[targetIndex].answer.author} / ${formatDate(agoraStatesDiscussions[targetIndex].answer.createdAt)}`
    }
    else {
      const question_html = document.createElement('div');
      question_html.className = "discussion__detail__question";

      detailSection.append(question_html)

      question_html.innerHTML = agoraStatesDiscussions[targetIndex].bodyHTML;

      //여기다가 answer입력
      if (!agoraStatesDiscussions[targetIndex].hasOwnProperty('notice')) {
        const answered_input = document.createElement('form');
        answered_input.className = "form__input--wrapper2"
        answered_input.textContent = "답변하기";
        const answered_input_author = document.createElement('input');
        answered_input_author.type = "text";
        answered_input_author.name = "name";
        answered_input_author.id = "name2";

        const label = document.createElement("label");

        label.htmlFor = "name";
        label.innerHTML = "이름:";

        answered_input.appendChild(label);
        answered_input.appendChild(answered_input_author);

        const answered_input_story = document.createElement('textarea');
        answered_input_story.id = "story2"
        answered_input_story.name = "story"

        const label2 = document.createElement("label");
        label2.htmlFor = "story";
        label2.innerHTML = "내용:";

        answered_input.appendChild(label2)
        answered_input.appendChild(answered_input_story);

        const submitDiv = document.createElement("div");
        submitDiv.classList.add("form__submit");

        const submitInput = document.createElement("input");
        submitInput.type = "submit";
        submitInput.value = "등록";
        submitInput.classList.add("sub");

        submitDiv.appendChild(submitInput);

        answered_input.appendChild(submitDiv);

        detailSection.append(answered_input);

        addForm2EventListener(answered_input);

      }
    }

    //하이라이트
    if (selectedTitle) {
      selectedTitle.classList.remove("selected-title");
    }
    target.classList.add("selected-title");
    selectedTitle = target;
    //하이라이트

  }
})
//내용 불러오기

//답변 등록하기
const form2 = document.querySelector(".form__input--wrapper2")

// submit 이벤트 리스너 추가function addForm2EventListener(form2) {
function addForm2EventListener(form2) {
  form2.addEventListener("submit", (event) => {
    // 기본 폼 제출 동작 막기(기본값이 페이지 새로고침이기 때문에)
    event.preventDefault();


    const name2 = document.getElementById("name2").value;
    const story2 = document.getElementById("story2").value;
    const now2 = new Date();


    agoraStatesDiscussions[targetIndex].answer = {};
    agoraStatesDiscussions[targetIndex].answer.author = name2;
    agoraStatesDiscussions[targetIndex].answer.bodyHTML = story2;
    agoraStatesDiscussions[targetIndex].answer.createdAt = now2;
    agoraStatesDiscussions[targetIndex].answer.avatarUrl = "https://w7.pngwing.com/pngs/942/203/png-transparent-yellow-emoji-illustration-emoji-wink-emoticon-smiley-sticker-emoji-face-heart-thumb-signal-thumbnail.png"

    document.getElementById("name2").value = "";
    document.getElementById("story2").value = "";

    const answered_html = document.createElement('div');
    answered_html.className = "discussion__detail__answered";
    const answered_information = document.createElement('div');
    answered_information.className = "discussion__detail__information";
    detailSection.append(answered_information, answered_html);

    const answered_information_img = document.createElement('img');
    answered_information_img.className = "discussion__detail__information__img";
    const answered_information_id_date = document.createElement('div');
    answered_information_id_date.className = "discussion__detail__information__id__date";
    answered_information.append(answered_information_img, answered_information_id_date);

    answered_information_img.src = agoraStatesDiscussions[targetIndex].answer.avatarUrl;
    answered_information_id_date.textContent = `${agoraStatesDiscussions[targetIndex].answer.author} / ${formatDate(agoraStatesDiscussions[targetIndex].answer.createdAt)}`;
    answered_html.innerHTML = agoraStatesDiscussions[targetIndex].answer.bodyHTML;

    const updatedDiscussionsArray = JSON.stringify(agoraStatesDiscussions);
    localStorage.setItem("agoraStatesDiscussions", updatedDiscussionsArray);

    form2.remove();
    
    displayItems();

  })
};

displayItems();

document.querySelector('.discussion__title').click()