const discussionForm = document.querySelector(".form");

discussionForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    submitDiscussion(event);

});

const localDiscussion = () => {
    //localstorage에 저장된 local_discussion 을 얻어옴
    const savedDiscussion = localStorage.getItem("local_discussion"); 
    if(savedDiscussion === null) return [];
    else return JSON.parse(savedDiscussion); //JSON 문자열을 js 객체로 반환
};

const savedLocalDiscussion = (value) => {
    //value 값 = js 값 을 JSON 문자열로 반환
    localStorage.setItem("local_discussion", JSON.stringify(value));
}

const submitDiscussion = (event) =>{
    //event.target[0,1,2,3] = [inputName, inputTitle, inputTextBox, submitBtn]

    console.log('event',event);

    //받아온 value로 새로운 의견 할당
    const newDiscussion = {
        id: localDiscussion().length+1, 
        createdAt : new Date().toLocaleString(),
        title : event.target[1].value,
        url: "https://github.com/codestates-seb/agora-states-fe/discussions",
        author : event.target[0].value,
        answer : null,
        avatarUrl : 'https://velog.velcdn.com/images/jeongjwon/profile/b4c71781-8b27-4f09-bb22-400d72d0e8cc/image.png'
    };
    
    //form 입력칸 리셋  
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";

   
    const updatedDiscussion = [newDiscussion, ...localDiscussion()];  //기존의 localDiscussion()에 unshift 
    savedLocalDiscussion(updatedDiscussion); //key, value 저장
    

}

// discussion 추가
// const form= document.querySelector('.form__container');
// let elInputUserName = document.querySelector('#name');
// let elInputTitle = document.querySelector('#title');
// let elInputTextBox = document.querySelector('#story');

// form.addEventListener('submit', function(e) {
//   e.preventDefault();
  
//   const newDiscussion = {
//     createdAt : new Date().toLocaleString(),
//     title : elInputTitle.value,
//     url: "https://github.com/codestates-seb/agora-states-fe/discussions",
//     author : elInputUserName.value,
//     answer : null,
//     bodyHTML : elInputTextBox.value,
//     avatarUrl : 'https://velog.velcdn.com/images/jeongjwon/profile/b4c71781-8b27-4f09-bb22-400d72d0e8cc/image.png'
//   };
  
  
//  agoraStatesDiscussions.unshift(newDiscussion);
//  const newArr = convertToDiscussion(newDiscussion);
//  ul.prepend(newArr);
// });