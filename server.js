/*************************************/
/***** 1. Importing node modules *****/
/*************************************/

// import config from './config';
// import "config.js" file but var's in config.js are not global and won't be available here
// can read default exported properties from config.js (e.g. "port: env.PORT || 8080")

// import config, { nodeEnv, logMessage } from './config';
// use "{ nodeEnv }" syntax to import non-default export

// test in terminal: babel-node server.js
// console.log(config, nodeEnv);
// logMessage('Hello World!');


/***************************************/
/***** 2. Using HTTP/HTTPS modules *****/
/***************************************/

// --> using HTTPS module as CLIENT
// import https from 'https';
// https.get('https://www.lynda.com', res => {
// callback from this get mothod receives response string, 'res'
//     console.log('Response status code: ', res.statusCode); // read the 'statusCode' method
    
//      res.on('data', chunk => { // listen for 'data' events on the 'res' string
//          console.log(chunk.toString()); // every event gives us 'chunk' buffer
//      }); // this is BIG, so test in terminal: babel-node server.js | less
// });

// --> using HTTP module as SERVER
// import http from 'http';
// const server = http.createServer(); // create server
// server.listen(8080); // run server on port 8080
// server.on('request', (req, res) => {
// using 'createServer' method gives us event emmiter object which we can subscribe to as shown above^
// the most important emmitted event = 'request', gets emmitted every time the http server receives a request
// callback receives 2 objects = 'req' request & 'res'  response
// req ex) url requested, query string
// res ex) user initiating request will see anything we write

    // res.write('HelloHTTP!\n'); // write to requestor
    // setTimeout(() => {
    //     res.write('I can stream!\n');
    //     res.end(); // terminate response
    // }, 3000); // write to requestor 3 sec later
    // test in terminal: babel-node server.js
    // then in separate terminal: curl http://localhost:8080/
    // can test on browser but doesn't stream
// });

// ^ short-hand: ***
// const server = http.createServer((req, res) => {
//     res.write('HelloHTTP!\n');
//     setTimeout(() => {
//         res.write('I can stream!\n');
//         res.end();
//     }, 3000);
// });
// server.listen(8080);


/*****************************************/
/***** 3. Creating server w/ Express *****/
/*****************************************/

import config from './config';

import express from 'express';
const server = express(); // create server by invoking imported express variable as function

// listen to single request event
server.listen(config.port, () => { // 2nd arg = success handler
    console.info('Express listening on port: ', config.port);
});

// handle server-side routing, exposing API to litsen to certain routes
server.get('/', (req, res) => {
    // 1st arg: speficy route we're interested in, root (/) in this case
    // 2nd arg: event handler
        res.send('Hello Express!\n');
});

// test in terminal: npm start
    // can do that because in package.json:
    // "start": "nodemon --exec babel-node server.js --ignore public/"
// then in separate terminal: curl http://localhost:8080/

// --> routing to /about.html
// server.get('/about.html', (req, res) => {
//     // 1st arg: speficy route we're interested in, root (/) in this case
//     // 2nd arg: event handler
//         res.send('The about page\n');
// });

// curl http://localhost:8080/about.html

// --> reading diff. file using 'fs'
// import fs from 'fs'; // use this core module to import other files
// server.get('/about.html', (req, res) => {
//     fs.readFile('./about.html', (err, data) => {
//     // api == 'readFile'
//     // 1st arg: path to the file
//     // 2nd arg: callback gives access to 'data' as buffer
//         res.send(data.toString());
//     });
// });

// --> simplify ^ using static middleware to automatically serve static assets like simple html pages
server.use(express.static('public')); // ***
// '.use' to use middleware in Express
// 'public' is where we want our static assets to be hosted on the file system
// don't need to use 'fs' module
// NEED TO move 'about.html' file into the 'public' folder

// in prod, should manage static assets separately from node servers, since there are much faster options like nginx
// in dev, could use simple express middleware


/*******************************************************/
/***** 4. Managing a group of routes using Express *****/
/*******************************************************/
// for example, api folder (go to ./api/index.js)

import apiRouter from './api'; // import
server.use('/api', apiRouter); // then use just like any other Express middleware
// 1st arg: route prefix
// 2nd arg: name

// test by going to http://localhost:8080/api