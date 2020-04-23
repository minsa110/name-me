/*****************************************************/
/***** 18. Fetch data from a separate api server *****/
/*****************************************************/

import config from './config';
import axios from 'axios';

axios.get(`${config.serverUrl}/api/contests`) // url shouldn't be hardcoded here, should be read from the configuration
// configure exported host and url in config.js
// then import the config
    .then(resp => {
        console.log(resp.data);
    })
    // then import this file into server.js to trigger this ^ code