// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, index) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.setAttribute('src' ,`${obj.avatarUrl}`);
  avatarWrapper.append(avatarImg);

  const discussionDelete = document.createElement('div');
  const discussionDeleteBtn = document.createElement('button');
  discussionDelete.classList.add('discussion__delete');
  discussionDeleteBtn.classList.add('discussion__delete--btn');
  discussionDeleteBtn.classList.add('hide');
  discussionDeleteBtn.textContent = 'delete';

  discussionDeleteBtn.addEventListener('click', () => {
    removeData(index);
  });


  discussionDelete.append(discussionDeleteBtn);

  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  
  const anchorGit = document.createElement('a');
  anchorGit.setAttribute('href', `${obj.url}`);
  anchorGit.textContent = `${obj.title}`;
  discussionTitle.append(anchorGit);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.classList.add('discussion__information');
  discussionInfo.textContent = `${obj.author} / ${timeFormat(obj.createdAt)}`
  discussionAnswered.append(discussionInfo);


  const discussionCheck = document.createElement('p');
  discussionCheck.classList.add('discussion__answered');
  discussionCheck.textContent = `☑`;
  discussionAnswered.append(discussionCheck);

  
  
  contentHoverEvent(li, discussionDeleteBtn);

  li.append(avatarWrapper, discussionDelete, discussionContent, discussionAnswered);

  return li;
};

const contentHoverEvent = (target, btn) => {
  target.addEventListener('mouseover', () => {
    btn.classList.remove('hide');
  });

  target.addEventListener('mouseout', () => {
    btn.classList.add('hide');
  });
}

const timeFormat = (time) => {
  let newFormat = '';
  const matcher = /[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/g;
  if(time.match(matcher)) {
    const matchTime = time.match(matcher)[0].split(':');
    matchTime[0] >= 12 ? newFormat += '오후' : newFormat += '오전';
    matchTime[0] > 12 ? newFormat += ` ${matchTime[0] - 12}:` : newFormat += ` ${matchTime[0]}:`;
    newFormat += `${matchTime[1]}:${matchTime[2]}`;
  }else {
    newFormat = time;
  }
  
  return newFormat;
};



const pageNationClick = (e) => {
  const pageNationBtn = document.getElementsByClassName('pagenation__btn');
  const renderItemNum = 20;
  for(let btn of pageNationBtn) {
    if(btn.classList.contains('pagenation__btn--focus')) {
      btn.classList.remove('pagenation__btn--focus');
    }
  }
  e.target.classList.add('pagenation__btn--focus');
  const startNum = renderItemNum * (Number(e.target.textContent) - 1);
  let endNum;
  if(Number(e.target.textContent) === pageNationBtn.length) { 
    endNum = getLocalData().length;
  }else {
    endNum = renderItemNum * Number(e.target.textContent);
  }
  render(ul, startNum, endNum);
};


const eventHandle = () => {
  const modal = document.querySelector('.form__container');
  const formData = document.querySelector('.form');
  const modalBtn = document.querySelector('.add-btn');
  const closeBtn = document.querySelector('.close-modal');
  const pageNationBtn = document.getElementsByClassName('pagenation__btn');
  
  addEventPagenation(pageNationBtn);
  
  modalBtn.addEventListener('click', (v) => {
    openModal(modal);
  });

  
  closeBtn.addEventListener('click', (v) => {
    closeModal(modal);
    resetSubmit(formData);
  });

  formData.addEventListener('submit', (e) => {
    addList(e);
    makePageBtn(getLocalData(), 1);
    addEventPagenation(pageNationBtn);
    resetSubmit(formData);
    closeModal(modal);
    render(ul, 0, 20);
    e.preventDefault();
  });
};



const removeData = (index) => {
  const focusPage = document.querySelector('.pagenation__btn--focus');
  const pageNationBtn = document.getElementsByClassName('pagenation__btn');
  const renderItemNum = 20;
  const startNum = renderItemNum * (Number(focusPage.textContent) - 1);
  let endNum;
  console.log(focusPage.textContent);
  const dataArr = getLocalData();
  console.log(dataArr);
  dataArr.splice(index, 1);
  console.log(dataArr)
  localStorage.setItem('data', JSON.stringify(dataArr));

  
  if(Number(focusPage.textContent) === pageNationBtn.length) { 
    endNum = getLocalData().length;
  }else {
    endNum = renderItemNum * Number(focusPage.textContent);
  }

  makePageBtn(getLocalData(), Number(focusPage.textContent));

  addEventPagenation(pageNationBtn);
  render(ul, startNum, endNum);
};


const getLocalData = () => {
  let localData;
  if(localStorage.getItem('data')){
    localData = JSON.parse(localStorage.getItem('data'));
  }
  console.log(localData);
  return localData;
};

const setLocalData = () => {
  if(localStorage.getItem('data')){
    localStorage.setItem('data', localStorage.getItem('data'));
  }else {
    localStorage.setItem('data', JSON.stringify(agoraStatesDiscussions));
  }
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, start, end) => {
  const localData = getLocalData();
  element.innerHTML = '';
  for (let i = start; i < end; i += 1) {
    element.append(convertToDiscussion(localData[i], i));
  }
  return;
};


const makePageBtn = (arr ,focus) => {
  const pageBox = document.querySelector('.pagenation__box');
  let pageNum = Math.ceil(arr.length / 20);
  pageBox.innerHTML = '';
  
  for(let i = 1; i <= pageNum; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.classList.add('pagenation__btn');
    pageBox.append(pageBtn);
    pageBtn.textContent = i.toString();
    if(i === focus) {
      pageBtn.classList.add('pagenation__btn--focus')
    }
  }

  return pageNum;
};


const openModal = (modal) => {
  modal.classList.remove('hide');
  modal.classList.add('fadeIn');
}


const closeModal = (modal) => {
  modal.classList.add('hide');
  modal.classList.remove('fadeIn');
}


const addList = (e) => {
  const imgArr = ['https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
  'https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4',
  'https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4',
  'https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4',
  'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
  'https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4',
  'https://avatars.githubusercontent.com/u/22221941?s=64&u=7332dde3a563f98d2912e107f455ce2265ccca45&v=4',
  'https://avatars.githubusercontent.com/u/103437860?s=64&v=4',
  'https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4'];

  const avatarImgIndex = Math.floor(Math.random() * (((imgArr.length - 1) - 0) + 1));
  
  const dataArr = getLocalData();
  console.log('data arr', dataArr)
  const addItem = {};
  addItem.id = "D_kwDOHOApLM4APfpf";
  addItem.createdAt = new Date().toLocaleTimeString();
  addItem.title = e.target[1].value;
  addItem.url = 'https://github.com/codestates-seb/agora-states-fe/discussions/37';
  addItem.author = e.target[0].value;
  addItem.bodyHTML = e.target[2].value;
  addItem.answer = {};
  addItem.avatarUrl = imgArr[avatarImgIndex];
  dataArr.unshift(addItem);
  localStorage.setItem('data', JSON.stringify(dataArr));
};

const addEventPagenation = (pageBtn) => {
  for(let btn of pageBtn) {
    btn.addEventListener('click', (v) => {
      pageNationClick(v);
    });
  }
};

const resetSubmit = (submit) => {
  for(let item = 0; item < submit.length - 1; item++) {
    submit[item].value = '';
  }
};


const ul = document.querySelector("ul.discussions__container");

setLocalData();
makePageBtn(getLocalData(), 1);
render(ul, 0, 20);
eventHandle();



// answer check
// 추가 기능 구현 (answer, edit, delete)
// 디자인 추가

