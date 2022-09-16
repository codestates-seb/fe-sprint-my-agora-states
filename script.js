// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => { //객체를 매개변수로 받겠구나~
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div'); // 사진
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div'); // 내용
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div'); //체크박스
  discussionAnswered.className = 'discussion__answered';

  // 값을 추출해서 새로운 il 묶음을 만든다

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

    // 1) 아바타 영역
const avatarimg = document.createElement('img')
    avatarimg.className = 'discussion__avatar--image'
	avatarimg.src = obj.avatarUrl
	avatarimg.alt = 'avatar of' + obj.author // 이미지 넣을 때 alt 속성이 국룰이다.
	avatarWrapper.append(avatarimg)

    // 2) 콘텐츠 영역
    // 2-1 ) 제목
const discussionTitle = document.createElement('h2')
const titleAnchor = document.createElement('a')
	titleAnchor.href = obj.url
	titleAnchor.textContent = obj.title
	discussionTitle.append(titleAnchor)
	discussionContent.append(discussionTitle)

    // 2-2 ) 정보
const discussionInfo = document.createElement('div')
	discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
	discussionInfo.className = 'discusstion__information'
    discussionContent.append(discussionTitle, discussionInfo)

    // 3) 체크박스
const checked = document.createElement('p')
	checked.textContent = obj.answer ? '♥' : '♡' // 답변이 만약에 있다면 ? ' ' : 없다면 ' '
	discussionAnswered.append(checked)



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {  //ul.discussions.container
    // 더미데이터의 길이만큼, 더미데이터 안에 있는 모든 요소를 탐색
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      // i번째 요소를 convertToDiscussion에 전달해서 결과를 element에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);



// 추가 되게 만들기
const form = document.querySelector('.form')
const author = document.querySelector('div.form__input--name > input')
const title = document.querySelector('div.form__input--title > input')
const textbox = document.querySelector('div.form__textbox > textarea')


form.addEventListener('submit', (event) => {
  event.preventDefault(); // 새로고침을 자동으로 발생시키는 것을 막는다 (깜빡거리지 않고 고정)
    // 객체를 하나 만든다.
    // 그 객체를 convertTodiscussion 에 넣어서 DOM으로 변환
  const obj = {
    id: 'ID',
    createdAt: new Date(),  // 이미 위에 toLocaleString을 해놨기 때문에 밑에는 안 써도 됨 따라서 뉴데이트만
    title: title.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions',
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: '/fe-sprint-my-agora-states/randomavatar.png'
  }


  agoraStatesDiscussions.unshift(obj);
  const discussion = convertToDiscussion(obj);



    // 그걸 또 render에 넣어서 브라우저에 렌더링 (맨앞으로 -> prepend)
    ul.prepend(discussion);
    title.value = '';
    author.value = '';
    textbox.value = '';
})


