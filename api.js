let data = [];
function getData() {
	// TODO: 아래 구현을 REST API 호출로 대체하세요.

	//이러면 처음에 모든 값을 받아온다.
	let url = `http://localhost:4000/discussions`;

	//아니 동시에 리턴해버리면서 then메서드로 연결하면 굳이 비동기 쓸 필요 없다
	return fetch(url).then((resp) => resp.json());
}
getData().then((result) => {
	data = result;
	return result;
});
