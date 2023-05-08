// 전역변수
const form = document.querySelector(".form");
const inputName = form.querySelector("#name");
const inputTitle = form.querySelector("#title");
const inputStory = form.querySelector("#story");
const submitBtn = form.querySelector(".form__submit > input");

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// 이 함수 실행하면 li에 avatarWrapper, discussionContent, discussionAnswered 가 추가됨
const convertToDiscussion = function (obj) {
	const li = document.createElement("li"); // li 요소 생성
	li.className = "discussion__container"; // 클래스 이름 지정

	const avatarWrapper = document.createElement("div");
	avatarWrapper.className = "discussion__avatar--wrapper";

	const discussionContent = document.createElement("div");
	discussionContent.className = "discussion__content";

	const discussionAnswered = document.createElement("div");
	discussionAnswered.className = "discussion__answered";
	discussionAnswered.textContent = "✎";

	// data.js에서 받은 유저 정보 추가
	const userImage = document.createElement("img");
	userImage.classList.add("discussion__avatar--image");
	avatarWrapper.append(userImage);
	userImage.src =
		obj.avatarUrl ||
		"https://cdn-icons-png.flaticon.com/512/465/465264.png?w=1380&t=st=1683477317~exp=1683477917~hmac=286ac50ec08c6f86ba55f292470a1466e30e1461d32c6c7b76c8cb7408468f18";
	userImage.alt = `avatar of ${inputName}`;

	// discussion__content에 제목과 깃허브 url 추가
	const discussionContentH2 = document.createElement("h2");
	discussionContentH2.classList.add("discussion__title");
	discussionContent.append(discussionContentH2);

	const discussionTitle = document.createElement("a");
	discussionContentH2.append(discussionTitle);
	discussionTitle.href = obj.url;
	discussionTitle.textContent = obj.title;

	// 질문작성자와 작성 시간
	const discussionInfo = document.createElement("div");
	discussionContent.append(discussionInfo);
	discussionInfo.classList.add("discussion__information");
	discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;

	li.append(avatarWrapper, discussionContent, discussionAnswered);
	return li;
};

// 입력칸 다 채우면 submit 버튼이 보이게
const isAllFilled = function () {
	if (
		inputName.value !== "" &&
		inputTitle.value !== "" &&
		inputStory.value !== ""
	) {
		submitBtn.classList.remove("invisible");
	} else {
		submitBtn.classList.add("invisible");
	}
};
inputStory.addEventListener("keyup", isAllFilled);
inputName.addEventListener("keyup", isAllFilled);
inputTitle.addEventListener("keyup", isAllFilled);

// submit 후 입력칸 비우기, submitBtn 클래스에 invisible 추가
const inputSumbitReset = function () {
	inputName.value = "";
	inputStory.value = "";
	inputTitle.value = "";
	submitBtn.classList.add("invisible");
};

// 입력된 정보로 디스커션 생성
const discussionCreater = function () {
	const now = new Date().toISOString(); // 생성 시간
	// 입력정보를 객체에 추가
	const newDiscussion = {
		author: inputName.value,
		title: inputTitle.value,
		story: inputStory.value,
		createdAt: now,
	};
	// data.js배열에 newDiscussion 추가
	agoraStatesDiscussions.unshift(newDiscussion);
	const discussionUl = document.querySelector(".discussions__container");
	// 생성한 객체를 DOM으로 변환
	const newDiscussionElement = convertToDiscussion(newDiscussion);
	//  HTML ul에 입력한 객체 추가
	discussionUl.prepend(newDiscussionElement);

	// 로컬스토리지에 값 추가
	const objToStr = JSON.stringify(newDiscussion);
	localStorage.setItem(newDiscussion.author, objToStr);
};

// submitBtn 이벤트 리스너
submitBtn.addEventListener("click", (event) => {
	event.preventDefault(); // 새로고침 방지
	discussionCreater();
	inputSumbitReset();
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = function (element) {
	for (let i = 0; i < agoraStatesDiscussions.length; i++) {
		// element = documnet -> ul
		element.append(convertToDiscussion(agoraStatesDiscussions[i]));
	}
	return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

/* 
const obj = { name: "John", age: 30 };
const objStr = JSON.stringify(obj); // 객체를 문자열로 변환
localStorage.setItem("myObj", objStr); // 로컬스토리지에 문자열로 변환된 객체 저장
const storedObjStr = localStorage.getItem("myObj"); // 로컬스토리지에서 문자열로 저장된 객체 가져오기
const storedObj = JSON.parse(storedObjStr); // 문자열을 다시 객체로 변환
console.log(storedObj); // { name: "John", age: 30 }

*/
//  NOTE : 로컬스토리지의 값은 문자열만 가능.
// 로컬스토리지에 사용자정보 저장
for (const item of agoraStatesDiscussions) {
	const convertItemStr = JSON.stringify(item); // 객체를 문자열로 변환
	localStorage.setItem(item.author, convertItemStr); // 키: 객체의 작성자 , 값: 객체

	// const convertStrObj = JSON.parse(convertItemStr);
	// console.log(convertStrObj);
}
