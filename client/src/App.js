import React from "react";
import "./App.css";

const App = () => {
  return (
    <main>
      <div className="form__info">
        <h1>My Agora States</h1>
        <section className="form__container">
          <form action="" method="get" className="form">
            <div className="form__input--wrapper">
              <div className="form__input--name">
                <label htmlFor="name">Enter your name: </label>
                <input type="text" name="name" id="name" required />
              </div>
              <div className="form__input--title">
                <label htmlFor="title">Enter your title: </label>
                <input type="text" name="title" id="title" required />
              </div>
              <div className="form__textbox">
                <label htmlFor="story">Your question: </label>
                <textarea
                  id="story"
                  name="story"
                  placeholder="질문을 작성하세요"
                  required
                ></textarea>
              </div>
            </div>
            <div className="form__submit">
              <input type="submit" value="submit" />
            </div>
          </form>
        </section>
      </div>
      <div className="form__active">
        <section className="discussion__wrapper">
          <ul className="discussions__container">
            <li className="discussion__container">
              <div className="discussion__avatar--wrapper">
                <img
                  className="discussion__avatar--image"
                  src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
                  alt="avatar of kimploo"
                />
              </div>
              <div className="discussion__content">
                <h2 className="discussion__title">
                  <a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">
                    [notice] 좋은 질문하는 법
                  </a>
                </h2>
                <div className="discussion__information">
                  kimploo / 2022-04-22T14:08:33Z
                </div>
              </div>
              <div className="discussion__answered">
                <p>✅</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default App;
