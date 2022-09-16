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

  // 프로필 이미지 생성하고 넣기
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.setAttribute("src", obj["avatarUrl"]);
  avatarWrapper.append(avatarImage);

  // 타이틀 생성하고 discussionContent 에 넣기
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  
  const discussionTitleTagA = document.createElement("a");
  discussionTitleTagA.setAttribute("href", '#');
  discussionTitleTagA.setAttribute("onclick", 'return false');
  discussionTitleTagA.textContent = obj["title"];

  discussionTitle.append(discussionTitleTagA);
  discussionContent.append(discussionTitle);

  // 아티클 생성후 넣기
  const discussionArticle = document.createElement("p");
  discussionArticle.className = "discussion__article";
  discussionArticle.innerHTML = obj["bodyHTML"];

  discussionContent.append(discussionArticle);


  // 닉네임, 작성일자 생성후 discussionContent 에 넣기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  const discussionCreatedtime = new Date(obj["createdAt"]).toLocaleString('ko-KR');
  discussionInformation.textContent = `${obj["author"]} / ${discussionCreatedtime}`;

  discussionContent.append(discussionInformation);

  // 디스커션에 object 가 있는지 확인하고 없으면 스킵, 있으면 넣기
  const answeredFlag = obj["answer"];
  const disscusionAnsweredPtag = document.createElement("p");
  const _header = `<a href="${obj['url']}"><i class="fa-brands fa-github"></i></a>`;

  if (answeredFlag !== null ) {
    disscusionAnsweredPtag.innerHTML = `${_header}<i class="fa-regular fa-square-check"></i>`;
  } else {
    disscusionAnsweredPtag.innerHTML = `${_header}<i class="fa-regular fa-square"></i>`;
  }
  
  discussionAnswered.append(disscusionAnsweredPtag);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  return li;
};


const convertToAnswer = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.classList.add("discussion__answer"); // answer 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 프로필 이미지 생성하고 넣기
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.setAttribute("src", obj["answer"]["avatarUrl"]);
  avatarWrapper.append(avatarImage);

  // 타이틀 생성하고 discussionContent 에 넣기
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  
  const discussionTitleTagA = document.createElement("a");
  discussionTitleTagA.innerHTML = obj["answer"]["bodyHTML"];

  discussionTitle.append(discussionTitleTagA);
  discussionContent.append(discussionTitle);

  // 닉네임, 작성일자 생성후 discussionContent 에 넣기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  const discussionCreatedtime = new Date(obj["answer"]["createdAt"]).toLocaleString('ko-KR');
  discussionInformation.textContent = `${obj["answer"]["author"]} / ${discussionCreatedtime}`;

  discussionContent.append(discussionInformation);
  li.append(avatarWrapper, discussionContent);
  
  return li;
}
function addPagebtn(objectp, object, number){
  //const _btnWrapper = document.createElement("div");
  const _newbtn = document.createElement("button");
  _newbtn.className = "pagination__btn";
  _newbtn.textContent = number;

  _newbtn.addEventListener('click', () => {
    render(objectp, number);
  });

  object.append(_newbtn);
  return _newbtn;
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, currentPage) => {
  const _discussionCount  = agoraStatesDiscussions.length;    // 총 디스커션의 개수
  const _footer           = document.querySelector(".pagination__wrapper");
  
  // footer 초기화
  while ( _footer.hasChildNodes() ){
    _footer.removeChild(_footer.lastChild);
  }

  let _totalPageCount     = Math.ceil(_discussionCount / 10); // 총 페이지의 개수
  let _curlastPage        = Math.ceil(currentPage / 10) * 10; // 현재 버튼의 마지막 페이지
  if ( _curlastPage > _totalPageCount ) _curlastPage = _totalPageCount;
  let firstPage           = _curlastPage - ( 10 - 1) <= 0 ? 1 : _curlastPage - (10 - 1);
  
  // 페이지리스트 렌더링
  for (let i = firstPage; i <= _curlastPage; i += 1) {
    if ( i === firstPage && currentPage !== 1 ) {
      const _prevBtn = addPagebtn(element, _footer, currentPage - 1);
      _prevBtn.textContent = '◀';
      _prevBtn.className = "pagination__btn__special";
    }

    if ( currentPage === i ) {
      const _curPage = addPagebtn(element, _footer, i);
      _curPage.classList.add('curpage');
    } else {
      addPagebtn(element, _footer, i);
    }

    if ( i === _curlastPage  && currentPage !== _totalPageCount ) {
      const _prevBtn = addPagebtn(element, _footer, currentPage + 1);
      _prevBtn.textContent = '▶';
      _prevBtn.className = "pagination__btn__special";
    }
  }  

  // 본문 렌더링 하기 전에 자식노드 삭제
  while ( element.hasChildNodes() ){
    element.removeChild(element.lastChild);
  }

  // 본문 렌더링
  let firstDis = (currentPage - 1) * 10;
  let lastDis = (firstDis) + 10 > _discussionCount ? _discussionCount : (firstDis) + 10;

  for (let i = firstDis; i < lastDis; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // 만약 answer 가 null 이 아니라면 다음에 바로 두번째 클래스가 discussion__answer 인 디스커션 추가
    if ( agoraStatesDiscussions[i]["answer"] !== null ){
      element.append(convertToAnswer(agoraStatesDiscussions[i]));
    }
  }

  const btn = document.querySelectorAll(".discussion__title");
  for (let i = 0; i < btn.length; i ++ ){
    btn[i].addEventListener('click', function (){
      const _answer = btn[i].parentElement.parentElement.nextElementSibling;

      // 타이틀 클릭시 내용과 답변열기
      const _article = btn[i].nextElementSibling;
      _article.classList.toggle("discussion__article__active");

      if (_answer.classList[1] === 'discussion__answer'){
        _answer.classList.toggle('accordion__active');
      }
    });
  }

  return;
};


// 처음에 localStorage 에서 데이터 불러오기
loadLocalstoragedata();

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 1);

// submit 버튼에 로컬스토리지 데이터저장 기능 넣기
const submitBtn = document.querySelector("#saveLs");
submitBtn.addEventListener('click', () => {
  saveLocalstorageData();
  window.location.reload();
});


