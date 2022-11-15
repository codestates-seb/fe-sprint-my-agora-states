import { render } from "./render.js";
import { submitDiscussion } from "./submitDiscussion.js";
const coll = document.getElementsByClassName("collapsible");

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
console.log(submitDiscussion());
const ul = document.querySelector("ul.discussions__container");
render(ul);
