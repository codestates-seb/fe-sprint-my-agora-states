// localStroage에 아이템이 있으면 추가
const storageItems = JSON.parse(localStorage.getItem('discussItems'));
console.log(`storageItems: ${storageItems}`); //시험용
if (storageItems) {
    // ul.prepend(convertToDiscussion(storageItems));
    for (let i = 0; i < storageItems.length; i++){
        ul.prepend(convertToDiscussion(storageItems[i]));
    }  
}


// 새로운 디스커션 추가하기
const formSubmit = document.querySelector('.form__submit');
formSubmit.addEventListener('click', ()=> {
    submitNewDiscuss();
  })
  // 엔터 방지
formSubmit.addEventListener("keydown", evt => {
    if (evt.code === "Enter") {
        evt.preventDefault();
    }
});


// 새 디스커션 객체 생성 함수
function newDiscussionObj (name, title, question) {
  this.createdAt = new Date();
  this.title = title;
  this.url = '';
  this.author = name; 
  this.answer = null;
  this.bodyHTML = question;
  this.avatarUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/%EB%A7%8C%EB%91%90.jpg';
}

let newDiscussArr = storageItems; // 새 오브젝트를 담을 배열. 이거를 localStorage에 전달할 것임
// 페이지에 렌더
function submitNewDiscuss() {
  const newdiscussName = document.querySelector('#name').value;
  const newdiscussTitle = document.querySelector('#title').value;
  const newdiscussQuestion = document.querySelector('#story').value;

  const newDiscuss = new newDiscussionObj(newdiscussName,newdiscussTitle,newdiscussQuestion);
  newDiscussArr.push(newDiscuss);
  localStorage.setItem('discussItems', JSON.stringify(newDiscussArr));

  console.log(`newDisscussArr: ${newDiscussArr}`); //시험용
  ul.prepend(convertToDiscussion(newDiscuss));
}


