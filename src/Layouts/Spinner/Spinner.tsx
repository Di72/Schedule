import { Layout, Spin } from 'antd';
import React, { CSSProperties } from 'react';

export default function Spinner(): JSX.Element {
  const styleSpinner: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '50px',
  };

  return (
    <Layout style={styleSpinner}>
      <Spin size="large" tip="Loading..." />
    </Layout>
  );
}
