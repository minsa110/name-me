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
import ContestPreview from './ContestPreview';

class App extends React.Component {
    state = { 
        pageHeader: 'Naming Contests!'
     };
     componentDidMount() {
     }
     componentWillUnmount() {
     }
    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                <div>
                    {/* <ContestPreview {...this.props.contests[0]} /> */}
                        {/* ^ pass in first element in the array (array = this.props.contests) */}
                        {/* ^ '...' = spread the object into the ContestPreview, so we get all properties for a contest on the first level */}

                    {/* loop over all elements from ^ */}
                    {this.props.contests.map(contest => // expose 'contest' object
                        <ContestPreview {...contest} />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
