// import express from 'express';

/*******************************************************/
/***** 4. Managing a group of routes using Express *****/
/*******************************************************/

// --> manage a group of routes in their own module
// const router = express.Router(); // create route object

// router.get('/', (req, res) => { // this is an api call
//     res.send({ data: [] }); // so send a json response
// });

// export default router; // need this to be able to use the router


/**********************************************************/
/***** 16. Prepare an API end point to serve the data *****/
/**********************************************************/

// import data from '../src/testData'; // for testing purposes

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

// const contests = data.contests.reduce((obj, contest) => {
//     obj[contest.id] = contest; // key = contest.id, value = contest itself
//     return obj;
// }, {});

// router.get('/contests', (req, res) => {
//     res.send({
//         // use 'reduce' to change array to object
//         // contests: data.contests.reduce((obj, contest) => {
//         //     obj[contest.id] = contest; // key = contest.id, value = contest itself
//         //     return obj;
//         // }, {})
//         // ^ extract this into a variable instead of doing the conversion on the request itself
//         // and put the variable on server load (see 'const contests' above)
//         // so that we do that operation ONCE
//         // now it looks like this:
//         contests: contests

//         // also change the App to read an object instead of an array
//         // doesn't actually 'read' in App --> reads in ContestLists
//     });
// });

// export default router;


/**************************************************/
/***** 23. Fetching contest info from the API *****/
/**************************************************/

// router.get('/contests/:contestId', (req, res) => { // ':/contestId' = dynamic contest ID in express
//     let contest = contests[req.params.contestId];
//     contest.description = 'me fake';
//     // test in browser: http://localhost:8080/api/contests/3
//     res.send(contest);
//     // then, fetch this info with Ajax in ../src/api.js
// });

// export default router;


/*****************************************/
/***** 28. Reading data from MongoDB *****/
/*****************************************/

import express from 'express';
import { MongoClient, ObjectID } from 'mongodb'; // (32. _id change)
import assert from 'assert'; // to make sure we're not getting any errors when we connect
import config from '../config' // need to import configuration whenever connecting to mongo

// 1.) create mongodb object:
let mdb;
MongoClient.connect(config.mongodbUri, { useUnifiedTopology: true }, (err, db) => { // it's a callback
    assert.equal(null, err); // <-- will raise an error if we have an error

    mdb = db; // assign to global object
    // 
});

const router = express.Router();

router.get('/contests', (req, res) => {
    let contests = {};
    // 2.) now inside the route, we have access to the mdb connected object
    // so find all documents in mongo:
    mdb.db('test').collection('contests').find({}) // gives us a promise
        .project({ // 3.) only project category and contest names ('1' for the fields we want to be included)
            // id: 1, // (32. _id change)
            categoryName: 1,
            contestName: 1
        })
        .each((err, contest) => { // loop ober all the documents (no need to convert to an array since contest = object, != array)
            assert.equal(null, err);

            if (!contest) { // no more contests to process (end of each loop)
                res.send({ contests });
                // ^ return contests as object ('{}') since that's how our React application
                // is reading the information (i.e. our API structure says contests == list of contests)
                return;
            }
            contests[contest._id] = contest; // add it to empty object created above, since this is async
            // (32. _id change)
        });
        // test in browser: http://localhost:8080/api/contests (see all contest information)
});

router.get('/contests/:contestId', (req, res) => {
    // 4.) find one from database by id
    mdb.db('test').collection('contests')
        .findOne({ _id: ObjectID(req.params.contestId) }) // convert string into number
        // ^ (32. _id change)
        .then(contest => res.send(contest))
        // .catch(console.error);
    // test in browser: http://localhost:8080/api/contests/4
        .catch(error => {
            console.error(error);
            res.status(404).send('Bad Request');
        });
});

// export default router;


/*****************************************************/
/***** 29. Creating API to fetch a list of names *****/
/*****************************************************/

// need an api endpoint to fetch the list of names
router.get('/names/:nameIds', (req, res) => {
    const nameIds = req.params.nameIds.split(',').map(ObjectID); // (32. _id change)
    let names = {};
    mdb.db('test').collection('names').find({ _id: { $in: nameIds }}) // (32. _id change)
    // ^ 'id...' = syntax to find list of names based on array
    // basically says: find all the names for all the id's that we passed to the api
        .each((err, name) => {
            assert.equal(null, err);

            if (!name) {
                res.send({ names });
                return;
            }
            names[name._id] = name;
            // (32. _id change)
        });
        // test in browser: http://localhost:8080/api/names/101,102
});

// export default router;


/*******************************************************/
/***** 33. Creating API to post data to the server *****/
/*******************************************************/

// an api end point to propose a name
router.post('/names', (req, res) => { // posting to the '/names' resource
    // need to read the data from the body parameter of Express (req.body)
    // since we will be sending the data for the new name as a JSON object
    // BUT need to parse it from the request first --> use the Express middleware, body-parser:
    // npm i -S body-parser
    // import body-parser in server.js

    // 1.) then test 'post':
    // console.log(req.body);
    // then in Postman:
        // 'POST', http://localhost:8080/api/names
        // Body --> raw --> JSON:
            // {
            //     "test1": 42,
            //     "test2": 43
            // } --> SEND
        // shouldn't receive any response in Postman
        // should see in server log ('npm start' with Espress listening...):
            // { "test1": 42, "test2": 43 }

    // 2.) design api:
    // res.send(req.body);
    // in Postman: (same as above)
        // {
        //     "newName": "Awesome Name",
        //     "contestId": "5ea76c4ce448d49f869bd767" // make sure this is a real id
        // }
        // Postman should echo back the response to be the same
    
    // 3.) apply designed api:
    const contestId = ObjectID(req.body.contestId);
    const name = req.body.newName;
    // validation ...

    // PLAN - return updated contest information + the new name information
    // so that the list of names will be immediately updated in the UI
    // FIRST - insert name
    // SECOND - update contest
    // THIRD - read the modified contest information & return data
        // can combine 2nd & 3rd using mongo's findAndModify

    // FIRST step -
    mdb.db('test').collection('names').insertOne({ name }).then(result =>
        // SECOND & THIRD steps -
        mdb.db('test').collection('contests').findAndModify(
            { _id: contestId }, // 1st arg: query that we want to find an obj for
            [], // 2nd arg: sort, in case the 1st arg returned many records, how to sort to pick the first element to modify
            { $push: { nameIds: result.insertedId } }, // 3rd arg: what needs to be modified
                // ^ modify nameId's property in the contest && push the newly generated nameId
                // push an object ('{}')
                // push to 'nameIds' field... the newly generated name ID (which we can read from the result object in the promise)
                // the insertedId will have the automatically generated _id object
            { new: true } // 4th arg: specify option (new: true so that findAndModify call will return the updated document)
        ).then(doc => // this findAndModify also returns a promise that exposes the document
            res.send({ // respond with data
                updatedContest: doc.value, // the actual doc we updated
                newName: { _id: result.insertedId, name } // new name object
            })
        )
    )
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
    // in Postman: (same as above)
    // {
    //     "newName": "Awesome Name",
    //     "contestId": "5ea76c4ce448d49f869bd767" // make sure this is a real id
    // }
    // should get back newName and its associated _id in the 'nameIds' field in 'updatedContest'
});

export default router;
