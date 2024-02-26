/**
 * 标签服务
 */
import { request } from '@umijs/max';

/**
 * 创建标签
 * @param params
 */
export async function addTag(params: TagType.TagAddRequest) {
  return request<BaseResponse<number>>('/api/tag/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 删除标签
 * @param params
 */
export async function deleteTag(params: DeleteRequest) {
  return request<BaseResponse<boolean>>('/api/tag/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 修改/更新标签
 * @param params
 */
export async function updateTag(params: TagType.TagUpdateRequest) {
  return request<BaseResponse<boolean>>('/api/tag/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 查询组
 * @param id
 */
export async function listTagCategory() {
  return request<BaseResponse<string[]>>(`/api/tag/category/list`, {
    method: 'GET',
    params: {},
  });
}

/**
 * 获取标签分组
 * @param id
 */
export async function getTagMap() {
  return request<BaseResponse<TagType.TagMap>>(`/api/tag/category/map`, {
    method: 'GET',
    params: {},
  });
}

/**
 * 分页获取标签列表
 * @param params
 */
export async function listTagByPage(params: TagType.TagQueryRequest) {
  return request<BaseResponse<PageInfo<TagType.Tag[]>>>('/api/tag/list/page', {
    method: 'GET',
    // data: params,  GET请求一般不推荐使用 data 直接使用 params 就会将参数添加在后面
    params,
  });
}
