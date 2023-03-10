// AgoraStates Data -> DOM
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li elements
  li.className = "discussion__big--container"; // class name setting
  
  const elContainer = document.createElement('div');
  elContainer.className = 'discussion__container'
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // Image
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image'
  avatarImage.alt = `avatar of ${obj.author}`
  avatarWrapper.append(avatarImage)
  // Title
  const title = document.createElement('h2');
  title.className = 'discussion__title'
  // Information
  const information = document.createElement('div');
  information.className = 'discussion__information'
  // URL
  const url = document.createElement('a');
  // Checkbox
  const checkbox = document.createElement('p');
  checkbox.className = 'checkbox';
  
  // setAttribute
  avatarImage.setAttribute('src', obj.avatarUrl);
  url.textContent = obj.title;
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  url.setAttribute('href', obj.url);
  checkbox.textContent = '✅';
  
  // Append
  li.append(elContainer);
  elContainer.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarImage);
  discussionContent.append(title, information);
  discussionAnswered.append(checkbox);
  title.append(url);
  
  // Answer -----------------------
  if(obj.answer !== null) {
    const ansWrapper = document.createElement('ul');
    ansWrapper.className = 'answer__wrapper';
    // First answer
    const answer = document.createElement('li');
    answer.className = 'answer';
    // Avatar
    const ansAvatarWrapper = document.createElement('div');
    ansAvatarWrapper.className = 'answer__avatar--wrapper';
    const ansAvatarImg = document.createElement('img');
    ansAvatarImg.className = 'answer__avatar--image'
    // Answer Title
    const ansTitle = document.createElement('h2');
    ansTitle.className = 'answer__title'
    const url = document.createElement('a');
    // Answer Contents
    const ansContent = document.createElement('div');
    ansContent.className = 'answer__content';
    // Answer Information
    const ansInformation = document.createElement('div');
    ansInformation.className = 'answer__Information';
    // Text Contents
    url.textContent = '답변';
    checkbox.textContent = '✅';
    url.href = obj.answer.url;
    ansAvatarImg.src = obj.answer.avatarUrl;
    ansInformation.textContent = `${obj.answer.author} / ${new Date(obj.answer.createdAt).toLocaleString()}`
    // Append
    li.append(ansWrapper);
    ansWrapper.append(answer);
    answer.append(ansAvatarWrapper, ansContent);
    ansAvatarWrapper.append(ansAvatarImg);
    ansContent.append(ansTitle,ansInformation);
    ansTitle.append(url); 
  }
  return li;
};

//  Function: Rendering array data of agoraStatesDiscussions
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// IF: Rendering all agoraStatesDiscussions data of -> ul elements
function getLocalStorage() {
  if(localStorage.length === 0) {  
  }
  else {
    agoraStatesDiscussions = JSON.parse(localStorage.getItem('json'));
  }
}
getLocalStorage();

const ul = document.querySelector('ul.discussions__container');
render(ul);

// New Question -----------------------
const newTitle = document.querySelector('#title');
const newName = document.querySelector('#name');
const newStory = document.querySelector('#story');
const form = document.querySelector('form.form');

// Submit -----------------------
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id: "new id",
    createdAt: new Date(),
    title: newTitle.value,
    url: undefined,
    author: newName.value,
    answer: null,
    bodyHTML: newStory.value,
    avatarUrl:myAvatar,
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  newName.value = '';
  newStory.value = '';
  newTitle.value = '';
  
  listItems = document.querySelectorAll("li.discussion__big--container");
  setCurrentPage(1);
});