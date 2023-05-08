export default class Component {
  constructor(payload) {
    const { tagName = 'div', className = '', state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.el.className = className;
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {}
}
