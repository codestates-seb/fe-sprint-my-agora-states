import { user } from "./user/user.js";
import { storageAPI } from "./storage/storageAPI.js";
import Header from "./components/layout/Header.js";
import { $ } from "./utils/query.js";
import Main from "./components/layout/Main.js";
export default function App($app) {
  this.setUp = () => {
    storageAPI.setInitialStorage();
    user.setCurrentUser("");
  };
  this.setUp();

  this.state = {};

  const header = new Header($app, { userId: user.getCurrentUser() });
  const main = new Main($app);
}
