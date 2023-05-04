import agoraStatesDiscussions from './data.js';
import { render, showSuccessMsg, changeMode } from './render.js';

let state = {
  discussions: [],
  currentPage: 0,
  totalPage: 0,
};
let isSuccess = false;
let currentMode = 'light';

const setState = (newState) => {
  state = { ...state, ...newState };

  localStorage.setItem('state', JSON.stringify(state));

  render(state);
};

const convertKoreanDate = (date) => new Date(date).toLocaleString();

const fetchState = () => {
  const initialState = {
    discussions: agoraStatesDiscussions.map((state) => ({
      ...state,
      createdAt: convertKoreanDate(state.createdAt),
    })),
    currentPage: 1,
    totalPage: Math.ceil(agoraStatesDiscussions.length / 10),
  };
  const { discussions, currentPage, totalPage } =
    JSON.parse(localStorage.getItem('state')) || initialState;

  setState({ discussions, currentPage, totalPage });
};

const addDiscussion = (newDiscussion) => {
  const discussions = [newDiscussion, ...state.discussions];

  setState({
    ...state,
    discussions,
    totalPage: Math.ceil(discussions.length / 10),
  });
};

const changePage = (targetPage) => {
  const currentPage = targetPage === 'totalPage' ? state.totalPage : targetPage;
  console.log(currentPage);

  setState({ ...state, currentPage });
};

const completeSubmit = () => {
  isSuccess = true;

  const newSuccessState = showSuccessMsg(isSuccess);

  isSuccess = newSuccessState;
};

const changeModeState = (newMode) => {
  currentMode = newMode;

  changeMode(currentMode);
};

export {
  fetchState,
  addDiscussion,
  changePage,
  completeSubmit,
  changeModeState,
};
