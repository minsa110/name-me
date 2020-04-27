// place all our api logic here
import axios from 'axios';

// fetching api content here
export const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`)
        .then(resp => resp.data);
}
// then fetch contest from here into App.js


/**************************************************************/
/***** 26. Navigating to the main page (list of contests) *****/
/**************************************************************/

// function for fetching contest list
export const fetchContestList = () => { // no argument, thus the '()'
    return axios.get(`/api/contests`)
        .then(resp => resp.data.contests);
}
// then fetch contest list from here into App.js
