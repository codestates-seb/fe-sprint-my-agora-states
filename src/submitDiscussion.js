export const submitDiscussion = () => {
  const coll = document.querySelector(".collapsible");

  coll.addEventListener("click", () => {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    content.style.display === "flex"
      ? (content.style.display = "none")
      : (content.style.display = "flex");
  });
};
