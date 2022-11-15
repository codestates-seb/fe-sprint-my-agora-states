import { render } from "./render.js";

var coll = document.getElementsByClassName("collapsible");
var i;
console.log(coll.length);
for (i = 0; i < coll.length; i++) {
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

const ul = document.querySelector("ul.discussions__container");
render(ul);
