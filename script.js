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

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.setAttribute('src',`${obj.avatarUrl}`);
  avatarImg.setAttribute('alt',`avatar of ${obj.author}`);
  avatarWrapper.appendChild(avatarImg);


  const discussiontitle = document.createElement('h2');
  discussiontitle.classList.add('discussion__title');
  const titleLink = document.createElement('a');
  titleLink.setAttribute('href',`${obj.url}`);
 
  titleLink.textContent = obj.title;
  discussiontitle.appendChild(titleLink);
  discussionContent.appendChild(discussiontitle);


  const discussionInformation = document.createElement('div');
  discussionInformation.classList.add('discussion__information');
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.appendChild(discussionInformation)


  const discussionBody = document.createElement('div');
  discussionBody.innerHTML = obj.bodyHTML;




  

  
  

  if(obj.answer){
    const p = document.createElement('p');
    p.textContent = '☑';
    p.onclick = () => {
      discussionAnswered.appendChild();
    }

    discussionAnswered.appendChild(p);
  }

  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;


  
  
};

localStorage.setItem('agDs',JSON.stringify(agoraStatesDiscussions));

let userData = JSON.parse(localStorage.getItem('agDs2'));

console.dir(userData);

  const form = document.querySelector('form.form');
  form.addEventListener("submit" , (event) => {
    event.preventDefault();
    const inputName = document.querySelector('#name');
    const inputTitle = document.querySelector('#title');
    const inputQuestion = document.querySelector('#story');
    let newDoc = `<h2>${inputName.value}님의 질문입니다.</h2>\n<p>${inputTitle.value}</p>\n<p>${inputQuestion.value}</p>`
    
    userData.unshift(
      {id : inputName.value,
      title : inputTitle.value,
      avatarUrl : "images.jpeg",
      bodyHTML : `<h2>${inputName.value}님의 질문입니다.</h2>\n<p>${inputTitle.value}</p>\n<p>${inputQuestion.value}</p>`,
      createdAt : new Date(),
      url : 'data:text/html;charset=UTF-8,'+encodeURIComponent(newDoc),
      author : inputName.value
      }
    );
    console.dir(userData);
  
    ul.prepend(convertToDiscussion(userData[0]));
   
    localStorage.setItem('agDs2',JSON.stringify(userData));
  })

  

// function newStory(event) {
  
//   const inputName = document.querySelector('#name');
//   const inputTitle = document.querySelector('#title');
//   const inputQuestion = document.querySelector('#story');

//   agoraStatesDiscussions.unshift(
//     {id : inputName.value,
//     title : inputTitle.value,
//     avatarUrl : "images.jpeg",
//     bodyHTML : inputQuestion.value,
//     createAt : `${new Date()}`,
//     author : inputName.value
//   }
//   );
//   console.dir(agoraStatesDiscussions);
  
//   ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));

  
  
  
// }
console.dir(agoraStatesDiscussions)




// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < userData.length; i += 1) {
    element.append(convertToDiscussion(userData[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


