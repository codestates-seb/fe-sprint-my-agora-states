const getLocaleDate = (date) => {
  return new Date(Date.parse(date)).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
  });
};

export { getLocaleDate };
