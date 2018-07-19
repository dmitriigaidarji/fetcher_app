import * as apiActions from "../actions/links"
const initialState = {isFetching: false};


export default function links(state = initialState, action = {}) {
    switch (action.type) {
         case apiActions.FETCH_LINKS_START:
            return {...state, isFetching: true};
        case apiActions.FETCH_LINKS_SUCCESS:
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