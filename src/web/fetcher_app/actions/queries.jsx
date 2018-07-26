import Api from '../Api'

export const FETCH_QUERIES_START = 'FETCH_QUERIES_START';
export const FETCH_QUERIES_SUCCESS = 'FETCH_QUERIES_SUCCESS';
export const FETCH_QUERIES_FAIL = 'FETCH_QUERIES_FAIL';

export const getUserQueries = () => (dispatch, getState) => {
    dispatch({type: FETCH_QUERIES_START});
    Api.get(process.env.BASE_API_URL + 'queries/').then(res => {
        if (res.status === 200 && res.data != undefined)
            dispatch({type: FETCH_QUERIES_SUCCESS, payload: res.data, receivedAt: Date.now()})
        else dispatch({type: FETCH_QUERIES_FAIL})
    })
};


export const POST_QUERIES_START = 'POST_QUERIES_START';
export const POST_QUERIES_SUCCESS = 'POST_QUERIES_SUCCESS';
export const POST_QUERIES_FAIL = 'POST_QUERIES_FAIL';

export const postQuery = (text, type) => dispatch => {
    dispatch({type: POST_QUERIES_START});
    Api.post(process.env.BASE_API_URL + 'queries/', {text, type}).then(res => {
        if (res.status === 200 && res.data != undefined)
            dispatch({type: POST_QUERIES_SUCCESS, payload: res.data, receivedAt: Date.now()})
        else dispatch({type: POST_QUERIES_FAIL})
    });
};

export const DELETE_QUERIES_START = 'DELETE_QUERIES_START';
export const DELETE_QUERIES_SUCCESS = 'DELETE_QUERIES_SUCCESS';
export const DELETE_QUERIES_FAIL = 'DELETE_QUERIES_FAIL';


export const deleteQuery = (id) => dispatch => {
    dispatch({type: DELETE_QUERIES_START});
    Api.delete(process.env.BASE_API_URL + 'queries/' + id + '/').then(res => {
        if (res.status === 200 && res.data != undefined)
            dispatch({type: DELETE_QUERIES_SUCCESS, payload: res.data, receivedAt: Date.now()})
        else dispatch({type: DELETE_QUERIES_FAIL})
    });
};


export const FETCH_QUERY_START = 'FETCH_QUERY_START';
export const FETCH_QUERY_SUCCESS = 'FETCH_QUERY_SUCCESS';
export const FETCH_QUERY_FAIL = 'FETCH_QUERY_FAIL';

export const getQueryDetails = (query_id) => dispatch => {
    dispatch({type: FETCH_QUERY_START});
    Api.get(process.env.BASE_API_URL + 'queries/' + query_id + '/').then(res => {
        if (res.status === 200 && res.data != undefined)
            dispatch({type: FETCH_QUERY_SUCCESS, payload: res.data, receivedAt: Date.now(), query_id})
        else dispatch({type: FETCH_QUERY_FAIL})
    })
};
