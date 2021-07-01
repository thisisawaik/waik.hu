import * as axiosbase from 'axios';
const axios = axiosbase.default;

setInterval(() => {
    axios.get('http://localhost:4000/').catch(e => {
        console.log(e);
    });
}, 5000);