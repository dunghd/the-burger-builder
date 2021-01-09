import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-c95b7-default-rtdb.firebaseio.com/'
});

export default instance;