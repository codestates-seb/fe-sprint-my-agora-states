// const list_element = document.querySelector("#list");
// const pagination_element = document.querySelector("#pagination");

// let current_page = 1; // 현재 페이지
// let rows = 10; // 보여줄 페이지

// function DisplayList (items, wrapper, rows_per_page, page) { //(배열, div.list, 10, 1)
//     wrapper.innerHtml = "";
//     page--;

//     let start = rows_per_page * page;
//     let end = start + rows_per_page;
//     let paginatedItems = items.slice(start, end); // 0 ,1 ,2 ,3, 4, 5, 6, 7, 8, 9

//     for (let i = 0; i < paginatedItems.length; i++) {
//         let item = paginatedItems[i];

//         let item_element = document.createElement("div");
//         item_element.classList.add("item");
//         item_element.innerText = item;

//         wrapper.appendChild(item_element);
//     }
// }

// function SetupPagination (items, wrapper, rows_per_page) {
//     wrapper.innerHtml = "";

//     let page_count = Math.ceil(items.length / rows_per_page);
//     for (let i = 1; i < page_count + 1; i++) {
//         let btn = PaginationButton(i, items);
//         wrapper.appendChild(btn);
//     }
// }

// function PaginationButton (page, items) {
//     let button = document.createElement("button");
//     button.innerText = page;

//     if (current_page == page) button.classList.add("active");

//     button.addEventListener('click', function() {
//         current_page = page;
//         DisplayList(items, list_element, rows, current_page);

//         let current_btn = document.querySelector(".pagenumbers button.active");
//         current_btn.classList.remove("active");

//         button.classList.add('active');
//     });
//     return button;
// }

// DisplayList(list_items, list_element, rows, current_page); // (배열, div.list, 10, 1)
// SetupPagination(list_items, pagination_element, rows); // (배열, div.pag, 10)






























