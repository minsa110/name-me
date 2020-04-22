import React from 'react';
import ReactDOM from 'react-dom';

const color = Math.random() > 0.5? 'green' : 'red';
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
ReactDOM.render(
    <h2 className="text-center" style={{color}}>
    {/* to center text in bootstrap // also need to add as 'className' not 'class' */}
    {/* passing in the 'color' style object as a variable inside the style variable  */}
    {/* ^ can be written as short-hand version beause 'color' == 'color', original version = {{color: color}`} */}
        Hello React with JSX!!
    </h2>,
    // ^ this works because we configured babel to work with React in ../babel.config.js --> @babel/react
    // can use any js expressions inside {}
    document.getElementById('root')
);