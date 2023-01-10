// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { agoraStatesDiscussions, fundamentalDataFormat } from "./data.js";
import $ from "./utils/selector.js";
import getDiscussionComponent from "./components/discussion.js";
import getCurrentDateTime from "./utils/currentTime.js";

const updateData = (discussion) => {
  // discussion이 너무 많아지면 시간이 오래 걸릴 수 있는 잠재적 문제가 존재할 것 같다.
  agoraStatesDiscussions.unshift(discussion);
};

///////////////////////// rendering discussion area /////////////////////////
const createDiscussions = () => {
  const discussions = [];

  for (const discussion of agoraStatesDiscussions) {
    discussions.push(getDiscussionComponent(discussion));
  }

  return discussions.join("");
};

const render = (target, element) => {
  target.innerHTML = element;

  return "discussions rendered succesfully";
};

const discussionsContainer = $("ul.discussions__container");
const discussions = createDiscussions();

render(discussionsContainer, discussions);
//////////////////////////////////////////////////////////////////////////////

////////////////// add discussion by data inputed by form ////////////////////
const discussionSubmitHandler = (event) => {
  event.preventDefault();
  // children returns HTMLCollections -> only element exist
  const { value: author } = $(".form__input--name input", event.target);
  const { value: title } = $(".form__input--title input", event.target);
  const { value: question } = $(".form__textbox textarea");
  const createdAt = getCurrentDateTime();
  const newDiscussionData = {
    ...fundamentalDataFormat,
    id: uuidv4(),
    title,
    createdAt,
    author,
    question,
  };
  updateData(newDiscussionData);
  console.log(newDiscussionData);

  const newDiscussion = getDiscussionComponent(newDiscussionData);
  const discussionsContainer = $("ul.discussions__container");

  ////////////////////////// 1️⃣ //////////////////////////
  // const fragement = document.createDocumentFragment();
  // fragement.innerHTML = newDiscussion;
  // discussionsContainer.prepend(fragement.content);
  ////////////////////////////////////////////////////////

  const template = document.createElement("template");
  template.innerHTML = newDiscussion;
  discussionsContainer.prepend(template.content);

  /////////// 전체 데이터에 추가하고 그걸 다시 rendering하는 것이 나을까...?
  /////////// 아니면 한 개씩 rendering하는 것이 나을까......?
  // render(discussionsContainer, discussions);
};

const discussionFormElement = $(".form");
discussionFormElement.addEventListener("submit", discussionSubmitHandler);
//////////////////////////////////////////////////////////////////////////////

// const testFragment = document.createDocumentFragment();
// testFragment.innerHTML = `<h1>What the fuck is going wrong!!!</h1>`;
// document.body.prepend(testFragment);

// 1️⃣에서 createDocumentFragment.innerHTML을 적용하려 했지만 실패했다. ->
// 원인은 여기(https://stackoverflow.com/questions/8202195/using-document-createdocumentfragment-and-innerhtml-to-manipulate-a-dom)서
// 찾을 수 있었는데... `innerHTML과 template`은 지원하지 않는다고 한다.... 근데 해결이 잘 안 되고
// 여기(https://codingshower.com/convert-html-string-to-dom-node/)서 문제를 해결할 수 있었다.
// fragment는 template과 다르게 content가 존재하지 않는다.
