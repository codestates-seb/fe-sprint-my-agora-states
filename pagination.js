'use strict'

const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.querySelector(".discussions__container");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;

/**
 * 페이지 넘버 버튼 추가
 * @param {number} index 페이지 인덱스
 * 
 */
const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.textContent = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
};

/**
 * pageCount만큼 페이지 넘버 버튼 생성 반복
 */
const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++){
        appendPageNumber(i);
    }
};

/**
 * currentPage 변경, 보여줄 리스트 변경
 * @param {number} pageNum 
 */
const setCurrentPage = (pageNum) => {
    currentPage = pageNum

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if(index >= prevRange && index < currRange){
            item.classList.remove("hidden")
        };
    });
};

/**
 * 페이지 넘버 버튼 style 변경
 */
const handleActivePageNumber = () =>{
    document.querySelectorAll(".pagination-number").forEach((button)=>{
        button.classList.remove("active");

        const pageIndex = Number(button.getAttribute("page-index"));

        if(pageIndex === currentPage) {
            button.classList.add("active")
        }
    })    
}

/**
 * 앞,뒤 버튼 비활성화
 * @param {button} button 
 */
const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

/**
 * 앞,뒤 버튼 활성화
 * @param {button} button 
 */
const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

/**
 * 앞,뒤 버튼 활성화 상태 변경
 */
const handlePageButtonsStatus = () => {
    if (currentPage === 1){
        disableButton(prevButton);
    }else{
        enableButton(prevButton)
    }

    if(pageCount === currentPage){
        disableButton(nextButton);
    }else{
        enableButton(nextButton)
    }
}

window.onload = () =>{
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.onclick = () => setCurrentPage(currentPage - 1);

    nextButton.onclick = () => setCurrentPage(currentPage + 1);
    
    // 페이지 넘버 클릭 시 리스트 변경
    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if(pageIndex){
            button.onclick = () => setCurrentPage(pageIndex);
        };
    });
}