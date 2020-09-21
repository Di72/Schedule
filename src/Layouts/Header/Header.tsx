import { EyeOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Select } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/img/logo-rsschool3.png';
import CreateEventPage from '../CreateEventPage/CreateEventPage';
import './Header.less';

const { Option } = Select;
const { Item } = Menu;

const HeaderSC = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ImgLogo = styled.img`
  height: 30px;
  margin-left: 15px;
`;

const timezones = [
  'Europe/London',
  'Europe/Kaliningrad',
  'Europe/Moscow',
  'Europe/Volgograd',
];

const menu = (
  <Menu>
    <Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        <EyeOutlined />
        1st menu item
      </a>
    </Item>
    <Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Item>
    <Menu.Divider />
    <Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Item>
  </Menu>
);

export const Header = ({
  data,
  editStatus,
  timeZone,
}: {
  [x: string]: any;
}) => {
  const onTimezoneChange = (timezone: string) => {
    timeZone(timezone);
  };

  const options = timezones.map((zone: string) => {
    return (
      <Option
        key={zone}
        style={{ paddingLeft: 15, paddingRight: 15 }}
        value={zone}
      >
        {zone}
      </Option>
    );
  });

  return (
    <div className="headerContainer">
      <HeaderSC>
        <ImgLogo src={Logo} alt="RS School" />
        <h1>Schedule</h1>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button type="dashed">My Profile</Button>
        </Dropdown>
      </HeaderSC>
      <Select defaultValue="table" style={{ width: 120, margin: 15 }}>
        <Option value="table">
          <NavLink className="nav-link" to="/">
            table
          </NavLink>
        </Option>
        <Option value="list">
          <NavLink className="nav-link" to="/list">
            list
          </NavLink>
        </Option>
        <Option value="calendar">
          <NavLink className="nav-link" to="/calendar">
            calendar
          </NavLink>
        </Option>
      </Select>
      <Select
        defaultValue="Europe/Moscow"
        style={{ width: 200, margin: 15 }}
        onChange={onTimezoneChange}
      >
        {options}
      </Select>
      <CreateEventPage />
      {data.editStatus ? (
        <Button type="primary" danger onClick={() => editStatus()}>
          Mentor
        </Button>
      ) : (
        <Button type="primary" onClick={() => editStatus()}>
          Student
        </Button>
      )}
    </div>
  );
};
