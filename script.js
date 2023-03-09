// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);
const ul = document.querySelector('ul.discussions__container');
const wrapper = document.querySelector('.discussion__wrapper');
const pagination = document.querySelector('.discussions__pagination');

let listArray = agoraStatesDiscussions;
const listPerPage = 5;
let totalCount = listArray.length;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.innerHTML = `<img class="discussion__avatar--image" src="${obj.avatarUrl}" alt="avatar of ${obj.author}">`;
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.innerHTML = `<h2 class="discussion__title"><a href="${obj.url}">${obj.title}</a></h2>
  <div class="discussion__information">${obj.author} / ${obj.createdAt}</div>` 
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/*인풋 객체로 넘기기*/
const inputToObject = (e) =>{
  let inputName = document.querySelector('#name');
  let inputTitle = document.querySelector('#title');
  let inputQuestion = document.querySelector('#story');
  let today = new Date();   
  let year = today.getFullYear(); 
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let date = ('0' + today.getDate()).slice(-2);
  let todayDate = `${year}-${month}-${date}`;
  let submitObject = {author:inputName.value, title:inputTitle.value, bodyHTML:inputQuestion.value,createdAt:todayDate}
  inputName.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
  return submitObject; 
}

/*submit 눌렀을때 객체추가*/
const submit = document.querySelector('#submit');
submit.addEventListener('click', (e)=>{
  e.preventDefault();
  listArray = [inputToObject(), ...listArray];
  totalCount = listArray.length;
  convertPagination(listArray);
  render(ul, 0);
})

/*페이징*/
const convertPagination = (listArray) =>{
  if(totalCount < listPerPage) return false;
  const lastPage = Math.ceil(totalCount / listPerPage);
  for(let i=0; i<lastPage; i++){
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('value', i);
    btn.addEventListener('click', ()=>{
      render(ul, i* listPerPage);
    });
    btn.innerText = i+1;
    pagination.append(btn);
  }
}


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, startNum) => {
  ul.innerHTML = "";
  const endNum = startNum + listPerPage;
  const realEndNum = totalCount > endNum ? endNum : totalCount;
  for (let i = startNum; i < realEndNum; i ++) {
    element.append(convertToDiscussion(listArray[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
convertPagination(listArray);
render(ul, 0);
