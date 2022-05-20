//이 부분은 아이콘의 색깔 조정을 위해 미리 클래스의 쿼리셀렉터지정
let elFaComment = document.querySelector('.fa-comment')
let elFaAnswered = document.querySelector('.fa-circle-check')

let now = new Date();
const timediff = function(createdTime){
  let old = new Date (createdTime);
  
  let gap = now.getTime() - old.getTime(); //1970/1/1 12:00 기준 경과한밀리초
  let sec_gap = gap / 1000;
  let min_gap = gap / 1000 /60;

  return min_gap;
}
//submit 버튼이 눌렸을 때 일어나는 일들
const elAuthor = document.querySelector('input#author');
const elTitle = document.querySelector('input#title');
const elBody = document.querySelector('#story');
const submitBtn = document.querySelector("#btn__submit"); //원래 #btn__submit
const elCategory = document.querySelector('#category');

const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div"); //1번째 :discussion content 
  discussionContent.className = "discussion__content";
  const discussionCategory = document.createElement("span"); //카테고리 적어줄 span태그
  discussionCategory.className = "discussion__category";
  

  const discussionTitle = document.createElement("h2"); //h2태그의 title클래스 생성
  discussionTitle.className = "discussion__title";
  const discussionTitleReference = document.createElement("a");
  discussionTitleReference.href = obj.url;
  discussionTitle.append(discussionTitleReference)
  discussionCategory.textContent = obj.category;
  discussionTitleReference.textContent = obj.title;
  
  
  discussionContent.append(discussionCategory,discussionTitle);
  


  const discussionIcons = document.createElement("div");
  discussionIcons.className = "discussion__icons";
  const discussionIconsComment = document.createElement("div");
  discussionIconsComment.className = "discussion__icons--comment";
  const faComment = document.createElement("i");
  faComment.className = "fa-solid fa-comment";
  const faCircle = document.createElement("i");
  const discussionIconsAnswered = document.createElement("div");
  if (obj.answer!==null){  
    faCircle.className = "fa-solid fa-circle-check";
    faComment.className = "fa-solid fa-comment";
  }else{
    faCircle.className = "fa-solid fa-circle-check hide";
    faComment.className = "fa-solid fa-comment hide";
  }
  
  discussionIconsComment.append(faComment);
  discussionIconsAnswered.append(faCircle);
  discussionIcons.append(discussionIconsComment,discussionIconsAnswered)
  
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of '+obj.author;
  

  const discussionInformation = document.createElement('div');
  const discussionNickname = document.createElement('div');
  discussionNickname.className = "discussion__nickname";
  const discussionDate = document.createElement('div');
  discussionDate.className = "discussion__date";

  //여기서부턴 위에서 지정해준 timediff를 몇분전으로 표기되도록 시간환산
  discussionNickname.textContent = obj.author;
  if(timediff(obj.createdAt)<60){
    discussionDate.textContent = `${Math.floor(timediff(obj.createdAt))}분 전`
  }else if(timediff(obj.createdAt)<1440){
    discussionDate.textContent = `${Math.floor(timediff(obj.createdAt)/60)}시간 전`
  }else if(timediff(obj.createdAt)<43200){
    discussionDate.textContent = `${Math.floor(timediff(obj.createdAt)/1440)}일 전`
  }else if(timediff(obj.createdAt)<518400){
    discussionDate.textContent = `${Math.floor(timediff(obj.createdAt)/43200)}달 전`
  }else{
    discussionDate.textContent = `${Math.floor(timediff(obj.createdAt)/518400)}년 전`
  }
  discussionInformation.append(discussionNickname,discussionDate);
  avatarWrapper.append(avatarImg,discussionInformation);

  
  li.append(discussionContent,discussionIcons,avatarWrapper);
  ul.prepend(li)//prepend에 대해 잘 이해하지 못했지만 post를 밀어넣어주는역할
  return li;
};
//submit버튼을 눌렀을 때
submitBtn.addEventListener("click",function(event){
  let post={};
  event.preventDefault();
  console.log(elAuthor.value);
  console.log(elTitle.value);
  console.log(elBody.value);
  alert('글이 등록되었습니다!');
   //submit버튼을 누를때 그 값을 post에 저장
  post['author']=elAuthor.value;
  post['title']=elTitle.value;
  post['createdAt'] = now;
  post['answer'] = null;
  post['avatarUrl']="https://cdn.pixabay.com/photo/2020/03/25/16/01/children-4967808__340.jpg";
  post['category']=elCategory.value;
  //document.select.category.value
  convertToDiscussion(post);
  elAuthor.value = ''
  elTitle.value=''
  elBody.value = ''
  
})

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