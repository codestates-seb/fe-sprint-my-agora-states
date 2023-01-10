// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

//사진
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const photo = document.createElement('img')
  //사진 =avatarURL;
  //alt= author
  photo.src = obj.avatarUrl;
  photo.alt = 'avatar of' + obj.author;
  avatarWrapper.append(photo);

  //가운데내용
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  //생성했고 
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  //author / createdAt
  // toLocaleDateString() 
  // new Date(obj.createdAt).toLocaleTimeString()
  discussionContent.append(discussionTitle, discussionInformation);


  //끝에 표시
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  const checked = document.createElement("p");
   
 checked.textContent = obj.answer ? "☑" : "x" ;

 discussionAnswered.append(checked);

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
