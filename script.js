// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 이 함수의 목적 : li 뭉치를 만든다 
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image"
    //우리가 가지고 있는 데이터에서 아바타 이미지를 가져옴. 
  avatarImg.src = obj.avatarUrl; // 각각의 요소를 obj로 갖고 있음. 주소를 불러옴
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 다음, content 안에 div 와 h2 가 있음
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleHref = document.createElement("a");
  titleHref.href = obj.url;
  titleHref.textContent = obj.title;
  discussionTitle.append(titleHref);
  
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; 
  //toLocaleString 외에도 다양한 날짜 형식 있으니 확인


  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);






  const ul = document.querySelector("ul.discussions__container");
  
  ul.append(li);





  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
  

  const form = document.querySelector('form.form');
  const title = document.querySelector('div.form__input--title > input') 
  const nameInput = document.querySelector('div.form__input--name > input')
  const textbox = document.querySelector('div.form__textbox > textarea')
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // 새로운 객체를 만들어야 한다.
    // input 에 입력된 값 (value)를 넣은 새로운 객체, 
    // 새로운 객체를 ul 요소 아래로 넣어준다
    // 더미 데이터 (agoraStatesDiscussions) 에도 추가해준다.
    const obj = {
      id: "unique id",
      createdAt: new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: nameInput.value,
      answer: null,
      bodyHTML:
      textbox.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
      }


     // 더미데이터 앞으로 추가해줌
    agoraStatesDiscussions.unshift(obj);
    const newdiscussion = convertToDiscussion(obj)
    
    ul.prepend(newdiscussion)
    });

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element에는 ul 이 들어옴
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    //41개를 반복적으로 dom 을 append 해줌 
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container"); // 디스커션스 컨테이너를 가져와서 ul에 담아줌 
render(ul); // render : 브라우저에 화면을 그리는 작업 . render함수 호출 


// form 요소 안에 여러 input들이 있고 submit 도 있다 
