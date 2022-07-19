// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정



  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";




  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // avatarWrapper
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.setAttribute('src', obj.avatarUrl);
  avatarWrapper.append(avatarImage);




  // discussion content
  // discussion title
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';

  const discussionAnchor = document.createElement('a');
  discussionAnchor.textContent = obj.title;
  discussionAnchor.setAttribute('href', obj.url);
  
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle);

  //discussion information
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';

  
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`

  discussionContent.append(discussionInfo);




  //discussion answered
  const discussionAnswerCheck = document.createElement('p');
  if(obj.answer === null){
    discussionAnswerCheck.textContent = '☒';
    discussionAnswerCheck.className = 'isnull';
  }else{
    discussionAnswerCheck.textContent = '☑';
    discussionAnswerCheck.className = 'isNotNull';


  }

  discussionAnswered.append(discussionAnswerCheck);



  const deleteDiscussion = document.createElement('div');
  deleteDiscussion.className = 'option';

  const deleteIcon = document.createElement('span');
  deleteIcon.className = 'material-symbols-outlined';
  deleteIcon.textContent = 'delete'

  deleteDiscussion.append(deleteIcon);



  //li요소로 리턴
  li.append(avatarWrapper, discussionContent, discussionAnswered, deleteDiscussion);
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
const ul = document.querySelector("ul.discussions__container");
render(ul);



const informationForm = document.querySelector('.form');
const newName = document.querySelector('#name');
const newTitle = document.querySelector('#title');
const newQuestion = document.querySelector('#story');

const insertData = (event) => {
  let newObj = {};
  newObj['avatarUrl'] = 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4';
  newObj['answer'] = null;
  newObj['author'] = newName.value;
  newObj['title'] = newTitle.value;
  newObj['createdAt'] = new Date();

  agoraStatesDiscussions.unshift(newObj);
  // console.log('activate click');
  // console.log(agoraStatesDiscussions)
  // render(ul);


  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));

  event.preventDefault();
}


informationForm.addEventListener('submit',insertData);





const deleteArea = document.querySelectorAll('.option');
// delete
//  deleteArea.classList.add('test');
// const deleteFucntion = (event) => {
let currentElement = '';
let parent = '';
// }
for(let i = 0; i < agoraStatesDiscussions.length; i++){
  deleteArea[i].addEventListener('click', function(e){
    // console.log(e.currentTarget);
    // console.log(e.target);
    currentElement = e.target;
    console.log(currentElement);

    parent = currentElement.closest('li');
    console.log(parent.childNodes[1].childNodes[0].firstChild.textContent);
    console.log(parent.childNodes[1]);

    for(let j = 0; j < agoraStatesDiscussions.length; j++){
      // console.log(agoraStatesDiscussions[j]['title']);
      if(agoraStatesDiscussions[j]['title'] === parent.childNodes[1].childNodes[0].firstChild.textContent){
        agoraStatesDiscussions.splice(j,1);
        // e.preventDefault();
        parent.remove();
        e.preventDefault();

        console.log(agoraStatesDiscussions)
      }
    }



  });
};



// for문으로 배열의 길이만큼 순회하면서, 만약 조건에 맞는 객체면 splice(i,1)