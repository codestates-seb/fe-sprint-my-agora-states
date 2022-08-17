import { $ } from '../index.js';
import { LOCALSTORAGE, NUMBER, EMPTY, PAGE } from './common/constants/constants.js';
import { fetchDiscussions } from './common/data/api.js';
import { agoraStatesDiscussions } from './common/data/data.js';
import { getLocalStorage, setLocalStorage } from './common/utils/localStorage.js';
import { getCurrentTime } from './common/utils/utils.js';
import ImageUpload from './Components/ImageUpload.js';
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
    this.setState({
      ...this.props,
      data: getLocalStorage(LOCALSTORAGE.PROPERTY_DATA) === null ? agoraStatesDiscussions : getLocalStorage(LOCALSTORAGE.PROPERTY_DATA),
      pageStartNum: -10,
      pageEndNum: 9999,
      currentPage: NUMBER.ZERO,
      postingTime: EMPTY,
      user: [],
    });
  }

  template() {
    return `
      <main>
        <h1 id="title">My Agora States</h1>
        <div class="profile_container"></div>
        <section class="form__container"></section>
        <section class="discussion__wrapper"></section>
        <section class="page__nation"></section>
      </main>
    `;
  }

  componentDidMount() {
    const { updateData, handleCurrentTime, handleCurrentPage, onClickPage, handleProfileUrl, onClickPageIndicator } = this;

    new ImageUpload($('.profile_container'), { ...this.state, updateProfile: handleProfileUrl.bind(this) });

    new Section1($('.form__container'), { ...this.state, updateData: updateData.bind(this), updateTime: handleCurrentTime.bind(this) });

    new Section2($('.discussion__wrapper'), { ...this.state });

    new Section3($('.page__nation'), {
      ...this.state,
      updateCurrentPage: handleCurrentPage.bind(this),
      updatePages: onClickPage.bind(this),
      handleIndicator: onClickPageIndicator.bind(this),
    });
  }

  updateData(newItem) {
    const { data } = this.state;

    const newData = data.concat(newItem);

    setLocalStorage(LOCALSTORAGE.PROPERTY_DATA, newData);

    this.setState({
      ...this.state,
      data: newData,
    });
  }

  async initLocalStorage() {
    const dataToCopy = [...(await fetchDiscussions())];

    let data = dataToCopy.slice();

    if (getLocalStorage(LOCALSTORAGE.PROPERTY_DATA) === null) {
      setLocalStorage(LOCALSTORAGE.PROPERTY_DATA, data);
    }

    if (getLocalStorage(LOCALSTORAGE.PROPERTY_USER) === null) {
      setLocalStorage(LOCALSTORAGE.PROPERTY_USER, this.state.user);
    }

    return data;
  }

  handleCurrentTime() {
    const currentTime = getCurrentTime();

    this.setState({
      ...this.state,
      postingTime: currentTime,
    });
  }

  handleCurrentPage(page) {
    this.setState({
      ...this.state,
      currentPage: Number(page),
    });
  }

  onClickPage() {
    let { currentPage, pageStartNum, pageEndNum } = this.state;

    pageStartNum = NUMBER.ZERO - 10 * currentPage;

    pageEndNum = pageStartNum === -10 ? (pageEndNum = 9999) : (pageEndNum = pageStartNum + 10);

    this.setState({
      ...this.state,
      pageStartNum,
      pageEndNum,
    });
  }

  onClickPageIndicator(indicator) {
    let { currentPage, pageStartNum, pageEndNum, data } = this.state;

    const lengthOfDataArray = data ? data.length : NUMBER.MAX_LENGTH;
    const maxPageNumber = Math.ceil(lengthOfDataArray / 10);

    if (indicator === PAGE.LEFT_INDICATOR) {
      currentPage -= 1;
      if (currentPage < 0) return;
    } else if (indicator === PAGE.RIGHT_INDICATOR) {
      currentPage += 1;
      if (currentPage > maxPageNumber) return;
    }

    pageStartNum = NUMBER.ZERO - 10 * currentPage;

    pageEndNum = pageStartNum === -10 ? (pageEndNum = 9999) : (pageEndNum = pageStartNum + 10);

    this.setState({
      ...this.state,
      pageStartNum,
      pageEndNum,
      currentPage,
    });
  }

  handleProfileUrl(id, url) {
    const newUser = { id, profileUrl: url };

    const newArray = getLocalStorage(LOCALSTORAGE.PROPERTY_USER).concat(newUser);

    setLocalStorage(LOCALSTORAGE.PROPERTY_USER, newArray);

    this.setState({
      ...this.state,
      user: newArray,
    });
  }
}
