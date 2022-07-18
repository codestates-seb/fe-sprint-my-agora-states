const dafaultTemplate = () => {
  return `
    <main>
      <h1>My Agora States</h1>
      <section class="form__container">
        <form action="" method="get" class="form">
          <div class="form__input--wrapper">
            <div class="form__input--name">
              <label for="name">Enter your name: </label>
              <input type="text" name="name" id="name" required />
            </div>
            <div class="form__input--title">
              <label for="name">Enter your title: </label>
              <input type="text" name="name" id="name" required />
            </div>
            <div class="form__textbox">
              <label for="story">Your question: </label>
              <textarea id="story" name="story" placeholder="질문을 작성하세요" required></textarea>
            </div>
          </div>
          <div class="form__submit">
            <input type="submit" value="submit" />
          </div>
        </form>
      </section>
      <section class="discussion__wrapper">
        <ul class="discussions__container">
          <li class="discussion__container">
            <div class="discussion__avatar--wrapper">
              <img
                class="discussion__avatar--image"
                src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
                alt="avatar of kimploo"
              />
            </div>
            <div class="discussion__content">
              <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
              <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
            </div>
            <div class="discussion__answered"><p>☑</p></div>
          </li>
        </ul>
      </section>
    </main>
  
  `;
};
