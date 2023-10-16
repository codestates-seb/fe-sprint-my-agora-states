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
    const title = document.getElementById('title').value;
    const story = document.getElementById('story').value;
    const question = {
        id: "D_kwDOHOApLM4APjJi" + Math.random() * 100 + Math.random() * 100,
        createdAt: new Date(),
        title: title,
        url: "https://github.com/cheorhyeon",
        author: name,
        bodyHTML: story, 
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPqf5c1dQuCoG6cXgxx2V-sfrMgnZA_607tg&usqp=CAU"
    };
    obj.push(question);
};

const form = document.getElementsByClassName('form')[0];

form.addEventListener('submit', function (event) {
    event.preventDefault(); // 폼 제출을 막음
    create(agoraStatesDiscussions);
    render(ul); // 다시 렌더링
});


