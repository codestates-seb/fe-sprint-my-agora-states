// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);
const ul = document.querySelector('ul.discussions__container');

const wrapper = document.querySelector('.discussion__wrapper');
const pagination = document.querySelector('.discussions__pagination');
const count = document.querySelector('#count');
const writeBtn = document.querySelector('#formWrite');
const formContainer = document.querySelector('.form__container');
let listArray ;
if(localStorage.getItem("storageDicussions") === null){
  listArray = agoraStatesDiscussions;
}else{
  listArray = JSON.parse(localStorage.getItem('storageDicussions'));
}

const listPerPage = 10;
let totalCount = listArray.length;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const listBox = document.createElement("div");
  listBox.className = "listBox";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.innerHTML = `<img class="discussion__avatar--image" src="${obj.avatarUrl}" alt="avatar of ${obj.author}">`;
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.innerHTML = `<h2 class="discussion__title"><a href="###">${obj.title}</a></h2>
  <div class="discussion__information">${obj.author} / ${new Date(obj.createdAt).getFullYear()}. ${new Date(obj.createdAt).getMonth() + 1}. ${new Date(obj.createdAt).getDate()}</div>` 
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checked = document.createElement('p');
  checked.innerHTML = obj.answer ? `<span class="material-symbols-outlined">
  select_check_box</span>` : `<span class="material-symbols-outlined">  check_box_outline_blank</span>`;
  discussionAnswered.append(checked);
  if(obj.answer){
    const answerBox = document.createElement('section');
    answerBox.className = "answerBox";
    answerBox.innerHTML = `<img src="${obj['answer']['avatarUrl']}"><div>"${obj['answer']['bodyHTML']}"</div>`;
    li.append(answerBox);
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  listBox.append(avatarWrapper, discussionContent, discussionAnswered);
  li.append(listBox);
  return li;
};

/*인풋 객체로 넘기기*/
const inputToObject = (e) =>{
  let inputName = document.querySelector('#name');
  let inputTitle = document.querySelector('#title');
  let inputQuestion = document.querySelector('#story');
  let today = new Date();   
  let year = today.getFullYear(); 
  let month = today.getMonth() + 1;
  let date = ('0' + today.getDate()).slice(-2);
  let todayDate = `${year}. ${month}. ${date}`;
  let submitObject = {author:inputName.value, title:inputTitle.value, bodyHTML:inputQuestion.value,createdAt:todayDate, avatarUrl:'https://tistory1.daumcdn.net/tistory/6029424/attach/693208fbd20940759b056650238e8513'}
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
  localStorage.setItem("storageDicussions", JSON.stringify(listArray))
  convertPagination(listArray);
  render(ul, 0);
  fadeOut(formContainer);
})
writeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fadeIn(formContainer);
});
let fadeState = false; 
const fadeIn = (target) => {
  if(fadeState) return false;
  target.style.opacity = 0;
  target.style.display = "block";
  const timer = setInterval(() => {
    const currentOpacity = Number(window.getComputedStyle(target).opacity);
    console.log(currentOpacity);
    if (currentOpacity >= 1) {
      target.style.opacity = 1;
      clearInterval(timer);
      fadeState = false;
    } else {
      target.style.opacity = currentOpacity + 0.03;
    }
  }, 10);
};

formContainer.addEventListener('click',(e)=>{
  fadeOut(e.currentTarget);
});
formContainer.children[0].addEventListener('click',(e)=>{
  e.stopPropagation();

});

const fadeOut = (target) => {
  if(fadeState) return false;
  fadeState = true;
  const timer = setInterval(() => {
    const currentOpacity = Number(window.getComputedStyle(target).opacity);
    if (currentOpacity <= 0) {
      target.style.opacity = 0;
      target.style.display = "none";
      fadeState = false;
      clearInterval(timer);
    } else {
      target.style.opacity = currentOpacity -0.05;
    }
  }, 10);
};

/*페이징*/
const convertPagination = (listArray) =>{
  if(totalCount < listPerPage) return false;
  const lastPage = Math.ceil(totalCount / listPerPage);
  pagination.innerHTML = "";
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
  count.textContent =totalCount;
  for (let i = startNum; i < realEndNum; i ++) {
    element.append(convertToDiscussion(listArray[i]));
  }
  const listObj = document.querySelector('li.discussion__container');
  const listObjAll = document.querySelectorAll('li.discussion__container');

  for(let i=0; i < listObjAll.length; i++){
    listObjAll[i].addEventListener("click", (e) => {
      if(e.currentTarget.classList.contains('on')){
        e.currentTarget.classList.remove('on');
      }else{
        for(let j=0; j<listObjAll.length;j++){
          listObjAll[j].classList.remove('on');
          e.currentTarget.classList.add('on');
        }
      }
    })
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

convertPagination(listArray);
render(ul, 0);


