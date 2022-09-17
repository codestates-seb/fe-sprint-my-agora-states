// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {    //    객체를 매개변수로 받음
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //아바타
  const avatarImg = document.createElement('img')
  avatarImg.classList.add('discussion__avatar--image')
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg)

  //제목
  const titleAncor = document.createElement('a')
  titleAncor.classList.add('titleInfo')
  titleAncor.textContent = obj.title;
  titleAncor.href = obj.url
  discussionContent.append(titleAncor)

  //작성자
  const discussionInfo = document.createElement('div')
  discussionInfo.textContent = "작성자 : " + obj.author + " / " + "작성시간 : " + obj.createdAt;
  discussionContent.append(discussionInfo)

  //체크박스
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '✔︎' : '✘'

  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


//이벤트 리스너
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault()  //  새로고침 안됨

  let now = new Date();
  let nowYear = now.getFullYear(); // 년
  let nowMonth = now.getMonth() + 1; // 월
  let nowDate = now.getDate(); // 월
  let nowHour = now.getHours(); // 시간
  let nowMinutes = ("0" + now.getMinutes()).slice(-2); // 분

  const obj = {
      id: 'unique.id',
      createdAt: 
      nowYear +
      " - " +
      nowMonth +
      " - " +
      nowDate +
      " " +
      nowHour +
      " : " +
      nowMinutes,
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: author.value,
      answer: null,
      bodyHTML: textbox.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    }
  // 그 객체를 convertTodiscuttion에 넣어서 Dom으로 
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj)
  ul.prepend(newDiscussion)
  title.value = '';
  author.value = '';
  textbox.value = ''
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {    //   렌더 함수
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {   //  i번째 있는 요소를 convertToDiscusstion에 전달해서 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);