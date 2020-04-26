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

// router.get('/contests', (req, res) => { // we can get to it with /api/contests
//     res.send({ contests: data.contests });
// });
// // can test on browser: http://localhost:8080/api/contests
// // continue in App.js

// export default router;


/**************************************************/
/***** 22. Looking up contest on route change *****/
/**************************************************/

// change the contest structure from array to object,
// since scanning array to lookup id is inefficient
// (changing it to object will change it to constant time operation)

const contests = data.contests.reduce((obj, contest) => {
    obj[contest.id] = contest; // key = contest.id, value = contest itself
    return obj;
}, {});

router.get('/contests', (req, res) => {
    res.send({
        // use 'reduce' to change array to object
        // contests: data.contests.reduce((obj, contest) => {
        //     obj[contest.id] = contest; // key = contest.id, value = contest itself
        //     return obj;
        // }, {})
        // ^ extract this into a variable instead of doing the conversion on the request itself
        // and put the variable on server load (see 'const contests' above)
        // so that we do that operation ONCE
        // now it looks like this:
        contests: contests

        // also change the App to read an object instead of an array
        // doesn't actually 'read' in App --> reads in ContestLists
    });
});

export default router;
