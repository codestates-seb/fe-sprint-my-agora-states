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

  const avartarImg = document.createElement("img");
  avartarImg.src = obj.avatarUrl;
  avartarImg.alt = "avarat of" + obj.author;
  avartarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avartarImg);

  const discussionTitle = document.createElement("h3");
  const discussionTitleAtag = document.createElement("a");
  const discussionInfo = document.createElement("div");
  discussionTitleAtag.href = obj.url;
  discussionTitleAtag.textContent = obj.title;
  discussionTitle.className = "discussion__title";
  discussionTitle.append(discussionTitleAtag);
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInfo);

  const discussionAnsweredPtag = document.createElement("p");
  const keyValue = obj.title;
  if (keyValue.includes("notice")) {
    discussionAnsweredPtag.textContent = "";
  } else if (obj.answer === null) {
    discussionAnsweredPtag.textContent = "🍠";
  } else if (obj.answer !== null) {
    discussionAnsweredPtag.textContent = "🎉";
  }
  discussionAnswered.append(discussionAnsweredPtag);
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

const form = document.querySelector(".form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");

function onSubmitAddQuestion(event) {
  event.preventDefault();
  const date = new Date();
  const newObj = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: inputName.value,
    answer: null,
    bodyHTML:
      '<ul dir="auto">\n<li>\n<p dir="auto">운영 체제: macOS</p>\n</li>\n<li>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?</p>\n</li>\n</ul>\n<p dir="auto">코플릿 객체 21번 문제에서 \' \'(공백하나인 문자열)입력시 오류가 발생합니다.</p>\n<ul dir="auto">\n<li>어떠한 부분에서 이해가 안 되었나요?</li>\n</ul>\n<p dir="auto">빈 문자열을 입력받은 경우, 빈 문자열을 리턴해야 합니다.<br>\n라는 주의사항에 맞게 조건문을   <code class="notranslate">if(str === \' \'){ return bigChar;}</code> 추가했습니다.<br>\n그런데 테스트 실행할때 주석처리한 아래 3줄이 활성화 되어있으면</p>\n<blockquote>\n<p dir="auto">\' \'을(를) 입력받은 경우, 빈 문자열을 리턴해야 합니다 "</p>\n</blockquote>\n<p dir="auto">이라는 지문에서 통과가 안되고 \' \'(공백하나인 문자열)이 리턴된다고 나옵니다.<br>\n크롬 디버거할때는<br>\n<a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/90553688/168499795-ccd028a3-6c1e-452d-83e7-0144b8b823e4.png"><img width="485" alt="image" src="https://user-images.githubusercontent.com/90553688/168499795-ccd028a3-6c1e-452d-83e7-0144b8b823e4.png" style="max-width: 100%;"></a><br>\n빈 문자열로 뜨는것 같은데 어느부분에서 문제가 되는걸까요??</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="function mostFrequentCharacter(str) {\n\n  let newObj = {};\n  let bigChar = \'\';\n  let bigNum = 1;\n\n  if(str === \' \'){\n    return bigChar;\n  }\n  \n  for(let i = 0; i&lt; str.length; i++){\n    // if(i === 0){     &lt;----------------------여기 부분\n    //   bigChar = str[0];\n    // }\n\n    let key = str[i];\n    if(key === \' \'){\n      continue;\n    }\n\n    if(!(key in newObj)){\n      newObj[key] = 1;\n    } else{\n      newObj[key]++;\n    }\n\n    if(newObj[key] &gt; bigNum){\n      bigNum = newObj[key];\n      bigChar = key;\n    }\n  }\n  return bigChar;\n}\n"><pre><span class="pl-k">function</span> <span class="pl-en">mostFrequentCharacter</span><span class="pl-kos">(</span><span class="pl-s1">str</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n\n  <span class="pl-k">let</span> <span class="pl-s1">newObj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-kos">;</span>\n  <span class="pl-k">let</span> <span class="pl-s1">bigChar</span> <span class="pl-c1">=</span> <span class="pl-s">\'\'</span><span class="pl-kos">;</span>\n  <span class="pl-k">let</span> <span class="pl-s1">bigNum</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>\n\n  <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">str</span> <span class="pl-c1">===</span> <span class="pl-s">\' \'</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n    <span class="pl-k">return</span> <span class="pl-s1">bigChar</span><span class="pl-kos">;</span>\n  <span class="pl-kos">}</span>\n  \n  <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">&lt;</span> <span class="pl-s1">str</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n    <span class="pl-c">// if(i === 0){     &lt;----------------------여기 부분</span>\n    <span class="pl-c">//   bigChar = str[0];</span>\n    <span class="pl-c">// }</span>\n\n    <span class="pl-k">let</span> <span class="pl-s1">key</span> <span class="pl-c1">=</span> <span class="pl-s1">str</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">;</span>\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">key</span> <span class="pl-c1">===</span> <span class="pl-s">\' \'</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-k">continue</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-c1">!</span><span class="pl-kos">(</span><span class="pl-s1">key</span> <span class="pl-k">in</span> <span class="pl-s1">newObj</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span> <span class="pl-k">else</span><span class="pl-kos">{</span>\n      <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span><span class="pl-c1">++</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span> <span class="pl-c1">&gt;</span> <span class="pl-s1">bigNum</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-s1">bigNum</span> <span class="pl-c1">=</span> <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span><span class="pl-kos">;</span>\n      <span class="pl-s1">bigChar</span> <span class="pl-c1">=</span> <span class="pl-s1">key</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n  <span class="pl-kos">}</span>\n  <span class="pl-k">return</span> <span class="pl-s1">bigChar</span><span class="pl-kos">;</span>\n<span class="pl-kos">}</span></pre></div>',
    avatarUrl:
      "https://i.namu.wiki/i/BnjzjpaIj_75DB9fgUX7OSCve62dMgP8cq4pIeIf6pvE0_yseanFbydLWsRotflJP0v8yOi_avVdTXBp0QADplHxmP3DHCVvys11Q2m0rX-TTHnFvqP-kJlB-BZISCig8jD36IhG836dch4SJO1jog.webp",
  };
  const giljongnim = convertToDiscussion(newObj);
  ul.prepend(giljongnim);
}

form.addEventListener("submit", onSubmitAddQuestion);
