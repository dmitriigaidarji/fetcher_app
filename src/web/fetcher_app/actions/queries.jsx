import Api from '../Api'
import SeoApi from "../SeoApi";
import $ from "jquery";

export const FETCH_QUERIES_START = 'FETCH_QUERIES_START';
export const FETCH_QUERIES_SUCCESS = 'FETCH_QUERIES_SUCCESS';
export const FETCH_QUERIES_FAIL = 'FETCH_QUERIES_FAIL';

export const getUserQueries = () => (dispatch, getState) => {
    dispatch({type: FETCH_QUERIES_START});
    Api.get(process.env.BASE_API_URL + 'userqueries/').then(res => {
        if (res.status === 200 && res.data != undefined)
            dispatch({type: FETCH_QUERIES_SUCCESS, payload: res.data, receivedAt: Date.now()})
        else dispatch({type: FETCH_QUERIES_FAIL})
    })
};


export const POST_QUERIES_START = 'POST_QUERIES_START';
export const POST_QUERIES_SUCCESS = 'POST_QUERIES_SUCCESS';
export const POST_QUERIES_FAIL = 'POST_QUERIES_FAIL';

export const postQuery = (query, type) => dispatch => {
    dispatch({type: POST_QUERIES_START});
    Api.post(process.env.BASE_API_URL + 'query/', {query, type}).then(res => {
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
    Api.post(process.env.BASE_API_URL + 'deletequery/', {id}).then(res => {
        if (res.status === 200 && res.data != undefined)
            dispatch({type: DELETE_QUERIES_SUCCESS, payload: res.data, receivedAt: Date.now()})
        else dispatch({type: DELETE_QUERIES_FAIL})
    });
};
