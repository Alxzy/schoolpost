/**
 * 帖子服务
 */
import { request } from '@umijs/max';

/**
 * 创建帖子
 * @param params
 */
export async function addPost(params: PostType.PostAddRequest) {
  return request<BaseResponse<number>>('/api/post/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除帖子
 * @param params
 */
export async function deletePost(params: DeleteRequest) {
  return request<BaseResponse<boolean>>('/api/post/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 修改/更新帖子
 * @param params
 */
export async function updatePost(params: PostType.PostUpdateRequest) {
  return request<BaseResponse<boolean>>('/api/post/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 根据id获取帖子
 * @param params
 */
export async function getPostById(id: number) {
  return request<BaseResponse<boolean>>('/api/post/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id },
  });
}

/**
 * 获取帖子列表
 * @param params
 */
export async function listPost(params: PostType.PostQueryRequest) {
  return request<BaseResponse<PostType.Post[]>>('/api/post/list', {
    method: 'GET',
    // data: params,  GET请求一般不推荐使用 data 直接使用 params 就会将参数添加在后面
    params,
  });
}

/**
 * 分页获取帖子列表
 * @param params
 */
export async function listPostByPage(params: PostType.PostQueryRequest) {
  return request<BaseResponse<PageInfo<PostType.Post[]>>>('/api/post/list/page', {
    method: 'GET',
    // data: params,  GET请求一般不推荐使用 data 直接使用 params 就会将参数添加在后面
    params,
  });
}

/**
 * 点赞 / 取消点赞
 * @param params
 */
export async function postDoThumb(params: PostType.PostThumbRequest) {
  return request<BaseResponse<number>>(`/api/post/thumb`, {
    method: 'POST',
    params: { ...params },
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
