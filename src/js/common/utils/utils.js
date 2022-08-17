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

export const generateUserId = () => {
  const array = new Uint32Array(30);
  const encryptedNumbers = window.crypto.getRandomValues(array);
  const userId = `D_${encryptedNumbers[0]}`;

  return userId;
};
