export default function Pages() {
    this.$pagesContainer = document.querySelector(".pages__container");
    // 페이지 넘버 생성
    this.createPages = (pageCount) => {
        const $div = document.createElement("div");
        for (let i = 1; i <= pageCount; i += 1) {
            const $span = document.createElement("span");
            $span.textContent = i;
            $span.className = "pages";
            $span.setAttribute("data-index", i);
            $span.style.padding = "0.7rem";
            $div.appendChild($span);
        }
        return $div;
    }
    this.deletePages = () => {
        const nodes = [...this.$pagesContainer.childNodes];
        nodes.forEach((node) => node.remove());
    }
}