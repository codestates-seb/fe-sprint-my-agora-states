import { agoraStatesDiscussions } from './common/data/data.js';
import { $ } from './common/utils/dom.js';
import { getLocalStorage, setLocalStroage } from './common/utils/localStorage.js';
import Section1 from './Components/Section1.js';
import Section2 from './Components/Section2.js';
import Section3 from './Components/Section3.js';
import Component from './Core/component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
    // 초기 로컬 스토리지 세팅
    this.initLocalStorage();
  }

  async initialState() {
    this.setState({ ...this.props, data: getLocalStorage('data'), pageThresholdNum: -10 });
  }

  template() {
    return `
    <main>
      <h1 id="title">My Agora States</h1>
      <section class="form__container"></section>
      <section class="discussion__wrapper"></section>
      <section class="page__nation"></section>
    </main>
    `;
  }

  componentDidMount() {
    new Section1($('.form__container'), { ...this.state, updateData: this.updataData.bind(this) });

    new Section2($('.discussion__wrapper'), { ...this.state });

    new Section3($('.page__nation'), { ...this.state });
  }

  initLocalStorage() {
    const dataToCopy = [...agoraStatesDiscussions];

    let data = dataToCopy.slice();

    if (getLocalStorage('data') === null) {
      setLocalStroage('data', data);
    }

    return data;
  }

  updataData(newItem) {
    const { data } = this.state;

    const newData = data.concat(newItem);

    data.push({ dd: '' });

    setLocalStroage('data', newData);

    this.setState({
      ...this.state,
      data: newData,
    });
  }
}
