{/* <li class="discussion__container">
          <div class="discussion__avatar--wrapper">
            <img class="discussion__avatar--image"
              src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
              alt="avatar of kimploo">
          </div>
          <div class="discussion__content">
            <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
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
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  const discussionAnchor = document.createElement('a');
  const avartarImg = document.createElement('img');
  avartarImg.classList.add('discussion__avatar--image');
  const discussion__Information = document.createElement('p')
  discussion__Information.classList.add('discussion__Information');

  if (obj.answer === null && !obj.title.includes('notice')) {
    discussionAnswered.textContent = "❌";
  } else if (obj.title.includes('notice')) {
    discussionAnswered.textContent = " ";
  }
  else {
    discussionAnswered.textContent = "✔️";
  }




  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;
  discussionAnchor.target = "_blank";
  avartarImg.src = obj.avatarUrl;
  discussion__Information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleDateString("ko-KR", {
    hour12: true,
    hour: "numeric",
    minute: "numeric"
  })}`





  //li의 자식인가? discussionContent의 자식인가?
  //아바타wrapper에 이미지 삽입
  //삽입칸
  avatarWrapper.append(avartarImg);
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionTitle, discussion__Information);



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


//const로 변수 만들기(함수 내에서 tag로 공간을 만든다.)
//클래스도 지정해주기(선택)
//내가 만든 DOM에 객체의 요소를 넣는다.
//화면에 적절한 위치에 append로 붙여준다.

//오브젝트
//버튼을 누르는 이벤트
//변수 btnsubmit = 

let submitBtn = document.querySelector('.form__submit>input');

const addDiscussion = (event) => {
  event.preventDefault();
  // 네임 인풋에 작성된 값
  // 제목 인풋에 작성된 값
  // 의견 인풋에 작성된 값
  // 현재 날짜
  // 위 정보들을 모아서 디스커션 객체로 만든다
  // 디스커션 객체를 컨버트투디스커션의 매개변수로 전달한다
  // 컨버트투디스커션 반환값인 li 요소를 ul에 어펜드한다
  // 어펜드말고 맨위에 뜨는 메서드를 찾아본다
  let today = new Date();
  let year = today.getFullYear;
  let month = today.getMinutes;
  let day = today.getDay;
  let second = today.getSeconds;
  let name = document.getElementById('name').value;
  let title = document.getElementById('title').value;
  let discussion = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: today,
    title: title,
    url: "http://www.google.co.kr/",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlTWxLLhXPXn9QHkLaExIX4KS9IhguC2AdQ&usqp=CAU",
    author: name,
    answer: null
  };
  ul.prepend(convertToDiscussion(discussion));
};

submitBtn.addEventListener('click', addDiscussion);

const topButton = document.getElementById("topButton");

// 스크롤 이벤트 감지
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 100) {
    // 페이지가 스크롤되면 버튼을 표시
    topButton.classList.remove("hidden");
  } else {
    // 페이지 상단에 있을 때 버튼을 숨김
    topButton.classList.add("hidden");
  }
});

// 버튼을 클릭하면 페이지 상단으로 스크롤
topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // 부드러운 스크롤 효과
  });
});

