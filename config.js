const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development' // default to 'dev..'

// export default { // default object
//     port: env.PORT || 8080, // default to 8080
//     host: env.HOST || '0.0.0.0', // will bind to all the IPs on the machine
//     get serverUrl() {
//         return `http://${this.host}:${this.port}`;
//     }
// };

// export const logMessage = function(message) {
//     console.info('Here is your message:');
//     console.info(message); // console.info similar to console.log
// };


/*****************************************/
/***** 28. Reading data from MongoDB *****/
/*****************************************/

export default {
    mongodbUri: 'mongodb://localhost:27017/test', // 'test' is the default db
    // after loading test data 'loadTestData.js', test in terminal: babel-node loadTestData.js (to load data to mongo db)
    // then in new terminal: connect to mongo (mongo), then: db.contests.count()
    port: env.PORT || 8080,
    host: env.HOST || '0.0.0.0',
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
    }
};
