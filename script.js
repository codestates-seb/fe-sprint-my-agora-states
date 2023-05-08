// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// agoraStatesDiscussions is data.js
// console.log(agoraStatesDiscussions);

// 새로운 createElement 생성하고 , 클래스 이름 추가 함수 //
// const createEl = (el) => (newEl = document.createElement(el));
const createEl = (el, addCLass) => {
	let newEl = document.createElement(el);
	newEl.className = addCLass;
	return newEl;
};
// append 재사용 함수
const appendEl = (to, from) => to.append(from);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
	const li = createEl('li', 'discussion__container'); // li 요소 생성

	//avatar
	const avatarWrapper = createEl('div', 'discussion__avatar--wrapper');
	const avatarImg = createEl('img', 'discussion__avatar--image');
	avatarImg.src = obj.avatarUrl;
	avatarImg.alt = `avatar of` + obj.author;
	appendEl(avatarWrapper, avatarImg);

	//content
	const discussionContent = createEl('div', 'discussion__content');
	//content - title
	const discussionTitle = createEl('h2', 'discussion__title');
	//content - link
	const discussionLink = createEl('a');
	discussionLink.href = obj.url;
	discussionLink.textContent = obj.title;
	appendEl(discussionTitle, discussionLink);
	appendEl(discussionContent, discussionTitle);

	//content - user info
	const discussionInfo = createEl('div', 'discussion__information');
	discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
	appendEl(discussionContent, discussionInfo);

	//submission
	const discussionAnswered = createEl('div', 'discussion__answered');

	const discussionAnsweredBox = createEl('p');
	discussionAnsweredBox.textContent = '☑';
	appendEl(discussionAnswered, discussionAnsweredBox);

	// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

	li.append(avatarWrapper, discussionContent, discussionAnswered);
	return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
	for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
		element.append(convertToDiscussion(agoraStatesDiscussions[i]));
	}
	return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// !----------여기서부터 form 생성 event--------

//form submit 변수
const submitBtn = document.querySelector('#submit');
const inputedName = document.querySelector('#name');
const inputedTitle = document.querySelector('#title');
const inputedQuestion = document.querySelector('#story');
const remove = document.querySelector('#check');
const form = document.querySelector('form');

// // <ul>
// const discussionUl = document.querySelector('.discussions__container');

// <li>
const newDiscussion = createEl('li', 'discussion__container');

//form submit 기능
form.addEventListener('submit', (e) => {
	e.preventDefault();

	//value variables
	const nameValue = inputedName.value;
	const titleValue = inputedTitle.value;
	const questionValue = inputedQuestion.value;

	// avatar
	const avatarWrapper = createEl('div', 'discussion__avatar--wrapper');
	let mantrandom = Math.trunc(Math.random() * 5) + 1;
	const avatarImage = createEl('img', 'discussion__avatar--image');
	avatarImage.src = `./avatar/avatar${mantrandom}.jpg`;

	// title & question
	const discussionContent = createEl('div', 'discussion__content');
	const contentTitle = createEl('h2', 'discussion__title');
	const contentLink = createEl('a');

	contentLink.href =
		'https://github.com/codestates-seb/agora-states-fe/discussions/6';
	contentLink.textContent = `${titleValue}`;

	// user info discussion information
	const discussionInfo = createEl('div', 'discussion__information');

	// 2022-04-22T14:08:33Z 포멧 변수
	let newDate = new Date().toISOString();
	discussionInfo.textContent = ` ${nameValue} / ${newDate}`;

	// Agoda Discussion 닫기 버튼
	const answeredBtn = createEl('div', 'discussion__answered');

	const checkedBtn = createEl('p');
	checkedBtn.textContent = '☑';
	answeredBtn.append(checkedBtn);

	// li appends div
	appendEl(newDiscussion, avatarWrapper);
	appendEl(newDiscussion, discussionContent);

	appendEl(newDiscussion, answeredBtn);
	// div appends img
	appendEl(avatarWrapper, avatarImage);

	//discussion__content appends h2 &v h2 appends <a>
	appendEl(discussionContent, contentTitle);
	appendEl(discussionContent, discussionInfo);

	appendEl(contentTitle, contentLink);

	//data.js
	let exisitingArr = agoraStatesDiscussions;

	// id : 마지막 2개 숫자 random 생성
	let generateLastDigit = Math.floor(Math.random() * 99) + 1;

	// 새로운 agoraStatesDiscussions obj 생성하고 추가하기
	let discussionSubmitted = {
		id: `D_kwDOHOApLM4APfj${generateLastDigit}`,
		createdAt: newDate,
		title: titleValue,
		url: 'https://github.com/codestates-seb/agora-states-fe/discussions/42',
		author: nameValue,
		answer: null,
		bodyHTML: questionValue,
		avatarUrl: avatarImage.src,
	};

	exisitingArr.unshift(discussionSubmitted);

	// 화면 다 지우고
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}

	render(ul);

	form.reset();
});
