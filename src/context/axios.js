import axios from 'axios';

export default axios.create({
	baseURL: 'https://pa-shop-api.up.railway.app',
	// baseURL: 'http://192.168.2.3:8080',
});
