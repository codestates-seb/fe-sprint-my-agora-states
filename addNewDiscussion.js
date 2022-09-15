const submitForm = document.querySelector('form');
const nameInput = document.querySelector('#name');
const titleInput = document.querySelector('#title');
const storyInput = document.querySelector('#story');



// 새로운 디스커션을 만들기 위해서 반드시 필요한 값 : author, title, story, avatarImg, a, createdAt, answer
function addNewDiscussion(dataStorage, formEl) {
  const newDiscussionData = {};

  // 현재 시간 구하기
  let now = new Date().toLocaleString('ko-kr');

  newDiscussionData.author = nameInput.value;
  newDiscussionData.title = titleInput.value;
  newDiscussionData.story = storyInput.value;
  newDiscussionData.avatarUrl = 'https://www.w3schools.com/w3images/avatar2.png';
  newDiscussionData.createdAt = now;
  newDiscussionData.url = 'https://github.com/orgs/codestates-seb/teams/seb-fe-41th';
  newDiscussionData.answer = false;

  console.log(newDiscussionData);

  dataStorage.setItem(dataStorage.length, JSON.stringify(newDiscussionData));
  window.location.reload();

}

export default addNewDiscussion;