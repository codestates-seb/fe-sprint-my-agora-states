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

	// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

	// data.js에서 avatarUrl를 가져오고 avatarWrapper에 추가.
	const userImage = document.createElement("img");
	userImage.classList.add("discussion__avatar--image");
	avatarWrapper.append(userImage);
	userImage.src = obj.avatarUrl;

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
