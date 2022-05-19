import Discussion from "./components/discussion.js";
import Pages from "./components/pages.js";

const discussion = new Discussion();
const pages = new Pages();
pages.init(discussion.$ul, discussion.createDiscussion, discussion.deleteDiscussion);

// 함수 수정
const $form = document.querySelector("form");
$form.addEventListener("submit", e => {
    e.preventDefault();
    const $textName = document.querySelector("#textName");
    const $textTitle = document.querySelector("#textTitle");
    // const $story = document.querySelector("#story");
    const date = new Date();
    const userData = {
        title: $textTitle.value,
        avatarUrl: null,
        url: null,
        answer: null,
        author: $textName.value,
        createdAt: date
    }
});