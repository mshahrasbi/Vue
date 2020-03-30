
import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://vue-http-abe78.firebaseio.com'
});

instance.defaults.headers.common['SOMETHING'] = 'something';

export default instance;