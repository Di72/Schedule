import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Button, Menu, Dropdown, Select } from 'antd';
import Logo from '../../assets/img/logo-rsschool3.png';
import {NavLink} from "react-router-dom";

const { Option } = Select;

const HeaderSC = styled.div`
	display: flex;
  justify-content: space-between;
`;
const ImgLogo = styled.img`height: 30px; margin-left: 15px;`;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        <EyeOutlined />
          1st menu item
        </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
        </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
        </a>
    </Menu.Item>
  </Menu>
);



export const Header = (data: any) => {
  return (<>
    <HeaderSC>
      <ImgLogo src={Logo} alt="" />
      <h1>Schedule</h1>
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button type="dashed">My Profile</Button>
      </Dropdown>
    </HeaderSC>
    <Select defaultValue="table" style={{ width: 120, margin: 15 }} >
      <Option value="table"><NavLink className='navlink' to="/table" >table</NavLink></Option>
      <Option value="list"><NavLink className='navlink' to="/list" >list</NavLink></Option>
      <Option value="calendar"><NavLink className='navlink' to="/calendar" >calendar</NavLink></Option>
    </Select>
    {data.editStatus ?  <Button type="dashed" onClick={()=>data.editStatus}>Mentor</Button> : <Button type="dashed" onClick={data.editStatus}>Student</Button>}
  </>);

};
