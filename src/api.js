// place all our api logic here
import axios from 'axios';

// fetching api content here
export const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`)
        .then(resp => resp.data);
}
// then fetch contest from here into App.js