
// data.array.forEach(item => {
//   liMaker(item);  
// });


// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
  console.log(agoraStatesDiscussions);



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
  const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정


    const avatarWrapper = document.createElement("div");//   li.append 요소 생성
    avatarWrapper.className = "discussion__avatar--wrapper";

    const discussionContent = document.createElement("div");//   li.append 요소 생성
    discussionContent.className = "discussion__content";

    const discussionAnswered = document.createElement("div");//   li.append 요소 생성
    discussionAnswered.className = "discussion__answered";


    // // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const avatarh2 = document.createElement('h2');
    avatarh2.className ="discussion__title";
    discussionContent.append(avatarh2);

    const avatara = document.createElement('a');
    avatara.href =obj.url;
    avatara.textContent = obj.title
    avatarh2.append(avatara);


    const avatarp = document.createElement('p');
    avatarp.textContent = '☑';
    discussionAnswered.append(avatarp);

    const avatardiv = document.createElement('div');
    avatardiv.className ="discussion__information";
    avatardiv.textContent = `${obj.author}` + '/' + `${obj.createdAt}`;
    discussionContent.append(avatardiv);


    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li; 
  };


  let elform = document.querySelector('.form.form');
  let elnameInput = document.querySelector('#name');
  let eltitle = document.querySelector('#name2');
  let elquestion = document.querySelector('#story');
  let reagoraStatesDiscussions = agoraStatesDiscussions;

  elform.addEventListener("submit", (event) =>{
    event.preventDefault();

    let obj={
      id: Date.now(),
      createdAt: new Date(),
      title: eltitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: elnameInput.value,
      answer: null,
      bodyHTML: elquestion.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    };
       
    agoraStatesDiscussions.unshift(obj);

    render(ul);

  })   

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
  const render = (element) => {
    for (let i = 0; i < reagoraStatesDiscussions.length; i += 1) {
      element.append(convertToDiscussion(reagoraStatesDiscussions[i]));
    }
    return ;
  };


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
  const ul = document.querySelector("ul.discussions__container");
  render(ul);


  // let itemsArray=localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')):[];

  // localStorage.setItem('items', JSON.stringify(itemsArray));
  // const data=JSON.parse(localStorage.getItem('items'));

  // FormData.addEventListener('submit', function(e){
  // e.preventDefault();
  // itemsArray.push(input.value);
  // localStorage.setItem('items', JSON.stringify(itemsArray));
  // liMaker(input.value);
  // input.value="";
  // });
  