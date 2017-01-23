import { combineReducers } from 'redux';
import { Map, OrderedSet, fromJS } from 'immutable';

import * as types from '../constants';

function allItems(state = new OrderedSet(), action) {
  switch (action.type) {
    case types.FILL_ISSUES:
      return new OrderedSet(action.payload.ids);
    case types.ADD_ISSUES:
      return state.union(action.payload.ids);
    case types.CLEAR_ISSUES:
      return new OrderedSet();
    default:
      return state;
  }
}

function itemsById(state = new Map(), action) {
  switch (action.type) {
    case types.FILL_ISSUES:
      return fromJS(action.payload.map);
    case types.ADD_ISSUES:
      return new Map(fromJS(action.payload.map)).merge(state);
    case types.CLEAR_ISSUES:
      return new Map();
    default:
      return state;
  }
}

function meta(state = new Map({
  fetching: false,
  total: 0,
  selected: null,
  recent: new OrderedSet(),
  searchResults: new OrderedSet(),
}), action) {
  switch (action.type) {
    case types.SET_FETCH_ISSUES_STATE:
      return state.set('fetching', action.payload);
    case types.GET_ISSUES_COUNT:
      return state.set('total', action.payload);
    case types.SELECT_ISSUE:
      return state.set('selected', action.payload);
    case types.FILL_RECENT_ISSUES:
      return state.set('recent', new OrderedSet(action.payload));
    case types.FILL_SEARCH_ISSUES:
      return state.set('searchResults', new OrderedSet(action.payload));
    default:
      return state;
  }
}

export default combineReducers({
  byId: itemsById,
  allIds: allItems,
  meta,
});
