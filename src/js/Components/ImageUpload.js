import { $ } from '../../index.js';
import { generateUserId } from '../common/utils/utils.js';
import Component from '../Core/component.js';

export default class ImageUpload extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
    <input type="file" class="image_upload" accept="image/* png" >
    <input type="submit" id="image_submit_btn" name="profile_image" value="Upload your profile image">
    <div id="uploaded_image" width="50px"></div>
    `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.id === 'image_submit_btn') {
        $('.image_upload').click();
      }
    });

    let uploaded_image = '';

    this.$target.addEventListener('change', ({ target }) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        uploaded_image = reader.result;
        this.handleProfileUrl(uploaded_image);

        $('#uploaded_image').style.backgroundImage = `url(${uploaded_image})`;
        $('#uploaded_image').style.backgroundSize = '50px';
      });

      reader.readAsDataURL(target.files[0]);
    });
  }

  handleProfileUrl(url) {
    let { updateProfile } = this.props;

    let id = generateUserId();

    updateProfile(id, url);
  }
}
