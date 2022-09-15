function dataLoader(storage) {
  const stringArr = Object.values(storage); // 값만을 가진 배열을 할당
  const objArr = stringArr.map((v, i) => JSON.parse(v)); // 배열의 스트링 값을 모두 객체값으로 변환
  return objArr.reverse(); // LIFO를 위해 배열을 뒤집어줌
}

export default dataLoader;