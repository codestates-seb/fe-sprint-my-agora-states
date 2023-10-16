/* <section class="form__container">
<form action="" method="get" class="form">
  <div class="form__input--wrapper">
    <div class="form__input--name">
      <label for="name">Enter your name: </label>
      <input type="text" name="name" id="name" required>
    </div>
    <div class="form__input--title">
      <label for="title">Enter your title: </label>
      <input type="text" name="title" id="title" required>
    </div>
    <div class="form__textbox">
      <label for="story">Your question: </label>
      <textarea id="story" name="story" placeholder="질문을 작성하세요" required></textarea>
    </div>
  </div>
  <div class="form__submit">
    <input type="submit" value="submit">
  </div>
</form>
</section> */

const create = (obj) => {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value.trim();
  const story = document.getElementById('story').value;
  const question = {
      id: "D_kwDOHOApLM4APjJi" + Math.random() * 100 + Math.random() * 100,
      createdAt: new Date(),
      title: title,
      url: "https://github.com/cheorhyeon",
      author: name,
    bodyHTML: story,
    avatarUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUhXhN5wgRcVa3R6WBEoMrT9MfCsyOl4OVpXNO6t_2cw&s"
  };
  obj.push(question);
  storedData.push(question);
  localStorage.setItem("storedData", JSON.stringify(storedData));

  // 정보가 들어갔으니 페이지 정보를 갱신
  totalPages = getTotalPageCount(); // 총 페이지 수 갱신
  currentPage = totalPages; // 가장 마지막 페이지 정보를 가지고 있음
  currentGroup = updatePageGroup(); // 가장 마지막 페이지의 그룹을 가르킴

  // 마지막 페이지를 화면에 출력
  // 페이지 버튼 업데이트
  setPageButtons();
  setPageOf(currentPage);
};

const form = document.getElementsByClassName('form')[0];

form.addEventListener('submit', function (event) {
  event.preventDefault(); // 폼 제출을 막음
  create(agoraStatesDiscussions);
});