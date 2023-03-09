const dataConverter = {
  date: (date) => {
    let createDate = new Date(date);
    let month = createDate.getMonth();
    let day = createDate.getDate();
    return `${month}월 ${day}일`;
  },
};
