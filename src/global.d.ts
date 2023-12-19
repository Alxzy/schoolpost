/**
 * 返回封装
 */
interface BaseResponse<T> {
  code: number;
  data: T;
  message?: string;
}
/**
 * 全局初始化状态
 */
interface InitialState {
  loginUser?: UserType.UserVO;
}
