// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const music = document.querySelector('#music');
const musicBtn = document.querySelector('.btn_music');

let now=0;

function playAudio() {
  if(now===0){
    music.volume = 0.3;
    music.loop = true;
    music.play();
  now=1;  
  }else{
    music.pause(); 
    now=0; 
  }
}


musicBtn.addEventListener('click', playAudio);



$(window).scroll(function(){
	if ($(this).scrollTop() > 300){
		$('.btn_gotop').show();
	} else{
		$('.btn_gotop').hide();
	}
});
$('.btn_gotop').click(function(){
	$('html, body').animate({scrollTop:0},400);
	return false;
});

//본문
const convertToDiscussion = (obj) => {//디스커션 생성파트
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("discussion__avatar--wrapper");

  const discussionContent = document.createElement("div");
  discussionContent.classList.add("discussion__content");

  const discussionAnswered = document.createElement("div");
  discussionAnswered.classList.add("discussion__answered");

  const avatarimage = document.createElement("img"); //아바타 이미지 할당
  avatarimage.classList.add("discussion__avatar--image");
  avatarimage.src= obj.avatarUrl; //이미지 주소 할당
  avatarimage.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarimage); //avatarWrapper에 avatarimage를 자식으로 추가

  const title = document.createElement("h2");
  title.classList.add("discussion__title");
  const Url = document.createElement("a"); //url 정보가 담긴 a태그
  Url.setAttribute("href", obj.url);
  Url.textContent = obj.title;
  title.append(Url);

  const information = document.createElement("div");
  information.classList.add("discussion__information");
  information.textContent = obj.author + "/" + obj.createdAt;

  discussionContent.append(title, information); //title과 information(유저id,날짜)를 discussionContent의 자식으로 추가

  const answered = document.createElement("p");
  if(obj.answer !=null){answered.textContent = "☑";}
  else{ answered.textContent = "□";}
  discussionAnswered.append(answered); //answered를 discussionAnswered의 자식으로 추가
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};





//페이지 네이션

const ul = document.querySelector(".discussions__container");
const page = document.querySelector(".page__container");
let currentPage = 1;
let maxItem = 10;


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render =async (element,currentPage,maxItem) => {
  
  let endpoint = `http://localhost:4000/discussions/`
  let agoraStatesDiscussions = await fetch(endpoint).then((response) => response.json());
  element.innerHTML = "";
  currentPage--;

  let first = currentPage * maxItem; 
  let last= first + maxItem; 
  let pagelist = agoraStatesDiscussions.slice(first,last);

  for(let i = 0; i < pagelist.length; i++){
    element.append(convertToDiscussion(pagelist[i]));
  }
};

function NewPage (page, maxItem){
  page.innerHTML = "";

  let page_count = Math.ceil(agoraStatesDiscussions.length / maxItem);
  for(let i = 1; i < page_count + 1; i++){
    let btn = pageBtn(i);
    page.appendChild(btn);
  }
}
function pageBtn(page){
  let num = document.createElement('p');
  num.textContent = page;
  let button = document.createElement('button');
  button.classList.add("page__btn");
  button.append(num);

  if(currentPage === page) { button.classList.add('active'); }

  button.addEventListener('click', function () {
    currentPage = page;
    render(ul, currentPage, maxItem);
    let current_btn = document.querySelector('.page__btn.active');
    current_btn.classList.remove('active');
    button.classList.add('active');
  })

  return button;
}
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

render(ul, currentPage, maxItem);
NewPage(page, maxItem);


//입력 폼에서 받은 데이터를 agoraStatesDiscussions에 저장

const form = document.querySelector("form.form");
form.addEventListener("submit",  async (event) => {
  event.preventDefault();

    const InputName = document.querySelector("#name");
    const InputTitle = document.querySelector("#title");
    const InputStory = document.querySelector("#story");
    
        let tempobject = {
            title: InputTitle.value,
            author: InputName.value,
            bodyHTML: InputStory.value,
        }
        agoraStatesDiscussions=await fetch(`http://localhost:4000/discussions/`,{ method: 'POST',
        body: JSON.stringify(tempobject)}).then((response) => response.json());
        currentPage = 1;
        render(ul, currentPage, maxItem);
        NewPage(page, maxItem)
    }
);
InputName = '';
InputTitle = '';
InputStory = '';
