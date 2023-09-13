import agoraStatesDiscussions from '../model/data.js';
import { render, showSuccessMsg, renderMode } from './render.js';

let state = {
  discussions: [],
  totalPage: 0,
  currentPage: 0,
  currentFilter: 'all',
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

const completeSubmit = () => {
  isSuccess = true;

  showSuccessMsg(isSuccess);

  isSuccess = false;
};

const changePage = (targetPage) => {
  const currentPage = targetPage === 'totalPage' ? state.totalPage : targetPage;

  setState({ ...state, currentPage });
};

const changeFilter = (targetFilter) => {
  const currentPage = 1;
  const totalPage =
    targetFilter === 'unchecked'
      ? Math.ceil(state.discussions.filter(({ answer }) => !answer).length / 10)
      : targetFilter === 'checked'
      ? Math.ceil(state.discussions.filter(({ answer }) => answer).length / 10)
      : Math.ceil(JSON.parse(localStorage.getItem('state')).discussions.length / 10);
    
  setState({ ...state, currentFilter: targetFilter, currentPage, totalPage });
};

const changeModeState = (newMode) => {
  currentMode = newMode;

  renderMode(currentMode);
};

export {
  fetchState,
  addDiscussion,
  completeSubmit,
  changePage,
  changeFilter,
  changeModeState,
};
