import Store from './Store.js';
import AddForm from './AddForm.js';
import Discussions from './Discussions.js';

const INITIAL_FILTER = 'All';

export default function App() {
  this.currentFilter = INITIAL_FILTER;

  const addItem = async newItem => {
    const addedItemId = await store.createItem(newItem);
    if (!addedItemId) {
      window.alert('추가실패, 다시 시도해보세요.');
      return;
    }
    render();
    addForm.clear();
    addForm.focus();
  };

  const handleFilter = clickedFilter => {
    this.currentFilter = clickedFilter;
    render();
  };

  const render = async () => {
    discussions.renderLoadingIndicator();
    const items = await store.getItemsByFilter(this.currentFilter);
    discussions.render(items);
    addForm.focus();
  };

  const store = new Store();
  const addForm = new AddForm({ addItem });
  const discussions = new Discussions({ handleFilter, handlePage: render });

  render();
}
