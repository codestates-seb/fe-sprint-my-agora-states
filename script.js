{/* <li class="discussion__container">
<div class="discussion__avatar--wrapper">
  <img class="discussion__avatar--image"
    src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
    alt="avatar of kimploo">
</div>
<div class="discussion__content">
  <h2 class="discussion__title">
    <a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a>
  </h2>
  <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
</div>
<div class="discussion__answered"><p>☑</p></div>
</li> */}

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// interface Discussion {
//   id: string;
//   createdAt: string;
//   title: string;
//   url: string;
//   author: string;
//   answer?: Answer | null;
//   bodyHTML: string;
// }

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// 위 주석 코드 구조와 동일 , div 3개 생성
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 1. 이미지 부분
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
    // 이미지 생성
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('discussion__avatar--image');
    avatarImg.src = obj.avatarUrl;
    avatarWrapper.append(avatarImg);

  // 2. 가운데 내용 부분
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
    // a태그 생성
    const discussionAnchor = document.createElement('a');
    discussionAnchor.textContent = obj.title;
    discussionAnchor.href = obj.url;
    discussionAnchor.target = '_blank';

    // 제목 수정
    const discusstionTitle = document.createElement('h4');
    discusstionTitle.classList.add('discussion_title');
    // 앵커를 타이틀에 추가한다.
  discusstionTitle.append(discussionAnchor);
    // 제목부분을 추가함
  discussionContent.append(discusstionTitle);
    
    // 3. 작성자 정보 + 작성일 담을 div 태그 생성
    const discussionInformation = document.createElement('div');
    discussionInformation.classList.add('discussion__information');
    
    // 작성자 정보 + 작성일 정보
    const writeDate = document.createElement('p');
    writeDate.textContent = `${obj.author} / ${formatDate(obj.createdAt)}`;
    discussionInformation.append(writeDate);
    // 작성자 정보 + 작성일 정보를 추가
    discussionContent.append(discussionInformation);
 
  // 답변 여부 체크 부분
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const check = document.createElement('p');
  if(obj.answer === null) {
    check.textContent = '□';
  }
  else {
    check.textContent = '☑';
  }
  discussionAnswered.append(check);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, arr) => {
  element.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    element.append(convertToDiscussion(arr[i]));
  }
  return;
};

// 날짜 형식 바꿔주는 함수
function formatDate(inputDate) {

const date = new Date(inputDate);
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
};

const localDateStr = new Intl.DateTimeFormat('default', options).format(date);
  return localDateStr;
}