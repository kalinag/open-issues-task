import React from 'react';
import { Comment, Avatar, Drawer } from 'antd';
import PropTypes from 'prop-types';

function Comments({ comments, closeModal, visible }) {
  return (
    <Drawer className="drawer" title="Comments" placement="right" onClose={() => closeModal()} visible={visible}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.login}
          avatar={<Avatar src={comment.user.avatar_url} />}
          content={(
            <p>
              {comment.body}
            </p>
          )}
        />
      ))}

    </Drawer>
  );
}
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  closeModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Comments;
