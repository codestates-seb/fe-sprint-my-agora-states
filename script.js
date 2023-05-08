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

  //매개변수 obj의 속성을 변수에 할당
  const AVATAR_URL = obj.avatarUrl
  const TITLE = obj.title
  const URL = obj.url
  const AUTHOR = obj.author
  const CREATED_AT = obj.createdAt
  const ANSWER = obj.answer


  //avatarWrapper: avatarUrl  
  //avatarWrapper에 el 추가
  const avatarImage = document.createElement('img')
  avatarImage.src = AVATAR_URL
  avatarImage.alt = '사용자_아바타_이미지'
  avatarImage.classList.add("discussion__avatar--image")

  // 아바타 추가
  avatarWrapper.append(avatarImage)


  //discussionContent: title url author createdAt  bodyHTML  id
  //제목 링크를 위한 a 태그 생성
  const el_p = document.createElement('a')
  el_p.href = URL
  el_p.textContent = TITLE


  // TITLE(discussion title이 '[notice] 가 포함되어 있으면 discussion ul 에 넣지 않고 상단 notice compo에 배치한다')


  // h2 생성
  const discussionTitle = document.createElement("h2");
  //i
  discussionTitle.classList.add('discussion__title')

  // h2 <- p 삽입
  discussionTitle.append(el_p)

  const discussionInfo = document.createElement("div")
  discussionInfo.classList.add('discussion__information')
  discussionInfo.textContent = `${AUTHOR} / ${CREATED_AT}`

  //콘텐츠에 제목 추가
  discussionContent.append(discussionTitle, discussionInfo)




  //discussuinAnsered: obj.answer
  //discussuinAnsered에 el 추가
  // obj.answer가 null이 아니면
  // obj.answer.author avatarUrl bodyHTML createdAt id url 정보를 뿌림
  // if(ANSWER !== null) {
  //   console.log(ANSWER)
  // }

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


const form = document.querySelector('.form__container form')
const nameInput = document.querySelector('.form__input--name input')
const titleInput = document.querySelector('.form__input--title input')
const questionInput = document.querySelector('.form__textbox textarea')



form.addEventListener('submit', (evt) => {
  evt.preventDefault()


  let formDataObj = {
    answer: null,
    author: null,
    avatarUrl: null,
    bodyHTML: null,
    createdAt: null,
    id: null,
    title: null,
    url: null
  }

  formDataObj.author = nameInput.value
  formDataObj.title = titleInput.value
  formDataObj.bodyHTML = questionInput.value
  formDataObj.createdAt = 'Date 객체 사용'
  formDataObj.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  formDataObj.url = "https://github.com/codestates-seb/agora-states-fe/discussions"

  agoraStatesDiscussions.unshift(formDataObj);
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  render(ul);


})


