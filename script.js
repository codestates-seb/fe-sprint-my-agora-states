// window.localStorage.getItem()
const ul = document.querySelector("ul.discussions__container");
const ul2 = document.querySelector(".discussions__container_noitce");
const from = document.querySelector(".form__container");
const userName = document.querySelector("#name");
const newStory = document.querySelector("#story");
let localStortgeKey = 0

 //localStorage에 있는 모든 todoItem 식별자 가져오기
const allItemKeys = Object.keys(sessionStorage).sort(function(a, b)   {
  return a - b;
});
const allItemValues = Object.values(sessionStorage);



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion_notice = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussions__container_inner_notice"; // 클래스 이름 지정
    const noticeName = document.createElement("div");
    noticeName.className = "noticeName";
    noticeName.innerText = "학습 방향 및 기타"

    const kimploo = document.createElement("span");
    kimploo.className = "kimploo";
    kimploo.innerText = "BeomJoon"

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper_notice";
  
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content_notice";
  
    const avatarImg = document.createElement('img');
    const title = document.createElement('h2');
    title.className = 'discussion__title_notice';
    const titleLink = document.createElement("a");
    titleLink.href = obj.url;
    titleLink.innerText = obj.title;
  
    
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of' + obj.author;
    avatarWrapper.append(avatarImg);
    li.append(noticeName, discussionContent,avatarWrapper,kimploo);
  
    title.append(titleLink);
    discussionContent.append(title);

    return li;
};
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussions__container_inner"; // 클래스 이름 지정
  
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
  
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";

    const userId = document.createElement("span");
    userId.className = "userId"
    userId.innerText = `#${obj.id}`;

    const quetionTime = document.createElement("span");
    quetionTime.className = "quetionTime"
    quetionTime.innerText = `${obj.createdAt.replace(/\T/g, "  ").slice(0,-1)}`
  
    const discussionImformation = document.createElement("span");
    discussionImformation.append(userId,quetionTime)
    discussionImformation.className = "discussion__information"
  
  
    const avatarImg = document.createElement('img');
    const title = document.createElement('h2');
    title.className = 'discussion__title';
    const titleLink = document.createElement("a");
    titleLink.href = obj.url;
    titleLink.innerText = obj.title;
  
    
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of' + obj.author;
    avatarWrapper.append(avatarImg);
    li.append(avatarWrapper, discussionContent);
  
    title.append(titleLink);
    discussionContent.append(title);
    discussionContent.append(discussionImformation)
    return li;
};



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length-6; i ++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const render2 = (element) => {
  for (let i = agoraStatesDiscussions.length-1; i > 35; i --) {
    element.append(convertToDiscussion_notice(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.





render(ul);
render2(ul2);


from.addEventListener("submit",(event)=>{
  event.preventDefault();
  
  const newObj = {
    id: userName.value,
    createdAt: "2022-05-15T23:57:43Z",
    title: newStory.value,
    avatarUrl:"https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
    key: localStortgeKey
  }
  ul.append(convertToDiscussion(newObj));
  window.sessionStorage.setItem(userName.value,newStory.value)
})

const ImportList = ()=>{
  for(let i = 0; i<allItemKeys.length; i++){
    const newObj = {
      id: allItemKeys[i],
      createdAt: "2022-05-15T23:57:43Z",
      title: allItemValues[i],
      avatarUrl:"https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
    }
    ul.append(convertToDiscussion(newObj));
  }
}

ImportList();
  