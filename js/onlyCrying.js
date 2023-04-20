import scrollToTop from "./scroll.js";

const $Btn_allList = document.querySelector(".all-list");
const $Btn_onlyCry = document.querySelector(".only-cry");

const viewOnlyNeedAnswer = () => {
  const $li = document.querySelectorAll("li");
  $Btn_onlyCry.classList.add("clicked");
  $Btn_allList.classList.remove("clicked");
  $li.forEach((el) => {
    if (el.textContent.includes("😍")) {
      el.classList.add("hide-list");
    }
  });
  scrollToTop();
};

const viewAll = () => {
  const $li = document.querySelectorAll("li");
  $Btn_allList.classList.add("clicked");
  $Btn_onlyCry.classList.remove("clicked");
  $li.forEach((el) => {
    el.classList.remove("hide-list");
  });
  scrollToTop();
};

$Btn_allList.addEventListener("click", viewAll);
$Btn_onlyCry.addEventListener("click", viewOnlyNeedAnswer);
