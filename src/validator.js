// 여기에는 유용한 유효성 검증 함수가 있습니다

// [유효성 검증 함수]: 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}

// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

// 주석을 제거하고, 유효성 검증 함수를 테스트 해보세요

// console.log('`codestates`는 영어만 포함하므로', onlyNumberAndEnglish('codestates'))
// console.log('`김coding`은 영어 외의 다른 글자도 포함하므로', onlyNumberAndEnglish('김coding'))
// console.log('`김코딩`은 영어 외의 다른 글자도 포함하므로', onlyNumberAndEnglish('김코딩'))
// console.log('`qwerty`는 충분히 강력하지 않은 암호이므로', strongPassword('qwerty'))
// console.log('`q1w2e3r4`는 특수문자를 포함하지 않으므로', strongPassword('q1w2e3r4'))
// console.log('`q1w2e3r4!`는 조건을 충족하므로', strongPassword('q1w2e3r4!'))
