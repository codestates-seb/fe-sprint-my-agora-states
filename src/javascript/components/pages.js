export default function Pages() {
    this.$pagesWrapper = document.querySelector(".pages__wrapper");
    // 페이지 넘버 생성
    this.createPages = (pageCount) => {
        const $div = document.createElement("div");
        $div.className = "pages__container";
        $div.appendChild(createPreviousBtn());
        for (let i = 1; i <= pageCount; i += 1) {
            const $span = document.createElement("span");
            $span.textContent = i;
            $span.className = "pages__item";
            $span.setAttribute("data-index", i);
            $div.appendChild($span);
        }
        $div.appendChild(createNextBtn());
        return $div;
    }
    this.deletePages = () => {
        const nodes = [...this.$pagesWrapper.childNodes];
        nodes.forEach((node) => node.remove());
    }

    const createPreviousBtn = () => {
        const $span = document.createElement("span");
        $span.textContent = "< Previous";
        $span.className = "pages__item previous";
        return $span;
        }
    const createNextBtn = () => {
        const $span = document.createElement("span");
        $span.textContent = "> Next";
        $span.className = "pages__item next";
        return $span;
    }
}