// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.classList.add("discussion__container", 'card', 'd-flex', 'flex-row'); // 클래스 이름 지정

  // 아바타 컴포넌트 만들기
  // 아바타 래퍼 노드와 아바타 이미지 노드 생성 후 값, 클래스 추가 및 트리 구조 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("discussion__avatar--wrapper");
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  // 디스커션 콘텐트 컴포넌트 만들기
  // 디스커션 콘텐트 래퍼와 디스커션 타이틀, 디스커션 인포 노드를 만든 후 값, 클래스 추가 및 트리 구조 생성 
  const discussionContent = document.createElement("div");
  discussionContent.classList.add("discussion__content", 'card-body');
  const discussionTitle = document.createElement("h2"); // h2 태그는 래퍼 요소
  discussionTitle.classList.add('discussion__title', 'card-title');
  const aHref = document.createElement('a'); // a 태그는 실제 타이틀 요소
  aHref.href = obj.url;
  aHref.textContent = obj.title;
  discussionTitle.append(aHref);
  const discussionInfo = document.createElement('div'); // 빈 div 태그에 닉네임 / 시간 정보 추가
  discussionInfo.textContent = `${obj.author}  /  ${obj.createdAt}`;
  discussionInfo.classList.add('discussion__information', 'card-footer');
  discussionContent.append(discussionTitle, discussionInfo);

  // 체크 표시 컴포넌트 만들기
  // 체크 표시 컴포넌트가 차있을 경우 p요소에 마크 표시를 넣은 후 트리 구조 생성, 값이 없을 경우 p 요소를 만들지 않음
  const discussionAnswered = document.createElement("div");
  discussionAnswered.classList.add("discussion__answered", 'pe-3');
  if(obj.answer) {
    const checkMark = document.createElement('p');
    checkMark.textContent = '☑';
    discussionAnswered.append(checkMark);
  }

  // 모든 생성된 컴포넌트들을 li 요소에 자식으로 넣어준뒤, 자식들이 모두 할당된 li 요소를 반환 (모든 생성된 컴포넌트들은 형제)
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

export default convertToDiscussion;