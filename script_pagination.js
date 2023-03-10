const localItem = 0;
if (window.localStorage.length!=0){
    localItem = window.localStorage.discussItems.length;
}


let currentPage = 1;
const totalCount = agoraStatesDiscussions.length + localItem;
let pageCount = 5;
const limit = 10; // 한 페이지에 표시할 개수

let pageGroup = Math.ceil(currentPage / pageCount);
console.log(totalCount);