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

  //image 
    li.append(avatarWrapper);
    const avatarsimg = document.createElement("img");
    avatarsimg.className = "discussion__avatar--image";
    avatarWrapper.append(avatarsimg);
    avatarsimg.src = obj.avatarUrl; //사진 링크정보
    avatarsimg.alt = "avatar of" + obj.author;
    

  

  //title
  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);
  const contentA = document.createElement("a");
  contentA.href = obj.url;   //링크정보 가져오기
  contentA.textContent = obj.title;  //텍스트정보 가져오기
  contentTitle.append(contentA);
 
  //information
  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  discussionContent.append(contentInformation); 
  contentInformation.textContent = `${obj.author} | ${new Date(obj.createdAt).toLocaleString()}`;



  
  //checkpoint
  li.append(discussionAnswered);
  const checkpoint = document.createElement("p");
  discussionAnswered.append(checkpoint);
  checkpoint.textContent = '☑';

  

const ul = document.createElement("ul.discussions__container");
ul.append(li);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return ;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
