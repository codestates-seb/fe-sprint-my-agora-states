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
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
//title
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);
  //링크
  const contentLink = document.createElement('a');
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);
  //정보
  const contentInformation = document.createElement('div');
  contentInformation.className = "discussion__information";
  contentInformation.textContent = obj.author;
  discussionContent.append(contentInformation);

  //체크박스
  const contentAnswered = document.createElement('p');
  contentAnswered.className = "discussion__answered";
  discussionAnswered.append(contentAnswered);
  if( obj.answer ===null ){
    contentAnswered.textContent = "☒";
  }else{
    contentAnswered.textContent = "☑";
  }
  contentInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`;


  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = "";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//로그인폼- >내용을 적고 제출을 하면 추가가되야함
const form = document.querySelector(".form__container");
//const submitBtn = document.querySelector('button');//우선 읽
let elInputUsername =document.querySelector('#name');//이름
let elInputTitle =document.querySelector("#title");//제목
let elInputContent =document.querySelector('#story');//내용

form.addEventListener('submit', function(e) {
  e.preventDefault();
	

  const newDiscussion = {
    id: "",
    createdAt: new Date().toLocaleString(),
    title: elInputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: elInputUsername.value,
    answer: null,
    bodyHTML: elInputContent.value,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/95295766?s=64&u=85d493e0be0d2ca55965efd9f6c5b268c9dca168&v=4",
};

agoraStatesDiscussions.unshift(newDiscussion);//배열에 추가가됨 왜 표면에 안나타나징
console.log(newDiscussion);
const newArr = convertToDiscussion(newDiscussion);

ul.prepend(newArr);
//const랑 prepend안쓰고 render(ul)쓰고 위에서 render함수 초기화해줘도 된다!

});

//페이지네이션
const totalPage = Math.ceil(41/10);
const namo = 1 % 10 ;


function totalPaigenation(totalData , currentData){
    const dataPerPage = 10;
        const pageCount = 10;
  const totalPage = Math.ceil(totalData / pageCount);//총페이지수
  const pageGroup = Math.ceil(currentData / pageCount);
      // console.log("pageGroup : " + pageGroup);
         console.log("totalPage : " + totalPage);

         let last = pageGroup * pageCount; 
          if(last > totalPage){
            last = totalPage;
          }
          let firstpage = last - (pageCount - 1);
          const next = last + 1;
          const prev = first - 1;

          if (totalPage < 1) {
            first = last;
        }

}

const scrollediindicatorfill = document.querySelector(".scrolled-indicator-fill");
const btnScrollToTop = document.querySelector("#btnScrollToTop");

// 스크롤 표시 함수

window.addEventListener("scroll", () => {

  //스크롤 가능 정도

  const scrollable = document.documentElement.scrollHeight - window.innerHeight; // 문서전체높이 - window 높이;

  //스크롤 한 정도를 px단위로 표시

  const scroll = window.scrollY;



  let percentageScrolled = 100;

  // 스크롤 가능 시

  if (scrollable > 0) {

    percentageScrolled = Math.ceil((scroll / scrollable) * 100);

  }

 // scrolledIndicatorFill.style.width = `${percentageScrolled}%`;
});





