import Component from '../Core/component.js';

export default class Section2 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <ul class="discussions__container">
        <li class="discussion__container">
          <div class="discussion__avatar--wrapper">
            <img
              class="discussion__avatar--image"
              src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
              alt="avatar of kimploo"
            />
          </div>
          <div class="discussion__content">
            <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
            <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
          </div>
          <div class="discussion__answered"><p>☑</p></div>
        </li>
      </ul>
    `;
  }
}
