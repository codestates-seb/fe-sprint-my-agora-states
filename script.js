// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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
  const avatarImg = document.createElement('img')
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of '+ obj.author;
  avatarImg.className = 'discussion__avatar--image'
  avatarWrapper.append(avatarImg)

  const discussionTitle = document.createElement('h2')
  discussionTitle.className = 'discussion__title'
  const discussionTitlelink = document.createElement('a')
  discussionTitlelink.href = obj.url;
  discussionTitlelink.textContent = obj.title;
  discussionTitle.append(discussionTitlelink)
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(discussionInfo)
  
  const discussionanswer = document.createElement('p')
  discussionanswer.textContent = obj.answer ? '☑' : '';
  discussionAnswered.append(discussionanswer);

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
fetch('http://localhost:4000/discussions')
.then(res=>res.json())
.then(json=>{
  agoraStatesDiscussions = json;
  const ul = document.querySelector("ul.discussions__container");
  render(ul);
})

const Inputname = document.querySelector('.form__input--name > input')
const Inputtitle = document.querySelector('.form__input--title > input')
const Inputques = document.querySelector('.form__textbox > textarea')
const form = document.querySelector('.form')


form.addEventListener('submit',event =>{
  event.preventDefault();

  const stor = JSON.stringify(agoraStatesDiscussions);
  const stor2 = JSON.parse(stor)
  localStorage.setItem('items' , stor);

  const obj ={ 
  id: "unique name",
  createdAt: new Date(),
  title: Inputtitle.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/24",
  author: Inputname.value,
  answer: {
    id: "DC_kwDOHOApLM4AKV90",
    createdAt: "2022-05-09T03:16:33Z",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/24#discussioncomment-2711412",
    author: "Kingsenal",
    bodyHTML:
      '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/kanghyew0n/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/kanghyew0n">@kanghyew0n</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 nvm 버젼이 확인이 안돼서 질문 주신 것 같은데요 !</p>\n<p dir="auto">nvm은 설치 후 터미널을 닫고 새로 열어야지 적용 되는데요<br>\n터미널을 닫은 후 새로 열어서 명령어를 치신 건지 궁금합니다 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  },
  bodyHTML:
    '<h3 dir="auto">운영 체제: 예) macOS, Ubuntu</h3>\n<ul dir="auto">\n<li>Ubuntu</li>\n</ul>\n<h3 dir="auto">Node.js 버전(node -v): 예)v14.16.0</h3>\n<ul dir="auto">\n<li>v8.10.0</li>\n</ul>\n<h3 dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?</h3>\n<ul dir="auto">\n<li>Chapter3-1. nvm &amp; node.js</li>\n<li>nvm을 install 하는 과정에서</li>\n</ul>\n<p dir="auto"><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/104333249/167332095-67a26963-bcf9-4a0b-a5aa-f089c483ef71.png"><img src="https://user-images.githubusercontent.com/104333249/167332095-67a26963-bcf9-4a0b-a5aa-f089c483ef71.png" alt="image" style="max-width: 100%;"></a></p>\n<ul dir="auto">\n<li>이 부분은 성공해서 =&gt; nvm is already installed 됐습니다!</li>\n<li>nvm --version 이 부분을 입력하면</li>\n</ul>\n<p dir="auto"><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/104333249/167332678-1680a18b-8cb7-4400-9cda-d56eb4e3befa.png"><img src="https://user-images.githubusercontent.com/104333249/167332678-1680a18b-8cb7-4400-9cda-d56eb4e3befa.png" alt="image" style="max-width: 100%;"></a></p>\n<p dir="auto"><strong>Command \'nvm\' not found, did you mean:<br>\nnvm을 찾을 수 없다고 나옵니다ㅜㅜ</strong></p>\n<ul dir="auto">\n<li>node.js 버전도 확인되고 js도 잘 출력됩니다.</li>\n</ul>\n<br>\n<h3 dir="auto">어떠한 부분에서 이해가 안 되었나요?</h3>\n<ul dir="auto">\n<li>nvm 공식문서도 따라해봤지만 같은 상황입니다.<br>\n<a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/104333249/167333904-e41e05e3-4fdb-43bb-83f0-53a1db8847a9.png"><img src="https://user-images.githubusercontent.com/104333249/167333904-e41e05e3-4fdb-43bb-83f0-53a1db8847a9.png" alt="image" style="max-width: 100%;"></a></li>\n</ul>\n<h3 dir="auto">검색했던 링크가 있다면 첨부해 주세요.</h3>\n<ul dir="auto">\n<li><a href="https://stackoverflow.com/questions/16904658/node-version-manager-install-nvm-command-not-found" rel="nofollow">Node Version Manager install - nvm command not found</a></li>\n</ul>',
  avatarUrl: "https://avatars.githubusercontent.com/u/104333249?s=64&v=4",};

  
  agoraStatesDiscussions.unshift(obj);
  
  ul.prepend(convertToDiscussion(obj));

  Inputtitle.value = "";
  Inputques.value = "";
  Inputname.value = "";
  stor2.push(obj);
  localStorage.setItem('items',JSON.stringify(stor2));
}
)
