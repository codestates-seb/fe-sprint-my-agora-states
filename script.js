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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 두번째 컨테이너에 이미지를 생성해 주었다.
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('discussion__avatar--image')
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    // 두번째 컨테이너에 제목인 링크테그를 생성해 주었다.
    const avatarTitle = document.createElement('h2');
    avatarTitle.classList.add('discussion__title'); 
    const avatarTitleLink = document.createElement('a');
    avatarTitleLink.href = obj.url
    avatarTitle.append(avatarTitleLink);
    avatarTitleLink.textContent = obj.title;
    discussionContent.append(avatarTitle);

    // 두번째 컨테이너에 information 을 생성해 주었다.
    const avatarInformation = document.createElement('div');
    avatarInformation.classList.add('discussion__information')
    avatarInformation.textContent = `${obj.author }/ ${ obj.createdAt}`;
    discussionContent.append(avatarInformation);

    // 두번재 컨테이너에 체크이미지를 생성해 주었다.
    const avatarCheckboxImg = document.createElement('p');
    avatarCheckboxImg.classList.add('discussion__answered')
    avatarCheckboxImg.textContent = '☑'
    discussionAnswered.append(avatarCheckboxImg);

    // 두번째 컨테이너까지 다 만들었다. 이제 반복문을 어떻게 써워야 할지 고민을 해봐야 겠다. 

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


// const avatarImg1 = document.createElement('img');
// avatarImg1.src = agoraStatesDiscussions[1].avatarUrl;
// avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[1].author;
// avatarWrapper.append(avatarImg1);

// const avatarImg = document.createElement('img');
// avatarImg.src = obj.avatarUrl;
// avatarImg.alt = "avatar of" + obj.author;
// avatarWrapper.append()
