import Store from './Store.js';
import AddForm from './AddForm.js';
import Discussions from './Discussions.js';

const INITIAL_FILTER = 'All';

export default function App() {
  this.currentFilter = INITIAL_FILTER;

  const addItem = async newItem => {
    const addedItemId = await store.createItem(newItem);
    render();
    addForm.clear();
    addForm.focus();
  };

  const handleFilter = clickedFilter => {
    this.currentFilter = clickedFilter;
    render();
  };

  const render = async () => {
    const items = await store.getItemsByFilter(this.currentFilter);
    discussions.render(items);
    addForm.focus();
  };

  const store = new Store();
  const addForm = new AddForm({ addItem });
  const discussions = new Discussions({ handleFilter, handlePage: render });

  render();
}
