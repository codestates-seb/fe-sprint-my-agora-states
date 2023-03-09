const dataConverter = {
  date: (date) => {
    let createDate = new Date(date);
    let year = createDate.getFullYear();
    let month = createDate.getMonth();
    let day = createDate.getDate();
    return `${year}년 ${month}월 ${day}일`;
  },
};
