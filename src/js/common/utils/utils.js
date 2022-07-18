import { agoraStatesDiscussions } from '../data/data.js';

export const getRandomNumber = () => {
  const length = agoraStatesDiscussions.length;

  return Math.floor(Math.random() * length);
};

export const getCurrentTime = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const second = newDate.getSeconds();

  return `${year}-${month}-${date}T${hour}:${minute}:${second}Z`;
};
