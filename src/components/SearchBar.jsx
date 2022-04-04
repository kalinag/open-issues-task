import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

function SearchBar(props) {
  const { handleClick, name, repo } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: name,
      repository: repo,
    });
  }, [name, repo]);

  return (
    <Form
      className="form"
      form={form}
      onFinish={(values) => handleClick(values, 1)}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{
          required: true,
          message: 'This field is required',
        }]}
      >
        <Input placeholder="Ex. rails" autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Repository"
        name="repository"
        rules={[{
          required: true,
          message: 'This field is required',
        }]}
      >
        <Input placeholder="Ex. rails" autoComplete="off" />
      </Form.Item>
      <Button htmlType="submit" className="btn"> SEARCH</Button>
    </Form>
  );
}
SearchBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,

};

export default SearchBar;
