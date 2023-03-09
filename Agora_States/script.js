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
    // img 넣기
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
    // title 넣기
  const discussion_h2 = document.createElement('h2');
  discussion_h2.className = "discussion__title";
  const new_content = document.createTextNode(obj.title);
  const discussion_link = document.createElement('a');

  discussion_link.href = obj.url; // a태그의 링크 설정
  discussion_link.appendChild(new_content); // a태그의 자식 요소로 text 추가
  discussion_h2.appendChild(discussion_link); // h2의 자식 요소로 a태그 추가
  discussionContent.append(discussion_h2); // 최종 추가

    // 작성자/시간 넣기
  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  const infoContent = document.createTextNode(`${obj.author} / ${obj.createdAt}`)

  discussionInfo.appendChild(infoContent);
  discussionContent.append(discussionInfo);

  //   // 체크박스 넣기
  // const checkbox = document.createElement('div');
  // checkbox.className = "discussion__answered";
  // const check_p = document.createElement('p');
  // const check_text = document.createTextNode("☑");

  // check_p.appendChild(check_text);
  // checkbox.appendChild(check_p);
  // discussionAnswered.append(checkbox);

    // 질문 내용 넣기
  const question = document.createElement('div');
  question.className = "question_content";

  discussionContent.appendChild(question);
  question.innerHTML = obj.bodyHTML;

    // 답변 내용 넣기
    if (obj.answer !== undefined && obj.answer !== null) { // 답변이 있다면
      // 답변 박스 선언
      const answered = document.createElement('div');
      answered.className = "discussion__content";
      answered.id = "answerBox";
      discussionContent.appendChild(answered);
      
      // 답변자 이미지
      const answered_avatar_img = document.createElement('img');
      answered_avatar_img.className = "answered_avatar_img";
      answered_avatar_img.src = obj.answer.avatarUrl;

      answered.appendChild(answered_avatar_img);
      answered_avatar_img.innerHTML = answered_avatar_img;
      
      // 답변자명/시간 
      const answered_info = document.createElement('div');
      answered_info.className = "answered_info";

      answered.appendChild(answered_info);
      answered_info.innerHTML = `${obj.answer.author} / ${obj.answer.createdAt}`;

      // 답변 내용
      const answered_detail = document.createElement('div');
      answered_detail.className = "answered_detail";
      answered.appendChild(answered_detail);
      answered_detail.innerHTML = obj.answer.bodyHTML;
  }

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

// 제출 이벤트 만들기
const submit_btn = document.querySelector(".form__submit>input");
submit_btn.addEventListener("click", () => {
  const name_value = document.querySelector('.form__input--name>input').value;
  const title_value = document.querySelector('.form__input--title>input').value;
  const question_value = document.querySelector('.form__textbox>textarea').value;
  
  let today = new Date();
  const li = convertToDiscussion({
      id: name_value,
      createdAt: today.toLocaleString(),
      title: title_value,
      url: "",
      author: "",
      answer: {
        id: "",
        createdAt: "",
        url: "",
        author: "",
        bodyHTML:
          '',
        avatarUrl: "",
      },
      bodyHTML:
        question_value,
      avatarUrl:
        "",
    }
    );
    

    if (name_value.trim() !== "" || title_value.trim() !== "" || question_value.trim() !== ""){
      document.querySelector('.discussions__container').prepend(li);
      document.querySelector('.form__input--name>input').value = "";
      document.querySelector('.form__input--title>input').value = "";
      document.querySelector('.form__textbox>textarea').value = "";
    }
    else {
      alert("빈칸을 모두 입력해주세요.")
    }
  }

)