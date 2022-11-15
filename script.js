
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  //사진 가져오기
  const avatarWrapperImg = document.createElement('img');
  avatarWrapperImg.className="discussion__avatar--image";
  avatarWrapperImg.src = obj.avatarUrl
  avatarWrapper.append(avatarWrapperImg)


  //콘텐츠 
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  //인포메이션 가져오기 content 안에 있음
  const discussionInformation = document.createElement('div');
  discussionInformation.className ="discussion__information";
  discussionInformation.textContent =`${obj.author} / ${obj.createdAt}`



  //타이틀 가져오기
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  //h2에 anchor 넣어서 url 가져오기
  const titleAnchor = document.createElement('a');
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);
  discussionTitle.append(titleAnchor);

  titleAnchor.href = obj.url;
  titleAnchor.textContent =obj.title;

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //답변이 있을 때 없을 때 박스체크표시 만들기
  if(obj.answer === null){
    let answerPara = document.createElement('p');
    discussionAnswered.append(answerPara);
    answerPara.textContent = '☐'
  }else{
    let answerPara = document.createElement('p');
    discussionAnswered.append(answerPara);
    answerPara.textContent = '☑'
    
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  



  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



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

  //버튼 눌렀을 때 
  let userName = document.querySelector('#name');
  let title = document.querySelector('#title');
  let story = document.querySelector('#story');
  const btn = document.querySelector('.form__submit');
  

  
  btn.addEventListener("click", function(e){

    e.preventDefault();

    //createdAt에 들어갈 날짜
    let editTime = new Date();
    let year = editTime.getFullYear();
    let month = editTime.getMonth()+1;
    let day = editTime.getDate();
    let hour = editTime.getHours();
    let minute = editTime.getMinutes();
    let second = editTime.getSeconds();


    const obj ={
      createdAt:`${year}-${month}-${day} || ${hour}:${minute}:${second}`,
      title:title.value,
      author:userName.value,
      answer:null,
      bodyHTML:story.value,
      avatarUrl:'https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4',
    }


    agoraStatesDiscussions.unshift(obj);
    const addDiscussion = convertToDiscussion(obj);
    ul.prepend(addDiscussion);

    //초기화
    story.value='';
    title.value='';
    userName.value='';
    

    console.log(agoraStatesDiscussions);
  })
  
