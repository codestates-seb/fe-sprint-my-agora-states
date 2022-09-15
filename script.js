// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";

    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";

    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";

    // profile image
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('discussion__avatar--image');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    // title
    const discussionTitle = document.createElement('h2');
    discussionTitle.classList.add('discussion__title');
    discussionContent.append(discussionTitle);
    
    // title -> url
    const discussionURL = document.createElement('a');
    discussionURL.href = obj.url;
    discussionURL.textContent = obj.title;
    discussionTitle.append(discussionURL);

    // information
    const discussionInfo = document.createElement('div');
    discussionInfo.classList.add('discussion__information');
    discussionContent.append(discussionInfo);


    // author 
    const discussionInfoAuthor = document.createElement('span');
    discussionInfoAuthor.classList.add('discussion__information--author');
    discussionInfoAuthor.textContent = obj.author;
    discussionInfo.append(discussionInfoAuthor);


   // author 
    const discussionInfoDate = document.createElement('span');
    discussionInfoDate.classList.add('discussion__information--date');
    var createdDateTime = new Date(obj.createdAt).toLocaleString('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
    discussionInfoDate.textContent = createdDateTime;
    discussionInfo.append(discussionInfoDate);


    const discussionAnsweredSign = document.createElement('i');

    if (!obj.answer) {
        discussionAnsweredSign.classList.add('fa-regular', 'fa-circle-check');
    } else {
        discussionAnsweredSign.classList.add('fa-solid', 'fa-circle-check');
    }

    // discussionAnsweredSign.classList.add = obj.answer ? '☑' : '☐';
    discussionAnswered.append(discussionAnsweredSign);

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
        const hr = document.createElement('div');
        hr.classList.add('hr');
        element.append(hr);
        
    }
    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);