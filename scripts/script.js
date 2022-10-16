const rendering = (num) => {
  const { noti, normal } = getPaginationNumbers();
  const { prevRange, currRange } = setCurrentPage(num);
  render(noti, normal, prevRange, currRange);

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        const { prevRange, currRange } = setCurrentPage(pageIndex);
        render(noti, normal, prevRange, currRange);
        window.scrollTo({ top: 520, behavior: "smooth" });
      });
    }
  });
};

const dynamicTextArea = () => {
  const main = document.querySelector("main");
  const textarea = document.querySelector("#story");
  if (window.innerWidth > 1000) {
    main.style.flexDirection = "row";
    textarea.style["min-height"] = "500px";
    textarea.addEventListener("keydown", () => {
      textarea.style.height = "1px";
      textarea.style.height = `${15 + textarea.scrollHeight}px`;
    });
    textarea.addEventListener("keyup", () => {
      textarea.style.height = "1px";
      textarea.style.height = `${15 + textarea.scrollHeight}px`;
    });
  } else {
    main.style.flexDirection = "column";
    textarea.style["min-height"] = "auto";
    textarea.addEventListener("keydown", () => {
      textarea.style.height = "1px";
      textarea.style.height = `${15 + textarea.scrollHeight}px`;
    });

    textarea.addEventListener("keyup", () => {
      textarea.style.height = "1px";
      textarea.style.height = `${15 + textarea.scrollHeight}px`;
    });
  }
};

window.addEventListener("load", () => {
  dynamicTextArea();
  rendering(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

discussionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitDiscussion(event);
  rendering(1);
  window.scrollTo({ top: 520, behavior: "smooth" });
});

paginationLimit.addEventListener("change", () => {
  rendering(1);
  window.scrollTo({ top: 520, behavior: "smooth" });
});

prevButton.addEventListener("click", () => {
  rendering(currentPage - 1);
  window.scrollTo({ top: 520, behavior: "smooth" });
});

nextButton.addEventListener("click", () => {
  rendering(currentPage + 1);
  window.scrollTo({ top: 520, behavior: "smooth" });
});

// 반응형. 가로로 길면 폼이 왼쪽에
window.addEventListener("resize", dynamicTextArea);
