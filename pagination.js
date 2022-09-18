// let elPagination = document.querySelector('.pagination__container')


// const currentPage = 1 // 현재 페이지
// const totalCount = agoraStatesDiscussions.length // 총 데이터의 갯수
// const pageCount = 3 //  화면에 나타날 페이지 갯수
// const limit = 10 // 한 페이지 당 나타낼 데이터의 갯수

// console.log(totalCount)

// //총 페이지 갯수
// let totalPage = Math.ceil(totalCount / limit) // 5

// // 현재 페이지 그룹
// let pageGroup = Math.ceil(currentPage / pageCount) // 1

// let lastNumber = pageGroup * pageCount // 3
// if (lastNumber > totalPage) {
//   lastNumber = totalPage
// }
// let firstNumber = lastNumber - (pageCount - 1) // 1

// const next = lastNumber + 1 // 6
// const prev = firstNumber - 1 // 0

// // 화면에 나타날 페이지 갯수(3)만큼 페이지네이션 그려줌
// for (let i = firstNumber; i <= lastNumber; i++) {
//   elPagination += `<button class="pageNumber" id="page_${i}">${i}</button>`
// }