import Component from './Component.js';

export default class AvatarWrapper extends Component {
  constructor({ className = '', props = {} }) {
    super({ className, props });
  }
  render() {
    const { avatarUrl } = this.props;
    const avatar = document.createElement('img');
    avatar.className = 'discussion__avatar--image';
    avatar.src = avatarUrl;
    this.el.appendChild(avatar);
  }
}
