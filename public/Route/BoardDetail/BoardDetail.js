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
const convertToDiscussion = (obj) => {
    const infoBox = document.querySelector('.info-view');
    const textarea = document.querySelector('.discussion');

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

    const textContainer = document.querySelector('.text-container');
    textContainer.innerHTML = obj.bodyHTML;
}

convertToDiscussion(discussion);