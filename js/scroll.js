const $top = document.querySelector(".Btn-scroll-top");
const $bottom = document.querySelector(".Btn-scroll-bottom");
const $scrollDiv = document.querySelector(".discussion__wrapper");

const scrollToTop = () => {
  $scrollDiv.scrollTop = 0;
  $scrollDiv.scr;
};

$top.addEventListener("click", scrollToTop);

$bottom.addEventListener("click", () => {
  $scrollDiv.scrollTop = $scrollDiv.scrollHeight;
});

export default scrollToTop;
