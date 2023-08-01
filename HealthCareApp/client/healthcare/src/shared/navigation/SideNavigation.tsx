import { UserOutlined, LaptopOutlined, NotificationOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Bệnh nhân', 'sub1', <UserOutlined />, [
        getItem('Tiếp nhận bệnh nhân', '/receiving-patient'),
        getItem('Kiểm tra thông tin bệnh nhân', '/patient'),
    ]),
    getItem('Khám bệnh', 'sub2', <AppstoreOutlined />, [
        getItem('Phiếu khám bệnh', '/medical-examination'),
    ]),
    getItem('Cận lâm sàng', 'sub4', <SettingOutlined />, [
        getItem('Chẩn đoán hình ảnh', '/imaging-diagnostic'),
        getItem('Xét nghiệm máu', '/blood-test'),
    ]),
];

export const SideNavigation = () => {
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        setOpenKeys(keys);
        } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onMenuClick: MenuProps["onClick"] = (info) => {
        navigate(info.key);
    };

    // submenu keys of first level
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 200 }}
      items={items}
      onClick={onMenuClick}
    />
  )
}
