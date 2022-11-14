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
        scrollUnderTitle();
        dynamicAccordion();
      });
    }
  });
};

const dynamicTextArea = () => {
  const main = document.querySelector("main");
  const textarea = document.querySelector("#story");
  if (window.innerWidth > 1000) {
    main.style.flexDirection = "row";
    main.style.alignItems = "flex-start";
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
    main.style.alignItems = "center";
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

const dynamicAccordion = () => {
  // 아코디언. 답이 있는 경우 누르면 아래로 펼쳐짐
  const accordion = document.querySelectorAll(".discussion__container__wrapper");

  accordion.forEach((element, index) => {
    element.addEventListener("click", () => {
      element.classList.toggle("selected");
      const answer = element.querySelector(".discussion__accordion");
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.style.display = "none";
      } else {
        answer.style.display = "block";
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
};

const scrollUnderTitle = () => {
  if (window.innerWidth > 1000) {
    window.scrollTo({ top: 150, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 520, behavior: "smooth" });
  }
};

window.addEventListener("load", () => {
  dynamicTextArea();
  rendering(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
  dynamicAccordion();
});

discussionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitDiscussion(event);
  rendering(1);
  scrollUnderTitle();
  dynamicAccordion();
});

paginationLimit.addEventListener("change", () => {
  rendering(1);
  scrollUnderTitle();
  dynamicAccordion();
});

prevButton.addEventListener("click", () => {
  rendering(currentPage - 1);
  scrollUnderTitle();
  dynamicAccordion();
});

nextButton.addEventListener("click", () => {
  rendering(currentPage + 1);
  scrollUnderTitle();
  dynamicAccordion();
});

// 반응형. 가로로 길면 폼이 왼쪽에
window.addEventListener("resize", dynamicTextArea);
