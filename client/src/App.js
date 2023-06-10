import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Form, Discussions } from "./components";

const App = () => {
  const [discussions, setDiscussions] = useState([]);
  const [error, setError] = useState(null);

  const addDiscussion = ({ title, author, bodyText }) => {
    const newDiscussionData = {
      title,
      author,
      bodyHTML: bodyText,
    };
    axios
      .post("http://localhost:4000/discussions/", newDiscussionData)
      .then((response) => {
        if (response.status === 201) {
          getDiscussion();
        }
      })
      .catch((error) => {
        setError("Failed to add discussion.");
      });
  };
  const getDiscussion = () => {
    axios
      .get("http://localhost:4000/discussions/")
      .then((response) => {
        setDiscussions(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch discussions.");
      });
  };

  const deleteDiscussion = (id) => {
    axios
      .delete(`http://localhost:4000/discussions/${id}`)
      .then((response) => {
        if (response.status === 202 || response.status === 204) {
          getDiscussion();
        }
      })
      .catch((error) => {
        setError("Failed to delete discussion.");
      });
  };

  useEffect(() => {
    getDiscussion();
  }, []);

  return (
    <main>
      <div className="form__info">
        <h1>My Agora States</h1>
        <Form addDiscussion={addDiscussion} />
      </div>
      <div className="form__active">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <Discussions
            discussions={discussions}
            deleteDiscussion={deleteDiscussion}
          />
        )}
      </div>
    </main>
  );
};

export default App;
