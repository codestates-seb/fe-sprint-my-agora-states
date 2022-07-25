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
  
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = 'discussion__avatar--image';
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.classList = 'discussion__title';

  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  const discussionInformation = document.createElement('div');
  discussionInformation.classList = "discussion__information";
  discussionInformation.textContent = obj.author +' / ' + new Date(obj.createdAt).toLocaleString();
  
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);
  
  if(obj.answer !== null){
  const answerIcon = document.createElement('i');
  answerIcon.classList = 'fa-solid fa-check fa-2x';
  discussionAnswered.append(answerIcon);
  };

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//입력 관련 
  const form = document.querySelector('form.form');
  const inputName = document.querySelector('div.form__input--name > input');
  const inputTitle = document.querySelector('div.form__input--title > input');
  const inputQuestion = document.querySelector('div.form__textbox > textarea');
// 서브밋 눌렀을때  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const obj = {
      id: "ID",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: inputName.value,
      answer: null,
      bodyHTML: inputQuestion.value,
      avatarUrl: 'mandarin.jpg',
    }

    agoraStatesDiscussions.unshift(obj);
    contents.prepend(convertToDiscussion(obj));
    inputName.value = "";
    inputTitle.value = "";
    inputQuestion.value = "";
    return;
  });
// 버튼 만들기
  const makeButton = (i) =>{
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = i;
    button.innerText = i;
    button.addEventListener("click",(e) => {
      Array.prototype.forEach.call(button.children, (button) => {
        if (button.dataset.num) {button.classList.remove("active")};
      });
      e.target.classList.add("active");
      renderContent(parseInt(e.target.dataset.num));
    });
    return button;
  };
//버튼,페이지 만들기 위해 선언
  const contents = document.querySelector("ul.discussions__container");
  const buttons = document.querySelector("div.buttons");

  const numOfContent = agoraStatesDiscussions.length;
  const maxContent = 10;
  const maxButton = 5;
  const maxPage = Math.ceil(numOfContent/(maxContent));
  let page = 1;
//콘텐츠 랜더링 함수
  const renderContent = (page) => {
    while(contents.hasChildNodes()){
      contents.removeChild(contents.lastChild);
    }
  
    for(let i = (page -1) * maxContent ; i < page * maxContent && i <= numOfContent; i++){
      contents.appendChild(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }
//버튼 랜더링 함수
  const renderButton = (page) =>{
    for(let i = page; i < page + maxButton && i <= maxPage; i++){
      buttons.appendChild(makeButton(i));
    }

    buttons.children[0].classList.add("active");


    // if(page - maxButton < 1) buttons.removeChild(prev);
    // if(page + maxButton > maxPage) buttons.removeChild(next);
  };
//페이지 랜더링 함수
  const renderPage = (page) => {
    renderContent(page);
    renderButton(page);
  };
//페이지 랜더링 함수 실행으로 버튼과 콘텐츠 랜더링 함수 실행
  renderPage(page);

  // 페이지 이동에 필요한 버튼 생성
  // const goPrevPage = () => {
  //   page -= maxButton;
  //   renderPage(page);
  // };

  // const goNextPage = () => {
  //   page += maxButton;
  //   renderPage(page);
  // };
  
  // const prev = document.createElement("button");
  // prev.classList.add("button","prev");
  // prev.innerText = '이전';
  // prev.addEventListener("click", goPrevPage);

  // const next = document.createElement("button");
  // next.classList.add("button", "next");
  // next.innerText = '이후';
  // next.addEventListener("click", goNextPage);

  // buttons.prepend(prev);
  // buttons.append(next);

   
