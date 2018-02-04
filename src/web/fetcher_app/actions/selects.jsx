/**
 * Created by dmitriigaidarji on 5/19/17.
 */
export const SELECT_PROVIDER = 'SELECT_PROVIDER';
export const SELECT_CUSTOMER = 'SELECT_CUSTOMER';
export const SELECT_USER = 'SELECT_USER';
export const SELECT_START_DATE = 'SELECT_START_DATE';
export const SELECT_END_DATE = 'SELECT_END_DATE';
export const SELECT_START_END_DATE = 'SELECT_START_END_DATE';
export const SELECT_CURRENT_DAY = 'SELECT_CURRENT_DAY';
export const SELECT_ACCESS_LEVEL = 'SELECT_ACCESS_LEVEL';

export const selectProvider = (provider) => dispatch => {
    dispatch({type: SELECT_PROVIDER, provider: provider});
};

export const selectCustomer = (customer) => dispatch => {
    dispatch({type: SELECT_CUSTOMER, customer: customer});
};

export const selectUser = (user) => dispatch => {
    dispatch({type: SELECT_USER, user: user});
};

export const selectStartDate = (date) => dispatch => {
    dispatch({type: SELECT_START_DATE, date: date});
};

export const selectEndDate = (date) => dispatch => {
    dispatch({type: SELECT_END_DATE, date: date});
};

export const selectStartEndDate = (startDate, endDate) => dispatch => {
    dispatch({type: SELECT_START_END_DATE, start_date: startDate, end_date: endDate, current_day: startDate});
};

export const selectCurrentDay = (date) => dispatch => {
    dispatch({type: SELECT_CURRENT_DAY, date: date});
};

export const selectAccessLevel = (level) => dispatch => {
    dispatch({type: SELECT_ACCESS_LEVEL, access_level: level});
};

