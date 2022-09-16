// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container flex justify-between bg-white overflow-hidden hover:bg-red-100 border border-gray-200 p-1"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content  grow px-10";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered flex items-center	";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  avatarImg.className = "w-10 rounded-full"
//title
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);
  //링크
  const contentLink = document.createElement('a');
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);
  //정보
  const contentInformation = document.createElement('div');
  contentInformation.className = "discussion__information text-right text-xs mb-1";
  contentInformation.textContent = obj.author;
  discussionContent.append(contentInformation);

  //체크박스
  const contentAnswered = document.createElement('p');
  contentAnswered.className = "discussion__answered flex items-center	 ";
  discussionAnswered.append(contentAnswered);
  if( obj.answer ===null ){
    contentAnswered.innerHTML = '<input type="checkbox" name="xxx" disabled>';
  }else{
    contentAnswered.innerHTML = '<input type="checkbox" name="xxx" checked disabled>';
  }
  contentInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`;



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

// b r
const ul = document.querySelector("ul.discussions__container");
render(ul);


const form = document.querySelector(".form__container");
const author = form.querySelector("#name");
const title = form.querySelector("#title");
const textbox = form.querySelector("#story");

// submit을 클릭하면 자료를 가져온다

form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함
  const obj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }


  agoraStatesDiscussions.unshift(obj);

  const discussion = convertToDiscussion(obj);
  
  ul.prepend(discussion);

})

