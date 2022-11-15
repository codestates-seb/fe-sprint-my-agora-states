console.log(agoraStatesDiscussions);

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); 
  li.className = "discussion__container"; 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  const discussion__avatarImage = document.createElement('img')
  discussion__avatarImage.src = obj.avatarUrl;
  discussion__avatarImage.alt = 'avatar of' + obj.author;
  avatarWrapper.append(discussion__avatarImage);


  const discussionTitle = document.createElement('h2');
  const discussiontitleA = document.createElement('a');
  discussiontitleA.href = obj.url;
  discussiontitleA.textContent = obj.title;
  discussionTitle.append(discussiontitleA);
  discussionContent.append(discussionTitle);


  const discussioninformation = document.createElement('div')
  discussioninformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionTitle,discussioninformation);


  const discussionanswered = document.createElement('p');
  discussionanswered.textContent = obj.answer ? '☑︎' : '☒';
  discussionAnswered.append(discussionanswered);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
      id: "a",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/2",
      author: inputName.value,
      answer: null,
      bodyHTML: inputQuestion.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    }
    agoraStatesDiscussions.unshift(obj);
    ul.prepend(convertToDiscussion(obj));

    inputName.value = '';
    inputTitle.value = '';
    inputQuestion.value = '';

  })
  


  const render = (ul) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  }
  
const ul = document.querySelector("ul.discussions__container");
render(ul);
