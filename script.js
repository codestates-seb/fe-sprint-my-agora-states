// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);
//6-1. 서버 데이터 받아오기
let data;

//0. DOM
const ul = document.querySelector("ul.discussions__container"); //질문 목록 ul
const form = document.querySelector(".form"); //폼
const elName = document.querySelector("#name"); //이름input
const elTitle = document.querySelector("#title"); //제목 input
const elPageBtnWrap = document.querySelector(".pagination"); //페이지네이션 버튼 랩
const elStory = document.querySelector("#story");
const elAllItemNum = document.querySelector("#allItemNum");

//1. convertToDiscussion 함수: 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
	const li = document.createElement("li"); // li 요소 생성
	li.className = "discussion__container"; // 클래스 이름 지정

	const avatarWrapper = document.createElement("div");
	avatarWrapper.className = "discussion__avatar--wrapper";
	const discussionContent = document.createElement("div");
	discussionContent.className = "discussion__content";
	const discussionAnswered = document.createElement("div");
	discussionAnswered.className = "discussion__answered";

	// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
	//1-1. avatarWrapper - 아바타 이미지 영역 div.discussion__avatar--wrapper
	//innerHTML=`<img src="${obj.avatarUrl}" alt="avatar of ${obj.author}">`;
	let elAvatarImg = document.createElement("img");
	if (obj.avatarUrl) {
		elAvatarImg.setAttribute("src", obj.avatarUrl);
	} else {
		elAvatarImg.setAttribute("src", "img/user_basic.png");
	}
	elAvatarImg.setAttribute("alt", `avatar of ${obj.author}`);
	avatarWrapper.append(elAvatarImg);

	//1-2. discussionContent - 내용 영역 div.discussion__content
	//innerHTML=`<h2 class="discussion__title"><a href="${obj.url}">${obj.title}</a></h2>`;
	let elTitle = document.createElement("h3");
	let elTitleLink = document.createElement("a");
	elTitle.className = "discussion__title";
	if (obj.url) {
		elTitleLink.setAttribute("href", obj.url);
	} else {
		elTitleLink.setAttribute("href", "");
	}
	elTitleLink.textContent = obj.title;
	elTitle.appendChild(elTitleLink);
	discussionContent.append(elTitle);
	//`<div class="discussion__information">${obj.author} / ${obj.createdAt}</div>`;
	let elInfo = document.createElement("div");
	elInfo.className = "discussion__information";
	elInfo.textContent = `${obj.author} / ${new Date(
		obj.createdAt
	).toLocaleString()}`;
	discussionContent.append(elInfo);

	//1-3. 질문여부 삽입
	let elAnswerChk = document.createElement("i");
	if (obj.answer) {
		elAnswerChk.className = "material-icons checked";
		elAnswerChk.textContent = "check_box";
	} else {
		elAnswerChk.className = "material-icons disChecked";
		elAnswerChk.textContent = "check_box_outline_blank";
	}
	discussionAnswered.append(elAnswerChk);

	li.append(avatarWrapper, discussionContent, discussionAnswered);
	return li;
};

//2. agoraStatesDiscussions 함수: 배열의 모든 데이터를 화면에 렌더링합니다.
const render = (element, start, end) => {
	for (let i = start; i < end; i += 1) {
		element.append(convertToDiscussion(data[i]));
	}
	return;
};

//3. makeNewDiscussion 함수: 입력한 new Discussion을 질문 목록, agoraStatesDiscussions에 추가합니다.
const makeNewDiscussion = () => {
	const obj = {
		id: "unique number", //나중에 자동으로 숫자로 생성되도록 고유번호를 생성하게 배울 예정
		createdAt: new Date(),
		title: elTitle.value,
		url: null,
		author: elName.value,
		answer: null,
		bodyHTML:
			'<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir="auto">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir="auto">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir="auto">rm package-lock.json</p>\n<p dir="auto">rm -rf ./node_modules/</p>\n<p dir="auto">npm --verbose install</p>\n<p dir="auto">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory"><pre><span class="pl-s1">minjun</span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">pwd</span> \n<span class="pl-c1">/</span><span class="pl-v">Users</span><span class="pl-c1">/</span><span class="pl-s1">minjun</span><span class="pl-c1">/</span><span class="pl-v">Documents</span><span class="pl-c1">/</span><span class="pl-s1">fe_frontand_39</span><span class="pl-c1">/</span><span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span>\n<span class="pl-s1">minjun</span><span class="pl-kos"></span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">npm</span> <span class="pl-s1">install</span> \nenv: node: <span class="pl-v">No</span> <span class="pl-s1">such</span> <span class="pl-s1">file</span> <span class="pl-s1">or</span> <span class="pl-s1">directory</span></pre></div>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a href="https://mia-dahae.tistory.com/89" rel="nofollow">https://mia-dahae.tistory.com/89</a></p>\n<p dir="auto"><a href="https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory" rel="nofollow">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir="auto"><a href="https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0" rel="nofollow">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir="auto"><a href="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346" rel="nofollow">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir="auto"><a href="https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80" rel="nofollow">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
		avatarUrl: "",
	};
	data.unshift(obj);
	//6. 로컬 스토리지 저장 - advanced
	return obj;
};

//4. submit 이벤트: 새로운 질문 제출시 목록에 추가합니다.
form.addEventListener("submit", (event) => {
	event.preventDefault();
	let newLi = convertToDiscussion(makeNewDiscussion());
	elAllItemNum.textContent = `(all : ${data.length})`;
	//질문 초기화
	elTitle.value = "";
	elName.value = "";
	elStory.value = "";
	//페이지1일 경우에만 최상단에 표시
	if (elpageBtn[0].className === "active") ul.prepend(newLi);
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
//render(ul, 0, agoraStatesDiscussions.length);

//----------------------
//5,6. advanced

//5. pagination 함수: 한 페이지에 maximumList만큼 질문 목록을 렌더링 합니다.
const pagination = (maximumList) => {
	//한 페이지 최대 갯수
	let allListsNum = data.length; //전체 리스트 길이
	let lastPage = Math.ceil(allListsNum / maximumList); //최대 페이지
	elPageBtnWrap.innerHTML = "";
	for (let i = 1; i <= lastPage; i++) {
		let pageButton = document.createElement("button");
		pageButton.textContent = i;
		elPageBtnWrap.append(pageButton);
	}
	return function (nowPage) {
		//데이터 갯수 갱신
		allListsNum = data.length; //전체 리스트 길이
		lastPage = Math.ceil(allListsNum / maximumList); //최대 페이지
		if (!nowPage) nowPage = 1; //현재 페이지
		//ul초기화
		ul.innerHTML = "";
		//maximumList개씩 렌더링하기
		//만약 페이지수가 마지막 페이지보다 같거나 클 경우: (nowPage-1)*maximumList, allListsNum
		if (nowPage >= lastPage) {
			render(ul, (nowPage - 1) * maximumList, allListsNum);
		} else {
			render(ul, (nowPage - 1) * maximumList, nowPage * maximumList);
		}
	};
};

//기타. to top 버튼
const topBtn = document.querySelector(".top_button");
window.addEventListener("scroll", (event) => {
	event.preventDefault();
	if (window.scrollY >= 200) {
		topBtn.classList.add("show");
	} else {
		topBtn.classList.remove("show");
	}
});
topBtn.addEventListener("click", (event) => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});

let url = `http://localhost:4000/discussions`;
fetch(url)
	.then((resp) => resp.json())
	.then((result) => {
		data = result;
		//data가 필요한 설정은 모두 여기에 작성했다.
		//첫 화면 렌더링 설정
		render(ul, 0, data.length);
		//elAllItemNum.textContent = `(all : ${data.length})`; //데이터 갯수 표현

		//페이지네이션 초기 렌더링 설정
		let render10Page = pagination(10); //한 페이지 최대 리스트 설정
		const elpageBtn = document.querySelectorAll(".pagination > button"); //페이지네이션 버튼 렌더링
		//버튼 클릭 이벤트 등록
		for (let i of elpageBtn) {
			i.addEventListener("click", (event) => {
				elpageBtn.forEach((n) => n.classList.remove("active"));
				i.classList.add("active");
				render10Page(i.textContent);
			});
		}
		//페이지네이션 초기설정 - 1페이지
		render10Page(1);
		elpageBtn[0].classList.add("active");
	});
