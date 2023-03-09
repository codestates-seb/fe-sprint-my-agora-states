const dateConverter = (date) => {
  const createDate = new Date(date);
  const year = createDate.getFullYear();
  const month = createDate.getMonth() + 1;
  const day = createDate.getDate();
  const time = createDate.getHours();
  const minute = createDate.getMinutes();
  const minutes = minute < 10 ? '0' + minute : minute;
  const ampm = time >= 12 ? '오후' : '오전';
  return `${year}년 ${month}월 ${day}일 ${ampm} ${time}:${minutes}`;
};

const appendToStorage = (name, data) => {
  let prevData = localStorage.getItem('newStory');
  if (prevData) {
    const prevArr = JSON.parse(prevData);
    localStorage.setItem(name, JSON.stringify([data, ...prevArr]));
  } else {
    localStorage.setItem(name, JSON.stringify([data]));
  }
};
