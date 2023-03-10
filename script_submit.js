
// 새로운 디스커션 추가하기
const formSubmit = document.querySelector('.form__submit');
// formSubmit.onclick = submitNewDiscuss();
formSubmit.addEventListener('click', ()=> {
    submitNewDiscuss();
  })

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


// localStorage에 오브젝트 등록
function newDiscussionUpload (obj) {
  // 객체를 JSON 문자열로 변환
  const objString = JSON.stringify(obj);
  // setItem
  window.localStorage.setItem('newDiscuss', objString);
  console.log(`String으로 변환된 obj: ${objString}`); //시험용
}

// localStorage에서 오브젝트 가져오기
function newDiscussionRender () {
  // getItem
  const discussString = window.localStorage.getItem('newDiscuss');
  // JSON 문자열을 객체로 변환
//   console.log(`LocalStorage에서 가져온 discussString: ${discussString}`); //시험용
  const discussObj = JSON.parse(discussString);
//   console.log(`객체화 시킨 discussObj: ${discussObj}`); //시험용
  
  ul.prepend(convertToDiscussion(discussObj));
}



// 페이지에 렌더
function submitNewDiscuss() {
  const newdiscussName = document.querySelector('#name').value;
  const newdiscussTitle = document.querySelector('#title').value;
  const newdiscussQuestion = document.querySelector('#story').value;
//   console.log(`입력된 이름: ${newdiscussName}, 제목: ${newdiscussTitle}, 내용: ${newdiscussQuestion}`); //시험용
  const newDiscuss = new newDiscussionObj(newdiscussName,newdiscussTitle,newdiscussQuestion);
  
  newDiscussionUpload(newDiscuss);
  newDiscussionRender();
}