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

// class Contest extends Component {
//     render() {
//         return (
//             <div className="Contest">
//                 <div className="contest-description">
//                     {this.props.description}
//                 </div>

//                 <div className="home-link link"
//                     onClick={this.props.contestListClick}>
//                     {/* define onClick handler to change the state of the UI */}
//                     {/* since this will fetch something from the api, pass it from the parent app component */}
//                     {/* define it in App.js inside the <Contest...> component */}

//                     {/* need to fetch the list of contests every time we click on the 'Contest List' button */}
//                     {/* and once we have the list back from the server, want to change the state to reflect this click */}
//                     {/* which means need to go to src/api.js */}
//                     Contest List
//                 </div>
//             </div>
//         );
//     }
// }

// Contest.propTypes = {
//     description: PropTypes.string.isRequired,
//     contestListClick: PropTypes.func.isRequired
// };

// export default Contest;


/*****************************************************/
/***** 29. Creating API to fetch a list of names *****/
/*****************************************************/

class Contest extends Component {
    render() {
      return (
        <div className="Contest">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Contest Description</h3>
            </div>
            <div className="panel-body">
              <div className="contest-description">
                {this.props.description}
              </div>
            </div>
          </div>
  
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Proposed Names</h3>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                <li className="list-group-item">Name one...</li>
                <li className="list-group-item">Name two...</li>
              </ul>
            </div>
          </div>
  
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Propose a New Name</h3>
            </div>
            <div className="panel-body">
              <form>
                <div className="input-group">
                  <input type="text" placeholder="New Name Here..." className="form-control" />
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-info">Sumbit</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
  
          <div className="home-link link"
               onClick={this.props.contestListClick}>
            Back to Contest List
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
