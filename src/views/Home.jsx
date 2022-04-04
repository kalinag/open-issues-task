import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GithubIssue from '../components/GithubIssue';
import SearchBar from '../components/SearchBar';
import Comments from '../components/Comments';
import { getIssuesCount, getOpenIssues, getComments } from '../redux/actions';

function Home() {
  const issues = useSelector((state) => state.issues);
  const issueComments = useSelector((state) => state.comments);
  const {
    username, repository, page, error,
  } = issues;
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useState({
    username: '',
    repository: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setSearchParams({
      username, repository,
    });
    setCurrentPage(page);
  }, []);

  const getIssues = (values, pageNum) => {
    dispatch(getIssuesCount(values.username, values.repository));
    dispatch(getOpenIssues(values.username, values.repository, pageNum));
  };

  const handleButtonClick = (values) => {
    getIssues(values, 1);
    setCurrentPage(1);
    setSearchParams(values);
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    getIssues(searchParams, newPage);
  };

  const openComments = (url) => {
    dispatch(getComments(url));
    setShowComments(true);
  };

  const hideComments = () => {
    setShowComments(false);
  };

  return (
    <div className="home-wrapper">
      <div className="search-container">
        <SearchBar handleClick={handleButtonClick} name={username} repo={repository} />
      </div>
      <div className="result-container">
        {error
          ? <div className="error-message"> Oops something went wrong, try searching again.</div>
          : issues.openIssues.length > 0
      && issues.openIssues.map((issue) => (
        <GithubIssue
          key={issue.id}
          issue={issue}
          handleIssueClick={openComments}
        />
      ))}
      </div>
      <Comments
        comments={issueComments.comments}
        closeModal={hideComments}
        visible={showComments && !issueComments.isLoading}
      />
      {issues.openIssuesCount > 20 && issues.openIssues.length > 0 && !error
            && <Pagination className="pagination" defaultPageSize={20} current={currentPage} defaultCurrent={currentPage} hideOnSinglePage showSizeChanger={false} onChange={onPageChange} total={issues.openIssuesCount} />}
    </div>
  );
}
export default Home;
