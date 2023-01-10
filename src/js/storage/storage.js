import { parseJson, toJson } from "../utils/jsonUtils.js";
export default (function () {
  const storageList = ["user", "discussion"];

  return {
    getStorageList() {
      return [...storageList];
    },
    getData(key) {
      if (localStorage.getItem(key))
        return parseJson(localStorage.getItem(key));
      return null;
    },
    setData(key, data) {
      localStorage.setItem(key, toJson(data));
    },
  };
})();
