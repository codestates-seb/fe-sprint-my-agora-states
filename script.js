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
  img = document.createElement("img")
  img.className= "discussion__avatar--image"
  img.src = obj.avatarUrl
  img.alt = "avatar of" + obj.author;  //alt:이미지가 보이지않을때 설명이필요할때
  avatarWrapper.append(img)
  // discussion image

  let content = document.createElement("h2")
  let contentTitle = document.createElement("a")
    contentTitle.href = obj.url
    contentTitle.textContent = obj.title
  content.append(contentTitle)
  discussionContent.append(content)
  let Information = document.createElement("div")
  Information.className = "discussion__information"
  Information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-kr')}`
  discussionContent.append(Information)
  // discussion content

  let answerdP = document.createElement("p")
  answerdP.textContent=  "☑" //obj.answer ? " " : " ";
  discussionAnswered.append(answerdP)
  // Answered 체크박스


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


// 이름 , 제목 , 질문 작성 후 submit 눌렀을 때 배열에 쌓이기
const Name = document.querySelector(".form__input--name > input")
const Title = document.querySelector(".form__input--title > input")
const Question = document.querySelector(".form__textbox > textarea")
const Form = document.querySelector(".form")
//const Submit = document.querySelector(".form__submit")

Form.addEventListener('submit',(event) =>{  //submit이벤트는 html-> input type="submit"에만 적용 , 폼태그에만 적용
  event.preventDefault();  // 이벤트취소 - form submit에 필요 / 쓰는이유? submit을 쓰면 submit됨과 동시에 새로운 창이 뜬다.
  let Lastobj = {
    id : "number",
    createdAt: new Date(),
    title: Title.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author : Name.value,
    avatarUrl : "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  } //순서대로 안해도 된다. 객체이기때문에
  
  agoraStatesDiscussions.unshift(Lastobj);
  let discussion = convertToDiscussion(Lastobj)
  ul.prepend(discussion)

  Name.value= "";   // Id,password 초기화
  Title.value= ""
  Question.value= "";
}
)   // form??    submit ???