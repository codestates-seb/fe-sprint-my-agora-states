/*
let 총 페이지수 = Math.ceil(총갯수 / 1개화면에서 보여줄 갯수)

let 나머지 = 현재나의페이지 % 하단부크기
let 하단부첫번째숫자 = 현재나의페이지 - 현재나의페이지%하단부크기 + 1

ex) 
현재나의페이지 = 11
하단부크기 = 10
하단부첫번째숫자 = 11 - 11%10 + 1 // 11

현재나의페이지 = 3
하단부크기 = 10
하단부첫번째숫자 = 3 - 3%10 + 1 // 1

let 하단부마지막숫자 = 현재나의페이지 - 현재나의페이지%하단부크기 + 페이지하단부크기
현재나의페이지 = 3
하단부크기 = 10
하단부마지막숫자 = 3 + 3%10 + 10 // 10

하단부의 마지막 숫자는 총 갯수를 넘어갈 수 없어야 한다.
if(하단부마지막숫자 > 총페이지수){
    하단부마지막숫자 = 총페이지수
}


function pageAlgo(total, bottomSize, listSize, cursor ){
    //total = 총 갯수
    //bottomSize = 하단크기
    //listSize = 화면에서 보여줄 크기
    //cursor = 현재 나의 페이지

    let totalPageSize = Math.ceil(total / listSize)  //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 

    let firstBottomNumber = cursor - cursor % bottomSize + 1;  //하단 최초 숫자
    let lastBottomNumber = cursor - cursor % bottomSize + bottomSize;  //하단 마지막 숫자

    if(lastBottomNumber > totalPageSize) lastBottomNumber = totalPageSize  //총 갯수보다 큰 경우 방지

    return {
        firstBottomNumber,
        lastBottomNumber,
        totalPageSize,
        total,
        bottomSize,
        listSize,
        cursor
    }
}

//280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
let info = pageAlgo(50, 5, 5, 6)  


//실제 출력하는 방법 샘플
for(let i = info.firstBottomNumber ; i <= info.lastBottomNumber; i++){
    i == info.cursor ? console.log(`<span>cur : ${i}</span>`) : console.log(`<span>${i}</span>`)
}
*/




const pagination_element = document.querySelector('#pagination');

let current_page = 1;
const rows = 10;

const DisplayList = (items, wrapper, rows_per_page, page)=>{
    wrapper.innerHTML = "";
    page--;

    const start = rows_per_page * page;
    const end = start + rows_per_page;
    const paginatedItems = items.slice(start, end);

    for(let i=0; i < paginatedItems.length; i++){
        
        const item = paginatedItems[i];

        const item_element = convertToDiscussion(item);
        
        wrapper.appendChild(item_element);

    }
}

const setupPagination = (items, wrapper, rows_per_page) => {
    wrapper.innerHTML = "";
    const page_count = Math.ceil(items.length / rows_per_page);
    
    for(let i=1; i < page_count +1; i++){
        const btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

const paginationButton = (page, items) => {
    const button = document.createElement('button');
    button.textContent = page;
    
    if(current_page === page) button.classList.add('active');

    button.addEventListener('click', function(){
        current_page = page;
        DisplayList(items, ul, rows, current_page);

        const current_btn = document.querySelector('#pagination button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

const leftBtn = document.querySelector('#left__btn');
const rightBtn = document.querySelector('#right__btn');

leftBtn.addEventListener('click', () => {
    current_page--;
    if(current_page < 1){
        current_page = 1;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    const current_btn = document.querySelectorAll('#pagination button');
    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');


})

rightBtn.addEventListener('click', () => {
    const current_btn = document.querySelectorAll('#pagination button');

    current_page++;
    if(current_page > current_btn.length){
        current_page = current_btn.length;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');
})


DisplayList(agoraStatesDiscussions, ul, rows, current_page);
setupPagination(agoraStatesDiscussions, pagination_element, rows);