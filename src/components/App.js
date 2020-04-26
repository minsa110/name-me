import React from 'react';
import Header from './Header';
// ^ can be read as "this module depends on react and the Header component"

// const App = () => { // stateless function component
//     return (
//         <div className="App"> {/* need to wrap multiple html tags in one div */}
//             <Header message="Name me! - by Soojin" />
//             <div>
//                 ...
//             </div>
//         </div>
//     );
// };

// export default App;

/*************************************************/
/***** 10. Working w/ React component states *****/
/*************************************************/

// --> make the Header message dynamic based on where in the App the client is

// need to change ^ into class-based component
// old way = React.createClass ...
// when state is changed, React will react && re-render the DOM

// class App extends React.Component {
// // only use for components w/ states or with component life cycle
//     // constructor(props) { // use constructor to introduce states
//     //     super(props);
//     //     this.state = { test: 42 };
//     // }
//     // for ^, can use class property
//     state = { 
//         pageHeader: 'Name Me! :)'
//      };
//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 <div>
//                     ...
//                 </div>
//             </div>
//         );
//     }
// }

// export default App;


/******************************************/
/***** 11. React component life cycle *****/
/******************************************/

// 1. gets mounted on DOM
// 2. could get updated
// 3. could get removed
// can write code to invoke custom behaviors

// class App extends React.Component {
//         state = { 
//             pageHeader: 'Name Me! :)'
//          };
//          // one of the most important life cycle:
//          componentDidMount() {
//         // guarantees DOM has been mounted in the browser successfully
//         // integrate code w/ 3rd party plug-in that depends on the fact that the app HAS the DOM, insert integration code here
//         // ajax fetching, timers firing, event listeners usually done in here
//             //  console.log('did Mount');
//             //  debugger; // to debug in browser
//          }
//          componentWillUnmount() {
//         // comp. about to be unmounted
//         // clean timers, listeners
//             // console.log('will Unmount');
//          }
//         render() {
//             return (
//                 <div className="App">
//                     <Header message={this.state.pageHeader} />
//                     <div>
//                         ...
//                     </div>
//                 </div>
//             );
//         }
//     }
    
//     export default App;


/***********************************************************/
/***** 13. Displaying loaded data as a list of objects *****/
/***********************************************************/

// create a new component to represent a single contest (i.e. create a file, ./ContestPreview.js)
// import ContestPreview from './ContestPreview';

// class App extends React.Component {
//     state = { 
//         pageHeader: 'Naming Contests!'
//      };
//      componentDidMount() {
//      }
//      componentWillUnmount() {
//      }
//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 <div>
//                     {/* <ContestPreview {...this.props.contests[0]} /> */}
//                         {/* ^ pass in first element in the array (array = this.props.contests) */}
//                         {/* ^ '...' = spread the object into the ContestPreview, so we get all properties for a contest on the first level */}

//                     {/* loop over all elements from ^ */}
//                     {this.props.contests.map(contest => // expose 'contest' object
//                         <ContestPreview {...contest} />
//                     )}
//                 </div>
//             </div>
//         );
//     }
// }

// export default App;


/**********************************************************/
/***** 15. Handling data read in from API (continued) *****/
/**********************************************************/

// pros of having the data read directly from state:
// - we can have a plan in working with any delay in fetching the data from API
// - allows us to have control the list

// import ContestPreview from './ContestPreview';

// import data from '../testData'; // for testing purposes

// class App extends React.Component {
//     state = { 
//         pageHeader: 'Naming Contests!',
//         contests: [] // 1. render empty array of data (since might not be loaded from API yet)
//      };
//      componentDidMount() {
//          // 3. modify when data is accessible
//          this.setState({
//              contests: data.contests
//          });
//      }
//      componentWillUnmount() {
//      }
//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 <div>
//                     {this.state.contests.map(contest => // 2. read directly from the state instead of the props
//                         // when listing things dynamically in React, need to identify every element with a key
//                         <ContestPreview key={contest.id} {...contest} />
//                         // DO NOT to use array index as unique key
//                     )}
//                 </div>
//             </div>
//         );
//     }
// }

// export default App;

/***************************************************/
/***** 17. Use data from the React application *****/
/***************************************************/

// import axios from 'axios';

// class App extends React.Component {
//     state = { 
//         pageHeader: 'Naming Contests!',
//         contests: []
//      };
//      componentDidMount() {
//         // do an ajax request and fetch the data from the remote API
//         // need library to do the ajax request
//         // use axios: npm i -S axios
//         // and import it above, then:
//         axios.get('/api/contests') // specify the url for the API endpoint that we're going to read
//         // ^ /api/contests, since on the same server for now
//         .then(resp => { // axios is a promise base, so need to handle with 'then' method and 'cath' any errors
//             // console.log(resp); // the response object 'resp' will have the data
//             // ^ after testing, realized that contests data in: resp.data.contests, so:
//             this.setState({
//                 contests: resp.data.contests
//             });
//             // ^ data is now being loaded through an ajax request
//             // and getting set on the React component state
//         }) 
//         .catch(console.error)
//      }
//      componentWillUnmount() {
//      }
//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 <div>
//                     {this.state.contests.map(contest =>
//                         <ContestPreview key={contest.id} {...contest} />
//                     )}
//                 </div>
//             </div>
//         );
//     }
// }

// export default App;


/*************************************************************************************************************/
/***** 19. Render React components on the server using fetched API data using the ReactDOMServer package *****/
/*************************************************************************************************************/

// class App extends React.Component {
//     state = { 
//         pageHeader: 'Naming Contests!',
//         contests: this.props.initialContests // this is actually same as before, since initialized as empty array in ../index.js
//      };
//      componentDidMount() {
//          // wasteful to reset the state here, if we have the data to begin with...
//          // so move it to ../index.js
//          // also, no need to import axios here, since it's not used
//         // axios.get('/api/contests')
//         // .then(resp => {
//         //     this.setState({
//         //         contests: resp.data.contests
//         //     });
//         // }) 
//         // .catch(console.error);
//      }
//      componentWillUnmount() {
//      }
//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 <div>
//                     {this.state.contests.map(contest =>
//                         <ContestPreview key={contest.id} {...contest} />
//                     )}
//                 </div>
//             </div>
//         );
//     }
// }

// export default App;


/*************************************/
/***** 20. Handling click events *****/
/*************************************/

import ContestList from './ContestList';

// class App extends React.Component {
//     state = { 
//         pageHeader: 'Naming Contests!',
//         contests: this.props.initialContests
//      };
//      componentDidMount() {
//      }
//      componentWillUnmount() {
//      }
//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 {/* FIRST, refactor this code into its own component into ./ContestList.js */}
//                 {/* then import the component here ^ */}

//                 {/* <div>
//                     {this.state.contests.map(contest =>
//                         <ContestPreview key={contest.id} {...contest} /> // no need to import ContestPreview here anymore, import in ./ContestList instead
//                     )}
//                 </div> */}

//                 {/* then just use it here! */}
//                 <ContestList contests={this.state.contests} />
//                 {/* 'this.state' because we can read contest from the state... */}

//                 {/* SECONDLY, define onClick handler in ./ContestPreview */}
//             </div>
//         );
//     }
// }

// export default App;


/**************************************/
/***** 21. Navigating and routing *****/
/**************************************/

// use native browser’s history to navigate to the contest using HTML history API
// but put history API in a function here:
// const pushState = (obj, url) =>
//     // ^ this function receives the same parameters that the official pushState receives (from API), 'obj' && 'url'
//     // and this pushState will be an alias to:
//     window.history.pushState (obj, '', url)
    // ^ note: second parameter = title

// class App extends React.Component {
//     state = { 
//         pageHeader: 'Naming Contests!',
//         contests: this.props.initialContests
//      };
//      componentDidMount() {
//      }
//      componentWillUnmount() {
//      }
//     // a function that fetches contest information from the server when we click on it to /contest/ID of the contest
//     fetchContest = (contestId) => { // for now only receives the contestId
//         pushState( // use pushState to push a history record
//             { currentContestId: contestId }, // object of the record
//             `/contest/${contestId}` // url
//             )
//         }
//     // ^ pass this function down to the children component below
//     // then pass it as a property to ./ContestList && ./ContestPreview
//     // can test on browser by clicking on each element and seeing the url changes
//     // also try going back and forth on history

//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 <ContestList
//                     onContestClick={this.fetchContest} // passed in function from above
//                     contests={this.state.contests} />
//             </div>
//         );
//     }
// }

// export default App;


/**************************************************/
/***** 22. Looking up contest on route change *****/
/**************************************************/

import Contest from './Contest';

// class App extends React.Component {
//     state = { 
//         pageHeader: 'Naming Contests!',
//         contests: this.props.initialContests
//      };
//      componentDidMount() {
//      }
//      componentWillUnmount() {
//      }
//     fetchContest = (contestId) => {
//         pushState(
//             { currentContestId: contestId },
//             `/contest/${contestId}`
//         );
//         // lookup the contest
//         // actual contest we're navigating to will be this.state.contests[contestId]
//         // so we have to change the state:
//         this.setState({
//             // change the page header:
//             pageHeader: this.state.contests[contestId].contestName,
//             // to change the content, need a conditional statement to see what the current contest is
//             // so place current contest ID in the state as well when clicked:
//             currentContestId: contestId
//             // then place the conditional statement ('currentContent') in render return below
//         });
//     };

//     // instance function containing conditional statement to set the content of the page to render
//     currentContent() {
//         if(this.state.currentContestId) { // if currentContestId exists...
//             // return contest, but need a contest object to display
//             // so spread a contest object on a new contest component (./Contest.js):
//             return <Contest {...this.state.contests[this.state.currentContestId]} />;
//             // ^ spread it using '...'
//         }
//         // else return the contest list
//         return <ContestList
//                 onContestClick={this.fetchContest}
//                 contests={this.state.contests} />;
//     }

//     render() {
//         return (
//             <div className="App">
//                 <Header message={this.state.pageHeader} />
//                 {/* <ContestList
//                     onContestClick={this.fetchContest}
//                     contests={this.state.contests} /> */}
//                 {/* place this ^ in a function containing conditional statement: */}
//                 {this.currentContent()}
//             </div>
//         );
//     }
// }

// export default App;


/**************************************************/
/***** 23. Fetching contest info from the API *****/
/**************************************************/

import * as api from '../api';

// introduce new route in ../../api/index.js
const pushState = (obj, url) =>
    history.pushState (obj, '', url)

class App extends React.Component {
    state = { 
        pageHeader: 'Naming Contests!',
        contests: this.props.initialContests
     };
     componentDidMount() {
     }
     componentWillUnmount() {
     }
    fetchContest = (contestId) => {
        pushState(
            { currentContestId: contestId },
            `/contest/${contestId}`
        );
        // fetch contest from api here first before setting the state:
        api.fetchContest(contestId).then(contest => { // this is the actual contest coming from the server
            this.setState({ // make sure that we're reading the name and ID from the fetched contest:
                pageHeader: contest.contestName,
                currentContestId: contest.id,
                // modify the contest object we have on the state by copying the current contest object
                contests: {
                    ...this.state.contests, // current contest object
                    // now set the property associate with current contest ID to be the new contest object
                    [contest.id]: contest // inside '[]' because it's dynamic
                    // ^ this way, we cache the fetched contest info on the state
                    // so will be improvement on performance when going back and forth

                    // test in browser by inspecting "Network"
                }
            });
        });
    };

    currentContent() {
        if(this.state.currentContestId) {
            return <Contest {...this.state.contests[this.state.currentContestId]} />;
        }
        return <ContestList
                onContestClick={this.fetchContest}
                contests={this.state.contests} />;
    }

    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                    {this.currentContent()}
            </div>
        );
    }
}

export default App;
