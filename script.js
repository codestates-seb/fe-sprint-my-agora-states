// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.


// localStorage 정보 기존 data에 추가
const inputString = localStorage.getItem('InputInfo');
const parsInputString = JSON.parse(inputString);
// 로컬스토리지 비울시 주석처리 save 비우고 나서 해제 save
// let agoraArray = parsInputString.slice(0,parsInputString.length - agoraStatesDiscussions.length);

// agoraStatesDiscussions.unshift(...agoraArray);

console.log(agoraStatesDiscussions);

// 로컬스토리지 비우기
// localStorage.clear();  


if(inputString === true){
  // 로컬스토리지 관리가 이상함... 로컬 스토리지 비우고 나서 주석해제 후 save 다시 주석 save
 console.log(inputIsTrue);
}


// 입력 버튼
const submit = document.querySelector('.form__submit');
// 입력 값
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');

// 페이지 버튼, 텍스트
const prevBtn = document.querySelector('.prev__btn');
const nextBtn = document.querySelector('.next__btn');
const pageText = document.querySelector('.page');

const ul = document.querySelector("ul.discussions__container");


// input이 모두 안 비어있으면 true
const inputIsTrue = () => inputName.value.length !== 0 && inputTitle.value.length !== 0 && inputStory.value.length !== 0;

// 시간 Form 변경하는 함수
const convertTime = (date) =>{
  let timelist = date.split(','); // ['7/19/2022', ' 10:01:33 AM']
  let timeSplit = timelist[1].split(' '); // ['', '10:01:33', 'AM']
  let yearSplit = timelist[0].split('/'); // ['7', '19', '2022']
  let year = yearSplit[2];
  let month = yearSplit[0];
  let day = yearSplit[1];
  let ampm = timeSplit[2];
  let time = timeSplit[1];

  if(ampm === 'AM'){
    ampm = '오전';
  } else{
    ampm = '오후';
  }

  return `${year}.${month}.${day} ${ampm} ${time}`
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 사용자 아바타 이미지 DOM
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute('src', obj.avatarUrl);
  avatarImg.setAttribute('alt', `avatar of ${obj.author}`)

  avatarWrapper.append(avatarImg);
  
  // 사용자 질문 DOM
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement('a');
  discussionLink.setAttribute('href', obj.url);
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);


  // information 설정 
  const discussionInfor = document.createElement("div");
  discussionInfor.className = "discussion__information";
  // new Date(obj.createdAt).toLocaleString() <- 한국 시간으로 표현됨.
  const time = new Date(obj.createdAt).toLocaleString();
  discussionInfor.textContent = `${obj.author} / ${convertTime(time)}`;

  // 사용자 대답 DOM
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerCheck = document.createElement('p');
  if(obj.answer !== null){
    answerCheck.textContent = '☑';
  }else{
    answerCheck.textContent = '☐';
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionContent.append(discussionTitle, discussionInfor);
  discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let page = 1;
const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
//   if(agoraStatesDiscussions.length - page*10 >= 0){
//     for (let i = (page-1)*10; i < page*10; i += 1) {
//       element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//     }
//   } 
//   else{
//     for (let i = (page-1)*10; i < agoraStatesDiscussions.length; i += 1) {
//       element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//     }
//   }
  return;
};

// 그전에 생성된 li 제거
const remove = (element) => {

  if(page === Math.floor(agoraStatesDiscussions.length/10)+1){
    while(element.children.length > agoraStatesDiscussions.length%10){
      // console.log(element.removeChild(element.firstChild));
      element.removeChild(element.firstChild)
    }
  }else {
    while(element.children.length > 10){
      // console.log(element.removeChild(element.firstChild));
      element.removeChild(element.firstChild)
    }
  }
  return;
}

// 클릭시 추가하는 부분이 실행되어야함.
submit.onclick = () => {
  let date = new Date();
  const obj = {
    id: "unique id",
    createdAt: date.toLocaleString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: inputName.value,
    answer: null,
    bodyHTML:
      '<ul dir="auto">\n<li>\n<p dir="auto">운영 체제: macOS</p>\n</li>\n<li>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?</p>\n</li>\n</ul>\n<p dir="auto">코플릿 객체 21번 문제에서 \' \'(공백하나인 문자열)입력시 오류가 발생합니다.</p>\n<ul dir="auto">\n<li>어떠한 부분에서 이해가 안 되었나요?</li>\n</ul>\n<p dir="auto">빈 문자열을 입력받은 경우, 빈 문자열을 리턴해야 합니다.<br>\n라는 주의사항에 맞게 조건문을   <code class="notranslate">if(str === \' \'){ return bigChar;}</code> 추가했습니다.<br>\n그런데 테스트 실행할때 주석처리한 아래 3줄이 활성화 되어있으면</p>\n<blockquote>\n<p dir="auto">\' \'을(를) 입력받은 경우, 빈 문자열을 리턴해야 합니다 "</p>\n</blockquote>\n<p dir="auto">이라는 지문에서 통과가 안되고 \' \'(공백하나인 문자열)이 리턴된다고 나옵니다.<br>\n크롬 디버거할때는<br>\n<a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/90553688/168499795-ccd028a3-6c1e-452d-83e7-0144b8b823e4.png"><img width="485" alt="image" src="https://user-images.githubusercontent.com/90553688/168499795-ccd028a3-6c1e-452d-83e7-0144b8b823e4.png" style="max-width: 100%;"></a><br>\n빈 문자열로 뜨는것 같은데 어느부분에서 문제가 되는걸까요??</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="function mostFrequentCharacter(str) {\n\n  let newObj = {};\n  let bigChar = \'\';\n  let bigNum = 1;\n\n  if(str === \' \'){\n    return bigChar;\n  }\n  \n  for(let i = 0; i&lt; str.length; i++){\n    // if(i === 0){     &lt;----------------------여기 부분\n    //   bigChar = str[0];\n    // }\n\n    let key = str[i];\n    if(key === \' \'){\n      continue;\n    }\n\n    if(!(key in newObj)){\n      newObj[key] = 1;\n    } else{\n      newObj[key]++;\n    }\n\n    if(newObj[key] &gt; bigNum){\n      bigNum = newObj[key];\n      bigChar = key;\n    }\n  }\n  return bigChar;\n}\n"><pre><span class="pl-k">function</span> <span class="pl-en">mostFrequentCharacter</span><span class="pl-kos">(</span><span class="pl-s1">str</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>\n\n  <span class="pl-k">let</span> <span class="pl-s1">newObj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-kos">;</span>\n  <span class="pl-k">let</span> <span class="pl-s1">bigChar</span> <span class="pl-c1">=</span> <span class="pl-s">\'\'</span><span class="pl-kos">;</span>\n  <span class="pl-k">let</span> <span class="pl-s1">bigNum</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>\n\n  <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">str</span> <span class="pl-c1">===</span> <span class="pl-s">\' \'</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n    <span class="pl-k">return</span> <span class="pl-s1">bigChar</span><span class="pl-kos">;</span>\n  <span class="pl-kos">}</span>\n  \n  <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">&lt;</span> <span class="pl-s1">str</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n    <span class="pl-c">// if(i === 0){     &lt;----------------------여기 부분</span>\n    <span class="pl-c">//   bigChar = str[0];</span>\n    <span class="pl-c">// }</span>\n\n    <span class="pl-k">let</span> <span class="pl-s1">key</span> <span class="pl-c1">=</span> <span class="pl-s1">str</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">;</span>\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">key</span> <span class="pl-c1">===</span> <span class="pl-s">\' \'</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-k">continue</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-c1">!</span><span class="pl-kos">(</span><span class="pl-s1">key</span> <span class="pl-k">in</span> <span class="pl-s1">newObj</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span> <span class="pl-k">else</span><span class="pl-kos">{</span>\n      <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span><span class="pl-c1">++</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n\n    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span> <span class="pl-c1">&gt;</span> <span class="pl-s1">bigNum</span><span class="pl-kos">)</span><span class="pl-kos">{</span>\n      <span class="pl-s1">bigNum</span> <span class="pl-c1">=</span> <span class="pl-s1">newObj</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span><span class="pl-kos">;</span>\n      <span class="pl-s1">bigChar</span> <span class="pl-c1">=</span> <span class="pl-s1">key</span><span class="pl-kos">;</span>\n    <span class="pl-kos">}</span>\n  <span class="pl-kos">}</span>\n  <span class="pl-k">return</span> <span class="pl-s1">bigChar</span><span class="pl-kos">;</span>\n<span class="pl-kos">}</span></pre></div>',
      avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",

  };
  
  
  if(inputIsTrue()){
    agoraStatesDiscussions.unshift(obj);
    // 맨앞에 추가하는 속성
    ul.prepend(convertToDiscussion(obj));
    localStorage.setItem('InputInfo',JSON.stringify(agoraStatesDiscussions))
  }
  console.log(agoraStatesDiscussions);
  console.log(localStorage);
}

prevBtn.onclick = () => {
  if(page > 1){ 
    page -= 1;
    nextBtn.removeAttribute('disabled');
    render(ul);
    remove(ul);
  }
  if(page === 1){
    prevBtn.setAttribute('disabled', true);
  }

  pageText.textContent = `Page ${page}`;
  console.log(page);
}

nextBtn.onclick = () => {
  if(page <= Math.floor(agoraStatesDiscussions.length/10)){
    page += 1;
    prevBtn.removeAttribute('disabled');
    render(ul);
    remove(ul);
  }
  if(page === Math.floor(agoraStatesDiscussions.length/10)+1){
    
    nextBtn.setAttribute('disabled', true);
  }
  
  pageText.textContent = `Page ${page}`;
  console.log(page);
}

// console.log(storageObj);
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// agoraStatesDiscussions = newagoraDiscussions();

render(ul);


