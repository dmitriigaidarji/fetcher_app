import * as apiActions from "../actions/queries"
const initialState = {isFetching: false};


export default function queries(state = initialState, action = {}) {
    switch (action.type) {
         case apiActions.FETCH_QUERIES_START:
            return {...state, isFetching: true};
        case apiActions.FETCH_QUERIES_SUCCESS:
            return {...state,
                items: action.payload,
                isFetching: false,
                lastUpdated: action.receivedAt,
                app_version: process.env.APP_VERSION
            };
        default:
            return {...state, isFetching: false};
    }
}