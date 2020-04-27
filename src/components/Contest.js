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
// ^ only made html changes ^

/************************************************/
/***** 30. Displaying fetched list of names *****/
/************************************************/

class Contest extends Component {
    componentDidMount() {
        // fetch names when clicked on contest only
        // but don't want to do it separately here... instead, do in App.js
        // and just call the function here:
        this.props.fetchNames(this.props.nameIds);
    }
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
                {this.props.nameIds.map(nameId =>
                    <li key={nameId} className="list-group-item">
                    {/* remember, need to provide key since we have a dynamic array */}
                        {this.props.lookupName(nameId).name}
                        {/* 'this.props.lookupName(nameId)' is an object */}
                    </li>
                )}
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
    contestListClick: PropTypes.func.isRequired,
    fetchNames: PropTypes.func.isRequired,
    nameIds: PropTypes.array.isRequired,
    lookupName: PropTypes.func.isRequired
};

export default Contest;
