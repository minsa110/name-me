import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

// can be a stateless component
const ContestList =({ contests }) => ( // receiving prop, the list of contests
    <div className="ContestLists">
        {/* {this.state.contests.map(contest => */}
        {contests.map(contest => // will render directly here, so don't need state
            <ContestPreview key={contest.id} {...contest} />
        )}
    </div>
);

// define props
ContestList.propTypes = {
    contests: PropTypes.array
};

export default ContestList;
