import * as apiActions from "../actions/queries"

const initialState = {isFetching: false, detailed: {}};


export default function queries(state = initialState, action = {}) {
    switch (action.type) {
        case apiActions.FETCH_QUERIES_START:
            return {...state, isFetching: true};
        case apiActions.FETCH_QUERIES_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isFetching: false,
                lastUpdated: action.receivedAt
            };
        case apiActions.FETCH_QUERY_SUCCESS:
            return {
                ...state, detailed: {
                    [action.query_id]: Object.assign(action.payload, {
                        isFetching: false,
                        lastUpdated: action.receivedAt,
                    })
                }
            }
        default:
            return {...state, isFetching: false};
    }
}