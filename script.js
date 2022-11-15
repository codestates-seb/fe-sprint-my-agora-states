
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__big--container'; // 클래스 이름 지정

  const elContainer = document.createElement('div');
  elContainer.className = 'discussion__container'
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image'
  avatarImage.alt = `avatar of ${obj.author}`
  const title = document.createElement('h2');
  title.className = 'discussion__title'
  const information = document.createElement('div');
  information.className = 'discussion__information';
  const url = document.createElement('a');
  const checkbox = document.createElement('p');
  checkbox.className = 'checkbox';

  avatarImage.setAttribute('src', obj.avatarUrl);
  url.textContent = obj.title;
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  url.setAttribute('href', obj.url);
  checkbox.textContent = '□';

  li.append(elContainer);
  elContainer.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarImage);
  discussionContent.append(title, information);
  discussionAnswered.append(checkbox);
  title.append(url);

  //answer 
  if(obj.answer !== null) {
    const ansWrapper = document.createElement('ul'); // 이중 ul 요소
    ansWrapper.className = 'answer__wrapper';
    
    const answer = document.createElement('li'); // 첫번째 답변 
    answer.className = 'answer';

    const ansAvartarWrapper = document.createElement('div');
    ansAvartarWrapper.className = 'answer__avatar--wrapper';
    const ansAvartarImg = document.createElement('img');
    ansAvartarImg.className = 'answer__avartar--image'

    const ansTitle = document.createElement('h2');
    ansTitle.className = 'answer__title'
    const url = document.createElement('a');
    const ansContent = document.createElement('div');
    ansContent.className = 'answer__content';
    const ansInformation = document.createElement('div');
    ansInformation.className = 'answer__Information';

    url.textContent = '답변';
    checkbox.textContent = '☑';
    url.href = obj.answer.url;
    ansAvartarImg.src = obj.answer.avatarUrl;
    ansInformation.textContent = `${obj.answer.author} / ${new Date(obj.answer.createdAt).toLocaleString()}`
    

    li.append(ansWrapper);
    ansWrapper.append(answer);
    answer.append(ansAvartarWrapper, ansContent);
    ansAvartarWrapper.append(ansAvartarImg);
    ansContent.append(ansTitle,ansInformation);
    ansTitle.append(url);


  }
    
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
const ul = document.querySelector('ul.discussions__container');
render(ul);

//pagination
const paginationNumbers = document.getElementById('pagination__numbers');
const paginatedList = document.getElementById("paginated__list");
let listItems = document.querySelectorAll("li.discussion__big--container");
const nextButton = document.getElementById("next__button");
const prevButton = document.getElementById("prev__button");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;

//pagenumber 버튼 생성
const appendPageNumber = (index) => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination__number';
  pageNumber.textContent = index;
  pageNumber.setAttribute('page-index', index);
  pageNumber.setAttribute('aria-label','page' + index);

  paginationNumbers.append(pageNumber);
};

const getPaginationNumbers = () => {
  for(let i = 1; i <= pageCount; i ++) {
    appendPageNumber(i);
  }
};

//처음 로드될 때 실행시키기
window.addEventListener('load', () => {
  getPaginationNumbers();
  setCurrentPage(1);

  document.querySelectorAll('.pagination__number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'));
    
    if(pageIndex) {
      button.addEventListener('click' , () => {
        setCurrentPage(pageIndex);
      })
    }
  });
})

//버튼 활성화
const handleActivePageNumber = () => {
  document.querySelectorAll('.pagination__Number').forEach((button) => {
    button.classList.remove('active');

    const pageIndex = Number(button.getAttribute('page-index'));
    if(pageIndex === currentPage) {
      button.classList.add('active');
    }
  });
};

//페이지 내용
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit ;

  listItems.forEach((item, index) => {
    item.classList.add('hide');
    if(index >= prevRange && index < currRange) {
      item.classList.remove('hide');
    }
  })
};

// 새로운 질문 추가 기능
const newTitle = document.querySelector('#title');
const newName = document.querySelector('#name');
const newStory = document.querySelector('#story');
const form = document.querySelector('form.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id: "new id",
    createdAt: new Date(),
    title: newTitle.value,
    url: undefined,
    author: newName.value,
    answer: null,
    bodyHTML: newStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  newName.value = '';
  newStory.value = '';
  newTitle.value = '';
  listItems = document.querySelectorAll("li.discussion__big--container");
  setCurrentPage(1);
});