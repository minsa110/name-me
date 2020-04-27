/***********************************************************************/
/***** 31. Script to use MongoDB’s auto-generated ObjectId’s (_id) *****/
/***********************************************************************/

import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);

  let contestCount = 0;
  client.db('test').collection('contests').find({}).each((err, contest) => {
    assert.equal(null, err);
    if (!contest) { return; }

    contestCount++;
    client.db('test').collection('names')
      .find({ id: { $in: contest.nameIds }})
      .project({ _id: 1 })
      .toArray()
      .then(_ids => {
        const newIds = _ids.map(o => o._id);
        client.db('test').collection('contests').updateOne(
          { id: contest.id },
          { $set: { nameIds: newIds } }
        ).then(() => {
          console.info('Updated', contest._id);
          contestCount--;
          if (contestCount === 0) { client.close(); }
        });
      })
      .catch(console.error);
  });

});

// update using this script in terminal: babel-node updateTestData.js


/************************************************/
/***** 32. Changing UI to use MongoDB's _id *****/
/************************************************/

// find out which files need to be changed in terminal: git grep "\.id"
// then change in all files shown (32. _id change):
    // ./api/index.js
    // ./serverRender.js
    // ./src/components/App.js
    // ./src/components/ContestPreview.js
// then first test api's (make sure they're indexing by _id):
    // http://localhost:8080/api/contests
    // http://localhost:8080/api/contests/5ea754b6e8892f9a59968d30
    // http://localhost:8080/api/names/5ea75227c485419a13a94978,5ea75227c485419a13a94979
