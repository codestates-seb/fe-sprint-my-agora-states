import Discussions from "./components/discussions.js";
import Pages from "./components/pages.js";
import { createArrayPrototypeDivide } from "./utils/divide.js";

createArrayPrototypeDivide();

function App() {
    const discussion = new Discussions();
    const pages = new Pages();
    const $form = document.querySelector("form");
    const data = agoraStatesDiscussions.divide(10);
    let currentPage = 0;
    // 데이터 생성 함수
    const createUserData = (author, title) => {
        const date = new Date();
        const userData = {
            title,
            author,
            avatarUrl: null,
            url: null,
            answer: null,
            createdAt: date
        }
        return userData;
    }
    // 랜더링 함수
    const render = () => {
        discussion.deleteDiscussions();
        pages.deletePages();
        pages.$pagesContainer.appendChild(pages.createPages(data.length));
        discussion.$discussionsContainer.appendChild(discussion.createDiscussions(data[currentPage]));
    }
    this.init = () => {
        render();
        // 데이터 추가 함수
        $form.addEventListener("submit", (e) => {
            e.preventDefault();
            const dataLastIndex = data.length - 1;
            const $textName = document.querySelector("#textName");
            const $textTitle = document.querySelector("#textTitle");
            const userData = createUserData($textName.value, $textTitle.value);
            data[dataLastIndex].push(userData);
            render();
        });
        // 페이징네이션 네비게이터 함수
        pages.$pagesContainer.addEventListener("click", (e) => {
            const pageNumber = Number(e.target.dataset.index);
            console.log(pageNumber);
            if (isNaN(pageNumber)) return;
            currentPage = pageNumber - 1;
            render();
        })
    }
}

new App().init();