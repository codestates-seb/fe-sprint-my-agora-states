console.log(agoraStatesDiscussions);

//const numOfDiscussion=agoraStatesDiscussions.length;//discussion개수
const numOfContent=10;
const numOfButton=5;
const buttons=document.querySelector(".pagenumber_box")
//const numOfPage=Math.ceil(numOfDiscussion/numOfContent);//총 페이지 수
let presentPage=1;


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
  const avatarImg=document.createElement('img')
  avatarImg.src=obj.avatarUrl;
  avatarImg.alt='avatar of '+obj.author;
  avatarImg.className="discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  //discussion content
  const titlecontainer=document.createElement('h2');
  titlecontainer.className="discussion__title";
  const contentlink=document.createElement('a');
  contentlink.href=obj.url;
  contentlink.textContent=obj.title;
  titlecontainer.append(contentlink);
  discussionContent.append(titlecontainer);

  const contentinfo=document.createElement('div');
  contentinfo.className="discussion__information";
  contentinfo.textContent=obj.author+' / '+transfertime(obj.createdAt);
  discussionContent.append(contentinfo);

  const iconsolved=document.createElement('i');
  const iconunsoved=document.createElement('i');
  const doublecheck=document.createElement('i');

  iconsolved.setAttribute('class',"fa-solid fa-circle-check");
  iconunsoved.setAttribute('class',"fa-regular fa-circle-check");
  doublecheck.setAttribute('class',"fa-solid fa-check-double");
  doublecheck.setAttribute('id','notice');

  //const isansweredimg=document.createElement('p')
  if(obj.title.includes('[notice]')){
    discussionAnswered.append(doublecheck);
  }
  else{
  if(obj.answer){
  discussionAnswered.append(iconsolved);
  }
  else{
    discussionAnswered.append(iconunsoved);
  }
  }
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  return li;
};

/**버튼 생성함수 구현 */
const buttonmaker=(pnumber)=>{
  const button=document.createElement('button');
  button.classList.add('page__number');
  if(pnumber==='previous'){  
    button.innerText='<'
  }
  else if(pnumber==='next'){ 
    button.innerText='>'
  }
  else{
  button.innerText=pnumber;
  }
  button.addEventListener('click',(e)=>{
  //버튼을 클릭하면 해당 페이지로 이동한다
  for (const child of buttons.children) {
    if(Number(child.innerText)===presentPage){
      child.classList.remove("clicked");
    }
  }//지난 페이지의 볼드처리를 해제한다
    e.target.classList.add("clicked");

    if(e.target.innerText==='<'){  
      presentPage=Math.floor(presentPage/numOfButton)*numOfButton;
      renderButton(buttons,presentPage);
      
    }//
    else if(e.target.innerText==='>'){
      presentPage=Math.ceil(presentPage/numOfButton)*numOfButton+1
      renderButton(buttons,presentPage);
     
    }
    else{
    presentPage=Number(e.target.innerText);
    }
    //console.log(presentPage+'출력');
    renderDiscussion(ul,presentPage);
  })
  return button;
  console.log(button);
}


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const renderDiscussion = (element,pnumber) => {//현재 페이지 넘버를 입력 받으면(1부터시작) 해당하는 버튼과 페이지를 렌더링
  while (element.children.length>1) {
    element.removeChild(element.lastChild);
  }

  let start=(pnumber-1)*numOfContent+1;
  let end=Math.min(agoraStatesDiscussions.length,start+numOfContent-1);//
  for (let i = start; i <= end; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i-1]));
    console.log("a");
  }
  return;
};

//버튼을 렌더링하는 함수
const renderButton=(element,pnumber)=>{
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  if(pnumber>numOfButton){
    element.append(buttonmaker('previous'));
  }
 
  let start=Math.floor((pnumber-1)/numOfButton)*numOfButton+1;
  let totalpage=Math.ceil((agoraStatesDiscussions.length/numOfContent))
  let end=Math.min(totalpage,start+numOfButton-1)
  for(let i=start;i<=end;i+=1){
      console.log(i);
      element.append(buttonmaker(i));
  }
  if(totalpage>end){
    element.append(buttonmaker('next'));
  }
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
renderDiscussion(ul,presentPage);
renderButton(buttons,presentPage);

let newusername=document.querySelector('input#name');//이름
let newtitle=document.querySelector('input#title');//제목
let newquestion=document.querySelector('#story');//질문


let submitclicked=document.forms['textbox'];//submit버튼


// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
submitclicked.addEventListener('submit',function(e){
  
  agoraStatesDiscussions.unshift({id:null,createdAt:new Date().toISOString(),title:newtitle.value,url:null,author:newusername.value,
    answer:null,bodyHTML:newquestion.value,avatarUrl:"https://avatars.githubusercontent.com/u/79903256?s=64&v=4"})

    

    for(let i of submitclicked){
      if(i.value==='제출'){continue;}
      i.value='';
    }
    // newusername.value='';
    // newtitle.value='';
    // newquestion.value='';
    
    //ul.removeChild(ul.lastChild);
    //ul.insertBefore(convertToDiscussion(agoraStatesDiscussions[0]),ul.childNodes[2]);
    //화면에 있는 ul자식들을 모두 지우고 다시 렌더링한다-2페이지에서 추가했을때는 위의방법으로 할 수 없다.
    renderDiscussion(ul,presentPage);
    renderButton(buttons,presentPage);
    e.preventDefault();
    //return false;
  });


  /**시간 변환 함수 */  
  function transfertime(string){
    
    let time=new Date(string);//현지 시간으로 변환

    if(time.toDateString()===new Date().toDateString()){//오늘 글을 등록했을때(날짜 비교)
      
      let hour=time.getHours();
      let resulttime=(hour>=12&&hour<24)? '오후':'오전';
      return `${resulttime} ${hour%12}:${time.getMinutes()}:${time.getSeconds()}`
    }else{
    return `${time.getFullYear()}.${time.getMonth()+1}.${time.getDate()}`
    }
  }
