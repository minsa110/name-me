// import React from 'react';

// const ContestPreview = (contest) => { // note: NOT ({ contest }) like in Header
//     return (
//         <div className="ContestPreview">
//            <div className="category-name">
//                {contest.categoryName}
//            </div>
//            <div className="contest-name">
//                {contest.contestName}
//            </div>
//         </div>
//     );
// };

// export default ContestPreview;


/******************************************/
/***** 14. Make CSS changes with Sass *****/
/******************************************/

// add classes above then ../../sass/style.scss

// have TWO options:
// have webpack translate scss into css and use the css directly in the application
// or have node translate scss into css directly -- use it directly on server load
// go with SECOND option --> use node-sass-middleware
    // npm i -S node-sass-middleware
// once we have it, can use it (go to server.js)


/*************************************/
/***** 20. Handling click events *****/
/*************************************/

// <div className="ContestPreview" onClick={... // onClick handler as a function
//     // to make onClick function have access to EVERY contest object,
//     // (not a static function that doesn't depend on the object -- in that case, pass it down as a property from the parent)
//     // make it a DYNAMIC function
//     // but CAN'T have a dynamic function here because this is a stateless function component
//     // SO upgrade the ContestPreview component into a CLASS component
// }>

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// class ContestPreview extends Component { // 'Component' is undefined so destructure it when importing (see above)
//     // instance function to handle events for each object
//     handleClick = () => { // <-- read 'handleClick is a function '()' using the property syntax so that we can access it inside
//         console.log(this.props.contestName);
//     };
//     render() {
//         return (
//             <div className="link ContestPreview" onClick={this.handleClick}>
//                 {/* ^ now that there's an instance, we can use an instance function 'handleClick' on click */}
//                 {/* ^ also give it 'link' class so that the cursor notifies user that the component is clickable (also change in stylesheet -- style.scss) */}
//                 <div className="category-name">
//                     {this.props.categoryName}
//                     {/* use 'this.props' */}
//                 </div>
//                 <div className="contest-name">
//                     {this.props.contestName}
//                 </div>
//             </div>
//         );
//     }
// }

// // define props
// ContestPreview.propTypes = {
//     categoryName: PropTypes.string.isRequired,
//     contestName: PropTypes.string.isRequired
// };

// export default ContestPreview;


/**************************************/
/***** 21. Navigating and routing *****/
/**************************************/

class ContestPreview extends Component {
    handleClick = () => {
        // call the onClick property here in the function:
        this.props.onClick(this.props._id); // and send as an argument, 'this.props.id'
        // ^ define id below too
        // ^ (32. _id change)
    };
    render() {
        return (
            <div className="link ContestPreview" onClick={this.handleClick}>
                <div className="category-name">
                    {this.props.categoryName}
                </div>
                <div className="contest-name">
                    {this.props.contestName}
                </div>
            </div>
        );
    }
}

ContestPreview.propTypes = {
    categoryName: PropTypes.string.isRequired,
    contestName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    // ^ receive this new property from ./ContestList
    _id: PropTypes.string.isRequired // (32. _id change) when mongo's ObjectID gets exposed by the api, becomes string
};

export default ContestPreview;
