/**
 * 用户类型定义
 */
declare namespace UserType {
  type UserGenderEnum = 'MALE' | 'FEMALE';

  /**
   * 实体
   */
  interface User {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    userPassword?: string;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 用户类型
   */
  interface UserVO {
    id: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 用户注册请求
   */
  interface UserRegisterRequest {
    userAccount: string;
    userPassword: string;
    checkPassword: string;
  }

  /**
   * 用户登录请求
   */
  interface UserLoginRequest {
    userAccount: string;
    userPassword: string;
  }

  /**
   * 添加用户请求
   */
  interface UserAddRequest {
    userName: string;
    userAccount: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole: string;
    userPassword: string;
  }

  /**
   * 删除用户请求
   */
  interface UserDeleteRequest {
    id: number;
  }

  /**
   * 用户更新(修改)请求
   */
  interface UserUpdateRequest {
    id: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    // userPassword?: string;  不能乱改别人密码！
  }

  /**
   * 用户查询请求
   */
  interface UserQueryRequest extends PageRequest {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    // userPassword?: string;  不能乱改别人密码！
    createTime?: Date;
    updateTime?: Date;
  }
}
