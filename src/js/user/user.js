import { filter, go, map } from "../utils/functional.js";
import { log } from "../utils/log.js";

export const user = (() => {
  let currentUser = "";
  let observers = [];
  return {
    getSubscribers() {
      return observers;
    },
    subscribe(component) {
      observers.push(component);
    },
    unSubscribe(component) {
      observers = filter((a) => a !== component, observers);
    },
    notifyAll() {
      go(
        observers,
        map((a) => a.setState({ userId: currentUser }))
      );
    },
    getCurrentUser() {
      return currentUser;
    },
    setCurrentUser(userId) {
      currentUser = userId;
    },
  };
})();
