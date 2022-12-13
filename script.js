// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
async function getData(){
  const data = await fetch('http://localhost:4000/discussions')
  let agoraStatesDiscussions = await data.json();


  const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정
  
    // 메인카드
      // avatar image wrapper
      const avatarWrapper = document.createElement("div");
      avatarWrapper.className = "discussion__avatar--wrapper";
      // avatar image
      const avatarImg = document.createElement('img');
      avatarImg.className = 'discussion__avatar--image';
      avatarImg.src = obj.avatarUrl;
      avatarImg.alt = `avatar of ${obj.author}`;
      // avatar img append to wrapper
      avatarWrapper.append(avatarImg)
  
  
      // discussion content
      const discussionContent = document.createElement("div");
      discussionContent.className = "discussion__content";
      // discussion title
      const discussionTitle = document.createElement('h2');
      discussionTitle.className = 'discussion__title';
      // discussion link
      const discussionLink = document.createElement('a');
      discussionLink.textContent = obj.title;
      discussionLink.href = obj.url;
      discussionLink.setAttribute('target','_blank');
      discussionTitle.append(discussionLink);
      // discussion info
      const discussionInfo = document.createElement('div');
      discussionInfo.className = 'discussion__information';
      discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
      discussionContent.append(discussionTitle, discussionInfo);
  
  
      // discussion answered
      const discussionAnswered = document.createElement("div");
      discussionAnswered.className = "discussion__answered";
      const icon = document.createElement('p');
      discussionAnswered.append(icon);
      const iconTag = document.createElement('i');
      iconTag.className = 'fa-circle-check';
      icon.append(iconTag);
      if(obj.answer === null) iconTag.classList.add('fa-regular');
      else iconTag.classList.add('fa-solid');
    // 메인카드 end
  
  
    // discussion detail
      const discussionDetail = document.createElement('div');
      discussionDetail.className = 'discussion__detail';
      const discussionDetailMore = document.createElement('p');
      discussionDetailMore.className = 'discussion__detail--btn';
      // discussionDetailMore.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
      const discussionDetailBox = document.createElement('div');
      discussionDetailBox.className = 'discussion__detail--box';
      const discussionDetailTitle = document.createElement('div');
      discussionDetailTitle.className = 'discussion__detail--title';
      discussionDetailTitle.textContent = obj.title;
      const discussionDetailQuestion = document.createElement('div');
      discussionDetailQuestion.className = 'discussion__detail--question';
      discussionDetailQuestion.innerHTML = obj.bodyHTML;
      discussionDetailBox.append(discussionDetailTitle, discussionDetailQuestion)
      discussionDetail.append(discussionDetailMore, discussionDetailBox);
    // discussion detail end
  
  
    li.append(avatarWrapper, discussionContent, discussionAnswered, discussionDetail);
    return li;
  
  
  
  };
  
  // form 제출하고 리스트에 추가하기
  const form = document.querySelector('.form');
  const inputName = document.querySelector('#form_name');
  const inputTitle = document.querySelector('#form_title');
  const textarea = document.querySelector('#story');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const obj = {
      id: "613",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: inputName.value,
      answer: null,
      bodyHTML: textarea.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    }
  
    agoraStatesDiscussions.unshift(obj);
    ul.prepend(convertToDiscussion(obj));
  
    inputName.value = '';
    inputTitle.value = '';
    textarea.value = '';
  });
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
  
  // pagination
  const rowsPerPage = 10; //보여줄 개수
  const rows = document.querySelectorAll('.discussion__container'); // li element
  const rowsCount = rows.length; // 총 개수
  const pageCount = Math.ceil(rowsCount/rowsPerPage); // 올림처리 해서 페이저 개수
  const pagerWrap = document.querySelector('.pagination'); // 페이저 담을 div element
  
  // create pagers
  for(let i=1; i<=pageCount; i++){ // 페이저개수만큼
    const page = document.createElement('span'); // element 생성
    page.className = 'page-btn'; 
    page.textContent = i;
    pagerWrap.append(page); // div에 넣어주기
  }
  
  const pagerBtn = document.querySelectorAll('.page-btn'); // 생성한 페이저들 불러오기
  pagerBtn.forEach((item, index)=>{ // 각각마다 
    item.addEventListener('click',(e)=>{ // 각각 클릭할 때마다
      e.preventDefault();
      displayRows(index); // displayRows 함수 호출
    })
  })
  
  const displayRows = (index)=>{ // 페이저들마다 불러서 index 받아옴
    //console.log(rows)       // nodelist 41개
    let rowsArray = [...rows]; // nodelist 였기 때문에 array로 변경해줘야 한다
    for(i of rowsArray){            // li element 마다
      i.style.display = 'none';      // 전체 display none
    }
  
    /*
      slice(0, 10) => 0번~9번
      slice(10, 20) => 10번~19번
    */
  
    let start = index*rowsPerPage;       // index X 한번에보여줄개수
    let end = start + rowsPerPage;       // start + 한번에보여줄개수
    let newRows = rowsArray.slice(start, end);
  
    for(i of newRows){                 // 10개만 뽑아낸 li element 중에서
      i.style.display = 'flex';          // 다 display flex -> 내가 li 에 flex 걸어둠
    }
  }
  
  displayRows(0)  // 페이지 열자마자 0번인덱스 0번~9번 li element 보여줘야함!
  
}

getData()