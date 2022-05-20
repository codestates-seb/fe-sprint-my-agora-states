import Discussions from "./components/discussions.js";
import Pages from "./components/pages.js";
import { createArrayPrototypeDivide } from "./utils/divide.js";
import { storge } from './storge/storge.js';
import { disctinctArray, suffleArray } from "./utils/random.js"; 

createArrayPrototypeDivide();

function App() {
    // 초기값 설정
    if (storge.getData("data") === null) storge.setData("data", agoraStatesDiscussions.divide(10));
    const discussion = new Discussions();
    const pages = new Pages();
    const $form = document.querySelector("form");
    const data = storge.getData("data");
    let currentPage = 0;
    // 데이터 생성 함수
    const createUserData = (author, title) => {
        // 데이터 추출
        const avatars = disctinctArray(agoraStatesDiscussions.map((item) => item.avatarUrl));
        const url = disctinctArray(agoraStatesDiscussions.map((item) => item.url));
        // 데이터 셔플
        suffleArray(avatars);
        suffleArray(url);
        const date = new Date();
        const userData = {
            title,
            author,
            avatarUrl: avatars[0],
            url: url[0],
            answer: null,
            createdAt: date
        }
        return userData;
    }
    // 랜더링 함수
    const render = () => {
        discussion.deleteDiscussions();
        pages.deletePages();
        pages.$pagesWrapper.appendChild(pages.createPages(data.length));
        discussion.$discussionsWrapper.appendChild(discussion.createDiscussions(data[currentPage]));
        checkedBtn();
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
            storge.setData("data", data);
            render();
        });
        // 페이징네이션 네비게이터 함수
        pages.$pagesWrapper.addEventListener("click", (e) => {
            const checkedBtn = e.target.classList;
            
            if(checkedBtn.contains("previous")) {
                if (currentPage === 0) return;
                currentPage -= 1;
                render();
            }

            if(checkedBtn.contains("next")) {
                if (currentPage === data.length - 1) return;
                currentPage += 1;
                render();
            }

            const pageNumber = Number(e.target.dataset.index);
            if (isNaN(pageNumber)) return;
            currentPage = pageNumber - 1;
            render();
        })
    }
    // Css 색깔 입히기
    const checkedBtn = () => {
        const $previous = document.querySelector(".previous");
        const $next = document.querySelector(".next");
        const $pageNumber = document.querySelectorAll(".pages__Number");
        if (currentPage === 0) $previous.classList.add("impossible");
        else $previous.classList.remove("impossible");

        if (currentPage === data.length - 1) $next.classList.add("impossible");
        else $next.classList.remove("impossible"); 

        $pageNumber[currentPage].classList.add("current");
    }
}

new App().init();