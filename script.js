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
  

  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element,arr) => {



  

  for(let i of arr){
    element.append(convertToDiscussion(i));

  }
  
};

function pagenation() {
  let dataLength = agoraStatesDiscussions.length;
  if(dataLength <= 10) return;
  let totalPage = Math.ceil(dataLength/10); //5
  let pageGroup = Math.ceil(totalPage/3); //2
  



  let makepage = document.querySelector('.pageNum');
  
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
  console.log(document.querySelector('.discussions__container').hasChildNodes())
  if(document.querySelector('.discussions__container').childElementCount){
    while(document.querySelector('.discussions__container').childElementCount !== 0){
      document.querySelector('.discussions__container').removeChild(document.querySelector('.discussion__container'));
    }
  
  }





  render(ul,pagearr[num-1]);

W

}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");


pagearr = pagenation();
