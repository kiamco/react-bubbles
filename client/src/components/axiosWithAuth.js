import axios from 'axios';

const AxiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    })
}

export default AxiosWithAuth;