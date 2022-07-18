const ul = document.querySelector('ul.discussions__container');
const submitBtn = document.querySelector('.submit-btn');

// check whether discussions are saved in local storage
if (localStorage.getItem('Discussions')) {
	agoraStatesDiscussions = JSON.parse(localStorage.getItem('Discussions'));
}

// local storage
function saveDiscussions() {
	localStorage.setItem('Discussions', JSON.stringify(agoraStatesDiscussions));
}

const convertToDiscussion = (obj) => {
	const li = document.createElement('li'); // li 요소 생성
	li.className = 'discussion__container'; // 클래스 이름 지정

	const avatarWrapper = document.createElement('div');
	avatarWrapper.className = 'discussion__avatar--wrapper';
	const avatar = document.createElement('img');
	avatar.className = 'discussion__avatar';
	avatar.src = obj.avatarUrl;
	avatar.style.width = '48px';
	avatar.style.height = '48px';
	avatar.style.borderRadius = '50%';
	avatar.style.marginRight = '10px';
	avatarWrapper.appendChild(avatar);

	const discussionContent = document.createElement('div');
	discussionContent.className = 'discussion__content';
	const discussionTitle = document.createElement('h2');
	discussionTitle.className = 'discussion__title';
	discussionContent.appendChild(discussionTitle);
	const anchorForTitle = document.createElement('a');
	anchorForTitle.href = obj.url;
	anchorForTitle.innerText = obj.title;
	discussionTitle.appendChild(anchorForTitle);

	const discussionInfo = document.createElement('div');
	discussionInfo.className = 'discussion__information';

	discussionInfo.textContent = `${obj.author} · ${getTimeString(obj)}`;
	discussionContent.appendChild(discussionInfo);
	const discussionAnswered = document.createElement('div');
	discussionAnswered.className = 'discussion__answered';
	if (obj.answer) {
		discussionAnswered.textContent = 'Answered';
	} else {
		discussionAnswered.textContent = 'Unanswered';
	}

	// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

	li.append(avatarWrapper, discussionContent, discussionAnswered);
	return li;
};

// Pagination
const paginationCtn = document.querySelector('.pagination-btn-container');
let page = 0;
for (let i = 0; i < agoraStatesDiscussions.length; i += 10) {
	const paginationBtn = document.createElement('button');
	paginationBtn.className = 'pagination-btn';
	paginationBtn.textContent = page + 1;
	page++;
	paginationCtn.appendChild(paginationBtn);
}

const paginBtns = document.querySelectorAll('.pagination-btn');
paginBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const page = e.target.textContent;
		const ul = document.querySelector('ul.discussions__container');
		ul.innerHTML = '';
		for (let i = (page - 1) * 10; i < page * 10; i++) {
			ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
		}
	});
});

// Initial Render
function initialRender() {
	ul.innerHTML = ``;
	for (let i = 0; i < 10; i++) {
		ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
	}
	console.log(agoraStatesDiscussions);
	saveDiscussions();
}

initialRender();

function getTimeString(obj) {
	if (!obj.createdAt.includes('-')) return obj.createdAt;

	const timeCreated = new Date(obj.createdAt);
	const timeCreatedString = timeCreated.toLocaleString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone: 'Asia/Seoul',
	});

	return timeCreatedString;
}

function newDiscussion(e) {
	e.preventDefault();
	const name = document.querySelector('.name-input').value;
	const title = document.querySelector('.title-input').value;
	const question = document.querySelector('.question-input').value;

	// append new discussion to agoraStatesDiscussions array
	const newDiscussion = {
		id: String(new Date().getTime()),
		createdAt: getTime(),
		title: title,
		url: `https://www.agora.io/discussions`,
		author: name,
		answer: false,
		avatarUrl: 'https://i.stack.imgur.com/frlIf.png',
	};

	agoraStatesDiscussions.unshift(newDiscussion);
	initialRender();
}

submitBtn.addEventListener('click', newDiscussion);

function getTime() {
	// return time to locale string
	const time = new Date();
	const timeString = time.toLocaleString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone: 'Asia/Seoul',
	});
	return timeString;
}
