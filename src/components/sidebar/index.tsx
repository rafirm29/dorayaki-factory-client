import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const rootSubmenuKeys = ['resep'];

const sidebar = () => {
  const { SubMenu } = Menu;
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 192, minHeight: '100vh' }}
    >
      <SubMenu key="resep" title="Resep">
        <Menu.Item key="daftarResep">
          <Link to="/recipes/list">Daftar Resep</Link>
        </Menu.Item>
        <Menu.Item key="tambahResep">
          <Link to="/recipes/add">Tambah Resep</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="bahanBaku">
        <Link to="/ingredients">Bahan Baku</Link>
      </Menu.Item>
      <Menu.Item key="daftarRequest">
        <Link to="/request">Daftar Request</Link>
      </Menu.Item>
    </Menu>
  );
};

export default sidebar;
