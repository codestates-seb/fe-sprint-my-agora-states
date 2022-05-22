// const newDate = function(){
//   let x = new Date();
//   var hours = ('0' + x.getHours()).slice(-2); 
//   var minutes = ('0' + x.getMinutes()).slice(-2);
//   var seconds = ('0' + x.getSeconds()).slice(-2); 

//   if (hours>=12){
//     if (hours===12) return `PM 12 : ${minutes} : ${seconds};`
//     else if (hours>=13 && hours<=21){
//     return `PM 0${hours-12} : ${minutes} : ${seconds};`}
//     else return `PM ${hours-12} : ${minutes} : ${seconds};`
//   }
//   else return `AM ${hours} : ${minutes} : ${seconds};`
// }

function ab(){
  let typeName = document.getElementById('nameInput').value;
  document.getElementById('nameInput').innerHTML = typeName;

  let typeDate = new Date().toLocaleString();
  let typeTitle = document.getElementById('titleInput').value;
  document.getElementById('titleInput').innerHTML = typeTitle;

  const newDiscussion = {author:typeName, createdAt:typeDate, title:typeTitle };
  
  agoraStatesDiscussions.unshift(newDiscussion);
console.log(agoraStatesDiscussions);
  return agoraStatesDiscussions;   //객체에 추가
}

  ////////////////////////////////////////////////////////////////
  
  //

  

const convertToDiscussion = (obj) => {
  const li = document.createElement('li');
  li.className = 'discussion__container';

  //////
  const discussionContainerforNew = document.createElement('div');
  discussionContainerforNew.className = 'discussion__Newcontainer';
  const discussionNew = document.createElement('div');
  discussionNew.className = 'discussion__new';
  const newName = document.querySelector('.new__name');
  newName.textContent = '1';
  const newDate = document.querySelector('.new__date');
  newDate.textContent = '2';
  const newTitle = document.querySelector('.new__title');
  newTitle.textContent = '3';
  
  li.append(discussionContainerforNew);
  discussionContainerforNew.append(newName,newDate,newTitle);
  
  //////

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  
  const discussionContent = document.createElement('div');
  discussionContent.className ='discussion__content';
  
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

  const discusssionTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discusssionTitle.append(titleAnchor);

  const discussionInformation = document.createElement('div');
  discussionInformation.className ='discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discusssionTitle,discussionInformation);

  const checked = document.createElement('p');
  checked.textContent = obj.answer ? "☑" : "";
  discussionAnswered.append(checked);

  
  
  /////


  avatarWrapper.append(avatarImg);
  li.append(avatarWrapper,discussionContent,discussionAnswered);
  return li;
}



  

// const updated = (obj) => {
  
//   const formContainer = document.createElement('section');
//   formContainer.className = 'form__container';  
//   const formInputForm = document.createElement('form')
//   formInputForm.className = 'form';
//   const formInputWrapper = document.createElement('div');
//   formInputWrapper.className = 'form__input--wrapper';
//   const formInputName = document.createElement('div');
//   formInputName.className = 'form__input--name';



//   formInputName.append(typeName);
//   formInputTitle.appen(typeTitle);
//   formInput
//   formInputWrapper.append(formInputName);
//   formInputForm.append(formInputWrapper);
//   formContainer.append(formInputForm);

//   formInputForm.append(submit);

  

//  return formContainer;

// }







const render = (element) => {
  for (i=0; i<agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]))
  }
  return;

}



const ul=document.querySelector('ul.discussions__container');
render (ul);
