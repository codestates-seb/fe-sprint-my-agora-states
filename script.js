// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
const elForm = document.querySelector(".form__input--wrapper")
const elName = document.querySelector("#name");
const elTitle = document.querySelector("#title");
const elStory = document.querySelector("#story");
const elSubmit = document.querySelector(".form__submit").children[0]
const elTextarea = document.querySelector("#story");

let objString = JSON.stringify(agoraStatesDiscussions);
window.localStorage.setItem("data", objString)
const data = window.localStorage.getItem('data')
const jsonData = JSON.parse(data)


//function


const template = (obj) =>{
  const arr= [];
  for(let i = 0; i < JSON.parse(localStorage['data']).length; i++ ){
    arr.push(  `
    <li class="discussion__container">
        <div class="discussion__avatar--wrapper">
          <img class="discussion__avatar--image"
              src="${Object.keys(obj[i]).includes('avatarUrl') ? obj[i].avatarUrl : "./tottenham.jpeg"}"
              alt=avatar of ${obj[i].authior}>
        </div>
        <div class="discussion__content">
            <h2 class="discussion__title">
              <a href="${Object.keys(obj[i]).includes('url') ? obj[i].url  : "https://github.com/codestates-seb"}">
              ${obj[i].title}</a>
            </h2>
            <div class="discussion__information">${obj[i].author} / ${obj[i].createdAt}</div>
        </div>
        <div class="discussion__answered"><p>${obj[i].answer === null ? "☐" : (obj[i].answer === undefined  ? "☐" : "☑") }</p></div>
    `)
  }return arr.join('')
}

const render = () =>{
  document.querySelector("ul.discussions__container").innerHTML = template(JSON.parse(localStorage['data']))
}

const now = () => {
  const today = new Date(); 
  today.setHours(today.getHours() + 9); 
  return today.toISOString().replace('T', ' ').substring(0, 19);
}

//작성한 discussion을 localStorage에 저장
const addDiscussion = (e) => {
  const elSection = document.querySelector("section.discussion__wrapper")
  const discussion = {}
  discussion["author"] = `${elName.value}`
  discussion["title"] = `${elTitle.value}`
  discussion["bodyHTML"] = `${elStory.value}`
  discussion["createdAt"] = now()
  agoraStatesDiscussions.unshift(discussion)
  objString = JSON.stringify(agoraStatesDiscussions);
  window.localStorage.setItem("data",objString)
  render()
  elName.value = "";
  elTitle.value = "";
  elStory.value = "";
}

//TTS



//TTS


//submit
elForm.addEventListener("submit", (e)=>{
  e.preventDefault();
})

elSubmit.addEventListener("click",addDiscussion)
elTextarea.addEventListener("keypress", (e)=>{
  if(e.key !== "Enter"){
    return
  }
  addDiscussion();
})
render()