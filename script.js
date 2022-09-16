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

const answer = `${obj.author} / ${new Date(obj.createdAt)}`
discussionContent.append(answer);

const checkBox = document.createElement('div')
checkBox.textContent = '✅'
checkBox.textContent = obj.answer ? "✅": "❌"

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




// agoraStatesDiscussions 질문 List를 가지고 있는 객체
// name박스 title박스 question박스 데이터 submit을 눌렀을때 agoraStatesDiscussions에 담아져야한다.(앞으로)
// 그 정보들이 함수 convertToDiscussion에 담겨서 render가 되어야한다.
// 1. name, title, question = textcontent 를 설정해줘야한다.
// create createdAt, title, author, answer,avatarUrl

// const form = document.querySelector('form')
const addName = document.querySelector('.form__input--name > input') // name input을 가져온다
const addTitle = document.querySelector('.form__input--title > input') // title input 정보를 가져온다
const addText = document.querySelector('form > .textarea') // textarea 정보를 가져온다
const submitBtn = document.querySelector('.submitBtn')
const clearBtn = document.querySelector('.clearBtn')

console.log(clearBtn)


submitBtn.addEventListener('click', addList)

function addList(event) {
  event.preventDefault();
  const submitDiscussions = {
    
      id: "D_kwDOHOApLM4APjJi",
      createdAt: new Date(),
      title: addTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: addName.value,
      answer: {
        id: "DC_kwDOHOApLM4AKg6M",
        createdAt: new Date,
        url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
        author: "Kingsenal",
        bodyHTML:
          '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
        },
        avatarUrl: `https://placeimg.com/64/64/people/${Math.random()}`,
      }
    agoraStatesDiscussions.unshift(submitDiscussions); 
    console.log(agoraStatesDiscussions)
    ul.prepend(convertToDiscussion(submitDiscussions))
  }

  


  

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
  
