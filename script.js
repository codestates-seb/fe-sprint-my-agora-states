// 📃 index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

console.log(agoraStatesDiscussions);

// 📃 convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
      const li = document.createElement("li"); // li 요소 생성
      li.className = "discussion__container"; // 클래스 이름 지정

// 🙎🏻‍♂️ 아바타

      const avatarWrapper = document.createElement("div");     // 1. div요소 생성
      avatarWrapper.className = "discussion__avatar--wrapper"; //    div요소의 클래스 선정
      
      const avataImg = document.createElement('img');          // 2. <img>
      avataImg.className = 'discussion__avatar--image';        //    <img class>
      avataImg.src = obj.avatarUrl;                            //    <img class src>
      avataImg.alt = 'avatar of' + obj.author;                 //    <img class src alt>

      //<img src="obj.avatarUrl" alt="avatar of + obj.author">

      avatarWrapper.append(avataImg);                          // 3. <div><img class src alt></div>

// 💭 질문

      const discussionContent = document.createElement("div"); // 1. div요소 생성
      discussionContent.className = "discussion__content";     //    div요소의 클래스 선정

      const titleWrapper = document.createElement("h2");       // <h2></h2>
      titleWrapper.className = "discussion__title";            // <h2 class></h2>
      discussionContent.append(titleWrapper);                  // <div><h2 class></h2></div>
      
      const discussionTitleLink = document.createElement("a"); // <a></a>
      discussionTitleLink.href = obj.url;                      // <a href></a>
      discussionTitleLink.textContent = `${obj.title}`;        // <a href>content</a>
      titleWrapper.append(discussionTitleLink);                // <div><h2><a herf>content</a><h2></div>

// 📆 날짜

      const discussionInformation = document.createElement('div');
      discussionInformation.className = "discussion__information";
      discussionInformation.textContent = `${obj.author} / ${obj.createdAt.slice(0,10)}`
      discussionContent.append(discussionInformation);   

// 💬 답장



// ☑️ 체크 박스 영역

      const discussionAnswered = document.createElement("div"); //<div></div>
      discussionAnswered.className = "discussion__answered";    //<div class ='d__a'> </div>

// 📃 부모 li에 (자식요소) 추가
      
      const checkbox = document.createElement("p");
      checkbox.textContent = obj.answer ? '✔︎' : '✗'
      discussionAnswered.append(checkbox)

// 📃 
      li.append(avatarWrapper, discussionContent, discussionAnswered); 
      return li;
      };

// 📃 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
      for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
            element.append(convertToDiscussion(agoraStatesDiscussions[i]));
      }
      return;
};

// 📃 ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


const form = document.querySelector("form");
const title = document.querySelector("div.form__input--title > input");
const nameInput = document.querySelector("div.form__input--name > input");
const textbox = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
      event.preventDefault();

      // 개체 양식
      const newObj = {
            id: "new id",
            createdAt: new Date().toISOString(),
            title: title.value,
            url: "https://github.com/codestates-seb/agora-states-fe/discussions",
            author: nameInput.value,
            answer: null,
            bodyHTML: textbox.value,
            avatarUrl:
            "https://cdn-icons-png.flaticon.com/512/199/199552.png"
      }
      
      // 새로운 개체를 가장 앞에서 추가한다.
      agoraStatesDiscussions.unshift(newObj);

      //
      const Discussion = convertToDiscussion(newObj);

      ul.prepend(Discussion);
      }
);
