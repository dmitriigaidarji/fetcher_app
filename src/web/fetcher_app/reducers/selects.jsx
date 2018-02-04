import * as apiActions from "../actions/selects"
import moment from 'moment'
const initialState = {};


export default function selects(state = initialState, action = {}) {
    switch (action.type) {
        case apiActions.SELECT_PROVIDER:
            return {...state, provider: action.provider};
        case apiActions.SELECT_CUSTOMER:
            return {...state, customer: action.customer};
        case apiActions.SELECT_USER:
            return {...state, user: action.user};
        case apiActions.SELECT_START_DATE:
            return {...state, start_date: action.date};
        case apiActions.SELECT_END_DATE:
            return {...state, end_date: action.date};
        case apiActions.SELECT_START_END_DATE:
            if (state.current_day !== undefined) {
                let cur_day = moment.utc(state.current_day);
                if (cur_day.isSameOrBefore(action.end_date) &&
                    cur_day.isSameOrAfter(action.start_date))
                    return {...state, start_date: action.start_date, end_date: action.end_date};
            }
            return {
                ...state,
                start_date: action.start_date,
                end_date: action.end_date,
                current_day: action.current_day
            };
        case apiActions.SELECT_CURRENT_DAY:
            return {...state, current_day: action.date};
        case apiActions.SELECT_ACCESS_LEVEL:
            return {...state, access_level: action.access_level};
        default:
            return state
    }
}