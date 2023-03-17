// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
async function entire() {
  let data = await agoraStatesDiscussions()
  // console.log(await agoraStatesDiscussions())
  
  // let data;
  // if (localStorage.agora) {
  //   data = JSON.parse(localStorage.agora)
  // } else {
  //   data = await agoraStatesDiscussions.slice()
  // }
  
  
  // convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
  const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    let title = obj.title
    if (title === undefined) {
      li.classList.add('answer__hidden')
      // li.classList.remove('discussion__container')
      const strtmp = document.createElement('div')
      strtmp.innerHTML = obj.bodyHTML
      title = strtmp.textContent
    } else {
      li.classList.add("discussion__container"); // 클래스 이름 지정
    }
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";
    const avatarImage = document.createElement("img");
    avatarImage.classList = "discussion__avatar--image";
    const discussionTitle = document.createElement("h2");
    discussionTitle.classList = "discussion__title";
    const discussionTitleA = document.createElement("a");
    const discussionInfo = document.createElement("div");
    discussionInfo.classList.add("discussion__information");
    const createdAt = new Date(obj.createdAt).toLocaleString()
    const discussionAnsweredP = document.createElement("i");
    let answered;
  
    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
    avatarImage.setAttribute('src', obj.avatarUrl)
    avatarImage.setAttribute('alt', "avatar of " + obj.author)
    avatarWrapper.append(avatarImage)
    discussionTitleA.setAttribute('href', obj.url)
    discussionTitleA.target = '_blank'
    discussionContent.append(discussionTitle)
    discussionTitle.append(discussionTitleA)
    discussionTitleA.textContent = title
    discussionInfo.textContent = obj.author + ' / ' + createdAt
    discussionContent.append(discussionInfo)
  
    if (obj.answer) {
      discussionAnsweredP.classList = 'fa-solid fa-square-check'
      answered = convertToDiscussion(obj.answer)
    } else {
      discussionAnsweredP.classList = 'fa-regular fa-square-check'
    }
  
    discussionAnswered.append(discussionAnsweredP)
    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
  };
  
  // span.. n개 추가
  const spanMaker = (num) => {
    const span = document.createElement("span")
    // span.classList.add('discussion__page')
    span.textContent = num + 1
    return span
  }
  
  // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
  const render = (element, num = 1) => {
    let last = num * 10
    if (num === String(parseInt(data.length / 10) + 1)) {
      last = data.length
    }
    // console.log(last)
    for (let i = (num - 1) * 10; i < last; i += 1) {
      element.append(convertToDiscussion(data[i]));
      if (data[i].answer) {
        element.append(convertToDiscussion(data[i].answer));
      }
      // console.log(element)
      // console.log(i)
      // console.log(agoraStatesDiscussions[i])
    }
  };
  
  // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
  const ul = document.querySelector("ul.discussions__container");
  const discussionPages = document.querySelector('.discussion__pages')
  
  for (let i = 1; i < (parseInt(data.length / 10) + 1); i++) {
    discussionPages.append(spanMaker(i))
  }
  // for (let i = 0; i < Object.keys(localStorage).length; i++) {
  //   let key = localStorage.key(i)
  //   let value = localStorage.getItem(key)
  //   data.unshift(JSON.parse(value))
  //   console.log({ key, value })
  // }
  render(ul);
  
  
  const form = document.querySelector(".form")
  console.log(submit)
  form.addEventListener('submit', (event) => {
    let obj = {
      createdAt: new Date().toISOString(),
      title: document.querySelector('#title').value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/categories/javascript-node-js",
      author: document.querySelector('#name').value,
      bodyHTML: document.querySelector('#story').value,
      avatarUrl:
        "https://item.kakaocdn.net/do/43d1b22365e58584e7c6c9b4f29cb6008b566dca82634c93f811198148a26065"
    }
    // data.unshift(obj)
    // localStorage.setItem('agora', JSON.stringify(data))
    postDiscussion(obj)
    alert('저장되었습니다!')
    // ul.prepend(convertToDiscussion(data[0]))
    document.querySelector('#title').value = ''
    document.querySelector('#name').value = ''
    document.querySelector('#story').value = ''
    entire()
    // pageReset(1)
    // event.preventDefault()
  })
  
  
  // 아이콘을 클릭하면 답변 펼치기
  // 답변이 있는지 확인, 숨겨진 답변 펼치기
  
  
  const answerIcons = document.querySelectorAll('i')
  answerIcons.forEach((Icon) => {
    Icon.addEventListener('click', (e) => {
      // console.log('click')
      // 조건문 답변이 달렸으면/ 아이콘의 클래스로 확인
      const classList = Array.from(e.target.classList)
      if (classList.includes('fa-solid')) {
        // ul 태그
        const parent = document.querySelector('.discussions__container')
        const thisList = e.target.parentElement.parentElement
        let answerList;
  
        // ul의 자식요소를 돌면서 이벤트타겟을 찾으면 그 다음 요소의 hidden 클래스 삭제
        for (let i = 0; i < parent.children.length; i++) {
          if (parent.children[i] === thisList) {
            // i+1 리턴
            answerList = parent.children[i + 1]
          }
        }
        answerList.classList.add('discussion__container')
        answerList.classList.remove('answer__hidden')
        
  
  
        console.log()
      }
  
    })
  })
  
  
  
  
  const discussionWrapper = document.querySelector('.discussion__wrapper')
  // Number(agoraarr.length / 10)+1
  // 클릭하면 i+ (n-1)10
  let discussionPage = document.querySelectorAll('.discussion__pages > span')
  discussionPage.forEach((page) => {
    page.addEventListener('click', pageReset)
  })
  
  function pageReset(event) {
    let target = event.target
    if (event === 1) {
      target = document.querySelector('.discussion__pages>span')
    }
    // 기존 ul 지우기
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild)
    }
    // 새로운 10개 채우기
    render(ul, target.textContent)
    // console.log(page.textContent)
    discussionPage.forEach((page) => {
      page.classList.remove('discussion__page')
    })
    target.classList.add('discussion__page')
  }
  
  
  
  // 세 인풋 모두 채워져야 버튼 활성화
  // let name = false;
  // let title = false;
  // let story = false;
  
  // function exist(event) {
  //   return event.target.value.length >= 2
  // }
  // const allInput = document.querySelectorAll('input')
  // allInput.forEach((input) => {
  //   input.addEventListener('keyup', (event) => {
  //     if (exist(event)) {
  //       if (name && title && story) {
  //         event.removeAttribute('disabled')
  //       }
  //     } else {
  //     event.setAttribute('disabled', true)
  //     }
  //   })
  // })

}

entire()