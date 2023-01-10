
function render(ul, lis) {
  ul.innerHTML = lis;
}

const ul = document.querySelector(".discussions__container");
const li = document.createElement('li')
let lis = "";

for (const data of agoraStatesDiscussions) {
  const { avatarUrl, createdAt, title, url, author, answer } = data;

  li.setAttribute('class', 'discussion__container')

  const template = `
    <li class="discussion__container">
      <div class="discussion__avatar--wrapper">
        <img class="discussion__avatar--image"
          src="${avatarUrl} "
          alt="${author}">
      </div>
      <div class="discussion__content">
        <h2 class="discussion__title"><a href="${url}">${title}</a></h2>
        <div class="discussion__information">
          <p class="dis_info_name">${author}</p>
          <p class="dis_info_date">${createdAt}</p>
        </div>
      </div>
      <div class="discussion__answered"><p>${
        "check icon"
      }</p></div>
    </li>
  `;

  lis += template;
}

render(ul, lis);


let submitName = document.getElementById('name');
let submitTitle = document.getElementById('title');
let story = document.getElementById('story');
let today = new Date();

document.getElementById('submitBtn').onclick = function () {
  console.log(submitName.value);
  
  
  const aaa = `
    <li class="discussion__container">
    <div class="discussion__avatar--wrapper">
    <img class="discussion__avatar--image"
    src="defaultImg"
    alt="${submitName.value}">
    </div>
    <div class="discussion__content">
    <h2 class="discussion__title"><a href="#">${submitTitle.value}</a></h2>
    <div class="discussion__information">
    <p class="dis_info_name">${submitName.value}</p>
    <p class="dis_info_date">${today}</p>
    </div>
    </div>
    <div class="discussion__answered"><p>${
      "check icon"
    }</p></div>
    </li>
    `;

  li.innerHtml = aaa;

  li.append(aaa);
}

//submit을 눌렀을 때, 
//#id, #name, #story의 내용을 li에 push한다.
//텍스트 내용을 가져오는 함수
//li에 push하는 함수
