/*****************************************************/
/***** 18. Fetch data from a separate api server *****/
/*****************************************************/

import config from './config';
import axios from 'axios';

// axios.get(`${config.serverUrl}/api/contests`) // url shouldn't be hardcoded here, should be read from the configuration
// // configure exported host and url in config.js
// // then import the config
//     .then(resp => {
//         console.log(resp.data);
//     })
//     // then import this file into server.js to trigger this ^ code


/*************************************************************************************************************/
/***** 19. Render React components on the server using fetched API data using the ReactDOMServer package *****/
/*************************************************************************************************************/

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';
// also need to import ^ top level of the React application

// axios.get(`${config.serverUrl}/api/contests`)
//     .then(resp => {
//         // ReactDOMServer.renderToString(<App />); // give it our own template, "App"
//         // ^ this will read the React code from App and renders everything to string
//         // but can't pass the data, which depends on the state...
//         // so, need to make it able to redner 'contests' using initial data in ./src/index.js
//         // after passing in initialContests as an empty array in ./src/index.js,
//         // then change the state of 'contests' in ./src/components/App.js

//         // ... then specify initial data here because we want to read it from the response and render that data
//         ReactDOMServer.renderToString(
//             <App initialContests={resp.data.contests} />
//         );
//         // ^ NOW, the App component initialized with the actual data

//         // want to feed this exact string to EJS template, but it's inside a promise...
//             // (remember, the whole axios call returns a promise)
//         // so do the following -->
//     });

// wrap ^ in a function that returns a promise
// const serverRender =() =>
//     axios.get(`${config.serverUrl}/api/contests`)
//     .then(resp => {
//         return ReactDOMServer.renderToString(
//             <App initialContests={resp.data.contests} />
//         );
//     });

// // then export default this ^ function
// export default serverRender;
// // then in ./server.js, import this instead of importing the file directly

// const serverRender =() =>
//     axios.get(`${config.serverUrl}/api/contests`)
//     .then(resp => {
//         return {
//             initialMarkup: ReactDOMServer.renderToString(
//                 <App initialContests={resp.data.contests} />
//             ),
//             initialData: resp.data
//             // will also need to modify ./server.js to match so that it includes both of these in the EJS
//         };
//     });
    
// export default serverRender;


/********************************/
/***** 24. Code refactoring *****/
/********************************/

// const serverRender =() =>
//     axios.get(`${config.serverUrl}/api/contests`)
//     .then(resp => {
//         return {
//             initialMarkup: ReactDOMServer.renderToString(
//                 // <App initialContests={resp.data.contests} />
//                 // ^ actually not a valid way of passing in the data
//                 // because initial structure of the data for when refreshing the main page
//                 // is diff. from refreshing the contest page
//                 // SO, instead of passing in the initial contests,
//                 // need to pass the INITIAL DATA itself!:
//                 <App initialData={resp.data} />
//                 // ^ this way, we can control the initial structure that we pass to the App component
//                 // and it can account for EITHER list of contests or a current contest

//                 // to make THAT happen, need to change our app in ./src/index.js
//             ),
//             initialData: resp.data
//         };
//     });
    
// export default serverRender;


/****************************************************************/
/***** 25. Server-side routing for individual contest pages *****/
/****************************************************************/

// get the api url based on the contest ID
const getApiUrl = contestId => {
    if (contestId) {
        return `${config.serverUrl}/api/contests/${contestId}` // append current contest ID
    }
    return `${config.serverUrl}/api/contests`;
}

// read the initial data that we want based on what we're requesting,
// based on the contest ID and api data (retrieved from serverRender below)
const getInitialData = (contestId, apiData) => {
    if (contestId) {
        return { // if we have the contestId, return an OBJECT of the current contest ID
            currentContestId: apiData.id, // here, apiData is a single object that represents a single contest
            // but also need to render the list of contests here (e.g. contests: [])
            // since React application calculates the current contest from the current contest ID (see 'currentContest()' from App.js)
            // but since 'apiData' is for a single object...
            // FAKE IT by returning an object with just ONE contest that represents the current contest:
            contests: {
                [apiData.id]: apiData
            }
        }
    }
    return { // default case = return the list of contests
        contests: apiData.contests
    };
};

const serverRender = (contestId) =>
// 'contestId' passed in from ./server.js
// and based on that, the url and the data will be different
// so create functions (see above) and use them below
    axios.get(getApiUrl(contestId)) // 'contestId' will be 'undefined' -- see ./server.js
    .then(resp => {
        const initialData = getInitialData(contestId, resp.data);
        // ^ then use this below in <App...> and in 'initialData'
        return {
            initialMarkup: ReactDOMServer.renderToString(
                <App initialData={initialData} />
            ),
            // initialData: resp.data
            initialData // same as initialData: initialData
        };
    });
    
export default serverRender;

// SO... now, if refreshed, the page renders the content for a single contest from the server
// can test: curl http://localhost:8080/contest/1
// should give us the HTML directly for that contest
