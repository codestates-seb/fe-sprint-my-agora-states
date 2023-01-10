import { map } from "../utils/functional.js";
import storage from "./storage.js";
import { agoraStatesDiscussions } from "../data/data.js";

export const storageAPI = {
  setInitialStorage() {
    const storageList = storage.getStorageList();
    map(
      (a) => (!storage.getData(a) ? storage.setData(a, {}) : ""),
      storageList
    );

    const dObj = {};
    agoraStatesDiscussions.forEach((e) => {
      dObj[e.id] = e;
    });

    if (Object.keys(storage.getData("discussion")).length === 0) {
      storage.setData("discussion", dObj);
    }
  },
};
