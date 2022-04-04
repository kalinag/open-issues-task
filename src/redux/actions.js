import {
  GET_ISSUES_COUNT_START,
  GET_ISSUES_COUNT_SUCCESS,
  GET_OPEN_ISSUES_START,
  GET_OPEN_ISSUES_SUCCESS,
  GET_COMMENTS_START,
  GET_COMMENTS_SUCCESS,
  REQUEST_FAILED,
} from './actionTypes';
import * as API from '../api/api';

export function requestFailed(err) {
  return {
    type: REQUEST_FAILED,
    payload: err,
  };
}

export function getIssuesCountSuccess(count) {
  return {
    type: GET_ISSUES_COUNT_SUCCESS,
    payload: count,
  };
}

export function getIssuesCount(username, repo) {
  return (dispatch) => {
    dispatch({ type: GET_ISSUES_COUNT_START });
    API.getOpenIssuesCount(username, repo)
      .then((count) => dispatch(getIssuesCountSuccess(count)))
      .catch((err) => dispatch(requestFailed(err)));
  };
}

export function getOpenIssuesSuccess(issues) {
  return {
    type: GET_OPEN_ISSUES_SUCCESS,
    payload: issues,
  };
}

export function getOpenIssues(username, repo, page) {
  return (dispatch) => {
    dispatch({ type: GET_OPEN_ISSUES_START, payload: { username, repo, page } });
    API.getOpenIssues(username, repo, page)
      .then((res) => dispatch(getOpenIssuesSuccess(res)))
      .catch((err) => dispatch(requestFailed(err)));
  };
}

export function getCommentsSucccess(comments) {
  return {
    type: GET_COMMENTS_SUCCESS,
    payload: comments,
  };
}

export function getComments(url) {
  return (dispatch) => {
    dispatch({ type: GET_COMMENTS_START });
    API.getComments(url)
      .then((res) => dispatch(getCommentsSucccess(res)))
      .catch((err) => dispatch(requestFailed(err)));
  };
}
