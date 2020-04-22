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


/******************************************/
/***** 9. Define a component PER file *****/
/******************************************/

// single component files under ./components directory

import App from './components/App';

// single responsibility: only renders top level component to the doc! :)
ReactDOM.render(
    <App />,
    // can pass in a variable, or 'props' in React components
    document.getElementById('root')
);
