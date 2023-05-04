console.log(agoraStatesDiscussions);

const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const 첫번째 = document.createElement("div");
  첫번째.className = "첫번째";

  const 첫번째첫번째 = document.createElement("div");
  첫번째첫번째.className = "첫번째첫번째";
  const 아바타 = document.createElement("img");
  아바타.className = "아바타";
  아바타.src = obj.avatarUrl;
  const 어써 = document.createElement("span");
  어써.className = "어써";
  어써.textContent = obj.author;
  첫번째첫번째.append(아바타, 어써);

  const 첫번째두번째 = document.createElement("div");
  첫번째두번째.className = "첫번째두번째";
  const 컨텐트 = document.createElement("div");
  컨텐트.className = "컨텐트";
  컨텐트.textContent = obj.title;
  const 날짜 = document.createElement("span");
  날짜.className = "날짜";
  날짜.textContent = `${new Date(obj.createdAt).toLocaleString()}`;
  첫번째두번째.append(컨텐트, 날짜);

  첫번째.append(첫번째첫번째, 첫번째두번째);

  const 엔써 = document.createElement("div");
  엔써.className = "엔써";
  엔써.textContent = "답변보기";

  li.append(엔써, 첫번째);

  return li;
};

const scrollButton = document.querySelector(".scroll");
scrollButton.addEventListener("click", function () {
  let body = document.querySelector("body");
  window.scroll({
    behavior: "smooth",
    top: body.offsetTop,
  });
});

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const ul = document.querySelector(".유엘");
render(ul);
