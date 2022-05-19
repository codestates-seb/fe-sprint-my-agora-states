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
  // avatar 작성
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.setAttribute("alt", `avatar of ${obj.author}`);
  // avatar 추가
  avatarWrapper.append(avatarImg);
  // title 작성
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.setAttribute("href", obj.url)
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  // information 작성
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  // content 추가
  discussionContent.append(discussionTitle, discussionInformation);
  // answer 작성
  const checkIcon = document.createElement("i");
  if(obj.answer === null) checkIcon.className = "fa-regular fa-circle-check"; 
  else checkIcon.className = "fa-solid fa-circle-check active";
  // answer 추가
  discussionAnswered.append(checkIcon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let pageIndex = 0;
const render = (element) => {
  let targetLength = agoraStatesDiscussions.length;
  // 마지막 페이지 구별
  if(pageIndex !== Math.floor(agoraStatesDiscussions.length / 10)) targetLength = (pageIndex * 10) + 10;
  // pageindex에 따라 element를 출력
  for (let i = pageIndex * 10; i < targetLength; i += 1) element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

document.querySelector("#submit").addEventListener("click", () => {
  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const content = document.querySelector("#story");
  const currentTime = getCurrentTime(new Date());

  // agoraStatesDiscussions[0]에 데이터 추가
  agoraStatesDiscussions.unshift({
    id: "D_kwDOHOApLM4APjJi",
    createdAt: currentTime,
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: name.value,
    answer: {
    },
    bodyHTML:
      '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir="auto">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir="auto">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir="auto">rm package-lock.json</p>\n<p dir="auto">rm -rf ./node_modules/</p>\n<p dir="auto">npm --verbose install</p>\n<p dir="auto">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory"><pre><span class="pl-s1">minjun</span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">pwd</span> \n<span class="pl-c1">/</span><span class="pl-v">Users</span><span class="pl-c1">/</span><span class="pl-s1">minjun</span><span class="pl-c1">/</span><span class="pl-v">Documents</span><span class="pl-c1">/</span><span class="pl-s1">fe_frontand_39</span><span class="pl-c1">/</span><span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span>\n<span class="pl-s1">minjun</span><span class="pl-kos"></span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">npm</span> <span class="pl-s1">install</span> \nenv: node: <span class="pl-v">No</span> <span class="pl-s1">such</span> <span class="pl-s1">file</span> <span class="pl-s1">or</span> <span class="pl-s1">directory</span></pre></div>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a href="https://mia-dahae.tistory.com/89" rel="nofollow">https://mia-dahae.tistory.com/89</a></p>\n<p dir="auto"><a href="https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory" rel="nofollow">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir="auto"><a href="https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0" rel="nofollow">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir="auto"><a href="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346" rel="nofollow">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir="auto"><a href="https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80" rel="nofollow">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
    avatarUrl:
      "https://avatars.githubusercontent.com/u/104333720?s=40&v=4",
  });

  // 화면에 출력
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  // 마지막 li 제거
  ul.childNodes[ul.childNodes.length - 1].remove();
  // Discussins에 데이터 추가
  addDiscussion();
})

// 현재시간 함수
const getCurrentTime = (currentTime) => {
  const year = currentTime.getFullYear();
  const month = `0${currentTime.getMonth() + 1}`.slice(-2);
  const day = `0${currentTime.getDate()}`.slice(-2);
  const hour = `0${currentTime.getHours()}`.slice(-2);
  const minute = `0${currentTime.getMinutes()}`.slice(-2);
  const second = `0${currentTime.getSeconds()}`.slice(-2);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

// localStorage에 Discussins 데이터 추가
const addDiscussion = () =>{
  window.localStorage.setItem("agoraStatesDiscussions", JSON.stringify(agoraStatesDiscussions));
  agoraStatesDiscussions = JSON.parse(window.localStorage.getItem("agoraStatesDiscussions"));
}

// pagination 숫자 추가
if(agoraStatesDiscussions.length > 10){
  for(let i = 0; i < agoraStatesDiscussions.length / 10; i++){
    const discussionsNums = document.querySelector(".discussions__pagination--nums");
    const pageNum = document.createElement("span");

    pageNum.className = "discussions__pagination--num";
    if(i === 0) pageNum.className = `${pageNum.className} btn_active`;
    pageNum.setAttribute("targetNum", i + 1);
    pageNum.textContent = i + 1;
    discussionsNums.append(pageNum);
  }
} else console.log("not over 10");

// pagination 기능 구현
const prevBtn = document.querySelector(".prev_btn");
const nextBtn = document.querySelector(".next_btn");

document.querySelectorAll(".discussions__pagination--num").forEach((e) => {
  e.addEventListener("click", (e) => {
    const maxNumber = Math.floor(agoraStatesDiscussions.length / 10);

    pageIndex = (e.target.textContent) - 1;
    prevBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");

    if(Number(pageIndex) === 0) prevBtn.classList.add("hide");
    if(Number(pageIndex) === maxNumber) nextBtn.classList.add("hide");

    document.querySelector(".btn_active").classList.remove("btn_active");
    e.target.classList.add("btn_active");

    reRender();
  })
})

// prev, next 기능 구현
prevBtn.addEventListener("click", (e) => {
  activeBtnReset();
  nextBtn.classList.remove("hide");

  if(pageIndex !== 0) reRender("-");
  if(pageIndex === 0) e.target.parentNode.className = `${e.target.parentNode.className} hide`;
})

nextBtn.addEventListener("click", (e) => {
  const maxNumber = Math.floor(agoraStatesDiscussions.length / 10);

  activeBtnReset();
  prevBtn.classList.remove("hide");

  if(pageIndex !== maxNumber) reRender("+");
  if(pageIndex === maxNumber) e.target.parentNode.className = `${e.target.parentNode.className} hide`;
})

// reRender function
const reRender = (op) => {
  if(op === "+") pageIndex++;
  else if(op === "-") pageIndex--;
  ul.innerHTML = "";
  render(ul);
}

// prev, next 활성화된 element reset
const activeBtnReset = () => {
  const targetNum = document.querySelector(".btn_active").textContent;
  const currnetTarget = document.querySelector(".btn_active");
  const nextTarget = document.querySelector(`span[targetnum='${Number(targetNum) + 1}']`);

  currnetTarget.classList.remove("btn_active");
  nextTarget.classList.add("btn_active");
}