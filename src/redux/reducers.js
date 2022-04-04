import { combineReducers } from 'redux';
import {
  GET_ISSUES_COUNT_START,
  GET_ISSUES_COUNT_SUCCESS,
  GET_OPEN_ISSUES_SUCCESS,
  GET_COMMENTS_START,
  GET_COMMENTS_SUCCESS,
  GET_OPEN_ISSUES_START,
  REQUEST_FAILED,
} from './actionTypes';

const initialIssuesState = {
  username: '',
  repository: '',
  page: 1,
  isLoading: false,
  openIssuesCount: null,
  openIssues: [],
  error: null,
};

// eslint-disable-next-line default-param-last
export function issuesReducer(state = initialIssuesState, action) {
  switch (action.type) {
    case REQUEST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case GET_ISSUES_COUNT_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ISSUES_COUNT_SUCCESS:
      return {
        ...state,
        openIssuesCount: action.payload,
      };

    case GET_OPEN_ISSUES_START:
      return {
        ...state,
        username: action.payload.username,
        repository: action.payload.repo,
        page: action.payload.page,
      };

    case GET_OPEN_ISSUES_SUCCESS:
      return {
        ...state,
        openIssues: action.payload,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

const intialCommentsState = {
  isLoading: false,
  comments: [],
};

// eslint-disable-next-line default-param-last
export function commentsReducer(state = intialCommentsState, action) {
  switch (action.type) {
    case GET_COMMENTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  issues: issuesReducer,
  comments: commentsReducer,
});
