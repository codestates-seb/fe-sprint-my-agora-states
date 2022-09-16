//===========================================================//
//==================== 렌더링에 필요한 함수 =====================//
//===========================================================//

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, i) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const img = document.createElement("img");
  img.className = "discussion__avatar--image";
  img.src = obj.avatarUrl;
  img.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(img);

  const h2 = document.createElement("h2");
  h2.className = "discussion__title";
  const anchor = document.createElement("a");
  anchor.href = obj.url;
  anchor.textContent = obj.title;
  h2.append(anchor);
  const div = document.createElement("div");
  div.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-KR')}`;
  discussionContent.append(h2);
  discussionContent.append(div);

  const p = document.createElement("p");
  p.textContent = obj.answer !== null ? '☑' : '□';
  discussionAnswered.append(p);

  const img2 = document.createElement("img");
  img2.src = "./img/extend.png"
  img2.id = i;
  img2.className = "cursor";
  img2.onclick = popOnOff;
  discussionAnswered.append(img2);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  const pageSet = paging();
  //console.log(setting);

  for (let i = pageSet[2]; i < pageSet[3]; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i], i));
  }
  return;
};

const ul = document.querySelector("ul.discussions__container");
render(ul);
pageBtn();
