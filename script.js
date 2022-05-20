// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성

  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar__wrapper";
  
  const avatarImg = document.createElement('img');
  avatarImg.className =  'discussion__avatar--image';

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitlle = document.createElement('h2');
  discussionTitlle.className = "discussion__title";

  const titleAngcer = document.createElement('a');
  
  const discussionInformation = document.createElement('div')
  discussionInformation.className = 'discussion__information' ;
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const titleParagraph  = document.createElement('p');
  
 
// 화면에 렌더링 시킬 각종 옵션들
// 이미지 크기조정

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  
      // 아바타사진 화면에 렌더링하도록 append 사용함
    avatarWrapper.append(avatarImg);

 
          // 시간만 나오도록
    let times = obj.createdAt.slice(11,19)
   
    // 오전,오후
       if(Number(times.slice(0,2)) < 12 ){
            times = '오전 ' + times
    } else if(Number(times.slice(0,2)) > 12) {

      times = '오후 ' + times;
    } 
    
discussionInformation.textContent = `${obj.author} / ${(times).toString()}`
  
// p태그, 체크박스
titleParagraph.textContent = '☑';
discussionAnswered.append(titleParagraph); 

// 내용출력
  titleAngcer.href = obj.url;
  titleAngcer.textContent = obj.title;

  // 
  discussionTitlle.append(titleAngcer);
  discussionContent.append(discussionTitlle,discussionInformation);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    element.innerHTML="";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  
  }
  return;
};

const strTyping = () =>{

const useName = document.querySelector('#user__name');
const titleName = document.querySelector('#title__name');

useName.onkeyup = function(){
  console.log(useName.value)
}
titleName.onkeyup = function(){
  console.log(titleName.value)
}


}

const testes = '바보';
submit.onclick = function(){
  ul.append(testes);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 시간 짜르는
// const createDate = new Date(obj.createdAt).toLocaleTimeString();



