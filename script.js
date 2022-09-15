// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // 그걸 담는 div
  avatarWrapper.className = "discussion__avatar--wrapper"; // 작성되는 area
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; //답변칸

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const img = document.createElement('img'); //이미지를 만들어주고
  img.className = 'discussion__avatar--image'; // 이미지의 클래스 네임
  img.src = obj.avatarUrl;
  // `https://placeimg.com/64/64/people/${Math.random()}`; // 이미지주소
  img.alt = '멘붕'; //이미지가 렌더링 안됬을때 표시되는 문구
  avatarWrapper.append(img); // avatarWrapper에 img 정보를 append 


// discussion__content에 h2태그를 append한다.
// h2태그안에 a태그를 append하고 h2태그를 discussion__content에 append한다.
// discussion__information도 한번더 discussion__content에 append한다.

const a = document.createElement('a');//a태그 element 만들고
a.textContent = obj.title; // data의 title, textcontent rkwudhktj
a.href = obj.url; // a태그에 href넣어준다

const h2 = document.createElement('h2');//h2태그의 element를 만들어서
h2.className = 'discussion__title';//className을 주고

h2.append(a);//h2태그에 a상수 append
discussionContent.append(h2);//h2태그를 작성하는 area에 append


// discussionAnswered에 obj.author, obj.createAt이 들어가야한다 
//' / ' 간격으로 떨어져있어서 `${obj.author} / ${obj.createdAt}`

const answer = `${obj.author} / ${obj.createdAt}`
discussionContent.append(answer);

const checkBox = document.createElement('div')
checkBox.textContent = '☑'

discussionAnswered.append(checkBox);


// const otherDiv = document.querySelector('discussions__container')
// otherDiv.append(checkBox)








// const templit = `      
//   <div class="discussion__avatar--wrapper">  
//   </div>
//   <div class="discussion__content">
//     <h2 class="discussion__title">
//     <a>${obj.title}</a>
//     </h2>
//     <div class="discussion__information">${obj.creatdAt}</div>
//   </div>
//   <div class="discussion__answered"><p>☑</p></div>`;

// li.innerHTML += templit;

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
