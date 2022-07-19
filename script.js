// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {//각각의 ul요소
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // const discussionAnswered = document.createElement("div");
  // discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //프로필 사진이 들어갈 <img> 요소도 추가
  const avatarImg = document.createElement('img');
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;//각각의 요소 중 사진인 속성을 넣어줌
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //제목
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const titleAnchor = document.createElement('a');
  discussionTitle.append(titleAnchor);

  titleAnchor.textContent = obj.title;
  discussionContent.append(discussionTitle);

  //글쓴이, 날짜
  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  //new Date로 날짜를 불러와서 local시간으로 변경
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  
  discussionContent.append(discussionInfo);

  // li.append(avatarWrapper, discussionContent, discussionAnswered);
  li.append(avatarWrapper, discussionContent);
  return li;
};

const title = document.querySelector('form__input--title');
const nameInput = document.querySelector('form__input--name > input');
const text = document.querySelector('form__textbox > textarea');
const form = document.querySelector('form.form')

form.addEventListener('submit', (event) => {
  //새로운 객체를 만들어야함
  //input에 입력된 값을 넣은 새로운 객체
  //새로운 객체를 ul아래로 넣어준다.
  //dom에도 추가
  event.preventDefault();

  const obj = {
      id: "id",
      createdAt: new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: nameInput.value,
      answer: null,
      bodyHTML: text.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  
  ul.append(newDiscussion);
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {//ul요소가 들어감
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //아고라 스테이츠 데이터를 DOM으로 바꿔서 ul에 계속 추가.
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");//ul의 discussions__container클래스
render(ul); //render를 해주면 뿌려줌
