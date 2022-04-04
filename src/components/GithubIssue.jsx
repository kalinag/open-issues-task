/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Avatar, Card } from 'antd';
import PropTypes from 'prop-types';

function GithubIssue({ issue, handleIssueClick }) {
  const { user } = issue;
  const hasComments = !!issue.comments > 0;

  return (
    <div className="issue-wrapper">
      <div className="assignee">
        <Avatar src={user.avatar_url} className="avatar" />
        <span>{user.login}</span>
      </div>
      <Card title={`Issue #${issue.number}`} className={hasComments ? 'issue has-comments' : 'issue'}>
        <span role="button" onClick={() => hasComments && handleIssueClick(issue.comments_url)}>
          {issue.title}
        </span>
      </Card>
    </div>
  );
}

GithubIssue.propTypes = {
  issue: PropTypes.shape().isRequired,
  handleIssueClick: PropTypes.func.isRequired,
};

export default GithubIssue;
