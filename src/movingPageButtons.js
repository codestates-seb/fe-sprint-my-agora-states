import convertToDiscussion from "./converToDiscussion.js";

const renderNextPage = function(element, pageInfo, data) {
  let currentPage = pageInfo.currentPage;
  if(currentPage * 10 > data.length) return currentPage;

  currentPage++; 
  // when the button clicked, it increase the current pagenum
  console.log(currentPage, element);
  let endIdx = currentPage * 10;
  let startIdx = (currentPage - 1) * 10;
  // defining star, end index (10-20, 20-30, 30-40)

  // remove all the exisiting elements shown on the current page 
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }

   if(data.length - endIdx >= 10) {

  // appending the next ten user discussion to the element
  for (startIdx; startIdx < endIdx; startIdx++) {
    element.append(convertToDiscussion(data[startIdx]));
  }

  } else {
    for (startIdx; startIdx < data.length; startIdx++) {
      element.append(convertToDiscussion(data[startIdx]));
    }
  }

  // replacing the current textContent of currentpage element

  return currentPage;
};

const renderPreviousPage = function(element, pageInfo, data) {
  // console.log(currentPage)
  let currentPage = pageInfo.currentPage;

  if(currentPage === 1) return currentPage;
  // console.log('hi');
  currentPage--;

  console.log(currentPage, element);
  let endIdx = currentPage * 10;
  let startIdx = (currentPage - 1) * 10;

  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
  
  // console.log(pagenum);

  for(startIdx; startIdx < endIdx; startIdx++) {
    element.append(convertToDiscussion(data[startIdx]));
  }
  return currentPage;
};


export {renderNextPage, renderPreviousPage};