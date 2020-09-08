import React, { CSSProperties } from 'react';
import { ScheduleDataSecondary } from "src/types/types";
import { Menu } from "antd";

const { SubMenu } = Menu;

const styleListItem: CSSProperties = {
  paddingLeft: '10px 36px',
  overflow: 'visible',
  whiteSpace: 'inherit',
  lineHeight: '20px',
  height: 'auto',
};

export default function ScheduleListMenu({ blocks, handleClick }: {
  blocks: {
    Blocks: string | undefined;
    Task: string;
    Include: ScheduleDataSecondary[] | undefined;
    Time: string | undefined;
  }[], handleClick: Function
}) {
  const subMenu = blocks.map(item => {
    let count = 1;
    const menuItem = item.Include!.map(block => {
      if (block.Blocks) {
        const key = `${item.Blocks} ${count++}`;
        return (
          <Menu.Item key={key} style={styleListItem} onClick={() => handleClick(block, item)}>
            {block.Blocks}
          </Menu.Item>
        )
      }
      return false;
    }).filter(el => el !== false);


    return <SubMenu key={item.Blocks} title={item.Blocks}>
      {menuItem}
    </SubMenu>
  });

  return (
    <Menu mode="inline" style={{
      minHeight: '100%',
      border: "none"
    }}>
      {subMenu}
    </Menu>)
}
