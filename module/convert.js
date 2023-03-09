const convertToDate = (createdAt) => {
  let [writeDate, writeTime] = createdAt.split('T');
  let timeFirst = writeTime.split('Z')[0].split(':')[0];

  if (+timeFirst >= 12) {
    writeTime = `오후 ${writeTime.split('Z')[0]}`;
  } else {
    writeTime = `오전 ${writeTime.split('Z')[0]}`;
  }

  return `${writeDate} ${writeTime}`;
};
