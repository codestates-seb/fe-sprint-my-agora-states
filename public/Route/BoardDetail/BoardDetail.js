// 카테고리 제목 가져오기
const urlParams = new URL(location.href).searchParams;
let category = urlParams.get('category');
let categoryTitle = document.querySelector('.category-name');
let categoryURL = document.createElement('a');
categoryURL.textContent = category;
categoryURL.href=`/board?category=${category}&page=1`;
categoryTitle.append(categoryURL);

// 질문 제목 가져오기
const id = urlParams.get('id');
const discussionTitle = document.querySelector('.discussion-title');
const discussion = agoraStatesDiscussions.find(disc => disc.id === id);
discussionTitle.textContent = 'ㅤ/ㅤ'+discussion.title;

// 작성자 & 글 가져오기
const bringInfo = (obj, infoBox) => {
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const discussionAuthor = document.createElement('div');
    discussionAuthor.className = "discussion__author";
    discussionAuthor.textContent = obj.author;

    const discussionDate = document.createElement('div');
    discussionDate.className = "discussion__date";
    discussionDate.textContent = new Date(obj.createdAt).toDateString();

    infoBox.append(avatarWrapper, discussionAuthor, discussionDate);
}

const convertToDiscussion = (obj) => {
    const infoBox = document.querySelector('.discussion-container .info-view');
    const textarea = document.querySelector('.discussion');

    bringInfo(obj, infoBox);

    const textContainer = document.querySelector('.text-container');
    textContainer.innerHTML = obj.bodyHTML;

    const commentCount = document.querySelector('.comment-cnt');
    commentCount.textContent = obj.answer.length;

    const commentLine = document.querySelector('.comment-line');
    if(obj.answer.length > 0) commentLine.classList.add('show');
}

convertToDiscussion(discussion);

const convertToComments = (obj) => {
    const commentsUL = document.querySelector('.comments-list');
    const comment = document.querySelector('.comment-container');
    const li = comment.cloneNode(true);
    li.style.display='block';

    const commentLine = document.createElement('div');
    commentLine.className = 'comment-line';
    commentLine.style.display = 'block';
    commentsUL.append(commentLine);

    const infoBox = li.querySelector('.info-view');
    bringInfo(obj, infoBox);
    li.querySelector('.text-container').innerHTML = obj.bodyHTML;

    commentsUL.append(li);
}

if(discussion.answer) {
    discussion.answer.map((answer) => {
        convertToComments(answer);
    })
}