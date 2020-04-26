import React from 'react';
import ReactDOM from 'react-dom';

//const color = Math.random() > 0.5? 'green' : 'red';
// if greater than 0.5, green, else, red

// ReactDOM.render(
//     React.createElement('h2', null, 'Hello React'), // what to render
//         // (tag type, attributes, children for this element)
//         // react takes pure js and translates it into DOM tree
//     document.getElementById('root') // where to render
//     // in ../views/index.ejs, div with id='root'
// );
// test in terminal: npm run dev ***
// will run webpack and generate ../public/bundle.js file from React source code
// then we need to add this in the footer.ejs
// then in separate terminal: npm start ***

// write ^ with html tags
// ReactDOM.render(
//     <h2 className="text-center" style={{color}}>
//     {/* to center text in bootstrap // also need to add as 'className' not 'class' */}
//     {/* passing in the 'color' style object as a variable inside the style variable  */}
//     {/* ^ can be written as short-hand version beause 'color' == 'color', original version = {{color: color}`} */}
//         Hello React with JSX!!
//     </h2>,
//     // ^ this works because we configured babel to work with React in ../babel.config.js --> @babel/react
//     // can use any js expressions inside {}
//     document.getElementById('root')
// );


/*******************************/
/***** 7. React components *****/
/*******************************/

// React = work with React components, so rewriting ^...
// const App = (props) => {
//     // React component is a function (here, a React component = 'App')
//     // receive argument to the func, 'props'
//     return (
//         <h2 className="text-center">
//             {/* Hello React components!! */}
//             {props.myMessage}
//         </h2>
//     );
// };

// // all values of props should to be validated
// App.propTypes = { // React api
//     // myMessage: PropTypes.string.isRequired
//     // isRequired means myMessage has to have a value
//     myMessage: PropTypes.string
//     // when using default message, don't need isRequired
// };

// // can also use default values
// App.defaultProps = {
//     myMessage: 'Hello default message!'
// };

// ReactDOM.render(
//     <App myMessage="Hello props!" />,
//     // can pass in a variable, or 'props' in React components
//     document.getElementById('root')
// );

/************************************/
/***** 8. React components pt.2 *****/
/************************************/

// const Header = ({ message }) => { // destructuring the property 'message'
//     return (
//         <h2 className="Header text-center">
//             {message}
//         </h2>
//     );
// };

// propTypes should trail the React component it's defining
// Header.propTypes = { // React api
//     message: PropTypes.string
// };

// const App = () => {
//     return (
//         <div className="App"> {/* need to wrap multiple html tags in one div */}
//             <Header message="Name me! - by Soojin" />
//             <div>
//                 ...
//             </div>
//         </div>
//     );
// };

// ReactDOM.render(
//     <App />,
//     // can pass in a variable, or 'props' in React components
//     document.getElementById('root')
// );


/************************************************/
/***** 9. Define a React component PER file *****/
/************************************************/

// single component files under ./components directory

import App from './components/App';

// single responsibility: only renders top level component to the doc! :)
// ReactDOM.render(
//     <App />,
//     // can pass in a variable, or 'props' in React components
//     document.getElementById('root')
// );

/*******************************************/
/***** 12. Loading data from directory *****/
/*******************************************/

// old way (before importing json)... don't need json-loader, since it's native in webpack now!
    // npm i -S json-loader
    // configure webpack json-loader in webpack.config.js
    // restart webpack (npm run dev)

// import data from './testData';
// console.log(data); // test to make sure we're reading the data directly from the json file

// ReactDOM.render(
//     <App contests={data.contests} />, // pass data into the App component
//     document.getElementById('root')
// );


/**********************************************/
/***** 15. Handling data read in from API *****/
/**********************************************/

// React will render first before data is loaded from API so create an empty array
// ReactDOM.render(
//     // <App contests={[]} />, // empty array
//     // once React is loaded, update it with the loaded data in App.js
//     // but only thing that can be updated inside a component is the STATE of the component
//     // so... we'll render it from the state:
//     <App />, // remove it from here and do it in App.js --> state
//     document.getElementById('root')
// );

/*************************************************************************************************************/
/***** 19. Render React components on the server using fetched API data using the ReactDOMServer package *****/
/*************************************************************************************************************/

// ReactDOM.render(
//     <App initialContests={[]}/>, // pass in initialContests as an empty array here
//     document.getElementById('root')
// );

// add the axios call here because we need to bring in the data before rendering the front-end component
// and instead of setting the state, do ReactDOM.render call here
// import axios from 'axios';

// axios.get('/api/contests')
// .then(resp => {
//     ReactDOM.render(
//         <App initialContests={resp.data.contests}/>, // the initial data here are resp.data.contests
//         document.getElementById('root')
//     );
// }) 
// .catch(console.error);

// ^ basically, client is going back to the api to fetch the data
// still kinda wasteful... so to return the data from the server itself in the axios call from ../serverRender.js
// will also need to modify ../server.js to take in both the markup and the data
// then make necessary changes in views/index.ejs where we're rendering the content
// so on the front-end (here), instead of doing an extra hit to the API,
// can render directly using the global variable created in ejs
// (i.e. no need to do axios call / also no need to import axios here now):
// ReactDOM.render(
//     <App initialContests={window.initialData.contests}/>, // render directly using window.initialData
//     document.getElementById('root')
// );
// NOW, React is re-rendering the view IN SYNC with the server rendered view


// FYI -
// render(): Calling ReactDOM.render() to hydrate server-rendered markup will stop working in React v17.
// Replace the ReactDOM.render() call with ReactDOM.hydrate() if you want React to attach to the server HTML.
ReactDOM.hydrate(
    <App initialContests={window.initialData.contests}/>, // render directly using window.initialData
    document.getElementById('root')
);
