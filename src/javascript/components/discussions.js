export default function Discussions() {
  // 게시판 컨테이너
  this.$discussionsContainer = document.querySelector(".discussion__wrapper");  
  // 게시판 UI 생성
  this.createDiscussions = (agoraStatesUserData) => {
    const $ul = document.createElement("ul");
    $ul.className = "discussions__container";

    for(let i = 0; i < agoraStatesUserData.length; i++) {
      const { 
        title,
        avatarUrl,
        url,
        answer,
        // bodyHTML: content,
        author: userId,
        createdAt: date,
      } = agoraStatesUserData[i];
    
      const $li = document.createElement("li");
      $li.className = "discussion__container";
    
      const $avatarWrapper = document.createElement("div");
      $avatarWrapper.className = "discussion__avatar--wrapper";
      $avatarWrapper.appendChild(createAvatarItem(avatarUrl, userId));
    
      const $discussionContent = document.createElement("div");
      $discussionContent.className = "discussion__content";
      $discussionContent.appendChild(createDiscussionContentH2(title, url));
      $discussionContent.appendChild(createDiscussionContentDiv(userId, date));
      
      const $discussionAnswered = document.createElement("div");
      $discussionAnswered.className = "discussion__answered";
      $discussionAnswered.appendChild(createDiscussionAnswered(answer));
    
      $li.append($avatarWrapper, $discussionContent, $discussionAnswered);
      $ul.appendChild($li);
    }
    return $ul;
  };
  // 게시판 UI 삭제
  this.deleteDiscussions = () => {
    const nodes = [...this.$discussionsContainer.childNodes];
    nodes.forEach((node) => node.remove());
  }
  
  // 아바타 생성
  const createAvatarItem = (avatarUrl, userId) => {
    const $img = document.createElement("img");
    $img.className = "discussion__avatar--image";
    $img.src = avatarUrl;
    $img.alt = `avatar of ${userId}`;
    return $img;
  }
  
  // 게시판 제목 생성
  const createDiscussionContentH2 = (title, url) => {
    const $h2 = document.createElement("h2");
    const $a = document.createElement("a");
    $h2.className = "discussion__title";
    $a.href = url;
    $a.textContent = title;
    $h2.appendChild($a);
    return $h2;
  }
  
  // 게시판 작성자, 날짜 생성
  const createDiscussionContentDiv = (userId, date) => {
    const $div = document.createElement("div");
    const newDate = new Date(date);
    $div.className = "discussion__information";
    $div.textContent = `${userId} asked ${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()} in Discussion`;
    return $div;
  }
  
  // V 아이콘 생성
  const createDiscussionAnswered = (answer) => {
    const $div = document.createElement("div");
    if (checkedAnswerIsNull(answer)) {
    $div.className = "discussion__answered";
    $div.textContent = "☑";
    } else {
    $div.className = "discussion__answered";
    $div.textContent = "☑";
    }
    return $div;
  }
  
  // 게시판 답변 체크 확인
  const checkedAnswerIsNull = (bool) => {
    if (bool === null) return true;
    else return false;
  }
}