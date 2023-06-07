import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const DiscussionItem = ({ avatarUrl, title, author, createdAt, answer }) => {
  return (
    <li className="discussion__container">
      <div className="discussion__avatar--wrapper">
        <img
          className="discussion__avatar--image"
          src={avatarUrl}
          alt="avatar"
        />
      </div>
      <div className="discussion__content">
        <h2 className="discussion__title">
          <a href={title}>
            {title.length > 53 ? `${title.slice(0, 53)}...` : title}
          </a>
        </h2>
        <div
          className="discussion__information"
          dangerouslySetInnerHTML={{
            __html: `${author} / ${new Date(createdAt).toLocaleTimeString()}`,
          }}
        ></div>
      </div>
      <div className="discussion__answered">
        <p>{answer ? "✅" : "❌"}</p>
      </div>
    </li>
  );
};

const App = () => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/discussions")
      .then((response) => {
        setDiscussions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching discussions:", error);
      });
  }, []);

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
            {discussions.map((discussion) => (
              <DiscussionItem
                key={discussion.id}
                avatarUrl={discussion.avatarUrl}
                title={discussion.title}
                author={discussion.author}
                createdAt={discussion.createdAt}
                answer={discussion.answer}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default App;
