/**
 * 帖子类型定义
 */
declare namespace PostType {
  type Gender = 0 | 1;

  /**
   * 实体
   */
  interface Post {
    id: number;
    age: number;
    gender: Gender;
    education: string;
    place: string;
    job: string;
    hobby: string;
    contact: string;
    loveExp: string;
    content: string;
    photo: string;
    reviewStatus: number;
    reviewMessage?: string;
    viewNum: number;
    thumbNum: number;
    userId: number;
    createTime: Date;
    updateTime: Date;
  }

  /**
   * 视图
   */
  interface PostVO {
    id: number;
    age: number;
    gender: Gender;
    education: string;
    place: string;
    job: string;
    hobby: string;
    contact: string;
    loveExp: string;
    content: string;
    photo: string;
    reviewStatus: number;
    reviewMessage?: string;
    viewNum: number;
    thumbNum: number;
    userId: number;
    createTime: Date;
    hasThumb: boolean;
  }

  /**
   * 添加帖子请求
   */
  interface PostAddRequest {
    age: number;
    gender: Gender;
    education: string;
    place: string;
    job: string;
    hobby: string;
    contact: string;
    loveExp: string;
    content: string;
    photo: string;
  }

  /**
   * 帖子更新(修改)请求
   */
  interface PostUpdateRequest {
    id: number;
    age?: number;
    gender?: Gender;
    education?: string;
    place?: string;
    job?: string;
    hobby?: string;
    contact?: string;
    loveExp?: string;
    content?: string;
    photo?: string;
    reviewStatus?: number;
    reviewMessage?: string;
  }

  /**
   * 帖子查询请求
   */
  interface PostQueryRequest extends PageRequest {
    // 如果需要更多用到的在里面添加即可
    age?: number;
    gender?: Gender;
    education?: string;
    place?: string;
    job?: string;
    hobby?: string;
    contact?: string;
    loveExp?: string;
    content?: string;
    reviewStatus?: number; // 管理员专用
  }

  /**
   * 帖子点赞/取消点赞请求
   */
  interface PostThumbRequest {
    postId: number;
  }
}
