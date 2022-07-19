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
  const discussionAnswered = document.createElement("div"); // 답변 여부
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  // avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  // avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h2');
  // contentTitle.className = 'discussion__title';
  // discussionContent.append(contentTitle);
  const contentLink = document.createElement('a');
  // contentLink.href = obj.url; //obj.url?
  contentLink.textContent = obj.title; //내용의 각 질문들의 title이 나옴
  contentTitle.append(contentLink); // h2에 a가 들어가 있다.

  const contentInfo = document.createElement('div');
  contentInfo.textContent = `${obj.author} / ${obj.createAt}` // new Date(obj.createAt).toLocaleString()
  discussionContent.append(contentTitle, contentInfo);

  // contentInfo.className = 'discussion__information';
  // contentInfo.textContent = obj.author; //만약 clink하면 obj.answer를 불러오면 된다
  // discussionContent.append(contentInfo); 

  const checkAnswered = document.createElement('p');
  discussionAnswered.append(checkAnswered);
  obj.answer?(checkAnswered.textContent = "☑") : (checkAnswered.textContent = "☒");
  

//새로운 li 요소가 된다.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

  const form = document.querySelector('form.form') // form. 클래스명
  const title = document.querySelector('div.form__input--title > input')
  const nameInput = document.querySelector('div.form__input--name > input')
  const textbox = document.querySelector('div.form__textbox > textarea')
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않는다
    //새로운 객체를 만들어야 한다.
    // Input에 입력된 값을 넣은 새로운 객체.
    // 새로운 객체를 ul요소 아래로 넣어준다.
    // 더미 데이터(agoraStatesDis..)에도 추가
    const obj = {
      id : "unique id",
      createAt : new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: nameInput.value,
      answer: null,
      bodyHTML : textbox.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",

    }
    agoraStatesDiscussions.unshift(obj);
    const newDiscussion = convertToDiscussion(obj)
    ul.prepend(newDiscussion)
  })
  
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// element = ul
const render = (element) => {
  // ul요소 들어오기
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // converToDiscussiton : 배열안의 객체 형태의 데이터를
    // dom으로 바꿔서 렌더링(반복)
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // render 함수 호출



