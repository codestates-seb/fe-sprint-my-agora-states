// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// var date = new Date();
// const hour = date.getHours();
// let light_time = [6,7,8,9,10,11,12,13,14,15,16,17] 
// console.log(hour)

// if(!light_time.includes(hour)){
//   const bg = document.querySelector("video");
//   bg.setAttribute('src','dark.mp4');
// }
console.log(agoraStatesDiscussions);




const newContent = document.querySelector('.form__container form');
const newName = document.querySelector('div.form__input--name input');
const newTitle = document.querySelector('div.form__input--title input');
const newText = document.querySelector('div.form__textbox textarea');
const avatarUrls= ["https://cdn-icons-png.flaticon.com/512/1797/1797287.png","https://cdn-icons-png.flaticon.com/512/4717/4717946.png","https://cdn-icons-png.flaticon.com/512/4717/4717946.png","https://cdn-icons-png.flaticon.com/512/141/141695.png","https://cdn-icons-png.flaticon.com/512/6018/6018583.png","https://cdn-icons-png.flaticon.com/512/141/141689.png"];


const addPost = function(event){
  event.preventDefault();
  agoraStatesDiscussions.unshift({
    id: '비공개',
    createdAt: new Date(),
    title: newTitle.value,
    url: null,
    author: newName.value,
    answer: null,
    bodyHTML: newText.value,
    avatarUrl: (function(arr = avatarUrls){return arr[Math.floor(Math.random()*arr.length)]}())
  });
  if(document.querySelector('.discussions__container').childElementCount){
    while(document.querySelector('.discussions__container').childElementCount !== 0){
      document.querySelector('.discussions__container').removeChild(document.querySelector('.discussion__container'));
    }
  }
  pagearr = pagenation();
  render(ul,pagearr[0]);
};

newContent.addEventListener('submit', addPost);




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
  const discussion__avatar__image = document.createElement('img');
  discussion__avatar__image.className = "discussion__avatar--image";
  const discussion__title = document.createElement('h2');
  discussion__title.className = "discussion__title";
  const discussion__title__a = document.createElement('a');
  const discussion__inform = document.createElement('div');
  const discussion__answered__p = document.createElement('p');
  discussion__inform.className = "discussion__information"
  discussion__inform.innerText = obj.author +' / '+ obj.createdAt
  discussion__title__a.setAttribute('href',obj.url);
  discussion__title__a.innerText = obj.title
  discussion__avatar__image.setAttribute('src',obj.avatarUrl);
  
  discussionContent.appendChild(discussion__title);
  discussion__title.appendChild(discussion__title__a);
  discussionContent.appendChild(discussion__inform);
  avatarWrapper.appendChild(discussion__avatar__image);

  if(obj.answer){
    li.addEventListener('click',(function(){
      
      isClicked = false;
      
      return function (){
        if(!isClicked){
          console.log('asd')
          render2(document.querySelector(),obj.answer)
          isClicked = true;
        } else{
          console.log('asasdasdd')
          this.parentNode.removeChild(document.querySelector('li'))
          isClicked = false;
        }
      }
      

    
    }()))
    
  
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};




// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element,arr) => {

  
  for(let i of arr){
    element.append(convertToDiscussion(i));

  }
  
};

const render2 = (element,answerObj) =>{


  const li = document.createElement("li"); // li 요소 생성
  li.className = "li_discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussion__avatar__image = document.createElement('img');
  discussion__avatar__image.className = "discussion__avatar--image";
  const discussion__title = document.createElement('h2');
  discussion__title.className = "discussion__title";
  const discussion__title__a = document.createElement('a');
  const discussion__inform = document.createElement('div');
  const discussion__answered__p = document.createElement('p');
  discussion__inform.className = "discussion__information"
  discussion__inform.innerText = answerObj.author +' / '+ answerObj.createdAt
  discussion__title__a.setAttribute('href',answerObj.url);
  discussion__title__a.innerHTML = answerObj.bodyHTML;
  discussion__avatar__image.setAttribute('src',answerObj.avatarUrl);
  
  discussionContent.appendChild(discussion__title);
  discussion__title.appendChild(discussion__title__a);
  discussionContent.appendChild(discussion__inform);
  avatarWrapper.appendChild(discussion__avatar__image);
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  element.appendChild(li);

}

function pagenation() {
  let dataLength = agoraStatesDiscussions.length;
  if(dataLength <= 10) return;
  let totalPage = Math.ceil(dataLength/10); //5
  let pageGroup = Math.ceil(totalPage/3); //2

  let makepage = document.querySelector('.pageNum');
  
  if(!makepage.childElementCount){
    for(let i = 1;i <=totalPage;i++){
      const page = document.createElement('li');
      page.className= `page${i}`;
      const pagesrc = document.createElement('a');
      pagesrc.setAttribute('target','__blank');
      pagesrc.innerText = `${i}`;
      pagesrc.addEventListener('click',evt1);
      page.append(pagesrc);
      makepage.append(page);
  }
  }


    let pagingArr= [];
    if(totalPage >= 1)
    for(let i =0;i <= dataLength; i+=10){
      
      pagingArr.push(agoraStatesDiscussions.slice(i,i+10));
      console.table(pagingArr);
  } 
      console.table(pagingArr.length)
    return pagingArr
  


}

function evt1() {
  
  const num = this.innerText;
  let qnum = document.querySelector(".discussions__container").childElementCount;
  if(document.querySelector('.discussions__container').childElementCount){
    while(document.querySelector('.discussions__container').childElementCount !== 0){
      document.querySelector('.discussions__container').removeChild(document.querySelector('.discussion__container'));
    }
  
  }

  render(ul,pagearr[num-1]);



}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const li = document.querySelector('li.discussion__container')








let pagearr = pagenation();
render(ul,pagearr[0]);
