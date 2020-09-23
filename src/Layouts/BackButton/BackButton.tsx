import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
import './back-button.less';

function BackButton(props: any): JSX.Element {
  return (
    <Button className="back-button" type="primary" onClick={() => props.history.goBack()}>
      <ArrowLeftOutlined /> Back
    </Button>
  );
}

export default withRouter(BackButton);
