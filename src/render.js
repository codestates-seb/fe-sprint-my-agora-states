import { convertToDiscussion } from "./convertDiscussion.js";

export const render = (element) => {
  for (let i = 0; i < 4; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
