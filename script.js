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

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarWrapper.append(avatarImg);
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

  const Title1 = document.createElement('h2');
  Title1.className = 'discussion__title';
  discussionContent.append(Title1);
  const Title2 = document.createElement('a')
  Title1.append(Title2);
  Title2.href = obj.url;
  Title2.textContent = obj.title;

  const information = document.createElement('div');
  information.className = 'discussion__information'
  discussionContent.append(information);
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`

  const checked = document.createElement("p");
  discussionAnswered.append(checked);
  checked.textContent = obj.answer ? "☑︎" : "☒";


  // 답변 클릭이벤트
  const open = document.querySelectorAll(".discussion__answered p");
  open.forEach((open, index) => {
    const answer = document.querySelector(".anwser")
    open.onclick = () => {
      if (answer.style.display !== 'block') {
        answer.style.display = 'block';
        console.log('true');
      }
      else {
        answer.style.display = 'none';
        console.log('false')
      }
      console.log(index);
    }
  });


  const discussionbox = document.createElement('div')
  discussionbox.className = "discussion_box";
  const anwser = document.createElement('div')
  anwser.className = "anwser";
  const anwser_name = document.createElement('div')
  anwser_name.className = "anwser_name";
  const anwser_url = document.createElement('div')
  anwser_url.className = "anwser_url";
  const anwser_content = document.createElement('div')
  anwser_content.className = "anwser_content";
  anwser.append(anwser_name,anwser_url,anwser_content)
  
  anwser_name.textContent = obj.author;
  anwser_url.textContent = obj.url;
  anwser_content.textContent = obj.bodyHTML;
  
  discussionbox.append(li)
  discussionbox.append(anwser)
  return discussionbox;
};

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.querySelector("#name").value;
  const title = form.querySelector("#title").value;
  const textbox = form.querySelector("#textbox").value;

  const newObj = {
    id: "new id",
    createdAt: new Date(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
    author: name,
    bodyHTML: textbox,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }
  
  agoraStatesDiscussions.unshift(newObj);
  
  const discussion = convertToDiscussion(newObj);
  
  ul.prepend(discussion);
  
  form.querySelector("#name").value = "";
  form.querySelector("#title").value = "";
  form.querySelector("#textbox").value = "";


  // localStorage
  const objString = JSON.stringify(newObj);
  window.localStorage.setItem('id', objString);
  const personString = window.localStorage.getItem('id');
  const personObj = JSON.parse(personString);
  console.log(personObj)
}
)

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



// a태그에 타겟 블랭크 주기..
window.onload = function () {
  let anchors = document.querySelectorAll('a');
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].setAttribute('target', '_blank');
  }
}


// 
