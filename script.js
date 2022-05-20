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

  
  const avatarsImg= document.createElement('img');
    avatarsImg.src= obj.avatarUrl;
    avatarsImg.alt= 'avatar of'+ obj.author;
    avatarWrapper.append(avatarsImg);

  const Title= document.createElement('h2');
    const Title_2= document.createElement('a');
      Title_2.href= obj.url;
      Title_2.textContent= obj.title;
      Title.append(Title_2);
    discussionContent.append(Title);

  const Information= document.createElement('div');
    Information.className= 'discussion__information';
    Information.textContent= obj.id +' / '+ obj.createdAt;
    discussionContent.append(Information);

  const Answered= document.createElement('p');
    Answered.textContent= '☑';
    discussionAnswered.append(Answered);



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


// 

// 포스팅 박스 제어하기 => 구글 ajax

function openclose() {
    // id 값 post-box의 display 값이 block 이면
    if ($('#post-box').css('display') == 'block') {
        // post-box를 가리고
        $('#post-box').hide();
				// 가렸으니까 이제 열기로 바꿔두기
        $('#question_btn').text('나도 질문하기');
    } else {
        // 아니면 post-box를 펴라
        $('#post-box').show();
				// 폈으니까 이제 닫기로 바꿔두기
        $('#question_btn').text('질문창 닫기');
    }
}

// submit버튼 눌렀을 때 작동

let inputName= document.getElementsByClassName('form__input--name')[0];
let inputTitle= document.getElementsByClassName('form__input--title')[0];
let inputTextbox= document.getElementsByClassName('form__textbox')[0];

function submit (){
  
}