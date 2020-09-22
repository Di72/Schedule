import { Layout, Spin } from 'antd';
import React, { CSSProperties } from 'react';

export default function Spinner(): JSX.Element {
  const styleSpinner: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    minHeight: '100vh',
  };

  return (
    <Layout style={styleSpinner}>
      <Spin size="large" tip="Loading..." />
    </Layout>
  );
}
