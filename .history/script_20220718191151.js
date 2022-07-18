// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
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

	const timeCreated = new Date(obj.createdAt);
	const timeCreatedString = timeCreated.toLocaleString('ko-KR', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone: 'Asia/Seoul',
	});

	discussionInfo.textContent = `${obj.author} · ${timeCreatedString}`;
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
