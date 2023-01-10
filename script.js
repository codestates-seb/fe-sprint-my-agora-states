// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // <img class="discussion__avatar--image" 
  // src="https://avatars.githubusercontent.com/u/12145019?s=64&amp;u=5c97f25ee02d87898457e23c0e61b884241838e3&amp;v=4" 
  // alt="avatar of kimploo"></img>
  //얼굴 
  const avatarImg = document.createElement('img');
  //img 삽입
  avatarImg.src = obj.avatarUrl;
  //<img> alt 덕분에
  avatarImg.alt = 'avatar of' + obj.author;
  //append
  avatarWrapper.append(avatarImg);


/* <a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a> */

//질문
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
//h2 
  const content_H2 = document.createElement('h2')
  content_H2.className = "discussion__title"
//a
  const content_A = document.createElement('a')
  content_A.href = obj.url;
  content_A.textContent = obj.title
  content_H2.append(content_A)
  discussionContent.append(content_H2)
  // //href -> url
  // content.href = obj.url;
  // //textContent = title
  // content.innerText = obj.title;
  // //append

  //info 
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information" 
  discussionInformation.textContent = obj.author
  
  discussionContent.append(discussionInformation)



  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  //버튼
  const Answered = document.createElement('p')
  Answered.textContent = obj.Answer ? "☑" : "☑";
  discussionContent.append(Answered)
  




  // const disAnswer = document.createElement('p');









  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
  
};

//agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return ;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
