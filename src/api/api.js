import axios from 'axios';

export function getOpenIssues(username, repo, page) {
  const url = `https://api.github.com/repos/${username}/${repo}/issues?per_page=20&page=${page}&state=open`;
  return axios.get(url)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}

export function getOpenIssuesCount(username, repo) {
  const url = `https://api.github.com/repos/${username}/${repo}`;
  return axios.get(url)
    .then((res) => res.data.open_issues_count)
    .catch((err) => Promise.reject(err));
}

export function getComments(url) {
  return axios.get(url)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
}
