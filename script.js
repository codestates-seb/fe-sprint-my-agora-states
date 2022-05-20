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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //first-div
  const img = document.createElement("img");
  img.className = 'discussion__avatar--image';
  img.src = obj.avatarUrl;
  img.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(img);

  // secound-div
  const sec_h2 = document.createElement('h2');
  sec_h2.className = 'discussion__title';

  const sec_a = document.createElement('a');
  sec_a.href = obj.url;
  sec_a.textContent = obj.title;
  sec_h2.append(sec_a);

  const sec_pre_story = document.createElement('pre');
  sec_pre_story.className = 'discussion__story';
  sec_pre_story.textContent = obj.story;

  const sec_div = document.createElement('div');
  sec_div.className = "discussion__information";
  sec_div.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(sec_h2, sec_pre_story, sec_div);


  // third-div
  const third_input = document.createElement('input');
  third_input.type = 'checkbox';
  discussionAnswered.append(third_input);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// render(ul);

