import { userLogout } from '@/services/userService';
import { Link } from '@@/exports';
import { AntDesignOutlined, LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Dropdown, Menu, message } from 'antd';
import classNames from 'classnames';
import { stringify } from 'querystring';
import React from 'react';
import styles = module;
// @ts-ignore
import defaultAvatar from '@/assets/banner.jpg';

/**
 * 头像下拉框
 * @constructor
 */
export const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const loginUser = initialState?.loginUser;

  const onMenuClick = async (event: { key: React.Key; keyPath: React.Key[] }) => {
    const { key } = event;

    if (key === 'logout') {
      try {
        await userLogout();
        message.success('已退出登录');
      } catch (e: any) {
        message.error('操作失败');
      }
      // @ts-ignore
      await setInitialState({ ...initialState, loginUser: undefined });
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
      return;
    }
  };

  /**
   * 下拉菜单
   */
  const menuHeaderDropdown = loginUser ? (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="current" disabled>
        {loginUser.userName}
      </Menu.Item>
      <Menu.Item key="logout">
        <span style={{ color: 'red' }}>
          <LogoutOutlined />
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  ) : (
    <></>
  );

  return loginUser ? (
    <Dropdown overlayClassName={classNames(styles.container)} overlay={menuHeaderDropdown}>
      <div className={`${styles.action} ${styles.account}`}>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 60, xl: 60 }}
          icon={<AntDesignOutlined />}
          src={loginUser.userAvatar || defaultAvatar}
          alt="avatar"
        />
        {/*<span>{loginUser.userName?.[0]}</span>*/}
      </div>
    </Dropdown>
  ) : (
    <Link to="/user/login">
      <Button type="primary" ghost>
        登录
      </Button>
    </Link>
  );
};

export default AvatarDropdown;
