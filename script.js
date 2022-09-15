// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";//이미지링크
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";//타이틀,사용자 정보 추가
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";//체크표시 만약 anser이 null이 아니라면 체크표시 할당 아니면 엑스 표시
  
  const avatarImg = document.createElement('img');//이미지 추가
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const content_title = document.createElement('h2') // 타이틀
  content_title.className='discussion__title'
  
  discussionContent.append(content_title);
  
  const content_title_link=document.createElement('a')//h2안에 a태그 추가
  content_title_link.href=obj.url
  content_title_link.textContent=obj.title
  content_title.append(content_title_link);

  const content_inform = document.createElement('div') // 
  content_inform.className='discussion__information'
  content_inform.textContent=`${obj.author} / ${new Date(obj.createdAt).toLocaleString()} `;
  discussionContent.append(content_inform);
  
  const answer = document.createElement('div')
    discussionAnswered.append(answer)
  const answer_checkbox = document.createElement('p') //obj.answer 가 null이면 X

  if(obj.answer!==null){
    answer_checkbox.textContent='❤️'
  }
  else {answer_checkbox.textContent='💔'}
  answer.append(answer_checkbox)
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li

  


};
//질문 추가시 li리스트에 반영

//버튼 클릭시
const form=document.querySelector('form,form')
const title=document.querySelector('div.form__input--title>input')
const nameInput = document.querySelector('div.form__input--name >input')
const textbox = document.querySelector('div.form__textbox >textarea')

form.addEventListener('submit',(event) =>{
  event.preventDefault();

  

  
const obj = {
  id: "unique id",
  createdAt:new Date(),
  title: title.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
  author: nameInput.value,
  answer: null,
  bodyHTML: textbox.value
 ,
  avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
}
agoraStatesDiscussions.unshift(obj);
const newdiscussion=convertToDiscussion(obj)
ul.prepend(newdiscussion)
} )
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

