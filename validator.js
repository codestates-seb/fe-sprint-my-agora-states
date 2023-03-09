// 여기에는 유용한 유효성 검증 함수가 있습니다

// [유효성 검증 함수]: 영어 또는 숫자만 가능
    // ^ : 문자열의 시작
    // [A-Za-z] : 첫 번째 문자는 알파벳 대문자 또는 소문자 중 하나여야 함
    // [A-Za-z0-9]* : 그 다음에는 알파벳 대소문자나 숫자가 0개 이상 나와야 함
    // $ : 문자열의 끝
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}

// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
    // ^ : 문자열의 시작
    // (?=.*[A-Za-z]) : 최소한 1개의 알파벳 문자가 반드시 포함되어야 함
    // (?=.*\d) : 최소한 1개의 숫자가 반드시 포함되어야 함
    // (?=.[@$!%#?&]) : 최소한 1개의 특수문자(@, $, !, %, *, #, ?, &)가 반드시 포함되어야 함
    // [A-Za-z\d@$!%*#?&]{8,} : 알파벳 대소문자, 숫자, 특수문자 중에서 8개 이상의 문자가 나와야 함
    // $ : 문자열의 끝
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}



// 주석을 제거하고, 유효성 검증 함수를 테스트 해보세요

console.log('`codestates`는 영어만 포함하므로', onlyNumberAndEnglish('codestates'))
console.log('`김coding`은 영어 외의 다른 글자도 포함하므로', onlyNumberAndEnglish('김coding'))
console.log('`김코딩`은 영어 외의 다른 글자도 포함하므로', onlyNumberAndEnglish('김코딩'))
console.log('`qwerty`는 충분히 강력하지 않은 암호이므로', strongPassword('qwerty'))
console.log('`q1w2e3r4`는 특수문자를 포함하지 않으므로', strongPassword('q1w2e3r4'))
console.log('`q1w2e3r4!`는 조건을 충족하므로', strongPassword('q1w2e3r4!'))


console.log('`codestates`는 영어만 포함하므로', onlyNumberAndEnglish('234253'))