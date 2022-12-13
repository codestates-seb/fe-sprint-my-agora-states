const API_END_POINT = "http://localhost:4000/";

export default async function getData(id = "") {
  // HINT: 가장 마지막 테스트를 통과하기 위해, fetch를 이용합니다. 아래 구현은 완전히 삭제되어도 상관없습니다.
  // TODO: 아래 구현을 REST API 호출로 대체하세요.
  try {
    const API = `${API_END_POINT}discussions/${id}`;
    const responce = await fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!responce.ok) {
      throw new Error(`서버에 이상이 있습니다 ${responce.status}`);
    }
    return await responce.json();
  } catch (e) {
    throw new Error(`코드에 이상이 있습니다. ${e}`);
  }
}
