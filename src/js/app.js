import { agoraStatesDiscussions } from './common/data/data.js';
import { $ } from './common/utils/dom.js';
import Section1 from './Components/Section1.js';
import Section2 from './Components/Section2.js';
import Component from './Core/component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.setState({ ...this.props });
  }

  template() {
    return `
    <main>
      <h1 id="title">My Agora States</h1>
      <section class="form__container"></section>
      <section class="discussion__wrapper"></section>
    </main>
    `;
  }

  componentDidMount() {
    const { fetchData } = this;

    new Section1($('.form__container'), { ...this.state });

    new Section2($('.discussion__wrapper'), { ...this.state, getUserData: fetchData.bind(this) });
  }

  fetchData() {
    const data = [...agoraStatesDiscussions];

    return data;
  }
}

// const convertToDiscussion = (obj) => {
//   const li = document.createElement('li'); // li 요소 생성
//   li.className = 'discussion__container'; // 클래스 이름 지정

//   const avatarWrapper = document.createElement('div');
//   avatarWrapper.className = 'discussion__avatar--wrapper';
//   const discussionContent = document.createElement('div');
//   discussionContent.className = 'discussion__content';
//   const discussionAnswered = document.createElement('div');
//   discussionAnswered.className = 'discussion__answered';

//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector('ul.discussions__container');
// render(ul);
