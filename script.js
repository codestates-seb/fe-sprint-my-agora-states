const start = async()=>{
  let data;
const res = await fetch('http://localhost:4000/discussions')
const result = await res.json()
data = await result;


// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

//agoraStatesDiscussions을 localStorge로 불러옴
//data란 곳에 agoraStatesDiscussions을 저장?
// const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");

// if(dataFromLocalStorage){
//   console.log('hi');
//   data = JSON.parse(dataFromLocalStorage);
// }else{
//   data = agoraStatesDiscussions.slice();
//   console.log(data)
// }

//랜덤 이미지 뽑기 
const randomImg = ()=>{
  const img = ['user1.png','user2.png','user3.jpeg','user4.png','user5.webp'];
  let randomIdx = Math.floor(Math.random()*img.length);
  return img[randomIdx];
}

//클릭한 현 시간 구하기
const clickTime = ()=>{
  let today = new Date(); //Mon Jul 18 2022 21:37:22 GMT+0900 (한국 표준시)
  return today.toLocaleString(); // 2022. 7. 18. 오후 9:48:56
}
//answer 답변자 표시하기
const complateAnswer = (as)=>{
  let inAnswer = as.answer;
  if(inAnswer!==null &&inAnswer!==undefined){
    const li1 = document.createElement('li');
    li1.className = 'discussion__containerhide';
    li1.id = `id${data.indexOf(as)}-${data.indexOf(as)}`
    //답변자의 사진
    const avatarWrapper1 = document.createElement('div');
    avatarWrapper1.className="discussion__avatar--wrapperhide";
    const avatarImg1 = document.createElement('img');
    avatarImg1.className = "discussion__avatar--imagehide";
    avatarImg1.src = inAnswer.avatarUrl;
    avatarImg1.alt = 'avatar of' + inAnswer['author'];

    avatarWrapper1.append(avatarImg1);

    //답변자의 답변 내용
    const discussionContent1 = document.createElement('div');
    discussionContent1.className = 'discussion__contenthide';
    // 답변 내용
    const $discussiontitle1 = document.createElement('h2');
    $discussiontitle1.className = 'discussion__titlehide';
    $discussiontitle1.innerHTML = as.bodyHTML;
    // 답변자 닉네임
    const $discussionInformation1 = document.createElement('div');
    $discussionInformation1.className = 'discussion__informationhide';
    $discussionInformation1.textContent = as.author;
    discussionContent1.append($discussionInformation1,$discussiontitle1);
   
    // 시간 
    const $Date1 = document.createElement('div');
    $Date1.className = 'Datehide';
    const editDate1 = document.createElement('div');
    editDate1.textContent = as.createdAt;
    $Date1.append(editDate1);

    li1.append(avatarWrapper1,discussionContent1,$Date1);
    return li1;
  }
  return undefined;
}
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //각 li별 아이디 closer
  if(obj===undefined){
    return ''
  }
  const li = document.createElement('li');
  li.className = 'discussion__container';

  //새로 추가된 prepend값에 아이디의 충돌을 막기 위함.
  if(obj.url!==undefined &&obj.url!==null){
  li.id = `id${data.indexOf(obj)}`
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 이미지 리스트
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className="discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  
  // 정보에 이미지 파일 정보가 없을 경우 랜덤이미지로 대체
  if(obj.avatarUrl !== undefined ) {
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of' + obj.author;
  }else{
    avatarImg.src = `./Img/${randomImg()}`;
    avatarImg.alt = 'avatar of' + obj.id;
  }
  avatarWrapper.append(avatarImg);
  
  //중간 답변 넣는 곳.
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  // 답변 안에 링크도 넣어야 됨 <h2><a></a></h2>
  const $discussiontitle = document.createElement('h2');
  $discussiontitle.className = 'discussion__title';
  const $aurl = document.createElement('a');
  // $aurl.href = obj.url; a요소에 텍스트 컨텐츠가 제목이여야 제목에 하이퍼링크 걸림
  if(obj.title !==undefined){
  $aurl.setAttribute('href',`${obj.url}`);
  }else{
    $aurl.href ='';
  }
  $aurl.textContent = obj.title;
  //h2에 a를 자식요소로 삽입
  $discussiontitle.append($aurl);

  // 작성자 넣기 discussionContent로 들어갈거임.
  const $discussionInformation = document.createElement('div');
  $discussionInformation.className = 'discussion__information';
  if(obj.author !== undefined){
  $discussionInformation.textContent = obj.author 
  }else{
    $discussionInformation.textContent = obj.id 
  }
  //discussionContent로 들어갈 자식요소 두가지(제목,id와 시간)
  discussionContent.append($discussionInformation,$discussiontitle);
  
  //시간 넣는 곳.
  const $Date = document.createElement('div');
  $Date.className = 'Date';
  const editDate = document.createElement('div');
  if(obj.createdAt !==undefined){
    editDate.textContent = obj.createdAt;
  }else{
  editDate.textContent = clickTime();
} 
  $Date.append(editDate);

  //answer여부 짓는곳.(버튼을 눌러서 hide된 것을 show로 바꿀 예정)
  const discussionAnswered =document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const showBtn = document.createElement('input');
  showBtn.type = 'button'
  //prepend되는 버튼 아이디 충돌을 막기위함
  if(obj.url!==undefined && obj.url!==null){
  showBtn.id = `btnid${data.indexOf(obj)}`;
}
  if(obj.answer!==null && obj.answer !==undefined){
    showBtn.className = 'previewComplate';
  }else{
    showBtn.className = 'previewNotComplate';
  }
  //showEvent
  let flag = true;
  const showEvent = (event)=>{
    // 버튼이 눌린 li태그의 아이디를 이용해서, answerli에 아이디를 적용할 것임.
   let hideId = li.id

   // complateAnswer(obj)를 통해 hideLi들이 각자의 아이디를 가지고있음.
   // 그 아이디를 찾기 위한 과정.
    if(hideId.length===3){
      hideId = hideId+'-'+hideId[hideId.length-1];
      console.log(hideId);
    }else if(hideId.length===4){
      hideId = hideId+'-'+hideId[hideId.length-2]+hideId[hideId.length-1]
      console.log(hideId);
    }
   
    //answer 있으면 hide된게 있으면 버튼의 동작과 view 여부를 정함(외부에 flag 이용)
    if(obj.url !==undefined &&obj.url !==null){
    const showLi = document.querySelector(`#${hideId}`);
    const btncolor = document.querySelector(`#${event.target.id}`)
    //hideId를 통해 숨겨진 li태그가 있는 지 확인. 있으면 flag를 통해 노출을 결정
     if(showLi){
     if(flag){
     showLi.classList.add('viewin');
     showLi.classList.remove('viewout');
     btncolor.classList.add('btnyellow');

     flag = !flag
    }else{
     showLi.classList.add('viewout');
     showLi.classList.remove('viewin');
     btncolor.classList.remove('btnyellow')
     flag = !flag
    }}
    }
  }

  //버튼 각각 클릭이벤트 지정, showBtn을 클릭 시 하단 hide 내용이 지워져야함.
  showBtn.addEventListener('click',showEvent)

  discussionAnswered.append(showBtn);
  //최종 append 값
  let Answerli = complateAnswer(obj)
  
  if(Answerli!==undefined){
  li.append(avatarWrapper,discussionContent,$Date,discussionAnswered);
  return [li,Answerli];
  }else{
    li.append(avatarWrapper,discussionContent,$Date,discussionAnswered);
    return li;
  }
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

const render = (tagUl,pagenumber)=>{
  for(let i = (pagenumber-1)*10; i<pagenumber*10; i++){
    if(Array.isArray(convertToDiscussion(data[i]))){
      tagUl.append(convertToDiscussion(data[i])[0])
      tagUl.append(convertToDiscussion(data[i])[1])
    }else{
      tagUl.append(convertToDiscussion(data[i]));
    }
  }
}

const $form = document.querySelector('form');

const $username = document.querySelector('#username');
const $usertitle = document.querySelector('#titlename');
const $question = document.querySelector('#story');


const $submitBtn = document.querySelector('#submit');
const enterEvent = (e)=>{
  console.log(e.key)
  if($question.value!==''&&$username.value!==''&&$usertitle.value!==''){
  if(e.keyCode===13){
    let id = $username.value;
    let title = $usertitle.value;
    let questions = $question.value;
    
    const pushData = {
      id,
      title,
      questions,
      
    };
    
    agoraStatesDiscussions.unshift(pushData);
    ul.prepend(convertToDiscussion(data[0]));
    
    $username.value = '';
    $usertitle.value = '';
    $question.value = '';
    restartengine();
    $username.focus();

  };
}else{
  $submitBtn.classList.remove('submitEvent')
}
}
$question.addEventListener('keypress',enterEvent);

// //초기값인 0~9번 항목 구현
await render(ul,1);


//해당 내용을 지워주지 않으면 ul에 데이터가 축적됨.
const showingEvent = (event)=>{
  let setting = ul.children;
  for(let i = setting.length-1; i>-1;i--){
    setting[i].remove();
  }
  console.log('동작완')
  render(ul,event.target.value);
};



//페이지네이션을 위한 버튼 구축


const $numbering =document.querySelector('.numbering');
for(let i=1; i<(data.length/10)+1; i++){
  const pagebtn = document.createElement('input');
  pagebtn.type = 'button';
  pagebtn.value = i;
  pagebtn.addEventListener('click',showingEvent);
 
  $numbering.append(pagebtn);
}
// 제출 이벤트 개수가 추가되면 다시 해야됨.
  const addquestion = (event)=>{
    event.preventDefault();

    // const $removeBtn = document.createElement('input');
    // $removeBtn.type = 'button';
    let id = $username.value;
    let title = $usertitle.value;
    let questions = $question.value;
    
    const pushData = {
      id,
      title,
      questions,
  
    };
    
  
    
    data.unshift(pushData);
    
    //localStorage에 저장
    // localStorage.setItem("agoraStatesDiscussions",JSON.stringify(data))
    $username.value = '';
    $usertitle.value = '';
    $question.value = '';
    
    //submit 시 페이지들을 확인하고 재구성.
    // 그대로 append해주면 버튼들이 추가적으로 생기기 때문에 버튼도 다시생성
    // 페이지도 다시 지워야함.
    restartengine();
    $username.focus();
  }
  
  const restartengine = ()=>{
    let clear = ul.children;
    for(let i = clear.length-1; i>-1;i--){
      clear[i].remove();
    }

    while ($numbering.firstChild) {
      $numbering.removeChild($numbering.firstChild);
    }
    for(let i=1; i<(data.length/10)+1; i++){
      const pagebtn = document.createElement('input');
      pagebtn.type = 'button';
      pagebtn.value = i;
      pagebtn.addEventListener('click',showingEvent);
      $numbering.append(pagebtn);
    }
    render(ul,1);
  }
  $form.addEventListener('submit',addquestion);
}
start();