// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // 그걸 담고있는 div
  avatarWrapper.className = "discussion__avatar--wrapper"; // 작성되는 area
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // 점
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // 답변

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const img = document.createElement('img'); // 이미지를 만듬
  img.className = 'discussion__avatar--image'; // 이미지의 클래스 네임
  img.src = obj.avatarUrl
  // 이미지 주소
  img.alt = '등록되지 않은 이미지'
  // 이미지가 랜더되지 않았을때 표시되는 문구
  avatarWrapper.append(img)
  // avatarWrapper에 img태그의 정보들을 append

  // discussion__content 에  h2태그를 append 해야한다
  // h2태그 안에는 a태그가 존재함 그렇기 떄문에 a태그를 h2태그에 append를 하고 h2태그를 content에 append해야한다
  // discussion__information도 한번더 discussion__content에 append 해야한다

  const a = document.createElement('a') // a태그의 element를 만들어서
  a.textContent = obj.title; // data의 title의 textContent를 가져와서
  a.href = obj.url; // a태그에 href를 넣는다

  const h2 = document.createElement('h2') // h2태그의 element를 만들어서
  h2.className = "discussion__title"; // className을 주고

  h2.append(a) // h2태그에 a 상수를 append한다
  discussionContent.append(h2) // 그다음에 h2태그를 작성되는 area에 append 한다

  // discussionAnswered에 obj.author, obj.createdAt이 들어가야한다 하지만 ' / ' 해당 간격으로
  // 떨어져 있기 때문에 `${obj.author} / ${obj.createdAt}` 이렇게 적어주면 좋을듯
  
  const answerSection = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(answerSection)

  const checkDiv = document.createElement('div')
  checkDiv.textContent = '☑'
  
  discussionAnswered.append(checkDiv)

  //
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

