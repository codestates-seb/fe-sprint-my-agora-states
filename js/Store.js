import { getLocalStorage, setLocalStorage } from './utils.js';
import agoraStatesDiscussions from './data.js';

const INITIAL_ITEMS = agoraStatesDiscussions;
const STORAGE_KEY = 'codestates_discussion_test';

export default function Store() {
  this.getItems = () => getLocalStorage(STORAGE_KEY) || INITIAL_ITEMS;

  this.setItems = newItems => setLocalStorage(STORAGE_KEY, newItems);

  this.getItemsByFilter = filter => {
    if (filter === 'All') return this.getItems();
    if (filter === 'Answered') return this.getItems().filter(item => !!item.answer);
    if (filter === 'Unanswered') return this.getItems().filter(item => !item.answer);
  };

  this.addItem = newItem => {
    const items = [newItem, ...this.getItems()];
    this.setItems(items);
  };
}
