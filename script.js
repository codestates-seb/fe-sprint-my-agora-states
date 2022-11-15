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
  const avatarImg = document.createElement('img'); // C
  // 일단 아바타 이미지 하나 만듬
  avatarImg.className = "discussion__avatar--image"; // 
  // 근데 그거 class discussion__avatar--image 여기있는거임
  avatarImg.alt = 'avatar of ' + obj.author;
  // 대체할 이미지는 'avatar of ' + obj.author; 이거임 (사실모름)
  avatarImg.src = obj.avatarUrl;
  // 아바타 이미지 쓸거는 obj.avatarUrl 에 있는거 가져올거임
  avatarWrapper.append(avatarImg);
  // 그리고나서 만든 아바타 이미지  avatarWrapper여기에 어펜드시킬거임
  // 아바타 부분 끝    제목부분 해야됨. discussioncontent
  
  // 일단 만들어줘야됨 타이틀부분  document.createlement
  const CTitle = document.createElement('h2');
  CTitle.className =
  // 똑같이 h2로 제목넣을곳 만들어줌
  const TAnchor = document.createElement('a');
  // 그 안에 a 태그랑 글 써있으므로 일단 a태그공간 만듬.
  TAnchor.href = obj.url;
// 타이틀 앵커 링크를 오브젝트의 유알엘 부분 으로 정해줌.
  TAnchor.textContent = obj.title;
 // 데이터에 있는 오브젝트의 타이틀 불러줌.
 CTitle.append(TAnchor);
 // 타이틀에 앵커 어펜드해줌.
 discussionContent.append(CTitle);  // 제목부분 붙여줌.

// 이제 그밑에 사람이름이랑 시간같은거 표시해줘야됨.
const CInfo = document.createElement('div'); // 일단 인포부분 만들어줌
CInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocale}`;
// 텍스트 컨텐트 불러옴.
discussionContent.append(CInfo);  // 컨텐츠인포 부분 어펜드해서 보여주게함.

// 이제 체크부분 만들어줘야함.discussionAnswered

const Check = document.createElement('p');
Check.textContent = obj.answer? '☑' : 'x';
discussionAnswered.append(Check)



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
  
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
