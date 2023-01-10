const contents = document.querySelector(".discussions__container");
const buttons = document.querySelector(".page-button-container");

const numOfContent = agoraStatesDiscussions.length;
const maxContent = 10;
const showButton = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;
/*---------------------------------------------------*/

  /*---------------------------------------------------*/
  const goPrevPage = () => {
    page -= maxButton;
    render(page);
  };
  
  const goNextPage = () => {
    page += maxButton;
    render(page);
  };
  
  const prev = document.createElement("button");
  prev.classList.add("button", "prev");
  prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
  prev.addEventListener("click", goPrevPage);
  
  const next = document.createElement("button");
  next.classList.add("button", "next");
  next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
  next.addEventListener("click", goNextPage);