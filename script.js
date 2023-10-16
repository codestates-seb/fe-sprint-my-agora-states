{
  /* <li class="discussion__container">
      <div class="discussion__avatar--wrapper">
        <img class="discussion__avatar--image"
          src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
          alt="avatar of kimploo">
      </div>
      <div class="discussion__content">
        <h2 class="discussion__title">
          <a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a>
        </h2> <-제목을누르면원본링크로이동(자현)
        <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
      </div>
      <div class="discussion__answered"><p>☑</p></div>
    </li> */
}


//로컬 스토리지를 만들고
//내부의 값을 불러온다
//새로 생성되는 배열은 로컬 스토리지에 추가한다.

const local1 = window.localStorage.setItem(key, value);



// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// const convertToDiscussion = (obj) => {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   //생성요소들
//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   const discussionTitle = document.createElement("h2");
//   const discussionAnchor = document.createElement("a");
//   const avatarImg = document.createElement("img"); //함수값 img
//   avatarImg.classList.add["discussion__avatar--image"];

//   const discusstionId = document.createElement("div");
//   const discusstionCreatedAt = document.createElement("div");
//   const discusstionContentText = document.createElement("div");
//   const discussionAuthor = document.createElement("div");
//   const discussionAnswer = document.createElement("div");

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
//   discussionAnchor.textContent = obj.title;
//   discussionAnchor.href = obj.url;
//   discussionAnchor.target = "_blank";
//   avatarImg.src = obj.avatarUrl;

//   discusstionCreatedAt.textContent = obj.createdAt;
//   discusstionId.textContent = obj.id;
//   discussionAuthor.textContent = obj.author;
//   // discusstionContentText.innerHTML = obj.answer.bodyHTML; // 이거 켜두면...메인 태그에 바디가 이상해짐

//   //타이틀
//   discussionTitle.append(discussionAnchor);

//   //콘텐트
//   discussionContent.append(discussionTitle); // 제목
//   // discussionContent.append(discusstionContentText); //내용
//   discussionContent.append(discussionAuthor); // 글쓴이
//   discussionContent.append(discusstionCreatedAt); //생성시간
//   //만일 answer 배열이 존재한다면
//   if (obj.answer === null) {
//     discussionContent.append("답변없음");
//   } else {
//     discussionContent.append("답변있음");
//   }

//   //아바타부분
//   avatarWrapper.append(avatarImg);

//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

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

//폼의 값을 받아오는 함수를 폼 작성버튼에 추가해준다

//함수내부
//폼의 값을 받아와서 새로운 객체를 생성
//각 키에 폼에서 받은 벨루값을 넣어준다

//객체의 키들
// interface Discussion {
//   id: string;
//   createdAt: string;
//   title: string;
//   url: string;
//   author: string;
//   answer: Answer | null;
//   bodyHTML: string;
// }

//새로운 객체 생성 후 데이터 배열에 추가..? //로컬스토리지를 써보자
// 배열 이름은 agoraStatesDiscussions




//-----------새질문생성-------------
const makeNewQuestion = (newObj) => {
  
  
  console.log("makeNewQuestion내부텍스트")
  //폼의 값을 받아와서 새로운 객체를 생성

  //화면 구성 돔(태그)생성
  const formInputName = document.createElement("div");
  formInputName.className = "form__input--name"
  const formInpuTitle = document.createElement("div");
  formInpuTitle.className = "form__input--title"
  const formInpuStory = document.createElement("div");  
  formInpuStory.className = "form__input--story"

  //받아오는 인풋,텍스트에어리어돔생성
  const newName = document.querySelectorById("name");
  const newTitle = document.querySelectorById("title");
  const newContent = document.querySelectorById("story");


  //배열 내 각 키에 폼에서 받은 벨루값을 넣어준다
  newObj={};
  newObj.name.textContent = newName;
  newObj.title.textContent = newTitle;
  newObj.bodyHTML.innerHtml = newContent;


  //화면돔에 받아온 내용 어팬드

  formInputName.append(newName)
  formInpuTitle.append(newTitle)
  formInpuStory.append(newContent)

  

  //배열에 추가해서 리턴하기
  return agoraStatesDiscussions.push(...newObj);
};



//로컬스토리지작성
