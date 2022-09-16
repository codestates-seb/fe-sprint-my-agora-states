const discussionForm = document.querySelector(".form");
let localDiscussion = [];

function saveLocalDiscussion(value) {
  localStorage.setItem("local-discussion", JSON.stringify(value));
}

function submitDiscussion(event) {
  const newDiscussion = {
    id: localDiscussion.length + 1,
    createdAt: new Date().toISOString(),
    title: event.target[1].value,
    url: "",
    author: event.target[0].value,
    answer: null,
    avatarUrl:
    "https://w.namu.la/s/8278c2bceff7ec126e8d339f4501cb9d4d35d95c8d1b122c7f2d798b210a4031a5116db2c6e015e7673a9c30ef06097a76e0a207e697952c44908e74160726661e83614bdaf43769ca4d52e3e0f02d7bc35b2a969283bc36af834bb81fbc0301",
    notice: event.target[3].checked,
  };
  event.preventDefault();
  event.target[0].value = "";
  event.target[1].value = "";
  event.target[2].value = "";
  event.target[3].checked = false;
  
  let savedDiscussion = localStorage.getItem("local-discussion");
  if (savedDiscussion !== null) {
    localDiscussion = JSON.parse(savedDiscussion);
  } else {
    localDiscussion = [];
  }

  localDiscussion.unshift(newDiscussion);
  saveLocalDiscussion(localDiscussion);
}

discussionForm.addEventListener("submit", submitDiscussion);
