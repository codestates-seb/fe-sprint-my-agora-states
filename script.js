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


const convertToDiscussion = (obj) => {
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
const render = (element,currentPage,maxItem) => {
  if(localStorage.getItem("localdata") !== null){
  agoraStatesDiscussions = JSON.parse(localStorage.getItem("localdata"));
  }
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

const submitBtn = document.querySelector("input[type='submit']");
submitBtn.onclick = () => {
    const InputName = document.querySelector("#name");
    const InputTitle = document.querySelector("#title");
    const InputStory = document.querySelector("#story");
    const seq = "guest" + (
        Math.floor(Math.random() * 10000) + 10000
    )
        .toString()
        .substring(1);
    const date = new Date();
    const time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() +
            "-" + date.getDay() + "T" + date.getHours() + ":" + date.getMinutes() + "z";

    if (InputName.value != "" && InputTitle.value != "" && InputStory.value != "") {
        let tempobject = {
            id: seq,
            createdAt: time,
            title: InputTitle.value,
            url: "https://github.com/codestates-seb/agora-states-fe/discussions ",
            author: InputName.value,
            answer: null,
            bodyHTML: InputStory.value,
            avatarUrl: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-%" +
                    "EB%82%A8%EC%84%B1-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%" +
                    "82%AC%EC%A7%84-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%95%84%EB%B0%" +
                    "94%ED%83%80-%EA%B2%8C%EC%8A%A4%ED%8A%B8-%EC%95%84%EB%B0%94%ED%83%80-%EB%8B%A8%" +
                    "EC%88%9C%ED%9E%88-%EC%9D%B8%EA%B0%84%EC%9D%98-%EB%A8%B8%EB%A6%AC-%EB%B2%A1%ED%" +
                    "84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-%ED%9D" +
                    "%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90.jpg"
        }
        agoraStatesDiscussions.unshift(tempobject);
        localStorage.setItem("localdata", JSON.stringify(agoraStatesDiscussions));
        currentPage = 1;
        render(ul, currentPage, maxItem);
        NewPage(page, maxItem)
    }
}
InputName = '';
InputTitle = '';
InputStory = '';

const homebtn = document.querySelector("#welcome-button");
const home = document.querySelector(".welcome");

home.addEventListener("click", () => {
    const main = document.querySelector("main");
    $(homebtn).fadeOut(1500,()=>{$(main).fadeIn(15000);
    });
    $(home).fadeOut(6000);
  
    
})

