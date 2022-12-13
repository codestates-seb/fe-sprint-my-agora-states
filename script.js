// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// // convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// const convertToDiscussion = (obj) => {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  

//   ///discussion__avatar--wrapper
//   const avaImg = document.createElement("img") 
//   avaImg.className ="discussion__avatar--image";
//   avaImg.src = obj.avatarUrl;
//   avaImg.alt = "avatar of" + obj.author;
//   avatarWrapper.append(avaImg);

//   //discussion__content
//   const titleDiv= document.createElement("h2");
//   titleDiv.className = "discussion__title";
//   const titleLink = document.createElement("a");
//   const info = document.createElement("div");
//   info.className = "discussion__information";

//   titleLink.href = obj.url;
//   titleLink.textContent = obj.title;
//   info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`

//   titleDiv.append(titleLink);
//   discussionContent.append(titleDiv,info);

//   //discussion__answered

//   const ans = document.createElement("p");
//   ans.textContent = obj.answer ? '☑' : 'x';
//   discussionAnswered.append(ans);

//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

// const doForm = document.querySelector("form.form")
// const inputName = document.querySelector("div.form__input--name > input");
// const inputTitle = document.querySelector("div.form__input--title > input");
// const inputStory = document.querySelector("div.form__textbox > textarea");

// doForm.addEventListener("submit", Do);

// function Do (event){
//   event.preventDefault();

//   const obj={
//     id: "0000",
//     createdAt: new Date(),
//     title: inputTitle.value,
//     url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
//     author: inputName.value,
    
//     bodyHTML:inputStory.value,
      
//     avatarUrl:"https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
//   }
  
//   agoraStatesDiscussions.unshift(obj);

//   const discussion = convertToDiscussion(obj);
//   ul.prepend(discussion);
  
//   inputName.value='';
//   inputTitle.value='';
//   inputStory.value='';
// }



// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// //ul 아래 모든 li가 나옴...
// const ul = document.querySelector("ul.discussions__container");
// render(ul);

fetch('http://localhost:4000/discussions')
.then(res => res.json())
.then(json =>{
  agoraStatesDiscussions = json;
  const ul = document.querySelector("ul.discussions__container");
  render(ul);
})

