function getCurrentDateTime() {
  const [year, month, day] = new Date()
    .toLocaleDateString()
    .slice(0, -2)
    .split(". ");
  const time = new Date().toLocaleTimeString();

  return `${year}년 ${month}월 ${day}일 ${time}`;
}

export default getCurrentDateTime;
