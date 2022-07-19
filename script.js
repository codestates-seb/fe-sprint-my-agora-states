//html에서 바꾼 부분 <input type="submit" value="submit"> 



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

  //1. 이미지 불러오기
  const avatarImg = document.createElement('img');  
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //3. 타이틀과 내용
  const title = document.createElement('h2');
  title.className = "discussion__title" //클래스 네임 꼭 필요?
  // title.innerText = agoraStatesDiscussions[0].title;
  discussionContent.append(title);

  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);

  const infomation = document.createElement('div');
  infomation.className = "discussion__information";
  infomation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; 
  discussionContent.append(infomation);

  //4. 답변완료 여부 체크 박스
  const answered = document.createElement('p')
  answered.textContent = "☑";
  //못품.........
  discussionAnswered.append(answered)
  

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //2. ul에 li를 붙이기

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//새로운 디스커션 추가 기능!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//새로운 디스커션은 요소에서 어떻게 생겼는지 확인하기.
//form태그가 크게 2개로 나누어짐. 인풋요소들 $ 서브밋버튼 영역
//인풋요소들(form__input--wrapper)는 크게 3부분으로 나누어짐. 이름(form__input--name), 제목(form__input--title), 질문(form__textbox)
//이름은 label태그와 input태그로 구성됨. 제목도 동일. 질문은 라벨태그와 텍스트에리어로 구성됨.
//새로운 디스커션 추가 기능 구현을 위해 html에서 form요소를 돔으로 가지고 옴
const form = document.querySelector('form.form')//'form.form'은 폼태그의 클래스 폼
const inputName = document.querySelector('div.form__input--name > input')
const inputTitle = document.querySelector('div.form__input--title > input')
const inputQuestion = document.querySelector('div.form__textbox > textarea')

//form에 이벤트리스너를 적용함
//폼에서 서브밋이라는 이벤트가 발생하면, 새로운 디스커션이 추가 되어야 함
form.addEventListener("submit", (event) => {
  event.preventDefault(); //새로운 페이지로 렌더링되는 것을 막음?
  //새로운 객체를 만들어야 함
  //input에 입력된 값(value)을 넣은 새로운 객체
  //새로운 객체를 ul요소 아래로 넣어준다
  //더미데이터에도 추가한다

  const obj = {
    id: 'unique id',
    createdAt: new Date().toLocaleString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
  }
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj)  //이해안감ㅜㅜ
  ul.prepend(newDiscussion)
})


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);//렌더함수 실행될 것, 호출하면서 끝난다. 호출했을 때? 전달인자는 ul -> 디스커션 컨테이너