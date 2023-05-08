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

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion_information";
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.


  const img_tag = document.createElement('img'); // -> <img></img>
  //img 요소 생성
  img_tag.className = "discussion__avatar--image"; // -> <img class = discussion__avatar--image> </img>
  //클래스 이름 지정
  img_tag.setAttribute('src', obj.avatarUrl); // -> <img class = discussion__avatar--image src = obj.avatarUrl></img>
  //속성 이름은 src, 속성값은 obj.avatarUrl 
  avatarWrapper.append(img_tag);
  //append() : 컨텐츠를 선택된 요소 내부의 끝 부분에서 삽입

   //title
  const h2_tag = document.createElement('h2'); // -> <h2> </h2>
   //h2 요소 생성
  const a_tag = document.createElement('a'); // -> <a> </a>
   //a 요소 생성
  a_tag.setAttribute('href', obj.url); // -> <a href = obj.url> </a>
   //속성 이름은 href, 속성값은 obj.url
  a_tag.textContent = obj.title; // < a href = obj.url > obj.title < /a>
   //텍스트 값을 읽어온다.
  h2_tag.append(a_tag); //<h2> < a href = obj.url > obj.title < /a> </h2> 
   //a_tag를 선택된 요소 내부의 끝 부분에 삽입한다.
  discussionContent.append(h2_tag); // -> < div class = discussion__content > <h2> < a href = obj.url > obj.title < /a> </h2>  </div>
   //h2_tag를 선택된 요소 내부의 끝 부분에 삽입한다.

  const div_tag = document.createElement('div');
  div_tag.className = "discussion__information";

  const information_font_tag = document.createElement('font');
  information_font_tag.setAttribute('style', "vertical-align: inherit;");

  const information_font_tag2 = document.createElement('font');
  information_font_tag2.setAttribute('style', "vertical-align: inherit;");

  information_font_tag2.textContent = obj.author + " / " + obj.createdAt;

  information_font_tag.append(information_font_tag2);
  div_tag.append(information_font_tag);
  discussionInformation.append(div_tag);
  discussionContent.append(discussionInformation);

  const p_tag = document.createElement('p');
  //p 요소 생성
  p_tag.textContent = "☑";
  //텍스트 값을 읽어온다.
  discussionAnswered.append(p_tag);
  //p_tag를 선택된 요소 내부의 끝 부분에 삽입한다.

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

// input을 불러와야 한다.
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log('submit 이벤트 발생했다!!')
  console.log(author.value, title.value, textbox.value)

  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  // agoraStatesDiscussions 객체 추가
  agoraStatesDiscussions.unshift(obj);

  // 화면 다 지우고 
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  render(ul);

  // 사실은.. 
    // HTML 파일을 새로 받아오는 시절이 있었다.
    // 폼 제출을 하면 완전히 새로운 HTML 파일을 받아와야 했다. => 새로고침
})

