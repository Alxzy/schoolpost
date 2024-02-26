import GlobalFooter from '@/components/GlobalFooter';
// @ts-ignore
import Logo from '@/assets/logo.svg';
import RightContent from '@/components/GlobalHeader/RightContent';
import * as tagService from '@/services/tagService';
import { currentUser } from '@/services/userService';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**f
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const defaultState: InitialState = {
    loginUser: undefined,
    tagMap: {},
  };
  // 获取当前登录用户
  try {
    const res = await currentUser();
    defaultState.loginUser = res.data;
  } catch (error) {
    history.push(loginPath);
  }
  // 获取标签分组
  try {
    const res = await tagService.getTagMap();
    defaultState.tagMap = res.data;
  } catch (e: any) {
    history.push('获取标签失败，' + e.message);
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
    rightContentRender: () => <RightContent />,
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
  // 根据不同的环境提供不同的基础 URL
  // baseURL: isDev ? 'http://localhost:8103/api' : 'https://www.lovefinder.cn/api',
  // 超时时间 单位为毫秒
  timeout: 10000,
  // 跨站点的访问控制请求带有凭证
  withCredentials: true,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [
    (response) => {
      // 不再需要异步处理读取返回体内容，可直接在 data 中读出，部分字段可在 config 中找到
      const data: any = response.data;
      const path = response.request.responseURL;
      if (!data) {
        throw new Error('服务异常');
      }

      const code = data.code ?? 50000;
      // 未登录,且需要获取用户信息,且不为登录页面
      if (
        code === '40100' &&
        !path.includes('/api/user/currentUser') &&
        !location.pathname.includes('api/user/login')
      ) {
        // 跳转至登录页面 并包含一个 redirect 参数存放用户原本访问的页面
        window.location.href = `/api/user/login?redirect=${window.location.href}`;
        throw new Error('请先登录');
      }
      // 其余非成功情况
      if (code !== 0) {
        console.error(`request error, path = ${path}`, data);
        throw new Error(data.message ?? '服务器错误');
      }
      return response;
    },
  ],
};
