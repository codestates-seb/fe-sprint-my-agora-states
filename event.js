const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputTextBox = document.querySelector("#story");
const form = document.querySelector(".form");
const submitButton = document.querySelector(".form__submit");

//해당 이벤트의 기본 동작(새로고침이 되면서 이벤트 발생 전으로 돌아간다)이 실행되지 않도록 한다
form.addEventListener("submit", (event) => {
  event.preventDefault();
});
const addLocalStorage = {
      createdAt: new Date().toLocaleString(),
      title: inputTitle.value,
      author: inputName.value,
      answer: null,
      avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
    };
//event.preventDefault가 예외되는 상황을 조건문으로 표현
function inputValue(event){
    if(inputName.value === ""){
        return;
    }
    if(inputTitle.value === ""){
        return;
    }
    if(inputTextBox.value === ""){
        return; 
    }
    else if(event.target.type === "submit"){
     //작성한 내용이 디스커션에 추가되어야 한다
     agoraStatesDiscussions.push({
        createdAt : new Date().toLocaleString(),
        title : inputTitle.value,
        author : inputName.value,
        answer : null,
        bodyHTML : inputTextBox.value,
        avatarUrl : "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
     });
     //아고라스테이츠디스커션 맨 마지막에 추가된 내용을 맨 앞으로 가져온다
     ul.prepend(convertToDiscussion(agoraStatesDiscussions [agoraStatesDiscussions.length -1]));
    console.log(agoraStatesDiscussions);
    }
    //value 값들을 담을 빈 공간
    inputName.value ='';
    inputTitle.value='';
    inputTextBox.value='';
}

//이벤트리스너를 통한 inputValue 함수 실행
submitButton.addEventListener('click', inputValue);