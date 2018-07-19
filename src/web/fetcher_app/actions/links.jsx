import Api from '../Api'

export const FETCH_LINKS_START = 'FETCH_LINKS_START';
export const FETCH_LINKS_SUCCESS = 'FETCH_LINKS_SUCCESS';
export const FETCH_LINKS_FAIL = 'FETCH_LINKS_FAIL';

export const getLinks = (query,count,offset) => dispatch => {
    dispatch({type: FETCH_LINKS_START});
    Api.get(process.env.BASE_API_URL + 'querywebsites/', {params:{query, count, offset}}).then(res => {
        if (res.status === 200 && res.data != undefined)
            dispatch({type: FETCH_LINKS_SUCCESS, payload: res.data, receivedAt: Date.now()})
        else dispatch({type: FETCH_LINKS_FAIL})
    });
};