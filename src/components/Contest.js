import React, { Component } from 'react';
import PropTypes from 'prop-types';

// class Contest extends Component {
//     render() {
//         return (
//             <div className="Contest">
//                 {this.props.description}
//             </div>
//         );
//     }
// }

// Contest.propTypes = {
//     description: PropTypes.string.isRequired
// };

// export default Contest;

/**************************************************************/
/***** 26. Navigating to the main page (list of contests) *****/
/**************************************************************/

class Contest extends Component {
    render() {
        return (
            <div className="Contest">
                <div className="contest-description">
                    {this.props.description}
                </div>

                <div className="home-link link"
                    onClick={this.props.contestListClick}>
                    {/* define onClick handler to change the state of the UI */}
                    {/* since this will fetch something from the api, pass it from the parent app component */}
                    {/* define it in App.js inside the <Contest...> component */}

                    {/* need to fetch the list of contests every time we click on the 'Contest List' button */}
                    {/* and once we have the list back from the server, want to change the state to reflect this click */}
                    {/* which means need to go to src/api.js */}
                    Contest List
                </div>
            </div>
        );
    }
}

Contest.propTypes = {
    description: PropTypes.string.isRequired,
    contestListClick: PropTypes.func.isRequired
};

export default Contest;
