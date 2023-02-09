import { get, post } from './utils.js';

export default function Store() {
  this.getItemsByFilter = async filter => {
    try {
      return await get(`http://localhost:4000/discussions?filter=${filter}`);
    } catch (error) {
      console.error('Store GET 요청 실패 ' + error);
      return ['error'];
    }
  };

  this.createItem = async newItem => {
    try {
      return await post('http://localhost:4000/discussions', newItem);
    } catch (error) {
      console.error('Store POST 요청 실패 ' + error);
      return;
    }
  };
}
