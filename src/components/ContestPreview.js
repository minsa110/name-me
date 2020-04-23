import React from 'react';

const ContestPreview = (contest) => { // note: NOT ({ contest }) like in Header
    return (
        <div className="ContestPreview">
           <div className="category-name">
               {contest.categoryName}
           </div>
           <div className="contest-name">
               {contest.contestName}
           </div>
        </div>
    );
};

export default ContestPreview;


/********************************/
/***** 13. Make CSS changes *****/
/********************************/

// add classes above then ../../sass/style.scss

// have TWO options:
// have webpack translate scss into css and use the css directly in the application
// or have node translate scss into css directly -- use it directly on server load
// go with SECOND option --> use node-sass-middleware
    // npm i -S node-sass-middleware
// once we have it, can use it (go to server.js)