// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
import { convertToDiscussion } from './modules/convertDiscussion.js';
import { setPagination} from './modules/createAndSetPagination.js'

function assembleArr(datas){
  if(window.localStorage.length !== 0){
    for(let i=0; i<window.localStorage.length; i++){
      datas.unshift(JSON.parse(window.localStorage.getItem(i)))
    }
  }
}

// let liPerPage = 10; //한 페이지당 보이는 li 수
// datas 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element,datas) => {
  let liPerPage = 10; 
  //1. 일단 datas 데이터랑 localstorage의 데이터랑 합치기
  assembleArr(datas);
  //2. 총 길이가 한페이지당 보여야 하는 li개수보다 작으면 총 길이 만큼만 로드
  if(datas.length < liPerPage){
    liPerPage = datas.length
  }
  //3. 총 길이가 한페이지당 보여야 하는 li개수보다 많으면 미리정해놓은 liPerPage만큼만 로드
  for (let i = 0; i < liPerPage ; i += 1) {
    element.append(convertToDiscussion(datas[i]));
  }

  //4. 여기까지 하고 페이지네이션 만들기
  setPagination(datas,liPerPage)
  return;
};



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

//서버로부터 데이터를 받아옵니다.
fetch('http://localhost:4000/discussions/',{
  method:'GET',
})
.then(response => {
  return response.json()
})
.then((data)=>{
  render(ul,data)
})



// 디스커션 추가기능
const addToDiscussion = function(event){
  // event.preventDefault();
  // const nameVal = document.querySelector('#name').value
  // const titleVal = document.querySelector('#title').value
  // const questionVal = document.querySelector('#story').value

  // const newObj = {
  //   id: window.localStorage.length,
  //   createdAt: new Date().toISOString(),
  //   title: titleVal,
  //   url:'/',
  //   author: nameVal,
  //   answer: null,
  //   avatarUrl: "https://picsum.photos/48/48"
  // }

  // agoraStatesDiscussions.unshift(newObj)
  // ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]))
  // //localStorage에 저장하기
  // localStorage.setItem(window.localStorage.length,JSON.stringify(agoraStatesDiscussions[0]))
  // window.location.reload()

  event.preventDefault();
  const uuid = 'myUuid';
  const nameVal = document.querySelector('#name').value
  const titleVal = document.querySelector('#title').value
  const questionVal = document.querySelector('#story').value

  const newObj = {
    id: uuid,
    createdAt: new Date().toISOString(),
    title: titleVal,
    url:'/',
    author: nameVal,
    answer: null,
    avatarUrl: "https://picsum.photos/48/48"
  }

  fetch(`http://localhost:4000/discussions/${uuid}`,{
    method:'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newObj)
  })
  .then((response) => {
    //서버로부터 데이터를 받아옵니다.
    return response.json()
  })
  .then((data)=>{
    location.reload();
    render(ul,data)
  })

}

const submitform = document.querySelector('form.form');
submitform.addEventListener('submit',addToDiscussion)

