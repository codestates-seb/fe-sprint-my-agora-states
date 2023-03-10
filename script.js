// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");  //태그만들기
  avatarWrapper.className = "discussion__avatar--wrapper"; 
  const discussionContent = document.createElement("div"); //태그만들기
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div"); //태그만들기
  discussionAnswered.className = "discussion__answered";

  // 이미지
 const avatarImg = document.createElement('img')
 avatarImg.className = "discussion__avatar--image"
 avatarImg.src = obj.avatarUrl;
 avatarImg.alt = 'avatar of' + obj.author;
 avatarWrapper.append(avatarImg);

 //질문글 , 누군지, 시간대 
 const mainTitle = document.createElement('h2')
 mainTitle.className = "discussion__title";
 const mainTitle_a = document.createElement('a')
 mainTitle_a.href = obj.url;
 mainTitle_a.textContent = obj.title;
 mainTitle.append(mainTitle_a);
 const avatarInformation = document.createElement('div');
 avatarInformation.className = "discussion__information";
 avatarInformation.textContent = `${obj.author}  / ${new Date(obj.createdAt).toLocaleString()}`
 discussionContent.append(mainTitle,avatarInformation);
 
 // 체크박스
 const checkBox =document.createElement('p')
 if(obj.answer === null){
  checkBox.textContent = '💩'
 }
 else{
 checkBox.textContent = '🥳'
 }
 discussionAnswered.append(checkBox)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

};

//------------------------------------------------------------------------------------------------//

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // element 의 자식으로 li 를 추가 
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // element 의 자리에 Ul 을 넣음으로써        ul의 자식으로 li 를 추가 


//------------------------------------------------------------------------------------------------//

// 질문 폼 작성 시 제출가능하게 

const form = document.querySelector('form.form')
const inputName = document.querySelector('#name') // 이름
const inputTitle = document.querySelector('#title') // 타이틀
const formTextBox = document.querySelector('#story') // 질문박스
const submitBut = document.querySelector('#but') // 버튼


function addArrayUnshift (event) {
  event.preventDefault();
  // 하나의 객체를 만들어 convertToDiscussion 에 넣어주어 li로 만들고 다으 Ul 요소에 append 
  const newDiscussion = {
    id: "unique value",
   createdAt: new Date(),
   title: inputTitle.value,
   url: "https://github.com/codestates-seb/agora-states-fe",
   author: inputName.value,
   answer: null,
  bodyHTML:formTextBox.value,
  avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  ul.prepend(convertToDiscussion(newDiscussion))  //prepend 는 첫번째자로 자식을 추가  append 는 끝자리로 자식 추가 

  inputName.value = '';
  inputTitle.value = '';
  formTextBox.value = '';

  
}

form.addEventListener('submit',addArrayUnshift);


//------------------------------------------------------------------------------------------------//


// 클릭시 질문 작성 폼이 보이게 다시 클릭하면 안보이게 
const clickMainTitle = document.querySelector('.mainTitle');
const forms = document.querySelector('.form__container')


function missForm () {
if(forms.classList.contains('missForms')=== true){
forms.classList.remove('missForms')
}
else {
  forms.classList.add('missForms')
}
}

clickMainTitle.addEventListener('click', missForm)

