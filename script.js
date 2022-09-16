// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 전체 컨테이너 틀

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; //질문 올린 사람 사진 
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; //내용
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; //답변
  //결국 위에는 DOM 노드를 하나씩 생성한 상태. 

  //작성자의 프로필 사진
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of'+obj.author;
  avatarWrapper.append(avatarImg);
  
  //링크제목을 위해서 노드로 태그 생성, 연결 
  const forLink = document.createElement('a');
  discussionContent.append(forLink)
  forLink.href = obj.url;
  forLink.textContent = obj.title;

  //작성자의 정보
  const $info = document.createElement('div');
  $info.textContent += obj.id + ' / ';
  $info.textContent += obj.createdAt;
  $info.classList.add('info')
  discussionContent.append($info)

  //답변이 있는지 없는지 값의 유무에 따라서 다르게 반환하자. 
  

  if(obj.answer === null){
    discussionAnswered.textContent = "답변하기";
  }else{
    discussionAnswered.textContent = "답변완료";
  }


  li.append(avatarWrapper, discussionContent, discussionAnswered); //여기서 세개를 합쳐서 붙이네?
  //위에서 li(전체 컨테이너를 담은 태그에 입력한 노드들을 추가했음. )
  return li; //만든 미니 li를 반환해줌 

};

//입력값 화면에 출력시키기 
const makeInfo = {}
let $form__input__name =  document.querySelector('.form__input--name #name')
let $form__input__title =  document.querySelector('.form__input--title #name')
let $form__input__text =  document.querySelector('.form__textbox #story')

function addDiscussions(event) {
  event.preventDefault();
  console.log("잘 되나?");
  const date = new Date();
  agoraStatesDiscussions.push({ //이 함수에 값을 받아서 넣고, 돔형태로까지 만들어줬음. 
      id: "D_kwDOHOApLM4APjJi",
      createdAt: date.toLocaleString('ko-kr'),
      title: $form__input__title.value,
      url: "https://www.naver.com/",
      author: $form__input__name.value,
      answer :null,
      bodyHTML:
        '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir="auto">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir="auto">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir="auto">rm package-lock.json</p>\n<p dir="auto">rm -rf ./node_modules/</p>\n<p dir="auto">npm --verbose install</p>\n<p dir="auto">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory"><pre><span class="pl-s1">minjun</span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">pwd</span> \n<span class="pl-c1">/</span><span class="pl-v">Users</span><span class="pl-c1">/</span><span class="pl-s1">minjun</span><span class="pl-c1">/</span><span class="pl-v">Documents</span><span class="pl-c1">/</span><span class="pl-s1">fe_frontand_39</span><span class="pl-c1">/</span><span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span>\n<span class="pl-s1">minjun</span><span class="pl-kos"></span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">npm</span> <span class="pl-s1">install</span> \nenv: node: <span class="pl-v">No</span> <span class="pl-s1">such</span> <span class="pl-s1">file</span> <span class="pl-s1">or</span> <span class="pl-s1">directory</span></pre></div>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a href="https://mia-dahae.tistory.com/89" rel="nofollow">https://mia-dahae.tistory.com/89</a></p>\n<p dir="auto"><a href="https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory" rel="nofollow">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir="auto"><a href="https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0" rel="nofollow">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir="auto"><a href="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346" rel="nofollow">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir="auto"><a href="https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80" rel="nofollow">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
      avatarUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjZfMTEy%2FMDAxNjYxNTA0ODYyODAy.Me_O7NKQwfK01nTkmqHdP09FzsLfxJ4fFzpbhHKnMmYg.V3bnBIRK6AseSoBehvHlfJu-09weUGdd-nzK2rB46f4g.JPEG.phw2794%2F20220826_171921.jpg&type=sc960_832"
  });
  
  li = convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length-1]) //돔으로 바꾸고 
  ul.insertBefore(li,ul.firstChild)
  console.log(agoraStatesDiscussions);
  $form__input__name.value = null;
  $form__input__title.value = null;
  $form__input__text.value = null;
}

//제출 버튼 누르면 이벤트 발생 
//내가 고쳐야 할 부분은 값이 전혀 안받아와짐. 
let $form_submit = document.querySelector('.form_submit') 
addEventListener('submit', addDiscussions)


//렌더링
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. 
//여기서 배열의 값을 돔으로 바꿔줬음 
const render = (element) => { 
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    //함수의 인자로 배열을 넘겨줌 
  }
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container"); //전체 리스트를
render(ul);



