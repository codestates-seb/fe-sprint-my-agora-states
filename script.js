// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

console.log(agoraStatesDiscussions);

  //discussion 추가기능 
  //이름과 타이틀, 내용을 입력하고, submit을 누르면,
  //배열에 객체를 생성하고,
  //이름고 타이틀에 맞는 요소 agoraStatesDiscussions에 
  // clickSubmit.preventDefault();
  let clickSubmit = document.querySelector(".form__submit > input");
  clickSubmit.addEventListener("click", function() {
    console.log("버튼이 클릭 됐습니다.");
  
    let inputName = document.querySelector(".form__input--name > input");
    let inputTitle = document.querySelector(".form__input--title > input");
    // let textArea = document.querySelector("textarea")
    
    let obj1 = {}  
    obj1.author = inputName.value;
    obj1.title = inputTitle.value;
    obj1.createdAt = "";
    obj1.avatarUrl = "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
    obj1.url = "https://github.com/codestates-seb/agora-states-fe/discussions/45"
    agoraStatesDiscussions.unshift(obj1);
    return agoraStatesDiscussions;
  })


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
function convertToDiscussion(obj) {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //이미지 담기 
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avator of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  //질문 내용 담기 
  const discussionTitle = document.createElement("h2");
  const discussionInfo = document.createElement("div");
  const discussionHyper = document.createElement("a");

  discussionHyper.href = obj.url;
  discussionHyper.textContent = obj.title; //a태그안에 있는 textContent이기 때문에.
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;


  discussionTitle.append(discussionHyper);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInfo);

  //answerer상자 
  const checkbox = document.createElement("p");
  // const balletBox = document.
  checkbox.textContent = '☑'; //"<span>&#9745;</span>"
  discussionAnswered.append(checkbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}




// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element.innerHTML=""
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
