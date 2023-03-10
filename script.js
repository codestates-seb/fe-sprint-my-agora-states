const addedQuestions = [];

const elMain = document.querySelector("main")
const elSectionQContainer = document.querySelector("#questions-container")

const elModal = document.querySelector("#modal")
const elModalUserimg = document.querySelector("#modal .userimg")
const elModalTitle = document.querySelector("#modal p.title")
const elModalInfo = document.querySelector("#modal p.info")
const elModalLower = document.querySelector("#modal .modal-lower")

const elForm = document.querySelector("form.form")

const elCloseButton = document.querySelector(".close-button-container > button")


elForm.addEventListener("submit", (event) => {
	event.preventDefault();  // onsubmit="return false;"
	const name = document.querySelector('input#name');
	const title = document.querySelector('input#title');
	const question = document.querySelector('textarea#question');

	if (name.value && title.value && question.value) {
		const obj = {
			id: addedQuestions.length,
			createdAt: Date(),
			title: title.value,
			url: "",
			author: name.value,
			answer: null,
			bodyHTML: question.value,
			avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/50px-Solid_black.svg.png",
		}

		const li = convertToDiscussion(obj, false)
		name.value = title.value = question.value = '';

		li.onclick = elQOnclickInner;
		elSectionQContainer.prepend(li);
		addedQuestions.push(obj);
	} else {
		alert('빈 칸을 모두 작성해주세요.');
	}
});

function elQOnclickInner() {
	elModal.style.visibility = 'inherit';

	const clickedQuestion = addedQuestions[parseInt(this.classList.value)];

	elModalUserimg.setAttribute('src', clickedQuestion.avatarUrl)
	elModalTitle.textContent = clickedQuestion.title;
	elModalInfo.textContent = `${clickedQuestion.author} / ${clickedQuestion.createdAt}`
	elModalLower.textContent = clickedQuestion.bodyHTML;
}

elCloseButton.addEventListener("click", () => {
	elModal.style.visibility = 'hidden';
});


// 얕은 바다 ~ 깊은 바다 효과
elSectionQContainer.addEventListener("scroll", () => {
	scrollPercent = elSectionQContainer.scrollTop / elSectionQContainer.scrollHeight;
	elMain.style.backgroundColor = `rgba(0, 0, 0, ${scrollPercent})`;
});

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (qObj, setDelay = true) => {
	const elArticle = document.createElement("article"); // 최상단 (틀)
	const elA = document.createElement("a");
	const elImg = document.createElement("img");
	const elP = document.createElement("p");

	if (setDelay) {
		elA.setAttribute('href', qObj.url);
		const delayFloat = getRandomFloat(0, 20);
		elArticle.style.animationDelay = `${delayFloat}s`;
		// console.log(elArticle.style.animationDelay);
	} else {
		elArticle.classList.add(qObj.id);
	}
	elA.setAttribute('target', "_blank");
	elImg.setAttribute('src', qObj.avatarUrl);  // 질문자 프사 설정
	elImg.setAttribute('alt', 'Avatar of Questioner');
	elP.textContent = qObj.title;

	// const qDiscussionInformation = document.createElement("div");  // 질문자 닉네임/날짜 (틀)
	// qDiscussionInformation.textContent = `${qObj.author} / ${qObj.createdAt}`;  // 질문자 닉네임/날짜

	/*
	// 답변 영역
	const aDiscussionWrapper = document.createElement("div");  // 답변 (틀)
	aDiscussionWrapper.className = "discussion__answered";

	*/
	if (!qObj.answer) {
		elArticle.style.opacity = 1;
	}

	elArticle.append(elA);
	elA.append(elImg, elP);


	return elArticle;
};

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function isCollide(a, b) {
	return !(
		((a.y + a.height) < (b.y)) ||
		(a.y > (b.y + b.height)) ||
		((a.x + a.width) < b.x) ||
		(a.x > (b.x + b.width))
	);
}

window.onload = function () {
	function test() {
		// console.log(i);
	}
	setInterval(test, 1_000);
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
	for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
		const question = convertToDiscussion(agoraStatesDiscussions[i]);
		element.append(question);
	}
	return;
};
render(elSectionQContainer);  // agoraStatesDiscussions 배열의 모든 요소를 화면에 렌더링합니다.
