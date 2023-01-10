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

  // 이미지 만듦
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  //타이틀이랑 날짜 만들기
  //h2 타이틀
  const title_h2 = document.createElement('h2');
  title_h2.className = "discussion__title";
    //h2 자식 a(타이틀 링크)
    const title_a = document.createElement('a');
    title_a.textContent = obj.title;
    title_a.href = obj.url;
  //div 날짜
  const information_div = document.createElement('div');
  information_div.className = "discussion__information";
  information_div.textContent = `${obj.id} / ${obj.createdAt}`

  // 자식들 추가 (h2, div ,h2 자식 a)
  discussionContent.append(title_h2, information_div);
  title_h2.append(title_a);

  //체크표시 만들기
  const answered_div = document.createElement('div');
  answered_div.className = "discussion__answered";
    //체크표시 안에 p
    const answer_p = document.createElement('p');
    answer_p.textContent = obj.answer ? '☑' : '☒'

    //자식들 추가(체크표시, 체크표시 안에 p)
  answered_div.append(answer_p);
  discussionAnswered.append(answered_div);

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


//답변 달기
