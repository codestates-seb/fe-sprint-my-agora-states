Array.prototype.divide = function (n) {
    const array = this;
    const result = [];
    for (let i = 0; i < this.length; i += n) {
        const item = array.slice(i, i + n);
        result.push(item);
    }
    return result;
}

export default function Pages() {
    const data = agoraStatesDiscussions.divide(10);
    this.result = data[0];
    const pageCount = data.length;
    const $pagesContainer = document.querySelector(".pages__container");
   
    // 화면 랜더링 함수
    const rander = (element, handler) => {
        for(let i = 0; i < this.result.length; i += 1) element.append(handler(this.result[i]));
    }

    // 페이지 생성
    const createPages = () => {
        const $div = document.createElement("div");
        for (let i = 1; i <= pageCount; i += 1) {
            const $span = document.createElement("span");
            $span.textContent = i;
            $span.className = "pages";
            $span.style.color = "#FDFDFD";
            $span.setAttribute("data-index", i);
            $div.appendChild($span);
        }
        return $div;
    }

    this.init = (element, createDiscussion, deleteDiscussion) => {
        // 최초 실행
        $pagesContainer.appendChild(createPages());
        rander(element, createDiscussion);
        // 이벤트 시작
        $pagesContainer.addEventListener("click", ({ target }) => {
            const pagesNumber = Number(target.dataset.index);
            if(isNaN(pagesNumber)) return;
            this.result = data[pagesNumber - 1];
            console.log(this.result);
            deleteDiscussion();
            rander(element, createDiscussion);
        });
    }
}