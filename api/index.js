import express from 'express';

/*******************************************************/
/***** 4. Managing a group of routes using Express *****/
/*******************************************************/

// --> manage a group of routes in their own module
const router = express.Router(); // create route object

// router.get('/', (req, res) => { // this is an api call
//     res.send({ data: [] }); // so send a json response
// });

// export default router; // need this to be able to use the router


/**********************************************************/
/***** 16. Prepare an API end point to serve the data *****/
/**********************************************************/

import data from '../src/testData'; // for testing purposes

router.get('/contests', (req, res) => { // we can get to it with /api/contests
    res.send({ contests: data.contests });
});
// can test on browser: http://localhost:8080/api/contests
// continue in App.js

export default router;
