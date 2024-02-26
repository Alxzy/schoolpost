/**
 * 用户服务
 */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<BaseResponse<UserType.UserVO>>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 用户注销
 */
export async function userLogout() {
  return request<BaseResponse<boolean>>('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
  });
}

/** 登录接口 POST /api/user/login */
export async function login(params: UserType.UserLoginRequest) {
  return request<BaseResponse<UserType.UserVO>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/** 注册接口 POST /api/user/register */
export async function register(params: UserType.UserRegisterRequest) {
  return request<BaseResponse<number>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 创建用户
 * @param params
 */
export async function addUser(params: UserType.UserAddRequest) {
  return request<BaseResponse<number>>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除用户
 * @param params
 */
export async function deleteUser(params: UserType.UserDeleteRequest) {
  return request<BaseResponse<boolean>>('/api/user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 修改/更新用户
 * @param params
 */
export async function updateUser(params: UserType.UserUpdateRequest) {
  return request<BaseResponse<boolean>>('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据 id 获取用户
 * @param id
 */
export async function getUserById(id: number) {
  return request<BaseResponse<UserType.UserVO>>(`/api/user/get`, {
    method: 'GET',
    params: { id },
  });
}

/**
 * 分页获取用户列表
 * @param params
 */
export async function listUserByPage(params: UserType.UserQueryRequest) {
  return request<BaseResponse<PageInfo<UserType.UserVO[]>>>('/api/user/list/page', {
    method: 'GET',
    // data: params,  GET请求一般不推荐使用 data 直接使用 params 就会将参数添加在后面
    params,
  });
}
