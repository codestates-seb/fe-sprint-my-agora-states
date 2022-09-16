// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; //div로 아바타를 덮고 있는 애를 만듦
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; //div로 디스커션 할 콘텐츠 상자를 만듦
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; //div로 답변 체크 상자를 만듦

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //1.아바타 영역
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "avatar-img";
  avatarWrapper.append(avatarImg); // 아바타 상자에 아바타 이미지가 들어갈 수 있도록 div 아바타 상자 안에 넣어줌

  //2.콘텐츠 영역
  const titleData = document.createElement("h2");
  titleData.className = "discussion__title";
  discussionContent.append(titleData);

  const titleUrl = document.createElement("a");
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  titleData.append(titleUrl);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author}/${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  //3.체크박스 영역
  const checkAnswer = document.createElement("div");
  checkAnswer.textContent = answerConfirm(obj); //답변 체크된 거 어케 만들지
  //삼항연산자 사용해서 만드는 방법 : checkAnswer.textContent = obj.answer ?  "✅" : "❌";
  discussionAnswered.append(checkAnswer);

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

const answerConfirm = (value) => {
  if (value.answer === null) {
    return "❌";
  } else {
    return "✅";
  }
};

const Form = document.querySelector(".form");
// const submitBtn = document.querySelector("#send");
const inputName = document.querySelector(".form__input--name >  input");
const inputTitle = document.querySelector(".form__input--title > input");
const inputtext = document.querySelector(".form__textbox > textarea");

Form.addEventListener("submit", (event) => {
  console.log("동작한다네");
  event.preventDefault();
  const ObjectForForm = {
    id: "unique number",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/42",
    author: inputName.value,
    answer: {
      id: "DC_kwDOHOApLM4AKdo2",
      createdAt: "2022-05-13T04:19:10Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/42#discussioncomment-2742838",
      author: "Hong-sk",
      bodyHTML:
        '<p dir="auto">아래 작성해주신 코드내용처럼 isShow를 전역변수로 선언해서 실행하셔도 크게 문제는 일어나지 않습니다.</p>\n<p dir="auto">다만 isShow를 굳이 클로저를 활용해 접근하는 이유는 클로저를 사용하는 것이 <strong>상태를 안전하게 변경하고 유지할 수 있기 때문</strong>입니다.</p>\n<p dir="auto">아래 코드의 경우 isShow가 전역 스코프에 있기 때문에 toggle함수 말고도, 다른 모든 부분에서도 isShow를 참조할 수 있고, 변경할 수 있습니다.</p>\n<p dir="auto">isShow는 토글의 display를 block으로 해줄지, none으로 해줄지를 나타내는 용도로만 쓰여야되는데, 모든 곳에서 참조 및 변경이 가능하다면 <strong>의도치 않은 변경에 의한 오류</strong>를 야기시킬 수 있습니다.</p>\n<p dir="auto">따라서 클로저를 통해 내부함수말고는 접근할 수 없게끔 만들어주는 것이 상태를 안전하게 보관할 수 있는 것입니다.</p>\n<p dir="auto">이 내용은 오늘 줌 강의시간에 크루님이 말씀해주신 캡슐화나 정보은닉과도 깊은 연관이 있다고 생각됩니다 :)</p>',
      avatarUrl:
        "https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4",
    },
    bodyHTML:
      '<p dir="auto">안녕하세요! 클로저의 효용성에 의문이 들어 질문 드립니다!</p>\n<p dir="auto">클로저를 사용하는 정답코드</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="        var box = document.querySelector(\'.box\');\n        var toggleBtn = document.querySelector(\'.toggle\');\n\n        var toggle = (function () {\n            var isShow = false;\n            // TODO: ① 클로저를 반환하는 함수를 작성하세요.\n            return function () {\n                // TODO: ③ isShow 변수의 상태를 변경하는 코드를 작성하세요.\n                box.style.display = isShow ? \'block\' : \'none\';\n                isShow = !isShow;\n            };\n        })();\n\n        // ② 이벤트 프로퍼티에 클로저를 할당\n        toggleBtn.onclick = toggle;"><pre>        <span class="pl-k">var</span> <span class="pl-s1">box</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.box\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-s1">toggleBtn</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.toggle\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n\n        <span class="pl-k">var</span> <span class="pl-s1">toggle</span> <span class="pl-c1">=</span> <span class="pl-kos">(</span><span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n            <span class="pl-k">var</span> <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">false</span><span class="pl-kos">;</span>\n            <span class="pl-c">// TODO: ① 클로저를 반환하는 함수를 작성하세요.</span>\n            <span class="pl-k">return</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n                <span class="pl-c">// TODO: ③ isShow 변수의 상태를 변경하는 코드를 작성하세요.</span>\n                <span class="pl-s1">box</span><span class="pl-kos">.</span><span class="pl-c1">style</span><span class="pl-kos">.</span><span class="pl-c1">display</span> <span class="pl-c1">=</span> <span class="pl-s1">isShow</span> ? <span class="pl-s">\'block\'</span> : <span class="pl-s">\'none\'</span><span class="pl-kos">;</span>\n                <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">!</span><span class="pl-s1">isShow</span><span class="pl-kos">;</span>\n            <span class="pl-kos">}</span><span class="pl-kos">;</span>\n        <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n\n        <span class="pl-c">// ② 이벤트 프로퍼티에 클로저를 할당</span>\n        <span class="pl-s1">toggleBtn</span><span class="pl-kos">.</span><span class="pl-c1">onclick</span> <span class="pl-c1">=</span> <span class="pl-s1">toggle</span><span class="pl-kos">;</span></pre></div>\n<p dir="auto">전역 변수를 통해 상태를 관리하는 코드</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="        var box = document.querySelector(\'.box\');\n        var toggleBtn = document.querySelector(\'.toggle\');\n        var isShow = false;\n        var toggle = function () {\n            box.style.display = isShow ? \'block\' : \'none\';\n            isShow = !isShow; // 전역 변수에 적용\n        };\n\n        // ② 이벤트 프로퍼티에 클로저를 할당\n        toggleBtn.onclick = toggle;"><pre>        <span class="pl-k">var</span> <span class="pl-s1">box</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.box\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-s1">toggleBtn</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">\'.toggle\'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">false</span><span class="pl-kos">;</span>\n        <span class="pl-k">var</span> <span class="pl-en">toggle</span> <span class="pl-c1">=</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n            <span class="pl-s1">box</span><span class="pl-kos">.</span><span class="pl-c1">style</span><span class="pl-kos">.</span><span class="pl-c1">display</span> <span class="pl-c1">=</span> <span class="pl-s1">isShow</span> ? <span class="pl-s">\'block\'</span> : <span class="pl-s">\'none\'</span><span class="pl-kos">;</span>\n            <span class="pl-s1">isShow</span> <span class="pl-c1">=</span> <span class="pl-c1">!</span><span class="pl-s1">isShow</span><span class="pl-kos">;</span> <span class="pl-c">// 전역 변수에 적용</span>\n        <span class="pl-kos">}</span><span class="pl-kos">;</span>\n\n        <span class="pl-c">// ② 이벤트 프로퍼티에 클로저를 할당</span>\n        <span class="pl-s1">toggleBtn</span><span class="pl-kos">.</span><span class="pl-c1">onclick</span> <span class="pl-c1">=</span> <span class="pl-en">toggle</span><span class="pl-kos">;</span></pre></div>\n<p dir="auto">아래처럼 isShow를 전역변수로 선언하고, 그 상태를 토대로 스타일을 적용해주어도 똑같이 동작하는데, 굳이 클로저를 활용하는 이유가 궁금합니다.</p>\n<p dir="auto">이렇게 토글버튼 등에서 클로저를 활용하는 경우는 나중에 코드가 방대해졌을 때, 동작과 상태가 한번에 묶여있는 형태가 유지보수하기 용이해서 활용하는 것인가요? 혹은 다른이유가 있는지 궁금합니다.</p>\n<p dir="auto">감사합니다.</p>',
    avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
  };
  ul.prepend(convertToDiscussion(ObjectForForm));
  agoraStatesDiscussions.unshift(ObjectForForm);
  console.log(agoraStatesDiscussions);

  inputName.value = "";
  inputTitle.value = "";
  inputtext.value = "";
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//내가 만들었던 수도코드
//폼에다가 입력하고, submit 버튼을 클릭했을 때(onclick 이벤트 핸들러 써야하는 건 맞는 거 같음)
// 폼에 입력된 정보가 객체에 담긴다 (키와 값으로)
//id가 name에 담긴 건 key 'author'에 담겨야 하고
//id title에 담긴 건 key 'title'에 담겨야 한다.
//날짜도 담겨야 하네 생각해보니...
// 배열인 agoraStatesDiscussions의 가장 뒤에 만들어진 객체가 더해진다.
//agoraStatesDiscussion.push('만들어진 객체')

//강의에서 말한 수도코드
//input submit은 누르면 새로고침이 됨
// 폼이 제출하는 이벤트가 발생했을 때 ! render과 converto함수도 실행이 되어야 함
// 폼 요소를 채택하기 const from = document.querySelector('.form');
// 폼에 이벤트 리스너 걸어주기 form.addEventListener('submit',(event)=>{
// console.log('이벤트 발생')})할 경우 콘솔이 잘 안 찍힘//이 함수 안에 넣을 내용들임
//submit 버튼 누르면 새로고침이 되기 때문에 event.preventDefault();를 사용할 수 있음!
//객체를 만들어서 객체를 convertodiscussion 함수에 넣어서 DOM으로 변환
//변환한 것을 render에 넣어서 브라우저에 랜더링 되도록 함.
//객체에 폼에 쓴 데이터를 가져올 것임 쿼리 셀렉터로
//const author = document.querySelector('.form__input--name > input');
//const title = document.querySelector('.form__input--title >  input');
//const textArea = document.querySelector('.form__textbox > textarea');
//객체 만들기 const obj = {더미 데이터 중 객체 하나 가져와서 넣음}
//맨 앞으로 들어오게 하려면 ul.prepend(convertToDiscussion(obj));
//obj 내부를 조작한다...이건 생각 못 했네... 무조건 객체에 객체.키 = 값 으로 넣어야 한다고 생각했네
// id: "unique number"
// createdAt : new Date()
// title: title.value,
// url: 안 건드림
//author : author.value.
//제출했을 때 폼에 쓴 내용 없애주고 싶을 때
//author.value = ""
//title.value = ""
//textArea.value = ""
//gowna
//배열에도 추가해주려면 agorastatesdiscussion.unshift(obj)해줌
//
//로컬 스토리지도 사용할 수 있나 봄
