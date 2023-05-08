// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
  if(!localStorage.getItem('discussions'))
  localStorage.setItem('discussions', JSON.stringify(agoraStatesDiscussions))
} else {
  // Too bad, no localStorage for us
}

// const temp = JSON.parse(localStorage.getItem('discussions'))
// localStorage.setItem('discussions', JSON.stringify(temp))


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
  const avatarImg = document.createElement("img")
  avatarImg.classList.add("discussion__avatar--image")
  avatarImg.setAttribute('src', `${obj.avatarUrl}`)
  avatarImg.setAttribute('alt', `avatar of ${obj.author}`)
  avatarWrapper.appendChild(avatarImg)

  const discussionTitle = document.createElement('h2')
  discussionTitle.classList.add('discussion__title')
  const titleLink = document.createElement('a')
  // titleLink.setAttribute('href', `${obj.url}`)
  titleLink.textContent = obj.title

  const discussionDetail = document.createElement('div')
  discussionDetail.classList.add('discussion__detail--container')
  discussionDetail.classList.add('hide')
  const button = document.createElement('button')
  button.onclick = () => {
    discussionDetail.classList.add('hide')
  }
  button.textContent = 'X'
  button.classList.add("exit-button")
  discussionDetail.innerHTML = obj.bodyHTML
  discussionDetail.prepend(button)

  document.body.appendChild(discussionDetail)

  titleLink.onclick = () => {
    discussionDetail.classList.remove('hide')
  }


  discussionTitle.appendChild(titleLink)
  discussionContent.appendChild(discussionTitle)

  const discussionInformation = document.createElement('div')
  discussionInformation.classList.add('discussion__information')
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.appendChild(discussionInformation)

  const discussionBody = document.createElement('div')
  discussionBody.innerHTML = obj.bodyHTML
  // discussionContent.appendChild(discussionBody)

  discussionAnswered.classList.add('center-single-content')
  if (obj.answer) {
    const p = document.createElement('p')
    p.textContent = '☑'
    p.onclick = () => {


      discussionAnswered.appendChild()
    }
    discussionAnswered.appendChild(p)
  }

  /*
  answer:
  { id: 'DC_kwDOHOApLM4AKg6M', 
  createdAt: '2022-05-16T02:09:52Z', 
  url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236', 
  author: 'Kingsenal', 
  bodyHTML: '<p dir="auto">안녕하세요. <a href="https://github.com/d… 마크해주세요 ✅<br>\n감사합니다.🚀<br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
   … }
  author
  :
  "dubipy"
  avatarUrl
  :
  "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  bodyHTML
  :
  "<p dir=\"auto\">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir=\"auto\">운영 체제: 예) macOS</p>\n<p dir=\"auto\">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir=\"auto\">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir=\"auto\">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir=\"auto\">rm package-lock.json</p>\n<p dir=\"auto\">rm -rf ./node_modules/</p>\n<p dir=\"auto\">npm --verbose install</p>\n<p dir=\"auto\">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir=\"auto\">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div data-snippet-clipboard-copy-content=\"minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory\" class=\"highlight highlight-source-js position-relative overflow-auto\"><pre><span class=\"pl-s1\">minjun</span>@<span class=\"pl-s1\">dubi</span> <span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span> <span class=\"pl-c1\">%</span> <span class=\"pl-s1\">pwd</span> \n<span class=\"pl-c1\">/</span><span class=\"pl-v\">Users</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">minjun</span><span class=\"pl-c1\">/</span><span class=\"pl-v\">Documents</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">fe_frontand_39</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span>\n<span class=\"pl-s1\">minjun</span><span class=\"pl-kos\"></span>@<span class=\"pl-s1\">dubi</span> <span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span> <span class=\"pl-c1\">%</span> <span class=\"pl-s1\">npm</span> <span class=\"pl-s1\">install</span> \nenv: node: <span class=\"pl-v\">No</span> <span class=\"pl-s1\">such</span> <span class=\"pl-s1\">file</span> <span class=\"pl-s1\">or</span> <span class=\"pl-s1\">directory</span></pre></div>\n<p dir=\"auto\">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a rel=\"nofollow\" href=\"https://mia-dahae.tistory.com/89\">https://mia-dahae.tistory.com/89</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory\">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0\">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346\">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80\">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://hellowworlds.tistory.com/57\">https://hellowworlds.tistory.com/57</a></p>"
  createdAt
  :
  "2022-05-16T01:02:17Z"
  id
  :
  "D_kwDOHOApLM4APjJi"
  title
  :
  "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다"
  url
  :
  "https://github.com/codestates-seb/agora-states-fe/discussions/45"

  */
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const elCurrentPage = document.querySelector('.pagination__number')
const objPerPage = 10
const temp = JSON.parse(localStorage.getItem('discussions'))
let pageCount = Math.ceil(temp.length / objPerPage)
const render = (element) => {
  const temp = JSON.parse(localStorage.getItem('discussions'))
  pageCount = Math.ceil(temp.length / objPerPage)
  for (let i = (Number(elCurrentPage.textContent) - 1) * objPerPage; i < (Number(elCurrentPage.textContent) - 1) * objPerPage + 10; i += 1) {
    if (temp[i]) {
      element.append(convertToDiscussion(temp[i]));
    }

  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


const form = document.querySelector('form')
form.addEventListener('submit', function (event) {
  event.preventDefault()

  const title = document.querySelector('.form__input--title > input')
  const name = document.querySelector('.form__input--name > input')
  const body = document.querySelector('.form__textbox > textarea')

  console.log(title.value, name.value, body.value);
  // if(title.length && name.length && body.length){
  // }else{
  //   alert('빈칸을 채워주세요.')
  // }
  const obj = {
    title: title.value,
    author: name.value,
    bodyHTML: body.value,
    createdAt: `${new Date().toISOString()}`
  }

  title.value = ''
  name.value = ''
  body.value = ''
  const temp = JSON.parse(localStorage.getItem('discussions'))
  temp.unshift(obj)
  localStorage.setItem('discussions', JSON.stringify(temp))


  // 화면 다 지우고 
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  elCurrentPage.textContent = 1
  render(ul);



})

const elPageChangers = document.querySelectorAll('.pagination__button')

elPageChangers.forEach(el => {
  el.addEventListener('click', () => {
    if (el.classList.contains('left')) {
      if (Number(elCurrentPage.textContent) > 1) {
        elCurrentPage.textContent = Number(elCurrentPage.textContent) - 1
        // 화면 다 지우고 
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }

        // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
        render(ul);

        window.scrollTo(0, 0)
      }

    } else if (el.classList.contains('right')) {
      if (Number(elCurrentPage.textContent) < pageCount) {
        elCurrentPage.textContent = Number(elCurrentPage.textContent) + 1
        // 화면 다 지우고 
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }

        // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
        render(ul);

        window.scrollTo(0, 0)
      }
    }

  })


});