const dateConverter = (date) => {
  let createDate = new Date(date);
  let year = createDate.getFullYear();
  let month = createDate.getMonth();
  let day = createDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
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
