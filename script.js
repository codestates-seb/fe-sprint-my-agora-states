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
	discussionAnswered.textContent = "답변!";

	// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

	// data.js에서 받은 유저 정보 추가
	const userImage = document.createElement("img");
	userImage.classList.add("discussion__avatar--image");
	avatarWrapper.append(userImage);
	userImage.src = obj.avatarUrl;

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

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = function (element) {
	for (let i = 0; i < agoraStatesDiscussions.length; i++) {
		element.append(convertToDiscussion(agoraStatesDiscussions[i]));
	}
	return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
