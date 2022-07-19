export const inputValidator = (...inputs) => {
  let alertMessage = [];
  let isValid = true;

  inputs.map((input) => {
    if (input.value === '') {
      alertMessage.push(`${input.name} 항목이 입력되지 않았습니다. `);
      isValid = false;
    }
  });
  if (alertMessage.length !== 0) {
    alert(`${alertMessage.join('\n')}`);
  }

  return isValid;
};
