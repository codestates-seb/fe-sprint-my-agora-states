// 동영상 강의에 나온 코드를 그대로 실습하세요
// TODO : DOM으로부터 필요한 엘리먼트를 불러오세요.

// 목표
// [비밀번호 확인] 입력창에서 값을 입력(keyup)하면
// [비밀번호] 값과 [비밀번호 확인] 값이 일치하는지 확인하고,
// 일치하지 않은 경우, 불일치 메시지를 화면에 표시합니다.
// console.log("잘 불러왔니?")

let elInputUsername = document.querySelector('#username');

let elFailureMessage = document.querySelector('.failure-message')
let elSuccessMessage = document.querySelector('.success-message')

elInputUsername.onkeyup = function () {
  // console.log(elInputUsername.value)
  if (isMoreThan4Length(elInputUsername.value) && onlyNumberAndEnglish(elInputUsername.value) === true) {
    // 성공 메세지가 보여야 함
    elSuccessMessage.classList.remove('hide')

    // 실패 메세지가 가려져야 함
    elFailureMessage.classList.add('hide')
    
  } else {
    // 성공 메세지가 가려져야 함
    elSuccessMessage.classList.add('hide')

    // 실패 메세지가 보여야 함
    elFailureMessage.classList.remove('hide')
  }
}

function isMoreThan4Length(value) {
  // TODO : 동영상 강의를 보고 이 함수를 완성하세요.
  // 아이디 입력창 (ellnputUsername)에 글자를 키보드로 입력할 때
  // "글자 수가 4개 이상" 이면
  // "사용할 수 있는 아이디입니다" 메세지 출력
  // event = ~ 할 때 / eventhadler
  return value.length >= 4
}

// [유효성 검증 함수]: 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}

let elInputPassword = document.querySelector('#password')
let elInputPasswordRetype = document.querySelector('#password-retype')

let elSuccessPwMessage = document.querySelector('.success-pw-message')
let elMismatchMessage = document.querySelector('.mismatch-message')

let elFailurValidateMessage = document.querySelector('.validate-mismatch-massage')

// 비밀번호 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함 확인
elInputPassword.onkeyup = function () {
  console.log(String(elInputPassword.value));
  if (strongPassword(String(elInputPassword.value)) === false) {
    elFailurValidateMessage.classList.remove('hide')

  } else {
    elFailurValidateMessage.classList.add('hide')
  }
}

// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

// 비밀번호 같은지 유무
elInputPasswordRetype.onkeyup = function () {
  // console.log(elInputPassword.value)
  if (isMatch(elInputPassword.value, elInputPasswordRetype.value) === true) {
    elMismatchMessage.classList.add('hide')
  } else {
    elMismatchMessage.classList.remove('hide')
  }
}

function isMatch(password1, password2) {
  // TODO : 동영상 강의를 보고 이 함수를 완성하세요.
  if (password1 != password2) {
    return false
  } else {
    return true
  }
}