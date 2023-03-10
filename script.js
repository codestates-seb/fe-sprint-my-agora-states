// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.table(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAuthor = document.createElement("div");
  discussionAuthor.className = "discussion__author";
  const discussionTitle = document.createElement("a");
  discussionTitle.className = "discussion__title";
  const discussionQuestion= document.createElement("div");
  discussionQuestion.className="discussion__question";
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement("img");
  avatarImage.src= obj.avatarUrl;
  avatarImage.alt = "avatar of " + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImage);

  discussionAuthor.textContent=obj.author;
  discussionTitle.href=obj.url;
  discussionTitle.textContent=obj.title;
  discussionInfo.textContent=`${new Date(obj.createdAt).toLocaleString()}`;
  discussionQuestion.innerHTML=obj.bodyHTML;
  
  const answeredCheck = document.createElement('p');
  answeredCheck.textContent= obj.answer ? '☑' : ' ';
  discussionAnswered.append(answeredCheck);
  discussionContent.append(discussionAuthor);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionQuestion);
  discussionContent.append(discussionInfo);


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



// 새 포스트를 누르면 질문 입력창 생성
const enterNewPost = document.querySelector('.search-tab__new-post');
const formGenerated = document.querySelector('.newPost-container');
let cnt=0;

enterNewPost.addEventListener('click', (event) => {
  cnt=cnt+1;
  if(cnt%2!==0){
    // formGenerated.classList.remove('hide');
    formGenerated.innerHTML=formLayout[0];
  }
  else {
    // formGenerated.classList.add('hide');
    formGenerated.innerHTML='';
  }
});

// const closeButton = document.querySelector('.close-Button');
// if (formGenerated.innerHTML!==null){
// closeButton.addEventListener('click',()=>{
//   formGenerated.innerHTML='';
// });
// }

// 새포스트 눌려있을때만 작동.
const newPost = document.querySelector(".form");
const newAuthor = document.querySelector("#name");
const newTitle = document.querySelector("#title");
const newInfo = document.querySelector("#story");


if (newPost.innerHTML!==null){

newPost.addEventListener('submit', (event) => {
  event.preventDefault();
  const newObj={
    id: "unique num",
    createdAt: new Date(),
    title: newTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/7",
    author: newAuthor.value,
    answer: {
      id: "DC_kwDOHOApLM4AKBjx",
      createdAt: "2022-04-25T08:10:47Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/7#discussioncomment-2627825",
      author: "kwd8905",
      bodyHTML:
        '<p dir="auto"><a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/namwonjae/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/namwonjae">@namwonjae</a> 님 안녕하세요!<br>\n코드스테이츠 교육 엔지니어 곽운도입니다. 🙌🏻</p>\n<p dir="auto">콘텐츠 오류를 신속하게 제보해 주셔서 감사 드립니다!<br>\n말씀해 주신 내용은 현재 정정 완료하였습니다.</p>\n<p dir="auto">다시 한 번 감사드립니다.</p>\n<p dir="auto">코드스테이츠 교육 엔지니어<br>\n곽운도 드림</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79880249?s=64&v=4",
    },
    bodyHTML: newInfo.value
      ,
    avatarUrl: "https://avatars.githubusercontent.com/u/96907839?s=64&v=4",
  };
  ul.prepend(convertToDiscussion(newObj));
  event.target.reset();
})
}