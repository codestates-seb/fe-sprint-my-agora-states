// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// agoraStatesDiscussions is data.js
console.log(agoraStatesDiscussions);

// //variable

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
	const li = document.createElement('li'); // li 요소 생성
	li.className = 'discussion__container'; // 클래스 이름 지정

	//avatar
	const avatarWrapper = document.createElement('div');
	avatarWrapper.className = 'discussion__avatar--wrapper';

	const avatarImg = document.createElement('img');
	avatarImg.className = 'discussion__avatar--image';
	avatarImg.src = obj.avatarUrl;
	avatarImg.alt = `avatar of` + obj.author;
	avatarWrapper.append(avatarImg);

	//content
	const discussionContent = document.createElement('div');
	discussionContent.className = 'discussion__content';

	//content - title
	const discussionTitle = document.createElement('h2');
	discussionTitle.className = 'discussion__title';
	const discussionLink = document.createElement('a');
	discussionLink.href = obj.url;
	discussionLink.textContent = obj.title;
	discussionTitle.appendChild(discussionLink);
	discussionContent.append(discussionTitle);

	//content - user info
	const discussionInfo = document.createElement('div');
	discussionInfo.className = 'discussion__information';
	discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
	discussionContent.append(discussionInfo);

	//submission
	const discussionAnswered = document.createElement('div');
	discussionAnswered.className = 'discussion__answered';

	const discussionAnsweredBox = document.createElement('p');
	discussionAnsweredBox.textContent = '☑';
	discussionAnswered.append(discussionAnsweredBox);

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

const submitBtn = document.querySelector('#submit');
const inputedName = document.querySelector('#name');
const inputedTitle = document.querySelector('#title');
const inputedQuestion = document.querySelector('#story');
const form = document.querySelector('form');
const errMsg = document.querySelector('.error__msg');

//form submit 기능
form.addEventListener('submit', (e) => {
	e.preventDefault();

	//value variables
	const nameValue = inputedName.value;
	const titleValue = inputedTitle.value;
	const questionValue = inputedQuestion.value;

	// <ul>
	const discussionContainer = document.querySelector('.discussions__container');

	// <li>
	const newDiscussion = document.createElement('li');
	newDiscussion.className = 'discussion__container';

	//! avatar
	const avatarWrapper = document.createElement('div');
	avatarWrapper.className = 'discussion__avatar--wrapper';
	const avatarImage = document.createElement('img');
	avatarImage.className = 'discussion__avatar--image';
	avatarImage.src =
		'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4';

	//! title & question
	const discussionContent = document.createElement('div');
	discussionContent.className = 'discussion__content';
	const contentTitle = document.createElement('h2');
	contentTitle.className = 'discussion__title';
	const contentLink = document.createElement('a');
	contentLink.setAttribute(
		'href',
		'https://github.com/codestates-seb/agora-states-fe/discussions/6'
	);
	contentLink.textContent = `${titleValue}`;

	//! user info discussion information
	const discussionInfo = document.createElement('div');
	discussionInfo.className = 'discussion__information';
	let newDate = new Date().toISOString();
	discussionInfo.textContent = ` ${nameValue} / ${newDate}`;

	//! checkedButton generate
	const answeredBtn = document.createElement('div');
	answeredBtn.className = 'discussion__answered';
	const checkedBtn = document.createElement('p');
	checkedBtn.textContent = '☑';
	answeredBtn.append(checkedBtn);

	// ul appends li
	discussionContainer.insertBefore(
		newDiscussion,
		discussionContainer.firstChild
	);

	// li appends div
	newDiscussion.append(avatarWrapper);
	newDiscussion.append(discussionContent);

	newDiscussion.append(answeredBtn);
	// div appends img
	avatarWrapper.append(avatarImage);

	//discussion__content appends h2 // h2 appends <a> // user infp
	discussionContent.append(contentTitle);
	discussionContent.append(discussionInfo);
	contentTitle.append(contentLink);

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
	};

	exisitingArr.unshift(discussionSubmitted);
	console.log(agoraStatesDiscussions);

	form.reset();
});
