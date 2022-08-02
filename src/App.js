import { Discussions } from "./components/Discussions";
import { Form } from "./components/Form";
import { useEffect, useState } from "react";
import getRepo from "./GetRepo";

function App() {
  const domain = "http://localhost:3001";
  const [discussions, setDiscussions] = useState([]);

  //fetch는 side effect
  useEffect(() => {
    // getDiscussion(); // 서버에서 받아오기
    getGraphQl(); // 깃헙 GraphQL API 쿼리로 받아오기
  }, []);

  // async await
  const getDiscussion = async () => {
    const res = await fetch(domain + "/discussions");
    const data = await res.json();
    setDiscussions(data);
  };

  const getGraphQl = async () => {
    const { discussions } = await getRepo();
    // console.log(data.discussions.edges);
    setDiscussions(discussions.edges);
  };

  const addDiscussion = ({ title, author, bodyText }) => {
    const newDiscussion = {
      id: "unique id",
      createdAt: new Date().toISOString(),
      title: title,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: author,
      answer: null,
      bodyHTML: bodyText,
      avatarUrl:
        "https://user-images.githubusercontent.com/77045939/169451509-9ea1287e-e8d2-4818-8900-2a7c87452da1.png",
    };
    fetch(domain + "/discussions/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiscussion),
    }).then((res) => {
      if (res.status === 201) {
        getDiscussion();
      }
    });
  };

  const deleteDiscussion = (id) => {
    fetch(domain + `/discussions/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 202 || 204) {
        getDiscussion();
      }
    });
  };

  return (
    <>
      <h1>AGORA STATES</h1>
      <Form addDiscussion={addDiscussion} />
      <Discussions
        discussions={discussions}
        deleteDiscussion={deleteDiscussion}
      />
    </>
  );
}

export default App;
