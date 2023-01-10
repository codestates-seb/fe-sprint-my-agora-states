import Store from './Store.js';
import AddForm from './AddForm.js';
import Discussions from './Discussions.js';

const INITIAL_FILTER = 'All';

export default function App() {
  this.currentFilter = INITIAL_FILTER;

  const addNewItem = newItem => {
    store.addItem(newItem);
    render();
  };

  const handleFilter = clickedFilter => {
    this.currentFilter = clickedFilter;
    render();
  };

  const render = () => {
    const items = store.getItemsByFilter(this.currentFilter);
    discussions.render(items);
  };

  const store = new Store();
  const addForm = new AddForm({ addNewItem });
  const discussions = new Discussions({ handleFilter, handlePage: render });

  render();
}
