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

// import config from './config';

// import express from 'express';
// const server = express(); // create server by invoking imported express variable as function

// // listen to single request event
// server.listen(config.port, () => { // 2nd arg = success handler
//     console.info('Express listening on port: ', config.port);
// });

// handle server-side routing, exposing API to litsen to certain routes
// server.get('/', (req, res) => {
//     // 1st arg: speficy route we're interested in, root (/) in this case
//     // 2nd arg: event handler
//         res.send('Hello Express!\n');
// });

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
// server.use(express.static('public')); // ***
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

// import apiRouter from './api'; // import
// server.use('/api', apiRouter); // then use just like any other Express middleware
// 1st arg: route prefix
// 2nd arg: name

// test by going to http://localhost:8080/api


/**********************************************/
/***** 5. Using the EJS template language *****/
/**********************************************/

// dynamic template language in html pages
// EJS = embedded JavaScript
// using it in this project to render front-end components
// need to install as dependency: npm i -S ejs

// server.set('view engine', 'ejs'); // setup EJS to be used with Express ***
// sets the view engine to be ejs
// by default, Express looks for ejs template under 'views' folder in root
// go to ./views/index.ejs
    // ejs are html files with JavaScript embedded in them using <%= ... %>

// render ejs template on root level
// server.get('/', (req, res) => {
//         res.render('index');
//         // instead of: res.send('Hello Express!\n');
// });
// and instead of: server.use(express.static('public'));

// server.get('/', (req, res) => {
//     res.render('index', {
//         content: 'Hello Express and <b>EJS</b>!' // pass in a string as content
//         // use in ./views/index.ejs
//     });
// });


/**************************************************************/
/************************* clean code *************************/
/*************** and using Sass with Node (14.) ***************/
/**************************************************************/


// import config from './config';
// import apiRouter from './api';
// import sassMiddleware from 'node-sass-middleware';
// import path from 'path'; // a built-in node module

// import express from 'express';
// const server = express();

// // to use sass...
// server.use(sassMiddleware({ // a function that takes an object
//     // specify configuration we want to work with this middleware
//     src: path.join(__dirname, 'sass'), // to read the sass files from (use path library to work with these directories)
//         // '__dirname' = starting from the current directory
//         // and joining the 'sass' folder
//     dest: path.join(__dirname, 'public') // to write the generated css
// }));
// // then go to header.ejs to add css stylesheet

// server.set('view engine', 'ejs');

// server.get('/', (req, res) => {
//   res.render('index', {
//     content: '...'
//   });
// });

// server.use('/api', apiRouter);
// server.use(express.static('public'));

// server.listen(config.port, () => {
//   console.info('Express listening on port', config.port);
// });


/*****************************************************/
/***** 18. Fetch data from a separate api server *****/
/*****************************************************/

import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import express from 'express';
const server = express();

// to use sass...
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

// import './serverRender'
// server.get('/', (req, res) => {
//   res.render('index', {
//     content: '...'
//   });
// });

// server.use('/api', apiRouter);
// server.use(express.static('public'));

// server.listen(config.port, config.host, () => {
//   // ^ listen to host as well so that it will bind to the same host that we have
//   console.info('Express listening on port', config.port);
// });


/*************************************************************************************************************/
/***** 19. Render React components on the server using fetched API data using the ReactDOMServer package *****/
/*************************************************************************************************************/

server.set('view engine', 'ejs');

// import serverRender from './serverRender'; // import the default export instead of the file itself
// server.get('/', (req, res) => {
//   serverRender() // can now call the serverRender as function (which returns a promise, so do '.then')
//     .then(content => { // this now gives us the content that we want to feed into the EJS template
//       res.render('index', {
//         content // render the content in EJS
//         // can test: curl http://localhost:8080/
//         // should be able to read the data, coming directly from the ReactDOMServer
//       });
//     })
//     .catch(console.error);
// });

// server.use('/api', apiRouter);
// server.use(express.static('public'));

// server.listen(config.port, config.host, () => {
//   console.info('Express listening on port', config.port);
// });

import serverRender from './serverRender';
// server.get('/', (req, res) => {
//   serverRender()
//     .then(( {initialMarkup, initialData} ) => { // need to destructure using '{}'
//       res.render('index', {
//         initialMarkup,
//         initialData
//         // ^ render both the content and the data (from axios call in ./serverRender)
//         // then make necessary changes in views/index.ejs where we're rendering the content
//       });
//     })
//     .catch(console.error);
// });

// server.use('/api', apiRouter);
// server.use(express.static('public'));

// server.listen(config.port, config.host, () => {
//   console.info('Express listening on port', config.port);
// });


/****************************************************************/
/***** 25. Server-side routing for individual contest pages *****/
/****************************************************************/

// server.get(['/', '/contest/:contestId'], (req, res) => {
//   // ^ also handle '/contest' case
//   // so, pass multiple routes (can do this in Express) using '[]'
//   // and use conditional logic using req.params.contestId:
//   serverRender(req.params.contestId) // <-- pass in the contest ID to serverRender in ./serverRender.js
//   // in serverRender.js, used in functions: 'getApiUrl' and 'getInitialData'
//     .then(( {initialMarkup, initialData} ) => {
//       res.render('index', {
//         initialMarkup,
//         initialData
//       });
//     })
//     .catch(console.error);
// });

// server.use('/api', apiRouter);
// server.use(express.static('public'));

// server.listen(config.port, config.host, () => {
//   console.info('Express listening on port', config.port);
// });


/************************************************/
/***** 32. Changing UI to use MongoDB's _id *****/
/************************************************/

server.get(['/', '/contest/:contestId'], (req, res) => {
  // ^ also handle '/contest' case
  // so, pass multiple routes (can do this in Express) using '[]'
  // and use conditional logic using req.params.contestId:
  serverRender(req.params.contestId) // <-- pass in the contest ID to serverRender in ./serverRender.js
  // in serverRender.js, used in functions: 'getApiUrl' and 'getInitialData'
    .then(( {initialMarkup, initialData} ) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      // res.send(error.toString()); // show the error in UI
      // but should send 404 instead:
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
