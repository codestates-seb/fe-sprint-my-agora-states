
//input 입력 값을 객체에 담음
//agoraStatesDiscussions 배열에 넣어줌



// const todoInputElem = document.querySelector('.todo-input');

// let todos = [];
// let id = 0;

// const init = () => {
//     todoInputElem.addEventListener('keypress', (e) =>{
//         if( e.key === 'Enter' ){
//             appendTodos(e.target.value); todoInputElem.value ='';
//         }
//     })
// }

// init()



const nameInput = document.querySelector('.name_input');
const titleInput = document.querySelector('.title_input');
const textInput = document.querySelector('.text_input');
const submitBtn = document.querySelector('.inputsize');


let newObj = {};


submitBtn.onclick = function(){ //객체에 담기
    newObj.author = nameInput.value;
    newObj.title = titleInput.value;
    newObj.question = textInput.value; 
    newObj.createdAt = Date.now(); 
    agoraStatesDiscussions.push(newObj);
    render(ul);
    newObj = {};
    nameInput.value ='';
    titleInput.value ='';
    textInput.value ='';
}

