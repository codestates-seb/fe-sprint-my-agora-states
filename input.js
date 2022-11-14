// 디스커션 추가 기능
const discussionForm = document.querySelector('.form');
const inputName = discussionForm.querySelector('#name');
const inputTitle = discussionForm.querySelector('#title');
const inputStory = discussionForm.querySelector('#story');

const DISCUSSION_KEY = 'discussions'
let discussions = [];
function saveDiscussions(){
  localStorage.setItem(DISCUSSION_KEY, JSON.stringify(discussions));
}

const savedDiscussions = localStorage.getItem(DISCUSSION_KEY);

if(saveDiscussions !== null){
  const parsedDiscussions = JSON.parse(savedDiscussions);
  discussions = parsedDiscussions;
  parsedDiscussions.forEach((dc)=>{
    ul.prepend(convertToDiscussion(dc));
  })
}

// submit 클릭시 폼에 입력된 내용을 변수에 저장하고 폼 비우기
// prepend로 맨 앞에 출력하기
function handleSubmit(event){
  // submit과 동시에 페이징 적용하기 위해 그냥 리로드 적용함
 // event.preventDefault(); // submit 클릭시 페이지 리로드 방지
  const newDiscussion = {};
  newDiscussion.title = inputTitle.value;
  newDiscussion.author = inputName.value;
  newDiscussion.avatarUrl = './profile.png';
  newDiscussion.createdAt = new Date();
  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';
  discussions.push(newDiscussion);
  ul.prepend(convertToDiscussion(newDiscussion));
  saveDiscussions();
}
discussionForm.addEventListener('submit', handleSubmit);

