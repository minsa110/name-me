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


/************************************************/
/***** 30. Displaying fetched list of names *****/
/************************************************/

export const fetchNames = nameIds => {
    return axios.get(`/api/names/${nameIds.join(',')}`)
        .then(resp => resp.data.names);
}


/**************************************************/
/***** 34. Wiring proposed new FORM to the UI *****/
/**************************************************/

export const addName = (newName, contestId) => {
    return axios.post('/api/names', { newName, contestId }) // axios sends 2nd arg as JSON
        .then(resp => resp.data);
};
