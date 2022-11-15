import { render } from "./render.js";
import { submitDiscussion } from "./submitDiscussion.js";
const coll = document.getElementsByClassName("collapsible");

if (localStorage.length > 3) {
  for (const key in window.localStorage) {
    if (key.includes("discussion")) {
      // value 찾기
      const value = window.localStorage.getItem(key);
      agoraStatesDiscussions.unshift(JSON.parse(value));
    }
  }
}
console.log(agoraStatesDiscussions);

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

submitDiscussion();
const ul = document.querySelector("ul.discussions__container");
render(ul);
