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

  //avatarImg
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //title
  const titleText = document.createElement('h2');
  titleText.className = 'discussion__title';
  discussionContent.append(titleText);

  //title > a
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  titleText.append(titleLink);

  //information
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  //answer
  const answerBox = document.createElement('p');
  discussionAnswered.className = 'discussion__answered';
  if(obj.answer === null){
    //answer 값이 nell이면 x표시
    answerBox.textContent = '답변 대기☒';
  }else{
    //아니라면 check표시
    answerBox.textContent = '답변 완료☑';
  }
  discussionAnswered.append(answerBox);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

  const form = document.querySelector('form.form');
  const inputName = document.querySelector('.form__input--name input');
  const inputTitle = document.querySelector('.form__input--title input');
  const inputQustion = document.querySelector('.form__textbox textarea');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const obj = {
      id: "999",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: inputName.value,
      answer: null,
      avatarUrl: 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
      bodyHTML: inputQustion.value,
    }

    //기존 데이터 가장 앞에 추가
    agoraStatesDiscussions.unshift(obj);
    ul.prepend(convertToDiscussion(obj));
  });

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
