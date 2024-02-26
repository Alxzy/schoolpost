/**
 * 标签类型定义
 */
declare namespace TagType {
  /**
   * 实体
   */
  interface Tag {
    id?: number;
    category?: string;
    tagName?: string;
    userId?: number;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 添加标签请求
   */
  interface TagAddRequest {
    category: string;
    tagName: string;
    // userId: number; 不能由用户发
  }

  /**
   * 标签更新(修改)请求
   */
  interface TagUpdateRequest {
    id: number;
    category?: string;
    tagName?: string;
    // userId: number; 不能由用户发
  }

  /**
   * 标签查询请求
   */
  interface TagQueryRequest extends PageRequest {
    id?: number;
    category?: string;
    tagName?: string;
    // userId: number; 这里不是不让发 是 后端没做 后端只支持分组和标签名 看需求 后端要先做前端才能扩充
  }

  /**
   * 标签分组,接收一个结果
   */
  type TagMap = Record<string, Tag[]>;
}
