const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development' // default to 'dev..'

export default { // default object
    port: env.PORT || 8080, // default to 8080
    host: env.HOST || '0.0.0.0', // will bind to all the IPs on the machine
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
    }
};

// export const logMessage = function(message) {
//     console.info('Here is your message:');
//     console.info(message); // console.info similar to console.log
// };
