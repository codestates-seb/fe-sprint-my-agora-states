import { useState } from "react";
import "../css/style.css";
import List from "./List";
import mockItems from "../mock.json";
import ListForm from "./ListForm";

function App() {
  const [items, setItems] = useState(mockItems.result);

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  return (
    <div>
      <h1>My Agora States</h1>
      <ListForm />
      <ul className="discussions__container">
        <li className="discussion__container">
          <div className="discussion__avatar--wrapper">
            <img
              className="discussion__avatar--image"
              src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
              alt="avatar of kimploo"
            ></img>
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
            <p>☑</p>
          </div>
          <List items={items} onDelete={handleDelete} />
        </li>
      </ul>
    </div>
  );
}

export default App;
