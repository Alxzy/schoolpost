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

}
