// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 페이지네이션
const pageNumber = document.querySelector(".page_number")
const limit = 5; // 한 페이지에 리스트 몇개 할건지?
let currentPage = 1; // 현재 페이지는 몇번째 페이지입니까?

const pageChange = function (currentPage) {
  const totalCount = agoraStatesDiscussions.length; // 총 리스트의 개수는 몇개인가?
  const pageCount = 5; // 페이지 버튼 개수 몇개?

  let totalPage = Math.ceil(totalCount / limit);
  let pageGroup = Math.ceil(currentPage / pageCount);

  let lastNum = pageGroup * pageCount;
  let firstNum = lastNum - (pageCount - 1);
  if (totalPage < lastNum) {
    lastNum = totalPage;
  }
  if (firstNum <= 1) {
    firstNum = 1;
  };

  // 페이지 버튼 초기화
  pageNumber.textContent = "";

  // 페이지 버튼 5개 만들기
  for (let i = firstNum; i <= lastNum; i++) {
    const buttons = document.createElement("button");
    buttons.id = `page_${i}`;
    if (Number(currentPage) === i) {
      buttons.className = 'pages action_button';
    }
    else {
      buttons.className = 'pages';
    };
    buttons.textContent = `${i}`;
    pageNumber.append(buttons);
  };

  //페이지 이전 버튼 만들기
  if (!(currentPage === 1)) {
    const buttons = document.createElement("button");
    buttons.id = `pre_btn`;
    buttons.className = 'pages';
    buttons.textContent = '<';
    pageNumber.prepend(buttons);
  }

  //페이지 다음 버튼 만들기
  if (!(currentPage === totalPage)) {
    const buttons = document.createElement("button");
    buttons.id = `aft_btn`;
    buttons.className = 'pages';
    buttons.textContent = '>';
    pageNumber.append(buttons);
  }
  return;
};

// 기본 첫페이지 작동
pageChange(1);

let targetNode;

function date_change (date) {
  let dateChange = new Date(date).toLocaleString();
  return dateChange;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = `discussion__container ${obj.id}`; // 클래스 이름 지정

  // 질문을 클릭했을 때 => 질문내용 상자 나타나기
  li.addEventListener("click", function () {
    targetNode = document.querySelector(`div.${obj.id}`);
    targetNode.classList.remove("hide");
  });

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const imgs = document.createElement("img");
  imgs.className = "discussion__avatar--image";
  imgs.src = obj.avatarUrl;
  imgs.alt = `avatar of ${obj.author}`;

  avatarWrapper.append(imgs);

  const title1 = document.createElement("div");
  title1.className = "discussion__title";
  const title_a = document.createElement("a");
  // title_a.href = obj.url;
  title_a.textContent = obj.title;
  title1.append(title_a);

  const name_time = document.createElement("div");
  name_time.className = "discussion__information";
  name_time.textContent = `${obj.author} / `+ date_change(obj.createdAt);

  discussionContent.append(title1, name_time);

  const check_box = document.createElement("input");
  discussionAnswered.append(check_box);
  check_box.type = "checkbox";
  if (!(obj["answer"] === null)) {
    check_box.checked = " ";
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// 팝업상자 만들기
const add_answerbox = (obj) => {
  const answers_box = document.createElement("div");
  answers_box.className = `answers_box ${obj.id} hide`;
  const answer_bar = document.createElement("div");
  answer_bar.className = "answer_bar";
  const answer_quit = document.createElement("button");
  answer_quit.className = "answer_quit";
  const answer_body = document.createElement("div");
  answer_body.className = "answer_body";
  const answer_output = document.createElement("ul");
  answer_output.className = "answer_output";
  const answers_input = document.createElement("div");
  answers_input.className = "answers_input";

  // 닫기 버튼 클릭했을 때 => 질문 내용 상자 사라지기
  answer_quit.addEventListener("click", function () {
    targetNode = this.parentNode.parentNode;
    targetNode.classList.add("hide");
  });

  const answer_list = document.createElement("li");
  answer_list.classList = "answer_list";

  const answers_img = document.createElement("div");
  answers_img.classList = "answers_img"

  const answer_img_main = document.createElement("img");
  answer_img_main.src = obj.avatarUrl;
  answer_img_main.alt = `avatar of ${obj.author}`;

  const answers_container = document.createElement("div");
  answers_container.classList = "answers_container"

  const answer_title = document.createElement("div");
  answer_title.classList = "answer_title";
  answer_title.textContent = obj.title;

  const answer_contents = document.createElement("div");
  answer_contents.classList = "answer_contents"
  answer_contents.textContent = obj.bodyHTML;

  const answer_information = document.createElement("div");
  answer_information.classList = "answer_information"
  answer_information.textContent = `${obj.author} / `+ date_change(obj.createdAt);

  const answer_input_box = document.createElement("input");
  answer_input_box.type = "text";
  answer_input_box.classList = "answer_input_box";
  answer_input_box.placeholder = "#질문 | 질문자에게 답변을 작성해주세요";

  answer_list.append(answers_img);
  answers_img.append(answer_img_main);
  answer_list.append(answers_container);
  answers_container.append(answer_title);
  answers_container.append(answer_contents);
  answers_container.append(answer_information);
  answer_output.append(answer_list);
  answers_input.append(answer_input_box);

  if (!(obj.answer === null)) {
    const answer_list_add = document.createElement("li");
    answer_list_add.classList = "answer_list";

    const answers_img = document.createElement("div");
    answers_img.classList = "answers_img"

    const answer_img_main = document.createElement("img");
    answer_img_main.src = obj.answer.avatarUrl;
    answer_img_main.alt = `avatar of ${obj.answer.author}`;

    const answers_container = document.createElement("div");
    answers_container.classList = "answers_container"

    const answer_title = document.createElement("div");
    answer_title.classList = "answer_title";
    answer_title.textContent = obj.answer.title;

    const answer_contents = document.createElement("div");
    answer_contents.classList = "answer_contents"
    answer_contents.textContent = obj.answer.bodyHTML;

    const answer_information = document.createElement("div");
    answer_information.classList = "answer_information"
    answer_information.textContent = `${obj.answer.author} / `+ date_change(obj.answer.createdAt);

    answer_output.append(answer_list_add);
    answer_list_add.append(answers_img);
    answers_img.append(answer_img_main);
    answer_list_add.append(answers_container);
    answers_container.append(answer_title);
    answers_container.append(answer_contents);
    answers_container.append(answer_information);
  }

  answer_bar.append(answer_quit);
  answer_body.append(answer_output);
  answer_body.append(answers_input);

  answers_box.append(answer_bar);
  answers_box.append(answer_body);

  return answers_box;
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = limit * (currentPage - 1); i < limit * currentPage; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    element.append(add_answerbox(agoraStatesDiscussions[i]));
  }
  return;
};

// const page__buttons = document.querySelectorAll(".pages");

// 버튼 클릭 시 페이지 활성화
pageNumber.addEventListener("click", function (e) {
  const target = e.target;
  const buttonContent = target.textContent;

  if (buttonContent === "<") {
    currentPage = Number(currentPage) - 1;
  }
  else if (buttonContent === ">") {
    currentPage = Number(currentPage) + 1;
  }
  else {
    currentPage = Number(buttonContent);
  };

  // 페이지 번호 만들기
  pageChange(currentPage);

  //ul 아래 내용을 삭제
  document.querySelector('ul').innerHTML = '';

  // ul 내용 동기화
  render(ul);

  // 페이지 버튼 클릭했을 때 => 질문내용 상자 나타나기
  // pop_start();
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 'submit'버튼을 누르면 질문이 등록된다.
const form = document.querySelector("form");

const add = function (event) {
  event.preventDefault();

  const name_box = document.querySelector("#name");
  const title_box = document.querySelector("#title");
  const question_box = document.querySelector("#story");
  let localDate = new Date().toLocaleString;

  // agoraStatesDiscussions 배열 안에 form으로 입력한 내용을 unshift 삽입
  agoraStatesDiscussions.unshift({
    id: "anonymous",
    createdAt: localDate,
    title: title_box.value,
    url: "",
    author: name_box.value,
    answer: null,
    bodyHTML: question_box.value,
    avatarUrl: "https://cdn-lostark.game.onstove.com/uploadfiles/user/2021/04/06/637533443568560776.png"
  });

  document.querySelector('ul').innerHTML = '';  //ul 아래 내용을 삭제
  render(ul);  // 다시 ul 아래 요소들을 랜더링
  // ul.prepend(convertToDiscussion(agoraStatesDiscussions[0])) // 인덱스 0번째 값만 prepend 하기

  // submit 하고 나서 상자 안에 값 삭제
  name_box.value = null;
  title_box.value = null;
  question_box.value = null;

  // 페이지 버튼 클릭했을 때 => 질문내용 상자 나타나기
  pop_start();

  return false;
};
form.addEventListener('submit', add);

// 좌측 버튼을 클릭했을 때
const Home = document.querySelector(".Home");
const Ask = document.querySelector(".Ask");
const Search = document.querySelector(".Search");
const my_Question = document.querySelector(".my_Question");
const my_Answer = document.querySelector(".my_Answer");
const Setting = document.querySelector(".Setting");
const Light = document.querySelector(".Light");
const Dark = document.querySelector(".Dark");

let section_list = document.querySelector("section.discussion__wrapper");
let section_container = document.querySelector("section.form__container");

Home.onclick = function () {
  section_list.classList.remove("hide");
  section_container.classList.add("hide");
}

Ask.onclick = function () {
  section_list.classList.add("hide");
  section_container.classList.remove("hide");
}

Search.onclick = function () {
  section_list.classList.remove("hide");
  section_container.classList.add("hide");
}
