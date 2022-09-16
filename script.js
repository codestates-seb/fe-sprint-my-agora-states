//질문 리스트 생성
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";

    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const elTitle = document.createElement('h2');
    elTitle.className = "discussion__title";
    const elTitleATAG = document.createElement('a');
    elTitleATAG.href = obj.url;
    elTitleATAG.textContent = " [Question] "+obj.title;
    elTitle.append(elTitleATAG);
    const elInformation = document.createElement('div');
    elInformation.className = "discussion__information";
    elInformation.textContent = obj.author + ' / ' + new Date (obj.createdAt).toLocaleDateString();
    discussionContent.append(elTitle, elInformation);

    li.append(avatarWrapper, discussionContent, );
    return li;
};
//답변리스트 생성
const convertToAnswer = (value) => {
    const obj = value.answer
    const li = document.createElement("li"); // li 요소 생성
    li.className = "answer__container"; // 클래스 이름 지정
    const answerAvatarWrapper = document.createElement("div");
    answerAvatarWrapper.className = "answer__avatar--wrapper";
    const answerContent = document.createElement("div");
    answerContent.className = "answer__content";
    const answerAnswered = document.createElement("div");
    answerAnswered.className = "answer__answered";

    const answerAvatarImg = document.createElement('img');
    answerAvatarImg.src = obj.avatarUrl;
    answerAvatarImg.alt = 'avatar of ' + obj.author;
    answerAvatarWrapper.append(answerAvatarImg);

    const answerTitle = document.createElement('h2');
    answerTitle.className = "answer__title";
    const answerTitleATAG = document.createElement('a');
    answerTitleATAG.href = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
    answerTitleATAG.textContent = ' [ANSWER] ' + value.title;
    answerTitle.append(answerTitleATAG);
    const answerInformation = document.createElement('div');
    answerInformation.className = "answer__information";
    answerInformation.textContent = obj.author + ' / ' + new Date (obj.createdAt).toLocaleDateString();
    answerContent.append(answerTitle, answerInformation);

    const answerAnsweredPTag = document.createElement('p');
    answerAnsweredPTag.textContent = '➡'
    answerAnswered.append(answerAnsweredPTag);

    li.append(answerAnswered, answerAvatarWrapper, answerContent);
    return li;
};
//빈 대답 리스트
const convertToAnswerIsNull = () =>{
    const li = document.createElement('li');
    li.className = "answer__container";

    const pTag = document.createElement('p');
    pTag.textContent = '➡'

    const nullAnswer = document.createElement("h2");
    nullAnswer.textContent = "답변이 없습니다 "
    nullAnswer.className = 'nullAnswer';

    li.append(pTag,nullAnswer)
    return li
}

const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        if(agoraStatesDiscussions[i].answer==null){
            element.append(convertToDiscussion(agoraStatesDiscussions[i]),convertToAnswerIsNull());
        }
        else{
            element.append(convertToDiscussion(agoraStatesDiscussions[i]),convertToAnswer(agoraStatesDiscussions[i]));
        }
    }
return;
}


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const form = document.querySelector(".form");
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
const textArea = document.querySelector('.form__textbox > textarea');
form.addEventListener('submit',(event)=>{
    event.preventDefault(); //todo: 알아보기
    const obj = {
        id: "unique_number",
        createdAt: new Date(),
        title: title.value,
        url: "https://github.com/codestates-seb/agora-states-fe/discussions/43",
        author: author.value,
        answer: null,
        bodyHTML:
            '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS, Ubuntu<br>\nmacOS<br>\nNode.js 버전(node -v): 예)v14.16.0<br>\nv12.18.14</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nJavaScript Koans 04_Scope.js 문제 해결중</p>\n<div class="snippet-clipboard-content position-relative overflow-auto" data-snippet-clipboard-copy-content="it(\'lexical scope와 closure에 대해 다시 확인합니다.\', function () {\n    let age = 27;\n    let name = \'jin\';\n    let height = 179;\n\n    function outerFn() {\n      let age = 24;\n      name = \'jimin\';\n      let height = 178;\n\n      function innerFn() {\n        age = 26;\n        let name = \'suga\';\n        return height;\n      }\n\n      innerFn();\n\n      expect(age).to.equal(26);\n      expect(name).to.equal(\'jimin\');\n\n      return innerFn;\n    }\n\n    const innerFn = outerFn(); //  &lt; --- ①  이부분에 대해서\n\n    expect(age).to.equal(27);\n    expect(name).to.equal(\'jimin\');\n    expect(innerFn()).to.equal(178); // &lt;---  ② \n  });"><pre class="notranslate"><code class="notranslate">it(\'lexical scope와 closure에 대해 다시 확인합니다.\', function () {\n    let age = 27;\n    let name = \'jin\';\n    let height = 179;\n\n    function outerFn() {\n      let age = 24;\n      name = \'jimin\';\n      let height = 178;\n\n      function innerFn() {\n        age = 26;\n        let name = \'suga\';\n        return height;\n      }\n\n      innerFn();\n\n      expect(age).to.equal(26);\n      expect(name).to.equal(\'jimin\');\n\n      return innerFn;\n    }\n\n    const innerFn = outerFn(); //  &lt; --- ①  이부분에 대해서\n\n    expect(age).to.equal(27);\n    expect(name).to.equal(\'jimin\');\n    expect(innerFn()).to.equal(178); // &lt;---  ② \n  });\n</code></pre></div>\n<p dir="auto">어떠한 부분에서 이해가 안 되었나요?</p>\n<ol dir="auto">\n<li>\n<p dir="auto">① 부분에서 innerFn이라는 변수에 outerFn()을 할당했습니다.<br>\n변수에 함수호출문을 할당했다고 해석했습니다.<br>\n그렇다면 ①에서 const innerFn을 할당함과 동시에 할당을 하게되는 outerFn함수가 실행되나요?<br>\n그렇다면 ①도 즉시 실행 함수표현식인가요??</p>\n</li>\n<li>\n<p dir="auto">②에서 호출하는 innerFn()은 outerFn() 함수 내의 innerFn()을 호출 한 것인가요?<br>\n아니면 ①을 통해 innerFn호출에 의해 outerFn으로 접근하여 innerFn에 접근한 것인가요?</p>\n</li>\n</ol>\n<p dir="auto">제 생각에는 outerFn스코프내의 함수outerFn으로 바로 접근하는것이 바깥에서는 안으로 진입할 수 없는 규칙에 위배된다 생각합니다.</p>\n<p dir="auto">함수호이스팅은 함수내에 있는 함수까지 호이스팅 되어 전역으로 접근가능한건가요?</p>\n<p dir="auto">변수명과 함수명이 중복되어 공부하는 과정에서 잘못 이해하고 넘어갈 수 도 있을 것 같아 정확히 알아보기위해 질문을 남깁니다 감사합니다.</p>',
        avatarUrl:
            "https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4",

    }
        ul.prepend(convertToDiscussion(obj))
    title.value = "";
    author.value = "";
    form.value = "";
})