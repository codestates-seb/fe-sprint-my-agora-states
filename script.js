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
  

  const avatarImg = document.createElement("img");
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  const discussionContent_title = document.createElement("h2");
  discussionContent_title.className = "discussion__title";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.innerHTML = `${obj.author}` + '.'+ `${new Date().toISOString()}`;

  discussionContent.append(discussionContent_title, discussionInformation);


  const discussionContent_title_link = document.createElement("a");
  discussionContent_title.append(discussionContent_title_link);

 
  const checked = document.createElement("p");
  // checked.src = `p/${heart}`;
  checked.innerHTML = obj.answer;
  discussionAnswered.append(checked);
 
  discussionContent_title_link.href = obj.url;
  discussionContent_title.textContent = obj.title;
 

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


const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
const submitBTN = document.querySelector('#subBtn');



submitBTN.addEventListener('submit', function () {
  agoraStatesDiscussions.prepend(
    {
      id: inputName.value,
      title: inputTitle.value
    }
  )
  console.dir(agoraStatesDiscussions);
  render(ul);

  return;
})



