let userName = document.querySelector('#username')
let userNameSuccess = document.querySelector('.success-message')
let userNameFailure = document.querySelector('.failure-message') 
let userInput = document.querySelector('input')

let userPassword = document.querySelector('#password')
let userPasswordChk = document.querySelector('#password-retype') 
let passwordMiss = document.querySelector('.mismatch-message')

let cancelBtn = document.querySelector('.cancelBtn')

cancelBtn.onclick = function(){
  userInput.style.outline = 'none';
  userNameSuccess.classList.add('hide');
  cancelBtn.classList.add('hide');
  return userInput.value = '';
}

function isMoreThan4Length(value) {
  if(value.length>=4){
    return true;
  } else{
    return false;
  }
}

userInput.onkeyup = function(){
  if(isMoreThan4Length(userInput.value)){
    userNameSuccess.classList.remove('hide');
    userNameFailure.classList.add('hide');
    userInput.style.outline = '1px solid blue';
  }
  if(isMoreThan4Length(userInput.value) === false){
    userNameSuccess.classList.add('hide');
    userNameFailure.classList.remove('hide');
    userInput.style.outline = '1px solid red';
  }
  if(userInput.value.length > 0){
    cancelBtn.classList.remove('hide');
  }
  if(userInput.value.length === 0){
    userInput.style.outline = 'none';
    userNameFailure.classList.add('hide');
    cancelBtn.classList.add('hide');
  }
}

function isMatch (password1, password2) {
  if(password1 === password2){
    return true;
  } else {
    return false;
  }
}

userPasswordChk.onkeyup = function(){
  if(isMatch (userPassword.value, userPasswordChk.value)){
    passwordMiss.classList.add('hide');
  } else{
    passwordMiss.classList.remove('hide');
  }
}


