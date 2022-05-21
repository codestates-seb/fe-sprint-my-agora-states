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
 const avatarImg = document.createElement('img');
avatarImg.src = obj.avatarUrl;
avatarImg.alt = "avatar of " + obj.author;
avatarWrapper.append(avatarImg);
 
const discussionTitle = document.createElement("h2");
const titleAnchor = document.createElement("a");
titleAnchor.href = obj.url;
titleAnchor.textContent = obj.title;
discussionTitle.append(titleAnchor);
discussionContent.append(discussionTitle);
 
const discussionInformation = document.createElement("div");
discussionInformation.textContent = obj.author + ' / ' + obj.createdAt
discussionContent.append(discussionInformation);
 
let checkedIcon = document.querySelector('#checkedIcon').textContent;
const checked = document.createElement("p");
checked.textContent = obj.answer;
/*function(obj) {
 if (obj.answer === null) { checkedIcon.textContent = 'X' }
 else { checked.textContent = checkedIcon } }
discussionAnswered.append(checked); */
 
 
 li.append(avatarWrapper, discussionContent, discussionAnswered);
 return li;
};
 
// 이 아래 디스커션 추가 기능 구현 해야 함
let submitBtn = document.querySelector('#submitBtn');
let nameText = document.querySelector('#name');
let titleText = document.querySelector('#title');
let questionText = document.querySelector('#story');
 
//submit 버튼을 클릭하면???
//안에 내용을 가져와서
submitBtn.onclick = function(){
 submitBtn.preventDefault();
 userName = nameText.textContent
 title = titleText.textContent
 question = questionText.textContent
 return
}
//agoraStatesDiscussions 배열에 추가해야 한다
// 객체 형태로 들어가야 하는데
// {}
 
 
 
 
 
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