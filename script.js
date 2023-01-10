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
  const discussionAvatarImg = document.createElement('img');
  discussionAvatarImg.className = "discussion__avatar--image";
  discussionAvatarImg.alt = 'avatar of' + obj.author;
  discussionAvatarImg.setAttribute('src',obj.avatarUrl);
  //let imgsrc = "";
  //discussionAvatarImg.src = obj.avatarUrl ? avatarUrl : imgsrc;
  // 아바타의 이미지가 없을때 고정 이미지 사용법

  
  const discussionTitle = document.createElement('h3');
  discussionTitle.className = "discussion__title";
  
  const discussionTitleA = document.createElement('a');
  discussionTitleA.setAttribute('href',obj.url)
  discussionTitleA.textContent = obj.title;
  
  const discussionInform = document.createElement('div');
  discussionInform.className = "discussion__information";
  const koreanDate = new Date(obj.createdAt); //  obj.createAt의 UTC시간을 koreanDate에 저장
  discussionInform.textContent = `${obj.author} / ${koreanDate.toLocaleTimeString()}`;
  //toLocalTimeString은 UTC로 표현된 시간을 한국의 표준 시간 오전(후) h:m:s로 나타내는 Date객체의 내장 메서드이다.
  //discussionInform.textContent = obj.author + '/' + obj.createdAt; // 템플릿리터럴로도 가능
  
  const discussionCheck = document.createElement('p');
  // 조건문으로 answer이 null인지 아닌지 확인해야함.
  discussionCheck.textContent = obj.answer ? "☑" : "☒" ;

  discussionContent.appendChild(discussionTitle);
  discussionTitle.appendChild(discussionTitleA);
  discussionContent.appendChild(discussionInform);
  avatarWrapper.appendChild(discussionAvatarImg);
  discussionAnswered.appendChild(discussionCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

};

//디스커션유지



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // 아고라 디스커션의 0번째 배열부터 함수시작
  }
  return;
};

// const render = (element,arr) => {
//   for(let i of arr){
//     element.append(convertToDiscussion(i));
//   }
//   return;
// };

//페이지네이션 10개씩

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
    pagesrc.textContent = `${i}`;
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

  const num = this.textContent;
  let qnum = document.querySelector("discussions__container").childElementCount;
  console.log(document.querySelector('discussions__container').hasChildNodes())
  if(document.querySelector('.discussions__container').childElementCount){
    while(document.querySelector('.discussions__container').childElementCount !== 0){
      document.querySelector('.discussions__container').removeChild(document.querySelector('.discussion__container'));
    }

  }
  render(ul,pagearr[num-1]);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

pagearr = pagenation();


