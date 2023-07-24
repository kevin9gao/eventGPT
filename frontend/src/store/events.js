import { csrfFetch } from "./csrf";

const LOAD = 'events/LOAD';
const ADD_EDIT = 'events/ADD_EDIT';
const REMOVE = 'events/REMOVE';

const load = list => ({
  type: LOAD,
  list
});

const add = event => ({
  type: ADD_EDIT,
  event
});

const update = event => ({
  type: ADD_EDIT,
  event
});

const remove = eventId => ({
  type: REMOVE,
  eventId
});

export const loadEvents = payload => async dispatch => {
  const { location, date } = payload;
  const res = await csrfFetch(`/api/events/${location}/${date}`);
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      return state;
    default:
      return state;
  }
}

export default eventsReducer;
