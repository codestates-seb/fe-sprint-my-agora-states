// 디스커션 추가 기능


// input에 내용을 작성 한 후 버튼을 누름
// 안에 있는 정보가 data에 들어감.
// agoraStatesDiscussions는 array ----> object로 만들어서  앞에다가 push해줘야함.

const input_name = document.querySelector('#name');
const input_title = document.querySelector('#title');
const input_story = document.querySelector('#story');
const button = document.querySelector('#button');
const message__name = document.querySelector('#mesaage__name');
const message__title = document.querySelector('#message__title');
const message__story = document.querySelector('#message__story');


const baseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";


const reset = function(){
  input_name.value = '';
  input_story.value = '';
  input_title.value = '';
}


button.addEventListener('click',function(e){
  e.preventDefault();

  const makeData = {
    avatarUrl : `${baseURL}${Math.floor(Math.random() * 300)}.png`,
    author : input_name.value,
    createdAt : new Date(new Date().getTime()).toLocaleString(),
    title : input_title.value,
    story : input_story.value
    };

    if(input_name.value.length < 3){
      input_name.focus();
      message__name.classList.remove('hide');
    } else if(input_title.value.length === 0){
      input_title.focus();
      message__title.classList.remove('hide');
    } else if(input_story.value.length < 10){
      input_story.focus();
      message__story.classList.remove('hide');
    } 
    else{
      agoraStatesDiscussions.unshift(makeData);
      const addLi = convertToDiscussion(agoraStatesDiscussions[0]);
      ul.prepend(addLi);
      saveQuestion();
      reset();

      DisplayList(agoraStatesDiscussions, ul, rows, 1);
      const current_btn = document.querySelectorAll('#pagination button');
      for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }
      current_btn[0].classList.add('active');
    }


});

input_name.addEventListener('keyup',()=>{
  input_name.value.length < 3 && input_name.value.length > 0 ? message__name.classList.remove('hide') : message__name.classList.add('hide')
})

input_title.addEventListener('keyup',()=>{
  input_title.value.length < 5 && input_title.value.length > 0 ? message__title.classList.remove('hide') : message__title.classList.add('hide')
})

input_story.addEventListener('keyup',()=>{
  input_story.value.length < 10 && input_story.value.length > 0 ? message__story.classList.remove('hide') : message__story.classList.add('hide')
})