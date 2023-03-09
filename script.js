// 함수 정의
function isMoreThan4Length(value) {
  return value.length >= 4;
}

function isMatch(password1, password2) {
  if (password1 !== password2) {
    return false;
  }
  return true;
}


// 아이디 설정
let elInputUsername = document.querySelector("#username"); // 아이디 input 태그
let elFailureMessage = document.querySelector('.failure-message'); // 실패 메세지
let elSuccessureMessage = document.querySelector('.success-message'); // 성공 메세지
let strongUsername = document.querySelector(".hard-id"); // 영문, 숫자 조합하라는 메세지

  // 아이디 입력 글자수 제한
elInputUsername.onkeyup = function() {
  if (isMoreThan4Length(elInputUsername.value)) { // 아이디가 4글자 이상일 때
    elFailureMessage.classList.add('hide'); // 실패 메세지 제거
    if (onlyNumberAndEnglish(elInputUsername.value)) { // 아이디가 영어로 시작하고 숫자와 조합될 때
      elSuccessureMessage.classList.remove('hide'); // 성공 메세지 추가
      strongUsername.classList.add("hide"); // 조합 메세지 제거
    }
    else {
      strongUsername.classList.remove("hide"); // 조합 메세지 추가
      elSuccessureMessage.classList.add('hide');
    }
  }
  else { // 4글자 이상이 아닐 때
    elSuccessureMessage.classList.add('hide');
    elFailureMessage.classList.remove('hide');
    strongUsername.classList.add("hide");
  }
}


// 패스워드 설정
let inputpassword = document.querySelector('#password');
let inputpassword_re = document.querySelector('#password-retype');
let inputFailPassword = document.querySelector('.mismatch-message');
let strongpassword_message = document.querySelector('.hard-pw');


  // 비밀번호 확인 불일치
inputpassword_re.onkeyup = function() {
  if (isMatch(inputpassword.value, inputpassword_re.value)) {
    inputFailPassword.classList.add('hide');
  }
  else {
    inputFailPassword.classList.remove('hide');
  }
}

  // 강력한 정책의 비밀번호
inputpassword.onkeyup = function() {
  if (!strongPassword(inputpassword.value)) {
    strongpassword_message.classList.remove('hide');
  }
  else {
    strongpassword_message.classList.add('hide');
  }
}


// 클릭 이벤트
let createaccount = document.querySelector(".signup>button");
createaccount.addEventListener('click', function() {
  if (!(isMoreThan4Length(elInputUsername.value)) || !onlyNumberAndEnglish(elInputUsername.value)) {
    alert("Please check your ID again.");
  }
  else if (!isMatch(inputpassword.value, inputpassword_re.value) || !strongPassword(inputpassword.value)) {
    alert("Please check your password again.");
  }
  else {
    alert("Welcome to Agora States!");
    // location.reload(); // 새로고침
    window.location = "./Agora_States/index.html";
  }
})











