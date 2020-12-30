import axios from 'axios';

const instance =  axios.create({
    baseURL: 'https://react-burger-app-nhsltn-default-rtdb.firebaseio.com/'
});

export default instance;