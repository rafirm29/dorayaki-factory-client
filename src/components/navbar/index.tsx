import React from 'react';
import { Menu, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <Menu mode="horizontal" className="flex flex-wrap bg-black text-white">
      <div className="ml-4 flex items-center">
        <Link to="/">
          <div className="text-lg font-bold">Pabrik Dorayaki</div>
        </Link>
      </div>
      <div className="flex items-center ml-auto mr-8">
        <Avatar size="small" src="https://joeschmoe.io/api/v1/random" />
        <div className="ml-2">Admin</div>
      </div>
      <div className="mr-6 flex items-center">
        <LogoutOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
      </div>
    </Menu>
  );
};

export default navbar;
