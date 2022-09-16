// form submit 스크립트
const form = document.querySelector(".form");
const author = document.querySelector(".form__input--name > input")
const title = document.querySelector(".form__input--title > input")
const textArea = document.querySelector(".form__textbox > textarea")

// 이벤트 리스너 reset
const resetButton = document.querySelector(".button__reset")
resetButton.addEventListener("click", () => {
  console.log('reset')
  author.value = ''
  title.value = ''
  textArea.value = ''
})

// 이벤트 리스터 submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // 객체를 하나 만든다.
    const obj = {
      id: "unique number",
      createdAt: new Date(),
      title:
        title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
      author: author.value,
      answer: null,
      bodyHTML:
        '<ul dir="auto">\n<li>\n<p dir="auto">운영 체제: macOS</p>\n</li>\n<li>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?</p>\n</li>\n</ul>\n<p dir="auto">코플릿 객체 21번 문제에서 \' \'(공백하나인 문자열)입력시 오류가 발생합니다.</p>\n<ul dir="auto">\n<li>어떠한 부분에서 이해가 안 되었나요?</li>\n</ul>\n<p dir="auto">빈 문자열을 입력받은 경우, 빈 문자열을 리턴해야 합니다.<br>\n라는 주의사항에 맞게 조건문을   <code class="notranslate">if(str === \' \'){ return bigChar;}</code> 추가했습니다.<br>\n그런데 테스트 실행할때 주석처리한 아래 3줄이 활성화 되어있으면</p>\n<blockquote>\n<p dir="auto">\' \'을(를) 입력받은 경우, 빈 문자열을 리턴해야 합니다 "</p>\n</blockquote>\n<p dir="auto">이라는 지문에서 통과가 안되고 \' \'(공백하나인 문자열)이 리턴된다고 나옵니다.<br>\n크롬 디버거할때는<br>\n<a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/90553688/168499795-ccd028a3-6c1e-452d-83e7-0144b8b823e4.png"><img width="485" alt="image" src="https://user-images.githubusercontent.com/90553688/168499795-ccd028a3-6c1e-452d-83e7-0144b8b823e4.png" style="max-width: 100%;"></a><br>\n빈 문자열로 뜨는것 같은데 어느부분에서 문제가 되는걸까요??</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="function mostFrequentCharacter(str) {\n\n  let newObj = {};\n  let bigChar = \'\';\n  let bigNum = 1;\n\n  if(str === \' \'){\n    return bigChar;\n  }\n  \n  for(let i = 0; i&lt; str.length; i++){\n    // if(i === 0){     &lt;----------------------여기 부분\n    //   bigChar = str[0];\n    // }\n\n    let key = str[i];\n    if(key === \' \'){\n      continue;\n    }\n\n    if(!(key in newObj)){\n      newObj[key] = 1;\n    } else{\n      newObj[key]++;\n    }\n\n    if(newObj[key] &gt; bigNum){\n      bigNum = newObj[key];\n      bigChar = key;\n    }\n  }\n  return bigChar;\n}\n"><pre><span class="pl-k">function</span> <span class="pl-en">mostFrequentCharacter</span><span class="pl-kos">(</span><span class="pl-s1">str</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n\n  <span class="pl-k">let</span> <span class="pl-s1">newObj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-kos">;</span>\n  <span class="pl-k">let</span> <span class="pl-s1">bigChar</span> <span class="pl-c1">=</span> <span class="pl-s">\'\'</span><span class="pl-kos">;</span>\n  <span class="pl-k">let</span> <span class="pl-s1">bigNum</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>\n\n  <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">str</span> <span class="pl-c1">===</span> <span class="pl-s">\' \'</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n    <span class="pl-k">return</span> <span class="pl-s1">bigChar</span><span class="pl-kos">;</span>\n  <span class="pl-kos">}</span>\n  \n  <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">&lt;</span> <span class="pl-s1">str</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n    <span class="pl-c">// if(i === 0){     &lt;----------------------여기 부분</span>\n    <span class="pl-c">//   bigChar = str[0];</span>\n    <span class="pl-c">// }</span>\n\n    <span class="pl-k">let</span> <span class="pl-s1">key</span> <span class="pl-c1">=</span> <span class="pl-s1">str</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">;</span>\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">key</span> <span class="pl-c1">===</span> <span class="pl-s">\' \'</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-k">continue</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-c1">!</span><span class="pl-kos">(</span><span class="pl-s1">key</span> <span class="pl-k">in</span> <span class="pl-s1">newObj</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span> <span class="pl-k">else</span><span class="pl-kos">{</span>\n      <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span><span class="pl-c1">++</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span> <span class="pl-c1">&gt;</span> <span class="pl-s1">bigNum</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-s1">bigNum</span> <span class="pl-c1">=</span> <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span><span class="pl-kos">;</span>\n      <span class="pl-s1">bigChar</span> <span class="pl-c1">=</span> <span class="pl-s1">key</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n  <span class="pl-kos">}</span>\n  <span class="pl-k">return</span> <span class="pl-s1">bigChar</span><span class="pl-kos">;</span>\n<span class="pl-kos">}</span></pre></div>',
      avatarUrl:
        "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
    }
  
    // 그 객체를 convertToDiscussion에 넣어서 DOM에 변환한다.
    ul.prepend(convertToDiscussion(obj));
    // 객체를 아고라스테이츠 디스커션에 추가한다.
    agoraStatesDiscussions.unshift(obj);
    // 로컬스토리지에 agoraStatesDiscussions 데이터 저장
    // setLocalStorageWithData(agoraStatesDiscussions);
    // console.log(window.localStorage)
    // form을 초기화한다.
    author.value = ''
    title.value = ''
    textArea.value = ''
  })