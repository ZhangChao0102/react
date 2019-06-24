import axios from 'axios';

axios.defaults.baseURL = `${window.location.origin}`;
axios.defaults.headers.common['token'] = '202f4a80-1082-4072-83bd-8ca02a3d3c74';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Cookie'] = 'token-development=202f4a80-1082-4072-83bd-8ca02a3d3c74';

export default axios;