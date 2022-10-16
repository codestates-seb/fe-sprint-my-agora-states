const discussionForm = document.querySelector(".form");

const localDiscussion = () => {
  const savedDiscussion = localStorage.getItem("local-discussion");
  if (savedDiscussion === null) {
    return [];
  } else {
    return JSON.parse(savedDiscussion);
  }
};

const saveLocalDiscussion = (value) => {
  localStorage.setItem("local-discussion", JSON.stringify(value));
};

const submitDiscussion = (event) => {
  const newDiscussion = {
    id: localDiscussion().length + 1,
    createdAt: new Date().toISOString(),
    title: event.target[1].value,
    url: "",
    author: event.target[0].value,
    text: event.target[2].value,
    answer: null,
    avatarUrl: `https://picsum.photos/seed/${this.author}/200/200`,
    notice: event.target[3].checked,
  };

  // submit form 내용 초기화하기
  event.target[0].value = "";
  event.target[1].value = "";
  event.target[2].value = "";
  event.target[3].checked = false;

  const updatedDiscussion = [newDiscussion, ...localDiscussion()];
  saveLocalDiscussion(updatedDiscussion);
};
