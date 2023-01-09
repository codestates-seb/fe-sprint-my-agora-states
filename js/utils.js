// @ts-check

/**
 * 2023/01/06 - 시간 변환 - by 1-blue
 * @param { Date } date
 * @returns { string } "년-월-일 시:분:초"형태로 반환
 */
export const convertToTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 + "";
  const day = date.getDay() + "";
  const hour = date.getHours() + "";
  const minute = date.getMinutes() + "";
  const second = date.getSeconds() + "";

  /**
   * 2023/01/07 - 한 자리 문자 두 자리로 변경 ( 3 -> 03, 9 -> 09 ) - by 1-blue
   * @param { string } v 한 자리 문자
   * @returns 변환된 문자
   */
  const twoDigitconverter = (v) => (v.length === 1 ? 0 + v : v);

  return `${year}-${twoDigitconverter(month)}-${twoDigitconverter(
    day
  )} ${twoDigitconverter(hour)}:${twoDigitconverter(
    minute
  )}:${twoDigitconverter(second)}`;
};

/**
 * 2023/01/06 - textarea 리사이징 - by 1-blue
 * @param { KeyboardEvent } e 키보드 이벤트
 */
export const resizeTextarea = (e) => {
  if (!(e.target instanceof HTMLTextAreaElement)) return;

  e.target.style.flexBasis = "auto";
  e.target.style.flexBasis = 12 + e.target.scrollHeight + "px";
};

/**
 * 2023/01/06 - input/textarea 초기화 - by 1-blue
 * @param { (HTMLInputElement | HTMLTextAreaElement)[] } elements Element 배열
 */
export const resetInputAndTextarea = (elements) => {
  elements.forEach((element) => (element.value = ""));
};

/**
 * 2023/01/07 - 제출 가능한지 여부 판단 ( 입력했는지 ) - by 1-blue
 * @param { (HTMLInputElement | HTMLTextAreaElement)[] } elements Element 배열
 * @param { HTMLButtonElement } $submit 제출 버튼
 */
export const validateSubmit = (elements, $submit) => {
  if (!elements.every((element) => element.value.trim())) {
    $submit.disabled = true;

    return;
  }

  $submit.disabled = false;
};
