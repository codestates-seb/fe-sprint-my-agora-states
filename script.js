// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // li.discussion_container를 만들어줌
  const li = document.createElement("li"); // li 요소 생성 - done
  li.className = "discussion__container"; // 클래스 이름 지정 - done

  // <li> 요소 내부에 들어갈 세개의 <div>요소를 만들어줌
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // 아바타 이미지
  const img = document.createElement("img"); // 이미지 생성
  img.className = "discussion__avatar--image";
  img.setAttribute = ("src", obj.avatarUrl);
  img.setAttribute = ("alt", `${obj.author}`);
  // img.src // avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  // img.alt // avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  // src, alt 속성을 agoraStatesDiscussions의 첫번째 요소에 있는 데이터로 넣어줌
  // avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // 질문 내용
  const title = document.createElement("h2"); // 제목
  discussionTitle.className = "discussion__title";
  const link = document.createElement("a"); // 링크
  link.textContent = obj.title; // ***** 제목 ******
  link.setAttribute = ("href", obj.url);
  

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;


  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // 질문에 답했는지 체크 여부

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarWrapper.append(img);
  discussionContent.append(title, link);

  // dom append 메서드를 이용해서 위에서 생성한 <div>요소들을 li.discussion__container의 자식 요소로 추가할 수 있음
  li.append(avatarWrapper, discussionContent, discussionInfo , discussionAnswered);
  return li;

  const ul = document.querySelector('ul.discussions__container');
  ul.append(li);
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
