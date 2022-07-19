// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//localStorage.clear();
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const subElementobj = subConvertToDiscussion(obj);

  // 이미지
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.append(subElementobj.image);

  //내용
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.append(subElementobj.title);
  discussionContent.append(subElementobj.info);

  //답변여부
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.append(subElementobj.answer);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const subConvertToDiscussion = (obj) => {

  const elementObj = {};

  //이미지
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  elementObj.image = avatarImg;

  //제목
  const discussionTitle = document.createElement("h2");
  const discussionTilte_aTag = document.createElement("a");
  discussionTilte_aTag.href = obj.url;
  discussionTilte_aTag.textContent = obj.title;
  discussionTitle.classList = "discussion__title";
  discussionTitle.append(discussionTilte_aTag);
  elementObj.title = discussionTitle;

  //날짜
  const discussionInformation = document.createElement("div");
  //console.log(obj["createdAt"]);
  
  discussionInformation.textContent = `${obj["author"]} / ${convertTime(obj["createdAt"])}`;
  discussionInformation.classList = "discussion__information";
  elementObj.info = discussionInformation;

  //답변여부
  const IsAnswered = document.createElement("p");
  obj.answer === null ? IsAnswered.textContent = "x" : IsAnswered.textContent = "☑";
  elementObj.answer = IsAnswered;

  return elementObj;
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {

  for (let i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const render2 = (element) => {

  let objarr = JSON.parse(localStorage.getItem(localStorage.key(0)))

  if (objarr !== null) {
    for (let i = 0; i < objarr.length; i++) {
      console.log(objarr[i]);
      element.prepend(convertToDiscussion(objarr[i]));
    }
    return;
  }
};

const render3 = (element,obj) => {

  element.prepend(convertToDiscussion(obj));
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
let df = document.createDocumentFragment();
const ul = document.querySelector("ul.discussions__container");
render(df);
//render(ul);
ul.append(df);

render2(ul);

const submitBtn = document.querySelector("form.form");
submitBtn.addEventListener("submit", readInput);

function readInput(event) {
  event.preventDefault();
  const input_name_title = document.querySelectorAll("#name");
  const input_question = document.querySelector("#story");

  if (input_name_title[0].value !== "" && input_name_title[1].value !== "" && input_question.value !== "") {

    let obj = {};
    obj.createdAt = convertTime(new Date().toISOString());
    obj.title = input_name_title[1].value;
    obj.author = input_name_title[0].value;
    obj.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
    obj.content = input_question.value;
    addLocalStorage(obj);
  }
}

function addLocalStorage(obj) {

  //배열을 가져와서 그 뒤에 추가. localStorage는 key ,value 만 보장하고 순서는 보장하지 않는 문제.
  let localStoragearr = JSON.parse(localStorage.getItem(localStorage.key(0)));
  localStorage.clear();

  if (localStoragearr === null) {
    localStoragearr = [];
  }

  localStoragearr.push(obj);
  localStorage.setItem("temp", JSON.stringify(localStoragearr));
  render3(ul,obj);
}

function convertTime(time){
  let temp = time.split("T");
  let hourminsecond = temp[1].split(":");
  let second = hourminsecond[2].slice(0,2);
  let datetime = "";
  if(Number(hourminsecond[0])>12){
    datetime = `${temp[0]} 오후 ${Number(hourminsecond[0])-12}:${hourminsecond[1]}:${second}`;
  }
  else{
    datetime = `${temp[0]} 오전 ${hourminsecond[0]}:${hourminsecond[1]}:${second}`;
  }
  return datetime;
}

function pagination(){
        
}

document.querySelector(".discussion__information").textContent = convertTime(document.querySelector(".discussion__information").textContent);
