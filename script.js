// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionContentUrl = document.createElement("a");
  discussionContentUrl.src = obj.url;
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()} `;
  discussionContent.append(discussionTitle, discussionInfo);

  const elIcon = document.createElement("i");
  elIcon.className = "fa-solid fa-check";
  const elIconOn = document.createElement("i");
  elIconOn.className = "fa-solid fa-check on";

  const answered = document.createElement('p');
  discussionAnswered.append(obj.answer ? elIconOn : elIcon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const ElnewName = document.querySelector("#newName");
const ElnewTitle = document.querySelector("#newTitle");
// const nameValue = ElnewName.value;
// const titleValue = ElnewTitle.value;

// function createLi(){
//   agoraStatesDiscussions.unshift({author:ElnewName.value, title:ElnewTitle.value});
//   console.log('test');
// }


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = '';
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

document.querySelector("#newSubmit").onclick = function(e) { 
  const nowTime= `${new Date()}`;
  agoraStatesDiscussions.unshift({author:ElnewName.value, title:ElnewTitle.value, avatarUrl:"https://avatars.githubusercontent.com/u/22221941?s=64&u=7332dde3a563f98d2912e107f455ce2265ccca45&v=4", createdAt:nowTime});
  e.preventDefault();
  render(ul);
};

// function createLi(){
//   const newUl = document.querySelector('.discussions__new_container');
//   const newLi = document.createElement('li');
//   newLi.className = 'discussion__container';
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";

//   const newH2 = document.createElement('h2');
//   const newH2Link =document.createElement('a');
//   newH2.append(newH2Link);
//   const newThumb = document.createElement('div');
//   newThumb.className = 'discussion__avatar--wrapper';
//   const newThumbImg = document.createElement('img');
//   newThumbImg.className ='discussion__avatar--image';
//   newThumbImg.src= `https://avatars.githubusercontent.com/u/22221941?s=64&u=7332dde3a563f98d2912e107f455ce2265ccca45&v=4'`;
//   newThumb.append(newThumbImg);
//   const newNick = document.createElement('div');
//   newNick.className = 'discussion__information';
//   const newTime = ` / ${new Date().toLocaleTimeString()}`;
//   const discussionAnswered = document.createElement('div');
//   discussionAnswered.className = "discussion__answered";
  

//   const elIcon = document.createElement("i");
//   elIcon.className = "fa-solid fa-check";
//   discussionAnswered.append(elIcon);

  

//   const nameValue = ElnewName.value;
//   const titleValue = ElnewTitle.value;
//   newH2Link.textContent = titleValue;
//   newNick.textContent = nameValue;

//   newNick.append(nameValue, newTime);
//   discussionContent.append(newH2, newNick);
//   newLi.append(newThumb, discussionContent, discussionAnswered);
//   console.log('test');
  

//   newUl.appendChild(newLi);
// }


// const newCon = () => {
//   const nameValue = ElnewName.value;
//   const titleValue = ElnewTitle.value;
//   newH2Link.textContent = titleValue;
//   newNick.textContent = nameValue;
//   console.log('test');
//   newUl.appendChild(newLi);
// }
//변수 생성
//그 값을 모아서..
//버튼 누르면 li에 추가되도록..

