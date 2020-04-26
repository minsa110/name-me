import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

/**************************************/
/***** 21. Navigating and routing *****/
/**************************************/

// can be a stateless component
// const ContestList =({ contests, onContestClick }) => ( // receiving prop, the list of contests
//     <div className="ContestLists">
//         {/* {this.state.contests.map(contest => */}
//         {contests.map(contest => // will render directly here, so don't need state
//             <ContestPreview
//                 key={contest.id}
//                 onClick={onContestClick}
//                 // ^ onContestClick property that's passed from fetchContest func from App.js
//                 // need to destructure it (above) && define prop type (below)
//                 // define 'onClick' in ContestPreview.js
//                 {...contest}
//             />
//         )}
//     </div>
// );

// // define props
// ContestList.propTypes = {
//     contests: PropTypes.array,
//     onContestClick: PropTypes.func.isRequired
//     // ^ receive this new property for fetching contest (fetchContest func from App.js)
// };

// export default ContestList;


/**************************************************/
/***** 22. Looking up contest on route change *****/
/**************************************************/

// contests is now an object not an array--make necessary changes

const ContestList =({ contests, onContestClick }) => (
    <div className="ContestLists">
        {Object.keys(contests).map(contestId => // iterate over keys now
            <ContestPreview
                key={contestId}
                onClick={onContestClick}
                {...contests[contestId]}
            />
        )}
    </div>
);

// define props
ContestList.propTypes = {
    contests: PropTypes.object,
    onContestClick: PropTypes.func.isRequired
};

export default ContestList;


