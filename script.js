const local = () => {
  if (window.localStorage.getItem("data")) {
    let temp = JSON.parse(window.localStorage.getItem("data"));
    for (let i = 0; i < temp.length; i++) {
      agoraStatesDiscussions.unshift(temp[i]);
    }
  }
};
local();
const clearBtn = document.querySelector(".storageClear");
clearBtn.onclick = function () {
  window.localStorage.clear();
  window.location.reload();
};
let totalPage = Math.ceil(agoraStatesDiscussions.length / 5);
// radio 이벤트추가
const addRadioEvent = () => {
  const radioBtn = document.querySelectorAll(".radioBtn");
  for (let i = 0; i < radioBtn.length; i++) {
    radioBtn[i].addEventListener("click", function () {
      if (this.classList.contains("opened")) {
        this.checked = false;
        this.classList.remove("opened");
      } else {
        this.classList.add("opened");
      }
    });
  }
};
// obj를 accordion 요소로 convert
const convertToDiscussion = (obj) => {
  const div = document.createElement("div");
  div.className = "accordion";
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.id = obj.id;
  radio.name = "answer";
  radio.className = "radioBtn";
  const label = document.createElement("label");
  label.htmlFor = obj.id;
  label.className = "labelForRadio";
  const icon = document.createElement("div");
  icon.className = "icon";
  icon.append("+");
  label.append(obj.title, icon);

  const childDiv = document.createElement("div");
  childDiv.className = "question_contents";
  const imgDiv = document.createElement("div");
  imgDiv.className = "imgCon";
  const img = document.createElement("img");
  img.src = obj.avatarUrl ? obj.avatarUrl : "./noneImg.png";
  img.alt = "User Avatar Image";
  const imgP = document.createElement("p");
  imgP.className = "username";
  imgP.append(obj.author);
  imgDiv.append(img, imgP);

  const contentsDiv = document.createElement("div");
  contentsDiv.className = "contentsCon";
  const contentsP = document.createElement("p");
  contentsP.className = "contentsText";
  contentsP.append(obj.contents ? obj.contents : obj.title); //
  const contentsA = document.createElement("a");
  contentsA.href = obj.url ? obj.url : "";
  contentsA.target = "_blank";
  contentsA.append(obj.url ? " >> 질문 자세히보기" : "");
  const contentsD = document.createElement("p");
  contentsD.className = "date";
  contentsD.append(obj.date ? obj.date : new Date(obj.createdAt).toLocaleDateString("ko-kr")); //

  contentsDiv.append(contentsP, contentsA, contentsD);

  childDiv.append(imgDiv, contentsDiv);

  div.append(radio, label, childDiv);

  return div;
};
const render = (parents, currentPage) => {
  if (parents.firstChild) {
    parents.textContent = "";
  }
  let arrNum = (currentPage - 1) * 5;
  for (let i = arrNum; i < arrNum + 5; i++) {
    if (i > agoraStatesDiscussions.length - 1) {
      break;
    }
    parents.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
const parents = document.querySelector(".accordion_container");
const pagenation = (currentPage) => {
  let ul = document.querySelector(".pagenation");
  if (ul.firstChild) {
    ul.textContent = "";
  }
  let firstNum = currentPage - (currentPage % 5) + 1;
  let lastNum = currentPage - (currentPage % 5) + 5;
  lastNum = lastNum <= totalPage ? lastNum : totalPage;
  let temp;
  function createLi(text) {
    let li = document.createElement("li");
    li.className = "page";
    li.textContent = `${text}`;
    return li;
  }
  temp = createLi("<");
  if (firstNum > 5) {
    temp.id = `${firstNum - 5}`;
    temp.addEventListener("click", function () {
      pagenation(+this.id);
    });
  } else {
    temp.classList.add("invalid");
  }
  ul.append(temp);
  for (let i = firstNum; i <= lastNum; i++) {
    temp = createLi(`${i}`);
    temp.addEventListener("click", function () {
      changePage(this);
    });
    if (i === currentPage) {
      temp.classList.add("active");
    }
    ul.append(temp);
  }
  temp = createLi(">");
  if (lastNum < totalPage) {
    temp.id = `${lastNum + 1}`;
    temp.addEventListener("click", function () {
      pagenation(+this.id);
    });
  } else {
    temp.classList.add("invalid");
  }
  ul.append(temp);
  render(parents, currentPage);
  addRadioEvent();
  return;
};
pagenation(1);

const changePage = (t) => {
  if (t.classList.contains("active")) {
    return;
  }
  let nowAct = document.querySelector(".active");
  nowAct.classList.remove("active");
  t.classList.add("active");
  render(parents, +t.textContent);
  addRadioEvent();
};
const sendBtn = document.querySelector(".sendBtn");

sendBtn.onclick = function () {
  const title = document.querySelector(".title");
  const name = document.querySelector(".name");
  const contents = document.querySelector(".contents");
  if (title.value === "") {
    alert("제목을 입력해주세요");
    title.focus();
    return;
  } else if (name.value === "") {
    alert("이름을 입력해주세요");
    name.focus();
    return;
  } else if (contents.value === "") {
    alert("질문 내용을 입력해주세요");
    contents.focus();
    return;
  }
  const newObj = {
    title: title.value,
    author: name.value,
    contents: contents.value,
    date: new Date().toLocaleDateString("ko-kr"),
    id: (((1 + Math.random()) * 0x10000) | 0).toString(16),
  };
  if (window.localStorage.getItem("data")) {
    let temp = JSON.parse(window.localStorage.getItem("data"));
    temp.push(newObj);
    window.localStorage.setItem("data", JSON.stringify(temp));
  } else {
    window.localStorage.setItem("data", JSON.stringify([newObj]));
  }
  agoraStatesDiscussions.unshift(newObj);
  pagenation(1);
};
