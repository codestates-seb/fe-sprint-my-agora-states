// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {

  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {

    const convertToDiscussion = (obj) => {
      const li = document.createElement("li");
      li.className = "discussion__container";

      const avatarWrapper = document.createElement("div");
      avatarWrapper.className = "discussion__avatar--wrapper";
      const discussionContent = document.createElement("div");
      discussionContent.className = "discussion__content";
      const discussionAnswered = document.createElement("div");
      discussionAnswered.className = "discussion__answered";

      const avatarImg = document.createElement('img');
      avatarImg.className = 'discussion__avatar--image';
      avatarImg.src = agoraStatesDiscussions[i].avatarUrl;
      avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[i].author;
      avatarWrapper.append(avatarImg);

      const contentTitle = document.createElement('h2');
      contentTitle.className = 'discussion__title';
      const contentUrl = document.createElement('a');
      contentUrl.href = agoraStatesDiscussions[i].url;
      contentUrl.textContent = agoraStatesDiscussions[i].title;
      contentTitle.append(contentUrl);
      discussionContent.append(contentTitle);

      const contentInformation = document.createElement('div');
      contentInformation.className = "discussion__information";
      contentInformation.textContent = agoraStatesDiscussions[i].author + " / " + agoraStatesDiscussions[i].createdAt;
      discussionContent.append(contentInformation);

      const contentIsAnswered = document.createElement('p');
      contentIsAnswered.textContent = agoraStatesDiscussions[i].answer ? 'o' : 'x';
      discussionAnswered.append(contentIsAnswered);
      // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

      li.append(avatarWrapper, discussionContent, discussionAnswered);
      return li;
    };


    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submitBtn = document.querySelector('#submit');

// 버튼을 누르면 agoraStatesDiscussions 배열에 객체가 추가됩니다.
const newAgoraStatesDiscussions = submitBtn.addEventListener('click', () => {
  const inputName = document.querySelector('#name');
  const inputTitle = document.querySelector('#title');
  const inputStory = document.querySelector('#story');
  const date = new Date();
  let newObj =
  {
    createdAt: date,
    title: inputTitle.value,
    author: inputName.value,
    bodyHTML: inputStory.value,
  }
  agoraStatesDiscussions.unshift(newObj);
  console.log(agoraStatesDiscussions);

});



