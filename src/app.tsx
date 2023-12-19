import GlobalFooter from '@/components/GlobalFooter';
// @ts-ignore
import Logo from '@/assets/logo.svg';
import RightContent from '@/components/GlobalHeader/RightContent';
import type {RequestConfig, RunTimeLayoutConfig} from '@umijs/max';
import {history} from '@umijs/max';
import React from 'react';
import {currentUser} from "@/services/ant-design-pro/api";

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**f
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const defaultState: InitialState = {
    loginUser: undefined,
  };
  // 获取当前登录用户
  try {
    const res = await currentUser();
    defaultState.loginUser = res.data;
  } catch (error) {
    history.push(loginPath);
  }
  return defaultState;


}

/**
 * 全局布置配置
 */
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = () => {
  return {

    title: '寻爱',
    logo: Logo,

    menu: {
      locale: false,
    },
    fixedHeader: false,
    layout: 'top',

    contentStyle: {
      paddingBottom: 120,
    },
    rightContentRender: () => <RightContent/>,
    footerRender: () => <GlobalFooter />,

  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  // 新增自动添加AccessToken的请求前拦截器
  timeout: 1000
};
