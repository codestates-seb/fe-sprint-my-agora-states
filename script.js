// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
    li1.id = `id${agoraStatesDiscussions.indexOf(as)}-${agoraStatesDiscussions.indexOf(as)}`
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

  const li = document.createElement('li');
  li.className = 'discussion__container';
  li.id = `id${agoraStatesDiscussions.indexOf(obj)}`
  
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
  //answer여부 짓는곳.
  const discussionAnswered =document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const showBtn = document.createElement('input');
  showBtn.type = 'button'
  showBtn.id = `btnid${agoraStatesDiscussions.indexOf(obj)}`;
  if(obj.answer!==null && obj.answer !==undefined){
    showBtn.className = 'previewComplate';
  }else{
    showBtn.className = 'previewNotComplate';
  }
  //showEvent
  let flag = true;
  const showEvent = (event)=>{
   let hideId = li.id

   //hideId 뽑는 과정
    if(hideId.length===3){
      hideId = hideId+'-'+hideId[hideId.length-1];
      console.log(hideId);
    }else if(hideId.length===4){
      hideId = hideId+'-'+hideId[hideId.length-2]+hideId[hideId.length-1]
      console.log(hideId);
    }
   
    //hide된게 있으면 버튼의 동작과 view 여부를 정함(외부에 flag 이용)
     const showLi = document.querySelector(`#${hideId}`);
     const btncolor = document.querySelector(`#${event.target.id}`)

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

  //showBtn을 클릭 시 하단 hide 내용이 지워져야함.
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

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (tagUl)=>{
  for(let item of agoraStatesDiscussions){
    if(Array.isArray(convertToDiscussion(item))){
      tagUl.append(convertToDiscussion(item)[0])
      tagUl.append(convertToDiscussion(item)[1])
    }else{
      tagUl.append(convertToDiscussion(item));
    }
  }
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
const $form = document.querySelector('form');

const $username = document.querySelector('#username');
const $usertitle = document.querySelector('#titlename');
const $question = document.querySelector('#story');

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
  console.log(pushData.avatarUrl);
  agoraStatesDiscussions.unshift(pushData);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  
  $username.value = '';
  $usertitle.value = '';
  $question.value = '';
}

$form.addEventListener('submit',addquestion);
const $submitBtn = document.querySelector('#submit');
const enterEvent = (e)=>{
  console.log(e.key)
  if($question.value!==''&&$username.value!==''&&$usertitle.value!==''){
  $submitBtn.className='submitEvent';
  if(e.keyCode===13){
    let id = $username.value;
    let title = $usertitle.value;
    let questions = $question.value;
    // 
    const pushData = {
      id,
      title,
      questions,
  
    };
    console.log(pushData.avatarUrl);
    agoraStatesDiscussions.unshift(pushData);
    ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
    
    $username.value = '';
    $usertitle.value = '';
    $question.value = '';
    $question.focus();
  };
}else{
  $submitBtn.classList.remove('submitEvent')
}
}
$question.addEventListener('keypress',enterEvent);