// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// 초기데이터를 복사해준다.
const agoraStatesDiscussions2 = JSON.parse(JSON.stringify(agoraStatesDiscussions));

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
checkBox.textContent = '❌'
checkBox.textContent = obj.answer ? "✅": "❌"

discussionAnswered.append(checkBox);


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
const addText = document.querySelector('.form__textbox > .addText') // textarea 정보를 가져온다
const submitBtn = document.querySelector('.submitBtn')
const clearBtn = document.querySelector('.clearBtn')



submitBtn.addEventListener('click', addList)

function addList(event) {
  event.preventDefault();
  const addName = document.querySelector('.form__input--name > input') 
  const addTitle = document.querySelector('.form__input--title > input') 
  const addText = document.querySelector('.form__textbox > .addText') 

  const submitDiscussions = {
    
      id: "D_kwDOHOApLM4APjJi",
      createdAt: new Date(),
      title: addTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: addName.value,
      
       
      avatarUrl: `https://placeimg.com/64/64/people/${Math.random()}`,
      }
    agoraStatesDiscussions.unshift(submitDiscussions); 
    const discussons = document.querySelectorAll('li');

    discussons.forEach((discussion)=> {
        discussion.remove();
    })
    render(ul)
    addName.value="";
    addTitle.value="";
    addText.value="";
    
    
  }


  // 1. 객체의 값을 렌더링으로전부다그린다
  // clear 버튼 이벤트리스터
  //이벤트리스터 콜백함수 만들어


  //밑 콜백함수
  //기본 페이지에 그려저잇는 리스트 전부삭제
  // 기존 페이지의 리스트 가져온다
  // 가져온 리스트 반복문으로 모두 삭제
  // 객체 값 초기화로
  // 객체의 값을 렌더링으로 전부 다그린다

  
  
  
  
//clearBtn을 눌렀을때 clearList 함수를 실행시킨다.
  clearBtn.addEventListener('click', clearList)
  
  //clearBtn의 이벤트헨들러 함수
  function clearList(event) {
    //이벤트 기본 동작을 막는다?
    event.preventDefault();
    // 객체를 초기화시켜준다.
    agoraStatesDiscussions = agoraStatesDiscussions2;  
    console.log(agoraStatesDiscussions2)
    // 모든 li의 요소를 가져온다
    const discussons = document.querySelectorAll('li');
    //  가져온요소를 순회하면서 모두 제거해준다
    discussons.forEach((discussion)=> {
    discussion.remove();

  })
  
    
    
    // ul태그를 가져와서 ul 태그에 append해준다.
    const ul = document.querySelector("ul.discussions__container");
    render(ul);
  }

// 한 페이지에 링크  n개가 노출되게한다.
// 이전, 다음 버튼 ?
// 처음, 마지막 버튼
// 화면에 보여야하는거 구현이 된 상태, 화면에 보여질 첫번째, 마지막, 총 페이지 개수
// 총 페이지 수 = Math.ceil(전체 개수 / 한 페이지에 나타낼 데이터 수);


  

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
  
