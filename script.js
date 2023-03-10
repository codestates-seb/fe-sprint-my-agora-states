// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container";//obj.id같은걸로 123번 매길수없나? // 클래스 이름 지정



  // discussion content _ 이미지
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  let data_Img = obj.avatarUrl;
  let el_Img = document.createElement("img");
  el_Img.src = data_Img;
  el_Img.classList = "discussion__avatar--image"
  // console.log(el_Img)
  avatarWrapper.appendChild(el_Img)


//discussion cotent _ 제목, url

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  
  let el_title = document.createElement("h2");
  let el_title_url = document.createElement("a");
  
  let data_title = obj.title;
  let data_url = obj.url;
  el_title_url.textContent = data_title;
  el_title_url.href = data_url;
  el_title.classList ="discussion__title";
  
  discussionContent.appendChild(el_title);;
  el_title.appendChild(el_title_url);
  

//discussion content __ 날짜아이디

  let el_information = document.createElement("div");
  let data_id = obj.author;
  let data_date = obj.createdAt.slice(0,10);
  // console.log (data_date.slice(0,10));
  el_information.textContent = `${data_id} / ${data_date} `
  el_information.classList = "discussion__information";
  discussionContent.appendChild(el_information);


  //해결여부 체크
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  let el_checked = document.createElement("p");
  let bool_check = "";

  obj.answer === null ? bool_check = "" : bool_check = "☑"; 
  // console.log(bool_check);
  el_checked.textContent = bool_check;
  // console.log(obj.answer === null);
  li.appendChild(discussionAnswered);
  discussionAnswered.appendChild(el_checked);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



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




//form


const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputText = document.querySelector("#story");
const btnSubmit = document.querySelector(".form__submit input");






function addList2(a){
  a.preventDefault();
  let b = addList (inputName.value,inputTitle.value,inputText.value);
  // console.dir(b);
  const ul = document.querySelector("ul.discussions__container");
  ul.prepend(b);
  render(ul);
}


function addList (a,b,c) {
  // console.log(discussionContent);
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container";
  
  const avatarWrapper = document.createElement("div");
  const discussionContent = document.createElement("div");
  const discussionAnswered = document.createElement("div");

  let el_Img = document.createElement("img");
  el_Img.src = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
  el_Img.classList = "discussion__avatar--image";
  // console.log(el_Img)
  avatarWrapper.appendChild(el_Img)

  let el_title = document.createElement("h2");
  let el_title_url = document.createElement("a");
  
  let data_title = b;
  let data_url = "/";
  el_title_url.textContent = data_title;
  el_title_url.href = data_url;
  el_title.classList ="discussion__title";
  
  discussionContent.appendChild(el_title);;
  el_title.appendChild(el_title_url);

////////////////////
  let el_information = document.createElement("div");
  let data_id = a;
  let data_date = new Date().toISOString();
  let data_date2 = String(data_date).slice(0,10);
  // String(data_date);
  // console.log( );
  // data_date.slice(0,10);
  // console.log (data_date.slice(0,10));
  el_information.textContent = `${data_id} / ${data_date2}`
  el_information.classList = "discussion__information";
  discussionContent.appendChild(el_information);
  

  ///////////////


  // const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  let el_checked = document.createElement("p");
  el_checked.textContent = "☑";
  
  discussionAnswered.appendChild(el_checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
  // b.value;
  // console.log

}


btnSubmit.addEventListener("click", addList2);