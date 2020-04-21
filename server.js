/** Importing node modules **/

// import config from './config';
// import "config.js" file but var's in config.js are not global and won't be available here
// can read default exported properties from config.js (e.g. "port: env.PORT || 8080")

// import config, { nodeEnv, logMessage } from './config';
// use "{ nodeEnv }" syntax to import non-default export

// test in terminal: babel-node server.js
// console.log(config, nodeEnv);
// logMessage('Hello World!');

/** Using HTTP/HTTPS modules **/
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
import http from 'http';
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

// ^ short-hand:
const server = http.createServer((req, res) => {
    res.write('HelloHTTP!\n');
    setTimeout(() => {
        res.write('I can stream!\n');
        res.end();
    }, 3000);
});
server.listen(8080);