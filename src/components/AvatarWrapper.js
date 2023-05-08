import Component from './Component.js';

export default class AvatarWrapper extends Component {
  constructor({ className = '', props = {} }) {
    super({ className, props });
  }
  render() {
    const { avatarUrl } = this.props;
    const avatarEl = document.createElement('img');
    avatarEl.className = 'discussion__avatar--image';
    avatarEl.src = avatarUrl;
    this.el.appendChild(avatarEl);
  }
}
