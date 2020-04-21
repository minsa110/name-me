import config, { nodeEnv, logMessage } from './config';
// use "{ nodeEnv }" syntax to import non-default export

// import config from './config';
// import "config.js" file but var's in config.js are not global and won't be available here
// can read default exported properties from config.js (e.g. "port: env.PORT || 8080")

// test in terminal: babel-node server.js
// console.log(config, nodeEnv);
logMessage('Hello World!');