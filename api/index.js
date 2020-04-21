import express from 'express';

/*******************************************************/
/***** 4. Managing a group of routes using Express *****/
/*******************************************************/

// --> manage a group of routes in their own module
const router = express.Router(); // create route object

router.get('/', (req, res) => { // this is an api call
    res.send({ data: [] }); // so send a json response
});

export default router; // need this to be able to use the router