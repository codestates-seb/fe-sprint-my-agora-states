// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg)

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const title = document.createElement("h2");
  title.className = "discussion__title";
  discussionContent.append(title);

  const anchor = document.createElement("a");
  anchor.href = obj.url;
  anchor.innerText = obj.title;
  title.append(anchor);

  const info = document.createElement("div");
  info.className ="discussion__information";
  info.innerText = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString("ko-KR", {timeZone:"Asia/Seoul"})}`;
  discussionContent.append(info);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"
   
  const answer = document.createElement("div");
  answer.className = "discussion__answered";
  discussionAnswered.append(answer);

  const checkBox = document.createElement("p");
  checkBox.innerText = "☑";
  answer.append(checkBox);

  /*// 페이지네이션 기능 추가
  const page = document.createElement("section");
  page.className = "pages";
  const main = document.querySelector('.main')
   main.append(page); 
   // main이란 변수가 존재하지 않으므로 변수 지정 

  const pagination = document.createElement("ul");
  pagination.className="pagination";
  page.append(pagination);
    
  const first = document.createElement("li");
  first.className="first";

  const anchor2 = document.createElement("a");
  anchor2.href = "#";
  first.append(anchor2);
  // a 태그에 href 는 해당 태그를 클릭 헀을 때 href주소로 이동하겠다는 뜻. 
  // #으로 해놓으면 클릭해도 이동 x */

        
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.


  
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

// input을 불러와야 한다.
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  // 폼 제출을 하면 완전히 새로운 html을 받아오는 새로고침 현상을 해결하려면,
  event.preventDefault();
    const obj = {
      id: "unique id",
      createdAt: new Date().toISOString(),
      title: title.value,
      url:"https://github.com/codestates-seb/agora-states-fe/discussions",
      author: author.value,
      answer: null,
      bodyHTML: textbox.value,
      avatarUrl:
      "https://media.istockphoto.com/id/1137748653/ko/%EB%B2%A1%ED%84%B0/%EC%83%88%EC%8B%B9-%EC%83%9D%ED%83%9C-%EA%B8%B0%ED%98%B8-%EC%95%84%EC%9D%B4%EC%BD%98.jpg?s=612x612&w=is&k=20&c=h4nG_gXgt8xjhWOtTrS_RaR0XOT13UjoZ_SsmeVCDE8="
    };
    
    //agoraStatesDiscussions 객체 추가
    agoraStatesDiscussions.unshift(obj);

    // 42개의 데이터가 계속 추가되지 않도록 사용자 입장에서 새로고침되어 보이게 화면 지우기
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    //다시 agoraStatesDiscussions 기반으로 화면 보여주기 (렌더링)
    render(ul);

  })
  

